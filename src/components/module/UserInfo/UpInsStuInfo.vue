<template>
  <fieldset style="margin-top:10px">
    <legend style="width: 210px;text-align: center;margin-bottom: auto;border-bottom: 0;">
      <span style="font-family: 隶书,serif;font-size: 25px">{{OTab === 'save' ? '添加': OTab === 'update' ? '修改' : ''}}学生个人信息</span>
    </legend>
    <el-descriptions class="margin-top" :column="3" size="medium" border style="margin-top: 10px"
      :labelStyle="rowCenter" :contentStyle="rowCenter">

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-s-custom"></i>学号</template>
        <span v-if="OTab === 'update'">{{ studentNumber }}</span>
        <el-input v-else style="width: 120px" size="mini" v-model="studentNumber" clearable></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-user"></i>头像</template>
        <el-image v-if="photoId !== ''" :src="imgUrl" class="el-image" style="margin-bottom:-10px;width:60px;height:28px;"></el-image>
        <el-select size="mini" v-model="photoId" placeholder="请选择" style="width: 60px" @change="getImage(photoId)">
          <el-option v-for="item in imgIdList" :key="item" :value="item"></el-option>
        </el-select>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-warning-outline"></i>密码</template>
        <span v-if="OTab === 'update'">******</span>
        <el-input v-else style="width: 130px" size="mini" v-model="password" clearable show-password></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-user-solid"></i>姓名</template>
        <el-input style="width: 120px" size="mini" v-model="studentName" clearable></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-tickets"></i>年龄</template>
        <el-input style="width: 120px" size="mini" v-model="age" clearable></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-star-off"></i>生日</template>
        <el-date-picker style="width: 130px" v-model="birthday" type="date" size="mini" value-format="yyyy-MM-dd"></el-date-picker>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-male"></i>性别</template>
        <el-radio v-model="sex" label="男">男</el-radio>
        <el-radio v-model="sex" label="女">女</el-radio>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-burger"></i>民族</template>
        <el-input style="width: 120px" size="mini" v-model="nation" clearable></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-mobile-phone"></i>电话</template>
        <el-input style="width: 130px" size="mini" v-model="telephone" clearable></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-school"></i>班级</template>
        <el-select size="mini" v-model="classId" placeholder="请选择" style="width: 120px">
          <el-option v-for="item in classList" :key="item.class_id" :label="item.class_name" :value="item.class_id"></el-option>
        </el-select>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label"><i class="el-icon-location-outline"></i>住址</template>
        <el-input style="width: 120px" size="mini" v-model="homeAddress" clearable></el-input>
      </el-descriptions-item>

      <el-descriptions-item>
        <el-popconfirm :title="'确定'+(OTab === 'save' ? '添加': OTab === 'update' ? '修改' : '')+'吗？'"  @confirm="validationSubmit">
          <el-button type="primary" plain size="mini" slot="reference">提交</el-button>
        </el-popconfirm>
        &nbsp;
        <el-button type="primary" plain size="mini" @click="this.$route.params.switchStuList">返回</el-button>
      </el-descriptions-item>

    </el-descriptions>
  </fieldset>
</template>

