<template>
  <el-col style="width:138px;border-right:1px solid #DCDFE6;">

    <div class="head-frame">
      <el-image :src="picUrl" class="el-image"></el-image>
    </div>
    <div style="margin-top:5px;" class="navigation-font"><span><b>{{username}}</b></span></div>

    <el-menu default-active="1" class="el-menu-vertical-demo"
             background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

      <el-menu-item index="1" @click="switchInfo">
        <i class="el-icon-menu"></i><span slot="title">个人信息</span>
      </el-menu-item>

      <el-menu-item index="2" @click="switchPass">
        <i class="el-icon-menu"></i><span slot="title">修改密码</span>
      </el-menu-item>

      <el-menu-item index="3" @click="switchStuList" v-if="Tab === 'teacher'">
        <i class="el-icon-setting"></i><span slot="title">查看学生</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    name: "NavMenu",
    props:['picUrl','username','Tab','switchInfo','switchPass','switchStuList'],
  }
</script>

<style scoped>
  .head-frame{
    background-color:black;overflow:hidden;border-radius:100%;width:70px;height:70px;display:inline-block;margin-top:5px;
  }
  .el-image{
    width:70px;height:70px;
  }
  .navigation-font{
    font-family: PingFang SC,serif;font-size:15px;color:black;
  }
</style>