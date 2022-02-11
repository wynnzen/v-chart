<template>
  <a-upload
    :file-list="fileList"
    v-bind="uploadProps"
    :before-upload="beforeUpload"
    v-on="uploadEvents"
  >
    <component :is="component" v-bind="opts">
      <slot></slot>
    </component>
  </a-upload>
</template>
<script>
import { useImport } from "@/utils/fileHelper";

export default {
  name: "zFileImport",
  props: ["opts", "component", "uploadOpts", "uploadEvents", "readType"],
  data() {
    return {
      fileList: [],
    };
  },
  computed: {
    uploadProps() {
      return {
        showUploadList: false,
        ...this.uploadOpts,
      };
    },
  },
  methods: {
    beforeUpload(file) {
      useImport(file, this.readType).then(({ content, file }) => {
        this.fileList = [...this.fileList, file];
        this.$emit("upload", { content, file, fileList: this.fileList });
      });
      return false;
    },
  },
};
</script>
