import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";
import { DesignBlock } from "@/draggable/types/DesignBlock";
import { BlockInstance } from "@/draggable/types/RuntimeBlock";

let count = 1;

function createDiv(designBlock?: Partial<DesignBlock>) {
    return defineDesignBlock({
        ref: designBlock?.ref,
        block: false,
        type: "div",
        defaults: designBlock?.defaults,
        props: {
            style: {
                width: "80px",
                height: "40px",
                border: "1px solid #ccc",
                margin: "4px",
                ...(designBlock?.props?.style as any ?? {}),
            },
        },
        items: [
            ...(designBlock?.items as any ?? []),
        ]
    });
}

function createSpan(designBlock?: Partial<DesignBlock>) {
    return defineDesignBlock({
        ref: designBlock?.ref,
        block: false,
        type: "span",
        defaults: designBlock?.defaults,
        props: {
            style: {
                display: 'inline-block',
                width: "80px",
                height: "40px",
                border: "1px solid #ccc",
                margin: "4px",
                verticalAlign: 'bottom',
                ...(designBlock?.props?.style as any ?? {}),
            },
        },
        items: [
            ...(designBlock?.items as any ?? []),
        ],
        tpl: designBlock?.items ? undefined : `${count++}`,
    });
}

const designerTest = defineDesignBlock({
    block: true,
    type: "div",
    data: {
        count: 0,
        refs: [],
        str: "",
    },
    props: {
        style: {
            height: '100%',
            width: '100%',
        },
    },
    items: [
        {
            // block: true,
            ref: "b_001",
            type: "button",
            items: "新增",
            listeners: {
                onClick: 'addSpan',
            },
        },
        // function () {
        // },
        {
            type: "button",
            items: "删除",
            listeners: {
                onClick: 'removeSpan',
            },
        },
        createDiv(),
        createDiv({
            items: [
                {
                    type: "div",
                    tpl: "测试1",
                },
                "测试2",
            ],
        }),
        createSpan(),
        createSpan(),
        createSpan(),
        createDiv({
            ref: "c_000",
            props: {
                style: {
                    width: '800px',
                    height: 'auto',
                },
            },
            defaults: {
                props: {
                    // 'data-def': 'test001',
                },
            },
            items: [
                createSpan(),
                createSpan(),
                createSpan(),
                createDiv({
                    ref: "c_001",
                    props: {
                        style: {
                            width: '200px',
                        },
                    },
                }),
                createSpan(),
                createSpan(),
                createSpan(),
            ],
        }),
        createSpan(),
        createSpan(),
        createSpan(),
        {
            type: "div",
            // props: {
            //     'data-test': 'test',
            // },
            // directives: {
            //     show: "{{ false }}",
            // },
            items: [
                createSpan(),
                createSpan(),
                {
                    type: "Button",
                    props: {
                        text: "按钮",
                        icon: {
                            __component_param: true,
                            type: "TablerIconTrash",
                            props: { size: 16, stroke: 1.2 },
                        },
                    },
                },
                {
                    type: "Input",
                    props: {
                        type: "text",
                        placeholder: "请输入",
                        style: {
                            maxWidth: "300px",
                        },
                    },
                    directives: {
                        model: "str",
                    },
                },
            ],
        },
        {
            type: "div",
            tpl: "div容器",
            props: {
                class: "aaaaaaaaaaaaa",
                style: {
                    height: "100px",
                    border: "1px solid #ccc",
                },
            },
            listeners: {
                // onClick: 'addSpan',
                onClick: {
                    handler: "addSpan",
                    modifiers: ['stop', 'ctrl'],
                },
                onMousedown: function () {
                    console.log("onMousedown");
                },
                onMouseleave: function () {
                    console.log("onMouseleave");
                },
                onContextmenu: function (event) {
                    console.log("onContextmenu", event);
                },
            },
        },
    ],
    methods: {
        addSpan(this: BlockInstance) {
            const ref = `span_${this.count}`;
            this.refs.push(ref);
            const span = createSpan({
                ref: ref,
                props: {
                    style: {
                        backgroundColor: '#eee',
                    },
                },
                items: [
                    `<div>${this.count++}</div>`,
                ],
            });
            this.ops.beforeAddItem("c_001", span);
        },
        removeSpan(this: BlockInstance) {
            if (this.refs.length <= 0) return;
            const ref = this.refs[0];
            this.refs.splice(0, 1);
            this.ops.remove(ref);
        },
    },
});

// console.log("designerTest", JSON.stringify(designerTest, null, 4));

export {
    designerTest,
    createSpan,
    createDiv,
}
