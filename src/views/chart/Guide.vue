<template>
  <a-row :gutter="[16, 16]" class="cards">
    <a-col v-for="elem in data" :key="elem.id">
      <a-card :title="elem.category">
        <a-card-grid
          style="width: 25%; text-align: center"
          v-for="item in elem.charts"
          :key="item.id"
          class="cards__grid"
          @click="chooseChart(item.id)"
        >
          {{ item.title }}
        </a-card-grid>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
const data = [
  {
    id: "1",
    category: "基础类型",
    charts: [
      {
        id: "1-1",
        title: "折线图",
      },
      {
        id: "1-2",
        title: "柱状图",
      },
      {
        id: "1-3",
        title: "饼状图",
      },
      {
        id: "1-4",
        title: "散点图",
      },
      {
        id: "1-5",
        title: "雷达图",
      },
    ],
  },
  {
    id: "2",
    category: "高级类型",
    charts: [
      {
        id: "2-1",
        title: "k线图",
      },
      {
        id: "2-2",
        title: "热力图",
      },
    ],
  },
];
export default {
  data() {
    return {
      data,
    };
  },
  methods: {
    chooseChart(id) {
      console.log("id: ", id);
    },
  },
};
</script>
<style>
.cards__grid {
  cursor: pointer;
}
</style>
