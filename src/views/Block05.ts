import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";
import { BlockInstance } from "@/draggable/types/RuntimeBlock";

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
        },
        {
            type: "TablerIconAB2",
            props: {
                size: 48,
                color: "#4299e1",
            },
        },
        {
            type: "TablerIconAB2",
            props: {
                size: 48,
                color: "#f76707",
                strokeWidth: 1,
                class: "fa-spin",
            },
        },
        {
            type: "br",
        },
        {
            type: "GoogleIcon",
            props: {
                content: "home",
                size: 48,
                fontStyle: "symbols-outlined",
                color: "#ae3ec9",
                class: "fa-spin",
                inactive: true,
            },
        },
    ],
    methods: {
        addCount(this: BlockInstance) {
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
