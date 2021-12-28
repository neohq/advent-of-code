const md5 = require('md5');

const demoSecretKey = 'abcdef';
const secretKey = 'yzbqklnj';

/**
 * Part One
 */
{
  for (let i = 0; i < 1000000; i++) {
    const md5Hash = md5(`${secretKey}${i}`);
  
    if (md5Hash.slice(0, 5) === '00000') {
      console.log(`Starts with 5 zeros: ${i}`);
      break;
    }
  }
}

/**
 * Part Two
 */
{
  for (let i = 0; i < 100000000; i++) {
    const md5Hash = md5(`${secretKey}${i}`);
  
    if (md5Hash.slice(0, 6) === '000000') {
      console.log(`Starts with six zeros: ${i}`);
      break;
    }
  }
}

console.log('=== finish');
