import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import SplitSvg from "@/assets/images/split.svg?component";
import { VarType } from "@/draggable/types/Base";

export default defineComponentMeta({
    type: "Split",
    name: "分割面板",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/split",
    icon: createVNode(SplitSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
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
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "horizontal", label: "水平" },
                                    { value: "vertical", label: "垂直" },
                                ],
                            },
                            label: "分割类型",
                            propsName: "mode",
                            defPropsValue: "horizontal",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 0.05,
                                unit: "%",
                                precision: 2,
                                min: 0,
                                max: 1,
                            },
                            label: "分割位置",
                            labelTips: "分割面板的位置",
                            propsName: "modelValue",
                            defPropsValue: 0.5,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "反转位置",
                            labelTips: "默认情况下，v-model的值为左/上面板的位置。 当设置right-bottom-value 为true时，指明 v-model的值为 右/下面板的位置",
                            propsName: "rightBottomValue",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示边框",
                            propsName: "border",
                            defPropsValue: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "左上最小",
                            labelTips: "左面板 / 上面板最小阈值",
                            propsName: "leftTopMin",
                            defPropsValue: 40,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "右下最小",
                            labelTips: "右面板 / 下面板最小阈值",
                            propsName: "rightBottomMin",
                            defPropsValue: 40,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "简易模式",
                            labelTips: "简易模式启用右/下展开收起按钮",
                            propsName: "triggerSimple",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "左上按钮",
                            labelTips: "简易模式启用左/上展开收起按钮",
                            propsName: "collapseLeftTop",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "右下按钮",
                            labelTips: "简易模式启用右/下展开收起按钮",
                            propsName: "collapseRightBottom",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "3个区块",
                            labelTips: "",
                            propsName: "threeAreas",
                        },
                    ],
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
                            title: "左箭头收起",
                            description: "左箭头收起时触发",
                            name: "leftTopClick",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "右箭头收起",
                            description: "右箭头收起时触发",
                            name: "rightBottomClick",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "拖拽开始",
                            description: "拖拽开始的事件",
                            name: "movestart",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "拖拽中",
                            description: "拖拽中的事件",
                            name: "moving",
                            params: [],
                            return: VarType.Void,
                        },
                        {
                            title: "拖拽结束",
                            description: "拖拽结束的事件",
                            name: "moveend",
                            params: [],
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
        // 下面板插槽
        bottom: true,
        // 左面板插槽
        left: true,
        // 右面板插槽
        right: true,
        // 上面板插槽
        top: true,
    },
    i18n: {},
});
