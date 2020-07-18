import { useState, useEffect } from "react";

var minimumTotal = function(triangle) {
    if (!triangle) {
        return new Error('param error:', triangle);
    }
    if (triangle.length === 0) {
        return 0;
    }
    var minSum = Number.MAX_VALUE, minPath = '';

    _dfs(triangle, 0, 0, "", 0);

    return minPath;

    function _dfs(triangle, i, j, path, sum) {
        // terminator
        if (i === triangle.length - 1) {
            path += triangle[i][j] + ' # ';
            sum += triangle[i][j];
            // console.log(path, sum);
            if (sum < minSum) {
                minSum = sum;
                minPath = path;
            }
            return sum;
        }
        // process
        path += triangle[i][j] + " -> ";
        sum += triangle[i][j];
        // drill down
        _dfs(triangle, i+1, j, path, sum);
        _dfs(triangle, i+1, j+1, path, sum);

        // clear state

        return sum;
    }

};

// var triangle = [
//     [2],
//    [3,4],
//   [6,5,7],
//  [4,1,8,3]
// ];

// var path = minimumTotal(triangle);
// console.log("minimumTotal:", path);


function x(promises) {
    let arr = [];
    let fn;
    promises.forEach(p=>{
        p.then(v => {
            arr.push(v);
            arr.length === 10 && fn(v);
        });
    });
    return new Promise(r => fn = r);
}
var arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(
        new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(i);
                resolve(i);
            }, 1000);
        })
    )
}

x(arr).then(res => {
    console.log(res);
})


// 0. 关于闭包
for (var i = 0; i < 5; ++i) {
    setTimeout(function () {
      console.log(i + ' ');
    }, 100);
  }
  
  //  0. 数组数据拉平，去重，排序，统计元素出现次数
  // [1, [2, [ [3, 4], 5], 6]] => [1, 2, 3, 4, 5, 6]
  
    var data =  [1, [2, [ [3, 4], 5], 6]];
  
      function flat(data, result) {
          var i, d, len;
          for (i = 0, len = data.length; i < len; ++i) {
              d = data[i];
              if (typeof d === 'number') {
                  result.push(d);
              } else {
                  flat(d, result);
              }
          }
      }
  
      var result = [];
      flat(data, result);
  
      console.log(result);
  
  [1, 2, [3, [4, 5]]].flat(2); // [1, 2, 3, 4, 5] 
  
  ​
  const flatten = arr => {
    return arr.reduce((flat, toFlat) => {
      return flat.concat(Array.isArray(toFlat) ? flatten(toFlat) : toFlat);
    }, []);
  };
  
  Array.prototype.flatten = function() {
      return [].concat(...this.map(item => (Array.isArray(item) ? item.flatten() : [item])));
  }
  
  Array.prototype.unique = function() {
      return [...new Set(this)]
  }
  
  const sort = (a, b) => a - b;
  
  console.log(arr.falt().unique().sort(sort)); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]

  

console.log('sync1');

setTimeout(function () {
    console.log('setTimeout1')
}, 0);

var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log('setTimeoutPromise')
    }, 0);
    console.log('promise');
    resolve();
});


promise.then(() => {
    console.log('pro_then');
    setTimeout(() => {
        console.log('pro_timeout');
    }, 0)
})

setTimeout(function () {
    console.log('last_setTimeout')
}, 0);
console.log('sync2');

// 宏任务
// sync1
// promise
// sync2

// 第一个宏任务没有结束，继续执行微任务队列
// pro_then

// 执行第二个宏任务
// setTimeout1
// setTImeoutPromise
// last_setTimeout
// pro_timeout

// String 2 Number

function atoi(a) {
    let chars = a.split("").map( e => e.charCodeAt(0) - "0".charCodeAt(0));
    let n = 0;
    for (var char of chars) {
        n *= 10;
        n += char;
    }
    return n;
}

// console.log(atoi('1001'));

function Promise(excutor) {
    var self = this
    self.onResolvedCallback = []
    function resolve(value) {
      setTimeout(() => {
        self.data = value
        self.onResolvedCallback.forEach(callback => callback(value))
      })
    }
    excutor(resolve.bind(self))
  }
Promise.prototype.then = function(onResolved) {
    var self = this
    return new Promise(resolve => {
      self.onResolvedCallback.push(function() {
        var result = onResolved(self.data)
        if (result instanceof Promise) {
          result.then(resolve)
        } else {
          resolve(result)
        }
      })
    })
}

// var isObject = (val) => val && typeof val === 'object';
// function deepFreeze(obj) {
//     if(isObject(obj) && !Object.isFrozen(obj)) {
//         Object.keys(obj).forEach(key => deepFreeze(obj[key]));
//         Object.freeze(obj);
//     }
//     return obj;
// }


// var obj = deepFreeze({
//     x: 1,
//     y: 2,
//     z: {
//         a: 'a',
//         b: 'b'
//     }
//   });

// obj.x = 10;


