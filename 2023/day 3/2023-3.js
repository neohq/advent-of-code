const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    path.resolve(__dirname, './2023-3-demo.txt'),
    // path.resolve(__dirname, './2023-3-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  DATA = input.split('\n');
  DATA.pop(); // Remove last element from the input empty line (empty line)
}

const isCharSymbol = (char) => Number.isNaN(Number(char)) && char !== '.';

let parNumbers = [];
let partNumbersSum = 0;
let rowIndex = 0;
let gears = {};

for (const row of DATA) {
  // console.log(`row: ${row}`);

  for (const match of row.matchAll(/\d+/g)) {
    const nr = match[0];
    const startIndex = match.index;
    const endIndex = startIndex + (nr.length - 1);

    const rowsIndexToCheck = [rowIndex-1, rowIndex, rowIndex+1];
    // console.log(`nr: ${nr} -`, 'rowsToCheck',  rowsToCheck);

    // Iterate over top, current & bellow rows
    for (const rowIndexToCheck of rowsIndexToCheck) {
      const rowToCheck = DATA[rowIndexToCheck];
      if (!rowToCheck) continue; // Ignore out of border rows
      // console.log(`  row: ${rowToCheck}`);

      // Start at -1 and end +1 to also check chars before and after the number
      // Prevent checking outside of row length
      const checkStart = Math.max(startIndex - 1, 0);
      const checkEnd = Math.min(endIndex + 1, rowToCheck.length);

      for (let i = checkStart; i <= checkEnd; i++) {
        const char = rowToCheck.charAt(i);
        // console.log(`    char ${i}: ${char}   ${isCharSymbol(char) ? '✓': ''}`);

        /**
         * Part One
         */
        if (isCharSymbol(char)) {
          // parNumbers.push(nr);
          partNumbersSum += Number(nr);
          // break; // TODO: If uncommenting this line produces different results then leave it uncommented for Part One
        }

        /**
         * Part Two
         */
        if (char === '*') {
          const gearPos = `r${rowIndexToCheck}-i${i}`;

          if (!gears[gearPos]) {
            gears[gearPos] = [Number(nr)];
          } else {
            gears[gearPos].push(Number(nr));
          }
        }
      }

    }
  }

  rowIndex++;
  // console.log('\n');
}

/**
 * Part One
 */
// console.log('Part number', parNumbers);
console.log('Part one:', partNumbersSum); // 520135


/**
 * Part Two
 */

// Filter out gears (*) with only one adjacent number
let gearsRatiosSum = 0;
Object.keys(gears).map((key) => {
  if (gears[key].length >= 2) {
    const gearRatio = gears[key].reduce((acc, val) => acc * val);
    gearsRatiosSum += gearRatio;
  }
})
console.log(`Part Two: ${gearsRatiosSum}`);
