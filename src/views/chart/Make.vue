<template>
  <a-row>
    <a-col :span="20">
      <v-chart
        class="chart"
        :option="chartOptions"
        :update-options="{ notMerge: true }"
      />
    </a-col>
    <a-col :span="4">
      <chart-setting />
    </a-col>
  </a-row>
</template>

<script>
import { BarChart, LineChart, PieChart } from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
import { mapGetters } from "vuex";
import ChartSetting from "./make/ChartSetting.vue";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default {
  components: {
    VChart,
    ChartSetting,
  },
  provide: {
    [THEME_KEY]: "light",
  },

  computed: {
    ...mapGetters(["sourceData", "chartType", "columns", "chartOptions"]),
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
