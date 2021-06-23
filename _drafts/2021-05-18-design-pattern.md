---
layout: post
title: '设计模式-版本2'
categories: frontend
---

# 设计模式

## 单例模式

单例模式的核心是确保只有一个实例，并提供全局访问。

全局变量不是单例模式，但在 JavaScript 开发中，把全局变量当作单例来使用。

```js
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};
Singleton.prototype.getName = () => {
  alert(this.name);
};
Singleton.getInstance = (name) => {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};
var a = Singleton.getInstance('1');
var b = Singleton.getInstance('2');
```

### 降低全局变量的命名污染

#### 使用命名空间

```js
var namespace1 = {
  a: function () {
    alert(1);
  },
  b: function () {
    alert(2);
  },
};
```

#### 使用闭包封装私有变量

```js
var user = (function () {
  var __name = 'seven',
    __age = 29;
  return {
    getUserInfo: function () {
      return __name + ',' + __age;
    },
  };
})();
```

### 惰性单例

```js
// 基于类的单例模式
Singleton.getInstance = (function () {
  var instance = null;
  return function (name) {
    if (!instance) {
      instance = new Singleton(name);
    }
    return instance;
  };
})();
```

```js
var getSingle = function (fn) {
  var result;
  return function () {
    return result || (result = fn.apply(this, arguments));
  };
};

var bindEvent = getSingle(function () {
  document.getElementById('div').onclick = function () {
    alert('click');
  };
  return true;
});

var render = function () {
  console.log('render');
  bindEvent();
};

// 绑定事件仅会调用一次
render();
render();
render();
```

## 策略模式

定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

一个策略模式的程序至少由两部分组成。第一部分是一组策略类，封装了具体的算法，并负责具体的计算过程，也可以封装一系列的业务规则。第二部分是环境类 Context，Context 接受客户请求，并把请求委托给某一个策略类。

> 在函数作为一等对象的语言中，策略模式是隐形的。strategy 就是值为函数的变量

```js
var strategies = {
  S: (salary) => {
    return salary * 4;
  },
  A: (salary) => {
    return salary * 3;
  },
  B: (salary) => {
    return salary * 2;
  },
};

var calculateBonus = (level, salary) => {
  return strategies[level](salary);
};
```

- 利用组合，委托和多态等技术和思想，可以有效避免多重条件选择
- 对开放-封闭原则的完美支持，算法封装在独立 strategy 中，易于切换，理解，扩展
- 可复用

## 代理模式

为一个对象提供一个代用品或占位符，以便控制对它的访问。代理模式的关键是当客户不方便直接访问一个对象或者不满足需要的时候，提供一个提神对象来控制对这个对象的访问。

- 保护代理：控制不同权限的对象对目标对象的访问，但 JavaScript 无法判断谁访问了某个对象
- 虚拟代理：把开销很大的对象，延迟到真正需要它的时候再创建
- 缓存代理：缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可以直接返回前面存储的运算结果

### 虚拟代理实现图片预加载

```js
const myImage = (() => {
  const imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: (src) => {
      imgNode.src = src;
    }
  }
})();

myImage.setSrc('');

// 符合开放-封闭原则；单一职责原则；
const proxyImage  (() => {
  const img = new Image();
  img.onload = () => {
    myImage.setSrc(this.src);
  }
  document.body.appendChild(imgNode);
  return {
    setSrc: (src) => {
      myImage.setSrc('loading.gif');
      img.src = src;
    }
  }
})();

proxyImage.setSrc('');

```

### 虚拟代理合并 HTTP 请求

```js
const synchronousFile = (id) => {
  console.log(`开始同步文件，ID为：${id}`);
};

const proxySynchronousFile = (() => {
  var cache = [],
    timer;
  return function (id) {
    cache.push(id);
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      synchronousFile(cache.join(','));
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000);
  };
})();
```

### 虚拟代理惰性加载中的应用

```js
const miniConsole = (() => {
  const cache = [];
  const handler = (event) => {
    if (event.keyCode === 113) {
      const script = document.createElement('script');
      script.onload = () => {
        cache.forEach((fn) => fn());
      };
      script.src = 'miniConsole.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  };
  document.body.addEventListener('keydown', handler, false);

  return {
    log: () => {
      const args = arguments;
      cache.push(() => {
        return miniConsole.log.apply(miniConsole, args);
      });
    },
  };
})();

miniConsole.log(11);

// 真正的miniConsole
miniConsole = {
  log: () => {
    console.log(Array.prototype.join.call(arguments));
  },
};
```

### 用高阶函数动态创建代理

通过高阶函数，可以为各种计算方法创建缓存代理，这些计算方法被当作参数传入一个专门用于创建缓存的代理工厂中。