// function partical() {
//     let fn = arguments[0];
//     let boundArgs = Array.prototype.slice.call(arguments, 1);
//     let placeholder = '_';
//     let bound = function(...args) {
//         console.log(args);
//         let position = 0, len = boundArgs.length;
//         let newArgs = [];
//         for (let i=0; i<len; i++) {
//             newArgs[i] = boundArgs[i] === placeholder
//                     ? args[position++]
//                     : boundArgs[i];
//         }
//         return fn.apply(this, newArgs);
//     }
//     return bound;
// }

// String.prototype.first = partical(String.prototype.substring, 0, '_');
// console.log('abc'.first(1));

var a = '12345';
var b = '92';

// a = [7,6,5,4,3,2,1]
// b = [4,6,7,8,9,0,0]

function sum(a, b) {
    var lenA = a.length,
        lenB = b.length,
        flag = lenA > lenB,
        lenMax = flag ? lenA : lenB,
        arrA = a.split('').reverse().concat(new Array(lenMax-lenA).fill(0)),
        arrB = b.split('').reverse().concat(new Array(lenMax-lenB).fill(0)),
        arrRes = new Array(lenMax+1).fill(0),
        i = 0, sum;

    while (i < lenMax) {
        sum = arrRes[i] + parseInt(arrA[i]) + parseInt(arrB[i]);
        arrRes[i] = sum%10;
        arrRes[i+1] = sum >= 10 ? 1 : 0;
        i++;
    }

    if (arrRes[lenMax] === 0) {
        arrRes.pop();
    }

    return arrRes.reverse().join('');
}

var t = sum(a, b);
console.log(t);


// function sum(a = '0', b = '0') {
//     a = typeof a === 'string' ? a : String(a);
//     b = typeof b === 'string' ? b : String(b);
//     var res = '', temp = 0, aSymbol = '', bSymbol = '', num1, num2, lastSymbol = '';
//     if (a < 0) {
//         aSymbol = '-';
//         a = a.substring(1);
//     }

//     if (b < 0) {
//         bSymbol = '-';
//         b = b.substring(1);
//     }
//     aArr = a.split('');
//     bArr = b.split('');

//     while (aArr.length || bArr.length || temp) {
//         if (aSymbol === bSymbol) {
//             temp += ~~aArr.pop() + ~~bArr.pop();
//             res = temp % 10 + res;
//             temp = temp > 9 ? 1 : 0;
//             lastSymbol = aSymbol;
//         } else {
//             num1 = ~~aArr.pop();
//             num2 = ~~bArr.pop();
//             if (parseInt(a, 10) < parseInt(b, 10)) {
//                 temp += num2 - num1;
//                 lastSymbol = bSymbol;
//             } else {
//                 temp += num1 - num2;
//                 lastSymbol = aSymbol;
//             }

//             if (temp < 0) {
//                 temp += 10;
//                 res = temp % 10 + res;
//                 temp = -1;
//             } else {
//                 res = temp % 10 + res;
//                 temp = 0;
//             }

//         }
//     }
//     res = res.replace(/^0+/, '');
//     if (!res) {
//         res = '0';
//     } else {
//         res = lastSymbol + res;
//     }
//     return res
// }

// console.log(sum('18', '19'))




// var dataLists = [1,2,3,4,5,6,7,8,9,11,100,123];
// var count = 0;

const limit = (list, n) => {
	let recursion = (arr) => {
		return new Promise(resolve => {
                // count++;
                setTimeout(()=>{
                    var curItem = arr.shift();
                    // console.log(curItem, '当前并发量:', count--)
                    resolve();
                }, Math.random() * 5000);
			})
			.then(() => {
				if (arr.length != 0) {
                    return recursion(arr);
                }
				return 'finish';
            });
    };
    let copy = [].concat(list);
	let async = [];
	while(n--){
		async.push(recursion(copy));
    }
    return Promise.all(async);
}

// limit(dataLists, 3).then((res) => console.log(res));


function unique() {
    let args = Array.prototype.slice.call(arguments, 0);
    let res = [];
    args.forEach((item) => {
        if (res.indexOf(item) === -1) {
            res.push(item)
        }
    })
    return res;
}



// function Foo() {
//     getName = function() { console.log(1); }
//     return this;
// }

// Foo.getName = function() {
//     console.log(2);
// }
// Foo.prototype.getName = function() {
//     console.log(3);
// }

// var getName = function () {
//     console.log(4);
// }

// function getName() {
//     console.log(5);
// }

// Foo.getName(); // 2
// getName(); // 4 变量提升getName，函数提升getName，后面给getName赋值

// Foo().getName(); // 1 全局getName替换，this指向window
// getName(); // 1 window.getName

// new Foo.getName(); // 2 new (Foo.getName()) new function(){console.log(2)}
// new Foo().getName(); // 3 (new Foo()).getName()

// new new Foo().getName(); // 3 (new new Foo()).getName()


