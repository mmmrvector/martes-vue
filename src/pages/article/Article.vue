<template>
    <div class="article" style="height: 100%; width: 100%; overflow: auto; ">
      <el-container  style="height: 100%; border: 0px solid #eee; min-width: 1000px; width: 100%;">
        <el-header><Header></Header></el-header>
        <el-container>
          <el-aside width="45%" style="background-image: image('../../assets/side.jpg'); width:45%; height: 100%;">
            <img src="../../assets/side.jpg" width="100%" height="99%">
          </el-aside>
          <el-container style="width: 55%;height: 100%; overflow: auto;">
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>
<script>
import Header from '../../components/common/Header';
import RightSideBar from '../../components/common/RightSideBar';
export default {
  name: 'Article',
  components: {
    Header,
    RightSideBar
  }
};
</script>

<style scoped>
  html,body{
    height:100%;
    width:100%;
    overflow:hidden;
    margin:0;
    padding:0;
  }
</style>
