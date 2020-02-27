<template>
  <div class="register">
    <Header></Header>
    <h1>Register</h1>
    <p><span>username: </span> <el-input v-model="username"></el-input></p>
    <p><span>password: </span> <el-input show-password v-model="password"></el-input></p>
    <p><span>confirm password: </span><el-input show-password v-model="confirmPassword"></el-input></p>
    <p><span>gender: </span><el-radio v-model="gender" label="0">man</el-radio> <el-radio v-model="gender" label="1">woman</el-radio></p>
    <p><span>phone number: </span><el-input v-model="phoneNumber"></el-input></p>
    <el-button type="primary" round @click="submit">submit</el-button>
  </div>
</template>

<script>
import Header from './common/Header'
export default {
  name: 'register.vue',
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      gender: '0',
      phoneNumber: '',
      roles: ['user']
    }
  },
  methods: {
    async submit () {
      if (this.password !== this.confirmPassword) {
        this.$message({
          message: 'confirm password error!',
          type: 'warning'
        })
      } else {
        console.log(this.username, this.password, this.gender, this.phoneNumber)
        const user = {
          username: this.username,
          password: this.password,
          phoneNumber: this.phoneNumber,
          gender: this.gender,
          roles: this.roles
        }
        const res = this.$http.post('http://101.133.155.181:3000/user', user)
        if (res.status === 200 || res.status === 201) {
          this.$message({
            message: 'register success!',
            type: 'success'
          })
          this.$router.push('/login')
        } else {
          this.$message({
            message: 'register failed!',
            type: 'warning'
          })
        }
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
  .el-input {
    width: 150px;
  }
</style>
