const arr = [];
const any_0_to_255 = '(\\d|[1-8]\\d|9\\d|1\\d{2}|2[0-4]\\d|25[0-5])'; // (0-255)
const any_1_to_254 = '([1-9]|[1-8]\\d|9\\d|1\\d{2}|2[0-4]\\d|25[0-4])'; // (1-254)

arr.push('::1?'); // unspecified and ipv6 local loopback
arr.push('(.*\\.)?localhost'); // special hostnames
arr.push(`((0|10|127)(\\.${any_0_to_255}){3})`); // 0.x.x.x | 10.x.x.x | 127.x.x.x
arr.push(`((192\\.168|(172\\.(1[6-9]|2\\d|3[01])))(\\.${any_0_to_255}){2})`); // 192.168.x.x | 172.(16-31).x.x
arr.push(`(169\\.254\\.${any_1_to_254}\\.${any_0_to_255})`); // 169.254.(1-254).x

console.log(
	new RegExp(`^(${ arr.join('|') })$`, 'i')
);
