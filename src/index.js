const RGX = /^(::1?|(.*\.)?localhost|((0|10|127)(\.\d{1,3}){3})|((192\.168|(172\.(1[6-9]|2d|3[01])))(\.\d{1,3}){2})|(169\.254\.([1-9]|[1-8]\d|9\d|1\d{2}|2[0-4]\d|25[0-4])\.\d{1,3}))$/i;
export default RGX.test.bind(RGX);
