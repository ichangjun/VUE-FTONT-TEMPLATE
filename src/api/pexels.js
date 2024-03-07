/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-09 11:55:29
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-19 22:12:19
 * @FilePath: /vue-front-template/src/api/pexels.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '../utils/request/index'

/**
 * 获取图片数据列表
 * @param {*} params 请求参数
 * @returns
 */
export const getPexelsList = (params) => {
  return request.request({
    url: 'clubApi/pexels/list',
    method: 'get',
    params,
  })
}

/**
 * 搜索提示
 * @param {*} keyword 关键词
 */
export const getHint = (keyword) => {
  return request.request({
    url: 'clubApi/pexels/hint',
    method: 'get',
    params: { q: keyword },
  })
}

/**
 * 获取推荐主题
 */
export const getThemes = () => {
  return request.request({
    url: 'clubApi/pexels/themes',
    method: 'get',
  })
}

/**
 * 获取指定图片数据
 */
export const getPexelsFromId = (id) => {
  return request.request({
    url: `clubApi/pexels/${id}`,
  })
}
