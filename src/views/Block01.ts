import {ComponentInstance} from "@/draggable/types/Base";
import {createBlock} from "@/draggable/components/BlockFactory";

const Block01 = createBlock({
    id: "001",
    type: "Block",
    props: {
        style: {
            width: "300px",
            height: "200px",
            border: "1px solid #ccc",
        },
    },
    data: {
        count: 0,
    },
    computed: {
        // a: function (oldValue, block) {
        // },
    },
    items: [
        {
            type: "div",
            ref: "div01",
            props: {
                style: {
                    width: "100px",
                    height: "32px",
                    backgroundColor: "#ccc"
                },
            },
            listeners: {
                onClick: function (this: ComponentInstance) {
                    console.log("onClick", this.count++);
                },
                onContextmenu: {
                    handler: function () {
                        console.log("handler", this.count++);
                    },
                    modifiers: ['prevent'],
                },
            },
            items: [
                "BBB",
                "CCC",
            ],
        },
        "AAA",
    ],
    watch: {},
    methods: {
        test: function () {
        },
    },
    lifeCycles: {
        mounted: function (block) {
            console.log("this.$refs.div01", block.$refs.div01);
        },
    },
});

export {
    Block01,
}
