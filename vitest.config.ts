/// <reference types="vitest" />
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        testTimeout: 60000,
        hookTimeout: 60000,
        setupFiles: './src/setupTests.ts',
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
    plugins: [],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
