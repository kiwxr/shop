<template>
    <div id="tab-bar">
      <tab-bar-item link="/home" class="col-xs-4" >
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item link="/cart" class="col-xs-4">
        <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item link="/profile" class="col-xs-4">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </div>
</template>

<script>
    import TabBarItem from "./TabBarItem";
    export default {
      name: "TabBar",
      components: {
        TabBarItem

      }
    }
</script>

<style scoped lang="less">
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    /*left: 0;*/
    /*right: 0;*/
    width: 100%;
    max-width: 1140px;
    min-width: 320px;
    box-shadow: 0 2rem / 37.5 1rem / 37.5 rgba(100,100,100,0.17);/*阴影*/
    }
</style>