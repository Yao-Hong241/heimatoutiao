<template>
  <div>
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              v-if="scope.row.comment_status"
              type="success"
              size="small"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" v-else type="danger" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="margin-top:20px"
        layout="prev, pager, next"
        :total="1000"
        :current-page="reqParams.page"
        :page-size="reqParams.per_page"
        @current-change="changePager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 请求参数
      reqParams: {
        page: 1,
        per_page: 20,
        // 获取评论相关信息
        response_type: 'comment'
      },
      // 评论信息列表
      comments: [],
      // 总条数
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    // 切换文章评论状态
    toggleStatus (row) {
      let text = ''
      if (row.comment_status) {
        text = '您确认要打开该文章的评论功能吗？'
      } else {
        text = '关闭评论功能后用户将无法对该文章进行评论，您确认要关闭该文章的评论功能吗？'
      }
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, {
            allow_comment: !row.comment_status
          })
          this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
          // 修改row才能更新列表数据
          row.comment_status = data.allow_comment
        } catch (e) {
          this.$message.error('操作失败')
        }
      }).catch(() => {})
    },
    // 分页
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    },
    // 请求参数
    async getComments () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less" scoped>
</style>
