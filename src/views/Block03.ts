import { ComponentInstance } from "@/draggable/types/Base";
import { createBlockComponent, defineDesignBlock } from "@/draggable/BlockFactory";

const block03 = defineDesignBlock({
    block: true,
    ref: "outBlock",
    type: "div",
    props: {
        style: {
            width: "300px",
            height: "80px",
            border: "1px solid #ccc",
            userSelect: "none",
        },
        // style: "width: 300px; height:70px; border:1px solid #666;",
    },
    data: {
        count: 0,
    },
    computed: {
        count2: function (this: ComponentInstance, oldValue, block) {
            return this.count * 2;
        },
    },
    tpl: [
        "<div>AAA: <%= count %></div>",
        "<div>BBB: <%= count %></div>",
        "<div>CCC: <%= count %></div>",
    ],
    listeners: {
        onClick: "addCount",
    },
    methods: {
        addCount(this: ComponentInstance) {
            this.count++;
            console.log("this", this);
        },
    },
});

const BlockCmp03 = createBlockComponent(block03);

export {
    block03,
    BlockCmp03,
}
