const { ok } = require('assert')
const { tape, bill } = require('./')

process.on('exit', bill)

const test = tape(ok)

test(true, 'is true')
test(undefined, 'fails on purpose')