// var arr = [1, 2, [3, 4, [5, 6]]];
// function flat(array) {
//     var arr = Array.isArray(array) ? arr : Array.prototype.slice.call(this, arguments);
//     var result = [];
//     var each = function(arr) {
//         arr.forEach(item => {
//             if (Array.isArray(item)) {
//                 each(item);
//             } else {
//                 result.push(item);
//             }
//         });
//     }
//     each(array);
//     return result;
// }


// Array.prototype.toString = function() {
//     return this.join(',');
// }
// function flat(arr) {
//     return arr + '';
// }


function x(promises) {
    let arr = [];
    let fn;
    promises.forEach(p=>{
        p.then(v => {
            arr.push(v);
            arr.length === 10 && fn(v);
        });
    });
    return new Promise(r => fn = r);
}
var arr = [];
for (let i = 0; i < 20; i++) {
    arr.push(
        new Promise((resolve, reject) => {
            setTimeout(() => {
                // console.log(i);
                resolve(i);
            }, 1000);
        })
    )
}

x(arr).then(res => {
    console.log(res);
})

// 递归
function recursion(level) {
    // recursion terminator
    if (level > MAX_LEVEL) {
        // print result
        return;
    }
    // process logic in current level
    process_data(level, data);

    // drill down
    recursion(level+1);

    // reverse the current level status if needed
    reverse_state(level);
}

// DFS
function DFS(node) {
    let visited = new Set();
    return _dfs(node);

    function _dfs(node) {
        visited.add(node);
        for (let node in node.children) {
            if (!visited.has(node)) {
                _dfs(node);
            }
        }
    }
}

// BFS
function BFS(nodes) {
    const queue = [];
    const visited = new Set();
    const start = nodes[0];
    queue.push([start]);

    while(queue.length) {
        // const node = queue.pop();
        // visited.add(node);
        _process(node);
        // nodes = generate_related_nodes(node);
        // queue.push(nodes);
    }

    function _process() {
        var len = queue.length;
        while(len--) {
            var node = queue.pop();
            visited.add(node);
            console.log(node);
            const nodes = node.children();
            queue.push(nodes);
        }
    }
}

