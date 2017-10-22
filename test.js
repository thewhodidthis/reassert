'use strict'

const assert = require('assert')
const { tape, bill } = require('./')

const ok = tape(assert)
const eq = tape(assert.equal)

eq(typeof bill, 'function', '`bill` a function', 'exports as advertised')
eq(typeof tape, 'function', '`tape` a function')

ok(true, 'a-ok', 'will wrap')

// Falsy assertions are counted as flops
const pass = tape(undefined, 2)

pass(0, 'failing', 'will default')
pass(1, 'passing')

bill()
