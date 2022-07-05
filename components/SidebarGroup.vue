<!-- 修改了arrow的位置，从标题后方移至标题前方 -->
<template>
  <section
    class="sidebar-group"
    :class="[
      {
        collapsable,
        'is-sub-group': depth !== 0,
      },
      `depth-${depth}`,
    ]"
  >
    <RouterLink
      v-if="item.path"
      class="sidebar-heading clickable"
      :class="{
        open,
        active: isActive($route, item.path),
      }"
      :to="item.path"
      @click.native="$emit('toggle')"
    >
      <!-- arrow位置移动 -->
      <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
      <span>{{ item.title }}</span>
    </RouterLink>

    <p v-else class="sidebar-heading" :class="{ open }" @click="$emit('toggle')">
      <!-- arrow位置移动 -->
      <span v-if="collapsable" class="arrow" :class="open ? 'down' : 'right'" />
      <span>{{ item.title }}</span>
    </p>

    <DropdownTransition>
      <SidebarLinks
        v-if="open || !collapsable"
        class="sidebar-group-items"
        :items="item.children"
        :sidebar-depth="item.sidebarDepth"
        :initial-open-group-index="item.initialOpenGroupIndex"
        :depth="depth + 1"
      />
    </DropdownTransition>
  </section>
</template>
<!--  -->
<script>
// @theme修改为@parent-theme
import { isActive } from "@parent-theme/util";
import DropdownTransition from "@parent-theme/components/DropdownTransition.vue";

export default {
  name: "SidebarGroup",

  components: {
    DropdownTransition,
    // https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E5%BE%AA%E7%8E%AF%E5%BC%95%E7%94%A8
    SidebarLinks: () => import("@parent-theme/components/SidebarLinks.vue"),
  },

  props: ["item", "open", "collapsable", "depth"],

  methods: { isActive },
};
</script>

<style lang="stylus">
.sidebar-group
  .sidebar-group
    padding-left 0.5em
  &:not(.collapsable);.sidebar-grouppadding-left0.5em
    .sidebar-heading:not(.clickable)
      cursor auto
      color inherit
  // refine styles of nested sidebar groups
  &.is-sub-group
    padding-left 0
    & > .sidebar-heading
      font-size 0.95em
      line-height 1.4
      font-weight normal
      padding-left 2rem;
      &:not(.clickable)
        opacity 0.5
    & > .sidebar-group-items
      padding-left 1rem
      & > li > .sidebar-link;
        font-size: 0.95em;
        border-left none
  &.depth-2
    & > .sidebar-heading
      border-left none

.sidebar-heading
  color $textColor
  transition color .15s ease
  cursor pointer
  font-size 1.1em
  font-weight bold
  // text-transform uppercase
  padding 0.35rem 1.5rem 0.35rem 1.25rem
  width 100%
  box-sizing border-box
  margin 0
  border-left 0.25rem solid transparent
  &.open, &:hover
    color inherit
  /* 样式修改 */
  .arrow
    position absolute
    margin-left -0.65rem
    margin-top 0.4rem
  &.clickable
    &.active
      font-weight 600
      color $accentColor
      border-left-color $accentColor;none&.depth-2.sidebar-headingborder-leftnone.sidebar-headingcolor$textColortransitioncolor.15seasecursorpointerfont-size1.1emfont-weightboldtext-transformuppercasepadding0.35rem1.5rem0.35rem1.25remwidth100%box-sizingborder-boxmargin0border-left0.25remsolidtransparent&.open,
    &:hover
      color $accentColor

.sidebar-group-items
  transition height 0.1s ease-out
  font-size 0.95em
  overflow hidden
</style>
