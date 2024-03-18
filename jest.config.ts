import {title, version} from './package.json'

export default {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    rootDir: "./test",
    testMatch: ["**/*.ts"],
    globals: {
        build: "test",
        title: title,
        version: version,
    }
}
