import Vue from "vue";
import Framework7 from "framework7/framework7.esm.bundle.js";
import Framework7Vue from "framework7-vue/framework7-vue.esm.bundle.js";
import "@/utils";
import "framework7/css/framework7.css";
import "./styles/index.less";
import app from "./App.vue";
import store from "./store";
import * as custom from "@/utils/filters";

// Init F7 Vue Plugin
Framework7.use(Framework7Vue, { Vue });

Vue.config.productionTip = false;

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key]);
});

Vue.filter("dataFormat", function(value, fmt = "yyyy-MM-dd hh:mm:ss") {
  let getDate = new Date(value);
  let o = {
    "M+": getDate.getMonth() + 1,
    "d+": getDate.getDate(),
    "h+": getDate.getHours(),
    "m+": getDate.getMinutes(),
    "s+": getDate.getSeconds(),
    "q+": Math.floor((getDate.getMonth() + 3) / 3),
    S: getDate.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (getDate.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
});

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
