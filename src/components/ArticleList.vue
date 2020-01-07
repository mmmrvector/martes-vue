<template>
  <div class="article-list">
    <Header></Header>
    <el-button class="edit-button" type="primary" icon="el-icon-edit" @click="writeDownArticle"></el-button>
    <div class="a-list">
      <el-row v-if="articles.length !== 0">
        <el-col :span="7" v-for="(article, index) in articles" :key="index" :offset="index > 0 ? 1: 0">
          <el-card :body-style="{ padding: '0px' }" shadow="hover" @click="getArticleDetail">
            <div style="padding: 14px;">
              <span>{{article.title}}</span><br/>
              <span>by {{article.author}}</span>
              <div class = "bottom clearfix">
                <time class="time">创建时间: {{ new Date().toLocaleString() }}</time>
                <el-button type="text" class="button" @click="getArticleDetail(article._id)">查看</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row v-if="articles.length === 0">
        <p>There is no articles.</p>
        <p>Why not write down your thinkings?</p>
        <el-button type="primary" icon="el-icon-edit" @click="writeDownArticle"></el-button>
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
      const p = this.$route.query.p || 1
      const ps = this.$route.query.ps || 3
      const res = await this.$http.get(`http://101.133.155.181:3000/article/all?p=${p}&ps=${ps}`)
      return res.data
    },
    getArticleDetail: async function (id) {
      this.$router.push(`/article/${id}`)
    },
    writeDownArticle () {
      if (this.$cookies.get('token') === null) {
        this.$message({
          message: 'please login first!',
          type: 'warning'
        })
        setTimeout(() => {
          this.$router.push({
            name: 'login',
            query: {
              from: 'articles'
            }
          })
        }, 1000)
      } else {
        this.$router.push('/article/newarticle')
      }
    }
  }
}
</script>

<style scoped>
  .edit-button {
    position: relative;
    top:10px;
  }
  .a-list {
    position: relative;
    top:20px;
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
