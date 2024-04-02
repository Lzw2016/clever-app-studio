import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";

export default defineComponentMeta({
    type: "span",
    name: "[span]",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: "",
    // designComponent: "",
    defDesignNode: {
        props: {
            style: {
                display: 'inline-block',
                width: "80px",
                height: "40px",
                border: "1px solid #ae3ec9",
                margin: "4px",
            },
        },
        tpl: "新span",
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
            ],
        },
        events: {
            title: "",
            groups: [],
        },
        // style: {
        //     title: "",
        //     groups: [],
        // },
        // advanced: {
        //     title: "",
        //     groups: [],
        // },
    },
    placeholder: {},
    i18n: {},
});
