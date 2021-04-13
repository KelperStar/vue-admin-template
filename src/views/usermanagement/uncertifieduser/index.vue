<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="密码" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.password }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="申请时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.submission_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="success" :loading="addLoading" @click="addUser(scope.row.username, scope.row.password, scope.$index)">同意添加</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUncertifiedUserList } from '@/api/user'
import { MessageBox } from 'element-ui'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      addLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      getUncertifiedUserList().then(response => {
        this.listLoading = false
        const { submission_list } = response.data
        this.list = submission_list
      }).catch(() => {
        this.listLoading = false
        this.$message.error('无法加载列表')
      })
    },
    addUser(username, password, index) {
      this.addLoading = true
      this.$store.dispatch('user/addUser', { username, password }).then(
        (response) => {
          this.addLoading = false
          const { message } = response
          this.list.splice(index, 1)
          this.$message({
            message: message,
            type: 'success'
          })
        }
      ).catch(() => {
        this.addLoading = false
      })
    }
  }
}

</script>

<style lang="scss" >
.el-table::before  {
  border: none;
  height: 0px;
}
</style>
