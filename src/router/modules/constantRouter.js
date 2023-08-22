import Layout from "@/layout/index.vue";

export const asyncRoutes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: Layout,
    meta: { title: "首页" },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("@/views/dashboard"),
      },
    ],
  },
];
export const constantRoutes = [];
