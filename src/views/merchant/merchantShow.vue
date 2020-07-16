<template>
  <div id="merchant-show">
    <div class="top-text row">{{this.$store.state.adminNickname}}</div>
    <div class="control-btn">
      <div @click="addShowClick">新增</div>
      <div @click="logoutClick">注销</div>
    </div>
    <scroll class="content row">
      <div v-for="(item,index) in this.$store.state.merchantGoodList" class="row goods-show">
        <div><img :src="item.img" class="img"></div>
        <div>商品名称:{{item.productName}}</div>
        <div>商品描述:{{item.productInfo}}</div>
        <div>商品价格:{{item.price}}</div>
        <div @click="deleteClick(index)" class="delete">删除</div>
      </div>
    </scroll>

<!--   新增商品-->
    <div v-show="addShow" class="add-out row">
      <input type="file" name="test" accept="image/gif, image/jpeg, image/png, image/jpg" class="imageLoad" @change="imageLoad">
      <input placeholder="请输入商品名称" v-model="productName"/><br>
      <input placeholder="请输入商品介绍" v-model="productInfo"/><br>
      <input placeholder="请输入商品价格" v-model="price"/><br>
      <span>tip:先上传图片，再完善商品信息！</span>
      <div class="btn-out">
        <div @click="addClick">添加</div>
        <div @click="cancelClick">取消</div>
      </div>

    </div>


    <div class="merchant-tab row">
      <div>店铺商品</div>
      <div @click="tabClick">店铺订单</div>
    </div>

  </div>
</template>

<script>
  import {upload, addGood, deleteGood} from "../../network/merchant";
  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "merchantShow",
    components: {Scroll},
    data() {
      return {
        productName: '',
        productInfo: '',
        price: '',
        deleteTemp: '',
        addShow: false
      }
    },
    methods: {
      //页面跳转
      tabClick() {
        this.$router.push('/merchant/order')
      },
      //添加商品模块
      imageLoad(event) {
        event.preventDefault()
        let imgFile = event.target.files[0]; //获取图片文件
        let formData = new FormData()
        formData.append('file',imgFile); //通过append向form对象添加数据
        // console.log(formData.get("file")); 私有累访问
        upload(formData).then(res => {
          console.log(res)
        })
      },
      addShowClick() {
        this.addShow = true
      },
      addClick() {
        let temp = {}
        temp.productName = this.productName
        temp.productInfo = this.productInfo
        temp.price = this.price
        temp.adminID = this.$store.state.adminID
        console.log(temp)
        addGood(temp).then(res => {
          console.log(res)
          this.$store.dispatch('refreshMerchantGoodList',res.productList)
          this.addShow = false
        })
      },
      cancelClick() {
        this.addShow = false
      },
      deleteClick(index) {
        console.log(this.$store.state.adminID)
        console.log(this.$store.state.merchantGoodList[index].productID)
        deleteGood(this.$store.state.adminID,this.$store.state.merchantGoodList[index].productID).then(res => {
          console.log(res)
        })
      },
      logoutClick() {
        console.log('注销')
        this.$store.commit('cancelMerchantLogin')
        this.$router.replace('/merchant/login')
      }
    }
  }
</script>

<style scoped lang="less">
  #merchant-show {
  }
  .top-text {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: black;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid lightgreen;
    margin-left: 3px;
    /*background-color: rgba(100,100,100,0.37);*/
  }
  .control-btn {
    height: 30px;
    margin-left: 3px;
    width: 100%;
    div {
      float: left;
      height: 30px;
      width: 100px;
      text-align: center;
      line-height: 30px;
      background-color: rgba(100,100,100,0.27);
    }
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 80px;
    bottom: 51px;
    width: 100%;
    background-color:rgba(27, 161, 96,0.17);

  }
  .goods-show {
    position: relative;
    background-color: rgba(33, 66, 131,0.17);
    padding: 20px;
    margin: 5px 0;
    .img {
      width: 60px;
      height: 60px;
    }
    .delete {
      position: absolute;
      right: 10px;
      top: 60px;
      font-size: 15px;
    }
  }

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
      color: red;
      border-left: 1px solid black;
    }
    div:nth-child(2){
      color: black;
    }
  }
  .add-out {
    position: fixed;
    top: 0;
    bottom: 50px;
    width: 100%;
    background-color:rgba(27, 161, 96,0.77);

    input:nth-child(1) {
      margin-top: 100px;
    }
    input {
      width: 70%;
      height: 50px;
      text-align: center;
      margin-bottom: 20px;
      margin-left: 50px;
    }
    span {
      display: block;
      text-align: center;
      margin-left: 30px;
      color: red;
    }
    .btn-out {
      width: 70%;
      height: 50px;
      text-align: center;
      margin-bottom: 20px;
      margin-left: 50px;
      background-color: gray;
      color: black;
      line-height: 50px;
      font-size: 15px;

      div {
        float: left;
        width: 50%;
      }
    }
  }
</style>