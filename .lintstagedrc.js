module.exports = {
    // 我们的eslint的extends包含了prettier，所以这里只需用到eslint --fix
    "*.{js,ts,vue,html}": "eslint --fix",
    // eslint和stylelint管不到的文件就用prettier --write
    "*.{json,md}": "prettier --write",
};
