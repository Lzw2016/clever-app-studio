import {ComponentInstance} from "@/draggable/types/Base";
import {createBlockComponent} from "@/draggable/BlockFactory";

const Block01 = createBlockComponent({
    block: true,
    id: "001",
    ref: "outBlock",
    type: "div",
    props: {
        style: {
            width: "300px",
            height: "300px",
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
                    backgroundColor: "{{ this.count%2===0 ? '#ccc' : '#880' }}",
                    visibility: "{{ hiddenDiv01 ? 'hidden': 'unset' }}",
                },
            },
            listeners: {
                onClick: function (this: ComponentInstance) {
                    this.count++;
                    // console.log("onClick", this.count);
                },
                onContextmenu: {
                    handler: function () {
                        this.count++;
                        // console.log("handler", this.count);
                    },
                    modifiers: ['prevent'],
                },
            },
            items: [
                "BBB",
                "<div style='color: red;'>CCC</div>",
                {
                    type: "div",
                    tpl: [
                        '<div><%= count %> * 2 = <%= count2 %></div>',
                        '<div><%= this.count * 2 %></div>',
                        '使用子Block数据 <%= $allBlock.innerDiv?.innerCount %>',
                    ],
                },
            ],
        },
        "AAA",
        {
            type: "div",
            ref: "div02",
            items: [
                {
                    type: "div",
                    tpl: [
                        '<%= count %>',
                    ],
                },
                {
                    ref: "div03",
                    type: "button",
                    tpl: "<%= hiddenDiv01 ? '显示': '隐藏' %>",
                    listeners: {
                        onClick: {
                            handler: function (this: ComponentInstance) {
                                this.hiddenDiv01 = !this.hiddenDiv01;
                                console.log("显示/隐藏");
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
            ref: "innerDiv",
            props: {
                style: {
                    border: "1px solid #ccc",
                },
            },
            data: {
                innerCount: 123,
            },
            tpl: [
                "内部组件 <%= innerCount %> | 父组件数据 <%= $parent.count %>",
                "<div>使用$allBlock <%= $allBlock.outBlock.count %></div>",
            ],
            computed: {
                innerCount2: function (this: ComponentInstance, oldValue, block) {
                    return this.innerCount + 1;
                },
            },
            watch: {
                innerCount2: function (this: ComponentInstance, value, oldValue, onCleanup) {
                    this.test2(123, "abc");
                    console.log("watch innerCount2=", value, this);
                }
            },
            listeners: {
                onClick: {
                    handler: function (this: ComponentInstance) {
                        this.innerCount++;
                        console.log("this.$parent", this.$parent);
                        this.$parent.hiddenDiv01 = !this.$parent.hiddenDiv01;
                    },
                    modifiers: ['stop'],
                },
            },
            lifeCycles: {
                updated: function (block) {
                    console.log("内部组件更新", this, block);
                },
            },
            methods: {
                test2() {
                    console.log("test2函数调用", arguments, this);
                },
            },
        },
    ],
    watch: {
        count: {
            params: ["value", "oldValue", "onCleanup"],
            code: 'console.log("watch count=", value, oldValue);'
        },
        count2: function (value, oldValue, onCleanup) {
            console.log("watch count2=", value, this);
        },
    },
    methods: {
        test: function () {
            console.log("test函数调用", arguments, this);
        },
    },
    listeners: {
        onClick: function (this: ComponentInstance) {
            this.count++;
            this.test("aaa", 123);
            // console.log("root onClick", this.count);
        },
        onContextmenu: {
            handler: function () {
                this.count++;
                // console.log("root onContextmenu handler", this.count);
            },
            modifiers: ['prevent'],
        },
    },
    lifeCycles: {
        mounted: function (block) {
            console.log("mounted", this, block);
        },
        unmounted: function (block) {
            console.log("unmounted", this);
        },
        updated: function (block) {
            console.log("外部组件更新", this, block);
        },
    },
});

export {
    Block01,
}
