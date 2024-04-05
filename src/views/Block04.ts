import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";
import { BlockInstance } from "@/draggable/types/RuntimeBlock";

const block04 = defineDesignBlock({
    block: true,
    ref: "outBlock",
    type: "div",
    props: {
        style: {
            width: "350px",
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
        count2: function (this: BlockInstance, oldValue, block) {
            return this.count * 2;
        },
    },
    items: [
        {
            type: 'FontAwesomeIcon',
            props: {
                // icon: "fa-solid fa-phone",
                icon: ['fas', 'phone'],
                // icon: ['fas', 'spinner'],
                size: "2x",
            },
        },
        {
            type: 'FontAwesomeIcon',
            props: {
                icon: "fas fa-volume-up",
                size: "1x",
                spin: true,
            },
        },
        {
            type: 'FontAwesomeIcon',
            props: {
                icon: "fas fa-volume-up",
                size: "2x",
                flip: "horizontal",
            },
        },
        {
            type: 'FontAwesomeIcon',
            props: {
                icon: "fas fa-volume-up",
                size: "3x",
                rotation: 270,
            },
        },
        {
            type: 'FontAwesomeIcon',
            props: {
                style: {
                    fontSize: "28px",
                    color: "#adb0b8",
                },
                icon: "fas fa-search",
                fixedWidth: true,
            },
        },
        "<br/>",
        {
            type: 'input',
            directives: {
                model: "str",
            },
        },
        {
            type: "Button",
            props: {
                severity: "info",
                size: "small",
                style: {
                    marginLeft: "8px",
                },
                // unstyled: true,
            },
            // items: "A按钮<%= count %>",
            tpl: "A按钮<%= count %>",
            listeners: {
                onClick: "addCount",
            },
        },
        {
            type: "InputNumber",
            props: {
                showButtons: true,
                buttonLayout: "horizontal",
            },
            directives: {
                model: "count",
            },
            slots: {
                decrementbuttonicon: {
                    type: "FontAwesomeIcon",
                    props: {
                        style: {
                            fontSize: "16px",
                            color: "#adb0b8",
                        },
                        icon: "fas fa-plus",
                        fixedWidth: true,
                    },
                },
                incrementbuttonicon: {
                    type: "FontAwesomeIcon",
                    props: {
                        style: {
                            fontSize: "16px",
                            color: "#adb0b8",
                        },
                        icon: "fa-solid fa-minus",
                        fixedWidth: true,
                    },
                },
            },
            listeners: {},
        },
        {
            type: "Calendar",
            props: {
                dateFormat: "yy-mm-dd",
                hourFormat: "24",
                showTime: true,
                showSeconds: true,
                // unstyled: true,
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
                            if: "{{ $slotProps.date.day > 10 && $slotProps.date.day < 15 }}",
                        },
                        tpl: "<%= $slotProps.date.day %>",
                    },
                    {
                        directives: {
                            if: "{{ !($slotProps.date.day > 10 && $slotProps.date.day < 15) }}",
                        },
                        tpl: "<span style='outline: none;'><%= $slotProps.date.day %></span>",
                    },
                ]
            },
        }
    ],
    methods: {
        addCount(this: BlockInstance) {
            this.count++;
            console.log("this", this);
        },
    },
});

export {
    block04,
}