```js
const mult = fucntion() {
  let res = 1;
  let arr = [...arguments];
  return arr.reduce((res, item) => res * item);
};

const plus = function() {
  let res = 1;
  let arr = [...arguments];
  return arr.reduce((res, item) => res + item);
}

// 创建缓存代理的工厂

const createProxyFactory = (fn) => {
  const cache = {};
  return function() {
    const args = Array.prototype.join.call(arguments, ', ');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
}

const proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus);

```

## 迭代器模式

迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。迭代器模式可以把迭代的过程从业务逻辑中分离出来，在使用迭代器模式之后，即使不关心对象的内部构造，也可以按顺序访问其中的每个元素。

### 内部迭代器

```js
const each = function (ary, cb) {
  for (var i = 0, l = ary.length; i < l; i++) {
    cb.call(ary[i], i, ary[i]);
  }
};

each([1, 2, 3], function (i, n) {
  alert(`i:${i}, n:${n}`);
});
```

### 外部迭代器

```js
const Interator = function (obj) {
  let current = 0;
  let next = function () {
    current += 1;
  };
  let isDone = function () {
    return current >= obj.length;
  };

  let getCurrItem = function () {
    return obj[current];
  };

  return {
    next,
    isDone,
    getCurrItem,
    length: obj.length,
  };
};

const compare = function (i1, i2) {
  if (i1.length !== i2.length) {
    return;
  }
  while (!i1.isDone() && !i2.isDone) {
    if (i1.getCurrItem() !== i2.getCurrItem()) {
      return;
    }
    i1.next();
    i2.next();
  }
  console.log('====');
};
```

## 发布订阅模式

发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在 JavaScript 开发中，我们一般用事件模型来替代传统的发布—订阅模式。

```js
const event = {
  list: [],
  listen: function (key, fn) {
    if (!this.list[key]) {
      this.list[key] = [];
    }
    this.list[key].push(fn);
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments);
    fns = this.list[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    fns.forEach((fn) => fn.apply(this, arguments));
  },
  remove: function (key, fn) {
    var fns = this.list[key];
    if (!fns) {
      return false;
    }
    if (fn) {
      for (let l = fns.length - 1; l >= 0; l--) {
        let _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  },
};
```

## 命令模式

命令模式是最简单和优雅的模式之一，命令模式中的命令（command）指的是一个执行某些特定事情的指令。

命令模式的由来，其实是回调（callback）函数的一个面向对象的替代品。

```js
const Command = function (receiver) {
  return {
    execute: function () {
      receiver.refresh();
    },
  };
};

const setCommand = function (button, command) {
  button.onclick = function () {
    command.execute();
  };
};

const refreshCommand = Command(MenuBar);
setCommand(button1, refreshCommand);
```

### 撤销命令

```js
const ball = document.getElementById('ball');
const pos = document.getElementById('pos');
const moveBtn = document.getElementById('moveBtn');
const cancelBtn = document.getElementById('cancelBtn');

const MoveCommand = function (receiver, pos) {
  this.receiver = receiver;
  this.pos = pos;
  this.oldPos = null;
};

MoveCommand.prototype.execute = function () {
  this.receiver.start('left', this.pos, 1000, 'strongEaseOut');
  this.oldPos = this.receiver.dom.getBountdingClientReact()[this.receiver.propertyName];
};

MoveCommand.prototype.undo = function () {
  this.receiver.start('left', this.oldPos, 1000, 'strongEaseOut');
};

let moveCommand;

moveBtn.onclick = function () {
  const animate = new this.animate(ball);
  moveCommand = new MoveCommand(animate, pos.value);
  moveCommand.execute();
};
cancelBtn.onclick = function () {
  moveCommand.undo();
};
```

> 记录命令日志，然后重复执行它们，这是逆转不可逆命令的一个好办法

```js
const Ryu = {
  attack() {
    console.log('attack!');
  },
  defense() {
    console.log('defense!');
  },
  jump() {
    console.log('jump!');
  },
  crouch() {
    console.log('crouch');
  },
};

const makeCommand = (receiver, state) => {
  return function () {
    receiver[state]();
  };
};

const commands = {
  119: 'jump', // W
  115: 'crouch', // S
  97: 'defense', // A
  100: 'attack', // D
};

let commandStack = [];

document.onkeypress = function (ev) {
  let keyCode = ev.key,
    command = makeCommand(Ryu, commands[keyCode]);

  if (command) {
    command();
    commandStack.push(command);
  }
};

document.getElementById('replay').onclick = function () {
  let command;
  while ((command = commandStack.shift())) {
    command();
  }
};
```

### 宏命令

