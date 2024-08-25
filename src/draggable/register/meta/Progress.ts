import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { progressColor } from "@/draggable/register/JsonSchema";
import ProgressSvg from "@/assets/images/progress.svg?component";

export default defineComponentMeta({
    type: "Progress",
    name: "进度条",
    description: "",
    version: "0.0.1",
    docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/progress",
    icon: createVNode(ProgressSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            percentage: 50,
        },
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
                                min: 0,
                                max: 100,
                                unit: "%",
                            },
                            label: "百分比",
                            propsName: "percentage",
                            defPropsValue: 0,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示文字",
                            labelTips: "是否显示进度条文字内容",
                            propsName: "showText",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "文本内置",
                            labelTips: "进度条显示文字内置在进度条内（只在 type=line 时可用）",
                            propsName: "textInside",
                        },
                        // TODO 函数参数
                        // format () => string 自定义进度条的文字
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "line", label: "线形" },
                                    { value: "circle", label: "环形" },
                                    { value: "dashboard", label: "仪表盘" },
                                ],
                            },
                            label: "类型",
                            labelTips: "进度条类型",
                            propsName: "type",
                            defPropsValue: "line",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "success", label: "成功" },
                                    { value: "exception", label: "异常" },
                                    { value: "warning", label: "警告" },
                                ],
                            },
                            label: "当前状态",
                            labelTips: "进度条当前状态",
                            propsName: "status",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                                unit: "px",
                            },
                            label: "进度宽度",
                            labelTips: "line 类型进度条的宽度，单位 px",
                            propsName: "strokeWidth",
                            defPropsValue: 6,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                                unit: "px",
                            },
                            label: "容器宽度",
                            labelTips: "环形进度条画布宽度（只在 type 为 circle 或 dashboard 时可用）",
                            propsName: "width",
                            defPropsValue: 126,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "进度条背景色",
                                jsonSchema: progressColor,
                            },
                            label: "条背景色",
                            labelTips: "进度条背景色（会覆盖 status 状态颜色）",
                            propsName: "color",
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
    placeholder: {},
    i18n: {},
});
