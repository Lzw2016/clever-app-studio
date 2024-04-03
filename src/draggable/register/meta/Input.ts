import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "Input",
    name: "文本输入",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: "",
    // designComponent: "",
    defDesignNode: {
        props: {
            placeholder: "请输入",
            type: "text",
            style: {
                maxWidth: "300px",
            },
        },
        directives: {
            'disable-event': {},
        },
    },
    events: {},
    slots: {},
    setter: {
        props: {
            title: "",
            groups: [
                {
                    title: "常规",
                    items: [
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                    ],
                },
                {
                    title: "数据绑定",
                    items: [
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                    ],
                },
                {
                    title: "数据源",
                    items: [
                        {
                            cmp: "TextSetter",
                            propsName: "aaa",
                        },
                        {
                            cmp: "TextSetter",
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
            title: "",
            groups: [],
        },
        advanced: {
            title: "",
            groups: [],
        },
    },
    placeholder: {
        // prefix: true,
    },
    i18n: {},
});
