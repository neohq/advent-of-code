const fs = require('fs');
const path = require('path');

/**
 * Convert input
 */
let DATA = [];
{
  const input = fs.readFileSync(
    // path.resolve(__dirname, './2023-2-demo.txt'),
    path.resolve(__dirname, './2023-2-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  DATA = input.split('\n');
  DATA.pop(); // Remove last element from the input empty line (empty line)
}

// console.log(DATA);


/**
 * Part One
 */
{
  const match = {
    red: 12,
    green: 13,
    blue: 14,
  };
  let possibleGames = 0;

  for (const row of DATA) {
    let [game, sets] = row.split(':');
    game = game.split(' ')[1];
    const cubes = sets.match(/\d+\s(green|red|blue)/g);

    // console.log(game, cubes);

    let isSetValid = true;

    for (const cube of cubes) {
      const [nr, color] = cube.split(' ');

      if (nr > match[color]) {
        isSetValid = false;
        break;
      }
    }


    if (isSetValid) {
      possibleGames += Number(game);
    }
  }

  // console.log(`Possible games: ${possibleGames}`); // 2727
}

/**
 * Part Two
 */
{
  let finalNumber = 0;

  for (const row of DATA) {
    const sets = row.split(':')[1];
    const cubes = sets.match(/\d+\s(green|red|blue)/g);

    const gameColors = {
      red: 0,
      green: 0,
      blue: 0,
    }

    for (const cube of cubes) {
      const [nr, color] = cube.split(' ');

      if (Number(nr) > gameColors[color]) {
        gameColors[color] = Number(nr);
      }
    }

    // console.log(gameColors);

    const power = Object.values(gameColors).reduce((acc, val) => acc * val);

    finalNumber += power;
  }

  console.log(`Result: ${finalNumber}`);
}
