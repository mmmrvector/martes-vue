<template>
  <div class="register">
    <Header></Header>
    <h1>用户注册</h1>
    <span class="register-form">用户名:</span><el-input class="register-form" v-model="username"></el-input>
    <br>
    <span class="register-form" style="right: -5px">密 码:</span> <el-input class="register-form" style="left: 3px" v-model="password" show-password></el-input>
    <br>
    <span class="register-form" style="right: 20px">再次输入密码:</span> <el-input class="register-form" style=" left: -26px" v-model="confirmPwd" show-password></el-input>
    <br>
    <span class="register-form" style="right: 17px">性 别:</span> <el-radio class="register-form"  v-model="gender" label="男"></el-radio><el-radio v-model="gender" label="女"></el-radio>
    <br>
    <span class="register-form" style="right: 3px">手机号码:</span> <el-input class="register-form" style="left: -8px" v-model="phoneNumber"></el-input>
    <br>
    <el-button class="register-form" type="primary" @click="register">注册</el-button>
  </div>
</template>

<script>
import Header from '../components/common/Header';
import * as api from '../api/profile';
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      confirmPwd: '',
      gender: '男',
      phoneNumber: '',
      roles: ['user']
    };
  },
  methods: {
    async register () {
      if (this.username === '') {
        this.$message({
          message: '用户名不能为空',
          type: 'warning'
        });
      } else if (this.password === '') {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        });
      } else if (this.password !== this.confirmPwd) {
        this.$message({
          message: '两次输入的密码不同',
          type: 'warning'
        });
      } else {
        const data = {
          username: this.username,
          password: this.password,
          gender: this.gender === '男' ? 0 : 1,
          phoneNumber: this.phoneNumber,
          roles: this.roles
        };
        const res = await api.register(data, this.$cookies.get('token')).catch(err => {
          console.log(err.response);
          this.$message({
            message: err.response.data.message,
            type: 'error'
          });
        });

        if (!res) return;

        if (res.status === 200 || res.status === 201) {
          this.$message({
            message: '注册成功',
            type: 'success'
          });
          this.$router.push('/login');
        } else {
          this.$message({
            message: '注册失败，请重试',
            type: 'warning'
          });
        }
      }
    }
  },
  components: {
    Header
  }
};
</script>

<style scoped>
.el-input {
  width:150px;
}
.register {
  text-align: center;
}
.register-form {
  position: relative;
  margin: 10px;
}

</style>
