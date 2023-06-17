# Vue3 + TypeScript 后台管理项目

![image-20230617163912370](images/vue3+ts.assets/image-20230617163912370.png)



## Step 1 创建 vue 项目

- 文档：cn.vuejs.org

（1）创建 vue 项目

1. 使用 webpack
   - 安装脚手架：`npm install @vue/cli -g `；
   - 创建项目：`vue create xxx`，可自定义配置。
2. 使用 vite
   - 创建项目：`npm init vue@latest`  最新版 / `npm init vue`；
     - 该操作会自动安装本地工具：`create-vue`；
   - 该项目没有安装依赖，进入项目后 `npm install`；



本项目使用 vite，配置选项：

- ✅：typescript, Vue Router, Pinia, ESLint, Prettier
- ❌：JSX, unit testing, end-to-end test, 



（2）配置 tsconfig 相关

```sh
# 总的配置文件，导入app和node，通常不做调整
tsconfig.json

# 本项目环境配置
tsconfig.app.json

# node环境配置（vite环境、服务器端ssr）
tsconfig.node.json
```



## Step 2 项目搭建规范

- 项目最终打包为：default_project



### 2.1 集成editorconfig配置

说明：EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的编码风格。

流程：

1. 安装插件：`editor config for VS code`。
2. 创建文件：`.editorconfig `，并放入下列内容。

```yaml
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```



![image-20210722215138665](images/vue3+ts.assets/008i3skNgy1gsq2gh989yj30pj05ggmb.jpg)



### 2.2 使用prettier工具

说明：Prettier 是代码格式化工具，支持主流前端等语言（js、ts、css、less、vue、react、md...）。

流程：

1. 安装 prettier (vue创建时已安装)

```shell
npm install prettier -D
```

2. 配置 `.prettierrc.json` 文件

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

- 说明：

  - useTabs：使用tab缩进还是空格缩进，选择 false 空格锁进；

  * tabWidth：tab是空格的情况下，是几个空格，选择2个；

  * printWidth：当行字符的长度，推荐80，100，120；

  * singleQuote：使用单引号还是双引号，true 为单引号；

  * trailingComma：在多行输入的尾逗号是否添加，设置为 `none`，比如对象的最后一个属性否加`,`；

  * semi：语句末尾是否要加分号，默认 true 添加；



3. 创建 `.prettierignore` 忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```



4. 安装 `prettier` 插件

VSCode 中配置：

- settings =>format on save => 勾选上

- settings => editor default format => 选择 prettier

![image-20230617181505559](images/vue3+ts.assets/image-20230617181505559.png)



### 2.3 使用ESLint检测

流程：

1. 项目创建时自动导入并配置 ESLint

2. VSCode 安装 ESLint 插件：

3. 解决 eslint 和 prettier 冲突的问题：

   1. 安装插件：

      ```shell
      npm install eslint-plugin-prettier -D
      ```

   2. `.eslintrc.cjs` 添加 prettier 插件：

      ```json
        extends: [
          "plugin:vue/vue3-essential",
          "eslint:recommended",
          "@vue/typescript/recommended",
          "@vue/prettier",
          "@vue/prettier/@typescript-eslint",
          'plugin:prettier/recommended' // 添加这个
        ],
      ```

4. 关闭部分 ESLint 检测：

   在 .eslintrc.cjs 中添加 rules 字段，可配置 ESLint 的其他规则。比如下面例子中，将“已声明但未使用的变量”警告提示关闭。

   ```js
     rules: {
       '@typescript-eslint/no-unused-vars': 'off'
     }
   ```

   

### 2.4 git Husky和eslint（后续）

虽然我们已经要求项目使用eslint了，但是不能保证组员提交代码之前都将eslint中的问题解决掉了：

* 也就是我们希望保证代码仓库中的代码都是符合eslint规范的；

* 那么我们需要在组员执行 `git commit ` 命令的时候对其进行校验，如果不符合eslint规范，那么自动通过规范进行修复；

那么如何做到这一点呢？可以通过Husky工具：

* husky是一个git hook工具，可以帮助我们触发git提交的各个阶段：pre-commit、commit-msg、pre-push

如何使用husky呢？

这里我们可以使用自动配置命令：

```shell
npx husky-init && npm install
```

这里会做三件事：

1.安装husky相关的依赖：

![image-20210723112648927](images/vue3+ts.assets/008i3skNgy1gsqq0o5jxmj30bb04qwen.jpg)

2.在项目目录下创建 `.husky` 文件夹：

![image-20210723112719634](images/vue3+ts.assets/008i3skNgy1gsqq16zo75j307703mt8m.jpg)

3.在package.json中添加一个脚本：

![image-20210723112817691](images/vue3+ts.assets/008i3skNgy1gsqq26phpxj30dj06fgm3.jpg)

接下来，我们需要去完成一个操作：在进行commit时，执行lint脚本：

![image-20210723112932943](images/vue3+ts.assets/008i3skNgy1gsqq3hn229j30nf04z74q.jpg)





这个时候我们执行git commit的时候会自动对代码进行lint校验。



### 2.4. git commit规范（后续）

#### 2.4.1 代码提交风格

通常我们的git commit会按照统一的风格来提交，这样可以快速定位每次提交的内容，方便之后对版本进行控制。

![](images/vue3+ts.assets/008i3skNgy1gsqw17gaqjj30to0cj3zp.jpg)

但是如果每次手动来编写这些是比较麻烦的事情，我们可以使用一个工具：Commitizen

* Commitizen 是一个帮助我们编写规范 commit message 的工具；

1.安装Commitizen

```shell
npm install commitizen -D
```

2.安装cz-conventional-changelog，并且初始化cz-conventional-changelog：

```shell
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这个命令会帮助我们安装cz-conventional-changelog：

