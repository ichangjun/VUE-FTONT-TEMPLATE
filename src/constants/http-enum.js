/*
 * @Author: changjun anson1992@163.com
 * @Date: 2022-04-27 16:03:29
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-09-18 16:47:47
 * @FilePath: /KD-KDPLUS-OPEN/src/utils/axios-http/http-enum.js
 * @Description: request 请求枚举
 */
/**
 * 请求结果返回码
 */
export const ResultEnum = {
  SUCCESS: 200,
  ERROR: -1,
  NO_AUTH: 401,
  NO_PACKAGE: 307,
  NO_PERMISSION: 403,
}

/**
 * 请求方法
 */

export const RequestTypeEnum = {
  // 获取
  GET: 'GET',
  // 发送post请求
  POST: 'POST',
  // 发送put请求
  PUT: 'PUT',
  // 发送delete请求
  DELETE: 'DELETE',
  // 发送patch请求
  PATCH: 'PATCH',
}

export const ContentTypeEnum = {
  // JSON
  JSON: 'application/json;charset=UTF-8',
  // Text
  Text: 'text/plain;charset=UTF-8',
  // form-data 上传
  FORM_DATA: 'application/x-www-form-urlencoded',
  // form-data 一般配合qs
  FORM_URLENCODED: 'application/x-www-form-urlencoded;charset=UTF-8',
}
