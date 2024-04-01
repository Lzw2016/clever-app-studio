type Method =
    'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK';

type RequestHeaders = Record<string, string | number | boolean>;

interface RequestTransformer {
    (data: any, headers?: RequestHeaders): any;
}

type ResponseHeaders = Record<string, string> & {
    "set-cookie"?: string[]
};

interface ResponseTransformer {
    (data: any, headers?: ResponseHeaders): any;
}

/** 服务端响应(参考: AxiosResponse) */
interface Response<T = any> {
    /** 服务器返回body数据 */
    data: T;
    /** http状态码 */
    status: number;
    /** http状态码说明 */
    statusText: string;
    /** 响应头 */
    headers: ResponseHeaders;
    /** 请求配置 */
    config: RequestConfig;
    /** 请求对象 */
    request?: any;

    [key: string]: any;
}

/** 请求配置(参考: AxiosRequestConfig) */
interface RequestConfig<T = any> {
    /** `url` 是用于请求的服务器 URL */
    url: string;
    /** `method` 是创建请求时使用的方法 */
    method?: Method | string;
    /** `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL */
    baseURL?: string;
    /** `transformRequest` 允许在向服务器发送前，修改请求数据 */
    transformRequest?: RequestTransformer;
    /** `transformResponse` 在传递给 then/catch 前，允许修改响应数据 */
    transformResponse?: ResponseTransformer;
    /** `headers` 是即将被发送的自定义请求头 */
    headers?: RequestHeaders;
    /** `params` 是即将与请求一起发送的 URL 参数 */
    params?: any;
    /** `data` 是作为请求主体被发送的数据 */
    data?: any;
    /** `timeout` 指定请求超时的毫秒数(0 表示无超时时间) */
    timeout?: number;
    /** `responseType` 表示服务器响应的数据类型('json'、'text'、....) */
    responseType?: any;
    /** `responseEncoding` 指示用于解码响应的编码 */
    responseEncoding?: string;
    /** `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise */
    validateStatus?: ((status: number) => boolean);
    /** 请求之前的处理 */
    beforeRequest?: (config: RequestConfig<T>) => RequestConfig<T>;
    /** 请求响应后的处理 */
    afterResponse?: (res: Response) => T;

    [key: string]: any;
}

/** 排序项 */
interface OrderItem {
    /** 排序列 */
    column: string;
    /** 排序类型, true:ASC; false:DESC */
    asc: boolean;
}

/** 服务端表格数据 */
interface PageData<T = any> {
    /** 当前页数据 */
    records: T[];
    /** 数据总量 */
    total: number;
    /** 当前页 */
    current: number;
    /** 页大小 */
    size?: number;
    /** 当前分页总页数 */
    pages?: number;
    /** 排序规则 */
    orders?: OrderItem[];
    /** 是否进行count查询 */
    searchCount?: boolean;
    /** 是否命中count查询缓存 */
    hitCount?: boolean;
}

// /** 服务端通用数据 */
// interface GeneralData {
//     [key: string]: any;
// }
// /** 获取服务端数据配置 */
// interface ServerDataConfig<T = any> {
//     /** 请求接口地址 */
//     url: string;
//     /** HTTP request 配置 */
//     options?: RequestOptions;
//     /** 是否默认加载数据 */
//     initLoadData?: boolean;
//     /** 请求之前的拦截 */
//     interceptor?: (url: string, options: RequestOptions) => false | { url: string; options?: RequestOptions } | void;
//     /** 请求开始前回调 */
//     onStart?: () => void;
//     /** 请求完成后回调 */
//     onCompleted?: () => void;
//     /** 请求发生错误回调 */
//     onError?: (resData: any, error: ResError) => void;
//     /** 请求成功回调 */
//     onSuccess?: (data: T, response: RequestResponse) => void;
//     /** 响应json data中取Data数据 */
//     getData?: (resData: any, response: RequestResponse) => T;
//     /** 根据JsonPath从响应json data中取Data数据 */
//     dataJsonPath?: string;
// }
