import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";
import { BlockInstance } from "@/draggable/types/RuntimeBlock";

const block02 = defineDesignBlock({
    block: true,
    ref: "outBlock",
    // type: "div",
    data: {
        count: 0,
    },
    computed: {
        count2: function (this: BlockInstance, oldValue, block) {
            return this.count * 2;
        },
    },
    items: [
        {
            // type: "div",
            tpl: 'count = <%= count %>',
        },
        {
            type: "div",
            props: {
                style: {
                    width: "300px",
                    height: "50px",
                    border: "1px solid #ccc",
                    userSelect: "none",
                    backgroundColor: "{{ this.count%2 != 0 ? '#fff' : '#066' }}",
                },
            },
            tpl: [
                '数值 <%= count %> * 2 = <%= count2 %>',
            ],
            listeners: {
                onClick: "addCount",
            },
        },
        "<div style='width:300px;border: 1px solid #ccc;'>测试: <%= count %></div>",
        {
            type: "div",
            props: {
                style: {
                    width: "300px",
                    height: "50px",
                    border: "1px solid #ccc",
                    userSelect: "none",
                    backgroundColor: "{{ this.count%2===0 ? '#fff' : '#066' }}",
                },
            },
            tpl: '<div>数值: <div><%= count %> * 2 = <%= count2 %></div></div>',
            listeners: {
                onClick: "addCount",
            },
        },
    ],
    methods: {
        addCount(this: BlockInstance) {
            this.count++;
            console.log("this", this);
        },
    },
});

export {
    block02,
}
