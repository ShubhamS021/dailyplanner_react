/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import * as child from 'child_process';
import path from 'path';
import { defineConfig } from 'vite';
import vitePluginRequire from 'vite-plugin-require';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const commitHash = child.execSync('git rev-parse --short HEAD').toString();

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo: any) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    }
                    return `assets/${extType}/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
            },
        },
    },
    server: {
        port: 8080,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        include: ['src/**/*.spec.tsx', 'src/**/*.test.tsx'],
        coverage: {
            reporter: ['lcov', 'html'],
            provider: 'v8',
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: [
                'src/main.tsx',
                'src/i18n.ts',
                'src/reportWebVitals.ts',
                'src/setupTests.ts',
                'src/utils.ts',
                'src/vite-env.d.ts',
                'src/assets/**/*.ts',
                'src/**/interfaces/*.ts',
                'src/**/types/*.ts',
            ],
        },
    },
    plugins: [
        react({ exclude: ['cypress/**/*'] }),
        viteTsconfigPaths(),
        svgrPlugin(),
        vitePluginRequire({
            // @fileRegex RegExp
            // optional：default file processing rules are as follows
            // fileRegex:/(.jsx?|.tsx?|.vue)$/
            // Conversion mode. The default mode is import
            // importMetaUrl | import
            // importMetaUrl see https://vitejs.cn/guide/assets.html#new-url-url-import-meta-url
            // translateType: "importMetaUrl" | "import";
        }),
    ],
    define: {
        'import.meta.env.VITE_APP_VERSION': JSON.stringify(commitHash),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
