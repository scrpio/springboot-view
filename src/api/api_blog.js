import * as API from '@/utils/request'

export default {
  // 查询获取 blog 列表(通过page分页)
  findList: params => {
    return API.GET('/blog/list', params)
  },

  getBlogTop5: params => {
    return API.GET('/blog/top5', params)
  },
  
  getBlog: id => {
    return API.GET(`/blog/${id}`)
  },

  add: params => {
    return API.POST('/blog/add', params)
  },

  edit: params => {
    return API.PUT('/blog/edit', params)
  },

  remove: params => {
    return API.DELETE('/blog/remove', params)
  }
}
