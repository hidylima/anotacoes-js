const animals = [
  {name: 'Fluffkins', species: 'rabbit'},
  {name: 'Caro', species: 'dog'},
  {name: 'Harold', species: 'fish'},
  {name: 'Ursula', species: 'cat'},
  {name: 'Hamilton', species: 'dog'},
  {name: 'Jimmy', species: 'fish'}
];

const animalsNames = animals.map(item => 
  ({prop1: item.name, prop2: item.species}));

console.log(animalsNames);