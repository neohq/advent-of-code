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

/**
 * Part one
 */
{
  const getSurface = (l, w, h) => {
    const lwSide = 2*l*w;
    const whSide = 2*w*h;
    const hlSide = 2*h*l;
  
    const smallestSide = Math.min(...[
      lwSide / 2, whSide / 2, hlSide / 2,
    ]);
  
    const [smallestOne, smallestTwo] = [l, w, h]
      .sort((a, b) => a - b)
      .slice(0, 2);
  
    return lwSide + whSide + hlSide + smallestSide;
  }

  let totalPaper = 0;
  for (const box of DATA) {
    const boxSurface = getSurface(box.l, box.w, box.h);
    totalPaper += boxSurface;
  }

  console.log(`Total surface of wrapping paper (ft): ${totalPaper}`);
}

/**
 * Part two
 */
{
  const getPerimeter = (l, w, h) => {
    const [smallestOne, smallestTwo] = [l, w, h]
    .sort((a, b) => a - b)
    .slice(0, 2);


    const perimeter = (parseFloat(smallestOne) + parseFloat(smallestTwo)) * 2;
    const volume = l * w * h;

    return perimeter + volume;
  }

  let totalRibbon = 0;
  for (const box of DATA) {
    totalRibbon += getPerimeter(box.l, box.w, box.h);
  }

  console.log(`Total ribbon (ft): ${totalRibbon}`);
}








