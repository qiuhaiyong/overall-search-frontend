<template>
  <div class="index-page">
    <a-input-search placeholder="input search text" enter-button="Search" size="large" @search="onSearch" v-model="searchParams.searchText" />
    <MyDivider />
    <a-tabs v-model="activeKey" @change="onTabChange">
      <a-tab-pane key="post" tab="文章">
        <PostList :postList="postList" />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" force-render>
        <PictureList />
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
      userList: []
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
      // console.log(this.$router)
      // console.log(this.$route)
      // alert(value)
    },
    onTabChange(activeKey) {
      this.activeKey = activeKey
      this.$router.push({
        path: `/${activeKey}`,
        query: { ...this.searchParams }
      })
      // console.log(activeKey)
    }
  },

  mounted() {
    myAxios.post('/post/list/page/vo', {}).then(
      response => {
        this.postList = response.records
      },
      error => {
        console.log(error)
      }
    )
    myAxios.post('/user/list/page/vo', {}).then(
      response => {
        this.userList = response.records
      },
      error => {
        console.log(error)
      }
    )
  }
}
</script>

<style></style>
