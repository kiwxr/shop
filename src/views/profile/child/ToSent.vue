<template>
  <div>
    <div v-for="item in this.$store.state.toSent">
      <order-show :order-show="item">
        <slot>提醒发货</slot>
      </order-show>
    </div>
    <div v-show="this.$store.state.userState &&!this.$store.state.toSent.length" class="tip">
      没有待发货的订单
    </div>
  </div>
</template>

<script>
  import OrderShow from "./OrderShow";
  export default {
    name: "ToSet",
    components: {OrderShow}
  }
</script>

<style scoped>
  .tip {
    padding: 10px;
    text-align: center;
    color: red;
  }
</style>