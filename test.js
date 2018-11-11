const assert = require('assert')
const { tape, exit } = require('./')

const myTest = tape(assert.equal)
const myThrows = tape(assert.throws)

myTest
  .describe('`exit` a function', 'exports as advertised')
  .test(typeof exit, 'function')
  .describe('`tape` a function')
  .test(typeof tape, 'function')
  .test()

// Description-less (anon)
myThrows.test(() => { throw Error })

tape(assert)
  .describe('a-ok', 'will wrap', 'ie. why not?')
  .test(true)
  .tape(undefined)
  .describe('passing', 'done checking defaults')
  .test()
  .exit()
