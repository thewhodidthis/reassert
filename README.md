## about

Helps gather [TAP](https://testanything.org) reports. Combines with [likewise](https://npm.im/likewise) in [tapeless](https://npm.im/tapeless) for basic unit testing.

## setup

Download from the _npm_ registry:

```sh
# Add to package.json
npm install tapeling --save-dev
```

Source from an import map to use with Deno or in-browser directly:

```json
{
  "imports": {
    "tapeling": "https://cdn.jsdelivr.net/npm/tapeling@latest/main.js"
  }
}
```

## usage

Assuming a test function that throws if a given operation fails as for example,

```js
// Check for sameness or equality
function throwsIfDifferent(a, b, message = "Sorry!") {
  const result = Object.is(a, b)

  if (!result) {
    const error = Error(message)

    error.operator = "is"
    error.expected = a
    error.actual = b

    throw error
  }

  return result
}
```

Wrap with `tape()` and call `exit()` to print out the corresponding TAP report. For example,

```js
import { exit, tape } from "tapeling"

const test = throwsIfDifferent
const assert = tape(test)

assert
  // Fails
  .test(2, 3)
  // Name test case, add diagnostic
  .describe("is same", "will compute")
  // Passes
  .test(2, 2)

// Print totals
process.on("exit", exit)
```

Sample output with truncated error stack:

```console
TAP version 13
not ok 1 - throwsIfDifferent
  ---
  operator: "is"
  expected: 2
  actual: 3
  stack:
    Error: Sorry!
        at throwsIfDifferent
  ...
ok 2 - is same
# will compute

1..2
# tests 2
# pass  1
# fail  1
```

In Node.js all of [`assert`](https://nodejs.org/api/assert.html) may be wrapped a-la [tapjs/tapsert](https://github.com/tapjs/tapsert) making a range of involved checks available. For example,

```js
import axxert from "assert"
import process from "process"
import { exit, tape } from "tapeling"

// Print out results once the script is done
process.on("exit", exit)

const assert = tape(axxert)

for (const x in axxert) {
  if (x !== "CallTracker" || x !== "AssertionError") {
    assert[x] = tape(axxert[x])
  }
}

/*
TAP version 13
ok 1 - ok

1..1
# tests 1
# pass  1
*/
assert.test(typeof assert, "function")
```

## see also

- [likewise](https://github.com/thewhodidthis/likewise)
- [tapeless](https://github.com/thewhodidthis/tapeless)
