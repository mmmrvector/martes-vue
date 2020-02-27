<template>
    <div class="article-list" style="width: 99%; height: 99%">
      <article-card style="width: 100%;height: 50%">
        <template v-slot:header>
          <span @click="handleClick"  style="cursor: pointer"> 醉后不知天在水</span>
        </template>
        <template v-slot:created-at>Feb 27, 2020</template>
        <template v-slot:article-abbreviation>aa</template>
      </article-card>
      <article-card style="width: 100%;height: 50%">
        <template v-slot:header>满船清梦压星河</template>
        <template v-slot:created-at>Feb 27, 2020</template>
        <template v-slot:article-abbreviation>{{testContent}}</template>
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
      articleList: [],
      testContent: 'adfadsssssssssssssssss<br>asdasdas'
    };
  },
  components: {s
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
    },
    async handleClick () {
      console.log('click test');
      this.$router.push('/articleDetail');
    },
    change () {

    }
  }
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
</style>
