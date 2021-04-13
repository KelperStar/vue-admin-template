import router, { resetRouter } from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, getName, getRole, getAvatar } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import * as path from 'path'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  const type = getRole()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      // console.log(store.getters.name)
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasGetUserInfo) { // hasGetUserInfo
        console.log('1')
        console.log(type)
        await store.dispatch('permission/GenerateRoutes', { type }).then((routes) => {
          resetRouter()
          router.addRoutes(routes)
          console.log(routes)
        })
        if (to.matched.length === 0) next({ path: to.path })
        else next()
        // next()
      } else {
        try {
          // get roles
          // const {roles} = await store.dispatch('user/getInfo')
          // next(`/login?redirect=${to.path}`)
          // NProgress.done()
          // await store.dispatch('user/resetToken')
          // Message.error('请重新登录')
          // next('/login')
          // NProgress.done()
          await store.dispatch('permission/GenerateRoutes', { type }).then((routes) => {
            router.addRoutes(routes)
          })
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error('Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
