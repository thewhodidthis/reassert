## about

Helps produce browser or Node.js compatible [TAP](https://testanything.org) reports.

## setup

Fetch the latest stable version from the _npm_ registry:

```sh
# Add to 'package.json' development dependencies
npm install tapeling --save-dev
```

## usage

For example,

```js
import { tape } from 'tapeling'

const equal = tape((a, b, msg) => {
  const ok = Object.is(a, b)

  if (!ok) {
    throw Error(msg)
  }

  return ok
})

equal
  // Name test case, add diagnostic
  .describe('is equal', 'will compute')
  // Passes
  .test(2, 2)
  // Throws
  .describe('is equal')
  .test(2, 3)
  // Print totals
  .exit()
```

## see also

- [likewise](https://github.com/thewhodidthis/likewise)
- [tapeless](https://github.com/thewhodidthis/tapeless)
