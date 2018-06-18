<template>
  <div class="user-view">
    <el-row class="table-box">
      <el-row class="action-box" :gutter="20">
        <el-col class="search-input" :span="8" :offset="14">
          <el-input :placeholder="placeHolderTips" v-model="filterKey" clearable>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" fixed border stripe max-height="500" :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column prop="accountId" label="用户账号" width="180"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="180"> </el-table-column>
        <el-table-column prop="age" label="年龄" width="180"> </el-table-column>
        <el-table-column prop="nickName" label="用户昵称" > </el-table-column>
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
    userInfoMockData
  } from '@/config/mock'

  var saveTemp = '' //保存数据列表
  export default {
    name: 'user-view',
    data() {
      return {
        tableData: userInfoMockData,
        placeHolderTips: '请输入用户账号...',
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
      queryFilter(filterKey) {
        let showListTemp = saveTemp
        let showList = showListTemp.filter((value) => {
          return (value.nickName.indexOf(filterKey) > -1)
        })
        this.tableData = showList
      },
      getAjaxData() {
        saveTemp = userInfoMockData
      }
    }
  }

</script>

<style lang='scss' scoped>
  @import 'src/style/_vars.scss';

  .user-view {
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
