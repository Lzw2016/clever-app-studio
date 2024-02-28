import {BlockDesign} from "@/draggable/types/BlockDesign";

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
        f: {
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
            params: [],
            code: "",
        },
        e: [
            {
                handler: (value, oldValue, onCleanup) => {
                },
            },
            {
                handler: (value, oldValue, onCleanup) => {
                },
            },
            "fun01",
            (value, oldValue, onCleanup) => {
            },
        ],
        f: {
            handler: {
                params: ["value", "oldValue", "onCleanup"],
                code: "",
            },
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
    },
    items: [
        {
            id: "02",
            ref: "",
            type: "",
            props: {
                a: "a",
            },
            listeners: {},
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
