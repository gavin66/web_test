<template>
  <div>
    <b-btn class='btn btn-block btn-sm s-btn' @click="toHome">首页</b-btn>
    <div>
      <b-btn v-b-toggle.collapse3 class='btn btn-block btn-sm s-btn'>产品管理</b-btn>
      <b-collapse visible id="collapse3">
        <b-btn class='btn btn-block btn-sm' @click="toList">列表</b-btn>
        <b-btn class='btn btn-block btn-sm' @click="toAdd">新增</b-btn>
      </b-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      toHome () {
        this.$router.push('/')
      },
      toList () {
        this.$router.push('/list')
      },
      toAdd () {
        this.$router.push('/add')
      }
    }
  }
</script>

<style>
  #collapse3 {
    width: 90%;
    margin: 0 auto;
  }

  .btn.btn-block {
    margin-top: 1px;
  }
</style>
