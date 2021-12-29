const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
 let DATA = [];
 {
   const input = fs.readFileSync(
     path.resolve(__dirname, './2015-5-input.txt'), 
     { encoding: 'utf8', flag: 'r' },
   );
   const rows = input.split('\n');
 
   for (const row of rows) {
     DATA.push(row);
   }
 }

 /**
  * Part One
  */
 {
  let niceStrings = 0;

  for (let string of DATA) {
    // Rule 1
    const hasAtLeastThreeVowles = string.match(/(.*[aeiou]){3}/g) !== null;

    // Rule 2
    const hasDoubleChars = string.match(/(.)\1{1,}/g) !== null;

    // Rule 3
    const containsForbidden = string.match(/(?:ab|cd|pq|xy)+/g) !== null;

    if (hasAtLeastThreeVowles && hasDoubleChars && !containsForbidden) {
      niceStrings++;
    }
  }

  console.log(`Part One - nice strings: ${niceStrings}`);
 }

 /**
  * Part Two
  */
 {
  let niceStrings = 0;

  for (let string of DATA) {
    // Rule 1
    let hasDuplicatePair = string.match(/(\w{2}).*?(\1)/g) !== null;

    // Rule 2
    let repeatingLettersBetween = false;
    {
      for (let i = 0; i < string.length - 1; i++) {
        if (i === 0) continue;
        const threeGroup = string.slice(i-1,i+2);
        
        if (threeGroup[0] === threeGroup[2]) {
          repeatingLettersBetween = true;
        }
      }
    }

    if (hasDuplicatePair && repeatingLettersBetween) {
      niceStrings++;
    }
  }

  console.log(`Part Two - nice strings: ${niceStrings}`);
 }