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

/** 用户权限 */
interface UserPermission {
    /** 角色列表 */
    readonly roles: string[];
    /** 权限列表 */
    readonly permissions: string[];
    /** 是否拥有指定的所有角色 */
    hasRoles: (...roles: string[]) => boolean;
    /** 是否拥有指定的所有权限 */
    hasPermissions: (...permissions: string[]) => boolean;
    /** 是否拥有指定任意一个角色 */
    hasAnyRoles: (...roles: string[]) => boolean;
    /** 是否拥有指定任意一个权限 */
    hasAnyPermissions: (...permissions: string[]) => boolean;
}

/** 全局配置 */
interface GlobalConfig {
    /** 系统授权对象 */
    security: UserPermission,
    /** 当前登录的用户信息 */
    user: User,
    /** http状态码错误信息映射 */
    httpErrorMsg: {
        [httpCode: number]: string;
    },
    /** axios请求默认配置, 返回类型: AxiosRequestConfig */
    axiosRequestDef: () => ({
        url?: string;
        method?: Method | string;
        baseURL?: string;
        params?: any;
        headers?: {
            [name: string]: any;
        };
        data?: any;
        timeout?: number;
        timeoutErrorMessage?: string;
        withCredentials?: boolean;
        responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | string;
        responseEncoding?: 'utf-8' | string;
        xsrfCookieName?: string;
        xsrfHeaderName?: string;
        auth?: {
            username: string;
            password: string;
        };
        proxy?: {
            host: string;
            port: number;
            auth?: {
                username: string;
                password: string;
            };
            protocol?: string;
        } | false;
        env?: {
            FormData?: new (...args: any[]) => object;
        };
        httpAgent?: any;
        httpsAgent?: any;
        transformRequest?: Function | Function[];
        transformResponse?: Function | Function[];
        maxContentLength?: number;
        validateStatus?: ((status: number) => boolean) | null;
        maxBodyLength?: number;
        maxRedirects?: number;
        maxRate?: number | [number, number];
        beforeRedirect?: (options: Record<string, any>, responseDetails: { headers: Record<string, string> }) => void;
        socketPath?: string | null;
        decompress?: boolean;
        insecureHTTPParser?: boolean;
        [key: string]: any;
    });
    /** 自定义全局axios实例, 参数类型: AxiosInstance */
    customAxios: (axiosInstance: any) => any;
    /** 字典缓存数据(调用getAllDict、getDict时自动收集) */
    readonly dictCache: Map<string, DictArray>;
    /** 自定义读取所有的字典数据 */
    getAllDict: GetAllDict;
    /** 自定义读取字典数据 */
    getDict: GetDict;
    /** 获取服务端时间 */
    serverDate: (date?: Date) => Date;
    /** 定义需要使用的外部库 */
    useExternalLib: {
        /** 使用 Ace Editor 编辑器 */
        aceEditor?: boolean;
        /** 使用 Monaco Editor 编辑器 */
        monacoEditor?: boolean;
    };
}

// --------------------------------------------------------------------------------------------
// 全局对象
// --------------------------------------------------------------------------------------------

/** 全局window对象扩展 */
interface Window {
    /** 当前应用信息 */
    readonly APP_INFO: Readonly<AppInfo>;
    /** Layout打开的当前ExtPage指针 */
    cp: any;
    /** 当前打开的ExtDialog指针 */
    cw: any;
    /** 全局配置 */
    globalConfig: GlobalConfig;

    [key: string]: any;
}

/** 通过vite注入的应用信息 */
declare const __APP_INFO__: never;
/** 当前应用信息 */
declare const APP_INFO: Readonly<AppInfo>;
/** Layout打开的当前Page指针 */
declare const cp: any;
/** 当前打开的Dialog指针 */
declare const cw: any;
/** 全局配置 */
declare const globalConfig: GlobalConfig;
