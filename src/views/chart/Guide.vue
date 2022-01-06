<template>
  <a-list :grid="{ gutter: 16, column: 4 }" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item, index">
      <a-card :title="item.title"> {{ item.title }} </a-card>
    </a-list-item>
  </a-list>
</template>
<script>
const data = [
  {
    title: "折线图",
  },
  {
    title: "柱状图",
  },
  {
    title: "饼状图",
  },
  {
    title: "散点图",
  },
];
export default {
  data() {
    return {
      data,
    };
  },
};
</script>
<style></style>
