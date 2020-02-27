<template>
    <div class="article-list" style="width: 99%; height: 100%">
      <article-card style="width: 100%;height: 50%">
        <template v-slot:header>标题</template>
        <template v-slot:created-at>time</template>
        <template v-slot:article-abbreviation>article-abbreviation</template>
      </article-card>
      <article-card style="width: 100%;height: 50%">
        <template v-slot:header>标题</template>
        <template v-slot:created-at>time</template>
        <template v-slot:article-abbreviation>article-abbreviation</template>
      </article-card>
<!--      <router-link to="/articleDetail">aaa</router-link>-->
    </div>
</template>

<script>
import * as api from '../../api/article';
import ArticleCard from './ArticleCard';
export default {
  name: 'ArticleList',
  data () {
    return {
      total: 0,
      page: 1,
      articleList: []
    };
  },
  components: {
    ArticleCard
  },
  async created () {
    const articleListRes = await api.getArticleList(this.page).catch(err => {
      if (err.response.status >= 400 && err.response.status < 500) {
        this.$message({
          message: err.response.data.message,
          type: 'warning'
        });
      }
    });
    this.articleList = articleListRes.data.articles;
    this.total = articleListRes.data.total;
  },
  methods: {
    async findArticles (page) {
      const articleListRes = await api.getArticleList(page).catch(err => {
        if (err.response.status >= 400 && err.response.status < 500) {
          this.$message({
            message: err.response.data.message,
            type: 'warning'
          });
        }
      });
      this.articleList = articleListRes.data.articles;
      this.total = articleListRes.data.total;
      console.log(this.articleList);
    }
  }
};
</script>

<style scoped>

</style>
