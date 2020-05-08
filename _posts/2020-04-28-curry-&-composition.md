---
layout: post
title: "部分应用和复合"
categories: frontend
tag: [JavaScript, 函数式编程]
---

主要介绍第五章部分应用和复合的相关内容，以及高阶函数和柯里化。

## 部分应用

```js
function partial(fn, ...args) {
    return fn.bind(undefined, ...args);
}

```

- 返回值是普通函数，需要再次调用
- 柯里化返回函数链

## 柯里化

意义: 将对多函数参数的处理简化为对单参数的处理

### 二元函数的柯里化

```js
function curry2(fn) {
    return function(a) {
        return function(b) {
            return fn(a, b);
        }
    }
}
function sum(a, b) {
    return a + b;
};
console.log(curry2(sum)(3)(5));
```

### 经典柯里化函数

```js
function curryClassic(fn, arity = fn.length) {
    function _curry(savedArgs) {
        return function(arg) {
            let curArgs = savedArgs.push(arg);
            if (curArgs.length >= arity) {
                return fn(...curArgs);
            } else {
                return _curry(curArgs);
            }
        }
    }
    return _curry([]);
}

// 举个例子
const get = curryClassic((name, object) => object[name]);
const name = get1('name');
const length = get1('length');

console.log('name:', name({ name: 'Jack', age: 12 }));
console.log('length:', length([0, 1, 2]));

const add = curryClassic((a, b) => a + b);
const inc = add(1);
const dec = add(-1);

console.log("inc+1:", inc(0));
console.log("dec-1:", dec(3));
```

### 增强的柯里化函数

```js
function concat(v1, v2) {
    if (Arrary.isArray(v1)) {
        return v1.concat(v2);
    } else {
        return v1 + v2;
    }
}
function curryExt(fn, arity = fn.length) {
    function _curry(savedArgs) {
        return function(...args) {
            let curArgs = concat(savedArgs, args);
            if (curArgs.length >= arity) {
                return fn(...curArgs);
            } else {
                return _curry(curArgs);
            }
        }
    }
    return _curry([]);
}
```

### 从右向左柯里化

### 进一步增强的柯里化

### 参数顺序

- 命令式编程，参数越靠前越重要，靠后的参数是辅助性，越次要
- 函数式编程，参数的顺序调整为从可选到必须，越靠前的参数越是辅助性的用于调节函数行为

### 柯里化和高阶函数

区别

1. 手工编写的高阶函数可以随意使用剩余参数，被柯里化的函数则必须具有固定的元数
2. 手工编写的高阶函数能访问闭包记忆的外套函数中的数据，而柯里化的函数则是等到参数齐备后才一次性运行，没有记忆状态

## 复合 (Function Composition)

如果被嵌套调用的函数必须作为一个整体，比如作为参数传递，就需要将被嵌套调用的函数复合成一个函数

### 复合函数 compose

```js
function callRight(arg, fn) {
    return fn(arg);
}
function reduceRight(iteratee, initialValue, iterable) {
    let arr = Array.from(iterable);
    return arr.reduceRight(binary(iteratee), initialValue)
}
function compose(...funcs) {
    return function(...args) {
        if (funcs.length < 1) {
            console.error('Function compose expects at least one argument.');
        }
        let ret = last(funcs)(...args);
        return reduceRight(callRight, ret, initial(funcs));
    }
}
```

### 复合函数 pipe

```js
function pipe(...funcs) {
    return function(...args) {
        if (funcs.length < 1) {
            console.error('Function compose expects at least one argument.');
        }
        let ret = first(funcs)(...args);
        return reduce(callRight, ret, rest(funcs));
    }
}
```

