import { ComponentMeta, ComponentMetaTab } from "@/draggable/types/ComponentMeta";

function createComponentMeta(cfg: any): ComponentMeta {
    return {
        type: cfg.type,
        component: "",
        designComponent: "",
        name: cfg.name,
        description: "",
        version: "0.0.1",
        docLink: "https://opentiny.design/tiny-vue/zh-CN/os-theme/components/button",
        icon: cfg.icon,
        defDesignNode: {},
        schema: {
            events: {},
            slots: {},
        },
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
        i18n: {},
    };
}

const componentMetaTabs: Array<ComponentMetaTab> = [
    {
        title: "常用组件",
        groups: [
            {
                title: "通用",
                items: [
                    createComponentMeta({ name: "按钮", icon: "" }),
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
                    createComponentMeta({ name: "按钮", icon: "" }),
                ],
            },
            {
                title: "表单",
                items: [
                    createComponentMeta({ name: "按钮", icon: "" }),
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
                    createComponentMeta({ type: "Button", name: "按钮", icon: "" }),
                    createComponentMeta({ type: "ButtonGroup", name: "按钮组", icon: "" }),
                    createComponentMeta({ type: "FloatButton", name: "悬浮按钮", icon: "" }),
                    createComponentMeta({ type: "ActionMenu", name: "菜单按钮", icon: "" }),
                    createComponentMeta({ type: "Icon", name: "图标", icon: "" }),
                    createComponentMeta({ type: "Link", name: "连接", icon: "" }),
                    createComponentMeta({ type: "Typography", name: "排版", icon: "" }),
                ],
            },
            {
                title: "布局",
                items: [
                    createComponentMeta({ type: "Row", name: "行布局", icon: "" }),
                    createComponentMeta({ type: "Flex", name: "弹性布局", icon: "" }),
                    createComponentMeta({ type: "Grid", name: "栅格", icon: "" }),
                    createComponentMeta({ type: "Layout", name: "布局", icon: "" }),
                    createComponentMeta({ type: "Split", name: "分割面板", icon: "" }),
                    createComponentMeta({ type: "Space", name: "间距", icon: "" }),
                    createComponentMeta({ type: "Divider", name: "分割线", icon: "" }),
                ],
            },
            {
                title: "容器",
                items: [
                    createComponentMeta({ type: "Card", name: "卡片", icon: "" }),
                    createComponentMeta({ type: "Collapse", name: "折叠面板", icon: "" }),
                    createComponentMeta({ type: "Modal", name: "对话框", icon: "" }),
                    createComponentMeta({ type: "Drawer", name: "抽屉", icon: "" }),
                    createComponentMeta({ type: "Tabs", name: "标签页", icon: "" }),
                ],
            },
            {
                title: "导航",
                items: [
                    createComponentMeta({ type: "Breadcrumb", name: "面包屑", icon: "" }),
                    createComponentMeta({ type: "Menu", name: "菜单", icon: "" }),
                    createComponentMeta({ type: "FallMenu", name: "瀑布菜单", icon: "" }),
                    createComponentMeta({ type: "NavMenu", name: "导航菜单", icon: "" }),
                    createComponentMeta({ type: "TreeMenu", name: "树型菜单", icon: "" }),
                    createComponentMeta({ type: "Dropdown", name: "下拉菜单", icon: "" }),
                    createComponentMeta({ type: "Steps", name: "步骤条", icon: "" }),
                    createComponentMeta({ type: "BackTop", name: "回到顶部", icon: "" }),
                    createComponentMeta({ type: "FloatBar", name: "浮动块", icon: "" }),
                    createComponentMeta({ type: "Anchor", name: "锚点", icon: "" }),
                    createComponentMeta({ type: "PageHeader", name: "页头", icon: "" }),
                    createComponentMeta({ type: "Pagination", name: "分页", icon: "" }),
                ],
            },
            {
                title: "表单",
                items: [
                    createComponentMeta({ type: "Form", name: "表单", icon: "" }),
                    createComponentMeta({ type: "Input", name: "文本输入", icon: "" }),
                    createComponentMeta({ type: "Textarea", name: "多行文本", icon: "" }),
                    createComponentMeta({ type: "InputNumber", name: "数字输入", icon: "" }),
                    createComponentMeta({ type: "Checkbox", name: "多选", icon: "" }),
                    createComponentMeta({ type: "CheckboxGroup", name: "多选组", icon: "" }),
                    createComponentMeta({ type: "Radio", name: "单选", icon: "" }),
                    createComponentMeta({ type: "RadioGroup", name: "单选组", icon: "" }),
                    createComponentMeta({ type: "Select", name: "选择器", icon: "" }),
                    createComponentMeta({ type: "Cascader", name: "级联选择", icon: "" }),
                    createComponentMeta({ type: "TreeSelect", name: "树选择", icon: "" }),
                    createComponentMeta({ type: "DatePicker", name: "日期选择", icon: "" }),
                    createComponentMeta({ type: "TimePicker", name: "时间选择", icon: "" }),
                    createComponentMeta({ type: "TimeSelect", name: "时间选择", icon: "" }),
                    createComponentMeta({ type: "Switch", name: "开关", icon: "" }),
                    createComponentMeta({ type: "Upload", name: "文件上传", icon: "" }),
                    createComponentMeta({ type: "Slider", name: "滑动输入", icon: "" }),
                    createComponentMeta({ type: "Rate", name: "评分", icon: "" }),
                    createComponentMeta({ type: "ColorPicker", name: "颜色选择", icon: "" }),
                    createComponentMeta({ type: "AutoComplete", name: "自动完成", icon: "" }),
                    createComponentMeta({ type: "Transfer", name: "穿梭框", icon: "" }),
                    createComponentMeta({ type: "IpAddress", name: "IP输入", icon: "" }),
                    createComponentMeta({ type: "Mentions", name: "提及", icon: "" }),
                    createComponentMeta({ type: "Search", name: "搜索", icon: "" }),
                    createComponentMeta({ type: "Captcha", name: "滑动验证", icon: "" }),
                ],
            },
            {
                title: "数据",
                items: [
                    createComponentMeta({ type: "List", name: "列表", icon: "" }),
                    createComponentMeta({ type: "Table", name: "表格", icon: "" }),
                    createComponentMeta({ type: "Tree", name: "树形组件", icon: "" }),
                    createComponentMeta({ type: "Descriptions", name: "描述列表", icon: "" }),
                    createComponentMeta({ type: "Empty", name: "空状态", icon: "" }),
                    createComponentMeta({ type: "Image", name: "图片预览", icon: "" }),
                    createComponentMeta({ type: "Carousel", name: "轮播", icon: "" }),
                    createComponentMeta({ type: "Avatar", name: "头像", icon: "" }),
                    createComponentMeta({ type: "Badge", name: "徽标", icon: "" }),
                    createComponentMeta({ type: "Calendar", name: "日历", icon: "" }),
                    createComponentMeta({ type: "Timeline", name: "时间线", icon: "" }),
                    createComponentMeta({ type: "Tag", name: "标签", icon: "" }),
                    createComponentMeta({ type: "TagGroup", name: "标签组", icon: "" }),
                    createComponentMeta({ type: "Progress", name: "进度条", icon: "" }),
                    createComponentMeta({ type: "Ellipsis", name: "省略", icon: "" }),
                    createComponentMeta({ type: "TimeAgo", name: "相对时间", icon: "" }),
                    createComponentMeta({ type: "Statistic", name: "统计数值", icon: "" }),
                    createComponentMeta({ type: "QRCode", name: "二维码", icon: "" }),
                    createComponentMeta({ type: "Countdown", name: "倒计时", icon: "" }),
                    createComponentMeta({ type: "Highlight", name: "文字高亮", icon: "" }),
                ],
            },
            {
                title: "反馈",
                items: [
                    createComponentMeta({ type: "Alert", name: "警告提示", icon: "" }),
                    createComponentMeta({ type: "Message", name: "全局提示", icon: "" }),
                    createComponentMeta({ type: "Notification", name: "通知提醒", icon: "" }),
                    createComponentMeta({ type: "Toast", name: "吐司提示", icon: "" }),
                    createComponentMeta({ type: "Tooltip", name: "文字提示", icon: "" }),
                    createComponentMeta({ type: "Popover", name: "气泡卡片", icon: "" }),
                    createComponentMeta({ type: "Popconfirm", name: "气泡确认", icon: "" }),
                    createComponentMeta({ type: "Spin", name: "加载中", icon: "" }),
                    createComponentMeta({ type: "Skeleton", name: "骨架屏", icon: "" }),
                    createComponentMeta({ type: "NProgress", name: "顶部加载条", icon: "" }),
                    createComponentMeta({ type: "Tour", name: "漫游式引导", icon: "" }),
                    createComponentMeta({ type: "Result", name: "结果", icon: "" }),
                    createComponentMeta({ type: "ScrollText", name: "文字滚动", icon: "" }),
                ],
            },
            {
                title: "图表",
                items: [],
            },
            {
                title: "其它",
                items: [

                    createComponentMeta({ type: "Contextmenu", name: "右键菜单", icon: "" }),
                    createComponentMeta({ type: "Video", name: "视频", icon: "" }),
                    createComponentMeta({ type: "Watermark", name: "水印", icon: "" }),
                    createComponentMeta({ type: "FullScreen", name: "全屏", icon: "" }),
                    createComponentMeta({ type: "Affix", name: "固钉", icon: "" }),
                    createComponentMeta({ type: "Segmented", name: "分段控制器", icon: "" }),
                    createComponentMeta({ type: "GradientText", name: "渐变文字", icon: "" }),
                    createComponentMeta({ type: "Code", name: "代码显示", icon: "" }),
                ],
            },
        ],
    },
];

const componentMeta = createComponentMeta({ name: "按钮", icon: "" });

export {
    componentMetaTabs,
    componentMeta,
}
