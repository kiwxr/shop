<template>
  <div>
    <div v-for="item in this.$store.state.toEvaluate">
      <order-show :order-show="item">
        <slot>评价</slot>
      </order-show>
    </div>
    <div v-show="this.$store.state.userState &&!this.$store.state.toEvaluate.length" class="tip">
      没有待评价的订单
    </div>
  </div>
</template>

<script>
  import OrderShow from "./OrderShow";
  export default {
    name: "ToEvaluate",
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