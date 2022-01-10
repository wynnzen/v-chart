<template>
  <div>
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
    };
  },
  computed: {
    titleStatus() {
      return !this.form.title.show;
    },
  },
};
</script>
