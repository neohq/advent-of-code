const fs = require('fs');
const path = require('path');

/*
  - L x W x H
  - 2*l*w + 2*w*h + 2*h*l
*/

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    path.resolve(__dirname, './2015-2-input.txt'), 
    { encoding: 'utf8', flag: 'r' },
  );
  const rows = input.split('\n');

  for (const row of rows) {
    const boxSize = row.split('x');

    DATA.push({
      l: boxSize[0],
      w: boxSize[1],
      h: boxSize[2],
    })
  }
}

const getSurfaceInfo = (l, w, h) => {
  const sideOne = 2*l*w;
  const sideTwo = 2*w*h;
  const sideThree = 2*h*l;

  const smallestSide = Math.min(...[
    sideOne / 2, sideTwo / 2, sideThree / 2,
  ]);

  return {
    surfaceWithSmallest: sideOne + sideTwo + sideThree + smallestSide,
    perimeterOfSmallest: 0,
  }
}

/**
 * Part one
 */
{
  let totalFt = 0;
  for (const box of DATA) {
    const boxSurface = getSurfaceInfo(box.l, box.w, box.h).surfaceWithSmallest;
    totalFt += boxSurface;
  }

  console.log(`Total surface of wrapping paper (ft): ${totalFt}`);
}

/**
 * Part two
 */
{

}








