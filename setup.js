#!/usr/bin/env node
"use strict";

/* eslint-disable @typescript-eslint/no-require-imports -- CLI CommonJS sem dependências externas. */
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { parseEnv } = require("node:util");
const childProcess = require("node:child_process");

function parseArguments(argv) {
  const options = { dryRun: false, migrate: false, skipInstall: false, skipMigrations: false, allowScripts: false, platform: null, databaseTarget: null };
  for (const argument of argv) {
    if (argument === "--dry-run") options.dryRun = true;
    else if (argument === "--migrate") options.migrate = true;
    else if (argument === "--skip-install") options.skipInstall = true;
    else if (argument === "--skip-migrations") options.skipMigrations = true;
    else if (argument === "--allow-scripts") options.allowScripts = true;
    else if (argument.startsWith("--platform=")) options.platform = argument.slice(11);
    else if (argument.startsWith("--database-target=")) options.databaseTarget = argument.slice(18);
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new Error("Argumento desconhecido. Consulte node setup.js --help.");
  }
  if (options.migrate && options.skipMigrations) throw new Error("Use apenas --migrate ou --skip-migrations.");
  if (options.platform && !["windows", "linux", "mac"].includes(options.platform)) throw new Error("Plataforma inválida. Use windows, linux ou mac.");
  if (options.databaseTarget && !/^(localhost|127\.0\.0\.1|\[::1\]):\d{1,5}\/[A-Za-z0-9_-]+$/.test(options.databaseTarget)) throw new Error("Destino inválido: use host-loopback:porta/banco, sem credenciais.");
  if (options.migrate && !options.databaseTarget) throw new Error("--migrate exige --database-target=host:porta/banco após revisão do destino local.");
  if (options.databaseTarget && !options.migrate) throw new Error("--database-target exige --migrate.");
  return options;
}

function numericVersion(value) {
  const match = String(value).trim().match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  return match ? match.slice(1).map(Number) : null;
}
function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) if (left[index] !== right[index]) return left[index] - right[index];
  return 0;
}
function regularFile(filePath) {
  try { return fs.statSync(filePath).isFile(); } catch { return false; }
}
function present(filePath) {
  try { fs.lstatSync(filePath); return true; } catch (error) { if (error.code === "ENOENT") return false; throw error; }
}
function readJson(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, "utf8")); } catch { return null; }
}

// Do not execute PATH shims (Corepack, .cmd, .bat, Windows Store aliases) to probe presence.
function findExecutable(command, { env = process.env, platform = process.platform } = {}) {
  const windows = platform === "win32";
  const eligible = (candidate) => {
    if (!regularFile(candidate) || (windows && !/\.(exe|com)$/i.test(candidate))) return false;
    if (/[/\\]WindowsApps[/\\]/i.test(candidate)) return false;
    try { fs.accessSync(candidate, fs.constants.X_OK); return true; } catch { return false; }
  };
  if (path.isAbsolute(command)) return eligible(command) ? command : null;
  if (command.includes("/") || command.includes("\\")) return null;
  const pathKey = Object.keys(env).find((key) => key.toLowerCase() === "path");
  const directories = (env[pathKey] || "").split(windows ? ";" : ":");
  const extensions = windows && !path.extname(command) ? [".exe", ".com"] : [""];
  for (const entry of directories) {
    const directory = entry.replace(/^"|"$/g, "");
    if (!path.isAbsolute(directory)) continue;
    for (const extension of extensions) {
      const candidate = path.join(directory, command + extension);
      if (eligible(candidate)) return candidate;
    }
  }
  return null;
}

function resolveNpmCli({ execPath = process.execPath, env = process.env } = {}) {
  const node = fs.realpathSync(execPath);
  const directory = path.dirname(node);
  const candidates = [
    path.join(directory, "node_modules", "npm", "bin", "npm-cli.js"),
    path.resolve(directory, "..", "lib", "node_modules", "npm", "bin", "npm-cli.js"),
    path.resolve(directory, "..", "share", "nodejs", "npm", "bin", "npm-cli.js"),
  ];
  for (const candidate of candidates) {
    if (!regularFile(candidate)) continue;
    const cli = fs.realpathSync(candidate);
    const metadata = readJson(path.resolve(cli, "..", "..", "package.json"));
    if (metadata?.name !== "npm" || metadata.bin?.npm !== "bin/npm-cli.js" || !numericVersion(metadata.version)) continue;
    // npm_execpath never selects code or triggers reads of an untrusted/network path.
    void env;
    return { cli, version: metadata.version };
  }
  throw new Error("CLI JavaScript do npm ausente/inválida junto ao Node ativo. Repare essa instalação do Node/npm; não execute um npm.cmd de outra versão.");
}

