import { defineDesignBlock } from "@/draggable/BlockFactory";
import { DesignBlock } from "@/draggable/types/DesignBlock";

function createDiv(designBlock?: Partial<DesignBlock>) {
    return defineDesignBlock({
        block: false,
        type: "div",
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
        block: false,
        type: "span",
        props: {
            style: {
                display: 'inline-block',
                width: "80px",
                height: "40px",
                border: "1px solid #ccc",
                margin: "4px",
            },
        },
        ...designBlock,
    });
}

const designerTest = defineDesignBlock({
    block: true,
    type: "div",
    data: {
        count: 0,
    },
    props: {
        style: {
            height: '100%',
            width: '100%',
        },
    },
    items: [
        createDiv(),
        createDiv(),
        createSpan(),
        createSpan(),
        createSpan(),
        createDiv({
            props: {
                style: {
                    width: '800px',
                    height: 'auto',
                },
            },
            items: [
                createSpan(),
                createSpan(),
                createSpan(),
                createDiv({
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
            type: "",
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
    ],
    methods: {},
});

export {
    designerTest,
}
