import { ComponentInstance } from "@/draggable/types/Base";
import { createBlockComponent, defineDesignBlock } from "@/draggable/BlockFactory";

const block03 = defineDesignBlock({
    block: true,
    ref: "outBlock",
    type: "div",
    props: {
        style: {
            width: "300px",
            border: "1px solid #ccc",
            userSelect: "none",
        },
        // style: "width: 300px; height:70px; border:1px solid #666;",
    },
    data: {
        count: 0,
        rows: [
            { k: "001", v: "aaa" },
            { k: "002", v: "bbb" },
            { k: "003", v: "ccc" },
        ],
    },
    computed: {
        count2: function (this: ComponentInstance, oldValue, block) {
            return this.count * 2;
        },
    },
    // tpl: [
    //     "<div style='color: #409eff;'>AAA: <%= count %></div>",
    //     "<div style='color: bisque;'>BBB: <%= count %></div>",
    //     "<div style='color: brown;'>CCC: <%= count %></div>",
    //     "DDD: <%= count %>",
    // ],
    items: [
        // "<div style='color: #409eff;'>AAA: <%= count %></div>",
        // "<div style='color: bisque;'>BBB: <%= count %></div>",
        // "<div style='color: brown;'>CCC: <%= count %></div>",
        // "DDD: <%= count %>",
        // {
        //     type: "div",
        //     directives: {
        //         show: "{{ count%2 === 0 }}",
        //     },
        //     items: ["条件显示"],
        // },
        // {
        //     type: "div",
        //     directives: {
        //         if: "{{ count%2 === 0 }}",
        //     },
        //     items: [
        //         "条件渲染",
        //     ],
        // },
        {
            type: "div",
            directives: {
                for: {
                    data: "{{ rows }}",
                    item: "item",
                    // key: "key",
                    // index: "index",
                },
            },
            items: [
                "<div>循环渲染 k= <%= item.k %> | v= <%= item.v %></div>",
            ],
        },
        // {
        //     type: "input",
        //     directives: {
        //         focus: true,
        //     },
        // },
        // {
        //     type: "input",
        //     directives: {
        //         if: "{{ count%2 === 0 }}",
        //         focus: true,
        //     },
        //     props: {
        //         value: "{{ '多个指令组合使用' + count }}",
        //     },
        // },
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
