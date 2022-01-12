const chart = {
  state: {
    sourceData: [],
    columns: [],
    chartType: {},
    chartOptions: {},
  },

  mutations: {
    SET_COMMON_DATA(state, { key, value }) {
      state[key] = value;
    },
  },

  actions: {
    setCommonData({ commit }, payload) {
      commit("SET_COMMON_DATA", payload);
      const { key, value } = payload;
      localStorage.setItem(key, JSON.stringify(value));
    },
  },
};

export default chart;
