import { Ref, ref, shallowRef, ShallowRef } from "vue";
import { htmlExtAttr } from "@/draggable/utils/HtmlExtAttrs";
import { DesignerState } from "@/draggable/models/DesignerState";
import { AuxToolPosition } from "@/draggable/types/Designer";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import { calcAuxToolPosition } from "@/draggable/utils/PositionCalc";

/**
 * 设计器鼠标悬停时的虚线
 */
class HoverDashed {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;
    /** 组件元信息 */
    protected readonly _componentMeta: ShallowRef<ComponentMeta | undefined> = shallowRef<ComponentMeta | undefined>();
    /** 组件节点id(值是：RuntimeNode.id) */
    protected readonly _nodeId: Ref<string | undefined> = ref<string | undefined>();
    /** 虚线框区域位置 */
    protected readonly _position: Ref<AuxToolPosition | undefined> = ref<AuxToolPosition | undefined>();

    constructor(designerState: DesignerState) {
        this.designerState = designerState;
    }

    /** 组件元信息 */
    get componentMeta() {
        return this._componentMeta.value;
    }

    /** 组件元信息 */
    set componentMeta(value: ComponentMeta | undefined) {
        this._componentMeta.value = value;
    }

    /** 组件节点id(值是：RuntimeNode.id) */
    get nodeId() {
        return this._nodeId.value;
    }

    /** 组件节点id(值是：RuntimeNode.id) */
    set nodeId(value: string | undefined) {
        this._nodeId.value = value;
    }

    /** 虚线框区域位置 */
    get position() {
        return this._position.value;
    }

    /** 虚线框区域位置 */
    set position(value: AuxToolPosition | undefined) {
        this._position.value = value;
    }

    /** 重新计算辅助工具的位置 */
    recalcAuxToolPosition() {
        if (!this._nodeId.value) return;
        const designerContainer = this.designerState.designerContainer
        if (!designerContainer) return;
        const node = designerContainer.querySelector(`[${htmlExtAttr.nodeId}=${this._nodeId.value}]`);
        if (!node) return;
        this._position.value = calcAuxToolPosition(designerContainer, node);
    }

    /** 清除选择信息 */
    clear() {
        this._componentMeta.value = undefined;
        this._nodeId.value = undefined;
        this._position.value = undefined;
    }
}

export {
    HoverDashed,
}
