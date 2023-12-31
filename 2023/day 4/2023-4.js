const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    // path.resolve(__dirname, './2023-4-demo.txt'),
    path.resolve(__dirname, './2023-4-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  DATA = input.split('\n');
  DATA.pop(); // Remove last element from the input empty line (empty line)
}

/**
 * Part One
 */
{
  let partOneResult = 0;
  const formattedData = [];

  for (const row of DATA) {
    const [_, numbers] = row.split(': ');
    let [winningNumbers, pool] = numbers.split(' | ');

    winningNumbers = winningNumbers.split(' ').filter((val) => val);
    pool = pool.split(' ').filter((val) => val);

    const intersection = winningNumbers.filter((val) => pool.includes(val));

    let acc = 0;
    for (let i = 0; i < intersection.length; i++) {
      if (i === 0) {
        acc = 1;
      } else {
        acc *= 2;
      }
    }

    formattedData.push({ winningNumbers, pool, intersection, acc });

    partOneResult += acc;
  }

  // console.log(formattedData);
  console.log(`Part One: ${partOneResult}`);
}
