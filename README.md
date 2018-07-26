# ES6, ou ES 2015
- É a nova versão do JavaScript 

## Objetivos do ES6 
- Ser uma linguagem melhor para construir aplicações  
complexas
- Resolver problemas antigos do JavaScript 
- Facilitar o desenvolvimento de libraries /  
bibliotecas

# [Babel](http://babeljs.io/docs/en)
- Usado para que a maioria dos browsers suporte o ES6 
- Transpila / transforma código ES6 para ES5 

## Iniciando um projeto simples com o Babel 
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

## Novidades do ES6 

### Declaração de variáveis 

#### var x let 
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

#### `let` x `const`
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

### Parâmetros de funções 

#### Default parameters 
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

#### Rest parameters 
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
    - Não aceita propriedades e métodos de array 
  2. Todos os argumentos da função são, automaticamente,  
  atribuídos ao arguments. Não há uma forma clara de  
  diferenciar os parâmetros 

Os rest parameters foram adicionados ao ES6 com esses  
problemas em mente. 
- Transforma os argumentos da invocação de uma função  
em um array 
- Reduz o código padrão induzido pelos argumentos 

```javascript
const getArgumentsLength = (...theArgs) => {
  return theArgs.length; // theArgs é um array 
};

getArgumentsLength(5, 1, 9, 0, 9); // 5
```