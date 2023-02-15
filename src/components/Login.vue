<template>
  <div class="login-div">
    <fieldset>
      <HeadlineName HeadTitle="Login"></HeadlineName>

      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" size="mini" class="login-form">
        <el-form-item label="用户名" prop="number">
          <el-input v-model="ruleForm.number" placeholder="请输入用户名" clearable size="mini" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" show-password clearable size="mini" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="verCode">
          <el-input v-model="ruleForm.verCode" placeholder="区分大小写" clearable size="mini" style="width: 130px"></el-input>
          &nbsp;
          <el-image :src="picUrl" @click="getPictureVerificationCode" style="margin-bottom:-10px;height: 28px"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" plain @click="submitForm" @keydown.enter="submitForm">登录</el-button>
          <el-button type="danger" size="mini" plain @click="resetForm">清空</el-button>
        </el-form-item>
      </el-form>
    </fieldset>
  </div>
</template>

<script>
  import axios from "axios";
  import HeadlineName from "./module/common/Headline";
  //axios的默认配置
  axios.defaults.baseURL = 'http://localhost:8081/stu';
  axios.defaults.withCredentials = true;// 保证每次请求的sessionid 相同

  export default {
    name: "LoginName",
    components: {HeadlineName},
    props:['loginTab','userInfo'],
    data(){
      return{
        ruleForm:{
          number:'',
          password:'',
          verCode:'',
        },
        picUrl:'',
        rules:{
          number:[
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { len:6, message: '用户名长度不符合规范', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          verCode:[
            { required: true, message: '请输入验证码', trigger: 'blur' },
            { len:4,message: '验证码长度不符合规范', trigger: 'blur' },
            { pattern:'^[A-Za-z0-9]+$',message: '验证码只能由数字和字母组成',trigger: 'blur' },
          ]
        },
      }
    },
    methods:{
      //登录
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            //发送登录请求
            axios({
              method: 'post',
              url: '/login/'+this.ruleForm.number+'/'+this.ruleForm.password+'/'+this.ruleForm.verCode+'',
              xhrFields:{
                withCredentials:true
              }
            }).then(response=>{
              //验证是否有登陆失败的消息
              if (response.data.msg != null){
                this.loginMessage(response.data.msg);
              }else{
                //登陆成功
                if (this.ruleForm.number === '22root'){
                  this.loginTab('log');
                }else{
                  if (this.ruleForm.number.substring(0,1) === "2"){
                    this.userInfo(response.data.teacher);
                    this.loginTab('teacher');
                  }else if (this.ruleForm.number.substring(0,1) === "1"){
                    this.loginTab('student');
                    this.userInfo(response.data.student);
                  }
                }
              }
            })
          } else {
            return false;
          }
        });
      },
      //清空
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      loginMessage(msg) {
        this.$message({
          message:msg,
          center: true,
          type:'error'
        });
      },
      // 获取验证码图片
      getPictureVerificationCode(){
        axios({
          method: 'get',
          url: '/getPictureVerificationCode',
          responseType:'blob'//设置接收数据为对象
        }).then(response=>{
          this.picUrl = window.URL.createObjectURL(response.data);
        })
      },

    },
    mounted() {
      //调用methods的方法时，最好使用that，因为this在子路由或子组件中不能直接获取到
      let that = this;

      //页面加载完毕后立即获取验证码
      this.getPictureVerificationCode();

      //绑定键盘事件
      document.onkeydown = function (event){
        if (event.keyCode === 13){
          that.submitForm(that.ruleForm);
        }
      }
    },
  }
</script>

<style scoped>
  /* 登录框在页面的位置 */
  .login-div{
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%,-50%)
  }

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 20px 20px;
    margin: 0 auto;
    overflow: hidden;
    border: 4px;
  }

  /* 外围边框大小，厚度，颜色 */
  fieldset{
    border:3px solid #DCDFE6;  text-align:left; border-radius: 8px;margin: 0 auto;width:350px;height:320px;
  }
</style>