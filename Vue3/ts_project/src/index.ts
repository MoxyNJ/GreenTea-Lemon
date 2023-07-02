// webpack 依赖图
// 添加依赖图后，该文件的代码 webpack 会自动执行
import "./service/module/test";

// 函数的重载, 要求两个入参必须相同，如果均是number，返回number；如果是string，返回string
function sum<T extends number | string>(num1: T, num2: T): T extends number ? number : string;
function sum(num1: any, num2: any) {
    return num1 + num2;
}

const res = sum(20, 30); // 成功
const res2 = sum("ninjee", "moxy"); // 成功
const res3 = sum("ninjee", 123); // 类型不一致，失败

export {};
