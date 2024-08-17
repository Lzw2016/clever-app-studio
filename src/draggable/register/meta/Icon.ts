import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { ComponentParam } from "@/draggable/types/Base";
import { toObj } from "@/draggable/utils/SetterUtils";
import IconSvg from "@/assets/images/icon.svg?component";

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
                icon: [
                    "far",
                    "star",
                ],
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
                            cmp: "IconSetter",
                            cmpProps: {
                                placeholder: "选择图标",
                                readonly: true,
                                valueTransform: toObj,
                                convertValue: (value: ComponentParam) => value,
                            },
                            label: "按钮图标",
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
