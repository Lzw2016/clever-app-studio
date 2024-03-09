### 优化计划
[  ]  1.缓存表达式函数和模板函数，可以对最上层的 RuntimeBlock.id 创建的 vue 组件做一个计数(渲染组件时计数+1，组件卸载时计数-1)，当组件计数大于1时缓存函数，当组件计数为0时清理缓存。
[  ]  2.v-for指令和插槽的参数在 listeners 函数中无法访问，可以优化。包装 listeners 函数，传递 context 数据。
[  ]  3.tpl模板中无法监听事件，可以优化。需要完全解析 dom 然后动态调用 createVNode 函数。
[  ]  4.
[  ]  5.

### 功能计划

[OK]  1.完成了 Block 的运行时
[OK]  2.Block 支持相互嵌套
[OK]  3.Block 支持插槽和基础指令以及用户自定义指令功能(v-show、v-if、v-for、v-model)
[OK]  4.Block 嵌套时内层 Block 如何使用外层 Block 的数据好函数
[  ]  5.完成 Block vue 组件封装(wrap)
[  ]  6.Block vue 组件需要支持内部动态更新(内部更新Block配置)
[OK]  7.createStaticVNode 打包后不更新问题。使用自定义封装的 createHtmlVNode 解决
[  ]  8.组件定义时提供类似 ext 的 defaults 属性
[OK]  9.v-model指令的实现
[  ] 10.遇到异常是尽可能多的渲染出内容，需要处理 renderTpl、propsTransform、expTransform 函数的异常
[  ] 11.模版或者表达式计算时使用代理对象，可以访问任何值?
[  ] 12.
[  ] 13.
