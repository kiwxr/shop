<template>
  <div id="order-show">
    <div class="order-img">
      <img src="~assets/img/profile/photo.jpg">图片
    </div>
    <div class="order-name">
      {{'订单编号：'+orderShow.orderID}}<br>
      {{'合计：'+'￥'+orderShow.total}}<br>
      {{state[orderShow.state]}}
    </div>
    <div class="change" @click="changeClick"><slot></slot></div>
    <my-toast ref="toast"></my-toast>
  </div>
</template>

<script>
  import {changOrder} from "../../../network/order";
  import MyToast from "../../../components/common/toast/MyToast";

  export default {
    name: "OrderShow",
    components: {MyToast},
    data() {
      return {
        state: ['待付款','待发货','待收货','待评价','待处理']
      }
    },
    props: {
      orderShow: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      changeClick() {
        let newState = 1+parseInt(this.orderShow.state)
        let that = this
        console.log(this.$store.state.userMessage.userID)
        console.log(this.orderShow.orderID)
        if(newState == 1) {//支付的情况
          changOrder(this.$store.state.userMessage.userID,this.orderShow.orderID,newState,this.orderShow.total).then(res => {
            console.log(res)
            if(res.isPay) {
              that.$refs.toast.toastShow('付款成功', 1000)
              this.$store.commit('refreshUserMessage',res.userDetail) //刷新个人信息
              this.$store.dispatch('refreshOrderList',res.orderList)
            }
            else {
              that.$refs.toast.toastShow('账户余额不足', 1000)
            }
          })
        }else { //非支付情况
          changOrder(this.$store.state.userMessage.userID,this.orderShow.orderID,newState,this.orderShow.total).then(res => {
            console.log(res)
            console.log(newState)
            console.log(typeof newState)
            this.$store.dispatch('refreshOrderList',res.orderList)
            if(newState == 2) that.$refs.toast.toastShow('商家已经发货', 1000)
            else if(newState == 3) that.$refs.toast.toastShow('确认收货成功', 1000)
            else if(newState == 4) that.$refs.toast.toastShow('一键评价完成', 1000)
          })
        }
      }
    },
    created() {
    }
  }
</script>

<style scoped lang="less">
  #order-show {
    position: relative;
    height: 100px;
    border-radius: 15px;
    margin: 10px 10px;
    background-color: rgba(100,100,100,0.17);

    .order-img {
      overflow: hidden;
      position: absolute;
      top: 10px;
      left: 15px;
      height: 80px;
      width: 80px;
      border-radius: 10px;

      img {
        width: 100%;
      }
    }

    .order-name {
      position: absolute;
      top: 25px;
      left: 100px;
      width: 200px;
      height: 50px;
      /*padding: 5px;*/
      /*background-color: white;*/
    }
    .change {
      position: absolute;
      /*width: 40px;*/
      height: 30px;
      right: 5px;
      bottom: 5px;
      text-align: center;
      line-height: 30px;
      padding: 0 2px;
      border-radius: 5px;
      /*background-color: black;*/
      background-color: rgba(100,100,100,0.27);
    }
  }
</style>