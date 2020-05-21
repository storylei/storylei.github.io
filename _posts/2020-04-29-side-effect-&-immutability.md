---
layout: post
title: "副作用和不变性"
categories: frontend
tag: [JavaScript, 函数式编程]
---

从函数的副作用降到纯函数，再到数据的不变性

## 纯函数 Pure Function

> 一个函数如果在被调用时对随后的计算的影响仅限于返回值与参数调用者的计算，就称为没有副作用

### 纯函数

#### 定义一

1. 没有副作用
2. 只要传入参数相同，函数每次被调用总返回同样的值

#### 定义二

1. 函数不修改外部变量
2. 函数不读取外部变量，只依赖参数  

#### 闭包

```js
function Counter() {
    let val = 0;
    this.current = function() {
        return val;
    };
    this.increment = function() {
        val++;
        return this;
    }
    this.reset = function() {
        val = 0;
        return this;
    }
}
```

### 不变性 Immutability

- 原始类型：Undefined， Null， 布尔，数字，字符串和符号
- 引用类型：对象

#### 克隆

```js
var isObject = (val) =>  val && typeof val === 'object';
var isArray = (arr) => Array.isArray(arr);
function clone(obj) {
    if (!isObject(obj)){
        return obj;
    }
    if (isArray[obj]) {
        return [...obj];
    }
    return {...obj};
}
function deepClone(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    let copy = isArray(obj) ? [] : {};
    Object.keys(obj).forEach(key => copy[key] = deepClone(obj[key]));
    return copy;
}
```

#### 冻结

- 使用 `Object.freeze` 方法
  
```js
var isObject = (val) =>  val && typeof val === 'object';
function deepFreeze(obj) {
    if (isObject(obj) && !Object.isFrozen(obj)) {
        Object.keys(obj).forEach(key => deepFreeze(obj[key]));
        Object.freeze(obj);
    }
    return obj;
}
```

- 利用 `Object.defineProperty` 为对象定义制度的属性
  
```js
function addReadOnlyProp(obj, key, value) {
    let desc = {
        enumerable: true,
        configurable: false,
        writable: false,
        value: value
    };
    return Object.defineProperty(obj, name, desc);
}
function readOnly(obj) {
    let res = {};
    Object.keys(obj).forEach(key => addReadOnlyProp(res, key, obj[key]));
    return res;
}
```

- 用法将字段包起来
  
```js
function newTime(h, m, s) {
    return {
        h: () => h,
        m: () => m,
        s: () => s
    }
}
```

- 由存取函数定义的属性
  
```js
function newTime(h, m, s) {
    return {
        get hour() {
            return h;
        },
        get minute() {
            return m;
        }
        get second() {
            return s;
        }
    }
}
```