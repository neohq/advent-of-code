const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    path.resolve(__dirname, './2023-4-demo.txt'),
    // path.resolve(__dirname, './2023-4-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  DATA = input.split('\n');
  DATA.pop(); // Remove last element from the input empty line (empty line)
}

/**
 * Part One
 */
{
  const formattedData = [];
  let cardIndex = 1;
  for (const row of DATA) {
    const [_, numbers] = row.split(': ');
    const [winningNumbers, numbersPool] = numbers.split(' | ');
    // console.log(winningNumbers, '-', numbersPool);

    formattedData.push({ winningNumbers, numbersPool });
  }

  console.log(formattedData);
}
