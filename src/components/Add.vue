<template>
  <form @submit.prevent="validateBeforeSubmit">
    <div class="form-group">
      <label class="col-form-label" for="name">产品名</label>
      <input v-validate="'required'" type="text" class="form-control" name="name" id="name" v-model="name">
      <small v-show="errors.has('name')" class="form-text text-danger"> {{ errors.first('name') }} </small>
    </div>
    <div class="form-group">
      <label class="col-form-label" for="price">价格</label>
      <input v-validate="'decimal'" type="text" class="form-control" name="price" id="price" v-model="price">
      <small v-show="errors.has('price')" class="form-text text-danger"> {{ errors.first('price') }} </small>
    </div>
    <div class="form-group">
      <label for="description">产品描述</label>
      <textarea class="form-control" id="description" name="description" rows="5" v-model="description"></textarea>
    </div>
    <button type="submit" class="btn btn-secondary">保存</button>
  </form>
</template>
<script>
  export default {
    data: () => ({
      name: '',
      price: '',
      description: ''
    }),
    methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            let obj = {
              name: this.name,
              price: this.price,
              description: this.description
            }
//            let url = '/product'
            let url = 'http://localhost:3001/product'
            this.$http.post(url, obj).then((res) => {
              if (res.status === 200) {
                this.$router.push('/list')
              } else {
                alert('新增失败')
              }
            }, (err) => {
              console.log(err)
              alert('新增失败')
            }
            )
          }
        })
      }
    }
  }
</script>
