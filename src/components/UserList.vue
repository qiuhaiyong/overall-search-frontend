<template>
  <div>
    <a-list item-layout="horizontal" :data-source="userList" :grid="{ column: 4 }">
      <a-list-item slot="renderItem" slot-scope="item" column="4">
        <a-card hoverable style="width: 240px">
          <img slot="cover" alt="example" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <a-card-meta :title="item.userName">
            <template slot="description">{{ item.userProfile }}</template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
    {{ userList }}
  </div>
</template>

<script>
export default {
  name: 'UserList',
  props: ['userList']
}
</script>

<style></style>