function validDevelopmentDatabaseUrl(value) {
  try {
    const url = new URL(value);
    return ["postgres:", "postgresql:"].includes(url.protocol)
      && ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
      && /^\/[A-Za-z0-9_-]+$/.test(url.pathname)
      && !url.hash && [...url.searchParams].every(([key, val]) => key === "schema" && /^[A-Za-z_][A-Za-z0-9_]*$/.test(val));
  } catch { return false; }
}
function databaseTarget(value) {
  if (!validDevelopmentDatabaseUrl(value)) return null;
  const url = new URL(value);
  return `${url.hostname}:${url.port || "5432"}${url.pathname}`;
}

const defaultLogger = Object.fromEntries(["section", "info", "success", "warning", "error", "command"].map((level) => [level, (message) => process.stdout.write(`${level === "section" ? os.EOL : ""}${message}${os.EOL}`)]));
function printHelp(logger) {
  logger.info(`Uso: node setup.js [opções]
  --platform=windows|linux|mac  Seleção deve corresponder ao sistema real.
  --dry-run                    Apenas plano: não executa processos nem escreve arquivos.
  --skip-install               Não instala dependências Node nem Python.
  --allow-scripts              Autoriza código de terceiros: lifecycle e Prisma local.
  --skip-migrations            Não consulta nem altera o banco.
  --migrate                    Autoriza apenas migrations existentes em PostgreSQL local.
  --database-target=host:porta/banco  Confirma destino loopback, sem credenciais.
  -h, --help                   Exibe esta ajuda.
Sem --allow-scripts, npm instala com --ignore-scripts e Prisma não é executado.
Essa preparação parcial não comprova que módulos nativos ou a aplicação funcionam.`);
}

