<h2 align="center">vuepress-theme-liawn</h2>

## 最新说明

2024年8月29日更新：我的新博客[blog-liawn](https://github.com/liawnliu/blog-liawn)依赖的[vitepress](https://vitepress.dev/zh/)从v1.0.0-alpha.73升级到v1.3.4了。

2023年4月23日，旧博客[blog-vuepress](https://github.com/liawnliu/blog-vuepress)已迁移至新博客[blog-liawn](https://github.com/liawnliu/blog-liawn)，原[blog 入口](https://liawnliu.github.io/blog-vuepress/)变为新的[blog 入口](https://liawnliu.github.io/blog-liawn/)。

旧博客是使用[vuepress@v1](https://v1.vuepress.vuejs.org/zh/)搭建的，需要自己解决一些问题并且我还自己制作了[右侧边栏vuepress-theme-liawn](https://github.com/liawnliu/vuepress-theme-liawn)；新博客使用[vitepress@v1.0.0-alpha.73](https://vitepress.dev/)搭建的（这个网址已过时，2024年8月29日备注），它自带的主题解决了那些问题，并且还自带右侧边栏，主要还是加快了启动速度，但内存问题还是存在，后面应该会得到解决。

也就说，本插件不再有什么存在的意义了，到适当时机会隐藏本项目。vue团队在文档这一块已经将重心从vuepress移到了[vitepress](https://vitepress.dev/zh/)，即便是vuepress@v2也靠后啦。


## 安装

PS：尽量使用最新版本（至少是`vuepress-theme-liawn@1.0.3`），早期版本有问题。

```bash
yarn add -D vuepress-theme-liawn

npm install -D vuepress-theme-liawn
```

## 介绍

本人开发的[VuePress](https://v1.vuepress.vuejs.org/zh/)自定义主题`vuepress-theme-liawn`。

`vuepress`+`vuepress-theme-liawn`搭建的[blog](https://liawnliu.github.io/blog-vuepress/)，blog 代码在[这里](https://github.com/liawnliu/blog-vuepress)。

- 功能

  - 基础功能：继承了默认主题，那么默认主题的功能都有。
  - 本自定义主题核心功能是提供了一个**右侧侧边栏**，用于展示本文的所有标题。所以左侧侧边栏最好禁止提取 header，但文章的所有标题要放到`$page.headers`了。具有怎么看下一小节——[配置](#配置)。
  - 小功能：平滑滚动，其实是优化了 vuepress-plugin-smooth-scroll 并集成到我们这个主题里了。
  - 小功能：页面滚动时更新左侧侧边栏的 active 以及 URL 里的 hash 值。那么就要一个滚动标准 targetTop，用于判断标题是否要更新到 URL 的 hash 里。至于右侧侧边栏的更新，RouterLink 会自动帮我们更新.router-link-active
  - 小功能：给左右两侧加上“折叠”按钮。

- 开发注意事项（如果你想自己开发一个主题的话）：

  - 首先入口文件 index.js 里要继承`@vuepress/theme-default`
  - 如果想修改默认主题的某个文件，可以将它以及它的目录复制到自定义主题里，一定要保证路径以及文件名要相同。然后对于这个文件里引用其他文件的写法要稍微修改一下，主要是将`@theme`改为`@parent-theme`（js 和 css 都是如此）。
  - 要想使用数据，那么`this.$page`和`this.$site`是必不可少的，具体在控制台里打印它们吧。
  - `document`和`window`的问题，它们只能在`mnouted`和`beforeMounte`里使用(因为 ssr)。如果只是操作 dom，建议使用`this.$root.$el`和`this.$parent.$el`以及`this.$el`。
  - 参考资料：[官方文档-开发主题](https://v1.vuepress.vuejs.org/zh/theme/writing-a-theme.html)
  - 参考主题：[vuepress-theme-yilia-plus.x](https://github.com/JoeyBling/vuepress-theme-yilia-plus)
  - 参考主题：[vuepress-theme-vdoing](https://github.com/xugaoyi/vuepress-theme-vdoing)
  - 参考主题：[vuepress-theme-reco-1.x](https://github.com/vuepress-reco/vuepress-theme-reco-1.x)

[**更新日志**](https://github.com/liawnliu/vuepress-theme-liawn/releases)

## 配置

```js
module.exports = {
  markdown: {
    // this.$page.headers里的标题层级
    extractHeaders: ["h2", "h3", "h4", "h5", "h6"],
  },
  themeConfig: {
    // 0表示让左侧侧边栏禁止提取文章里的标题。因为我们用了vuepress-theme-liawn，右侧会有文章所有标题，那么左侧就不应该再提取了
    sidebarDepth: 0,
    // vuepress-plugin-smooth-scroll有bug，这里关闭它然后在.vuepress/enhanceApp.js实现它
    smoothScroll: false,
    // vuepress-theme-liawn的配置项
    rightSidebar: {
      // h1的padding-top + margin-top + a的margin-top。
      // 当top小于等于targetTop时，当前header就更新到右侧侧边栏标题和 URL 中的 Hash 值
      targetTop: 73.6 - 24 + 32 + 3.74,
      // 用于解决vuepress-plugin-smooth-scroll问题，表示是否平滑滚动
      smoothScroll: true,
    },
  },
};
```

本人的 vuepress 配置可以看[config.js](https://github.com/liawnliu/blog-vuepress/blob/master/docs/.vuepress/config.js)和[sidebar.js](https://github.com/liawnliu/blog-vuepress/blob/master/docs/.vuepress/sidebar.js)

不懂怎么使用 vuepress 的，可以看[官网教程-v1](https://v1.vuepress.vuejs.org/zh/)以及我写的[使用 vuepress 写 blog](https://liawnliu.github.io/blog-vuepress/book-web/常用工具/使用vuepress写blog.md)，特别是本人踩的一些坑——[常见问题](https://liawnliu.github.io/blog-vuepress/book-web/常用工具/使用vuepress写blog.md#常见问题)。

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

4. VSCode 关于 Eslint 和 Prettier 的相关设置（上面是针对项目的，这里是针对编辑器本身的）

   - 打开 VSCode 的“扩展”，输入“**Eslint**”、“**Prettier**”进行插件安装
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
       }
     }
     ```

5. 编辑器的一些风格设置，可以为 VSCode 安装**EditorConfig 插件**，然后在项目根目录下新建`.editorconfig`文件，文件内容如下：

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

6. 为了保证代码提交时运行一些任务，需要使用 husky

   - `yarn add -D husky@7.0.4`
   - 然后用`yarn husky install`命令进行初始化（确保先`git init`），会生成`.husky`目录

7. 代码提交前要做 lint 任务，需要使用 lint-staged

   - `yarn add -D lint-staged@12.2.0`
   - 然后用`echo "module.exports = {}" > .lintstagedrc.js`生成配置文件`.lintstagedrc.js`

   ```js
   // .lintstagedrc.js
   module.exports = {
     // 我们的eslint的extends包含了prettier，所以这里只需用到eslint --fix
     "*.{js,ts,vue,html}": "eslint --fix",
     // eslint和stylelint管不到的文件就用prettier --write
     "*.{json,md}": "prettier --write",
   };
   ```

8. 需要将`lint-staged`添加到`husky`的提交前钩子里去，`yarn husky add .husky/pre-commit "yarn lint-staged"`，会在`.husky`下自动生成一个`pre-commit`文件
9. 约束代码提交信息，需要使用 commitlint

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
