// # Tapeling
// TAP utils for sleepyheads

const { stringify } = JSON
const { log: echo } = console

// Stats
let tests = 0
let gains = 0

// First run maybe
let asleep = true

// Left pad helper
const snap = t => `  ${t}`

// Start here
const boot = (title) => {
  // Let first run carry the banner
  if (asleep && !tests) {
    asleep = echo('TAP version 13')
  }

  // Prepend test title if need be
  if (title) {
    echo('# %s', title)
  }
}

// Log results for each assert
const line = (title, x) => {
  // Hit or miss
  echo(`${x ? 'not ' : ''}ok %d - %s`, tests, title)

  // Pretty print exceptions
  if (x.stack !== undefined) {
    // In order of appearance
    const cargo = ['operator', 'expected', 'actual']
      // Drop empty keys
      .filter(k => (x[k] !== undefined ? k : false))
      // Prep contents incl. objects
      .map(k => `${k}: ${stringify(x[k])}`)

    // Reformat stack trace, pull everything together
    const stack = x.stack.split('\n').map(snap)
    const block = ['---', ...cargo, 'stack:', ...stack, '...'].map(snap).join('\n')

    echo(block)
  }
}

// Set stats, present outcome
const tick = tag => (x) => {
  gains += x ? 0 : 1
  tests += 1

  line(tag, x)
}

export const stat = () => ({ tests, gains, flops: tests ? tests - gains : 1 })

// Sum up
export const bill = (code) => {
  const { flops } = stat()

  // Header maybe
  boot()

  // Drop out maybe
  if (code) {
    echo('Bail out! Exit with code %d', code)
  } else {
    echo('')
    echo('1..%d', tests)
    echo('# tests %d', tests)

    if (gains > 0) {
      echo('# pass  %d', gains)
    }

    if (flops > 0) {
      echo('# fail  %d', flops)
    }
  }
}

// Tapify asserts
export const tape = (jack = (() => {}), size = jack.length) => (...args) => {
  // Attempt at extracting a description for given assert
  const mark = Math.max(size - 1, 0)
  const name = (mark < args.length && args[mark]) || jack.name
  const next = tick(name)

  // Name test case using first argument past description
  const head = size < args.length && mark && args[size]

  // Always
  boot(head)

  // Failed maybe
  let notOk = false

  try {
    jack(...args)
  } catch (e) { notOk = e }

  next(notOk)
}
