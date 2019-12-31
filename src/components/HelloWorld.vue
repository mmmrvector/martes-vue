<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ access_token }}</h2>
    <h2>{{ user }}</h2>
  </div>
</template>

<script>
export default {
  name: 'hello',
  mounted () {
    if (this.$cookies.get('token') === null || this.$cookies.get('token') === '') {
      this.$router.push('/login')
    }
  },
  data () {
    return {
      msg: 'Welcome to Martes',
      access_token: this.$cookies.get('token'),
      user: this.$cookies.get('user')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
