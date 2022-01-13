<template>
  <div>
    <line-chart v-if="chartType.type === 'line'" />
  </div>
</template>
<script>
import { getLocalData } from "@/utils/data";
import { mapGetters } from "vuex";
import LineChart from "./LineChart";
export default {
  components: {
    LineChart,
  },
  created() {
    getLocalData();
  },

  computed: {
    ...mapGetters(["sourceData", "chartType", "columns"]),
  },
};
</script>
