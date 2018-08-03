const dog = {
  sound: 'woooof',
  talk: function() {
    console.log(this.sound);
  }
};

const button = document.querySelector('[data-js="my-nice-button"]');

button.addEventListener('click', dog.talk.bind(dog));
/* 
- Agora, o que foi passado como callback para o evento não foi o  
método puro do objeto, mas sim uma nova função, que limita  
o this para o objeto dog 
*/