// 二分查找
function MID(array, target) {
    let left = 0,
        right = array.length-1,
        mid;

    while(left < right) {
        mid = left + (right - left) / 2;
        if (array[mid] === target) {
            return mid;
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
}

// DP
function DP(m, n, x, y) {
    let dp = new Array(m+1).fill(new Array(n+1));

    dp[0][0] = x;
    dp[0][1] = y;

    for (let i=0; i<=n; ++i) {
        for (let j=0; j<=m; ++i) {
            d[i][j] = Math.min(dp[i-1][j], dp[i][j-1])
        }
    }

    return dp[m][n];
}





console.log(1);

setTimeout(function(){
    console.log(2);
}, 0);

console.log(3);


console.log('a');
setTimeout(function(){
    console.log('b');
}, 0)
// while(true) {
    
// }

// 异步队列执行时间，放入和执行
for (let i=0; i<4; i++) {
    setTimeout(function(){
        console.log(i);
    }, 1000);
}


var arr = [37, 2, 6, 10, 4, 8, 11, 90];

function quickSort(arr) {
    if (!Array.isArray(arr)) {
        return new Error('');
    }
    if (arr.length <= 1) {
        return arr;
    }
    let pivotIndex = Math.floor(arr.length/2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}


class Model {
    constructor(opts) {
        this.map = new Map();
        this.listeners = new Map();
        this.init(opts);
    }
    init(opts) {
        if (util.isObject(opts)) {
            Object.keys(opts).forEach(key => {
                this.map.set(key, opts[key]);
            });
        }
    }
    get(key) {
        return this.map.get(key);
    }
    set(key, value) {
        const data = {
            key,
            oldVal: this.map.get(key),
            newVal: value
        }
        this.map.set(key, value);
        this.emit(`change:${key}`, data);
        this.emit('change', data);
    }
    has(key) {
        return this.map.has(key);
    }
    unset(key) {
        const data = {
            key,
            oldVal: this.map.get(key),
            newVal: undefined
        }
        this.map.delete(key);
        this.emit(`change:${key}`, data);
        this.emit('change', data);
    }
    emit(name, data) {
        let cbs = this.listeners.get(name);
        let { key, oldVal, newVal } = data;
        cbs && cbs.length > 0 && cbs.forEach(cb => {
            if (name.indexOf(':') > 0) {
                cb(oldVal, newVal);
            } else {
                cb(key, oldVal, newVal);
            }
        });
    }
    on(name, cb) {
        if (!util.isFunction(cb)) {
            return new Error('On ===== callback type error:', cb);
        }
        let cbs = this.listeners.get(name) || [];
        cbs.push(cb);
        this.listeners.set(name, cbs);
    }

}

function example() {
    const person = new Model({ name: 'Jess', age: 22 });
    console.log(person.get('name')); // -> 'Jess'
    console.log(person.get('age')); // -> 22
  
    // note that Model accepts arbitrary properties, not just "name" and "age".
    var company = new Model();
    company.set('employees', 2500);
    company.set('revenue', 5);
    
    console.log(company.get('employees')); // -> 2500
    console.log(company.get('revenue')); // -> 5
    console.log(company.get('not present')); // -> undefined
    
    // here are all the methods for the model
    person.set('name', 'Bob');
    console.log(person.get('name'));   // -> 'Bob'
    console.log(person.has('name'));   // -> true
    person.unset('name');
    console.log(person.has('name'));   // -> false
  }
  

//   example();
  
  
//   function example1() {
//    const Model = function() {
//     this.name = 'apple';
//    }
//    Model.prototype.getName = function() {
//     return this.name;
//    }
//    const Person = Model.extend({
//     say: function() {
//             return '我有' + this.total + '个' + this.getName()
//         }
//    });
//    var b = new Person();
//    console.log(b.say()); // 我又3个apple
//   }
  
//   example1();
  
  
  function example2() {
    const person = new Model({ name: 'Jess', age: 22 });
    // the on method allows us add callbacks for events.
    // Model emits two events for each change:
    // 'change':              emitted on any change
    // 'change:${attribute}': emitted only when "attribute"
    //                        changes.
    // here’s a concrete example:
  
    person.on('change', function(key, oldVal, newVal) {
      // called when any attribute changes
      console.log('attr', key, 'changed from', oldVal, 'to', newVal);
    });
      
    person.on('change:name', function(oldVal, newVal) {
      // called only when the "name" attribute changes.
      // note that the signature of this callback is
      // different from the general ’change’ event 
      // callback
      console.log('specifically name changed from', oldVal, 'to', newVal);
    });
  
    // multiple handlers for the same event name
    person.on('change:twice', function() { console.log('first') })
    person.on('change:twice', function() { console.log('second') })
  
    person.set('dogs', 2);
    // in console: attr dogs changed from undefined to 2
    person.set('name', 'Donut');
    // in console: attr name changed from Jess to Donut
    // in console: specifically name changed from Jess to Donut
    person.unset('name')
    // in console: attr name changed from Donut to undefined
    // in console: specifically name changed from Donut to undefined
    person.set('twice', null)
    // in console: attr twice changed from undefined to null
    // in console: first
    // in console: second
  }
  
  example2();


// const utils = {
//     addEvent: function(ele, type, fn, useCapture) {
//         if ()
//     }
// }

var origin = [37, 2, 6, 10, 4, 8, 11, 90, 3];

function quickSort(arr) {
    if (!Array.isArray(arr)) {
        return new Error('');
    }
    if (arr.length <= 1) {
        return arr;
    }
    let copy = [...arr];
    let pivotIndex = Math.floor(copy.length/2);
    let pivot = copy.splice(pivotIndex, 1)[0];
    let left = [], right = [];
    for (let i = 0; i < copy.length; i++) {
        if (copy[i] < pivot) {
            left.push(copy[i]);
        } else {
            right.push(copy[i]);
        }
    }
    console.log(`left:${left}, right:${right}`);
    return quickSort(left).concat([pivot], quickSort(right));
}

var arr = quickSort(origin);
console.log(arr);


function selectionSort(arr) {
    let len = arr.length;
    let minIndex, temp;
    for (let i = 0; i < len; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}

arr = selectionSort(origin);
console.log(arr);



const util = {
    __type: function(obj) {
        const toString = Object.prototype.toString;
        const map = {
            '[object Array]': 'array',
            '[object Object]': 'object'
        };
        return map[toString.call(obj)];
    },
    isObject: function(obj) {
        return util.__type(obj) === 'object';
    },
    isArray: function(obj) {
        return Array.isArray ? Array.isArray(obj) : util.__type(obj) === 'array';
    },
    isFunction: function(fn) {
        return typeof fn === 'function';
    },
    extend: function(obj1, obj2, deep = false) {
        function _recursion(obj) {
            const res = {};
            if (!util.isObject(obj)) {
                return obj;
            }
            Object.keys(obj).forEach(key => {
                let val = obj[key];
                if (util.isObject(val)) {
                    res[key] = _recursion(val);
                } else {
                    res[key] = val;
                }
            })
            return res;
        }
        if (deep) {
            Object.keys(obj1).forEach(key => {
                if (obj2[key]) {
                    obj1[key] = _recursion(obj2[key]);
                }
            });
        } else {
            Object.assign(obj1, obj2);
        }
        return obj1;
    }
}

var obj1 = {
    a: 1,
    b: 2,
    c: {
        x: 1,
        y: {
            z: 0
        }
    }
};

var obj2 = {
    a: 3,
    c: {
        x: 2
    }
};

var obj = util.extend(obj1, obj2, true);
console.log(obj);


var arr1 = [-2, -1, 1,2,3,4];
var arr2 = [6,3,-1,-Infinity];
var arr3 = [1,1,1];

function isSort(arr) {
    var a = arr[0],
        b = arr[1];

    if (a<b) {
        for (var i=0; i<arr.length-1; i++) {
            if (arr[i] > arr[i+1]) {
                return false;
            }
        }
    } else {
        for (var i=0; i<arr.length-1; i++) {
            if (arr[i] < arr[i+1]) {
                return false;
            }
        }
    }

    return true;
}

console.log(isSort(arr1))
console.log(isSort(arr2))
console.log(isSort(arr3))


var hasGroupsSizeX = function(deck) {
    var min = Number.MAX_SAFE_INTEGER, dst = [];
    var deck = deck.sort((a, b) => a - b);
    console.log(deck);
    // 0,0,1,1,2,2
    for (var i = 0, len = deck.length; i < len; i++) {
        var tmp = [];
        console.log('i:',i)
        tmp.push(deck[i]);
        for (var j = i + 1; j < len; j++) {
            if (deck[i] === deck[j]) {
                tmp.push(deck[j])
            } else {
                if (min > tmp.length) {
                    min = tmp.length;
                }
                dst.push(tmp);
                i = j - 1;
                console.log('j:', j);
                break;
            }
        }
    }
    console.log(dst, min);
    let result = true;
    dst.every(item => {
        if (item.length % min !== 0) {
            result = false;
            return false;
        }
    });
    return result;
};

var arr = [1,2,3,4,4,3,2,1];
hasGroupsSizeX(arr);


class Node {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

class Tree {
    constructor(data) {
        let root = new Node(data.shift());
        // 遍历所有数据
        data.forEach(item => this.insert(root, item));
        return root;
    }
    insert(node, data) {
        if (node.val > data) {
            if (node.left === null) {
                node.left = new Node(data);
            } else {
                this.insert(node.left, data);
            }
        } else {
            if (node.right === null) {
                node.right = new Node(data);
            } else {
                this.insert(node.right, data);
            }
        }
    }
    static walk(root) {
        if (!root.left && !root.right) {
            return true;
        } else if ((root.left && root.val < root.left.val)
            || (root.right && root.val > root.right.val)
        ) {
            return false;
        } else {
            return Tree.walk(root.left)&&Tree.walk(root.left);
        }

    }
}

// let root = new Tree();
let root = new Node(2);
root.left = new Node(3);
root.right = new Node(1);
console.log(Tree.walk(root));

var lemonadeChange = function(bills) {
    // 存零钱
    let hand = [];
    //
    while (bills.length) {
        let money = bills.shift();
        if (money === 5) {
            hand.push(money);
        } else {
            hand.sort((a, b) => b - a);
            let change = money - 5;
            for (let i = 0, len = hand.length; i < len; i++) {
                if (hand[i] <= change) {
                    change -= hand[i];
                    hand.splice(i, 1);
                    // 删除元素，保持i不变
                    i--;
                }
                if (change === 0) {
                    break;
                }
            }
            if (change !== 0) {
                return false;
            } else {
                hand.push(money);
            }
        }
    }
    return true;
};

var arr = [5,5,5,10,20];
lemonadeChange(arr);

// F(1) = 1
// F(2) = 2;
// F(1), F(2) 是边界
// F(10) = F(9) + F(8)
// F(9), F(8) 是 F(10) 的最优子结构
// F(n) = F(n-1) + F(n-2) (n >= 3) // 状态转移方程



var uniquePathsWithObstacles = function(arr) {
    
    function dp (m, n) {
        if (m === 2 && n === 2) {
            // 边界
            return (arr[1][1] === 1 || (arr[1][0] + arr[0][1] === 2)) 
                ? 0
                : (arr[1][0] === 1 || arr[0][1] === 1)
                    ? 1
                    : 2;
        } else if (m < 2 || n < 2){
            if (m < 2) {
                // 单行有1
                return arr[m-1].includes(1) ? 0 : 1;
            } else {
                for (let i = 0; i < m; i++) {
                    if (arr[i][0] === 1) { // 单列有1
                        return 0;
                    }
                }
                return 1;
            }
        } else {
            return dp(m - 1, n) + dp(m, n - 1);
        }
    }
    // F(m, n) = F(m-1, n) + F(m, n-1);

    return dp(m, n);
}





// 字符串，数组，正则
// 查重，排序，递归
// 基础API，常用技巧

// 栈，队列，链表，矩阵，二叉树，堆
// 结构实现，查找，排序，拓展应用
// 原理，实现，实战思想

// 贪心算法
// 动态规划


var findSubstring = function(str, words) {
    // a b c  => a b c | a c b 
    // b a c
    // c a b
  // 保存结果
      let result = []
      // 记录数组的长度，做边界条件计算
      let num = words.length
      // 递归函数体
      let range = (r, _arr) => {
        if (r.length === num) {
          result.push(r)
        } else {
          _arr.forEach((item, idx) => {
            let tmp = [].concat(_arr)
            tmp.splice(idx, 1)
            range(r.concat(item), tmp)
          })
        }
      }
      range([], words);

      console.log(result);

      return result.map(item => str.indexOf(item.join(''))).filter(item => item > -1);
};
var str = 'barfoothefoobarman';
var words = ["foo","bar"];
console.log(findSubstring(str, words));

function Spin(props) {
    const { loading } = props;
    return (
        {
            loading ? <div className="layer"><img /></div> : null
        }
    )
}

const withLoading = (params) => (WrapComp) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.loading = typeof params === 'function' 
                ? params 
                : (props) => params.some(item => !!props[item]);
        }
        render() {
            let isLoading = this.loading(this.props);
            return (<Spin loading={isLoading}>
                        <WrapComp {...this.props}/>
                    </Spin>)
        }
    }
}


export default loadings => ComposedComponent => class extends ComposedComponent {
    constructor(props) {
      super(props)
      // 参数是函数
      if(typeof loadings === 'function') {
        this.func = loadings
      }
      // 参数是数组
      else if(Array.isArray(loadings)) {
        this.func = props => {
          let isLoading = false
          for(let i = 0, len = loadings.length; i < len; ++i) {
            if(props[loadings[i]]) {
              return true
            }
          }
          return false
        }
      }
      else {
        throw Error('请传入函数或数组作为参数')
      }
      if(!style) {
        const doc = document
        style = doc.createElement('style')
        style.type = 'text/css'
        style.innerHTML = '.withLoading .ant-spin-blur {filter: none}'
        doc.getElementsByTagName('head')[0].appendChild(style)
      }
    }
  
    render() {
      const isloading = this.func(this.props) || false
      return (
        <Spin spinning={isloading} wrapperClassName='withLoading'>
          {super.render()}
        </Spin>
      )
    }
  }





let urls = [0,1,2].map(item => `http://canva.design?id=${item}`);
// console.log(urls);

// let tpl = {
//     designId: 1,
//     shapes: [
//         { shapeId: 'basic-square', color: { r: 255, g: 255, b: 255 }},
//         { shapeId: 'basic-circle', color: { r: 255, g: 255, b: 255 }},
//         { shapeId: 'basic-diamond', color: { r: 255, g: 0, b: 0 }},
//         { shapeId: 'basic-rectangle', color: { r: 0, g: 255, b: 0 }}
//     ]
// };

var tpl = {
    designId: 1,
    shapes: [
      {shapeId: 'basic-shape', color: { r: 55, g: 40, b: 255 }, children: []},
      {shapeId: 'person', color: { r: 255, g: 255, b: 252 }, children: [
        {shapeId: 'person-head', color: { r: 255, g: 255, b: 255 }, children: []},
        {shapeId: 'person-body', color: { r: 205, g: 255, b: 252 }, children: []},
        {shapeId: 'person-legs', color: { r: 100, g: 255, b: 252 }, children: []},
      ]},
      {shapeId: 'zigzag-polygon', color: { r: 205, g: 255, b: 252 }, children: []},
      {shapeId: 'fish', color: { r: 205, g: 255, b: 252 }, children: [
        {shapeId: 'fish-eyes', color: { r: 255, g: 255, b: 255 }, children: []},
        {shapeId: 'fish-fin', color: { r: 100, g: 66, b: 74 }, children: [
          {shapeId: 'fish-fin-part-1', color: { r: 93, g: 54, b: 55 }, children: []},
          {shapeId: 'fish-fin-part-2', color: { r: 33, g: 255, b: 255 }, children: []},
          {shapeId: 'fish-fin-part-3', color: { r: 128, g: 53, b: 255 }, children: []},
        ]},
        {shapeId: 'fish-tail', color: { r: 255, g: 5, b: 255 }, children: []},
      ]},
      {shapeId: 'person', color: { r: 255, g: 255, b: 252 }, children: [
        {shapeId: 'person-head', color: { r: 255, g: 255, b: 255 }, children: []},
        {shapeId: 'person-body', color: { r: 205, g: 255, b: 252 }, children: []},
        {shapeId: 'person-legs', color: { r: 100, g: 255, b: 252 }, children: []},
      ]},
    ]
  }

//   data[i].shapes[j].color.r
//   res[id].r 
function getColor(shape, obj) {
    obj.r += shape.color.r;
    obj.g += shape.color.g;
    obj.b += shape.color.b;
    obj.len += 1;

    if (shape.children.length > 0) {
        shape.children(child => {
            getColor(child, obj);
        });
    }
    return;
}
data.map(item => {
    res[item.designId] = {
        r: 0,
        b: 0,
        g: 0,
        len: 0
    }
    item.shapes.map(shape => getColor(shape, res[item.designId]));
    Object.keys(obj).forEach(key => {
        res[item.designId][key] = res[item.designId][key] / res[item.designId]['len']; 
    });
});


  var res = [
      {
          designId: 1,
          color: { r: 111, g: 222, b: 121 }
      },
      {
        designId: 2,
        color: { r: 111, g: 222, b: 121 }
    }
  ]
function fetch(url) {
    return new Promise(resolve => {
        setTimeout(() => resolve(tpl), Math.random() * 10);
    });
}
urls = urls.map(url => fetch(url));
// console.log(urls);
function getColor(shape, tmp) {
    tmp.push(shape.color);
    tmp.r += shape.color.r;
    tmp.g += shape.color.g;
    tmp.b += shape.color.b;
    if (shape.children.length < 1) {
        return tmp;
    }
    shape.children.forEach( s => {
        getColor(s, tmp);
    });
}
Promise.all(
    urls
).then(res => {
    // console.log('done:', res);
    let map = {};
    res.forEach((item, idx) => {
        let { designId, shapes } = item;
        map[idx] = [];
        map[idx].r = 0;
        map[idx].g = 0;
        map[idx].b = 0;
        shapes.forEach(shape => {
            //shape.children
            getColor(shape, map[idx]);
            console.log("=====:", map[idx])
            
        });
        map[idx].r = map[idx].r/map[idx].length;
        map[idx].g = map[idx].g/map[idx].length;
        map[idx].b = map[idx].b/map[idx].length;
    });

    
    let result = {};
    // Object.keys(map).forEach(key => {
    //     let arr = map[key];
    //     result[key] = {};
    //     map[key].r = 0;
    //     map[key].g = 0;
    //     map[key].b = 0;
    //     arr.forEach(color => {
    //         // console.log(color);
    //         map[key].r += color.r;
    //         map[key].g += color.g;
    //         map[key].b += color.b;
    //     });
    //     result[key].r = map[key].r/map[key].length;
    //     result[key].g = map[key].g/map[key].length;
    //     result[key].b = map[key].b/map[key].length;
    // });
    for (var item in map) {
        result[item] = {};
        result[item].r = map[item].r;
        result[item].g = map[item].g;
        result[item].b = map[item].b;
    }
    console.log('result:', result[0]);
    return map;
})


const store = {
}

// const Context = React.createContext();
// const Provider = Context.Provider;
// const Consumer = Context.Consumer;

// function App() {
//     return (
//         <div className="app">
//             <Provider value={store}>
//                 <Consumer>{ctx = <Home {...ctx} />}</Consumer>
//             </Provider>
//         </div>
//     )
// }

- 二年级
    - 数学
    - 语文
- 三年级
    - 数学
    - 语文
    - 英语

function Node(props) {
    return (
        <li>
            <h3>props.title</h3>
            {
                props.children && 
                (<ul>
                    props.children.map(child => <Node {...child } key={child.id} />);
                </ul>)
            }
        </li>
    );
};

function Page() {
    let [data, setData] = useState({});
    useEffect(() => {
        setTimeout(() => {
            setData(data);
        }, 1000);
    })
    return (
        data &&
        (<ul>
            data.map(node => (<Node {...node} key={node.id}) />)
        </ul>)
    )
};

var data = [
    {id: 1, text: '二年级', parentId: 0},
    {id: 2, text: '数学', parentId: 1},
    {id: 3, text: '语文', parentId: 1},
    {id: 4, text: '三年级', parentId: 0},
    {id: 5, text: '数学', parentId: 4},
    {id: 6, text: '语文', parentId: 4},
    {id: 7, text: '英语', parentId: 4}
]

map[id] = item;
map[id].children = [];


var a = {
    x: 1,
    b: 
}

function covertToTree(arr){
    if(!arr) return arr;
    var result = [];
    var map = {};
    arr.forEach(item => {
        map[item.id] = item;
    });

    arr.forEach((item) => {
        const { parentId } = item;
        if (parentId === 0) {
            result.push(item);
        } else {
            if (!map[parentId].children) {
                map[parentId].children = [];
            }
            map[parentId].children.push(item);
        }
    });
    return result;

}

console.log(covertToTree(source));


var arr = [11, 4, 7, 9, 10, 2, 1];
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (arr[i] > arr[j]) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            console.log(arr);
        }
        
    }
    return arr;
}

