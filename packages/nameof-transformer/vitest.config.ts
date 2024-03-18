// Copyright 2024 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import typescript from "rollup-plugin-typescript2";
import { defineConfig } from "vitest/config";

export default defineConfig({
	esbuild: false,
	plugins: [
		typescript({
			tsconfig: "./tests/tsconfig.json"
		})
	],
	test: {
		include: ["./tests/**/*.ts"],
		exclude: ["./tests/**/I[A-Z]*.ts"],
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "lcov"],
			exclude: ["**/index.ts", "**/models/**/*.ts"]
		}
	}
});
