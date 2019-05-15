<template>
  <el-row class="wrap">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb>
        <el-breadcrumb-item>博客管理</el-breadcrumb-item>
        <el-breadcrumb-item>博客列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" v-loading="loading" element-loading-text="拼命加载中" class="wrap-main">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.condition" placeholder="关键词" style="min-width: 240px;" @keyup.enter.native="handleSearch" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" icon="el-icon-delete" @click="remove(ids)">批量删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--列表-->
      <el-table :data="blogs" highlight-current-row border stripe size="mini" style="width: 100%;" @selection-change="selsChange">
        <el-table-column type="selection" width="45" align="center" />
        <el-table-column prop="id" label="ID" width="80" align="center" sortable />
        <el-table-column prop="author" label="作者" min-width="100" sortable />
        <el-table-column prop="title" label="标题" min-width="150" />
        <el-table-column prop="essential" label="摘要" min-width="300" />
        <el-table-column label="重要性" min-width="100" sortable>
          <template slot-scope="scope">
            <i v-for="n in +scope.row.importance" :key="n" class="fa fa-star" style="color: #f7ba2a;"/>
          </template>
        </el-table-column>
        <el-table-column label="状态" min-width="80" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status===1?'success':'warning'">
              {{ scope.row.status===1 ? "已发布" : "草稿" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="publishTime" label="发布时间" min-width="150" align="center" sortable />
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="jumpTo(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination :page-size="10" :total="total" layout="total, prev, pager, next, jumper" style="float:right;" @current-change="handleCurrentChange" />
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
import API from '@/api/api_blog'

export default {
  data() {
    return {
      loading: false,
      blogs: [],
      total: 0,
      page: 1,
      limit: 10,
      ids: [],
      filters: {
        condition: ''
      }
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val
      this.search()
    },
    handleSearch() {
      this.total = 0
      this.page = 1
      this.search()
    },
    selsChange(sels) {
      this.ids = sels.map(row => row.id).toString()
    },
    jumpTo(id) {
      this.$router.push({
        path: '/blog/editor',
        name: '编辑文章',
        params: {
          id: id
        }
      })
    },
    search() {
      var that = this
      var params = {
        page: that.page,
        limit: that.limit
      }
      that.loading = true
      API.findList(params).then(function(result) {
        that.loading = false
        if (result.success) {
          that.total = result.data.total
          that.blogs = result.data.list
        }
      }, function(err) {
        that.loading = false
        that.$message.error({ showClose: true, message: err.toString(), duration: 2000 })
      }).catch(function(error) {
        that.loading = false
        console.log(error)
        that.$message.error({ showClose: true, message: '请求出现异常', duration: 2000 })
      })
    },
    remove(ids) {
      var that = this
      this.$confirm('确认删除该记录吗?', '提示', { type: 'warning' }).then(() => {
        that.loading = true
        API.remove({ ids: ids }).then(function(result) {
          that.loading = false
          if (result.success) {
            that.$message.success({ showClose: true, message: '删除成功', duration: 2000 })
            that.search()
          }
        }, function(err) {
          that.loading = false
          that.$message.error({ showClose: true, message: err.toString(), duration: 2000 })
        }).catch(function(error) {
          that.loading = false
          console.log(error)
          that.$message.error({ showClose: true, message: '请求出现异常', duration: 2000 })
        })
      }).catch(() => {})
    }
  }
}
</script>
