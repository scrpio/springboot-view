<template>
  <el-card :body-style="{ padding: '0px' }">
    <div class="card-header">
      <h6>{{ title }}</h6>
    </div>
    <div class="card-body">
      <div v-for="(item, idx) in blogs" :key="idx" :class="idx===blogs.length-1?'':'blog-comments'">
        <div class="blog-comments-item">
          <div class="blog-comments-avatar">
            <img v-if="item.avatar" :src="item.avatar"/>
            <img v-else src="../../../assets/images/avatars/avatar.png"/>
            <span>{{ item.author }}</span>
          </div>
          <div class="blog-comments-content">
            <p type="text" class="text-secondary" @click="jumpTo(item.id)">{{ item.title }}</p>
            <p class="text-muted">{{ item.publish_time }} - {{ item.essential }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card-foot">
      <el-button type="text" @click="handleClick('view-all-comments')">
        查看全部<i class="el-icon-d-arrow-right"/>
      </el-button>
    </div>
  </el-card>
</template>

<script>
import API from '@/api/api_blog'
import { dateFormat } from '@/utils'

export default {
  name: 'discussions',
  props: {
    title: {
      type: String,
      default: '热门话题',
    }
  },
  data() {
    return {
      blogs: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    handleClick(action, id) {
      this.$router.push('/blog/list')
    },
    jumpTo(id) {
      this.$router.push({
        path: '/blog/content',
        name: '详细内容',
        params: {
          id: id
        }
      })
    },
    fetchData() {
      API.getBlogTop5().then(response => {
        var res = response.data
        if (res.length > 0) {
          for (var i = 0; i < res.length; i++) {
            res[i].publish_time = dateFormat(res[i].publish_time)
          }
        }
        this.blogs = res
      }).catch(() => {})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-card {
  max-height: 605px;
  margin-bottom: 10px;
}
.card-header {
  font-size: 15px;
  font-weight: 500;
  padding: 16px;
  border-bottom: 1px solid #e1e5eb;
}
.card-body {
  padding: 0;
}
.blog-comments {
  border-bottom: 1px solid #e1e5eb;  
}
.blog-comments-item {
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
.blog-comments-avatar {
  display: inline-block;
  width: 20%;
  text-align: center;
}
.blog-comments-avatar img {
  border-radius: 60px;
  width: 60px;
  height: 60px;
}
.blog-comments-avatar span {
  display: block;  
}
.blog-comments-content {
  display: inline-block;
  width: 75%;
}
.text-secondary {
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 16px;
  color: #000;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  cursor: pointer;
}
.text-secondary:active {
  color: #3a8ee6;
}
.text-secondary:hover {
  color: #66b1ff;
}
.text-muted {
  font-size: 14px;
  color: #888;
  position: relative;
  line-height: 20px;
  max-height: 40px;
  overflow: hidden;
}
.text-muted::after{
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 40px;
  background: -webkit-linear-gradient(left, transparent, #fff 55%);
  background: -o-linear-gradient(right, transparent, #fff 55%);
  background: -moz-linear-gradient(right, transparent, #fff 55%);
  background: linear-gradient(to right, transparent, #fff 55%);
}
.card-foot {
  padding: 10px;
  border-top: 1px solid #e1e5eb;
  text-align: right;
}
</style>
