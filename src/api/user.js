import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login/',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/register/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout/',
    method: 'post'
  })
}

export function getUserList() {
  return request({
    url: '/user/exist/',
    method: 'post'
  })
}

export function getUncertifiedUserList() {
  return request({
    url: '/user/new/',
    method: 'post'
  })
}

export function deleteUser(data) {
  return request({
    url: '/user/delete/',
    method: 'post',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/user/add/',
    method: 'post',
    data
  })
}
