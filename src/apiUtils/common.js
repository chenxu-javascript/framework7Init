import StoreCache from "./../utils/storeCache";
import { bsGetJSON } from "./../utils/api";
import { ueTrack } from "./../utils/util";

let cache = new StoreCache("f7");

let utils = class utilsed {
  async getToken() {
    let fn = async () => {
      let rs = await bsGetJSON("/getToken", {});
      if (rs.state) {
        cache.set("token", rs.data);
      }
    };
    await fn();
    let interval = 1000 * 60 * 3;
    setInterval(fn, interval);
  }

  async reqUserInfo() {
    let rs = await bsGetJSON("/account/getUserInfo", {}, "post");
    window.user = {};
    if (rs.state) {
      $vm.$f7.$.cookie("user_name", rs.data.user_name, { expires: 7 });
      $vm.$f7.$.cookie("user_face", rs.data.user_face, { expires: 7 });
      $vm.$f7.$.cookie("user_id", rs.data.user_id, { expires: 7 });
      cache.set("user_name", rs.data.user_name);
      cache.set("user_face", rs.data.user_face);
      cache.set("user_id", rs.data.user_id);
      ueTrack("zhubi_user", {
        b_id: rs.data.user_id,
        b_name: rs.data.user_name
      });
    }
  }
};

export let commonUtils = new utils();
