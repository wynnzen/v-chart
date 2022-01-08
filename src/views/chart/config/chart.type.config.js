const chartTypes = [
  {
    id: "1",
    category: "基础类型",
    charts: [
      {
        id: "1-1",
        type: "line",
        title: "折线图",
      },
      {
        id: "1-2",
        type: "bar",
        title: "柱状图",
      },
      {
        id: "1-3",
        type: "pie",
        title: "饼状图",
      },
      {
        id: "1-4",
        type: "scatter",
        title: "散点图",
      },
      {
        id: "1-5",
        type: "radar",
        title: "雷达图",
      },
    ],
  },
  {
    id: "2",
    category: "高级类型",
    charts: [
      {
        id: "2-1",
        type: "candlestick",
        title: "k线图",
      },
      {
        id: "2-2",
        type: "heatmap",
        title: "热力图",
      },
    ],
  },
];

export default chartTypes;
