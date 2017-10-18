'use strict'

const assert = require('assert')
const { tape, bill } = require('./')

const ok = tape(assert)
const eq = tape(assert.equal)

eq(typeof bill, 'function', '`bill` a function', 'exports as advertised')
eq(typeof tape, 'function', '`tape` a function')

ok(true, 'a-ok', 'will wrap')

bill()
