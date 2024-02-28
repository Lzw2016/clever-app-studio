import {BlockDesign} from "@/draggable/types/Block";

function defineBlock<T extends BlockDesign>(block: T): T {
    return block;
}

const page = defineBlock({
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
        e: (oldValue, cmp) => {
            return cmp.$data.a + '-bbb';
        },
        f(oldValue, cmp) {
        },
        g: {
            params: ["oldValue", "cmp"],
            code: "",
        },
    },
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
    },
    lifeCycles: {
        mounted: () => {
        },
        updated() {
        },
        unmounted: {
            params: [],
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
            },
            bind: {
                // 直接返回 data/computed 中的属性
                f: "this.a.b",
                // 计算表达式
                g: "this.a.b + 1",
                // 返回对象
                h: {
                    a: "this.a",
                    b: "this.c",
                },
            },
            listeners: {
                click: e => {
                },
                keydown(e) {
                },
                blur: "func01",
                change: {
                    params: ["e"],
                    code: "",
                },
            },
            items: [],
        },
    ],
    i18n: {
        "zh-CN": {
            "aaa": "中文",
        },
        "en-US": {
            "aaa": "英文",
        },
    },
});
