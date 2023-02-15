<template>
  <div>
    <HeadlineName HeadTitle="日志列表"></HeadlineName>
    <br/>

    <div align="center">
        <el-button type="primary" size="medium" plain @click="switchLoginLog" >登录日志</el-button>
         &nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" size="medium" plain @click="switchOperationLog">操作日志</el-button>
    </div>
    <br/>

    <div>
      <LoginLogTable v-if="index === 1" :TableData="tableData" :getSelection="getSelection" ref="child"></LoginLogTable>
      <OperationLogTable v-else :TableData="tableData" :getSelection="getSelection" ref="child"></OperationLogTable>
    </div>

    <div style="margin-top: 20px" align="center">
      <el-popconfirm title="确认删除吗？" @confirm="DeleteSelection">
        <el-button slot="reference" type="danger" plain round>删除数据</el-button>
      </el-popconfirm>
      &nbsp;&nbsp;&nbsp;
      <el-button @click="resetSelection" type="danger" plain round>取消选择</el-button>
    </div>
    <br/>

    <div class="block" align="center">
      <el-pagination layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" :total="total">
      </el-pagination>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
  import axios from "axios";
  import LoginLogTable from "./Log/LoginLogTable";
  import OperationLogTable from "./Log/OperationLogTable";
  import HeadlineName from "./common/Headline";
  axios.defaults.baseURL = 'http://localhost:8081/stu';

  export default {
    name: "LogName",
    components: {HeadlineName, OperationLogTable, LoginLogTable},
    data(){
      return{
        index: 1,                 // 子组件标记
        tableData: [],            // 分页列表数据
        multipleSelection: [],    // 选中的数据
        currentPage: 1,           // 当前页
        total: 0,                 // 总条数
        pageSize: 10,             // 条数/页
        pageSizes: [10,20,30,50], // 条数/页数选项
      }
    },
    methods:{
      //切换到登录日志页面组件
      switchLoginLog(){
        this.index = 1;
        //恢复默认值
        this.currentPage = 1;
        this.pageSize = this.pageSizes[0];
        this.loginLog(this.currentPage,this.pageSizes[0]);
      },
      //切换到操作日志页面组件
      switchOperationLog(){
        this.index = 2;
        //恢复默认值
        this.currentPage = 1;
        this.pageSize = this.pageSizes[0];
        this.operationLog(this.currentPage,this.pageSizes[0]);
      },
      //发送请求获取登录日志数据
      loginLog(pageNo,pageSize){
        axios({
          method: 'get',
          url: '/getLoginLogList/'+pageNo+'/'+pageSize+'',
        }).then(response=>{
          this.tableData = response.data.loginLogList;
          this.total = response.data.count;
        })
      },
      //发送请求获取操作日志数据
      operationLog(pageNo,pageSize){
        axios({
          method: 'get',
          url: '/getOperationLogList/'+pageNo+'/'+pageSize+'',
        }).then(response=>{
          this.tableData = response.data.operationLogList;
          this.total = response.data.count;
        })
      },
      //当 （条数/页） 发生改变时，获取每页条数数据
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        //根据新的每页条数数据发送新的请求获取数据
        if (this.index === 1){
          this.loginLog(this.currentPage,val);
        }else{
          this.operationLog(this.currentPage,val);
        }
      },
      //当前页发生改变时，获取新的当前页数
      handleCurrentChange(val) {
        this.currentPage = val;
        //根据新的当前页数发送新的请求获取数据
        if (this.index === 1){
          this.loginLog(val,this.pageSize);
        }else{
          this.operationLog(val,this.pageSize);
        }
      },
      //删除选中的数据
      DeleteSelection() {
        //判断是否有数据被选中，没有数据则终止方法
        if (this.multipleSelection.length === 0){
          //消息提示
          this.message('请选择想要删除的数据','warning');
          return false;
        }
        //将选中的数据中的id值组成新数组
        const deleteData = [];
        this.multipleSelection.forEach(data=>{
          deleteData.unshift(data.id);
        })
        //发送请求删除选中的数据
        if (this.index === 1){
          this.deleteLoginLogData(deleteData);
        }else{
          this.deleteOperationLogData(deleteData);
        }
      },
      //删除登录日志
      deleteLoginLogData(deleteData){
        axios({
          method: 'delete',
          url: '/deleteLoginLog/'+deleteData+'',
        }).then(response=>{
          //成功消息提示
          this.message(response.data,'success');
          //成功删除数据后再次发送请求获取新的数据
          this.loginLog(this.currentPage,this.pageSize);
        })
      },
      //删除操作日志
      deleteOperationLogData(deleteData){
        axios({
          method: 'delete',
          url: '/deleteOperationLog/'+deleteData+'',
        }).then(response=>{
          //成功消息提示
          this.message(response.data,'success');
          //成功删除数据后再次发送请求获取新的数据
          this.operationLog(this.currentPage,this.pageSize);
        })
      },
      //获取子组件中被选中的数据
      getSelection(MultipleSelection){
          this.multipleSelection = MultipleSelection;
      },
      //取消子组件中选中的数据
      resetSelection(){
        this.$refs.child.resetAssemblySelection();
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
      //调用methods的方法时，最好使用that，因为this在子路由或子组件中不能直接获取到
      let that = this;
      //页面加载完毕后立即获列表数据
      that.loginLog(that.currentPage,that.pageSizes[0]);
    }
  }
</script>

<style scoped>

</style>