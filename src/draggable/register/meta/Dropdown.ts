import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import DropdownSvg from "@/assets/images/dropdown.svg?component";

export default defineComponentMeta({
    type: "Dropdown",
    name: "下拉菜单",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(DropdownSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            title: "下拉菜单",
            trigger: "hover",
            menuOptions: {
                options: [
                    { label: "功能1" },
                    { label: "功能2" },
                    { label: "功能3", divided: true },
                ],
            },
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
                            cmp: "StringSetter",
                            label: "显示文本",
                            propsName: "title",
                            defPropsValue: "下拉菜单",
                            recalcAuxToolPosition: true,
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
                            propsName: "trigger",
                            defPropsValue: "hover",
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
