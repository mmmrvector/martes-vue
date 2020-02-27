<template>
  <div class="article-card" style="height: 50%; width: 100%;min-width: 500px;min-height: 50px; border: 1px solid #eee">
    <span id="header"><slot name="header"></slot></span><br>
    <span id="created-at"><slot name="created-at" ></slot></span><br>
    <!--    TODO 解决换行问题-->
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
  font-weight: 900;
  font-size: 30px;
  font-family: Avenir;
  position: relative;
  top: 20%;
  margin-left: 10%;

}
#created-at {
  position:relative;
  top: 30%;
  font-weight: 700;
  font-family: Helvetica;
  margin: 3px;s
  margin-left: 10%;
}
#article-abbreviation {
  margin: 3px;
  position:relative;
  top: 40%;
  margin-left: 10%;
}
.article-card {
  margin: 2px;
}
</style>
