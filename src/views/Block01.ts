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
                    width: "100%",
                    height: "100px",
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
                "<div style='color: red;'>CCC</div>",
                {
                    type: "div",
                    tpl: [
                        '<div><%= count %></div>',
                        '<div><%= this.count * 2 %></div>',
                    ],
                },
            ],
        },
        "AAA",
        {
            type: "div",
            tpl: [
                '<%= count %>',
            ],
        }
    ],
    watch: {
        count: {
            params: ["value", "oldValue", "onCleanup"],
            code: 'console.log("watch count", value, oldValue);'
        },
    },
    methods: {
        test: function () {
        },
    },
    listeners: {
        onClick: function (this: ComponentInstance) {
            console.log("root onClick", this.count++);
        },
        onContextmenu: {
            handler: function () {
                console.log("root onContextmenu handler", this.count++);
            },
            modifiers: ['prevent'],
        },
    },
    lifeCycles: {
        mounted: function (block) {
            console.log("this.$refs.div01", block.$refs.div01);
        },
        unmounted: function (block) {
            console.log("unmounted", block);
        },
    },
});

export {
    Block01,
}
