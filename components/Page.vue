<!-- 模板修改：加了两个class，具体是sidebar-hidden和right-sidebar-hidden -->
<template>
  <main :class="{ page: true, 'sidebar-hidden': !isSidebarOpen, 'right-sidebar-hidden': !isRightSidebarOpen }">
    <slot name="top" />

    <Content class="theme-default-content" />
    <PageEdit />

    <PageNav v-bind="{ sidebarItems }" />

    <slot name="bottom" />
  </main>
</template>

<!-- js修改：加了两个prop，具体是isSidebarOpen和isRightSidebarOpen -->
<script>
/* eslint-disable no-param-reassign */
// @theme修改为@parent-theme
import PageEdit from "@parent-theme/components/PageEdit.vue";
import PageNav from "@parent-theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems", "isSidebarOpen", "isRightSidebarOpen"],
  mounted() {
    if (!this.$site.themeConfig.smoothScroll) {
      // 添加滚动平滑的样式，记得要配置themeConfig.smoothScrollPlus
      document.documentElement.style.scrollBehavior = this.$site.themeConfig.rightSidebar.smoothScroll ? "smooth" : "";
      // 监听路由
      this.$watch(
        "$route.path",
        () => {
          this.$vuepress.$set("imgLoaded", false);
          this.$nextTick(() => {
            this.checkImgLoad();
          });
        },
        {
          immediate: true,
        }
      );
    }
  },
  methods: {
    checkLoaded(nowCount, targetCount) {
      if (nowCount === targetCount) {
        this.$vuepress.$set("imgLoaded", true);
      }
    },
    // 所有的图片是否都加载完毕
    checkImgLoad() {
      const imgList = this.$el.getElementsByTagName("img"); // 图片集合
      const imgCount = imgList.length; // 图片总数
      let imgLoad = 0; // 加载完成的图片数量
      if (imgCount) {
        [].forEach.call(imgList, (item) => {
          // console.log("item: %O", item);
          if (!item.complete) {
            item.onload = () => {
              imgLoad += 1;
              this.checkLoaded(imgLoad, imgCount);
              item.onerror = null;
              item.onload = null;
            };
            item.onerror = () => {
              imgLoad += 1;
              this.checkLoaded(imgLoad, imgCount);
              item.onerror = null;
              item.onload = null;
            };
          } else {
            imgLoad += 1;
            this.checkLoaded(imgLoad, imgCount);
          }
        });
      } else {
        this.checkLoaded(imgLoad, imgCount);
      }
    },
  },
};
</script>
<!-- 样式修改：在左右sidebar展开时padding的变化，以及padding的过渡 -->
<style lang="stylus">
@require '~@parent-theme/styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block
  -webkit-transition padding .5s
  -o-transition padding .5s
  transition padding .5s
</style>
