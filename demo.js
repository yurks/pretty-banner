var banner = require('./index.js');
var pkg = require('./package.json');

console.log('banner.code(pkg):', '\n'+banner.code(pkg));
console.log('banner.code(pkg, true):', banner.code(pkg, true));
console.log('banner.html(pkg):', banner.html(pkg));
console.log('banner.meta(pkg):', banner.meta(pkg));