import App from '../App'
// const CinemaView = r => require.ensure([], () => r(require('@/view/cinema/CinemaView')), 'CinemaSelect')
const Hello = r => require.ensure([], () => r(require('@/view/HelloWorld')), 'HelloWord')
const LoginView = r => require.ensure([], () => r(require('@/view/login/LoginView')), 'LoginView')
const HomeView = r => require.ensure([], () => r(require('@/view/home/HomeView')), 'HomeView')
const AdminView = r => require.ensure([], () => r(require('@/view/admin/AdminView')), 'AdminView')
const CinemaView = r => require.ensure([], () => r(require('@/view/cinema/CinemaView')), 'CinemaView')
const ScreenView = r => require.ensure([], () => r(require('@/view/screen/ScreenView')), 'ScreenView')
const OrderView = r => require.ensure([], () => r(require('@/view/order/OrderView')), 'OrderView')
const FilmView = r => require.ensure([], () => r(require('@/view/film/FilmView')), 'FilmView')
const FilmScheduleView = r => require.ensure([], () => r(require('@/view/film/FilmScheduleView')), 'FilmScheduleView')
const UserView = r => require.ensure([], () => r(require('@/view/user/UserView')), 'UserView')
const NotFoundView = r => require.ensure([], () => r(require('@/view/error/NotFoundView')), 'NotFoundView')


export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      path: '',
      redirect: {
        name: 'LoginView'
      }
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/home',
      name: 'HomeView',
      component: HomeView,
      meta: {
        // requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
        breadCrumb:['首页']
      },
      children: [{
          path: 'admin',
          name: 'AdminView',
          component: AdminView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','管理员','管理员信息管理']
          }
        },
        {
          path: 'cinema',
          name: 'CinemaView',
          component: CinemaView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','我的影院','影院信息管理']
          }
        },
        {
          path: 'screen',
          name: 'ScreenView',
          component: ScreenView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','我的影厅','影厅信息管理']
          }
        },
        {
          path: 'order',
          name: 'OrderView',
          component: OrderView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','我的用户','订单信息管理']
          }
        },
        ,
        {
          path: 'user/manage',
          name: 'UserView',
          component: UserView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','我的用户','用户信息查看']
          }
        },
        {
          path: 'film/manage',
          name: 'FilmView',
          component: FilmView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','我的影片','影片信息管理']
          }
        },
        {
          path: 'film/schedule',
          name: 'FilmScheduleView',
          component: FilmScheduleView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','我的影片','排期信息管理']
          }
        },
        {
          path: 'error/404',
          name: 'NotFoundView',
          component: NotFoundView,
          meta: {
            // requireAuth: true, 
            breadCrumb:['首页','404']
            
          }
        }
      ]
    }
  ]
}]
