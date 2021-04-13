<template>
  <div class="app-container">
    <el-form ref="newuser" :model="newuser" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="newuser.username" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="newuser.password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(newuser.username,newuser.password)">创建用户</el-button>
        <el-button @click="onCancel">取消创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'

export default {
  data() {
    return {
      newuser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(username, password) {
      MessageBox.confirm('您确定添加这个用户吗？', '添加确认', {
        confirmButtonText: '确认添加',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/addUser', { username, password }).then(
          (response) => {
            const { message } = response
            this.$message({
              message: message,
              type: 'success'
            })
          }
        ).catch(() => {
          this.deleteLoading = false
        })
      }).catch(() => {
        this.deleteLoading = false
      })
    },
    onCancel() {
      this.newuser.username = ''
      this.newuser.password = ''
      this.$message({
        message: '取消创建！',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
