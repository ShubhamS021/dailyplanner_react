module.exports = {
    roots: ['<rootDir>/src'],
    modulePaths: ['<rootDir>/src/'],
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
        'jsx',
        'scss',
        'css',
        'json',
        'node',
    ],
    moduleNameMapper: {
        '^.\\.(css|less|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    coverageReporters: ['text-summary', 'lcov'],
    coveragePathIgnorePatterns: [
        '<rootDir>/src/assets/',
        '<rootDir>/src/assets/svgs/',
        '<rootDir>/src/interfaces/',
        '<rootDir>/src/setupTests.ts',
        '<rootDir>/src/index.css',
        '<rootDir>/src/index.tsx',
        '<rootDir>/src/react-app-env.d.ts',
        '<rootDir>/src/reportWebVitals.ts',
        '<rootDir>/src/wdyr.js',
    ],
    collectCoverageFrom: [
        '!<rootDir>/src/theme/**',
        '!<rootDir>/src/assets/**',
        '!<rootDir>/src/interfaces/**',
        '!<rootDir>/src/types/**',
        '!<rootDir>/src/**/*/data/**',
        '!<rootDir>/src/**/*/interfaces/**',
        '!<rootDir>/src/**/*/types/**',
    ],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
        '.+\\.(svg|css|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
    },
    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        browsers: ['chrome', 'firefox', 'safari'],
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
