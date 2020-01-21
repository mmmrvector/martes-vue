<template>
  <div class="register">
    <Header></Header>
    <h1>Register</h1>
    <p>username: <el-input v-model="username"></el-input></p>
    <p>password: <el-input v-model="password" show-password></el-input></p>
    <p>confirm password: <el-input v-model="confirmPwd" show-password></el-input></p>
    <p>gender: <el-radio v-model="gender" label="0"></el-radio><el-radio v-model="gender" label="1"></el-radio></p>
    <p>phone number: <el-input v-model="phoneNumber"></el-input></p>
    <el-button type="primary" round @click="register">submit</el-button>
  </div>
</template>

<script>
import Header from './common/Header'
import config from './../../static/config'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      confirmPwd: '',
      gender: '0',
      phoneNumber: '',
      roles: ['user']
    }
  },
  methods: {
    async register () {
      if (this.username === '') {
        this.$message({
          message: 'username should not be null!',
          type: 'warning'
        })
      } else if (this.password === '') {
        this.$message({
          message: 'password should not be null!',
          type: 'warning'
        })
      } else if (this.password !== this.confirmPwd) {
        this.$message({
          message: 'confirm password error!',
          type: 'warning'
        })
      } else {
        const data = {
          username: this.username,
          password: this.password,
          gender: this.gender,
          phoneNumber: this.phoneNumber,
          roles: this.roles
        }
        const res = await this.$http.post(`${config.API_HOST}user`, data)
        if (res.status === 200 || res.status === 201) {
          this.$message({
            message: 'success',
            type: 'success'
          })
          this.$router.push('/login')
        } else {
          this.$message({
            message: 'register failed, please try again',
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
    width:150px;
  }

</style>
