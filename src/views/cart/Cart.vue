<template>
  <div id="cart">
    <div class="cart-top">
      <div>购物车</div>
    </div>

    //better-scroll控制
    <scroll class="row content">
      <div v-if="this.$store.state.userState">
        <div class="cart-none-text" v-show="this.$store.state.cartList.length==0">
          <img src="~assets/img/noneGood.png" style="width: 100%">
        </div>
        <div v-for="(item,index) in (this.$store.state.cartList)" >

<!--          //购物车子模块-->
          <div class="item-show">
            <div class="goods-item-left"><input type="checkbox" v-model:check="item.checked" @click="itemCheckClick(index)"></div>
            <div class="goods-item-center">
              <div><img :src="imgChange(item.message.img)"></div>
            </div>
            <div class="goods-item-right">
              <div class="goods-item-text">{{item.message.productName}}</div>
              <div class="goods-item-info">{{item.message.productInfo}}</div>
              <div class="goods-item-number">
                <div class="goods-item-price">￥{{item.message.price}}</div>
                <div class="goods-item-control">
<!--                  <div class="number-control">-</div><div class="goods-number">{{item.count}}</div><div class="number-control">+</div>-->
                  <div class="number-control" @click="subCount(index)">-</div><div class="goods-number">{{item.number}}</div><div class="number-control" @click="addCount(index)">+</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div v-else class="cart-none" @click="cartLogin">
        <div class="cart-none-text">
          <span>登录后可以同步购物车</span><div>登录</div>
        </div>
        <img src="~assets/img/cart.png">
      </div>
    </scroll>

    //底部结算栏
    <div class="cart-pay-bottom" v-show="state">
      <div class="cart-select" style="float: left">
        <input type="checkbox" id="selectAll" v-model:checked="checkAll" @click="checkAllClick"><label for="selectAll" >全选</label>
      </div>
      <div class="cart-delete" v-show="deleteShow" @click="deleteGood">删除</div>
      <div class="cart-pay" style="float: right">
        <span style="color: black" >合计:</span>
        <span>￥{{totalPrice}}</span>
        <div class="pay-button" @click="toBayClick">结算</div>
      </div>
    </div>
    <my-toast ref="toast"/>
  </div>
</template>

