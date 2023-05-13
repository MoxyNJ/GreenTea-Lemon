import { BASE_URL, TIME_OUT } from './config';
import HYRequest from './request';

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      // 可定义拦截器做鉴权
      return config;
    }
  }
});

export default hyRequest;
