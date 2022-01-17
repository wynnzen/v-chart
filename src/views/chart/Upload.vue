<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col>
        <a-radio-group
          :options="uploadOptions"
          v-model="value"
          @change="onChangeRadio"
        />
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <DynamicTable v-if="value === 'dynamicTable'" />
        <Sheet v-if="value === 'hotTable'" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { uploadOptions } from "@/config/upload/upload.config";
import Sheet from "./upload/Sheet";
import DynamicTable from "./upload/DynamicTable";
export default {
  components: { Sheet, DynamicTable },
  data() {
    return {
      uploadOptions,
      value: "dynamicTable",
    };
  },
  methods: {
    onChangeRadio(e) {
      console.log(e.target.value);
    },
  },
};
</script>
