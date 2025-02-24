import { keygen, newHttpClient } from "../test-utils"
import { randomUUID } from "crypto"
import { it, describe, expect, afterAll } from "@jest/globals"
import { SetCommand } from "./set"
import { ScanCommand } from "./scan"
const client = newHttpClient()

const { newKey, cleanup } = keygen()
afterAll(cleanup)
describe("without options", () => {
  it("returns cursor and keys", async () => {
    const key = newKey()
    const value = randomUUID()
    await new SetCommand(key, value).exec(client)
    const res = await new ScanCommand(0).exec(client)

    expect(res).toBeDefined()
    expect(res.length).toBe(2)
    expect(typeof res[0]).toBe("number")
    expect(res![1].length).toBeGreaterThan(0)
  })
})

describe("with match", () => {
  it("returns cursor and keys", async () => {
    const key = newKey()
    const value = randomUUID()
    await new SetCommand(key, value).exec(client)
    const res = await new ScanCommand(0, { match: key }).exec(client)

    expect(res).toBeDefined()
    expect(res.length).toBe(2)
    expect(typeof res[0]).toBe("number")
    expect(res![1].length).toBeGreaterThan(0)
  })
})

describe("with count", () => {
  it("returns cursor and keys", async () => {
    const key = newKey()
    const value = randomUUID()
    await new SetCommand(key, value).exec(client)
    const res = await new ScanCommand(0, { count: 1 }).exec(client)

    expect(res).toBeDefined()
    expect(res.length).toBe(2)
    expect(typeof res[0]).toBe("number")
    expect(res![1].length).toBeGreaterThan(0)
  })
})
