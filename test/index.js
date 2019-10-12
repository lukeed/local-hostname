const test = require('tape');
const lib = require('../dist/local');

test('exports', t => {
	t.is(typeof lib, 'function', 'exports a function');
	t.end();
});
