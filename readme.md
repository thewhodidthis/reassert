> Browser friendly tapification

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/tapeling
```

### Usage
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
