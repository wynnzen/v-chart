<template>
  <a-row>
    <a-col :span="20">
      <v-chart class="chart" :option="option" />
    </a-col>
    <a-col :span="4">
      <chart-setting @update="updateOptions" />
    </a-col>
  </a-row>
</template>

<script>
import { PieChart } from "echarts/charts";
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { set as _set } from "lodash";
import VChart, { THEME_KEY } from "vue-echarts";
import ChartSetting from "./make/ChartSetting.vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

export default {
  name: "HelloWorld",
  components: {
    VChart,
    ChartSetting,
  },
  provide: {
    [THEME_KEY]: "light",
  },

  data() {
    return {
      option: {
        title: {
          show: true,
          text: "",
          subtext: "",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "Direct" },
              { value: 310, name: "Email" },
              { value: 234, name: "Ad Networks" },
              { value: 135, name: "Video Ads" },
              { value: 1548, name: "Search Engines" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    updateOptions(key, value) {
      let keyPath = key.replaceAll("_", ".");
      _set(this.option, keyPath, value);
    },
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
