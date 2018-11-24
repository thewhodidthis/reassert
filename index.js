'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// # Tapeling
// TAP utils for sleepyheads

const padLeft = message => `  ${message}`;
const contains = text => q => text && text.search(RegExp(q, 'i')) >= 0;
const { log } = console;

// Format error yaml
const getErrorBlock = (error) => {
  const scoop = ['operator', 'expected', 'actual'].map(k => `${k}: ${JSON.stringify(error[k])}`);
  const stack = error.stack.split('\n').map(padLeft);

  return ['---', ...scoop, 'stack:', ...stack, '...'].map(padLeft).join('\n')
};

// Conditionally lay message on top of template for logging
const echo = (template, message) => (message ? echo(log(template, message)) : echo);

// Collect stats
const data = { test: 0, pass: 0, fail: 0, skip: 0 };

// Hide once a test's been called
Object.defineProperty(data, 'head', {
  configurable: true,
  get() {
    return this.test ? '' : 'TAP version 13'
  }
});

const exit = (exitCode) => {
  echo('%s', data.head);

  if (exitCode) {
    echo('Bail out! Exit with code %s', exitCode);
  } else {
    if (data.test || data.head) {
      log(`\n1..${data.test}\n# tests ${data.test}`);
    }

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
  test(...params) {
    let errorBlock;

    try {
      assert(...params);
    } catch (error) {
      errorBlock = getErrorBlock(error);
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
    const descriptionContains = contains(description);

    const isSkip = descriptionContains('# skip');
    const isTodo = descriptionContains('# todo');

    // Update totals
    data.skip += isSkip ? 1 : 0;
    data.fail += isSkip || isTodo || !errorBlock ? 0 : 1;
    data.pass += isSkip || errorBlock ? 0 : 1;
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
