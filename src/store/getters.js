const getters = {
  sourceType: (state) => state.chart.sourceType,
  sourceData: (state) => state.chart.sourceData,
  columns: (state) => state.chart.columns,
  chartType: (state) => state.chart.chartType,
  chartOptions: (state) => state.chart.chartOptions,
  sheetData: (state) => state.chart.sheetData,
};

export default getters;
