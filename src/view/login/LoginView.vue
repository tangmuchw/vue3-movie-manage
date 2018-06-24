<template>
  <div class="login-view">
    <transition name="form-fade" mode="in-out">
      <section class="form-contianer" v-show="showLogin">
        <div class="manage-tip">
          <p>Kou Movie后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名" clearable>
              <span>dsfsf</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
        <p class="tips">拥有账号的用户可凭账号密码登录</p>
      </section>
    </transition>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import * as types from '@/store/types'
  import md5 from 'md5'

  export default {
    name: 'login-view',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }, {
            type: 'email',
            message: '请输入正确的邮箱',
            trigger: 'change'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
        showLogin: false,
      }
    },
    mounted() {
      this.showLogin = true;

    },
    computed: {

    },
    methods: {
      submitForm(formName) {
        let _this = this
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let loginForm = _this.loginForm
            let adminId = loginForm.username
            let password = loginForm.password
            let mdPwd =md5(password)
            this.$api.login(adminId, mdPwd).then(res => {
              console.log(res)
              // _this.tableData = data
              // saveTemp = data
              let data = res.data
              let status = res.status
              console.log(status)
              if (status == 200) {
                let cinemaId = data.cinemaId
                _this.$message({
                  type: 'success',
                  message: '登录成功'
                });
                _this.$store.commit(types.LOGIN, {
                  id: loginForm.username,
                  name: loginForm.password,
                  cinemaId: cinemaId
                })
                _this.$router.push({name: 'HomeView'})

              } else {
                let msg = res.message
                _this.$message({
                  type: 'error',
                  message: msg
                });
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '请输入正确的用户名密码',
              offset: 100
            });
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import 'src/style/_vars.scss';

  .login-view {
    width: 100%;
    height: 100%;
    background: $bg-view-color;
    .form-contianer {
      width: 320px;
      height: 250px;
      padding: 25px;
      border-radius: 5px;
      text-align: center;
      background-color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -185px;
      margin-left: -150px;
      .manage_tip {
        p {
          font-size: 34px;
          color: #fff;
        }
      }
      .submit_btn {
        width: 100%;
        font-size: 16px;
      }
      .tips {
        font-size: 12px;
        color: $tips-color;
      }

    }

    .form-fade-enter-active,
    .form-fade-leave-active {
      transition: all 1s;
    }
    .form-fade-enter,
    .form-fade-leave-active {
      transform: translate3d(0, -50px, 0);
      opacity: 0;
    }
  }

</style>
