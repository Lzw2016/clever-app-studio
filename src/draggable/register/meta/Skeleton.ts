import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SkeletonSvg from "@/assets/images/skeleton.svg?component";

export default defineComponentMeta({
    type: "Skeleton",
    name: "骨架屏",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(SkeletonSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
                height: "300px",
                border: "1px solid #ccc",
            },
            loading: false,
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "加载状态",
                            labelTips: "是否显示骨架屏，传 false 时会展示加载完成后的内容",
                            propsName: "loading",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "开启动画",
                            propsName: "animated",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示头像",
                            propsName: "avatar",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 0,
                            },
                            label: "段落行数",
                            labelTips: "默认样式，可配置段落显示行数",
                            propsName: "rows",
                            defPropsValue: 3,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "自定义段落每一行的宽度",
                            },
                            label: "设置行宽",
                            labelTips: "自定义段落每一行的宽度，数组中的每一项可以为 number 或 string ，当为 number 时，组件会自动增加 px 单位e",
                            propsName: "rowsWidth",
                            defPropsValue: [],
                        },
                    ],
                },
            ],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: true,
    },
    i18n: {},
});
