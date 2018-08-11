function Person(saying) {
  this.saying = saying;
}

Person.prototype.talk = function() {
  return `my prhase is ${this.saying}`;
};

const person = new Person('hi!');

console.log(person.talk());