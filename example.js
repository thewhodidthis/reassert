import assert from "assert"
import process from "process"
import { exit, tape } from "./main.js"

process.on("exit", exit)

const test = tape(assert.ok)

test
  .describe("is true")
  .test(true)
  // Diagnostics attached
  .describe("# todo failing", "don't count")
  .test(false)
  .describe("# todo passing", "bonus")
  .test(true)
  .describe("fails on purpose")
  .test(undefined)
  .describe("# SKIP gets ignored", "Failed, but doesn't count")
  .test(false)
  // No effect
  .exit()
