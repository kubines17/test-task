const fs = require('fs');
const List = require('./node_modules/prompt-list');
var list = new List({
  name: 'order',
  message: 'Select mode:',
  choices: [
    'Mode 1 outputs',
    'Mode 2 outputs',
    'Mode 3 outputs',
  ]
});

const inputArr = fs.readFileSync('input.txt').toString().split(/\r?\n/).slice(0, -1);
const patternArr = fs.readFileSync('patterns.txt').toString().split(/\r?\n/).slice(0, -1);

list.ask(function(answer) {
  for (let inputStr of inputArr) {
    for (let patternStr of patternArr) {

      if (answer === 'Mode 1 outputs') {
        if (patternStr === inputStr) {
          console.log(patternStr);
        }
      }

      if (answer === 'Mode 2 outputs') {
        if (~inputStr.indexOf(patternStr)){
          console.log(inputStr);
        }
      }

      if (answer === 'Mode 3 outputs') {
        const matchLen = inputStr.length - patternStr.length;
        let errQty = 0;
        if (matchLen <= 1 && matchLen >= -1) {
          let inputTemp = inputStr;
          for (let i in patternStr) {
            if (inputTemp[i] !== patternStr[i]) {
              errQty += 1;
              if (matchLen === 1) {
                let index = i;
                inputTemp = inputTemp.slice(0, i) + inputTemp.slice(++index, inputTemp.length);
              } else if (matchLen === -1) {
                inputTemp = inputTemp.slice(0, i) + ' ' + inputTemp.slice(i, inputTemp.length);
              }
            }
            if (errQty === 2) {
              break;
            }
          }
          if (errQty < 2) {
            console.log(inputStr);
          }
        }
      }

    }
  }
});