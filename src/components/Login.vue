<template>
  <div class="login">
    <h1>Log in page</h1>
    <p>
      用户名:
      <input v-model="username" placeholder="请输入用户名" />
    </p>
    <p>
      密码:
      <input type="password" v-model="password" placeholder="请输入密码" />
    </p>
    <p>{{ username }}</p>
    <p>{{ password }}</p>
    <button v-on:click="logon">log in</button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import router from "../router";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted: function() {},
  methods: {
    ...mapMutations(["ADD_TOKEN", "ADD_USER"]),
    logon: function() {
      if (!this.username || !this.password) return;
      const data = {
        username: this.username,
        password: this.password
      };
      this.axios
        .post("http://localhost:3000/auth/login", data)
        .then(res => {
          console.log(res.data.access_token);
          this.$cookies.set("token", res.data.access_token, 60 * 60 * 2);
          return res.data.access_token;
        })
        .then(res => {
          this.axios
            .get("http://localhost:3000/auth/profile", {
              headers: {
                Authorization: `Bearer ${res}`
              }
            })
            .then(res => {
              console.log(res.data);
              this.$cookies.set("user", JSON.stringify(res.data));
              console.log(this.$router);
              this.$router.push("/hello");
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped></style>
