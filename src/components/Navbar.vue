<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand @click="toList">web_test</b-navbar-brand>
    <!--<route-link to="/list">web_test</route-link>-->
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item @click="toList">产品列表</b-nav-item>
      </b-navbar-nav>
      <!-- Right -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>您好</em>
          </template>
          <b-dropdown-item href="#">登录</b-dropdown-item>
          <b-dropdown-item href="#">注销</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
  export default {
    methods: {
      toList () {
        this.$router.push('/list')
      }
    }
  }
</script>
