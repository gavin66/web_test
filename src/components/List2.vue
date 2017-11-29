<template>
  <div>
    <b-form-input v-model="qString" type="text" placeholder="搜索" @keyup.enter.native="search"></b-form-input>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col"> 产品名</th>
        <th scope="col">价格</th>
        <th scope="col">描述</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items">
        <td>{{ item.id}}</td>
        <td>{{ item.name}}</td>
        <td>{{ item.price}}</td>
        <td>{{ item.description}}</td>
        <td>
          <b-button @click="editItem(item,!modalShow1)">编辑</b-button>
          <b-button @click="dropItem(item.id,!modalShow2)">删除</b-button>
        </td>
      </tr>
      </tbody>
    </table>

    <b-pagination size="md" align="center" :total-rows="totalRows" v-model="currentPage" :per-page="perPage"></b-pagination>

    <b-modal v-model="modalShow1" ref="modal" title="更新产品信息" @ok="editSubmit">
      <form @submit.prevent="validateBeforeSubmit">
        <div class="form-group">
          <b-form-input class="form-control" type="text" placeholder="产品名" v-model="editData.name"
                        v-validate="'required'" name="name" id="name"></b-form-input>
          <small v-show="errors.has('name')" class="form-text text-danger"> {{ errors.first('name') }} </small>
        </div>
        <div class="form-group">
          <b-form-input class="form-control" type="text" placeholder="价格" v-model="editData.price"
                        v-validate="'decimal'" name="price" id="price"></b-form-input>
          <small v-show="errors.has('price')" class="form-text text-danger"> {{ errors.first('price') }} </small>
        </div>
        <div class="form-group">
          <textarea class="form-control" id="description" name="description" rows="5"
                    v-model="editData.description"></textarea>
        </div>
      </form>
    </b-modal>

    <b-modal v-model="modalShow2" ref="modal" @ok="dropSubmit" centered>
      <p class="my-4 drop-item">确定删除？</p>
    </b-modal>

  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        items: [],
        totalRows: 0,
        perPage: 10,
        currentPage: 1,
        qString: '',
        editData: {},
        dropId: null,
        modalShow1: false,
        modalShow2: false
      }
    },
    methods: {
      productProvider () {
        let url = 'http://localhost:3001/product'
        let obj = {query: this.qString, page: this.currentPage, per: this.perPage}
        let promise = this.$http.get(url, {params: obj})
        promise.then((res) => {
          if (res.status === 200) {
            this.totalRows = res.data['hits']['total']
            let arr = res.data['hits']['hits']
            let data = []
            arr.forEach(function (val) {
              let item = val['_source']
              item['id'] = val['_id']
              data.push(item)
            })
            this.items = data
          } else {
            alert('获取失败')
          }
        }).catch(err => {
          console.log(err)
          return []
        })
      },
      editItem (item, modalShow1) {
        this.modalShow1 = modalShow1
        this.editData = item
      },
      editSubmit () {
        this.$validator.validateAll().then((result) => {
          if (result) {
            let obj = {
              name: this.editData.name,
              price: this.editData.price,
              description: this.editData.description
            }
//            let url = '/product/' + this.editData.id
            let url = 'http://localhost:3001/product/' + this.editData.id
            this.$http.put(url, obj).then((res) => {
              if (res.status === 200) {
//                this.$router.push('/list')
                this.productProvider()
              } else {
                alert('更新失败')
              }
            }, (err) => {
              console.log(err)
              alert('更新失败')
            })
          }
        })
      },
      dropItem (id, modalShow2) {
        this.dropId = id
        this.modalShow2 = modalShow2
      },
      dropSubmit () {
        let obj = {
          name: this.editData.name,
          price: this.editData.price,
          description: this.editData.description
        }
//      let url = '/product/' + this.dropId
        let url = 'http://localhost:3001/product/' + this.dropId
        this.$http.delete(url, obj).then((res) => {
          if (res.status === 200) {
//            this.$router.push('/list')
            this.productProvider()
          } else {
            alert('删除失败')
          }
        }, (err) => {
          console.log(err)
          alert('删除失败')
        })
      },
      search () {
        this.productProvider()
      }
    },
    watch: {
      currentPage () {
        this.productProvider()
      }
    },
    created () {
      this.productProvider()
    }
  }
</script>

<style>
  p.drop-item {
    text-align: center;
    font-size: 20px;
  }
</style>
