<template>
  <div>
    <line-chart v-if="chartType.type === 'line'" />
    <bar-chart v-if="chartType.type === 'bar'" />
    <pie-chart v-if="chartType.type === 'pie'" />
  </div>
</template>
<script>
import { getLocalData } from "@/utils/data";
import { mapGetters } from "vuex";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
export default {
  components: {
    LineChart,
    BarChart,
    PieChart,
  },
  created() {
    getLocalData();
  },

  computed: {
    ...mapGetters(["sourceData", "chartType", "columns"]),
  },
};
</script>
