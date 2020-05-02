---
layout: post
title: "JS函数执行机制"
categories: JavaScript
---

在JavaScript中，每个函数调用其实都会在函数上下文堆栈中创建记录（帧）

每一帧的内容如下

```javascript
    executionContextData = {
        scopeChain, // 包含当前函数的 variableObject 以及父执行上下文的 variableObject
        variableObject, // 包括当前函数的参数，内部变量以及函数声明
        this // 函数对象的饮用（任何函数在系统中都是对象）
    }
```

堆栈的行为由下列规则确定

- JavaScript 是单线程的，这意味着执行的同步性。
- 有且只有一个全局上下文（与所有函数的上下文共享）
- 函数上下文的数量是有限制的（对客户端代码，不同的浏览器可以有不同的限制）
- 每个函数调用会创建一个新的执行上下文，递归调用也是如此

### 惰性求值推迟执行

### 函数记忆化

```javascript
Function.prototype.memoized = function () {
    let key = JSON.stringify(arguments);
    this._cache = this._cache || {};
    this._cache[key] = this._cache[key] || this.apply(this, arguments);
    return this._cache[key];
}

Function.prototype.memoize = function () {
    let fn = this;
    if (fn.length === 0  || fn.length > 1) {
        return fn;
    }
    return function() {
        return fn.memoized.apply(fn, arguments);
    }
}
```

### 递归和尾递归优化

函数的最后一件事情如果是递归的函数调用，那么运行时会认为不必要保持当前的栈帧，因为所有工作已经完成，完全可以抛弃当前帧。