```js
const closeDoorCommand = {
  execute() {
    console.log('关门');
  },
};

const openPcCommand = {
  execute() {
    console.log('开电脑');
  },
};

const openQQCommand = {
  execute() {
    console.log('登录QQ');
  },
};

const MacroCommand = function () {
  return {
    commandList: [],
    add(command) {
      this.commandList.push(command);
    },
    execute() {
      for (let i = 0, command; (command = this.commandList[i++]); ) {
        command.execute();
      }
    },
  };
};

const macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);

macroCommand.execute();
```

策略模式指向的问题域更小，所有策略对象的目标总是一致的，它们只是达到这个目标的不同手段，它们的内部实现是针对“算法”而言的。而智能命令模式指向的问题域更广，command 对象解决的目标更具发散性。命令模式还可以完成撤销、排队等功能

## 组合模式

组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成的

```js
// 深度遍历；但不是父子关系，而是HAS-A聚合关系
const Folder = function (name) {
  this.name = name;
  this.parent = null;
  this.files = [];
};

Folder.prototype.add = function (file) {
  file.parent = this;
  this.files.push(file);
};

Folder.prototype.scan = function () {
  console.log('开始扫描：' + this.name);
  for (let i = 0, file, files = this.files; (file = files[i++]); ) {
    file.scan();
  }
};

Folder.prototype.remove = function () {
  if (!this.parent) {
    return;
  }
  for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    let file = files[l];
    files.splice(l, 1);
  }
};

const File = function (name) {
  this.name = name;
  this.parent = null;
};
File.prototype.add = function () {
  throw new Error('文件夹下面不能再添加文件！');
};
File.prototype.scan = function () {
  console.log('开始扫描文件：' + this.name);
};
File.prototype.remove = function () {
  if (!this.parent) {
    return;
  }
  for (let files = this.parent.files, l = files.length - 1; l >= 0; l--) {
    let file = files[l];
    files.splice(l, 1);
  }
};

var folder = new Folder('学习资料');
var folder1 = new Folder('jQuery');
var folder2 = new Folder('JavaScript');

var file1 = new File('精通jQuery');
var file2 = new File('JavaScript设计模式与开发实践');
var file3 = new File('重构与模式');

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

folder.scan();
```

### 何时使用组合模式

- 表示对象的部分-整体层次结构
- 客户希望统一对待树中的所有对象

## 模版方法模式

基于继承的设计模式 -- 模版方法模式

模版方法封装了子类的算法框架，作为一个算法的模版，指导子类以何种顺序去执行哪些方法。

### 适用模版方法的场景

- 组件的构建过程
  - 初始化一个 div 容器
  - 通过 ajax 请求拉取数据
  - 把数据渲染到 div 容器里面，完成组件的构造
  - 通知用户组件渲染完毕

```js
const Beverage = function (param) {
  const boilWater = function () {
    console.log('boil');
  };
  const brew =
    param.brew ||
    function () {
      throw new Error('must have brew');
    };
  const pourInCup =
    param.pourInCup ||
    function () {
      throw new Error('must have pourInCup');
    };
  const addCondiments =
    param.addCondiments ||
    function () {
      throw new Error('must have addCondiments');
    };
  const F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };
  return F;
};

const Coffee = Beverage({
  brew() {},
  pourInCup() {},
  addCondiments() {},
});

const Tea = Beverage({
  brew() {},
  pourInCup() {},
  addCondiments() {},
});

const coffee = new Coffee();
coffee.init();

const tea = new Tea();
tea.init();
```

> 在 JavaScript 中，高阶函数是替代模版方法的更好的选择

## 享元模式

享元（flyweight）模式是一种用于性能优化的模式，可以很好地解决大量对象带来的性能问题。

享元模式要求将对象的属性划分为内部状态与外部状态（状态在这里通常指属性）。享元模式的目标是尽量减少共享对象的数量，关于如何划分内部状态和外部状态，下面的几条经验提供了一些指引。

- 内部状态存储于对象内部。
- 内部状态可以被一些对象共享。
- 内部状态独立于具体的场景，通常不会改变。
- 外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。

### 通用对象池实现

```js
const objectPoolFactory = function (createObjFn) {
  var objectPool = [];
  return {
    create: function () {
      return objectPool.length === 0 ? createObjFn.apply(this, arguments) : objectPool.shift();
    },
    recover: function (obj) {
      objectPool.push(obj);
    },
  };
};
```

## 职责链模式

定义：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

优点：请求发送者只需要知道链中的第一个节点，从而弱化了发送者和一组接收者之间的强联系。

