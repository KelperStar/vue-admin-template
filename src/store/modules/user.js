import { login, logout, getInfo, deleteUser, addUser, register } from '@/api/user'
import { getToken, setToken, removeToken, getName, setName, removeName, getRole, setRole, removeRole, getAvatar, setAvatar, removeAvatar } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import store from '@/store'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getName(),
    password: '',
    avatar: getAvatar(),
    role: getRole()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE: (state, role) => {
    state.role = role
    // console.log(state.role)
  }
}

const actions = {
  // user login
  login: function({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        const { type } = data
        commit('SET_TOKEN', data.token)
        commit('SET_ROLE', data.type)
        commit('SET_NAME', username)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        setToken(data.token)
        setName(username)
        setRole(data.type)
        setAvatar('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        console.log(data.type)
        store.dispatch('permission/GenerateRoutes', { type }).then((routes) => {
          router.addRoutes(routes)
          console.log(routes)
        })
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register: function({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { role, name, avatar } = data

        if (!role || role.length <= 0) {
          reject('getInfo: role must be a non-null array!')
        }

        commit('SET_ROLE', role)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        removeName()
        removeRole()
        removeAvatar()
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // delete user
  deleteUser({ commit, state }, userInfo) {
    const { username } = userInfo
    return new Promise((resolve, reject) => {
      deleteUser({ username: username }).then((response) => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // add user
  addUser({ commit, state }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      addUser({ username: username, password: password }).then((response) => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      removeName()
      removeRole()
      removeAvatar()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

