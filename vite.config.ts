/// <reference types="vite" />
import react from '@vitejs/plugin-react';
import * as child from 'child_process';
import path from 'path';
import { defineConfig } from 'vite';
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
                // manualChunks: (id) => {
                //     if (id.includes('node_modules')) {
                //         if (id.includes('@radix-ui')) {
                //             return 'vendor_radix_ui';
                //         }
                //         if (id.includes('@supabase')) {
                //             return 'vendor_supabase';
                //         }
                //         if (id.includes('react-beautiful-dnd')) {
                //             return 'vendor_atlassian';
                //         }

                //         return 'vendor'; // all other package goes here
                //     }
                // },
            },
        },
    },
    server: {
        port: 8080,
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
