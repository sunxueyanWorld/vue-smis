<template>
  <div class="outermost-div">
    <div>
      <HeadlineName head-title="个人信息"></HeadlineName>
    </div>

    <div class="border-div">
      <el-row>
        <!-- 导航菜单 -->
        <el-col style="width:138px;border-right:1px solid #DCDFE6;">

          <div class="head-frame">
            <el-image :src="picUrl" class="el-image"></el-image>
          </div>
          <div style="margin-top:5px;" class="navigation-font"><span><b>{{userinfo.name}}</b></span></div>

          <el-menu  class="el-menu-vertical-demo"
                   background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">

            <el-menu-item  @click="switchInfo">
              <i class="el-icon-menu"></i><span slot="title">个人信息</span>
            </el-menu-item>

            <el-menu-item  @click="switchPass">
              <i class="el-icon-menu"></i><span slot="title">修改密码</span>
            </el-menu-item>

            <el-menu-item  @click="switchStuList" v-if="Tab === 'teacher'">
              <i class="el-icon-setting"></i><span slot="title">查看学生</span>
            </el-menu-item>
          </el-menu>
        </el-col>

        <el-col :span="20">
          <!-- 个人信息 -->
          <router-view></router-view>

<!--           修改/添加个人信息
          <el-row v-if="subTab === 'upInsStuInfo'">
            <UpInsStuInfo :stuInfo="stuInfo" :classList="classList" :imgIdList="imgIdList" :OTab="OTab" :switchStuList="switchStuList"></UpInsStuInfo>
          </el-row>-->
        </el-col>
      </el-row>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import HeadlineName from "./common/Headline";
  import PersonalInfo from "./UserInfo/PersonalInfo";
  import ChangePassword from "./UserInfo/ChangePassword";
  import StudentList from "./UserInfo/StudentList";
  import UpInsStuInfo from "./UserInfo/UpInsStuInfo";
  import NavMenu from "./UserInfo/NavMenu";

  axios.defaults.baseURL = 'http://localhost:8081/stu';

  export default {
    name: "UserInfo",
    components: {
      // eslint-disable-next-line vue/no-unused-components
      NavMenu,
      // eslint-disable-next-line vue/no-unused-components
      UpInsStuInfo,
      // eslint-disable-next-line vue/no-unused-components
      StudentList,
      // eslint-disable-next-line vue/no-unused-components
      ChangePassword,
      // eslint-disable-next-line vue/no-unused-components
      PersonalInfo,
      HeadlineName
    },
    data(){
      return{
        picUrl:'',                        // 头像

        userinfo:{                        // 个人信息列表
          number:'',                      // 学号/员工号
          name:'',                        // 姓名
          password:''                     // 密码
        },
      }
    },
    methods:{
      //发送请求获取个人头像
      getPictureVerificationCode(){
        axios({
          method: 'get',
          url: '/getPhoto/'+this.userinfo.number+'',
          responseType:'blob'//设置接收数据为对象
        }).then(response=>{
          this.picUrl = window.URL.createObjectURL(response.data);
        })
      },

      //给子组件绑定修改密码事件
      changePassword(newPassword){
        this.userinfo.password = newPassword;
        this.switchInfo();
      },

      //切换到个人信息组件
      switchInfo(){
        this.$router.push({
          name:'personalInfo',
          params:{
            UserInfo:this.userInfo,
            Tab:this.Tab,
          }
        })
      },
      //切换到修改密码组件
      switchPass(){
        this.$router.push({
          name:'changePassword',
          params: {
            userinfo:this.userinfo,
            changePassword:this.changePassword,
          }
        })
      },

      //切换到添加/修改学生信息组件
      switchTest(OTab,stuInfo){

        this.$router.push({
          name:'upInsStuInfo',
          params:{
            OTab:OTab,
            stuInfo:stuInfo,
            switchStuList:this.switchStuList
          }
        })
      },
      //切换到查看学生组件
      switchStuList(){
        this.$router.push({
          name:'studentList',
          params:{
            switchTest:this.switchTest
          }
        })
      },

      //自定义消息提示
      message(msg,type){
        this.$message({
          message:msg,    //消息
          showClose: true,//是否可关闭
          center: true,   //是否居中
          type: type      //消息类型
        });
      },

    },
    props:{
      //接收个人信息
      userInfo:{
        type:Object,
        required:true
      },
      //接收身份标记
      Tab:{
        type:String,
        required:true
      }
    },
    watch:{
      'userinfo.password':{
        handler(newValue){
          let that = this;
          that.userInfo.password = newValue;
        },
      }
    },
    mounted() {
      this.switchInfo();

      if (this.Tab !== ''){
        if (this.Tab === 'teacher'){
          this.userinfo.number = this.userInfo.teacher_number;
          this.userinfo.name = this.userInfo.teacher_name;
        }
        if (this.Tab === 'student'){
          this.userinfo.number = this.userInfo.student_number;
          this.userinfo.name = this.userInfo.student_name;
        }
        this.userinfo.password = this.userInfo.password;
        this.getPictureVerificationCode();
      }
    }
  }
</script>

<style scoped>
  .outermost-div{
    position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);height: 800px;width: 1000px;text-align: center
  }
  .border-div{
    border:3px solid #DCDFE6; border-radius: 4px;height: 280px;
  }
  el-input{
    text-align: center;
  }
  fieldset {
    /* 表单页面居中，宽度50% ,legend颜色设置，legend圆角*/
    border:2px solid #DCDFE6;margin-left: 30px; border-radius: 4px;width:800px;
  }

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