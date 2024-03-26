import { computed, ComputedRef, shallowReactive, ShallowReactive } from "vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { HoverDashed } from "@/draggable/models/HoverDashed";
import { Selection } from "@/draggable/models/Selection";
// import { Insertion } from "@/draggable/models/Insertion";
// import { SnapLine } from "@/draggable/models/SnapLine";

/**
 * 设计器状态数据
 */
class DesignerState {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 设计器鼠标悬停时的虚线 */
    readonly hover: HoverDashed = new HoverDashed(this);
    /** 设计器选择组件集合 */
    readonly selections: ShallowReactive<Array<Selection>> = shallowReactive<Array<Selection>>([]);
    /** selections 中只有一个选择项 */
    readonly singleSelection: ComputedRef<boolean> = computed<boolean>(() => this.selections.length === 1);

    // /** 设计器插入组件的信息 */
    // private readonly _insertion: Ref<Insertion | undefined> = ref<Insertion>();
    // /** 捕捉线(多选组件时的矩形线条) */
    // private readonly _snapLine: Ref<SnapLine | undefined> = ref<SnapLine>();

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }
}

export {
    DesignerState,
}
