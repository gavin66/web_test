<template>
    <div>
      <navbar></navbar>
      <div class="row r10">
        <div class="col-md-2">
          <sidebar></sidebar>
        </div>
        <div class="col-md-10">
          <div id="app">
            <router-view></router-view>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  import Sidebar from './components/Sidebar'
  export default {
    name: 'app',
    components: {Navbar, Sidebar}
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*margin-top: 60px;*/
  }
  .r10{
    margin: 0;
    padding: 10px;
  }
</style>
