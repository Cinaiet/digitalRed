import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    redirect: "/index",
  },
  {
    path: "/index/:token",
    name: "home",
    meta: {
      keepAlive: false,
      title: "",
    },
    component: () => import("@/views/home/index"),
  },
  {
    path: "/result",
    name: "result",
    meta: {
      keepAlive: false,
      title: "",
    },
    component: () => import("@/views/result/index"),
  },
];
// 页面导航
const env =
  process.env.NODE_ENV && process.env.NODE_ENV.trim() === "production";

const router = new VueRouter({
  mode: "history",
  base: env ? "/" : "/",
  routes,
});
router.beforeEach((to, from, next) => {
  next();
});

export default router;
