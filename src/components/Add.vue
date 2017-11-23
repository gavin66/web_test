<template>
  <div class="content-add">
    <form action="">
      <b-form-group
        id="name"
        label="产品名"
        :feedback="feedback"
        valid-feedback="Thank you"
        :state="state"
      >
        <b-form-input id="name" :state="state" v-model.trim="name" type="text"></b-form-input>
      </b-form-group>
      <b-form-group
        id="descript"
        label="产品描述"
        :feedback="feedback"
        valid-feedback="Thank you"
        :state="state"
      >
        <b-form-input id="price" :state="state" v-model.trim="name" type="number"></b-form-input>
      </b-form-group>
      <b-form-group
        id="descript"
        label="产品描述"
        :feedback="feedback"
        valid-feedback="Thank you"
        :state="state"
      >
        <b-form-textarea id="textarea1"
                         v-model="text"
                         placeholder="请输入..."
                         :rows="4"
                         :max-rows="6">
        </b-form-textarea>
      </b-form-group>

      <div class="cleanfix">
        <div class="pull-right">
          <b-btn size="sm">保存</b-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    computed: {
      nameState () {
        return this.name.length > 2 ? null : false
      }
    },
    data () {
      return {
        name: ''
      }
    }
  }
</script>
<style>
  .content-add{
    min-height: 300px;
    background-color: #f7f7f7;
    border-radius: 5px;
    padding: 25px;
  }
  .content-add form{
    text-align: left;
  }

</style>
