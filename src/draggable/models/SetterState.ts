import { Ref, ref } from "vue";
import { DesignerState } from "@/draggable/models/DesignerState";
import { ComponentMeta, SetterGroup } from "@/draggable/types/ComponentMeta";

/**
 * 设计器的组件配置面板状态
 */
class SetterState {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;
    /** 活动的叶签 */
    protected readonly _activeTab: Ref<string> = ref<string>("props");
    /** 展开的组件分组 */
    protected readonly _expandGroups: Ref<Record<string, Array<string>>> = ref<Record<string, Array<string>>>({});

    constructor(designerState: DesignerState) {
        this.designerState = designerState;
    }

    /** 获取所有展开的 group title */
    protected getAllExpandTitles(meta?: ComponentMeta): Record<string, Array<string>> {
        if (!meta) return {};
        const expandGroups: Record<string, Array<string>> = {
            style: ["布局"],
        };
        const getExpands = (groups: Array<SetterGroup>) => {
            const expands: Array<string> = [];
            for (let group of groups) {
                if (group.expand !== false) {
                    expands.push(group.title);
                }
            }
            return expands;
        };
        if (meta.setter.props) expandGroups.props = getExpands(meta.setter.props.groups);
        // if (meta.setter.events) expandGroups.events = getExpands(meta.setter.events.groups);
        // if (meta.setter.style) expandGroups.style = getExpands(meta.setter.style.groups);
        // if (meta.setter.advanced) expandGroups.advanced = getExpands(meta.setter.advanced.groups);
        return expandGroups;
    }

    /** 活动的叶签 */
    get activeTab() {
        return this._activeTab.value;
    }

    /** 活动的叶签 */
    set activeTab(value: string) {
        this._activeTab.value = value;
    }

    /** 展开的组件分组 */
    get expandGroups() {
        return this._expandGroups.value;
    }

    /** 展开的组件分组 */
    set expandGroups(value: Record<string, Array<string>>) {
        this._expandGroups.value = value;
    }

    /** 重新计算expandGroups(展开的组件分组) */
    recalcExpandGroups() {
        this._expandGroups.value = this.getAllExpandTitles(this.designerState.selectedComponentMeta);
    }
}

export {
    SetterState,
}
