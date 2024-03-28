<script setup lang="ts">
import lodash from "lodash";
import { isObj, isStr } from "@/utils/Typeof";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { ComponentSlotsItem } from "@/draggable/types/DesignBlock";
import { RuntimeBlockNode, RuntimeNode } from "@/draggable/types/RuntimeBlock";

// 定义组件选项
defineOptions({
    name: 'BlockRenderError',
});

// 定义 Props 类型
interface BlockRenderErrorProps {
    /** 错误消息 */
    msg: string;
    /** 错误类型 */
    errType: string;
    /** 错误配置 */
    errConfig: any;
    /** 渲染错误的节点(DesignNode or RuntimeNode or string) */
    node: ComponentSlotsItem | RuntimeBlockNode;
    /** Error对象 */
    error?: Error;
}

// 读取组件 props 属性
const props = withDefaults(defineProps<BlockRenderErrorProps>(), {});
// 渲染的组件类型
let type: string = "";
if (isStr(props.node)) {
    type = props.node;
} else if (props.node) {
    type = props.node.type as string;
}

// 存在错误信息
const existsErrInfo = lodash.trim(props.msg).length > 0;

// TODO 可以使用对话框显示错误信息
function showError() {
    if (props.errType) console.info("错误类型:", props.errType);
    const runtimeNode = props.node as RuntimeNode;
    if (runtimeNode?.__designNode) {
        console.info("渲染节点信息:", runtimeNode.__designNode);
    } else if (props.node) {
        console.info("渲染节点信息:", props.node);
    }
    if (props.errConfig) console.info("渲染失败的配置:", props.errConfig);
    if (props.error) {
        console.error(props.msg, props.error);
    } else {
        console.error(props.msg);
    }
}

const attr: any = {};
if (isObj(props.node)) {
    const runtimeNode = props.node as RuntimeNode;
    if (runtimeNode.__designNode) {
        attr[htmlExtAttr.componentType] = runtimeNode.type;
        attr[htmlExtAttr.nodeId] = runtimeNode.id;
        attr[htmlExtAttr.nodeRef] = runtimeNode.ref;
        attr[htmlExtAttr.nodeParentId] = runtimeNode.__parentId;
        if (runtimeNode.props[htmlExtAttr.placeholderName]) attr[htmlExtAttr.placeholderName] = runtimeNode.props[htmlExtAttr.placeholderName];
        if (runtimeNode.props[htmlExtAttr.slotName]) attr[htmlExtAttr.slotName] = runtimeNode.props[htmlExtAttr.slotName];
    }
}
if (existsErrInfo) {
    attr.title = "点击查看错误信息";
    attr.onClick = showError;
}
</script>

<template>
    <span
        class="err-text"
        :class="{ 'err-link': existsErrInfo }"
        v-bind="attr"
    >
        {{ type }}渲染失败
    </span>
</template>

<style scoped>
.err-text {
    font-size: 12px;
    padding: 2px 4px;
    border: 1px solid #f5222d;
    background-color: #ffa39e;
}

.err-link {
    color: #1a0dab;
    cursor: pointer;
}

.err-link:hover {
    color: #1677ff;
    text-decoration: underline;
}
</style>
