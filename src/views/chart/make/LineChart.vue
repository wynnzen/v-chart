<template>
  <div>
    <a-row>
      <a-col> rowData:{{ oneChart.rowData }} </a-col>
      <a-col> colData:{{ oneChart.colData }} </a-col>
      <a-col> rowArrayData:{{ oneChart.rowArrayData }} </a-col>
      <a-col> colArrayData: {{ oneChart.colArrayData }} </a-col>
      <a-col> options: {{ options }} </a-col>
    </a-row>
    <a-form-model :model="form" layout="vertical">
      <a-collapse default-active-key="title" :bordered="false">
        <template #expandIcon="props">
          <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
        </template>
        <a-collapse-panel key="title" header="标题" :style="customStyle">
          <a-form-model-item label="主标题">
            <a-switch v-model="form.title.show" />
          </a-form-model-item>
          <a-form-model-item label="主标题">
            <a-input v-model="form.title.text" :disabled="titleStatus" />
          </a-form-model-item>
          <a-form-model-item label="副标题">
            <a-input v-model="form.title.subtext" :disabled="titleStatus" />
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="tooltip" header="提示框" :style="customStyle">
          <a-form-model-item label="触发类型">
            <a-select
              :options="triggerOptions"
              v-model="form.tooltip.trigger"
            ></a-select>
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="xAxis" header="x轴" :style="customStyle">
          <a-form-model-item label="类型">
            <a-select
              :options="typeOptions"
              v-model="form.xAxis.type"
            ></a-select>
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="yAxis" header="y轴" :style="customStyle">
          <a-form-model-item label="类型">
            <a-select
              :options="typeOptions"
              v-model="form.yAxis.type"
            ></a-select>
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="series" header="数据项" :style="customStyle">
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
  </div>
</template>
<script>
import ChartData from "@/utils/chart";
import { mapActions, mapGetters } from "vuex";
import options from "./config/line";
import { customStyle } from "./style";
const typeOptions = [
  { label: "数值轴", value: "value" },
  { label: "类目轴", value: "category" },
  { label: "时间轴", value: "time", disabled: true },
  { label: "对数轴", value: "log", disabled: true },
];
const triggerOptions = [
  { label: "数据项", value: "item" },
  { label: "坐标轴", value: "axis" },
  { label: "无", value: "none" },
];

export default {
  data() {
    return {
      customStyle,
      typeOptions,
      triggerOptions,
      form: options,
      oneChart: null,
    };
  },
  computed: {
    ...mapGetters(["sourceData", "chartType", "columns"]),
    titleStatus() {
      return !this.form.title.show;
    },
  },

  created() {
    this.oneChart = ChartData.create(this.columns, this.sourceData);
    let xAxis = this.oneChart.getAxisData();
    let legend = this.oneChart.getLegendData("col");
    let series = this.oneChart.getSeriesData();
    options.xAxis.data = xAxis;
    options.series = series;
    options.legend.data = legend;
    console.log(options);
    this.form = options;
    this.setCommonData({
      key: "chartOptions",
      value: this.form,
    });
  },
  methods: {
    ...mapActions(["setCommonData"]),
  },
  watch: {
    form: {
      handler() {},
      deep: true,
    },
  },
};
</script>
