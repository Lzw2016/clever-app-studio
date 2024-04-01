/** 物料元信息 */
interface MaterialMeta {
    /** 组件类型(唯一值) */
    type: string;
    /** 组件名称 */
    name: string;
    /** 组件介绍描述 */
    description?: string;
    /** 组件图标 */
    icon: string | any;
    /** 组件版本 */
    version?: string;
    /** 组件文档连接 */
    docLink?: string;
}

/** 物料分组 */
interface MaterialMetaGroup {
    /** 组件分组标题 */
    title: string;
    /** 是否展开状态(默认为true) */
    expand?: boolean;
    /** 组件元信息集合 */
    items: Array<MaterialMeta>
}

/** 物料叶签 */
interface MaterialMetaTab {
    /** 组件叶签标题 */
    title: string;
    /** 组件元信息集合 */
    groups: Array<MaterialMetaGroup>
}
