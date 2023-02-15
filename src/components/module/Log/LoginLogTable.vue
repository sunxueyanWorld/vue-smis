<template>
  <div align="center">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border size="small" @selection-change="handleSelectionChange"
              style="width: 600px;border:2px solid #DCDFE6;border-radius: 10px" >
      <el-table-column align="center" width="40" type="selection"></el-table-column>
      <el-table-column prop="id" label="ID" width="50" align="center"></el-table-column>
      <el-table-column prop="log_number" label="登录者账号" width="120" align="center"></el-table-column>
      <el-table-column prop="log_date" label="登陆时间" width="200" align="center"></el-table-column>
      <el-table-column prop="state" label="登陆状态" align="center" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "LoginLogTable",
    data(){
      return{
        tableData: [],
        multipleSelection:[],
      }
    },
    methods:{
      // 当多选框发生改变时，获取被选中的数据
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //取消选中的数据
      resetAssemblySelection(){
        this.$refs.multipleTable.clearSelection();
      },
    },
    watch:{
      TableData:{
        handler(newValue){
          this.tableData = newValue;
        },
        immediate:true
      },
      multipleSelection:{
        handler(newValue){
          this.getSelection(newValue);
        },
        immediate:true
      },
    },
    props:{
      TableData:{
        type:Array,
        required:true
      },
      getSelection:{
        type:Function,
      },
      test:{
        type:Function,
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>