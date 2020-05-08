---
layout: post
title: "JavaScript"
categories: frontend
tag: [JavaScript]
---

## JavaScript类型

```js
console.log(0.1+0.2 === 0.3); // false

console.log(Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON); // true;
```

```js
var o = {
    valueOf: () => { console.log('valueOf'); return {}; },
    toString: () => { console.log('toString'); return {}; }
}
console.log(o + "");

```

## JavaScript对象

```js
var o = { get a() { return 1} };
console.log(o.a);
```

## 宏观和微观任务/事件循环

Promise永远在队列尾部添加微观任务。
setTimeout等宿主API，则会添加宏观任务。
微任务总会在下一个宏任务执行前执行，在本身所属的宏任务结束后立即执行。

```js
var r = new Promise(function (resolve, reject) {
    console.log('a');
    resolve();
});
setTimeout(() => console.log('d')); // d永远在c之后，因为setTimeout是浏览器API，产生宏任务，Promise是JavaScript引擎内部的微任务
r.then(() => console.log('c'));
console.log('b');
```

```js
setTimeout(() => console.log('d'));
var r = new Promise(function (resolve, reject) {
    resolve();
});
r.then(() => {
    var begin = Date.now();
    while (Date.now() - begin < 1000) {
        console.log('c1');
        new Promise(function(resolve, reject) {
            resolve();
        }).then(() => {
            console.log('c2');
        });
    }
});
// c1, c2, d
```

```js
function sleep(duration) {
    return new Promise((resolve, reject) => {
        console.log('b');
        setTimeout(resolve, duration);
    });
}
console.log('a');
sleep(5000).then(() => console.log('c'));
```

## async/await

```js
function sleep(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, duration);
    });
}
async function changeColor(node, color, duration) {
    node.style.background = color;
    await sleep(duration);
}
async function main() {
    var node = document.getElementById('traffic-light');
    while(true) {
        await changeColor(node, 'green', 3000);
        await changeColor(node, 'yellow', 1000);
        await changeColor(node, 'red', 2000);
    }
}
```

## 闭包和执行上下文

闭包是一个绑定了执行环境的函数。

- 环境部分
  - 环境：函数的词法环境（执行上下文饿一部分）
  - 标识符列表：函数中用到的未声明的变量
- 表达式部分：函数体

### 执行上下文

JavaScript标准把一段代码（包括函数），执行所需的所有信息定义为：“执行上下文”

#### ES3中的执行上下文

- scope: 作用域
- variable object：变量对象，用于存储变量的对象
- this：this的值

#### ES5中的执行上下文

- lexical environment：作用域
- variable environment：变量对象，用于存储变量的对象
- this：this的值

```js
var b;
void function() {
    var env = { b: 1 };
    b = 2;
    console.log('In function b:', b);
    // with(env) {
    //     var b = 3;
    //     console.log('In with b:', b);
    // }
}();
console.log('Global b:', b);
```

```js
var b = 10;
(function b(){
    b = 20;
    console.log(b);
})();
```

```js
var iframe = document.createElement('iframe');
document.documentElement.appendChild(iframe);
iframe.src = "javascript: var b = {};";

var b1 = iframe.contentWindow.b;
var b2 = {};

console.log(typeof b1, typeof b2);
console.log(b1 instanceof Object, b2 instanceof Object);
```

## 函数

### 普通函数

```js
function foo() {}
```

### 箭头函数

```js
const foo = () => {}
```

### 方法

```js
class C {
    foo() {}
}
```

### 生成器函数

```js
function* foo() {}
```

### 类

```js
class Foo {
    constructor() {}
}
```

### 异步函数

```js
async function foo() {}
```

## this 关键字

普通函数的this值由‘调用它所使用的引用’决定。我们获取的函数表达式，实际上返回的并非函数本身，而是一个`Reference`类型。
调用函数时使用的引用，决定了函数执行时刻的this值。
this跟面向对象毫无关联，它与函数调用时使用的表达式相关。

```js
function showThis() {
    console.log(this);
}
var o = {
    showThis: showThis
}
showThis();
o.showThis();
```

```js
const showThis = () =>{
    console.log(this);
}
var o = {
    showThis: showThis
}
showThis();
o.showThis();
```

```js
class C {
    showThis() {
        console.log(this);
    }
}
var o = new C();
var showThis = o.showThis;
showThis();
o.showThis();
```

在JavaScript中，为函数规定了用来保存定义时上下文的私有属性`[[Environment]]`

当一个函数执行时，会创建一条新的执行环境记录，记录的外层词法环境 (outer lexical environment) 会被设置成函数的 `[[Environment]]`。

