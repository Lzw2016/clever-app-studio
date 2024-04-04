import { defineDesignBlock } from "@/draggable/utils/DesignerUtils";

const formTest = defineDesignBlock({
    block: true,
    type: "div",
    props: {
        style: {},
    },
    data: {
        a: "192.168.0.1",
    },
    items: [
        {
            type: "div",
            props: {
                style: {
                    width: "280px",
                    height: "100%",
                    padding: "32px 0",
                },
            },
            items: [
                {
                    type: "Form",
                    props: {
                        inline: false,
                        labelPosition: "right",
                        messageType: "inline",
                        overflowTitle: true,
                        rules: [],
                        showMessage: true,
                        // size: "mini",
                        validateType: "text",
                        labelWidth: "80px",
                    },
                    defaults: {
                        defaults: {
                            props: {
                                style: {
                                    width: "100%",
                                },
                                placeholder: "请输入",
                            },
                        },
                    },
                    items: [
                        {
                            type: "FormItem",
                            props: {
                                label: "文本输入",
                            },
                            items: [
                                {
                                    type: "Input",
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "文本输入",
                            },
                            items: [
                                {
                                    type: "Input",
                                    props: {
                                        type: "textarea",
                                        autosize: {
                                            minRows: 3,
                                            maxRows: 6,
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "文本",
                            },
                            items: [
                                {
                                    type: "Input",
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "数字输入",
                            },
                            items: [
                                {
                                    type: "InputNumber",
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "选择框",
                            },
                            items: [
                                {
                                    type: "Select",
                                    props: {
                                        options: [
                                            { value: '选项1', label: '黄金糕' },
                                            { value: '选项2', label: '双皮奶' },
                                            { value: '选项3', label: '蚵仔煎' },
                                            { value: '选项4', label: '龙须面' },
                                            { value: '选项5', label: '北京烤鸭' },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "开关选择",
                            },
                            items: [
                                {
                                    type: "Switch",
                                    props: {
                                        style: {
                                            width: "48px",
                                        },
                                        showText: true,
                                    },
                                    directives: {
                                        model: "a",
                                    },
                                    slots: {
                                        open: "是",
                                        close: "否",
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "单选组",
                            },
                            items: [
                                {
                                    type: "RadioGroup",
                                    props: {
                                        options: [
                                            { label: 'A', text: '很好' },
                                            { label: 'B', text: '一般' },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "多选组",
                            },
                            items: [
                                {
                                    type: "CheckboxGroup",
                                    props: {
                                        options: [
                                            { label: 'A', text: '很好' },
                                            { label: 'B', text: '一般' },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "选择日期",
                            },
                            items: [
                                {
                                    type: "DatePicker",
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "选择时间",
                            },
                            items: [
                                {
                                    type: "TimePicker",
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "自动完成",
                            },
                            items: [
                                {
                                    type: "AutoComplete",
                                    props: {
                                        fetchSuggestions: function (queryString, callback) {
                                            callback([
                                                { value: 'GFD科技YX公司', address: '福州' },
                                                { value: 'WWWW科技YX公司', address: '深圳福田区' },
                                                { value: 'RFV有限责任公司', address: '中山市' },
                                            ]);
                                        },
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "级联选择",
                            },
                            items: [
                                {
                                    type: "Cascader",
                                    props: {
                                        options: [
                                            {
                                                value: 'zhinan',
                                                label: '指南',
                                                children: [
                                                    {
                                                        value: 'anzhuang',
                                                        label: '安装',
                                                        children: [
                                                            {
                                                                value: 'xiangmudengji',
                                                                label: '项目登记'
                                                            },
                                                            {
                                                                value: 'huanjingzhunbei',
                                                                label: '环境准备'
                                                            },
                                                            {
                                                                value: 'anzhuangcli',
                                                                label: '安装 CLI'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        value: 'kaifa',
                                                        label: '开发',
                                                        children: [
                                                            {
                                                                value: 'yinruzujian',
                                                                label: '引入组件'
                                                            },
                                                            {
                                                                value: 'monishuju',
                                                                label: '模拟数据'
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "IP地址",
                            },
                            items: [
                                {
                                    type: "IpAddress",
                                    directives: {
                                        model: "a",
                                    },
                                },
                            ],
                        },
                        {
                            type: "FormItem",
                            props: {
                                label: "滑块",
                            },
                            items: [
                                {
                                    type: "Slider",
                                },
                            ],
                        },
                    ],
                },
                // {
                //     type: "Switch",
                //     props: {
                //         'show-text': true,
                //     },
                //     slots: {
                //         open: "是",
                //         close: "否",
                //     },
                // },
            ],
        }
    ],
});

export {
    formTest,
}
