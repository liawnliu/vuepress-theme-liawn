let timer = null;
// 参考 node_modules\@vuepress\core\lib\client\app.js 的 createApp 中的 scrollBehavior
function scrollPosition({ Vue, to, savedPosition }) {
  // 点击浏览器“前进/后退”
  if (savedPosition) {
    return savedPosition;
  }
  if (to.hash) {
    // 这里是手动滚动时并禁止scrollBehavior影响对其的影响
    if (Vue.$vuepress.$get("disableScrollBehavior")) {
      return false;
    }
    // https://github.com/vuejs/vuepress/pull/2639
    // 有hash就滚动对应的anchor
    return { selector: decodeURIComponent(to.hash) };
  }
  // 没有hash就滚动到顶部
  return { x: 0, y: 0 };
}
function scrollBehavior({ Vue, router, siteData }) {
  // 确保themeConfig.smoothScroll关闭了，也就是不使用vuepress-plugin-smooth-scroll
  if (siteData.themeConfig.smoothScroll) return;
  // 滚动行为，有两点需要注意，一个是页面所有内容加载完才那to.path进行滚动，另一个是to.path要解码
  // eslint-disable-next-line no-param-reassign
  router.options.scrollBehavior = (to, from, savedPosition) => {
    // 页面上的所有图片加载完了，正常调用scrollPosition
    if (Vue.$vuepress.$get("imgLoaded")) {
      return scrollPosition({ Vue, router, siteData, to, from, savedPosition });
    }
    // 页面上的图片还未加载完，等待imgLoaded变为true，然后调用scrollPosition
    return new Promise((resolve) => {
      // https://v3.router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E5%BC%82%E6%AD%A5%E6%BB%9A%E5%8A%A8
      timer = setInterval(() => {
        if (Vue.$vuepress.$get("imgLoaded")) {
          clearInterval(timer);
          resolve(scrollPosition({ Vue, router, siteData, to, from, savedPosition }));
        }
      }, 100);
    });
  };
}
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
}) => {
  // 关闭vuepress-plugin-smooth-scroll，并且
  // 增强node_modules\@vuepress\core\lib\client\app.js 的 createApp 中的 scrollBehavior
  scrollBehavior({ Vue, options, router, siteData });
};
