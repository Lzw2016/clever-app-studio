import { Block, defineDesignBlock } from "@/draggable/BlockFactory";

const block04 = defineDesignBlock({
    block: true,
    ref: "outBlock",
    type: "div",
    props: {
        style: {
            width: "300px",
            border: "1px solid #ccc",
            userSelect: "none",
            padding: "8px",
        },
        // style: "width: 300px; height:70px; border:1px solid #666;",
    },
    data: {
        count: 0,
        str: "aaa",
        now: new Date(),
    },
    computed: {
        count2: function (this: Block, oldValue, block) {
            return this.count * 2;
        },
    },
    items: [
        {
            type: 'input',
            directives: {
                model: "str",
            },
        },
        {
            type: "Button",
            props: {
                type: "primary",
                size: "mini",
                "reset-time": 0,
            },
            // items: "A按钮<%= count %>",
            tpl: "A按钮<%= count %>",
            listeners: {
                onClick: "addCount",
            },
        },
        {
            type: "Button",
            props: {},
            tpl: "B按钮<%= count %>",
            listeners: {
                onClick: "addCount",
            },
        },
        {
            type: "Input",
            props: {
                type: "text",
                // modelValue: "{{ str }}",
            },
            directives: {
                model: "str",
            },
            slots: {
                prepend: {
                    tpl: "HTTP://",
                },
                append: {
                    tpl: ".com",
                },
            },
            listeners: {},
        },
        {
            type: "Input",
            props: {
                type: "text",
                modelValue: "{{ str }}",
            },
            slots: {
                prefix: {
                    type: "IconSearch",
                },
                suffix: {
                    type: "IconCalendar",
                },
            },
            listeners: {
                "onUpdate:modelValue": function (this: Block, value: string) {
                    this.str = value;
                },
            },
        },
        {
            type: "Calendar",
            props: {
                dateFormat: "yy-mm-dd",
                hourFormat: "24",
                showTime: true,
                showSeconds: true,
            },
            directives: {
                model: "now",
            },
            slots: {
                date: [
                    {
                        type: "strong",
                        props: {
                            style: {
                                "text-decoration": "line-through",
                            },
                        },
                        directives: {
                            if: "{{ slotProps.date.day > 10 && slotProps.date.day < 15 }}",
                        },
                        tpl: "<%= slotProps.date.day %>",
                    },
                    {
                        directives: {
                            if: "{{ !(slotProps.date.day > 10 && slotProps.date.day < 15) }}",
                        },
                        tpl: "<%= slotProps.date.day %>",
                    },
                ]
            },
        }
    ],
    methods: {
        addCount(this: Block) {
            this.count++;
            console.log("this", this);
        },
    },
});

export {
    block04,
}
