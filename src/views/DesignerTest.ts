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
        test01: "自定义文本",
        test02: {
            "success": true,
            "msg": "查询成功",
            "data": [
                {
                    "role_id": "176707",
                    "role_code": "JXADMIN",
                    "role_name": "嘉兴工厂-管理员",
                    "is_enable": "0001",
                    "create_by": "316357343811993609",
                    "create_at": "2024-03-04 09:37:33",
                    "update_by": "316357343811993608",
                    "update_at": "2024-04-02 14:35:20"
                },
                {
                    "role_id": "177838",
                    "role_code": "suppeAdmin",
                    "role_name": "超级管理员",
                    "is_enable": "0001",
                    "create_by": "316357343811993608",
                    "create_at": "2024-04-11 15:57:10",
                    "update_by": "316357343811993608",
                    "update_at": "2024-04-11 15:57:10"
                },
                {
                    "role_id": "178520",
                    "role_code": "OMS角色",
                    "role_name": "OMS角色",
                    "is_enable": "0001",
                    "create_by": "316357343811993608",
                    "create_at": "2024-07-01 11:17:39",
                    "update_by": "316357343811993608",
                    "update_at": "2024-07-01 11:17:39"
                },
                {
                    "role_id": "303369569513766929",
                    "role_code": "test001",
                    "role_name": "系统测试1",
                    "is_enable": "0001",
                    "create_by": "316357343811993609",
                    "create_at": "2024-02-23 13:41:09",
                    "update_by": "316357343811993608",
                    "update_at": "2024-04-10 14:24:24"
                },
                {
                    "role_id": "314882675145965569",
                    "role_code": "admin22",
                    "role_name": "管理员222",
                    "is_enable": "0001",
                    "create_by": "121105249166426113",
                    "create_at": "2023-03-11 10:55:40",
                    "update_by": "316357343811993608",
                    "update_at": "2024-04-02 14:35:54"
                },
                {
                    "role_id": "337454652725919762",
                    "role_code": "001",
                    "role_name": "入库制单员",
                    "is_enable": "0001",
                    "create_by": "316357343811993608",
                    "create_at": "2024-04-10 14:22:09",
                    "update_by": "316357343811993608",
                    "update_at": "2024-04-10 14:22:09"
                }
            ],
            "pagination": {
                "total": "6",
                "size": "50",
                "current": "1",
                "firstRowNum": "1",
                "lastRowNum": "6",
                "eds": null
            }
        },
    },
    computed: {
        c_count_x2: (oldValue, block) => {
            return (block.$data.count ?? 0) * 2;
        },
        c_count_x5: (oldValue, block) => {
            return (block.$data.count ?? 0) * 5;
        },
        c_str_suffix: function (oldValue, block) {
            return `${block.$data.str ?? ''}_AAA`;
        },
        c_str_prefix: function (oldValue, block) {
            return `AAA_${block.$data.str ?? ''}`;
        },
    },
    watch: {},
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
