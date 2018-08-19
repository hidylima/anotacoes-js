const fs = require('fs');
const output = fs.readFileSync('./tests/data.txt', 'utf-8');

console.log(output);
/* 
<Buffer 6d 61 72 6b 20 6a 6f 68 61 6e 73 73 6f 6e 20 77 61 66 66 6c 65 20 69 72 6f 6e 20 38 30 20 32 0d 0a 6d 61 72 6b 20 6a 6f 68 61 6e 73 73 6f 6e 20 62 6c ... >
*/