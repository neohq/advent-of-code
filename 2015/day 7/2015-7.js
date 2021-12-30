const fs = require('fs');
const path = require('path');
const { toUnicode } = require('punycode');

/**
 * Convert input
 */
 let DATA = [];
{
  const input = fs.readFileSync(
    path.resolve(__dirname, './2015-7-input.txt'), 
    { encoding: 'utf8', flag: 'r' },
  );
  const rows = input.split('\n');

  for (const row of rows) {
    const split = row.split(' ');

    const action = split.find(
      (el) => ['NOT', 'AND', 'OR', 'LSHIFT', 'RSHIFT'].includes(el),
    );

    DATA.push({
      action: action ?? 'SET',
      info: split,
    });
  }
}

console.log(DATA);

const uint16 = (val) => {
	return 0xFFFF0000 | val;
}

/**
 * Part One
 */
{
  // TODO: Implement
}

/**
 * Part Two
 */
{
  // TODO: Implement
}