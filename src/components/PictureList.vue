<template>
  <div>
    <a-list item-layout="horizontal" :data-source="pictureList" :grid="{ column: 4 }">
      <a-list-item slot="renderItem" slot-scope="item" column="4">
        <a-card hoverable style="height: 300px">
          <img slot="cover" alt="example" :src="item.url" />
          <a-card-meta :title="item.title"> </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: 'PictureList',
  props: ['pictureList']
}
</script>

<style>
.ant-card-cover img {
  width: 100%;
  height: 250px;
}
</style>
