// /**
//  * 页面类型: <br/>
//  * <pre>
//  * extjs    -> extjs模式实现的页面
//  * iframe   -> 浏览器内嵌的iframe页面
//  * browser  -> 浏览器 window 窗口页面
//  * react    -> react模式实现的页面
//  * </pre>
//  */
// type PageType = "extjs" | "iframe" | "browser"; // | "react"
//
// /** 权限授权配置 */
// type AuthorityConfig = string | string[] | ((userPermission: UserPermission) => boolean);
//
// interface Menu {
//     /** 菜单ID(唯一) */
//     readonly id: string;
//     /** 菜单名称 */
//     readonly name: string;
//     /** 页面组件类型 */
//     readonly pageType?: PageType;
//     /** 页面路径(根路径为“/src/pages”) */
//     readonly pagePath?: string;
//     /** 打开新页面地址的行为选项(参考:https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open) */
//     openOptions?: {
//         /** 打开新页面地址 */
//         url: string;
//         /** 指定target属性或窗口的名称 */
//         target?: "_self" | "_blank" | "_parent" | "_top" | string,
//         /** 一个逗号分隔的项目列表 */
//         features?: string,
//     },
//     /** 菜单图标图标 */
//     icon?: string;
//     /** Html页面Title(不配置就默认取“name”) */
//     pageTitle?: string;
//     /** 默认展开子菜单 */
//     defaultOpen?: boolean;
//     /** 隐藏当前菜单和子菜单 */
//     hideMenu?: boolean;
//     /** 隐藏子菜单 */
//     hideChildrenMenu?: boolean;
//     /** 菜单权限控制(权限字符串或自定义函数) */
//     authority?: AuthorityConfig;
//     /** 子菜单配置 */
//     children?: Menu[];
//     /** 源代码文件 */
//     srcFiles?: {
//         [fileName: string]: string;
//     };
//     // /** 扩展属性 */
//     // [key: string]: any;
// }
//
// interface OpenPageHandlerParams {
//     /** 菜单信息 */
//     menu: Menu;
//     /** 创建的ExtPage对象 */
//     extPage?: any;
// }
//
// interface OpenPageHandler {
//     /** 页面打开之前 */
//     before?: (param: OpenPageHandlerParams) => void;
//     /** 页面打开之后 */
//     after?: (param: OpenPageHandlerParams) => void;
// }
//
// /** 页面布局配置基础属性 */
// interface BaseLayoutConfig {
//     /** 当前布局的路径前缀 */
//     readonly pathPrefix: string;
//     /** 默认打开的菜单id */
//     readonly defOpenMenuId?: string;
//     /** 组件挂载位置 */
//     renderTo?: HTMLElement | Ext.dom.Element;
//     /** Layout主页面 */
//     mainCmpHandler?: CreateHandler<Ext.container.Viewport>;
//     /** 自定义页面顶部区域 */
//     topCmpHandler?: CreateHandler;
//     /** 自定义页面底部区域 */
//     bottomCmpHandler?: CreateHandler;
//     /** 从服务端读取菜单数据(高优先级) */
//     menusApi?: RequestConfig<Menu[]>,
//     /** 系统菜单(低优先级) */
//     menus?: Menu[];
//     /** 页面打开前后处理逻辑 */
//     openPageHandler?: OpenPageHandler;
//     // /** 401未登录跳转地址 */
//     // 401?: string,
//     // /** 403无权访问显示的页面组件(组件路径) */
//     // 403?: string,
//     // /** 404页面不存在显示的页面组件(组件路径) */
//     // 404?: string,
//     // /** 500错误显示的页面组件(组件路径) */
//     // 500?: string,
//     /** 扩展属性 */
//     [key: string]: any;
// }
//
// interface BlankLayoutConfig extends BaseLayoutConfig {
// }
//
// interface TreeMenuLayoutConfig extends BaseLayoutConfig {
//     /** 菜单选中状态否是跟随页面变化 */
//     followMenu?: boolean;
//     /** 自定义页面菜单区域 */
//     treeMenuHandler?: CreateHandler<Ext.tree.Panel>;
//     /** 自定义页面多页签区域 */
//     multiPagesHandler?: CreateHandler<Ext.custom.MultiPages>;
// }
//
// interface NestTopMenuLayoutConfig extends TreeMenuLayoutConfig {
//     /** 自定义页面顶部左侧区域 */
//     topLeftCmpHandler?: CreateHandler;
//     /** 自定义页面顶部一级菜单区域 */
//     topFirstMenuCmpHandler?: CreateHandler;
//     /** 自定义页面顶部右侧区域 */
//     topRightCmpHandler?: CreateHandler;
// }
//
// interface NestSideMenuLayoutConfig extends TreeMenuLayoutConfig {
//     /** 自定义页面左侧区域 */
//     leftCmpHandler?: CreateHandler;
//     /** 自定义页面左侧顶部区域 */
//     leftTopCmpHandler?: CreateHandler;
//     /** 自定义页面左侧一级菜单(内嵌)区域 */
//     leftFirstMenuCmpHandler?: CreateHandler;
//     /** 自定义页面左侧底部区域 */
//     leftBottomCmpHandler?: CreateHandler;
// }
