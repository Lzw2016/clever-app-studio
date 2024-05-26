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
    slots: {},
    setter: {
        props: {
            title: "",
            groups: [
                {
                    title: "常规",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "配置A",
                            propsName: "bbb",
                        },
                    ],
                },
            ],
        },
        events: {
            title: "",
            groups: [],
        },
        style: {},
        // advanced: {
        //     title: "",
        //     groups: [],
        // },
    },
    placeholder: {},
    i18n: {},
});
