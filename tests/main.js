function talk() {
  console.log(this);
  console.log(this.sound);
}

const animal = {
  talk
};

animal.talk();