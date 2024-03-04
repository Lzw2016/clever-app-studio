import {createStaticVNode, createVNode, defineComponent} from "vue";
import lodash from "lodash";
import {isArray, isStr} from "@/utils/Typeof";
import {AnyFunction} from "@/draggable/types/Base";
import {BlockDesign, ComponentNode} from "@/draggable/types/Block";
import {ComponentManageModel} from "@/draggable/models/ComponentManageModel";
import {createVNodeID} from "@/utils/IDCreate";
import {compileTpl} from "@/utils/Template";
import {isHtmlTag} from "@/draggable/utils/HtmlTag";
import {computedTransform, getExpOrTplParam, lifeCyclesTransform, listenersTransform, methodsTransform, propsTransform, watchTransform} from "@/draggable/utils/BlockPropsTransform";

/** 组件管理器实例 */
const componentManage = new ComponentManageModel();

/** Block vue 组件的内部属性名 */
const innerPropsName = {
    /** 原始的 Block 配置对象：BlockDesign */
    rawBlock: /*    */ Symbol('__raw_block__'),
    /** 当前的(处理后的) Block 配置对象 */
    currBlock: /*   */ Symbol('__curr_block__'),
    /** vue 组件实例的事件监听 */
    listeners: /*   */ Symbol('__instance_listeners__'),
}

/** 给 ComponentNode 对象属性设置默认值 */
function fillNodeDefValue(node: ComponentNode): Required<ComponentNode> {
    if (!node.id) node.id = createVNodeID();
    if (!node.props) node.props = {};
    if (!node.listeners) node.listeners = {};
    if (!node.directives) node.directives = {};
    if (!node.slots) node.slots = {};
    if (!node.items) node.items = [];
    if (!node.tpl) node.tpl = [];
    return node as any;
}

/** 给 Block 对象属性设置默认值 */
function fillBlockDefValue(block: BlockDesign): Required<BlockDesign> {
    if (!block.props) block.props = {};
    if (!block.data) block.data = {};
    if (!block.computed) block.computed = {};
    if (!block.watch) block.watch = {};
    if (!block.methods) block.methods = {};
    if (!block.listeners) block.listeners = {};
    if (!block.lifeCycles) block.lifeCycles = {};
    if (!block.items) block.items = [];
    return block as any;
}

// TODO 2. block 里的 Transform 尽可能的在 setup 或 data 函数中统一处理(只需处理一次)
function createBlock(block: BlockDesign) {
    const rawBlock: BlockDesign = block;
    // 深度克隆 block 对象，保护原始 block 对象不被篡改
    block = lodash.cloneDeep(rawBlock);


    // 填充基本属性
    fillBlockDefValue(block);
    // 处理 Block 属性，使它符合 vue 组件的规范
    const lifeCycles = lifeCyclesTransform(block.lifeCycles);
    const computed = computedTransform(block.computed);
    const methods = methodsTransform(block.methods);
    const watch = watchTransform(block.watch);
    // lifeCycles TODO 内置默认的异常处理
    const Block = "div";
    // 定义 vue 组件
    return defineComponent({
        ...lifeCycles,
        unmounted() {
            if (lifeCycles.unmounted) lifeCycles.unmounted.bind(this).apply();
            // 组件卸载时释放资源
        },
        props: {
            style: Object,
            class: String,
            block: Object,
        },
        setup(props, ctx) {
            // const instance = getCurrentInstance()!;
            // const exposed: Record<string, any> = {};
            // ctx.expose(exposed);
        },
        data(vm: any) {
            // 保存原始的 block 对象
            vm[innerPropsName.rawBlock] = rawBlock;
            // 保存当前运行时的 block 对象
            vm[innerPropsName.currBlock] = block;
            // 当前组件的事件监听
            vm[innerPropsName.listeners] = listenersTransform(block.listeners, vm);
            // 返回组件数据
            return block.data;
        },
        computed: computed,
        methods: methods,
        watch: watch,
        render(this: any) {
            const props = propsTransform(block.props, this, this[innerPropsName.currBlock]);
            return (
                <Block {...props} {...this.$attrs} {...this.$props} {...this[innerPropsName.listeners]}>
                    {block.items?.map((node, idx) => createComponentVNode(node, this, idx))}
                </Block>
            );
        },
    });
}

/** 基于 ComponentNode 创建 VNode */
function createComponentVNode(node: ComponentNode | string, instance: any, nodeIdx: number) {
    // 静态 html 文本
    if (isStr(node)) return createStaticVNode(node, nodeIdx);
    // 填充基本属性
    fillNodeDefValue(node);
    // 加载当前组件
    const type = node.type.trim();
    const htmlTag = isHtmlTag(type);
    const component: any = htmlTag ? type : componentManage.getComponent(type);
    if (!component) {
        throw new Error(`UI组件未注册也不是html原生标签，组件: ${type}`);
    }
    const currBlock = instance[innerPropsName.currBlock];
    // 处理 props 表达式(属性的绑定)
    const props = propsTransform(node.props, instance, currBlock);
    // 配置 ref 属性
    if (node.ref) props!.ref = node.ref;
    // 处理 listeners TODO 放在 createBlock 函数处理，不用每次渲染都处理
    const listeners = listenersTransform(node.listeners, instance);
    // 插槽和子组件(default插槽其实就是子组件)
    const children: Record<string, AnyFunction<any, Array<any>>> = {};
    // TODO 设置插槽 待验证，需要使用 withCtx(slotProps=> [...VNode])
    for (let name in node.slots) {
        const slot = node.slots[name];
        if (isArray(slot)) {
            children[name] = () => slot.map((item, idx) => createComponentVNode(item, instance, idx));
        } else {
            children[name] = () => [createComponentVNode(slot, instance, 0)];
        }
    }
    // 设置子组件
    if (node.items && node.items.length > 0) {
        // 组件
        children.default = () => node.items!.map((item, idx) => createComponentVNode(item, instance, idx));
    } else if (node.tpl) {
        // html模版
        if (isStr(node.tpl)) node.tpl = [node.tpl];
        // 编译并执行模版
        const staticHtml = compileTpl(node.tpl, {cache: true}).bind(instance)(getExpOrTplParam(instance, currBlock));
        // 静态 html 子节点
        children.default = () => ([createStaticVNode(staticHtml, 0)]);
    }
    // 创建 VNode
    return createVNode(
        component,
        {
            ...props,
            ...listeners,
        },
        children,
    );
    // TODO 应用指令
    // vnode = withDirectives(
    //     vnode,
    //     [
    //         [
    //             // 不能使用内置指令
    //             resolveDirective('focus'),
    //             // {},
    //             // "",
    //             // {},
    //         ],
    //     ],
    // )
    // return vnode;
}

export {
    createBlock,
}
