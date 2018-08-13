const cat = {
  makeSound: function() {
    return this.sound;
  }
};

let ze = Object.create(cat); 

ze.sound = 'meeeeehhhhh';

console.log(cat.isPrototypeOf(ze)); 
// true
// o obj ze é uma cópia do obj cat