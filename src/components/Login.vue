<template>
  <div class="login">
    <Header></Header>
    <h1>Log in page</h1>
    <p>
      用户名:
      <el-input v-model="username" placeholder="请输入用户名" />
    </p>
    <p>
      密码:
      <el-input show-password v-model="password" placeholder="请输入密码" />
    </p>
    <el-button type="primary" round @click="logon">登录</el-button>
    <el-button type="primary" round @click="register">注册</el-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Header from './common/Header'
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted: function () {},
  components: {
    Header
  },
  methods: {
    ...mapMutations(['ADD_TOKEN', 'ADD_USER']),
    logon: function () {
      if (!this.username || !this.password) return
      const data = {
        username: this.username,
        password: this.password
      }
      this.axios
        .post('http://101.133.155.181:3000/auth/login', data)
        .then(res => {
          console.log(res.data.access_token)
          this.$cookies.set('token', res.data.access_token, 60 * 60 * 2)
          return res.data.access_token
        })
        .then(res => {
          this.axios
            .get('http://101.133.155.181:3000/auth/profile', {
              headers: {
                Authorization: `Bearer ${res}`
              }
            })
            .then(res => {
              console.log(res.data)
              this.$cookies.set('user', JSON.stringify(res.data))
              console.log(this.$router)
              console.log(this.$route)
              if (!this.$route.query.from) {
                this.$router.push('/')
              } else {
                this.$router.push({
                  name: this.$route.query.from,
                  params: {
                    id: this.$route.params.id
                  }
                })
              }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    },
    register () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 150px
}
</style>
