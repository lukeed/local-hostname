const test = require('tape');
const check = require('../dist/local');

test.Test.prototype.local = function (val, bool) {
	const out = check(val);
	this.is(out, bool, `(${bool}) "${val}"`);
};

test('exports', t => {
	t.is(typeof check, 'function', 'exports a function');
	t.end();
});

test('unspecified', t => {
	t.local('::', true);
	t.local(':::', false);
	t.end();
});

test('ipv6 localhost', t => {
	t.local('::1', true);
	t.local('::2', false);
	t.end();
});

test('localhost special', t => {
	t.local('localhost', true);
	t.local('.localhost', true);
	t.local('foo.localhost', true);
	t.local('foo.bar.localhost', true);

	t.local('localhost1', false);
	t.local('.localhost1', false);
	t.local('123localhost', false);

	t.end();
});

test('127.0.0.0/8', t => {
	t.local('127.0.0.0', true);
	t.local('127.10.10.10', true);
	t.local('127.255.255.255', true);
	t.local('127.0.0.1', true);

	t.local('127.300.300.300', false);
	t.local('128.0.0.1', false);
	t.local('127...1', false);
	t.local('127.1', false);

	t.end();
});

test('10.0.0.0/8', t => {
	t.local('10.0.0.0', true);
	t.local('10.0.0.10', true);
	t.local('10.0.0.100', true);
	t.local('10.10.10.10', true);
	t.local('10.254.254.10', true);
	t.local('10.255.255.255', true);

	t.local('11.0.0.0', false);
	t.local('100.0.0.0', false);
	t.local('10.300.300.300', false);
	t.local('10.2550.0.1', false);
	t.local('10.254.0', false);

	t.end();
});

test('192.168.0.0/16', t => {
	t.local('192.168.0.0', true);
	t.local('192.168.255.255', true);
	t.local('192.168.0.1', true);

	t.local('192.167.0.0', false);
	t.local('192 168 255 255', false);
	t.local('192.168.0.300', false);
	t.local('193.168.0.1', false);

	t.end();
});

test('172.16.0.0/12', t => {
	t.local('172.16.0.0', true);
	t.local('172.24.255.0', true);
	t.local('172.31.255.255', true);
	t.local('172.31.0.99', true);

	t.local('172.32.0.0', false);
	t.local('172.160.0.0', false);
	t.local('172.16.0.256', false);
	t.local('173.168.0.1', false);
	t.local('172.15.0.0', false);

	t.end();
});

test('169.254.0.0/16', t => {
	t.local('169.254.1.0', true);
	t.local('169.254.1.255', true);
	t.local('169.254.254.255', true);
	t.local('169.254.254.100', true);
	t.local('169.254.254.0', true);

	// TODO: Maybe?
	// ~> Still "localhost" but reserved
	// t.local('169.254.255.0', false);
	// t.local('169.254.0.0', false);

	t.local('169.254.254.256', false);
	t.local('168.254.1.0', false);

	t.end();
});
