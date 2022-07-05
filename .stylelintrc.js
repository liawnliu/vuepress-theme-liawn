module.exports = {
  /* 继承公共配置 */
  extends: [
    "stylelint-config-recess-order",
    "stylelint-prettier/recommended",
  ],
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
    "declaration-block-trailing-semicolon": "never"
  },
};
