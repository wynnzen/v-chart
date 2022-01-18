<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    userStyle: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      style: {
        background: "#fff",
        "border-radius": "10px",
        padding: "20px",
        margin: "20px auto",
        ...this.userStyle,
      },
    };
  },
};
</script>
