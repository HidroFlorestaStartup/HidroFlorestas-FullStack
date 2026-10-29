#!/usr/bin/env node

"use strict";

/* eslint-disable @typescript-eslint/no-require-imports -- package.json não declara ESM; este setup Node puro precisa continuar executável como setup.js. */

const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const readline = require("node:readline/promises");

const projectRoot = __dirname;
const isInteractive = Boolean(process.stdin.isTTY && process.stdout.isTTY);
const useColor = isInteractive && !process.env.NO_COLOR;

const colors = {
  blue: "\u001b[34m",
  cyan: "\u001b[36m",
  green: "\u001b[32m",
  yellow: "\u001b[33m",
  red: "\u001b[31m",
  bold: "\u001b[1m",
  reset: "\u001b[0m",
};

function paint(color, value) {
  return useColor ? `${colors[color]}${value}${colors.reset}` : value;
}

function log(symbol, color, message) {
  process.stdout.write(`${paint(color, symbol)} ${message}${os.EOL}`);
}

const logger = {
  section(message) {
    process.stdout.write(`${os.EOL}${paint("bold", message)}${os.EOL}`);
  },
  info(message) {
    log("ℹ", "cyan", message);
  },
  success(message) {
    log("✓", "green", message);
  },
  warning(message) {
    log("!", "yellow", message);
  },
  error(message) {
    log("✗", "red", message);
  },
  command(message) {
    process.stdout.write(`${paint("green", `  ${message}`)}${os.EOL}`);
  },
};

function parseArguments(argv) {
  const options = {
    dryRun: false,
    migrate: false,
    skipInstall: false,
    skipMigrations: false,
    platform: null,
  };

  for (const argument of argv) {
    if (argument === "--dry-run") options.dryRun = true;
    else if (argument === "--migrate") options.migrate = true;
    else if (argument === "--skip-install") options.skipInstall = true;
    else if (argument === "--skip-migrations") options.skipMigrations = true;
    else if (argument.startsWith("--platform=")) options.platform = argument.slice("--platform=".length);
    else if (argument === "--help" || argument === "-h") options.help = true;
    else throw new Error(`Argumento desconhecido: ${argument}`);
  }

  if (options.migrate && options.skipMigrations) {
    throw new Error("Use apenas uma das opções --migrate ou --skip-migrations.");
  }

  const supportedPlatforms = new Set(["windows", "linux", "mac"]);
  if (options.platform && !supportedPlatforms.has(options.platform)) {
    throw new Error(`Plataforma inválida: ${options.platform}. Use windows, linux ou mac.`);
  }

  return options;
}

function printHelp() {
  process.stdout.write(`
Uso: node setup.js [opções]

Opções:
  --platform=windows|linux|mac  Sobrescreve a detecção de plataforma.
  --migrate                     Autoriza prisma migrate dev sem prompt interativo.
  --skip-migrations             Não consulta nem altera o banco de dados.
  --skip-install                Não reinstala as dependências do projeto.
  --dry-run                     Exibe as ações sem alterar arquivos ou instalar pacotes.
  -h, --help                    Exibe esta ajuda.
`);
}

function detectedPlatform() {
  if (process.platform === "win32") return "windows";
  if (process.platform === "darwin") return "mac";
  if (process.platform === "linux") return "linux";
  return process.platform;
}

function executable(command) {
  if (process.platform !== "win32") return command;
  return ["npm", "npx", "pnpm", "yarn"].includes(command)
    ? `${command}.cmd`
    : command;
}

function commandLabel(command, args) {
  return [command, ...args].join(" ");
}

function run(command, args, options = {}) {
  const label = commandLabel(command, args);
  if (options.dryRun) {
    logger.info(`[simulação] ${label}`);
    return { status: 0, stdout: "" };
  }

  logger.info(`Executando: ${label}`);
  const result = spawnSync(executable(command), args, {
    cwd: projectRoot,
    env: process.env,
    encoding: options.capture ? "utf8" : undefined,
    stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });

  if (result.error) {
    throw new Error(`Não foi possível executar ${command}: ${result.error.message}`);
  }
  if (result.status !== 0 && !options.allowFailure) {
    throw new Error(`O comando falhou com código ${result.status}: ${label}`);
  }
  return result;
}

function commandVersion(command, args = ["--version"]) {
  const result = spawnSync(executable(command), args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.error || result.status !== 0) return null;
  return `${result.stdout || result.stderr}`.trim().split(/\r?\n/, 1)[0];
}

