<template>
  <el-row>
    <el-card style="margin-top:30px;margin-left: 30px">
      <el-descriptions class="margin-top" :column="3" size="medium" border :labelStyle="rowCenter" :contentStyle="rowCenter">

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-user"></i>学号</template>{{this.$route.params.UserInfo.teacher_number}}{{this.$route.params.UserInfo.student_number}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-user-solid"></i>姓名</template>{{this.$route.params.UserInfo.teacher_name}}{{this.$route.params.UserInfo.student_name}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-warning-outline"></i>密码</template>{{this.$route.params.UserInfo.password}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-star-off"></i>生日</template>{{this.$route.params.UserInfo.birthday}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-tickets"></i>年龄</template>{{this.$route.params.UserInfo.age}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-male"></i>性别</template>{{this.$route.params.UserInfo.sex}}
        </el-descriptions-item>

        <el-descriptions-item v-if="this.$route.params.Tab === 'teacher'">
          <template slot="label"><i class="el-icon-male"></i>教龄</template>{{this.$route.params.UserInfo.teaching_age}}
        </el-descriptions-item>

        <el-descriptions-item v-if="this.$route.params.Tab === 'teacher'">
          <template slot="label"><i class="el-icon-male"></i>学科</template>{{this.$route.params.UserInfo.subject}}
        </el-descriptions-item>

        <el-descriptions-item v-if="this.$route.params.Tab === 'student'">
          <template slot="label"><i class="el-icon-school"></i>班级</template>{{this.$route.params.UserInfo.class_id}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-burger"></i>民族</template>{{this.$route.params.UserInfo.nation}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-mobile-phone"></i>电话</template>{{this.$route.params.UserInfo.telephone}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label"><i class="el-icon-location-outline"></i>住址</template>{{this.$route.params.UserInfo.home_address}}
        </el-descriptions-item>

      </el-descriptions>
    </el-card>
  </el-row>
</template>

<script>
  export default {
    name: "PersonalInfo",
    data(){
      return{
        rowCenter:{'text-align':'center'},// el-descriptions的属性对象
      }
    },
  }
</script>

<style scoped>

</style>