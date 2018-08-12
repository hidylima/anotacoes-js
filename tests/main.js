const cat = {
  breed: 'munchkin'
};

const myCat = {
  name: 'Fluffykins'
};

Object.setPrototypeOf(myCat, cat);

console.log(myCat.breed);