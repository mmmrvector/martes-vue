<template>
  <div class="hello">
    <Header></Header>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Header from '../components/common/Header.vue';
export default {
  components: {
    Header
  },
  data () {
    return {
      msg: 'Welcome to Martes'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
 text-align: center;
}
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
