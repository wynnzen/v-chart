<template>
  <div class="chart">
    <v-chart :option="chartOptions" :autoresize="true" />
  </div>
</template>
<script>
import { BarChart, LineChart, PieChart } from "echarts/charts";
	import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import VChart, { THEME_KEY } from "vue-echarts";
// import { mapGetters } from "vuex";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default { 
	props:{
		chartOptions:{
			type:Object,
			default:()=>{}
		}
	},
  components: {
    VChart,
  },
  provide: {
    [THEME_KEY]: "light",
  },

  computed: {
    
    // ...mapGetters(["chartOptions"]),
  },

};
</script>

<style scoped>
.chart {
  height: 100%; 
  width: 100%;
}
</style>

</script>
