import { DesignerState } from "@/draggable/models/DesignerState";
import { ref, Ref, shallowRef, ShallowRef } from "vue";
import { AuxToolPosition } from "@/draggable/types/Designer";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";

/**
 * 设计器选择组件的信息
 */
class Selection {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;
    /** 组件元信息 */
    protected readonly _componentMeta: ShallowRef<ComponentMeta | undefined> = shallowRef<ComponentMeta | undefined>();
    /** 组件节点id(值是：RuntimeNode.id) */
    protected readonly _nodeId: Ref<string | undefined> = ref<string | undefined>();
    /** 实线框区域位置 */
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
}

export {
    Selection,
}
