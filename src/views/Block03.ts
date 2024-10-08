import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";
import { BlockInstance } from "@/draggable/types/RuntimeBlock";

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
        map: {
            "ccc": { v: "003" },
            "bbb": { v: "002" },
            "aaa": { v: "001" },
        },
    },
    computed: {
        count2: function (this: BlockInstance, oldValue, block) {
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
        "<div style='color: #409eff;'>AAA: <%= count %></div>",
        "<div style='color: bisque;'>BBB: <%= count %></div>",
        "<div style='color: brown;'>CCC: <%= count %></div>",
        "DDD: <%= count %>",
        {
            type: "div",
            props: {
                // item: { k: "111", v: "aaa" },
                item: "{{ rows[0] }}",
            },
            items: [
                "<div>读取当前的Props  k= <%= item.k %> | v= <%= item.v %></div>",
            ],
            // tpl: [
            //     "<div>读取当前的Props  k= <%= item.k %> | v= <%= item.v %></div>",
            // ],
        },
        {
            type: "div",
            directives: {
                show: "{{ count%2 === 0 }}",
            },
            items: ["条件显示"],
        },
        {
            type: "div",
            directives: {
                if: "{{ count%2 === 0 }}",
            },
            items: "条件渲染",
        },
        {
            type: "div",
            props: {
                style: {
                    color: "blue",
                },
            },
            directives: {
                for: {
                    data: "{{ rows }}",
                    item: "item",
                    index: "index",
                },
            },
            tpl: [
                "<div><%= index+1 %>循环渲染 k= <%= item.k %> | v= <%= item.v %></div>",
            ],
        },
        {
            type: "div",
            directives: {
                for: {
                    data: "{{ map }}",
                    item: "item",
                    index: "index",
                },
            },
            items: [
                "<div>循环渲染 k= <%= index %> | v= <%= item.v %></div>",
            ],
        },
        {
            type: "input",
            directives: {
                focus: true,
            },
        },
        {
            type: "input",
            directives: {
                if: "{{ count%2 === 0 }}",
                focus: true,
            },
            props: {
                value: "{{ '多个指令组合使用' + count }}",
            },
        },
    ],
    listeners: {
        onClick: "addCount",
    },
    methods: {
        addCount(this: BlockInstance) {
            this.count++;
            this.rows.push({ k: `0_${this.count}`, v: `a_${this.count}` });
            console.log("this", this);
        },
    },
});

export {
    block03,
}
