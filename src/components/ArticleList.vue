<template>
  <div class="article-list">
    <Header></Header>
    <div class="a-list">
      <el-row v-if="articles.length !== 0">
        <el-col :span="7" v-for="(article, index) in articles" :key="index" :offset="index > 0 ? 1: 0">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="getArticleDetail">
            <div style="padding: 14px;">
              <span>{{article.title}}</span>
              <div class = "bottom clearfix">
                <time class="time">创建时间: {{ new Date(parseInt(article.createdAt)).toLocaleString() }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Header from './common/Header'

export default {
  name: 'ArticleList',
  data () {
    return {
      articles: [],
      article: 'article'
    }
  },
  async created () {
    this.articles = await this.getArticles()
  },
  components: {
    Header
  },
  methods: {
    getArticles: async function () {
      const res = await this.$http.get('http://localhost:3000/article/all?p=1&ps=3')
      return res.data
    },
    getArticleDetail: async function () {
      this.$router.push('/article')
    }
  }
}
</script>

<style scoped>
  .a-list {
    position: relative;
    top:10px;
    padding: 2px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
