function getOwnerName() {
  return this.ownerName;
}

const car = {
  model: 'A9',
  brand: 'Audi',
  ownerName: 'Roger Melo',
  getOwnerName
};

const car2 = {
  model: 'Silverado',
  brand: 'Chevrolet',
  ownerName: 'Vinícius',
  getOwnerName
};

const audiOwnerName = car.getOwnerName.bind(car);
const silveradoOwnwerName = car2.getOwnerName.bind(car2);

console.log(silveradoOwnwerName());