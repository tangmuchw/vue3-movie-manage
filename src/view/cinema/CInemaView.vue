<template>
  <div class="cinema-view">
    <el-row class="table-box">
      <el-row class="action-box" :gutter="20">
        <el-col class="search-input" :span="6" :offset="13">
          <el-input :placeholder="placeHolderTips" v-model="filterKey" clearable>
          </el-input>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button type="primary" @click.native="addBtn">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%" fixed border stripe max-height="500" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column label="影院编号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cinemaId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影院名称" width="250">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>名称: {{ scope.row.cinemaName }}</p>
              <p>地址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.cinemaName }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="客服电话" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.servicePhone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影院介绍" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cinemaBrief }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="action">
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
        <el-form-item label="影院名称" :label-width="formLabelWidth" prop="cinemaName">
          <el-input v-model="ruleForm.cinemaName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="影院地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="ruleForm.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客服电话" :label-width="formLabelWidth" prop="servicePhone">
          <el-input v-model="ruleForm.servicePhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="影院介绍" :label-width="formLabelWidth" prop="cinemaBrief">
          <el-input v-model="ruleForm.cinemaBrief" auto-complete="off" type="textarea"></el-input>
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
    cinemaMockData
  } from '@/config/mock'

  var saveTemp = '' //保存数据列表

  export default {
    name: 'cinema-view',
    data() {
      return {
        loading: false,
        tableData: [],
        placeHolderTips: '请输入影院名称',
        filterKey: '',
        totlePages: 40, //总共记录数
        pageSize: 4,
        currentPage: 1,
        dialogTitle: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        updateDataId:'',
        ruleForm: {
          cinemaName: '',
          address: '',
          servicePhone: '',
          cinemaBrief: ''
        },
        rules: {
          cinemaName: [{
            required: true,
            message: '请输入影院名称',
            trigger: 'blur'
          }],
          address: [{
            required: true,
            message: '请输入地址',
            trigger: 'blur'
          }],
          servicePhone: [{
            required: true,
            message: '请输入客服电话',
            trigger: 'blur'
          }],
          cinemaBrief: [{
            required: true,
            message: '请输入影院介绍',
            trigger: 'blur'
          }]
        }
      }
    },
    components: {},
    watch: {
      filterKey(newVal) {
        // console.log(newVal)
        // if (saveTemp.length != 0) {
        //   this.queryFilter(newVal)
        // }
        this.queryFilter(newVal)
      }
    },
    computed: {},
    mounted() {
      this.getAjaxData()
    },
    methods: {
      handleEdit(index, row) {
        let cinemaId = row.cinemaId
        let ruleForm = this.ruleForm
        ruleForm.cinemaName = row.cinemaName
        ruleForm.address = row.address
        ruleForm.servicePhone = row.servicePhone
        ruleForm.cinemaBrief = row.cinemaBrief
        this.dialogFormVisible = true
        this.dialogTitle = '编辑影院'
        this.updateDataId = cinemaId

      },
      handleDelete(index, row) {
        let cinemaId = row.cinemaId
        let cinemaName = row.cinemaName

        this.$api.deleteCinema(cinemaId).then(res => {
          console.log(res)
          let status = res.status
          let data = res.data
          if (status == 200) {
            this.$notify({
              title: '成功',
              message: '删除名为：' +cinemaName + ' 影院的这条记录成功！',
              type: 'success'
            });
            this.getAjaxData()
          } else {
            this.$notify({
              title: '成功',
              message: '删除名为：' + cinemaName+ ' 影院的这条记录失败！',
              type: 'error'
            })

          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getAjaxData()
      },
      addBtn() {
        this.dialogFormVisible = true
        this.dialogTitle = '新增影厅'
      },
      submitForm(formName) {
        if (this.dialogTitle == '新增影厅') {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              let postData = this.ruleForm
              this.creatData(postData)
              this.dialogFormVisible = false
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              let postData = this.ruleForm
              this.updateData(postData)
              this.dialogFormVisible = false
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }

      },
      queryFilter(filterKey) {
        // let showListTemp = saveTemp
        // let showList = showListTemp.filter((value) => {
        //   return (value.cinemaName.indexOf(filterKey) > -1)
        // })
        // this.tableData = showList
        this.getAjaxData()
      },
      getAjaxData() {
        let _this = this
        let currentPage = this.currentPage
        let pageSize = this.pageSize
        let filterKey = this.filterKey
        this.$api.getCinemas(filterKey, currentPage, pageSize).then(res => {
          console.log(res)
          let data = res.data
          _this.tableData = data.list
          _this.totlePages = data.totlePages
          _this.currentPage = data.currentPage
          _this.pageSize = data.pageSize
          saveTemp = data
        }).catch(error => {
          console.log(error)
        })
      },
      creatData(postData) {
        let cinemaName = postData.cinemaName
        let address = postData.address
        let servicePhone = postData.servicePhone
        let cinemaBrief = postData.cinemaBrief
        this.$api.createCinema(cinemaName, address, servicePhone, cinemaBrief).then(res => {
          console.log(res)
          let status = res.status
          let data = res.data
          if (status == 200) {
            this.$notify({
              title: '成功',
              message: '增加名为：' + data.name + ' 影院的这条记录成功！',
              type: 'success'
            });
            this.getAjaxData()
            this.ruleForm.cinemaName = ''
            this.ruleForm.address = ''
            this.ruleForm.servicePhone = ''
            this.ruleForm.cinemaBrief = ''
          } else {
            this.$notify({
              title: '成功',
              message: '增加名为：' + data.name + ' 影院的这条记录失败！',
              type: 'error'
            })

          }
        }).catch(error => {
          console.log(error)
        })
      },
      updateData(postData) {
        let cinemaId = this.updateDataId
        let cinemaName = postData.cinemaName
        let address = postData.address
        let servicePhone = postData.servicePhone
        let cinemaBrief = postData.cinemaBrief

        this.$api.updateCinema(cinemaId, cinemaName, address, servicePhone, cinemaBrief).then(res => {
          console.log(res)
          let status = res.status
          let data = res.data
          if (status == 200) {
            this.$notify({
              title: '成功',
              message: '编辑成功！',
              type: 'success'
            });
            this.getAjaxData()
             this.ruleForm.cinemaName = ''
            this.ruleForm.address = ''
            this.ruleForm.servicePhone = ''
            this.ruleForm.cinemaBrief = ''
          } else {
            this.$notify({
              title: '成功',
              message: '删除失败！',
              type: 'error'
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },

    }
  }

</script>

<style lang='scss' scoped>
  @import 'src/style/_vars.scss';

  .cinema-view {
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
