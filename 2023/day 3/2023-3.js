const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    path.resolve(__dirname, './2023-3-demo.txt'),
    // path.resolve(__dirname, './2023-2-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  DATA = input.split('\n');
  DATA.pop(); // Remove last element from the input empty line (empty line)
}

const isNumber = (value) => !Number.isNaN(Number(value));

/**
 * Part One
 */
{
  for (const row of DATA) {
    console.log(row);

    for (const match of row.matchAll(/\d+/g)) {
      console.log(match[0], row.indexOf(match[0]), row.lastIndexOf(match[0]));
    }

    for (let i = 0; i < row.length; i++) {
      const prevChar = row.charAt(i-1);
      const curChar = row.charAt(i);
      const nextChar = row.charAt(i+1);

      // let startNumberIndex = 0;
      // let endNumberIndex = 0;
      //
      // if (isNumber(curChar) && !isNumber(prevChar)) {
      //   startNumberIndex = i;
      // }
      //
      // if (isNumber(curChar) && !isNumber(nextChar)) {
      //   endNumberIndex = i;
      // }
      //
      // console.log(startNumberIndex, endNumberIndex);
    }
    console.log('\n');
  }
}
