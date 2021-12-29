const fs = require('fs');
const path = require('path');

/**
 * Conver input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    path.resolve(__dirname, './2015-6-input.txt'), 
    { encoding: 'utf8', flag: 'r' },
  );
  const rows = input.split('\n');

  for (const row of rows) {
    const splitedRow = row.split(' ');

    let action;
    let from;
    let to;

    if (splitedRow[0] === 'toggle') {
      action = 'toggle';
      from = splitedRow[1].split(',');
      to = splitedRow[3].split(',');
    } else {
      action = splitedRow[1];
      from = splitedRow[2].split(',');
      to = splitedRow[4].split(',');
    }

    DATA.push({ action, from, to });
  }
}

// console.log(DATA);

/**
 * Part One
 */
{
  const lightsGrid = {};

  for (let x = 0; x <= 999; x++) {
    for(let y = 0; y <= 999; y++) {
      lightsGrid[`${x}:${y}`] = false;
    }
  }

  lightsGrid['999:999'] = true;

  // console.log(lightsGrid);
}