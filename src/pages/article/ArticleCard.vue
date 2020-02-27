<template>
  <div class="article-card" style="height: 50%; width: 100%;min-width: 500px;min-height: 50px; border: 1px solid #eee">
    <span id="header"><slot name="header"></slot></span><br>
    <span id="created-at"><slot name="created-at" ></slot></span><br>
    <span id="article-abbreviation"><slot name="article-abbreviation"></slot></span><br>
  </div>
</template>

<script>
export default {
  name: 'ArticleCard'
};
</script>

<style scoped>
#header {
  color:#D2B48C;
  font-weight: 700;
  font-family: Avenir;
  margin:3px;
}
#created-at {
  margin: 3px;
}
#article-abbreviation {
  margin: 3px;
}
.article-card {
  margin: 2px;
}
</style>
