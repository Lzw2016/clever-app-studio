import { ComponentMeta, MaterialMetaTab } from "@/draggable/types/ComponentMeta";
import { componentManage } from "@/draggable/Constant";

const materialMetaTabs: Array<MaterialMetaTab> = [
    {
        title: "常用组件",
        groups: [
            {
                title: "通用",
                items: [
                    { type: "Button", name: "按钮", icon: "" },
                    { type: "div", name: "[div]容器", icon: "" },
                    { type: "span", name: "[span]", icon: "" },
                ],
            },
            {
                title: "容器布局",
                items: [],
            },
            {
                title: "表单输入",
                items: [],
            },
            {
                title: "数据展示",
                items: [],
            },
            {
                title: "反馈",
                items: [],
            },
        ],
    },
    {
        title: "业务组件",
        groups: [
            {
                title: "表格",
                items: [
                    { type: "Button", name: "按钮", icon: "" },
                ],
            },
            {
                title: "表单",
                items: [
                    { type: "Button", name: "按钮", icon: "" },
                ],
            },
        ],
    },
    {
        title: "原子组件",
        groups: [
            {
                title: "基础",
                items: [
                    { type: "Button", name: "按钮", icon: "" },
                    { type: "ButtonGroup", name: "按钮组", icon: "" },
                    { type: "FloatButton", name: "悬浮按钮", icon: "" },
                    { type: "ActionMenu", name: "菜单按钮", icon: "" },
                    { type: "Icon", name: "图标", icon: "" },
                    { type: "Link", name: "连接", icon: "" },
                    { type: "Typography", name: "排版", icon: "" },
                ],
            },
            {
                title: "布局",
                items: [
                    { type: "Row", name: "行布局", icon: "" },
                    { type: "Flex", name: "弹性布局", icon: "" },
                    { type: "Grid", name: "栅格", icon: "" },
                    { type: "Layout", name: "布局", icon: "" },
                    { type: "Split", name: "分割面板", icon: "" },
                    { type: "Space", name: "间距", icon: "" },
                    { type: "Divider", name: "分割线", icon: "" },
                ],
            },
            {
                title: "容器",
                items: [
                    { type: "Card", name: "卡片", icon: "" },
                    { type: "Collapse", name: "折叠面板", icon: "" },
                    { type: "Modal", name: "对话框", icon: "" },
                    { type: "Drawer", name: "抽屉", icon: "" },
                    { type: "Tabs", name: "标签页", icon: "" },
                ],
            },
            {
                title: "导航",
                items: [
                    { type: "Breadcrumb", name: "面包屑", icon: "" },
                    { type: "Menu", name: "菜单", icon: "" },
                    { type: "FallMenu", name: "瀑布菜单", icon: "" },
                    { type: "NavMenu", name: "导航菜单", icon: "" },
                    { type: "TreeMenu", name: "树型菜单", icon: "" },
                    { type: "Dropdown", name: "下拉菜单", icon: "" },
                    { type: "Steps", name: "步骤条", icon: "" },
                    { type: "BackTop", name: "回到顶部", icon: "" },
                    { type: "FloatBar", name: "浮动块", icon: "" },
                    { type: "Anchor", name: "锚点", icon: "" },
                    { type: "PageHeader", name: "页头", icon: "" },
                    { type: "Pagination", name: "分页", icon: "" },
                ],
            },
            {
                title: "表单",
                items: [
                    { type: "Form", name: "表单", icon: "" },
                    { type: "Input", name: "文本输入", icon: "" },
                    { type: "Textarea", name: "多行文本", icon: "" },
                    { type: "InputNumber", name: "数字输入", icon: "" },
                    { type: "Checkbox", name: "多选", icon: "" },
                    { type: "CheckboxGroup", name: "多选组", icon: "" },
                    { type: "Radio", name: "单选", icon: "" },
                    { type: "RadioGroup", name: "单选组", icon: "" },
                    { type: "Select", name: "选择器", icon: "" },
                    { type: "Cascader", name: "级联选择", icon: "" },
                    { type: "TreeSelect", name: "树选择", icon: "" },
                    { type: "DatePicker", name: "日期选择", icon: "" },
                    { type: "TimePicker", name: "时间选择", icon: "" },
                    { type: "TimeSelect", name: "时间选择", icon: "" },
                    { type: "Switch", name: "开关", icon: "" },
                    { type: "Upload", name: "文件上传", icon: "" },
                    { type: "Slider", name: "滑动输入", icon: "" },
                    { type: "Rate", name: "评分", icon: "" },
                    { type: "ColorPicker", name: "颜色选择", icon: "" },
                    { type: "AutoComplete", name: "自动完成", icon: "" },
                    { type: "Transfer", name: "穿梭框", icon: "" },
                    { type: "IpAddress", name: "IP输入", icon: "" },
                    { type: "Mentions", name: "提及", icon: "" },
                    { type: "Search", name: "搜索", icon: "" },
                    { type: "Captcha", name: "滑动验证", icon: "" },
                ],
            },
            {
                title: "数据",
                items: [
                    { type: "List", name: "列表", icon: "" },
                    { type: "Table", name: "表格", icon: "" },
                    { type: "Tree", name: "树形组件", icon: "" },
                    { type: "Descriptions", name: "描述列表", icon: "" },
                    { type: "Empty", name: "空状态", icon: "" },
                    { type: "Image", name: "图片预览", icon: "" },
                    { type: "Carousel", name: "轮播", icon: "" },
                    { type: "Avatar", name: "头像", icon: "" },
                    { type: "Badge", name: "徽标", icon: "" },
                    { type: "Calendar", name: "日历", icon: "" },
                    { type: "Timeline", name: "时间线", icon: "" },
                    { type: "Tag", name: "标签", icon: "" },
                    { type: "TagGroup", name: "标签组", icon: "" },
                    { type: "Progress", name: "进度条", icon: "" },
                    { type: "Ellipsis", name: "省略", icon: "" },
                    { type: "TimeAgo", name: "相对时间", icon: "" },
                    { type: "Statistic", name: "统计数值", icon: "" },
                    { type: "QRCode", name: "二维码", icon: "" },
                    { type: "Countdown", name: "倒计时", icon: "" },
                    { type: "Highlight", name: "文字高亮", icon: "" },
                ],
            },
            {
                title: "反馈",
                items: [
                    { type: "Alert", name: "警告提示", icon: "" },
                    { type: "Message", name: "全局提示", icon: "" },
                    { type: "Notification", name: "通知提醒", icon: "" },
                    { type: "Toast", name: "吐司提示", icon: "" },
                    { type: "Tooltip", name: "文字提示", icon: "" },
                    { type: "Popover", name: "气泡卡片", icon: "" },
                    { type: "Popconfirm", name: "气泡确认", icon: "" },
                    { type: "Spin", name: "加载中", icon: "" },
                    { type: "Skeleton", name: "骨架屏", icon: "" },
                    { type: "NProgress", name: "顶部加载条", icon: "" },
                    { type: "Tour", name: "漫游式引导", icon: "" },
                    { type: "Result", name: "结果", icon: "" },
                    { type: "ScrollText", name: "文字滚动", icon: "" },
                ],
            },
            {
                title: "图表",
                items: [],
            },
            {
                title: "其它",
                items: [
                    { type: "Contextmenu", name: "右键菜单", icon: "" },
                    { type: "Video", name: "视频", icon: "" },
                    { type: "Watermark", name: "水印", icon: "" },
                    { type: "FullScreen", name: "全屏", icon: "" },
                    { type: "Affix", name: "固钉", icon: "" },
                    { type: "Segmented", name: "分段控制器", icon: "" },
                    { type: "GradientText", name: "渐变文字", icon: "" },
                    { type: "Code", name: "代码显示", icon: "" },
                ],
            },
        ],
    },
];

