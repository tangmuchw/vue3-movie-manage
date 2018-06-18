<template>
  <div class="order-view">
    <el-row class="table-box">
      <el-row class="action-box" :gutter="20">
        <el-col class="search-input" :span="6" :offset="16">
          <el-input :placeholder="placeHolderTips" v-model="filterKey" clearable>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" fixed border stripe max-height="500" :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column label="订单号" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.orderCode }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户ID" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.accountId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影院名称" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cinemaName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影片名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.filmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影厅名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.screenName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购座数量" width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="座位号" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.seatInfo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务费" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.serviceCharge }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总共价格" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">￥{{ scope.row.totalPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付状态" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.payState }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="paging-box">
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
          :total="totlePages">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<script>
  import {
    orderListMockData
  } from '@/config/mock'

  var saveTemp = ''
  export default {
    name: 'order-view',
    data() {
      return {
        tableData: orderListMockData,
        placeHolderTips: '请输入订单号...',
        filterKey: '',
        totlePages: 40,
        pageSize: 4,
        currentPage: 1
      }
    },
    components: {},
    watch: {
      filterKey(newVal) {
        console.log(newVal)
        if (saveTemp.length != 0) {
          this.queryFilter(newVal)
        }
      }
    },
    computed: {},
    mounted() {
      this.getAjaxData()
    },
    methods: {
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getAjaxData() {
        saveTemp = orderListMockData
      },
       queryFilter(filterKey) {
        let showListTemp = saveTemp
        let showList = showListTemp.filter((value) => {
          return (value.orderCode.indexOf(filterKey) > -1)
        })
        this.tableData = showList
        console.log(this.tableData)
      }
    }
  }

</script>

<style lang='scss' scoped>
  @import 'src/style/_vars.scss';

  .order-view {
    background: $base-view-color;
    .action-box {
      margin: 20px 0;
    }
    .paging-box {
      width: 100%;
      .block {
        float: right;
        margin: 30px 0;
      }
    }
  }

</style>
