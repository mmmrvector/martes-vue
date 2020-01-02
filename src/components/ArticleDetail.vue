<template>
    <div class="article-detail">
      <Header></Header>
      <div class="article">
        <mavon-editor v-model="articleContent"/>
      </div>
    </div>
</template>

<script>
import Header from './common/Header'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: null,
      articleContent: '** This is an Article **'
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