function commandExists(command) {
  const pathEntries = (process.env.PATH || "").split(path.delimiter).filter(Boolean);
  const extensions = process.platform === "win32"
    ? (process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM").split(";")
    : [""];
  const names = process.platform === "win32" && !path.extname(command)
    ? extensions.map((extension) => `${command}${extension.toLowerCase()}`)
    : [command];

  return pathEntries.some((directory) => names.some((name) => {
    try {
      fs.accessSync(path.join(directory, name), fs.constants.X_OK);
      return true;
    } catch {
      return false;
    }
  }));
}

function numericVersion(value) {
  const match = String(value).trim().match(/^v?(\d+)\.(\d+)\.(\d+)/);
  return match ? match.slice(1).map(Number) : null;
}

function compareVersions(left, right) {
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

function shellName() {
  return path.basename(process.env.SHELL || "").toLowerCase();
}

function printNodeUpgradeInstructions(platform, expectedNode) {
  logger.warning("Atualize o Node.js com os comandos abaixo e depois execute o setup novamente:");

  if (platform === "windows") {
    logger.info("Windows (PowerShell):");
    logger.command("winget install Schniz.fnm");
    logger.info("Feche e abra o PowerShell após a instalação do fnm. Em seguida:");
    logger.command("fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression");
    logger.command(`fnm use --install-if-missing ${expectedNode}`);
    logger.command("npm run setup");
    return;
  }

  if (platform === "mac") {
    const shell = shellName() === "bash" ? "bash" : "zsh";
    logger.info(`macOS (${shell}):`);
    logger.command("brew install fnm");
    logger.command(`eval \"$(fnm env --use-on-cd --shell ${shell})\"`);
    logger.command(`fnm use --install-if-missing ${expectedNode}`);
    logger.command("npm run setup");
    return;
  }

  const shell = shellName() === "zsh" ? "zsh" : "bash";
  logger.info(`Linux (${shell}):`);
  logger.command("curl -fsSL https://fnm.vercel.app/install | bash");
  logger.command(`source ~/.${shell}rc`);
  logger.command(`fnm use --install-if-missing ${expectedNode}`);
  logger.command("npm run setup");
}

function verifyEnvironment(options, platform) {
  logger.section("1. Verificação do ambiente básico");

  const expectedNode = fs.readFileSync(path.join(projectRoot, ".node-version"), "utf8").trim();
  const currentNode = process.versions.node;
  const expected = numericVersion(expectedNode);
  const current = numericVersion(currentNode);
  const supported = expected && current
    && current[0] === expected[0]
    && compareVersions(current, expected) >= 0;

  if (!supported) {
    const nextMajor = Number(expectedNode.split(".")[0]) + 1;
    const message = `Node.js ${currentNode} detectado; o projeto exige >=${expectedNode} e <${nextMajor}.`;
    logger.error(message);
    printNodeUpgradeInstructions(platform, expectedNode);
    if (!options.dryRun) {
      throw new Error("Node.js incompatível. Execute os comandos em verde acima antes de tentar novamente.");
    }
    logger.warning("A simulação continuará sem executar comandos de instalação.");
  } else {
    logger.success(`Node.js ${currentNode} compatível com .node-version.`);
  }

  const gitVersion = commandVersion("git");
  if (!gitVersion) throw new Error("Git não foi encontrado no PATH.");
  logger.success(`${gitVersion} disponível.`);

  return supported;
}

function detectPackageManager() {
  const candidates = [
    { name: "npm", lockfile: "package-lock.json" },
    { name: "pnpm", lockfile: "pnpm-lock.yaml" },
    { name: "yarn", lockfile: "yarn.lock" },
    { name: "bun", lockfile: "bun.lock" },
    { name: "bun", lockfile: "bun.lockb" },
  ];
  const found = candidates.filter(({ lockfile }) => fs.existsSync(path.join(projectRoot, lockfile)));
  const managers = [...new Set(found.map(({ name }) => name))];
  if (managers.length > 1) {
    throw new Error(`Lockfiles conflitantes encontrados para: ${managers.join(", ")}.`);
  }

  const manager = managers[0] || "npm";
  if (!commandExists(manager)) throw new Error(`${manager} não foi encontrado no PATH.`);
  const userAgent = process.env.npm_config_user_agent?.split(" ", 1)[0];
  const version = commandVersion(manager)
    || (userAgent?.startsWith(`${manager}/`) ? userAgent.slice(manager.length + 1) : "disponível");
  logger.success(`Gerenciador detectado: ${manager} ${version} (${found[0]?.lockfile || "sem lockfile"}).`);
  return { manager, hasLockfile: found.length > 0 };
}

function configureEnvironment(options) {
  logger.section("2. Variáveis de ambiente");
  const examplePath = path.join(projectRoot, ".env.example");
  const environmentPath = path.join(projectRoot, ".env");

  if (!fs.existsSync(examplePath)) {
    throw new Error(".env.example não foi encontrado na raiz do projeto.");
  }
  if (fs.existsSync(environmentPath)) {
    logger.success(".env já existe e foi preservado sem leitura ou sobrescrita de valores sensíveis.");
  } else if (options.dryRun) {
    logger.info("[simulação] Copiaria .env.example para .env.");
  } else {
    fs.copyFileSync(examplePath, environmentPath, fs.constants.COPYFILE_EXCL);
    logger.success(".env criado a partir de .env.example.");
  }

  logger.warning("Preencha os valores obrigatórios no .env antes de iniciar a aplicação ou migrar o banco.");
  logger.info("Uploads Cloudinary permanecem desabilitados até CLOUDINARY_IMAGE_ENABLED=1 e configuração revisada.");
  return { environmentPath };
}

function installNodeDependencies(packageManager, options, nodeSupported) {
  logger.section("3. Dependências Node.js");
  if (options.skipInstall) {
    logger.warning("Instalação Node.js ignorada por --skip-install.");
    return;
  }
  if (!nodeSupported && options.dryRun) {
    logger.info("[simulação] A instalação não será realmente executada com Node.js incompatível.");
  }

  const commands = {
    npm: packageManager.hasLockfile ? ["ci"] : ["install"],
    pnpm: packageManager.hasLockfile ? ["install", "--frozen-lockfile"] : ["install"],
    yarn: packageManager.hasLockfile ? ["install", "--frozen-lockfile"] : ["install"],
    bun: packageManager.hasLockfile ? ["install", "--frozen-lockfile"] : ["install"],
  };
  run(packageManager.manager, commands[packageManager.manager], { dryRun: options.dryRun });
  logger.success("Dependências Node.js preparadas.");
}

function findPythonManifest() {
  const manifests = ["requirements.txt", "pyproject.toml", "Pipfile"];
  return manifests.find((name) => fs.existsSync(path.join(projectRoot, name))) || null;
}

function detectPython(platform) {
  const candidates = platform === "windows"
    ? [
      { command: "py", args: ["-3", "--version"] },
      { command: "python", args: ["--version"] },
      { command: "python3", args: ["--version"] },
    ]
    : [
      { command: "python3", args: ["--version"] },
      { command: "python", args: ["--version"] },
    ];

  for (const candidate of candidates) {
    const version = commandVersion(candidate.command, candidate.args);
    if (version && /Python 3\./.test(version)) return { ...candidate, version };
  }
  return null;
}

function installPythonDependencies(platform, options) {
  logger.section("4. Dependências Python");
  const manifest = findPythonManifest();
  if (!manifest) {
    logger.success("Python não é dependência da aplicação: nenhum manifesto Python foi encontrado.");
    return;
  }

  const python = detectPython(platform);
  if (!python) {
    throw new Error(`Python 3 é necessário porque ${manifest} foi encontrado, mas não está disponível no PATH.`);
  }
  logger.success(`${python.version} disponível para ${manifest}.`);

  if (manifest !== "requirements.txt") {
    logger.warning(`${manifest} foi detectado, mas este setup instala automaticamente apenas requirements.txt.`);
    return;
  }

  const venvPath = path.join(projectRoot, ".venv");
  if (!fs.existsSync(venvPath)) {
    run(python.command, [...python.args.slice(0, -1), "-m", "venv", ".venv"], { dryRun: options.dryRun });
    logger.success("Ambiente virtual .venv criado.");
  } else {
    logger.success("Ambiente virtual .venv existente será reutilizado.");
  }

  const venvPython = platform === "windows"
    ? path.join(venvPath, "Scripts", "python.exe")
    : path.join(venvPath, "bin", "python");
  run(venvPython, ["-m", "pip", "install", "-r", "requirements.txt"], { dryRun: options.dryRun });
  logger.success("Dependências Python instaladas dentro de .venv; o setup usa diretamente esse interpretador.");
}

function packageBinaryCommand(manager, binary, args) {
  if (manager === "npm") return { command: "npm", args: ["exec", "--", binary, ...args] };
  if (manager === "pnpm") return { command: "pnpm", args: ["exec", binary, ...args] };
  if (manager === "yarn") return { command: "yarn", args: ["exec", binary, ...args] };
  return { command: "bun", args: ["x", binary, ...args] };
}

function runPackageBinary(manager, binary, args, options = {}) {
  const command = packageBinaryCommand(manager, binary, args);
  return run(command.command, command.args, options);
}

function readEnvironmentValue(filePath, name) {
  if (!fs.existsSync(filePath)) return "";
  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || match[1] !== name) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    return value.trim();
  }
  return "";
}

