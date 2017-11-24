<template>
  <div>
    <div class="my-1 row">
      <div class="col-md-6">
        <b-form-group horizontal label="每页条数" :label-cols="6">
          <b-form-select :options="pageOptions" v-model="perPage"/>
        </b-form-group>
      </div>
      <div class="col-md-6">
        <b-form-group horizontal label="搜索" :label-cols="3">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="请输入"/>
            <b-input-group-button>
              <b-btn @click="filter = ''">清除</b-btn>
            </b-input-group-button>
          </b-input-group>
        </b-form-group>
      </div>
    </div>

    <div class="row my-1">
      <div class="col-sm-8">
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage"/>
      </div>
      <div class="col-sm-4 text-md-right">
        <b-button :disabled="!sortBy" @click="sortBy = null">Clear Sort</b-button>
      </div>
    </div>

    <!-- Main table element -->
    <b-table striped hover show-empty
             :items="productProvider"
             :fields="fields"
             @filtered="onFiltered"
             :busy.sync="isBusy"
    >
      <template slot="name" scope="row">{{row.value.first}} {{row.value.last}}</template>
      <template slot="isActive" scope="row">{{row.value ? 'Yes :)' : 'No :('}}</template>
      <template slot="actions" scope="row">
        <!-- We use click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-btn size="sm" @click.stop="details(row.item,row.index,$event.target)">修改</b-btn>
        <b-btn size="sm" @click.stop="details(row.item,row.index,$event.target)">删除</b-btn>
      </template>
    </b-table>

    <p>
      Sort By: {{ sortBy || 'n/a' }}, Direction: {{ sortDesc ? 'descending' : 'ascending' }}
    </p>

    <!-- Details modal -->
    <b-modal id="modal1" @hide="resetModal" ok-only>
      <h4 class="my-1 py-1" slot="modal-header">Index: {{ modalDetails.index }}</h4>
      <pre>{{ modalDetails.data }}</pre>
    </b-modal>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        fields: {
          id: {label: 'ID', sortable: true, 'class': 'text-center'},
          name: {label: '产品名'},
          description: {label: '描述'},
          price: {label: '价格'},
          actions: {label: '操作'}
        },
        pageOptions: [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}],
        modalDetails: {index: '', data: ''},
        isBusy: false
      }
    },
    methods: {
      details (item, index, button) {
        this.modalDetails.data = JSON.stringify(item, null, 2)
        this.modalDetails.index = index
        this.$root.$emit('bv::show::modal', 'modal1', button)
      },
      resetModal () {
        this.modalDetails.data = ''
        this.modalDetails.index = ''
      },
      onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      productProvider (ctx) {
        ctx.currentPage = 1
        ctx.perPage = 5
        ctx.sortBy = null
        ctx.sortDesc = false
        ctx.filter = null
        let url = 'http://localhost:3001/product'
        let promise = this.$http.get(url)
        promise.then((res) => {
          if (res.status === 200) {
//            let count = res.data['hits']['total']
            let arr = res.data['hits']['hits']
            let data = []
            arr.forEach(function (val) {
              let item = val['_source']
              item['id'] = val['_id']
              data.push(item)
            })
            return data
          } else {
            alert('获取失败')
          }
        }).catch(err => {
          console.log(err)
          return []
        })
      }
    }
  }
</script>
