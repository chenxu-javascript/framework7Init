import Vue from "vue";
export var bsToast = function(msg, closeTimeout = 3000, position = "center") {
  if (window.$vm.$f7 && window.$vm.$f7.toast) {
    window.$vm.$f7.toast.show({
      text: msg,
      closeTimeout,
      position
    });
  } else {
    alert(msg);
  }
};

let bsTipModal = null;
export var bsTip = function(msg, title = "") {
  if (window.$vm && window.$vm.$f7) {
    if (bsTipModal) {
      return;
    }
    return new Promise(function(resolve) {
      bsTipModal = window.$vm.$f7.dialog.alert(
        msg || "error",
        title,
        function() {
          bsTipModal = null;
          resolve();
        }
      );
    });
  } else {
    alert(msg || "error", "系统提示");
    return bsPromise({});
  }
};

export var bsPromise = function(data, time) {
  return new Promise(function(resolve) {
    if (time) {
      setTimeout(function() {
        resolve(data);
      }, time || 1);
    } else {
      resolve(data);
    }
  });
};
export var bsWait = function(time) {
  return bsPromise({}, time);
};

export var bsConfirm = function(msg, options = {}) {
  if (window.$vm && window.$vm.$f7) {
    return new Promise(function(resolve, reject) {
      let { modalButtonOk, title = "" } = options;
      let oldModalButtonOk = window.$vm.$f7.params.modalButtonOk;
      if (modalButtonOk) {
        window.$vm.$f7.params.modalButtonOk = modalButtonOk;
      }
      window.$vm.$f7.dialog.confirm(msg, title, resolve, reject);
      window.$vm.$f7.params.modalButtonOk = oldModalButtonOk;
    });
  }
  return bsPromise();
};

export var bsRunWhen = function(fn, cod, name) {
  name = name || "";
  if (cod()) {
    fn();
    return;
  }

  var i = 0;
  var interval = setInterval(function() {
    i++;
    if (i > 500) {
      clearInterval(interval);
      /* eslint-disable */
      if (window.ZBJConfig.isDev) {
        console.log(name, ':', 'bsRunwhern timeout');
      }
    } else if (cod()) {
      fn();
      clearInterval(interval);
    }
  }, 30);
};

export var bsCheck = function (cod) {
  return new Promise(function (resolve, reject) {
    bsRunWhen(resolve, cod, 'bsCheck', reject);
  });
};

export var bsHtmlDecode = function (text) {
  var temp = document.createElement("div");
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
};

export var bsHtmlEncode = function (value) {
  var div = document.createElement('div');
  var text = document.createTextNode(value);
  div.appendChild(text);
  return div.innerHTML;
};

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export var bsSetupRem = function () {
  try {
    var docEl = document.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        if (clientWidth >= 750) {
          docEl.style.fontSize = '100px';
        } else {
          docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        }
      };

    if (document.addEventListener) {
      window.addEventListener(resizeEvt, recalc, false);
      document.addEventListener('DOMContentLoaded', recalc, false);
    }
  } catch (e) {
    throw new Error('初始化失败')
  }
};

let throwIfMissing = (param, tip = '') => {
  throw new Error(`${param} 为必须! ${tip}`);
};
export var ueTrack = async function(eventName = throwIfMissing('eventName'), properties = {}) {
  try {
    await bsCheck(() => window['myzhubi']);
  } catch (error) {
    //
  }
  let ueAgent = window['myzhubi'] || {};
  properties.b_type = 'Mobile';
  await bsWait(1000);
  ueAgent.track(eventName, {
    properties
  });
}
var Utils = {
  bsTip,
  bsPromise,
  bsWait,
  bsCheck,
  bsHtmlDecode,
  bsHtmlEncode,
  bsToast,
  bsSetupRem,
  debounce
};

window.Utils = Utils;
export default Utils;
Vue.prototype.$bsToast = bsToast;
Vue.prototype.$bsWait = bsWait;
Vue.prototype.$bsTip = bsTip;
Vue.prototype.$bsCheck = bsCheck;
Vue.prototype.$debounce = debounce;
Vue.prototype.$bsConfirm = bsConfirm;
