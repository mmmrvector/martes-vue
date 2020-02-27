<template>
    <div class="article" style="height: 100%; width: 100%; overflow: auto; ">
      <el-container  style="height: 100%; border: 1px solid #eee; min-width: 1000px; width: 100%; overflow: auto">
        <el-header><Header></Header></el-header>
        <el-container>
          <el-aside width="45%" style="width:45%; height: 100%; background-color: rgb(238, 241, 246)">
            aaaa
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
