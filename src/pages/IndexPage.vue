<template>
  <div class="index-page">
    <a-input-search placeholder="input search text" enter-button="Search" size="large" @search="onSearch" v-model="searchParams.searchText" />
    <MyDivider />
    <a-tabs v-model="activeKey" @change="callback">
      <a-tab-pane key="post" tab="文章">
        <PostList />
      </a-tab-pane>
      <a-tab-pane key="picture" tab="图片" force-render>
        <PictureList />
      </a-tab-pane>
      <a-tab-pane key="user" tab="用户">
        <UserList />
      </a-tab-pane>
    </a-tabs>
    {{ this.$route.params }},{{ this.$route.query }}
  </div>
</template>

<script>
import PostList from './PostList'
import UserList from './UserList'
import PictureList from './PictureList'
import MyDivider from './MyDivider'
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
        searchText: this.$route.query.searchText,
        pageSize: 10,
        pageNum: 1
      }
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
      console.log(this.$router)
      console.log(this.$route)
      // alert(value)
    },
    callback(activeKey) {
      this.activeKey = activeKey
      this.$router.push({
        path: `/${activeKey}`,
        query: { ...this.searchParams }
      })
      console.log(activeKey)
    }
  }
}
</script>

<style></style>
