import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "../pages/IndexPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "IndexPage",
    component: IndexPage
  },
  {
    path: "/:category",
    name: "IndexPage",
    component: IndexPage
  }
];

const router = new VueRouter({
  routes,
});

export default router;
