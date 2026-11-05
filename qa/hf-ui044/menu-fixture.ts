import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { ChevronDown, LogOut } from "lucide-react";
import ts from "typescript";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { runInNewContext } from "node:vm";

/** Geometry-only fixture: render the real presentation TSX with a synthetic
 * session and native HTML links/image. It does not run Next, auth, PG or effects.
 * CSS is the actual shell module plus Tailwind preflight; only the font fixture
 * is Arial, explicitly recorded alongside observed CDP fonts. */
export async function accountMenuFixture() {
  const paths = ["src/components/top-bar/index.tsx", "src/components/user-profile/index.tsx",
    "src/components/shell/shell.module.css", "src/app/globals.css", "node_modules/tailwindcss/preflight.css"];
  const [topBar, profile, shellCss, globals, preflight] = await Promise.all(paths.map(path => readFile(join(process.cwd(), path), "utf8")));
  const logo = await readFile(join(process.cwd(), "src/assets/logo/logo-hf.png"));
  const bindings = {
    ...React, ChevronDown, LogOut,
    usePathname: () => "/workspace",
    useAuth: () => ({ user: { firstName: "Marcos", lastName: "Lima", image: "" } }),
    styles: new Proxy({}, { get: (_target, property) => String(property) }),
    Logo: { src: "data:image/png;base64," + logo.toString("base64") },
    Link: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.createElement("a", props, children),
    Image: ({ src, ...props }: { src: { src: string }; alt?: string; width?: number; loading?: "eager" | "lazy" }) => React.createElement("img", { ...props, src: src.src }),
  };
  const renderModule = (source: string, extra: object = {}) => {
    const withoutImports = source.replace(/^import .*;\r?\n/gm, "");
    const compiled = ts.transpileModule(withoutImports, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const moduleExports: { default?: React.ComponentType<{ showProfile?: boolean; showLogout?: boolean }> } = {};
    runInNewContext(compiled, { exports: moduleExports, ...bindings, ...extra,
      require: (id: string) => { if (id !== "react/jsx-runtime") throw new Error("Unexpected fixture import"); return jsxRuntime; } });
    if (!moduleExports.default) throw new Error("Presentation fixture export missing");
    return moduleExports.default;
  };
  const UserProfile = renderModule(profile);
  const TopBar = renderModule(topBar, { UserProfile });
  // jsx/jsxs use the actual React JSX runtime (provided below by the caller's
  // module), while all presentation imports remain bounded synthetic adapters.
  const markup = renderToStaticMarkup(React.createElement(TopBar, { showProfile: true, showLogout: true }));
  const css = preflight + globals.replace(/^@import[^;]+;\s*/m, "") + shellCss;
  const utilities = ".w-12{width:3rem}.h-12{height:3rem}.flex{display:flex}.items-center{align-items:center}.justify-center{justify-content:center}.rounded-full{border-radius:9999px}.font-bold{font-weight:700}";
  const html = '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><style>:root{--font-poppins:Arial}' + css + utilities
    + '</style></head><body><div class="shell">' + markup + '<main id="application-content" class="content"><p>Conteúdo sintético para medição</p></main></div></body></html>';
  return { html, sources: Object.fromEntries(paths.map((path, i) => [path, createHash("sha256").update([topBar, profile, shellCss, globals, preflight][i]).digest("hex")])), fontFixture: "Arial; observed CDP fonts recorded, not Poppins equivalence" };
}
