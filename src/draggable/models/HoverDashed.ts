import { Ref, ref, shallowRef, ShallowRef } from "vue";
import { DesignerState } from "@/draggable/models/DesignerState";
import { AuxToolPosition } from "@/draggable/types/Designer";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";

/**
 * 设计器鼠标悬停时的虚线
 */
class HoverDashed {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;
    /** 虚线框区域位置 */
    protected readonly _position: Ref<AuxToolPosition | undefined> = ref<AuxToolPosition | undefined>();
    /** 组件元信息 */
    private _componentMeta: ShallowRef<ComponentMeta | undefined> = shallowRef<ComponentMeta | undefined>();

    constructor(designerState: DesignerState) {
        this.designerState = designerState;
    }

    /** 虚线框区域位置 */
    get position() {
        return this._position.value;
    }

    /** 虚线框区域位置 */
    set position(value: AuxToolPosition | undefined) {
        this._position.value = value;
    }

    /** 组件元信息 */
    get componentMeta() {
        return this._componentMeta.value;
    }

    /** 组件元信息 */
    set componentMeta(value: ComponentMeta | undefined) {
        this._componentMeta.value = value;
    }
}

export {
    HoverDashed,
}
