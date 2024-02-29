import {I18N, VueComponent} from "@/draggable/types/Base";


/** 设置器分组 */
interface SetterGroup {
    /** 分组标题 */
    title: string;
    /** 是否展开状态(默认为true) */
    expand?: boolean;
    /** 设置器集合 */
    items: Array<any>;
}


/** 设置器面板 */
interface SetterPanel {
    /** 面板标题 */
    title: string;
    /** 设置器分组集合 */
    groups: Array<SetterGroup>;
}

/** 组件元信息 setter */
interface ComponentSetter {
    /** 组件属性设置 */
    props: SetterPanel;
    /** 组件事件绑定 */
    events: SetterPanel;
    /** 样式设置(内置的固定设置) */
    style: SetterPanel;
    /** vue指令设置(内置的固定设置) */
    advanced: SetterPanel;
}

/** 组件元信息 */
interface ComponentMeta {
    /** 组件类型(唯一值) */
    type: string;
    /** 运行时的组件对象 */
    component: VueComponent | string;
    /** 设计时的组件对象 */
    designComponent: VueComponent | string;
    /** 组件名称 */
    name: string;
    /** 组件介绍描述 */
    description: string;
    /** 组件版本 */
    version: string;
    /** 组件图标 */
    icon: VueComponent | string;
    /** 组件设计器 */
    setter: ComponentSetter;


    /** 组件元数据(定义属性、事件等) */
    schema: any;
    /** 组件的属性信息 */
    config: any;

    // props
    // methods
    // events
    // slots

    /** 多语言词条 */
    i18n?: I18N;
}

export type {
    ComponentMeta,
}
