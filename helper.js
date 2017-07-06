const vm = require('vm');

const pairsFull = [
  '[]', '()', '{}',
  '][', ')(', '}{',
  '<>', '/\\',
  '  ',
  ['<<', '>>'],
  ['>>', '<<'],
  '><', '\\/',
  '<>', '/\\',
  ['""', '""'],
  ["''", "''"],
  ['\\\\', '//'],
  '++', '--', '**',
  '!!',  '^^', '~~',
  '==', '||',
  '..', '::',
  '00', '88',
  ['"b"', '"d"'],
  ['"d"', '"b"'],
  ['"p"', '"q"'],
  ['"q"', '"p"'],
  ['"o"', '"o"'],
  ['"v"', '"v"'],
  ['"w"', '"w"'],
  ['"x"', '"x"'],
  ['"A"', '"A"'],
  ['"H"', '"H"'],
  ['"I"', '"I"'],
  ['"M"', '"M"'],
  ['"O"', '"O"'],
  ['"T"', '"T"'],
  ['"U"', '"U"'],
  ['"V"', '"V"'],
  ['"W"', '"W"'],
  ['"X"', '"X"'],
  ['"Y"', '"Y"']
];

const spaces = '               ';
const cache = {};

function create() {

  let output = '';
  const length = Math.floor(Math.random() * 8 + 2);
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

  if (typeof x != "string") { return; }

  for (var c of "("){
    if (
      x[i=0] == c ||
      x[i=1] == c ||
      x[i=2] == c ||
      x[i=5] == c ||
      x[i=7] == c ||
      x[i=8] == c ||
      x[i=16] == c
    ) {
      console.log(output + c + " (" + x+ ") [" + i + "]");
    }
  }}

while (true){
  create();
}