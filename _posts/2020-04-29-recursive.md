---
layout: post
title: "递归和迭代"
categories: frontend
tag: [JavaScript, 函数式编程]
---

递归指的是在一个函数的代码中直接或间接调用该函数自身

- 迭代，遍历集群中元素，通过循环获得下一个
- 递归，截取单个元素，将其余元素作为参数传递回递归函数

### 迭代器

```js
function iterator(list) {
    return {
        curList: list,
        next: function() {
            let isDone = this.curList.length === 0,
                curValue;
            if (!isDone) {
                curValue = this.curList[0];
                this.curList = this.curList.slice(1);
            }
            return {
                value: curValue,
                done: idDone
            }
        }
    }
}
```

### 尾部调用 Tail Call

> 尾部调用：调用函数直接返回被调用函数的返回值

```js
function f(x) {
    return x;
}
function g(x) {
    let y = x + x;
    return f(y);
}
console.log(g(3));
```

尾部调用优化只有在严格模式下才能进行，其中 `fn.arguments` `fn.caller` 失效，因为函数最近一次调用者堆栈可能已经被删除

```js
function sumTo(num) {
    if (num === 1) {
        return 1;
    }
    return num + sumTo(num - 1); // 有表达式，不算尾递归调用
}

function sumToTail(num) {
    'use strict';
    return _sum(num, 0);

    function _sum(num, accum) {
        if (num === 0) {
            return accum;
        }
        return _sum(num - 1, accum + num);
    }
}

```

### 递归的效率

- 斐波那契数列迭代方式

```js
function fibonacci(n) {
    if (n < 2) {
        return n;
    }
    let a = 0; b = 1; c;
    for (let i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return c;
}
```

- 斐波那契数列记忆方式
  
```js
var fibonacci = function() {
    const mem = [0, 1];
    return function fibonacci(n) {
        if (mem[n]) {
            return mem[n];
        }
        if (mem.length <= n) {
            mem[n] = fibonacci(n-1) + fibonacci(n-2);
        }
        return mem[n];
    }
}();
```

- 斐波那契数列尾递归调用方式

```js
var fibonacci = function(n) {
    "use strict";
    return _fibonacci(n, 0, 1);
    function _fibonacci(n, a, b) {
        if (n === 0) {
            return a;
        }
        if (n === 1) {
            return b;
        }
        console.log(n, a, b);
        return _fibonacci(n-1, b, a + b);
    }
};
```


