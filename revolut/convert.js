const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { capitalize } = require('lodash');
const Big = require('big.js');

const readFilePath = path.resolve(__dirname, './revolut-transactions.csv');
const outputFilePath = path.resolve(__dirname, './output.txt');

/*
2020-08-31,	Buy,	TSLA,	5.4,	$455.89,	$0.00,	1.0
2020-08-31	Buy	TSLA	2.6	$469.12	$0.00	1.0
2020-11-18	Sell	TSLA	8.0	$455.26	$0.09	1.0
 */

fs.writeFileSync(outputFilePath, '');

const input = fs.readFileSync(readFilePath, { encoding: 'utf8', flag: 'r' });
const split = input.split('\n');

for (const [index, line] of split.entries()) {
  let [
    date,
    stock,
    action,
    quantity,
    price,
    totalAmount,
  ] = line.split(',');

  if (!['BUY', 'SELL'].includes(action)) continue;

  date = moment(date, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD');
  action = capitalize(action);
  const calculatedTotalAmount = new Big(quantity).times(price).toFixed(2);
  const fee = new Big(calculatedTotalAmount).minus(totalAmount).toFixed(2);

  const rowToWrite = `${date}\t${action}\t${stock}\t${quantity}\t$${price}\t$${fee}\t1.0\n`;

  fs.appendFileSync(outputFilePath, rowToWrite);
}



