const fs = require('file-system')

const output = fs.readFileSync('./tests/data.txt', 'utf-8')
  .split(/\n/)
  .map(item => item.split(/\t/))

console.log(output)

/*
[ 
  [ 'mark johansson\twaffle iron\t80\t2', '' ],
  [ 'mark johansson\tblender\t200\t1', '' ],
  [ 'mark johansson\tknife\t10\t4', '' ],
  [ 'Nikita Smith\twaffle\tiron\t80\t1', '' ],
  [ 'Nikita Smith\tknife\t10\t2', '' ],
  [ 'Nikita Smith\tpot\t20\t3' ] 
]
*/
