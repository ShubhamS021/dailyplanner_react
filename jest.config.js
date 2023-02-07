module.exports = {
    moduleNameMapper: {
        '^.\\.(css|less|scss)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
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
}
