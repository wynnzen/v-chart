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

export { getLocalData };
