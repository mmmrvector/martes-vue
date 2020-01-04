<template>
  <div class="account">
    <Header></Header>
    <h1>account</h1>
    <p>username: {{user.username}}</p>
  </div>
</template>

<script>
import Header from './common/Header'
export default {
  name: 'Account',
  created () {
    if (!this.$cookies.get('token') || !this.$cookies.get('user')) {
      this.$message({
        message: '请先登录',
        type: 'warning'
      })
      this.$router.push({
        name: 'login',
        query: {
          from: 'account'
        }
      })
    }
  },
  data () {
    return {
      user: this.$cookies.get('user')
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
