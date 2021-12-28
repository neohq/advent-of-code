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
    let vowels = 0;
    for (const char of string.split('')) {
      if (['a', 'e', 'i', 'o', 'u'].includes(char)) vowels++;
    }

    // Rule 2
    let doubleLetter = 0;
    let prevChar = null;
    for (const char of string.split('')) {
      if (char === prevChar) doubleLetter++;
      prevChar = char;
    }

    // Rule 3
    const containsForbidden = ['ab', 'cd', 'pq', 'xy'].some(
      forbidden => string.includes(forbidden),
    );

    if (vowels >= 3 && doubleLetter >= 1 && !containsForbidden) {
      niceStrings++;
    }

    // console.log(vowels, doubleLetter, containsForbidden);
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
    let hasDuplicatePair = false;
    {
      const letterPairs = [];
      for (let i = 0; i < string.length; i++) {
        if (i === 0) continue;

        const pair = string.slice(i-1,i+1);

        // Delete from list because it overlaps, ex: "aaa" => [aa,aa]
        if (letterPairs[letterPairs.length - 1] === pair) {
          delete letterPairs[pair];
          console.log(`${string} - deleting overlap`);
          continue;
        }

        letterPairs.push(pair);
      }

      letterPairs.forEach((pair) => {
        if (letterPairs.includes(pair)) hasDuplicatePair = true;
      });
    }


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

    // console.log(string, letterPairs, containsOverlapPair, repeatingLettersBetween);

    if (hasDuplicatePair && repeatingLettersBetween) {
      niceStrings++;
    }
  }

  console.log(`Part Two - nice strings: ${niceStrings}`);
 }