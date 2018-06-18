<template>
  <div class="film-view">
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
      <el-table :data="tableData" style="width: 100%" border stripe max-height="500" :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column label="影片编号" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.filmId }}</span>
          </template>
        </el-table-column>
        <el-table-column label="影片名称" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.filmName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时长" width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.duration }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.filmType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="海报图" width="180">
          <template slot-scope="scope">
            <span style="display:block;margin-left: 10px；width:200px; height:200px;">
              <img :src="scope.row.poster" style="max-width:100%; height:auto;">
            </span>
          </template>
        </el-table-column>
        <el-table-column label="影片介绍" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.filmBreif }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" class="action" width="280">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="warning" @click="handleSchedule(scope.$index, scope.row)">排期</el-button>
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
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-if="!clickSchedule">
        <el-form-item label="影片名称" :label-width="formLabelWidth" prop="filmName">
          <el-input v-model="ruleForm.filmName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长" :label-width="formLabelWidth" prop="duration">
          <el-input v-model="ruleForm.duration" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="影片类型" :label-width="formLabelWidth" prop="filmType">
          <el-input v-model="ruleForm.filmType" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="影片介绍" :label-width="formLabelWidth" prop="filmBreif">
          <el-input v-model="ruleForm.filmBreif" auto-complete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
          <el-input v-model="ruleForm.price" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="海报图" :label-width="formLabelWidth" prop="poster">
          <el-upload class="upload-demo" action="" :on-preview="handlePreviewPoster" :on-remove="handleRemovePoster" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" v-else>
        <el-form-item label="影片名称" :label-width="formLabelWidth" prop="filmName">
          <el-input v-model="ruleForm.filmName" disabled auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排期日期" prop="scheduleDate" :label-width="formLabelWidth">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.scheduleDate" style="width: 100%;"></el-date-picker>
          </el-col>
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
    filmMockData
  } from '@/config/mock'

  var saveTemp = ''
  export default {
    name: 'film-view',
    data() {
      return {
        tableData: filmMockData,
        placeHolderTips: '请输入影片名称',
        filterKey: '',
        totlePages: 40,
        pageSize: 4,
        currentPage: 1,
        clickSchedule: false,
        dialogTitle: '',
        dialogFormVisible: false,
        formLabelWidth: '120px',
        ruleForm: {
          filmName: '',
          duration: '',
          filmType: '',
          filmBreif: '',
          price: '',
          scheduleDate: ''
        },
        rules: {
          filmName: [{
            required: true,
            message: '请输入影片名称',
            trigger: 'blur'
          }],
          duration: [{
            required: true,
            message: '请输入影片时长',
            trigger: 'blur'
          }],
          filmType: [{
            required: true,
            message: '请输入影片类型',
            trigger: 'blur'
          }],
          filmBreif: [{
            required: true,
            message: '请输入影片介绍',
            trigger: 'blur'
          }],
          price: [{
            required: true,
            message: '请输入影片价格',
            trigger: 'blur'
          }],
          scheduleDate: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
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
        ruleForm.filmName = row.filmName
        ruleForm.duration = row.duration
        ruleForm.filmType = row.filmType
        ruleForm.price = row.price
        ruleForm.filmBreif = row.filmBreif
        this.clickSchedule = false
        this.dialogFormVisible = true
        this.dialogTitle = '编辑影片'
      },
      handleDelete(index, row) {
        let name = row.screenName
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
      handleSchedule(index, row) {
        console.log(index, row);
        let id = row.screenId
        let ruleForm = this.ruleForm
        ruleForm.filmName = row.filmName
        this.dialogFormVisible = true
        this.clickSchedule = true
        this.dialogTitle = '影片排期'
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      addBtn() {
        this.clickSchedule = false
        this.dialogFormVisible = true
        this.dialogTitle = '新增影片'
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            let isSchedule = this.clickSchedule
            if (isSchedule) {

            } else {

            }
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
          return (value.filmName.indexOf(filterKey) > -1)
        })
        this.tableData = showList
        console.log(this.tableData)
      },
      getAjaxData() {
        saveTemp = filmMockData
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

  .film-view {
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
