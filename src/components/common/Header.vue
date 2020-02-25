<template>
  <div class="header">
    <el-menu class = "navigator" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <template slot="title">{{title}}</template>
      </el-menu-item>
      <el-menu-item index="2">
        <template slot="title">文章</template>
      </el-menu-item>
      <el-menu-item index="3">
        <template slot="title">相册</template>
      </el-menu-item>
      <el-menu-item index="4">
        <template slot="title">留言板</template>
      </el-menu-item>
      <el-submenu index="5" class="account">
        <template slot="title" icon="el-icon-user" @select="handleSelect"><i class="el-icon-user"></i></template>
        <el-menu-item index="5-1">个人信息</el-menu-item>
        <el-menu-item index="5-2">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'Martes'
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1') {
        this.$router.push('/');
      } else if (key === '2') {
        this.$router.push({
          path: '/articles',
          query: {
            p: 1, ps: 10
          }
        }).catch(err => err);
      } else if (key === '3') {
        this.$router.push('/albums');
      } else if (key === '4') {
        this.$router.push('/comments').catch(err => err);
      } else if (key === '5-1') {
        this.$router.push('/account');
      } else if (key === '5-2') {
        this.$cookies.remove('token');
        this.$cookies.remove('user');
        this.$router.push('/login');
      }
    }
  }
};
</script>
<style scoped>
 .header {
 }
  .account {
    position: absolute;
    top:0%;
    right: 2%;
  }
</style>
