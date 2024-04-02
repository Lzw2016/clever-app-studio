import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";

const block06 = defineDesignBlock({
    block: true,
    type: "div",
    data: {
        count: 0,
    },
    props: {
        style: {
            border: "1px solid #ccc",
            userSelect: "none",
            padding: "2px",
            margin: "4px",
        },
    },
    items: [
        {
            type: "Avatar",
            props: {
                size: 64,
            },
            slots: {
                icon: {
                    type: "FontAwesomeIcon",
                    props: {
                        icon: "fa-solid fa-user-nurse",
                        style: {
                            fontSize: "40px",
                            color: "#262626",
                        },
                    },
                },
            },
        }
    ],
    methods: {},
});

export {
    block06,
}
