import HomePage from "@/views/home.vue";
import MemberPage from "@/views/member.vue";
import AboutPage from "@/views/about.vue";
import DynamicRoutePage from "@/views/dynamic-route.vue";
import NotFoundPage from "@/views/not-found.vue";

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
