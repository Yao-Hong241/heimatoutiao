<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="filterParams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <my-channel v-model="filterParams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="dateArr"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search()">筛 选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- // 筛选结果区域 -->
    <el-card>
      <div slot="header">根据筛选条件共查询到 {{total}} 条结果：</div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" style="width:150px;height:100px;">
              <div slot="error">
                <img src="../../assets/error.gif" style="width:150px;height:100px;" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1" >待审核</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" plain type="primary" icon="el-icon-edit" circle></el-button>
            <el-button @click="delArticle(scope.row.id)" plain type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top:20px;text-align:right;"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="changePager"
        :current-page="filterParams.page"
        :page-size="filterParams.per_page"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 筛选条件对象
      filterParams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 20
      },
      // // 频道选择对象
      // channelOptions: [],
      // 日期选择后的数组[起始日期,结束日期]
      dateArr: [],
      // 文章列表
      articles: [],
      // 总条数
      total: 0
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // 编辑文章
    toEdit (articleID) {
      this.$router.push(`/publish?id=${articleID}`)
    },
    // 文章删除
    async delArticle (articleID) {
      // 发送删除请求
      try {
        await this.$http.delete(`articles/${articleID}`)
        this.$message.success('删除成功')
        this.getArticles()
      } catch (e) {
        this.$message.error('删除失败')
      }
    },
    // // 获取频道选项的数据
    // async getChannelOptions () {
    //   const {
    //     data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表数据
    async getArticles () {
      const {
        data: { data } } = await this.$http.get('articles', { params: this.filterParams })
      this.articles = data.results
      // console.log(this.articles[0].id.toString())
      // 总条数
      this.total = data.total_count
    },
    // 改变分页
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getArticles()
    },
    // 搜索
    search () {
      // 每次进行搜索的时候，页码应该改成1
      this.filterParams.page = 1
      this.getArticles()
    },
    // 日期选择处理函数
    changeDate (value) {
      if (value) {
        this.filterParams.begin_pubdate = value[0]
        this.filterParams.end_pubdate = value[1]
      } else {
        this.filterParams.begin_pubdate = null
        this.filterParams.end_pubdate = null
      }
    }
    // // 频道选择处理函数
    // changeChannel () {
    //   if (this.filterParams.channel_id === '') this.filterParams.channel_id = null
    // }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-bottom: 20px;
}
</style>
