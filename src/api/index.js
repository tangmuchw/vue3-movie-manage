import axios, {
  MovieServer
} from '@/http'
import * as context from './context'
import store from '@/store/store'

class Api {
  /**
   * 获取影院列表
   * @param currentPage Number
   * @param query String
   * @param pageSize Number
   */
  getCinemas(query,currentPage,pageSize) {
    return MovieServer.post(context.MOVIE_API.CINEMAS,{
      queryCondition:query,
      currentPage:currentPage,
      pageSize:pageSize
    })
  }

  /**
   * 创建影院
   */
  createCinema(cinemaName, address,servicePhone,cinemaBrief) {
    return MovieServer.post(context.MOVIE_API.CREATE_CINEMA, {
      cinemaName:cinemaName,
      address:address,
      servicePhone:servicePhone,
      cinemaBrief:cinemaBrief
    })
  }

   /**
   * 编辑影院
   */
  updateCinema(cinemaId,cinemaName, address,servicePhone,cinemaBrief) {
    return MovieServer.post(context.MOVIE_API.UPDATE_CINEMA, {
      cinemaId:cinemaId,
      cinemaName:cinemaName,
      address:address,
      servicePhone:servicePhone,
      cinemaBrief:cinemaBrief
    })
  }

    /**
   * 删除影院
   */
  deleteCinema(cinemaId) {
    return MovieServer.post(context.MOVIE_API.DELETE_CINEMA, {
      cinemaId:cinemaId
    })
  }


  findOneCinema(cinemaId) {
    return MovieServer.post(context.MOVIE_API.FIND_ONE_CINEMA, {
      cinemaId:cinemaId,
    })
  }


   /**
   * 登录
   * @param currentPage String
   */
  login(adminId,password) {
    return MovieServer.post(context.MOVIE_API.LOGIN,{
      adminId:adminId,
      password:password
    })
  }
   /**
   * 获取管理员列表
   */
  getAdmins(query,currentPage,pageSize) {
    return MovieServer.post(context.MOVIE_API.ADMINS,{
      queryCondition:query,
      currentPage:currentPage,
      pageSize:pageSize
    })
  }

  /**
   * 创建管理员
   */
  createAdmin(adminId,nickName, cinemaId,power) {
    return MovieServer.post(context.MOVIE_API.CREATE_ADMINS, {
      adminId:adminId,
      nickName:nickName,
      cinemaId:cinemaId,
      power:power
    })
  }

   /**
   * 编辑管理员
   */
  updateAdmin(adminId,nickName,cinemaId,power) {
    return MovieServer.post(context.MOVIE_API.UPDATE_ADMINS, {
      nickName:nickName,
      adminId:adminId,
      cinemaId:cinemaId,
      power:power
    })
  }

    /**
   * 删除管理员
   */
  deleteAdmin(adminId) {
    return MovieServer.post(context.MOVIE_API.DELETE_ADMINS, {
      adminId:adminId
    })
  }



}

export default new Api()
