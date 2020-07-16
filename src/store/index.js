import Vue from 'vue'
import Vuex from 'vuex'
import {getDetail} from "../network/detail";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //有关登录状态的数据处理
    userState: false,
    storeGoods:[],
    userMessage: {"nickName":"请先登录","introduce":"什么也没有................"},
    cartList: [{"userId":"2020a1","goodId":"2","count":11,"message":{"info":"什么也没有","img":"img"}}],
    orderList: [{"goods":[],"orderID":"-1","total":"0","userID":"-1",}],
    toPay: [],
    toSent: [],
    toReceive: [],
    toEvaluate: [],
    tempps: '',
    saveY: 0,

    //商家部分
    adminID: '',
    adminNickname: '',
    merchantGoodList: [],
    merchantOrderList: [],

    //保存商品id
    goodIdTemp: -1,
    //common
    showTabBar: true

  },
  mutations: {
    //用户状态改变
    //非登录状态
    stateClear(state) {
      this.state.userState = false
      this.state.userMessage = {"nickName":"请先登录","introduce":"什么也没有................","address":""};
      this.state.cartList = [{"userId":"2020a1","goodId":"2","count":1,"message":{"info":"什么也没有","img":"img"}}];
      this.state.orderList = [{"goods":[],"orderID":"-1","total":"0","userID":"-1",}];
      this.dispatch('refreshOrderList',[])
    },
    //更新个人信息
    refreshUserMessage(state,userMessage) {
      this.state.userMessage = userMessage
    },

    //底部栏的显示和隐藏
    tabBarShow(state) {
      this.state.showTabBar = true
    },
    tabBarHidden(state) {
      this.state.showTabBar = false
    },

    //商品数据
    addGood(state,payload) {
      this.state.storeGoods = payload.goods
      // console.log(this.state.storeGoods)
    },

    //跳转到商品详情页之前保存该商品的id
    saveGoodId(state,id) {
      this.state.goodIdTemp = id
    },

    //查看购物车时对购物车列表添加商品信息2
    addGoodMessage(state,payload) {
      this.state.cartList[payload.index].message = payload.message
      console.log(this.state.cartList)
    },
    //购物车数量变换
    addCount(state,index) {
      this.state.cartList[index].number++
    },
    subCount(state,index) {
      this.state.cartList[index].number--
      if(this.state.cartList[index].number == 0) {
        this.state.cartList.splice(index,1)
      }
    },



    //商家部分
    //商家激活
    activeMerchant(state,Message) {
      this.state.adminID = Message.admin.adminID
      this.state.adminNickname = Message.admin.adminName
      this.state.merchantGoodList = Message.productList
      this.state.merchantOrderList = Message.orderList
    },
    //解除激活
    cancelMerchantLogin() {
      this.state.adminID = ''
      this.state.adminNickname = ''
      this.state.merchantGoodList = []
      this.state.merchantOrderList = []
    }
  },


  actions: {
    //用户状态改变1
    // 登录状态 开始激活
    startActive(state,payload) {
      this.state.userState = true;
      this.state.userMessage = payload.userMessage;
      this.dispatch('refreshCartList',payload.cartList)
      this.dispatch('refreshOrderList',payload.orderList)
    },

    //对购物车列表进行数据刷新
    refreshCartList(state,cartList) {
      // console.log(cartList)
      for (let i = 0; i < cartList.length; i++) {
        cartList[i].message = {"info":"default","img":"img","price":0,"text":"待加载"}
        getDetail(cartList[i].productID).then(res => {
          //state 中的cartlisth还是空的
          cartList[i].message = res.productDetail[0]
          //挂载信息后存储到store中
          console.log(cartList[i])
          // if(i == cartList.length)  this.state.cartList = cartList
        })

      }
      this.state.cartList = cartList
      // console.log(this.state.cartList)
    },
    //更新订单列表
    refreshOrderList(state,orderList) {
      this.state.orderList = orderList
      this.state.toPay = []
      this.state.toSent = []
      this.state.toReceive = []
      this.state.toEvaluate = []
      for (let i = 0; i < orderList.length; i++) {
        if(orderList[i].state == 0)
           this.state.toPay.push(orderList[i])
        else if(orderList[i].state == 1)
           this.state.toSent.push(orderList[i])
        else if(orderList[i].state == 2)
           this.state.toReceive.push(orderList[i])
        else if(orderList[i].state == 3)
           this.state.toEvaluate.push(orderList[i])
      }
      // console.log('代付款')
      // console.log(this.state.toPay)
      // console.log('代发货')
      // console.log(this.state.toSent)
      // console.log('代收货')
      // console.log(this.state.toReceive)
      // console.log('代评价')
      // console.log(this.state.toEvaluate)
    },
    //刷新商家商品列表
    refreshMerchantGoodList(state,productList) {
      this.state.merchantGoodList = productList
    }
  },
  getters: {},
  modules: {
  }
})
