class Mamal {
  constructor(sound) {
    this._sound = sound;
  }

  talk() {
    return this._sound;
  }
}

class Dog extends Mamal {
    constructor() {
      super('wooowwllllf!');
    }
}

const animal = new Dog();

animal._sound = 'meoooowwwth'; 

console.log(animal._sound);
// 'meoooowwwth'