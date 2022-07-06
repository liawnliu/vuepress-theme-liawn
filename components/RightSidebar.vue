<!-- 新增一个组件RightSidebar，右侧的目录栏 -->
<template>
  <div :class="{ 'right-sidebar-wrapper': true, 'right-sidebar-hidden': !isRightSidebarOpen }">
    <aside class="right-sidebar">
      <!-- 用于生成具体head，ul-li结构（嵌套） -->
      <RightSidebarContent :tree="tree" class="sidebar-links" />
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
  data() {
    return {
      tree: [],
    };
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  watch: {
    "$page.path": {
      immediate: true,
      handler() {
        console.log("this.$site", this.$site);
        console.log("this.$page", this.$page);
        if (this.rightSidebarData && this.rightSidebarData.mode === "page") {
          // 如果规定是从$page取那就从this.$page.headers拿到所有标题，它默认只会取2层
          this.setHeadersTree(this.$page.headers);
        } else {
          this.$nextTick(() => {
            // 如果规定从页面dom结构中拿所有标题，那么层次就不仅限于2层了
            const headers = this.handleHeaders(this.getHeaders());
            // console.log('headers', headers);
            this.setHeadersTree(headers);
          });
        }
      },
    },
  },
  computed: {
    rightSidebarData() {
      return this.$site.themeConfig.rightSidebar;
    },
  },
  methods: {
    getHeaders() {
      const { scope } = this.rightSidebarData;
      const { dept } = this.rightSidebarData;

      let headerStr = "h2";
      for (let i = 3; i <= dept; i += 1) {
        // 生成Selector
        headerStr = `${headerStr}, h${i}`;
      }
      // 在文章区域scope里搜索所需等级的标题
      const headers = document.querySelectorAll(`${scope} ${headerStr}`);
      // 这样写的目的主要是为了看到item每项里的具体字段，如果单纯只用for循环，在控制台看不到这些字段
      return Array.prototype.filter.call(headers, (item) => item.id); // 只留下有id的标题
    },
    handleHeaders(headers) {
      // 处理好得到level、title、slug
      return headers.map((item) => {
        const level = Number(item.nodeName.replace("H", ""));
        const title = item.outerText.replace("#\n", "");
        const slug = item.firstChild.attributes.href.value.replace("#", "");
        // console.log('item.firstChild.hash', item.firstChild.hash);
        return { level, title, slug };
      });
    },
    // 本组件核心思想，将一维的headers转换为嵌套的tree
    setHeadersTree(headers) {
      // 当前文章的title，tree的根节点
      const root = {
        title: "", // 不会将它展示到右侧侧边栏，只会展示它下面的headers
        level: 1,
        // 当前文章里的标题header
        children: [],
      };
      // 模拟栈结构，使用它的原因是在“闭合”时能找到要闭合谁
      const stack = [];
      let lastHeader = root; // 一维headers的当前项的前一项
      headers.forEach((item) => {
        // 获取标题，层级，跳转路径
        const { title, level, slug } = item;
        // 数节点
        const newItem = { title, level, slug, children: [] };
        // 有三种情况：新子级、同级、闭合上一级（或闭合上上级）
        if (level > lastHeader.level) {
          // 新一项的level层级更深一层（层层递进），先入栈，将新项保存到上一项的children里
          stack.push(lastHeader);
          lastHeader.children.push(newItem);
        } else if (level === lastHeader.level) {
          // 同级的，那么从栈顶拿取父级，将新项放到父级的children里
          const parent = stack[stack.length - 1];
          parent.children.push(newItem);
        } else {
          // level突然变小，证明要闭合了，要闭合谁那就需要拿当前项的level与栈里的数据进行对比
          let parent = null;
          do {
            // 每次循环都出一次栈，直到当前项的level与栈里的数据匹配上
            const temp = stack.pop();
            if (temp.level === level) {
              // level匹配上后，就要拿此时的栈顶作为父级，那存放新项。（新项的前一项就完成了闭合）
              parent = stack[stack.length - 1];
              parent.children.push(newItem);
              break;
            }
          } while (stack.length);
        }
        // 更新“前一项”
        lastHeader = newItem;
      });
      // 是root.children，而不是root，
      // 因为在右侧sidebar不需要展示pageTitle（就算展示也拿不到准确值，因为可能有1.2.等序号）
      this.tree = root.children;
      // 如果链接里有hash就让对应的<a>呈现active， 这里的hash暂时不需要encodeURI
      this.$nextTick(() => {
        if (this.$route.hash) {
          const target = this.changeSidebarActive({ hash: this.$route.hash });
          // this.$route.hash对应的anchor滚动到视窗里
          const el = document.querySelector(target);
          // 滚动到视窗顶部
          if (el) el.scrollIntoView();
        }
      });
    },
    onScroll: debounce(function func() {
      this.setActiveHash();
    }, 300),
    setActiveHash() {
      const headers = this.getHeaders();
      let goal = 0; // 目标，当前滚动到哪个章节了
      for (let i = 0; i < headers.length; i += 1) {
        const header = headers[i];
        // 返回元素的大小及其相对于视口的位置
        const rect = header.getBoundingClientRect();
        // 刚好滚动到顶部
        if (rect.top === this.rightSidebarData.navbarHeight) {
          // 导航栏高度
          goal = i;
          break;
        } else if (rect.top > this.rightSidebarData.navbarHeight) {
          // 还没滚到顶部，那么我们取它前一个
          goal = i - 1;
          break;
        }
        // 最后一个比较特殊
        if (i === headers.length - 1) goal = i;
      }
      if (headers[goal]) {
        this.$vuepress.$set("disableScrollBehavior", true);
        this.$router.replace(decodeURIComponent(headers[goal].firstChild.hash), () => {
          // execute after scrollBehavior handler.
          this.$nextTick(() => {
            this.$vuepress.$set("disableScrollBehavior", false);
            this.changeSidebarActive({ goal });
          });
        });
      }
    },
    changeSidebarActive({ goal, hash }) {
      /* console.log('changeSidebarActive', hash);
      console.log('changeSidebarActive', goal); */
      const tocList = document.querySelectorAll(".right-sidebar a");
      // console.log('tocList', tocList);
      let target = null;
      // 联动样式
      tocList.forEach((item, index) => {
        if (item.hash === hash || index === goal) {
          item.classList.add("active");
          // 初始化时要知道是哪个anchor
          target = item;
        } else {
          item.classList.remove("active");
        }
      });
      // 要保证右侧active状态下的<a>要在视窗内，10为留出的空隙。前提是要使用debounce，否则侧边栏会停滞不前
      const rightSidebar = document.querySelector(".right-sidebar");
      if (target.offsetTop - rightSidebar.scrollTop + target.offsetHeight + 10 > rightSidebar.offsetHeight) {
        rightSidebar.scrollTop = target.offsetTop - rightSidebar.offsetHeight + target.offsetHeight + 10;
      } else if (target.offsetTop - rightSidebar.scrollTop < 0) {
        rightSidebar.scrollTop = target.offsetTop - 10;
      }

      return target.attributes.href.value;
    },
  },
};
</script>
<!-- 样式与sidebar里差不多 -->
<style lang="stylus">
.right-sidebar
  h4
    text-align center
  ul
    padding 0
    margin 5
    list-style-type none
    li
      margin 0 5px 0 20px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    a
      color #2c3e50
      font-weight 400
      line-height 1.7
      &.active
        font-weight 500
        color #3eaf7c
        &::after
            content ''
            position absolute
            width 100%
            height 1.7rem
            right 0
            background-color #d2f7e6
            z-index -1

@media (max-width: $MQMobile)
  .right-sidebar
    & > .sidebar-links
      padding 1rem 0
</style>
