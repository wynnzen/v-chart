<template>
  <div>
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-collapse default-active-key="1" :bordered="false">
        <!-- <template #expandIcon="props">
        <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
      </template> -->
        <a-collapse-panel key="1" header="标题" :style="customStyle">
          <a-form-model-item label="开启">
            <a-switch default-checked @change="onChange('title')" />
          </a-form-model-item>
          <a-form-model-item label="名称">
            <a-input v-model="form.title" :disabled="status.title" />
          </a-form-model-item>
        </a-collapse-panel>
        <a-collapse-panel key="2" header="图例" :style="customStyle">
          <a-form-model-item label="开启">
            <a-switch default-checked @change="onChange('legend')" />
          </a-form-model-item>
          <a-form-model-item label="名称">
            <a-input v-model="form.legend" :disabled="status.legend" />
          </a-form-model-item>
          <p>{{ text }}</p>
        </a-collapse-panel>
        <a-collapse-panel key="3" header="坐标系" :style="customStyle">
          <p>{{ text }}</p>
        </a-collapse-panel>
      </a-collapse>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {},
      status: {
        title: false,
        legend: false,
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
      customStyle:
        "background: white;border-radius: 5px;border: 0;overflow: hidden",
    };
  },
  methods: {
    onChange(category) {
      this.status[category] = !this.status[category];
    },
  },
};
</script>
