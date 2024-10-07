import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";

const form01 = defineDesignBlock({
    block: true,
    type: "div",
    data: {},
    computed: {},
    items: [
        {
            type: 'Form',
            props: {
                style: {
                    minHeight: '150px',

                },
                labelWidth: '75px',
                rules: {
                    f1: [
                        {
                            required: true,
                            message: '字段1必填',
                            trigger: 'blur',
                        },
                    ],
                },
            },
            items: [
                {
                    type: 'Row',
                    items: [
                        {
                            type: 'Col',
                            props: {
                                span: 6,
                            },
                            items: {
                                type: 'FormItem',
                                props: {
                                    prop: 'f1',
                                    label: '字段1',
                                },
                                items: {
                                    type: 'Input',
                                },
                            },
                        },
                        {
                            type: 'Col',
                            props: {
                                span: 6,
                            },
                            items: {
                                type: 'FormItem',
                                props: {
                                    prop: 'f2',
                                    label: '字段2',
                                },
                                items: {
                                    type: 'Input',
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'Row',
                    items: [
                        {
                            type: 'Col',
                            props: {
                                span: 6,
                            },
                            items: {
                                type: 'FormItem',
                                props: {
                                    prop: 'f3',
                                    label: '字段3',
                                },
                                items: {
                                    type: 'Input',
                                },
                            },
                        },
                        {
                            type: 'Col',
                            props: {
                                span: 6,
                            },
                            items: {
                                type: 'FormItem',
                                props: {
                                    prop: 'f4',
                                    label: '字段4',
                                },
                                items: {
                                    type: 'Input',
                                },
                            },
                        },
                    ],
                },
                {
                    type: 'Row',
                    items: {
                        type: 'Col',
                        props: {
                            span: 12,
                        },
                        items: {
                            type: 'FormItem',
                            props: {
                                prop: 'f5',
                                label: '字段5',
                            },
                            items: {
                                type: 'Input',
                                props: {
                                    type: 'textarea',
                                },
                            },
                        },
                    },
                },
            ],
        }
    ],
});

export default {
    form01,
}
