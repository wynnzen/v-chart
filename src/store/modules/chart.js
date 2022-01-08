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
    },
  },
};

export default chart;
