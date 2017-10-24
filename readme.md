> Browser friendly tapification

### Setup
```sh
# Fetch latest from github
npm i thewhodidthis/tapeling
```

### Usage
```js
import { tape, bill } from 'tapeling'

const equal = tape((a, b, msg) => {
  const ok = Object.is(a, b)

  if (!ok) {
    throw Error(msg)
  }

  return ok
})

// Passes
equal(2, 2, 'is equal', 'will compute')

// Throws
equal(2, 3, 'is equal')

// Report
bill()
```
