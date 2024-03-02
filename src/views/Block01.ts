import {createBlock} from "@/draggable/components/BlockFactory";

const Block01 = createBlock({
    id: "001",
    type: "Block",
    props: {
        style: {
            width: "300px",
            height: "200px",
            border: "1px solid #ccc",
        },
    },
    data: {
        count: 0,
    },
    computed: {},
    watch: {},
    methods: {},
    lifeCycles: {
        mounted(block) {
            console.log("this.$refs.div01", block.$refs.div01)
        },
    },
    items: [
        {
            type: "div",
            ref: "div01",
            props: {
                style: {
                    width: "100px",
                    height: "32px",
                    backgroundColor: "#ccc"
                },
            },
        },
    ],
});

export {
    Block01,
}
