<template>
  <div class="film-schedule-view">
    <el-row class="table-box">
      <el-row class="action-box" :gutter="20">
        <el-col class="search-input" :span="6" :offset="14">
          <el-input :placeholder="placeHolderTips" v-model="filterKey" clearable>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" border stripe max-height="500" :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column label="排期编号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.scheduleId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影片名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.filmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开场日期" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.showDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开始播放时间" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.startTime.substr(10,6)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束播放时间" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.endTime.substr(10,6)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="影厅名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.screenName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影院名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cinemaName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="action" width="280">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    timeListMockData
  } from '@/config/mock'

  var saveTemp = ''
  export default {
    name: 'film-schedule-view',
    data() {
      return {
        tableData: timeListMockData,
        placeHolderTips: '请输入排期编号...',
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
     
      handleDelete(index, row) {
        let name = row.filmName
        let date = row.startTime
        let id = row.scheduleId
        this.$notify({
          title: '成功',
          message: '删除影片名称为：' + name + ' 在'+date+'的这条排期记录成功！',
          type: 'success',
          duration: 0
        });
        //  this.$notify.error({
        //   title: '失败',
        //   message: '删除影院名称为：'+name+' 的这条记录失败！'
        // });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      queryFilter(filterKey) {
        let showListTemp = saveTemp
        let showList = showListTemp.filter((value) => {
          return (value.scheduleId.indexOf(filterKey) > -1)
        })
        this.tableData = showList
        console.log(this.tableData)
      },
      getAjaxData() {
        saveTemp = timeListMockData
      },
      handleRemovePoster(file, fileList) {
        console.log(file, fileList);
      },
      handlePreviewPoster(file) {
        console.log(file);
      }
    }
  }

</script>

<style lang='scss' scoped>
  @import 'src/style/_vars.scss';

  .film-schedule-view {
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
