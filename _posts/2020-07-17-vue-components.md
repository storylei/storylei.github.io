# Vue组件化

## 常见组件化技术

### 组件通信  

#### 父子

- props
- $refs
- $children

#### 子父通信

- $emit
- @xx

#### 兄弟

- $parent
- $root

#### 祖代后代

- provide
- inject

#### 没关系

- $bus
- vuex

### 内容分发 slot

- 匿名

```html
<template>xx</template>
```

- 具名

```html
<slot name="xx">
<template v-slot:foo>xx</template>
```

- 作用域插槽

```html
<slot :foo="foo">
<template v-slot:foo="slotProps"></template>
```

### 递归组件

### 混入

## Form, FormItem, Input

- v-model
- inject
- slot
- provide

-
