import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import GuideSvg from "@/assets/images/guide.svg?component";

export default defineComponentMeta({
    type: "Guide",
    name: "引导",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/guide",
    icon: createVNode(GuideSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            showStep: true,
            domData: [
                {
                    title: '新手引导标题1',
                    text: '这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案',
                    // domElement: '.left-tools > .flex-item-fixed.left-tools-button[title="页面"]',
                    domElement: '.highlight_start',
                    hightBox: ['.highlight_001'],
                    button: [
                        { text: '下一步', action: 'next' },
                    ],
                },
                {
                    title: '新手引导标题2',
                    text: '<div class="scrollBox" style="height:254px">这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案这里是新手引导文案</div>',
                    // domElement: '.right-tools > .flex-item-fixed.right-tools-button.right-tools-button-active[title="属性"]',
                    domElement: '.highlight_end',
                    hightBox: ['.highlight_002', '.highlight_003'],
                    button: [
                        { text: '上一步', action: 'back', secondary: true },
                        { text: '完成', action: 'complete' },
                    ],
                },
            ],
        },
        slots: {
            main: [
                {
                    type: "Text",
                    props: {
                        class: "highlight_start",
                        defText: "开始引导",
                        style: {
                            marginRight: "100px",
                        },
                    },
                },
                {
                    type: "Button",
                    props: {
                        class: "highlight_001",
                        plain: true,
                    },
                    tpl: "新手引导_1",
                },
                {
                    type: "Button",
                    props: {
                        class: "highlight_002",
                        plain: true,
                    },
                    tpl: "新手引导_2",
                },
                {
                    type: "Button",
                    props: {
                        class: "highlight_003",
                        plain: true,
                    },
                    tpl: "新手引导_3",
                },
                {
                    type: "Text",
                    props: {
                        class: "highlight_end",
                        defText: "结束引导",
                        style: {
                            marginLeft: "100px",
                        },
                    },
                },
            ],
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
                            cmp: "BoolSetter",
                            label: "开始引导",
                            propsName: "showStep",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "用户引导参数配置",
                            },
                            label: "引导数据",
                            propsName: "domData",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示箭头",
                            labelTips: "是否显示工具提示的箭头",
                            propsName: "arrow",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "top", label: "top" },
                                    { value: "top-start", label: "top-start" },
                                    { value: "top-end", label: "top-end" },
                                    { value: "bottom", label: "bottom" },
                                    { value: "bottom-start", label: "bottom-start" },
                                    { value: "bottom-end", label: "bottom-end" },
                                    { value: "left", label: "left" },
                                    { value: "left-start", label: "left-start" },
                                    { value: "left-end", label: "left-end" },
                                    { value: "right", label: "right" },
                                    { value: "right-start", label: "right-start" },
                                    { value: "right-end", label: "right-end" },
                                ],
                            },
                            label: "箭头位置",
                            labelTips: "引导框箭头位置，该属性的可选值可参考 IPosition 类型",
                            propsName: "placement",
                            defPropsValue: "bottom",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "引导框高",
                            labelTips: "设置引导框高度",
                            propsName: "height",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "引导框宽",
                            labelTips: "设置引导框宽度",
                            propsName: "width",
                            defPropsValue: 510,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "对齐距离",
                            labelTips: "设置引导框对齐轴距离",
                            propsName: "alignmentAxis",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "横轴距离",
                            labelTips: "设置引导框横轴距离",
                            propsName: "crossAxis",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "纵轴距离",
                            labelTips: "设置引导框主轴（纵轴）距离",
                            propsName: "mainAxis",
                            defPropsValue: 18,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "填充量",
                            labelTips: "在模态叠加层开口周围添加的填充量",
                            propsName: "modalOverlayOpeningPadding",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 4,
                                unit: "px",
                            },
                            label: "半径量",
                            labelTips: "在模态叠加层开口周围添加的边界半径量",
                            propsName: "modalOverlayOpeningRadius",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "StringSetter",
                            label: "突出class",
                            labelTips: "当元素突出显示时（即，当其步骤处于活动状态时）应用于元素的类名",
                            propsName: "lightClass",
                            recalcAuxToolPosition: true,
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
        // 设置引导框内容
        main: true,
    },
    i18n: {},
});
