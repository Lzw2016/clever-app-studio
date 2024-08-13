import { Ref, ref } from "vue";
import { DesignerState } from "@/draggable/models/DesignerState";
import { ComponentMeta, SetterGroup } from "@/draggable/types/ComponentMeta";

/**
 * 组件配置面板共享状态
 */
class SetterShareState {
    /** 设计器状态数据 */
    readonly designerState: DesignerState;
    /** 展开的组件分组 */
    protected readonly _expandGroups: Ref<Record<string, Array<string>>> = ref<Record<string, Array<string>>>({});

    constructor(designerState: DesignerState) {
        this.designerState = designerState;
    }

    /** 获取所有展开的 group title */
    protected getAllExpandTitles(meta?: ComponentMeta): Record<string, Array<string>> {
        if (!meta) return {};
        const expandGroups: Record<string, Array<string>> = {
            props: ["内置属性"],
            style: ["渲染节点", "布局(容器)", "布局(元素)", "间距", "尺寸", "定位", "文本", "背景", "边框", "效果"],
            advanced: ["内置指令"],
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
        if (meta.setter.props) expandGroups.props.push(...getExpands(meta.setter.props.groups));
        return expandGroups;
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
    SetterShareState,
}
