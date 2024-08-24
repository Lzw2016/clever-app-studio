import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import TransferSvg from "@/assets/images/transfer.svg?component";

export default defineComponentMeta({
    type: "Transfer",
    name: "穿梭框",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(TransferSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [],
                },
                {
                    title: "风格",
                    items: [],
                },
            ],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        // 穿梭按钮插槽
        // button-panel
        // 数据项的内容插槽，插槽数据上下文为： { option }
        // default
        // 左侧列表底部的内容插槽
        // left-footer
        // 左侧自定义内容插槽
        // left-panel
        // 右侧列表底部的内容插槽
        // right-footer
        // 右侧自定义内容插槽
        // right-panel
    },
    i18n: {},
});
