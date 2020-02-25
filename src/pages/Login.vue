<template>
  <div class="login">
    <Header></Header>
    <h1>登录界面</h1>
    <div class="login-form">
      <span style="margin: 10px">用户名:</span>
      <el-input style="margin: 10px; position:relative; left: -5px;" v-model="username" placeholder="请输入用户名" />
      <br/>
      <span style="margin: 10px; position: relative; left: 7px;">密 码:</span>
      <el-input style="margin: 10px" show-password v-model="password" placeholder="请输入密码" />
      <br>
      <el-button type="primary" style="margin-top: 30px; margin-right: 20px"  @click="logon">登录</el-button>
      <el-button type="primary"  @click="register">注册</el-button>
    </div>
  </div>
</template>

<script>
import Header from '../components/common/Header';
import * as api from '../api/profile';
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    };
  },
  mounted: function () {},
  components: {
    Header
  },
  methods: {
    async logon () {
      if (!this.username || !this.password) return;

      const res = await api.login(this.username, this.password).catch(err => {
        console.log(err.response);
        this.$message({
          message: '用户名或密码错误',
          type: 'error'
        });
      });

      if (!res) return;

      // 登录成功，获取到token，记录进cookie中
      if (res.status === 200 || res.status === 201) {
        this.$cookies.set('token', res.data.access_token, 60 * 60 * 2);
        const userRes = await api.getProfile(this.$cookies.get('token')).catch(err => {
          console.log(err.response);
          this.$message({
            message: '获取用户信息失败',
            type: 'error'
          });
        });
        if (!userRes) return;
        this.$cookies.set('user', JSON.stringify(userRes.data));

        // 如果跳转到login时不带query.from参数，则跳转至首页
        if (!this.$route.query.from) this.$router.push('/');

        // 如果跳转到login时带query.from参数，则跳转至之前的页面
        else {
          this.$router.push({
            name: this.$route.query.from,
            params: this.$route.query.id
          });
        }
      }
    },
    register () {
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 150px
}
.login {
  text-align: center;
}
.login-form {

}
</style>
