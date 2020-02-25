<template>
    <div class="article">
      <Header></Header>
      <el-row>
        <el-col :span="18" style="height: 100%; overflow: auto">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-col>
        <el-col :span="6"><RightSideBar></RightSideBar></el-col>
      </el-row>
    </div>
</template>
<script>
import Header from '../components/common/Header';
import RightSideBar from '../components/common/RightSideBar';
export default {
  name: 'Article',
  components: {
    Header,
    RightSideBar
  }
};
</script>

<style scoped>

</style>
