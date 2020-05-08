---
layout: post
title: "浏览器API"
categories: frontend
tag: [HTML, CSS, JavaScript, 浏览器]
---

主要讲解各种浏览器API，包括 DOM API, CSSOM 以及各种其他API

## DOM

主要讲解DOM API的内容，包括节点，Range和节点遍历。以及NodeIterator和TreeWalker来遍历树。

### DOM API

DOM API 大致会包含 4 个部分。

- 节点：DOM 树形结构中的节点相关 API。
- 事件：触发和监听事件相关 API。
- Range：操作文字范围相关 API。
- 遍历：遍历 DOM 需要的 API。

### 节点

#### Node

![Node节点](/assets/imgs/posts/dom-1.png)

#### Element和Attribute

#### Range

创建range

```js
var range = new Range(),
    firstText = p.childNodes[1],
    secondText = em.firstChild
range.setStart(firstText, 9) // do not forget the leading space
range.setEnd(secondText, 4)
```

通过用户选中区域创建

```js
var range = document.getSelection().getRangeAt(0);
```

更改Range选中区段内容

```js
var fragment = range.extractContents()
range.insertNode(document.createTextNode("aaaa"))
```

### 命名空间

SVG场景主要考虑命名空间


## CSS

HTML和CSS分别承担了语义和表现的分工，DOM和CSSOM也有语义和表现的分工。

### CSSOM

DOM 中的所有的属性都是用来表现语义的属性，CSSOM 的则都是表现的属性，width 和 height 这类显示相关的属性，都属于我们今天要讲的 CSSOM。

CSSOM 是 CSS 的对象模型，在 W3C 标准中，它包含两个部分：描述样式表和规则等 CSS 的模型部分（CSSOM），和跟元素视图相关的 View 部分（CSSOM View）。

#### 获取文档中的所有的样式表

```js
document.styleSheets
```

#### 修改样式表

```js
document.styleSheets[0].insertRule("p { color:pink; }", 0)
document.styleSheets[0].removeRule(0)
```

```js
document.styleSheets[0].cssRules
```

CSSStyleRule 有两个属性：selectorText 和 style，分别表示一个规则的选择器部分和样式部分。

- selector 部分是一个字符串，这里显然偷懒了没有设计进一步的选择器模型，我们按照选择器语法设置即可。
- style 部分是一个样式表，它跟我们元素的 style 属性是一样的类型，所以我们可以像修改内联样式一样，直接改变属性修改规则中的具体 CSS 属性定义，也可以使用 cssText 这样的工具属性。

CSSOM 还提供了一个非常重要的方法，来获取一个元素最终经过 CSS 计算得到的属性：

```js
window.getComputedStyle(elt, pseudoElt);
```

### CSSOM View

CSSOM View 这一部分的 API，可以视为 DOM API 的扩展，它在原本的 Element 接口上，添加了显示相关的功能，这些功能，又可以分成三个部分：窗口部分，滚动部分和布局部分，下面我来分别带你了解一下。

#### 窗口API

```js
window.open("about:blank", "_blank" ,"width=100,height=100,left=100,right=100" )
```

#### 滚动API

#### 布局API

##### 全局尺寸信息

![全局尺寸信息](/assets/imgs/posts/dom-2.jpg)

##### 元素的布局信息

- getClientRects()
  返回一个列表，里面包含元素对应的每一个盒所占据的客户端矩形区域，这里每一个矩形区域可以用 x, y, width, height 来获取它的位置和尺寸。
- getBoundingClientRect()
  返回元素对应的所有盒的包裹的矩形区域，需要注意，这个 API 获取的区域会包括当 overflow 为 visible 时的子元素区域。

获取相对坐标，包含滚动区域的坐标

```js
var offsetX = document.documentElement.getBoundingClientRect().x - element.getBoundingClientRect().x;
```

为什么会有捕获过程和冒泡过程?

把坐标转换为具体的元素上事件的过程，就是捕获。而冒泡过程，则是符合人类理解逻辑：当你按电视机开关时，你也按到了电视机。

默认使用冒泡模式，当开发组件时，遇到需要父元素控制子元素的行为，可以使用捕获机制。

自定义事件

```js
var evt = new Event("look", {"bubbles":true, "cancelable":false});
document.dispatchEvent(evt);
```

## 浏览器API

既不属于 Window 对象，又不属于 JavaScript 语言的 Global 对象的属性。

- Intl
- Streams
- WebGL
- Web Audio API
- Encoding
- Web Background Synchronization
- Web Cryptography API
- Media Source Extensions
- The Screen Orientation API
 
不同组织的标准

- ECMA402 标准来自 ECMA；
- Encoding 标准来自 WHATWG；
- WebGL 标准来自 Khronos；
- Web Cryptography 标准来自 W3C；
- 还有些 API，根本没有被标准化。

