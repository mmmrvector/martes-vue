<template>
  <div class="header" v-if="isShowHeader">
    <h1>{{ title }}</h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "这是一个header"
    };
  }
};
</script>
<style scoped>
</style>