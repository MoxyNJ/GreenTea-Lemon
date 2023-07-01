import { request2 } from "..";

// 测试特定拦截器效果
request2.request({
    url: "/playlist/detail",
    params: {
        id: 19723756,
    },
    interceptors: {
        requestSuccessFn: (config) => {
            console.log("/playlist/detail 请求成功拦截");
            console.log(config);
            return config;
        },
        responseSuccessFn: (res) => {
            console.log("/playlist/detail 响应成功的拦截");
            console.log(res);
            return res;
        },
    },
});
