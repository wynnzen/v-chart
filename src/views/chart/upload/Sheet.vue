<template>
  <div>
    <a-row :gutter="[16, 16]">
      <a-col>
        <a-space>
          <a-button size="small" @click="transposeArray">矩阵转置</a-button>
          <file-import v-bind="fileOptions" @upload="handleFileUpload">
            文件上传
          </file-import>
        </a-space>
      </a-col>
      <a-col>
        <hot-table ref="hotTable" :settings="hotSettings"></hot-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import { registerAllModules } from "handsontable/registry";
import { registerAllPlugins, ContextMenu } from "handsontable/plugins";
import "handsontable/dist/handsontable.full.css";
import { mapActions } from "vuex";
import { transpose } from "@/utils/data";
import FileImport from "@/components/FileImport";
import XLSX from "xlsx";

// register Handsontable's modules
registerAllModules();
registerAllPlugins();

export default {
  components: {
    HotTable,
    FileImport,
  },
  data: function () {
    return {
      fileOptions: {
        component: "a-button",
        opts: { size: "small" },
        readType: "readAsBinaryString",
      },
      hotRef: null,
      hotSettings: {
        data: [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13],
        ],
        rowHeaders: true,
        colHeaders: true,
        height: "auto",
        afterChange: () => {
          this.setSheetData();
        },
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
    };
  },

  methods: {
    ...mapActions(["setCommonData"]),
    handleFileUpload(uploadFile) {
      const { content, file, fileList } = uploadFile;
      this.readExcel(content);
    },
    readExcel(content) {
      let workbook = XLSX.read(content, { type: "binary" });
      let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      let data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
      data = this.firstColtoString(data);
      this.hotRef.updateSettings({
        data,
      });
      this.setSheetData();
    },
    firstColtoString(data) {
      // first column type in array must be string图表生成器
      return data.map((arr) => {
        arr[0] = arr[0] ? arr[0].toString() : "";
        return arr;
      });
    },
    transposeArray() {
      let data = this.hotRef.getSourceData();
      let transposedArray = transpose(data);
      this.hotSettings.data = transposedArray;
      this.hotRef.updateSettings({
        data: transposedArray,
      });
      this.setSheetData();
    },
    setSheetData() {
      if (this.hotRef) {
        let data = this.hotRef.getSourceData();
        this.setCommonData({
          key: "sheetData",
          value: data,
        });
      }
    },
  },
  mounted() {
    this.hotRef = this.$refs.hotTable.hotInstance;
    this.setSheetData();
  },
};
</script>
