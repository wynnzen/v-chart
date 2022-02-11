import store from "@/store";

const getLocalData = () => {
  let localData = {};
  [
    "sourceType",
    "sourceData",
    "columns",
    "chartType",
    "chartOptions",
    "sheetData",
  ].map((name) => {
    localData[name] = localStorage.getItem(name);
    if (localData[name]) {
      localData[name] = JSON.parse(localData[name]);
      console.log("name", name);
      store.dispatch("setCommonData", {
        key: name,
        value: localData[name],
      });
    }
  });
  return localData;
};

const transpose = (sourceData) => {
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
};

export { getLocalData, transpose };
