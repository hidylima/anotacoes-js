const cat = {
  init: function(sound) {
    this.sound = sound;
  },
  makeSound: function() {
    console.log(this.sound);
  }
};

const mark = Object.create(cat);
mark.init('hi');
mark.makeSound();