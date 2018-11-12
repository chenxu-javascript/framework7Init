import StoreCache from "./../utils/storeCache";
import { bsGetJSON } from "./../utils/api";
let cache = new StoreCache("f7");
let utils = Object.extend({
  // 销售简报
  async getToken() {
    let fn = async () => {
      let rs = await bsGetJSON("/getToken", {}, "post");
      if (rs.state) {
        cache.set("token", rs.data);
      }
    };
    await fn();
    let interval = 1000 * 60 * 3;
    setInterval(fn, interval);
  }
});

export let commonUtils = new utils();
