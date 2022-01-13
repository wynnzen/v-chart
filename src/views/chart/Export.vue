<template>
  <div>
    <a-row>
      <a-col :span="12">
        <h3>配置项</h3>
        <Editor v-model="optionsCode" :opts="opts" />
      </a-col>
      <a-col :span="12">
        <h3>完整代码</h3>
        <Editor v-model="fullcode" :opts="fullCodeOptions" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Editor from "@/components/Editor/CodeMirrorEditor";
import { mapGetters } from "vuex";
import { format } from "@/utils/format";
import chartCodeTemplate from "./export/chartCodeTemplate";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      opts: {
        readOnly: "nocursor",
      },
      fullCodeOptions: {
        mode: "text/x-vue",
      },
    };
  },
  computed: {
    ...mapGetters(["chartOptions"]),
    optionsCode() {
      return JSON.stringify(this.chartOptions, null, 2);
    },
    fullcode() {
      let str = format(chartCodeTemplate, "html");
      return str;
    },
  },
};
</script>
