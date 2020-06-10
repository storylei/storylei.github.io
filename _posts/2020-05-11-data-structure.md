---
layout: post
title: "数据结构"
categories: frontend
tag: [数据结构]
---

字符串类面试题

解析URL Params为对象

```js
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1];
    const paramsArr = paramsStr.split('&');
    let paramObj = {};
    paramsArr.forEach(param=> {
        if (/=/.test(param)) {
            let [key, val] = param.split('=');
            val = decodeURIComponent(val);
            val = /^\d+$/.test(val) ? parseFloat(val) : val;
            if (paramObj.hasOwnProperty(key)) {
                paramObj[key] = [].concat(paramsObj[key], val);
            } else {
                paramObj[key] = val;
            }
        } else {
            paramObj[key] = true;
        }
    });
    return paramObj;
}
```

模版引擎实现

```js
function render(template, data) {
    const reg = /\{\{(\w+)\}\}/g;
    return template.replace(reg, function() {
        return data[arguments[1]] || ""
    })
}
```

替换为驼峰命名

```js
function camel(s) {
    return s.replace(/-\w/g, function(x) {
        console.log(x);
        return x.slice(1).toUpperCase();
    })
}
```

查找字符串中出现最多的字符和个数

```js
let str = 'aabbbccccdeff';
let char = '';
let max = 0;
let obj = {};

str = str.split('').sort();

for (let i=0,len=str.length; i<len; i++) {
    let c = str[i];
    if (obj[c]) {
        obj[c] += 1;
    } else {
        obj[c] = 1;
    }
    if (max < obj[c]) {
        max = obj[c];
        char = c;
    }
}

console.log(`最长的字符${char}, 出现了${max}次`)
```

实现千位分隔符

```js
function parse(num) {
    num = parseFloat(num).toFixed(3);
    // let [integer, decimal] = String.prototype.split.call(num, '.');
    num = num.replace(/(\d)(?=(\d{3})+\.)/g, ($0, $1) => { console.log($0, $1); return $1 + ','});
    return num;
}
parse('1234.56');
parse('123456890.789');
```

判断是否是电话号码

```js
function isPhone(tel) {
    var regx = /^1[345678]\d{9}$/;
    return regx.test(tel);
}
```

判断是否邮箱

```js
function isEmail(mail) {
    var regx = /^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
    return regx.test(mail);
}
```

判断是否身份证

```js
function isID(str) {
    var regx = /^\d{15}$|\d{18}$|(\d{17}(\d|X|x)$)/;
    return regx.test(str);
}
```

实现防抖函数 debounce
再事件触发n秒后在执行回调，如果n秒內有触发，重新计时。
防止多次提交，搜索联想词

```js
const debounce = (fn, delay = 1000) {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
}
```

实现节流函数 throttle
在规定时间內，只触发一次函数，如果多次触发，只一次有效。
避免多次內触发动画等引起性能问题

```js
const throttle = (fn, delay = 500) {
    let flag = true;
    return (...args) => {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay);
    }
}
```

深克隆

```js
const newObj = JSON.parse(JSON.stringify(oldObj));

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

EventBus

```js
class EventEmitter {
    constructor() {
        this._events = this._events || {};
    }
}
EventEmitter.prototype.emit = function(type, ...args) {
    if (!type) return;
    let fns = this._events[type];
    fns.forEach(fn = () => {
        args.length > 0 ? fn.apply(this, args) : fn.call(this);
    });
}
EventEmitter.prototype.add = function(type, fn) {
    if (!type || !fn) return;
    if (!this._events[type]) {
        this._events[type] = [];
    }
    this._events[type].push(fn);
}

EventEmitter.prototype.remove = function(type) {
    return delete this._events[type];
}
```

实现 instanceOf

```js

```

模拟 new

```js
function objectFactory() {
    const obj = new Object();
    const Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    const ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}
```

实现一个call

```js
Function.prototype.call = function(context) {
    context.fn = this;
    let args = [];
    for (let i = 1, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    context.fn(...args);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
```

实现 apply 

```js
Function.prototype.apply = function(context, arr) {
    
}
```

实现 bind

```js

```

模拟 Object.create

```js
function create(proto) {
    function F() {}
    F.prototype = proto;
    return new F();
}
```

<!-- 排序 -->

```js

var arr = [11, 4, 7, 9, 10, 2, 1];
function bubbleSort(arr) {
    for (let i = 0, len < arr.length; i < len - 2; i++) {
        let a = arr[i], b = arr[i+1];
        if (a > b) {
            [a, b] = [b, a];
        }
    }
    return arr;
}

console.log(bubbleSort(arr));

```

快速排序

```js
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let left = [], right = [], pivot = arr.shift();
    for (let i = 0, len = arr.length; i < len; i++) {
        arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }

    return quickSort(left).concat([pivot], quickSort(right));
}

var arr = [8, 11, 4, 7, 9, 10, 2, 1];

// 原地快排，不占额外空间
// 使用两个指针，分别在队首队尾
function quickSort(arr, low = 0, high = arr.length - 1) {
    if (low >= high) {
        return arr;
    }
    let left = low, right = high;
    let pivot = arr[left];

    while (left < right) {
        if (left < right && pivot <= arr[right]) {
            right--;
        }
        arr[left] = arr[right];
        if (left < right && pivot >= arr[right]) {
            left++;
        }
        arr[right] = arr[left];
    }
    arr[left] = pivot;
}

console.log(quickSort(arr));

```


