<template>
  <codemirror
    class="CodeMirror"
    v-model="code"
    :options="options"
    @input="handleChange"
  />
</template>
<script>
import "codemirror/lib/codemirror.css";
// import language js
import "codemirror/mode/javascript/javascript.js";
import "codemirror/mode/vue/vue.js";
import "codemirror/mode/vue/vue.js";
// import theme style
import "codemirror/theme/neo.css";
export default {
  name: "codeEditor",
  props: {
    code: {
      type: String,
      default: "",
    },
    opts: {
      type: Object,
      default: () => {},
    },
  },
  model: {
    prop: "code",
    event: "update",
  },
  computed: {
    options() {
      console.log({
        tabSize: 4,
        mode: "text/javascript",
        theme: "neo",
        lineNumbers: true,
        line: true,
        ...this.opts,
      });
      return {
        tabSize: 4,
        mode: "text/javascript",
        theme: "neo",
        lineNumbers: true,
        line: true,
        ...this.opts,
      };
    },
  },
  methods: {
    handleChange(value) {
      this.$emit("update", value);
    },
  },
};
</script>
