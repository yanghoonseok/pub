import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Splash",
    component: () => import("../views/Splash.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/practice",
    name: "Practice",
    component: () => import("../views/Practice.vue"),
  },
  {
    path: "/practice2",
    name: "Practice2",
    component: () => import("../views/Practice2.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  //console.log(to, from);
  if (window.parent) {
    window.parent.postMessage(
      {
        sian: {
          url: `${to.fullPath}`,
        },
      },
      "*"
    );
  }
  next();
});

export default router;
