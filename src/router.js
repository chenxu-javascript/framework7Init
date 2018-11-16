import HomePage from "@/views/home.vue";
import MemberPage from "@/views/member.vue";
import AboutPage from "@/views/about.vue";
import DynamicRoutePage from "@/views/dynamic-route.vue";
import NotFoundPage from "@/views/not-found.vue";

import zhubihome from "@/views/zhubi/mine.vue";
import addresslist from "@/views/address/list.vue";
import addressedit from "@/views/address/edit.vue";

import order from "@/views/order";
export default [
  {
    name: "home",
    path: "/",
    alias: "/#",
    component: HomePage,
    options: {
      animate: false
    }
  },
  {
    name: "zhubihome",
    path: "/zhubi/mine",
    component: zhubihome,
    options: {
      animate: false
    }
  },
  {
    name: "addresslist",
    path: "/address/list",
    component: addresslist,
    options: {
      animate: false
    }
  },
  {
    name: "addressedit",
    path: "/address/edit",
    component: addressedit,
    options: {
      animate: false
    }
  },
  {
    name: "order",
    path: "/order",
    component: order,
    options: {
      animate: false
    }
  },
  {
    name: "member",
    path: "/member/",
    component: MemberPage,
    options: {
      animate: false
    }
  },
  {
    path: "/about/",
    component: AboutPage
  },
  {
    path: "/dynamic-route/blog/:blogId/post/:postId/",
    component: DynamicRoutePage
  },
  {
    path: "(.*)",
    component: NotFoundPage
  }
];
