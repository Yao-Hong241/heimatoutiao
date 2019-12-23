<template>
  <div>
    <div id="login">
      <el-card class="my-card">
          <img src="../../assets/logo_admin.png" alt="">
          <el-form :model="loginForm">
            <el-form-item>
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px;"></el-input>
              <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox :value="true">我已阅读和同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%">登 录</el-button>
            </el-form-item>
          </el-form>
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
      margin: 0 auto 30px;
    }
  }
}
</style>
