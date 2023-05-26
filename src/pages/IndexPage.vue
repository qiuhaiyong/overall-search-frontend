<template>
  <div class="index-page">
    <a-input-search placeholder="input search text" enter-button="Search" size="large" @search="onSearch" v-model="searchText" />
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
      searchText: this.$route.query.searchText
    }
  },
  methods: {
    onSearch(searchText) {
      if (!this.$route.fullPath === `/${this.activeKey}?searchText=${searchText}`) {
        this.$router.push({
          path: `/${this.activeKey}`,
          query: { searchText }
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
        query: {
          searchText: this.searchText
        }
      })
      console.log(activeKey)
    }
  }
}
</script>

<style></style>
