import Vue from "vue";
import Framework7 from "framework7/framework7.esm.bundle.js";
import Framework7Vue from "framework7-vue/framework7-vue.esm.bundle.js";
import "@/utils";
import "framework7/css/framework7.css";
import "./styles/index.less";
import app from "./App.vue";
import store from "./store";

// Init F7 Vue Plugin
Framework7.use(Framework7Vue, { Vue });

Vue.config.productionTip = false;

window.$vm = new Vue({});
// 网页调试模式下，直接初始化
// Init App
new Vue({
  store,
  render: h => h(app)
}).$mount("#app");

window.addEventListener("resize", function() {
  console.log("resize");
  if (
    document.activeElement.tagName === "INPUT" ||
    document.activeElement.tagName === "TEXTAREA"
  ) {
    window.setTimeout(function() {
      console.log("scrollIntoViewIfNeeded");
      document.activeElement.scrollIntoViewIfNeeded();
    }, 300);
  }
});
