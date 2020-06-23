const { ok } = require('assert')
const { tape, exit } = require('./index.cjs')

const test = tape(ok)

process.on('exit', exit)

test
  .describe('is true')
  .test(true)
  // Diagnostics attached
  .describe('# todo failing', 'don\'t count')
  .test(false)
  .describe('# todo passing', 'bonus')
  .test(true)
  .describe('fails on purpose')
  .test(undefined)
  .describe('# SKIP gets ignored', 'Failed, but doesn\'t count')
  .test(false)
  // No effect
  .exit()
