import assert from "assert"
import { exit, tape } from "tapeling"

const tapeStrictEqual = tape(assert.strict.strictEqual)

tapeStrictEqual
  .describe("`exit` a function")
  .test(typeof exit, "function")
  .describe("`tape` a function", "exports as advertised")
  .test(typeof tape, "function")
  .describe(null, "description defaults to assertion name")
  .test(2, 2)

const tapeThrows = tape(assert.throws)

// Description-less
tapeThrows.test(() => {
  throw Error
})

// Wrap whole of built in assertions module
tape(assert)
  .describe("a-ok", "will wrap")
  .test(true)
  .tape(undefined)
  .describe("passing", "done checking defaults")
  .test()
  .exit()
