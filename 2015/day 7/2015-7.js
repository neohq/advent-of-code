const fs = require('fs');
const path = require('path');

// const uint16 = (val) => {
// 	return 0xFFFF0000 | val;
// }

function uint16(v) {
  return v & 0xFFFF;
}

function int16(v) {
  return (v << 16) >> 16;
}

/**
 * Convert input
 */
 let DATA = [];
{
  const input = fs.readFileSync(
    // path.resolve(__dirname, './2015-7-demo-input.txt'),
    path.resolve(__dirname, './2015-7-input.txt'),
    { encoding: 'utf8', flag: 'r' },
  );
  const rows = input.split('\n');

  for (const row of rows) {
    const split = row.split(' ');

    const action = split.find(
      (v) => ['NOT', 'AND', 'OR', 'LSHIFT', 'RSHIFT'].includes(v),
    );

    DATA.push({
      action: action ?? 'SET',
      logic: split,
    });
  }
}

/**
 * Part One
 */
{
  const wireValues = {};

  // let buffer = new ArrayBuffer(2);
  // let wireValues = new Int16Array(buffer);

  const setActionData = DATA.filter((v) => v.action === 'SET');
  // for (const data of setActionData) {
  //   const intNumber = Number(data.logic[0]);
  //   data.logic[0] = intNumber;
  // }
  console.log(setActionData);

  // Init values
  for (const { action, logic } of DATA) {
    if (action === 'SET') wireValues[logic[2]] = null;
    if (action === 'NOT') wireValues[logic[3]] = null;
    if (action === 'AND') wireValues[logic[4]] = null;
    if (action === 'OR') wireValues[logic[4]] = null;
    if (action === 'LSHIFT') wireValues[logic[4]] = null;
    if (action === 'RSHIFT') wireValues[logic[4]] = null;
  }

  const wiresWithValue = Object.entries(wireValues).filter(
    ([_, value]) => value !== null,
  );

  let stop = false;

  // while (wireValues['b'] === null) {
  for (let i = 0; i < 20; i++) {
    for (const { action, logic } of DATA) {
      if (action === 'SET') {
        const number = parseInt(logic[0], 10);
        if (!isNaN(number)) {
          wireValues[logic[2]] = uint16(number);
        } else {
          const wire = wireValues[logic[0]];
          if (wire) {
            wireValues[logic[2]] = uint16(wire);
          }
        }
      }

      if (action === 'NOT') {
        const wire = wireValues[logic[1]];
        if (wire) {
          wireValues[logic[3]] = uint16(~wire);
        }
      }

      if (action === 'AND') {
        const wireLeft = wireValues[logic[0]];
        const wireRight = wireValues[logic[2]];
        if (wireLeft && wireRight) {
          wireValues[logic[4]] = uint16(wireLeft & wireRight);
        }
      }

      if (action === 'OR') {
        const wireLeft = wireValues[logic[0]];
        const wireRight = wireValues[logic[2]];
        if (wireLeft && wireRight) {
          wireValues[logic[4]] = uint16(wireLeft | wireRight);
        }
      }

      if (action === 'LSHIFT') {
        // const lShiftValue = Number(logic[2]) || logic[2];
        const wire = wireValues[logic[0]];
        const lShiftValue = Number(logic[2]);

        if (wire) {
          wireValues[logic[4]] = uint16(wire << lShiftValue);
        }
      }

      if (action === 'RSHIFT') {
        // const rShiftValue = Number(logic[2]) || logic[2];
        const wire = wireValues[logic[0]];
        const rShiftValue = Number(logic[2]);
        if (wire) {
          wireValues[logic[4]] = uint16(wire >> rShiftValue);
        }
      }
    }
  }

  const emptyWires = Object.values(wireValues).filter((v) => v === null).length;
  const test = Object.entries(wireValues).filter(
    ([_, value]) => value !== null,
  );

  console.log(Object.fromEntries(test));
  console.log(test.length);
}

/**
 * Part Two
 */
{
  // TODO: Implement
}