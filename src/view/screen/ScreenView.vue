<template>
  <div class="screen-view">
    <el-row class="table-box">
      <el-row class="action-box" :gutter="20">
        <el-col class="search-input" :span="6" :offset="13">
          <el-input :placeholder="placeHolderTips" v-model="filterKey" clearable>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click="addBtn">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" fixed border stripe max-height="500" :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column label="影厅编号" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.screenId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影厅名称" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.screenName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影院名称" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cinemaName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影厅类型" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.screenType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="座位总数" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.seatSum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="座位总排数" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.seatsSumRows }}</span>
          </template>
        </el-table-column>
        <el-table-column label="座位总列数" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.seatsSumColumns }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="影片名称" :label-width="formLabelWidth" prop="screenName">
          <el-input v-model="ruleForm.screenName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="影院编号" :label-width="formLabelWidth" prop="cinemaId">
          <el-input v-model="ruleForm.cinemaId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="影厅类型" :label-width="formLabelWidth" prop="screenType">
          <el-input v-model="ruleForm.screenType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="座位总数" :label-width="formLabelWidth" prop="seatSum">
          <el-input v-model="ruleForm.seatSum" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="座位总排数" :label-width="formLabelWidth" prop="seatsSumRows">
          <el-input v-model="ruleForm.seatsSumRows" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="座位总列数" :label-width="formLabelWidth" prop="seatsSumColumns">
          <el-input v-model="ruleForm.seatsSumColumns" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    screenMockData
  } from '@/config/mock'

  var saveTemp = ''
  export default {
    name: 'screen-view',
    data() {
      return {
        tableData: screenMockData,
        placeHolderTips: '请输入影厅名称...',
        filterKey: '',
        totlePages: 40,
        pageSize: 4,
        currentPage: 1,
        dialogTitle: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        ruleForm: {
          cinemaName: '',
          address: '',
          servicePhone: '',
          cinemaBrief: ''
        },
        rules: {
          screenName: [{
            required: true,
            message: '请输入影厅名称',
            trigger: 'blur'
          }],
          cinemaId: [{
            required: true,
            message: '请输入影院编号',
            trigger: 'blur'
          }],
          screenType: [{
            required: true,
            message: '请输入影厅类型',
            trigger: 'blur'
          }],
          seatSum: [{
            required: true,
            message: '请输入影厅座位总数',
            trigger: 'blur'
          }],
          seatsSumRows: [{
            required: true,
            message: '请输入影厅座位总排数',
            trigger: 'blur'
          }],
          seatsSumColumns: [{
            required: true,
            message: '请输入影厅座位总列数',
            trigger: 'blur'
          }]
        }
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
    handleEdit(index, row) {
        let id = row.screenId
        let ruleForm = this.ruleForm
        ruleForm.screenName = row.screenName
        ruleForm.cinemaId = row.cinemaId
        ruleForm.screenType = row.screenType
        ruleForm.seatSum = row.seatSum
        ruleForm.seatsSumRows = row.seatsSumRows
        ruleForm.seatsSumColumns = row.seatsSumColumns
        
        this.dialogFormVisible = true
        this.dialogTitle = '编辑影厅'
      },
      handleDelete(index, row) {
        let name = row.cinemaName
        this.$notify({
          title: '成功',
          message: '删除影院名称为：' + name + ' 的这条记录成功！',
          type: 'success'
        });
        //  this.$notify.error({
        //   title: '失败',
        //   message: '删除影院名称为：'+name+' 的这条记录失败！'
        // });
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      addBtn() {
        this.dialogFormVisible = true
        this.dialogTitle = '新增影厅'
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            this.dialogFormVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      queryFilter(filterKey) {
        let showListTemp = saveTemp
        let showList = showListTemp.filter((value) => {
          return (value.screenName.indexOf(filterKey) > -1)
        })
        this.tableData = showList
      },
      getAjaxData() {
        saveTemp = screenMockData
      }
    }
  }

</script>

<style lang='scss' scoped>
  @import 'src/style/_vars.scss';

  .screen-view {
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
