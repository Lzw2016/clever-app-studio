import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CarouselItemSvg from "@/assets/images/collapse-item.svg?component";

export default defineComponentMeta({
    type: "CarouselItem",
    name: "走马灯项",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/carousel",
    icon: createVNode(CarouselItemSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            name: "carousel_item",
            title: "走马灯项",
        },
    },
    designDirectives: {
        // "disable-event": {},
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "名称",
                            labelTips: "幻灯片名称",
                            propsName: "name",
                        },
                        {
                            cmp: "StringSetter",
                            label: "标题",
                            labelTips: "幻灯片标题",
                            propsName: "title",
                        },
                    ],
                },
            ],
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        default: true,
    },
    i18n: {},
});
