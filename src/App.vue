<template>
  <div id="app">
    <!-- App -->
    <f7-app :params="f7params">
      <!-- Statusbar -->
      <f7-statusbar></f7-statusbar>

      <!-- Main View -->
      <f7-view
        @init="main_view_init"
        id="main-view"
        url="/"
        main
        class="ios-edges"
        :animate="animate"
        :history="history"
        :pushState="pushState"
        :pushStateRoot="pushStateRoot"
        :pushStateSeparator="pushStateSeparator"
      >
        <f7-toolbar tabbar labels v-if="no_toolbar">
          <f7-link
            href="/"
            tab-link=""
            :tab-link-active="tab_active == 'home'"
            text="首页"
          ></f7-link>
          <f7-link
            href="/f7demos/"
            tab-link=""
            :tab-link-active="tab_active == 'f7demos'"
            text="F7Demos"
          ></f7-link>
          <f7-link
            href="/h5plus/"
            tab-link=""
            :tab-link-active="tab_active == 'h5plus'"
            text="H5Plus"
          ></f7-link>
          <f7-link
            href="/member/"
            tab-link=""
            :tab-link-active="tab_active == 'member'"
            text="我的"
          ></f7-link>
        </f7-toolbar>
      </f7-view>
    </f7-app>
  </div>
</template>

<style lang="less">
/*隐藏头部标题栏的时候，需要去掉 page-content 的顶部外边距*/
.page.no-navbar {
  .page-content {
    padding-top: 0px;
  }
}
/*隐藏底部栏的时候，需要去掉 page-content 的底部外边距*/
.page.no-toolbar {
  .page-content {
    padding-bottom: 0px;
  }
}

input,
textarea {
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  /*解决加入js后input框输入瞬间变白的现象*/
}
</style>

<script>
import { mapState } from "vuex";
import routes from "./router.js";

export default {
  data() {
    return {
      f7params: {
        id: "cn.framework7.app", // App bundle ID
        name: "f7", // App name
        theme: "ios", // Automatic theme detection
        routes: routes,
        view: {
          //main: true,
          // xhrCache: false,
          // iosDynamicNavbar: false
          // pushState: true,
          // pushStateRoot: "http://localhost:8080", // 确保与部署的根域名保持一致
          // pushStateSeparator: "" // 这里保持为空
        },
        on: {
          init: function() {
            console.log("App init");
          }
        }
      },
      animate: true,
      history: true,
      pushState: true, // 打包 app 的情况下，必须关闭 pushState 模式
      pushStateRoot: "http://localhost:8080",
      pushStateSeparator: "#"
    };
  },
  computed: {
    ...mapState({
      tab_active: state => state.tab_active,
      no_navbar: state => state.no_navbar,
      no_toolbar: state => state.no_toolbar
    })
  },
  methods: {
    main_view_init() {
      console.log("main_view_init");
    }
  }
};
</script>
