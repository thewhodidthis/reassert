const assert = require('assert')
const { tape, exit } = require('./index.cjs')

const myStrictEqual = tape(assert.strict.strictEqual)
const myThrows = tape(assert.throws)

myStrictEqual
  .describe('`exit` a function')
  .test(typeof exit, 'function')
  .describe('`tape` a function', 'exports as advertised')
  .test(typeof tape, 'function')
  .test(2, 2)

// Description-less (anon)
myThrows.test(() => { throw Error })

tape(assert)
  .describe('a-ok', 'will wrap')
  .test(true)
  .tape(undefined)
  .describe('passing', 'done checking defaults')
  .test()
  .exit()
