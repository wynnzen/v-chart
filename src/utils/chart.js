class ChartData {
  constructor(columns, sourceData) {
    this.columns = columns;
    this.sourceData = sourceData;
    this.rowData = [];
    this.colData = [];
    this.rowArrayData = [];
    this.colArrayData = [];

    this.getTableRow();
    this.getTableCol();
    this.getTableRowData();
    this.getTableColData();
    //最终数据
    this.xAxis = [];
    this.yAxis = [];
    this.legend = [];
    this.seriesData = [];
  }
  static create(columns, sourceData) {
    return new ChartData(columns, sourceData);
  }
  getOneColData(value) {
    return this.sourceData.map((elem) => {
      return { title: elem[value], value };
    });
  }
  getTableRow(i = 1) {
    // 排除行的 第一列
    this.rowData = this.columns
      .map((elem) => {
        return { title: elem.title, value: elem.dataIndex };
      })
      .slice(i);
  }
  columnKeyTranslate(value) {
    return this.columns.find((elem) => {
      return elem.key === value;
    })["title"];
  }
  getTableCol() {
    // 获取第一列的key
    let key = this.columns[0].key;
    this.colData = this.getOneColData(key);
  }
  getTableRowData() {
    // 获取按行的二维数组数据
    this.getTableRow();
    this.rowArrayData = this.sourceData.map((item) => {
      return this.rowData.map((elem) => {
        return item[elem.value];
      });
    });
  }
  getTableColData() {
    // 获取按列的二维数组数据 排除第一列
    this.colArrayData = this.columns.slice(1).map((elem) => {
      return this.getOneColData(elem.dataIndex);
    });
  }
  getSeriesData(type = "line", grid = "row") {
    if (grid === "row") {
      this.seriesData = this.colData.map((elem, index) => {
        return {
          name: elem.title,
          type,
          data: this.rowArrayData[index].map((item) => item),
        };
      });
    } else {
      this.seriesData = this.rowData.map((elem, index) => {
        return {
          name: elem.title,
          type,
          data: this.colArrayData[index].map((item) => item),
        };
      });
    }
    return this.seriesData;
  }

  getPieSeriesData(grid = "row", dataIndex = -1, dataName = "") {
    // row,0 代表横轴的第二列名字作为name 数据作为data
    if (grid === "row") {
      if (dataIndex > -1) {
        console.log("colData", this.colData);
        this.seriesData = {
          name: this.rowData[dataIndex].title,
          data: this.colData.map((elem, index) => {
            return {
              name: elem.title,
              value: this.colArrayData[dataIndex][index].title,
            };
          }),
        };
      } else if (dataName) {
        // todo
      }
      return this.seriesData;
    } else {
      if (dataIndex > -1) {
        console.log("rowData", this.rowData);
        this.seriesData = {
          name: this.colData[dataIndex].title,
          data: this.rowData.map((elem, index) => {
            console.log("elem", elem, index);
            return {
              name: elem.title,
              value: this.rowArrayData[dataIndex][index],
            };
          }),
        };
      } else if (dataName) {
        // todo
      }
      return this.seriesData;
    }
  }

  getOneLineData(grid = "row") {
    return this[`${grid}Data`].map((elem) => elem.title);
  }

  getAxisData(grid = "row", axis = "x") {
    this[`${axis}Axis`] = this.getOneLineData(grid);
    return this[`${axis}Axis`];
  }

  getLegendData(grid = "row") {
    this.legend = this.getOneLineData(grid);
    return this.legend;
  }
}

export default ChartData;
