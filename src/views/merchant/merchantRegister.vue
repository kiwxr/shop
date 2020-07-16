<template>
  <div id="register">
    <div class="register-back">
      <div @click="backClick">返回</div>
    </div>
    <div class="register-box">
      <div class="register-head">商家注册</div>
      <div class="register-show">
        <input class="register-pwd" type="text" placeholder="请输入店铺名称 tip:注册后不可更改" v-model="merchantNickname">
        <input class="register-user" type="text" placeholder="请输入账号"v-model="merchantNameRegister">
        <div></div>
        <input class="register-pwd" type="password" placeholder="请输入密码" v-model="merchantPasswordRegister">
        <input class="register-pwd" type="password" placeholder="商家邀请码" v-model="merchant">
        <input type="button" value="注册" @click="registerClick">
        <div class="register-to-login">
          <span>已有账号。</span><span>点击</span><span style="color: white" @click="goToLogin"><u>登录</u></span>
        </div>
      </div>
    </div>
    <div>
      <my-toast ref="toast"></my-toast>
    </div>
  </div>
</template>

<script>
  import MyToast from "../../components/common/toast/MyToast";
  import {merchantRegister} from "../../network/merchant";

  export default {
    name: "merchantRegister",
    components: {MyToast},
    data() {
      return {
        merchantNickname: '',
        merchantNameRegister: '',
        merchantPasswordRegister: '',
        merchant: ''
      }
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      goToLogin() {
        this.$router.push('/merchant/login')
      },
      registerClick() {
        if(!this.merchant) {
          return
        }
        merchantRegister(this.merchantNickname,this.merchantNameRegister,this.merchantPasswordRegister).then(res => {
          if(res.success) {
            this.$refs.toast.toastShow('注册成功', 1500)
            const that = this;
            setTimeout(() =>{
              that.goToLogin()
            },1500)

          }
          else {
            this.$refs.toast.toastShow('注册失败', 1500)
          }
        })
      }


    }
  }
</script>

<style scoped lang="less">
  #register {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .register-back {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;

    div {
      background-color: #999999;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 25px;
    }
  }
  .register-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50px;
    width: 80%;
    height: 600px;
    border-radius: 5px;
    background-color: rgba(27, 161, 96,0.9);

    .register-head {
      font-size: 20px;
      color: white;
    }
    .register-show {
      width: 90%;
      height: 80%;
      /*background-color: #999999;*/

      input {
        width: 100%;
        height: 50px;
        margin: 10px 0;
        border-radius: 10px;
        font-size: 15px;
      }
      .register-user,.register-pwd {
        padding-left: 10px;
      }
      .register-to-login {
        font-size: 15px;
      }

    }
  }
</style>