import type { AxiosRequestConfig, AxiosResponse } from "axios";

/** 针对AxiosRequestConfig配置进行扩展 */
export interface Interceptors<T = AxiosResponse> {
    // 拦截回调函数：请求成功 / 请求失败 / 响应成功  相应失败
    requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestFailureFn?: (err: any) => any;
    responseSuccessFn?: (res: T) => T;
    responseFailureFn?: (err: any) => any;
}

/** 实例化Request的config类型 */
// 对axios原有的 AxiosRequestConfig 做扩展，添加 interceptors 可选类型
export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: Interceptors<T>;
}
