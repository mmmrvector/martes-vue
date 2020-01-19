<template>
  <div class="album-detail">
    <Header></Header>
    <div class="image-list">
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="(photo, index) in photos" :key="index">
          <el-image :src="photo.url" >{{photo.title}}</el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="add-photo">
      <el-button type="primary" icon="el-icon-picture"  round @click="add" v-if="!addPhoto">添加图片</el-button>
      <el-button type="warning" icon="el-icon-arrow-left" round @click="cancelAdd" v-if="addPhoto">取消添加</el-button>
      <Upload v-if="addPhoto" :album-id="albumDetail.album.id"></Upload>
    </div>
  </div>
</template>

<script>
import Header from './common/Header'
import Upload from './Upload'
export default {
  name: 'AlbumDetail',
  async created () {
    const id = this.$route.params.id
    const response = await this.$http.get(`http://localhost:3000/image/album/${id}`)
    this.albumDetail = response.data
    this.photos = this.albumDetail.photos
    this.urls = this.albumDetail.photos.map(photo => photo.url)
  },
  components: {
    Header,
    Upload
  },
  data () {
    return {
      albumDetail: null,
      photos: [],
      urls: [],
      addPhoto: false
    }
  },
  methods: {
    add () {
      this.addPhoto = true
    },
    cancelAdd () {
      this.addPhoto = false
    },
    uploadImage () {

    }
  }
}
</script>

<style scoped>
.album-detail {
  position: relative;
  text-align: center;
  height: 100%;
}
.image-list{
  position: relative;
  top:50px;
  left: 10%;
  width: 80%;
  margin:0;
  line-height: 100px;
}
.add-photo {
  position: relative;
  text-align: center;
  top:10px;
}
</style>
