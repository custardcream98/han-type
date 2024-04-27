import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import autoprefixer from "autoprefixer"
import fs from "fs"
import path from "path"
import { dts } from "rollup-plugin-dts"
import styles from "rollup-plugin-styles"
import { swc } from "rollup-plugin-swc3"

const PACKAGE_ROOT_PATH = path.resolve(process.cwd(), "./packages")

const getRollupConfig = (packageFolderName) => {
  const packagePath = path.resolve(PACKAGE_ROOT_PATH, packageFolderName)

  const packageJson = require(path.resolve(packagePath, "package.json"))
  const { main, module, types } = packageJson
  const tsConfigJson = require(path.resolve(packagePath, "tsconfig.json"))
  const indexPath = path.resolve(packagePath, "src/index.ts")
  const isDevelopment = process.env.NODE_ENV === "development"
  const assetFileNames = isDevelopment ? "[name][extname]" : "[hash]"

  return [
    {
      external: [...Object.keys(packageJson.peerDependencies || {})],
      input: indexPath,
      output: [
        {
          dir: path.resolve(packagePath, main, "../"),
          exports: "named",
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: path.resolve(packagePath, "src"),
          sourcemap: !isDevelopment
        },
        {
          dir: path.resolve(packagePath, module, "../"),
          exports: "named",
          format: "esm",
          preserveModules: true,
          preserveModulesRoot: path.resolve(packagePath, "src"),
          sourcemap: !isDevelopment
        }
      ],
      plugins: [
        nodeResolve(),
        swc({
          exclude: "**/node_modules/**",
          jsc: { minify: { sourceMap: !isDevelopment } },
          minify: !isDevelopment,
          sourceMaps: !isDevelopment,
          tsconfig: path.resolve(packagePath, "tsconfig.json")
        }),
        styles({
          autoModules: true,
          mode: ["inject"],
          modules: {
            generateScopedName: isDevelopment
              ? "[name]_[local]__[hash:8]"
              : "[hash:8]"
          },
          plugins: [autoprefixer]
        }),
        commonjs()
      ]
    },
    {
      input: indexPath,
      output: [
        {
          file: path.resolve(packagePath, types),
          format: "esm"
        }
      ],
      plugins: [
        dts({
          tsconfig: path.resolve(packagePath, "tsconfig.json")
        })
      ]
    }
  ]
}

const packages = fs
  .readdirSync(PACKAGE_ROOT_PATH)
  .filter((name) => !name.includes("eslint") && !name.includes("vscode"))
const rollupConfigs = packages
  .map((packageFolderName) => getRollupConfig(packageFolderName))
  .flat()

export default rollupConfigs
