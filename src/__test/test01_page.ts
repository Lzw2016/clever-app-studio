import { DesignBlock } from "@/draggable/types/DesignBlock";

function defineBlock(block: DesignBlock): DesignBlock {
    return block;
}

const page = defineBlock({
    block: true,
    id: "01",
    meta: {
        title: "页面01",
        description: "测试页面",
        version: "001",
        createAt: Date.now(),
        createBy: "lizw",
    },
    type: "Block",
    props: {
        style: {},
        class: "",
    },
    data: {
        a: "aaa",
        b: "bbb",
        c: "ccc",
        d: 0,
    },
    computed: {
        e: (oldValue, block) => {
            return block.$data.a + '-bbb';
        },
        f(oldValue, block) {
        },
        g: {
            params: ["oldValue", "block"],
            code: "",
        },
    },
    items: [
        {
            id: "02",
            type: "button",
            ref: "b01",
            props: {
                a: "a",
                b: "b",
                c: 0,
                d: false,
                e: new Date(),
                // 直接返回 data/computed 中的属性
                f: "{{ this.a.b }}",
                // 计算表达式
                g: "{{ this.a.b + 1 }}",
                // 返回对象
                h: {
                    a: "{{ this.a }}",
                    b: "{{ this.c }}",
                },
            },
            listeners: {
                click: e => {
                },
                blur: "func01",
                change: {
                    params: ["e"],
                    code: "",
                    modifiers: ['stop', 'prevent'],
                },
                keydown: {
                    handler: e => {
                    },
                    modifiers: ['stop', 'prevent'],
                },
                contextmenu: {
                    handler: "func01",
                    modifiers: ['stop', 'prevent'],
                },
                drag: {
                    handler: {
                        params: ["e"],
                        code: "",
                    },
                    modifiers: ['stop', 'prevent'],
                },
            },
            directives: {
                once: "{{ this.a===1 }}",
                show: "{{ !!this.show }}",
                for: {
                    data: "{{ this.c }}",
                    key: "id",
                    index: "",
                    item: "",
                },
            },
            slots: {
                icon: {
                    type: "image",
                    props: {
                        src: "",
                    },
                },
                suffix: [
                    {
                        type: "div",
                    },
                    {
                        type: "div",
                    },
                ],
            },
            items: [
                {
                    type: "div",
                },
                {
                    type: "div",
                },
            ],
        },
    ],
    watch: {
        a: (value, oldValue, onCleanup) => {
        },
        b: "fun01",
        c: {
            handler: (value, oldValue, onCleanup) => {
            },
            deep: false,
            flush: "pre",
        },
        d: {
            params: ["value", "oldValue", "onCleanup"],
            code: "",
        },
        e: [
            (value, oldValue, onCleanup) => {
            },
            "fun01",
            {
                handler: (value, oldValue, onCleanup) => {
                },
                deep: false,
                flush: "pre",
            },
            {
                params: ["value", "oldValue", "onCleanup"],
                code: "",
            },
            {
                handler: {
                    params: ["value", "oldValue", "onCleanup"],
                    code: "",
                },
                deep: false,
                flush: "pre",
            },
        ],
        f: {
            handler: {
                params: ["value", "oldValue", "onCleanup"],
                code: "",
            },
            deep: false,
            flush: "pre",
        },
    },
    methods: {
        fun01: () => {

        },
        fun02() {
        },
        fun03: {
            params: ["a", "b", "c"],
            code: "",
        },
        fun04: (a, b, c, d) => {
        },
        fun05(a, b) {
        },
        fun06: (a: string, b: number, c: Date) => {

        },
    },
    lifeCycles: {
        mounted: () => {
        },
        updated() {
        },
        unmounted: {
            params: ["block"],
            code: "",
        },
    },
    i18n: {
        "zhCN": {
            "aaa": "中文",
        },
        "enUS": {
            "aaa": "英文",
        },
    },
});
