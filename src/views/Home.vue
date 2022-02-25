<template>
  <a-layout>
    <a-layout-header class="header">
      <div class="logo">
        <a-icon type="fund" theme="twoTone" />
        <div class="title">图表生成器</div>
      </div>
      <a-menu
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        @click="handleClickMenu"
        v-model="current"
      >
        <a-menu-item key="Chart"> 首页 </a-menu-item>
        <a-menu-item key="List"> 列表 </a-menu-item>
        <a-menu-item key="Page"> 自定义 </a-menu-item>
      </a-menu>
    </a-layout-header>
    <router-view />
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      current: ["Chart"],
    };
  },
  methods: {
    handleClickMenu({ key }) {
      this.current = [key];
      this.$router.push({
        name: key,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  background: #fff;
  display: flex;
  .logo {
    // width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    .title {
      margin: auto 20px auto 10px;
    }
  }
}
</style>