<script>
  import axios from "axios";

  export default {
    name: "UpInsStuInfo",
    data(){
      return{
        rowCenter:{'text-align':'center'},
        imgUrl:'',
        OTab:this.$route.params.OTab,
        classList:[],
        imgIdList:[],

        studentNumber: this.$route.params.stuInfo.student_number,
        studentName: this.$route.params.stuInfo.student_name,
        password: this.$route.params.stuInfo.password !== null ? this.$route.params.stuInfo.password:'',
        age: this.$route.params.stuInfo.age,
        sex: this.$route.params.stuInfo.sex,
        birthday: this.$route.params.stuInfo.birthday,
        nation: this.$route.params.stuInfo.nation,
        telephone: this.$route.params.stuInfo.telephone,
        homeAddress: this.$route.params.stuInfo.home_address,
        classId: this.$route.params.stuInfo.class_id,
        photoId: this.$route.params.stuInfo.photoId,
      }
    },
    methods:{
      //验证个人信息
      validationSubmit(){
        this.studentNumber = this.studentNumber.trim();
        this.studentName = this.studentName.trim();
        this.password = this.password.trim();
        this.age = this.age.trim();
        this.sex = this.sex.trim();
        this.birthday = this.birthday.trim();
        this.nation = this.nation.trim();
        this.telephone = this.telephone.trim();
        this.homeAddress = this.homeAddress.trim();

        this.classId = this.classId.trim();

        if (this.studentNumber === "" || this.studentName === "" || this.sex === "" || this.age === "" || this.birthday === "" || this.nation === ""
            || this.homeAddress === "" || this.telephone === "" || this.classId === "" || this.photoId === ""){
          this.message('选项不能为空','warning');
          return false;
        }

        let regExpPass = /^[A-Za-z0-9]+$/;
        if (this.OTab === 'save'){
          if (this.password === ""){
            this.message('选项不能为空','warning');
            return false;
          }else if (regExpPass.test(this.password) === false){
            this.message('密码只能由字母和数字组成！','warning');
            return false;
          }
        }

        let regExpNumber = /^[0-9]+$/;
        if (this.studentNumber.length !== 6){
          this.message('学号长度应当为6！','warning');
          return false;
        }else if (regExpNumber.test(this.studentNumber) === false){
          this.message('学号只能由数字组成！','warning');
          return false;
        }

        let regExpAge = /^[0-9]+$/;
        if (regExpAge.test(this.age) === false){
          this.message('年龄不正确！','warning');
          return false;
        }

        let regExpPhone = /^[0-9]+$/;
        if (this.telephone.length !== 11){
          this.message('号码长度不正确！','warning');
          return false;
        }else if (regExpPhone.test(this.telephone) === false){
          this.message('号码只能由数字组成！','warning');
          return false;
        }

        //提交数据
        if (this.OTab === 'save'){
          this.saveStudent();
        }else if (this.OTab === 'update'){
          this.updateStudent();
        }
      },

      //提交新增的学生数据
      saveStudent(){
        axios({
          url:'/insetStudent/'+this.photoId+'',
          method: 'post',
          data:{
            student_number:this.studentNumber,
            student_name:this.studentName,
            password:this.password,
            age:this.age,
            sex:this.sex,
            birthday:this.birthday,
            nation:this.nation,
            telephone:this.telephone,
            home_address:this.homeAddress,
            class_id:this.classId
          },
        }).then(response=>{
          if (response.data){
            this.message('添加成功！','success');
            this.$route.params.switchStuList();
          }else{
            this.message('添加失败！','success');
            return false;
          }
        })
      },

      //修改学生数据
      updateStudent(){
        axios({
          url:'/updateStudent/'+this.photoId+'',
          method: 'put',
          data:{
            student_number:this.studentNumber,
            student_name:this.studentName,
            age:this.age,
            sex:this.sex,
            birthday:this.birthday,
            nation:this.nation,
            telephone:this.telephone,
            home_address:this.homeAddress,
            class_id:this.classId
          },
        }).then(response=>{
          if (response.data){
            this.message('修改成功！','success');
            this.$route.params.switchStuList();
          }else{
            this.message('修改失败！','success');
            return false;
          }
        })
      },

      //根据下拉列表的改变自动发起请求获取图片
      getImage(id){
        axios({
          method: 'get',
          url: '/getImage/'+id+'',
          responseType:'blob'//设置接收数据为对象
        }).then(response=>{
          this.imgUrl = window.URL.createObjectURL(response.data);
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
      //获取班级列表
      getClassList(){
        axios({
          method:'get',
          url:'/getClassList',
        }).then(response=>{
          this.classList = response.data;
        });


      },
      //获取头像id列表
      getImgIdList() {
        axios({
          method: 'get',
          url: '/getImgIdList',
        }).then(response => {
          this.imgIdList = response.data;
        });
      },
    },
    watch:{
      classList:{
        handler(oldValue){
          let temp = this.classId;
          oldValue.forEach(function (item){
            if (item.class_name === temp){
              temp = item.class_id;
            }
          });
          this.classId = temp;
        },
        immediate:true,
      }
    },
    mounted() {
      let that = this;
      if (that.OTab === 'update'){
        that.getImage(that.photoId);
      }

      if (that.classList.length === 0) this.getClassList();
      if (that.imgIdList.length === 0) this.getImgIdList();

    }
  }
</script>

<style scoped>
  el-input{
    text-align: center;
  }
</style>