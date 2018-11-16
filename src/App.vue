<template>
  <div id="app">
    <!-- App -->
    <f7-app :params="f7params">
      <!-- Statusbar -->
      <f7-statusbar></f7-statusbar>

      <!-- Main View -->
      <f7-view @init="main_view_init" id="main-view" url="/" main class="ios-edges" :animate="animate" :history="history" :pushState="pushState" :pushStateRoot="pushStateRoot" :pushStateSeparator="pushStateSeparator">
      </f7-view>
    </f7-app>
  </div>
</template>

<script>
import { mapState } from "vuex";
import routes from "./router.js";
import { bsSetupRem } from "./utils/util.js";
// import { commonUtils } from "@/apiUtils/common.js";
export default {
  data() {
    return {
      f7params: {
        id: "cn.framework7.app", // App bundle ID
        name: "f7", // App name
        theme: "ios", // Automatic theme detection
        routes: routes,
        view: {
          // main: true,
          // xhrCache: false,
          // iosDynamicNavbar: false,
          // pushState: true,
          // pushStateRoot: "http://localhost:8080", // 确保与部署的根域名保持一致
          // pushStateSeparator: "" // 这里保持为空
        },
        ajaxLinks: "a.ajaxlink",
        dialog: {
          title: "系统提示",
          buttonOk: "确定",
          buttonCancel: "取消",
          preloaderTitle: "加载中...",
          cssClass: "csx"
        },
        smartSelectBackText: "返回",
        smartSelectPopupCloseText: "关闭",
        smartSelectPickerCloseText: "完成",
        notificationCloseButtonText: "关闭",
        on: {
          init: function() {
            console.log("App init");
          }
        }
      },
      animate: true,
      history: true,
      pushState: true, // 打包 app 的情况下，必须关闭 pushState 模式
      pushStateRoot: "http://192.168.0.105:8081",
      pushStateSeparator: "#"
    };
  },
  created() {
    // commonUtils.getToken();
    // commonUtils.reqUserInfo();
  },
  mounted() {
    bsSetupRem();
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
