class SheetData {
  constructor(sourceData) {
    this.sourceData = sourceData;
    this.transposeSourceData = this.transpose(sourceData);
    this.rowData = [];
    this.colData = [];
    this.rowArrayData = [];
    this.colArrayData = [];
    this.allData = [];

    this.getRow();
    this.getCol();
    this.getRowArrayData();
    this.getColArrayData();
    // 最终数据
    this.xAxis = [];
    this.yAxis = [];
    this.legend = [];
    this.seriesData = [];
  }

  static create(sourceData) {
    return new SheetData(sourceData);
  }

  getOneLineData(grid = "row") {
    return this[`${grid}Data`].map((elem) => elem);
  }

  getAxisData(grid = "row", axis = "x") {
    this[`${axis}Axis`] = this.getOneLineData(grid);
    return this[`${axis}Axis`];
  }

  getLegendData(grid = "row") {
    this.legend = this.getOneLineData(grid);
    return this.legend;
  }

  transpose(sourceData) {
    // 转置数组
    // 初始化数组
    let arr = [];
    for (let i = 0; i < sourceData[0].length; i++) {
      arr[i] = [];
    }

    for (let i = 0; i < sourceData.length; i++) {
      for (let j = 0; j < sourceData[0].length; j++) {
        arr[j][i] = sourceData[i][j];
      }
    }
    return arr;
  }

  getRow() {
    this.rowData = this.sourceData[0].slice(1);
    console.log("this.rowData", this.rowData);
    return this.rowData;
  }

  getCol() {
    this.colData = this.sourceData
      .map((list) => {
        return list[0];
      })
      .slice(1);
    console.log("this.colData", this.colData);
    return this.colData;
  }

  getAllData() {
    this.allData = this.sourceData.slice(1).map((elem) => {
      return elem.slice(1);
    });
    return this.allData;
  }

  getRowArrayData(dataIndex = -1, dataName = "") {
    if (dataIndex === -1 && dataName === "") {
      // all row array data
      this.rowArrayData = this.sourceData.slice(1).map((elem) => elem.slice(1));
    } else if (dataIndex > -1) {
      this.rowArrayData = this.sourceData[dataIndex].slice(1);
    } else if (dataName) {
      this.rowArrayData = this.sourceData.forEach((elem, index) => {
        if (elem[0] === dataName) {
          return this.sourceData[index].slice(1);
        }
      });
    }
    console.log("rowArrayData", this.rowArrayData);
    return this.rowArrayData;
  }

  getColArrayData(dataIndex = -1, dataName = "") {
    if (dataIndex === -1 && dataName === "") {
      // all col array data
      this.colArrayData = this.transposeSourceData
        .slice(1)
        .map((elem) => elem.slice(1));
    } else if (dataIndex > -1) {
      this.colArrayData = this.transposeSourceData[dataIndex];
    } else if (dataName) {
      this.colArrayData = this.transposeSourceData.forEach((elem, index) => {
        if (elem[0] === dataName) {
          return this.transposeSourceData[index].slice(1);
        }
      });
    }
    console.log("colArrayData", this.colArrayData);
    return this.colArrayData;
  }

  getSeriesData(type = "line", grid = "row") {
    if (grid === "row") {
      this.seriesData = this.colData.map((elem, index) => {
        return {
          name: elem,
          type,
          data: this.rowArrayData[index].map((item) => item),
        };
      });
    } else {
      this.seriesData = this.rowData.map((elem, index) => {
        return {
          name: elem,
          type,
          data: this.colArrayData[index].map((item) => item),
        };
      });
    }
    return this.seriesData;
  }

  getPieSeriesData(grid = "row", dataIndex = -1, dataName = "") {
    if (grid === "row") {
      if (dataIndex > -1) {
        this.seriesData = {
          name: this.rowData[dataIndex],
          data: this.colData.map((elem, index) => {
            return {
              name: elem,
              value: this.colArrayData[dataIndex][index],
            };
          }),
        };
      }
    } else {
      this.seriesData = {
        name: this.colData[dataIndex],
        data: this.rowData.map((elem, index) => {
          return {
            name: elem,
            value: this.rowArrayData[dataIndex][index],
          };
        }),
      };
    }
    return this.seriesData;
  }
}

export default SheetData;
