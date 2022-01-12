<template>
  <div>
    <line-chart v-if="chartType.type === 'line'" />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import LineChart from "./LineChart";
export default {
  components: {
    LineChart,
  },

  computed: {
    ...mapGetters(["sourceData", "chartType", "columns"]),
  },
};
</script>
