const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    // path.resolve(__dirname, './2023-1-demo.txt'),
    // path.resolve(__dirname, './2023-1-demo2.txt'),
    path.resolve(__dirname, './2023-1-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  DATA = input.split('\n');
  DATA.pop(); // Remove last element from the input empty line
}

/**
 * Part One
 */
{
  let accumulator = 0;

  for (const row of DATA) {
    const numbersInRowArr = [];
    row.split('').map((char) => {
      if (!Number.isNaN(Number(char))) numbersInRowArr.push(Number(char));
    });
    const firstArrEl = numbersInRowArr.at(0);
    const lastArrEl = numbersInRowArr.at(numbersInRowArr.length - 1);

    accumulator += Number('' + firstArrEl + lastArrEl);
  }

  // console.log(`Sum of all calibration numbers: ${accumulator}`);
}

/**
 * Part Two
 */
{
  let accumulator = 0;
  const numbersMatch = {
    'one':    1,
    '1':      1,
    'two':    2,
    '2':      2,
    'three':  3,
    '3':      3,
    'four':   4,
    '4':      4,
    'five':   5,
    '5':      5,
    'six':    6,
    '6':      6,
    'seven':  7,
    '7':      7,
    'eight':  8,
    '8':      8,
    'nine':   9,
    '9':      9,
  }

  for (const row of DATA) {
    const numbersInRowArr = [];

    for (const key in numbersMatch) {
      for (const match of row.matchAll(new RegExp(key, 'g'))) {
        numbersInRowArr.push([match[0], match.index]); // ['two', 2]
      }
    }

    const sortedNumbersInRowArr = numbersInRowArr.sort((a, b) => {
      return a[1] - b[1];
    }).flatMap((arr) => arr[0]); // ['two', '2, 'three']

    const convertedNumbersInRowArr = [];
    for (const el of sortedNumbersInRowArr) {
      convertedNumbersInRowArr.push(numbersMatch[el]) // Convert 'two' in 2
    }


    const firstArrEl = convertedNumbersInRowArr.at(0);
    const lastArrEl = convertedNumbersInRowArr.at(convertedNumbersInRowArr.length - 1);

    accumulator += Number(`${firstArrEl}${lastArrEl}`);

    // console.log(numbersInRowArr, convertedNumbersInRowArr, Number('' + firstArrEl + lastArrEl));
  }

  console.log(`Sum of all calibration numbers: ${accumulator}`); // 53221
}
