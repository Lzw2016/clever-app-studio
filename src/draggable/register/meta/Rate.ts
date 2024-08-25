import lodash from "lodash";
import { createVNode } from "vue";
import { VarType } from "@/draggable/types/Base";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { searchTypeValue } from "@/draggable/register/JsonSchema";
import RateSvg from "@/assets/images/rate.svg?component";

export default defineComponentMeta({
    type: "Rate",
    name: "评分",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(RateSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            modelValue: 3,
        },
    },
    designDirectives: {
        "disable-event": {},
    },
    setter: {
        props: {
            enableVModel: true,
            modelValueSetter: {
                cmp: "NumberSetter",
                cmpProps: {
                    step: 1,
                },
            },
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "允许半选",
                            propsName: "allowHalf",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                            },
                            label: "最大分值",
                            propsName: "max",
                            defPropsValue: 5,
                        },
                        {
                            cmp: "NumberSetter",
                            label: "低分界限",
                            labelTips: "低分和中等分数的界限值，值本身被划分在低分中",
                            propsName: "lowThreshold",
                            defPropsValue: 2,
                        },
                        {
                            cmp: "NumberSetter",
                            label: "高分界限",
                            labelTips: "高分和中等分数的界限值，值本身被划分在高分中",
                            propsName: "highThreshold",
                            defPropsValue: 4,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示分数",
                            labelTips: "是否显示当前分数，show-score 和 show-text 不能同时为真",
                            propsName: "showScore",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "BoolSetter",
                            label: "分数文本",
                            labelTips: "是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容",
                            propsName: "showText",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "StringSetter",
                            label: "分数模板",
                            labelTips: "分数显示模板，用“{value}”代表分数",
                            propsName: "scoreTemplate",
                            defPropsValue: "{value}",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示文本",
                            labelTips: "是否在图标下显示对应的文字",
                            propsName: "textOnBottom",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "三个分段对应的图标样式名",
                            },
                            label: "文本数组",
                            labelTips: "辅助文字数组，文字的数量应该与max属性一致",
                            propsName: "texts",
                            defPropsValue: ["很差", "差", "一般", "好", "很好"],
                        },
                        {
                            cmp: "BoolSetter",
                            label: "单选模式",
                            propsName: "radio",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "px",
                            },
                            label: "字体大小",
                            labelTips: "图标字体大小",
                            propsName: "size",
                            getPropsValue: props => {
                                let size = lodash.trim(props.size);
                                if (!size) return;
                                if (size.endsWith("px")) {
                                    size = size.substring(0, size.length - 2);
                                }
                                return lodash.toInteger(size);
                            },
                            applyPropsValue: (props, value) => {
                                props.size = `${(value ?? 80)}px`;
                            },
                            defPropsValue: 18,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                step: 1,
                                unit: "px",
                            },
                            label: "图标宽度",
                            labelTips: "每个图标所占宽度",
                            propsName: "space",
                            getPropsValue: props => {
                                let space = lodash.trim(props.space);
                                if (!space) return;
                                if (space.endsWith("px")) {
                                    space = space.substring(0, space.length - 2);
                                }
                                return lodash.toInteger(space);
                            },
                            applyPropsValue: (props, value) => {
                                props.space = `${(value ?? 80)}px`;
                            },
                            defPropsValue: 24,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "ColorSetter",
                            label: "icon颜色",
                            labelTips: "未选中 icon 的颜色",
                            propsName: "voidColor",
                            defPropsValue: "#BFBFBF",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "icon-starDisable", label: "starDisable" },
                                    { value: "icon-starActive", label: "starActive" },
                                    { value: "icon-frown", label: "frown" },
                                    { value: "icon-meh", label: "meh" },
                                    { value: "icon-smile", label: "smile" },
                                ],
                            },
                            label: "icon样式",
                            labelTips: "未选中 icon 的图标样式名",
                            propsName: "voidIconClass",
                            defPropsValue: "icon-starDisable",
                        },
                        {
                            cmp: "ColorSetter",
                            label: "文字颜色",
                            labelTips: "辅助文字的颜色",
                            propsName: "textColor",
                            defPropsValue: "#666666",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "icon 的颜色数组，为 Threshold 三个分段所对应的颜色",
                                jsonSchema: searchTypeValue,
                            },
                            label: "颜色数组",
                            labelTips: "icon 的颜色数组，为 Threshold 三个分段所对应的颜色",
                            propsName: "colors",
                            defPropsValue: ["#FADB14", "#FADB14", "#FADB14"],
                        },
                        {
                            cmp: "ColorSetter",
                            label: "禁用颜色",
                            labelTips: "禁用状态下未选中 icon 的颜色",
                            propsName: "disabledVoidColor",
                            defPropsValue: "#D9D9D9",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                clearable: true,
                                options: [
                                    { value: "icon-starDisable", label: "starDisable" },
                                    { value: "icon-starActive", label: "starActive" },
                                    { value: "icon-frown", label: "frown" },
                                    { value: "icon-meh", label: "meh" },
                                    { value: "icon-smile", label: "smile" },
                                ],
                            },
                            label: "图标样式",
                            labelTips: "只读状态下未选中的图标样式名",
                            propsName: "disabledVoidIconClass",
                            defPropsValue: "icon-starActive",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "三个分段对应的图标样式名",
                            },
                            label: "三段样式",
                            labelTips: "三个分段对应的图标样式名",
                            propsName: "iconClasses",
                            defPropsValue: ["icon-starActive", "icon-starActive", "icon-starActive"],
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
                            title: "值变更",
                            description: "分值改变时触发",
                            name: "change",
                            params: [
                                { name: "value", type: "number", note: "" },
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
    placeholder: {},
    i18n: {},
});
