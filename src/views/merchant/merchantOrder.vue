<template>
  <div>
    <div>该功能暂时屏蔽</div>
    <div class="merchant-tab row">
      <div @click="tabClick">店铺商品</div>
      <div>店铺订单</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "merchantOrder",
    methods: {
      tabClick() {
        this.$router.push('/merchant/show')
      }
    }
  }
</script>

<style scoped lang="less">
  .merchant-tab {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: rgb(214, 214, 214);
    z-index: 9999999999;

    div {
      float: left;
      width: 49%;
      text-align: center;
      line-height: 50px;
      font-size: 15px;
    }
    div:nth-child(1){
      color: black;
      border-left: 1px solid black;
    }
    div:nth-child(2){
      color: red;
    }
  }
</style>