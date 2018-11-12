import Vue from "vue";
import * as types from "./mutation-types";
import StoreCache from "@/utils/storeCache";

let cache = new StoreCache("f7");

export default {
  [types.SWITCH_TAB_ACTIVE](state, active) {
    Vue.set(state, "tab_active", active);
    cache.set("tab_active", active);
  }
};
