<template>
  <div id="home" >
    <!--    头部导航栏-->
    <div class="search-content row visible-xs hidden-lg">
      <a class="home-classify col-xs-1" href="#" @click="testClick"></a>
      <div class="home-search col-xs-9">
        <input class="home-search-text" type="text" value="搜索框禁用">
        <input class="home-search-button" type="button" value="搜索">
      </div>
      <a v-if="this.$store.state.userState" class="home-login col-xs-1" href="#" @click="goProfile"> 个人 </a>
      <a v-else class="home-login col-xs-1" href="#" @click="loginClick"><p>登录</p></a>
    </div>
<!--    better-scroll部分 距离上边65px-->
    <scroll
        class="content row visible-xs visible-lg col-xs-12"
        @scroll="contentScroll"
        ref="scroll"
        :probe-type="3"
        :pull-up-load="true">
      <!--        @pullingUp="loadMore" 上拉加载更多功能-->

      <!--  轮播图-->
      <home-swiper
          class="home-swiper row visible-xs"
          :banners="banners"
          />
      <!--  @swiperImageLoad.once="swiperImageLoad"-->

      <!--  快速访问-->
      <div class="fast-search row visible-xs" >
        <div class="fast-search-item col-xs-3 " v-for="item in fast">
          <img :src="item.img">
          <p>{{item.title}}</p>
        </div>
      </div>

      <!-- 商品列表-->
      <div class="tab-control" ref="tabControl"></div>
      <!--真商品列表-->
      <good-list :goods="goods"></good-list>

  </scroll>
    <!-- 回到顶部按钮-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import Scroll from "../../components/common/scroll/Scroll";
  import HomeSwiper from "../../components/common/swiper/HomeSwiper";
  import GoodList from "./GoodList";
  import BackTop from "../../components/common/bcakTop/BackTop";
  import { backTopMixin, imgListenerMixin } from "common/mixin";
  import {getHomeGoods} from "../../network/home";

  export default {
    name: "Home",
    components: {BackTop, GoodList, Scroll,HomeSwiper},
    computed: {},
    data() {
      return {
        fast: [{"img":"https://m.360buyimg.com/babel/s80x80_jfs/t1/99252/13/11946/18637/5e412631Ecf6310f7/320ad6fce983b9c3.jpg!q70.dpg","title":"寻鲜"},{"img":"https://m.360buyimg.com/babel/jfs/t1/87195/26/18594/15589/5e972b44Ef578f646/daf3dcd12bd9bd6d.png","title":"进口馆"},{"img":"https://m.360buyimg.com/babel/jfs/t1/117774/27/5598/7849/5eb5408fEb36319d0/8faf42a321c42497.png","title":"鲜味上新"},{"img":"https://m.360buyimg.com/babel/s80x80_jfs/t1/41188/30/6240/5961/5cfe3092E850858a9/dd0bb68087f3805c.jpg!q70.dpg","title":"中国特产"},{"img":"https://m.360buyimg.com/babel/s80x80_jfs/t1/48937/35/2912/7045/5d0b6e2aE0e804104/9bc8a882b83c2108.jpg!q70.dpg","title":"面点速食"},{"img":"https://m.360buyimg.com/babel/s80x80_jfs/t1/61550/22/2465/5654/5d0b6d2cEa24668b4/60cb6d4b585002df.jpg!q70.dpg","title":"蔬菜馆"},{"img":"https://m.360buyimg.com/babel/s80x80_jfs/t1/49107/14/3176/6019/5d0eea59E238562fd/2576bcda7fc37edd.jpg!q70.dpg","title":"水果乐园"},{"img":"https://m.360buyimg.com/babel/jfs/t1/85353/28/13900/8292/5e5f5e42E3a9ea4cb/935570a7385f64ed.png","title":"海产馆"}],
        banners: [{"img":"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2863163440,626045949&fm=26&gp=0.jpg"},{"img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594933570080&di=f74987732b23d1eee5153ae9e826532a&imgtype=0&src=http%3A%2F%2Fattach.wzdsb.net%2Fblog_attachment%2F201107%2F16%2F16783543_1310820130iqcb.jpg"},{"img":"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3085831768,1205067619&fm=26&gp=0.jpg"},{"img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594933636257&di=9155f1f7cf4e952826d6706b50cb761d&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2333163213%2C2035465067%26fm%3D214%26gp%3D0.jpg"}],
        goods: [],
        isShowBackTop: false,
        saveY: 0, //用于保存离开这个页面时的位置
      }
    },
    //混入通用的方法
    mixins: [imgListenerMixin, backTopMixin],
    methods: {
      /**
       * 事件监听
       */
      goProfile() {
        this.$router.replace('/profile')
      },
      //点击回到顶部
      backClick() {
        this.$refs.scroll.scrollTo(0,0,1000)
      },
      goBack () {
        this.$refs.scroll.scrollTo(0,this.$store.state.saveY,0)
        this.$refs.scroll.refresh()
      },
      //顶部登录按钮的监听
      loginClick() {
        this.$router.replace('/login')
      },

      //better-scroll 中监听事件
      contentScroll(position) {
        //1.判断backtop是否显示
        this.isShowBackTop = (-position.y) > 600 //位置大于多少时显示
      },

      /**
       * 网络请求
       */

      //请求商品数据
      toGetGoodList() {
        getHomeGoods().then(res => {
          // console.log(res)
          this.goods = res.product
          // console.log(this.goods)
          //拿到商品数据存到vuex中
          this.$store.commit('addGood',{
            goods:res
          })
        })
      },

      //轮播图事件
      // swiperImageLoad() {
      //   this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      // },
      //测试
      testClick() {
        console.log('当前用户状态')
        console.log(this.$store.state.userState)
        console.log(this.$store.state.userMessage)
        this.$router.push('order')
      }
    },
    //组件创建完成---生命周期函数
    created() {
      //组件创建请求数据
      this.toGetGoodList()
    },
    //模板挂载
    mounted() {
    },
    //更新
    updated() {
    },
    //组件销毁
    destroyed() {
      console.log('home')
    },
    //组件激活
    activated() {
      this.goBack()
    },
    //组件失活
    deactivated() {
      this.$store.state.saveY = this.$refs.scroll.scroll.y
    },

  }
