<template>
  <div id="register">
    <div class="register-back">
      <div @click="backIndex">返回</div>
    </div>
    <div class="register-box">
      <div class="register-head">用户注册</div>
      <div class="register-show">
        <input class="register-user" type="text" placeholder="请输入账号"v-model="userNameRegister">
        <div></div>
        <input class="register-pwd" type="password" placeholder="请输入密码" v-model="passwordRegister">
        <input class="register-pwd" type="password" placeholder="请再次输入密码">
        <input type="button" value="注册" @click="registerClick">
        <div class="register-to-login">
          <span>已有账号。</span><span>点击</span><span style="color: white" @click="goRegister"><u>登录</u></span>
        </div>
      </div>
    </div>
    <div>
      <my-toast ref="toast"></my-toast>
    </div>
  </div>
</template>

<script>
  import {register} from "../../../network/register";
  import MyToast from "../../../components/common/toast/MyToast";

  export default {
    name: "Register",
    components: {MyToast},
    data() {
      return {
        userNameRegister: '',
        passwordRegister: '',
      }
    },
    methods: {
      //界面按钮监听
      backIndex() {
        this.$router.replace('/home');
      },

      goRegister() {
        this.$router.replace('/login')
      },

      backToLogin() {
        this.$router.replace('/login')
      },
      testClick() {
        this.$refs.toast.toastShow('注册成功', 1500)
        const that = this;
        setTimeout(function () {
          that.backToLogin();
        },1600)
      },

      //网络请求
      registerClick() {
        console.log(this.userNameRegister)
        console.log(this.passwordRegister)
        register(this.userNameRegister,this.passwordRegister).then(res => {
          if(res.registerState == true) {
            this.$refs.toast.toastShow('注册成功', 1500)
            const that = this;
            setTimeout(() =>{
              that.backToLogin()
            },1500)

          }
          else {
            this.$refs.toast.toastShow('注册失败', 1500)
          }
        })
      }
      },



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
      height: 60%;
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