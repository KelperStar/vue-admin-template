import { asyncRoutes, constantRoutes } from '@/router'

function hasPermission(role, route) {
  if (route.meta && route.meta.role) {
    if (role === route.meta.role) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

const state = {
  routers: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.routers = constantRoutes.concat(routers)
  }
}

const actions = {
  GenerateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { type } = data
      const role = type
      const accessedRouters = asyncRoutes.filter(v => {
        if (!v.meta) return true
        if (role === 'admin') return true
        if (hasPermission(role, v)) {
          if (v.children && v.children.length > 0) {
            v.children = v.children.filter(child => {
              if (hasPermission(role, child)) {
                return child
              }
              return false
            })
            return v
          } else {
            return v
          }
        }
        return false
      })
      commit('SET_ROUTERS', accessedRouters)
      resolve(accessedRouters)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

