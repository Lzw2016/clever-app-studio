import { computed, ComputedRef, markRaw, Ref, ref, ShallowReactive, shallowReactive } from "vue";
import { runtimeNodeToDesignNode } from "@/draggable/utils/BlockPropsTransform";
import { BlockInstance, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { HoverDashed } from "@/draggable/models/HoverDashed";
import { Selection } from "@/draggable/models/Selection";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import { SetterState } from "@/draggable/models/SetterState";

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
    /** 设计时的代码(DesignBlock源码) */
    protected _designerBlockCode: Ref<string> = ref<string>("");
    /** 设计器鼠标悬停时的虚线 */
    readonly hover: HoverDashed = new HoverDashed(this);
    /** 设计器选择节点集合 */
    readonly selections: ShallowReactive<Array<Selection>> = shallowReactive<Array<Selection>>([]);
    /** 存在选中的节点 */
    protected readonly _existsSelection: ComputedRef<boolean> = computed<boolean>(() => this.selections.length > 0);
    /** selections 中只有一个选择项 */
    protected readonly _singleSelection: ComputedRef<boolean> = computed<boolean>(() => this.selections.length === 1);
    /** 设计器选择节点集合 */
    protected readonly _selectNodes: ComputedRef<Array<RuntimeNode>> = computed<Array<RuntimeNode>>(() => {
        const nodes: Array<RuntimeNode> = [];
        const blockInstance = this.blockInstance;
        if (blockInstance) {
            for (let selection of this.selections) {
                const nodeId = selection.nodeId;
                if (!nodeId) continue;
                const node = blockInstance.globalContext.allNode[nodeId];
                nodes.push(markRaw(node));
            }
        }
        return nodes;
    });
    /** 当前选中的 ComponentMeta */
    protected readonly _selectedComponentMeta: ComputedRef<ComponentMeta | undefined> = computed<ComponentMeta | undefined>(() => this.getCurrentComponentMeta());
    /** 设计器的组件配置面板状态 */
    readonly setterState: SetterState = new SetterState(this);

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
    }

    /**
     * 获取当前选中的 ComponentMeta，如果选中多个节点，节点类型不同返回空
     */
    protected getCurrentComponentMeta() {
        if (this.selections.length <= 0) return;
        if (this.selections.length === 1) return this.selections[0].componentMeta;
        let componentMeta: ComponentMeta | undefined;
        const types = new Set<string>();
        for (let selection of this.selections) {
            if (!selection.componentMeta) continue;
            componentMeta = selection.componentMeta;
            types.add(componentMeta.type);
            if (types.size > 1) return;
        }
        return componentMeta;
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

    /** 设计器组件Block对象 */
    get blockInstance(): BlockInstance | undefined {
        return this._designerBlockInstance?.value?.blockInstance;
    }

    /** 设计器组件实例 */
    set designerBlockInstance(designerBlockInstance: Ref<InstanceType<typeof RuntimeBlock> | undefined>) {
        this._designerBlockInstance = designerBlockInstance;
    }

    /** 设计时的代码(DesignBlock源码) */
    get designerBlockCode() {
        return this._designerBlockCode.value;
    }

    /** 存在选中的节点 */
    get existsSelection() {
        return  this._existsSelection.value
    }

    /** selections 中只有一个选择项 */
    get singleSelection() {
        return  this._singleSelection.value
    }

    /** 设计器选择节点集合 */
    get selectNodes() {
        return  this._selectNodes.value
    }

    /** 当前选中的 ComponentMeta */
    get selectedComponentMeta() {
        return this._selectedComponentMeta.value;
    }

    /**
     * 生成DesignBlock源码
     */
    generateDesignBlockCode(): string {
        let code = "";
        const blockInstance = this.blockInstance;
        if (blockInstance?.globalContext.runtimeBlock) {
            const designNode = runtimeNodeToDesignNode(
                blockInstance.globalContext.runtimeBlock,
                {
                    keepRef: true,
                },
            );
            code = JSON.stringify(designNode, null, 4);
        }
        this._designerBlockCode.value = code;
        return code;
    }
}

export {
    DesignerState,
}
