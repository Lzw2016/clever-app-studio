import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import BulletinBoardSvg from "@/assets/images/bulletin-board.svg?component";

export default defineComponentMeta({
    type: "BulletinBoard",
    name: "公告牌",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(BulletinBoardSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
    slots: {},
    setter: {
        props: {
            groups: [],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {
            groups: [],
        },
    },
    placeholder: {},
    i18n: {},
});