// console.log(bubbleSort(arr));


function insertSort(arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        for (let j = i; j > 0; j--) {
            if (arr[j] < arr[j-1]) {
                [arr[j], arr[j-1]] = [arr[j-1], arr[j]];
            } else {
                break;
            }
        }
    }
    return arr;
}

// console.log(insertSort(arr));


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
        if (left < right && pivot >= arr[left]) {
            left++;
        }
        arr[right] = arr[left];
    }
    arr[left] = pivot;
    console.log(arr);

    quickSort(arr, low, left - 1);
    quickSort(arr, left + 1, right);
    return arr;
}

// console.log(quickSort(arr));


Array.prototype.flat = function() {
    let arr = [];
    this.forEach(item=> {
        if (Array.isArray(item)) {
            arr = arr.concat(item.flat());
        } else {
            arr.push(item);
        }
    });
    return arr;
}






function stairs(n) {
    let mem = [0, 1, 2];
    if (mem[n]) return mem[n];
    let i = 3;
    while(i < n) {
        mem[i] = mem[i-1] + mem[i-2];
        i++;
    }
    return mem[n];
};

console.log(stairs(5));


function binarySearch(arr, target) {
    let low = 0, high = arr.length;
    
    while (low <= high) {
        let mid = Math.floor((low + high)/2);
        let cur = arr[mid];
        if (cur === target) {
            return mid;
        }
        if (cur > target) {
            high = mid - 1;
        } else if (cur < target) {
            low = mid + 1;
        }
    }

    return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9, 10], 10));


