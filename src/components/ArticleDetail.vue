<template>
    <div class="article-detail">
      <Header></Header>
      <div class="article">
        <!--在编辑模式下采用mavon-editor -->
        <!--<mavon-editor v-model="articleContent" :toolbars="markdownOption"/>-->
      </div>
    </div>
</template>

<script>
import Header from './common/Header'
export default {
  name: 'ArticleDetail',
  created () {
    // TODO get article by id
    console.log(this.$route.params.id)
  },
  data () {
    return {
      markdownOption: {
        bold: true
      },
      article: null,
      articleContent: '**This is an Article**'
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
