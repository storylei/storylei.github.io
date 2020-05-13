---
layout: post
title: "函数式编程"
categories: frontend
tag: [JavaScript, 函数式编程]
---

函数式编程是以使用函数为主的软件开发风格。
函数式编程是指为创建不可变程序，通过消除外部可兼得副作用，来对纯函数的声明式的求值过程。

目标：使用函数来抽象作用在数据之上的控制流与操作，从而在系统中消除副作用并减少对状态的改变

- 声明式编程：使程序的描述与求值分离开来
- 纯函数：
  - 仅取决于输入
  - 不会造成超出其作用域的变化，如全局对象或引用
- 引用透明：相同输入始终产生相同输出
- 不可变性：创建后不能更改的数据

好处：

- 促使将任务分解成简单的函数
- 使用流式的调用链来处理数据
- 通过响应式范式来降低事件驱动代码的复杂性

### 函数是一等公民

- 一等的：在语言层面将函数视为真实的对象
- 高阶的：作用参数的函数，具有值的行为

JavaScript函数声明方式

```js
// 匿名函数
var square = function(x) { return x*x; }
// lambda表达式
var square = x => x*x;
// 函数声明
function square(x) { return x*x; }
// 成员方法
var obj = {
    method: function(x) { return x*x; }
}
// 构造函数
new Function('x', 'return x*x');
```

#### 函数调用

- 全局
- 方法
- 构造函数

#### 闭包和作用域

闭包一种能够在函数声明过程中将环境信息与所属函数绑定在一期的数据结构。它基于函数声明的文本位置，因此也被称为围绕函数定义的静态作用域或词法作用域。

- 包括函数的所有参数
- 外部作用域的所有变量

作用域

- 全局作用域
- 函数作用域
- 伪块作用域 -- 变量，函数提升

应用

- 模拟私有变量 -- 模块模式
- 异步服务端调用 -- 回调函数
- 创建人工快作用域变量

```js
// 模块模式
var MyModule = (function MyModule(namespace) {
    let _var = '';
    namespace.method = function() { return 'method'; };
    namespace.name = function() { return 'name'; };
    return namespace;
})(MyModule || {});
```

### 共享和不可变性

#### 数组和对象

##### 新增

```js
[0, 1, 2].concat(3);

var obj1 = {
    x: 1
}
{
    ...obj1,
    y: 2
}
```

##### 删除

```js
var arr = [0, 1, 2, 3, 4, 5];
var index = 3;
var res = [
    ...arr.slice(0, index),
    ...arr.slice(index+1)
] // [0, 1, 2, 4, 5]


var obj = {
    x: 1,
    y: 2,
    z: 3
};
delete obj.x;

var delX = Object.keys(obj).reduce((o, k) => {
    if (k !== 'x') {
        return { ...o, [k]: obj[k] }
    }
    return o;
}, {});

```

##### 更新

```js
arr[index]+1;


var obj1 = {
    x: 1
}
var obj2 = {
    y: 2
}
// 1
var obj = Object.assign({}, obj1, obj2);
// 2
var obj = {...obj, ...obj2};

```

#### 深拷贝

##### 递归

```js
const type = obj => {
    let toString = Object.prototype.toString;
    let map = {
        '[object Array]': 'array',
        '[object Object]': 'object'
    }
    return map[toString.call(obj)];
}
const deepClone = data => {
    const t = type(data);

    if (t === 'array') {
        return data.map(d => deepClone(d));
    } else if (t === 'object') {
        let o = {};
        for (let k in data) {
            console.log(k, data);
            o[k] = deepClone(data[k]);
        }
        return o;
    } else {
        return data;
    }
}

const obj = {
    x: 1,
    y: 2,
    z: {
        a: 'a',
        b: 'b'
    }
}

let copy = deepClone(obj);
```

##### JSON

```js
const deepClone = data => {
    return JSON.parse(JSON.stringify(data));
}
```

### 函数链

```js
_.chain(enrollment)
    .filter(stu => stu.enrolled > 1)
    .plunk('grade')
    .average()
    .value()
```

### 响应式编程

Observable

```js
Rx.Observable.fromEvent()
```

### 深冻结

```js
var isObject = (val) => val && typeof val === 'objec';
function deepFreeze(obj) {
    if(isObject(obj) && !Object.isFrozen(obj)) {
        Object.keys(obj).forEach(key => deepFreeze(obj[key]));
        Object.freeze(obj);
    }
    return obj;
}
```

### 柯里化

将对函数参数的处理简化为对但参数的处理

```js
// 二元函数柯里化
function curry2(fn) {
    return function(a) {
        return function(b) {
            return fn(a, b);
        }
    }
}
var add = (a, b) => a + b;
curry(add)(3)(2);
```

用途：

- 仿真函数工厂
- 创建可重用的函数模版

### 部分应用

部分应用是一种通过将函数的不可变参数子集初始化为固定值，来创建更小元函数的操作。

和柯里化一样，部分应用也可以用来缩短函数的长度。但是柯里化本质上是一种部分应用的自动化使用方式。

区别：

- 柯里化在每次分布调用时都会生成嵌套的一元函数，在底层，函数的最终结果是由这些一元函数的逐步组合产生的。同时，curry的变体允许同时传递一部分参数，因此，可以完全控制函数求值的时间和方式
- 部分应用将函数的参数与一些预设值绑定，从而产生一个拥有更少参数的新函数，该函数的闭包中包含了这些已赋值的参数，在之后的调用中完全被求值

```js
function partical() {
    let fn = arguments[0];
    let boundArgs = Array.prototype.slice.call(arguments, 1);
    let placeholder = '_';
    let bound = function(...args) {
        console.log(args);
        let position = 0, len = boundArgs.length;
        let newArgs = [];
        for (let i=0; i<len; i++) {
            newArgs[i] = boundArgs[i] === placeholder
                    ? args[position++]
                    : boundArgs[i];
        }
        return fn.apply(this, newArgs);
    }
    return bound;
}
```

用途：

- 核心语言扩展

```js
String.prototype.first = partical(String.prototype.substring, 0, '_');
'abc'.first(1); // a
```

- 延迟函数绑定