这个动作就是 **切换上下文**

JavaScript 标准定义了 `[[thisMode]]` 私有属性

- lexical: 表示从上下文中找this，这对应了箭头函数 
- global: 表示当 this 为 undefined时，取全局对象，对应了普通函数
- strict: 当严格模式时使用，this 严格按照调用时传入的值，可能为 null 或者 undefined

class设计成了默认按strict模式执行

函数创建新的执行上下文中的词法环境记录时，会根据 `[[thisMode]]` 来标记新纪录的 `[[thisBindingStatus]]` 私有属性

## 操作 this 的内置函数

- `Function.prototype.call`
- `Function.prototype.apply`

```js
function foo(a, b, c) {
    console.log(this);
    console.log(a, b, c);
}
foo.call({}, 1, 2, 3);
foo.call({}, [1, 2, 3]);
foo.bind({}, 1, 2, 3)(); // 生成一个新的绑定过的函数，这个函数的this值固定了参数
```

## new的执行过程

1. 以构造器的prototype属性为原型，创建新对象
2. 将this和调用参数传给构造器，执行
3. 如果构造器返回的是对象，则返回；否则返回第一步创建的对象。

## JavaScript语句

### Completion类型

```js
function foo() {
    try {
        return 0;
    } catch(e) {

    } finally {
        return 1;
    }
}
console.log(foo());
```

```js
outer: while(true) {
    console.log('outer');
    inner: while(true) {
        console.log('inner');
        break outer;
    }
}
console.log("finished");
```

### toString

```js
12.toString()
12 .toString();
```

```js
function f() {
    console.log(arguments);
}
var a = 'world';
f`Hello ${a}!`;
```

### 编译原理

- 定义四则运算：产出四则运算的词法定义和语法定义
- 词法分析：把输入的字符串流变成token
- 语法分析：把token变成抽象语法树AST
- 解释执行：后序遍历AST，执行得出结果

1. Token
   - Number: 1, 2, 3, 4, 5, 6, 7, 8, 9, 0
   - Operator: +, -, *, /
2. Whitespace: <sp>
3. LineTerminator: <LF> <CR>

BNF
```js
<Expression> ::= 
    <AdditiveExpression><EOF>

<AdditiveExpression> ::= 
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression> ::= 
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

#### 状态机

用函数表示状态，用if表示状态的迁移关系，用return值表示下一个状态

##### 词法分析：BNF

```js
var token = [];
const start = char => {
    if(char === '1'
        || char === '2'
        || char === '3'
        || char === '4'
        || char === '5'
        || char === '6'
        || char === '7'
        || char === '8'
        || char === '9'
        || char === '0'
    ) {
        token.push(char);
        return inNumber;
    }
    if(char === '+'
        || char === '-'
        || char === '*'
        || char === '/'
    ) {
        emmitToken(char, char);
        return start
    }
    if(char === ' ') {
        return start;
    }
    if(char === '\r'
        || char === '\n'
    ) {
        return start;
    }
}
const inNumber = char => {
    if(char === '1'
        || char === '2'
        || char === '3'
        || char === '4'
        || char === '5'
        || char === '6'
        || char === '7'
        || char === '8'
        || char === '9'
        || char === '0'
    ) {
        token.push(char);
        return inNumber;
    } else {
        emmitToken("Number", token.join(""));
        token = [];
        return start(char); // put back char
    }
}


function emmitToken(type, value) {
    console.log(value);
}

var input = "1024 + 2 * 256"

var state = start;

for(var c of input.split(''))
    state = state(c);

state(Symbol('EOF'))

```

##### 语法分析 LL

```js

function Expression(source){
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "EOF" ) {
        let node = {
            type:"Expression",
            children:[source.shift(), source.shift()]
        }
        source.unshift(node);
        return node;
    }
    AdditiveExpression(source);
    return Expression(source);
}

