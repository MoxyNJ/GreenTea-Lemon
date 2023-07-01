import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import type { RequestConfig } from "./type";

/**
 * 两个难点:
 *  1.拦截器进行精细控制
 *    > 全局拦截器
 *    > 实例拦截器
 *    > 单次请求拦截器
 *
 *  2.响应结果的类型处理(泛型)
 */

class Request {
    instance: AxiosInstance;

    constructor(config: RequestConfig) {
        /** [1]实例化axios */
        // ceate 创建 axios 实例
        this.instance = axios.create(config);

        /** [2] 封装网络请求: interceptors, request, get, post */
        // 拦截器作用: 蒙版Loading/添加token/修改配置
        this.instance.interceptors.request.use(
            (config) => {
                // 常用：loading、token
                // 全局请求成功的拦截，对 config 做一些修改，再返回
                return config;
            },
            (err) => {
                // 全局请求失败的拦截
                return err;
            }
        );
        this.instance.interceptors.response.use(
            (res) => {
                // 全局响应成功的拦截
                return res.data;
            },
            (err) => {
                // 全局响应失败的拦截
                return err;
            }
        );

        // 如果有 config 中有特定拦截器，添加上
        this.instance.interceptors.request.use(config.interceptors?.requestSuccessFn as any, config.interceptors?.requestFailureFn);
        this.instance.interceptors.response.use(config.interceptors?.responseSuccessFn, config.interceptors?.responseFailureFn);
    }

    // 封装网络请求的方法
    // T => IHomeData
    request<T = any>(config: RequestConfig<T>) {
        // 特定请求的成功拦截的手动调用
        if (config.interceptors?.requestSuccessFn) {
            config = config.interceptors.requestSuccessFn(config);
        }

        // 手动定义返回 Promise，目的是为了调用自定义的拦截器
        return new Promise<T>((resolve, reject) => {
            this.instance
                .request<any, T>(config)
                .then((res) => {
                    // 特定响应的成功拦截的手动调用
                    if (config.interceptors?.responseSuccessFn) {
                        res = config.interceptors.responseSuccessFn(res);
                        // ...调整 res
                    }
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    get<T = any>(config: RequestConfig<T>) {
        return this.request({ ...config, method: "GET" });
    }
    post<T = any>(config: RequestConfig<T>) {
        return this.request({ ...config, method: "POST" });
    }
    delete<T = any>(config: RequestConfig<T>) {
        return this.request({ ...config, method: "DELETE" });
    }
    patch<T = any>(config: RequestConfig<T>) {
        return this.request({ ...config, method: "PATCH" });
    }
}

export default Request;
