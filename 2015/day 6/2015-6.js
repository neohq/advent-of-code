const fs = require('fs');
const path = require('path');

/**
 * Convert input
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

    const splitCoordinates = (string) => {
      return string.split(',').map((x) => parseInt(x, 10));
    }

    if (splitedRow[0] === 'toggle') {
      action = 'toggle';
      from = splitCoordinates(splitedRow[1]);
      to = splitCoordinates(splitedRow[3]);
    } else {
      action = splitedRow[1];
      from = splitCoordinates(splitedRow[2]);
      to = splitCoordinates(splitedRow[4]);
    }

    DATA.push({ action, from, to });
  }
}

const key = (x, y) => `${x}:${y}`;

/**
 * Part One
 */
{
  const lightsGrid = {};

  // Create grid with off positions
  for (let x = 0; x <= 999; x++) {
    for(let y = 0; y <= 999; y++) {
      lightsGrid[key(x,y)] = false;
    }
  }

  for (const row of DATA) {
    const { from, to, action } = row;

    for (let x = from[0]; x <= to[0]; x++) {
      for (let y = from[1]; y <= to[1]; y++) {
        if (['on', 'off'].includes(action)) {
          lightsGrid[key(x,y)] = action === 'on';
        }
         if (action === 'toggle') {
          lightsGrid[key(x,y)] = !lightsGrid[key(x,y)];
        }
      }
    }
  }

  const onLights = Object.entries(lightsGrid).filter(
    ([key, value]) => value === true,
  );

  console.log('** Part One **');
  console.log(`- all lights: ${Object.keys(lightsGrid).length}`);
  console.log(`- on lights: ${onLights.length}`);
}

/**
 * Part Two
 */
{
  const lightsGrid = {};

  // Create grid with 0 brightness
  for (let x = 0; x <= 999; x++) {
    for(let y = 0; y <= 999; y++) {
      lightsGrid[key(x,y)] = 0;
    }
  }

  for (const row of DATA) {
    const { from, to, action } = row;

    for (let x = from[0]; x <= to[0]; x++) {
      for (let y = from[1]; y <= to[1]; y++) {
        if (action === 'on') {
          lightsGrid[key(x,y)] = lightsGrid[key(x,y)] + 1;
        }
        if (action === 'off') {
          lightsGrid[key(x,y)] = Math.max(0, lightsGrid[key(x,y)] - 1);
        }
        if (action === 'toggle') {
          lightsGrid[key(x,y)] = lightsGrid[key(x,y)] + 2;
        }
      }
    }
  }

  let lightsBrightness = 0;
  Object.values(lightsGrid).forEach((value) => {
    lightsBrightness += value;
  });

  console.log('** Part Two **');
  console.log(`- total brightness: ${lightsBrightness}`);
}
