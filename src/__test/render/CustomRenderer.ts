import { createRenderer } from 'vue';
import { nodeOps } from './nodeOps';

// // 定义一个简单的应用组件
// const App = {
//   render() {
//     return h('div', {
//       onClick: () => console.log('Clicked inside app!')
//     }, 'Click me')
//   }
// };

// // 创建自定义渲染器
// const { createApp: createCustomApp } = createRenderer({
//   // createElement, patchProp 等必须实现的方法
//   createElement(type) {
//     // 创建 DOM 元素
//     return document.createElement(type);
//   },
//   insert(el, parent) {
//     // 将元素插入到父级中
//     parent.appendChild(el);
//   },
//   patchProp(el, key, prevValue, nextValue) {
//     // 处理属性更新，这里可以介入事件的处理
//     // 比如，忽略所有的 click 事件监听
//     if (key.startsWith('on') && key.toLocaleLowerCase() !== 'onclick') {
//       el[key.toLowerCase()] = nextValue;
//     } else {
//       // 不添加事件监听器，或者在这里实现自定义行为
//     }
//   },
//   // 实现其他必须的方法...
//   remove: (el) => el.parentNode.removeChild(el),
//   setElementText: (el, text) => el.textContent = text,
//   parentNode: (node) => node.parentNode,
//   nextSibling: (node) => node.nextSibling,
//   // 忽略其他不需要处理的细节...
// });
//
// // 使用自定义渲染器创建和挂载 App
// const app = createCustomApp(App);
// app.mount(document.querySelector('#app'));

const { render } = createRenderer<Node, Element>({
    ...nodeOps,
    patchProp:(el, key, prevValue, nextValue, namespace, prevChildren, parentComponent, parentSuspense, unmountChildren) => {

    }
});

// runtimeBlock.props.onClickCapture = (e: Event) => {
//     console.log("QQQ")
//     e.stopPropagation();
// };
