const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    // path.resolve(__dirname, './2015-8-demo-input.txt'),
   path.resolve(__dirname, './2015-8-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  DATA = input.split('\n');
}

/**
 * Part One
 */
{
  let total = 0;

  for (let row of DATA) {
    console.log(row);
    let stringChars = 0;
    const totalCodeChars = row.length;

    const escapedPattern = /\\"|\\\\/g;
    const escaped = row.match(escapedPattern);
    if (escaped) {
      stringChars += escaped.length;
      row = row.replace(escapedPattern, '');
    }

    const hexPattern = /\\x[\w]{2}/g;
    const hex = row.match(hexPattern);
    if (hex) {
      stringChars += hex.length;
      row = row.replace(hexPattern, '')
    }

    const quotesPattern = /"/g;
    const quotes = row.match(quotesPattern);
    if (quotes) {
      row = row.replace(quotesPattern, '');
      stringChars += row.length;
    }

    console.log({
      totalCodeChars,
      stringChars,
    }, '\n');

    total += totalCodeChars - stringChars;
  }

  console.log(`Total: ${total}`);
}

/**
 * Part Two
 */
{
  // Implement
}

