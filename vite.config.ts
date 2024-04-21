/// <reference types="vite" />
import react from '@vitejs/plugin-react';
import * as child from 'child_process';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

const commitHash = child.execSync('git rev-parse --short HEAD').toString();

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
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
            sourcemap:
                process.env.VITE_ENVIRONMENT_NAME === 'dev' ||
                process.env.VITE_ENVIRONMENT_NAME === 'qa',
        },
        server: {
            port: 8080,
            host: '127.0.0.1',
        },
        plugins: [
            react({ exclude: ['cypress/**/*'] }),
            viteTsconfigPaths(),
            svgrPlugin(),
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
};
