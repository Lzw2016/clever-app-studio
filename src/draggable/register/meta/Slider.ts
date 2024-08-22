import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SliderSvg from "@/assets/images/slider.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "Slider",
    name: "滑动输入",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/slider",
    icon: createVNode(SliderSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                defPropsValue: [],
            },
            groups: [
                {
                    title: "常用",
                    items: [

                    ],
                },
                {
                    title: "风格",
                    items: [],
                },
            ],
        },
        events: {
            includeInnerEvents: true,
            excludeInnerEvents: ["表单事件"],
            groups: [
                {
                    title: "组件事件",
                    items: [
                        {
                            title: "值变更",
                            description: "组件的值变化时触发的回调函数",
                            name: "change",
                            params: [
                                { name: "value", type: "string[] | number[]", note: "" },
                            ],
                            return: VarType.Void,
                        },
                    ],
                },
            ],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        // 显示滑块值的插槽，仅仅 v-model 是单数值时才有效，插槽参数为：slotArg: { slotScope: number }
        // default
    },
    i18n: {},
});
