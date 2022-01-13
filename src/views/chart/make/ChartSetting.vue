<template>
  <div>
    <line-chart v-if="chartType.type === 'line'" />
    <bar-chart v-if="chartType.type === 'bar'" />
  </div>
</template>
<script>
import { getLocalData } from "@/utils/data";
import { mapGetters } from "vuex";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
export default {
  components: {
    LineChart,
    BarChart,
  },
  created() {
    getLocalData();
  },

  computed: {
    ...mapGetters(["sourceData", "chartType", "columns"]),
  },
};
</script>
