<template>
  <div class="header">
    <el-menu class = "navigator" mode="horizontal" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title">{{title}}</template>
        <el-menu-item index="1-1">articles</el-menu-item>
        <el-menu-item index="1-2">photos</el-menu-item>
        <el-menu-item index="1-3">login</el-menu-item>
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
      }
    }
  }
}
</script>
<style scoped>
 .header {
 }
</style>
