import { Block, defineDesignBlock } from "@/draggable/BlockFactory";

const block05 = defineDesignBlock({
    block: true,
    // type: "div",
    data: {
        count: 0,
    },
    defaults: {
        type: "div",
        props: {
            style: {
                border: "1px solid #ccc",
                userSelect: "none",
                padding: "2px",
                margin: "4px",
            },
        },
        listeners: {
            onClick: "addCount",
        },
        defaults: {
            directives: {
                model: "count"
            },
        },
    },
    items: [
        {
            tpl: "1.count = <%= count %>"
        },
        {
            type: "span",
            props: {
                style: {
                    width: "300px",
                    display: "block",
                    color: "blue",
                },
            },
            tpl: "2.count = <%= count %>"
        },
        {
            tpl: "3.count = <%= count %>",
            listeners: {
                onClick: "addCount2",
            },
        },
        {
            items: [
                {
                    type: "input",
                },
            ],
            listeners: {
                onClick: null,
            },
        }
    ],
    methods: {
        addCount(this: Block) {
            this.count++;
            // console.log("this", this);
        },
        addCount2() {
            this.count = this.count + 2;
        },
    },
});

export {
    block05,
}