function isBalance(str) {
    if (typeof str !== 'string') return false;
    let stack = [];
    
    const map = {
        '(': ')',
        '{': '}',
        '[': ']'
    };
    const right = Object.values(map);
    for (let i = 0, len = str.length; i < len; i++) {
        let c = str.charAt(i);
        if (map[c]) {
            stack.push(c);
        } else if (right.includes(c)) {
            if (map[stack.pop()] !== c) {
                return false;
            }
        }
    }
    return !stack.length;
}

console.log(isBalance('()[({})]'));


// 获得一棵树的特定值
const total = (arr) => arr.reduce((res, x) => res + x);
function walk(root, sum) {
    let res = [];
    const _walk = (node, tmp) => {
        tmp.push(node.val);
        const t = total(tmp);
        if (t === sum) {
            res.push([...tmp]);
            return;
        } else if (t < sum) {
            if (node.left) _walk(node.left, [...tmp]);
            if (node.right) _walk(node.right, [...tmp]);
        }
        return;
    }
    _walk(root, []);
    return res;
}




function Node(props) {
    return (
        <li>
            <h3>props.title</h3>
            {
                props.children && 
                (<ul>
                    props.children.map(child => <Node {...child } key={child.id} />);
                </ul>)
            }
        </li>
    );
};

