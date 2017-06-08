const vm = require('vm');

const pairsFull = [
  '[]', '()', '{}',
  '][', ')(', '}{',
  '<>', '/\\',
  '><', '\\/',
  ['""', '""'],
  ["''", "''"],
  ['\\\\', '//'],
  '++', '--', '**',
  '!!',  '^^', '~~',
  '==', '||',
  '..', '::'
];

const spaces = '               ';
const cache = {};
let counter = 0;

function create() {

  let output = '';
  const length = Math.floor(Math.random() * 8 + 2);
  // const length = Math.abs(Math.sin(counter / 10)) * 5 + 2;
  const pairs = pairsFull.slice(0);

  for (var i=0; output.length < length * 2; i++){
    const index = Math.floor(Math.random() * pairs.length);
    const pair = pairs[index];
    if (pair){
      pairs[index] = null;
      output = pair[0] + output + pair[1];
    }
  }

  if (output.length > length * 2) {
    return;
  }

  if (cache[output]) {
    return;
  }

  cache[output] = true;

  let padding = spaces.substr(0, 13 - output.length / 2);
  output = padding + output + padding;

  let x;

  try {
    // x = vm.runInNewContext('( \n' + output + '\n )')
    eval(output)
    x = eval('( \n' + output + '\n )')
  } catch(e) {
    return
  }

  if (x !== 1) { return; }

  console.log(output + x);
  counter++;
}

while (true){
  create();
}