<template>
  <div id="profile" >
    <div class="add-money row" v-show="showAddMoney">
     <div class="bgc-add">
       <input placeholder="请输入充值金额" v-model="addmoney"/>
       <div @click="cancelClick">取消</div>
       <div @click="submitClick">充值</div>
     </div>
    </div>
    <my-toast ref="toast"></my-toast>
    <div class="profile-top row">
      <div class="profile-photo"></div>
      <div class="profile-nickname">{{nickNameChange(this.$store.state.userMessage.nickName)}}</div>
      <div class="profile-introduce">{{infoChange(this.$store.state.userMessage.userInfo)}}</div>
      <div class="profile-money" v-show="this.$store.state.userState">余额:￥{{this.$store.state.userMessage.account}}</div>
      <div class="profile-up" v-show="this.$store.state.userState" @click="addClick">充值</div>
      <div class="profile-set" @click="setClick" v-show="this.$store.state.userState">设置</div>
    </div>
    <div class="profile-show">
      <div class="profile-show-name">我的订单</div>
      <div class="to-select">
        <div @click="activeClick1" :class="{'active':isActive1}">
          <img src="~assets/img/profile/to1.png">
        </div>
        <div @click="activeClick2" :class="{'active':isActive2}"> <img src="~assets/img/profile/to2.png"></div>
        <div @click="activeClick3" :class="{'active':isActive3}"> <img src="~assets/img/profile/to3.png"></div>
        <div @click="activeClick4" :class="{'active':isActive4}"> <img src="~assets/img/profile/to4.png"></div>
        <div > <img src="~assets/img/profile/to5.png"></div>
      </div>
      <scroll class="content">
        <router-view/>
      </scroll>
    </div>
  </div>
</template>

<script>
  import {addMoney} from "../../network/set";
  import Scroll from "../../components/common/scroll/Scroll";
  import MyToast from "../../components/common/toast/MyToast";
  export default {
    name: "Profile",
    components: {MyToast, Scroll},
    data() {
      return {
        showAddMoney: false,
        addmoney: '',
        isActive1: false,
        isActive2: false,
        isActive3: true,
        isActive4: false,
        isActive5: false,
      }
    },
    methods: {
      activeClick1() {
        this.isActive2 = false
        this.isActive3 = false
        this.isActive4 = false
        this.isActive1 = true
        this.$router.replace('/profile/topay')
      },
      activeClick2() {
        this.isActive1 = false
        this.isActive3 = false
        this.isActive4 = false
        this.isActive2 = true
        this.$router.replace('/profile/tosent')
      },
      activeClick3() {
        this.isActive2 = false
        this.isActive1 = false
        this.isActive4 = false
        this.isActive3 = true
        this.$router.replace('/profile/toreceive')
      },
      activeClick4() {
        this.isActive2 = false
        this.isActive3 = false
        this.isActive1 = false
        this.isActive4 = true
        this.$router.replace('/profile/toevaluate')
      },
      nickNameChange(data) {
        if(!data) return '还未设置昵称'
        else return data
      },
      infoChange(data) {
        if(!data) return '这人很懒，什么也没有留下'
        else return data
      },
      setClick() {
        this.$router.push('/set')
      },
      addClick() {
        console.log('我是充值')
        this.showAddMoney = true
      },
      cancelClick() {
        this.showAddMoney = false
      },
      submitClick() {
        addMoney(this.$store.state.userMessage.userID,this.addmoney).then(res => {
          // console.log(res)
          if(res.success) {
            this.$refs.toast.toastShow('充值成功', 1500)
          }else this.$refs.toast.toastShow('充值失败', 1500)
          this.$store.commit('refreshUserMessage',res.userDetail)
          this.showAddMoney = false
        })
      },
      testClick() {
        console.log('我是充值')
      }
    },
    created() {
      this.activeClick3()
    }
  }
</script>

<style scoped lang="less">
  .active {
    box-shadow: 1px 31px 1px red !important;
  }
  #profile {
  }
  .profile-top {
    position: relative;
    height: 200px;
    background-color: #67c195;

    .profile-photo {
      position: relative;
      top: 15px;
      left: 30px;
      width: 80px;
      height: 80px;
      border-radius: 80px;
      /*margin: 15px 0 0 30px;*/
      /*background-color: white;*/
      background: url("~assets/img/profile/photo.jpg") no-repeat;
      background-size: 100%;
    }

    .profile-nickname {
      /*background-color: white;*/
      position: relative;
      top: -65px;
      left: 100px;
      width: 100px;
      height: 40px;
      color: white;
      font-size: 15px;
      line-height: 40px;
      text-align: center;
    }
    .profile-introduce {
      position: absolute;
      top: 60px;
      left: 130px;
      width: 200px;
      height: 50px;
      color: black;
      font-size: 13px;
      /*line-height: 30px;*/
      /*background-color: white;*/
    }
    .profile-money {
      position: absolute;
      top: 100px;
      left: 120px;
    }
    .profile-up {
      position: absolute;
      top: 82px;
      right: 10px;
      width: 50px;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      text-align: center;
      color: red;
    }

    .profile-set {
      position: absolute;
      top: 30px;
      right: 10px;
      width: 50px;
      height: 50px;
      font-size: 15px;
      line-height: 50px;
      text-align: center;
      color: white;
      /*background: url("~assets/img/profile/set.jpg") no-repeat;*/
      /*background-size: 100%;*/
    }
  }

  .profile-show {
    overflow: hidden;
    position: absolute;
    top: 150px;
    width: 94%;
  }
  .profile-show-name {
    padding: 7px;
    height: 30px;
    font-size: 16px;
    border-radius: 10px 10px 0 0 ;
    background-color: white;
  }
  .to-select {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 80px;
    background-color: white;

    div {
      width: 50px;
      height: 60px;
      margin: 0 11px 0 0px;
      background-color: white;
      margin-bottom: 30px;

    }
    img {
      width: 150%;
      height: 150%;

    }
  }
  .content {
    overflow: hidden;
    /*position: absolute;*/
    /*top: 200px;*/
    height: 300px;
    background-color: white;
    border-radius: 0 0 10px 10px;
  }
  .add-money {
    position: absolute;
    z-index: 99999;
    height: 100%;
    width: 100%;
    background-color: rgba(100,100,100,0.27);

    .bgc-add {
      overflow: hidden;
      position: absolute;
      left: 50%-23px;
      top: 140px;
      width: 200px;
      height: 100px;
      background-color: #449fdb;
      border-radius: 10px;

      input {
        margin-top: 10px;
        height: 30px;
        width: 200px;
      }
      div {
        float: left;
        width: 100px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }

    }
  }
</style>