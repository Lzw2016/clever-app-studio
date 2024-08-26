import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";

const designerEmpty = defineDesignBlock({
    block: true,
    type: "div",
    data: {
        str: "abcABC",
        int: 123,
        num: 123.456,
        bool: true,
        date: new Date(),
    },
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