function createComponentMeta(cfg: Partial<ComponentMeta>): ComponentMeta {
    return {
        type: cfg.type!,
        designComponent: "",
        name: cfg.name!,
        description: "",
        version: "0.0.1",
        docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/button",
        icon: cfg.icon!,
        defDesignNode: cfg.defDesignNode ?? {},
        events: {},
        slots: {},
        setter: {
            props: {
                title: "",
                groups: [
                    {
                        title: "常规",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "数据绑定",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "数据源",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
            events: {
                title: "",
                groups: [
                    {
                        title: "组件事件",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "HTML事件",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
            style: {
                title: "",
                groups: [
                    {
                        title: "布局",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "间距",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "尺寸",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "定位",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "文本",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "背景",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "边框",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "效果",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
            advanced: {
                title: "",
                groups: [
                    {
                        title: "指令",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                    {
                        title: "权限",
                        items: [
                            {
                                cmp: "TextSetter",
                                propsName: "aaa",
                            },
                        ],
                    },
                ],
            },
        },
        placeholder: cfg.placeholder ?? {},
        i18n: {},
    };
}

const componentMeta = createComponentMeta({ type: "Button", name: "按钮", icon: "" });

componentManage.registerComponentMeta(componentMeta);
componentManage.registerComponentMeta(createComponentMeta({ type: "ButtonGroup", name: "按钮组", icon: "" }));
componentManage.registerComponentMeta(createComponentMeta({
    type: "div",
    name: "[div]容器",
    icon: "",
    defDesignNode: {
        props: {
            style: {
                width: "auto",
                height: "auto",
                border: "1px solid #d6336c",
                margin: "4px",
            },
        },
    },
    placeholder: {
        default: true,
        // default: {
        //     type: "div",
        //     props: {
        //         style: {
        //             height: "100%",
        //             width: "100%",
        //             minHeight: "32px",
        //             fontSize: "12px",
        //             backgroundColor: "#f0f0f0",
        //             color: "#a7b1bd",
        //             border: "1px dotted #a7b1bd",
        //             display: "flex",
        //             alignItems: "center",
        //             justifyContent: "center",
        //         },
        //     },
        //     tpl: "将组件拖拽到这里",
        // },
    },
}));
componentManage.registerComponentMeta(createComponentMeta({
    type: "span",
    name: "[span]",
    icon: "",
    defDesignNode: {
        props: {
            style: {
                display: 'inline-block',
                width: "80px",
                height: "40px",
                border: "1px solid #ae3ec9",
                margin: "4px",
            },
        },
        tpl: "新span",
    },
}));

export {
    materialMetaTabs,
    componentMeta,
}
