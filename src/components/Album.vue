<template>
  <div class="album">
    <Header></Header>
    <div class = 'upload-image' type="flex" justify="space-between">
      <el-row type="flex" class="row-bg" justify="space-around"  v-if="albums.length !== 0" v-for="(albumRow, ind) in albumRows" :key="ind">
        <el-col :span="7" v-if="albumRows.length !== 0" v-for="(album, index) in albumRow" :key="index">
          <div class="album-detail">
            <el-card :body-style="{ padding: '0px' }">
            <img :src="album.cover?album.cover.url:defaultUrl" alt="nopic" class="image" width="100%">
            <div style="padding: 14px;">
              <span>{{ album.album.title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ album.album.createdAt}}</time>
                <el-button type="text" class="button" @click="viewAlbum(album.album.id)">查看相册</el-button>
              </div>
            </div>
          </el-card>
        </div>
        </el-col>
      </el-row>
      <div class="add-album">
        <el-button icon="el-icon-circle-plus" type="primary" @click="addAlbum">添加相册</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './common/Header'
import Upload from './Upload'
export default {
  name: 'album',
  async created () {
    //
    const res = await this.$http.get('http://localhost:3000/image/albums?p=1&ps=10')
    if (res.status === 200) {
      this.albums = res.data
      for (let i = 0; i < Math.ceil(this.albums.length / 3); i++) {
        const start = i * 3
        const end = start + 3
        this.albumRows.push(this.albums.slice(start, end))
      }
      console.log(this.albums)
    } else {
      console.log(res.status)
    }
  },
  components: {
    Header,
    Upload
  },
  data () {
    return {
      albums: [],
      albumRows: [],
      defaultUrl: 'http://img-url.mrvector.cn/Fup6fHfPpoGWgqjLPlT9KSU8CyqX'
    }
  },
  methods: {
    viewAlbum (id) {
      console.log(id)
      this.$router.push(`/album/${id}`)
    },
    addAlbum () {
      this.$message({
        message: '不要急嘛，这个功能还在开发中',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .add-album {
    position: relative;
    top:10px;
  }
</style>