function Page(props) {
    let [data, setData] = useState({});
    useEffect(() => {
        setTimeout(() => {
            setData(data);
        }, 1000);
    })
    return (
        data &&
        (<ul>
            data.map(node => (<Node {...node} key={node.id}) />)
        </ul>)
    )
};


<template>
    <li>
        <div @click="toggle">
            {{model.title}}
        </div>
        <span v-if="isFolder">[{{open ? '-' : '+'}}]</span>
        <ul v-show="open" v-if="isFolder">
            <item class="item" v-for="model in model.children" :model="model" :key="model.title" />
        </ul>
    </li>
</template>


Vue.use(VueRouter);

let Vue;

class VueRouter {
    constructor(options) {
        this.$options = options;
        this.routeMap = {};
        this.app = new Vue({
            data: {
                current: '/'
            }
        });
    }
    init() {
        this.bindEvent();
        this.createRouteMap();

        // RouterLink, RouterView
        this.initComponent();
    }
    bindEvent() {
        window.addEventListener('hashchange', this.onHashChange.bind(this));
        window.addEventListener('load', this.onHashChange.bind(this));
    }
    onHashChange() {
        // http://localhost/#/home
        this.app.current = window.location.hash.slice(1) || '/';
    }
    createRouteMap() {
        // ['/home'] : {path: '/home', component: Home}
        this.$options.routes.forEach(item => this.routeMap[item.path] = item;)
    }
    initComponent() {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render(h) {
                // <a :href="to" />
                return h('a', {attrs: {href: '#'+this.to}}, this.$slots.default);
                // return <a href={this.to}>{this.$slots.default}</a>
            }
        });
        Vue.component('router-view', {
            render = (h) => { // 保留当前this指向，指向VueRouter实例
                const Comp = this.routeMap[this.app.current].component;
                return h(Comp);
            }
        });
    }
}

