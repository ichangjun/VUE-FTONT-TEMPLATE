/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-09-18 11:47:43
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-09 15:13:21
 * @FilePath: /vue-front-template/src/api/category.js
 * @Description: 分类接口
 */
import request from '../utils/request/index'

/**
 * 获取分类列表
 * @returns {Promise<any>}
 */
export const getCatetoryList = () => {
  return request.request({
    url: 'clubApi/category',
    method: 'GET',
  })
}
