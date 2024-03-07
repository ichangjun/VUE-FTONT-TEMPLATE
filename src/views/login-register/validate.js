/*
 * @Author: changjun anson1992@163.com
 * @Date: 2023-10-20 20:02:09
 * @LastEditors: changjun anson1992@163.com
 * @LastEditTime: 2023-10-20 20:02:15
 * @FilePath: /vue-front-template/src/views/login-register/validate.js
 * @Description: 表单校验
 */
/**
 * 用户名的表单校验
 */
export const validateUsername = (value) => {
  if (!value) {
    return '用户名为必填的'
  }

  if (value.length < 3 || value.length > 12) {
    return '用户名应该在 3-12 位之间'
  }
  return true
}

/**
 * 密码的表单校验
 */
export const validatePassword = (value) => {
  if (!value) {
    return '密码为必填的'
  }

  if (value.length < 6 || value.length > 12) {
    return '密码应该在 6-12 位之间'
  }
  return true
}
