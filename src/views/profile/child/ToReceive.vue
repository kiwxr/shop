<template>
  <div>
      <div v-for="item in this.$store.state.toReceive">
        <order-show :order-show="item">
          <slot>收货</slot>
        </order-show>
      </div>
      <div v-show="this.$store.state.userState &&!this.$store.state.toReceive.length" class="tip">
        没有待收货的订单
      </div>`
  </div>
</template>

<script>
  import OrderShow from "./OrderShow";
  export default {
    name: "ToReceive",
    components: {OrderShow},
    props: {
      link: String,
    },
  }
</script>

<style scoped>
  .tip {
    padding: 10px;
    text-align: center;
    color: red;
  }

</style>