function validDevelopmentDatabaseUrl(value) {
  try {
    const url = new URL(value);
    return ["postgres:", "postgresql:"].includes(url.protocol)
      && Boolean(url.hostname)
      && Boolean(url.pathname.slice(1))
      && !url.hostname.endsWith(".invalid");
  } catch {
    return false;
  }
}

async function confirmMigration(options) {
  if (options.migrate) return true;
  if (!isInteractive) {
    logger.warning("Sessão não interativa: migrations não serão aplicadas. Use --migrate após revisar o destino.");
    return false;
  }

  const prompt = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = await prompt.question(paint("yellow", "Aplicar migrations existentes neste banco de desenvolvimento? [s/N] "));
    return /^(s|sim|y|yes)$/i.test(answer.trim());
  } finally {
    prompt.close();
  }
}

async function configureDatabase(packageManager, environmentPath, options) {
  logger.section("5. Banco de dados e Prisma");
  const schemaPath = path.join(projectRoot, "prisma", "schema.prisma");
  if (!fs.existsSync(schemaPath)) {
    logger.success("Nenhum schema Prisma detectado; etapa de ORM não é aplicável.");
    return;
  }

  runPackageBinary(packageManager.manager, "prisma", ["generate"], { dryRun: options.dryRun });
  logger.success("Prisma Client gerado a partir do schema local.");

  if (options.skipMigrations) {
    logger.warning("Migrations ignoradas por --skip-migrations.");
    return;
  }

  const databaseUrl = readEnvironmentValue(environmentPath, "DATABASE_URL");
  if (!validDevelopmentDatabaseUrl(databaseUrl)) {
    logger.warning("DATABASE_URL ainda não identifica um PostgreSQL de desenvolvimento; nenhuma conexão ou migration foi tentada.");
    logger.info("Configure o .env e execute novamente npm run setup, ou use npm run setup -- --migrate após revisar o destino.");
    return;
  }

  if (options.dryRun) {
    logger.info("[simulação] Consultaria prisma migrate status e pediria autorização antes de prisma migrate dev.");
    return;
  }

  logger.warning("A URL do banco foi detectada, mas seu valor não será exibido nos logs.");
  const status = runPackageBinary(packageManager.manager, "prisma", ["migrate", "status"], { allowFailure: true });
  if (status.status !== 0) {
    logger.warning("O status retornou código não zero (migrations pendentes ou conexão/histórico a revisar). Confira a saída acima.");
  }

  if (!(await confirmMigration(options))) {
    logger.warning("Aplicação de migrations não autorizada; banco preservado.");
    return;
  }

  logger.warning("Bancos totalmente vazios exigem a baseline documentada em prisma/bootstrap/initial-database-bootstrap.md.");
  runPackageBinary(packageManager.manager, "prisma", ["migrate", "dev"]);
  logger.success("Migrations de desenvolvimento concluídas.");
}

async function main() {
  let options;
  try {
    options = parseArguments(process.argv.slice(2));
  } catch (error) {
    logger.error(error instanceof Error ? error.message : String(error));
    printHelp();
    process.exitCode = 1;
    return;
  }

  if (options.help) {
    printHelp();
    return;
  }

  const platform = options.platform || detectedPlatform();
  logger.section("HidroFlorestas — setup automatizado");
  logger.info(`Plataforma: ${platform}${options.platform ? " (seleção explícita)" : " (detecção automática)"}.`);
  if (options.dryRun) logger.warning("Modo de simulação ativo: nenhuma alteração será realizada.");

  try {
    const nodeSupported = verifyEnvironment(options, platform);
    const packageManager = detectPackageManager();
    const environment = configureEnvironment(options);
    installNodeDependencies(packageManager, options, nodeSupported);
    installPythonDependencies(platform, options);
    await configureDatabase(packageManager, environment.environmentPath, options);

    logger.section("Setup finalizado");
    logger.success("Etapas automatizáveis concluídas.");
    logger.info("Revise o .env e execute npm run dev para iniciar a aplicação.");
  } catch (error) {
    logger.section("Setup interrompido");
    logger.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}

main();
