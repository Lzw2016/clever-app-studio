import lodash from "lodash";
import { createVNode } from "vue";
import { noValue } from "@/utils/Typeof";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import CarouselSvg from "@/assets/images/carousel.svg?component";

export default defineComponentMeta({
    type: "Carousel",
    name: "走马灯",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/carousel",
    icon: createVNode(CarouselSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            trigger: "click",
        },
        items: [
            {
                type: "CarouselItem",
                props: {
                    name: "item_1",
                    title: "走马灯_1",
                },
            },
            {
                type: "CarouselItem",
                props: {
                    name: "item_2",
                    title: "走马灯_2",
                },
            },
            {
                type: "CarouselItem",
                props: {
                    name: "item_3",
                    title: "走马灯_3",
                },
            },
        ],
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
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                min: 0,
                            },
                            label: "初始显示",
                            labelTips: "初始状态激活的幻灯片的索引，从 0 开始",
                            propsName: "initialIndex",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动切换",
                            propsName: "autoplay",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 200,
                                min: 0,
                                unit: "毫秒",
                            },
                            label: "切换间隔",
                            labelTips: "自动切换的时间间隔，单位为毫秒",
                            propsName: "interval",
                            defPropsValue: 3000,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "循环显示",
                            propsName: "loop",
                            defPropsValue: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示标题",
                            propsName: "showTitle",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "hover", label: "鼠标悬停" },
                                    { value: "click", label: "鼠标点击" },
                                ],
                            },
                            label: "触发方式",
                            labelTips: "指示器的触发方式",
                            propsName: "trigger",
                            defPropsValue: "hover",
                        },
                        // TODO 函数属性
                        // beforeSwipe (newIndex,oldIndex) => boolean 触摸轮播前，通过返回值控制某个图是否可轮播显示
                        // TODO 内置新增操作
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "精简模式",
                            labelTips: "是否打开精简模式，不显示切换按钮和指示器",
                            propsName: "lite",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "horizontal", label: "水平显示" },
                                    { value: "vertical", label: "垂直显示" },
                                    { value: "card", label: "卡片显示" },
                                ],
                            },
                            label: "显示类型",
                            labelTips: "走马灯的类型",
                            propsName: "type",
                            defPropsValue: "horizontal",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "always", label: "总是显示" },
                                    { value: "hover", label: "鼠标悬停显示" },
                                    { value: "never", label: "不显示" },
                                ],
                            },
                            label: "显示箭头",
                            labelTips: "切换箭头的显示效果",
                            propsName: "arrow",
                            defPropsValue: "hover",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "outside", label: "外部" },
                                    { value: "none", label: "不显示" },
                                ],
                            },
                            label: "指示器",
                            propsName: "indicatorPosition",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "高度",
                            propsName: "height",
                            getPropsValue: props => {
                                let height = lodash.trim(props.height);
                                if (!height) return;
                                if (height.endsWith("px")) {
                                    height = height.substring(0, height.length - 2);
                                }
                                return lodash.toInteger(height);
                            },
                            applyPropsValue: (props, value) => {
                                if (noValue(value) || value <= 0) {
                                    delete props.height;
                                } else {
                                    props.height = `${(value)}px`;
                                }
                            },
                            recalcAuxToolPosition: true,
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
                            title: "幻灯片切换",
                            description: "幻灯片切换时触发",
                            name: "change",
                            params: [
                                { name: "curIndex", type: "number", note: "当前幻灯片索引" },
                                { name: "preIndex", type: "number", note: "上一张幻灯片索引" },
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
        default: true,
    },
    i18n: {},
});
