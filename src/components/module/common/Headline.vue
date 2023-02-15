<template>
  <div align="center">
    <h1>{{HeadTitle}}</h1>
  </div>
</template>

<script>
  export default {
    name: "HeadlineName",
    props:{
      HeadTitle:{
        type:String,
        required:true
      }
    }
  }
</script>

<style scoped>
  h1{
    font-family: 隶书,
    serif
  }
</style>