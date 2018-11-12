import * as types from "./mutation-types";

// 切换激活状态的底部栏
export function switchTabActive({ commit }, { active }) {
  console.log("switchTabActive", active);
  commit(types.SWITCH_TAB_ACTIVE, active);
}
