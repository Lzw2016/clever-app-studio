import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import ColorPickerSvg from "@/assets/images/color-picker.svg?component";

export default defineComponentMeta({
    type: "ColorPicker",
    name: "颜色选择",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(ColorPickerSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
    setter: {
        props: {
            groups: [],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {
        },
    },
    placeholder: {},
    i18n: {},
});
