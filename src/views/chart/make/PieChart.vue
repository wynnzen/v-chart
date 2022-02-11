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
        <a-collapse-panel key="series" header="数据项" :style="customStyle">
          <a-form-model-item label="直径">
            <a-slider
              range
              :value="series_radius"
              @change="handleSliderChange"
            />
          </a-form-model-item>
          <a-form-model-item label="数据字段" v-if="sourceType === 'hotTable'">
            <a-select
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
              @change="handleChangeDataWords"
              :options="dataWords"
              v-model="dataIndex"
            />
          </a-form-model-item>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
  </div>
</template>
<script>
import options from "@/config/make/inital/pie";
import { triggerOptions } from "@/config/make/setting";
import ChartData from "@/utils/chart";
import SheetData from "@/utils/sheet";
import { mapActions, mapGetters } from "vuex";
import { customStyle } from "./style";
import { cloneDeep } from "lodash";

export default {
  data() {
    return {
      dataWords: [], // 数据字段
      customStyle,
      triggerOptions,
      form: cloneDeep(options),
      oneChart: null,
      dataIndex: 0,
    };
  },
  computed: {
    ...mapGetters([
      "sourceData",
      "sheetData",
      "chartType",
      "columns",
      "sourceType",
    ]),
    series_radius() {
      return this.form.series.radius.map((elem) => parseFloat(elem));
    },
    titleStatus() {
      return !this.form.title.show;
    },
  },

  created() {
    this.init();
  },
  methods: {
    ...mapActions(["setCommonData"]),
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChangeDataWords(dataIndex) {
      if (this.sourceType === "hotTable") {
        this.dataIndex = dataIndex;
        let series = this.oneChart.getPieSeriesData("col", this.dataIndex);
        this.form.series = {
          ...this.form.series,
          ...series,
        };
        this.setCommonData({
          key: "chartOptions",
          value: this.form,
        });
      }
    },
    dynamicTableInit() {
      this.oneChart = ChartData.create(this.columns, this.sourceData);
      // let legend = this.oneChart.getLegendData("col");
      let series = this.oneChart.getPieSeriesData("col", 0);
      this.form.series = {
        ...this.form.series,
        ...series,
      };
      this.setCommonData({
        key: "chartOptions",
        value: this.form,
      });
    },
    hotTableInit() {
      this.oneChart = SheetData.create(this.sheetData);
      this.dataWords = this.oneChart.colData.map((elem, index) => ({
        label: elem,
        value: index,
      }));
      // let legend = this.oneChart.getLegendData("col");
      let series = this.oneChart.getPieSeriesData("col", 0);
      this.form.series = {
        ...this.form.series,
        ...series,
      };
      this.setCommonData({
        key: "chartOptions",
        value: this.form,
      });
    },
    excelFileInit() {},
    init() {
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
    handleSliderChange(radiusArray) {
      this.form.series.radius = radiusArray.map((elem) => {
        return elem + "%";
      });
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