VueRouter.install = function(_Vue) {
    Vue = _Vue;

    Vue.mixin({ // 扩展Vue
        beforeCreate() {
            // 会在外面初始化的时候被调用
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
                this.$options.router.init();
            }
        }
    });
}

// 1. 维护状态state
// 2. 修改状态commit
// 3. 业务逻辑控制dispatch
// 4. 状态派发getter
// 5. 实现state响应式
// 6. 插件

let Vue;

function install(_Vue, storeName = '$store') {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vue.prototype[storeName] = this.$options.store;
            }
        } 
    })
}

class Store {
    constructor(options = {}) {
        // 利用vue数据响应式
        this.state = new Vue({
            data: options.state
        });
        this.mutations = options.mutations || {};
        this.actions = options.actions || {};

        options.getters && this.handleGetters();
    }
    commit = (type, arg) => {
        const fn = this.mutations[type];
        fn(this.state, arg);
    }
    dispatch = (type, arg) => {
        const fn = this.actions[type];
        return fn({
            commit: this.commit,
            state: this.state
        }, arg);
    }
    handleGetters(getters) {
        this.getters = {};
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                get: () =>  getters[key](this.state) // 定义只读属性
            });
        })
    }
}

export default { Store, install }


var a = {
    x: 1,
    y: b,
}

var b = {
    x: 2,
    y: c,
}

var c = {
   x: 3,
   y: d,
}

var d = {
    x: 4,
    y: b
}

