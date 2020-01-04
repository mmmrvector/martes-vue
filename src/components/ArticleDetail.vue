<template>
    <div class="article-detail">
      <Header></Header>
      <div class="article-show"  v-if="!editorMode">
        <div class ="article" v-html="articleContent" ></div>
        <el-button type="primary" round @click="edit">编辑</el-button>
        <!--在编辑模式下采用mavon-editor -->
      </div>
      <div class="article-edit" v-if="editorMode">
        <mavon-editor  v-model="articleEditContent" :toolbars="markdownOption" :scrollStyle="true" ref=md @save="$save"/>
        <el-button type="primary" round @click="$save">保存</el-button>
      </div>
    </div>
</template>

<script>
import Header from './common/Header'
// import hljs from 'highlight.js'
// marked插件用来显示md内容
import marked from 'marked'
export default {
  name: 'ArticleDetail',
  async created () {
    // TODO get article by id
    const id = this.$route.params.id
    console.log(this.$route.params.id)
    const res = await this.$http.get(`http://localhost:3000/article/${id}`)
    if (res.status === 200) {
      this.article = res.data
    } else {
      this.article = ''
    }
    this.articleContent = marked(this.article.content)
    this.articleEditContent = this.article.content
  },
  data () {
    return {
      markdownOption: {
        bold: true,
        save: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        italic: true
      },
      editorMode: false,
      article: null,
      articleContent: marked(''),
      articleEditContent: '',
      articleId: this.$route.params.id
    }
  },
  components: {
    Header
  },
  methods: {
    edit () {
      this.editorMode = true
    },
    // 绑定save方法
    async $save (value, render) {
      if (!this.$cookies.get('token')) {
        this.$message({
          message: '请先登录',
          type: 'warning'
        })
        this.$router.push({
          name: 'login',
          params: {
            id: this.$route.params.id
          },
          query: {
            from: 'article'
          }
        })
      } else {
        console.log(this.$cookies.get('user'))
        const data = {
          title: 'Martes-title',
          author: this.$cookies.get('user').username,
          content: this.articleEditContent,
          createdAt: this.article.createdAt ? this.article.createdAt : Math.floor(new Date().getTime() / 1000),
          updatedAt: Math.floor(new Date().getTime() / 1000),
          keywords: ['martes', 'plan', 'nestjs']
        }
        const res = await this.$http
          .post(`http://localhost:3000/article/${this.articleId}`, data, {
            headers: {
              Authorization: `Bearer ${this.$cookies.get('token')}`
            }
          })
        console.log(res)
        if (res.status === 200 || res.status === 201) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.editorMode = false
        } else {
          this.$message({
            message: '保存失败',
            type: 'warning'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.article-show {
  position: relative;
  text-align: left;
  margin: 2px;
  left:2%;
}
.article-detail {
}
</style>
