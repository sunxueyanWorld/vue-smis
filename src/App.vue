<template>
  <div>
    <Login :loginTab="loginTab" :userInfo="userInfo" v-if="Tab === ''"></Login>
    <Log v-if="Tab === 'log'"></Log>
    <UserInfo v-if="Tab === 'teacher' || Tab === 'student'" :Tab="Tab" :userInfo="userinfo"></UserInfo>
  </div>
</template>

<script>
import Login from "@/components/Login";
import Log from "@/components/module/Log";
import UserInfo from "@/components/module/UserInfo";
export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    UserInfo,
    // eslint-disable-next-line vue/no-unused-components
    Login,
    // eslint-disable-next-line vue/no-unused-components
    Log,
  },
  data(){
    return{
      Tab:'',
      userinfo:{},
    }
  },
  methods:{
    loginTab(tab){
      this.Tab = tab;
      localStorage.setItem('Tab',tab);
    },
    userInfo(userinfo){
      this.userinfo = userinfo;
    },
  },
  mounted() {


  }
}
</script>

<style>

</style>
