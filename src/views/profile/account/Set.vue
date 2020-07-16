<template>
  <div id="set">
    <div class="back" @click="backClick">返回</div>
    <div class="message">
      <div class="icon">
        <div class="icon-position">
          <img src="~assets/img/profile/photo.jpg">
        </div>
        <div class="edit" @click="editMessage" v-if="isEdit">编辑</div>
<!--        <div class="edit" @click="updateMessage" v-else>取消</div>-->
        <div class="edit" @click="updateMessage" v-else>提交</div>
      </div>
      <div class="border-set">
        <div class="nickname">
          <span>昵称:</span><span v-if="isEdit">{{nickNameChange(this.$store.state.userMessage.nickName)}}</span><input type="text" v-else v-model="nickName">
        </div>
        <div class="introduce">
          <div style="flex: 2;">
            <span>个人介绍:</span>
          </div>
          <div style="flex: 8" class="text" v-if="isEdit">{{infoChange(this.$store.state.userMessage.userInfo)}}</div>
          <textarea style="flex: 8" class="text" v-else v-model="userInfo"></textarea>
        </div>
        <div class="address">
          <div style="flex: 1;"><span>收货地址:</span></div>
          <div style="flex: 9" class="text" v-if="isEdit" >
            <span >
              {{addressChange(this.$store.state.userMessage.address)}}<br>
            </span>
          </div>
          <div style="flex: 9" class="text" v-else>
            <div><span>xxxxxx省:</span><input type="text" v-model="province"></div>
            <div><span>xxxxxx市:</span><input type="text" v-model="city"></div>
            <div><span>xxxxxx区:</span><input type="text" v-model="area"></div>
            <div><span>详细位置:</span><input type="text" v-model="street"></div>
          </div>
        </div>
      </div>
      <div class="change">
        <div class="out" @click="logoutClick">退出登录</div>
      </div>
    </div>
    <my-toast ref="toast"/>
  </div>
</template>

<script>
  import  {editUserMessage} from "../../../network/set";
  import MyToast from "../../../components/common/toast/MyToast";
  export default {
    name: "set",
    components: {MyToast},
    data() {
      return {
        isEdit: true,
        nickName: '',
        userInfo: '',
        province: '',
        city: '',
        area: '',
        street: ''
      }
    },
    methods: {
      backClick() {
        this.isEdit = true
        this.$router.back()
      },
      logoutClick() {
        this.$store.commit('stateClear')
        this.$refs.toast.toastShow('退出登录成功', 1000)
        const that = this;
        setTimeout(() =>{
          that.$router.replace('/home')
        },1000)

      },
      editMessage() {
        this.isEdit = false
        console.log('编辑')
      },
      nickNameChange(data) {
        if(!data) return '还未设置昵称'
        else return data
      },
      infoChange(data) {
        if(!data) return '这人很懒，什么也没有留下'
        else return data
      },
      addressChange(data) {
        if(!data) return '还未设置收货地址'
        else return data
      },
      updateMessage() {
        this.isEdit = true
        console.log('提交')
        let edit = {}
        edit.userID = this.$store.state.userMessage.userID
        edit.oldPassword = this.$store.state.tempps
        edit.newPassword = this.$store.state.tempps
        edit.nickName = this.nickName
        edit.userInfo = this.userInfo
        edit.address = this.province+this.city+this.area+this.street
        if(!edit.nickName) edit.nickName = '默认昵称'
        if(!edit.userInfo) edit.userInfo = '这人很懒，什么也没有留下'
        if(edit.address) edit.address = '还未设置收货地址'

        //发送网络请求
        editUserMessage(edit).then(res => {
          this.$store.commit('refreshUserMessage',res.userDetail)
        })
      }

    }
  }
</script>

<style scoped lang="less">
  #set {
    position: relative;
  }
  .back {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    background-color: rgba(100,100,100,0.27);
  }
  .message {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    position: relative;
    top: 50px;
    height: 450px;
    background-color: rgba(103, 193, 149);
    border-radius: 20px;
    color: black;

    .icon {
      flex: 2;
      /*background-color: #1ba160;*/

      .icon-position {
        overflow: hidden;
        width: 80px;
        height: 80px;
        margin-top: 10px;
        margin-left: 20px;
        /*background-color: black;*/
        border-radius: 50px;
        border: 1px solid gray;

        img {
          width: 100%;
        }
      }

      .edit {
        position: absolute;
        top: 40px;
        right: 20px;
        width: 50px;
        height: 20px;
        /*background-color: black;*/
      }
    }
    .border-set {
      overflow: hidden;
      flex: 6;
      display: flex;
      flex-direction: column;
      width: 90%;
      height: 100%;
      margin-left: 15px;
      border: 1px solid white;
      border-radius: 5px;
    }
    .nickname {
      flex: 1;
      line-height: 50px;
      padding-left: 20px;
    }
    .introduce {
      flex: 2;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      .text {
        margin-right: 20px;
        margin-bottom: 5px;
        padding: 5px;
        border: 1px solid gray;
        border-radius: 5px;
      }
    }
    .address {
      flex: 3;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      .text {
        margin-right: 20px;
        margin-bottom: 5px;
        padding: 5px;
        border: 1px solid gray;
        border-radius: 5px;
      }
    }
    .change {
      flex: 1;
      .out {
        height: 60%;
        width: 40%;
        margin: 10px auto;
        background-color: gray;
        border: 2px solid rgba(100,100,100,0.5);
        border-radius: 5px;
        text-align: center;
        line-height: 30px;
        color: black;
      }
    }
  }
</style>