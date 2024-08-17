import lodash from "lodash";
import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { ComponentParam } from "@/draggable/types/Base";
import { toObj } from "@/draggable/utils/SetterUtils";
import IconSvg from "@/assets/images/icon.svg?component";

const defSvg: string = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star">',
    '    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    '</svg>',
].join("\n");

export default defineComponentMeta({
    type: "Icon",
    name: "图标",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(IconSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            iconType: "FontAwesomeIcon",
            iconProps: {
                size: "lg",
                fixedWidth: true,
                icon: ["far", "star"],
                style: {
                    color: "#3B4549",
                },
            },
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "SVG图标",
                            watchValue: true,
                            getPropsValue: props => !!props.svg,
                            applyPropsValue: (props, value) => {
                                if (value) {
                                    props.svg = defSvg;
                                    delete props.iconType;
                                    delete props.iconProps;
                                } else {
                                    delete props.svg;
                                    props.iconType = "FontAwesomeIcon";
                                    props.iconProps = {
                                        size: "lg",
                                        fixedWidth: true,
                                        icon: ["far", "star"],
                                        style: {
                                            color: "#3B4549",
                                        },
                                    };
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "编辑SVG图标内容",
                                valueTransform: (value: string) => value,
                                convertValue: (value: string) => value,
                                language: "html",
                                virtualFilePath: "svg.html",
                                jsonSchemaValidate: false,
                            },
                            label: "编辑SVG",
                            propsName: "svg",
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            isHideSetter: node => !node.props.svg,
                        },
                        {
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                                valueTransform: toObj,
                                convertValue: (value: ComponentParam) => value,
                            },
                            label: "选择图标",
                            watchValue: true,
                            getPropsValue: props => {
                                if (!props.iconType) return;
                                const componentParam: ComponentParam = {
                                    type: props.iconType,
                                    props: props.iconProps,
                                };
                                return componentParam;
                            },
                            applyPropsValue: (props, value?: ComponentParam) => {
                                props.iconType = value?.type;
                                props.iconProps = value?.props;
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg,
                        },
                    ],
                },
                {
                    title: "FontAwesome图标",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "图标大小",
                            cmpProps: {
                                placeholder: "font-size",
                            },
                            getPropsValue: props => props.iconProps?.style?.["font-size"],
                            applyPropsValue: (props, value) => {
                                value = lodash.trim(value);
                                if (!props.iconProps) props.iconProps = {};
                                if (!props.iconProps.style) props.iconProps.style = {};
                                if (value) {
                                    if (!value.endsWith("px")) value = `${value}px`;
                                    props.iconProps.style["font-size"] = value;
                                } else {
                                    delete props.iconProps.style["font-size"];
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || node.props.iconType !== "FontAwesomeIcon",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "固定宽度",
                            getPropsValue: props => props.iconProps?.fixedWidth,
                            applyPropsValue: (props, value) => {
                                if (!props.iconProps) props.iconProps = {};
                                if (value) {
                                    props.iconProps.fixedWidth = value;
                                } else {
                                    delete props.iconProps.fixedWidth;
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || node.props.iconType !== "FontAwesomeIcon",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: 0, label: "0度" },
                                    { value: 90, label: "90度" },
                                    { value: 180, label: "180度" },
                                    { value: 270, label: "270度" },
                                    { value: 360, label: "360度" },
                                ],
                            },
                            label: "旋转角度",
                            getPropsValue: props => props.iconProps?.rotation,
                            applyPropsValue: (props, value) => {
                                if (!props.iconProps) props.iconProps = {};
                                if (value !== 0) {
                                    props.iconProps.rotation = value;
                                } else {
                                    delete props.iconProps.rotation;
                                }
                            },
                            defPropsValue: 0,
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || node.props.iconType !== "FontAwesomeIcon",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "horizontal", label: "水平" },
                                    { value: "vertical", label: "垂直" },
                                    { value: "both", label: "水平&垂直" },
                                ],
                            },
                            label: "翻转图标",
                            getPropsValue: props => props.iconProps?.flip,
                            applyPropsValue: (props, value) => {
                                if (!props.iconProps) props.iconProps = {};
                                if (value) {
                                    props.iconProps.flip = value;
                                } else {
                                    delete props.iconProps.flip;
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || node.props.iconType !== "FontAwesomeIcon",
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { label: 'beat', value: 'beat' },
                                    { label: 'beat-fade', value: 'beatFade' },
                                    { label: 'bounce', value: 'bounce' },
                                    { label: 'fade', value: 'fade' },
                                    { label: 'shake', value: 'shake' },
                                    { label: 'spin', value: 'spin' },
                                    { label: 'spin-reverse', value: 'spinReverse' },
                                    { label: 'spin-pulse', value: 'spinPulse' },
                                ],
                            },
                            label: "图标动画",
                            getPropsValue: props => {
                                const names = ["beat", "beatFade", "bounce", "fade", "shake", "spin", "spinReverse", "spinPulse"];
                                for (let name of names) {
                                    if (props.iconProps[name]) {
                                        return name;
                                    }
                                }
                            },
                            applyPropsValue: (props, value) => {
                                if (!props.iconProps) props.iconProps = {};
                                const names = ["beat", "beatFade", "bounce", "fade", "shake", "spin", "spinReverse", "spinPulse"];
                                for (let name of names) {
                                    if (value === name) {
                                        props.iconProps[name] = true;
                                    } else {
                                        delete props.iconProps[name];
                                    }
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || node.props.iconType !== "FontAwesomeIcon",
                        },
                    ],
                },
                {
                    title: "Google图标",
                    items: [
                        {
                            cmp: "NumberSetter",
                            label: "图标大小",
                            cmpProps: {
                                placeholder: "font-size",
                            },
                            getPropsValue: props => props.iconProps?.size,
                            applyPropsValue: (props, value) => {
                                if (!props.iconProps) props.iconProps = {};
                                if (value) {
                                    props.iconProps.size = value;
                                } else {
                                    delete props.iconProps.size;
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || node.props.iconType !== "GoogleIcon",
                        },
                        // {
                        //     cmp: "SelectSetter",
                        //     cmpProps: {
                        //         options: [
                        //             { value: "outlined", label: "outlined" },
                        //             { value: "round", label: "round" },
                        //             { value: "sharp", label: "sharp" },
                        //             { value: "two-tone", label: "two-tone" },
                        //             { value: "symbols-outlined", label: "symbols-outlined" },
                        //             { value: "symbols-rounded", label: "symbols-rounded" },
                        //             { value: "symbols-sharp", label: "symbols-sharp" },
                        //         ],
                        //     },
                        //     label: "字体类型",
                        //     getPropsValue: props => props.iconProps?.fontStyle,
                        //     applyPropsValue: (props, value) => {
                        //         if (!props.iconProps) props.iconProps = {};
                        //         if (value) {
                        //             props.iconProps.fontStyle = value;
                        //         } else {
                        //             delete props.iconProps.fontStyle;
                        //         }
                        //     },
                        //     enableBind: false,
                        //     recalcAuxToolPosition: true,
                        //     recalcAuxToolPositionDelay: 150,
                        //     isHideSetter: node => !!node.props.svg || node.props.iconType !== "GoogleIcon",
                        // },
                        {
                            cmp: "ColorSetter",
                            label: "图标颜色",
                            getPropsValue: props => props.iconProps?.color,
                            applyPropsValue: (props, value) => {
                                value = lodash.trim(value);
                                if (!props.iconProps) props.iconProps = {};
                                if (value) {
                                    props.iconProps.color = value;
                                } else {
                                    delete props.iconProps.color;
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || node.props.iconType !== "GoogleIcon",
                        },
                    ],
                },
                {
                    title: "Tabler图标",
                    items: [
                        {
                            cmp: "NumberSetter",
                            label: "图标大小",
                            cmpProps: {
                                placeholder: "font-size",
                            },
                            getPropsValue: props => props.iconProps?.size,
                            applyPropsValue: (props, value) => {
                                if (!props.iconProps) props.iconProps = {};
                                if (value) {
                                    props.iconProps.size = value;
                                } else {
                                    delete props.iconProps.size;
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || !node.props.iconType?.startsWith("TablerIcon"),
                        },
                        {
                            cmp: "NumberSetter",
                            label: "stroke属性",
                            cmpProps: {
                                placeholder: "stroke属性",
                                step: 0.1,
                                precision: 2,
                                min: 0.5,
                                max: 3,
                            },
                            getPropsValue: props => props.iconProps?.stroke,
                            applyPropsValue: (props, value) => {
                                if (!props.iconProps) props.iconProps = {};
                                if (value) {
                                    props.iconProps.stroke = value;
                                } else {
                                    delete props.iconProps.stroke;
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || !node.props.iconType?.startsWith("TablerIcon"),
                        },
                        {
                            cmp: "ColorSetter",
                            label: "图标颜色",
                            getPropsValue: props => props.iconProps?.color,
                            applyPropsValue: (props, value) => {
                                value = lodash.trim(value);
                                if (!props.iconProps) props.iconProps = {};
                                if (value) {
                                    props.iconProps.color = value;
                                } else {
                                    delete props.iconProps.color;
                                }
                            },
                            enableBind: false,
                            recalcAuxToolPosition: true,
                            recalcAuxToolPositionDelay: 150,
                            isHideSetter: node => !!node.props.svg || !node.props.iconType?.startsWith("TablerIcon"),
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
