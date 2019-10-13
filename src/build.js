const arr = [];
const any = '(\\d|[1-8]\\d|9\\d|1\\d{2}|2[0-4]\\d|25[0-5])'; // (0-255)

arr.push('::1?'); // unspecified and ipv6 local loopback
arr.push('(.*\\.)?localhost'); // special hostnames
arr.push(`((0|10|127)(\\.${any}){3})`); // 0.x.x.x | 10.x.x.x | 127.x.x.x
arr.push(`((192\\.168|169\\.254|(172\\.(1[6-9]|2\\d|3[01])))(\\.${any}){2})`); // 192.168.x.x | 169.254.x.x | 172.(16-31).x.x

console.log(
	'\nCopy the new RegExp pattern and paste it into "src/index.js" file:\n\n',
	new RegExp(`^(${ arr.join('|') })$`, 'i') + '\n'
);
