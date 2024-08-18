import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TabsSvg from "@/assets/images/tabs.svg?component";

export default defineComponentMeta({
    type: "Tabs",
    name: "多页签",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TabsSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            activeName: "tab_1",
            style: {
                height: "300px",
            },
        },
        items: [
            {
                type: "TabItem",
                props: {
                    name: "tab_1",
                    title: "叶签1",
                },
            },
            {
                type: "TabItem",
                props: {
                    name: "tab_2",
                    title: "叶签2",
                },
            },
            {
                type: "TabItem",
                props: {
                    name: "tab_3",
                    title: "叶签3",
                },
            },
        ],
    },
    setter: {
        props: {
            groups: [],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: {
            type: "div",
            props: {
                style: {
                    height: "100%",
                    width: "100%",
                    minHeight: "180px",
                    minWidth: "104px",
                    fontSize: "12px",
                    backgroundColor: "#f0f0f0",
                    color: "#a7b1bd",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                },
            },
            tpl: "拖拽“页签项”组件到这里",
        },
    },
    i18n: {},
});
