<template>
  <div>
    <a-list item-layout="horizontal" :data-source="postList">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.content">
          <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
          <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    {{ postList }}
  </div>
</template>

<script>
export default {
  name: 'PostList',
  data() {
    return {}
  },
  props: ['postList'],
  methods: {
    // renderItem(a, b) {
    //   console.log(a, b)
    // }
  }
}
</script>

<style></style>
