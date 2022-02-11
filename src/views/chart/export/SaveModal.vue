<template>
  <a-modal
    title="保存图表"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-input v-model="chartName" :placeholder="placeholder" allowClear />
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      chartName: "",
      visible: false,
      placeholder: "请填写要保存的图表名称",
    };
  },
  methods: {
    handleOk() {
      if (this.chartName) {
        this.$emit("save", { chartName: this.chartName });
        this.visible = false;
        this.chartName = "";
      } else {
        this.$message.error(this.placeholder);
      }
    },
    handleCancel() {
      this.visible = false;
    },
  },
};
</script>
