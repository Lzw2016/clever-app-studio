import { Block, defineDesignBlock } from "@/draggable/BlockFactory";
import { DesignBlock } from "@/draggable/types/DesignBlock";

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
        ]
    });
}

const designerTest = defineDesignBlock({
    block: true,
    type: "div",
    data: {
        count: 0,
        refs: [],
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
            // type: "div",
            props: {
                'data-test': 'test',
            },
            directives: {
                show: "{{ false }}",
            },
            items: [
                createSpan(),
                createSpan(),
            ],
        },
        {
            type: "div",
            tpl: "div容器",
        },
    ],
    methods: {
        addSpan(this: Block) {
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
            this.blockOps.beforeAddItem("c_001", span);
        },
        removeSpan(this: Block) {
            if (this.refs.length <= 0) return;
            const ref = this.refs[0];
            this.refs.splice(0, 1);
            this.blockOps.remove(ref);
        },
    },
});

export {
    designerTest,
    createSpan,
    createDiv,
}