![image-20210723145249096](images/vue3+ts.assets/008i3skNgy1gsqvz2odi4j30ek00zmx2.jpg)

并且在package.json中进行配置：

![](images/vue3+ts.assets/008i3skNgy1gsqvzftay5j30iu04k74d.jpg)

这个时候我们提交代码需要使用 `npx cz`：

* 第一步是选择type，本次更新的类型

| Type     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| feat     | 新增特性 (feature)                                           |
| fix      | 修复 Bug(bug fix)                                            |
| docs     | 修改文档 (documentation)                                     |
| style    | 代码格式修改(white-space, formatting, missing semi colons, etc) |
| refactor | 代码重构(refactor)                                           |
| perf     | 改善性能(A code change that improves performance)            |
| test     | 测试(when adding missing tests)                              |
| build    | 变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等） |
| ci       | 更改持续集成软件的配置文件和 package 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
| chore    | 变更构建流程或辅助工具(比如更改测试环境)                     |
| revert   | 代码回退                                                     |

* 第二步选择本次修改的范围（作用域）

![image-20210723150147510](images/vue3+ts.assets/008i3skNgy1gsqw8ca15oj30r600wmx4.jpg)

* 第三步选择提交的信息

![image-20210723150204780](images/vue3+ts.assets/008i3skNgy1gsqw8mq3zlj60ni01hmx402.jpg)

* 第四步提交详细的描述信息

![image-20210723150223287](images/vue3+ts.assets/008i3skNgy1gsqw8y05bjj30kt01fjrb.jpg)

* 第五步是否是一次重大的更改

![image-20210723150322122](images/vue3+ts.assets/008i3skNgy1gsqw9z5vbij30bm00q744.jpg)

* 第六步是否影响某个open issue

![image-20210723150407822](images/vue3+ts.assets/008i3skNgy1gsqwar8xp1j30fq00ya9x.jpg)

我们也可以在scripts中构建一个命令来执行 cz：

![image-20210723150526211](images/vue3+ts.assets/008i3skNgy1gsqwc4gtkxj30e207174t.jpg)



#### 2.4.2 代码提交验证

如果我们按照cz来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

* 我们可以通过commitlint来限制提交；

1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建commitlint.config.js文件，配置commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用husky生成commit-msg文件，验证提交信息：

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```



### 2.5  接口文档

接口文档v1版本：

- https://documenter.getpostman.com/view/12387168/TzsfmQvw

baseURL的值：

```shell
http://152.136.185.210:5000
http://152.136.185.210:4000
http://codercba.com:5000 # new
```

设置全局token的方法：

```js
const res = pm.response.json();
pm.globals.set("token", res.data.token);
```



接口文档v2版本：（有部分更新）

- https://documenter.getpostman.com/view/12387168/TzzDKb12



### 2.6 项目结构重置

- 在 src 中创建以下文件：

```shell
assets
  css
    common.less # 公共css
    index.less # 统一导出
    reset.less # 重置css
  img
base-ui # 公共UI组件
components # 主要组件
hooks # 自定义hooks
router # vue-router 路由
service # 服务器接口
stores # pinia 状态管理
utils	# 赋能函数
views # 视图，主页面
```



### 2.7 配置 CSS 样式

- 安装：`npm install normalize.css`
- 在 `main.ts` 中导入：`import 'normalize.css'`
- 安装：`npm install less -D`（开发时依赖）
- 在 `assets/css/reset.less` 中配置重置样式



### 2.8  配置 vue-router 路由配置

- 在项目初始化时已做安装，略作修改，具体见项目代码
- 主要是在 router、view、App.vue 文件中修改



### 2.9 配置 pinia 状态管理

- 在项目初始化时已做安装，略作修改，具体见项目代码
- 主要是在 store、main.ts 文件中修改



### 2.10 封装网络请求 axios

- npm install axios
  - 配置并测试 axios
- 区分 development 和 production 环境















## 技巧：

- vscode `cmd + p` 快速打开文件搜索，不需要在左侧费劲的找文件。



