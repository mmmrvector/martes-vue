<template>
  <div class="header">
    <el-menu class = "navigator" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">{{title}}</template>
        <el-menu-item index="1-1">articles</el-menu-item>
        <el-menu-item index="1-2">photos</el-menu-item>
        <el-menu-item index="1-3">login</el-menu-item>
      </el-submenu>
      <el-submenu index="2" class="account">
        <template slot="title" icon="el-icon-user" @select="handleSelect"><i class="el-icon-user"></i></template>
        <el-menu-item index="2-1">account</el-menu-item>
        <el-menu-item index="2-2">logout</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'Martes'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      if (key === '1-1') {
        this.$router.push({
          path: '/articles',
          query: {
            p: 1, ps: 3
          }
        }).catch(err => err)
      } else if (key === '1-3') {
        this.$router.push('/login').catch(err => err)
      } else if (key === '2-1') {
        this.$router.push('/account')
      } else if (key === '2-2') {
        this.$cookies.remove('token')
        this.$cookies.remove('user')
        this.$router.push('/login')
      }
    }
  }
}
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
