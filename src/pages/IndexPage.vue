<template>
  <div class="index-page">
    <a-input-search placeholder="input search text" enter-button="Search" size="large" @search="onSearch" v-model="searchParams.searchText" />
    <MyDivider />
    <a-tabs v-model="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :postList="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" force-render>
        <PictureList :pictureList="pictureList" />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList :userList="userList" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
// 引入组件
import PostList from '../components/PostList'
import UserList from '../components/UserList'
import PictureList from '../components/PictureList'
import MyDivider from '../components/MyDivider'
// 引入axiox
import myAxios from '../plugins/myAxios'
import { message } from 'ant-design-vue'
export default {
  name: 'IndexPage',
  components: {
    PostList,
    UserList,
    PictureList,
    MyDivider
  },
  data() {
    return {
      activeKey: this.$route.params.category || 'post',
      searchParams: {
        searchText: this.$route.query.searchText || '',
        pageSize: 10,
        pageNum: 1
      },
      postList: [],
      userList: [],
      pictureList: []
    }
  },
  methods: {
    onSearch(searchText) {
      // 如果路由相同 不重复跳转
      if (!this.$route.fullPath === `/${this.activeKey}?searchText=${searchText}` || this.$route.fullPath === '/') {
        this.$router.push({
          path: `/${this.activeKey}`,
          query: { ...this.searchParams }
        })
      }
      this.searchDate()
    },
    onTabChange(activeKey) {
      this.activeKey = activeKey
      this.$router.push({
        path: `/${activeKey}`,
        query: { ...this.searchParams }
      })
      this.searchDate()
    },
    // searchPost() {
    //   myAxios.post('/post/list/page/vo', { ...this.searchParams }).then(
    //     response => {
    //       this.postList = response.records
    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   )
    // },
    // searchPicture() {
    //   myAxios.post('/picture/list/page/vo', { ...this.searchParams }).then(
    //     response => {
    //       this.pictureList = response.records
    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   )
    // },
    // searchUser() {
    //   myAxios
    //     .post('/user/list/page/vo', {
    //       userName: this.searchParams.searchText,
    //       ...this.searchParams
    //     })
    //     .then(
    //       response => {
    //         this.userList = response.records
    //       },
    //       error => {
    //         console.log(error)
    //       }
    //     )
    // },

    // 封装查询
    searchDate() {
      if (!this.activeKey) {
        message.error('类型为空')
      }
      if (!this.searchParams.searchText) {
        return
      }
      myAxios
        .post('/search/all', {
          ...this.searchParams,
          type: this.activeKey
        })
        .then(
          response => {
            switch (this.activeKey) {
              case 'user':
                this.userList = response.dataList
                break
              case 'post':
                this.postList = response.dataList
                break
              case 'picture':
                this.pictureList = response.dataList
                break
              default:
                break
            }
            console.log(response)
          },
          error => {
            console.log(error)
          }
        )
    },
    searchAllDate() {
      if (!this.searchParams.searchText) {
        alert('搜索数据为空')
        return
      }
      myAxios
        .post('/search/all', {
          ...this.searchParams
        })
        .then(
          response => {
            this.userList = response.userList
            this.postList = response.postList
            this.pictureList = response.pictureList
          },
          error => {
            console.log(error)
          }
        )
    }
  },

  mounted() {},
  created() {
    // 刷新的时候 searchParams同步路由中的数据 再调用接口进行查询
    if (this.searchParams.searchText) {
      this.searchDate()
    }
  }
}
</script>

<style></style>
