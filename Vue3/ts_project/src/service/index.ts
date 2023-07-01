import { TIME_OUT } from "./config";
import Request from "./request";

const request = new Request({
    baseURL: "BASE_URL",
    timeout: TIME_OUT,
    interceptors: {
        requestSuccessFn: (config) => {
            // 请求成功拦截
            // 每一个请求都自动携带token
            // const token = localCache.getCache(LOGIN_TOKEN);

            return config;
        },
        requestFailureFn: (err) => {
            // 请求失败拦截
            return err;
        },
        responseSuccessFn: (res) => {
            // 响应成功拦截
            return res;
        },
        responseFailureFn: (err) => {
            // 响应失败拦截
            return err;
        },
    },
});

export const request2 = new Request({
    baseURL: "https://musicapi.ninjee.top",
    timeout: TIME_OUT,

    // 设置特定拦截器：请求成功、请求失败、响应成功、响应失败
    interceptors: {
        requestSuccessFn: (config) => {
            console.log("结果", config);
            return config;
        },
        requestFailureFn: (err) => {
            return err;
        },
        responseSuccessFn: (res) => {
            return res;
        },
        responseFailureFn(err) {
            return err;
        },
    },
});

export default request;
