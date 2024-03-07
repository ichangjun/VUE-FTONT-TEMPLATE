import request from '../utils/request/index'
/**
 * 登录
 */
export const loginUser = (data) => {
  return request.request({
    url: 'clubApi/sys/login',
    method: 'POST',
    data,
  })
}
/**
 * 获取用户信息
 */
export const getProfile = () => {
  return request.request({
    url: 'clubApi/user/profile',
  })
}
