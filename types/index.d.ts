/** 运行时应用信息 */
interface AppInfo {
    /** 是否是build状态 */
    isBuild: boolean;
    /** vite -m 参数 */
    mode: string;
    /** 应用环境配置 */
    envConfig: EnvConfig;
    /** 应用名称 */
    name: string;
    /** 应用版本 */
    version: string;
    /** 发版时间 */
    buildTime: string;

    [key: string]: any;
}

/** 当前登录用户信息 */
interface User {
    /** 用户ID */
    readonly uid: string;
    /** 登录名 */
    readonly loginName: string;
    /** 昵称 */
    readonly nickname: string;
}

/** 全局window对象扩展 */
interface Window {
    [key: string]: any;
}

declare const APP_INFO: AppInfo;
declare const __APP_INFO__: never;
