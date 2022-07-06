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
// @theme修改为@parent-theme
import PageEdit from "@parent-theme/components/PageEdit.vue";
import PageNav from "@parent-theme/components/PageNav.vue";

export default {
  components: { PageEdit, PageNav },
  props: ["sidebarItems", "isSidebarOpen", "isRightSidebarOpen"],
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
