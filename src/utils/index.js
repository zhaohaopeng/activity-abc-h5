export function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') != -1;
}

// 判断安卓
export function isAndroid() {
  var u = navigator.userAgent;
  if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
    if (window.ShowFitness !== undefined) return true;
  }
  return false;
}

// 判断设备为 ios
export function isIos() {
  var u = navigator.userAgent;
  if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
    return true;
  }
  return false;
}

export function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (null);
}

// 判断是否是APP环境
export function getIsApp() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/isapp/i) == "isapp") {
    return true;
  }
  return false;
}

export function isAbc() {
  if ((navigator.userAgent.match(/(bankabc)/i))) {
    return true;
  } else {
    return false;
  }
}


