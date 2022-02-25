<template>
  <div>
    <div class="container">
      <a-row :gutter="[16, 16]">
        <a-col span="12">
          <content-wrapper :userStyle="userStyle">
            <a-table
              rowKey="chartId"
              :columns="columns"
              :data-source="dataSource"
            >
              <span slot="action" slot-scope="text">
                <a @click="view(text)">查看配置</a>
                <a-divider type="vertical" />
                <a @click="del(text)">删除</a>
              </span>
            </a-table>
          </content-wrapper>
        </a-col>
      </a-row>
    </div>
    <ViewModal ref="viewModal" :code="code" />
  </div>
</template>
<script>
import columns from "@/config/list/column.config";
import ViewModal from "./List/ViewModal.vue";
export default {
  components: {
    ViewModal,
  },
  data() {
    return {
      code: {},
      columns,
      dataSource: [],
      userStyle: {
        margin: 0,
      },
    };
  },
  mounted() {
    this.getChartList();
  },
  methods: {
    getChartList() {
      let chartList = localStorage.getItem("chartList");
      if (chartList) {
        this.dataSource = JSON.parse(chartList);
      }
    },
    del(text) {
      let chartId = text.chartId;
      let index = this.dataSource.findIndex((elem) => {
        return elem.chartId === chartId;
      });
      this.dataSource.splice(index, 1);
      localStorage.setItem("chartList", JSON.stringify(this.dataSource));
    },
    view(text) {
      this.$refs.viewModal.changeVisible();
      this.code = text.chartOptions;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  background: #eee;
  padding: 20px;
}
</style>
