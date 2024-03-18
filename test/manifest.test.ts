import {expect, test} from "@jest/globals"
import manifest from "../src/manifest"

test("build", () => expect(manifest.build).toBe("test"))
test("title", () => expect(manifest.title).toBe("Blast"))
test("version", () => expect(manifest.version).toBe("1"))