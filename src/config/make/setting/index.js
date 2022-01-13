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

export { typeOptions, triggerOptions };
