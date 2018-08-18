const animals = [
  {name: 'Fluffkins', species: 'rabbit'},
  {name: 'Caro', species: 'dog'},
  {name: 'Harold', species: 'fish'},
  {name: 'Ursula', species: 'cat'},
  {name: 'Hamilton', species: 'dog'},
  {name: 'Jimmy', species: 'fish'}
];

const isDog = item => item.species === 'dog';
const dogs = animals.filter(isDog);

console.log(dogs);
/*
[ { name: 'Caro', species: 'dog' }, { name: 'Hamilton', species: 'dog' } ]
*/