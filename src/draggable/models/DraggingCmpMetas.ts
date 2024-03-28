import { computed, ComputedRef, ShallowRef, shallowRef } from "vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { InsertionData } from "@/draggable/types/Designer";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";

/**
 * 正在拖拽的组件的元信息
 */
class DraggingCmpMetas {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 正在拖拽的组件元信息集合 */
    protected readonly _cmpMetas: ShallowRef<Array<ComponentMeta>> = shallowRef<Array<ComponentMeta>>([]);
    /** 存在拖拽的组件 */
    protected readonly _existsCmpMeta: ComputedRef<boolean> = computed<boolean>(() => {
        return this._cmpMetas.value.length > 0;
    });
    /** 当前是否只有一个组件在拖拽 */
    protected readonly _onlyOne: ComputedRef<boolean> = computed<boolean>(() => {
        return this._cmpMetas.value.length === 1;
    });
    /** 设计器插入组件的位置信息 */
    protected readonly _insertion: ShallowRef<InsertionData | undefined> = shallowRef<InsertionData | undefined>();

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }

    /** 正在拖拽的组件元信息集合 */
    get cmpMetas(): Array<ComponentMeta> {
        return this._cmpMetas.value;
    }

    /** 正在拖拽的组件元信息集合 */
    set cmpMetas(value: Array<ComponentMeta>) {
        this._cmpMetas.value = value;
    }

    /** 存在拖拽的组件 */
    get existsCmpMeta(): boolean {
        return this._existsCmpMeta.value;
    }

    /** 当前是否只有一个组件在拖拽 */
    get onlyOne(): boolean {
        return this._onlyOne.value;
    }

    /** 设计器插入组件的位置信息 */
    get insertion(): InsertionData | undefined {
        return this._insertion.value;
    }

    /** 设计器插入组件的位置信息 */
    set insertion(value: InsertionData | undefined) {
        this._insertion.value = value;
    }
}

export {
    DraggingCmpMetas,
}
