import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "div",
    name: "[div]容器",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: "",
    // designComponent: "",
    defDesignNode: {
        props: {
            style: {
                width: "auto",
                height: "auto",
                border: "1px solid #d6336c",
                margin: "4px",
            },
        },
    },
    slots: {},
    setter: {
        props: {
            title: "",
            groups: [
                {
                    title: "数据绑定",
                    items: [
                        {
                            cmp: "StringSetter",
                            propsName: "aaa",
                        },
                    ],
                },
            ],
        },
        events: {
            title: "",
            groups: [],
        },
        style: {
            componentStyles: [
                { name: "测试A", class: "test_aaa compact" },
                { name: "测试B", class: "test_bbb gorgeous" },
            ],
        },
        // advanced: {
        //     title: "",
        //     groups: [],
        // },
    },
    placeholder: {
        default: true,
        // default: {
        //     type: "div",
        //     props: {
        //         style: {
        //             height: "100%",
        //             width: "100%",
        //             minHeight: "32px",
        //             fontSize: "12px",
        //             backgroundColor: "#f0f0f0",
        //             color: "#a7b1bd",
        //             border: "1px dotted #a7b1bd",
        //             display: "flex",
        //             alignItems: "center",
        //             justifyContent: "center",
        //         },
        //     },
        //     tpl: "将组件拖拽到这里",
        // },
    },
    i18n: {},
});
