<template>
  <div>
    <div id="login">
      <el-card class="my-card">
          <img src="../../assets/logo_admin.png" alt="">
          <el-form ref="loginForm" status-icon :rules="loginRules" :model="loginForm">
            <el-form-item prop="mobile">
              <el-input  v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input  v-model="loginForm.code" placeholder="请输入验证码" style="width:238px;margin-right:10px;"></el-input>
              <el-button>发送验证码</el-button>
            </el-form-item>
            <el-form-item>
              <el-checkbox :value="true">我已阅读和同意用户协议和隐私条款</el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width:100%" @click="login()">登 录</el-button>
            </el-form-item>
          </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    const checkMobile = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      },
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          //   this.$http.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm
          //   ).then(res => {
          //     // res 是响应对象  res.data 是响应主体 将来会使用
          //     // res.data.data 就是用户信息
          //     // 存储用户信息
          //     store.setUser(res.data.data)

          //     this.$router.push('/')
          //   }).catch(e => {
          //     this.$message.error('手机号或验证码错误')
          //   })
          try {
            const res = await this.$http.post('authorizations', this.loginForm)
            store.setUser(res.data.data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
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
