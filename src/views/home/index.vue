<template>
  <div>
    <el-container class="container-home">
      <el-aside :width="isOpen ? '200px' : '64px'">
        <div class="logo" :class="{minlogo:!isOpen}"></div>
        <el-menu
          :default-active="$route.path"
          background-color="#002030"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="!isOpen"
          :collapse-transition = 'false'
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-present"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/setting">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span @click="toggleAside" class="el-icon-s-fold icon"></span>
          <span class="text">江苏传智播客科技教育有限公司</span>
          <el-dropdown @command="handler">
            <span class="el-dropdown-link">
              <img :src="photo" alt />
              <span class="cai">{{name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
              <el-dropdown-item command="logout" icon="el-icon-switch-button">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import store from '@/store'
import eventBus from '@/eventBus'
export default {
  data: function () {
    return {
      isOpen: true,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
    // 绑定事件，先绑定后触发，越早绑定越好。
    eventBus.$on('updateUserName', (name) => {
      this.name = name
    })
    eventBus.$on('updateUserPhoto', (photo) => {
      this.photo = photo
    })
  },
  methods: {
    toggleAside () {
      this.isOpen = !this.isOpen
    },
    // 去个人设置
    setting () {
      this.$router.push('/setting')
    },
    // 退出登录
    logout () {
      store.delUser()
      this.$router.push('/login')
    },
    // 处理指令函数
    handler (command) {
      this[command]()
    }
  }
}
</script>

<style lang="less" scoped>
.container-home {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .el-aside {
    background: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(../../assets/logo_admin.png) no-repeat center /
        140px auto;
    }
    .minlogo {
      background: #002244 url(../../assets/logo_admin_01.png) no-repeat center;
      background-size: 36px;
    }
    .el-menu {
      border-right: 0;
    }
  }
  .el-header {
    height: 60px;
    width: 100%;
    border-bottom: 1px solid #ddd;
    .icon {
      font-size: 23px;
      vertical-align: middle;
      line-height: 60px;
      margin-right: 10px;
    }
    .text {
      font-size: 16px;
      vertical-align: middle;
      line-height: 60px;
    }
    .el-dropdown {
      float: right;
      line-height: 60px;
      .cai {
        cursor: pointer;
        font-weight: 700;
        font-size: 14px;
        vertical-align: middle;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
}
</style>
