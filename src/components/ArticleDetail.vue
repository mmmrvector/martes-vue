<template>
    <div class="article-detail">
      <Header></Header>
      <div class="article-show"  v-if="!editorMode">
        <mavon-editor class="md-show" v-model="articleEditContent" :toolbarsFlag="false" :scrollStyle="true" :subfield="false" defaultOpen="preview" ref=md @save="$save"/>
        <div class="edit-button" v-if="this.$cookies.get('user') !== null && this.$cookies.get('user').userId === this.authorId" >
          <el-button type="primary" round @click="edit">编辑</el-button>
        </div>
        <!--在编辑模式下采用mavon-editor -->
      </div>
      <div class="article-edit" v-if="editorMode">
        <el-input v-model="title" placeholder="please input your article title"></el-input>
        <mavon-editor class="mavonEditor" v-model="articleEditContent" :toolbars="markdownOption" :scrollStyle="true" defaultOpen="preview" ref=md @save="$save"/>
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
    if (id === 'newarticle') {
      console.log('for debug', id)
      this.editorMode = true
    } else {
      const res = await this.$http.get(`http://101.133.155.181:3000/article/${id}`).catch(err => console.log(err))
      if (res.status === 200) {
        this.article = res.data
      } else {
        this.article = ''
      }
      console.log(this.article)
      this.title = this.article.title
      this.authorId = this.article.authorId
      this.articleContent = marked(this.article.content)
      this.articleEditContent = this.article.content
    }
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
        italic: true,
        preview: true
      },
      title: '',
      editorMode: false,
      preview: 'preview',
      article: null,
      authorId: -1,
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
    checkEditAuth () {
      const user = this.$cookies.get('user')
      console.log('for debug', user)
      if (user.userId !== this.authorId) return false
      else return true
    },
    // 绑定save方法
    async $save (value, render) {
      if (!this.$cookies.get('token')) {
        this.$message({
          message: 'please login first',
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
      } else if (this.articleId !== 'newarticle') {
        console.log(this.$cookies.get('user'))
        if (this.title === '') {
          this.$message({
            message: 'Title should not be null!',
            type: 'warning'
          })
          return
        }
        const data = {
          title: this.title,
          author: this.$cookies.get('user').username,
          authorId: this.$cookies.get('user').userId,
          content: this.articleEditContent,
          createdAt: this.article.createdAt ? this.article.createdAt : Math.floor(new Date().getTime() / 1000),
          updatedAt: Math.floor(new Date().getTime() / 1000),
          keywords: ['martes', 'plan', 'nestjs']
        }
        const res = await this.$http
          .post(`http://101.133.155.181:3000/article/${this.articleId}`, data, {
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
      } else {
        if (this.title === '') {
          this.$message({
            message: 'Title should not be null!',
            type: 'warning'
          })
          return
        }
        const data = {
          title: this.title,
          author: this.$cookies.get('user').username,
          authorId: this.$cookies.get('user').userId,
          content: this.articleEditContent,
          createdAt: Math.floor(new Date().getTime() / 1000),
          updatedAt: Math.floor(new Date().getTime() / 1000),
          keywords: []
        }
        const res = await this.$http
          .post(`http://101.133.155.181:3000/article`, data, {
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
          this.$router.push(`/article/${res.data._id}`)
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
.article-edit {
  postition: relative;
  text-align: left;
}
.article-edit .el-input {
  position: relative;
  left: 10px;
  top: 10px;
  width: 400px;
}
.mavonEditor {
  position: relative;
  top: 20px;
  left: 10px;
  width: 80%;
  height: 300px;
}
.article-edit .el-button {
  position: relative;
  top: 30px;
  left: 10px;
}
  .md-show {
    position: relative;
    top:10px;
    width: 80%;
    height: 300px;
  }
  .edit-button {
    position:relative;
    top:20px;
  }
</style>
