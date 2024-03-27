import { computed, ComputedRef, Ref, shallowReactive, ShallowReactive } from "vue";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { HoverDashed } from "@/draggable/models/HoverDashed";
import { Selection } from "@/draggable/models/Selection";
// import { Insertion } from "@/draggable/models/Insertion";
// import { SnapLine } from "@/draggable/models/SnapLine";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";

/**
 * 设计器状态数据
 */
class DesignerState {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 设计器容器 */
    protected _designerContainer?: Ref<HTMLDivElement | undefined>;
    /** 设计器组件实例 */
    protected _designerBlockInstance?: Ref<InstanceType<typeof RuntimeBlock> | undefined>;
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

    /** 设计器容器 */
    get designerContainer(): HTMLDivElement | undefined {
        return this._designerContainer?.value;
    }

    /** 设计器容器 */
    set designerContainer(designerContent: Ref<HTMLDivElement | undefined>) {
        this._designerContainer = designerContent;
    }

    /** 设计器组件实例 */
    get designerBlockInstance(): InstanceType<typeof RuntimeBlock> | undefined {
        return this._designerBlockInstance?.value;
    }

    /** 设计器组件实例 */
    set designerBlockInstance(designerBlockInstance: Ref<InstanceType<typeof RuntimeBlock> | undefined>) {
        this._designerBlockInstance = designerBlockInstance;
    }
}

export {
    DesignerState,
}
