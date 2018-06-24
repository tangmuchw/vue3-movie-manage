<template>
  <div class="home-view">
    <el-container class="home-container">
      <el-aside class="aside-menu">
        <el-row class="title-tips">
          <h3>抠电影票务管理后台</h3>
        </el-row>
        <el-menu default-active="cinema-menu" class="el-menu-vertical-demo " @open="handleOpenMenu" @close="handleCloseMenu" @select="handleSelectMenu"
          background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="cinema-menu">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的影院</span>
            </template>
            <el-menu-item index="CinemaView">影院信息管理</el-menu-item>
          </el-submenu>
         <el-submenu index="screen-menu">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>我的影厅</span>
            </template>
            <el-menu-item index="ScreenView">影厅信息管理</el-menu-item>
          </el-submenu>
          <el-submenu index="film-menu">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>我的影片</span>
            </template>
            <el-menu-item index="FilmView">影片信息管理</el-menu-item> 
           <el-menu-item index="FilmScheduleView">排期信息管理</el-menu-item> 
         </el-submenu> 
         <el-submenu index="order-menu">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我的用户</span>
            </template>
            <el-menu-item index="OrderView">订单信息管理</el-menu-item>
            <el-menu-item index="UserView">用户信息查看</el-menu-item>
          </el-submenu>
          <el-submenu index="admin-menu">
            <template slot="title">
              <i class="el-icon-edit"></i>
              <span>管理员</span>
            </template>
            <el-menu-item index="AdminView">管理员信息管理</el-menu-item> 
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container class="right-container">
       <!-- 头部导航  -->
        <el-header class="header-bar">
          <el-dropdown trigger="click" @command="handleCommandHeader">
            <span class="el-dropdown-link admin-nick-name">
              {{adminNickName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="HomeView">首页</el-dropdown-item>
              <el-dropdown-item command="LogOut">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main class="main">
         <!-- 面包屑导航  -->
          <el-breadcrumb class="bread-crumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item, breadIndex) in breadCrumb" :key="breadIndex">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-row class="blank-welcome" v-if="breadCrumb.length == 1">
            <el-row class="tags">
              <el-tag type="success">{{welcomeSentence}}</el-tag>
              <el-tag type="warning">今天天气真好</el-tag>
              <el-tag type="success">祝您心情愉快</el-tag>
              <el-tag type="danger">马上就是周末啦</el-tag>
            </el-row>
            <el-row class="picture">
              <img :src="welcomePicture">
            </el-row>
          </el-row>
          <router-view v-else/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {
    cinemaMockData
  } from '@/config/mock'

  export default {
    name: 'home-view',
    data() {
      return {
        adminNickName: '胖猫咪',
        tableData: cinemaMockData,
        placeHolderTips: '请输入影院名称',
        filterKey: '',
        breadCrumb: '',
        welcomePicture: 'static/img/welcome.jpg',
        welcomeSentence: '欢迎您的到来'
      }
    },
    components: {},
    computed: {},
    watch: {
      $route() {
        let breadCrumbArray = this.$route.meta.breadCrumb
        this.breadCrumb = breadCrumbArray
      }
    },
    mounted() {
      let breadCrumbArray = this.$route.meta.breadCrumb
      this.breadCrumb = breadCrumbArray
    },
    methods: {
      handleOpenMenu(key, keyPath) {
        // console.log('open---', key, keyPath);
      },
      handleSelectMenu(key, keyPath) {
        // console.log('select---', key, keyPath);
        this.$router.push({
          name: key
        })
      },
      handleCloseMenu(key, keyPath) {
        // console.log('close---', key, keyPath);
      },
      handleCommandHeader(command) {

        switch (command) {
          case 'LogOut':
            this.$store.commit(types.LOGOUT)
            this.$router.replace({
              name: 'LoginView'
            })
            break
            case 'HomeView':
            this.$router.replace({
              name: 'HomeView'
            })
        }
        console.log(command)
      }

    }
  }

</script>

<style lang='scss' scoped>
  @import 'src/style/_vars.scss';

  .home-view {
    width: 100%;
    height: 100%;

    .home-container {
      height: 100%;
      .title-tips {
        text-align: center;
        background: $dark-color;
      }
      .header-bar {
        .admin-nick-name {
          &:hover {
            cursor: pointer;
          }
        }
      }
      .aside-menu {
        width: 300px;
        background: rgb(84, 92, 100);
      }
      .right-container {
        .header-bar {
          text-align: right;
          font-size: 12px;
          line-height: 60px;
          border-bottom: 1px solid $dark-color;
          background: #f1f8fe;
        }
        .main {
          width: 100%;
          height: 100%;
          padding: 20px 10px 100px 10px;

          background: $dark-color;
          .back-home {
            cursor: pointer;
          }
          .bread-crumb {
            margin-bottom: 20px;
          }
          .blank-welcome {
            background: $base-view-color;
            padding: 20px 0 50px 0;
            .tags {
              width: 500px;
              margin: 0 auto;
            }
            .picture {
              width: 340px;
              margin: 0 auto;
            }
          }
        }
      }
    }

  }

</style>
