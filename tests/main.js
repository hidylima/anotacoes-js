const obj = {
  init: function(sound) {
    this.sound = sound;
    return this;
  },

  talk: function() {
    return this.sound;
  }
};

const obj2 = Object.create(obj).init('hi').talk();

console.log(obj2);