import { saveAs } from "file-saver";
import { isEmpty } from "lodash";
import { message } from "ant-design-vue";

const download = (content, name) => {
  if (isEmpty(content) || isEmpty(name)) {
    message.error("下载参数不能为空!");
    return;
  }
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  saveAs(blob, name);
};

const useImport = (file) => {
  const reader = new FileReader();

  return new Promise((resolve) => {
    reader.onload = (evt) => {
      const content = evt.target.result;
      resolve({ content, file });
    };
    reader.readAsText(file);
  });
};

export { useImport, download };
