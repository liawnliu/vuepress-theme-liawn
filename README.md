<h2 align="center">vuepress-theme-liawn</h2>

## 介绍

本人开发的[VuePress](https://v1.vuepress.vuejs.org/zh/)自定义主题`vuepress-theme-liawn`，它继承自`VuePress`默认主题`@vuepress/theme-default`，在此基础上新增了一个右侧侧边栏，用于展示**当前文章目录**，给左右两侧的侧边栏都加上了“折叠按钮”，对移动端做了一定的适配。

[**更新日志**](https://github.com/liawnliu/vuepress-theme-liawn/releases)

## 这个主题可以做什么？

案例：[我的文档](https://liawnliu.github.io/blog-vuepress/)

## 安装

```bash
yarn add -D vuepress-theme-liawn

npm install -D vuepress-theme-liawn
```

## vuepress 参考配置

vuepress-theme-liawn 本主题并没有自己的配置，本人只是建议参考用下面的 vuepress 配置

`docs/.vuepress/config.js`

```js
const sidebar = require("./sidebar.js");

module.exports = {
  title: "Liawn's blog",
  description: "用vuepress搭建的个人博客",
  port: 4002,
  head: [
    ["meta", { charset: "UTF-8" }],
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true, // 代码块显示行号
    toc: { includeLevel: [2, 3, 4, 5] },
    // markdown-it插件，解决相对路径中文图片问题
    extendMarkdown: (md) => {
      // yarn add markdown-it-disable-url-encode --dev
      md.use(require("markdown-it-disable-url-encode"), "./");
    },
  },
  plugins: [
    // yarn add @vuepress/plugin-medium-zoom -D
    "@vuepress/plugin-medium-zoom",
    // yarn add vuepress-plugin-fulltext-search -D
    "fulltext-search",
  ],
  themeConfig: {
    sidebarDepth: 0, // 0表示让左侧侧边栏禁止提取文章里的标题
    lastUpdated: "上一次更新", // 文档更新时间：每个文件git最后提交的时间
    displayAllHeaders: false, // 默认情况下，侧边栏只会显示由当前活动页面的标题（headers）组成的链接
    activeHeaderLinks: false, // 当用户通过滚动查看页面的不同部分时，嵌套的标题链接和 URL 中的 Hash 值会实时更新
    smoothScroll: true, // 启用滚动效果
    sidebar, // 侧边栏
    expandAllGroup: false,
    // 导航栏
    nav: [
      { text: "Web", link: "/book-web/" },
      { text: "生活", link: "/book-sketches/" },
    ],
    rightSidebar: {
      mode: "dom",
      dept: 6,
      scope: ".page .content__default",
      navbarHeight: 57.6,
    },
  },
};
```

`docs/.vuepress/sidebar.js`

```js
module.exports = {
  "/book-web/": [
    {
      title: "web前端",
      collapsable: false, // 一直展开，不带有折叠功能
      initialOpenGroupIndex: -1, // 默认是0表示展开第一项，现设置为-1表示初始化时全部折叠
      children: [
        {
          title: "学习JavaScript",
          path: "/book-web/html、css、js、ts/学习JavaScript/",
          collapsable: true, // 具有折叠功能
          children: [
            "/book-web/html、css、js、ts/学习JavaScript/1.基础语法",
            "/book-web/html、css、js、ts/学习JavaScript/2.变量、作用域和内存问题",
          ],
        },
        {
          title: "学习CSS",
          collapsable: true,
          path: "/book-web/html、css、js、ts/学习CSS/",
          children: ["/book-web/html、css、js、ts/学习CSS/1.选择器"],
        },
        {
          title: "学习TypeScript",
          collapsable: true,
          path: "/book-web/html、css、js、ts/学习TypeScript/",
          children: ["/book-web/html、css、js、ts/学习TypeScript/1.typescript基础"],
        },
        {
          title: "学习Vue",
          collapsable: true,
          path: "/book-web/web前端js框架/学习Vue/",
          children: ["/book-web/web前端js框架/学习Vue/1.vue基础"],
        },
      ],
    },
    {
      title: "常用工具",
      collapsable: false,
      children: ["/book-web/常用工具/Npm的使用", "/book-web/常用工具/Git的使用"],
    },
    {
      title: "面试准备",
      collapsable: false,
      children: ["/book-web/面试准备/WEB前端面试"],
    },
  ],
  // 第二个侧边栏，对应导航栏的第二项
  "/book-sketches/": [
    {
      title: "电脑工具",
      collapsable: false,
      children: ["/book-sketches/电脑工具/win10下载与安装"],
    },
    {
      title: "日常生活",
      collapsable: false,
      children: ["/book-sketches/日常生活/土味情话"],
    },
  ],
};
```

## LICENSE

[MIT](LICENSE)

## 其他

1. 代码规范用了 eslint，涉及到：

   - `yarn add -D eslint@6.7.2`
   - `yarn add -D eslint-plugin-import@2.22.1`
   - `yarn add -D eslint-plugin-vue@6.2.2`
   - `yarn add -D @vue/cli-plugin-eslint@4.5.17`
   - `yarn add -D @vue/cli-service@4.5.17`（修正代码时需要使用 cli-service）
   - 配置 eslint，用`echo "module.exports = {}" > .eslintrc.js`创建配置文件`.eslintrc.js`：
     ```js
     // .eslintrc.js
     module.exports = {
       root: true,
       env: {
         node: true,
       },
       extends: ["plugin:vue/essential", "@vue/airbnb"],
       parserOptions: {
         ecmaVersion: 2020,
       },
       rules: {
         "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
         "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
       },
     };
     ```

2. 至于 eslint 的繁杂规则的配置，用到了：

   - `yarn add -D @vue/eslint-config-airbnb@5.0.2`

3. 代码格式化用到了 prettier，涉及到（后面两个包主要是为了让 eslint 和 prettier 之间不冲突）：

   - `yarn add -D prettier@2.2.1`
   - `yarn add -D @vue/eslint-config-prettier@6.0.0`
   - `yarn add -D eslint-plugin-prettier@3.3.1`
   - 配置 prettier，用`echo "module.exports = {}" > .prettierrc.js`创建配置文件`.prettierrc.js`：
     ```js
     // .prettierrc.js
     module.exports = {
       trailingComma: "es5",
       tabWidth: 2,
       semi: true,
       singleQuote: false,
       printWidth: 120,
     };
     ```
   - 需要在`.eslintrc.js`的 extends 里的末尾**追加**`"@vue/prettier"`。

4. css 代码风格需要使用`stylelint`，还要避免和`Prettier`冲突。

   - `yarn add -D stylelint@13.13.1`。
   - `yarn add -D stylelint-config-recess-order@3.0.0`。
   - `yarn add -D stylelint-prettier@2.0.0`。
   - `yarn add -D stylelint-config-prettier@9.0.3`。
   - `echo "module.exports = {}" > .stylelintrc.js`创建配置文件`.stylelintrc.js`。

     ```js
     // .stylelintrc.js
     module.exports = {
       /* 继承公共配置 */
       extends: ["stylelint-config-recess-order", "stylelint-prettier/recommended"],
       /* 扩展 stylelint 原生rules 的种类 */
       plugins: ["stylelint-prettier"],
       /* 项目个性化的规则 */
       rules: {
         "selector-pseudo-element-no-unknown": [
           true,
           {
             ignorePseudoElements: ["v-deep"],
           },
         ],
         "prettier/prettier": true,
         "number-leading-zero": "always",
       },
     };
     ```

5. VSCode 关于 Eslint 和 Prettier 和 Stylelint 的相关设置（上面是针对项目的，这里是针对编辑器本身的）

   - 打开 VSCode 的“扩展”，输入“**Eslint**”、“**Prettier**”、“**Stylelint**”进行插件安装
   - 在项目根目录下创建`.vscode`文件夹，然后新建一个 settings.json，内容参考如下，根据自身需要进行调整
     ```json
     // settings.json
     {
       /*
            不要同时开启editor.formatOnSave和source.fixAll.eslint，这样会导致两次lint检查，那么我们保留
            source.fixAll.eslint的，至于editor.formatOnSave我们单独放在[jsonn]、[scss]、[less]等配置中，
            意思是能用eslint进行fix的就用eslint，它不行的再使用prettier进行格式化。
        */
       "editor.formatOnSave": false,
       // vscode保存时修复有eslint问题的代码
       "editor.codeActionsOnSave": {
         // 项目里得有.eslintrc.js（json也可以），那么就会根据.eslintrc.js文件进行格式化代码
         "source.fixAll.eslint": true, // "editor.defaultFormatter": "dbaeumer.vscode-eslint"
         // 项目里得有.stylelint.config.js
         "source.fixAll.stylelint": true // "editor.defaultFormatter": "stylelint.vscode-stylelint"
       },
       // 既然editor.formatOnSave关闭了，那eslint.format.enable也得关闭。你放心，source.fixAll.eslint是生效的
       "eslint.format.enable": false,
       // ESLint添加支持，老版的是eslint.validate，暂时不去掉，以防万一
       "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact", "html", "vue"],
       // ESLint添加支持，新版的是eslint.probe
       "eslint.probe": ["javascript", "javascriptreact", "typescript", "typescriptreact", "html", "vue"],
       /*
            有坑的地方：如果配置了eslint.options的plugins，而具体项目中又没安装这个plugins里的插件，那么Vscode
            的ESLint插件可能运行异常，比如报错Failed to load plugin 'html' declared in 'CLIOptions'。这样可能导致
            ESLint插件在代码保存时不能fix，也可能会没有飘红的提示。解决办法是在你想要格式化的工程里安装对应的plugins，
            另外一种办法是将eslint.options或者里面的plugins删除。
        */
       "eslint.options": {
         "configFile": ".eslintrc.js"
       },
       // alwaysShowStatus最好打开，可观察到ESLint插件运行情况。具体报错信息可通过右下角的“ESLint”查看。
       "eslint.alwaysShowStatus": true,
       // 这种类型的文件就开启formatOnSave，以及defaultFormatter。因为eslint和stylelint对它们束手无策
       "[json]": {
         "editor.defaultFormatter": "esbenp.prettier-vscode",
         "editor.formatOnSave": true
       },
       "[jsonc]": {
         "editor.defaultFormatter": "esbenp.prettier-vscode",
         "editor.formatOnSave": true
       },
       "[html]": {
         "editor.defaultFormatter": "esbenp.prettier-vscode",
         "editor.formatOnSave": true
       },
       "[markdown]": {
         "editor.defaultFormatter": "esbenp.prettier-vscode",
         "editor.formatOnSave": true
       },
       "css.validate": false,
       "less.validate": false,
       "scss.validate": false,
       "stylelint.configFile": ".stylelintrc.js",
       "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"],
       // 要保证项目使用的ts是项目node_modules里的ts
       "typescript.tsdk": "./node_modules/typescript/lib"
     }
     ```

6. 编辑器的一些风格设置，可以为 VSCode 安装**EditorConfig 插件**，然后在项目根目录下新建`.editorconfig`文件，文件内容如下：

   ```txt
    # https://editorconfig.org
    root = true

    [*]
    indent_style = space
    indent_size = 2
    end_of_line = lf
    trim_trailing_whitespace = true
    insert_final_newline = true
    max_line_length = 120

    [*.md]
    insert_final_newline = false
    trim_trailing_whitespace = false
   ```

7. 为了保证代码提交时运行一些任务，需要使用 husky

   - `yarn add -D husky@7.0.4`
   - 然后用`yarn husky install`命令进行初始化（确保先`git init`），会生成`.husky`目录

8. 代码提交前要做 lint 任务，需要使用 lint-staged

   - `yarn add -D lint-staged@12.2.0`
   - 然后用`echo "module.exports = {}" > .lintstagedrc.js`生成配置文件`.lintstagedrc.js`

   ```js
   // .lintstagedrc.js
   module.exports = {
     // 我们的eslint的extends包含了prettier，所以这里只需用到eslint --fix
     "*.{js,ts,vue,html}": "eslint --fix",
     // 我们的stylelint的extends包含了prettier，所以这里只需用到stylelint --fix
     "*.{vue,html,css,scss,less}": "stylelint --fix",
     // eslint和stylelint管不到的文件就用prettier --write
     "*.{json,md}": "prettier --write",
   };
   ```

9. 需要将`lint-staged`添加到`husky`的提交前钩子里去，`yarn husky add .husky/pre-commit "yarn lint-staged"`，会在`.husky`下自动生成一个`pre-commit`文件
10. 约束代码提交信息，需要使用 commitlint

- `yarn add -D @commitlint/cli@16.0.2`
- `yarn add -D @commitlint/config-conventional@16.0.0`
- 然后输入`echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js`创建配置文件`commitlint.config.js`
- 该配置文件里添加的`@commitlint/config-conventional`一般够用了，具体规则可以去看[config-conventional 规则](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)。
- 常用的 commit type 如下：

```js
/**
 * build:     编译打包
 * chore:     构建过程或辅助工具的变动, 比如改变构建流程、或者增加依赖库、工具等
 * ci:        持续集成
 * docs:      文档修改
 * feat:      feature，新功能、新特性
 * fix:       修补bug
 * perf:      performance，提升了性能、体验
 * refactor:  重构，不是新功能也不是修bug
 * revert:    撤销，版本回退
 * style:     格式，这里并不是css样式
 * test:      测试脚本、测试用例
 */
```

11. 需要将`commitlint`添加到`husky`的`commit-msg`钩子里去，具体是使用如下命令，如果添加成功会在命令行里显示`husky - created .husky/commit-msg`并在`.husky`下自动生成一个`commit-msg`文件，否则换一条命令试试。

    - 使用`yarn husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'`，
    - 或者使用`yarn husky add .husky/commit-msg \"npx --no -- commitlint --edit '$1'\"`，
    - 或者使用`yarn husky add .husky/commit-msg "npx --no -- commitlint --edit $1"`

12. 如果觉得 commitlint 有些麻烦，那么可以用提交模板 commitizen

    - `yarn add -D commitizen@4.2.4`
    - 然后使用`yarn commitizen init cz-conventional-changelog --yarn --dev --exact`来初始化 cz-conventional-changelog 提供的模板
    - 提交代码时使用`cz`或者`yarn cz`进行提交。

13. `Unable to resolve path to module '' import/no-unresolved`

    - 在.eslintrc.js 里新增规则来忽略它们

    ```js
    "import/no-unresolved": [
        2,
        {
            "ignore": ["^@parent-theme", "^@theme", "^@AlgoliaSearchBox", "^@SearchBox"] // @ 是设置的路径别名
        },
    ]
    ```
