import Export from "@/views/chart/Export";
import Guide from "@/views/chart/Guide";
import Chart from "@/views/chart/index";
import Make from "@/views/chart/Make";
import Upload from "@/views/chart/Upload";
import Page from "@/views/chart/Page";
import List from "@/views/chart/List";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/chart",
    children: [
      {
        path: "/chart",
        name: "Chart",
        component: Chart,
        redirect: "/upload",
        children: [
          {
            path: "/upload",
            name: "Upload",
            component: Upload,
          },
          {
            path: "/guide",
            name: "Guide",
            component: Guide,
          },
          {
            path: "/make",
            name: "Make",
            component: Make,
          },
          {
            path: "/export",
            name: "Export",
            component: Export,
          },
        ],
      },
    ],
  },
  {
    path: "/list",
    name: "List",
    component: List,
  },
  {
    path: "/page",
    name: "Page",
    component: Page,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