</script>

<style scoped lang="less">
  #home {
    width: 100%;
  }
  /*搜索头部*/
  .search-content {
    display: flex;
    position: fixed;
    top: 0;
    height: 65px;
    width: 100%;
    background-color: #1ba160;
    z-index: 999;

    .home-classify {
      box-sizing: border-box;
      height: 70%;
      margin: 8px 2% 0px 2%;
      /*background-color: black;*/
      background: url("~assets/img/home/category.svg") no-repeat;
      background-size: 80%;
      background-position: center;
    }
    .home-search {
      height: 70%;
      margin-top: 8px;
      border-radius: 50px;
      /*border: 2px solid;*/
      background-color: white;
      .home-search-text {
        width: 89%;
        height: 98%;
        border-radius: 5px;
        border-right: 1px solid;
        padding-left: 10px;
      }
      .home-search-button {
        width: 11%;
        height: 98%;
        border-radius: 5px;
        background-color: white;
      }
    }
    .home-login {
      height: 70%;
      margin: 12px 2% 0px 2%;
      color: white;
      text-decoration: none;
      text-align: center;

    }
  }

  //滚动better-scroll控制滚动的范围部分
  .content {
    position: absolute;
    top: 65px;
    bottom: 49px;
    background-color:rgba(27, 161, 96,0.17);
    overflow: hidden;
    /*z-index: 9999;*/
  }

  //轮播图
  .home-swiper {
    height: 246px;
  }
  //快速访问部分 ->快速搜素某一类别商品
  .fast-search {
    text-align: center;
    color: black;
    background-color: white;
    box-shadow: 0 1px 2px rgba(100,100,100,0.37);
    .fast-search-item {
      height: 120px;
      margin-top: 10px;
      border:1px solid white;
    }
    .fast-search-item img {
      width: 80%;
      height: 80px;
    }
  }
</style>