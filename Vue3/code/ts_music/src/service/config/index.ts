const TIME_OUT = 10000;
let BASE_URL: string;

if (process.env.NODE_ENV == 'development') {
  // 开发环境
  BASE_URL = 'http://codercba.com:9002';
} else {
  BASE_URL = 'http://codercba.com:9002';
}

export { BASE_URL, TIME_OUT };
