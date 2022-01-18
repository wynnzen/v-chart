<template>
  <div>
    <a-row>
      <a-col> rowData:{{ oneChart.rowData }} </a-col>
      <a-col> colData:{{ oneChart.colData }} </a-col>
      <a-col> rowArrayData:{{ oneChart.rowArrayData }} </a-col>
      <a-col> colArrayData: {{ oneChart.colArrayData }} </a-col>
      <!-- <a-col> options: {{ options }} </a-col> -->
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
import options from "@/config/make/inital/bar";
import { triggerOptions, typeOptions } from "@/config/make/setting";
import ChartData from "@/utils/chart";
import SheetData from "@/utils/sheet";
import { mapActions, mapGetters } from "vuex";
import { customStyle } from "./style";
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      customStyle,
      typeOptions,
      triggerOptions,
      form: cloneDeep(options),
      oneChart: null,
    };
  },
  computed: {
    ...mapGetters([
      "sourceData",
      "chartType",
      "columns",
      "sheetData",
      "sourceType",
    ]),
    titleStatus() {
      return !this.form.title.show;
    },
  },

  created() {
    this.init();
  },
  methods: {
    ...mapActions(["setCommonData"]),
    dynamicTableInit() {
      this.oneChart = ChartData.create(this.columns, this.sourceData);
      let xAxis = this.oneChart.getAxisData();
      let legend = this.oneChart.getLegendData("col");
      let series = this.oneChart.getSeriesData("bar");
      this.form.xAxis.data = xAxis;
      this.form.series = series;
      this.form.legend.data = legend;
      this.setCommonData({
        key: "chartOptions",
        value: this.form,
      });
    },
    hotTableInit() {
      this.oneChart = SheetData.create(this.sheetData);
      let xAxis = this.oneChart.getAxisData();
      let legend = this.oneChart.getLegendData("col");
      let series = this.oneChart.getSeriesData("bar");
      this.form.xAxis.data = xAxis;
      this.form.series = series;
      this.form.legend.data = legend;
      this.setCommonData({
        key: "chartOptions",
        value: this.form,
      });
    },
    excelFileInit() {},

    init() {
      console.log("this.sourceType", this.sourceType);
      switch (this.sourceType) {
        case "dynamicTable":
          this.dynamicTableInit();
          break;

        case "hotTable":
          this.hotTableInit();
          break;

        case "excelFile":
          this.fileInit();
          break;

        default:
          break;
      }
    },
  },
  watch: {
    form: {
      handler() {},
      deep: true,
    },
  },
};
</script>
