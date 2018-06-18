<template>
  <div class="admin-view">
    <el-row class="table-box">
      <el-row class="action-box" :gutter="20">
        <el-col class="search-input" :span="6" :offset="12">
          <el-input :placeholder="placeHolderTips" prefix-icon="el-icon-search" v-model="filterKey" clearable>
          </el-input>
        </el-col>
        <!-- <el-col :span="4" :offset="1">
          <el-button type="primary" @click="addBtn">新增</el-button>
        </el-col> -->
      </el-row>
      <el-table :data="tableData" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
        style="width: 100%" fixed border stripe max-height="500" :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
        <el-table-column label="管理员账号" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.adminId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理员昵称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.nickName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影院ID" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cinemaId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影院名称" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.cinemaName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限" width="150">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.power }}</span>
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
        <el-form-item label="管理员账号" :label-width="formLabelWidth" prop="adminId">
          <el-input v-model="ruleForm.adminId" :disabled="dialogTitle === '编辑管理员信息'" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="影院ID" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.cinemaId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickName">
          <el-input v-model="ruleForm.nickName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限" :label-width="formLabelWidth" prop="power">
          <el-radio-group v-model="ruleForm.power">
            <el-radio label="系统管理员"></el-radio>
            <el-radio label="影院管理员"></el-radio>
          </el-radio-group>
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
    adminMockData
  } from '@/config/mock'

  var saveTemp = '' //保存数据列表
  export default {
    name: 'admin-view',
    data() {
      return {
        loading: false,
        tableData: [],
        placeHolderTips: '请输入管理员昵称...',
        filterKey: '',
        totlePages: 40,
        pageSize: 4,
        currentPage: 1,
        dialogTitle: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        ruleForm: {
          adminId: '',
          cinemaId: '',
          nickName: '',
          power: ''
        },
        rules: {
          adminId: [{
            required: true,
            message: '请输入管理员账号',
            trigger: 'blur'
          }, {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'change'
          }],
          nickName: [{
            required: true,
            message: '请输入昵称',
            trigger: 'blur'
          }],
          power: [{
            required: true,
            message: '请选择管理员权限',
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
        let id = row.cinemaId
        let ruleForm = this.ruleForm
        ruleForm.adminId = row.adminId
        ruleForm.cinemaId = row.cinemaId
        ruleForm.nickname = row.nickName
        ruleForm.power = row.power
        this.dialogFormVisible = true
        this.dialogTitle = '编辑管理员信息'
      },
      handleDelete(index, row) {
        let adminId = row.adminId

        this.$api.deleteAdmin(adminId).then(res => {
          console.log(res)
          let status = res.status
          let data = res.data
          if (status == 200) {
            this.$notify({
              title: '成功',
              message: '删除名为：' + data.name + ' 这条记录成功！',
              type: 'success'
            });
            this.getAjaxData()
          } else {
            this.$notify({
              title: '成功',
              message: '删除名为：' + data.name + ' 这条记录失败！',
              type: 'error'
            })

          }
        }).catch(error => {
          console.log(error)
        })

      },
      addBtn() {
        this.dialogFormVisible = true
        this.dialogTitle = '新增管理员信息'
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
        this.getAjaxData()
      },
      submitForm(formName) {
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
      },
      queryFilter(filterKey) {
        // let showListTemp = saveTemp
        // let showList = showListTemp.filter((value) => {
        //   return (value.nickName.indexOf(filterKey) > -1)
        // })
        // this.tableData = showList
        this.getAjaxData()

      },
      getAjaxData() {
        let _this = this
        let currentPage = this.currentPage
        let pageSize = this.pageSize
        let filterKey = this.filterKey
        this.$api.getAdmins(filterKey, currentPage, pageSize).then(res => {
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
        let nickName = postData.nickName
        let adminId = postData.adminId
        let power = postData.power
        let cinemaId = postData.cinemaId
        this.$api.createAdmin(adminId, nickName, cinemaId, power).then(res => {
          console.log(res)
          let status = res.status
          let data = res.data
          if (status == 200) {
            this.$notify({
              title: '成功',
              message: '增加名为：' + data.name + ' 管理员的这条记录成功！',
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
              message: '增加名为：' + data.name + ' 管理员的这条记录失败！',
              type: 'error'
            })

          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }

</script>

<style lang='scss' scoped>
  @import 'src/style/_vars.scss';

  .admin-view {
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
