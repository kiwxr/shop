<template>
  <div class="login">
    <div id="login">
      <div class="login-back">
        <div @click="backIndex">返回</div>
      </div>
      <div class="login-box">
        <div class="login-head">商家登录</div>
        <div class="login-show">
          <input class="login-user" type="text" placeholder="请输入账号" v-model="userNameLogin">
          <div></div>
          <input class="login-pwd" type="password" placeholder="请输入密码" v-model="passwordLogin">
          <input type="button" value="登录" @click="merchantLogin">
          <div class="login-to-register">
            <span>还没有账号?</span><span>点击</span><span style="color: white" @click="goRegister"><u>注册</u></span>
          </div>
        </div>
      </div>
      <my-toast ref="toast"></my-toast>
    </div>
  </div>
</template>

<script>
  import {merchantLogin} from "../../network/merchant";
  import MyToast from "../../components/common/toast/MyToast";

  export default {
    name: "merchantLogin",
    components: {MyToast},
    data() {
      return {
        userNameLogin: '',
        passwordLogin: ''
      }
    },
    methods: {
      //界面按钮监听
      backIndex() {
        this.$router.replace('/login');
      },

      goRegister() {
        this.$router.push('/merchant/register')
      },

      //网路请求--用户登录
      merchantLogin() {
        merchantLogin(this.userNameLogin,this.passwordLogin).then(res => {
          console.log(res)
          this.$store.commit('activeMerchant',res)
          this.$router.push('/merchant/show')
        })
      }
    }
  }
</script>

<style scoped lang="less">
  #login {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .login-back {
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
  .login-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50px;
    width: 80%;
    height: 600px;
    border-radius: 5px;
    background-color: #1ba160;

  .login-head {
    font-size: 20px;
    color: white;
  }
  .login-show {
    width: 90%;
    height: 60%;
  /*background-color: #999999;*/

  input {
    width: 100%;
    height: 50px;
    margin: 10px 0;
    border-radius: 10px;
    font-size: 15px;
  }
  .login-user,.login-pwd {
    padding-left: 10px;
  }
  .login-to-register {
    font-size: 15px;
  }
  }
  }
</style>