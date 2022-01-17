<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col :span="12" v-for="item in titleList" :key="item.value">
        <a-row type="flex" justify="space-between">
          <a-col>
            <h3>{{ item.title }}</h3>
          </a-col>
          <a-col>
            <a-space>
              <a-button type="primary" @click="copyCode(item.value)">
                复制
              </a-button>
              <a-button @click="downCode(item.value)">下载</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col span="12">
        <Editor v-model="optionsCode" :opts="opts" />
      </a-col>
      <a-col span="12">
        <Editor v-model="fullCode" :opts="fullCodeOptions" />
      </a-col>
    </a-row>
    <a-row :gutter="[16, 16]">
      <a-col>
        <h3>图表</h3>
      </a-col>
      <a-col span="12">
        <a-card>
          <Chart :chartOptions="chartOptions" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Editor from "@/components/Editor/CodeMirrorEditor";
import Chart from "./components/Chart";
import { download } from "@/utils/fileHelper";
import { copy } from "@/utils";
import { mapGetters } from "vuex";
import { beautifyCode } from "@/utils/format";
import createChartCode from "./export/chartCodeTemplate";
import { getLocalData } from "@/utils/data";
import { formatOptions } from "@/config/format/format.config";
import { opts, fullCodeOptions } from "@/config/editor/editor.config";
import { titleList } from "@/config/export/export.config";
export default {
  components: {
    Editor,
    Chart,
  },
  data() {
    return {
      titleList,
      opts,
      fullCodeOptions,
    };
  },
  created() {
    this.loadLocalData();
  },
  methods: {
    loadLocalData() {
      getLocalData();
    },
    copyCode(type) {
      if (type === "fullCode") {
        copy.call(this, this.fullCode);
      } else {
        copy.call(this, this.optionsCode);
      }
    },
    downCode(type) {
      let name = "";
      let content = "";
      if (type === "fullCode") {
        name = "chart.vue";
        content = this.fullCode;
      } else {
        name = "options.js";
        content = this.optionsCode;
      }
      download(content, name);
    },
  },
  computed: {
    ...mapGetters(["chartOptions"]),
    optionsCode() {
      // format json
      return JSON.stringify(this.chartOptions, null, 2);
    },
    fullCode() {
      // format vue
      const chartOptions = JSON.stringify(this.chartOptions, null, 2);
      const code = createChartCode(chartOptions);

      return beautifyCode(code, "html", formatOptions);
    },
  },
};
</script>
<style lang="less" scoped>
.chartBox {
  margin: 20px auto;
}
</style>
