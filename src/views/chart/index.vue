<template>
  <div class="steps">
    <content-wrapper>
      <a-steps :current="current" class="steps__items">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </content-wrapper>
    <content-wrapper>
      <div class="steps__content">
        <router-view />
      </div>
    </content-wrapper>
    <content-wrapper>
      <div class="steps__action">
        <a-button
          v-if="current < steps.length - 1"
          type="primary"
          @click="next"
        >
          下一步
        </a-button>
        <a-button
          v-if="current == steps.length - 1"
          type="primary"
          @click="$message.success('Processing complete!')"
        >
          完成
        </a-button>
        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
          上一步
        </a-button>
      </div>
    </content-wrapper>
  </div>
</template>
<script>
import ContentWrapper from "../../components/ContentWrapper.vue";
export default {
  components: { ContentWrapper },
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
  padding: 20px;
  background: #eee;
  height: 100vh;
  .steps__content {
    height: 600px;
    overflow: auto;
  }
  .steps__action {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
