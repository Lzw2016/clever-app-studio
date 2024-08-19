import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";

const designerEmpty = defineDesignBlock({
    block: true,
    type: "div",
    data: {},
    computed: {},
    watch: {},
    props: {
        style: {
            height: '100%',
            width: '100%',
        },
    },
    items: [
        {
            type: "div",
            props: {
                style: {
                    border: "1px solid #ccc",
                    height: "300px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                },
            },
        },
    ],
    methods: {},
});

export {
    designerEmpty,
}
