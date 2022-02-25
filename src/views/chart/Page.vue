<template>
  <div class="container">
    <a-row :gutter="16">
      <a-col span="4" class="chartList">
        <div
          @drag="drag"
          @dragend="dragend($event, item)"
          draggable="true"
          unselectable="on"
          v-for="(item, index) in chartList"
          :key="index"
          class="chartItem"
        >
          {{ item.chartName }}
        </div>
      </a-col>
      <a-col span="20">
        <div id="content">
          <grid-layout
            ref="gridlayout"
            :layout.sync="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
          >
            <grid-item
              v-for="item in layout"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
              class="item"
            >
              <div class="chartContainer">
                <Chart :chartOptions="item.chartOptions" />
              </div>
            </grid-item>
          </grid-layout>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Chart from "./components/Chart";
import VueGridLayout from "vue-grid-layout";
let mouseXY = { x: null, y: null };
let DragPos = { x: null, y: null, w: 1, h: 1, i: null };
export default {
  components: {
    Chart,
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },
  mounted() {
    this.getChartList();
    document.addEventListener(
      "dragover",
      function (e) {
        mouseXY.x = e.clientX;
        mouseXY.y = e.clientY;
      },
      false
    );
  },
  data() {
    return {
      chartList: [{}],
      layout: [
        // { x: 0, y: 0, w: 6, h: 6, i: "0", chartOptions: {} },
        // { x: 2, y: 0, w: 6, h: 4, i: "1" },
        // { x: 4, y: 0, w: 6, h: 5, i: "2" },
        // { x: 6, y: 0, w: 6, h: 3, i: "3" },
        // { x: 8, y: 0, w: 6, h: 3, i: "4" },
        // { x: 10, y: 0, w: 6, h: 3, i: "5" },
        // { x: 0, y: 5, w: 6, h: 5, i: "6" },
        // { x: 2, y: 5, w: 6, h: 5, i: "7" },
        // { x: 4, y: 5, w: 6, h: 5, i: "8" },
        // { x: 6, y: 3, w: 6, h: 4, i: "9" },
        // { x: 8, y: 4, w: 6, h: 4, i: "10" },
        // { x: 10, y: 4, w: 6, h: 4, i: "11" },
        // { x: 0, y: 10, w: 6, h: 5, i: "12" },
        // { x: 2, y: 10, w: 6, h: 5, i: "13" },
        // { x: 4, y: 8, w: 6, h: 4, i: "14" },
        // { x: 6, y: 8, w: 6, h: 4, i: "15" },
        // { x: 8, y: 10, w: 6, h: 5, i: "16" },
        // { x: 10, y: 4, w: 6, h: 6, i: "17" },
        // { x: 0, y: 9, w: 6, h: 3, i: "18" },
        // { x: 2, y: 6, w: 6, h: 6, i: "19" },
      ],
    };
  },
  methods: {
    getChartList() {
      let chartList = localStorage.getItem("chartList");
      if (chartList) {
        this.chartList = JSON.parse(chartList);
      }
    },
    drag: function (e) {
      let parentRect = document
        .getElementById("content")
        .getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (
        mouseInGrid === true &&
        this.layout.findIndex((item) => item.i === "drop") === -1
      ) {
        this.layout.push({
          x: (this.layout.length * 2) % (this.colNum || 12),
          y: this.layout.length + (this.colNum || 12), // puts it at the bottom
          w: 6,
          h: 10,
          i: "drop",
        });
      }
      let index = this.layout.findIndex((item) => item.i === "drop");
      if (index !== -1) {
        console.log("layout", this.layout);
        try {
          // console.log(this.$refs.gridlayout.$children);
          // this.$refs.gridlayout.$children[
          //   this.layout.length
          // ].$refs.item.style.display = "none";
          console.log(this.$refs.gridlayout.$children[this.layout.length]);
        } catch {}
        let el = this.$refs.gridlayout.$children[index];
        console.log(el);
        el.dragging = {
          top: mouseXY.y - parentRect.top,
          left: mouseXY.x - parentRect.left,
        };
        console.log("dragging", el.dragging);
        let new_pos = el.calcXY(
          mouseXY.y - parentRect.top,
          mouseXY.x - parentRect.left
        );
        console.log("new_pos", new_pos);
        console.log("mouseInGrid", mouseInGrid);
        if (mouseInGrid === true) {
          this.$refs.gridlayout.dragEvent(
            "dragstart",
            "drop",
            new_pos.x,
            new_pos.y,
            10,
            6
          );
          DragPos.i = String(index);
          DragPos.x = this.layout[index].x;
          DragPos.y = this.layout[index].y;
          this.layout = this.layout.filter((obj) => obj.i !== "drop");
        }
        if (mouseInGrid === false) {
          this.$refs.gridlayout.dragEvent(
            "dragend",
            "drop",
            new_pos.x,
            new_pos.y,
            10,
            6
          );
          this.layout = this.layout.filter((obj) => obj.i !== "drop");
        }
      }
    },
    dragend: function (e, item) {
      let parentRect = document
        .getElementById("content")
        .getBoundingClientRect();
      let mouseInGrid = false;
      if (
        mouseXY.x > parentRect.left &&
        mouseXY.x < parentRect.right &&
        mouseXY.y > parentRect.top &&
        mouseXY.y < parentRect.bottom
      ) {
        mouseInGrid = true;
      }
      if (mouseInGrid === true) {
        // alert(
        //   `Dropped element props:\n${JSON.stringify(
        //     DragPos,
        //     ["x", "y", "w", "h"],
        //     2
        //   )}`
        // );
        // this.$refs.gridlayout.dragEvent(
        //   "dragend",
        //   "drop",
        //   DragPos.x,
        //   DragPos.y,
        //   1,
        //   1
        // );
        // this.layout = this.layout.filter((obj) => obj.i !== "drop");
        // UNCOMMENT below if you want to add a grid-item
        this.layout.push({
          x: DragPos.x,
          y: DragPos.y,
          w: 6,
          h: 10,
          i: DragPos.i,
          chartOptions: item.chartOptions,
        });
        console.log(this.layout);
        this.$refs.gridlayout.dragEvent(
          "dragend",
          DragPos.i,
          DragPos.x,
          DragPos.y,
          6,
          10
        );
        try {
          this.$refs.gridlayout.$children[
            this.layout.length
          ].$refs.item.style.display = "block";
        } catch {}
      }
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  background: #eee;
  padding: 20px;
}
.chartContainer {
  width: 100%;
  height: 100%;
}
.chartList {
  border: 1px dashed lightgray;
  border-radius: 10px;
}
.chartItem {
  height: 50px;
  cursor: move;
  line-height: 50px;
  text-align: center;
  margin: 10px 20px;
  border-radius: 10px;
  background: #fff;
}
// .chartItem:active {
//   cursor: move;
// }
.item {
  background: #fff;
  border-radius: 10px;
  // background-color: #eee;
  justify-content: center;
  align-items: center;
  display: flex;
}
#content {
  border: 1px dashed lightgray;
  border-radius: 10px;
  height: 100vh;
}
</style>
