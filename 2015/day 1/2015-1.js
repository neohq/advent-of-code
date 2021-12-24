const fs = require('fs');
const path = require('path');


let INPUT;
{
  INPUT = fs.readFileSync(
    path.resolve(__dirname, './2015-1-input.txt'), 
    { encoding: 'utf8', flag: 'r' },
  );
}

/**
 * Part One
 */
{
  let floor = 0;
  for (let i = 0; i < INPUT.length; i++) {
    const char = INPUT.charAt(i);
    
    if (char === '(') floor++;
    if (char === ')') floor--;
  }
  
  console.log(`Floor: ${floor}`);
}

/**
 * Part Two
 */
{
  let floor = 0;
  let firstBasementPosition = 0;
  for (let i = 0; i < INPUT.length; i++) {
    const char = INPUT.charAt(i);
    
    if (char === '(') floor++;
    if (char === ')') floor--;
    if (floor === -1) {
      firstBasementPosition = i + 1;
      break;
    }
  }
  
  console.log(`Position when he first entered basement: ${firstBasementPosition}`);
}
