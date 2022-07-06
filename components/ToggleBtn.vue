<template>
  <div class="sidebar-toggle">
    <div class="sidebar-toggle-button"><span></span><span></span><span></span></div>
  </div>
</template>

<script>
export default {
  name: "ToggleBtn",
};
</script>
<style lang="stylus" scoped>
.sidebar-toggle
    width 18px
    padding 10px
    text-align center
    opacity .8
    -webkit-transition left .4s, right .4s
    -o-transition left .4s, right .4s
    transition left .4s, right .4s
    cursor: pointer
    span
        display block
        background-color #42b983
        margin-bottom 4px
        width 16px
        height 2px
</style>