function createSetup(config = {}) {
  const root = config.root || __dirname;
  const env = { ...(config.env || process.env) };
  const platform = config.platform || process.platform;
  const execPath = config.execPath || process.execPath;
  const nodeVersion = config.nodeVersion || process.versions.node;
  const spawnSync = config.spawnSync || childProcess.spawnSync;
  const logger = config.logger || defaultLogger;
  const detected = platform === "win32" ? "windows" : platform === "darwin" ? "mac" : platform;
  let packageManager;

  function run(command, args, options = {}) {
    const label = options.label || path.basename(command);
    if (options.dryRun) { logger.info(`[simulação] ${label}`); return { status: 0, stdout: "", stderr: "" }; }
    let file = command;
    let parameters = [...args];
    if (command === "npm") {
      const npm = resolveNpmCli({ execPath, env });
      file = execPath;
      parameters = [npm.cli, ...args];
    } else if (command !== execPath) {
      file = findExecutable(command, { env, platform });
      if (!file) throw Object.assign(new Error(`Executável ausente/inválido: ${label}. Revise a instalação e o PATH.`), { exitCode: 1 });
    }
    logger.info(`Executando: ${label}`);
    let result;
    try {
      result = spawnSync(file, parameters, {
        cwd: root, env: options.env || env, shell: false, windowsHide: true,
        encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 8 * 1024 * 1024,
      });
    } catch {
      throw Object.assign(new Error(`Não foi possível iniciar ${label}; argumentos ou ambiente inválidos. Etapas seguintes canceladas.`), { exitCode: 1 });
    }
    // Child output may contain secrets, database URLs or arbitrary dependency logs. Never echo it.
    if (result.error) throw Object.assign(new Error(`Não foi possível executar ${label} (${result.error.code || "PROCESS_ERROR"}). Etapas seguintes canceladas; nenhum rollback destrutivo foi tentado.`), { exitCode: 1, code: result.error.code });
    if (result.signal) throw Object.assign(new Error(`${label} interrompido por ${result.signal}; revise o estado parcial antes de repetir.`), { exitCode: result.signal === "SIGINT" ? 130 : result.signal === "SIGTERM" ? 143 : 1, signal: result.signal });
    if (result.status !== 0 && !options.allowFailure) throw Object.assign(new Error(`${label} falhou com código ${result.status}; saída privada do processo não exibida. Revise os logs locais com cuidado antes de repetir.`), { exitCode: Number.isInteger(result.status) && result.status > 0 ? result.status : 1 });
    return result;
  }

  function verifyEnvironment(options) {
    const expected = numericVersion(fs.readFileSync(path.join(root, ".node-version"), "utf8").trim());
    const current = numericVersion(nodeVersion);
    const supported = expected && current && expected[0] === current[0] && compareVersions(current, expected) >= 0;
    if (!supported) {
      logger.warning("Node incompatível com .node-version. Atualize manualmente pelo gerenciador oficial de sua escolha e abra uma nova sessão; o setup não instala software de sistema.");
      if (!options.dryRun) throw new Error("Node.js incompatível; nenhuma etapa de instalação foi iniciada.");
    } else logger.success(`Node.js ${nodeVersion} compatível com .node-version.`);
    if (!findExecutable("git", { env, platform })) throw new Error("Git nativo não encontrado no PATH; nenhuma verificação de versão foi executada.");
    logger.success("Git localizado sem executar processos de diagnóstico.");
    return Boolean(supported);
  }

  function detectPackageManager() {
    const locks = [["npm", "package-lock.json"], ["pnpm", "pnpm-lock.yaml"], ["yarn", "yarn.lock"], ["bun", "bun.lock"], ["bun", "bun.lockb"]];
    const found = locks.filter(([, file]) => present(path.join(root, file)));
    const managers = [...new Set(found.map(([manager]) => manager))];
    if (managers.length > 1) throw new Error("Lockfiles conflitantes; nenhuma instalação foi iniciada.");
    const manager = managers[0] || "npm";
    // Only npm's pinned lockfile and lifecycle suppression are qualified by this installer.
    if (manager !== "npm") throw new Error("Este setup exige package-lock.json/npm. Outro lockfile requer revisão manual; nenhum Corepack/shim foi executado.");
    if (!found.length) throw new Error("package-lock.json ausente: restaure o lockfile revisado antes de instalar.");
    const npm = resolveNpmCli({ execPath, env });
    logger.success(`Gerenciador detectado: npm ${npm.version} (metadados locais; nenhum --version executado).`);
    packageManager = { manager: "npm", hasLockfile: true, ...npm };
    return packageManager;
  }

  function configureEnvironment(options) {
    const examplePath = path.join(root, ".env.example");
    const environmentPath = path.join(root, ".env");
    if (present(environmentPath)) logger.success(".env existente preservado sem leitura ou sobrescrita.");
    else {
      if (!regularFile(examplePath)) throw new Error(".env.example ausente/inválido.");
      if (options.dryRun) logger.info("[simulação] Copiaria .env.example para .env.");
      else {
        let descriptor;
        try {
          descriptor = fs.openSync(environmentPath, "wx", 0o600);
          fs.writeFileSync(descriptor, fs.readFileSync(examplePath));
        } catch (error) {
          if (error.code !== "EEXIST") throw new Error("Não foi possível criar .env; verifique permissões e estado parcial sem remover o arquivo existente.");
        } finally {
          if (descriptor !== undefined) fs.closeSync(descriptor);
        }
        logger.success(".env preparado por cópia exclusiva; valores não exibidos.");
      }
    }
    return { environmentPath };
  }

  function installNodeDependencies(manager, options) {
    if (options.skipInstall) { logger.warning("Instalação Node ignorada por --skip-install."); return; }
    logger.warning("npm ci substitui node_modules e pode deixar instalação parcial se interrompido. .env e lockfile serão preservados; o setup não apaga o estado parcial para tentar recuperá-lo.");
    if (options.allowScripts) logger.warning("--allow-scripts autoriza lifecycle de terceiros com os privilégios desta sessão. Execute apenas após revisão, em ambiente isolado e sem privilégios administrativos.");
    else logger.warning("Lifecycle de terceiros bloqueado. Preparação parcial; módulos nativos podem exigir revisão e instalação posterior autorizada.");
    // Explicit flags override unsafe npm config defaults without modifying global configuration.
    const args = ["ci", "--global=false", "--prefix", root, "--no-audit", "--no-fund", options.allowScripts ? "--ignore-scripts=false" : "--ignore-scripts"];
    run(manager.manager, args, { dryRun: options.dryRun, label: `npm ci local (${options.allowScripts ? "lifecycle autorizado" : "--ignore-scripts"})` });
  }

  function installPythonDependencies(_selectedPlatform, options) {
    const manifest = ["requirements.txt", "pyproject.toml", "Pipfile"].find((file) => present(path.join(root, file)));
    if (!manifest) { logger.success("Nenhum manifesto Python; etapa não aplicável."); return; }
    if (options.skipInstall) { logger.warning("Instalação Python ignorada por --skip-install."); return; }
    // Installing a new Python manifest introduces arbitrary build hooks. Never infer approval from presence.
    if (!options.allowScripts) { logger.warning("Manifesto Python detectado; instalação não autorizada sem --allow-scripts."); return; }
    if (manifest !== "requirements.txt") throw new Error("Manifesto Python exige procedimento manual revisado; ambiente existente preservado.");
    const venvPath = path.join(root, ".venv");
    const venvPython = path.join(venvPath, platform === "win32" ? "Scripts" : "bin", platform === "win32" ? "python.exe" : "python");
    if (present(venvPath)) {
      if (fs.lstatSync(venvPath).isSymbolicLink()) throw new Error(".venv é um link externo/indireto; instalação recusada e ambiente preservado.");
      if (!regularFile(path.join(venvPath, "pyvenv.cfg")) || !regularFile(venvPython)) throw new Error(".venv incompleta ou inválida; preservada. Revise manualmente ou use outro checkout isolado.");
    } else if (!options.dryRun) {
      const python = ["python3", "python"].map((candidate) => findExecutable(candidate, { env, platform })).find(Boolean);
      if (!python) throw new Error("Python nativo não encontrado; aliases e launchers não foram executados.");
      run(python, ["-c", "import sys; sys.exit(0 if sys.version_info.major == 3 else 1)"], { label: "Validação Python 3 para instalação autorizada" });
      run(python, ["-m", "venv", ".venv"], { label: "Python -m venv .venv" });
    }
    const pipEnv = { ...env };
    for (const key of Object.keys(pipEnv)) if (/^PIP_/i.test(key)) delete pipEnv[key];
    // PIP_CONFIG_FILE=os.devnull disables all pip config files, including site/global.
    // --isolated alone ignores environment/user settings but still reads site/global config.
    pipEnv.PIP_CONFIG_FILE = platform === "win32" ? "nul" : "/dev/null";
    run(venvPython, ["-I", "-m", "pip", "--isolated", "--require-virtualenv", "--disable-pip-version-check", "--no-input", "install", "-r", "requirements.txt"], {
      dryRun: options.dryRun, env: pipEnv, label: "Python .venv pip isolado (--require-virtualenv)",
    });
  }

  function runPrisma(args, options = {}) {
    if (options.dryRun) return run(execPath, [], { dryRun: true, label: `Prisma local ${args.join(" ")}` });
    const metadata = readJson(path.join(root, "node_modules", "prisma", "package.json"));
    const declared = readJson(path.join(root, "package.json"));
    const expectedVersion = declared?.devDependencies?.prisma || declared?.dependencies?.prisma;
    const cli = path.join(root, "node_modules", "prisma", "build", "index.js");
    if (metadata?.name !== "prisma" || metadata.version !== expectedVersion || !regularFile(cli)) throw new Error("Prisma local ausente/incompatível. Nenhum pacote será baixado automaticamente; restaure as dependências revisadas.");
    const prismaEnv = { ...(options.env || env) };
    // dotenv 17.3.1 coerces override with Boolean(): the string "false" is TRUE.
    // Empty strings also disable overrides in later versions which parse booleans.
    for (const key of Object.keys(prismaEnv)) {
      if (/^DOTENV_CONFIG_/i.test(key) || /^DOTENV_KEY$/i.test(key)
        || /^(PGHOST|PGHOSTADDR|PGPORT|PGDATABASE|PGSERVICE|PGSERVICEFILE|PGOPTIONS)$/i.test(key)) delete prismaEnv[key];
    }
    Object.assign(prismaEnv, {
      DOTENV_CONFIG_OVERRIDE: "", DOTENV_CONFIG_PATH: path.join(root, ".env"),
      DOTENV_CONFIG_ENCODING: "utf8", DOTENV_CONFIG_QUIET: "true", DOTENV_CONFIG_DEBUG: "",
      DOTENV_KEY: "", DOTENV_CONFIG_DOTENV_KEY: "",
    });
    return run(execPath, [cli, ...args], { ...options, env: prismaEnv, label: `Prisma local ${args.join(" ")}` });
  }

  async function configureDatabase(_manager, environmentPath, options) {
    if (!regularFile(path.join(root, "prisma", "schema.prisma"))) return;
    if (!options.allowScripts) {
      if (options.migrate) throw new Error("Migrations exigem --allow-scripts para executar a CLI local revisada.");
      logger.warning("Prisma não executado: revise o código de terceiros antes de autorizar --allow-scripts. Aplicação ainda não qualificada para iniciar.");
      return;
    }
    // Generation receives no database URL. The project config loads .env but generate never connects.
    runPrisma(["generate"], { dryRun: options.dryRun, env: { ...env, DATABASE_URL: "" } });
    if (options.skipMigrations || !options.migrate) {
      logger.warning("Nenhum acesso ao banco autorizado; migrations e status não executados.");
      return;
    }
    if (options.dryRun) { logger.info("[simulação] Validaria URL local e destino confirmado antes de aplicar migrations existentes."); return; }
    let fromFile;
    try { fromFile = present(environmentPath) ? parseEnv(fs.readFileSync(environmentPath, "utf8")).DATABASE_URL : undefined; }
    catch { throw new Error("Não foi possível interpretar .env; nenhuma conexão foi tentada."); }
    const databaseUrl = env.DATABASE_URL !== undefined ? env.DATABASE_URL : fromFile;
    if (!validDevelopmentDatabaseUrl(databaseUrl) || databaseTarget(databaseUrl) !== options.databaseTarget) throw new Error("DATABASE_URL efetiva não corresponde ao destino PostgreSQL local confirmado. Nenhuma conexão foi tentada; revise ambiente herdado e .env sem divulgar valores.");
    logger.warning("Destino local confirmado. Aplicando apenas migrations existentes, sem reset ou geração de novas migrations. Banco vazio exige baseline manual documentada.");
    runPrisma(["migrate", "deploy"], { env: { ...env, DATABASE_URL: databaseUrl } });
  }

  async function main(argv = process.argv.slice(2)) {
    try {
      const options = parseArguments(argv);
      if (options.help) { printHelp(logger); return 0; }
      logger.section("HidroFlorestas — setup automatizado");
      if (options.platform && options.platform !== detected && !options.dryRun) throw new Error("--platform não corresponde ao sistema real; use apenas para visualizar plano com --dry-run.");
      if (options.dryRun) logger.warning("Simulação: nenhum processo será executado e nenhum arquivo será alterado.");
      const supported = verifyEnvironment(options);
      const manager = detectPackageManager();
      const environment = configureEnvironment(options);
      installNodeDependencies(manager, options, supported);
      installPythonDependencies(detected, options);
      await configureDatabase(manager, environment.environmentPath, options);
      logger.section(options.dryRun ? "Plano exibido" : "Preparação concluída");
      if (!options.allowScripts) logger.warning("PREPARACAO_PARCIAL: lifecycle e Prisma não executados; isto não comprova aplicação pronta.");
      else logger.info("Revise a configuração privada antes de iniciar a aplicação. Nenhum serviço foi iniciado.");
      return 0;
    } catch (error) {
      logger.section("Setup interrompido");
      // Only our sanitized messages are public; filesystem/child errors may include private paths or values.
      const safe = error instanceof Error && !error.syscall ? error.message : "Falha de acesso ao ambiente local; revise permissões e estado parcial sem divulgar valores privados.";
      logger.error(safe);
      return Number.isInteger(error.exitCode) ? error.exitCode : 1;
    }
  }
  return { main, run, detectPackageManager, configureEnvironment, installNodeDependencies, installPythonDependencies, configureDatabase, verifyEnvironment };
}

module.exports = { createSetup, resolveNpmCli, findExecutable, parseArguments, validDevelopmentDatabaseUrl, databaseTarget, numericVersion, compareVersions };
if (require.main === module) createSetup().main().then((exitCode) => { process.exitCode = exitCode; });
