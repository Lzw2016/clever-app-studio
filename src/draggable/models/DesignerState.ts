import { DesignerEngine } from "@/draggable/DesignerEngine";
import { HoverDashed } from "@/draggable/models/HoverDashed";
// import { Selection } from "@/draggable/models/Selection";
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
    // readonly hover: Ref<UnwrapRef<HoverDashed>> = ref(new HoverDashed(this));
    // /** 设计器选择组件集合 */
    // private readonly _selections: Ref<UnwrapRef<Array<Selection>>> = ref<Array<Selection>>([]);
    // /** 设计器插入组件的信息 */
    // private readonly _insertion: Ref<Insertion | undefined> = ref<Insertion>();
    // /** 捕捉线(多选组件时的矩形线条) */
    // private readonly _snapLine: Ref<SnapLine | undefined> = ref<SnapLine>();

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }

    // /** 设计器鼠标悬停时的虚线 */
    // get hover(): HoverDashed {
    //     return this._hover.value;
    // }
    //
    // /** 设计器鼠标悬停时的虚线 */
    // set hover(value: HoverDashed) {
    //     this._hover.value = value;
    // }

    // /** 设计器选择组件集合 */
    // get selections(): Array<UnwrapRef<Selection>> {
    //     return this._selections.value;
    // }
    //
    // /** 设计器选择组件集合 */
    // set selections(value: Array<UnwrapRef<Selection>>) {
    //     this._selections.value = value;
    // }

    // /** 设计器插入组件的信息 */
    // get insertion(): Insertion | undefined {
    //     return this._insertion.value;
    // }
    //
    // /** 设计器插入组件的信息 */
    // set insertion(value: Insertion | undefined) {
    //     this._insertion.value = value;
    // }
    //
    // /** 捕捉线(多选组件时的矩形线条) */
    // get snapLine(): SnapLine | undefined {
    //     return this._snapLine.value;
    // }
    //
    // /** 捕捉线(多选组件时的矩形线条) */
    // set snapLine(value: SnapLine | undefined) {
    //     this._snapLine.value = value;
    // }
}

export {
    DesignerState,
}
