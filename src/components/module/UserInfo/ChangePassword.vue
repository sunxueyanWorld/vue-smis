<template>
  <el-card style="margin-top:50px;margin-bottom:50px;margin-left: 30px" >
    <el-form :model="personalForm" :rules="rules" size="medium" :inline="true" class="demo-form-inline">

      <el-form-item label="学号：">
        <el-input type="text" style="width: 100px;" :placeholder="this.$route.params.userinfo.number" disabled></el-input>
      </el-form-item>

      <el-form-item label="姓名：">
        <el-input type="text" :placeholder="this.$route.params.userinfo.name" disabled></el-input>
      </el-form-item>

      <el-form-item label="密码：">
        <el-input type="password" placeholder="******" disabled></el-input>
      </el-form-item>

      <el-form-item prop="newPassword" label="确认密码：">
        <el-input type="password" show-password v-model="personalForm.newPassword" placeholder="请输入新的密码" ></el-input>
      </el-form-item>

      <el-form-item prop="ConPassword" label="确认密码：">
        <el-input type="password" show-password v-model="personalForm.ConPassword" placeholder="请再次输入新的密码" ></el-input>
      </el-form-item>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <el-popconfirm title="确认修改吗？" @confirm="resetPassword">
        <el-button type="primary"  slot="reference" plain round size="medium">修改</el-button>
      </el-popconfirm>

    </el-form>
  </el-card>
</template>

<script>
  import axios from "axios";

  export default {
    name: "ChangePassword",
    data(){
      //对新密码进行验证
      const validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          if (value === this.$route.params.userinfo.password) {
            callback(new Error('新密码不能与原密码相同'));
          }
          callback();
        }
      };
      //确认密码验证
      const validateConPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.personalForm.newPassword) {
          callback(new Error('两次输入的密码必须保持一致!'));
        } else {
          callback();
        }
      };
      return{
        personalForm:{                    // 密码容器
          newPassword:'',                 // 新密码
          ConPassword:'',                 // 确认新密码
        },
        rules:{
          //对新密码进行验证
          newPassword:[
            { validator: validateNewPass, trigger: 'blur' },
            { len:6,message: '密码长度是6个字符！', trigger: 'blur' }
          ],
          //确认密码验证
          ConPassword:[
            { validator: validateConPass, trigger: 'blur' },
          ]
        },
      }
    },
    methods:{
      //提交修改改密码
      resetPassword(){
        axios({
          method: 'put',
          url: '/resetPassword/'+this.$route.params.userinfo.number+'/'+this.$route.params.userinfo.password+'/'+this.personalForm.newPassword+'',
        }).then(response=>{
          if (response.data.msg == null){
            this.$route.params.changePassword(this.personalForm.newPassword);
            this.message('密码修改成功','success');
            //清空personalForm对象的值
            Object.keys(this.personalForm).forEach(key =>(this.personalForm[key] = ''));
          }else{
            this.message(response.data.msg,'warning');
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
    }
  }
</script>

<style scoped>

</style>