<!-- 新增一个组件RightSidebar，右侧的目录栏 -->
<template>
  <div :class="{ 'right-sidebar-wrapper': true, 'right-sidebar-hidden': !isRightSidebarOpen }">
    <aside class="right-sidebar">
      <!-- 用于生成具体head，ul-li结构（嵌套） -->
      <RightSidebarContent :headers="$page.headers" class="sidebar-links" />
    </aside>
    <!-- 折叠按钮 -->
    <ToggleBtn @click.native="$emit('toggle-right-sidebar', !isRightSidebarOpen)" />
  </div>
</template>

<script>
// @theme修改为@parent-theme
import RightSidebarContent from "@theme/components/RightSidebarContent.vue";
import ToggleBtn from "@theme/components/ToggleBtn.vue";
import debounce from "lodash.debounce";

export default {
  name: "RightSidebar",
  components: { RightSidebarContent, ToggleBtn },
  props: ["isRightSidebarOpen"],
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {
    targetTop() {
      return this.$site.themeConfig.rightSidebar.targetTop;
    },
  },
  methods: {
    onScroll: debounce(function func() {
      this.setActiveHash();
    }, 300),
    setActiveHash() {
      // 拿到所有标题，a标签
      const headers = [].slice.call(this.$parent.$el.querySelectorAll(".page .header-anchor"));
      // console.log("headers", headers);
      let goal = 0; // 目标，当前滚动到哪个章节了
      for (let i = 0; i < headers.length; i += 1) {
        const header = headers[i];
        // 返回元素的大小及其相对于视口的位置
        const rect = header.getBoundingClientRect();
        // 超出targetTop，那么当前活动标题应该是它前面一个
        if (rect.top > this.targetTop) {
          // 还没滚到顶部，那么我们取它前一个
          goal = i - 1;
          break;
        }
        // 最后一个比较特殊
        if (i === headers.length - 1) goal = i;
      }
      // console.log("goal", goal);
      if (headers[goal]) {
        const hash = decodeURIComponent(headers[goal].hash);
        // console.log("headers[goal].hash", hash);
        // 只有在hash不同于上一次时才改变
        this.$vuepress.$set("disableScrollBehavior", true);
        // 只是替换URL中的hash，这样也会更新.router-link-active
        this.$router
          .replace(hash)
          .then(() => {
            this.$nextTick(() => {
              this.$vuepress.$set("disableScrollBehavior", false);
            });
          })
          .catch(() => {
            // console.log("error", error);
            // 这里一定要加这行代码，否则点击右侧侧边栏可能会被scrollBehavior一直拦截
            this.$vuepress.$set("disableScrollBehavior", false);
          });
      }
    },
  },
};
</script>
<!-- 样式与sidebar里差不多 -->
<style lang="stylus">
.right-sidebar
  h1
    font-size 1.1rem
    border-bottom unset
    line-height 1.3rem
    padding-left 0.3rem
    margin 0.75rem 0
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  h2, h3, h4, h5, h6
    font-size 0.95rem
    border-bottom unset
    line-height 1.2rem
    margin 0.75rem 0
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  h2
    padding-left 1rem
    padding-bottom 0
  h3
    padding-left 1.7rem
  h4
    padding-left 2.4rem
  h5
    padding-left 3.1rem
  h6
    padding-left 3.8rem
  a
    color #2c3e50
    font-weight 400
    &::hover
      color #3eaf7c
    &.router-link-active
      color #3eaf7c
      font-weight 500
      &::after
        content ''
        position absolute
        width 100%
        height 1.95rem
        right 0
        margin-top -0.33rem
        background-color #d2f7e6
        z-index -1
  h1 a
    &::after
      height 2.05rem
      margin-top -0.33rem
  div.title
    text-align center
    padding 15px 0 5px 0
    font-size 1.2rem
    font-weight bold

@media (max-width: $MQMobile)
  .right-sidebar
    & > .sidebar-links
      padding 1rem 0
</style>
