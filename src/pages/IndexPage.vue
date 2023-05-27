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
      this.getDate()
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
      this.getDate()
      // console.log(activeKey)
    },
    searchPost() {
      myAxios.post('/post/list/page/vo', { ...this.searchParams }).then(
        response => {
          this.postList = response.records
        },
        error => {
          console.log(error)
        }
      )
    },
    searchPicture() {
      myAxios.post('/picture/list/page/vo', { ...this.searchParams }).then(
        response => {
          this.pictureList = response.records
        },
        error => {
          console.log(error)
        }
      )
    },
    searchUser() {
      myAxios
        .post('/user/list/page/vo', {
          userName: this.searchParams.searchText,
          ...this.searchParams
        })
        .then(
          response => {
            this.userList = response.records
          },
          error => {
            console.log(error)
          }
        )
    },

    // 封装查询目录
    getDate() {
      switch (this.activeKey) {
        case 'post':
          this.searchPost()
          break
        case 'picture':
          this.searchPicture()
          break
        case 'user':
          this.searchUser()
          break
        default:
          break
      }
    }
  },

  mounted() {
    // myAxios.post('/post/list/page/vo', {}).then(
    //   response => {
    //     this.postList = response.records
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    // myAxios.post('/user/list/page/vo', {}).then(
    //   response => {
    //     this.userList = response.records
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    // myAxios
    //   .post('/picture/list/page/vo', {
    //     searchText: '小黑子'
    //   })
    //   .then(
    //     response => {
    //       this.pictureList = response.records
    //     },
    //     error => {
    //       console.log(error)
    //     }
    //   )
  },
  created() {
    // 刷新的时候 searchParams同步路由中的数据 再调用接口进行查询
    if (this.searchParams.searchText) {
      this.getDate()
    }
  }
}
</script>

<style></style>
