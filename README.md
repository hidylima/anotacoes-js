# ES6, ou ES2015
- É o novo grupo de features do JavaScript 

# Objetivos do ES6 
- Ser uma linguagem melhor para construir aplicações  
complexas
- Resolver problemas antigos do JavaScript 
- Facilitar o desenvolvimento de libraries /  
bibliotecas

# [Babel](http://babeljs.io/docs/en)
- Usado para que a maioria dos browsers suporte o ES6 
- Transpila / transforma código ES6 para ES5 

# Por que usar o Babel 
- Permite que eu use, **agora**, features novas do JavaScript! 
  - Roda no Node JS e no Browser 
  - Integra-se em praticamente todas as ferramentas (Gulp,  
  Grunt, Browsefy, etc)
- Compila o código cheio de features novas em um código de js  
'normal' (ES5)
- É uma boa maneira de ver o que está acontecendo, de maneira  
tradicional 

# Iniciando um projeto simples com o Babel 
- Estrutura de pastas inicial: 

![initial-folders](https://user-images.githubusercontent.com/29297788/43144746-3e8c09b0-8f34-11e8-8e14-685fc01c6798.jpg)

- Iniciando o npm: 
`npm init` e sim para todas as opções. Um package.json  
será criado na raiz

- Salvando o babel como dependência do projeto: 
`npm install babel-preset-env --save-dev`. Cria a pasta  
node_modules e lista o Babel como dependência de  
desenvolvimento no package.json

- Abrindo o index e escrevendo um código ES6: 
```javascript
let number = 1;

console.log(number);
```

- Para transpilar código, o Babel precisa de  
alguns [plugins](https://babeljs.io/docs/en/plugins/)

- Alterando o `.babelrc` para informar qual plugin  
será utilizado para fazer a conversão de código: 

```javascript
{
  "presets": ["env"]
}
// como o ES2015 será usado, o arquivo deve ficar assim 
```

- Concluindo a operação de transpile: `npx babel index.js -o index-compiled.js`
  - O comando pode ser traduzido da seguinte forma: Babel,  
  pegue o arquivo index.js e gere um output com o nome  
  index-compiled.js.

O que foi feito acima não é recomendado para aplicações  
reais, mas apenas uma forma rápida de se demonstrar a  
utilidade de transpilers.

Numa aplicação real uma recomendação seria utilizar o  
Webpack com o Babel.

# var x let 
- `var` tem escopo de função 
  - É acessível fora do parâmetro do for onde foi  
  declarada, por exemplo 
  - Deve ser usado em praticamente nenhuma ocasião 
- `let` tem escopo de qualquer bloco 
  - Não pode ser acessada fora de um if, por exemplo
  - Conserta o antigo problema causado pelo hoisting 
  - Funciona da forma esperada pela maioria dos  
  desenvolvedores
  - Deve ser usado apenas quando a variável precisa  
  ser atribuída 

Escopo do `var`: 

```javascript
function myFunction() {
  var num1 = 1;
  
  if(true) {
    var num2 = 2; // declarada dentro do if, mas pode ser acessada fora dele 
  }

  var num3 = num1 + num2;
}
``` 

```javascript
for(var counter = 0; counter <= 10; counter++) {
  console.log(counter);
}

console.log(counter); // é acessada fora do for 
// 11 
```

Escopo do `let`:

```javascript
function myFunction() {
  let num1 = 1;
  
  if(true) {
    let num2 = 2; // não é acessada fora do bloco onde foi declarada (if)
  }

  let num3 = num1 + num2;
}
```

# `let` x `const`
- `const` funciona de forma semelhante à `let`
  - Após sua criação, não permite que outro valor  
  seja reatribuído 
  - Não deixa a variável imutável, pois caso armazene  
  um objeto, as propriedades desse objeto podem ser  
  alteradas
  - Deve ser usada em todas as declarações de variáveis 

```javascript
let num1 = 90;
num1 = 89; // permite a reatribuição após ser declarada 

const num2 = 586;
num2 = 454; // TypeError: Assignment to constant variable.
```

```javascript
const obj = {
  prop1: 'olá',
  prop2: 'oi'
};

console.log(obj.prop1); // 'olá'

obj.prop1 = 'hello';

console.log(obj.prop1); // 'hello'
```

# Default parameters 
- No ES5, parâmetros de funções tem `undefined` como  
**valor** default, mas esse valor pode ser alterado 
- O ES6 introduziu uma forma mais simples e legível  
de fazer isso, basta atribuir o valor default na  
declaração do parâmetro desejado 
  - Isso faz com que a checagem no corpo da função  
  não seja mais necessária 
- Pequenas mudanças que trazem enormes benefícios 

Alterando o **valor** default de um parâmetro no ES5: 

```javascript
function multiply(num1, num2) {
  num2 = (typeof num2 === 'undefined') ? 2 : num2; 
  // o parâmetro recebe 2, caso não seja definido na invocação da função 
  
  return num1 * num2;
}

multiply(5); // 10 
multiply(5, 5); // 25
```

Alterando o **valor** default de um parâmetro no ES6: 

```javascript
const multiply = (num1, num2 = 2) => num1 * num2;
/*valor default atribuído na declaração do parâmetro */

console.log(multiply(5)); // 10
console.log(multiply(5, 5)); // 25
```

Referências: 
- [O Guia do ES6: TUDO que você precisa saber](https://medium.com/@matheusml/o-guia-do-es6-tudo-que-você-precisa-saber-8c287876325f)
- [MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Parametros_Predefinidos)
- [es6-features.org](http://es6-features.org/#DefaultParameterValues)
- [es6features](https://github.com/lukehoban/es6features)

# Rest parameters 
- Na versão ES5, é possível utilizar o objeto arguments para acessar  
todos os parâmetros de uma função 

```javascript
function getArguments() {
  return arguments;
}

console.log(getArguments('oi', 5, true));
// { '0': 'oi', '1': 5, '2': true }
```

```javascript
let sum = function() {
  let result = 0;

  for(var counter = 0; counter < arguments.length; counter++) {
    result += arguments[counter];
  }

  return result;
};

console.log(sum(5, 5, 80)); // 90
```

- Problemas do arguments 
  1. O objeto parece um array, mas não é
    1. Não aceita propriedades e métodos de array 
  2. Todos os argumentos da função são, automaticamente,  
  atribuídos ao arguments. Não há uma forma clara de  
  diferenciar os parâmetros 

Os rest parameters foram adicionados ao ES6 com esses  
problemas em mente. 
- Transforma os argumentos da invocação de uma função  
em um array 
- Reduz o código padrão induzido pelos argumentos 

Obtendo a quantidade de argumentos passados ao invocar  
a função: 

```javascript
const getArgumentsLength = (...theArgs) => {
  return theArgs.length; // theArgs é um array 
};

getArgumentsLength(5, 1, 9, 0, 9); // 5
```

2 formas de somar um número passado por argumento  
com um array de números: 

```javascript
const sum = (num1, ...numbers) => {
  let result = num1; // recebe o número do 1º argumento

  numbers.forEach(number => result += number);
  /* 
  O segundo parâmetro é um array de números. 
  para cada número desse array, result recebe  
  tudo que ela já tem + o item atual do array: 

  1ª passada: 9 + 1 = 10. 10 foi armazenado no result 
  2ª passada: 10 + 10 = 20. 20 foi armazenado no result 
  */
  return result;
};

console.log(sum(9, 1, 10)); // 20
```

```javascript
const sum = (num1, ...numbers) => 
  numbers.reduce((acc, act) => acc + act, num1);

console.log(sum(10, 10, 80, 50)); // 150
```

# arrow functions 
- Sintax sugar na criação de funções 
- São anônimas, a não ser que sejam atribuídas à uma  
variável 
- Quando possui apenas 1 parâmetro, o uso do  parênteses  
é desnecessário 
- Quando possui apenas uma instrução, o uso do `return`, `{}`  
e `;` é desnecessário, podendo ser escrita em apenas uma  
linha 
  - Essa linha única pode ser quebrada após o `=>`. Útil  
  quando a linha é extensa 
- Resolve um antigo problema da linguagem: o `this`

Sintaxe: 

```javascript
const functionName = (param1, param2) => {
  return ;
};
```

`this` sendo utilizado de forma errada, no ES5: 

```javascript
function widget() {
  var button = document.querySelector('[data-js="my-button"]');

  button.addEventListener('click', function() {
    this.doSomething(); 
    /* o this não aponta para 'widget' como esperado e provocará um erro */
  });
}
```

Com as arrow functions, o this aponta para o lugar esperado: 

```javascript
function widget() {
  var button = document.querySelector('[data-js="my-button"]');

  button.addEventListener('click', () => {
    this.doSomething(); 
    /* o this aponta para 'widget' como esperado e não provocará um erro */
  });
}
```

# destructuring 
- **É uma expressão que permite quebrar coisas (arrays e objetos) em partes (variáveis)** 
  - É possível, por exemplo, atribuir duas propriedades de um  
  objeto à duas variáveis, **em apenas uma declaração**
    - O objeto está sendo desestruturado em duas variáveis 
    - Ao se trabalhar com objetos, é necessário que as variáveis  
    possuam o mesmo nome das propriedades do objeto
- Foi criado para facilitar o tratamento dos objetos-opções 
  - Objetos-opções são, basicamente, objetos que são passados  
  como argumentos de funções. Ou seja, um único objeto que contém  
  várias propriedades 
  - Diminui muito o cumprimento do código 
- É possível que uma variável destructuring receba um valor  
default como parâmetro: `{myVar1 = 'value', myVar2}`
- É possível que os valores de duas variáveis sejam trocados 
- É possível combinar o retorno de funções com destructuring
  - É possível selecionar e ignorar valores que a função retorna 
    - É possível ignorar todos os valores que a função retorna 
- É possível combinar o retorno de uma expressão regular com destructuring
- Uso comum no `import` de libs 

- Referências 
  - https://www.youtube.com/watch?v=PB_d3uBkQPs
  - http://es6-features.org/#ArrayMatching
  - http://www.raphaelfabeni.com.br/es6-destructuring-assignment/?utm_content=buffera722f&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer
  - https://blog.taller.net.br/desmistificando-o-destructuring-do-javascript-es6es7/
  - https://medium.com/@osuissa/o-que-voce-deve-saber-sobre-a-desestruturacao-de-atribuicao-assignment-destructuring-no-es6-node-js-version-d4030b505850

Sintaxe em arrays: 

```javascript
const [myNumber, myString] = [83, 'hello!'];

myNumber; // 83
myString; // 'hello'
```

Sintaxe com rest parameters: 

```javascript
const [myNumber, ...myStringsArray] = [71, 'hello!', 'hi!', 'hey!'];

myNumber; // 71
myStringsArray; // ['hello!', 'hi!', 'hey']
```

Sintaxe com objetos: 

```javascript
let animal = {
  species: 'dog',
  weight: 40,
  sound: 'woof'
};

const {species, sound} = animal;

console.log(`The ${species} says ${sound}!`); 
// 'The dog says woof!'
/* 
as constantes recebem as propriedades do objeto, desde que tenham o mesmo nome 
*/
```

```javascript
makeSound({species: 'dog', weight: '39', sound: 'woof'});

/* Sem usar destructuring */
function makeSound(options) {
  console.log(`The ${options.species} says ${options.sound}`);
}
```

```javascript
/* 
- Usando a propriedade species como uma propriedade opcional no objeto 'options'. 
- Atribuindo um valor padrão à propriedade, caso ela seja undefined (não exista)
- Ainda sem usar destructuring 
*/
makeSound({weight: '39', sound: 'woof'});

function makeSound(options) {
  options.species = options.species || 'animal'; 
  
  console.log(`The ${options.species} says ${options.sound}`);
}

/* 
Problemas do código acima:
- Se esse tipo de sintaxe fizer parte de um sistema, o código fica enorme.
- Os problemas abordados nesse tipo de código também ficarão maior. 
- Há muitas repetições. options está sendo muito referenciada 
- Difícil leitura, devido às várias referências com 'options.species'
  - 'species' seria mais legível que 'options.species' ou 'options.sound' 
*/
```

```javascript
/* 
- Alguns dos problemas do código acima podem ser resolvidos sem  
destructuring, apenas declarando variáveis no topo da função. 
*/
makeSound({weight: '39', sound: 'woof'});

function makeSound(options) {
  const species = options.species || 'animal';
  const sound = options.sound;
  
  console.log(`The ${species} says ${sound}`);
}
/* 
- Ficou um pouco melhor, devido à legibilidade 
*/
```

```javascript
/* 
- Com destructuring, atribuindo um valor default à  
uma das variáveis que estão quebrando o objeto  
passado por argumento, DECLARANDO O DESTRUCTURING  
NO PARÂMETRO DA FUNÇÃO, o código fica menos verboso 
*/

function makeSound({species = 'dog', sound}) {
  console.log(`The ${species} says ${sound}.`);
}

makeSound({weight: '39', sound: 'woof'});
```

Trocando valores de variáveis: 

```javascript
let let1 = 'valor1';
let let2 = 'valor2';

[let1, let2] = [let2, let1];

/* 
a primeira variável, do primeiro array,  
recebe a primeira variável do segundo 
array 
*/

console.log(let1); // valor2

console.log(let2); // valor1
```

Combinando o retorno de funções com destructuring:

```javascript
function getArr() {
  return [89, 596, 185];
}

let a, b;

[a, b] = getArr();

console.log(a); // 89
console.log(b); // 596

// O terceiro item do array não foi passado na expressão de destructuring
``` 

Ignorando valores retornados por funções: 

```javascript
function getArr() {
  return [25, 37, 965];
}

const [num1, , num3] = getArr();

console.log(num1, num3); // 25 965

/* 
- Na expressão destructuring, o segundo item do array que 
a função retorna foi ignorado
*/
```

Ignorando todos os valores que uma função retorna: 

```javascript
function getArr() {
  return [25, 37, 965];
}

[, ,] = getArr();
```

Combinando o retorno de uma função + rest parameters: 

```javascript
function getArr() {
  return [25, 37, 965, 5896, 607, 222];
}

const [num1, num2, ...allNums] = getArr();

console.log(num1, num2, allNums);
// 25 37 [ 965, 5896, 607, 222 ]
```

Combinando um array retornado de uma expressão regular com destructuring + porções ignoradas:

```javascript
const url = 'https://www.youtube.com/playlist?list=FLdIqD5WPjBMMUEG7Vj3Alug';
const parsedUrl = /^(\w+)\:\/\/([^\/]+)\/(.*)$/.exec(url);

console.log(parsedUrl);
/* 
[ 'https://www.youtube.com/playlist?list=FLdIqD5WPjBMMUEG7Vj3Alug',
  'https',
  'www.youtube.com',
  'playlist?list=FLdIqD5WPjBMMUEG7Vj3Alug',
  index: 0,
  input: 'https://www.youtube.com/playlist?list=FLdIqD5WPjBMMUEG7Vj3Alug' ]
*/

const [, protocol, adress] = parsedUrl;

console.log(`O protocolo usado em '${adress}' é '${protocol}'`);
// O protocolo usado em 'www.youtube.com' é 'https'
```

Sintaxe no `import` de libs: 

```javascript
/* ES5 */
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var Router = ReactRouter.Router;

/* ES6 */
const {Route, Link, Router} = require('react-router');
/* 
as constantes recebem as propriedades do objeto importado, desde que tenham 
o mesmo nome 
*/
```

# Criação de Objetos em JavaScript 
- Não há 'a' maneira mais correta de se criar objetos e fazer  
orientação à objetos em JS 
- Lembrando que JS é a maior linguagem de programação do mundo 

```javascript
const dog = {
  name: 'Atlas',
  sound: 'woof',
  talk: function() {
    console.log(this.sound);
  }
};

dog.talk(); // woof

let talkFunction = dog.talk; 
// o método foi atribuído à uma variável 

talkFunction(); // undefined
/* 
- Ao invocar a variável que recebeu o método, undefined é retornado. 
  - É o tipo de exemplo que mostra como a orientação à objetos em JS  
  colide com sua orientação à funções 
*/
```

# `this`
- Palavra-chave que pode ser usada em funções 
- Assim como na lingua inglesa, `this` não tem significado, se não  
houver um contexto (exemplo 2)
  - "I don't like this"... 
    - Requer que o contexto do que está sendo conversado seja inferido 
- Referencia o **objeto global**, por default, caso esteja dentro de uma  
função (exemplo 3)
- Em linguagens totalmente orientadas à funções, o this não existe 
- Sua existência é crucial para que uma linguagem orientada à objetos,  
como o Java, funcione 
- Em funções, o `this` **não** referencia o contexto onde a função  
foi declarada, mas sim o contexto / objeto em que a função foi  
**invocada** 
  - No entanto, é possível usar o `bind` para referenciar o contexto  
  desejado

Exemplo de `this` retornando `undefined`: 

```javascript
const dog = {
  name: 'Atlas',
  sound: 'woof',
  talk: function() {
    console.log(this.sound);
  }
};

dog.talk(); // woof

let talkFunction = dog.talk; 
/* o método foi atribuído à uma variável, então, 'this' não corresponde  
e não está mais conectado ao objeto 'dog' */

talkFunction(); // undefined
/* 
- Ao invocar a variável que recebeu o método, undefined é retornado. 
  - É o tipo de exemplo que mostra como a orientação à objetos em JS  
  colide com sua orientação à funções 

- Ao atribuir um método que utiliza o this, à uma variável, ele NÃO  
É MAIS UM MÉTODO, mas sim uma função. Ele deixou de ser um método  
conectado à um objeto. Ele agora é apenas uma função aleatoria 
*/
```

exemplo 2: 

```javascript
function talk() {
  console.log(this.sound);
}

talk();
// undefined
```

exemplo 3:

```javascript
function talk() {
  console.log(this);
}

talk();
// Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
```

# `bind()`
- Ligar, vincular 
- Método que pega a função que foi desconectada de seu contexto  
original e a conecta novamente, ou a conecta à outro contexto  
desejado
- Força o `this` a referenciar o objeto especificado (exemplo 4)
  - **Cria uma cópia** da função que possui o `this` 
  - Nesta nova cópia, o this será limitado apenas ao objeto  
  especificado por parâmetro
  - Não altera a função original
- É uma maneira de explicitar o significado do `this`
- Frequentemente usado em JS 

Continuação do primeiro exemplo em `this`

```javascript
const dog = {
  name: 'Atlas',
  sound: 'woof',
  talk: function() {
    console.log(this.sound);
  }
};

let boundFunction = dog.talk.bind(dog);
// ligou novamente o contexto do método ao objeto dog

boundFunction(); // 'woof'
```

Exemplo com uma situação próxima ao real: 

```javascript
const dog = {
  sound: 'woooof',
  talk: function() {
    console.log(this.sound);
  }
};

let button = document.querySelector('[data-js="my-nice-button"]');

button.addEventListener('click', dog.talk);
/* 
- Ao clicar no botão, undefined é mostrado no console
- Quando o método é atribuído ao evento, o this dele não  
é mais o objeto dog, mas sim o objeto window 
*/ 
```

Problema do exemplo acima resolvido com o método bind()

```javascript
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
```

exemplo 4:

```javascript
function talk() {
  console.log(this.sound);
  // retorna undefined, pois o window object não possui a propriedade sound
}

let boromir = {
  sound: 'One does not so simply walk into mordor'
  // possui uma propriedade sound
};

let talkBoundToBoromir = talk.bind(boromir);
/* bind Criou uma cópia da função talk onde o this é limitado ao objeto */

talkBoundToBoromir();
// 'One does not so simply walk into mordor'
```

# Alterando o contexto do `this` sem utilizar o bind 
- Basta atribuir, à propriedade de um objeto, como referência,  
a função que tenha um `this` interno (exemplo 1)
  - Através deste exemplo, e do exemplo 3, fica claro que  
  funções em JS são apenas valores que podem ser passados,  
  da mesma forma que valores number, string, boolean ou  
  object
  - A função que foi atribuída como referência permanece  
  inalterada. Se chamada novamente, **fora do objeto**,  
  continua a retornar `undefined`, pois referencia o objeto  
  global, que não possui uma propriedade sound
- É importante saber que a propriedade que referencia a  
função que foi atribuída e a referência da função sem si,  
fora do objeto, estão ambas se referindo à mesma função.  
Não é uma cópia (exemplo 2)

exemplo 1:

```javascript
let talk = function() {
  return this.sound;
}

let florencio = {
  says: talk, 
  /* - A propriedade says agora referencia a função talk */
  sound: 'woooonk'
};

console.log(florencio.says()); // o que está à esquerda do método é o this!!!
// 'woooonk'
/* 
- Como says agora é um método, o JS automaticamente assume que  
o this dele será o próprio objeto 'florencio': 
florencio.says() retorna florencio.sound
*/
```

exemplo 2:

```javascript

/* ... */

console.log(dog.says === talk); // true
```

exemplo 3: 

```javascript
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
```

# `addEventListener()`
- Método que adiciona um evento à um elemento / objeto 
- Sempre irá buscar no objeto window o método ou função passada  
como parâmetro 
  - O método `bind()` é uma forma de resolver este problema 

# `class`
- Sintaxe amigável que define o estado e comportamento de objetos  
que representam abstrações usadas diariamente 
- `constructor()`
  - Faz a inicialização da instância do objeto, disponibilizando todas  
  as propriedades e métodos nele 
  - Funciona muito bem em casos onde, por exemplo, cada instância do  
  objeto possua as mesmas propriedades, mas os valores entre essas  
  propriedades são diferentes 
- `getters / setters`
  - Protegem os dados internos das instâncias dos objetos 
  - Possibilitam que os métodos sejam chamados como propriedades,  
  tornando desnecessário o uso de `()` na invocação 
    - Em setters, a sintaxe passa a usar o sinal de atribuição `=`
- Herança
  - Em casos onde as instâncias/objetos dessa classe devam ter um  
  novo comportamento
- `_property` convenção que indica que essa propriedade deve ser  
mantida como privada

Exemplo de class com constructor: 

```javascript
class Animal {
  constructor(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

  setName(name) {
    this._name = name;
  }
}

const animal = new Animal('cat');

console.log(animal); 
// {_name: 'cat'}

console.log(animal.getName());
// 'cat'

animal.setName('dog');

console.log(animal.getName());
// 'dog'
```

Exemplo reescrito com `getters / setters`: 

```javascript
class Animal {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name;
  }
}

const animal = new Animal('cat');

console.log(animal); 
// {_name: 'cat'}

console.log(animal.name);
// 'cat'

animal.setName = 'dog';

console.log(animal.name);
// 'dog'
```

# Atribuição de funções à propriedades de objetos com o mesmo nome 
- Em ES6, se a função que é atribuída como referência à propriedade  
possui o mesmo nome da propriedade, é possível omitir o nome da função  
(exemplo 1) 

exemplo 1:

```javascript
function talk() {
  console.log(this.sound);
}

const animal = {
  talk, // função talk atribuída! 
  sound: `wooooof!`
};

animal.talk(); // 'wooooof!'
```

# Prototype Basics 
- Em js, a herança é feita através de prototypes 
- **O que são** prototypes e suas diferenças entre classes de outras  
linguagens: 
  - Class 
    - São equivalentes à cópias de um blueprint de uma construção.  
    Um blueprint é usado para criar novas construções 
  - Prototype 
    - É equivalente à uma delegação. Quando o governo precisa  
    tomar uma decisão, ele irá questionar os delegados ao invés  
    de perguntar à milhões de pessoas o que elas estão pensando.  
    Ou seja, o Governo delegou a decisão aos seus delegados.
- **Por que usar prototypes**
  - É um simples e poderoso modelo de herança 
  - A palavra-chave `class`, em JS, é apenas uma fina camada  
  que envolve o prototype
    - Classes apenas usam o prototype por baixo dos panos 
  - É um conceito ainda mais simples que o conceito de classes 
- A adição da palavra-chave `class` na linguagem tem razões de  
adaptação para quem vem de outras linguagens 

# `Object.setPrototypeOf(obj1, obj2)`
- Especifica qual será o prototype de um objeto 
  - Conforme o título acima, `obj1` herdou os métodos e  
  propriedades do `obj2` (exemplo 1)
- **Nunca usar em código em produção**. É horrível para a  
performance da aplicação 
  - **Usar `Object.create()`**

exemplo 1:

```javascript
function talk() {
  console.log(this.sound);
}

const animal = {
  talk,
};

const cat = {
  sound: `meeeeoooowwww!`
};

Object.setPrototypeOf(cat, animal); 
/* 
- O protótipo de 'cat' agora é 'animal'
- 'cat' herdou propriedades e métodos de 'animal'
- 'cat' agora possui o método 'talk'
*/

cat.talk();
// 'meeeeoooowwww!'
// 'this', da função 'talk' agora é o objeto 'cat'
``` 

# A palavra chave `new`, aplicada à funções 
- A palavra chave `class` utiliza a técnica do exemplo 1, por baixo  
dos panos
  - `new` Cria um novo objeto, sem propriedades ou métodos 
  - O JS olha aonde foi declarado um novo `new`, checa o protótipo  
  desse novo objeto e seta o protótipo desse novo objeto que foi  
  criado para ser esse objeto 
  - Depois, olha novamente aonda `new` foi chamado, que é no construtor  
  (atribuído à let), invoca a função Person, mas irá invocá-la com o novo  
  objeto, que foi criado no passo 1, atribuído ao `this` da função  
  Person
  - Retorna para a let o novo objeto que foi criado 
- No exemplo 2, a palavra `new` não irá existir, mas será construída,  
como uma função 

exemplo 1: 

```javascript
function Person(saying) {
  this.saying = saying;
}

Person.prototype.talk = function() {
  console.log(`I say ${this.saying}`);
};

let person = new Person('hello!');

person.talk();
// 'I say hello!'
```

exemplo 2: 

```javascript
function Person(saying) {
  this.saying = saying;
  return {
    dumbObj: true
  };
}

Person.prototype.talk = function() {
  return `my prhase is ${this.saying}`;
};

function spawn(constructor) {
  let obj = {};
  Object.setPrototypeOf(obj, constructor.prototype);
  let argsArr = Array.prototype.slice.apply(arguments);
  return constructor.apply(obj, argsArr.slice(1)) || obj;
}

const person = spawn(Person, 'hi');

console.log('hello', person);
// console.log(person.talk());

/* 
  - Declarar uma função `new()`
  - Criar um novo objeto e atribuí-lo à uma let interna da função  
  - Setar o prototype do novo objeto, com o `Object.setPrototypeOf()`.  
  O protótipo do objeto será um `constructor`, passado por parâmetro 
  - Na invocação da função, `Person` é passada como um objeto  
  construtor. Lembrando que o método `talk` está atribuído ao  
  protótipo do objeto `Person`
  - Executar o `constructor` com o `this` setado ao novo objeto criado,  
  utilizando o `apply`, que é uma espécie de `bind()`, exceto pelo fato  
  que o `apply` executa a função imediatamente.  
    - O `apply` recebe como primeiro parâmetro o objeto a ser setado  
    como o `this`. O segundo parâmetro é um array dos argumentos a  
    serem invocados com a função 
    - No caso da função `Person`, será um array apenas com um item  
    (frase), que representa o parâmetro `saying`
    - É necessário que o segundo parâmetro seja dinâmico, então,  
    ele representará os argumentos que serão passados na invocação  
    da função construtora. Ou seja, isso pode ser feito com a  
    palavra-chave `arguments`. 
    - Lembrando que `new` é uma palavra-chave em JS, então, será  
    renomeado para `spawn`
    - `arguments` gera um array-like. Então, é necessário converte-lo  
    em array, com o `Array.from(arguments)`
      - Em ES5, é necessário invocar o objeto `Array`, buscar seu  
      protótipo e então invocar o método `slice` e então dar um `apply`  
      na propriedade `arguments`, setando-a como o `this`
    - Ao especificar o método slice, é possível obter o segundo  
    argumento da função `Person` invocada 
    - Agora é necessário retornar o objeto criado 
    - Se a função construtora retorna um objeto, ele se tornará  
    a let person
    - Então, é necessário retornar ou o apply da função construtora  
    recebida por parâmetro ou o objeto retornado pela função  
    construtora
*/
```

# `__proto__`
- Propriedade encontrada ao logar um objeto no console (exemplo 1)  
- É a propriedade que reside em um objeto e referencia o prototype  
que foi setado para aquele objeto 
- `obj__proto__ === Object.prototype` - retorna `true`

exemplo 1:

```javascript
const cat = {
  breed: 'munchkin'
};

console.log(cat);
```

![proto](https://user-images.githubusercontent.com/29297788/44034699-26fe0068-9ee4-11e8-9a6d-279d8890d0d4.jpg)

# Object.create(obj)
- É um método estático, do `Object.prototype`, que cria um novo objeto  
com o `Object.prototype` ajustado para esse novo objeto (exemplo 1)
  - No exemplo 3, é demonstrado o que o `Object.create(obj)` faz por  
  debaixo dos panos 
- Conforme exemplo 2, é possível verificar se um objeto é protótipo do  
outro, através do método `obj1.isPrototypeOf(obj2)`

exemplo 1: 

```javascript
const cat = {
  makeSound: function() {
    return this.sound;
  }
};

let ze = Object.create(cat); 
// o objeto herdou todas as propriedades e métodos do obj cat

ze.sound = 'meeeeehhhhh';

console.log(ze.makeSound());
// 'meeeeehhhhh'
```

exemplo 2: 

```javascript
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
```

exemplo 3: 

```javascript
const cat = {
  makeSound: function() {
    return this.sound;
  }
};

const myProto = {sound: 'wooow'};

function objectCreate(proto) {
  let obj = {}; // cria um novo objeto
  Object.setPrototypeOf(obj, proto); // seta um protótipo para o novo objeto criado
  return obj; // retorna o novo objeto criado 
}

console.log(objectCreate(myProto).sound);
// 'wooow'
```