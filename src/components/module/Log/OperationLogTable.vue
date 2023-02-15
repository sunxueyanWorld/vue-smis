<template>
  <div align="center">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border size="small" @selection-change="handleSelectionChange"
              style="width: 950px;border:2px solid #DCDFE6;border-radius: 10px" >
      <el-table-column align="center" width="40" type="selection"></el-table-column>
      <el-table-column prop="id" label="ID" width="70" align="center"></el-table-column>
      <el-table-column prop="o_number" label="操作者账号" width="100" align="center"></el-table-column>
      <el-table-column prop="o_date" label="操作时间" width="180" align="center"></el-table-column>
      <el-table-column prop="o_method" label="操作方法" width="220" align="center"></el-table-column>
      <el-table-column prop="s_operation" label="操作内容" width="180" align="center"></el-table-column>
      <el-table-column prop="remarks" label="备注" align="center" show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "operationLogTable",
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
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>