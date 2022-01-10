<template>
  <div>
    <div class="steps">
      <a-steps :current="current" class="steps__items">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
      <div class="steps__content">
        <router-view />
      </div>
      <div class="steps__action">
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
        >
          Next
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="$message.success('Processing complete!')"
        >
          Done
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          Previous
        </a-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "上传数据",
          content: "Upload",
        },
        {
          title: "选择图表",
          content: "Guide",
        },
        {
          title: "配置图表",
          content: "Make",
        },
        {
          title: "导出图表",
          content: "Export",
        },
      ],
    };
  },
  created() {
    let { name } = this.$router.currentRoute;
    this.current = this.steps.findIndex((elem) => elem.content === name);
  },
  methods: {
    next() {
      this.current++;
      this.goto();
    },
    prev() {
      this.current--;
      this.goto();
    },
    goto() {
      this.$router.push({
        name: this.steps[this.current]["content"],
      });
    },
  },
};
</script>
<style scoped lang="less">
.steps {
  margin: 20px;
  background: white;
  height: 100vh;
  .steps__content {
    height: 500px;
    overflow: auto;
  }
}
</style>
