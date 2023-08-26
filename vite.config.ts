/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import vitePluginRequire from 'vite-plugin-require';
import path from 'path';

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
        coverage: {
            reporter: ['lcov', 'html'],
            provider: 'v8',
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
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