function AdditiveExpression(source){
    if(source[0].type === "MultiplicativeExpression") {
        let node = {
            type:"AdditiveExpression",
            children:[source[0]]
        }
        source[0] = node;
        return AdditiveExpression(source);
    } 
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "+") {
        let node = {
            type:"AdditiveExpression",
            operator:"+",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression" && source[1] && source[1].type === "-") {
        let node = {
            type:"AdditiveExpression",
            operator:"-",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        MultiplicativeExpression(source);
        node.children.push(source.shift());
        source.unshift(node);
        return AdditiveExpression(source);
    }
    if(source[0].type === "AdditiveExpression")
        return source[0];
    MultiplicativeExpression(source);
    return AdditiveExpression(source);
}
function MultiplicativeExpression(source){
    if(source[0].type === "Number") {
        let node = {
            type:"MultiplicativeExpression",
            children:[source[0]]
        }
        source[0] = node;
        return MultiplicativeExpression(source);
    } 
    if(source[0].type === "MultiplicativeExpression" && source[1] && source[1].type === "*") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"*",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression"&& source[1] && source[1].type === "/") {
        let node = {
            type:"MultiplicativeExpression",
            operator:"/",
            children:[]
        }
        node.children.push(source.shift());
        node.children.push(source.shift());
        node.children.push(source.shift());
        source.unshift(node);
        return MultiplicativeExpression(source);
    }
    if(source[0].type === "MultiplicativeExpression")
        return source[0];

    return MultiplicativeExpression(source);
};

var source = [{
    type:"Number",
    value: "3"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "300"
}, {
    type:"+",
    value: "+"
}, {
    type:"Number",
    value: "2"
}, {
    type:"*",
    value: "*"
}, {
    type:"Number",
    value: "256"
}, {
    type:"EOF"
}];
var ast = Expression(source);

console.log(ast);
```

##### 解释执行

```js
function evaluate(node) {
    if (node.type === 'Expression') {
        return evaluate(node.children[0])
    }
    if (node.type === 'AdditiveExpression') {
        if (node.operator === '-') {
            return evaluate(node.children[0]) - evaluate(node.children[2]);
        }
        if (node.operator === '+') {
            return evaluate(node.children[0]) + evaluate(node.children[2]);
        }
        return evaluate(node.children[0]);
    }
    if (node.type === 'MultiplicativeExpression') {
        if (node.operator === '*') {
            return evaluate(node.children[0]) * evaluate(node.children[2]);
        }
        if (node.operator === '+') {
            return evaluate(node.children[0]) / evaluate(node.children[2]);
        }
        return evaluate(node.children[0]);
    }
    if (node.type === 'Number') [
        return Number(node.value);
    ]
}
```

## JavaScript 语法

```js
var a = 1, b = 1, c = 1;
a
++
b
++
c
```

### 预处理

#### var声明

var声明永远作用于脚本，模块和函数体这个级别

```js

var a = 1;

function foo() {
    console.log(a); // undefined
    var a = 2;
}

foo();

```

```js
var a = 1;

function foo() {
    console.log(a); // undefined
    if(false) {
        var a = 2;
    }
}

foo();
```

```js
var a = 1;
function foo() {
    var o= {a:3}
    with(o) {
        var a = 2;
    }
    console.log(o.a); // 2
    console.log(a); // undefined
}

foo();
```

#### function声明

function声明不但在作用域中加入变量，还会给它赋值

```js
console.log(foo); // function
function foo(){}
```

```js
console.log(foo); // undefined
if(true) {
    function foo(){

    }
}
```

#### class声明

class声明也会被预处理，会在作用域中创建变量，并且要求访问它时抛出错误

```js
console.log(c); // 报错，并不是没有预处理 Identifier 'c' has already been declared
class c{}
```

```js
var c = 1;
function foo(){
    console.log(c); // Cannot access 'c' before initialization
    class c {}
}
foo();
```

### 指令序言机制

指令序言是为了 use strict设计的，它规定了一种给JavaScript代码添加元信息的方式

```js
"use strict";
function f() {
    console.log(this);
}
f.call(null);
```

## 语句

### 语句快

```js
function* foo(){
    yield 0;
    yield 1;
    yield 2;
    yield 3;
}
for(let e of foo())
    console.log(e);
```

```js
function sleep(duration) {
    return new Promise(function(resolve, reject) {
        setTimeout(resolve,duration);
    })
}
async function* foo(){
    i = 0;
    while(true) {
        await sleep(1000);
        yield i++;
    }
}
for await(let e of foo())
    console.log(e);
```

### return语句

### break语句

### continue语句

### with语句

```js
var o = {a: 1, b: 2};
with(o) {
    a = 3;
    b = 4;
    console.log(a, b);
}
console.log(a, b);
```

### try语句和throw语句

```js
try {
    throw new Error("error");
} catch(e) {
    console.log(e);
} finally {
    console.log("finally");
}
```

### debugger语句

#### ==规则

- undefined和null相等
- 字符串和bool都转为数字再比较
- 对象转换成primitive类型在比较

```js
false == '0' // true
true == 'true' // false
[] == 0 // true
[] == false // true
new Bollean('false') == false // false
```

```js
let a = 102, b = 324;

a = a ^ b;
b = a ^ b;
a = a ^ b;

console.log(a, b);
```