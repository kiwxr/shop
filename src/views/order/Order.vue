<template>
  <div id="order">
    <div class="back" @click="backClick">返回</div>
    <div class="out">
      <div class="order-message">
        <div><span>订单编号:  </span><span>202045</span></div>
        <div><span>订单日期:  </span><span>2020-7-1</span></div>
        <div><span>收货地址:  </span><span>福建省福州市仓山区上下店路福建农林大学</span></div>
      </div>
      <div style="flex: 1">
        <scroll class="scroll">
          <order-show>
          </order-show>
          <order-show>
          </order-show>
          <order-show>
          </order-show>
          <order-show>
          </order-show>

        </scroll>
      </div>
      <div>
        <div class="pay">
          <div @click="backClick">放弃支付</div>
          <div @click="payClick">支付</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import OrderShow from "../profile/child/OrderShow";
  export default {
    name: "Order",
    components: {OrderShow, Scroll},
    methods: {
      backClick() {
        this.$router.back()
      },
      payClick() {

      }
    }
  }
</script>

<style scoped lang="less">
  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: rgba(100,100,100,0.27);
  }
  .out {
    overflow: hidden;
    position: relative;
    color: white;
    height: 450px;
    width: 100%;
    margin-top: 35px;
    border-radius: 20px;
    background-color: rgba(66, 184, 131,0.8);
  }
  .order-message {
    margin-left: 10px;
    margin-top: 10px;
  }
  .scroll {
    overflow: hidden;
    display: block;
    height: 270px;
    margin-top: 10px;
    margin-bottom: 40px;
    /*background-color: black;*/
  }
  .pay {
    position: absolute;
    right: 0;
    bottom: 0;
    /*margin-right: 15px;*/

    div {
      float: left;
      width: 80px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: rgba(100,100,100,0.47);
    }
    div:nth-child(1){
      border-radius: 15px 0 0 0;
      border-right: 1px solid gray;
    }
  }
</style>