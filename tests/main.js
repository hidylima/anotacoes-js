const cat = {
  init: function(sound) {
    this.sound = sound;
    return this;
  },
  
  makeSound: function() {
    return this.sound;
  }
};

const mark = Object.create(cat).init('meooowth!');

mark.makeSound();
// 'meooowth!'