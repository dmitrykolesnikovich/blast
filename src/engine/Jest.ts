import {expect} from "@jest/globals"

// https://stackoverflow.com/a/57428906/909169
export function expectArrayEquivalence<T>(actual: T[], expected: T[]) {
    expect(expected).toEqual(expect.arrayContaining(actual))
    expect(actual).toEqual(expect.arrayContaining(expected))
}
