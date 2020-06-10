---
layout: post
title: "设计模式"
categories: frontend
---

设计模式(Design Pattern)是⼀一套被反复使⽤用、多数⼈人知晓的、经过分类的、代码设计经验的
总结

## 订阅/发布模式（观察者）

```js
class Event {
    constructor() {
        this.callbacks = {};
    }
    $on(name, fn) {
        (this.callbacks[name]) || (this.callbacks[name] = []).push(fn);
    }
    $off(name) {
        this.callbacks[name] = null;
    }
    $emit(name, arg) {
        const cbs = this.callbacks[name];
        if (cbs) {
            cbs.forEach(c => {
                c.call(this, arg);
            });
        }
    }
}

let event = new Event();
event.$on('evt1', arg => {
    console.log('evt1', arg);
});
event.$emit('evt1', '哈哈哈');

```

## 单例模式

全局变量，重复使用的功能

```js
const getSingle = function(fn) {
    let instance;
    return function() {
        return instance || (instance = fn.apply(this, arguments));
    }
}
```

## 策略模式

将算法和算法的使用分离开来
Keep it simple and stupid

```js
// {
//     "S": 5, "A": 3, "B": 2
// }
var strategies = {
    "S": function( salary ) {
        return salary * 4;
    },
    "A": function( salary ) {
        return salary * 3;
    },
    "B": function( salary ) {
        return salary * 2;
    }
};
var calculateBonus = function( level, salary ){
    return strategies[ level ] ? strategies[ level ]( salary ) : salary;
};

calculateBonus('S', 1000);
};
```

## 代理模式

为⼀一个对象提供⼀一个代⽤用品或占位符，以便便控制对它的访问

```js

let imgFunc = (function(){
    let imgNode = document.createElement('img);
    document.body.appendChild(imgNode);
    return {
        setSrc(src) {
            // 耗时
            setTimeout(() => {
                imgNode.src = src;
            }, 1000)
        }
    }
})();
imgFunc.setSrc('');

// 使用代理，增加loading

let proxyImage = (function() {
    let img = new Image();
    img.onlaod = function() {
        imgFunc.setSrc(this.src);
    };
    return {
        setSrc(src) {
            imgFunc.setSrc('loading.gif');
            img.src = src;
        }
    }
})();
proxyImage.setSrc('');

```

## 中介者模式

通过⼀一个中介者对象，其他所有的相关对象都通过该中介者对象来通信，⽽而不不是相 互引⽤用，当其中的⼀一个对象发⽣生改变时，只需要通知中介者对象即可。通过中介者模式可以解除对象与 对象之间的紧耦合关系。

redux，vuex 都属于中介者模式的实际应⽤用，我们把共享的数据，抽离成⼀一个单独的store， 每个都通 过store这个中介来操作对象。

## 装饰器模式

在不不改变对象⾃自身的基础上，在程序运⾏行行期间给对象动态地添加⽅方法。常⻅见应⽤用， react的⾼高阶组件, 或者react-redux中的@connect 或者⾃自⼰己定义⼀一些⾼高阶组件。

```js
const withLoading = (params) => (WrapComp) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.loading = typeof params === 'function' 
                ? params 
                : (props) => params.some(item => props[item]);
        }
        render() {
            let isLoading = this.loading(this.props);
            return (<Spin loading={isLoading}>
                        <WrapComp {...this.props}/>
                    </Spin>)
        }
    }
}
 
Function.prototype.before = function( beforefn ){
    var __self = this; // 保存原函数的引⽤用
    return function(){ // 返回包含了了原函数和新函数的"代理理"函数
        beforefn.apply( this, arguments ); // 执⾏行行新函数，且保证 this 不不被劫持，新函 数接受的参数 // 也会被原封不不动地传⼊入原函数，新函数在原函数之前执⾏行行
        return __self.apply( this, arguments ); // 执⾏行行原函数并返回原函数的执⾏行行结 果， // 并且保证 this 不不被劫持
    }
}
Function.prototype.after = function( afterfn ){
    var __self = this;
    return function(){
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments );
        return ret;
    }
};
```

代理理模式的⽬目的是，当直接访问本体不不⽅方便便或者不不符合需要时，为这个本体提供⼀一个替代者。本体定义了了关键功能，⽽而代理理提供或拒绝对它的访问，或者在 访问本体之前做⼀一些额外的事情。
装饰者模式的作⽤用就是为对象动态加⼊入⾏行行为。

## 外观模式

外观模式即让多个⽅方法⼀一起被调⽤用

```js
addEvent(dom, type, fn) {
    if (dom.addEventListener) {
        dom.addEventListener(type, fn, false);
    } else if (
        dom.attachEvent) { dom.attachEvent('on' + type, fn);
    } else {
        dom['on' + type] = fn;
    }
}
```

## 工厂模式

## 建造者模式

## 迭代器器模式

## 享元模式

## 职责联模式

KOA源码

## 适配器模式

适配器器模式主要⽤用来解决两个已有接⼝口之间不不匹配的问题，它不不考虑这些接⼝口是怎样实 现的，也不不考虑 它们将来可能会如何演化。适配器器模式不不需要改变已有的接⼝口，就能够 使它们协同作⽤用。

JSON解决多语言不好数据交换解决方案。

装饰者模式和代理理模式也不不会改变原有对象的接⼝口，但装饰者模式的作⽤用是为了了给对象 增加功能。装饰 者模式常常形成⼀一条⻓长的装饰链，⽽而适配器器模式通常只包装⼀一次。代理理 模式是为了了控制对对象的访问， 通常也只包装⼀一次。

## 模版方法

模板⽅方法模式在⼀一个⽅方法中定义⼀一个算法的⻣骨架，⽽而将⼀一些步骤的实现延迟到⼦子类中。模板⽅方法 使得⼦子类可以在不不改变算法结构的情况下，重新定义算法中某些步骤的具体实现。

插槽 slot

## 备忘录模式

设计原则：
    单一职责，一个模块就负责一个事情
    DRY，KISS
