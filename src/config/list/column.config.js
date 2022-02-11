const columns = [
  {
    title: "名称",
    dataIndex: "chartName",
    key: "chartName",
  },
  {
    title: "类型",
    dataIndex: "chartType",
    key: "chartType",
    customRender: (chartType) => {
      return chartType.title;
    },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
  // {
  //   title: "配置",
  //   dataIndex: "chartOptions",
  //   key: "chartOptions",
  // },
];
export default columns;
