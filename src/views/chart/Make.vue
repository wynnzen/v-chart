<template>
  <a-row>
    <a-row>
      <a-col> rowdata: {{ rowData }} </a-col>
      <a-col> colData :{{ colData }} </a-col>
      <a-col> rowArrayData: {{ rowArrayData }} </a-col>
      <a-col> colArrayData: {{ colArrayData }} </a-col>
    </a-row>
    <a-col :span="20">
      <v-chart class="chart" :option="option" />
    </a-col>
    <a-col :span="4">
      <chart-setting @update="handleUpdate" />
    </a-col>
  </a-row>
</template>

<script>
import { LineChart, PieChart } from "echarts/charts";
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
import lineOptions from "./make/config/line";

use([
  CanvasRenderer,
  PieChart,
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

  data() {
    return {
      option: {},
      rowData: [],
      colData: [],
      rowArrayData: [],
      colArrayData: [],
      chartData: [],
    };
  },

  created() {
    console.log(this.getTableCol());
    console.log(this.getTableRow());
    console.log(this.getTableRowData());
    console.log(this.getTableColData());

    this.setOption();
  },

  computed: {
    ...mapGetters(["sourceData", "chartType", "columns"]),
  },

  mounted() {
    console.log(this.sourceData);
    console.log(this.columns);
  },
  methods: {
    getOneColData(value) {
      return this.sourceData.map((elem) => {
        return { title: elem[value], value };
      });
    },
    columnKeyTranslate(value) {
      return this.columns.find((elem) => {
        return elem.key === value;
      })["title"];
    },
    setOption() {
      const { type } = this.chartType;
      let option = lineOptions;
      let seriesData = [];
      switch (type) {
        case "line":
          // option.legend.data = this.colData.map((elem) => elem.title);
          option.xAxis.data = this.rowData.map((elem) => elem.title);
          seriesData = this.colData.map((elem, index) => {
            return {
              name: elem.title,
              type: "line",
              data: this.rowArrayData[index].map((item) => item),
            };
          });
          option.series = seriesData;
          option.legend.data = this.colData.map((elem) => elem.title);
          this.option = option;
          break;
        default:
          break;
      }
    },
    getTableRow(i = 1) {
      // 排除行的 第一列
      this.rowData = this.columns
        .map((elem) => {
          return { title: elem.title, value: elem.dataIndex };
        })
        .slice(i);
    },
    getTableCol() {
      // 获取第一列的key
      let key = this.columns[0].key;
      this.colData = this.getOneColData(key);
    },
    getTableRowData() {
      // 获取按行的二维数组数据
      this.getTableRow();
      this.rowArrayData = this.sourceData.map((item) => {
        return this.rowData.map((elem) => {
          return item[elem.value];
        });
      });
    },
    getTableColData() {
      // 获取按列的二维数组数据 排除第一列
      this.colArrayData = this.columns.slice(1).map((elem) => {
        return this.getOneColData(elem.dataIndex);
      });
    },
    handleUpdate(form) {
      this.option = form;
    },
  },
};
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
