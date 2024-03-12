// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// import lodash from "lodash";
// import Utils from "./Utils";
// import GlobalConfig from "../GlobalConfig";
//
// interface InnerRequestConfig<T = any> extends AxiosRequestConfig {
//     /** 请求之前的处理 */
//     beforeRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
//     /** 请求响应后的处理 */
//     afterResponse?: (response: AxiosResponse | Response) => T;
// }
//
// class Request {
//     /** axios实例 */
//     private axiosInstance: AxiosInstance;
//
//     constructor(axiosInstance: AxiosInstance) {
//         this.axiosInstance = axiosInstance;
//     }
//
//     /** 自定义请求配置逻辑 */
//     protected initConfig(config: InnerRequestConfig = {}): AxiosRequestConfig {
//         const { beforeRequest, afterResponse, ...other } = config;
//         let newConfig = lodash.defaultsDeep(other, GlobalConfig.axiosRequestDef());
//         if (!newConfig.transformRequest) newConfig.transformRequest = [];
//         newConfig.transformRequest = [
//             data => data = Utils.deepFormatDate(data),
//             ...(axios.defaults.transformRequest as []),
//             ...(newConfig.transformRequest as []),
//         ];
//         if (newConfig.transformResponse?.length > 0) {
//             newConfig.transformResponse = [
//                 ...(axios.defaults.transformResponse as []),
//                 ...(newConfig.transformResponse as []),
//             ];
//         }
//         if (beforeRequest) {
//             newConfig = beforeRequest(newConfig);
//         }
//         if (afterResponse) {
//             newConfig.afterResponse = afterResponse;
//         }
//         return newConfig;
//     }
//
//     /** 自定义响应 */
//     protected getResponse<T = any>(config: InnerRequestConfig<T> = {}, request: Promise<AxiosResponse>): Promise<T> {
//         if (config.afterResponse) {
//             return request.then(response => config.afterResponse(response));
//         }
//         return request.then(response => (response?.data ?? null));
//     }
//
//     public get<T = any>(url: string, config?: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.get(url, config);
//         return this.getResponse<T>(config, request);
//     }
//
//     public delete<T = any>(url: string, config?: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.delete(url, config);
//         return this.getResponse<T>(config, request);
//     }
//
//     public head<T = any>(url: string, config?: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.head(url, config);
//         return this.getResponse<T>(config, request);
//     }
//
//     public options<T = any>(url: string, config?: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.options(url, config);
//         return this.getResponse<T>(config, request);
//     }
//
//     public post<T = any>(url: string, data?: any, config?: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.post(url, data, config);
//         return this.getResponse<T>(config, request);
//     }
//
//     public put<T = any>(url: string, data?: any, config?: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.put(url, data, config);
//         return this.getResponse<T>(config, request);
//     }
//
//     public patch<T = any>(url: string, data?: any, config?: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.patch(url, data, config);
//         return this.getResponse<T>(config, request);
//     }
//
//     /**
//      * config 可以是 RequestConfig 类型
//      */
//     public request<T = any>(config: InnerRequestConfig<T>): Promise<T> {
//         config = this.initConfig(config);
//         const request = this.axiosInstance.request(config);
//         return this.getResponse<T>(config, request);
//     }
// }
//
// /** 创建一个axios实例对象 */
// function axiosCreate(config?: AxiosRequestConfig): AxiosInstance {
//     return axios.create({
//         validateStatus: () => true,
//         ...config,
//     });
// }
//
// const axiosInstance = axiosCreate(GlobalConfig.axiosRequestDef() as AxiosRequestConfig);
// GlobalConfig.customAxios(axiosInstance);
//
// const request = new Request(axiosInstance);
//
// export { axiosCreate, request };
