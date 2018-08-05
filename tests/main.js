function talk() {
  return this.sound;
}

let boromir = {
  blabber: talk,
  sound: 'One does not simply walk into Mordor'
};

let gollum = {
  jabber: boromir.blabber,
  /* 
  - O valor boromir.blabber é apenas uma referência à função  
  talk. É o mesmo que fazer jabber: talk.
  - Esse tipo de código da linha acima é terrível, nunca deve  
  ser feito em produção, mas apenas como material didático 
  */
  sound: 'My preciouuuus....'
};

console.log(gollum.jabber());