'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// # Tapeling
// TAP utils for sleepyheads

const { stringify } = JSON;
const { log: echo } = console;

// Stats
let tests = 0;
let gains = 0;

// Skip header if false
let firstRunMaybe = true;

// Left pad helper
const snap = t => `  ${t}`;

// Start here
const boot = (head) => {
  // Let first run carry the banner
  if (!tests && firstRunMaybe) {
    firstRunMaybe = echo('TAP version 13');
  }

  // Prepend test title if need be
  if (head) {
    echo('# %s', head);
  }
};

const stat = () => ({ tests, gains, flops: tests ? tests - gains : 1 });

// Sum up
const bill = (code) => {
  const { flops } = stat();

  // Header maybe
  boot();

  // Drop out maybe
  if (code) {
    echo('Bail out! Exit with code %d', code);
  } else {
    echo('');
    echo('1..%d', tests);
    echo('# tests %d', tests);

    if (gains > 0) {
      echo('# pass  %d', gains);
    }

    if (flops > 0) {
      echo('# fail  %d', flops);
    }
  }
};

// Log results for each assert
const roll = (hint, lost) => {
  // Hit or miss
  echo(`${lost ? 'not ' : ''}ok %d - %s`, tests, hint);
};

// Pretty print exceptions
const dump = (e) => {
  // In order of appearance
  const cargo = ['operator', 'expected', 'actual'].map(k => `${k}: ${stringify(e[k])}`);

  // Reformat stack trace, pull everything together
  const stack = e.stack.split('\n').map(snap);
  const block = ['---', ...cargo, 'stack:', ...stack, '...'].map(snap).join('\n');

  echo(block);
};

// Set stats, present outcome
const tick = hint => (x) => {
  // Would have liked to have used `x instanceof Error`,
  // but see for example https://github.com/mrdoob/three.js/issues/5886
  const lost = x && x.stack && x.message;

  gains += lost ? 0 : 1;
  tests += 1;

  roll(hint, lost);

  if (lost) {
    dump(x);
  }

  return !lost
};

// Tapify asserts
const tape = (jack = v => v, l) => (...args) => {
  const size = l || (jack && jack.length);
  const name = (jack && jack.name) || '(anon)';

  // Attempt at extracting a description for given assert
  const mark = Math.max(size - 1, 0);
  const hint = mark < args.length ? args[mark] : name;
  const next = tick(hint || name);

  // Name test case using first argument past description
  const head = size < args.length && mark && args[size];

  // Always
  boot(head);

  let score;

  try {
    score = jack(...args);
  } catch (e) {
    score = e;
  }

  return next(score)
};

exports.stat = stat;
exports.bill = bill;
exports.tape = tape;
