`### 优化计划
[  ]  1.缓存表达式函数和模板函数，可以对最上层的 RuntimeBlock.id 创建的 vue 组件做一个计数(渲染组件时计数+1，组件卸载时计数-1)，当组件计数大于1时缓存函数，当组件计数为0时清理缓存。
[  ]  2.v-for指令和插槽的参数在 listeners 函数中无法访问，可以优化。包装 listeners 函数，传递 context 数据。
[  ]  3.tpl模板中无法监听事件，可以优化。需要完全解析 dom 然后动态调用 createVNode 函数。
[  ]  4.createBlockComponent 中的 blockDeepTransform 函数也可以使用缓存，当入参 DesignBlock 对象相同时，直接返回缓存中的 RuntimeBlock 对象的clone副本(需要重新生成id字段)
[  ]  5.tpl和items中的字符串如果不是模版就不需要使用模板解析，可以使用正则表达式检测实现
[  ]  6.原生html属性支持.capture、.once、.passive 修饰符，重写函数名即可，如：onClickCapture、onClickOnce
[  ]  7.Expression.ts中 getKeyPathValue 与 setKeyPathValue 可以利用动态函数的方式实现功能，就可以支持全功能js属性取值表达式，性能可能会更好
[  ]  8.设计器删除节点后默认选择删除节点的父节点
[  ]  9.
[  ] 10.
[  ] 11.
[  ] 12.

### 功能计划

[OK]  1.完成了 Block 的运行时
[OK]  2.Block 支持相互嵌套
[OK]  3.Block 支持插槽和基础指令以及用户自定义指令功能(v-show、v-if、v-for、v-model)
[OK]  4.Block 嵌套时内层 Block 如何使用外层 Block 的数据好函数
[OK]  5.完成 Block vue 组件封装(wrap)
[OK]  6.Block vue 组件需要支持内部动态更新(内部更新Block配置)
[OK]  7.createStaticVNode 打包后不更新问题。使用自定义封装的 createHtmlVNode 解决
[OK]  8.组件定义时提供类似 ext 的 defaults 属性
[OK]  9.v-model指令的实现
[OK] 10.遇到异常是尽可能多的渲染出内容，需要处理 renderTpl、propsTransform、expTransform 函数的异常
[NO] 11.模版或者表达式计算时使用代理对象，可以访问任何值?只针对模版处理，当访问不存在的属性时返回空字符串(无法实现，在with语句中Proxy的get不生效)
[OK] 12.图标库 fontawesome、google-fonts-icons、tabler-icons，未整合 fluent-system-icons 因为图标已经够用了
[OK] 13.primevue 国际化(中文配置)
[NO] 14.ant-design-vue 国际化配置(删除了 ant-design-vue 依赖)
[OK] 15.删除 opentiny?(暂时删除，因为打包体积太大)
[NO] 16.把 DesignNode 的 props 属性直接平铺直接在最外层定义，类似extjs写法(优先级底，暂时不实现，意义不大)
[  ] 17.给图标库图标名称定义类型
[OK] 18.组件库面板
[OK] 19.实现组件设计器拖拽逻辑
[OK] 20.实现AuxTool组件
[OK] 21.设计器支持多节点操作(移动node、删除node、复制node)，似乎只需要多节点“移动”，不需要多节点“删除”和“复制”
[OK] 22.设计器渲染失败的组件无法删除和选中设计
[OK] 23.设计器删除node、复制node、移动node
[  ] 24.拖拽时需要限制对应特定的容器，只有指定类型的子节点才能拖进去
[OK] 25.拖拽时被拖拽的组件背景置
[OK] 26.组件配置面板中，支持常规样式的选择(边框、背景、边距、css布局...)，支持特定组件的内置样式配置(再组件元数据上注当前组件支持的内置样式)
[OK] 27.设计时默认屏蔽所有组件的事件(dom事件或者组件事件)，支持在元数据配置启用的事件(dom事件或者组件事件)。使用 disable-event、clear-draggable-html-attr 指令实现。
[OK] 28.生成代码时需要过滤属性：disable-event、clear-draggable-html-attr。需要在 BlockFactory.tsx 中自动处理 disable-event、clear-draggable-html-attr 指令。
[OK] 29.组件属性配置支持配置：“组件类型”、“函数类型”
[OK] 30.重新实现 SetterForm 全动态渲染一气呵成
[OK] 31.基于 RuntimeBlock 生成代码，基于 RuntimeBlock 对象逆向生成 DesignBlock 的源代码
[  ] 32.集成扩展图标库 lucide、Emoji(优先级底)
[OK] 33.完成 FontawesomeSetting.vue、GoogleIconSetting.vue 参考 TablerIconSetting.vue
[OK] 34.完成 IconSetter.vue 组件
[OK] 35.在项目中只使用 fontawesome 图标库，需要替换 tabler-icons 图标库的使用(优先级底)
[OK] 36.完成组件“样式”配置面板
[OK] 37.完成组件“事件”配置面板
[OK] 38.完成组件“高级”配置面板
[  ] 39.注册 “@opentiny/vue” 的原子组件
[  ] 40.封装业务表单组件 & 注册到系统中
[OK] 41.实现设计器“属性面板”的数据绑定功能
[OK] 42.生成代码 lifeCycles 中的 errorCaptured 和 unmounted 处理
[OK] 41.“ctrl+e” 与 “ctrl+p” 打开的 monaco 编辑器无法复制粘贴问题(问题代码: this.preventDefault(keyboardEvent))
[OK] 43.完成“组件物料”面板功能
[OK] 44.完成“页面大纲”面板功能
[  ] 45.设计时支持查看指定 RuntimeNode 信息
[  ] 46.运行时支持查看指定 RuntimeNode 信息
[  ] 47.实现一个简单的拖拽后保存预览机制，方便后续调试
[  ] 48.实现一个拖拽表单
[  ] 49.实现一个拖拽Tabs
[  ] 50.实现一个拖拽表格
[  ] 51.渲染节点支持 modelValue 数据单向绑定
[  ] 52.setter 的 watchProps 实现
[  ] 53.setter 的 listeners 实现
[  ] 54.
[  ] 55.
[  ] 56.
