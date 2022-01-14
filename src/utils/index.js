import { message } from "ant-design-vue";

function copy(text) {
  this.$copyText(text)
    .then(() => {
      message.success("已经复制到剪贴板!");
    })
    .catch(() => {
      message.error("复制失败!");
    });
}

export { copy };
