<template>
  <fieldset style="margin-top:25px">
    <legend>
      <el-button type="text" size="medium" style="width: 70px" @click="saveStu">添加学生</el-button>
    </legend>
    <el-table :data="stuList" height="175" border size="mini">

      <el-table-column  label="学号" width="80" align="center" fixed="left">
        <template slot-scope="scope">{{scope.row.student_number}}</template>
      </el-table-column>

      <el-table-column label="姓名" width="80" align="center" fixed="left">
        <template slot-scope="scope">{{scope.row.student_name}}</template>
      </el-table-column>

      <el-table-column  label="密码" width="60" align="center">******</el-table-column>

      <el-table-column label="年龄" width="60" align="center">
        <template slot-scope="scope">{{scope.row.age}}</template>
      </el-table-column>

      <el-table-column label="性别" width="60" align="center">
        <template slot-scope="scope">{{scope.row.sex}}</template>
      </el-table-column>

      <el-table-column label="生日" width="120" align="center">
        <template slot-scope="scope">{{scope.row.birthday}}</template>
      </el-table-column>

      <el-table-column label="民族" width="60" align="center">
        <template slot-scope="scope">{{scope.row.nation}}</template>
      </el-table-column>

      <el-table-column label="住址" width="120" align="center">
        <template slot-scope="scope">{{scope.row.home_address}}</template>
      </el-table-column>

      <el-table-column label="电话" width="120" align="center">
        <template slot-scope="scope">{{scope.row.telephone}}</template>
      </el-table-column>

      <el-table-column label="班级" width="120" align="center">
        <template slot-scope="scope">{{scope.row.class_id}}</template>
      </el-table-column>

      <el-table-column label="操作" width="100" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
          &nbsp;
          <el-popconfirm title="确定删除吗？" @confirm="handleDelete(scope.row.student_number)">
            <el-button type="text" size="small" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>
  </fieldset>
</template>

<script>
  import axios from "axios";

  export default {
    name: "StudentList",
    data(){
      return{
        stuList:[],
        stuInfo:{
          student_number:'',
          student_name:'',
          password:'',
          class_id:'',
          sex:'',
          age:'',
          birthday:'',
          nation:'',
          home_address:'',
          telephone:'',
          photoId:''
        },
      }
    },
    methods:{


      //删除学生个人信息
      handleDelete(stuNumber) {
        axios({
          method:'delete',
          url:'/deleteStudent/'+stuNumber+'',
        }).then(response=>{
          if (response.data){
            this.message('删除成功！','success');
            this.getStudentList();
          }else{
            this.message('删除失败！','error');
          }
        });
      },
      //发送请求获取学生列表
      getStudentList(){
        //已经获取学生信息列表则不再重新获取
        axios({
          method: 'get',
          url: '/getStudentList',
        }).then(response=>{
          this.stuList = response.data;
        })
      },
      //点击跳转到添加学生组件
      saveStu(){
        //清空stuInfo对象的值
        /*Object.keys(this.stuInfo).forEach(key =>(this.userinfo[key] = ''));*/
        /*this.stuInfo.student_number = '';
        this.stuInfo.student_name = '';
        this.stuInfo.password = '';
        this.stuInfo.sex = '';
        this.stuInfo.age = '';
        this.stuInfo.birthday = '';
        this.stuInfo.nation = '';
        this.stuInfo.home_address = '';
        this.stuInfo.telephone = '';
        this.stuInfo.class_id = '';
        this.stuInfo.photoId = '';*/

        this.$route.params.switchTest('save',this.stuInfo);
      },

      //点击跳转到修改学生信息组件
      handleEdit(row) {
        this.$route.params.switchTest('update',row);
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
    mounted() {
      this.getStudentList();
    }
  }
</script>

<style scoped>
  legend{
    width: 70px;text-align: right;margin-bottom: auto;border-bottom: 0;margin-right: 33px;
  }
</style>