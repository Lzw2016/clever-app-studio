import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ContainerSvg from "@/assets/images/container.svg?component";

export default defineComponentMeta({
    type: "Container",
    name: "容器布局",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ContainerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {
                height: "300px",
                position: "relative",
            },
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "default", label: "默认(default)" },
                                    { value: "simple", label: "简约(simple)" },
                                    { value: "legend", label: "传奇(legend)" },
                                    { value: "classic", label: "经典(classic)" },
                                    { value: "fashion", label: "时尚(fashion)" },
                                ],
                            },
                            label: "布局类型",
                            propsName: "pattern",
                            defPropsValue: "default",
                        },
                    ],
                },
            ],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        // 主要内容插槽
        default: {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    fontSize: "12px",
                    backgroundColor: "#fffdec",
                    color: "#b1a859",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "主区域",
        },
        // 侧边内容插槽
        aside: {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    fontSize: "12px",
                    backgroundColor: "#fff0f0",
                    color: "#d27070",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "侧边区域",
        },
        // 底部内容插槽
        footer: {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    fontSize: "12px",
                    backgroundColor: "#e8ffed",
                    color: "#84a18a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "底部区域",
        },
        // 头部内容插槽
        header: {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    fontSize: "12px",
                    backgroundColor: "#ecf8ff",
                    color: "#5b90af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "头部区域",
        },
    },
    i18n: {},
});
