const nameandpass = {
  username: 'admin',
  password: '111111'
}

const users = {
  'root-token': {
    role: 'admin',
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    role: 'editor',
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

module.exports = [
  // user login
  {
    url: '/login/',
    type: 'post',
    response: config => {
      const { username } = config.body
      const { password } = config.body
      // const token = tokens[username]

      // mock error
      // if (!token) {
      //   return {
      //     code: 60204,
      //     message: 'Account and password are incorrect.'
      //   }
      // }
      if (username === nameandpass.username && password === nameandpass.password) {
        return {
          code: 0,
          message: '登录成功',
          data: {
            'token': 'root-token',
            'type': 'admin'
          }
        }
      } else {
        return {
          data: {
            'success': false,
            'token': 'admin-token',
            'message': 'Login error',
            'type': ''
          }
        }
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.headers
      const info = users[token]
      // console.log(token)
      // console.log(config)

      // mock error
      if (!info) {
        return {
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        data: info
      }
    }
  },

  // user register
  {
    url: '/register/',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: '注册成功'
      }
    }
  },

  // user logout
  {
    url: '/logout/',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: '成功登出'
      }
    }
  },

  // user list
  {
    url: '/user/exist/',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: '返回成功',
        data: {
          'user_list': [
            {
              'username': 'root',
              'password': 'root',
              'submission_time': '2011-11-11',
              'approval_time': '2011-11-65'
            },
            {
              'username': 'root',
              'password': 'rrrr',
              'submission_time': '2081-11-23',
              'approval_time': '2011-11-65'
            }
          ]
        }
      }
    }
  },

  // delete user
  {
    url: '/user/delete/',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: '删除失败'
      }
    }
  },

  // add user
  {
    url: '/user/add/',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: '添加成功'
      }
    }
  },

  // user list
  {
    url: '/user/new/',
    type: 'post',
    response: _ => {
      return {
        code: 0,
        message: '返回成功',
        data: {
          'submission_list': [
            {
              'username': 'root',
              'password': 'root',
              'submission_time': '2011-11-11'
            },
            {
              'username': 'root',
              'password': 'rrrr',
              'submission_time': '2081-11-23'
            }
          ]
        }
      }
    }
  }

]