<script>
  import {deleteCart} from "../../network/cart";
  import {createOrder} from "../../network/order";
  import Scroll from "../../components/common/scroll/Scroll";
  import MyToast from "../../components/common/toast/MyToast";

  export default {
    name: "Cart",
    components: {MyToast, Scroll},
    data() {
      return {
        state: true ,
        checkNumber: 0,
        checkedGood: [],
        checkAll: false,
        totalPrice: 0,
        deleteShow: false,
      }
    },
    props: {
    },
    //方法
    methods: {
      //购物车中的 登录按钮
      cartLogin() {
        this.$router.push('/login')
      },
      findGood(id) {
        for(let i=0;i<this.checkedGood.length;i++){
          if(this.checkedGood[i] == id){
            this.checkedGood.splice(i,1)
            this.checkNumber--
            break
          }
        }
      },

      // 购物车全选模块
      checkAllClick() {
        this.checkAll = !this.checkAll
        if (this.checkAll) { //true
          this.checkedGood = []
          this.checkNumber = this.$store.state.cartList.length
          this.$store.state.cartList.forEach((item) => {
            item.checked = true
            this.checkedGood.push(item.productID)
          })
          // console.log(this.checkedGood)
          this.deleteShow = true
        } else { //false
          this.checkNumber = 0
          this.checkedGood = []
          this.deleteShow = false
          this.$store.state.cartList.forEach((item) => {
            item.checked = false
          })
        }
        // console.log(this.$store.state.cartList)
        if(this.$store.state.userState) {
          this.changeTotalPrice()
        }
      },
      itemCheckClick(index) {
        this.$store.state.cartList[index].checked = !this.$store.state.cartList[index].checked
        if (this.$store.state.cartList[index].checked) {
          this.checkNumber++
          this.checkedGood.push(this.$store.state.cartList[index].productID)
          this.deleteShow = true
          // console.log(this.checkedGood)
        } else {
          this.findGood(this.$store.state.cartList[index].productID)
          if(!this.checkNumber) this.deleteShow = false
          // console.log(this.checkedGood)
        }
        if (this.checkNumber == this.$store.state.cartList.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
        // console.log(this.$store.state.cartList[index])
        // console.log(this.checkNumber)
        this.changeTotalPrice()
      },
      addCount(index) {
        this.$store.commit('addCount', index)
        this.changeTotalPrice()
      },
      subCount(index) {
        if(this.$store.state.cartList[index].number == 1){
          this.$refs.toast.toastShow('已经是最少数量了', 1500)
        }else {
          this.$store.commit('subCount', index)
          this.changeTotalPrice()
        }
      },

      //购物车移除商品
      deleteGood() {
        deleteCart(this.$store.state.userMessage.userID,this.checkedGood).then(res => {
          console.log(res)
          //返回新的购物车列表更新store中的购物车列表
          this.$store.dispatch('refreshCartList',res.cartList)
          this.changeTotalPrice()
        })

        // this.checkAllClick()

      },
      //结算
      toBayClick() {
        if(!this.$store.state.userState) {
          this.$refs.toast.toastShow('请先登录', 1500)
          return;
        }
        console.log('结算')
        console.log(this.checkedGood)

        let addressTemp = this.$store.state.userMessage.address
        if(!addressTemp || addressTemp == '还未设置收货地址') {//判断地址是否存在
          this.$refs.toast.toastShow('还没有添加收货地址', 1500)
          const that = this;
          setTimeout(() =>{
            that.$router.push('/set')
          },1500)
          return
        }
        // console.log(this.$store.state.cartList)
        let payArray = []
        for(let i=0;i<this.checkedGood.length;i++){
          let temp = {}
          temp.productID = this.checkedGood[i]
          for(let j=0;j<this.$store.state.cartList.length;j++) {
            if(this.$store.state.cartList[j].productID == this.checkedGood[i]) {
              // console.log(this.$store.state.cartList[j])
              temp.number = this.$store.state.cartList[j].number
              temp.price = this.$store.state.cartList[j].message.price
              temp.adminID = this.$store.state.cartList[j].message.adminID
              payArray.push(temp)
            }
          }
          // console.log(payArray)
        }
        //地址存在则进行拼接 发送请求
        addressTemp = '福建农林大学'
        // addressTemp = addressTemp.province+addressTemp.city+addressTemp.area+addressTemp.street
        if(this.checkedGood.length) {
          createOrder(this.$store.state.userMessage.userID,payArray,this.totalPrice,addressTemp).then(res => {
            console.log(res)
            this.$store.dispatch('refreshCartList',res.cartList)
            this.$store.commit('refreshUserMessage',res.user[0])
            this.$store.dispatch('refreshOrderList',res.orderList)
            this.$refs.toast.toastShow('结算成功', 1500)
            this.changeTotalPrice()
          })
        }else {
          this.$refs.toast.toastShow('没有选中任何商品', 1500)
        }

        // this.$router.push('order')
      },
      teskClick() {
      },
      //计算价格
      changeTotalPrice() {
        let price = 0
        this.$store.state.cartList.forEach((item) => {
          if(item.checked == true){
            // price += item.count * Math.floor(Math.random() * 20)
            price += item.number * item.message.price
          }
        })
        this.totalPrice = Number(price).toFixed(2)
      },

      imgChange(img) {
        if (img == 'img') {
          const image = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4023518671,639716770&fm=26&gp=0.jpg"
          // const image = "~assets/img/cart.png"
          return image
        } else {
          return img
        }
      },

    },

    //计算属性
    computed: {
    },
    //组件创建完成---生命周期函数
    created() {
      //获取商品的数据
      // this.getAllCart()
      //将所有选中按钮初始化
      this.$store.state.cartList.forEach((item) => {
        item.checked = false
      })
      //初始化价格
      this.changeTotalPrice()
    },
    destroyed() {
      // console.log('123')
    },
    activated() {
      // this.getAllCart()
    },
    deactivated() {
      // console.log('888')
    }
  }

</script>

<style scoped lang="less">
  .cart-top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #67c195;
    box-shadow: 0 1px 3px gray;
    z-index: 9999;

    div {
      width: 100px;
      height: 100%;
      font-size: 25px;
      line-height: 60px;
      text-align: center;
      color: white;
    }
  }

  .cart-none {
    .cart-none-text {
      height: 50px;
      text-align: center;
      font-size: 15px;
      line-height: 50px;
      border-top: 1px solid white;

      div {
        float: right;
        height: 100%;
        width: 60px;
        background-color: lightgreen;
      }
    }
    img {
      width: 100%;
    }
  }

  //better-scroll
  .content {
    overflow: hidden;
    position: fixed;
    width: 100%;
    top: 60px;
    bottom: 101px;
    background-color: rgb(217, 239, 228);
  }
  .cart-pay-bottom {
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #67c195;
    border-top: 1px solid gray;
    box-shadow: 0 -1px 5px rgba(100,100,100,0.37);
    z-index: 99;

    .cart-select {
      height: 30px;
      margin-top: 10px;
      margin-left: 5px;
      font-size: 15px;
      text-align: center;
      line-height: 30px;
    }
    .cart-delete {
      float: left;
      height: 30px;
      margin-top: 10px;
      margin-left: 10px;
      font-size: 15px;
      text-align: center;
      line-height: 30px;
      color: red;
    }
    .cart-pay {
      /*justify-content: space-between;*/
      height: 40px;
      width: 220px;
      margin-top: 5px;
      margin-right: 5px;

      span {
        display: block;
        float: left;
        height: 30px;
        margin-top: 7px;
        font-size: 18px;
      }
      span:nth-child(2) {
        font-size: 15px;
        margin-top: 10px;
        color: red;
      }
      .pay-button {
        float: right;
        width: 70px;
        height: 40px;
        border-radius: 50px;
        text-align: center;
        line-height: 40px;
        color: white;
        background-color: red;
      }
    }
  }


  .item-show {
    display: flex;
    width: 94%;
    height: 150px;
    margin: 10px auto;
    border-radius: 10px;
    background-color: white;
    color: black;

    .goods-item-left {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

    }
    .goods-item-center {
      display: flex;
      /*justify-content: center;*/
      align-items: center;
      /*background-color: red;*/
      flex: 4;

      div {
        width: 90%;
        height: 90%;
        margin: 0;
        padding: 0;
        /*border: 1px solid gray;*/
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .goods-item-right {
      /*background-color: blue;*/
      flex: 7;
      display: flex;
      flex-direction: column;

      .goods-item-text {
        flex: 1;
        padding-top: 5px;
      }
      .goods-item-info {
        flex: 7;
        padding-top: 5px;
      }

      .goods-item-number {
        flex: 2;
        height: 30px;

        .goods-item-price {
          float: left;
          width: 60px;
          font-size: 15px;
          text-align: center;
          line-height: 30px;
          color: red;
          /*background-color: #1ba160;*/
        }
        .goods-item-control {
          box-sizing: border-box;
          float: right;
          width: 122px;
          border: 1px solid rgba(100,100,100,0.37);

          .number-control {
            float: left;
            height: 98%;
            width: 30px;
            background-color: white;
            text-align: center;
            line-height: 28px;
            font-size: 30px;
          }
          .goods-number {
            float: left;
            height: 100%;
            width: 60px;
            background-color: white;
            text-align: center;
            line-height: 30px;
            font-size: 15px;
            border-left: 1px solid rgba(100,100,100,0.17);
            border-right: 1px solid rgba(100,100,100,0.17);
          }
        }
      }
    }

  }
</style>