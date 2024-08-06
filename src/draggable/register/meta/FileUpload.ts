import { createVNode } from "vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import FileUploadSvg from "@/assets/images/file-upload.svg?component";

export default defineComponentMeta({
    type: "FileUpload",
    name: "文件上传",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FileUploadSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    defDesignNode: {
        props: {
            style: {},
        },
    },
    slots: {},
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
