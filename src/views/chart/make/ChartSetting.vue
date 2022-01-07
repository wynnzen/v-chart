<template>
  <div>
    <a-form-model
      :colon="false"
      :model="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-collapse default-active-key="1" :bordered="false">
        <!-- <template #expandIcon="props">
        <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
      </template> -->
        <a-collapse-panel key="1" header="标题" :style="customStyle">
          <a-form-model-item label="开启">
            <a-switch
              v-model="form.title_show"
              @change="switchChange($event, 'title_show')"
            />
          </a-form-model-item>
          <a-form-model-item label="标题">
            <a-input
              @change="inputChange($event, 'title_text')"
              v-model="form.title_text"
              :disabled="categoryStatus.title"
            />
          </a-form-model-item>
          <a-form-model-item label="副标题">
            <a-input
              @change="inputChange($event, 'title_subtext')"
              v-model="form.title_subtext"
              :disabled="categoryStatus.title"
            />
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="图例" :style="customStyle">
          <a-form-model-item label="开启">
            <a-switch default-checked @change="onChange('legend')" />
          </a-form-model-item>
          <a-form-model-item label="名称">
            <a-input v-model="form.legend" :disabled="categoryStatus.legend" />
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="坐标系" :style="customStyle">
          <a-form-model-item label="开启">
            <a-switch default-checked @change="onChange('legend')" />
          </a-form-model-item>
          <a-form-model-item label="名称">
            <a-input v-model="form.axis" :disabled="categoryStatus.axis" />
          </a-form-model-item>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title_show: true,
        title_text: "",
        title_subtext: "",
      },
      categoryStatus: {
        title: false,
        legend: false,
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      customStyle:
        "background: white;border-radius: 5px;border: 0;overflow: hidden",
    };
  },
  methods: {
    switchChange(checked, type) {
      let [key, value] = [type, checked];
      this.updateValue(key, value);
      this.changeEditStatus(key.split("_")[0]);
    },
    inputChange(e, type) {
      let [key, value] = [type, e.target.value];
      this.updateValue(key, value);
    },
    changeEditStatus(category) {
      this.categoryStatus[category] = !this.categoryStatus[category];
    },
    onChange(category) {
      this.categoryStatus[category] = !this.categoryStatus[category];
    },
    updateValue(key, value) {
      this.$emit("update", key, value);
    },
  },
};
</script>
