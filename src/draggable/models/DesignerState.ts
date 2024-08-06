import { computed, ComputedRef, markRaw, Ref, ref, ShallowReactive, shallowReactive, watch } from "vue";
import { runtimeNodeToJson5Code } from "@/draggable/utils/DesignerUtils";
import { BlockInstance, RuntimeNode } from "@/draggable/types/RuntimeBlock";
import { ComponentMeta } from "@/draggable/types/ComponentMeta";
import { DesignerEngine } from "@/draggable/DesignerEngine";
import { HoverDashed } from "@/draggable/models/HoverDashed";
import { Selection } from "@/draggable/models/Selection";
import { SetterShareState } from "@/draggable/models/SetterShareState";
import RuntimeBlock from "@/draggable/components/RuntimeBlock.vue";
import { ShowEventEditorDialogEvent } from "@/draggable/events/designer/ShowEventEditorDialogEvent";
import { RemoveListenerEvent } from "@/draggable/events/designer/RemoveListenerEvent";
import { AddListenerEvent } from "@/draggable/events/designer/AddListenerEvent";
import { UpdateListenerEvent } from "@/draggable/events/designer/UpdateListenerEvent";
import SetterEventPanel from "@/draggable/components/widgets/SetterEventPanel.vue";

interface DesignerStateEvents {
    /** 显示事件编辑器对话框 */
    showEventEditorDialog?: ShowEventEditorDialogEvent;
    /** 删除事件监听 */
    removeListener?: RemoveListenerEvent;
    /** 新增事件监听 */
    addListener?: AddListenerEvent;
    /** 更新事件监听 */
    updateListener?: UpdateListenerEvent;
}

/**
 * 设计器状态数据
 */
class DesignerState {
    /** 设计器引擎 */
    readonly designerEngine: DesignerEngine;
    /** 设计器容器 */
    readonly _designerContainer: Ref<HTMLDivElement | undefined> = ref<HTMLDivElement | undefined>();
    /** 设计器组件实例 */
    readonly _designerBlockInstance: Ref<InstanceType<typeof RuntimeBlock> | undefined> = ref<InstanceType<typeof RuntimeBlock> | undefined>();
    /** 事件Setter组件实例 */
    readonly _setterEventPanel: Ref<InstanceType<typeof SetterEventPanel> | undefined> = ref<InstanceType<typeof SetterEventPanel> | undefined>();

    /** 设计时的代码(DesignBlock源码) */
    protected readonly _designerBlockCode: Ref<string> = ref<string>("");
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
                if (node) nodes.push(markRaw(node));
            }
        }
        return nodes;
    });
    /** 设计器选择的第一个节点 */
    protected readonly _selectNode: ComputedRef<RuntimeNode | undefined> = computed<RuntimeNode | undefined>(() => {
        const blockInstance = this.blockInstance;
        if (!blockInstance) return;
        if (this.selections.length <= 0) return;
        const nodeId = this.selections[0].nodeId;
        if (!nodeId) return;
        return blockInstance.globalContext.allNode[nodeId];
    });
    /** 当前选中的 ComponentMeta */
    protected readonly _selectedComponentMeta: ComputedRef<ComponentMeta | undefined> = computed<ComponentMeta | undefined>(() => this.getCurrentComponentMeta());
    /** 组件配置面板共享状态 */
    readonly setterShareState: SetterShareState = new SetterShareState(this);
    /** 设计器事件 */
    readonly events: ShallowReactive<DesignerStateEvents> = shallowReactive<DesignerStateEvents>({});

    constructor(designerEngine: DesignerEngine) {
        this.designerEngine = designerEngine;
        this.setGlobalVar();
    }

    protected setGlobalVar() {
        watch(this._designerBlockInstance, value => {
            if (this.designerEngine.activeDesignerState !== this) return;
            window.__crb = value;
        });
        watch(this._selectNode, value => {
            if (this.designerEngine.activeDesignerState !== this) return;
            window.__crn = value;
        });
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

    /** 设计器组件实例 */
    get designerBlockInstance(): InstanceType<typeof RuntimeBlock> | undefined {
        return this._designerBlockInstance?.value;
    }

    /** 事件Setter组件实例 */
    get setterEventPanel(): InstanceType<typeof SetterEventPanel> | undefined {
        return this._setterEventPanel.value;
    }

    /** 设计器组件Block对象 */
    get blockInstance(): BlockInstance | undefined {
        return this._designerBlockInstance?.value?.blockInstance;
    }

    /** 设计时的代码(DesignBlock源码) */
    get designerBlockCode() {
        return this._designerBlockCode.value;
    }

    /** 存在选中的节点 */
    get existsSelection() {
        return this._existsSelection.value
    }

    /** selections 中只有一个选择项 */
    get singleSelection() {
        return this._singleSelection.value
    }

    /** 设计器选择节点集合 */
    get selectNodes() {
        return this._selectNodes.value
    }

    /** 设计器选择的第一个节点 */
    get selectNode() {
        return this._selectNode.value
    }

    /** 当前选中的 ComponentMeta */
    get selectedComponentMeta() {
        return this._selectedComponentMeta.value;
    }

    /**
     * 生成DesignBlock源码
     */
    async generateDesignBlockCode(): Promise<string> {
        let code = "";
        const blockInstance = this.blockInstance;
        if (blockInstance?.globalContext.runtimeBlock) {
            code = await runtimeNodeToJson5Code(blockInstance.globalContext.runtimeBlock);
        }
        this._designerBlockCode.value = code;
        return code;
    }
}

export {
    DesignerState,
}
