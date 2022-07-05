<!-- 模板上就新增了折叠按钮 -->
<template>
  <div :class="{ 'sidebar-wrapper': true, 'sidebar-hidden': !isSidebarOpen }">
    <aside class="sidebar">
      <NavLinks />

      <slot name="top" />

      <SidebarLinks :depth="0" :items="items" />
      <slot name="bottom" />
    </aside>
    <!-- 折叠按钮 -->
    <ToggleBtn @click.native="$emit('toggle-sidebar', !isSidebarOpen)" />
  </div>
</template>
<!-- js修改：新增prop，具体是isSidebarOpen -->
<script>
// @theme修改为@parent-theme
import SidebarLinks from "@parent-theme/components/SidebarLinks.vue";
import NavLinks from "@parent-theme/components/NavLinks.vue";
import ToggleBtn from "@theme/components/ToggleBtn.vue";

export default {
  name: "Sidebar",

  components: { SidebarLinks, NavLinks, ToggleBtn },

  props: ["items", "isSidebarOpen"],
};
</script>
<!-- 样式修改：left过渡、折叠按钮样式（包括hidden转态下的） -->
<style lang="stylus">
.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
  .nav-links
    display none
    border-bottom 1px solid $borderColor
    padding 0.5rem 0 0.75rem 0
    a
      font-weight 600
    .nav-item, .repo-link
      display block
      line-height 1.25rem
      font-size 1.1em
      padding 0.5rem 0 0.5rem 1.5rem
  & > .sidebar-links
    padding 1.5rem 0
    & > li > a.sidebar-link
      font-size 1.1em
      line-height 1.7
      font-weight bold
    & > li:not(:first-child)
      margin-top 0.75rem

@media (max-width: $MQMobile)
  .sidebar
    .nav-links
      display block
      .dropdown-wrapper .nav-dropdown .dropdown-item;ulpadding0margin0list-style-typenoneadisplayinline-block.nav-linksdisplaynoneborder-bottom1pxsolid$borderColorpadding0.5rem00.75rem0afont-weight600.nav-item,.repo-linkdisplayblockline-height1.25remfont-size1.1empadding0.5rem00.5rem1.5rem.sidebar-linkspadding1.5rem0lia.sidebar-linkfont-size1.1emline-height1.7font-weightboldli a.router-link-active::after
        top calc(1rem - 2px)
    & > .sidebar-links
      padding 1rem 0
</style>
