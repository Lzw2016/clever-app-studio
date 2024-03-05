import {ComponentInstance} from "@/draggable/types/Base";
import {createBlockComponent} from "@/draggable/BlockFactory";

const Block01 = createBlockComponent({
    block: true,
    id: "001",
    type: "div",
    props: {
        style: {
            width: "300px",
            height: "200px",
            border: "1px solid #ccc",
            userSelect: "none",
            backgroundColor: "{{ this.count%2===0 ? '#fff' : '#066' }}",
        },
    },
    data: {
        count: 0,
        hiddenDiv01: false,
    },
    computed: {
        count2: function (oldValue, block) {
            return block.count * 2;
        },
    },
    items: [
        {
            type: "div",
            ref: "div01",
            props: {
                style: {
                    width: "100%",
                    height: "100px",
                    backgroundColor: "{{ this.count%2===0 ? '#ccc' : '#880' }}",
                    visibility: "{{ hiddenDiv01 ? 'hidden': 'unset' }}",
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
                        '<div><%= count %> * 2 = <%= count2 %></div>',
                        '<div><%= this.count * 2 %></div>',
                    ],
                },
            ],
        },
        "AAA",
        {
            type: "div",
            items: [
                {
                    type: "div",
                    tpl: [
                        '<%= count %>',
                    ],
                },
                {
                    type: "button",
                    tpl: "<%= hiddenDiv01 ? '显示': '隐藏' %>",
                    listeners: {
                        onClick: {
                            handler: function (this: ComponentInstance) {
                                this.hiddenDiv01 = !this.hiddenDiv01;
                            },
                            modifiers: ['stop'],
                        },
                    },
                }
            ],
        },
        {
            block: true,
            type: "div",
            data: {
                innerCount: 123,
            },
            props: {
                style: {
                    border: "1px solid #ccc",
                },
            },
            tpl: [
                "内部组件 <%= innerCount %>"
            ],
            listeners: {
                onClick: {
                    handler: function (this: ComponentInstance) {
                        this.innerCount++;
                        console.log("this.innerCount", this.innerCount);
                    },
                    modifiers: ['stop'],
                },
            },
            lifeCycles: {
                updated: function (block) {
                    console.log("内部组件更新");
                },
            },
        },
    ],
    watch: {
        count: {
            params: ["value", "oldValue", "onCleanup"],
            code: 'console.log("watch count", value, oldValue);'
        },
        count2: function (value, oldValue, onCleanup) {
            console.log("count2=", value, this);
        }
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
        updated: function (block) {
            console.log("外部组件更新");
        },
    },
});

export {
    Block01,
}
