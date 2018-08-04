let talk = function() {
  return this.sound;
}

let florencio = {
  says: talk,
  sound: 'woooonk'
};

console.log(florencio.says());
// 'woooonk'