import { createVNode } from "vue";
import { FileUpload } from "@opentiny/vue";
import { defineComponentMeta } from "@/draggable/utils/DesignerUtils";
import { createBaseWrapper } from "@/draggable/utils/ComponentWrapper";
import { fileUploadEncryptConfig, fileUploadFileList, fileUploadThumbOption } from "@/draggable/register/JsonSchema";
import FileUploadSvg from "@/assets/images/file-upload.svg?component";

export default defineComponentMeta({
    type: "FileUpload",
    name: "文件上传",
    description: "",
    version: "0.0.1",
    docLink: "",
    icon: createVNode(FileUploadSvg, { 'stroke-width': "2", style: { width: "20px", height: "20px" } }),
    designComponent: createBaseWrapper(
        "span",
        {
            style: {
                display: "inline-block",
            },
            // onClickCapture: (e: Event) => {
            //     console.log("onClickCapture");
            //     e.stopImmediatePropagation();
            //     e.stopPropagation();
            // },
        },
        FileUpload,
    ),
    designDirectives: {
        "disable-event": {},
    },
    defDesignNode: {
        props: {
            action: "./",
            fileList: [],
        },
        slots: {
            trigger: [
                {
                    type: "Button",
                    props: {
                        type: "primary",
                        text: "点击上传",
                    },
                },
            ],
        },
    },
    setter: {
        props: {
            groups: [
                {
                    title: "常用",
                    items: [
                        {
                            cmp: "StringSetter",
                            label: "文件类型",
                            labelTips: "限制文件类型（thumbnail-mode 模式下此参数无效）",
                            propsName: "accept",
                        },
                        {
                            cmp: "StringSetter",
                            label: "上传地址",
                            labelTips: "上传的地址，必填参数",
                            propsName: "action",
                        },
                        {
                            cmp: "StringSetter",
                            label: "字段名",
                            labelTips: "上传的文件字段名",
                            propsName: "name",
                            defPropsValue: "file",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "显示列表",
                            labelTips: "是否显示已上传文件列表",
                            propsName: "showFileList",
                            defPropsValue: true,
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "上传的文件列表",
                                jsonSchema: fileUploadFileList,
                            },
                            label: "文件列表",
                            labelTips: "上传的文件列表",
                            propsName: "fileList",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "最大上传",
                            labelTips: "最大允许上传个数",
                            propsName: "limit",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置水印和加密弹窗",
                                jsonSchema: fileUploadEncryptConfig,
                            },
                            label: "加密弹窗",
                            labelTips: "设置水印和加密弹窗",
                            propsName: "encryptConfig",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "上传时附带的额外参数",
                            },
                            label: "额外参数",
                            labelTips: "上传时附带的额外参数，参数自定义",
                            propsName: "data",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "设置上传的请求头部",
                                jsonSchema: fileUploadFileList,
                            },
                            label: "请求头部",
                            labelTips: "设置上传的请求头部;通过设置 headers 为头部请求信息",
                            propsName: "headers",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "发送凭证",
                            labelTips: "支持发送 cookie 凭证信息",
                            propsName: "withCredentials",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动上传",
                            labelTips: "是否在选取文件后立即进行上传",
                            propsName: "autoUpload",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "粘贴上传",
                            labelTips: "是否启用粘贴键快捷上传功能",
                            propsName: "pasteUpload",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "支持多选",
                            labelTips: "是否支持多选文件",
                            propsName: "multiple",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "自动隐藏",
                            labelTips: "达到最大上传个数时，是否隐藏上传按钮，默认不隐藏",
                            propsName: "isHidden",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "支持下载",
                            labelTips: "是否开启点击下载文件，默认不开启",
                            propsName: "openDownloadFile",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "重新上传",
                            labelTips: "是否启用重新上传功能",
                            propsName: "reUploadable",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "合并服务",
                            labelTips: "配置 merge-service 为 true 且开启多文件上传走默认服务会将多个上传服务合并为一个服务上传",
                            propsName: "mergeService",
                        },
                        {
                            cmp: "BoolSetter",
                            label: "是否禁用",
                            propsName: "disabled",
                        },
                        // TODO 函数属性
                        // before-add-file (callback: () => void) => void 文件选择之前的钩子，若返回 false 或者返回 Promise 且被 reject，则停止添加文件。如果不用以上 2 种方式，也可以通过执行参数中的回调函数继续进行上传
                        // before-remove (file: IFile, fileList: IFile[]) => boolean | Promise 删除文件前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
                        // before-upload (file: IFile) => boolean | Promise 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传
                        // http-request (file: IFile) => Promise<any> 覆盖默认的上传行为，可以自定义上传的实现; 由于 TinyVue 官网为 Mock 上传不能执行上传
                        // re-upload-tip (count: number) => string 自定义重新上传的左侧提示文字，需要与 re-uploadable 搭配使用
                    ],
                },
                {
                    title: "风格",
                    items: [
                        {
                            cmp: "BoolSetter",
                            label: "是否启用拖拽上传",
                            propsName: "drag",
                            recalcAuxToolPosition: true,
                        },
                        {
                            cmp: "SelectSetter",
                            cmpProps: {
                                options: [
                                    { value: "text", label: "文本" },
                                    { value: "picture", label: "缩略图" },
                                    { value: "picture-card", label: "照片墙" },
                                    { value: "thumb", label: "弹窗显示" },
                                    { value: "saas", label: "SaaS文件列表" },
                                ],
                            },
                            label: "列表类型",
                            labelTips: "文件列表的类型",
                            propsName: "listType",
                            defPropsValue: "text",
                        },
                        {
                            cmp: "NumberSetter",
                            cmpProps: {
                                min: 1,
                            },
                            label: "最长名字",
                            labelTips: "列表项的文件名最大字符数，默认超出20个字符隐藏",
                            propsName: "maxNameLength",
                        },
                        {
                            cmp: "EditorSetter",
                            cmpProps: {
                                title: "文件列表的显示类型为 thumb 时的相关配置",
                                jsonSchema: fileUploadThumbOption,
                            },
                            label: "弹窗配置",
                            labelTips: "文件列表的显示类型为 thumb 时的相关配置",
                            propsName: "thumbOption",
                        },
                    ],
                },
            ],
        },
        events: {
            groups: [],
        },
        style: {},
        advanced: {},
    },
    placeholder: {
        // 定义文件显示内容
        // file
        // 提示说明文字
        // tip
        // 触发文件选择框的内容
        trigger: true,
    },
    i18n: {},
});
