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
    coveragePathIgnorePatterns: [
        '<rootDir>/src/assets',
        '<rootDir>/src/assets/svgs',
        '<rootDir>/src/interfaces',
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
