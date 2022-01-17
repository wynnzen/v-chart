<template>
  <hot-table
    :data="data"
    :rowHeaders="true"
    :colHeaders="true"
    :settings="hotSettings"
  ></hot-table>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import { registerAllPlugins, ContextMenu } from "handsontable/plugins";
import "handsontable/dist/handsontable.full.css";

// register Handsontable's modules
registerAllModules();
registerAllPlugins();

export default {
  data: function () {
    return {
      hotSettings: {
        height: "auto",
        width: "auto",
        contextMenu: {
          items: {
            row_above: {
              name: "在上方插入一行",
            },
            row_below: {
              name: "在下方插入一行",
            },
            col_left: {
              name: "在左侧插入一列",
            },
            col_right: {
              name: "在右侧插入一列",
            },
            separator: ContextMenu.SEPARATOR,
            clear_custom: {
              name: "清空所有单元格",
              callback() {
                this.clear();
              },
            },
          },
        },
        licenseKey: "non-commercial-and-evaluation",
      },
      data: [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2016", 10, 11, 12, 13],
        ["2017", 20, 11, 14, 13],
        ["2018", 30, 15, 12, 13],
      ],
    };
  },
  components: {
    HotTable,
  },
};
</script>
