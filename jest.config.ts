import {title, version} from './package.json'

// noinspection JSUnusedGlobalSymbols
export default {
    preset: 'ts-jest',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    roots: ["./test"],
    testMatch: ['**/*.test.ts'],
    globals: {
        build: "test",
        title: title,
        version: version,
    }
}
