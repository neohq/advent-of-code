const fs = require('fs');
const path = require('path');

let INPUT;
{
  INPUT = fs.readFileSync(
    path.resolve(__dirname, './2015-3-input.txt'), 
    { encoding: 'utf8', flag: 'r' },
  );
}

/**
 * Part One
 */
{
  let y = 0; // Up/down
  let x = 0; // Left/right
  const houseCoordinates = new Set();

   // Push first house
   houseCoordinates.add(`0,0`);

  for (let i = 0; i < INPUT.length; i++) {
    const char = INPUT.charAt(i);
    
    if (char === '^') ++y;
    if (char === 'v') --y;

    if (char === '>') ++x;
    if (char === '<') --x;

    // if (i < 100) {
    //   console.log(`${i} || ${char} || ${y}${x}`);
    // }

    houseCoordinates.add(`${y},${x}`);
  }

  // console.log(houseCoordinates);
  console.log(`Houses: ${houseCoordinates.size}`);
}

/**
 * Part Two
 */
{

}


