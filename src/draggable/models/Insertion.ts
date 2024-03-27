import { ref, Ref, ShallowRef, shallowRef } from "vue";
import { noValue } from "@/utils/Typeof";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { AuxToolPosition, Direction, NodeToCursorDistance } from "@/draggable/types/Designer";

/**
 * 设计器插入组件的信息
 */
class Insertion {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 渲染节点与光标的距离信息 */
    protected readonly _distance: ShallowRef<NodeToCursorDistance | undefined> = shallowRef<NodeToCursorDistance | undefined>();
    /** 插入区域位置 */
    protected readonly _position: ShallowRef<AuxToolPosition | undefined> = shallowRef<AuxToolPosition | undefined>();
    /** 容器组件节点id(值是：RuntimeNode.id) */
    protected readonly _containerId: Ref<string | undefined> = ref<string | undefined>();
    /** 插入容器节点的插槽名称(子节点是一种特殊的插槽，名为：default) */
    protected readonly _slotName: Ref<string | undefined> = ref<string | undefined>();
    /** 离插入位置最近的组件节点id(值是：RuntimeNode.id) */
    protected readonly _nodeId: Ref<string | undefined> = ref<string | undefined>();
    /** 当期 node 属于占位组件 */
    protected readonly _placeholder: Ref<boolean | undefined> = ref<boolean | undefined>();

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }

    /** 渲染节点与光标的距离信息 */
    get distance() {
        return this._distance.value;
    }

    /** 渲染节点与光标的距离信息 */
    set distance(value: NodeToCursorDistance | undefined) {
        this._distance.value = value;
    }

    /** 插入区域位置 */
    get position() {
        return this._position.value;
    }

    /** 插入区域位置 */
    set position(value: AuxToolPosition | undefined) {
        this._position.value = value;
    }

    /** 容器组件节点id(值是：RuntimeNode.id) */
    get containerId() {
        return this._containerId.value;
    }

    /** 容器组件节点id(值是：RuntimeNode.id) */
    set containerId(value: string | undefined) {
        this._containerId.value = value;
    }

    /** 插入容器节点的插槽名称(子节点是一种特殊的插槽，名为：default) */
    get slotName() {
        return this._slotName.value;
    }

    /** 插入容器节点的插槽名称(子节点是一种特殊的插槽，名为：default) */
    set slotName(value: string | undefined) {
        this._slotName.value = value;
    }

    /** 离插入位置最近的组件节点id(值是：RuntimeNode.id) */
    get nodeId() {
        return this._nodeId.value;
    }

    /** 离插入位置最近的组件节点id(值是：RuntimeNode.id) */
    set nodeId(value: string | undefined) {
        this._nodeId.value = value;
    }

    /** 当期 node 属于占位组件 */
    get placeholder() {
        return this._placeholder.value;
    }

    /** 当期 node 属于占位组件 */
    set placeholder(value: boolean | undefined) {
        this._placeholder.value = value;
    }

    /** 插入的方向 */
    get direction() {
        return this._distance.value?.direction;
    }

    /** 是否在 nodeId 之前插入 */
    isBefore() {
        if (!this._distance.value?.direction) return false;
        return [Direction.top, Direction.left].includes(this._distance.value?.direction);
    }

    /** 是否是水平方向插入(left、right) */
    isHorizontal() {
        if (!this._distance.value?.direction) return false;
        return [Direction.left, Direction.right].includes(this._distance.value?.direction);
    }

    /** 当前是否是空的 */
    isEmpty() {
        return noValue(this._distance.value?.direction);
    }

    /** 清除插入信息 */
    clear() {
        this._distance.value = undefined;
        this._containerId.value = undefined;
        this._slotName.value = undefined;
        this._nodeId.value = undefined;
        this._placeholder.value = undefined;
    }
}

export {
    Insertion,
}
