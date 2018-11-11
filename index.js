'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// # Tapeling
// TAP utils for sleepyheads

const padLeft = message => `  ${message}`;
const { log } = console;

// Format error yaml
const getErrorBlock = (error) => {
  const scoop = ['operator', 'expected', 'actual'].map(k => `${k}: ${JSON.stringify(error[k])}`);
  const stack = error.stack.split('\n').map(padLeft);

  return ['---', ...scoop, 'stack:', ...stack, '...'].map(padLeft).join('\n')
};

// Conditionally log message
const echo = (template, message) => (message ? echo(log(template, message)) : echo);

// Collect stats
const data = { test: 0, pass: 0, fail: 0, skip: 0 };

// Show only once
Object.defineProperty(data, 'head', {
  configurable: true,
  get() {
    return this.test ? '' : 'TAP version 13'
  }
});

const exit = (exitCode) => {
  // Print the bill
  echo('%s', data.head);
  echo('\n1..%d', data.test);

  if (exitCode) {
    echo('Bail out! Exit with code %s', exitCode);
  } else {
    echo('# tests %d', data.test);
    echo('# pass  %d', data.pass);
    echo('# fail  %d', data.fail);
    echo('# skip  %d', data.skip);
  }

  // Reset
  data.test = data.pass = data.fail = data.skip = 0;
};

const tape = (assert = v => v) => ({
  // Collect testline specifics
  describe(message, ...rest) {
    data.description = message;
    data.diagnostics = rest;

    return this
  },
  exit,
  tape,
  // Process testline
  test(...assertion) {
    let errorBlock;

    try {
      assert(...assertion);
    } catch (x) {
      errorBlock = getErrorBlock(x);
    }

    const { description = (assert && assert.name) || '(anon)', diagnostics = [] } = data;

    // Print header maybe
    echo('%s', data.head);

    // Print testline
    echo(`${errorBlock ? 'not ' : ''}ok ${data.test} - %s`, description);

    // Add error yaml
    echo('%s', errorBlock);

    // Add diagnostics
    for (const item of diagnostics) {
      echo('# %s', item);
    }

    // Look for directives
    const skip = description.search(/# skip/i) >= 0;
    const todo = description.search(/# todo/i) >= 0;

    // Update totals
    data.skip += skip ? 1 : 0;
    data.fail += skip || todo || !errorBlock ? 0 : 1;
    data.pass += skip || errorBlock ? 0 : 1;
    data.test += 1;

    // Reset
    delete data.diagnostics;
    delete data.description;
    delete data.head;

    return this
  }
});

exports.exit = exit;
exports.tape = tape;
