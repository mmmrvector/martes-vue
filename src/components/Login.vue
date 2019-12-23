<template>

  <div class="login">
    <h1>Log in page</h1>
    <p>用户名: <input v-model="username" placeholder="请输入用户名"></p>
    <p>密码: <input type ="password" v-model="password" placeholder="请输入密码"> </p>
    <p>{{username}}</p>
    <p>{{password}}</p>
    <button v-on:click="logon">log in</button>
    <p>{{access_token}}</p>
  </div>

</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      access_token: this.globalVar.access_token
    }
  },
  methods: {
    logon: function () {
      const data = {
        username: this.username,
        password: this.password
      }
      this.axios
        .post('http://localhost:3000/auth/login', data)
        .then(response => {
          this.access_token = response.data.access_token
          console.log(this.access_token)
        })
        .catch(function (err) {
          console.log(err.response)
          const res = err.response
          if (res.status === 401 && res.statusText === 'Unauthorized') {
            window.alert('密码错误')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
