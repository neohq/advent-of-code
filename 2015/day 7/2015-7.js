const fs = require('fs');
const path = require('path');

function uint16(v) {
  return v & 0xFFFF;
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
  const wires = {};

  // Init wires with empty value
  for (const { action, logic } of DATA) {
    if (action === 'SET') wires[logic[2]] = null;
    if (action === 'NOT') wires[logic[3]] = null;
    if (action === 'AND') wires[logic[4]] = null;
    if (action === 'OR') wires[logic[4]] = null;
    if (action === 'LSHIFT') wires[logic[4]] = null;
    if (action === 'RSHIFT') wires[logic[4]] = null;
  }

  const handleWire = (wire) => {
    const number = parseInt(wire, 10);
    if (!isNaN(number)) {
      return number;
    } 

    const value = wires[wire];
    if (value !== null) {
      return value;
    }

    return null;
  }

  while (wires['a'] === null) {
    for (const { action, logic } of DATA) {
      if (action === 'SET') {
        const wire = handleWire(logic[0]);
        if (wire !== null) {
          wires[logic[2]] = uint16(wire);
        }
      }

      if (action === 'NOT') {
        const wire = handleWire(logic[1]);
        if (wire !== null) {
          wires[logic[3]] = uint16(~wire);
        }
      }

      if (action === 'AND') {
        const wireLeft = handleWire(logic[0]);
        const wireRight = handleWire(logic[2]);

        if (wireLeft !== null && wireRight !== null) {
          wires[logic[4]] = uint16(wireLeft & wireRight);
        }
      }

      if (action === 'OR') {
        const wireLeft = handleWire(logic[0]);
        const wireRight = handleWire(logic[2]);

        if (wireLeft !== null && wireRight !== null) {
          wires[logic[4]] = uint16(wireLeft | wireRight);
        }
      }

      if (action === 'LSHIFT') {
        const wireLeft = handleWire(logic[0]);
        const wireRight = handleWire(logic[2]);

        if (wireLeft !== null && wireRight !== null) {
          wires[logic[4]] = uint16(wireLeft << wireRight);
        }
      }

      if (action === 'RSHIFT') {
        const wireLeft = handleWire(logic[0]);
        const wireRight = handleWire(logic[2]);

        if (wireLeft !== null && wireRight !== null) {
          wires[logic[4]] = uint16(wireLeft >> wireRight);
        }
      }
    }
  }

  const wireValuesNotNull = Object.entries(wires).filter(
    ([_, value]) => value !== null,
  );

  // console.log(Object.fromEntries(wireValuesNotNull));
  // console.log(wireValuesNotNull.length);
  console.log(`"a" wire value: ${wires['a']}`);
}

/**
 * Part Two
 */
{
  /*
    1. inside input file replace "44430 -> b" with "3176 -> b" (which is "a" result from Part One)
    2. run the loop and find the new "a"
  */
}