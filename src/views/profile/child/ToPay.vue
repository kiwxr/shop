<template>
  <div>
    <div v-for="item in this.$store.state.toPay">
      <order-show :order-show="item">
        <slot>支付</slot>
      </order-show>
    </div>
    <div v-show="this.$store.state.userState &&!this.$store.state.toPay.length" class="tip">
      没有待支付的订单
    </div>
  </div>
</template>

<script>
  import OrderShow from "./OrderShow";
  export default {
    name: "ToPay",
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