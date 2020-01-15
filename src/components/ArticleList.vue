<template>
  <div class="article-list">
    <Header></Header>
    <el-button class="edit-button" type="primary" icon="el-icon-edit" @click="writeDownArticle"></el-button>
    <div class="a-list">
      <el-row v-if="articles.length !== 0" v-for="(article, index) in articles" :key="index">
        <el-col :span="20" offset="1">
          <div class="article-detail" >
            <el-link class = "el-link" :href="'http://www.mrvector.cn/#/article/'+article._id">
              <div class="link">{{article.title}}</div>
            </el-link>
            <div class="author">{{article.author}}</div>
          </div>
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
      article: 'article',
      hrefs: ['http://101.133.155.181/#/article/']
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
      const ps = this.$route.query.ps || 10
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
    text-align: left;
  }
  .el-link {
    text-align: left;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .article-detail{
    margin-top:10px;
    border: 1px solid gray;
    border-left: none;
    border-right: none;
  }
  .link {
    font-size:30px;
    text-align: left;
  }
  .author{
    position: relative;
    text-align: right;
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