```js
const order500 = function (type, pay, stock) {
  if (type === 1 && pay) {
    console.log('500-100');
  } else {
    return 'nextSuccessor';
  }
};

const order200 = function (type, pay, stock) {
  if (type === 2 && pay) {
    console.log('200-50');
  } else {
    return 'nextSuccessor';
  }
};

const orderNormal = function (type, pay, stock) {
  if (stock > 0) {
    console.log('normal');
  } else {
    return 'nextSuccessor';
  }
};

const Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor);
};

Chain.prototype.passRequest = function () {
  const ret = this.fn.apply(this, arguments);
  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }
  return ret;
};

const chainOrder500 = new Chain(order500);
const chainOrder200 = new Chain(order200);
const chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500);
```

### 异步的职责链

```js
Chain.prototype.next = function () {
  return this.successor && this.successor.passRequest.apply(this.successor, arguments);
};

const fn1 = new Chain(function () {
  console.log(1);
  return 'nextSuccessor';
});

const fn2 = new Chain(function () {
  console.log(2);
  setTimeout(() => {
    this.next();
  }, 1000);
});

const fn3 = new Chain(function () {
  console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
```

```js
Function.prototype.after = function (fn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }
    return ret;
  };
};
var order = order500.after(order200).after(orderNormal);
order(1, true, 500);
```

## 中介者模式

中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可。中介者使各对象之间耦合松散，而且可以独立地改变它们之间的交互。中介者模式使网状的多对多关系变成了相对简单的一对多关系。

```js
function Player(name, team) {
  this.name = name;
  this.team = team;
  this.state = 'alive';
}

Player.prototype.win = function () {
  console.log(this.name + 'win');
};

Player.prototype.lose = function () {
  console.log(this.name + 'lose');
};

Player.prototype.die = function () {
  this.state = 'dead';
  playerDirector.receiveMessage('playerDead', this);
};
Player.prototype.remove = function () {
  playerDirector.receiveMessage('removePlayer', this);
};

Player.prototype.changeTeam = function () {
  playerDirector.receiveMessage('changeTeam', this);
};

const playerFactory = function (name, team) {
  const newPlayer = new Player(name, team);
  playerDirector.receiveMessage('addPlayer', newPlayer);
  return newPlayer;
};

const playerDirector = (function () {
  let players = {},
    operations = {};
  operations.addPlayer = function (player) {
    let team = player.team;
    players[team] = players[team] || [];
    players[team].push(player);
  };
  operations.removePlayer = function (player) {
    let team = player.team,
      teamPlayers = players[team] || [];
    for (let i = 0; i < teamPlayers.length; i++) {
      const p = teamPlayers[i];
      if (p === player) {
        teamPlayers.splice(i, 1);
        break;
      }
    }
  };
  operations.changeTeam = function (player, team) {
    operations.removePlayer(player);
    player.team = team;
    operations.addPlayer(Player);
  };

  operations.playerDead = function (player) {
    let team = player.team,
      teamPlayers = players[team];
    let all_dead = true;
    for (let i = 0; i < teamPlayers.length; i++) {
      const p = teamPlayers[i];
      if (p.state !== 'dead') {
        all_dead = false;
        break;
      }
    }
    if (all_dead) {
      for (let i = 0, player; (player = teamPlayers[i++]); ) {
        player.lose();
      }
      for (let color in players) {
        if (color !== team) {
          let teamPlayers = players[color];
          teamPlayers.forEach((p) => p.win());
        }
      }
    }
  };

  const receiveMessage = function () {
    const msg = Array.prototype.shift.call(arguments);
    operations[msg].apply(this, arguments);
  };

  return {
    receiveMessage,
  };
})();
```

## 装饰者模式

装饰者模式可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。

代理模式和装饰者模式最重要的区别在于它们的意图和设计目的。代理模式的目的是，当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者。本体定义了关键功能，而代理提供或拒绝对它的访问，或者在访问本体之前做一些额外的事情。装饰者模式的作用就是为对象动态加入行为。换句话说，代理模式强调一种关系（Proxy 与它的实体之间的关系），这种关系可以静态的表达，也就是说，这种关系在一开始就可以被确定。而装饰者模式用于一开始不能确定对象的全部功能时。代理模式通常只有一层代理-本体的引用，而装饰者模式经常会形成一条长长的装饰链。

## 状态模式

状态模式的关键是区分事物内部的状态，事物内部状态的改变往往会带来事物的行为改变。

```js
const FSM = {
  off: {
    buttonWasPressed: function () {
      console.log('关灯');
      this.button.innerHTML = '开灯';
      this.currState = FSM.on;
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯');
      this.button.innerHTML = '关灯';
      this.currState = FSM.off;
    },
  },
};

const Light = function () {
  this.currState = FSM.off;
  this.button = null;
};

Light.prototype.init = function () {
  let button = document.createElement('button'),
    self = this;
  button.innerHTML = '已关灯';
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    self.currState.buttonWasPressed.call(self);
  };
};

let light = new Light();
light.init();
```
