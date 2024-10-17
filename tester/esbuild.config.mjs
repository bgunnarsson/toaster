/**
 * @description Core node modules
 */
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import postcss from "postcss";
import os from "node:os";

/**
 * @description Build tools
 */
import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import alias from "esbuild-plugin-alias";
import autoprefixer from "autoprefixer";
import postcssPresetEnv from "postcss-preset-env";
import copyStaticFiles from "esbuild-copy-static-files";
import svgPlugin from "esbuild-plugin-svg";
// import purgecssPlugin2 from 'esbuild-plugin-purgecss-2';

/**
 * @description Global variables
 */

// HTTPS(SSL) certificate for local development
const platform = os.platform();
let globalNpmModules = path.resolve("/usr/local/lib/node_modules");
if (platform === "win32") {
	globalNpmModules = path.resolve(process.env.APPDATA, "npm", "node_modules");
}

// Current working directory
const CURRENT_DIR = process.cwd();

// Check if we are in production mode
const isProduction = process.env.NODE_ENV === "production";

const buildFolder = "./public/build";

/**
 * @description Options for esbuild, live-server and more related configurations.
 */
const options = {
	build: {
		metafile: true,
		entryPoints: ["src/scripts/scripts.ts", "src/styles/styles.scss"],
		outExtension: { ".js": ".min.js", ".css": ".min.css" },
		loader: {
			".woff": "file",
			".woff2": "file",
			".ttf": "file",
			".eot": "file",
			".svg": "file",
		},
		color: !isProduction,
		target: "es2017",
		logLevel: "info",
		bundle: true,
		sourcemap: isProduction,
		minify: isProduction,
		outdir: buildFolder,
		format: "esm",
		splitting: true,
	},
	styles: {
		type: "css",
		filter: /.(s[ac]ss|css)$/,
		cache: false,
		variables: {
			showMediaLabel: !isProduction,
		},
		precompile(source, isRoot) {
			// This works for vanillaks, react will need to inject a whole lot more stuff into both the root file and the .module.scss files.
			return isRoot
				? `$showMediaLabel: ${this.variables.showMediaLabel};\n${source}`
				: source;
		},
		async transform(source, resolveDir) {
			const { css } = await postcss([
				postcssPresetEnv({
					from: undefined,
					stage: false,
					preserve: true,
					debug: !isProduction,
					autoprefixer: true,
					browsers: ["last 2 versions"],
				}),
			]).process(source);
			return css;
		},
	},
	alias: {
		"@": path.resolve(CURRENT_DIR, "src"),
		assets: path.resolve(CURRENT_DIR, "src", "assets"),
	},
	copy: {
		src: "./src/assets",
		dest: buildFolder,
		dereference: true,
		errorOnExist: true,
		filter: (e) => {
			if (e.includes("/svg")) {
				return false;
			}
			return true;
		},
		preserveTimestamps: true,
		recursive: true,
	},
	devserver: {
		port: 9000, // Set the server port. Defaults to 8080.
		host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
		servedir: buildFolder,
		keyfile: path.resolve(globalNpmModules, "localcert", "localhostserver.key"),
		certfile: path.resolve(
			globalNpmModules,
			"localcert",
			"localhostserver.crt",
		),
	},
	plugins() {
		return [
			sassPlugin(this.styles),
			alias(this.alias),
			svgPlugin(),
			// purgecssPlugin2({
			//   content: glob.sync([
			//     '../Vettvangur.Site/Views/*.cshtml',
			//     '../Vettvangur.Site/Views/**/*.cshtml',
			//     "./src/scripts/*.ts",
			//     "./src/scripts/**/*.ts",
			//   ]),
			// }),
		];
	},
};

/**
 * @description Here, we are using live-server to serve the development files and watch for changes.
 * It is still WIP - there is a CORS error between live-server and IISEXPRESS.
 * When that is fixed, we can use this to serve the development files like we're used to now on localhost:9000
 */
if (!isProduction) {
	const args = process.argv.slice(2);
	const watch = args.includes("--watch") || args.includes("--servedir");

	const context = await esbuild.context({
		...options.build,
		plugins: [...options.plugins()],
	});

	if (watch) {
		await context.watch();
		const { host, port } = await context.serve(options.devserver);

		console.log("");
		console.log(`⚡ Ready on https://localhost:${port}/ ⚡`);
		console.log("");
	} else {
		context.rebuild();
		context.dispose();
	}
}

/**
 * @description Here, we are using esbuild to build the relevant files depending on what options are passed.
 */
await esbuild
	.build({
		...options.build,
		plugins: [...options.plugins(), copyStaticFiles(options.copy)],
	})
	.catch((err) => {
		console.log("");
		console.error("🚨 Error compiling styles & scripts! 🚨");
		console.error(err);
		process.exit(1);
	});
