(function (j) {
  if (location.href.match('(//(localhost|127|10\.|172|192))|(zbjdev\.com)')) {
    return;
  }
  var h = j.sdkUrl,
    a = j.name,
    d = this,
    g = d.document,
    f = null,
    e = null;
  d.AGENT20170621 = a;
  d[a] = d[a] || function (i) {
    return function () {
      (d[a]._agenti = d[a]._agenti || []).push([i, arguments])
    }
  };
  var b = ["track", "trackSignup", "userIdentify"];
  for (var c = 0; c < b.length; c++) {
    d[a][b[c]] = d[a].call(null, b[c])
  }
  if (!d[a].lt) {
    f = g.createElement("script"), e = g.getElementsByTagName("script")[0];
    f.async = true;
    f.src = h;
    e.parentNode.insertBefore(f, e);
    d[a].lt = 1 * new Date();
    d[a].para = j
  }
})({
  sdkUrl: location.protocol + "//v2.web.ue.zhubajie.la/api/v1/agent/info/25DWN21RDNS2DR5N4RGGR4W46DSSR424/5H55FS62RN8WN255N1566NHG6WW8D91G",
  sendLimit: 1,
  showLog: true,
  name: "myzhubi",
  autoTrack: true,
  apiHost: location.protocol + "//v2.web.ue.zhubajie.la",
  appToken: "5H55FS62RN8WN255N1566NHG6WW8D91G"
});
