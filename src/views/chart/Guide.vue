<template>
  <a-row :gutter="[16, 16]" class="cards">
    <a-col v-for="elem in chartTypes" :key="elem.id">
      <a-card :title="elem.category">
        <a-card-grid
          :class="[
            { 'cards___grid--active': item.id === activeId },
            'cards___grid--deactive',
            'cards__grid',
          ]"
          v-for="item in elem.charts"
          :key="item.id"
          @click="chooseChart(item)"
        >
          {{ item.title }}
        </a-card-grid>
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import { mapActions } from "vuex";
import chartTypes from "./config/chart.type.config";
export default {
  data() {
    return {
      chartTypes,
      activeId: 0,
    };
  },
  methods: {
    ...mapActions(["setCommonData"]),
    chooseChart(value) {
      const { id } = value;
      this.activeId = id;
      this.setCommonData({
        key: "chartType",
        value,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.cards__grid {
  cursor: pointer;
  width: 25%;
  text-align: center;
}
.cards {
  .cards___grid--active {
    background: lavenderblush;
  }
  .cards__grid--deactive {
    background: white;
  }
}
</style>
