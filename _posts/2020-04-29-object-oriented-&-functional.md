---
layout: post
title: "从面向对象到函数式编程"
categories: frontend
tag: [JavaScript, 函数式编程]
---

对比面向对象和函数编程

## 面向对象的特点

1. 封装性
2. 继承性
3. 多态性

## JavaScript面向对象

### 基于类的

任何一个对象都属于某个类，所有同类的对象都具有相同的字段和方法，成为该类的实例

### 基于原型的

对象本身是第一位的，每个对象都包含自身的字段和方法。

```js
const Counter = (function(){
    const methods = {
        current() {
            return this._val;
        },
        increment() {
            this._val++;
            return this;
        },
        reset() {
            this._val = 0;
            return this;
        }
    }
    return function() {
        this._val = 0;
        Object.assign(this, methods);
    }
})();
```

### Proxy与对象继承

```js
function inherits(obj, ...bases) {
    let chain = [obj].concat(bases);
    let handler = {
        get(target, prop) {
            let owner = chain.find(o => Reflect.has(o, prop));
            return owner === undefined ? undefined : owner[prop];
        },
        has(target, prop) {
            return chain.some(o => Reflect.has(o, prop));
        }
    }
    return new Proxy(obj, handler);
}
```

### Mixin

Mixin 指一种特殊的类或对象，他们只包含方法，这些方法可为其他类或对象使用

- Mixin 只涉及方法重用，使用Mixin的类和对象不必是继承关系
- 多重继承 涉及到方法和字段，必须是继承关系

### 工厂函数 Factory Function

一个函数如果是用来创建对象的，则被称为工厂函数，如建构函数

## 函数式编程

### 不可变对象

函数式编程以函数为中心，数据和函数保持分离，大量使用部分应用和复合的技术。

## 方法链和复合函数

创建一个方法链的包装起对象 

```js
class Chain {
    constructor(raw) {
        this._raw = raw;
    }
    addFunction(fn, name = fn.name) {
        this.bindFunction(fn, name);
    }
    addFunctions(...fns) {
        let fn_names = fns.map( fn => [fn, fn.name]);
        fn_names.forEach()
    }
    addMethod(fn, name = fn.name) {
        this.bindFunction(fn, name, true);
    }
    addMethods(...fns) {
        let fn_names = fns.map( fn => [fn, fn.name]);
        fn_names.forEach()
    }
    bindFunction(fn, name, useThis = false) {
        this[name] = function(...args) {
            if (useThis) {
                this._raw = fn.apply(this._raw, args);
            } else {
                args.push(this._raw);
                this._raw = fn(...args);
            }
            return this;
        }
    }
    value() {
        return this._raw;
    }
}
```
