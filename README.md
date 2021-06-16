## about

Helps gather [TAP](https://testanything.org) reports. Combines with [likewise](https://npm.im/likewise) in [tapeless](https://npm.im/tapeless) for Node.js, Deno, or browser-side testing.

## setup

Download from the _npm_ registry:

```sh
# Add to 'package.json' development dependencies
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

## see also

- [likewise](https://github.com/thewhodidthis/likewise)
- [tapeless](https://github.com/thewhodidthis/tapeless)
