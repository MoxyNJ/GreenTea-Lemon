/*
 * @Descripttion:
 * @Author: Nin
 * @LastEditTime: 2022-02-19 18:23:49
 */
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                useBuiltIns: "entry",
                corejs: "3.9.1",
                targets: {
                    chrome: "58",
                    ie: "11",
                },
            },
        ],
        [
            "@babel/preset-react",
            {
                development: process.env.NODE_ENV === "development",
            },
        ],
    ],
    plugins: [
        ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
        ["@babel/plugin-proposal-private-methods", { "loose": true }],
        "@babel/plugin-syntax-dynamic-import",
    ],
};