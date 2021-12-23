const fs = require('fs');
const path = require('path');

let DATA = [];
{
  const input = fs.readFileSync(path.resolve(__dirname, './day-5-input.txt'), { encoding: 'utf8', flag: 'r' });
  DATA = input.split('\r\n');
}

console.log(DATA)