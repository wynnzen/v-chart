<template>
  <div>
    <a-modal v-model="visible" title="Title" on-ok="handleOk">
      <a-row>
        <a-col>
          <a-radio-group :options="gridOptions" @change="changeGroupRadio" />
        </a-col>
      </a-row>
      <a-transfer
        :data-source="mockData"
        show-search
        :filter-option="filterOption"
        :target-keys="targetKeys"
        :render="(item) => item.title"
        @change="handleChange"
        @search="handleSearch"
      />
    </a-modal>
  </div>
</template>
<script>
import gridOptions from "@/config/make/setting/range";
export default {
  data() {
    return {
      visible: false,
      gridOptions,
      mockData: [],
      targetKeys: [],
    };
  },
  mounted() {
    this.getMock();
  },
  methods: {
    handleOk() {
      this.visible = false;
    },
    changeGroupRadio() {},
    getMock() {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < 20; i++) {
        const data = {
          key: i.toString(),
          title: `content${i + 1}`,
          description: `description of content${i + 1}`,
          chosen: Math.random() * 2 > 1,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData;
      this.targetKeys = targetKeys;
    },
    filterOption(inputValue, option) {
      return option.description.indexOf(inputValue) > -1;
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys;
    },
    handleSearch(dir, value) {
      console.log("search:", dir, value);
    },
  },
};
</script>
