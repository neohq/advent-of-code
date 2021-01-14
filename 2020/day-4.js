const fs = require('fs');
const path = require('path');
const Joi = require('joi');

/**
 * Convert input to list of objects
 */

const DATA = [];
{
  // const input = fs.readFileSync(path.resolve(__dirname, './day-4-demo-input.txt'), { encoding: 'utf8', flag: 'r' });
  const input = fs.readFileSync(path.resolve(__dirname, './day-4-input.txt'), { encoding: 'utf8', flag: 'r' });
  const split = input.split('\n');

  let innerObj = {};
  for (const [index, line] of split.entries()) {
    
    if (line === '') {
      DATA.push(innerObj);
      innerObj = {};
      continue;
    }

    const row = line.split(' ');
    for (const data of row) {
      const [ name, value ] = data.split(':');
      innerObj[name] = value;
    }

    // Push last object since there is no " " to check for
    if (index === split.length - 1) {
      DATA.push(innerObj);
    }
  }
}

// Debug data
// console.log(DATA);

/**
 * Part One
 */

{
  let validPassports = 0;

  for (const passport of DATA) {
    const keys = Object.keys(passport);
    if(
      (!keys.includes('cid') && keys.length === 7) ||
      keys.length === 8
    ) {
      validPassports++;
    }
  }

  console.log(`Part one - valid passports: ${validPassports}`)
}

/**
 * Part Two
 */


{
  const hgtValidation = (value, helpers) => {
    const type = value.substr(-2);

    let valid = false;
    if (type === 'cm') {
      const [ number, _ ] = value.split('cm');
      valid = number >= 150 && number <= 193;
    }

    if (type === 'in') {
      const [ number, _ ] = value.split('in');
      valid = number >= 59 && number <= 76;
    }

    if (!valid) throw new Error('nope');
  }

  const validationSchema = Joi.object({
    byr: Joi.number().min(1920).max(2002),
    iyr: Joi.number().min(2010).max(2020),
    eyr: Joi.number().min(2020).max(2030),
    hgt: Joi.string().custom(hgtValidation),
    hcl: Joi.string().pattern(/^#[A-Fa-f0-9]{6}/),
    ecl: Joi.string().valid('amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'),
    pid: Joi.string().min(9).max(9),
    cid: Joi.optional(),
  });

  let validPassports = 0;

  for (const passport of DATA) {
    const keys = Object.keys(passport);

    if(
      (!keys.includes('cid') && keys.length === 7) ||
      keys.length === 8
    ) {
      const { _, error } = validationSchema.validate(passport);
      if (!error) {
        validPassports++;
      }
    }
  }

  console.log(`Part two - valid passports: ${validPassports}`)
}
