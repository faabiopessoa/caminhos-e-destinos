module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.js$': 'babel-jest', // Transforma arquivos .js usando babel-jest
    },
    testMatch: [
        '**/tests/**/*.dbtest.test.js', // Procurando arquivos com sufixo .dbtest.js na pasta tests
        '**/?(*.)+(spec|test).js?(x)', // Inclui arquivos .spec.js ou .test.js também
    ],
};