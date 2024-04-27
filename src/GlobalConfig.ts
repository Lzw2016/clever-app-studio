import lodash from "lodash";
import qs from "qs";
import { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { markRaw } from "vue";
import { Notify } from "@opentiny/vue";
import Format from "@/utils/Format";
import { isFun } from "@/utils/Typeof";
import { DefComponentManage } from "@/draggable/DefComponentManage";
import { materialMetaTabs } from "@/draggable/register/MaterialMetaTabs";

if (!window.globalConfig) window.globalConfig = {} as any;

// 代理 globalConfig
const globalConfig = window.globalConfig;
const globalConfigProxy: GlobalConfig = new Proxy(globalConfig, {
    get(target: GlobalConfig, property: string | symbol, receiver: any) {
        const value = target[property];
        if (!isFun(value)) {
            // 如果不是函数，直接返回属性值
            return Reflect.get(target, property, receiver);
        }
        if ("getAllDict" === property) {
            return (...args: any[]) => {
                // 调用原始函数
                const result = Reflect.apply(value, target, args) as Promise<Map<string, DictArray>>;
                result.then(allDict => {
                    if (allDict) {
                        allDict.forEach((dict, key) => {
                            globalConfig.dictCache.set(key, dict);
                        });
                    }
                    return allDict;
                });
                return result;
            };
        } else if ("getDict" === property) {
            return (...args: any[]) => {
                const result = Reflect.apply(value, target, args) as Promise<DictArray>;
                result.then(dict => {
                    if (dict && args[0]) {
                        globalConfig.dictCache.set(args[0], dict);
                    }
                    return dict;
                });
                return result;
            };
        }
        return (...args: any[]) => Reflect.apply(value, target, args);
    },
});

// 组件管理器实例
if (!globalConfig.componentManage) {
    globalConfig.componentManage = markRaw(new DefComponentManage());
}

// 物料信息
if (!globalConfig.materialMetaTabs) {
    globalConfig.materialMetaTabs = materialMetaTabs;
}

// 系统授权对象
if (!globalConfig.security) {
    globalConfig.security = {
        roles: [],
        permissions: [],

        hasRoles(...roles: string[]): boolean {
            let flag = true;
            if (roles?.length > 0) {
                for (let i = 0; i < roles.length; i++) {
                    const role = roles[i];
                    flag = this.roles.indexOf(role) >= 0;
                    if (!flag) {
                        break;
                    }
                }
            }
            return flag;
        },

        hasPermissions(...permissions: string[]): boolean {
            let flag = true;
            if (permissions?.length > 0) {
                for (let i = 0; i < permissions.length; i++) {
                    const permission = permissions[i];
                    flag = this.permissions.indexOf(permission) >= 0;
                    if (!flag) {
                        break;
                    }
                }
            }
            return flag;
        },

        hasAnyRoles(...roles: string[]): boolean {
            let flag = false;
            if (roles?.length > 0) {
                for (let i = 0; i < roles.length; i++) {
                    const role = roles[i];
                    flag = this.roles.indexOf(role) >= 0;
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },

        hasAnyPermissions(...permissions: string[]): boolean {
            let flag = false;
            if (permissions?.length > 0) {
                for (let i = 0; i < permissions.length; i++) {
                    const permission = permissions[i];
                    flag = this.permissions.indexOf(permission) >= 0;
                    if (flag) {
                        return true;
                    }
                }
            }
            return false;
        },
    };
}

// 当前用户信息
if (!globalConfig.user) {
    globalConfig.user = {
        uid: "Admin",
        loginName: "Admin",
        nickname: "管理员",
    };
}

// http状态码错误信息映射
const httpErrorMsg = globalConfig.httpErrorMsg ?? {};
globalConfig.httpErrorMsg = lodash.defaults(httpErrorMsg, {
    200: "服务器成功返回请求的数据",
    201: "新建或修改数据成功",
    202: "一个请求已经进入后台排队（异步任务）",
    204: "删除数据成功",
    400: "发出的请求有错误，服务器没有进行新建或修改数据的操作",
    401: "用户没有权限（令牌、用户名、密码错误）",
    403: "用户得到授权，但是访问是被禁止的",
    404: "发出的请求针对的是不存在的记录，服务器没有进行操作",
    406: "请求的格式不可得",
    410: "请求的资源被永久删除，且不会再得到的",
    422: "当创建一个对象时，发生一个验证错误",
    500: "服务器发生错误，请检查服务器",
    502: "网关错误",
    503: "服务不可用，服务器暂时过载或维护",
    504: "网关超时",
});

// axios请求默认配置
const axiosRequestDef = globalConfig.axiosRequestDef;
globalConfig.axiosRequestDef = () => {
    let config = {};
    if (axiosRequestDef) {
        config = axiosRequestDef();
    }
    return lodash.defaults(config, {
        baseURL: '',
        method: 'post',
        headers: {},
        params: {},
        timeout: 60_000,
        withCredentials: true,
        responseType: 'json',
        responseEncoding: 'utf8',
        paramsSerializer: params => qs.stringify(params, {
            arrayFormat: 'repeat',
            serializeDate: date => Format.dateFormat(date),
        }),
        validateStatus: status => (status >= 200 && status < 400),
    } as AxiosRequestConfig);
};

// 自定义全局axios实例
const customAxios = globalConfig.customAxios;
globalConfig.customAxios = axiosInstance => {
    const notifyDef = {
        type: 'error',
        position: 'top-right',
        duration: 4500,
        title: "系统错误",
    };
    // 全局请求拦截
    axiosInstance.interceptors.request.use(
        (request: InternalAxiosRequestConfig) => request,
        (error: any) => {
            Notify({ ...notifyDef, message: "发送请求给服务端失败，请检查电脑网络，再重试" });
            return Promise.reject(error);
        },
    );
    // 全局拦截配置
    axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: any) => {
            const { response } = error;
            if (!error || !response) {
                Notify({ ...notifyDef, message: "请求服务端异常" });
                return Promise.reject(error);
            }
            if (response?.status === 401) {
                // 跳转到登录页面
                Notify({ ...notifyDef, title: "当前用户未登录", message: "当前用户未登录，请先登录系统" });
                return Promise.reject(error);
            }
            const { data: { message, validMessageList } } = response;
            if (validMessageList) {
                Notify({ ...notifyDef, title: "操作失败", message: "请求参数校验失败" });
                return Promise.reject(error.response);
            } else if (message) {
                const errorText = message ?? globalConfig.httpErrorMsg[response.status] ?? "服务器异常";
                Notify({ ...notifyDef, title: "操作失败", message: errorText });
            }
            return Promise.reject(error);
        }
    );
    if (customAxios) {
        axiosInstance = customAxios(axiosInstance);
    }
    return axiosInstance;
};

// 字段缓存
if (!globalConfig.dictCache) {
    (globalConfig as MakeWritable<GlobalConfig>).dictCache = new Map<string, DictArray>();
}

// 自定义读取所有的字典数据
if (!globalConfig.getAllDict) {
    globalConfig.getAllDict = async () => new Map<string, DictArray>();
}

// 自定义读取字典数据
if (!globalConfig.getDict) {
    globalConfig.getDict = async dictName => {
        // if (dict === "AAA") {
        //     return [
        //         { id: '1', text: '测试1' },
        //         { id: '2', text: '测试2' },
        //     ];
        // }
        console.warn(`未定义字典: ${dictName}`);
        return [];
    }
}

// 获取服务端时间
if (!globalConfig.serverDate) {
    globalConfig.serverDate = (date = new Date()) => date;
}

// 定义可选外部库
const optionalExternalLib = globalConfig.useExternalLib ?? {};
globalConfig.useExternalLib = lodash.defaults(optionalExternalLib, {
    fontawesome: true,
    googleIcon: true,
    tablerIcon: true,
    monacoEditor: {
        vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.48.0/min/vs',
    },
} as GlobalConfig['useExternalLib']);

window.globalConfig = globalConfigProxy;

export default globalConfigProxy;
