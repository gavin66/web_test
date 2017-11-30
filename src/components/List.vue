<template>
  <div>
    <div class="my-1 row">
      <div class="col-md-6">
        <b-form-group horizontal label="每页行数" :label-cols="6">
          <b-form-select :options="pageOptions" v-model="perPage"/>
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group horizontal label="搜索" :label-cols="3">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="请输入"/>
            <b-input-group-button>
              <b-btn @click="filter = ''">清空</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </div>
    </div>

    <div class="row my-1">
      <div class="col-sm-8">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage"/>
      </div>
    </div>

    <!-- Main table element -->
    <b-table striped hover show-empty
             ref="pTable"
             :busy.sync="isBusy"
             :items="productProvider"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             @filtered="onFiltered"
    >
      <template slot="actions" scope="row">
        <b-btn size="sm" @click.stop="editModal(row.item)">编辑</b-btn>
        <b-btn size="sm" @click.stop="dropModal(row.item.id)">删除</b-btn>
      </template>
    </b-table>

    <p>
      Sort By: {{ sortBy || 'n/a' }}, Direction: {{ sortDesc ? 'descending' : 'ascending' }}
    </p>

    <b-modal id="edit-modal" ref="modal" title="更新产品信息" @ok="editSubmit">
      <form @submit.prevent="validateBeforeSubmit">
        <div class="form-group">
          <b-form-input class="form-control" type="text" placeholder="产品名" v-model="modalEdit.name"
                        v-validate="'required'" name="name" id="name"></b-form-input>
          <small v-show="errors.has('name')" class="form-text text-danger"> {{ errors.first('name') }} </small>
        </div>
        <div class="form-group">
          <b-form-input class="form-control" type="text" placeholder="价格" v-model="modalEdit.price"
                        v-validate="'decimal'" name="price" id="price"></b-form-input>
          <small v-show="errors.has('price')" class="form-text text-danger"> {{ errors.first('price') }} </small>
        </div>
        <div class="form-group">
          <textarea class="form-control" id="description" name="description" rows="5"
                    v-model="modalEdit.description"></textarea>
        </div>
      </form>
    </b-modal>

    <b-modal id="drop-modal" size="sm" @ok="dropSubmit" centered>
      <p class="my-4 text-danger">确定删除？</p>
    </b-modal>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        isBusy: false,
        fields: {
          id: {label: 'ID'},
          name: {label: '产品名'},
          price: {label: '价格'},
          description: {label: '描述'},
          actions: {label: '操作'}
        },
        currentPage: 1,
        perPage: 5,
        totalRows: 0,
        pageOptions: [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}],
        sortBy: null,
        sortDesc: false,
        filter: null,
        modalEdit: {id: '', name: '', price: '', description: ''},
        dropId: null
      }
    },
    methods: {
      productProvider (ctx) {
        // 数据获取
        this.isBusy = true
        let url = '/product'
//        let url = 'http://localhost:3001/product'
        let obj = {query: ctx.filter, page: ctx.currentPage, per: ctx.perPage}
        let promise = this.$http.get(url, {params: obj})
        return promise.then((res) => {
          this.totalRows = res.data['hits']['total']
          let arr = res.data['hits']['hits']
          let data = []
          arr.forEach(function (val) {
            let item = val['_source']
            item['id'] = val['_id']
            data.push(item)
          })
          this.isBusy = false
          return data
        }).catch(err => {
          this.isBusy = false
          console.log(err)
          return []
        })
      },
      editModal (item) {
        // 打开修改模态框，赋值
        this.modalEdit.id = item.id
        this.modalEdit.name = item.name
        this.modalEdit.price = item.price
        this.modalEdit.description = item.description
        this.$root.$emit('bv::show::modal', 'edit-modal')
        console.log('editModal', item)
      },
      editSubmit () {
        // 提交更新
        this.$validator.validateAll().then((result) => {
          if (result) {
            let url = '/product/' + this.modalEdit.id
//            let url = 'http://localhost:3001/product/' + this.modalEdit.id
            this.$http.put(url, this.modalEdit).then((res) => {
              this.$refs.pTable.refresh()
            }).catch((err) => {
              console.log('更新失败', err)
            })
          }
        })
      },
      dropModal (id) {
        // 打开删除模态框
        this.dropId = id
        this.$root.$emit('bv::show::modal', 'drop-modal')
        console.log('dropModal', id)
      },
      dropSubmit () {
        let url = '/product/' + this.dropId
//        let url = 'http://localhost:3001/product/' + this.dropId
        this.$http.delete(url).then((res) => {
          this.$refs.pTable.refresh()
        }, (err) => {
          console.log(err)
          alert('删除失败')
        })
      },

      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    }
  }
</script>

<style>
  #drop-modal p {
    text-align: center;
    font-size: 18px;
  }
</style>
