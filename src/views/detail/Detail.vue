<template>
  <div id="detail">
    <div class="detail-top visible-xs">
      <div class="detail-top-back" @click="backToIndex"><</div>
      <div class="detail-top-title "@click="testClick">商品详情</div>
    </div>

      <div class="detail-show row visible-xs">
<!--        <img src="~assets/img/detail/detail.jpg">-->
        <img :src="imgChange(goodDetail.img)">
        <div>{{goodDetail.productName}}</div>
        <div>{{goodDetail.productInfo}}</div>
        <div>￥{{goodDetail.price}}</div>
      </div>


    <div class="detail-bottom visible-xs">
      <div class="detail-bottom-other">
        <div>客服</div>
        <div>店铺</div>
        <div>收藏</div>
      </div>
      <div class="detail-bottom-cart" @click="addCartClick">加入购物车</div>
    </div>
    <my-toast ref="toast"></my-toast>
  </div>
</template>

<script>
  import {addCart} from "../../network/cart";
  import {getDetail} from "../../network/detail";
  import MyToast from "../../components/common/toast/MyToast";

  export default {
    name: "Detail",
    components: {MyToast},
    data() {
      return {
        goodDetail: {}
      }
    },
    methods: {
      //返回首页
      backToIndex() {
        this.$router.back()
      },

      //加入购物车
      addCartClick() {
        //判断是否登录状态
        // let flag = false
        let userid = this.$store.state.userMessage.userID
        if(this.$store.state.userState == true) {
          //网络请求将添加的商品加入购物车列表
          addCart(userid,this.goodDetail.productID).then(res => {
            //返回新的购物车列表更新store中的购物车列表
            // console.log(res)
            this.$store.dispatch('refreshCartList',res.cartList)
            if(res.success)
              this.$refs.toast.toastShow('加入购物车成功', 1500)
            else this.$refs.toast.toastShow('该商品已在购物车', 1500)
          })
          //发送提示消息

        }else {
          this.$refs.toast.toastShow('请先登录', 1500)
        }
      },

      //图片处理
      imgChange(img) {
        if (img == 'img') {
          const image = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4023518671,639716770&fm=26&gp=0.jpg"
          return image
        } else {
          return img
        }
      },
      //test
      testClick() {
        console.log(this.$bus)
        console.log(this.$bus.$data)
      },
      toGetDetail() {
        // console.log(this.$store.state.goodIdTemp)
        getDetail(this.$store.state.goodIdTemp).then(res => {
          // console.log(res)
          this.goodDetail = res.productDetail[0]
          // console.log(this.goodDetail)
        })
      }
    },

    created() {
      // console.log(this.$store.state.goodIdTemp)
      this.toGetDetail()
    },
    deactivated() {
      console.log('销毁了')
    },
    // activated() {
    //   this.toGetDetail()
    // }
  }
</script>

<style scoped lang="less">
  .detail-top {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    width: 100%;
    background-color: #1ba160;
    box-shadow: 0 2px 5px gray;
    z-index: 99;

    .detail-top-back {
      float: left;
      height: 100%;
      width: 10%;
      /*background-color: red;*/
      padding: 0;
      text-align: center;
      line-height: 50px;
      font-size: 40px;
      border-right: 2px solid gray;
    }
    .detail-top-title {
      float: right;
      /*background-color: blue;*/
      height: 100%;
      width: 90%;
      padding-left: 30%;
      line-height: 50px;
      font-size: 25px;
      color: white;
    }
  }

  //中间图片部分
  .detail-show {
    position: fixed;
    overflow: hidden;
    height: cale(100%-110px);
    width: 100%;
    top: 55px;
    bottom: 55px;
    z-index: 1;

    div {
      text-align: center;
      line-height: 30px;
      font-size: 20px;
    }
    img {
      width: 100%;
    }
  }

  //底部
  .detail-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background-color: black;
    box-shadow: 0 -2px 5px gray;
    z-index: 999999;


    .detail-bottom-other {
      float: left;
      height: 100%;
      width: 60%;
      background-color: #1ba160;

      div {
        float: left;
        width: 33.3%;
        height: 100%;
        line-height: 50px;
        text-align: center;
        color: black;
        border-left: 2px solid gray;
      }
    }
    .detail-bottom-cart {
      float: right;
      height: 100%;
      width: 40%;
      background-color: red;
      color: white;
      text-align: center;
      line-height: 50px;
    }
  }
</style>