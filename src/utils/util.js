import Vue from "vue";
export var bsToast = function(msg, closeTimeout = 3000, position = "center") {
  if (window.f7app && window.f7app.f7toast) {
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

Vue.prototype.$bsWait = bsWait;
Vue.prototype.$bsTip = bsTip;
Vue.prototype.$bsCheck = bsCheck;
Vue.prototype.$debounce = debounce;
