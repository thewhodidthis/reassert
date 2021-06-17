import process from "process"
import assert from "assert"
import { exit, tape } from "tapeling"

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
