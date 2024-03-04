import {createStaticVNode, createVNode, defineComponent} from "vue";
import lodash from "lodash";
import {isArray, isStr} from "@/utils/Typeof";
import {AnyFunction} from "@/draggable/types/Base";
import {BlockDesign, ComponentSlotsItem} from "@/draggable/types/Block";
import {ComponentManageModel} from "@/draggable/models/ComponentManageModel";
import {compileTpl} from "@/utils/Template";
import {isHtmlTag} from "@/draggable/utils/HtmlTag";
import {blockDeepTransform, getExpOrTplParam, nodeDeepTransform, propsTransform} from "@/draggable/utils/BlockPropsTransform";

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

// TODO 2. block 里的 Transform 尽可能的在 setup 或 data 函数中统一处理(只需处理一次)
function createBlock(block: BlockDesign) {
    const rawBlock: BlockDesign = block;
    // 深度克隆 block 对象，保护原始 block 对象不被篡改
    block = lodash.cloneDeep(rawBlock);
    // 递归处理 Block 属性，使它符合 vue 组件的规范
    const currBlock = blockDeepTransform(block);
    console.log("@@@ currBlock", currBlock);
    // lifeCycles TODO 内置默认的异常处理
    const Block = "div";
    // 定义 vue 组件
    return defineComponent({
        ...currBlock.lifeCycles,
        unmounted() {
            if (currBlock.lifeCycles.unmounted) currBlock.lifeCycles.unmounted.call(this);
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
            // 递归处理 ComponentNode 属性，使它符合 vue 组件的规范
            nodeDeepTransform(currBlock as any, vm);
            // 保存原始的 block 对象
            vm[innerPropsName.rawBlock] = rawBlock;
            // 保存当前运行时的 block 对象
            vm[innerPropsName.currBlock] = currBlock;
            // 当前组件的事件监听
            vm[innerPropsName.listeners] = currBlock.listeners;
            // 返回组件数据
            return currBlock.data;
        },
        computed: currBlock.computed,
        methods: currBlock.methods,
        watch: currBlock.watch,
        render(this: any) {


            const props = propsTransform(currBlock.props, this, this[innerPropsName.currBlock]);
            return (
                <Block {...props} {...this.$attrs} {...this.$props} {...this[innerPropsName.listeners]} ref={"dd"}>
                    {currBlock.items?.map((node, idx) => createComponentVNode(node, this, idx))}
                </Block>
            );
        },
    });
}

/** 基于 ComponentNode 创建 VNode */
function createComponentVNode(child: ComponentSlotsItem, instance: any, nodeIdx: number) {
    // 静态 html 文本
    if (isStr(child)) return createStaticVNode(child, nodeIdx);


    // 加载当前组件
    const type = child.type.trim();
    const htmlTag = isHtmlTag(type);
    const component: any = htmlTag ? type : componentManage.getComponent(type);
    if (!component) {
        throw new Error(`UI组件未注册也不是html原生标签，组件: ${type}`);
    }
    const currBlock = instance[innerPropsName.currBlock];
    // 处理 props 表达式(属性的绑定)
    const props = propsTransform(child.props, instance, currBlock);
    // 配置 ref 属性
    if (child.ref) props!.ref = child.ref;
    // 插槽和子组件(default插槽其实就是子组件)
    const children: Record<string, AnyFunction<any, Array<any>>> = {};
    // TODO 设置插槽 待验证，需要使用 withCtx(slotProps=> [...VNode])
    for (let name in child.slots) {
        const slot = child.slots[name];
        if (isArray(slot)) {
            children[name] = () => slot.map((item, idx) => createComponentVNode(item, instance, idx));
        } else {
            children[name] = () => [createComponentVNode(slot, instance, 0)];
        }
    }
    // 设置子组件
    if (child.items && child.items.length > 0) {
        // 组件
        children.default = () => child.items!.map((item, idx) => createComponentVNode(item, instance, idx));
    } else if (child.tpl) {
        // html模版
        if (isStr(child.tpl)) child.tpl = [child.tpl];
        // 编译并执行模版
        const staticHtml = compileTpl(child.tpl, {cache: true}).bind(instance)(getExpOrTplParam(instance, currBlock));
        // 静态 html 子节点
        children.default = () => ([createStaticVNode(staticHtml, 0)]);
    }
    // 创建 VNode
    return createVNode(
        component,
        {
            ...props,
            ...child.listeners,
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
