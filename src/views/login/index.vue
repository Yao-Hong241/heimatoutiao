<template>
  <div>
    <div id="login">
      <el-card class="my-card">
          <img src="../../assets/logo_admin.png" alt="">
          <el-form-itme>
            <el-input v-model="loginForm.mobile" placeholder="请输入手机号" style="margin-bottom:20px;"></el-input>
            <el-input v-model="code" placeholder="请输入验证码" style="width:238px;margin-right:10px;"></el-input>
            <el-button>发送验证码</el-button>
            <el-checkbox :value="true" style="margin-top: 30px;">我已阅读和同意用户协议和隐私条款</el-checkbox>
            <el-button type="primary" style="margin-top:30px;width:100%">登录</el-button>
          </el-form-itme>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
#login {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/timg.gif) no-repeat center / cover;
  .my-card {
    width: 400px;
    height: 350px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-55%);
    background: rgba(0,0,0,.3);
    border: 0;
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
