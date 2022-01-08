<template>
  <div>
    <a-row type="flex" justify="end">
      <a-button type="primary" @click="addRow">新增行</a-button>
      <a-button @click="addCol">新增列</a-button>
    </a-row>
    <a-row>
      <a-table :data-source="data" bordered :pagination="false">
        <a-table-column
          :data-index="col.dataIndex"
          v-for="(col, colindex) in userColumns"
          :key="col.dataIndex"
        >
          <span v-if="col.editable" slot="title">
            <a-space>
              <a-input v-model="col.title" />
              <a @click="saveColumn(colindex)">保存</a>
            </a-space>
          </span>
          <span v-else slot="title" @click="editColumn(colindex)">{{
            col.title
          }}</span>
          <template slot-scope="text, record">
            <div :key="columnsDataIndexArray[colindex]">
              <a-input
                v-if="record.editable"
                style="margin: -5px 0"
                :value="text"
                @change="
                  (e) =>
                    handleChange(
                      e.target.value,
                      record.key,
                      columnsDataIndexArray[colindex]
                    )
                "
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
        </a-table-column>
        <a-table-column key="operation" title="操作" width="130px">
          <template slot-scope="text, record">
            <div class="editable-row-operations">
              <span v-if="record.editable">
                <a @click="() => save(record.key)">保存</a>
                <a-popconfirm
                  title="确认取消?"
                  @confirm="() => cancel(record.key)"
                >
                  <a>取消</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a-space>
                  <a
                    :disabled="editingKey !== ''"
                    @click="() => edit(record.key)"
                    >编辑</a
                  >
                  <a-popconfirm
                    title="Sure to delete?"
                    @confirm="() => del(record.key)"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </a-space>
              </span>
            </div>
          </template>
        </a-table-column>
      </a-table>
    </a-row>
  </div>
</template>
<script>
import { nanoid } from "nanoid";
import { mapActions } from "vuex";
// const userColumns = [
//   {
//     title: "name",
//     editable: false,
//     dataIndex: "name",
//     scopedSlots: { customRender: "name" },
//   },
//   {
//     title: "age",
//     dataIndex: "age",
//     editable: false,
//     scopedSlots: { customRender: "age" },
//   },
//   {
//     title: "address",
//     dataIndex: "address",
//     editable: false,
//     scopedSlots: { customRender: "address" },
//   },
// ];
const userColumns = ["未命名"].map((elem) => {
  let uniqueIndex = nanoid();
  return {
    key: uniqueIndex,
    title: elem,
    dataIndex: uniqueIndex,
    editable: false,
    scopedSlots: { customRender: uniqueIndex },
  };
});

export default {
  data() {
    return {
      cacheData: [],
      data: [],
      userColumns,
      editingKey: "",
    };
  },
  computed: {
    columnsDataIndexArray() {
      return this.userColumns.map((elem) => elem.dataIndex);
    },
  },

  methods: {
    ...mapActions(["setCommonData"]),
    saveColumn(index) {
      this.userColumns[index].editable = false;
      this.setCommonData({ key: "columns", value: this.userColumns });
    },
    editColumn(index) {
      this.userColumns[index].editable = true;
      this.setCommonData({ key: "columns", value: this.userColumns });
    },
    addCol() {
      let uniqueIndex = nanoid();
      let col = {
        key: uniqueIndex,
        title: "未命名",
        dataIndex: uniqueIndex,
        editable: false,
        scopedSlots: { customRender: uniqueIndex },
      };
      this.userColumns.push(col);
      this.setCommonData({ key: "columns", value: this.userColumns });
      this.data = this.data.map((item) => {
        return {
          ...item,
          [uniqueIndex]: "",
        };
      });
      this.setCommonData({ key: "sourceData", value: this.data });
    },
    addRow() {
      let key = nanoid();
      let row = {
        key,
      };
      this.userColumns.forEach((elem) => {
        row[elem.dataIndex] = "";
      });
      this.setCommonData({ key: "columns", value: this.userColumns });
      this.data.push(row);
      this.cacheData = this.data.map((item) => ({ ...item }));
    },
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
        this.setCommonData({ key: "sourceData", value: this.data });
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
        this.setCommonData({ key: "sourceData", value: this.data });
      }
    },

    del(key) {
      let newData = [...this.data];
      this.data = newData.filter((item) => key !== item.key);
      this.setCommonData({ key: "sourceData", value: this.data });
    },

    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        this.setCommonData({ key: "sourceData", value: this.data });
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.data = newData;
        this.setCommonData({ key: "sourceData", value: this.data });
      }
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
