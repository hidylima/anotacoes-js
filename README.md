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
- **É uma expressão que, permite quebrar coisas (arrays e objetos) em partes (variáveis)** 
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

- Ao atribuir um método à uma variável, 
*/
```

# `this`
- Em linguagens totalmente orientadas à funções, o this não existe 
- Sua existência é crucial para que uma linguagem orientada à objetos,  
como Java, funcione 

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