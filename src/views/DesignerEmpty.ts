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
    items: [],
    methods: {},
});

export {
    designerEmpty,
}
