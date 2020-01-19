<template>
  <div class = 'upload'>
    <div id="text-input">图片标题 <el-input v-model="title" placeholder="请输入图片标题"></el-input></div>
    <div id="text-input2">图片描述 <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="description">
    </el-input></div>
    <el-upload
      class="upload-img"
      ref="upload"
      action="http://localhost:3000/image/upload"
      :on-remove="handleRemove"
      :file-list="files"
      :before-upload="beforeUpload"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :auto-upload="false"
      :multiple="false">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      files: [],
      title: '',
      url: '',
      description: ''
    }
  },
  props: ['albumId'],
  methods: {
    submitUpload () {
      if (!this.$cookies.get('token')) {
        this.$message({
          type: 'warning',
          message: '请先登录'
        })
        return
      }
      this.$refs.upload.submit()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    beforeUpload (file) {
      if (!this.title) {
        this.$message({
          message: '请输入图片标题',
          type: 'warning'
        })
        return
      }
      console.log('before upload', file)
    },
    onChange (file, fileList) {
      console.log(file, fileList)
      this.files = fileList
    },
    async onSuccess (response, file, fileList) {
      // send http request, add photo to album
      this.url = response.url
      console.log(this.$cookies.get('token'))
      const res = await this.$http.post('http://localhost:3000/image/album/photo',
        {
          photo: {
            title: this.title,
            description: this.description,
            url: this.url,
            albumId: this.albumId
          }
        },
        { headers: {
          Authorization: `Bearer ${this.$cookies.get('token')}`
        }})
      if (res.status === 200) {
        console.log(res.data)
      } else {
        console.log(res.status, res.data)
      }
    },
    onError (err, file, fileList) {
      console.log(err)
      this.$message({
        message: '上传文件失败',
        type: 'error'
      })
    }
  }
}
</script>

<style scoped>
 .upload {
   position: relative;
   left: 40%;
   top: 30px;
   width: 20%;
 }
 .el-input {
   width: 50%;
 }
 #text-input2 {
   position: relative;
   top:10px;
 }
  .upload-img {
    position: relative;
    top:20px;
  }
</style>
