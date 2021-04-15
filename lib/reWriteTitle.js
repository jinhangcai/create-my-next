const fs = require('fs');

module.exports = function (title, localPath) {
    return new Promise((resolve, reject) => {
        const template = `<template>
  <el-menu class="navbar" mode="horizontal" >
    <hamburger :toggle-click="toggleSideBar" :is-active="true" class="hamburger-container"/>
    <breadcrumb />

    <h1 class="nav-title">${title}</h1>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :src="userInfo.avatar" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            返回主页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import {constantRouterMap} from '@/router'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      let initUserInfo = {
        username: '',
        nickname: '',
        email: '',
        avatar: '',
        phone: '',
        desc: '',
        sex: '',
        job: '',
        user_type: ''
      }

      this.$store.commit('CHANGE_USER_INFO', initUserInfo)
      this.$store.commit('CHANGE_ADD_ROUTES', [])
      this.$router.options.routes = constantRouterMap
      this.$router.push('/login')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .nav-title {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 400;
    font-size: 20px;
    margin: 0;
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

`
        fs.writeFile(localPath, template, function (err) {
            if(err){
                reject(err)
            }
            resolve();
        })

    })
}
