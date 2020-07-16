<template>
  <div class="container">
    <keep-alive exclude="Detail,Cart">
      <router-view></router-view>
    </keep-alive>
    <tab-bar class="row visible-xs"></tab-bar>
  </div>
</template>

<style lang="less">
  @import "assets/css/base.css";
  .zxc {
    background-color: #1ba160;
  }
  body {
    background-color: #d9efe4;;
  }
</style>
<script>
  import TabBar from "./components/common/tabbar/TabBar";
  export default {
    components: {TabBar}
  }

</script>