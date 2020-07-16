<template>
  <div id="goodlist" class="row visible-xs">
   <div class="goodsList visible-xs" v-for="(item,index) in goods">
     <div class="col-xs-6">
       <div class=" goodsList-out" @click="itemClick(index)">
         <div class="goods-img">
           <img :src="imgChange(item.img)">
         </div>
         <div class="goods-show">
           <div class="goods-text">{{item.productName}}</div>
           <div class="goods-price">￥{{item.price}}元</div>
         </div>
       </div>
     </div>
   </div>
  </div>
</template>

<script>

  export default {
    name: "GoodList",
    data() {
      return {
      }
    },
    props: {
      goods: {
        type: Array,
        default() {
          return [{"id":"1","img":"img","text":"kiwxr1","price":"99"},
            {"id":"2","img":"img","text":"kiwxr2","price":"99"},
            {"id":"3","img":"img","text":"kiwxr22","price":"99"},
            {"id":"4","img":"img","text":"kiwxr222","price":"99"},
            {"id":"5","img":"img","text":"kiwxr3","price":"99"},
            {"id":"6","img":"img","text":"kiwxr4","price":"99"},
            {"id":"7","img":"img","text":"kiwxr8","price":"99"},
            {"id":"8","img":"img","text":"kiwxr6","price":"99"},
            {"id":"9","img":"img","text":"kiwxr4","price":"99"},
            {"id":"10","img":"img","text":"kiwxr9","price":"99"}]
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      //点击跳转到详情页
      itemClick(index) {
        //记录详情页商品的id
        this.$store.commit('saveGoodId',this.goods[index].productID)
        this.$router.push('/detail/'+ this.goods[index].productID)

      },
      imgChange(img){
        if(img == 'img'){
          const  image = "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4023518671,639716770&fm=26&gp=0.jpg"
            return image
        }
        else {
          return img
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .goodsList {
    .goodsList-out {
      border: 1px solid;
      margin: 15px 0;
      border-radius: 5px;
      box-shadow: 2px 2px 5px rgba(100,100,100,0.57);
      overflow: hidden;
    }
    .goods-img {
      width: 100%;
      height: 240px;
      background-color: #1ba160;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .goods-show {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 50px;
      /*background-color: red;*/
      text-align: center;
    }
  }
</style>