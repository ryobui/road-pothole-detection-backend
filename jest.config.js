module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@common/(.*)$': '<rootDir>/src/common/$1',
        '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
        '^@modules/(.*)$': '<rootDir>/src/modules/$1',
        '^@jobs/(.*)$': '<rootDir>/src/jobs/$1',
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    },
};
