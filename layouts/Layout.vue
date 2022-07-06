<!-- 主要新增RightSidebar，去掉了sidebar-mask，其他改动就是props入参新增了 -->
<template>
  <div class="theme-container" :class="pageClasses" @touchstart="onTouchStart" @touchend="onTouchEnd">
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <!-- <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    /> -->

    <Sidebar
      v-if="shouldShowSidebar"
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
      :isSidebarOpen="isSidebarOpen"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>

    <Home v-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems" :isSidebarOpen="isSidebarOpen" :isRightSidebarOpen="isRightSidebarOpen">
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
    <!-- 新增RightSidebar -->
    <RightSidebar
      v-if="shouldShowSidebar"
      @toggle-right-sidebar="toggleRightSidebar"
      :isRightSidebarOpen="isRightSidebarOpen"
    />
  </div>
</template>
<!-- js修改：引入RightSidebar；修改新增isSidebarOpen和isRightSidebarOpen数据；新增toggleRightSidebar方法 -->
<script>
import Home from "@parent-theme/components/Home.vue";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import RightSidebar from "@theme/components/RightSidebar.vue";
import { resolveSidebarItems } from "@parent-theme/util";

const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  name: "Layout",

  components: {
    Home,
    Page,
    Sidebar,
    RightSidebar,
    Navbar,
  },

  data() {
    return {
      isSidebarOpen: false,
      isRightSidebarOpen: false,
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return this.$title || themeConfig.logo || themeConfig.repo || themeConfig.nav || this.$themeLocaleConfig.nav;
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return !frontmatter.home && frontmatter.sidebar !== false && this.sidebarItems.length;
    },

    sidebarItems() {
      return resolveSidebarItems(this.$page, this.$page.regularPath, this.$site, this.$localePath);
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar,
        },
        userPageClass,
      ];
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.resizeHandler);
  },
  mounted() {
    // 进入路由之后触发
    /* this.$router.afterEach(() => {
      this.isSidebarOpen = false
    }) */

    let sidebarStatus = localStorage.getItem("sidebarStatus");
    if (sidebarStatus == null) {
      sidebarStatus = true;
      localStorage.setItem("sidebarStatus", sidebarStatus);
    }
    this.isSidebarOpen = sidebarStatus;

    const isMobile = this.isMobile();
    console.log("isMobile", isMobile);
    let rightSidebarStatus = localStorage.getItem("rightSidebarStatus");
    if (rightSidebarStatus == null) {
      rightSidebarStatus = isMobile ? !sidebarStatus : true;
      localStorage.setItem("rightSidebarStatus", rightSidebarStatus);
    } else if (rightSidebarStatus && sidebarStatus && isMobile) {
      rightSidebarStatus = false;
      localStorage.setItem("rightSidebarStatus", rightSidebarStatus);
    }
    this.isRightSidebarOpen = rightSidebarStatus;
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    isMobile() {
      const rect = document.body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    resizeHandler() {
      // 当页面变小一定程度时暂时关闭两个侧边栏
      if (!document.hidden) {
        if (this.isMobile()) {
          this.toggleSidebar(false);
          this.toggleRightSidebar(false);
        }
      }
    },
    toggleSidebar(to) {
      console.log("toggleSidebar", to);
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
      this.$emit("toggle-sidebar", this.isSidebarOpen);
      // 手机端只展示一个侧边栏
      if (this.isMobile() && this.isSidebarOpen && this.isRightSidebarOpen) {
        this.toggleRightSidebar(false);
      }
      localStorage.setItem("sidebarStatus", this.isSidebarOpen);
    },
    toggleRightSidebar(to) {
      console.log("toggleRightSidebar", to);
      this.isRightSidebarOpen = typeof to === "boolean" ? to : !this.isRightSidebarOpen;
      this.$emit("toggle-right-sidebar", this.isRightSidebarOpen);
      // 手机端只展示一个侧边栏
      if (this.isMobile() && this.isSidebarOpen && this.isRightSidebarOpen) {
        this.toggleSidebar(false);
      }
      localStorage.setItem("rightSidebarStatus", this.isRightSidebarOpen);
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else if (dx < 0 && document.documentElement.clientWidth - this.touchStart.x <= 80) {
          this.toggleRightSidebar(true);
        } else {
          this.toggleSidebar(false);
          this.toggleRightSidebar(false);
        }
      }
    },
  },
};
</script>
