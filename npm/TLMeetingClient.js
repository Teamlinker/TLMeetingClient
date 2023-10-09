var Ri = Object.defineProperty;
var Ci = (i, e, t) => e in i ? Ri(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var U = (i, e, t) => (Ci(i, typeof e != "symbol" ? e + "" : e, t), t);
var _ = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Vr = {}, Ms = { exports: {} }, ws, nr;
function Di() {
  if (nr)
    return ws;
  nr = 1;
  var i = 1e3, e = i * 60, t = e * 60, s = t * 24, r = s * 7, n = s * 365.25;
  ws = function(c, u) {
    u = u || {};
    var l = typeof c;
    if (l === "string" && c.length > 0)
      return a(c);
    if (l === "number" && isFinite(c))
      return u.long ? d(c) : o(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function a(c) {
    if (c = String(c), !(c.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (u) {
        var l = parseFloat(u[1]), h = (u[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return l * n;
          case "weeks":
          case "week":
          case "w":
            return l * r;
          case "days":
          case "day":
          case "d":
            return l * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return l * t;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return l * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return l * i;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return l;
          default:
            return;
        }
      }
    }
  }
  function o(c) {
    var u = Math.abs(c);
    return u >= s ? Math.round(c / s) + "d" : u >= t ? Math.round(c / t) + "h" : u >= e ? Math.round(c / e) + "m" : u >= i ? Math.round(c / i) + "s" : c + "ms";
  }
  function d(c) {
    var u = Math.abs(c);
    return u >= s ? p(c, u, s, "day") : u >= t ? p(c, u, t, "hour") : u >= e ? p(c, u, e, "minute") : u >= i ? p(c, u, i, "second") : c + " ms";
  }
  function p(c, u, l, h) {
    var f = u >= l * 1.5;
    return Math.round(c / l) + " " + h + (f ? "s" : "");
  }
  return ws;
}
function Ti(i) {
  t.debug = t, t.default = t, t.coerce = d, t.disable = n, t.enable = r, t.enabled = a, t.humanize = Di(), t.destroy = p, Object.keys(i).forEach((c) => {
    t[c] = i[c];
  }), t.names = [], t.skips = [], t.formatters = {};
  function e(c) {
    let u = 0;
    for (let l = 0; l < c.length; l++)
      u = (u << 5) - u + c.charCodeAt(l), u |= 0;
    return t.colors[Math.abs(u) % t.colors.length];
  }
  t.selectColor = e;
  function t(c) {
    let u, l = null, h, f;
    function g(...m) {
      if (!g.enabled)
        return;
      const S = g, B = Number(/* @__PURE__ */ new Date()), w = B - (u || B);
      S.diff = w, S.prev = u, S.curr = B, u = B, m[0] = t.coerce(m[0]), typeof m[0] != "string" && m.unshift("%O");
      let P = 0;
      m[0] = m[0].replace(/%([a-zA-Z%])/g, (se, le) => {
        if (se === "%%")
          return "%";
        P++;
        const ie = t.formatters[le];
        if (typeof ie == "function") {
          const ce = m[P];
          se = ie.call(S, ce), m.splice(P, 1), P--;
        }
        return se;
      }), t.formatArgs.call(S, m), (S.log || t.log).apply(S, m);
    }
    return g.namespace = c, g.useColors = t.useColors(), g.color = t.selectColor(c), g.extend = s, g.destroy = t.destroy, Object.defineProperty(g, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => l !== null ? l : (h !== t.namespaces && (h = t.namespaces, f = t.enabled(c)), f),
      set: (m) => {
        l = m;
      }
    }), typeof t.init == "function" && t.init(g), g;
  }
  function s(c, u) {
    const l = t(this.namespace + (typeof u > "u" ? ":" : u) + c);
    return l.log = this.log, l;
  }
  function r(c) {
    t.save(c), t.namespaces = c, t.names = [], t.skips = [];
    let u;
    const l = (typeof c == "string" ? c : "").split(/[\s,]+/), h = l.length;
    for (u = 0; u < h; u++)
      l[u] && (c = l[u].replace(/\*/g, ".*?"), c[0] === "-" ? t.skips.push(new RegExp("^" + c.slice(1) + "$")) : t.names.push(new RegExp("^" + c + "$")));
  }
  function n() {
    const c = [
      ...t.names.map(o),
      ...t.skips.map(o).map((u) => "-" + u)
    ].join(",");
    return t.enable(""), c;
  }
  function a(c) {
    if (c[c.length - 1] === "*")
      return !0;
    let u, l;
    for (u = 0, l = t.skips.length; u < l; u++)
      if (t.skips[u].test(c))
        return !1;
    for (u = 0, l = t.names.length; u < l; u++)
      if (t.names[u].test(c))
        return !0;
    return !1;
  }
  function o(c) {
    return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function d(c) {
    return c instanceof Error ? c.stack || c.message : c;
  }
  function p() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return t.enable(t.load()), t;
}
var Pi = Ti;
(function(i, e) {
  e.formatArgs = s, e.save = r, e.load = n, e.useColors = t, e.storage = a(), e.destroy = (() => {
    let d = !1;
    return () => {
      d || (d = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function t() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function s(d) {
    if (d[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + d[0] + (this.useColors ? "%c " : " ") + "+" + i.exports.humanize(this.diff), !this.useColors)
      return;
    const p = "color: " + this.color;
    d.splice(1, 0, p, "color: inherit");
    let c = 0, u = 0;
    d[0].replace(/%[a-zA-Z%]/g, (l) => {
      l !== "%%" && (c++, l === "%c" && (u = c));
    }), d.splice(u, 0, p);
  }
  e.log = console.debug || console.log || (() => {
  });
  function r(d) {
    try {
      d ? e.storage.setItem("debug", d) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function n() {
    let d;
    try {
      d = e.storage.getItem("debug");
    } catch {
    }
    return !d && typeof process < "u" && "env" in process && (d = process.env.DEBUG), d;
  }
  function a() {
    try {
      return localStorage;
    } catch {
    }
  }
  i.exports = Pi(e);
  const { formatters: o } = i.exports;
  o.j = function(d) {
    try {
      return JSON.stringify(d);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
})(Ms, Ms.exports);
var Zt = Ms.exports, ze = {}, ks = { exports: {} };
(function(i, e) {
  (function(t, s) {
    var r = "1.0.36", n = "", a = "?", o = "function", d = "undefined", p = "object", c = "string", u = "major", l = "model", h = "name", f = "type", g = "vendor", m = "version", S = "architecture", B = "console", w = "mobile", P = "tablet", W = "smarttv", se = "wearable", le = "embedded", ie = 350, ce = "Amazon", ue = "Apple", te = "ASUS", Y = "BlackBerry", Le = "Browser", Fe = "Chrome", hs = "Edge", Ke = "Firefox", Be = "Google", L = "Huawei", b = "LG", G = "Microsoft", ne = "Motorola", Ie = "Opera", he = "Samsung", Me = "Sharp", qe = "Sony", He = "Xiaomi", fs = "Zebra", Js = "Facebook", Xs = "Chromium OS", er = "Mac OS", Si = function(x, F) {
      var I = {};
      for (var V in x)
        F[V] && F[V].length % 2 === 0 ? I[V] = F[V].concat(x[V]) : I[V] = x[V];
      return I;
    }, $t = function(x) {
      for (var F = {}, I = 0; I < x.length; I++)
        F[x[I].toUpperCase()] = x[I];
      return F;
    }, tr = function(x, F) {
      return typeof x === c ? _t(F).indexOf(_t(x)) !== -1 : !1;
    }, _t = function(x) {
      return x.toLowerCase();
    }, bi = function(x) {
      return typeof x === c ? x.replace(/[^\d\.]/g, n).split(".")[0] : s;
    }, ms = function(x, F) {
      if (typeof x === c)
        return x = x.replace(/^\s\s*/, n), typeof F === d ? x : x.substring(0, ie);
    }, wt = function(x, F) {
      for (var I = 0, V, ke, fe, A, E, me; I < F.length && !E; ) {
        var _s = F[I], ir = F[I + 1];
        for (V = ke = 0; V < _s.length && !E && _s[V]; )
          if (E = _s[V++].exec(x), E)
            for (fe = 0; fe < ir.length; fe++)
              me = E[++ke], A = ir[fe], typeof A === p && A.length > 0 ? A.length === 2 ? typeof A[1] == o ? this[A[0]] = A[1].call(this, me) : this[A[0]] = A[1] : A.length === 3 ? typeof A[1] === o && !(A[1].exec && A[1].test) ? this[A[0]] = me ? A[1].call(this, me, A[2]) : s : this[A[0]] = me ? me.replace(A[1], A[2]) : s : A.length === 4 && (this[A[0]] = me ? A[3].call(this, me.replace(A[1], A[2])) : s) : this[A] = me || s;
        I += 2;
      }
    }, gs = function(x, F) {
      for (var I in F)
        if (typeof F[I] === p && F[I].length > 0) {
          for (var V = 0; V < F[I].length; V++)
            if (tr(F[I][V], x))
              return I === a ? s : I;
        } else if (tr(F[I], x))
          return I === a ? s : I;
      return x;
    }, yi = {
      "1.0": "/8",
      "1.2": "/1",
      "1.3": "/3",
      "2.0": "/412",
      "2.0.2": "/416",
      "2.0.3": "/417",
      "2.0.4": "/419",
      "?": "/"
    }, sr = {
      ME: "4.90",
      "NT 3.11": "NT3.51",
      "NT 4.0": "NT4.0",
      2e3: "NT 5.0",
      XP: ["NT 5.1", "NT 5.2"],
      Vista: "NT 6.0",
      7: "NT 6.1",
      8: "NT 6.2",
      "8.1": "NT 6.3",
      10: ["NT 6.4", "NT 10.0"],
      RT: "ARM"
    }, rr = {
      browser: [
        [
          /\b(?:crmo|crios)\/([\w\.]+)/i
          // Chrome for Android/iOS
        ],
        [m, [h, "Chrome"]],
        [
          /edg(?:e|ios|a)?\/([\w\.]+)/i
          // Microsoft Edge
        ],
        [m, [h, "Edge"]],
        [
          // Presto based
          /(opera mini)\/([-\w\.]+)/i,
          // Opera Mini
          /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
          // Opera Mobi/Tablet
          /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i
          // Opera
        ],
        [h, m],
        [
          /opios[\/ ]+([\w\.]+)/i
          // Opera mini on iphone >= 8.0
        ],
        [m, [h, Ie + " Mini"]],
        [
          /\bopr\/([\w\.]+)/i
          // Opera Webkit
        ],
        [m, [h, Ie]],
        [
          // Mixed
          /(kindle)\/([\w\.]+)/i,
          // Kindle
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
          // Lunascape/Maxthon/Netfront/Jasmine/Blazer
          // Trident based
          /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
          // Avant/IEMobile/SlimBrowser
          /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
          // Baidu Browser
          /(?:ms|\()(ie) ([\w\.]+)/i,
          // Internet Explorer
          // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
          /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
          // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
          /(heytap|ovi)browser\/([\d\.]+)/i,
          // Heytap/Ovi
          /(weibo)__([\d\.]+)/i
          // Weibo
        ],
        [h, m],
        [
          /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i
          // UCBrowser
        ],
        [m, [h, "UC" + Le]],
        [
          /microm.+\bqbcore\/([\w\.]+)/i,
          // WeChat Desktop for Windows Built-in Browser
          /\bqbcore\/([\w\.]+).+microm/i
        ],
        [m, [h, "WeChat(Win) Desktop"]],
        [
          /micromessenger\/([\w\.]+)/i
          // WeChat
        ],
        [m, [h, "WeChat"]],
        [
          /konqueror\/([\w\.]+)/i
          // Konqueror
        ],
        [m, [h, "Konqueror"]],
        [
          /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i
          // IE11
        ],
        [m, [h, "IE"]],
        [
          /ya(?:search)?browser\/([\w\.]+)/i
          // Yandex
        ],
        [m, [h, "Yandex"]],
        [
          /(avast|avg)\/([\w\.]+)/i
          // Avast/AVG Secure Browser
        ],
        [[h, /(.+)/, "$1 Secure " + Le], m],
        [
          /\bfocus\/([\w\.]+)/i
          // Firefox Focus
        ],
        [m, [h, Ke + " Focus"]],
        [
          /\bopt\/([\w\.]+)/i
          // Opera Touch
        ],
        [m, [h, Ie + " Touch"]],
        [
          /coc_coc\w+\/([\w\.]+)/i
          // Coc Coc Browser
        ],
        [m, [h, "Coc Coc"]],
        [
          /dolfin\/([\w\.]+)/i
          // Dolphin
        ],
        [m, [h, "Dolphin"]],
        [
          /coast\/([\w\.]+)/i
          // Opera Coast
        ],
        [m, [h, Ie + " Coast"]],
        [
          /miuibrowser\/([\w\.]+)/i
          // MIUI Browser
        ],
        [m, [h, "MIUI " + Le]],
        [
          /fxios\/([-\w\.]+)/i
          // Firefox for iOS
        ],
        [m, [h, Ke]],
        [
          /\bqihu|(qi?ho?o?|360)browser/i
          // 360
        ],
        [[h, "360 " + Le]],
        [
          /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
        ],
        [[h, /(.+)/, "$1 " + Le], m],
        [
          // Oculus/Samsung/Sailfish/Huawei Browser
          /(comodo_dragon)\/([\w\.]+)/i
          // Comodo Dragon
        ],
        [[h, /_/g, " "], m],
        [
          /(electron)\/([\w\.]+) safari/i,
          // Electron-based App
          /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
          // Tesla
          /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i
          // QQBrowser/Baidu App/2345 Browser
        ],
        [h, m],
        [
          /(metasr)[\/ ]?([\w\.]+)/i,
          // SouGouBrowser
          /(lbbrowser)/i,
          // LieBao Browser
          /\[(linkedin)app\]/i
          // LinkedIn App for iOS & Android
        ],
        [h],
        [
          // WebView
          /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i
          // Facebook App for iOS & Android
        ],
        [[h, Js], m],
        [
          /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
          // Kakao App
          /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
          // Naver InApp
          /safari (line)\/([\w\.]+)/i,
          // Line App for iOS
          /\b(line)\/([\w\.]+)\/iab/i,
          // Line App for Android
          /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i
          // Chromium/Instagram/Snapchat
        ],
        [h, m],
        [
          /\bgsa\/([\w\.]+) .*safari\//i
          // Google Search Appliance on iOS
        ],
        [m, [h, "GSA"]],
        [
          /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i
          // TikTok
        ],
        [m, [h, "TikTok"]],
        [
          /headlesschrome(?:\/([\w\.]+)| )/i
          // Chrome Headless
        ],
        [m, [h, Fe + " Headless"]],
        [
          / wv\).+(chrome)\/([\w\.]+)/i
          // Chrome WebView
        ],
        [[h, Fe + " WebView"], m],
        [
          /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i
          // Android Browser
        ],
        [m, [h, "Android " + Le]],
        [
          /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i
          // Chrome/OmniWeb/Arora/Tizen/Nokia
        ],
        [h, m],
        [
          /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i
          // Mobile Safari
        ],
        [m, [h, "Mobile Safari"]],
        [
          /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i
          // Safari & Safari Mobile
        ],
        [m, h],
        [
          /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i
          // Safari < 3.0
        ],
        [h, [m, gs, yi]],
        [
          /(webkit|khtml)\/([\w\.]+)/i
        ],
        [h, m],
        [
          // Gecko based
          /(navigator|netscape\d?)\/([-\w\.]+)/i
          // Netscape
        ],
        [[h, "Netscape"], m],
        [
          /mobile vr; rv:([\w\.]+)\).+firefox/i
          // Firefox Reality
        ],
        [m, [h, Ke + " Reality"]],
        [
          /ekiohf.+(flow)\/([\w\.]+)/i,
          // Flow
          /(swiftfox)/i,
          // Swiftfox
          /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
          // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
          /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
          // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
          /(firefox)\/([\w\.]+)/i,
          // Other Firefox-based
          /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
          // Mozilla
          // Other
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
          // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
          /(links) \(([\w\.]+)/i,
          // Links
          /panasonic;(viera)/i
          // Panasonic Viera
        ],
        [h, m],
        [
          /(cobalt)\/([\w\.]+)/i
          // Cobalt
        ],
        [h, [m, /master.|lts./, ""]]
      ],
      cpu: [
        [
          /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i
          // AMD64 (x64)
        ],
        [[S, "amd64"]],
        [
          /(ia32(?=;))/i
          // IA32 (quicktime)
        ],
        [[S, _t]],
        [
          /((?:i[346]|x)86)[;\)]/i
          // IA32 (x86)
        ],
        [[S, "ia32"]],
        [
          /\b(aarch64|arm(v?8e?l?|_?64))\b/i
          // ARM64
        ],
        [[S, "arm64"]],
        [
          /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i
          // ARMHF
        ],
        [[S, "armhf"]],
        [
          // PocketPC mistakenly identified as PowerPC
          /windows (ce|mobile); ppc;/i
        ],
        [[S, "arm"]],
        [
          /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i
          // PowerPC
        ],
        [[S, /ower/, n, _t]],
        [
          /(sun4\w)[;\)]/i
          // SPARC
        ],
        [[S, "sparc"]],
        [
          /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
          // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
        ],
        [[S, _t]]
      ],
      device: [
        [
          //////////////////////////
          // MOBILES & TABLETS
          /////////////////////////
          // Samsung
          /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
        ],
        [l, [g, he], [f, P]],
        [
          /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
          /samsung[- ]([-\w]+)/i,
          /sec-(sgh\w+)/i
        ],
        [l, [g, he], [f, w]],
        [
          // Apple
          /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i
          // iPod/iPhone
        ],
        [l, [g, ue], [f, w]],
        [
          /\((ipad);[-\w\),; ]+apple/i,
          // iPad
          /applecoremedia\/[\w\.]+ \((ipad)/i,
          /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
        ],
        [l, [g, ue], [f, P]],
        [
          /(macintosh);/i
        ],
        [l, [g, ue]],
        [
          // Sharp
          /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
        ],
        [l, [g, Me], [f, w]],
        [
          // Huawei
          /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
        ],
        [l, [g, L], [f, P]],
        [
          /(?:huawei|honor)([-\w ]+)[;\)]/i,
          /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
        ],
        [l, [g, L], [f, w]],
        [
          // Xiaomi
          /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
          // Xiaomi POCO
          /\b; (\w+) build\/hm\1/i,
          // Xiaomi Hongmi 'numeric' models
          /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
          // Xiaomi Hongmi
          /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
          // Xiaomi Redmi
          /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i
          // Xiaomi Mi
        ],
        [[l, /_/g, " "], [g, He], [f, w]],
        [
          /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i
          // Mi Pad tablets
        ],
        [[l, /_/g, " "], [g, He], [f, P]],
        [
          // OPPO
          /; (\w+) bui.+ oppo/i,
          /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
        ],
        [l, [g, "OPPO"], [f, w]],
        [
          // Vivo
          /vivo (\w+)(?: bui|\))/i,
          /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
        ],
        [l, [g, "Vivo"], [f, w]],
        [
          // Realme
          /\b(rmx[12]\d{3})(?: bui|;|\))/i
        ],
        [l, [g, "Realme"], [f, w]],
        [
          // Motorola
          /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
          /\bmot(?:orola)?[- ](\w*)/i,
          /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
        ],
        [l, [g, ne], [f, w]],
        [
          /\b(mz60\d|xoom[2 ]{0,2}) build\//i
        ],
        [l, [g, ne], [f, P]],
        [
          // LG
          /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
        ],
        [l, [g, b], [f, P]],
        [
          /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
          /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
          /\blg-?([\d\w]+) bui/i
        ],
        [l, [g, b], [f, w]],
        [
          // Lenovo
          /(ideatab[-\w ]+)/i,
          /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
        ],
        [l, [g, "Lenovo"], [f, P]],
        [
          // Nokia
          /(?:maemo|nokia).*(n900|lumia \d+)/i,
          /nokia[-_ ]?([-\w\.]*)/i
        ],
        [[l, /_/g, " "], [g, "Nokia"], [f, w]],
        [
          // Google
          /(pixel c)\b/i
          // Google Pixel C
        ],
        [l, [g, Be], [f, P]],
        [
          /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i
          // Google Pixel
        ],
        [l, [g, Be], [f, w]],
        [
          // Sony
          /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
        ],
        [l, [g, qe], [f, w]],
        [
          /sony tablet [ps]/i,
          /\b(?:sony)?sgp\w+(?: bui|\))/i
        ],
        [[l, "Xperia Tablet"], [g, qe], [f, P]],
        [
          // OnePlus
          / (kb2005|in20[12]5|be20[12][59])\b/i,
          /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
        ],
        [l, [g, "OnePlus"], [f, w]],
        [
          // Amazon
          /(alexa)webm/i,
          /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
          // Kindle Fire without Silk / Echo Show
          /(kf[a-z]+)( bui|\)).+silk\//i
          // Kindle Fire HD
        ],
        [l, [g, ce], [f, P]],
        [
          /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i
          // Fire Phone
        ],
        [[l, /(.+)/g, "Fire Phone $1"], [g, ce], [f, w]],
        [
          // BlackBerry
          /(playbook);[-\w\),; ]+(rim)/i
          // BlackBerry PlayBook
        ],
        [l, g, [f, P]],
        [
          /\b((?:bb[a-f]|st[hv])100-\d)/i,
          /\(bb10; (\w+)/i
          // BlackBerry 10
        ],
        [l, [g, Y], [f, w]],
        [
          // Asus
          /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
        ],
        [l, [g, te], [f, P]],
        [
          / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
        ],
        [l, [g, te], [f, w]],
        [
          // HTC
          /(nexus 9)/i
          // HTC Nexus 9
        ],
        [l, [g, "HTC"], [f, P]],
        [
          /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
          // HTC
          // ZTE
          /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
          /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i
          // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
        ],
        [g, [l, /_/g, " "], [f, w]],
        [
          // Acer
          /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
        ],
        [l, [g, "Acer"], [f, P]],
        [
          // Meizu
          /droid.+; (m[1-5] note) bui/i,
          /\bmz-([-\w]{2,})/i
        ],
        [l, [g, "Meizu"], [f, w]],
        [
          // MIXED
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
          // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
          /(hp) ([\w ]+\w)/i,
          // HP iPAQ
          /(asus)-?(\w+)/i,
          // Asus
          /(microsoft); (lumia[\w ]+)/i,
          // Microsoft Lumia
          /(lenovo)[-_ ]?([-\w]+)/i,
          // Lenovo
          /(jolla)/i,
          // Jolla
          /(oppo) ?([\w ]+) bui/i
          // OPPO
        ],
        [g, l, [f, w]],
        [
          /(kobo)\s(ereader|touch)/i,
          // Kobo
          /(archos) (gamepad2?)/i,
          // Archos
          /(hp).+(touchpad(?!.+tablet)|tablet)/i,
          // HP TouchPad
          /(kindle)\/([\w\.]+)/i,
          // Kindle
          /(nook)[\w ]+build\/(\w+)/i,
          // Nook
          /(dell) (strea[kpr\d ]*[\dko])/i,
          // Dell Streak
          /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
          // Le Pan Tablets
          /(trinity)[- ]*(t\d{3}) bui/i,
          // Trinity Tablets
          /(gigaset)[- ]+(q\w{1,9}) bui/i,
          // Gigaset Tablets
          /(vodafone) ([\w ]+)(?:\)| bui)/i
          // Vodafone
        ],
        [g, l, [f, P]],
        [
          /(surface duo)/i
          // Surface Duo
        ],
        [l, [g, G], [f, P]],
        [
          /droid [\d\.]+; (fp\du?)(?: b|\))/i
          // Fairphone
        ],
        [l, [g, "Fairphone"], [f, w]],
        [
          /(u304aa)/i
          // AT&T
        ],
        [l, [g, "AT&T"], [f, w]],
        [
          /\bsie-(\w*)/i
          // Siemens
        ],
        [l, [g, "Siemens"], [f, w]],
        [
          /\b(rct\w+) b/i
          // RCA Tablets
        ],
        [l, [g, "RCA"], [f, P]],
        [
          /\b(venue[\d ]{2,7}) b/i
          // Dell Venue Tablets
        ],
        [l, [g, "Dell"], [f, P]],
        [
          /\b(q(?:mv|ta)\w+) b/i
          // Verizon Tablet
        ],
        [l, [g, "Verizon"], [f, P]],
        [
          /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i
          // Barnes & Noble Tablet
        ],
        [l, [g, "Barnes & Noble"], [f, P]],
        [
          /\b(tm\d{3}\w+) b/i
        ],
        [l, [g, "NuVision"], [f, P]],
        [
          /\b(k88) b/i
          // ZTE K Series Tablet
        ],
        [l, [g, "ZTE"], [f, P]],
        [
          /\b(nx\d{3}j) b/i
          // ZTE Nubia
        ],
        [l, [g, "ZTE"], [f, w]],
        [
          /\b(gen\d{3}) b.+49h/i
          // Swiss GEN Mobile
        ],
        [l, [g, "Swiss"], [f, w]],
        [
          /\b(zur\d{3}) b/i
          // Swiss ZUR Tablet
        ],
        [l, [g, "Swiss"], [f, P]],
        [
          /\b((zeki)?tb.*\b) b/i
          // Zeki Tablets
        ],
        [l, [g, "Zeki"], [f, P]],
        [
          /\b([yr]\d{2}) b/i,
          /\b(dragon[- ]+touch |dt)(\w{5}) b/i
          // Dragon Touch Tablet
        ],
        [[g, "Dragon Touch"], l, [f, P]],
        [
          /\b(ns-?\w{0,9}) b/i
          // Insignia Tablets
        ],
        [l, [g, "Insignia"], [f, P]],
        [
          /\b((nxa|next)-?\w{0,9}) b/i
          // NextBook Tablets
        ],
        [l, [g, "NextBook"], [f, P]],
        [
          /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i
          // Voice Xtreme Phones
        ],
        [[g, "Voice"], l, [f, w]],
        [
          /\b(lvtel\-)?(v1[12]) b/i
          // LvTel Phones
        ],
        [[g, "LvTel"], l, [f, w]],
        [
          /\b(ph-1) /i
          // Essential PH-1
        ],
        [l, [g, "Essential"], [f, w]],
        [
          /\b(v(100md|700na|7011|917g).*\b) b/i
          // Envizen Tablets
        ],
        [l, [g, "Envizen"], [f, P]],
        [
          /\b(trio[-\w\. ]+) b/i
          // MachSpeed Tablets
        ],
        [l, [g, "MachSpeed"], [f, P]],
        [
          /\btu_(1491) b/i
          // Rotor Tablets
        ],
        [l, [g, "Rotor"], [f, P]],
        [
          /(shield[\w ]+) b/i
          // Nvidia Shield Tablets
        ],
        [l, [g, "Nvidia"], [f, P]],
        [
          /(sprint) (\w+)/i
          // Sprint Phones
        ],
        [g, l, [f, w]],
        [
          /(kin\.[onetw]{3})/i
          // Microsoft Kin
        ],
        [[l, /\./g, " "], [g, G], [f, w]],
        [
          /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i
          // Zebra
        ],
        [l, [g, fs], [f, P]],
        [
          /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
        ],
        [l, [g, fs], [f, w]],
        [
          ///////////////////
          // SMARTTVS
          ///////////////////
          /smart-tv.+(samsung)/i
          // Samsung
        ],
        [g, [f, W]],
        [
          /hbbtv.+maple;(\d+)/i
        ],
        [[l, /^/, "SmartTV"], [g, he], [f, W]],
        [
          /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i
          // LG SmartTV
        ],
        [[g, b], [f, W]],
        [
          /(apple) ?tv/i
          // Apple TV
        ],
        [g, [l, ue + " TV"], [f, W]],
        [
          /crkey/i
          // Google Chromecast
        ],
        [[l, Fe + "cast"], [g, Be], [f, W]],
        [
          /droid.+aft(\w+)( bui|\))/i
          // Fire TV
        ],
        [l, [g, ce], [f, W]],
        [
          /\(dtv[\);].+(aquos)/i,
          /(aquos-tv[\w ]+)\)/i
          // Sharp
        ],
        [l, [g, Me], [f, W]],
        [
          /(bravia[\w ]+)( bui|\))/i
          // Sony
        ],
        [l, [g, qe], [f, W]],
        [
          /(mitv-\w{5}) bui/i
          // Xiaomi
        ],
        [l, [g, He], [f, W]],
        [
          /Hbbtv.*(technisat) (.*);/i
          // TechniSAT
        ],
        [g, l, [f, W]],
        [
          /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
          // Roku
          /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i
          // HbbTV devices
        ],
        [[g, ms], [l, ms], [f, W]],
        [
          /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i
          // SmartTV from Unidentified Vendors
        ],
        [[f, W]],
        [
          ///////////////////
          // CONSOLES
          ///////////////////
          /(ouya)/i,
          // Ouya
          /(nintendo) ([wids3utch]+)/i
          // Nintendo
        ],
        [g, l, [f, B]],
        [
          /droid.+; (shield) bui/i
          // Nvidia
        ],
        [l, [g, "Nvidia"], [f, B]],
        [
          /(playstation [345portablevi]+)/i
          // Playstation
        ],
        [l, [g, qe], [f, B]],
        [
          /\b(xbox(?: one)?(?!; xbox))[\); ]/i
          // Microsoft Xbox
        ],
        [l, [g, G], [f, B]],
        [
          ///////////////////
          // WEARABLES
          ///////////////////
          /((pebble))app/i
          // Pebble
        ],
        [g, l, [f, se]],
        [
          /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i
          // Apple Watch
        ],
        [l, [g, ue], [f, se]],
        [
          /droid.+; (glass) \d/i
          // Google Glass
        ],
        [l, [g, Be], [f, se]],
        [
          /droid.+; (wt63?0{2,3})\)/i
        ],
        [l, [g, fs], [f, se]],
        [
          /(quest( 2| pro)?)/i
          // Oculus Quest
        ],
        [l, [g, Js], [f, se]],
        [
          ///////////////////
          // EMBEDDED
          ///////////////////
          /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i
          // Tesla
        ],
        [g, [f, le]],
        [
          /(aeobc)\b/i
          // Echo Dot
        ],
        [l, [g, ce], [f, le]],
        [
          ////////////////////
          // MIXED (GENERIC)
          ///////////////////
          /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i
          // Android Phones from Unidentified Vendors
        ],
        [l, [f, w]],
        [
          /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i
          // Android Tablets from Unidentified Vendors
        ],
        [l, [f, P]],
        [
          /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i
          // Unidentifiable Tablet
        ],
        [[f, P]],
        [
          /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i
          // Unidentifiable Mobile
        ],
        [[f, w]],
        [
          /(android[-\w\. ]{0,9});.+buil/i
          // Generic Android Device
        ],
        [l, [g, "Generic"]]
      ],
      engine: [
        [
          /windows.+ edge\/([\w\.]+)/i
          // EdgeHTML
        ],
        [m, [h, hs + "HTML"]],
        [
          /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i
          // Blink
        ],
        [m, [h, "Blink"]],
        [
          /(presto)\/([\w\.]+)/i,
          // Presto
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
          /ekioh(flow)\/([\w\.]+)/i,
          // Flow
          /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
          // KHTML/Tasman/Links
          /(icab)[\/ ]([23]\.[\d\.]+)/i,
          // iCab
          /\b(libweb)/i
        ],
        [h, m],
        [
          /rv\:([\w\.]{1,9})\b.+(gecko)/i
          // Gecko
        ],
        [m, h]
      ],
      os: [
        [
          // Windows
          /microsoft (windows) (vista|xp)/i
          // Windows (iTunes)
        ],
        [h, m],
        [
          /(windows) nt 6\.2; (arm)/i,
          // Windows RT
          /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
          // Windows Phone
          /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
        ],
        [h, [m, gs, sr]],
        [
          /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
        ],
        [[h, "Windows"], [m, gs, sr]],
        [
          // iOS/macOS
          /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
          // iOS
          /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
          /cfnetwork\/.+darwin/i
        ],
        [[m, /_/g, "."], [h, "iOS"]],
        [
          /(mac os x) ?([\w\. ]*)/i,
          /(macintosh|mac_powerpc\b)(?!.+haiku)/i
          // Mac OS
        ],
        [[h, er], [m, /_/g, "."]],
        [
          // Mobile OSes
          /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i
          // Android-x86/HarmonyOS
        ],
        [m, h],
        [
          // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
          /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
          /(blackberry)\w*\/([\w\.]*)/i,
          // Blackberry
          /(tizen|kaios)[\/ ]([\w\.]+)/i,
          // Tizen/KaiOS
          /\((series40);/i
          // Series 40
        ],
        [h, m],
        [
          /\(bb(10);/i
          // BlackBerry 10
        ],
        [m, [h, Y]],
        [
          /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i
          // Symbian
        ],
        [m, [h, "Symbian"]],
        [
          /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i
          // Firefox OS
        ],
        [m, [h, Ke + " OS"]],
        [
          /web0s;.+rt(tv)/i,
          /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i
          // WebOS
        ],
        [m, [h, "webOS"]],
        [
          /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i
          // watchOS
        ],
        [m, [h, "watchOS"]],
        [
          // Google Chromecast
          /crkey\/([\d\.]+)/i
          // Google Chromecast
        ],
        [m, [h, Fe + "cast"]],
        [
          /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i
          // Chromium OS
        ],
        [[h, Xs], m],
        [
          // Smart TVs
          /panasonic;(viera)/i,
          // Panasonic Viera
          /(netrange)mmh/i,
          // Netrange
          /(nettv)\/(\d+\.[\w\.]+)/i,
          // NetTV
          // Console
          /(nintendo|playstation) ([wids345portablevuch]+)/i,
          // Nintendo/Playstation
          /(xbox); +xbox ([^\);]+)/i,
          // Microsoft Xbox (360, One, X, S, Series X, Series S)
          // Other
          /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
          // Joli/Palm
          /(mint)[\/\(\) ]?(\w*)/i,
          // Mint
          /(mageia|vectorlinux)[; ]/i,
          // Mageia/VectorLinux
          /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
          // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
          /(hurd|linux) ?([\w\.]*)/i,
          // Hurd/Linux
          /(gnu) ?([\w\.]*)/i,
          // GNU
          /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
          // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
          /(haiku) (\w+)/i
          // Haiku
        ],
        [h, m],
        [
          /(sunos) ?([\w\.\d]*)/i
          // Solaris
        ],
        [[h, "Solaris"], m],
        [
          /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
          // Solaris
          /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
          // AIX
          /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
          // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX/SerenityOS
          /(unix) ?([\w\.]*)/i
          // UNIX
        ],
        [h, m]
      ]
    }, de = function(x, F) {
      if (typeof x === p && (F = x, x = s), !(this instanceof de))
        return new de(x, F).getResult();
      var I = typeof t !== d && t.navigator ? t.navigator : s, V = x || (I && I.userAgent ? I.userAgent : n), ke = I && I.userAgentData ? I.userAgentData : s, fe = F ? Si(rr, F) : rr, A = I && I.userAgent == V;
      return this.getBrowser = function() {
        var E = {};
        return E[h] = s, E[m] = s, wt.call(E, V, fe.browser), E[u] = bi(E[m]), A && I && I.brave && typeof I.brave.isBrave == o && (E[h] = "Brave"), E;
      }, this.getCPU = function() {
        var E = {};
        return E[S] = s, wt.call(E, V, fe.cpu), E;
      }, this.getDevice = function() {
        var E = {};
        return E[g] = s, E[l] = s, E[f] = s, wt.call(E, V, fe.device), A && !E[f] && ke && ke.mobile && (E[f] = w), A && E[l] == "Macintosh" && I && typeof I.standalone !== d && I.maxTouchPoints && I.maxTouchPoints > 2 && (E[l] = "iPad", E[f] = P), E;
      }, this.getEngine = function() {
        var E = {};
        return E[h] = s, E[m] = s, wt.call(E, V, fe.engine), E;
      }, this.getOS = function() {
        var E = {};
        return E[h] = s, E[m] = s, wt.call(E, V, fe.os), A && !E[h] && ke && ke.platform != "Unknown" && (E[h] = ke.platform.replace(/chrome os/i, Xs).replace(/macos/i, er)), E;
      }, this.getResult = function() {
        return {
          ua: this.getUA(),
          browser: this.getBrowser(),
          engine: this.getEngine(),
          os: this.getOS(),
          device: this.getDevice(),
          cpu: this.getCPU()
        };
      }, this.getUA = function() {
        return V;
      }, this.setUA = function(E) {
        return V = typeof E === c && E.length > ie ? ms(E, ie) : E, this;
      }, this.setUA(V), this;
    };
    de.VERSION = r, de.BROWSER = $t([h, m, u]), de.CPU = $t([S]), de.DEVICE = $t([l, g, f, B, w, W, P, se, le]), de.ENGINE = de.OS = $t([h, m]), i.exports && (e = i.exports = de), e.UAParser = de;
    var We = typeof t !== d && (t.jQuery || t.Zepto);
    if (We && !We.ua) {
      var At = new de();
      We.ua = At.getResult(), We.ua.get = function() {
        return At.getUA();
      }, We.ua.set = function(x) {
        At.setUA(x);
        var F = At.getResult();
        for (var I in F)
          We.ua[I] = F[I];
      };
    }
  })(typeof window == "object" ? window : _);
})(ks, ks.exports);
var Ei = ks.exports, K = {}, Li = _ && _.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(K, "__esModule", { value: !0 });
K.Logger = void 0;
const Qe = Li(Zt), Ye = "mediasoup-client";
let Ii = class {
  constructor(e) {
    e ? (this._debug = (0, Qe.default)(`${Ye}:${e}`), this._warn = (0, Qe.default)(`${Ye}:WARN:${e}`), this._error = (0, Qe.default)(`${Ye}:ERROR:${e}`)) : (this._debug = (0, Qe.default)(Ye), this._warn = (0, Qe.default)(`${Ye}:WARN`), this._error = (0, Qe.default)(`${Ye}:ERROR`)), this._debug.log = console.info.bind(console), this._warn.log = console.warn.bind(console), this._error.log = console.error.bind(console);
  }
  get debug() {
    return this._debug;
  }
  get warn() {
    return this._warn;
  }
  get error() {
    return this._error;
  }
};
K.Logger = Ii;
var De = {}, Os = { exports: {} }, lt = typeof Reflect == "object" ? Reflect : null, ar = lt && typeof lt.apply == "function" ? lt.apply : function(e, t, s) {
  return Function.prototype.apply.call(e, t, s);
}, Yt;
lt && typeof lt.ownKeys == "function" ? Yt = lt.ownKeys : Object.getOwnPropertySymbols ? Yt = function(e) {
  return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e));
} : Yt = function(e) {
  return Object.getOwnPropertyNames(e);
};
function Mi(i) {
  console && console.warn && console.warn(i);
}
var Gr = Number.isNaN || function(e) {
  return e !== e;
};
function z() {
  z.init.call(this);
}
Os.exports = z;
Os.exports.once = ji;
z.EventEmitter = z;
z.prototype._events = void 0;
z.prototype._eventsCount = 0;
z.prototype._maxListeners = void 0;
var or = 10;
function Jt(i) {
  if (typeof i != "function")
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof i);
}
Object.defineProperty(z, "defaultMaxListeners", {
  enumerable: !0,
  get: function() {
    return or;
  },
  set: function(i) {
    if (typeof i != "number" || i < 0 || Gr(i))
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + i + ".");
    or = i;
  }
});
z.init = function() {
  (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
};
z.prototype.setMaxListeners = function(e) {
  if (typeof e != "number" || e < 0 || Gr(e))
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
  return this._maxListeners = e, this;
};
function Kr(i) {
  return i._maxListeners === void 0 ? z.defaultMaxListeners : i._maxListeners;
}
z.prototype.getMaxListeners = function() {
  return Kr(this);
};
z.prototype.emit = function(e) {
  for (var t = [], s = 1; s < arguments.length; s++)
    t.push(arguments[s]);
  var r = e === "error", n = this._events;
  if (n !== void 0)
    r = r && n.error === void 0;
  else if (!r)
    return !1;
  if (r) {
    var a;
    if (t.length > 0 && (a = t[0]), a instanceof Error)
      throw a;
    var o = new Error("Unhandled error." + (a ? " (" + a.message + ")" : ""));
    throw o.context = a, o;
  }
  var d = n[e];
  if (d === void 0)
    return !1;
  if (typeof d == "function")
    ar(d, this, t);
  else
    for (var p = d.length, c = Yr(d, p), s = 0; s < p; ++s)
      ar(c[s], this, t);
  return !0;
};
function qr(i, e, t, s) {
  var r, n, a;
  if (Jt(t), n = i._events, n === void 0 ? (n = i._events = /* @__PURE__ */ Object.create(null), i._eventsCount = 0) : (n.newListener !== void 0 && (i.emit(
    "newListener",
    e,
    t.listener ? t.listener : t
  ), n = i._events), a = n[e]), a === void 0)
    a = n[e] = t, ++i._eventsCount;
  else if (typeof a == "function" ? a = n[e] = s ? [t, a] : [a, t] : s ? a.unshift(t) : a.push(t), r = Kr(i), r > 0 && a.length > r && !a.warned) {
    a.warned = !0;
    var o = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(e) + " listeners added. Use emitter.setMaxListeners() to increase limit");
    o.name = "MaxListenersExceededWarning", o.emitter = i, o.type = e, o.count = a.length, Mi(o);
  }
  return i;
}
z.prototype.addListener = function(e, t) {
  return qr(this, e, t, !1);
};
z.prototype.on = z.prototype.addListener;
z.prototype.prependListener = function(e, t) {
  return qr(this, e, t, !0);
};
function ki() {
  if (!this.fired)
    return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
}
function Hr(i, e, t) {
  var s = { fired: !1, wrapFn: void 0, target: i, type: e, listener: t }, r = ki.bind(s);
  return r.listener = t, s.wrapFn = r, r;
}
z.prototype.once = function(e, t) {
  return Jt(t), this.on(e, Hr(this, e, t)), this;
};
z.prototype.prependOnceListener = function(e, t) {
  return Jt(t), this.prependListener(e, Hr(this, e, t)), this;
};
z.prototype.removeListener = function(e, t) {
  var s, r, n, a, o;
  if (Jt(t), r = this._events, r === void 0)
    return this;
  if (s = r[e], s === void 0)
    return this;
  if (s === t || s.listener === t)
    --this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, s.listener || t));
  else if (typeof s != "function") {
    for (n = -1, a = s.length - 1; a >= 0; a--)
      if (s[a] === t || s[a].listener === t) {
        o = s[a].listener, n = a;
        break;
      }
    if (n < 0)
      return this;
    n === 0 ? s.shift() : xi(s, n), s.length === 1 && (r[e] = s[0]), r.removeListener !== void 0 && this.emit("removeListener", e, o || t);
  }
  return this;
};
z.prototype.off = z.prototype.removeListener;
z.prototype.removeAllListeners = function(e) {
  var t, s, r;
  if (s = this._events, s === void 0)
    return this;
  if (s.removeListener === void 0)
    return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : s[e] !== void 0 && (--this._eventsCount === 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete s[e]), this;
  if (arguments.length === 0) {
    var n = Object.keys(s), a;
    for (r = 0; r < n.length; ++r)
      a = n[r], a !== "removeListener" && this.removeAllListeners(a);
    return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
  }
  if (t = s[e], typeof t == "function")
    this.removeListener(e, t);
  else if (t !== void 0)
    for (r = t.length - 1; r >= 0; r--)
      this.removeListener(e, t[r]);
  return this;
};
function Wr(i, e, t) {
  var s = i._events;
  if (s === void 0)
    return [];
  var r = s[e];
  return r === void 0 ? [] : typeof r == "function" ? t ? [r.listener || r] : [r] : t ? Oi(r) : Yr(r, r.length);
}
z.prototype.listeners = function(e) {
  return Wr(this, e, !0);
};
z.prototype.rawListeners = function(e) {
  return Wr(this, e, !1);
};
z.listenerCount = function(i, e) {
  return typeof i.listenerCount == "function" ? i.listenerCount(e) : Qr.call(i, e);
};
z.prototype.listenerCount = Qr;
function Qr(i) {
  var e = this._events;
  if (e !== void 0) {
    var t = e[i];
    if (typeof t == "function")
      return 1;
    if (t !== void 0)
      return t.length;
  }
  return 0;
}
z.prototype.eventNames = function() {
  return this._eventsCount > 0 ? Yt(this._events) : [];
};
function Yr(i, e) {
  for (var t = new Array(e), s = 0; s < e; ++s)
    t[s] = i[s];
  return t;
}
function xi(i, e) {
  for (; e + 1 < i.length; e++)
    i[e] = i[e + 1];
  i.pop();
}
function Oi(i) {
  for (var e = new Array(i.length), t = 0; t < e.length; ++t)
    e[t] = i[t].listener || i[t];
  return e;
}
function ji(i, e) {
  return new Promise(function(t, s) {
    function r(a) {
      i.removeListener(e, n), s(a);
    }
    function n() {
      typeof i.removeListener == "function" && i.removeListener("error", r), t([].slice.call(arguments));
    }
    Zr(i, e, n, { once: !0 }), e !== "error" && $i(i, r, { once: !0 });
  });
}
function $i(i, e, t) {
  typeof i.on == "function" && Zr(i, "error", e, t);
}
function Zr(i, e, t, s) {
  if (typeof i.on == "function")
    s.once ? i.once(e, t) : i.on(e, t);
  else if (typeof i.addEventListener == "function")
    i.addEventListener(e, function r(n) {
      s.once && i.removeEventListener(e, r), t(n);
    });
  else
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof i);
}
var Ai = Os.exports;
Object.defineProperty(De, "__esModule", { value: !0 });
De.EnhancedEventEmitter = void 0;
const Ni = Ai, Fi = K, Bi = new Fi.Logger("EnhancedEventEmitter");
class Ui extends Ni.EventEmitter {
  constructor() {
    super(), this.setMaxListeners(1 / 0);
  }
  emit(e, ...t) {
    return super.emit(e, ...t);
  }
  /**
   * Special addition to the EventEmitter API.
   */
  safeEmit(e, ...t) {
    const s = super.listenerCount(e);
    try {
      return super.emit(e, ...t);
    } catch (r) {
      return Bi.error("safeEmit() | event listener threw an error [eventName:%s]:%o", e, r), !!s;
    }
  }
  on(e, t) {
    return super.on(e, t), this;
  }
  off(e, t) {
    return super.off(e, t), this;
  }
  addListener(e, t) {
    return super.on(e, t), this;
  }
  prependListener(e, t) {
    return super.prependListener(e, t), this;
  }
  once(e, t) {
    return super.once(e, t), this;
  }
  prependOnceListener(e, t) {
    return super.prependOnceListener(e, t), this;
  }
  removeListener(e, t) {
    return super.off(e, t), this;
  }
  removeAllListeners(e) {
    return super.removeAllListeners(e), this;
  }
  listenerCount(e) {
    return super.listenerCount(e);
  }
  listeners(e) {
    return super.listeners(e);
  }
  rawListeners(e) {
    return super.rawListeners(e);
  }
}
De.EnhancedEventEmitter = Ui;
var ee = {};
Object.defineProperty(ee, "__esModule", { value: !0 });
ee.InvalidStateError = ee.UnsupportedError = void 0;
class js extends Error {
  constructor(e) {
    super(e), this.name = "UnsupportedError", Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, js) : this.stack = new Error(e).stack;
  }
}
ee.UnsupportedError = js;
class $s extends Error {
  constructor(e) {
    super(e), this.name = "InvalidStateError", Error.hasOwnProperty("captureStackTrace") ? Error.captureStackTrace(this, $s) : this.stack = new Error(e).stack;
  }
}
ee.InvalidStateError = $s;
var q = {};
Object.defineProperty(q, "__esModule", { value: !0 });
q.generateRandomNumber = q.clone = void 0;
function zi(i) {
  if (i !== void 0)
    return Number.isNaN(i) ? NaN : typeof structuredClone == "function" ? structuredClone(i) : JSON.parse(JSON.stringify(i));
}
q.clone = zi;
function Vi() {
  return Math.round(Math.random() * 1e7);
}
q.generateRandomNumber = Vi;
var v = {}, Jr = {};
(function(i) {
  const e = Zt("h264-profile-level-id");
  e.log = console.info.bind(console);
  const t = 1, s = 2, r = 3, n = 4, a = 5;
  i.ProfileConstrainedBaseline = t, i.ProfileBaseline = s, i.ProfileMain = r, i.ProfileConstrainedHigh = n, i.ProfileHigh = a;
  const o = 0, d = 10, p = 11, c = 12, u = 13, l = 20, h = 21, f = 22, g = 30, m = 31, S = 32, B = 40, w = 41, P = 42, W = 50, se = 51, le = 52;
  i.Level1_b = o, i.Level1 = d, i.Level1_1 = p, i.Level1_2 = c, i.Level1_3 = u, i.Level2 = l, i.Level2_1 = h, i.Level2_2 = f, i.Level3 = g, i.Level3_1 = m, i.Level3_2 = S, i.Level4 = B, i.Level4_1 = w, i.Level4_2 = P, i.Level5 = W, i.Level5_1 = se, i.Level5_2 = le;
  class ie {
    constructor(b, G) {
      this.profile = b, this.level = G;
    }
  }
  i.ProfileLevelId = ie;
  const ce = new ie(t, m), ue = 16;
  class te {
    constructor(b) {
      this._mask = ~Fe("x", b), this._maskedValue = Fe("1", b);
    }
    isMatch(b) {
      return this._maskedValue === (b & this._mask);
    }
  }
  class Y {
    constructor(b, G, ne) {
      this.profile_idc = b, this.profile_iop = G, this.profile = ne;
    }
  }
  const Le = [
    new Y(66, new te("x1xx0000"), t),
    new Y(77, new te("1xxx0000"), t),
    new Y(88, new te("11xx0000"), t),
    new Y(66, new te("x0xx0000"), s),
    new Y(88, new te("10xx0000"), s),
    new Y(77, new te("0x0x0000"), r),
    new Y(100, new te("00000000"), a),
    new Y(100, new te("00001100"), n)
  ];
  i.parseProfileLevelId = function(L) {
    if (typeof L != "string" || L.length !== 6)
      return null;
    const b = parseInt(L, 16);
    if (b === 0)
      return null;
    const G = b & 255, ne = b >> 8 & 255, Ie = b >> 16 & 255;
    let he;
    switch (G) {
      case p: {
        he = ne & ue ? o : p;
        break;
      }
      case d:
      case c:
      case u:
      case l:
      case h:
      case f:
      case g:
      case m:
      case S:
      case B:
      case w:
      case P:
      case W:
      case se:
      case le: {
        he = G;
        break;
      }
      default:
        return e("parseProfileLevelId() | unrecognized level_idc:%s", G), null;
    }
    for (const Me of Le)
      if (Ie === Me.profile_idc && Me.profile_iop.isMatch(ne))
        return new ie(Me.profile, he);
    return e("parseProfileLevelId() | unrecognized profile_idc/profile_iop combination"), null;
  }, i.profileLevelIdToString = function(L) {
    if (L.level == o)
      switch (L.profile) {
        case t:
          return "42f00b";
        case s:
          return "42100b";
        case r:
          return "4d100b";
        default:
          return e(
            "profileLevelIdToString() | Level 1_b not is allowed for profile:%s",
            L.profile
          ), null;
      }
    let b;
    switch (L.profile) {
      case t: {
        b = "42e0";
        break;
      }
      case s: {
        b = "4200";
        break;
      }
      case r: {
        b = "4d00";
        break;
      }
      case n: {
        b = "640c";
        break;
      }
      case a: {
        b = "6400";
        break;
      }
      default:
        return e(
          "profileLevelIdToString() | unrecognized profile:%s",
          L.profile
        ), null;
    }
    let G = L.level.toString(16);
    return G.length === 1 && (G = `0${G}`), `${b}${G}`;
  }, i.parseSdpProfileLevelId = function(L = {}) {
    const b = L["profile-level-id"];
    return b ? i.parseProfileLevelId(b) : ce;
  }, i.isSameProfile = function(L = {}, b = {}) {
    const G = i.parseSdpProfileLevelId(L), ne = i.parseSdpProfileLevelId(b);
    return !!(G && ne && G.profile === ne.profile);
  }, i.generateProfileLevelIdForAnswer = function(L = {}, b = {}) {
    if (!L["profile-level-id"] && !b["profile-level-id"])
      return e(
        "generateProfileLevelIdForAnswer() | no profile-level-id in local and remote params"
      ), null;
    const G = i.parseSdpProfileLevelId(L), ne = i.parseSdpProfileLevelId(b);
    if (!G)
      throw new TypeError("invalid local_profile_level_id");
    if (!ne)
      throw new TypeError("invalid remote_profile_level_id");
    if (G.profile !== ne.profile)
      throw new TypeError("H264 Profile mismatch");
    const Ie = Be(L) && Be(b), he = G.level, Me = ne.level, qe = Ke(he, Me), He = Ie ? he : qe;
    return e(
      "generateProfileLevelIdForAnswer() | result: [profile:%s, level:%s]",
      G.profile,
      He
    ), i.profileLevelIdToString(
      new ie(G.profile, He)
    );
  };
  function Fe(L, b) {
    return (b[0] === L) << 7 | (b[1] === L) << 6 | (b[2] === L) << 5 | (b[3] === L) << 4 | (b[4] === L) << 3 | (b[5] === L) << 2 | (b[6] === L) << 1 | (b[7] === L) << 0;
  }
  function hs(L, b) {
    return L === o ? b !== d && b !== o : b === o ? L !== d : L < b;
  }
  function Ke(L, b) {
    return hs(L, b) ? L : b;
  }
  function Be(L = {}) {
    const b = L["level-asymmetry-allowed"];
    return b === 1 || b === "1";
  }
})(Jr);
var Gi = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Ki = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), Xr = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Gi(e, i, t);
  return Ki(e, i), e;
};
Object.defineProperty(v, "__esModule", { value: !0 });
v.canReceive = v.canSend = v.generateProbatorRtpParameters = v.reduceCodecs = v.getSendingRemoteRtpParameters = v.getSendingRtpParameters = v.getRecvRtpCapabilities = v.getExtendedRtpCapabilities = v.validateSctpStreamParameters = v.validateSctpParameters = v.validateNumSctpStreams = v.validateSctpCapabilities = v.validateRtcpParameters = v.validateRtpEncodingParameters = v.validateRtpHeaderExtensionParameters = v.validateRtpCodecParameters = v.validateRtpParameters = v.validateRtpHeaderExtension = v.validateRtcpFeedback = v.validateRtpCodecCapability = v.validateRtpCapabilities = void 0;
const cr = Xr(Jr), qi = Xr(q), Hi = "probator", Wi = 1234, Qi = 127;
function Yi(i) {
  if (typeof i != "object")
    throw new TypeError("caps is not an object");
  if (i.codecs && !Array.isArray(i.codecs))
    throw new TypeError("caps.codecs is not an array");
  i.codecs || (i.codecs = []);
  for (const e of i.codecs)
    ei(e);
  if (i.headerExtensions && !Array.isArray(i.headerExtensions))
    throw new TypeError("caps.headerExtensions is not an array");
  i.headerExtensions || (i.headerExtensions = []);
  for (const e of i.headerExtensions)
    ti(e);
}
v.validateRtpCapabilities = Yi;
function ei(i) {
  const e = new RegExp("^(audio|video)/(.+)", "i");
  if (typeof i != "object")
    throw new TypeError("codec is not an object");
  if (!i.mimeType || typeof i.mimeType != "string")
    throw new TypeError("missing codec.mimeType");
  const t = e.exec(i.mimeType);
  if (!t)
    throw new TypeError("invalid codec.mimeType");
  if (i.kind = t[1].toLowerCase(), i.preferredPayloadType && typeof i.preferredPayloadType != "number")
    throw new TypeError("invalid codec.preferredPayloadType");
  if (typeof i.clockRate != "number")
    throw new TypeError("missing codec.clockRate");
  i.kind === "audio" ? typeof i.channels != "number" && (i.channels = 1) : delete i.channels, (!i.parameters || typeof i.parameters != "object") && (i.parameters = {});
  for (const s of Object.keys(i.parameters)) {
    let r = i.parameters[s];
    if (r === void 0 && (i.parameters[s] = "", r = ""), typeof r != "string" && typeof r != "number")
      throw new TypeError(`invalid codec parameter [key:${s}s, value:${r}]`);
    if (s === "apt" && typeof r != "number")
      throw new TypeError("invalid codec apt parameter");
  }
  (!i.rtcpFeedback || !Array.isArray(i.rtcpFeedback)) && (i.rtcpFeedback = []);
  for (const s of i.rtcpFeedback)
    As(s);
}
v.validateRtpCodecCapability = ei;
function As(i) {
  if (typeof i != "object")
    throw new TypeError("fb is not an object");
  if (!i.type || typeof i.type != "string")
    throw new TypeError("missing fb.type");
  (!i.parameter || typeof i.parameter != "string") && (i.parameter = "");
}
v.validateRtcpFeedback = As;
function ti(i) {
  if (typeof i != "object")
    throw new TypeError("ext is not an object");
  if (i.kind !== "audio" && i.kind !== "video")
    throw new TypeError("invalid ext.kind");
  if (!i.uri || typeof i.uri != "string")
    throw new TypeError("missing ext.uri");
  if (typeof i.preferredId != "number")
    throw new TypeError("missing ext.preferredId");
  if (i.preferredEncrypt && typeof i.preferredEncrypt != "boolean")
    throw new TypeError("invalid ext.preferredEncrypt");
  if (i.preferredEncrypt || (i.preferredEncrypt = !1), i.direction && typeof i.direction != "string")
    throw new TypeError("invalid ext.direction");
  i.direction || (i.direction = "sendrecv");
}
v.validateRtpHeaderExtension = ti;
function Ns(i) {
  if (typeof i != "object")
    throw new TypeError("params is not an object");
  if (i.mid && typeof i.mid != "string")
    throw new TypeError("params.mid is not a string");
  if (!Array.isArray(i.codecs))
    throw new TypeError("missing params.codecs");
  for (const e of i.codecs)
    si(e);
  if (i.headerExtensions && !Array.isArray(i.headerExtensions))
    throw new TypeError("params.headerExtensions is not an array");
  i.headerExtensions || (i.headerExtensions = []);
  for (const e of i.headerExtensions)
    ri(e);
  if (i.encodings && !Array.isArray(i.encodings))
    throw new TypeError("params.encodings is not an array");
  i.encodings || (i.encodings = []);
  for (const e of i.encodings)
    ii(e);
  if (i.rtcp && typeof i.rtcp != "object")
    throw new TypeError("params.rtcp is not an object");
  i.rtcp || (i.rtcp = {}), ni(i.rtcp);
}
v.validateRtpParameters = Ns;
function si(i) {
  const e = new RegExp("^(audio|video)/(.+)", "i");
  if (typeof i != "object")
    throw new TypeError("codec is not an object");
  if (!i.mimeType || typeof i.mimeType != "string")
    throw new TypeError("missing codec.mimeType");
  const t = e.exec(i.mimeType);
  if (!t)
    throw new TypeError("invalid codec.mimeType");
  if (typeof i.payloadType != "number")
    throw new TypeError("missing codec.payloadType");
  if (typeof i.clockRate != "number")
    throw new TypeError("missing codec.clockRate");
  t[1].toLowerCase() === "audio" ? typeof i.channels != "number" && (i.channels = 1) : delete i.channels, (!i.parameters || typeof i.parameters != "object") && (i.parameters = {});
  for (const r of Object.keys(i.parameters)) {
    let n = i.parameters[r];
    if (n === void 0 && (i.parameters[r] = "", n = ""), typeof n != "string" && typeof n != "number")
      throw new TypeError(`invalid codec parameter [key:${r}s, value:${n}]`);
    if (r === "apt" && typeof n != "number")
      throw new TypeError("invalid codec apt parameter");
  }
  (!i.rtcpFeedback || !Array.isArray(i.rtcpFeedback)) && (i.rtcpFeedback = []);
  for (const r of i.rtcpFeedback)
    As(r);
}
v.validateRtpCodecParameters = si;
function ri(i) {
  if (typeof i != "object")
    throw new TypeError("ext is not an object");
  if (!i.uri || typeof i.uri != "string")
    throw new TypeError("missing ext.uri");
  if (typeof i.id != "number")
    throw new TypeError("missing ext.id");
  if (i.encrypt && typeof i.encrypt != "boolean")
    throw new TypeError("invalid ext.encrypt");
  i.encrypt || (i.encrypt = !1), (!i.parameters || typeof i.parameters != "object") && (i.parameters = {});
  for (const e of Object.keys(i.parameters)) {
    let t = i.parameters[e];
    if (t === void 0 && (i.parameters[e] = "", t = ""), typeof t != "string" && typeof t != "number")
      throw new TypeError("invalid header extension parameter");
  }
}
v.validateRtpHeaderExtensionParameters = ri;
function ii(i) {
  if (typeof i != "object")
    throw new TypeError("encoding is not an object");
  if (i.ssrc && typeof i.ssrc != "number")
    throw new TypeError("invalid encoding.ssrc");
  if (i.rid && typeof i.rid != "string")
    throw new TypeError("invalid encoding.rid");
  if (i.rtx && typeof i.rtx != "object")
    throw new TypeError("invalid encoding.rtx");
  if (i.rtx && typeof i.rtx.ssrc != "number")
    throw new TypeError("missing encoding.rtx.ssrc");
  if ((!i.dtx || typeof i.dtx != "boolean") && (i.dtx = !1), i.scalabilityMode && typeof i.scalabilityMode != "string")
    throw new TypeError("invalid encoding.scalabilityMode");
}
v.validateRtpEncodingParameters = ii;
function ni(i) {
  if (typeof i != "object")
    throw new TypeError("rtcp is not an object");
  if (i.cname && typeof i.cname != "string")
    throw new TypeError("invalid rtcp.cname");
  (!i.reducedSize || typeof i.reducedSize != "boolean") && (i.reducedSize = !0);
}
v.validateRtcpParameters = ni;
function Zi(i) {
  if (typeof i != "object")
    throw new TypeError("caps is not an object");
  if (!i.numStreams || typeof i.numStreams != "object")
    throw new TypeError("missing caps.numStreams");
  ai(i.numStreams);
}
v.validateSctpCapabilities = Zi;
function ai(i) {
  if (typeof i != "object")
    throw new TypeError("numStreams is not an object");
  if (typeof i.OS != "number")
    throw new TypeError("missing numStreams.OS");
  if (typeof i.MIS != "number")
    throw new TypeError("missing numStreams.MIS");
}
v.validateNumSctpStreams = ai;
function Ji(i) {
  if (typeof i != "object")
    throw new TypeError("params is not an object");
  if (typeof i.port != "number")
    throw new TypeError("missing params.port");
  if (typeof i.OS != "number")
    throw new TypeError("missing params.OS");
  if (typeof i.MIS != "number")
    throw new TypeError("missing params.MIS");
  if (typeof i.maxMessageSize != "number")
    throw new TypeError("missing params.maxMessageSize");
}
v.validateSctpParameters = Ji;
function Xi(i) {
  if (typeof i != "object")
    throw new TypeError("params is not an object");
  if (typeof i.streamId != "number")
    throw new TypeError("missing params.streamId");
  let e = !1;
  if (typeof i.ordered == "boolean" ? e = !0 : i.ordered = !0, i.maxPacketLifeTime && typeof i.maxPacketLifeTime != "number")
    throw new TypeError("invalid params.maxPacketLifeTime");
  if (i.maxRetransmits && typeof i.maxRetransmits != "number")
    throw new TypeError("invalid params.maxRetransmits");
  if (i.maxPacketLifeTime && i.maxRetransmits)
    throw new TypeError("cannot provide both maxPacketLifeTime and maxRetransmits");
  if (e && i.ordered && (i.maxPacketLifeTime || i.maxRetransmits))
    throw new TypeError("cannot be ordered with maxPacketLifeTime or maxRetransmits");
  if (!e && (i.maxPacketLifeTime || i.maxRetransmits) && (i.ordered = !1), i.label && typeof i.label != "string")
    throw new TypeError("invalid params.label");
  if (i.protocol && typeof i.protocol != "string")
    throw new TypeError("invalid params.protocol");
}
v.validateSctpStreamParameters = Xi;
function en(i, e) {
  const t = {
    codecs: [],
    headerExtensions: []
  };
  for (const s of e.codecs || []) {
    if (Ct(s))
      continue;
    const r = (i.codecs || []).find((a) => oi(a, s, { strict: !0, modify: !0 }));
    if (!r)
      continue;
    const n = {
      mimeType: r.mimeType,
      kind: r.kind,
      clockRate: r.clockRate,
      channels: r.channels,
      localPayloadType: r.preferredPayloadType,
      localRtxPayloadType: void 0,
      remotePayloadType: s.preferredPayloadType,
      remoteRtxPayloadType: void 0,
      localParameters: r.parameters,
      remoteParameters: s.parameters,
      rtcpFeedback: pn(r, s)
    };
    t.codecs.push(n);
  }
  for (const s of t.codecs) {
    const r = i.codecs.find((a) => Ct(a) && a.parameters.apt === s.localPayloadType), n = e.codecs.find((a) => Ct(a) && a.parameters.apt === s.remotePayloadType);
    r && n && (s.localRtxPayloadType = r.preferredPayloadType, s.remoteRtxPayloadType = n.preferredPayloadType);
  }
  for (const s of e.headerExtensions) {
    const r = i.headerExtensions.find((a) => dn(a, s));
    if (!r)
      continue;
    const n = {
      kind: s.kind,
      uri: s.uri,
      sendId: r.preferredId,
      recvId: s.preferredId,
      encrypt: r.preferredEncrypt,
      direction: "sendrecv"
    };
    switch (s.direction) {
      case "sendrecv":
        n.direction = "sendrecv";
        break;
      case "recvonly":
        n.direction = "sendonly";
        break;
      case "sendonly":
        n.direction = "recvonly";
        break;
      case "inactive":
        n.direction = "inactive";
        break;
    }
    t.headerExtensions.push(n);
  }
  return t;
}
v.getExtendedRtpCapabilities = en;
function tn(i) {
  const e = {
    codecs: [],
    headerExtensions: []
  };
  for (const t of i.codecs) {
    const s = {
      mimeType: t.mimeType,
      kind: t.kind,
      preferredPayloadType: t.remotePayloadType,
      clockRate: t.clockRate,
      channels: t.channels,
      parameters: t.localParameters,
      rtcpFeedback: t.rtcpFeedback
    };
    if (e.codecs.push(s), !t.remoteRtxPayloadType)
      continue;
    const r = {
      mimeType: `${t.kind}/rtx`,
      kind: t.kind,
      preferredPayloadType: t.remoteRtxPayloadType,
      clockRate: t.clockRate,
      parameters: {
        apt: t.remotePayloadType
      },
      rtcpFeedback: []
    };
    e.codecs.push(r);
  }
  for (const t of i.headerExtensions) {
    if (t.direction !== "sendrecv" && t.direction !== "recvonly")
      continue;
    const s = {
      kind: t.kind,
      uri: t.uri,
      preferredId: t.recvId,
      preferredEncrypt: t.encrypt,
      direction: t.direction
    };
    e.headerExtensions.push(s);
  }
  return e;
}
v.getRecvRtpCapabilities = tn;
function sn(i, e) {
  const t = {
    mid: void 0,
    codecs: [],
    headerExtensions: [],
    encodings: [],
    rtcp: {}
  };
  for (const s of e.codecs) {
    if (s.kind !== i)
      continue;
    const r = {
      mimeType: s.mimeType,
      payloadType: s.localPayloadType,
      clockRate: s.clockRate,
      channels: s.channels,
      parameters: s.localParameters,
      rtcpFeedback: s.rtcpFeedback
    };
    if (t.codecs.push(r), s.localRtxPayloadType) {
      const n = {
        mimeType: `${s.kind}/rtx`,
        payloadType: s.localRtxPayloadType,
        clockRate: s.clockRate,
        parameters: {
          apt: s.localPayloadType
        },
        rtcpFeedback: []
      };
      t.codecs.push(n);
    }
  }
  for (const s of e.headerExtensions) {
    if (s.kind && s.kind !== i || s.direction !== "sendrecv" && s.direction !== "sendonly")
      continue;
    const r = {
      uri: s.uri,
      id: s.sendId,
      encrypt: s.encrypt,
      parameters: {}
    };
    t.headerExtensions.push(r);
  }
  return t;
}
v.getSendingRtpParameters = sn;
function rn(i, e) {
  const t = {
    mid: void 0,
    codecs: [],
    headerExtensions: [],
    encodings: [],
    rtcp: {}
  };
  for (const s of e.codecs) {
    if (s.kind !== i)
      continue;
    const r = {
      mimeType: s.mimeType,
      payloadType: s.localPayloadType,
      clockRate: s.clockRate,
      channels: s.channels,
      parameters: s.remoteParameters,
      rtcpFeedback: s.rtcpFeedback
    };
    if (t.codecs.push(r), s.localRtxPayloadType) {
      const n = {
        mimeType: `${s.kind}/rtx`,
        payloadType: s.localRtxPayloadType,
        clockRate: s.clockRate,
        parameters: {
          apt: s.localPayloadType
        },
        rtcpFeedback: []
      };
      t.codecs.push(n);
    }
  }
  for (const s of e.headerExtensions) {
    if (s.kind && s.kind !== i || s.direction !== "sendrecv" && s.direction !== "sendonly")
      continue;
    const r = {
      uri: s.uri,
      id: s.sendId,
      encrypt: s.encrypt,
      parameters: {}
    };
    t.headerExtensions.push(r);
  }
  if (t.headerExtensions.some((s) => s.uri === "http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01"))
    for (const s of t.codecs)
      s.rtcpFeedback = (s.rtcpFeedback || []).filter((r) => r.type !== "goog-remb");
  else if (t.headerExtensions.some((s) => s.uri === "http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time"))
    for (const s of t.codecs)
      s.rtcpFeedback = (s.rtcpFeedback || []).filter((r) => r.type !== "transport-cc");
  else
    for (const s of t.codecs)
      s.rtcpFeedback = (s.rtcpFeedback || []).filter((r) => r.type !== "transport-cc" && r.type !== "goog-remb");
  return t;
}
v.getSendingRemoteRtpParameters = rn;
function nn(i, e) {
  const t = [];
  if (!e)
    t.push(i[0]), Ct(i[1]) && t.push(i[1]);
  else {
    for (let s = 0; s < i.length; ++s)
      if (oi(i[s], e)) {
        t.push(i[s]), Ct(i[s + 1]) && t.push(i[s + 1]);
        break;
      }
    if (t.length === 0)
      throw new TypeError("no matching codec found");
  }
  return t;
}
v.reduceCodecs = nn;
function an(i) {
  i = qi.clone(i), Ns(i);
  const e = {
    mid: Hi,
    codecs: [],
    headerExtensions: [],
    encodings: [{ ssrc: Wi }],
    rtcp: { cname: "probator" }
  };
  return e.codecs.push(i.codecs[0]), e.codecs[0].payloadType = Qi, e.headerExtensions = i.headerExtensions, e;
}
v.generateProbatorRtpParameters = an;
function on(i, e) {
  return e.codecs.some((t) => t.kind === i);
}
v.canSend = on;
function cn(i, e) {
  if (Ns(i), i.codecs.length === 0)
    return !1;
  const t = i.codecs[0];
  return e.codecs.some((s) => s.remotePayloadType === t.payloadType);
}
v.canReceive = cn;
function Ct(i) {
  return i ? /.+\/rtx$/i.test(i.mimeType) : !1;
}
function oi(i, e, { strict: t = !1, modify: s = !1 } = {}) {
  const r = i.mimeType.toLowerCase(), n = e.mimeType.toLowerCase();
  if (r !== n || i.clockRate !== e.clockRate || i.channels !== e.channels)
    return !1;
  switch (r) {
    case "video/h264": {
      if (t) {
        const a = i.parameters["packetization-mode"] || 0, o = e.parameters["packetization-mode"] || 0;
        if (a !== o || !cr.isSameProfile(i.parameters, e.parameters))
          return !1;
        let d;
        try {
          d = cr.generateProfileLevelIdForAnswer(i.parameters, e.parameters);
        } catch {
          return !1;
        }
        s && (d ? (i.parameters["profile-level-id"] = d, e.parameters["profile-level-id"] = d) : (delete i.parameters["profile-level-id"], delete e.parameters["profile-level-id"]));
      }
      break;
    }
    case "video/vp9": {
      if (t) {
        const a = i.parameters["profile-id"] || 0, o = e.parameters["profile-id"] || 0;
        if (a !== o)
          return !1;
      }
      break;
    }
  }
  return !0;
}
function dn(i, e) {
  return !(i.kind && e.kind && i.kind !== e.kind || i.uri !== e.uri);
}
function pn(i, e) {
  const t = [];
  for (const s of i.rtcpFeedback || []) {
    const r = (e.rtcpFeedback || []).find((n) => n.type === s.type && (n.parameter === s.parameter || !n.parameter && !s.parameter));
    r && t.push(r);
  }
  return t;
}
var Dt = {}, Ae = {}, Xt = {}, ln = _ && _.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.Logger = void 0;
const Ze = ln(Zt), Je = "awaitqueue";
class un {
  constructor(e) {
    e ? (this._debug = (0, Ze.default)(`${Je}:${e}`), this._warn = (0, Ze.default)(`${Je}:WARN:${e}`), this._error = (0, Ze.default)(`${Je}:ERROR:${e}`)) : (this._debug = (0, Ze.default)(Je), this._warn = (0, Ze.default)(`${Je}:WARN`), this._error = (0, Ze.default)(`${Je}:ERROR`)), this._debug.log = console.info.bind(console), this._warn.log = console.warn.bind(console), this._error.log = console.error.bind(console);
  }
  get debug() {
    return this._debug;
  }
  get warn() {
    return this._warn;
  }
  get error() {
    return this._error;
  }
}
Xt.Logger = un;
Object.defineProperty(Ae, "__esModule", { value: !0 });
Ae.AwaitQueue = Ae.AwaitQueueRemovedTaskError = Ae.AwaitQueueStoppedError = void 0;
const hn = Xt, xe = new hn.Logger();
class es extends Error {
  constructor(e) {
    super(e ?? "AwaitQueue stopped"), this.name = "AwaitQueueStoppedError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, es);
  }
}
Ae.AwaitQueueStoppedError = es;
class ts extends Error {
  constructor(e) {
    super(e ?? "AwaitQueue task removed"), this.name = "AwaitQueueRemovedTaskError", typeof Error.captureStackTrace == "function" && Error.captureStackTrace(this, ts);
  }
}
Ae.AwaitQueueRemovedTaskError = ts;
class fn {
  constructor() {
    this.pendingTasks = /* @__PURE__ */ new Map(), this.nextTaskId = 0, this.stopping = !1;
  }
  get size() {
    return this.pendingTasks.size;
  }
  async push(e, t) {
    if (t = t ?? e.name, xe.debug(`push() [name:${t}]`), typeof e != "function")
      throw new TypeError("given task is not a function");
    if (t)
      try {
        Object.defineProperty(e, "name", { value: t });
      } catch {
      }
    return new Promise((s, r) => {
      const n = {
        id: this.nextTaskId++,
        task: e,
        name: t,
        enqueuedAt: Date.now(),
        executedAt: void 0,
        completed: !1,
        resolve: (a) => {
          if (n.completed)
            return;
          n.completed = !0, this.pendingTasks.delete(n.id), xe.debug(`resolving task [name:${n.name}]`), s(a);
          const [o] = this.pendingTasks.values();
          o && !o.executedAt && this.execute(o);
        },
        reject: (a) => {
          if (!n.completed && (n.completed = !0, this.pendingTasks.delete(n.id), xe.debug(`rejecting task [name:${n.name}]: %s`, String(a)), r(a), !this.stopping)) {
            const [o] = this.pendingTasks.values();
            o && !o.executedAt && this.execute(o);
          }
        }
      };
      this.pendingTasks.set(n.id, n), this.pendingTasks.size === 1 && this.execute(n);
    });
  }
  stop() {
    xe.debug("stop()"), this.stopping = !0;
    for (const e of this.pendingTasks.values())
      xe.debug(`stop() | stopping task [name:${e.name}]`), e.reject(new es());
    this.stopping = !1;
  }
  remove(e) {
    xe.debug(`remove() [taskIdx:${e}]`);
    const t = Array.from(this.pendingTasks.values())[e];
    if (!t) {
      xe.debug(`stop() | no task with given idx [taskIdx:${e}]`);
      return;
    }
    t.reject(new ts());
  }
  dump() {
    const e = Date.now();
    let t = 0;
    return Array.from(this.pendingTasks.values()).map((s) => ({
      idx: t++,
      task: s.task,
      name: s.name,
      enqueuedTime: s.executedAt ? s.executedAt - s.enqueuedAt : e - s.enqueuedAt,
      executionTime: s.executedAt ? e - s.executedAt : 0
    }));
  }
  async execute(e) {
    if (xe.debug(`execute() [name:${e.name}]`), e.executedAt)
      throw new Error("task already being executed");
    e.executedAt = Date.now();
    try {
      const t = await e.task();
      e.resolve(t);
    } catch (t) {
      e.reject(t);
    }
  }
}
Ae.AwaitQueue = fn;
/*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
let dr;
var mn = typeof queueMicrotask == "function" ? queueMicrotask.bind(typeof window < "u" ? window : _) : (i) => (dr || (dr = Promise.resolve())).then(i).catch((e) => setTimeout(() => {
  throw e;
}, 0)), Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.Producer = void 0;
const gn = K, pr = De, Xe = ee, ge = new gn.Logger("Producer");
class _n extends pr.EnhancedEventEmitter {
  constructor({ id: e, localId: t, rtpSender: s, track: r, rtpParameters: n, stopTracks: a, disableTrackOnPause: o, zeroRtpOnPause: d, appData: p }) {
    super(), this._closed = !1, this._observer = new pr.EnhancedEventEmitter(), ge.debug("constructor()"), this._id = e, this._localId = t, this._rtpSender = s, this._track = r, this._kind = r.kind, this._rtpParameters = n, this._paused = o ? !r.enabled : !1, this._maxSpatialLayer = void 0, this._stopTracks = a, this._disableTrackOnPause = o, this._zeroRtpOnPause = d, this._appData = p || {}, this.onTrackEnded = this.onTrackEnded.bind(this), this.handleTrack();
  }
  /**
   * Producer id.
   */
  get id() {
    return this._id;
  }
  /**
   * Local id.
   */
  get localId() {
    return this._localId;
  }
  /**
   * Whether the Producer is closed.
   */
  get closed() {
    return this._closed;
  }
  /**
   * Media kind.
   */
  get kind() {
    return this._kind;
  }
  /**
   * Associated RTCRtpSender.
   */
  get rtpSender() {
    return this._rtpSender;
  }
  /**
   * The associated track.
   */
  get track() {
    return this._track;
  }
  /**
   * RTP parameters.
   */
  get rtpParameters() {
    return this._rtpParameters;
  }
  /**
   * Whether the Producer is paused.
   */
  get paused() {
    return this._paused;
  }
  /**
   * Max spatial layer.
   *
   * @type {Number | undefined}
   */
  get maxSpatialLayer() {
    return this._maxSpatialLayer;
  }
  /**
   * App custom data.
   */
  get appData() {
    return this._appData;
  }
  /**
   * App custom data setter.
   */
  set appData(e) {
    this._appData = e;
  }
  get observer() {
    return this._observer;
  }
  /**
   * Closes the Producer.
   */
  close() {
    this._closed || (ge.debug("close()"), this._closed = !0, this.destroyTrack(), this.emit("@close"), this._observer.safeEmit("close"));
  }
  /**
   * Transport was closed.
   */
  transportClosed() {
    this._closed || (ge.debug("transportClosed()"), this._closed = !0, this.destroyTrack(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
  }
  /**
   * Get associated RTCRtpSender stats.
   */
  async getStats() {
    if (this._closed)
      throw new Xe.InvalidStateError("closed");
    return new Promise((e, t) => {
      this.safeEmit("@getstats", e, t);
    });
  }
  /**
   * Pauses sending media.
   */
  pause() {
    if (ge.debug("pause()"), this._closed) {
      ge.error("pause() | Producer closed");
      return;
    }
    this._paused = !0, this._track && this._disableTrackOnPause && (this._track.enabled = !1), this._zeroRtpOnPause && new Promise((e, t) => {
      this.safeEmit("@pause", e, t);
    }).catch(() => {
    }), this._observer.safeEmit("pause");
  }
  /**
   * Resumes sending media.
   */
  resume() {
    if (ge.debug("resume()"), this._closed) {
      ge.error("resume() | Producer closed");
      return;
    }
    this._paused = !1, this._track && this._disableTrackOnPause && (this._track.enabled = !0), this._zeroRtpOnPause && new Promise((e, t) => {
      this.safeEmit("@resume", e, t);
    }).catch(() => {
    }), this._observer.safeEmit("resume");
  }
  /**
   * Replaces the current track with a new one or null.
   */
  async replaceTrack({ track: e }) {
    if (ge.debug("replaceTrack() [track:%o]", e), this._closed) {
      if (e && this._stopTracks)
        try {
          e.stop();
        } catch {
        }
      throw new Xe.InvalidStateError("closed");
    } else if (e && e.readyState === "ended")
      throw new Xe.InvalidStateError("track ended");
    if (e === this._track) {
      ge.debug("replaceTrack() | same track, ignored");
      return;
    }
    await new Promise((t, s) => {
      this.safeEmit("@replacetrack", e, t, s);
    }), this.destroyTrack(), this._track = e, this._track && this._disableTrackOnPause && (this._paused ? this._paused && (this._track.enabled = !1) : this._track.enabled = !0), this.handleTrack();
  }
  /**
   * Sets the video max spatial layer to be sent.
   */
  async setMaxSpatialLayer(e) {
    if (this._closed)
      throw new Xe.InvalidStateError("closed");
    if (this._kind !== "video")
      throw new Xe.UnsupportedError("not a video Producer");
    if (typeof e != "number")
      throw new TypeError("invalid spatialLayer");
    e !== this._maxSpatialLayer && (await new Promise((t, s) => {
      this.safeEmit("@setmaxspatiallayer", e, t, s);
    }).catch(() => {
    }), this._maxSpatialLayer = e);
  }
  async setRtpEncodingParameters(e) {
    if (this._closed)
      throw new Xe.InvalidStateError("closed");
    if (typeof e != "object")
      throw new TypeError("invalid params");
    await new Promise((t, s) => {
      this.safeEmit("@setrtpencodingparameters", e, t, s);
    });
  }
  onTrackEnded() {
    ge.debug('track "ended" event'), this.safeEmit("trackended"), this._observer.safeEmit("trackended");
  }
  handleTrack() {
    this._track && this._track.addEventListener("ended", this.onTrackEnded);
  }
  destroyTrack() {
    if (this._track)
      try {
        this._track.removeEventListener("ended", this.onTrackEnded), this._stopTracks && this._track.stop();
      } catch {
      }
  }
}
Tt.Producer = _n;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.Consumer = void 0;
const wn = K, lr = De, vn = ee, _e = new wn.Logger("Consumer");
class Sn extends lr.EnhancedEventEmitter {
  constructor({ id: e, localId: t, producerId: s, rtpReceiver: r, track: n, rtpParameters: a, appData: o }) {
    super(), this._closed = !1, this._observer = new lr.EnhancedEventEmitter(), _e.debug("constructor()"), this._id = e, this._localId = t, this._producerId = s, this._rtpReceiver = r, this._track = n, this._rtpParameters = a, this._paused = !n.enabled, this._appData = o || {}, this.onTrackEnded = this.onTrackEnded.bind(this), this.handleTrack();
  }
  /**
   * Consumer id.
   */
  get id() {
    return this._id;
  }
  /**
   * Local id.
   */
  get localId() {
    return this._localId;
  }
  /**
   * Associated Producer id.
   */
  get producerId() {
    return this._producerId;
  }
  /**
   * Whether the Consumer is closed.
   */
  get closed() {
    return this._closed;
  }
  /**
   * Media kind.
   */
  get kind() {
    return this._track.kind;
  }
  /**
   * Associated RTCRtpReceiver.
   */
  get rtpReceiver() {
    return this._rtpReceiver;
  }
  /**
   * The associated track.
   */
  get track() {
    return this._track;
  }
  /**
   * RTP parameters.
   */
  get rtpParameters() {
    return this._rtpParameters;
  }
  /**
   * Whether the Consumer is paused.
   */
  get paused() {
    return this._paused;
  }
  /**
   * App custom data.
   */
  get appData() {
    return this._appData;
  }
  /**
   * App custom data setter.
   */
  set appData(e) {
    this._appData = e;
  }
  get observer() {
    return this._observer;
  }
  /**
   * Closes the Consumer.
   */
  close() {
    this._closed || (_e.debug("close()"), this._closed = !0, this.destroyTrack(), this.emit("@close"), this._observer.safeEmit("close"));
  }
  /**
   * Transport was closed.
   */
  transportClosed() {
    this._closed || (_e.debug("transportClosed()"), this._closed = !0, this.destroyTrack(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
  }
  /**
   * Get associated RTCRtpReceiver stats.
   */
  async getStats() {
    if (this._closed)
      throw new vn.InvalidStateError("closed");
    return new Promise((e, t) => {
      this.safeEmit("@getstats", e, t);
    });
  }
  /**
   * Pauses receiving media.
   */
  pause() {
    if (_e.debug("pause()"), this._closed) {
      _e.error("pause() | Consumer closed");
      return;
    }
    if (this._paused) {
      _e.debug("pause() | Consumer is already paused");
      return;
    }
    this._paused = !0, this._track.enabled = !1, this.emit("@pause"), this._observer.safeEmit("pause");
  }
  /**
   * Resumes receiving media.
   */
  resume() {
    if (_e.debug("resume()"), this._closed) {
      _e.error("resume() | Consumer closed");
      return;
    }
    if (!this._paused) {
      _e.debug("resume() | Consumer is already resumed");
      return;
    }
    this._paused = !1, this._track.enabled = !0, this.emit("@resume"), this._observer.safeEmit("resume");
  }
  onTrackEnded() {
    _e.debug('track "ended" event'), this.safeEmit("trackended"), this._observer.safeEmit("trackended");
  }
  handleTrack() {
    this._track.addEventListener("ended", this.onTrackEnded);
  }
  destroyTrack() {
    try {
      this._track.removeEventListener("ended", this.onTrackEnded), this._track.stop();
    } catch {
    }
  }
}
Pt.Consumer = Sn;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.DataProducer = void 0;
const bn = K, ur = De, yn = ee, Pe = new bn.Logger("DataProducer");
class Rn extends ur.EnhancedEventEmitter {
  constructor({ id: e, dataChannel: t, sctpStreamParameters: s, appData: r }) {
    super(), this._closed = !1, this._observer = new ur.EnhancedEventEmitter(), Pe.debug("constructor()"), this._id = e, this._dataChannel = t, this._sctpStreamParameters = s, this._appData = r || {}, this.handleDataChannel();
  }
  /**
   * DataProducer id.
   */
  get id() {
    return this._id;
  }
  /**
   * Whether the DataProducer is closed.
   */
  get closed() {
    return this._closed;
  }
  /**
   * SCTP stream parameters.
   */
  get sctpStreamParameters() {
    return this._sctpStreamParameters;
  }
  /**
   * DataChannel readyState.
   */
  get readyState() {
    return this._dataChannel.readyState;
  }
  /**
   * DataChannel label.
   */
  get label() {
    return this._dataChannel.label;
  }
  /**
   * DataChannel protocol.
   */
  get protocol() {
    return this._dataChannel.protocol;
  }
  /**
   * DataChannel bufferedAmount.
   */
  get bufferedAmount() {
    return this._dataChannel.bufferedAmount;
  }
  /**
   * DataChannel bufferedAmountLowThreshold.
   */
  get bufferedAmountLowThreshold() {
    return this._dataChannel.bufferedAmountLowThreshold;
  }
  /**
   * Set DataChannel bufferedAmountLowThreshold.
   */
  set bufferedAmountLowThreshold(e) {
    this._dataChannel.bufferedAmountLowThreshold = e;
  }
  /**
   * App custom data.
   */
  get appData() {
    return this._appData;
  }
  /**
   * App custom data setter.
   */
  set appData(e) {
    this._appData = e;
  }
  get observer() {
    return this._observer;
  }
  /**
   * Closes the DataProducer.
   */
  close() {
    this._closed || (Pe.debug("close()"), this._closed = !0, this._dataChannel.close(), this.emit("@close"), this._observer.safeEmit("close"));
  }
  /**
   * Transport was closed.
   */
  transportClosed() {
    this._closed || (Pe.debug("transportClosed()"), this._closed = !0, this._dataChannel.close(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
  }
  /**
   * Send a message.
   *
   * @param {String|Blob|ArrayBuffer|ArrayBufferView} data.
   */
  send(e) {
    if (Pe.debug("send()"), this._closed)
      throw new yn.InvalidStateError("closed");
    this._dataChannel.send(e);
  }
  handleDataChannel() {
    this._dataChannel.addEventListener("open", () => {
      this._closed || (Pe.debug('DataChannel "open" event'), this.safeEmit("open"));
    }), this._dataChannel.addEventListener("error", (e) => {
      if (this._closed)
        return;
      let { error: t } = e;
      t || (t = new Error("unknown DataChannel error")), t.errorDetail === "sctp-failure" ? Pe.error("DataChannel SCTP error [sctpCauseCode:%s]: %s", t.sctpCauseCode, t.message) : Pe.error('DataChannel "error" event: %o', t), this.safeEmit("error", t);
    }), this._dataChannel.addEventListener("close", () => {
      this._closed || (Pe.warn('DataChannel "close" event'), this._closed = !0, this.emit("@close"), this.safeEmit("close"), this._observer.safeEmit("close"));
    }), this._dataChannel.addEventListener("message", () => {
      this._closed || Pe.warn('DataChannel "message" event in a DataProducer, message discarded');
    }), this._dataChannel.addEventListener("bufferedamountlow", () => {
      this._closed || this.safeEmit("bufferedamountlow");
    });
  }
}
Et.DataProducer = Rn;
var Lt = {};
Object.defineProperty(Lt, "__esModule", { value: !0 });
Lt.DataConsumer = void 0;
const Cn = K, hr = De, Ue = new Cn.Logger("DataConsumer");
class Dn extends hr.EnhancedEventEmitter {
  constructor({ id: e, dataProducerId: t, dataChannel: s, sctpStreamParameters: r, appData: n }) {
    super(), this._closed = !1, this._observer = new hr.EnhancedEventEmitter(), Ue.debug("constructor()"), this._id = e, this._dataProducerId = t, this._dataChannel = s, this._sctpStreamParameters = r, this._appData = n || {}, this.handleDataChannel();
  }
  /**
   * DataConsumer id.
   */
  get id() {
    return this._id;
  }
  /**
   * Associated DataProducer id.
   */
  get dataProducerId() {
    return this._dataProducerId;
  }
  /**
   * Whether the DataConsumer is closed.
   */
  get closed() {
    return this._closed;
  }
  /**
   * SCTP stream parameters.
   */
  get sctpStreamParameters() {
    return this._sctpStreamParameters;
  }
  /**
   * DataChannel readyState.
   */
  get readyState() {
    return this._dataChannel.readyState;
  }
  /**
   * DataChannel label.
   */
  get label() {
    return this._dataChannel.label;
  }
  /**
   * DataChannel protocol.
   */
  get protocol() {
    return this._dataChannel.protocol;
  }
  /**
   * DataChannel binaryType.
   */
  get binaryType() {
    return this._dataChannel.binaryType;
  }
  /**
   * Set DataChannel binaryType.
   */
  set binaryType(e) {
    this._dataChannel.binaryType = e;
  }
  /**
   * App custom data.
   */
  get appData() {
    return this._appData;
  }
  /**
   * App custom data setter.
   */
  set appData(e) {
    this._appData = e;
  }
  get observer() {
    return this._observer;
  }
  /**
   * Closes the DataConsumer.
   */
  close() {
    this._closed || (Ue.debug("close()"), this._closed = !0, this._dataChannel.close(), this.emit("@close"), this._observer.safeEmit("close"));
  }
  /**
   * Transport was closed.
   */
  transportClosed() {
    this._closed || (Ue.debug("transportClosed()"), this._closed = !0, this._dataChannel.close(), this.safeEmit("transportclose"), this._observer.safeEmit("close"));
  }
  handleDataChannel() {
    this._dataChannel.addEventListener("open", () => {
      this._closed || (Ue.debug('DataChannel "open" event'), this.safeEmit("open"));
    }), this._dataChannel.addEventListener("error", (e) => {
      if (this._closed)
        return;
      let { error: t } = e;
      t || (t = new Error("unknown DataChannel error")), t.errorDetail === "sctp-failure" ? Ue.error("DataChannel SCTP error [sctpCauseCode:%s]: %s", t.sctpCauseCode, t.message) : Ue.error('DataChannel "error" event: %o', t), this.safeEmit("error", t);
    }), this._dataChannel.addEventListener("close", () => {
      this._closed || (Ue.warn('DataChannel "close" event'), this._closed = !0, this.emit("@close"), this.safeEmit("close"), this._observer.safeEmit("close"));
    }), this._dataChannel.addEventListener("message", (e) => {
      this._closed || this.safeEmit("message", e.data);
    });
  }
}
Lt.DataConsumer = Dn;
var Tn = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Pn = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), ci = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Tn(e, i, t);
  return Pn(e, i), e;
}, En = _ && _.__importDefault || function(i) {
  return i && i.__esModule ? i : { default: i };
};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.Transport = void 0;
const Ln = Ae, vs = En(mn), In = K, fr = De, Z = ee, Ss = ci(q), vt = ci(v), Mn = Tt, kn = Pt, xn = Et, On = Lt, Q = new In.Logger("Transport");
class jn {
  constructor(e) {
    this.consumerOptions = e, this.promise = new Promise((t, s) => {
      this.resolve = t, this.reject = s;
    });
  }
}
class $n extends fr.EnhancedEventEmitter {
  constructor({ direction: e, id: t, iceParameters: s, iceCandidates: r, dtlsParameters: n, sctpParameters: a, iceServers: o, iceTransportPolicy: d, additionalSettings: p, proprietaryConstraints: c, appData: u, handlerFactory: l, extendedRtpCapabilities: h, canProduceByKind: f }) {
    super(), this._closed = !1, this._iceGatheringState = "new", this._connectionState = "new", this._producers = /* @__PURE__ */ new Map(), this._consumers = /* @__PURE__ */ new Map(), this._dataProducers = /* @__PURE__ */ new Map(), this._dataConsumers = /* @__PURE__ */ new Map(), this._probatorConsumerCreated = !1, this._awaitQueue = new Ln.AwaitQueue(), this._pendingConsumerTasks = [], this._consumerCreationInProgress = !1, this._pendingPauseConsumers = /* @__PURE__ */ new Map(), this._consumerPauseInProgress = !1, this._pendingResumeConsumers = /* @__PURE__ */ new Map(), this._consumerResumeInProgress = !1, this._pendingCloseConsumers = /* @__PURE__ */ new Map(), this._consumerCloseInProgress = !1, this._observer = new fr.EnhancedEventEmitter(), Q.debug("constructor() [id:%s, direction:%s]", t, e), this._id = t, this._direction = e, this._extendedRtpCapabilities = h, this._canProduceByKind = f, this._maxSctpMessageSize = a ? a.maxMessageSize : null, p = Ss.clone(p) || {}, delete p.iceServers, delete p.iceTransportPolicy, delete p.bundlePolicy, delete p.rtcpMuxPolicy, delete p.sdpSemantics, this._handler = l(), this._handler.run({
      direction: e,
      iceParameters: s,
      iceCandidates: r,
      dtlsParameters: n,
      sctpParameters: a,
      iceServers: o,
      iceTransportPolicy: d,
      additionalSettings: p,
      proprietaryConstraints: c,
      extendedRtpCapabilities: h
    }), this._appData = u || {}, this.handleHandler();
  }
  /**
   * Transport id.
   */
  get id() {
    return this._id;
  }
  /**
   * Whether the Transport is closed.
   */
  get closed() {
    return this._closed;
  }
  /**
   * Transport direction.
   */
  get direction() {
    return this._direction;
  }
  /**
   * RTC handler instance.
   */
  get handler() {
    return this._handler;
  }
  /**
   * ICE gathering state.
   */
  get iceGatheringState() {
    return this._iceGatheringState;
  }
  /**
   * Connection state.
   */
  get connectionState() {
    return this._connectionState;
  }
  /**
   * App custom data.
   */
  get appData() {
    return this._appData;
  }
  /**
   * App custom data setter.
   */
  set appData(e) {
    this._appData = e;
  }
  get observer() {
    return this._observer;
  }
  /**
   * Close the Transport.
   */
  close() {
    if (!this._closed) {
      Q.debug("close()"), this._closed = !0, this._awaitQueue.stop(), this._handler.close(), this._connectionState = "closed";
      for (const e of this._producers.values())
        e.transportClosed();
      this._producers.clear();
      for (const e of this._consumers.values())
        e.transportClosed();
      this._consumers.clear();
      for (const e of this._dataProducers.values())
        e.transportClosed();
      this._dataProducers.clear();
      for (const e of this._dataConsumers.values())
        e.transportClosed();
      this._dataConsumers.clear(), this._observer.safeEmit("close");
    }
  }
  /**
   * Get associated Transport (RTCPeerConnection) stats.
   *
   * @returns {RTCStatsReport}
   */
  async getStats() {
    if (this._closed)
      throw new Z.InvalidStateError("closed");
    return this._handler.getTransportStats();
  }
  /**
   * Restart ICE connection.
   */
  async restartIce({ iceParameters: e }) {
    if (Q.debug("restartIce()"), this._closed)
      throw new Z.InvalidStateError("closed");
    if (!e)
      throw new TypeError("missing iceParameters");
    return this._awaitQueue.push(async () => await this._handler.restartIce(e), "transport.restartIce()");
  }
  /**
   * Update ICE servers.
   */
  async updateIceServers({ iceServers: e } = {}) {
    if (Q.debug("updateIceServers()"), this._closed)
      throw new Z.InvalidStateError("closed");
    if (!Array.isArray(e))
      throw new TypeError("missing iceServers");
    return this._awaitQueue.push(async () => this._handler.updateIceServers(e), "transport.updateIceServers()");
  }
  /**
   * Create a Producer.
   */
  async produce({ track: e, encodings: t, codecOptions: s, codec: r, stopTracks: n = !0, disableTrackOnPause: a = !0, zeroRtpOnPause: o = !1, appData: d = {} } = {}) {
    if (Q.debug("produce() [track:%o]", e), this._closed)
      throw new Z.InvalidStateError("closed");
    if (e) {
      if (this._direction !== "send")
        throw new Z.UnsupportedError("not a sending Transport");
      if (this._canProduceByKind[e.kind]) {
        if (e.readyState === "ended")
          throw new Z.InvalidStateError("track ended");
        if (this.listenerCount("connect") === 0 && this._connectionState === "new")
          throw new TypeError('no "connect" listener set into this transport');
        if (this.listenerCount("produce") === 0)
          throw new TypeError('no "produce" listener set into this transport');
        if (d && typeof d != "object")
          throw new TypeError("if given, appData must be an object");
      } else
        throw new Z.UnsupportedError(`cannot produce ${e.kind}`);
    } else
      throw new TypeError("missing track");
    return this._awaitQueue.push(async () => {
      let p;
      if (t && !Array.isArray(t))
        throw TypeError("encodings must be an array");
      t && t.length === 0 ? p = void 0 : t && (p = t.map((h) => {
        const f = { active: !0 };
        return h.active === !1 && (f.active = !1), typeof h.dtx == "boolean" && (f.dtx = h.dtx), typeof h.scalabilityMode == "string" && (f.scalabilityMode = h.scalabilityMode), typeof h.scaleResolutionDownBy == "number" && (f.scaleResolutionDownBy = h.scaleResolutionDownBy), typeof h.maxBitrate == "number" && (f.maxBitrate = h.maxBitrate), typeof h.maxFramerate == "number" && (f.maxFramerate = h.maxFramerate), typeof h.adaptivePtime == "boolean" && (f.adaptivePtime = h.adaptivePtime), typeof h.priority == "string" && (f.priority = h.priority), typeof h.networkPriority == "string" && (f.networkPriority = h.networkPriority), f;
      }));
      const { localId: c, rtpParameters: u, rtpSender: l } = await this._handler.send({
        track: e,
        encodings: p,
        codecOptions: s,
        codec: r
      });
      try {
        vt.validateRtpParameters(u);
        const { id: h } = await new Promise((g, m) => {
          this.safeEmit("produce", {
            kind: e.kind,
            rtpParameters: u,
            appData: d
          }, g, m);
        }), f = new Mn.Producer({
          id: h,
          localId: c,
          rtpSender: l,
          track: e,
          rtpParameters: u,
          stopTracks: n,
          disableTrackOnPause: a,
          zeroRtpOnPause: o,
          appData: d
        });
        return this._producers.set(f.id, f), this.handleProducer(f), this._observer.safeEmit("newproducer", f), f;
      } catch (h) {
        throw this._handler.stopSending(c).catch(() => {
        }), h;
      }
    }, "transport.produce()").catch((p) => {
      if (n)
        try {
          e.stop();
        } catch {
        }
      throw p;
    });
  }
  /**
   * Create a Consumer to consume a remote Producer.
   */
  async consume({ id: e, producerId: t, kind: s, rtpParameters: r, streamId: n, appData: a = {} }) {
    if (Q.debug("consume()"), r = Ss.clone(r), this._closed)
      throw new Z.InvalidStateError("closed");
    if (this._direction !== "recv")
      throw new Z.UnsupportedError("not a receiving Transport");
    if (typeof e != "string")
      throw new TypeError("missing id");
    if (typeof t != "string")
      throw new TypeError("missing producerId");
    if (s !== "audio" && s !== "video")
      throw new TypeError(`invalid kind '${s}'`);
    if (this.listenerCount("connect") === 0 && this._connectionState === "new")
      throw new TypeError('no "connect" listener set into this transport');
    if (a && typeof a != "object")
      throw new TypeError("if given, appData must be an object");
    if (!vt.canReceive(r, this._extendedRtpCapabilities))
      throw new Z.UnsupportedError("cannot consume this Producer");
    const d = new jn({
      id: e,
      producerId: t,
      kind: s,
      rtpParameters: r,
      streamId: n,
      appData: a
    });
    return this._pendingConsumerTasks.push(d), (0, vs.default)(() => {
      this._closed || this._consumerCreationInProgress === !1 && this.createPendingConsumers();
    }), d.promise;
  }
  /**
   * Create a DataProducer
   */
  async produceData({ ordered: e = !0, maxPacketLifeTime: t, maxRetransmits: s, label: r = "", protocol: n = "", appData: a = {} } = {}) {
    if (Q.debug("produceData()"), this._closed)
      throw new Z.InvalidStateError("closed");
    if (this._direction !== "send")
      throw new Z.UnsupportedError("not a sending Transport");
    if (this._maxSctpMessageSize) {
      if (this.listenerCount("connect") === 0 && this._connectionState === "new")
        throw new TypeError('no "connect" listener set into this transport');
      if (this.listenerCount("producedata") === 0)
        throw new TypeError('no "producedata" listener set into this transport');
      if (a && typeof a != "object")
        throw new TypeError("if given, appData must be an object");
    } else
      throw new Z.UnsupportedError("SCTP not enabled by remote Transport");
    return (t || s) && (e = !1), this._awaitQueue.push(async () => {
      const { dataChannel: o, sctpStreamParameters: d } = await this._handler.sendDataChannel({
        ordered: e,
        maxPacketLifeTime: t,
        maxRetransmits: s,
        label: r,
        protocol: n
      });
      vt.validateSctpStreamParameters(d);
      const { id: p } = await new Promise((u, l) => {
        this.safeEmit("producedata", {
          sctpStreamParameters: d,
          label: r,
          protocol: n,
          appData: a
        }, u, l);
      }), c = new xn.DataProducer({
        id: p,
        dataChannel: o,
        sctpStreamParameters: d,
        appData: a
      });
      return this._dataProducers.set(c.id, c), this.handleDataProducer(c), this._observer.safeEmit("newdataproducer", c), c;
    }, "transport.produceData()");
  }
  /**
   * Create a DataConsumer
   */
  async consumeData({ id: e, dataProducerId: t, sctpStreamParameters: s, label: r = "", protocol: n = "", appData: a = {} }) {
    if (Q.debug("consumeData()"), s = Ss.clone(s), this._closed)
      throw new Z.InvalidStateError("closed");
    if (this._direction !== "recv")
      throw new Z.UnsupportedError("not a receiving Transport");
    if (this._maxSctpMessageSize) {
      if (typeof e != "string")
        throw new TypeError("missing id");
      if (typeof t != "string")
        throw new TypeError("missing dataProducerId");
      if (this.listenerCount("connect") === 0 && this._connectionState === "new")
        throw new TypeError('no "connect" listener set into this transport');
      if (a && typeof a != "object")
        throw new TypeError("if given, appData must be an object");
    } else
      throw new Z.UnsupportedError("SCTP not enabled by remote Transport");
    return vt.validateSctpStreamParameters(s), this._awaitQueue.push(async () => {
      const { dataChannel: o } = await this._handler.receiveDataChannel({
        sctpStreamParameters: s,
        label: r,
        protocol: n
      }), d = new On.DataConsumer({
        id: e,
        dataProducerId: t,
        dataChannel: o,
        sctpStreamParameters: s,
        appData: a
      });
      return this._dataConsumers.set(d.id, d), this.handleDataConsumer(d), this._observer.safeEmit("newdataconsumer", d), d;
    }, "transport.consumeData()");
  }
  // This method is guaranteed to never throw.
  async createPendingConsumers() {
    this._consumerCreationInProgress = !0, this._awaitQueue.push(async () => {
      if (this._pendingConsumerTasks.length === 0) {
        Q.debug("createPendingConsumers() | there is no Consumer to be created");
        return;
      }
      const e = [...this._pendingConsumerTasks];
      this._pendingConsumerTasks = [];
      let t;
      const s = [];
      for (const r of e) {
        const { id: n, kind: a, rtpParameters: o, streamId: d } = r.consumerOptions;
        s.push({
          trackId: n,
          kind: a,
          rtpParameters: o,
          streamId: d
        });
      }
      try {
        const r = await this._handler.receive(s);
        for (let n = 0; n < r.length; ++n) {
          const a = e[n], o = r[n], { id: d, producerId: p, kind: c, rtpParameters: u, appData: l } = a.consumerOptions, { localId: h, rtpReceiver: f, track: g } = o, m = new kn.Consumer({
            id: d,
            localId: h,
            producerId: p,
            rtpReceiver: f,
            track: g,
            rtpParameters: u,
            appData: l
          });
          this._consumers.set(m.id, m), this.handleConsumer(m), !this._probatorConsumerCreated && !t && c === "video" && (t = m), this._observer.safeEmit("newconsumer", m), a.resolve(m);
        }
      } catch (r) {
        for (const n of e)
          n.reject(r);
      }
      if (t)
        try {
          const r = vt.generateProbatorRtpParameters(t.rtpParameters);
          await this._handler.receive([{
            trackId: "probator",
            kind: "video",
            rtpParameters: r
          }]), Q.debug("createPendingConsumers() | Consumer for RTP probation created"), this._probatorConsumerCreated = !0;
        } catch (r) {
          Q.error("createPendingConsumers() | failed to create Consumer for RTP probation:%o", r);
        }
    }, "transport.createPendingConsumers()").then(() => {
      this._consumerCreationInProgress = !1, this._pendingConsumerTasks.length > 0 && this.createPendingConsumers();
    }).catch(() => {
    });
  }
  pausePendingConsumers() {
    this._consumerPauseInProgress = !0, this._awaitQueue.push(async () => {
      if (this._pendingPauseConsumers.size === 0) {
        Q.debug("pausePendingConsumers() | there is no Consumer to be paused");
        return;
      }
      const e = Array.from(this._pendingPauseConsumers.values());
      this._pendingPauseConsumers.clear();
      try {
        const t = e.map((s) => s.localId);
        await this._handler.pauseReceiving(t);
      } catch (t) {
        Q.error("pausePendingConsumers() | failed to pause Consumers:", t);
      }
    }, "transport.pausePendingConsumers").then(() => {
      this._consumerPauseInProgress = !1, this._pendingPauseConsumers.size > 0 && this.pausePendingConsumers();
    }).catch(() => {
    });
  }
  resumePendingConsumers() {
    this._consumerResumeInProgress = !0, this._awaitQueue.push(async () => {
      if (this._pendingResumeConsumers.size === 0) {
        Q.debug("resumePendingConsumers() | there is no Consumer to be resumed");
        return;
      }
      const e = Array.from(this._pendingResumeConsumers.values());
      this._pendingResumeConsumers.clear();
      try {
        const t = e.map((s) => s.localId);
        await this._handler.resumeReceiving(t);
      } catch (t) {
        Q.error("resumePendingConsumers() | failed to resume Consumers:", t);
      }
    }, "transport.resumePendingConsumers").then(() => {
      this._consumerResumeInProgress = !1, this._pendingResumeConsumers.size > 0 && this.resumePendingConsumers();
    }).catch(() => {
    });
  }
  closePendingConsumers() {
    this._consumerCloseInProgress = !0, this._awaitQueue.push(async () => {
      if (this._pendingCloseConsumers.size === 0) {
        Q.debug("closePendingConsumers() | there is no Consumer to be closed");
        return;
      }
      const e = Array.from(this._pendingCloseConsumers.values());
      this._pendingCloseConsumers.clear();
      try {
        await this._handler.stopReceiving(e.map((t) => t.localId));
      } catch (t) {
        Q.error("closePendingConsumers() | failed to close Consumers:", t);
      }
    }, "transport.closePendingConsumers").then(() => {
      this._consumerCloseInProgress = !1, this._pendingCloseConsumers.size > 0 && this.closePendingConsumers();
    }).catch(() => {
    });
  }
  handleHandler() {
    const e = this._handler;
    e.on("@connect", ({ dtlsParameters: t }, s, r) => {
      if (this._closed) {
        r(new Z.InvalidStateError("closed"));
        return;
      }
      this.safeEmit("connect", { dtlsParameters: t }, s, r);
    }), e.on("@icegatheringstatechange", (t) => {
      t !== this._iceGatheringState && (Q.debug("ICE gathering state changed to %s", t), this._iceGatheringState = t, this._closed || this.safeEmit("icegatheringstatechange", t));
    }), e.on("@connectionstatechange", (t) => {
      t !== this._connectionState && (Q.debug("connection state changed to %s", t), this._connectionState = t, this._closed || this.safeEmit("connectionstatechange", t));
    });
  }
  handleProducer(e) {
    e.on("@close", () => {
      this._producers.delete(e.id), !this._closed && this._awaitQueue.push(async () => await this._handler.stopSending(e.localId), "producer @close event").catch((t) => Q.warn("producer.close() failed:%o", t));
    }), e.on("@pause", (t, s) => {
      this._awaitQueue.push(async () => await this._handler.pauseSending(e.localId), "producer @pause event").then(t).catch(s);
    }), e.on("@resume", (t, s) => {
      this._awaitQueue.push(async () => await this._handler.resumeSending(e.localId), "producer @resume event").then(t).catch(s);
    }), e.on("@replacetrack", (t, s, r) => {
      this._awaitQueue.push(async () => await this._handler.replaceTrack(e.localId, t), "producer @replacetrack event").then(s).catch(r);
    }), e.on("@setmaxspatiallayer", (t, s, r) => {
      this._awaitQueue.push(async () => await this._handler.setMaxSpatialLayer(e.localId, t), "producer @setmaxspatiallayer event").then(s).catch(r);
    }), e.on("@setrtpencodingparameters", (t, s, r) => {
      this._awaitQueue.push(async () => await this._handler.setRtpEncodingParameters(e.localId, t), "producer @setrtpencodingparameters event").then(s).catch(r);
    }), e.on("@getstats", (t, s) => {
      if (this._closed)
        return s(new Z.InvalidStateError("closed"));
      this._handler.getSenderStats(e.localId).then(t).catch(s);
    });
  }
  handleConsumer(e) {
    e.on("@close", () => {
      this._consumers.delete(e.id), this._pendingPauseConsumers.delete(e.id), this._pendingResumeConsumers.delete(e.id), !this._closed && (this._pendingCloseConsumers.set(e.id, e), this._consumerCloseInProgress === !1 && this.closePendingConsumers());
    }), e.on("@pause", () => {
      this._pendingResumeConsumers.has(e.id) && this._pendingResumeConsumers.delete(e.id), this._pendingPauseConsumers.set(e.id, e), (0, vs.default)(() => {
        this._closed || this._consumerPauseInProgress === !1 && this.pausePendingConsumers();
      });
    }), e.on("@resume", () => {
      this._pendingPauseConsumers.has(e.id) && this._pendingPauseConsumers.delete(e.id), this._pendingResumeConsumers.set(e.id, e), (0, vs.default)(() => {
        this._closed || this._consumerResumeInProgress === !1 && this.resumePendingConsumers();
      });
    }), e.on("@getstats", (t, s) => {
      if (this._closed)
        return s(new Z.InvalidStateError("closed"));
      this._handler.getReceiverStats(e.localId).then(t).catch(s);
    });
  }
  handleDataProducer(e) {
    e.on("@close", () => {
      this._dataProducers.delete(e.id);
    });
  }
  handleDataConsumer(e) {
    e.on("@close", () => {
      this._dataConsumers.delete(e.id);
    });
  }
}
Dt.Transport = $n;
var ss = {}, H = {}, di = {}, pi = { exports: {} }, mr = pi.exports = {
  v: [{
    name: "version",
    reg: /^(\d*)$/
  }],
  o: [{
    // o=- 20518 0 IN IP4 203.0.113.1
    // NB: sessionId will be a String in most cases because it is huge
    name: "origin",
    reg: /^(\S*) (\d*) (\d*) (\S*) IP(\d) (\S*)/,
    names: ["username", "sessionId", "sessionVersion", "netType", "ipVer", "address"],
    format: "%s %s %d %s IP%d %s"
  }],
  // default parsing of these only (though some of these feel outdated)
  s: [{ name: "name" }],
  i: [{ name: "description" }],
  u: [{ name: "uri" }],
  e: [{ name: "email" }],
  p: [{ name: "phone" }],
  z: [{ name: "timezones" }],
  // TODO: this one can actually be parsed properly...
  r: [{ name: "repeats" }],
  // TODO: this one can also be parsed properly
  // k: [{}], // outdated thing ignored
  t: [{
    // t=0 0
    name: "timing",
    reg: /^(\d*) (\d*)/,
    names: ["start", "stop"],
    format: "%d %d"
  }],
  c: [{
    // c=IN IP4 10.47.197.26
    name: "connection",
    reg: /^IN IP(\d) (\S*)/,
    names: ["version", "ip"],
    format: "IN IP%d %s"
  }],
  b: [{
    // b=AS:4000
    push: "bandwidth",
    reg: /^(TIAS|AS|CT|RR|RS):(\d*)/,
    names: ["type", "limit"],
    format: "%s:%s"
  }],
  m: [{
    // m=video 51744 RTP/AVP 126 97 98 34 31
    // NB: special - pushes to session
    // TODO: rtp/fmtp should be filtered by the payloads found here?
    reg: /^(\w*) (\d*) ([\w/]*)(?: (.*))?/,
    names: ["type", "port", "protocol", "payloads"],
    format: "%s %d %s %s"
  }],
  a: [
    {
      // a=rtpmap:110 opus/48000/2
      push: "rtp",
      reg: /^rtpmap:(\d*) ([\w\-.]*)(?:\s*\/(\d*)(?:\s*\/(\S*))?)?/,
      names: ["payload", "codec", "rate", "encoding"],
      format: function(i) {
        return i.encoding ? "rtpmap:%d %s/%s/%s" : i.rate ? "rtpmap:%d %s/%s" : "rtpmap:%d %s";
      }
    },
    {
      // a=fmtp:108 profile-level-id=24;object=23;bitrate=64000
      // a=fmtp:111 minptime=10; useinbandfec=1
      push: "fmtp",
      reg: /^fmtp:(\d*) ([\S| ]*)/,
      names: ["payload", "config"],
      format: "fmtp:%d %s"
    },
    {
      // a=control:streamid=0
      name: "control",
      reg: /^control:(.*)/,
      format: "control:%s"
    },
    {
      // a=rtcp:65179 IN IP4 193.84.77.194
      name: "rtcp",
      reg: /^rtcp:(\d*)(?: (\S*) IP(\d) (\S*))?/,
      names: ["port", "netType", "ipVer", "address"],
      format: function(i) {
        return i.address != null ? "rtcp:%d %s IP%d %s" : "rtcp:%d";
      }
    },
    {
      // a=rtcp-fb:98 trr-int 100
      push: "rtcpFbTrrInt",
      reg: /^rtcp-fb:(\*|\d*) trr-int (\d*)/,
      names: ["payload", "value"],
      format: "rtcp-fb:%s trr-int %d"
    },
    {
      // a=rtcp-fb:98 nack rpsi
      push: "rtcpFb",
      reg: /^rtcp-fb:(\*|\d*) ([\w-_]*)(?: ([\w-_]*))?/,
      names: ["payload", "type", "subtype"],
      format: function(i) {
        return i.subtype != null ? "rtcp-fb:%s %s %s" : "rtcp-fb:%s %s";
      }
    },
    {
      // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      // a=extmap:1/recvonly URI-gps-string
      // a=extmap:3 urn:ietf:params:rtp-hdrext:encrypt urn:ietf:params:rtp-hdrext:smpte-tc 25@600/24
      push: "ext",
      reg: /^extmap:(\d+)(?:\/(\w+))?(?: (urn:ietf:params:rtp-hdrext:encrypt))? (\S*)(?: (\S*))?/,
      names: ["value", "direction", "encrypt-uri", "uri", "config"],
      format: function(i) {
        return "extmap:%d" + (i.direction ? "/%s" : "%v") + (i["encrypt-uri"] ? " %s" : "%v") + " %s" + (i.config ? " %s" : "");
      }
    },
    {
      // a=extmap-allow-mixed
      name: "extmapAllowMixed",
      reg: /^(extmap-allow-mixed)/
    },
    {
      // a=crypto:1 AES_CM_128_HMAC_SHA1_80 inline:PS1uQCVeeCFCanVmcjkpPywjNWhcYD0mXXtxaVBR|2^20|1:32
      push: "crypto",
      reg: /^crypto:(\d*) ([\w_]*) (\S*)(?: (\S*))?/,
      names: ["id", "suite", "config", "sessionConfig"],
      format: function(i) {
        return i.sessionConfig != null ? "crypto:%d %s %s %s" : "crypto:%d %s %s";
      }
    },
    {
      // a=setup:actpass
      name: "setup",
      reg: /^setup:(\w*)/,
      format: "setup:%s"
    },
    {
      // a=connection:new
      name: "connectionType",
      reg: /^connection:(new|existing)/,
      format: "connection:%s"
    },
    {
      // a=mid:1
      name: "mid",
      reg: /^mid:([^\s]*)/,
      format: "mid:%s"
    },
    {
      // a=msid:0c8b064d-d807-43b4-b434-f92a889d8587 98178685-d409-46e0-8e16-7ef0db0db64a
      name: "msid",
      reg: /^msid:(.*)/,
      format: "msid:%s"
    },
    {
      // a=ptime:20
      name: "ptime",
      reg: /^ptime:(\d*(?:\.\d*)*)/,
      format: "ptime:%d"
    },
    {
      // a=maxptime:60
      name: "maxptime",
      reg: /^maxptime:(\d*(?:\.\d*)*)/,
      format: "maxptime:%d"
    },
    {
      // a=sendrecv
      name: "direction",
      reg: /^(sendrecv|recvonly|sendonly|inactive)/
    },
    {
      // a=ice-lite
      name: "icelite",
      reg: /^(ice-lite)/
    },
    {
      // a=ice-ufrag:F7gI
      name: "iceUfrag",
      reg: /^ice-ufrag:(\S*)/,
      format: "ice-ufrag:%s"
    },
    {
      // a=ice-pwd:x9cml/YzichV2+XlhiMu8g
      name: "icePwd",
      reg: /^ice-pwd:(\S*)/,
      format: "ice-pwd:%s"
    },
    {
      // a=fingerprint:SHA-1 00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33
      name: "fingerprint",
      reg: /^fingerprint:(\S*) (\S*)/,
      names: ["type", "hash"],
      format: "fingerprint:%s %s"
    },
    {
      // a=candidate:0 1 UDP 2113667327 203.0.113.1 54400 typ host
      // a=candidate:1162875081 1 udp 2113937151 192.168.34.75 60017 typ host generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 udp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 generation 0 network-id 3 network-cost 10
      // a=candidate:229815620 1 tcp 1518280447 192.168.150.19 60017 typ host tcptype active generation 0 network-id 3 network-cost 10
      // a=candidate:3289912957 2 tcp 1845501695 193.84.77.194 60017 typ srflx raddr 192.168.34.75 rport 60017 tcptype passive generation 0 network-id 3 network-cost 10
      push: "candidates",
      reg: /^candidate:(\S*) (\d*) (\S*) (\d*) (\S*) (\d*) typ (\S*)(?: raddr (\S*) rport (\d*))?(?: tcptype (\S*))?(?: generation (\d*))?(?: network-id (\d*))?(?: network-cost (\d*))?/,
      names: ["foundation", "component", "transport", "priority", "ip", "port", "type", "raddr", "rport", "tcptype", "generation", "network-id", "network-cost"],
      format: function(i) {
        var e = "candidate:%s %d %s %d %s %d typ %s";
        return e += i.raddr != null ? " raddr %s rport %d" : "%v%v", e += i.tcptype != null ? " tcptype %s" : "%v", i.generation != null && (e += " generation %d"), e += i["network-id"] != null ? " network-id %d" : "%v", e += i["network-cost"] != null ? " network-cost %d" : "%v", e;
      }
    },
    {
      // a=end-of-candidates (keep after the candidates line for readability)
      name: "endOfCandidates",
      reg: /^(end-of-candidates)/
    },
    {
      // a=remote-candidates:1 203.0.113.1 54400 2 203.0.113.1 54401 ...
      name: "remoteCandidates",
      reg: /^remote-candidates:(.*)/,
      format: "remote-candidates:%s"
    },
    {
      // a=ice-options:google-ice
      name: "iceOptions",
      reg: /^ice-options:(\S*)/,
      format: "ice-options:%s"
    },
    {
      // a=ssrc:2566107569 cname:t9YU8M1UxTF8Y1A1
      push: "ssrcs",
      reg: /^ssrc:(\d*) ([\w_-]*)(?::(.*))?/,
      names: ["id", "attribute", "value"],
      format: function(i) {
        var e = "ssrc:%d";
        return i.attribute != null && (e += " %s", i.value != null && (e += ":%s")), e;
      }
    },
    {
      // a=ssrc-group:FEC 1 2
      // a=ssrc-group:FEC-FR 3004364195 1080772241
      push: "ssrcGroups",
      // token-char = %x21 / %x23-27 / %x2A-2B / %x2D-2E / %x30-39 / %x41-5A / %x5E-7E
      reg: /^ssrc-group:([\x21\x23\x24\x25\x26\x27\x2A\x2B\x2D\x2E\w]*) (.*)/,
      names: ["semantics", "ssrcs"],
      format: "ssrc-group:%s %s"
    },
    {
      // a=msid-semantic: WMS Jvlam5X3SX1OP6pn20zWogvaKJz5Hjf9OnlV
      name: "msidSemantic",
      reg: /^msid-semantic:\s?(\w*) (\S*)/,
      names: ["semantic", "token"],
      format: "msid-semantic: %s %s"
      // space after ':' is not accidental
    },
    {
      // a=group:BUNDLE audio video
      push: "groups",
      reg: /^group:(\w*) (.*)/,
      names: ["type", "mids"],
      format: "group:%s %s"
    },
    {
      // a=rtcp-mux
      name: "rtcpMux",
      reg: /^(rtcp-mux)/
    },
    {
      // a=rtcp-rsize
      name: "rtcpRsize",
      reg: /^(rtcp-rsize)/
    },
    {
      // a=sctpmap:5000 webrtc-datachannel 1024
      name: "sctpmap",
      reg: /^sctpmap:([\w_/]*) (\S*)(?: (\S*))?/,
      names: ["sctpmapNumber", "app", "maxMessageSize"],
      format: function(i) {
        return i.maxMessageSize != null ? "sctpmap:%s %s %s" : "sctpmap:%s %s";
      }
    },
    {
      // a=x-google-flag:conference
      name: "xGoogleFlag",
      reg: /^x-google-flag:([^\s]*)/,
      format: "x-google-flag:%s"
    },
    {
      // a=rid:1 send max-width=1280;max-height=720;max-fps=30;depend=0
      push: "rids",
      reg: /^rid:([\d\w]+) (\w+)(?: ([\S| ]*))?/,
      names: ["id", "direction", "params"],
      format: function(i) {
        return i.params ? "rid:%s %s %s" : "rid:%s %s";
      }
    },
    {
      // a=imageattr:97 send [x=800,y=640,sar=1.1,q=0.6] [x=480,y=320] recv [x=330,y=250]
      // a=imageattr:* send [x=800,y=640] recv *
      // a=imageattr:100 recv [x=320,y=240]
      push: "imageattrs",
      reg: new RegExp(
        // a=imageattr:97
        "^imageattr:(\\d+|\\*)[\\s\\t]+(send|recv)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*)(?:[\\s\\t]+(recv|send)[\\s\\t]+(\\*|\\[\\S+\\](?:[\\s\\t]+\\[\\S+\\])*))?"
      ),
      names: ["pt", "dir1", "attrs1", "dir2", "attrs2"],
      format: function(i) {
        return "imageattr:%s %s %s" + (i.dir2 ? " %s %s" : "");
      }
    },
    {
      // a=simulcast:send 1,2,3;~4,~5 recv 6;~7,~8
      // a=simulcast:recv 1;4,5 send 6;7
      name: "simulcast",
      reg: new RegExp(
        // a=simulcast:
        "^simulcast:(send|recv) ([a-zA-Z0-9\\-_~;,]+)(?:\\s?(send|recv) ([a-zA-Z0-9\\-_~;,]+))?$"
      ),
      names: ["dir1", "list1", "dir2", "list2"],
      format: function(i) {
        return "simulcast:%s %s" + (i.dir2 ? " %s %s" : "");
      }
    },
    {
      // old simulcast draft 03 (implemented by Firefox)
      //   https://tools.ietf.org/html/draft-ietf-mmusic-sdp-simulcast-03
      // a=simulcast: recv pt=97;98 send pt=97
      // a=simulcast: send rid=5;6;7 paused=6,7
      name: "simulcast_03",
      reg: /^simulcast:[\s\t]+([\S+\s\t]+)$/,
      names: ["value"],
      format: "simulcast: %s"
    },
    {
      // a=framerate:25
      // a=framerate:29.97
      name: "framerate",
      reg: /^framerate:(\d+(?:$|\.\d+))/,
      format: "framerate:%s"
    },
    {
      // RFC4570
      // a=source-filter: incl IN IP4 239.5.2.31 10.1.15.5
      name: "sourceFilter",
      reg: /^source-filter: *(excl|incl) (\S*) (IP4|IP6|\*) (\S*) (.*)/,
      names: ["filterMode", "netType", "addressTypes", "destAddress", "srcList"],
      format: "source-filter: %s %s %s %s %s"
    },
    {
      // a=bundle-only
      name: "bundleOnly",
      reg: /^(bundle-only)/
    },
    {
      // a=label:1
      name: "label",
      reg: /^label:(.+)/,
      format: "label:%s"
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-5
      name: "sctpPort",
      reg: /^sctp-port:(\d+)$/,
      format: "sctp-port:%s"
    },
    {
      // RFC version 26 for SCTP over DTLS
      // https://tools.ietf.org/html/draft-ietf-mmusic-sctp-sdp-26#section-6
      name: "maxMessageSize",
      reg: /^max-message-size:(\d+)$/,
      format: "max-message-size:%s"
    },
    {
      // RFC7273
      // a=ts-refclk:ptp=IEEE1588-2008:39-A7-94-FF-FE-07-CB-D0:37
      push: "tsRefClocks",
      reg: /^ts-refclk:([^\s=]*)(?:=(\S*))?/,
      names: ["clksrc", "clksrcExt"],
      format: function(i) {
        return "ts-refclk:%s" + (i.clksrcExt != null ? "=%s" : "");
      }
    },
    {
      // RFC7273
      // a=mediaclk:direct=963214424
      name: "mediaClk",
      reg: /^mediaclk:(?:id=(\S*))? *([^\s=]*)(?:=(\S*))?(?: *rate=(\d+)\/(\d+))?/,
      names: ["id", "mediaClockName", "mediaClockValue", "rateNumerator", "rateDenominator"],
      format: function(i) {
        var e = "mediaclk:";
        return e += i.id != null ? "id=%s %s" : "%v%s", e += i.mediaClockValue != null ? "=%s" : "", e += i.rateNumerator != null ? " rate=%s" : "", e += i.rateDenominator != null ? "/%s" : "", e;
      }
    },
    {
      // a=keywds:keywords
      name: "keywords",
      reg: /^keywds:(.+)$/,
      format: "keywds:%s"
    },
    {
      // a=content:main
      name: "content",
      reg: /^content:(.+)/,
      format: "content:%s"
    },
    // BFCP https://tools.ietf.org/html/rfc4583
    {
      // a=floorctrl:c-s
      name: "bfcpFloorCtrl",
      reg: /^floorctrl:(c-only|s-only|c-s)/,
      format: "floorctrl:%s"
    },
    {
      // a=confid:1
      name: "bfcpConfId",
      reg: /^confid:(\d+)/,
      format: "confid:%s"
    },
    {
      // a=userid:1
      name: "bfcpUserId",
      reg: /^userid:(\d+)/,
      format: "userid:%s"
    },
    {
      // a=floorid:1
      name: "bfcpFloorId",
      reg: /^floorid:(.+) (?:m-stream|mstrm):(.+)/,
      names: ["id", "mStream"],
      format: "floorid:%s mstrm:%s"
    },
    {
      // any a= that we don't understand is kept verbatim on media.invalid
      push: "invalid",
      names: ["value"]
    }
  ]
};
Object.keys(mr).forEach(function(i) {
  var e = mr[i];
  e.forEach(function(t) {
    t.reg || (t.reg = /(.*)/), t.format || (t.format = "%s");
  });
});
var li = pi.exports;
(function(i) {
  var e = function(o) {
    return String(Number(o)) === o ? Number(o) : o;
  }, t = function(o, d, p, c) {
    if (c && !p)
      d[c] = e(o[1]);
    else
      for (var u = 0; u < p.length; u += 1)
        o[u + 1] != null && (d[p[u]] = e(o[u + 1]));
  }, s = function(o, d, p) {
    var c = o.name && o.names;
    o.push && !d[o.push] ? d[o.push] = [] : c && !d[o.name] && (d[o.name] = {});
    var u = o.push ? {} : (
      // blank object that will be pushed
      c ? d[o.name] : d
    );
    t(p.match(o.reg), u, o.names, o.name), o.push && d[o.push].push(u);
  }, r = li, n = RegExp.prototype.test.bind(/^([a-z])=(.*)/);
  i.parse = function(o) {
    var d = {}, p = [], c = d;
    return o.split(/(\r\n|\r|\n)/).filter(n).forEach(function(u) {
      var l = u[0], h = u.slice(2);
      l === "m" && (p.push({ rtp: [], fmtp: [] }), c = p[p.length - 1]);
      for (var f = 0; f < (r[l] || []).length; f += 1) {
        var g = r[l][f];
        if (g.reg.test(h))
          return s(g, c, h);
      }
    }), d.media = p, d;
  };
  var a = function(o, d) {
    var p = d.split(/=(.+)/, 2);
    return p.length === 2 ? o[p[0]] = e(p[1]) : p.length === 1 && d.length > 1 && (o[p[0]] = void 0), o;
  };
  i.parseParams = function(o) {
    return o.split(/;\s?/).reduce(a, {});
  }, i.parseFmtpConfig = i.parseParams, i.parsePayloads = function(o) {
    return o.toString().split(" ").map(Number);
  }, i.parseRemoteCandidates = function(o) {
    for (var d = [], p = o.split(" ").map(e), c = 0; c < p.length; c += 3)
      d.push({
        component: p[c],
        ip: p[c + 1],
        port: p[c + 2]
      });
    return d;
  }, i.parseImageAttributes = function(o) {
    return o.split(" ").map(function(d) {
      return d.substring(1, d.length - 1).split(",").reduce(a, {});
    });
  }, i.parseSimulcastStreamList = function(o) {
    return o.split(";").map(function(d) {
      return d.split(",").map(function(p) {
        var c, u = !1;
        return p[0] !== "~" ? c = e(p) : (c = e(p.substring(1, p.length)), u = !0), {
          scid: c,
          paused: u
        };
      });
    });
  };
})(di);
var bs = li, An = /%[sdv%]/g, Nn = function(i) {
  var e = 1, t = arguments, s = t.length;
  return i.replace(An, function(r) {
    if (e >= s)
      return r;
    var n = t[e];
    switch (e += 1, r) {
      case "%%":
        return "%";
      case "%s":
        return String(n);
      case "%d":
        return Number(n);
      case "%v":
        return "";
    }
  });
}, St = function(i, e, t) {
  var s = e.format instanceof Function ? e.format(e.push ? t : t[e.name]) : e.format, r = [i + "=" + s];
  if (e.names)
    for (var n = 0; n < e.names.length; n += 1) {
      var a = e.names[n];
      e.name ? r.push(t[e.name][a]) : r.push(t[e.names[n]]);
    }
  else
    r.push(t[e.name]);
  return Nn.apply(null, r);
}, Fn = [
  "v",
  "o",
  "s",
  "i",
  "u",
  "e",
  "p",
  "c",
  "b",
  "t",
  "r",
  "z",
  "a"
], Bn = ["i", "c", "b", "a"], Un = function(i, e) {
  e = e || {}, i.version == null && (i.version = 0), i.name == null && (i.name = " "), i.media.forEach(function(n) {
    n.payloads == null && (n.payloads = "");
  });
  var t = e.outerOrder || Fn, s = e.innerOrder || Bn, r = [];
  return t.forEach(function(n) {
    bs[n].forEach(function(a) {
      a.name in i && i[a.name] != null ? r.push(St(n, a, i)) : a.push in i && i[a.push] != null && i[a.push].forEach(function(o) {
        r.push(St(n, a, o));
      });
    });
  }), i.media.forEach(function(n) {
    r.push(St("m", bs.m[0], n)), s.forEach(function(a) {
      bs[a].forEach(function(o) {
        o.name in n && n[o.name] != null ? r.push(St(a, o, n)) : o.push in n && n[o.push] != null && n[o.push].forEach(function(d) {
          r.push(St(a, o, d));
        });
      });
    });
  }), r.join(`\r
`) + `\r
`;
}, Ve = di, zn = Un;
H.write = zn;
H.parse = Ve.parse;
H.parseParams = Ve.parseParams;
H.parseFmtpConfig = Ve.parseFmtpConfig;
H.parsePayloads = Ve.parsePayloads;
H.parseRemoteCandidates = Ve.parseRemoteCandidates;
H.parseImageAttributes = Ve.parseImageAttributes;
H.parseSimulcastStreamList = Ve.parseSimulcastStreamList;
var X = {}, Vn = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Gn = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), Kn = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Vn(e, i, t);
  return Gn(e, i), e;
};
Object.defineProperty(X, "__esModule", { value: !0 });
X.applyCodecParameters = X.getCname = X.extractDtlsParameters = X.extractRtpCapabilities = void 0;
const ui = Kn(H);
function qn({ sdpObject: i }) {
  const e = /* @__PURE__ */ new Map(), t = [];
  let s = !1, r = !1;
  for (const a of i.media) {
    const o = a.type;
    switch (o) {
      case "audio": {
        if (s)
          continue;
        s = !0;
        break;
      }
      case "video": {
        if (r)
          continue;
        r = !0;
        break;
      }
      default:
        continue;
    }
    for (const d of a.rtp) {
      const p = {
        kind: o,
        mimeType: `${o}/${d.codec}`,
        preferredPayloadType: d.payload,
        clockRate: d.rate,
        channels: d.encoding,
        parameters: {},
        rtcpFeedback: []
      };
      e.set(p.preferredPayloadType, p);
    }
    for (const d of a.fmtp || []) {
      const p = ui.parseParams(d.config), c = e.get(d.payload);
      c && (p && p.hasOwnProperty("profile-level-id") && (p["profile-level-id"] = String(p["profile-level-id"])), c.parameters = p);
    }
    for (const d of a.rtcpFb || []) {
      const p = {
        type: d.type,
        parameter: d.subtype
      };
      if (p.parameter || delete p.parameter, d.payload !== "*") {
        const c = e.get(d.payload);
        if (!c)
          continue;
        c.rtcpFeedback.push(p);
      } else
        for (const c of e.values())
          c.kind === o && !/.+\/rtx$/i.test(c.mimeType) && c.rtcpFeedback.push(p);
    }
    for (const d of a.ext || []) {
      if (d["encrypt-uri"])
        continue;
      const p = {
        kind: o,
        uri: d.uri,
        preferredId: d.value
      };
      t.push(p);
    }
  }
  return {
    codecs: Array.from(e.values()),
    headerExtensions: t
  };
}
X.extractRtpCapabilities = qn;
function Hn({ sdpObject: i }) {
  let e = i.setup, t = i.fingerprint;
  if (!e || !t) {
    const n = (i.media || []).find((a) => a.port !== 0);
    n && (e ?? (e = n.setup), t ?? (t = n.fingerprint));
  }
  if (e) {
    if (!t)
      throw new Error("no a=fingerprint found at SDP session or media level");
  } else
    throw new Error("no a=setup found at SDP session or media level");
  let s;
  switch (e) {
    case "active":
      s = "client";
      break;
    case "passive":
      s = "server";
      break;
    case "actpass":
      s = "auto";
      break;
  }
  return {
    role: s,
    fingerprints: [
      {
        algorithm: t.type,
        value: t.hash
      }
    ]
  };
}
X.extractDtlsParameters = Hn;
function Wn({ offerMediaObject: i }) {
  const e = (i.ssrcs || []).find((t) => t.attribute === "cname");
  return e ? e.value : "";
}
X.getCname = Wn;
function Qn({ offerRtpParameters: i, answerMediaObject: e }) {
  for (const t of i.codecs) {
    const s = t.mimeType.toLowerCase();
    if (s !== "audio/opus" || !(e.rtp || []).find((o) => o.payload === t.payloadType))
      continue;
    e.fmtp = e.fmtp || [];
    let n = e.fmtp.find((o) => o.payload === t.payloadType);
    n || (n = { payload: t.payloadType, config: "" }, e.fmtp.push(n));
    const a = ui.parseParams(n.config);
    switch (s) {
      case "audio/opus": {
        const o = t.parameters["sprop-stereo"];
        o !== void 0 && (a.stereo = o ? 1 : 0);
        break;
      }
    }
    n.config = "";
    for (const o of Object.keys(a))
      n.config && (n.config += ";"), n.config += `${o}=${a[o]}`;
  }
}
X.applyCodecParameters = Qn;
var pe = {};
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.addLegacySimulcast = pe.getRtpEncodings = void 0;
function Yn({ offerMediaObject: i }) {
  const e = /* @__PURE__ */ new Set();
  for (const r of i.ssrcs || []) {
    const n = r.id;
    e.add(n);
  }
  if (e.size === 0)
    throw new Error("no a=ssrc lines found");
  const t = /* @__PURE__ */ new Map();
  for (const r of i.ssrcGroups || []) {
    if (r.semantics !== "FID")
      continue;
    let [n, a] = r.ssrcs.split(/\s+/);
    n = Number(n), a = Number(a), e.has(n) && (e.delete(n), e.delete(a), t.set(n, a));
  }
  for (const r of e)
    t.set(r, null);
  const s = [];
  for (const [r, n] of t) {
    const a = { ssrc: r };
    n && (a.rtx = { ssrc: n }), s.push(a);
  }
  return s;
}
pe.getRtpEncodings = Yn;
function Zn({ offerMediaObject: i, numStreams: e }) {
  if (e <= 1)
    throw new TypeError("numStreams must be greater than 1");
  const t = (i.ssrcs || []).find((u) => u.attribute === "msid");
  if (!t)
    throw new Error("a=ssrc line with msid information not found");
  const [s, r] = t.value.split(" "), n = t.id;
  let a;
  (i.ssrcGroups || []).some((u) => {
    if (u.semantics !== "FID")
      return !1;
    const l = u.ssrcs.split(/\s+/);
    return Number(l[0]) === n ? (a = Number(l[1]), !0) : !1;
  });
  const o = i.ssrcs.find((u) => u.attribute === "cname");
  if (!o)
    throw new Error("a=ssrc line with cname information not found");
  const d = o.value, p = [], c = [];
  for (let u = 0; u < e; ++u)
    p.push(n + u), a && c.push(a + u);
  i.ssrcGroups = [], i.ssrcs = [], i.ssrcGroups.push({
    semantics: "SIM",
    ssrcs: p.join(" ")
  });
  for (let u = 0; u < p.length; ++u) {
    const l = p[u];
    i.ssrcs.push({
      id: l,
      attribute: "cname",
      value: d
    }), i.ssrcs.push({
      id: l,
      attribute: "msid",
      value: `${s} ${r}`
    });
  }
  for (let u = 0; u < c.length; ++u) {
    const l = p[u], h = c[u];
    i.ssrcs.push({
      id: h,
      attribute: "cname",
      value: d
    }), i.ssrcs.push({
      id: h,
      attribute: "msid",
      value: `${s} ${r}`
    }), i.ssrcGroups.push({
      semantics: "FID",
      ssrcs: `${l} ${h}`
    });
  }
}
pe.addLegacySimulcast = Zn;
var Ge = {};
Object.defineProperty(Ge, "__esModule", { value: !0 });
Ge.addNackSuppportForOpus = void 0;
function Jn(i) {
  var e;
  for (const t of i.codecs || [])
    (t.mimeType.toLowerCase() === "audio/opus" || t.mimeType.toLowerCase() === "audio/multiopus") && !((e = t.rtcpFeedback) != null && e.some((s) => s.type === "nack" && !s.parameter)) && (t.rtcpFeedback || (t.rtcpFeedback = []), t.rtcpFeedback.push({ type: "nack" }));
}
Ge.addNackSuppportForOpus = Jn;
var re = {};
Object.defineProperty(re, "__esModule", { value: !0 });
re.HandlerInterface = void 0;
const Xn = De;
class ea extends Xn.EnhancedEventEmitter {
  constructor() {
    super();
  }
}
re.HandlerInterface = ea;
var ae = {}, Ne = {}, ta = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), sa = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), hi = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && ta(e, i, t);
  return sa(e, i), e;
};
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.OfferMediaSection = Ne.AnswerMediaSection = Ne.MediaSection = void 0;
const ra = hi(H), gr = hi(q);
class Fs {
  constructor({ iceParameters: e, iceCandidates: t, dtlsParameters: s, planB: r = !1 }) {
    if (this._mediaObject = {}, this._planB = r, e && this.setIceParameters(e), t) {
      this._mediaObject.candidates = [];
      for (const n of t) {
        const a = {};
        a.component = 1, a.foundation = n.foundation, a.ip = n.ip, a.port = n.port, a.priority = n.priority, a.transport = n.protocol, a.type = n.type, n.tcpType && (a.tcptype = n.tcpType), this._mediaObject.candidates.push(a);
      }
      this._mediaObject.endOfCandidates = "end-of-candidates", this._mediaObject.iceOptions = "renomination";
    }
    s && this.setDtlsRole(s.role);
  }
  get mid() {
    return String(this._mediaObject.mid);
  }
  get closed() {
    return this._mediaObject.port === 0;
  }
  getObject() {
    return this._mediaObject;
  }
  setIceParameters(e) {
    this._mediaObject.iceUfrag = e.usernameFragment, this._mediaObject.icePwd = e.password;
  }
  pause() {
    this._mediaObject.direction = "inactive";
  }
  disable() {
    this.pause(), delete this._mediaObject.ext, delete this._mediaObject.ssrcs, delete this._mediaObject.ssrcGroups, delete this._mediaObject.simulcast, delete this._mediaObject.simulcast_03, delete this._mediaObject.rids, delete this._mediaObject.extmapAllowMixed;
  }
  close() {
    this.disable(), this._mediaObject.port = 0;
  }
}
Ne.MediaSection = Fs;
class ia extends Fs {
  constructor({ iceParameters: e, iceCandidates: t, dtlsParameters: s, sctpParameters: r, plainRtpParameters: n, planB: a = !1, offerMediaObject: o, offerRtpParameters: d, answerRtpParameters: p, codecOptions: c, extmapAllowMixed: u = !1 }) {
    switch (super({ iceParameters: e, iceCandidates: t, dtlsParameters: s, planB: a }), this._mediaObject.mid = String(o.mid), this._mediaObject.type = o.type, this._mediaObject.protocol = o.protocol, n ? (this._mediaObject.connection = {
      ip: n.ip,
      version: n.ipVersion
    }, this._mediaObject.port = n.port) : (this._mediaObject.connection = { ip: "127.0.0.1", version: 4 }, this._mediaObject.port = 7), o.type) {
      case "audio":
      case "video": {
        this._mediaObject.direction = "recvonly", this._mediaObject.rtp = [], this._mediaObject.rtcpFb = [], this._mediaObject.fmtp = [];
        for (const l of p.codecs) {
          const h = {
            payload: l.payloadType,
            codec: xs(l),
            rate: l.clockRate
          };
          l.channels > 1 && (h.encoding = l.channels), this._mediaObject.rtp.push(h);
          const f = gr.clone(l.parameters) ?? {};
          let g = gr.clone(l.rtcpFeedback) ?? [];
          if (c) {
            const { opusStereo: S, opusFec: B, opusDtx: w, opusMaxPlaybackRate: P, opusMaxAverageBitrate: W, opusPtime: se, opusNack: le, videoGoogleStartBitrate: ie, videoGoogleMaxBitrate: ce, videoGoogleMinBitrate: ue } = c, te = d.codecs.find((Y) => Y.payloadType === l.payloadType);
            switch (l.mimeType.toLowerCase()) {
              case "audio/opus":
              case "audio/multiopus": {
                S !== void 0 && (te.parameters["sprop-stereo"] = S ? 1 : 0, f.stereo = S ? 1 : 0), B !== void 0 && (te.parameters.useinbandfec = B ? 1 : 0, f.useinbandfec = B ? 1 : 0), w !== void 0 && (te.parameters.usedtx = w ? 1 : 0, f.usedtx = w ? 1 : 0), P !== void 0 && (f.maxplaybackrate = P), W !== void 0 && (f.maxaveragebitrate = W), se !== void 0 && (te.parameters.ptime = se, f.ptime = se), le || (te.rtcpFeedback = te.rtcpFeedback.filter((Y) => Y.type !== "nack" || Y.parameter), g = g.filter((Y) => Y.type !== "nack" || Y.parameter));
                break;
              }
              case "video/vp8":
              case "video/vp9":
              case "video/h264":
              case "video/h265": {
                ie !== void 0 && (f["x-google-start-bitrate"] = ie), ce !== void 0 && (f["x-google-max-bitrate"] = ce), ue !== void 0 && (f["x-google-min-bitrate"] = ue);
                break;
              }
            }
          }
          const m = {
            payload: l.payloadType,
            config: ""
          };
          for (const S of Object.keys(f))
            m.config && (m.config += ";"), m.config += `${S}=${f[S]}`;
          m.config && this._mediaObject.fmtp.push(m);
          for (const S of g)
            this._mediaObject.rtcpFb.push({
              payload: l.payloadType,
              type: S.type,
              subtype: S.parameter
            });
        }
        this._mediaObject.payloads = p.codecs.map((l) => l.payloadType).join(" "), this._mediaObject.ext = [];
        for (const l of p.headerExtensions)
          (o.ext || []).some((f) => f.uri === l.uri) && this._mediaObject.ext.push({
            uri: l.uri,
            value: l.id
          });
        if (u && o.extmapAllowMixed === "extmap-allow-mixed" && (this._mediaObject.extmapAllowMixed = "extmap-allow-mixed"), o.simulcast) {
          this._mediaObject.simulcast = {
            dir1: "recv",
            list1: o.simulcast.list1
          }, this._mediaObject.rids = [];
          for (const l of o.rids || [])
            l.direction === "send" && this._mediaObject.rids.push({
              id: l.id,
              direction: "recv"
            });
        } else if (o.simulcast_03) {
          this._mediaObject.simulcast_03 = {
            value: o.simulcast_03.value.replace(/send/g, "recv")
          }, this._mediaObject.rids = [];
          for (const l of o.rids || [])
            l.direction === "send" && this._mediaObject.rids.push({
              id: l.id,
              direction: "recv"
            });
        }
        this._mediaObject.rtcpMux = "rtcp-mux", this._mediaObject.rtcpRsize = "rtcp-rsize", this._planB && this._mediaObject.type === "video" && (this._mediaObject.xGoogleFlag = "conference");
        break;
      }
      case "application": {
        typeof o.sctpPort == "number" ? (this._mediaObject.payloads = "webrtc-datachannel", this._mediaObject.sctpPort = r.port, this._mediaObject.maxMessageSize = r.maxMessageSize) : o.sctpmap && (this._mediaObject.payloads = r.port, this._mediaObject.sctpmap = {
          app: "webrtc-datachannel",
          sctpmapNumber: r.port,
          maxMessageSize: r.maxMessageSize
        });
        break;
      }
    }
  }
  setDtlsRole(e) {
    switch (e) {
      case "client":
        this._mediaObject.setup = "active";
        break;
      case "server":
        this._mediaObject.setup = "passive";
        break;
      case "auto":
        this._mediaObject.setup = "actpass";
        break;
    }
  }
  resume() {
    this._mediaObject.direction = "recvonly";
  }
  muxSimulcastStreams(e) {
    var n;
    if (!this._mediaObject.simulcast || !this._mediaObject.simulcast.list1)
      return;
    const t = {};
    for (const a of e)
      a.rid && (t[a.rid] = a);
    const s = this._mediaObject.simulcast.list1, r = ra.parseSimulcastStreamList(s);
    for (const a of r)
      for (const o of a)
        o.paused = !((n = t[o.scid]) != null && n.active);
    this._mediaObject.simulcast.list1 = r.map((a) => a.map((o) => `${o.paused ? "~" : ""}${o.scid}`).join(",")).join(";");
  }
}
Ne.AnswerMediaSection = ia;
class na extends Fs {
  constructor({ iceParameters: e, iceCandidates: t, dtlsParameters: s, sctpParameters: r, plainRtpParameters: n, planB: a = !1, mid: o, kind: d, offerRtpParameters: p, streamId: c, trackId: u, oldDataChannelSpec: l = !1 }) {
    switch (super({ iceParameters: e, iceCandidates: t, dtlsParameters: s, planB: a }), this._mediaObject.mid = String(o), this._mediaObject.type = d, n ? (this._mediaObject.connection = {
      ip: n.ip,
      version: n.ipVersion
    }, this._mediaObject.protocol = "RTP/AVP", this._mediaObject.port = n.port) : (this._mediaObject.connection = { ip: "127.0.0.1", version: 4 }, r ? this._mediaObject.protocol = "UDP/DTLS/SCTP" : this._mediaObject.protocol = "UDP/TLS/RTP/SAVPF", this._mediaObject.port = 7), d) {
      case "audio":
      case "video": {
        this._mediaObject.direction = "sendonly", this._mediaObject.rtp = [], this._mediaObject.rtcpFb = [], this._mediaObject.fmtp = [], this._planB || (this._mediaObject.msid = `${c || "-"} ${u}`);
        for (const m of p.codecs) {
          const S = {
            payload: m.payloadType,
            codec: xs(m),
            rate: m.clockRate
          };
          m.channels > 1 && (S.encoding = m.channels), this._mediaObject.rtp.push(S);
          const B = {
            payload: m.payloadType,
            config: ""
          };
          for (const w of Object.keys(m.parameters))
            B.config && (B.config += ";"), B.config += `${w}=${m.parameters[w]}`;
          B.config && this._mediaObject.fmtp.push(B);
          for (const w of m.rtcpFeedback)
            this._mediaObject.rtcpFb.push({
              payload: m.payloadType,
              type: w.type,
              subtype: w.parameter
            });
        }
        this._mediaObject.payloads = p.codecs.map((m) => m.payloadType).join(" "), this._mediaObject.ext = [];
        for (const m of p.headerExtensions)
          this._mediaObject.ext.push({
            uri: m.uri,
            value: m.id
          });
        this._mediaObject.rtcpMux = "rtcp-mux", this._mediaObject.rtcpRsize = "rtcp-rsize";
        const h = p.encodings[0], f = h.ssrc, g = h.rtx && h.rtx.ssrc ? h.rtx.ssrc : void 0;
        this._mediaObject.ssrcs = [], this._mediaObject.ssrcGroups = [], p.rtcp.cname && this._mediaObject.ssrcs.push({
          id: f,
          attribute: "cname",
          value: p.rtcp.cname
        }), this._planB && this._mediaObject.ssrcs.push({
          id: f,
          attribute: "msid",
          value: `${c || "-"} ${u}`
        }), g && (p.rtcp.cname && this._mediaObject.ssrcs.push({
          id: g,
          attribute: "cname",
          value: p.rtcp.cname
        }), this._planB && this._mediaObject.ssrcs.push({
          id: g,
          attribute: "msid",
          value: `${c || "-"} ${u}`
        }), this._mediaObject.ssrcGroups.push({
          semantics: "FID",
          ssrcs: `${f} ${g}`
        }));
        break;
      }
      case "application": {
        l ? (this._mediaObject.payloads = r.port, this._mediaObject.sctpmap = {
          app: "webrtc-datachannel",
          sctpmapNumber: r.port,
          maxMessageSize: r.maxMessageSize
        }) : (this._mediaObject.payloads = "webrtc-datachannel", this._mediaObject.sctpPort = r.port, this._mediaObject.maxMessageSize = r.maxMessageSize);
        break;
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDtlsRole(e) {
    this._mediaObject.setup = "actpass";
  }
  resume() {
    this._mediaObject.direction = "sendonly";
  }
  planBReceive({ offerRtpParameters: e, streamId: t, trackId: s }) {
    const r = e.encodings[0], n = r.ssrc, a = r.rtx && r.rtx.ssrc ? r.rtx.ssrc : void 0, o = this._mediaObject.payloads.split(" ");
    for (const d of e.codecs) {
      if (o.includes(String(d.payloadType)))
        continue;
      const p = {
        payload: d.payloadType,
        codec: xs(d),
        rate: d.clockRate
      };
      d.channels > 1 && (p.encoding = d.channels), this._mediaObject.rtp.push(p);
      const c = {
        payload: d.payloadType,
        config: ""
      };
      for (const u of Object.keys(d.parameters))
        c.config && (c.config += ";"), c.config += `${u}=${d.parameters[u]}`;
      c.config && this._mediaObject.fmtp.push(c);
      for (const u of d.rtcpFeedback)
        this._mediaObject.rtcpFb.push({
          payload: d.payloadType,
          type: u.type,
          subtype: u.parameter
        });
    }
    this._mediaObject.payloads += ` ${e.codecs.filter((d) => !this._mediaObject.payloads.includes(d.payloadType)).map((d) => d.payloadType).join(" ")}`, this._mediaObject.payloads = this._mediaObject.payloads.trim(), e.rtcp.cname && this._mediaObject.ssrcs.push({
      id: n,
      attribute: "cname",
      value: e.rtcp.cname
    }), this._mediaObject.ssrcs.push({
      id: n,
      attribute: "msid",
      value: `${t || "-"} ${s}`
    }), a && (e.rtcp.cname && this._mediaObject.ssrcs.push({
      id: a,
      attribute: "cname",
      value: e.rtcp.cname
    }), this._mediaObject.ssrcs.push({
      id: a,
      attribute: "msid",
      value: `${t || "-"} ${s}`
    }), this._mediaObject.ssrcGroups.push({
      semantics: "FID",
      ssrcs: `${n} ${a}`
    }));
  }
  planBStopReceiving({ offerRtpParameters: e }) {
    const t = e.encodings[0], s = t.ssrc, r = t.rtx && t.rtx.ssrc ? t.rtx.ssrc : void 0;
    this._mediaObject.ssrcs = this._mediaObject.ssrcs.filter((n) => n.id !== s && n.id !== r), r && (this._mediaObject.ssrcGroups = this._mediaObject.ssrcGroups.filter((n) => n.ssrcs !== `${s} ${r}`));
  }
}
Ne.OfferMediaSection = na;
function xs(i) {
  const t = new RegExp("^(audio|video)/(.+)", "i").exec(i.mimeType);
  if (!t)
    throw new TypeError("invalid codec.mimeType");
  return t[2];
}
var aa = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), oa = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), ca = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && aa(e, i, t);
  return oa(e, i), e;
};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.RemoteSdp = void 0;
const da = ca(H), pa = K, Nt = Ne, ys = new pa.Logger("RemoteSdp");
class la {
  constructor({ iceParameters: e, iceCandidates: t, dtlsParameters: s, sctpParameters: r, plainRtpParameters: n, planB: a = !1 }) {
    if (this._mediaSections = [], this._midToIndex = /* @__PURE__ */ new Map(), this._iceParameters = e, this._iceCandidates = t, this._dtlsParameters = s, this._sctpParameters = r, this._plainRtpParameters = n, this._planB = a, this._sdpObject = {
      version: 0,
      origin: {
        address: "0.0.0.0",
        ipVer: 4,
        netType: "IN",
        sessionId: 1e4,
        sessionVersion: 0,
        username: "mediasoup-client"
      },
      name: "-",
      timing: { start: 0, stop: 0 },
      media: []
    }, e && e.iceLite && (this._sdpObject.icelite = "ice-lite"), s) {
      this._sdpObject.msidSemantic = { semantic: "WMS", token: "*" };
      const o = this._dtlsParameters.fingerprints.length;
      this._sdpObject.fingerprint = {
        type: s.fingerprints[o - 1].algorithm,
        hash: s.fingerprints[o - 1].value
      }, this._sdpObject.groups = [{ type: "BUNDLE", mids: "" }];
    }
    n && (this._sdpObject.origin.address = n.ip, this._sdpObject.origin.ipVer = n.ipVersion);
  }
  updateIceParameters(e) {
    ys.debug("updateIceParameters() [iceParameters:%o]", e), this._iceParameters = e, this._sdpObject.icelite = e.iceLite ? "ice-lite" : void 0;
    for (const t of this._mediaSections)
      t.setIceParameters(e);
  }
  updateDtlsRole(e) {
    ys.debug("updateDtlsRole() [role:%s]", e), this._dtlsParameters.role = e;
    for (const t of this._mediaSections)
      t.setDtlsRole(e);
  }
  getNextMediaSectionIdx() {
    for (let e = 0; e < this._mediaSections.length; ++e) {
      const t = this._mediaSections[e];
      if (t.closed)
        return { idx: e, reuseMid: t.mid };
    }
    return { idx: this._mediaSections.length };
  }
  send({ offerMediaObject: e, reuseMid: t, offerRtpParameters: s, answerRtpParameters: r, codecOptions: n, extmapAllowMixed: a = !1 }) {
    const o = new Nt.AnswerMediaSection({
      iceParameters: this._iceParameters,
      iceCandidates: this._iceCandidates,
      dtlsParameters: this._dtlsParameters,
      plainRtpParameters: this._plainRtpParameters,
      planB: this._planB,
      offerMediaObject: e,
      offerRtpParameters: s,
      answerRtpParameters: r,
      codecOptions: n,
      extmapAllowMixed: a
    });
    t ? this._replaceMediaSection(o, t) : this._midToIndex.has(o.mid) ? this._replaceMediaSection(o) : this._addMediaSection(o);
  }
  receive({ mid: e, kind: t, offerRtpParameters: s, streamId: r, trackId: n }) {
    const a = this._midToIndex.get(e);
    let o;
    if (a !== void 0 && (o = this._mediaSections[a]), o)
      o.planBReceive({ offerRtpParameters: s, streamId: r, trackId: n }), this._replaceMediaSection(o);
    else {
      o = new Nt.OfferMediaSection({
        iceParameters: this._iceParameters,
        iceCandidates: this._iceCandidates,
        dtlsParameters: this._dtlsParameters,
        plainRtpParameters: this._plainRtpParameters,
        planB: this._planB,
        mid: e,
        kind: t,
        offerRtpParameters: s,
        streamId: r,
        trackId: n
      });
      const d = this._mediaSections.find((p) => p.closed);
      d ? this._replaceMediaSection(o, d.mid) : this._addMediaSection(o);
    }
  }
  pauseMediaSection(e) {
    this._findMediaSection(e).pause();
  }
  resumeSendingMediaSection(e) {
    this._findMediaSection(e).resume();
  }
  resumeReceivingMediaSection(e) {
    this._findMediaSection(e).resume();
  }
  disableMediaSection(e) {
    this._findMediaSection(e).disable();
  }
  /**
   * Closes media section. Returns true if the given MID corresponds to a m
   * section that has been indeed closed. False otherwise.
   *
   * NOTE: Closing the first m section is a pain since it invalidates the bundled
   * transport, so instead closing it we just disable it.
   */
  closeMediaSection(e) {
    const t = this._findMediaSection(e);
    return e === this._firstMid ? (ys.debug("closeMediaSection() | cannot close first media section, disabling it instead [mid:%s]", e), this.disableMediaSection(e), !1) : (t.close(), this._regenerateBundleMids(), !0);
  }
  muxMediaSectionSimulcast(e, t) {
    const s = this._findMediaSection(e);
    s.muxSimulcastStreams(t), this._replaceMediaSection(s);
  }
  planBStopReceiving({ mid: e, offerRtpParameters: t }) {
    const s = this._findMediaSection(e);
    s.planBStopReceiving({ offerRtpParameters: t }), this._replaceMediaSection(s);
  }
  sendSctpAssociation({ offerMediaObject: e }) {
    const t = new Nt.AnswerMediaSection({
      iceParameters: this._iceParameters,
      iceCandidates: this._iceCandidates,
      dtlsParameters: this._dtlsParameters,
      sctpParameters: this._sctpParameters,
      plainRtpParameters: this._plainRtpParameters,
      offerMediaObject: e
    });
    this._addMediaSection(t);
  }
  receiveSctpAssociation({ oldDataChannelSpec: e = !1 } = {}) {
    const t = new Nt.OfferMediaSection({
      iceParameters: this._iceParameters,
      iceCandidates: this._iceCandidates,
      dtlsParameters: this._dtlsParameters,
      sctpParameters: this._sctpParameters,
      plainRtpParameters: this._plainRtpParameters,
      mid: "datachannel",
      kind: "application",
      oldDataChannelSpec: e
    });
    this._addMediaSection(t);
  }
  getSdp() {
    return this._sdpObject.origin.sessionVersion++, da.write(this._sdpObject);
  }
  _addMediaSection(e) {
    this._firstMid || (this._firstMid = e.mid), this._mediaSections.push(e), this._midToIndex.set(e.mid, this._mediaSections.length - 1), this._sdpObject.media.push(e.getObject()), this._regenerateBundleMids();
  }
  _replaceMediaSection(e, t) {
    if (typeof t == "string") {
      const s = this._midToIndex.get(t);
      if (s === void 0)
        throw new Error(`no media section found for reuseMid '${t}'`);
      const r = this._mediaSections[s];
      this._mediaSections[s] = e, this._midToIndex.delete(r.mid), this._midToIndex.set(e.mid, s), this._sdpObject.media[s] = e.getObject(), this._regenerateBundleMids();
    } else {
      const s = this._midToIndex.get(e.mid);
      if (s === void 0)
        throw new Error(`no media section found with mid '${e.mid}'`);
      this._mediaSections[s] = e, this._sdpObject.media[s] = e.getObject();
    }
  }
  _findMediaSection(e) {
    const t = this._midToIndex.get(e);
    if (t === void 0)
      throw new Error(`no media section found with mid '${e}'`);
    return this._mediaSections[t];
  }
  _regenerateBundleMids() {
    this._dtlsParameters && (this._sdpObject.groups[0].mids = this._mediaSections.filter((e) => !e.closed).map((e) => e.mid).join(" "));
  }
}
ae.RemoteSdp = la;
var Te = {};
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.parse = void 0;
const ua = new RegExp("^[LS]([1-9]\\d{0,1})T([1-9]\\d{0,1})");
function ha(i) {
  const e = ua.exec(i || "");
  return e ? {
    spatialLayers: Number(e[1]),
    temporalLayers: Number(e[2])
  } : {
    spatialLayers: 1,
    temporalLayers: 1
  };
}
Te.parse = ha;
var fa = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), ma = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), ht = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && fa(e, i, t);
  return ma(e, i), e;
};
Object.defineProperty(ss, "__esModule", { value: !0 });
ss.Chrome111 = void 0;
const Oe = ht(H), ga = K, _r = ht(q), et = ht(v), Ft = ht(X), wr = ht(pe), _a = ht(Ge), wa = ee, va = re, Sa = ae, ba = Te, D = new ga.Logger("Chrome111"), vr = { OS: 1024, MIS: 1024 };
class Bs extends va.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Bs();
  }
  constructor() {
    super(), this._closed = !1, this._mapMidTransceiver = /* @__PURE__ */ new Map(), this._sendStream = new MediaStream(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Chrome111";
  }
  close() {
    if (D.debug("close()"), !this._closed) {
      if (this._closed = !0, this._pc)
        try {
          this._pc.close();
        } catch {
        }
      this.emit("@close");
    }
  }
  async getNativeRtpCapabilities() {
    D.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan"
    });
    try {
      e.addTransceiver("audio"), e.addTransceiver("video");
      const t = await e.createOffer();
      try {
        e.close();
      } catch {
      }
      const s = Oe.parse(t.sdp), r = Ft.extractRtpCapabilities({ sdpObject: s });
      return _a.addNackSuppportForOpus(r), r;
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return D.debug("getNativeSctpCapabilities()"), {
      numStreams: vr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    this.assertNotClosed(), D.debug("run()"), this._direction = e, this._remoteSdp = new Sa.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n
    }), this._sendingRtpParametersByKind = {
      audio: et.getSendingRtpParameters("audio", c),
      video: et.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: et.getSendingRemoteRtpParameters("audio", c),
      video: et.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : (D.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    }));
  }
  async updateIceServers(e) {
    this.assertNotClosed(), D.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (this.assertNotClosed(), D.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        D.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        D.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        D.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        D.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this.assertNotClosed(), this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    if (this.assertNotClosed(), this.assertSendDirection(), D.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), t && t.length > 1) {
      t.forEach((m, S) => {
        m.rid = `r${S}`;
      });
      let f = 1, g = 1;
      for (const m of t) {
        const S = m.scalabilityMode ? (0, ba.parse)(m.scalabilityMode).temporalLayers : 3;
        S > g && (g = S);
      }
      for (const m of t)
        m.rid = `r${f++}`, m.scalabilityMode = `L1T${g}`;
    }
    const n = _r.clone(this._sendingRtpParametersByKind[e.kind]);
    n.codecs = et.reduceCodecs(n.codecs, r);
    const a = _r.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    a.codecs = et.reduceCodecs(a.codecs, r);
    const o = this._remoteSdp.getNextMediaSectionIdx(), d = this._pc.addTransceiver(e, {
      direction: "sendonly",
      streams: [this._sendStream],
      sendEncodings: t
    }), p = await this._pc.createOffer();
    let c = Oe.parse(p.sdp);
    this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: c
    }), D.debug("send() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p);
    const u = d.mid;
    n.mid = u, c = Oe.parse(this._pc.localDescription.sdp);
    const l = c.media[o.idx];
    if (n.rtcp.cname = Ft.getCname({ offerMediaObject: l }), !t)
      n.encodings = wr.getRtpEncodings({ offerMediaObject: l });
    else if (t.length === 1) {
      const f = wr.getRtpEncodings({ offerMediaObject: l });
      Object.assign(f[0], t[0]), n.encodings = f;
    } else
      n.encodings = t;
    this._remoteSdp.send({
      offerMediaObject: l,
      reuseMid: o.reuseMid,
      offerRtpParameters: n,
      answerRtpParameters: a,
      codecOptions: s,
      extmapAllowMixed: !0
    });
    const h = { type: "answer", sdp: this._remoteSdp.getSdp() };
    return D.debug("send() | calling pc.setRemoteDescription() [answer:%o]", h), await this._pc.setRemoteDescription(h), this._mapMidTransceiver.set(u, d), {
      localId: u,
      rtpParameters: n,
      rtpSender: d.sender
    };
  }
  async stopSending(e) {
    if (this.assertSendDirection(), D.debug("stopSending() [localId:%s]", e), this._closed)
      return;
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
      try {
        t.stop();
      } catch {
      }
    const r = await this._pc.createOffer();
    D.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", r), await this._pc.setLocalDescription(r);
    const n = { type: "answer", sdp: this._remoteSdp.getSdp() };
    D.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", n), await this._pc.setRemoteDescription(n), this._mapMidTransceiver.delete(e);
  }
  async pauseSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), D.debug("pauseSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
    const s = await this._pc.createOffer();
    D.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    D.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async resumeSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), D.debug("resumeSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (this._remoteSdp.resumeSendingMediaSection(e), !t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "sendonly";
    const s = await this._pc.createOffer();
    D.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    D.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async replaceTrack(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), t ? D.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : D.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    await s.sender.replaceTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), D.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      d <= t ? o.active = !0 : o.active = !1;
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    D.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    D.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), D.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      r.encodings[d] = { ...o, ...t };
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    D.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    D.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async getSenderStats(e) {
    this.assertNotClosed(), this.assertSendDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.sender.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertNotClosed(), this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmits: s,
      protocol: n
    };
    D.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % vr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = Oe.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), D.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      D.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = [], s = /* @__PURE__ */ new Map();
    for (const o of e) {
      const { trackId: d, kind: p, rtpParameters: c, streamId: u } = o;
      D.debug("receive() [trackId:%s, kind:%s]", d, p);
      const l = c.mid || String(this._mapMidTransceiver.size);
      s.set(d, l), this._remoteSdp.receive({
        mid: l,
        kind: p,
        offerRtpParameters: c,
        streamId: u || c.rtcp.cname,
        trackId: d
      });
    }
    const r = { type: "offer", sdp: this._remoteSdp.getSdp() };
    D.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", r), await this._pc.setRemoteDescription(r);
    let n = await this._pc.createAnswer();
    const a = Oe.parse(n.sdp);
    for (const o of e) {
      const { trackId: d, rtpParameters: p } = o, c = s.get(d), u = a.media.find((l) => String(l.mid) === c);
      Ft.applyCodecParameters({
        offerRtpParameters: p,
        answerMediaObject: u
      });
    }
    n = { type: "answer", sdp: Oe.write(a) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), D.debug("receive() | calling pc.setLocalDescription() [answer:%o]", n), await this._pc.setLocalDescription(n);
    for (const o of e) {
      const { trackId: d } = o, p = s.get(d), c = this._pc.getTransceivers().find((u) => u.mid === p);
      if (c)
        this._mapMidTransceiver.set(p, c), t.push({
          localId: p,
          track: c.receiver.track,
          rtpReceiver: c.receiver
        });
      else
        throw new Error("new RTCRtpTransceiver not found");
    }
    return t;
  }
  async stopReceiving(e) {
    if (this.assertRecvDirection(), this._closed)
      return;
    for (const r of e) {
      D.debug("stopReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      this._remoteSdp.closeMediaSection(n.mid);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    D.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    D.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    for (const r of e)
      this._mapMidTransceiver.delete(r);
  }
  async pauseReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      D.debug("pauseReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "inactive", this._remoteSdp.pauseMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    D.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    D.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async resumeReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      D.debug("resumeReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    D.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    D.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async getReceiverStats(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.receiver.getStats();
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertNotClosed(), this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmits: o,
      protocol: s
    };
    D.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation();
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      D.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = Oe.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      D.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = Oe.parse(this._pc.localDescription.sdp));
    const s = Ft.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertNotClosed() {
    if (this._closed)
      throw new wa.InvalidStateError("method called in a closed handler");
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
ss.Chrome111 = Bs;
var rs = {}, ya = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Ra = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), ft = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && ya(e, i, t);
  return Ra(e, i), e;
};
Object.defineProperty(rs, "__esModule", { value: !0 });
rs.Chrome74 = void 0;
const we = ft(H), Ca = K, Sr = ft(q), tt = ft(v), Bt = ft(X), Rs = ft(pe), Da = ft(Ge), Ta = ee, Pa = re, Ea = ae, La = Te, R = new Ca.Logger("Chrome74"), br = { OS: 1024, MIS: 1024 };
class Us extends Pa.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Us();
  }
  constructor() {
    super(), this._closed = !1, this._mapMidTransceiver = /* @__PURE__ */ new Map(), this._sendStream = new MediaStream(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Chrome74";
  }
  close() {
    if (R.debug("close()"), !this._closed) {
      if (this._closed = !0, this._pc)
        try {
          this._pc.close();
        } catch {
        }
      this.emit("@close");
    }
  }
  async getNativeRtpCapabilities() {
    R.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan"
    });
    try {
      e.addTransceiver("audio"), e.addTransceiver("video");
      const t = await e.createOffer();
      try {
        e.close();
      } catch {
      }
      const s = we.parse(t.sdp), r = Bt.extractRtpCapabilities({ sdpObject: s });
      return Da.addNackSuppportForOpus(r), r;
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return R.debug("getNativeSctpCapabilities()"), {
      numStreams: br
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    R.debug("run()"), this._direction = e, this._remoteSdp = new Ea.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n
    }), this._sendingRtpParametersByKind = {
      audio: tt.getSendingRtpParameters("audio", c),
      video: tt.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: tt.getSendingRemoteRtpParameters("audio", c),
      video: tt.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : (R.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    }));
  }
  async updateIceServers(e) {
    this.assertNotClosed(), R.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (this.assertNotClosed(), R.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        R.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        R.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        R.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        R.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this.assertNotClosed(), this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertNotClosed(), this.assertSendDirection(), R.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), t && t.length > 1 && t.forEach((m, S) => {
      m.rid = `r${S}`;
    });
    const n = Sr.clone(this._sendingRtpParametersByKind[e.kind]);
    n.codecs = tt.reduceCodecs(n.codecs, r);
    const a = Sr.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    a.codecs = tt.reduceCodecs(a.codecs, r);
    const o = this._remoteSdp.getNextMediaSectionIdx(), d = this._pc.addTransceiver(e, {
      direction: "sendonly",
      streams: [this._sendStream],
      sendEncodings: t
    });
    let p = await this._pc.createOffer(), c = we.parse(p.sdp), u;
    this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: c
    });
    let l = !1;
    const h = (0, La.parse)((t || [{}])[0].scalabilityMode);
    t && t.length === 1 && h.spatialLayers > 1 && n.codecs[0].mimeType.toLowerCase() === "video/vp9" && (R.debug("send() | enabling legacy simulcast for VP9 SVC"), l = !0, c = we.parse(p.sdp), u = c.media[o.idx], Rs.addLegacySimulcast({
      offerMediaObject: u,
      numStreams: h.spatialLayers
    }), p = { type: "offer", sdp: we.write(c) }), R.debug("send() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p);
    const f = d.mid;
    if (n.mid = f, c = we.parse(this._pc.localDescription.sdp), u = c.media[o.idx], n.rtcp.cname = Bt.getCname({ offerMediaObject: u }), !t)
      n.encodings = Rs.getRtpEncodings({ offerMediaObject: u });
    else if (t.length === 1) {
      let m = Rs.getRtpEncodings({ offerMediaObject: u });
      Object.assign(m[0], t[0]), l && (m = [m[0]]), n.encodings = m;
    } else
      n.encodings = t;
    if (n.encodings.length > 1 && (n.codecs[0].mimeType.toLowerCase() === "video/vp8" || n.codecs[0].mimeType.toLowerCase() === "video/h264"))
      for (const m of n.encodings)
        m.scalabilityMode ? m.scalabilityMode = `L1T${h.temporalLayers}` : m.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: u,
      reuseMid: o.reuseMid,
      offerRtpParameters: n,
      answerRtpParameters: a,
      codecOptions: s,
      extmapAllowMixed: !0
    });
    const g = { type: "answer", sdp: this._remoteSdp.getSdp() };
    return R.debug("send() | calling pc.setRemoteDescription() [answer:%o]", g), await this._pc.setRemoteDescription(g), this._mapMidTransceiver.set(f, d), {
      localId: f,
      rtpParameters: n,
      rtpSender: d.sender
    };
  }
  async stopSending(e) {
    if (this.assertSendDirection(), R.debug("stopSending() [localId:%s]", e), this._closed)
      return;
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
      try {
        t.stop();
      } catch {
      }
    const r = await this._pc.createOffer();
    R.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", r), await this._pc.setLocalDescription(r);
    const n = { type: "answer", sdp: this._remoteSdp.getSdp() };
    R.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", n), await this._pc.setRemoteDescription(n), this._mapMidTransceiver.delete(e);
  }
  async pauseSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), R.debug("pauseSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
    const s = await this._pc.createOffer();
    R.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    R.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async resumeSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), R.debug("resumeSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (this._remoteSdp.resumeSendingMediaSection(e), !t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "sendonly";
    const s = await this._pc.createOffer();
    R.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    R.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async replaceTrack(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), t ? R.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : R.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    await s.sender.replaceTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), R.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      d <= t ? o.active = !0 : o.active = !1;
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    R.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    R.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), R.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      r.encodings[d] = { ...o, ...t };
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    R.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    R.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async getSenderStats(e) {
    this.assertNotClosed(), this.assertSendDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.sender.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertNotClosed(), this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmits: s,
      protocol: n
    };
    R.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % br.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = we.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), R.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      R.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = [], s = /* @__PURE__ */ new Map();
    for (const o of e) {
      const { trackId: d, kind: p, rtpParameters: c, streamId: u } = o;
      R.debug("receive() [trackId:%s, kind:%s]", d, p);
      const l = c.mid || String(this._mapMidTransceiver.size);
      s.set(d, l), this._remoteSdp.receive({
        mid: l,
        kind: p,
        offerRtpParameters: c,
        streamId: u || c.rtcp.cname,
        trackId: d
      });
    }
    const r = { type: "offer", sdp: this._remoteSdp.getSdp() };
    R.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", r), await this._pc.setRemoteDescription(r);
    let n = await this._pc.createAnswer();
    const a = we.parse(n.sdp);
    for (const o of e) {
      const { trackId: d, rtpParameters: p } = o, c = s.get(d), u = a.media.find((l) => String(l.mid) === c);
      Bt.applyCodecParameters({
        offerRtpParameters: p,
        answerMediaObject: u
      });
    }
    n = { type: "answer", sdp: we.write(a) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), R.debug("receive() | calling pc.setLocalDescription() [answer:%o]", n), await this._pc.setLocalDescription(n);
    for (const o of e) {
      const { trackId: d } = o, p = s.get(d), c = this._pc.getTransceivers().find((u) => u.mid === p);
      if (c)
        this._mapMidTransceiver.set(p, c), t.push({
          localId: p,
          track: c.receiver.track,
          rtpReceiver: c.receiver
        });
      else
        throw new Error("new RTCRtpTransceiver not found");
    }
    return t;
  }
  async stopReceiving(e) {
    if (this.assertRecvDirection(), this._closed)
      return;
    for (const r of e) {
      R.debug("stopReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      this._remoteSdp.closeMediaSection(n.mid);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    R.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    R.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    for (const r of e)
      this._mapMidTransceiver.delete(r);
  }
  async pauseReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      R.debug("pauseReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "inactive", this._remoteSdp.pauseMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    R.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    R.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async resumeReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      R.debug("resumeReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    R.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    R.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async getReceiverStats(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.receiver.getStats();
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertNotClosed(), this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmits: o,
      protocol: s
    };
    R.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation();
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      R.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = we.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      R.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = we.parse(this._pc.localDescription.sdp));
    const s = Bt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertNotClosed() {
    if (this._closed)
      throw new Ta.InvalidStateError("method called in a closed handler");
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
rs.Chrome74 = Us;
var is = {}, Ia = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Ma = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), It = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Ia(e, i, t);
  return Ma(e, i), e;
};
Object.defineProperty(is, "__esModule", { value: !0 });
is.Chrome70 = void 0;
const oe = It(H), ka = K, yr = It(q), st = It(v), Ut = It(X), Cs = It(pe), xa = re, Oa = ae, ja = Te, M = new ka.Logger("Chrome70"), Rr = { OS: 1024, MIS: 1024 };
class zs extends xa.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new zs();
  }
  constructor() {
    super(), this._mapMidTransceiver = /* @__PURE__ */ new Map(), this._sendStream = new MediaStream(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Chrome70";
  }
  close() {
    if (M.debug("close()"), this._pc)
      try {
        this._pc.close();
      } catch {
      }
    this.emit("@close");
  }
  async getNativeRtpCapabilities() {
    M.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan"
    });
    try {
      e.addTransceiver("audio"), e.addTransceiver("video");
      const t = await e.createOffer();
      try {
        e.close();
      } catch {
      }
      const s = oe.parse(t.sdp);
      return Ut.extractRtpCapabilities({ sdpObject: s });
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return M.debug("getNativeSctpCapabilities()"), {
      numStreams: Rr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    M.debug("run()"), this._direction = e, this._remoteSdp = new Oa.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n
    }), this._sendingRtpParametersByKind = {
      audio: st.getSendingRtpParameters("audio", c),
      video: st.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: st.getSendingRemoteRtpParameters("audio", c),
      video: st.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (M.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  async updateIceServers(e) {
    M.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (M.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        M.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        M.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        M.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        M.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertSendDirection(), M.debug("send() [kind:%s, track.id:%s]", e.kind, e.id);
    const n = yr.clone(this._sendingRtpParametersByKind[e.kind]);
    n.codecs = st.reduceCodecs(n.codecs, r);
    const a = yr.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    a.codecs = st.reduceCodecs(a.codecs, r);
    const o = this._remoteSdp.getNextMediaSectionIdx(), d = this._pc.addTransceiver(e, { direction: "sendonly", streams: [this._sendStream] });
    let p = await this._pc.createOffer(), c = oe.parse(p.sdp), u;
    this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: c
    }), t && t.length > 1 && (M.debug("send() | enabling legacy simulcast"), c = oe.parse(p.sdp), u = c.media[o.idx], Cs.addLegacySimulcast({
      offerMediaObject: u,
      numStreams: t.length
    }), p = { type: "offer", sdp: oe.write(c) });
    let l = !1;
    const h = (0, ja.parse)((t || [{}])[0].scalabilityMode);
    if (t && t.length === 1 && h.spatialLayers > 1 && n.codecs[0].mimeType.toLowerCase() === "video/vp9" && (M.debug("send() | enabling legacy simulcast for VP9 SVC"), l = !0, c = oe.parse(p.sdp), u = c.media[o.idx], Cs.addLegacySimulcast({
      offerMediaObject: u,
      numStreams: h.spatialLayers
    }), p = { type: "offer", sdp: oe.write(c) }), M.debug("send() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), t) {
      M.debug("send() | applying given encodings");
      const m = d.sender.getParameters();
      for (let S = 0; S < (m.encodings || []).length; ++S) {
        const B = m.encodings[S], w = t[S];
        if (!w)
          break;
        m.encodings[S] = Object.assign(B, w);
      }
      await d.sender.setParameters(m);
    }
    const f = d.mid;
    if (n.mid = f, c = oe.parse(this._pc.localDescription.sdp), u = c.media[o.idx], n.rtcp.cname = Ut.getCname({ offerMediaObject: u }), n.encodings = Cs.getRtpEncodings({ offerMediaObject: u }), t)
      for (let m = 0; m < n.encodings.length; ++m)
        t[m] && Object.assign(n.encodings[m], t[m]);
    if (l && (n.encodings = [n.encodings[0]]), n.encodings.length > 1 && (n.codecs[0].mimeType.toLowerCase() === "video/vp8" || n.codecs[0].mimeType.toLowerCase() === "video/h264"))
      for (const m of n.encodings)
        m.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: u,
      reuseMid: o.reuseMid,
      offerRtpParameters: n,
      answerRtpParameters: a,
      codecOptions: s
    });
    const g = { type: "answer", sdp: this._remoteSdp.getSdp() };
    return M.debug("send() | calling pc.setRemoteDescription() [answer:%o]", g), await this._pc.setRemoteDescription(g), this._mapMidTransceiver.set(f, d), {
      localId: f,
      rtpParameters: n,
      rtpSender: d.sender
    };
  }
  async stopSending(e) {
    this.assertSendDirection(), M.debug("stopSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
      try {
        t.stop();
      } catch {
      }
    const r = await this._pc.createOffer();
    M.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", r), await this._pc.setLocalDescription(r);
    const n = { type: "answer", sdp: this._remoteSdp.getSdp() };
    M.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", n), await this._pc.setRemoteDescription(n), this._mapMidTransceiver.delete(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
  }
  async replaceTrack(e, t) {
    this.assertSendDirection(), t ? M.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : M.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    await s.sender.replaceTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertSendDirection(), M.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      d <= t ? o.active = !0 : o.active = !1;
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    M.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    M.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertSendDirection(), M.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      r.encodings[d] = { ...o, ...t };
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    M.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    M.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async getSenderStats(e) {
    this.assertSendDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.sender.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmitTime: t,
      maxRetransmits: s,
      protocol: n
    };
    M.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % Rr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = oe.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), M.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      M.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertRecvDirection();
    const t = [], s = /* @__PURE__ */ new Map();
    for (const o of e) {
      const { trackId: d, kind: p, rtpParameters: c, streamId: u } = o;
      M.debug("receive() [trackId:%s, kind:%s]", d, p);
      const l = c.mid || String(this._mapMidTransceiver.size);
      s.set(d, l), this._remoteSdp.receive({
        mid: l,
        kind: p,
        offerRtpParameters: c,
        streamId: u || c.rtcp.cname,
        trackId: d
      });
    }
    const r = { type: "offer", sdp: this._remoteSdp.getSdp() };
    M.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", r), await this._pc.setRemoteDescription(r);
    let n = await this._pc.createAnswer();
    const a = oe.parse(n.sdp);
    for (const o of e) {
      const { trackId: d, rtpParameters: p } = o, c = s.get(d), u = a.media.find((l) => String(l.mid) === c);
      Ut.applyCodecParameters({
        offerRtpParameters: p,
        answerMediaObject: u
      });
    }
    n = { type: "answer", sdp: oe.write(a) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), M.debug("receive() | calling pc.setLocalDescription() [answer:%o]", n), await this._pc.setLocalDescription(n);
    for (const o of e) {
      const { trackId: d } = o, p = s.get(d), c = this._pc.getTransceivers().find((u) => u.mid === p);
      if (!c)
        throw new Error("new RTCRtpTransceiver not found");
      this._mapMidTransceiver.set(p, c), t.push({
        localId: p,
        track: c.receiver.track,
        rtpReceiver: c.receiver
      });
    }
    return t;
  }
  async stopReceiving(e) {
    this.assertRecvDirection();
    for (const r of e) {
      M.debug("stopReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      this._remoteSdp.closeMediaSection(n.mid);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    M.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    M.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    for (const r of e)
      this._mapMidTransceiver.delete(r);
  }
  async pauseReceiving(e) {
  }
  async resumeReceiving(e) {
  }
  async getReceiverStats(e) {
    this.assertRecvDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.receiver.getStats();
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmitTime: a,
      maxRetransmits: o,
      protocol: s
    };
    M.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation();
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      M.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = oe.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      M.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = oe.parse(this._pc.localDescription.sdp));
    const s = Ut.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
is.Chrome70 = zs;
var ns = {}, Ee = {};
Object.defineProperty(Ee, "__esModule", { value: !0 });
Ee.addLegacySimulcast = Ee.getRtpEncodings = void 0;
function $a({ offerMediaObject: i, track: e }) {
  const t = /* @__PURE__ */ new Set();
  for (const n of i.ssrcs || []) {
    if (n.attribute !== "msid")
      continue;
    if (n.value.split(" ")[1] === e.id) {
      const o = n.id;
      t.add(o);
    }
  }
  if (t.size === 0)
    throw new Error(`a=ssrc line with msid information not found [track.id:${e.id}]`);
  const s = /* @__PURE__ */ new Map();
  for (const n of i.ssrcGroups || []) {
    if (n.semantics !== "FID")
      continue;
    let [a, o] = n.ssrcs.split(/\s+/);
    a = Number(a), o = Number(o), t.has(a) && (t.delete(a), t.delete(o), s.set(a, o));
  }
  for (const n of t)
    s.set(n, null);
  const r = [];
  for (const [n, a] of s) {
    const o = { ssrc: n };
    a && (o.rtx = { ssrc: a }), r.push(o);
  }
  return r;
}
Ee.getRtpEncodings = $a;
function Aa({ offerMediaObject: i, track: e, numStreams: t }) {
  if (t <= 1)
    throw new TypeError("numStreams must be greater than 1");
  let s, r, n;
  if (!(i.ssrcs || []).find((u) => u.attribute !== "msid" ? !1 : u.value.split(" ")[1] === e.id ? (s = u.id, n = u.value.split(" ")[0], !0) : !1))
    throw new Error(`a=ssrc line with msid information not found [track.id:${e.id}]`);
  (i.ssrcGroups || []).some((u) => {
    if (u.semantics !== "FID")
      return !1;
    const l = u.ssrcs.split(/\s+/);
    return Number(l[0]) === s ? (r = Number(l[1]), !0) : !1;
  });
  const o = i.ssrcs.find((u) => u.attribute === "cname" && u.id === s);
  if (!o)
    throw new Error(`a=ssrc line with cname information not found [track.id:${e.id}]`);
  const d = o.value, p = [], c = [];
  for (let u = 0; u < t; ++u)
    p.push(s + u), r && c.push(r + u);
  i.ssrcGroups = i.ssrcGroups || [], i.ssrcs = i.ssrcs || [], i.ssrcGroups.push({
    semantics: "SIM",
    ssrcs: p.join(" ")
  });
  for (let u = 0; u < p.length; ++u) {
    const l = p[u];
    i.ssrcs.push({
      id: l,
      attribute: "cname",
      value: d
    }), i.ssrcs.push({
      id: l,
      attribute: "msid",
      value: `${n} ${e.id}`
    });
  }
  for (let u = 0; u < c.length; ++u) {
    const l = p[u], h = c[u];
    i.ssrcs.push({
      id: h,
      attribute: "cname",
      value: d
    }), i.ssrcs.push({
      id: h,
      attribute: "msid",
      value: `${n} ${e.id}`
    }), i.ssrcGroups.push({
      semantics: "FID",
      ssrcs: `${l} ${h}`
    });
  }
}
Ee.addLegacySimulcast = Aa;
var Na = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Fa = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), Mt = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Na(e, i, t);
  return Fa(e, i), e;
};
Object.defineProperty(ns, "__esModule", { value: !0 });
ns.Chrome67 = void 0;
const ve = Mt(H), Ba = K, Cr = Mt(q), rt = Mt(v), zt = Mt(X), Dr = Mt(Ee), Ua = re, za = ae, k = new Ba.Logger("Chrome67"), Tr = { OS: 1024, MIS: 1024 };
class Vs extends Ua.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Vs();
  }
  constructor() {
    super(), this._sendStream = new MediaStream(), this._mapSendLocalIdRtpSender = /* @__PURE__ */ new Map(), this._nextSendLocalId = 0, this._mapRecvLocalIdInfo = /* @__PURE__ */ new Map(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Chrome67";
  }
  close() {
    if (k.debug("close()"), this._pc)
      try {
        this._pc.close();
      } catch {
      }
    this.emit("@close");
  }
  async getNativeRtpCapabilities() {
    k.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "plan-b"
    });
    try {
      const t = await e.createOffer({
        offerToReceiveAudio: !0,
        offerToReceiveVideo: !0
      });
      try {
        e.close();
      } catch {
      }
      const s = ve.parse(t.sdp);
      return zt.extractRtpCapabilities({ sdpObject: s });
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return k.debug("getNativeSctpCapabilities()"), {
      numStreams: Tr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    k.debug("run()"), this._direction = e, this._remoteSdp = new za.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n,
      planB: !0
    }), this._sendingRtpParametersByKind = {
      audio: rt.getSendingRtpParameters("audio", c),
      video: rt.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: rt.getSendingRemoteRtpParameters("audio", c),
      video: rt.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "plan-b",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (k.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  async updateIceServers(e) {
    k.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (k.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        k.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        k.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        k.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        k.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertSendDirection(), k.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), r && k.warn("send() | codec selection is not available in %s handler", this.name), this._sendStream.addTrack(e), this._pc.addTrack(e, this._sendStream);
    let n = await this._pc.createOffer(), a = ve.parse(n.sdp), o;
    const d = Cr.clone(this._sendingRtpParametersByKind[e.kind]);
    d.codecs = rt.reduceCodecs(d.codecs);
    const p = Cr.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    if (p.codecs = rt.reduceCodecs(p.codecs), this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), e.kind === "video" && t && t.length > 1 && (k.debug("send() | enabling simulcast"), a = ve.parse(n.sdp), o = a.media.find((h) => h.type === "video"), Dr.addLegacySimulcast({
      offerMediaObject: o,
      track: e,
      numStreams: t.length
    }), n = { type: "offer", sdp: ve.write(a) }), k.debug("send() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n), a = ve.parse(this._pc.localDescription.sdp), o = a.media.find((h) => h.type === e.kind), d.rtcp.cname = zt.getCname({ offerMediaObject: o }), d.encodings = Dr.getRtpEncodings({ offerMediaObject: o, track: e }), t)
      for (let h = 0; h < d.encodings.length; ++h)
        t[h] && Object.assign(d.encodings[h], t[h]);
    if (d.encodings.length > 1 && d.codecs[0].mimeType.toLowerCase() === "video/vp8")
      for (const h of d.encodings)
        h.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: o,
      offerRtpParameters: d,
      answerRtpParameters: p,
      codecOptions: s
    });
    const c = { type: "answer", sdp: this._remoteSdp.getSdp() };
    k.debug("send() | calling pc.setRemoteDescription() [answer:%o]", c), await this._pc.setRemoteDescription(c);
    const u = String(this._nextSendLocalId);
    this._nextSendLocalId++;
    const l = this._pc.getSenders().find((h) => h.track === e);
    return this._mapSendLocalIdRtpSender.set(u, l), {
      localId: u,
      rtpParameters: d,
      rtpSender: l
    };
  }
  async stopSending(e) {
    this.assertSendDirection(), k.debug("stopSending() [localId:%s]", e);
    const t = this._mapSendLocalIdRtpSender.get(e);
    if (!t)
      throw new Error("associated RTCRtpSender not found");
    this._pc.removeTrack(t), t.track && this._sendStream.removeTrack(t.track), this._mapSendLocalIdRtpSender.delete(e);
    const s = await this._pc.createOffer();
    k.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", s);
    try {
      await this._pc.setLocalDescription(s);
    } catch (n) {
      if (this._sendStream.getTracks().length === 0) {
        k.warn("stopSending() | ignoring expected error due no sending tracks: %s", n.toString());
        return;
      }
      throw n;
    }
    if (this._pc.signalingState === "stable")
      return;
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    k.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
  }
  async replaceTrack(e, t) {
    this.assertSendDirection(), t ? k.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : k.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapSendLocalIdRtpSender.get(e);
    if (!s)
      throw new Error("associated RTCRtpSender not found");
    const r = s.track;
    await s.replaceTrack(t), r && this._sendStream.removeTrack(r), t && this._sendStream.addTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertSendDirection(), k.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapSendLocalIdRtpSender.get(e);
    if (!s)
      throw new Error("associated RTCRtpSender not found");
    const r = s.getParameters();
    r.encodings.forEach((n, a) => {
      a <= t ? n.active = !0 : n.active = !1;
    }), await s.setParameters(r);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertSendDirection(), k.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapSendLocalIdRtpSender.get(e);
    if (!s)
      throw new Error("associated RTCRtpSender not found");
    const r = s.getParameters();
    r.encodings.forEach((n, a) => {
      r.encodings[a] = { ...n, ...t };
    }), await s.setParameters(r);
  }
  async getSenderStats(e) {
    this.assertSendDirection();
    const t = this._mapSendLocalIdRtpSender.get(e);
    if (!t)
      throw new Error("associated RTCRtpSender not found");
    return t.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmitTime: t,
      maxRetransmits: s,
      protocol: n
    };
    k.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % Tr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = ve.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), k.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      k.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertRecvDirection();
    const t = [];
    for (const a of e) {
      const { trackId: o, kind: d, rtpParameters: p, streamId: c } = a;
      k.debug("receive() [trackId:%s, kind:%s]", o, d);
      const u = d;
      this._remoteSdp.receive({
        mid: u,
        kind: d,
        offerRtpParameters: p,
        streamId: c || p.rtcp.cname,
        trackId: o
      });
    }
    const s = { type: "offer", sdp: this._remoteSdp.getSdp() };
    k.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", s), await this._pc.setRemoteDescription(s);
    let r = await this._pc.createAnswer();
    const n = ve.parse(r.sdp);
    for (const a of e) {
      const { kind: o, rtpParameters: d } = a, p = o, c = n.media.find((u) => String(u.mid) === p);
      zt.applyCodecParameters({
        offerRtpParameters: d,
        answerMediaObject: c
      });
    }
    r = { type: "answer", sdp: ve.write(n) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: n
    }), k.debug("receive() | calling pc.setLocalDescription() [answer:%o]", r), await this._pc.setLocalDescription(r);
    for (const a of e) {
      const { kind: o, trackId: d, rtpParameters: p } = a, c = d, u = o, l = this._pc.getReceivers().find((h) => h.track && h.track.id === c);
      if (!l)
        throw new Error("new RTCRtpReceiver not");
      this._mapRecvLocalIdInfo.set(c, { mid: u, rtpParameters: p, rtpReceiver: l }), t.push({
        localId: c,
        track: l.track,
        rtpReceiver: l
      });
    }
    return t;
  }
  async stopReceiving(e) {
    this.assertRecvDirection();
    for (const r of e) {
      k.debug("stopReceiving() [localId:%s]", r);
      const { mid: n, rtpParameters: a } = this._mapRecvLocalIdInfo.get(r) || {};
      this._mapRecvLocalIdInfo.delete(r), this._remoteSdp.planBStopReceiving({ mid: n, offerRtpParameters: a });
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    k.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    k.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async pauseReceiving(e) {
  }
  async resumeReceiving(e) {
  }
  async getReceiverStats(e) {
    this.assertRecvDirection();
    const { rtpReceiver: t } = this._mapRecvLocalIdInfo.get(e) || {};
    if (!t)
      throw new Error("associated RTCRtpReceiver not found");
    return t.getStats();
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmitTime: a,
      maxRetransmits: o,
      protocol: s
    };
    k.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: !0 });
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      k.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = ve.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      k.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = ve.parse(this._pc.localDescription.sdp));
    const s = zt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
ns.Chrome67 = Vs;
var as = {}, Va = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Ga = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), kt = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Va(e, i, t);
  return Ga(e, i), e;
};
Object.defineProperty(as, "__esModule", { value: !0 });
as.Chrome55 = void 0;
const Se = kt(H), Ka = K, bt = ee, Pr = kt(q), it = kt(v), Vt = kt(X), Er = kt(Ee), qa = re, Ha = ae, $ = new Ka.Logger("Chrome55"), Lr = { OS: 1024, MIS: 1024 };
class Gs extends qa.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Gs();
  }
  constructor() {
    super(), this._sendStream = new MediaStream(), this._mapSendLocalIdTrack = /* @__PURE__ */ new Map(), this._nextSendLocalId = 0, this._mapRecvLocalIdInfo = /* @__PURE__ */ new Map(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Chrome55";
  }
  close() {
    if ($.debug("close()"), this._pc)
      try {
        this._pc.close();
      } catch {
      }
    this.emit("@close");
  }
  async getNativeRtpCapabilities() {
    $.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "plan-b"
    });
    try {
      const t = await e.createOffer({
        offerToReceiveAudio: !0,
        offerToReceiveVideo: !0
      });
      try {
        e.close();
      } catch {
      }
      const s = Se.parse(t.sdp);
      return Vt.extractRtpCapabilities({ sdpObject: s });
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return $.debug("getNativeSctpCapabilities()"), {
      numStreams: Lr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    $.debug("run()"), this._direction = e, this._remoteSdp = new Ha.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n,
      planB: !0
    }), this._sendingRtpParametersByKind = {
      audio: it.getSendingRtpParameters("audio", c),
      video: it.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: it.getSendingRemoteRtpParameters("audio", c),
      video: it.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "plan-b",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch ($.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  async updateIceServers(e) {
    $.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if ($.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        $.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        $.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        $.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        $.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertSendDirection(), $.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), r && $.warn("send() | codec selection is not available in %s handler", this.name), this._sendStream.addTrack(e), this._pc.addStream(this._sendStream);
    let n = await this._pc.createOffer(), a = Se.parse(n.sdp), o;
    const d = Pr.clone(this._sendingRtpParametersByKind[e.kind]);
    d.codecs = it.reduceCodecs(d.codecs);
    const p = Pr.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    if (p.codecs = it.reduceCodecs(p.codecs), this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), e.kind === "video" && t && t.length > 1 && ($.debug("send() | enabling simulcast"), a = Se.parse(n.sdp), o = a.media.find((l) => l.type === "video"), Er.addLegacySimulcast({
      offerMediaObject: o,
      track: e,
      numStreams: t.length
    }), n = { type: "offer", sdp: Se.write(a) }), $.debug("send() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n), a = Se.parse(this._pc.localDescription.sdp), o = a.media.find((l) => l.type === e.kind), d.rtcp.cname = Vt.getCname({ offerMediaObject: o }), d.encodings = Er.getRtpEncodings({ offerMediaObject: o, track: e }), t)
      for (let l = 0; l < d.encodings.length; ++l)
        t[l] && Object.assign(d.encodings[l], t[l]);
    if (d.encodings.length > 1 && d.codecs[0].mimeType.toLowerCase() === "video/vp8")
      for (const l of d.encodings)
        l.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: o,
      offerRtpParameters: d,
      answerRtpParameters: p,
      codecOptions: s
    });
    const c = { type: "answer", sdp: this._remoteSdp.getSdp() };
    $.debug("send() | calling pc.setRemoteDescription() [answer:%o]", c), await this._pc.setRemoteDescription(c);
    const u = String(this._nextSendLocalId);
    return this._nextSendLocalId++, this._mapSendLocalIdTrack.set(u, e), {
      localId: u,
      rtpParameters: d
    };
  }
  async stopSending(e) {
    this.assertSendDirection(), $.debug("stopSending() [localId:%s]", e);
    const t = this._mapSendLocalIdTrack.get(e);
    if (!t)
      throw new Error("track not found");
    this._mapSendLocalIdTrack.delete(e), this._sendStream.removeTrack(t), this._pc.addStream(this._sendStream);
    const s = await this._pc.createOffer();
    $.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", s);
    try {
      await this._pc.setLocalDescription(s);
    } catch (n) {
      if (this._sendStream.getTracks().length === 0) {
        $.warn("stopSending() | ignoring expected error due no sending tracks: %s", n.toString());
        return;
      }
      throw n;
    }
    if (this._pc.signalingState === "stable")
      return;
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    $.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
  }
  async replaceTrack(e, t) {
    throw new bt.UnsupportedError("not implemented");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setMaxSpatialLayer(e, t) {
    throw new bt.UnsupportedError(" not implemented");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setRtpEncodingParameters(e, t) {
    throw new bt.UnsupportedError("not supported");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSenderStats(e) {
    throw new bt.UnsupportedError("not implemented");
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmitTime: t,
      maxRetransmits: s,
      protocol: n
    };
    $.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % Lr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = Se.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), $.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      $.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertRecvDirection();
    const t = [];
    for (const a of e) {
      const { trackId: o, kind: d, rtpParameters: p, streamId: c } = a;
      $.debug("receive() [trackId:%s, kind:%s]", o, d);
      const u = d;
      this._remoteSdp.receive({
        mid: u,
        kind: d,
        offerRtpParameters: p,
        streamId: c || p.rtcp.cname,
        trackId: o
      });
    }
    const s = { type: "offer", sdp: this._remoteSdp.getSdp() };
    $.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", s), await this._pc.setRemoteDescription(s);
    let r = await this._pc.createAnswer();
    const n = Se.parse(r.sdp);
    for (const a of e) {
      const { kind: o, rtpParameters: d } = a, p = o, c = n.media.find((u) => String(u.mid) === p);
      Vt.applyCodecParameters({
        offerRtpParameters: d,
        answerMediaObject: c
      });
    }
    r = { type: "answer", sdp: Se.write(n) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: n
    }), $.debug("receive() | calling pc.setLocalDescription() [answer:%o]", r), await this._pc.setLocalDescription(r);
    for (const a of e) {
      const { kind: o, trackId: d, rtpParameters: p } = a, c = o, u = d, l = a.streamId || p.rtcp.cname, f = this._pc.getRemoteStreams().find((g) => g.id === l).getTrackById(u);
      if (!f)
        throw new Error("remote track not found");
      this._mapRecvLocalIdInfo.set(u, { mid: c, rtpParameters: p }), t.push({ localId: u, track: f });
    }
    return t;
  }
  async stopReceiving(e) {
    this.assertRecvDirection();
    for (const r of e) {
      $.debug("stopReceiving() [localId:%s]", r);
      const { mid: n, rtpParameters: a } = this._mapRecvLocalIdInfo.get(r) || {};
      this._mapRecvLocalIdInfo.delete(r), this._remoteSdp.planBStopReceiving({ mid: n, offerRtpParameters: a });
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    $.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    $.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async pauseReceiving(e) {
  }
  async resumeReceiving(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getReceiverStats(e) {
    throw new bt.UnsupportedError("not implemented");
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmitTime: a,
      maxRetransmits: o,
      protocol: s
    };
    $.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: !0 });
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      $.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = Se.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      $.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = Se.parse(this._pc.localDescription.sdp));
    const s = Vt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
as.Chrome55 = Gs;
var os = {}, Wa = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Qa = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), xt = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Wa(e, i, t);
  return Qa(e, i), e;
};
Object.defineProperty(os, "__esModule", { value: !0 });
os.Firefox60 = void 0;
const je = xt(H), Ya = K, Ir = ee, Ds = xt(q), nt = xt(v), Gt = xt(X), Mr = xt(pe), Za = re, Ja = ae, Xa = Te, T = new Ya.Logger("Firefox60"), kr = { OS: 16, MIS: 2048 };
class Ks extends Za.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Ks();
  }
  constructor() {
    super(), this._closed = !1, this._mapMidTransceiver = /* @__PURE__ */ new Map(), this._sendStream = new MediaStream(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Firefox60";
  }
  close() {
    if (T.debug("close()"), !this._closed) {
      if (this._closed = !0, this._pc)
        try {
          this._pc.close();
        } catch {
        }
      this.emit("@close");
    }
  }
  async getNativeRtpCapabilities() {
    T.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require"
    }), t = document.createElement("canvas");
    t.getContext("2d");
    const r = t.captureStream().getVideoTracks()[0];
    try {
      e.addTransceiver("audio", { direction: "sendrecv" });
      const n = e.addTransceiver(r, { direction: "sendrecv" }), a = n.sender.getParameters(), o = [
        { rid: "r0", maxBitrate: 1e5 },
        { rid: "r1", maxBitrate: 5e5 }
      ];
      a.encodings = o, await n.sender.setParameters(a);
      const d = await e.createOffer();
      try {
        t.remove();
      } catch {
      }
      try {
        r.stop();
      } catch {
      }
      try {
        e.close();
      } catch {
      }
      const p = je.parse(d.sdp);
      return Gt.extractRtpCapabilities({ sdpObject: p });
    } catch (n) {
      try {
        t.remove();
      } catch {
      }
      try {
        r.stop();
      } catch {
      }
      try {
        e.close();
      } catch {
      }
      throw n;
    }
  }
  async getNativeSctpCapabilities() {
    return T.debug("getNativeSctpCapabilities()"), {
      numStreams: kr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    this.assertNotClosed(), T.debug("run()"), this._direction = e, this._remoteSdp = new Ja.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n
    }), this._sendingRtpParametersByKind = {
      audio: nt.getSendingRtpParameters("audio", c),
      video: nt.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: nt.getSendingRemoteRtpParameters("audio", c),
      video: nt.getSendingRemoteRtpParameters("video", c)
    }, this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (T.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateIceServers(e) {
    throw this.assertNotClosed(), new Ir.UnsupportedError("not supported");
  }
  async restartIce(e) {
    if (this.assertNotClosed(), T.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        T.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        T.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        T.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        T.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this.assertNotClosed(), this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertNotClosed(), this.assertSendDirection(), T.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), t && (t = Ds.clone(t), t.length > 1 && (t.forEach((f, g) => {
      f.rid = `r${g}`;
    }), t.reverse()));
    const n = Ds.clone(this._sendingRtpParametersByKind[e.kind]);
    n.codecs = nt.reduceCodecs(n.codecs, r);
    const a = Ds.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    a.codecs = nt.reduceCodecs(a.codecs, r);
    const o = this._pc.addTransceiver(e, { direction: "sendonly", streams: [this._sendStream] });
    if (t) {
      const f = o.sender.getParameters();
      f.encodings = t, await o.sender.setParameters(f);
    }
    const d = await this._pc.createOffer();
    let p = je.parse(d.sdp);
    this._transportReady || await this.setupTransport({ localDtlsRole: "client", localSdpObject: p });
    const c = (0, Xa.parse)((t || [{}])[0].scalabilityMode);
    T.debug("send() | calling pc.setLocalDescription() [offer:%o]", d), await this._pc.setLocalDescription(d);
    const u = o.mid;
    n.mid = u, p = je.parse(this._pc.localDescription.sdp);
    const l = p.media[p.media.length - 1];
    if (n.rtcp.cname = Gt.getCname({ offerMediaObject: l }), !t)
      n.encodings = Mr.getRtpEncodings({ offerMediaObject: l });
    else if (t.length === 1) {
      const f = Mr.getRtpEncodings({ offerMediaObject: l });
      Object.assign(f[0], t[0]), n.encodings = f;
    } else
      n.encodings = t.reverse();
    if (n.encodings.length > 1 && (n.codecs[0].mimeType.toLowerCase() === "video/vp8" || n.codecs[0].mimeType.toLowerCase() === "video/h264"))
      for (const f of n.encodings)
        f.scalabilityMode ? f.scalabilityMode = `L1T${c.temporalLayers}` : f.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: l,
      offerRtpParameters: n,
      answerRtpParameters: a,
      codecOptions: s,
      extmapAllowMixed: !0
    });
    const h = { type: "answer", sdp: this._remoteSdp.getSdp() };
    return T.debug("send() | calling pc.setRemoteDescription() [answer:%o]", h), await this._pc.setRemoteDescription(h), this._mapMidTransceiver.set(u, o), {
      localId: u,
      rtpParameters: n,
      rtpSender: o.sender
    };
  }
  async stopSending(e) {
    if (this.assertSendDirection(), T.debug("stopSending() [localId:%s]", e), this._closed)
      return;
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated transceiver not found");
    t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.disableMediaSection(t.mid);
    const s = await this._pc.createOffer();
    T.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    T.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r), this._mapMidTransceiver.delete(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), T.debug("pauseSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
    const s = await this._pc.createOffer();
    T.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    T.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), T.debug("resumeSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "sendonly", this._remoteSdp.resumeSendingMediaSection(e);
    const s = await this._pc.createOffer();
    T.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    T.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async replaceTrack(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), t ? T.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : T.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    await s.sender.replaceTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), T.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated transceiver not found");
    const r = s.sender.getParameters();
    t = r.encodings.length - 1 - t, r.encodings.forEach((o, d) => {
      d >= t ? o.active = !0 : o.active = !1;
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    T.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    T.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), T.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      r.encodings[d] = { ...o, ...t };
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    T.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    T.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async getSenderStats(e) {
    this.assertNotClosed(), this.assertSendDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.sender.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertNotClosed(), this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmits: s,
      protocol: n
    };
    T.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % kr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = je.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({ localDtlsRole: "client", localSdpObject: c }), T.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      T.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = [], s = /* @__PURE__ */ new Map();
    for (const o of e) {
      const { trackId: d, kind: p, rtpParameters: c, streamId: u } = o;
      T.debug("receive() [trackId:%s, kind:%s]", d, p);
      const l = c.mid || String(this._mapMidTransceiver.size);
      s.set(d, l), this._remoteSdp.receive({
        mid: l,
        kind: p,
        offerRtpParameters: c,
        streamId: u || c.rtcp.cname,
        trackId: d
      });
    }
    const r = { type: "offer", sdp: this._remoteSdp.getSdp() };
    T.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", r), await this._pc.setRemoteDescription(r);
    let n = await this._pc.createAnswer();
    const a = je.parse(n.sdp);
    for (const o of e) {
      const { trackId: d, rtpParameters: p } = o, c = s.get(d), u = a.media.find((l) => String(l.mid) === c);
      Gt.applyCodecParameters({
        offerRtpParameters: p,
        answerMediaObject: u
      }), n = { type: "answer", sdp: je.write(a) };
    }
    this._transportReady || await this.setupTransport({ localDtlsRole: "client", localSdpObject: a }), T.debug("receive() | calling pc.setLocalDescription() [answer:%o]", n), await this._pc.setLocalDescription(n);
    for (const o of e) {
      const { trackId: d } = o, p = s.get(d), c = this._pc.getTransceivers().find((u) => u.mid === p);
      if (!c)
        throw new Error("new RTCRtpTransceiver not found");
      this._mapMidTransceiver.set(p, c), t.push({
        localId: p,
        track: c.receiver.track,
        rtpReceiver: c.receiver
      });
    }
    return t;
  }
  async stopReceiving(e) {
    if (this.assertRecvDirection(), this._closed)
      return;
    for (const r of e) {
      T.debug("stopReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      this._remoteSdp.closeMediaSection(n.mid);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    T.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    T.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    for (const r of e)
      this._mapMidTransceiver.delete(r);
  }
  async pauseReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      T.debug("pauseReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "inactive", this._remoteSdp.pauseMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    T.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    T.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async resumeReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      T.debug("resumeReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    T.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    T.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async getReceiverStats(e) {
    this.assertRecvDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.receiver.getStats();
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertNotClosed(), this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmits: o,
      protocol: s
    };
    T.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation();
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      T.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = je.parse(u.sdp);
        await this.setupTransport({ localDtlsRole: "client", localSdpObject: l });
      }
      T.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = je.parse(this._pc.localDescription.sdp));
    const s = Gt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertNotClosed() {
    if (this._closed)
      throw new Ir.InvalidStateError("method called in a closed handler");
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
os.Firefox60 = Ks;
var cs = {}, eo = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), to = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), mt = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && eo(e, i, t);
  return to(e, i), e;
};
Object.defineProperty(cs, "__esModule", { value: !0 });
cs.Safari12 = void 0;
const be = mt(H), so = K, xr = mt(q), at = mt(v), Kt = mt(X), Or = mt(pe), ro = mt(Ge), io = ee, no = re, ao = ae, oo = Te, C = new so.Logger("Safari12"), jr = { OS: 1024, MIS: 1024 };
class qs extends no.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new qs();
  }
  constructor() {
    super(), this._closed = !1, this._mapMidTransceiver = /* @__PURE__ */ new Map(), this._sendStream = new MediaStream(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Safari12";
  }
  close() {
    if (C.debug("close()"), !this._closed) {
      if (this._closed = !0, this._pc)
        try {
          this._pc.close();
        } catch {
        }
      this.emit("@close");
    }
  }
  async getNativeRtpCapabilities() {
    C.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require"
    });
    try {
      e.addTransceiver("audio"), e.addTransceiver("video");
      const t = await e.createOffer();
      try {
        e.close();
      } catch {
      }
      const s = be.parse(t.sdp), r = Kt.extractRtpCapabilities({ sdpObject: s });
      return ro.addNackSuppportForOpus(r), r;
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return C.debug("getNativeSctpCapabilities()"), {
      numStreams: jr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    this.assertNotClosed(), C.debug("run()"), this._direction = e, this._remoteSdp = new ao.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n
    }), this._sendingRtpParametersByKind = {
      audio: at.getSendingRtpParameters("audio", c),
      video: at.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: at.getSendingRemoteRtpParameters("audio", c),
      video: at.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (C.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  async updateIceServers(e) {
    this.assertNotClosed(), C.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (this.assertNotClosed(), C.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        C.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        C.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        C.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        C.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this.assertNotClosed(), this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertNotClosed(), this.assertSendDirection(), C.debug("send() [kind:%s, track.id:%s]", e.kind, e.id);
    const n = xr.clone(this._sendingRtpParametersByKind[e.kind]);
    n.codecs = at.reduceCodecs(n.codecs, r);
    const a = xr.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    a.codecs = at.reduceCodecs(a.codecs, r);
    const o = this._remoteSdp.getNextMediaSectionIdx(), d = this._pc.addTransceiver(e, { direction: "sendonly", streams: [this._sendStream] });
    let p = await this._pc.createOffer(), c = be.parse(p.sdp), u;
    this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: c
    });
    const l = (0, oo.parse)((t || [{}])[0].scalabilityMode);
    t && t.length > 1 && (C.debug("send() | enabling legacy simulcast"), c = be.parse(p.sdp), u = c.media[o.idx], Or.addLegacySimulcast({
      offerMediaObject: u,
      numStreams: t.length
    }), p = { type: "offer", sdp: be.write(c) }), C.debug("send() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p);
    const h = d.mid;
    if (n.mid = h, c = be.parse(this._pc.localDescription.sdp), u = c.media[o.idx], n.rtcp.cname = Kt.getCname({ offerMediaObject: u }), n.encodings = Or.getRtpEncodings({ offerMediaObject: u }), t)
      for (let g = 0; g < n.encodings.length; ++g)
        t[g] && Object.assign(n.encodings[g], t[g]);
    if (n.encodings.length > 1 && (n.codecs[0].mimeType.toLowerCase() === "video/vp8" || n.codecs[0].mimeType.toLowerCase() === "video/h264"))
      for (const g of n.encodings)
        g.scalabilityMode ? g.scalabilityMode = `L1T${l.temporalLayers}` : g.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: u,
      reuseMid: o.reuseMid,
      offerRtpParameters: n,
      answerRtpParameters: a,
      codecOptions: s
    });
    const f = { type: "answer", sdp: this._remoteSdp.getSdp() };
    return C.debug("send() | calling pc.setRemoteDescription() [answer:%o]", f), await this._pc.setRemoteDescription(f), this._mapMidTransceiver.set(h, d), {
      localId: h,
      rtpParameters: n,
      rtpSender: d.sender
    };
  }
  async stopSending(e) {
    if (this.assertSendDirection(), this._closed)
      return;
    C.debug("stopSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
      try {
        t.stop();
      } catch {
      }
    const r = await this._pc.createOffer();
    C.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", r), await this._pc.setLocalDescription(r);
    const n = { type: "answer", sdp: this._remoteSdp.getSdp() };
    C.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", n), await this._pc.setRemoteDescription(n), this._mapMidTransceiver.delete(e);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), C.debug("pauseSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
    const s = await this._pc.createOffer();
    C.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    C.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), C.debug("resumeSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "sendonly", this._remoteSdp.resumeSendingMediaSection(e);
    const s = await this._pc.createOffer();
    C.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    C.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async replaceTrack(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), t ? C.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : C.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    await s.sender.replaceTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), C.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      d <= t ? o.active = !0 : o.active = !1;
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    C.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    C.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), C.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      r.encodings[d] = { ...o, ...t };
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    C.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    C.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async getSenderStats(e) {
    this.assertNotClosed(), this.assertSendDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.sender.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertNotClosed(), this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmits: s,
      protocol: n
    };
    C.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % jr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = be.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), C.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      C.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = [], s = /* @__PURE__ */ new Map();
    for (const o of e) {
      const { trackId: d, kind: p, rtpParameters: c, streamId: u } = o;
      C.debug("receive() [trackId:%s, kind:%s]", d, p);
      const l = c.mid || String(this._mapMidTransceiver.size);
      s.set(d, l), this._remoteSdp.receive({
        mid: l,
        kind: p,
        offerRtpParameters: c,
        streamId: u || c.rtcp.cname,
        trackId: d
      });
    }
    const r = { type: "offer", sdp: this._remoteSdp.getSdp() };
    C.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", r), await this._pc.setRemoteDescription(r);
    let n = await this._pc.createAnswer();
    const a = be.parse(n.sdp);
    for (const o of e) {
      const { trackId: d, rtpParameters: p } = o, c = s.get(d), u = a.media.find((l) => String(l.mid) === c);
      Kt.applyCodecParameters({
        offerRtpParameters: p,
        answerMediaObject: u
      });
    }
    n = { type: "answer", sdp: be.write(a) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), C.debug("receive() | calling pc.setLocalDescription() [answer:%o]", n), await this._pc.setLocalDescription(n);
    for (const o of e) {
      const { trackId: d } = o, p = s.get(d), c = this._pc.getTransceivers().find((u) => u.mid === p);
      if (!c)
        throw new Error("new RTCRtpTransceiver not found");
      this._mapMidTransceiver.set(p, c), t.push({
        localId: p,
        track: c.receiver.track,
        rtpReceiver: c.receiver
      });
    }
    return t;
  }
  async stopReceiving(e) {
    if (this.assertRecvDirection(), this._closed)
      return;
    for (const r of e) {
      C.debug("stopReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      this._remoteSdp.closeMediaSection(n.mid);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    C.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    C.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    for (const r of e)
      this._mapMidTransceiver.delete(r);
  }
  async pauseReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      C.debug("pauseReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "inactive", this._remoteSdp.pauseMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    C.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    C.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async resumeReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      C.debug("resumeReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    C.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    C.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async getReceiverStats(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.receiver.getStats();
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertNotClosed(), this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmits: o,
      protocol: s
    };
    C.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation();
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      C.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = be.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      C.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = be.parse(this._pc.localDescription.sdp));
    const s = Kt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertNotClosed() {
    if (this._closed)
      throw new io.InvalidStateError("method called in a closed handler");
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
cs.Safari12 = qs;
var ds = {}, co = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), po = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), Ot = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && co(e, i, t);
  return po(e, i), e;
};
Object.defineProperty(ds, "__esModule", { value: !0 });
ds.Safari11 = void 0;
const ye = Ot(H), lo = K, $r = Ot(q), ot = Ot(v), qt = Ot(X), Ar = Ot(Ee), uo = re, ho = ae, O = new lo.Logger("Safari11"), Nr = { OS: 1024, MIS: 1024 };
class Hs extends uo.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Hs();
  }
  constructor() {
    super(), this._sendStream = new MediaStream(), this._mapSendLocalIdRtpSender = /* @__PURE__ */ new Map(), this._nextSendLocalId = 0, this._mapRecvLocalIdInfo = /* @__PURE__ */ new Map(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "Safari11";
  }
  close() {
    if (O.debug("close()"), this._pc)
      try {
        this._pc.close();
      } catch {
      }
    this.emit("@close");
  }
  async getNativeRtpCapabilities() {
    O.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "plan-b"
    });
    try {
      const t = await e.createOffer({
        offerToReceiveAudio: !0,
        offerToReceiveVideo: !0
      });
      try {
        e.close();
      } catch {
      }
      const s = ye.parse(t.sdp);
      return qt.extractRtpCapabilities({ sdpObject: s });
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return O.debug("getNativeSctpCapabilities()"), {
      numStreams: Nr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    O.debug("run()"), this._direction = e, this._remoteSdp = new ho.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n,
      planB: !0
    }), this._sendingRtpParametersByKind = {
      audio: ot.getSendingRtpParameters("audio", c),
      video: ot.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: ot.getSendingRemoteRtpParameters("audio", c),
      video: ot.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (O.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  async updateIceServers(e) {
    O.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (O.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        O.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        O.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        O.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        O.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertSendDirection(), O.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), r && O.warn("send() | codec selection is not available in %s handler", this.name), this._sendStream.addTrack(e), this._pc.addTrack(e, this._sendStream);
    let n = await this._pc.createOffer(), a = ye.parse(n.sdp), o;
    const d = $r.clone(this._sendingRtpParametersByKind[e.kind]);
    d.codecs = ot.reduceCodecs(d.codecs);
    const p = $r.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    if (p.codecs = ot.reduceCodecs(p.codecs), this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), e.kind === "video" && t && t.length > 1 && (O.debug("send() | enabling simulcast"), a = ye.parse(n.sdp), o = a.media.find((h) => h.type === "video"), Ar.addLegacySimulcast({
      offerMediaObject: o,
      track: e,
      numStreams: t.length
    }), n = { type: "offer", sdp: ye.write(a) }), O.debug("send() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n), a = ye.parse(this._pc.localDescription.sdp), o = a.media.find((h) => h.type === e.kind), d.rtcp.cname = qt.getCname({ offerMediaObject: o }), d.encodings = Ar.getRtpEncodings({ offerMediaObject: o, track: e }), t)
      for (let h = 0; h < d.encodings.length; ++h)
        t[h] && Object.assign(d.encodings[h], t[h]);
    if (d.encodings.length > 1 && d.codecs[0].mimeType.toLowerCase() === "video/vp8")
      for (const h of d.encodings)
        h.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: o,
      offerRtpParameters: d,
      answerRtpParameters: p,
      codecOptions: s
    });
    const c = { type: "answer", sdp: this._remoteSdp.getSdp() };
    O.debug("send() | calling pc.setRemoteDescription() [answer:%o]", c), await this._pc.setRemoteDescription(c);
    const u = String(this._nextSendLocalId);
    this._nextSendLocalId++;
    const l = this._pc.getSenders().find((h) => h.track === e);
    return this._mapSendLocalIdRtpSender.set(u, l), {
      localId: u,
      rtpParameters: d,
      rtpSender: l
    };
  }
  async stopSending(e) {
    this.assertSendDirection();
    const t = this._mapSendLocalIdRtpSender.get(e);
    if (!t)
      throw new Error("associated RTCRtpSender not found");
    t.track && this._sendStream.removeTrack(t.track), this._mapSendLocalIdRtpSender.delete(e);
    const s = await this._pc.createOffer();
    O.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", s);
    try {
      await this._pc.setLocalDescription(s);
    } catch (n) {
      if (this._sendStream.getTracks().length === 0) {
        O.warn("stopSending() | ignoring expected error due no sending tracks: %s", n.toString());
        return;
      }
      throw n;
    }
    if (this._pc.signalingState === "stable")
      return;
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    O.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
  }
  async replaceTrack(e, t) {
    this.assertSendDirection(), t ? O.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : O.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapSendLocalIdRtpSender.get(e);
    if (!s)
      throw new Error("associated RTCRtpSender not found");
    const r = s.track;
    await s.replaceTrack(t), r && this._sendStream.removeTrack(r), t && this._sendStream.addTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertSendDirection(), O.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapSendLocalIdRtpSender.get(e);
    if (!s)
      throw new Error("associated RTCRtpSender not found");
    const r = s.getParameters();
    r.encodings.forEach((n, a) => {
      a <= t ? n.active = !0 : n.active = !1;
    }), await s.setParameters(r);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertSendDirection(), O.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapSendLocalIdRtpSender.get(e);
    if (!s)
      throw new Error("associated RTCRtpSender not found");
    const r = s.getParameters();
    r.encodings.forEach((n, a) => {
      r.encodings[a] = { ...n, ...t };
    }), await s.setParameters(r);
  }
  async getSenderStats(e) {
    this.assertSendDirection();
    const t = this._mapSendLocalIdRtpSender.get(e);
    if (!t)
      throw new Error("associated RTCRtpSender not found");
    return t.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmits: s,
      protocol: n
    };
    O.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % Nr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = ye.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), O.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      O.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertRecvDirection();
    const t = [];
    for (const a of e) {
      const { trackId: o, kind: d, rtpParameters: p, streamId: c } = a;
      O.debug("receive() [trackId:%s, kind:%s]", o, d);
      const u = d;
      this._remoteSdp.receive({
        mid: u,
        kind: d,
        offerRtpParameters: p,
        streamId: c || p.rtcp.cname,
        trackId: o
      });
    }
    const s = { type: "offer", sdp: this._remoteSdp.getSdp() };
    O.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", s), await this._pc.setRemoteDescription(s);
    let r = await this._pc.createAnswer();
    const n = ye.parse(r.sdp);
    for (const a of e) {
      const { kind: o, rtpParameters: d } = a, p = o, c = n.media.find((u) => String(u.mid) === p);
      qt.applyCodecParameters({
        offerRtpParameters: d,
        answerMediaObject: c
      });
    }
    r = { type: "answer", sdp: ye.write(n) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: n
    }), O.debug("receive() | calling pc.setLocalDescription() [answer:%o]", r), await this._pc.setLocalDescription(r);
    for (const a of e) {
      const { kind: o, trackId: d, rtpParameters: p } = a, c = o, u = d, l = this._pc.getReceivers().find((h) => h.track && h.track.id === u);
      if (!l)
        throw new Error("new RTCRtpReceiver not");
      this._mapRecvLocalIdInfo.set(u, { mid: c, rtpParameters: p, rtpReceiver: l }), t.push({
        localId: u,
        track: l.track,
        rtpReceiver: l
      });
    }
    return t;
  }
  async stopReceiving(e) {
    this.assertRecvDirection();
    for (const r of e) {
      O.debug("stopReceiving() [localId:%s]", r);
      const { mid: n, rtpParameters: a } = this._mapRecvLocalIdInfo.get(r) || {};
      this._mapRecvLocalIdInfo.delete(r), this._remoteSdp.planBStopReceiving({ mid: n, offerRtpParameters: a });
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    O.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    O.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async getReceiverStats(e) {
    this.assertRecvDirection();
    const { rtpReceiver: t } = this._mapRecvLocalIdInfo.get(e) || {};
    if (!t)
      throw new Error("associated RTCRtpReceiver not found");
    return t.getStats();
  }
  async pauseReceiving(e) {
  }
  async resumeReceiving(e) {
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmits: o,
      protocol: s
    };
    O.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: !0 });
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      O.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = ye.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      O.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = ye.parse(this._pc.localDescription.sdp));
    const s = qt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
ds.Safari11 = Hs;
var ps = {}, ut = {}, fo = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), mo = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), go = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && fo(e, i, t);
  return mo(e, i), e;
};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.mangleRtpParameters = ut.getCapabilities = void 0;
const fi = go(q);
function _o() {
  const i = RTCRtpReceiver.getCapabilities(), e = fi.clone(i);
  for (const t of e.codecs ?? []) {
    if (t.channels = t.numChannels, delete t.numChannels, t.mimeType = t.mimeType || `${t.kind}/${t.name}`, t.parameters) {
      const s = t.parameters;
      s.apt && (s.apt = Number(s.apt)), s["packetization-mode"] && (s["packetization-mode"] = Number(s["packetization-mode"]));
    }
    for (const s of t.rtcpFeedback || [])
      s.parameter || (s.parameter = "");
  }
  return e;
}
ut.getCapabilities = _o;
function wo(i) {
  const e = fi.clone(i);
  e.mid && (e.muxId = e.mid, delete e.mid);
  for (const t of e.codecs)
    t.channels && (t.numChannels = t.channels, delete t.channels), t.mimeType && !t.name && (t.name = t.mimeType.split("/")[1]), delete t.mimeType;
  return e;
}
ut.mangleRtpParameters = wo;
var vo = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), So = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), Ws = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && vo(e, i, t);
  return So(e, i), e;
};
Object.defineProperty(ps, "__esModule", { value: !0 });
ps.Edge11 = void 0;
const bo = K, Ts = ee, Ht = Ws(q), Ps = Ws(v), Es = Ws(ut), yo = re, N = new bo.Logger("Edge11");
class Qs extends yo.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Qs();
  }
  constructor() {
    super(), this._rtpSenders = /* @__PURE__ */ new Map(), this._rtpReceivers = /* @__PURE__ */ new Map(), this._nextSendLocalId = 0, this._transportReady = !1;
  }
  get name() {
    return "Edge11";
  }
  close() {
    N.debug("close()");
    try {
      this._iceGatherer.close();
    } catch {
    }
    try {
      this._iceTransport.stop();
    } catch {
    }
    try {
      this._dtlsTransport.stop();
    } catch {
    }
    for (const e of this._rtpSenders.values())
      try {
        e.stop();
      } catch {
      }
    for (const e of this._rtpReceivers.values())
      try {
        e.stop();
      } catch {
      }
    this.emit("@close");
  }
  async getNativeRtpCapabilities() {
    return N.debug("getNativeRtpCapabilities()"), Es.getCapabilities();
  }
  async getNativeSctpCapabilities() {
    return N.debug("getNativeSctpCapabilities()"), {
      numStreams: { OS: 0, MIS: 0 }
    };
  }
  run({
    direction: e,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    iceParameters: t,
    iceCandidates: s,
    dtlsParameters: r,
    sctpParameters: n,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    iceServers: a,
    iceTransportPolicy: o,
    additionalSettings: d,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    proprietaryConstraints: p,
    // eslint-disable-line @typescript-eslint/no-unused-vars
    extendedRtpCapabilities: c
  }) {
    N.debug("run()"), this._sendingRtpParametersByKind = {
      audio: Ps.getSendingRtpParameters("audio", c),
      video: Ps.getSendingRtpParameters("video", c)
    }, this._remoteIceParameters = t, this._remoteIceCandidates = s, this._remoteDtlsParameters = r, this._cname = `CNAME-${Ht.generateRandomNumber()}`, this.setIceGatherer({ iceServers: a, iceTransportPolicy: o }), this.setIceTransport(), this.setDtlsTransport();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateIceServers(e) {
    throw new Ts.UnsupportedError("not supported");
  }
  async restartIce(e) {
    if (N.debug("restartIce()"), this._remoteIceParameters = e, !!this._transportReady) {
      N.debug("restartIce() | calling iceTransport.start()"), this._iceTransport.start(this._iceGatherer, e, "controlling");
      for (const t of this._remoteIceCandidates)
        this._iceTransport.addRemoteCandidate(t);
      this._iceTransport.addRemoteCandidate({});
    }
  }
  async getTransportStats() {
    return this._iceTransport.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    N.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), this._transportReady || await this.setupTransport({ localDtlsRole: "server" }), N.debug("send() | calling new RTCRtpSender()");
    const n = new RTCRtpSender(e, this._dtlsTransport), a = Ht.clone(this._sendingRtpParametersByKind[e.kind]);
    a.codecs = Ps.reduceCodecs(a.codecs, r);
    const o = a.codecs.some((c) => /.+\/rtx$/i.test(c.mimeType));
    t || (t = [{}]);
    for (const c of t)
      c.ssrc = Ht.generateRandomNumber(), o && (c.rtx = { ssrc: Ht.generateRandomNumber() });
    a.encodings = t, a.rtcp = {
      cname: this._cname,
      reducedSize: !0,
      mux: !0
    };
    const d = Es.mangleRtpParameters(a);
    N.debug("send() | calling rtpSender.send() [params:%o]", d), await n.send(d);
    const p = String(this._nextSendLocalId);
    return this._nextSendLocalId++, this._rtpSenders.set(p, n), { localId: p, rtpParameters: a, rtpSender: n };
  }
  async stopSending(e) {
    N.debug("stopSending() [localId:%s]", e);
    const t = this._rtpSenders.get(e);
    if (!t)
      throw new Error("RTCRtpSender not found");
    this._rtpSenders.delete(e);
    try {
      N.debug("stopSending() | calling rtpSender.stop()"), t.stop();
    } catch (s) {
      throw N.warn("stopSending() | rtpSender.stop() failed:%o", s), s;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
  }
  async replaceTrack(e, t) {
    t ? N.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : N.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._rtpSenders.get(e);
    if (!s)
      throw new Error("RTCRtpSender not found");
    s.setTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    N.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._rtpSenders.get(e);
    if (!s)
      throw new Error("RTCRtpSender not found");
    const r = s.getParameters();
    r.encodings.forEach((n, a) => {
      a <= t ? n.active = !0 : n.active = !1;
    }), await s.setParameters(r);
  }
  async setRtpEncodingParameters(e, t) {
    N.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._rtpSenders.get(e);
    if (!s)
      throw new Error("RTCRtpSender not found");
    const r = s.getParameters();
    r.encodings.forEach((n, a) => {
      r.encodings[a] = { ...n, ...t };
    }), await s.setParameters(r);
  }
  async getSenderStats(e) {
    const t = this._rtpSenders.get(e);
    if (!t)
      throw new Error("RTCRtpSender not found");
    return t.getStats();
  }
  async sendDataChannel(e) {
    throw new Ts.UnsupportedError("not implemented");
  }
  async receive(e) {
    const t = [];
    for (const s of e) {
      const { trackId: r, kind: n } = s;
      N.debug("receive() [trackId:%s, kind:%s]", r, n);
    }
    this._transportReady || await this.setupTransport({ localDtlsRole: "server" });
    for (const s of e) {
      const { trackId: r, kind: n, rtpParameters: a } = s;
      N.debug("receive() | calling new RTCRtpReceiver()");
      const o = new RTCRtpReceiver(this._dtlsTransport, n);
      o.addEventListener("error", (c) => {
        N.error('rtpReceiver "error" event [event:%o]', c);
      });
      const d = Es.mangleRtpParameters(a);
      N.debug("receive() | calling rtpReceiver.receive() [params:%o]", d), await o.receive(d);
      const p = r;
      this._rtpReceivers.set(p, o), t.push({
        localId: p,
        track: o.track,
        rtpReceiver: o
      });
    }
    return t;
  }
  async stopReceiving(e) {
    for (const t of e) {
      N.debug("stopReceiving() [localId:%s]", t);
      const s = this._rtpReceivers.get(t);
      if (!s)
        throw new Error("RTCRtpReceiver not found");
      this._rtpReceivers.delete(t);
      try {
        N.debug("stopReceiving() | calling rtpReceiver.stop()"), s.stop();
      } catch (r) {
        N.warn("stopReceiving() | rtpReceiver.stop() failed:%o", r);
      }
    }
  }
  async pauseReceiving(e) {
  }
  async resumeReceiving(e) {
  }
  async getReceiverStats(e) {
    const t = this._rtpReceivers.get(e);
    if (!t)
      throw new Error("RTCRtpReceiver not found");
    return t.getStats();
  }
  async receiveDataChannel(e) {
    throw new Ts.UnsupportedError("not implemented");
  }
  setIceGatherer({ iceServers: e, iceTransportPolicy: t }) {
    const s = new RTCIceGatherer({
      iceServers: e || [],
      gatherPolicy: t || "all"
    });
    s.addEventListener("error", (r) => {
      N.error('iceGatherer "error" event [event:%o]', r);
    });
    try {
      s.gather();
    } catch (r) {
      N.debug("setIceGatherer() | iceGatherer.gather() failed: %s", r.toString());
    }
    this._iceGatherer = s;
  }
  setIceTransport() {
    const e = new RTCIceTransport(this._iceGatherer);
    e.addEventListener("statechange", () => {
      switch (e.state) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    }), e.addEventListener("icestatechange", () => {
      switch (e.state) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    }), e.addEventListener("candidatepairchange", (t) => {
      N.debug('iceTransport "candidatepairchange" event [pair:%o]', t.pair);
    }), this._iceTransport = e;
  }
  setDtlsTransport() {
    const e = new RTCDtlsTransport(this._iceTransport);
    e.addEventListener("statechange", () => {
      N.debug('dtlsTransport "statechange" event [state:%s]', e.state);
    }), e.addEventListener("dtlsstatechange", () => {
      N.debug('dtlsTransport "dtlsstatechange" event [state:%s]', e.state), e.state === "closed" && this.emit("@connectionstatechange", "closed");
    }), e.addEventListener("error", (t) => {
      N.error('dtlsTransport "error" event [event:%o]', t);
    }), this._dtlsTransport = e;
  }
  async setupTransport({ localDtlsRole: e }) {
    N.debug("setupTransport()");
    const t = this._dtlsTransport.getLocalParameters();
    t.role = e, await new Promise((s, r) => {
      this.safeEmit("@connect", { dtlsParameters: t }, s, r);
    }), this._iceTransport.start(this._iceGatherer, this._remoteIceParameters, "controlling");
    for (const s of this._remoteIceCandidates)
      this._iceTransport.addRemoteCandidate(s);
    this._iceTransport.addRemoteCandidate({}), this._remoteDtlsParameters.fingerprints = this._remoteDtlsParameters.fingerprints.filter((s) => s.algorithm === "sha-256" || s.algorithm === "sha-384" || s.algorithm === "sha-512"), this._dtlsTransport.start(this._remoteDtlsParameters), this._transportReady = !0;
  }
}
ps.Edge11 = Qs;
var ls = {}, Ro = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Co = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), gt = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Ro(e, i, t);
  return Co(e, i), e;
};
Object.defineProperty(ls, "__esModule", { value: !0 });
ls.ReactNativeUnifiedPlan = void 0;
const Re = gt(H), Do = K, Fr = gt(q), ct = gt(v), Wt = gt(X), Ls = gt(pe), To = gt(Ge), Po = ee, Eo = re, Lo = ae, Io = Te, y = new Do.Logger("ReactNativeUnifiedPlan"), Br = { OS: 1024, MIS: 1024 };
class Ys extends Eo.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Ys();
  }
  constructor() {
    super(), this._closed = !1, this._mapMidTransceiver = /* @__PURE__ */ new Map(), this._sendStream = new MediaStream(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "ReactNativeUnifiedPlan";
  }
  close() {
    if (y.debug("close()"), !this._closed) {
      if (this._closed = !0, this._sendStream.release(
        /* releaseTracks */
        !1
      ), this._pc)
        try {
          this._pc.close();
        } catch {
        }
      this.emit("@close");
    }
  }
  async getNativeRtpCapabilities() {
    y.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan"
    });
    try {
      e.addTransceiver("audio"), e.addTransceiver("video");
      const t = await e.createOffer();
      try {
        e.close();
      } catch {
      }
      const s = Re.parse(t.sdp), r = Wt.extractRtpCapabilities({ sdpObject: s });
      return To.addNackSuppportForOpus(r), r;
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return y.debug("getNativeSctpCapabilities()"), {
      numStreams: Br
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    this.assertNotClosed(), y.debug("run()"), this._direction = e, this._remoteSdp = new Lo.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n
    }), this._sendingRtpParametersByKind = {
      audio: ct.getSendingRtpParameters("audio", c),
      video: ct.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: ct.getSendingRemoteRtpParameters("audio", c),
      video: ct.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "unified-plan",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (y.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  async updateIceServers(e) {
    this.assertNotClosed(), y.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (this.assertNotClosed(), y.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        y.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        y.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        y.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        y.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this.assertNotClosed(), this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertNotClosed(), this.assertSendDirection(), y.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), t && t.length > 1 && t.forEach((m, S) => {
      m.rid = `r${S}`;
    });
    const n = Fr.clone(this._sendingRtpParametersByKind[e.kind]);
    n.codecs = ct.reduceCodecs(n.codecs, r);
    const a = Fr.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    a.codecs = ct.reduceCodecs(a.codecs, r);
    const o = this._remoteSdp.getNextMediaSectionIdx(), d = this._pc.addTransceiver(e, {
      direction: "sendonly",
      streams: [this._sendStream],
      sendEncodings: t
    });
    let p = await this._pc.createOffer(), c = Re.parse(p.sdp), u;
    this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: c
    });
    let l = !1;
    const h = (0, Io.parse)((t || [{}])[0].scalabilityMode);
    t && t.length === 1 && h.spatialLayers > 1 && n.codecs[0].mimeType.toLowerCase() === "video/vp9" && (y.debug("send() | enabling legacy simulcast for VP9 SVC"), l = !0, c = Re.parse(p.sdp), u = c.media[o.idx], Ls.addLegacySimulcast({
      offerMediaObject: u,
      numStreams: h.spatialLayers
    }), p = { type: "offer", sdp: Re.write(c) }), y.debug("send() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p);
    let f = d.mid ?? void 0;
    if (f || y.warn("send() | missing transceiver.mid (bug in react-native-webrtc, using a workaround"), n.mid = f, c = Re.parse(this._pc.localDescription.sdp), u = c.media[o.idx], n.rtcp.cname = Wt.getCname({ offerMediaObject: u }), !t)
      n.encodings = Ls.getRtpEncodings({ offerMediaObject: u });
    else if (t.length === 1) {
      let m = Ls.getRtpEncodings({ offerMediaObject: u });
      Object.assign(m[0], t[0]), l && (m = [m[0]]), n.encodings = m;
    } else
      n.encodings = t;
    if (n.encodings.length > 1 && (n.codecs[0].mimeType.toLowerCase() === "video/vp8" || n.codecs[0].mimeType.toLowerCase() === "video/h264"))
      for (const m of n.encodings)
        m.scalabilityMode ? m.scalabilityMode = `L1T${h.temporalLayers}` : m.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: u,
      reuseMid: o.reuseMid,
      offerRtpParameters: n,
      answerRtpParameters: a,
      codecOptions: s,
      extmapAllowMixed: !0
    });
    const g = { type: "answer", sdp: this._remoteSdp.getSdp() };
    return y.debug("send() | calling pc.setRemoteDescription() [answer:%o]", g), await this._pc.setRemoteDescription(g), f || (f = d.mid, n.mid = f), this._mapMidTransceiver.set(f, d), {
      localId: f,
      rtpParameters: n,
      rtpSender: d.sender
    };
  }
  async stopSending(e) {
    if (this.assertSendDirection(), this._closed)
      return;
    y.debug("stopSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    if (t.sender.replaceTrack(null), this._pc.removeTrack(t.sender), this._remoteSdp.closeMediaSection(t.mid))
      try {
        t.stop();
      } catch {
      }
    const r = await this._pc.createOffer();
    y.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", r), await this._pc.setLocalDescription(r);
    const n = { type: "answer", sdp: this._remoteSdp.getSdp() };
    y.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", n), await this._pc.setRemoteDescription(n), this._mapMidTransceiver.delete(e);
  }
  async pauseSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), y.debug("pauseSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "inactive", this._remoteSdp.pauseMediaSection(e);
    const s = await this._pc.createOffer();
    y.debug("pauseSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    y.debug("pauseSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async resumeSending(e) {
    this.assertNotClosed(), this.assertSendDirection(), y.debug("resumeSending() [localId:%s]", e);
    const t = this._mapMidTransceiver.get(e);
    if (this._remoteSdp.resumeSendingMediaSection(e), !t)
      throw new Error("associated RTCRtpTransceiver not found");
    t.direction = "sendonly";
    const s = await this._pc.createOffer();
    y.debug("resumeSending() | calling pc.setLocalDescription() [offer:%o]", s), await this._pc.setLocalDescription(s);
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    y.debug("resumeSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  async replaceTrack(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), t ? y.debug("replaceTrack() [localId:%s, track.id:%s]", e, t.id) : y.debug("replaceTrack() [localId:%s, no track]", e);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    await s.sender.replaceTrack(t);
  }
  async setMaxSpatialLayer(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), y.debug("setMaxSpatialLayer() [localId:%s, spatialLayer:%s]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      d <= t ? o.active = !0 : o.active = !1;
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    y.debug("setMaxSpatialLayer() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    y.debug("setMaxSpatialLayer() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async setRtpEncodingParameters(e, t) {
    this.assertNotClosed(), this.assertSendDirection(), y.debug("setRtpEncodingParameters() [localId:%s, params:%o]", e, t);
    const s = this._mapMidTransceiver.get(e);
    if (!s)
      throw new Error("associated RTCRtpTransceiver not found");
    const r = s.sender.getParameters();
    r.encodings.forEach((o, d) => {
      r.encodings[d] = { ...o, ...t };
    }), await s.sender.setParameters(r), this._remoteSdp.muxMediaSectionSimulcast(e, r.encodings);
    const n = await this._pc.createOffer();
    y.debug("setRtpEncodingParameters() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n);
    const a = { type: "answer", sdp: this._remoteSdp.getSdp() };
    y.debug("setRtpEncodingParameters() | calling pc.setRemoteDescription() [answer:%o]", a), await this._pc.setRemoteDescription(a);
  }
  async getSenderStats(e) {
    this.assertNotClosed(), this.assertSendDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.sender.getStats();
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertNotClosed(), this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmits: s,
      protocol: n
    };
    y.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % Br.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = Re.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), y.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      y.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = [], s = /* @__PURE__ */ new Map();
    for (const o of e) {
      const { trackId: d, kind: p, rtpParameters: c, streamId: u } = o;
      y.debug("receive() [trackId:%s, kind:%s]", d, p);
      const l = c.mid || String(this._mapMidTransceiver.size);
      s.set(d, l), this._remoteSdp.receive({
        mid: l,
        kind: p,
        offerRtpParameters: c,
        streamId: u || c.rtcp.cname,
        trackId: d
      });
    }
    const r = { type: "offer", sdp: this._remoteSdp.getSdp() };
    y.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", r), await this._pc.setRemoteDescription(r);
    let n = await this._pc.createAnswer();
    const a = Re.parse(n.sdp);
    for (const o of e) {
      const { trackId: d, rtpParameters: p } = o, c = s.get(d), u = a.media.find((l) => String(l.mid) === c);
      Wt.applyCodecParameters({
        offerRtpParameters: p,
        answerMediaObject: u
      });
    }
    n = { type: "answer", sdp: Re.write(a) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), y.debug("receive() | calling pc.setLocalDescription() [answer:%o]", n), await this._pc.setLocalDescription(n);
    for (const o of e) {
      const { trackId: d } = o, p = s.get(d), c = this._pc.getTransceivers().find((u) => u.mid === p);
      if (c)
        this._mapMidTransceiver.set(p, c), t.push({
          localId: p,
          track: c.receiver.track,
          rtpReceiver: c.receiver
        });
      else
        throw new Error("new RTCRtpTransceiver not found");
    }
    return t;
  }
  async stopReceiving(e) {
    if (this.assertRecvDirection(), this._closed)
      return;
    for (const r of e) {
      y.debug("stopReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      this._remoteSdp.closeMediaSection(n.mid);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    y.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    y.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
    for (const r of e)
      this._mapMidTransceiver.delete(r);
  }
  async pauseReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      y.debug("pauseReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "inactive", this._remoteSdp.pauseMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    y.debug("pauseReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    y.debug("pauseReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async resumeReceiving(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    for (const r of e) {
      y.debug("resumeReceiving() [localId:%s]", r);
      const n = this._mapMidTransceiver.get(r);
      if (!n)
        throw new Error("associated RTCRtpTransceiver not found");
      n.direction = "recvonly", this._remoteSdp.resumeReceivingMediaSection(r);
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    y.debug("resumeReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    y.debug("resumeReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async getReceiverStats(e) {
    this.assertNotClosed(), this.assertRecvDirection();
    const t = this._mapMidTransceiver.get(e);
    if (!t)
      throw new Error("associated RTCRtpTransceiver not found");
    return t.receiver.getStats();
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertNotClosed(), this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmits: o,
      protocol: s
    };
    y.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation();
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      y.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = Re.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      y.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = Re.parse(this._pc.localDescription.sdp));
    const s = Wt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertNotClosed() {
    if (this._closed)
      throw new Po.InvalidStateError("method called in a closed handler");
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
ls.ReactNativeUnifiedPlan = Ys;
var us = {}, Mo = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), ko = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), jt = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && Mo(e, i, t);
  return ko(e, i), e;
};
Object.defineProperty(us, "__esModule", { value: !0 });
us.ReactNative = void 0;
const Ce = jt(H), xo = K, yt = ee, Is = jt(q), dt = jt(v), Qt = jt(X), Ur = jt(Ee), Oo = re, jo = ae, j = new xo.Logger("ReactNative"), zr = { OS: 1024, MIS: 1024 };
class Zs extends Oo.HandlerInterface {
  /**
   * Creates a factory function.
   */
  static createFactory() {
    return () => new Zs();
  }
  constructor() {
    super(), this._sendStream = new MediaStream(), this._mapSendLocalIdTrack = /* @__PURE__ */ new Map(), this._nextSendLocalId = 0, this._mapRecvLocalIdInfo = /* @__PURE__ */ new Map(), this._hasDataChannelMediaSection = !1, this._nextSendSctpStreamId = 0, this._transportReady = !1;
  }
  get name() {
    return "ReactNative";
  }
  close() {
    if (j.debug("close()"), this._sendStream.release(
      /* releaseTracks */
      !1
    ), this._pc)
      try {
        this._pc.close();
      } catch {
      }
    this.emit("@close");
  }
  async getNativeRtpCapabilities() {
    j.debug("getNativeRtpCapabilities()");
    const e = new RTCPeerConnection({
      iceServers: [],
      iceTransportPolicy: "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "plan-b"
    });
    try {
      const t = await e.createOffer({
        offerToReceiveAudio: !0,
        offerToReceiveVideo: !0
      });
      try {
        e.close();
      } catch {
      }
      const s = Ce.parse(t.sdp);
      return Qt.extractRtpCapabilities({ sdpObject: s });
    } catch (t) {
      try {
        e.close();
      } catch {
      }
      throw t;
    }
  }
  async getNativeSctpCapabilities() {
    return j.debug("getNativeSctpCapabilities()"), {
      numStreams: zr
    };
  }
  run({ direction: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, extendedRtpCapabilities: c }) {
    j.debug("run()"), this._direction = e, this._remoteSdp = new jo.RemoteSdp({
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n,
      planB: !0
    }), this._sendingRtpParametersByKind = {
      audio: dt.getSendingRtpParameters("audio", c),
      video: dt.getSendingRtpParameters("video", c)
    }, this._sendingRemoteRtpParametersByKind = {
      audio: dt.getSendingRemoteRtpParameters("audio", c),
      video: dt.getSendingRemoteRtpParameters("video", c)
    }, r.role && r.role !== "auto" && (this._forcedLocalDtlsRole = r.role === "server" ? "client" : "server"), this._pc = new RTCPeerConnection({
      iceServers: a || [],
      iceTransportPolicy: o || "all",
      bundlePolicy: "max-bundle",
      rtcpMuxPolicy: "require",
      sdpSemantics: "plan-b",
      ...d
    }, p), this._pc.addEventListener("icegatheringstatechange", () => {
      this.emit("@icegatheringstatechange", this._pc.iceGatheringState);
    }), this._pc.connectionState ? this._pc.addEventListener("connectionstatechange", () => {
      this.emit("@connectionstatechange", this._pc.connectionState);
    }) : this._pc.addEventListener("iceconnectionstatechange", () => {
      switch (j.warn("run() | pc.connectionState not supported, using pc.iceConnectionState"), this._pc.iceConnectionState) {
        case "checking":
          this.emit("@connectionstatechange", "connecting");
          break;
        case "connected":
        case "completed":
          this.emit("@connectionstatechange", "connected");
          break;
        case "failed":
          this.emit("@connectionstatechange", "failed");
          break;
        case "disconnected":
          this.emit("@connectionstatechange", "disconnected");
          break;
        case "closed":
          this.emit("@connectionstatechange", "closed");
          break;
      }
    });
  }
  async updateIceServers(e) {
    j.debug("updateIceServers()");
    const t = this._pc.getConfiguration();
    t.iceServers = e, this._pc.setConfiguration(t);
  }
  async restartIce(e) {
    if (j.debug("restartIce()"), this._remoteSdp.updateIceParameters(e), !!this._transportReady)
      if (this._direction === "send") {
        const t = await this._pc.createOffer({ iceRestart: !0 });
        j.debug("restartIce() | calling pc.setLocalDescription() [offer:%o]", t), await this._pc.setLocalDescription(t);
        const s = { type: "answer", sdp: this._remoteSdp.getSdp() };
        j.debug("restartIce() | calling pc.setRemoteDescription() [answer:%o]", s), await this._pc.setRemoteDescription(s);
      } else {
        const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
        j.debug("restartIce() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
        const s = await this._pc.createAnswer();
        j.debug("restartIce() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
      }
  }
  async getTransportStats() {
    return this._pc.getStats();
  }
  async send({ track: e, encodings: t, codecOptions: s, codec: r }) {
    this.assertSendDirection(), j.debug("send() [kind:%s, track.id:%s]", e.kind, e.id), r && j.warn("send() | codec selection is not available in %s handler", this.name), this._sendStream.addTrack(e), this._pc.addStream(this._sendStream);
    let n = await this._pc.createOffer(), a = Ce.parse(n.sdp), o;
    const d = Is.clone(this._sendingRtpParametersByKind[e.kind]);
    d.codecs = dt.reduceCodecs(d.codecs);
    const p = Is.clone(this._sendingRemoteRtpParametersByKind[e.kind]);
    if (p.codecs = dt.reduceCodecs(p.codecs), this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), e.kind === "video" && t && t.length > 1 && (j.debug("send() | enabling simulcast"), a = Ce.parse(n.sdp), o = a.media.find((l) => l.type === "video"), Ur.addLegacySimulcast({
      offerMediaObject: o,
      track: e,
      numStreams: t.length
    }), n = { type: "offer", sdp: Ce.write(a) }), j.debug("send() | calling pc.setLocalDescription() [offer:%o]", n), await this._pc.setLocalDescription(n), a = Ce.parse(this._pc.localDescription.sdp), o = a.media.find((l) => l.type === e.kind), d.rtcp.cname = Qt.getCname({ offerMediaObject: o }), d.encodings = Ur.getRtpEncodings({ offerMediaObject: o, track: e }), t)
      for (let l = 0; l < d.encodings.length; ++l)
        t[l] && Object.assign(d.encodings[l], t[l]);
    if (d.encodings.length > 1 && (d.codecs[0].mimeType.toLowerCase() === "video/vp8" || d.codecs[0].mimeType.toLowerCase() === "video/h264"))
      for (const l of d.encodings)
        l.scalabilityMode = "L1T3";
    this._remoteSdp.send({
      offerMediaObject: o,
      offerRtpParameters: d,
      answerRtpParameters: p,
      codecOptions: s
    });
    const c = { type: "answer", sdp: this._remoteSdp.getSdp() };
    j.debug("send() | calling pc.setRemoteDescription() [answer:%o]", c), await this._pc.setRemoteDescription(c);
    const u = String(this._nextSendLocalId);
    return this._nextSendLocalId++, this._mapSendLocalIdTrack.set(u, e), {
      localId: u,
      rtpParameters: d
    };
  }
  async stopSending(e) {
    this.assertSendDirection(), j.debug("stopSending() [localId:%s]", e);
    const t = this._mapSendLocalIdTrack.get(e);
    if (!t)
      throw new Error("track not found");
    this._mapSendLocalIdTrack.delete(e), this._sendStream.removeTrack(t), this._pc.addStream(this._sendStream);
    const s = await this._pc.createOffer();
    j.debug("stopSending() | calling pc.setLocalDescription() [offer:%o]", s);
    try {
      await this._pc.setLocalDescription(s);
    } catch (n) {
      if (this._sendStream.getTracks().length === 0) {
        j.warn("stopSending() | ignoring expected error due no sending tracks: %s", n.toString());
        return;
      }
      throw n;
    }
    if (this._pc.signalingState === "stable")
      return;
    const r = { type: "answer", sdp: this._remoteSdp.getSdp() };
    j.debug("stopSending() | calling pc.setRemoteDescription() [answer:%o]", r), await this._pc.setRemoteDescription(r);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async pauseSending(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resumeSending(e) {
  }
  async replaceTrack(e, t) {
    throw new yt.UnsupportedError("not implemented");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setMaxSpatialLayer(e, t) {
    throw new yt.UnsupportedError("not implemented");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async setRtpEncodingParameters(e, t) {
    throw new yt.UnsupportedError("not implemented");
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSenderStats(e) {
    throw new yt.UnsupportedError("not implemented");
  }
  async sendDataChannel({ ordered: e, maxPacketLifeTime: t, maxRetransmits: s, label: r, protocol: n }) {
    this.assertSendDirection();
    const a = {
      negotiated: !0,
      id: this._nextSendSctpStreamId,
      ordered: e,
      maxPacketLifeTime: t,
      maxRetransmitTime: t,
      maxRetransmits: s,
      protocol: n
    };
    j.debug("sendDataChannel() [options:%o]", a);
    const o = this._pc.createDataChannel(r, a);
    if (this._nextSendSctpStreamId = ++this._nextSendSctpStreamId % zr.MIS, !this._hasDataChannelMediaSection) {
      const p = await this._pc.createOffer(), c = Ce.parse(p.sdp), u = c.media.find((h) => h.type === "application");
      this._transportReady || await this.setupTransport({
        localDtlsRole: this._forcedLocalDtlsRole ?? "client",
        localSdpObject: c
      }), j.debug("sendDataChannel() | calling pc.setLocalDescription() [offer:%o]", p), await this._pc.setLocalDescription(p), this._remoteSdp.sendSctpAssociation({ offerMediaObject: u });
      const l = { type: "answer", sdp: this._remoteSdp.getSdp() };
      j.debug("sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]", l), await this._pc.setRemoteDescription(l), this._hasDataChannelMediaSection = !0;
    }
    const d = {
      streamId: a.id,
      ordered: a.ordered,
      maxPacketLifeTime: a.maxPacketLifeTime,
      maxRetransmits: a.maxRetransmits
    };
    return { dataChannel: o, sctpStreamParameters: d };
  }
  async receive(e) {
    this.assertRecvDirection();
    const t = [], s = /* @__PURE__ */ new Map();
    for (const o of e) {
      const { trackId: d, kind: p, rtpParameters: c } = o;
      j.debug("receive() [trackId:%s, kind:%s]", d, p);
      const u = p;
      let l = o.streamId || c.rtcp.cname;
      j.debug("receive() | forcing a random remote streamId to avoid well known bug in react-native-webrtc"), l += `-hack-${Is.generateRandomNumber()}`, s.set(d, l), this._remoteSdp.receive({
        mid: u,
        kind: p,
        offerRtpParameters: c,
        streamId: l,
        trackId: d
      });
    }
    const r = { type: "offer", sdp: this._remoteSdp.getSdp() };
    j.debug("receive() | calling pc.setRemoteDescription() [offer:%o]", r), await this._pc.setRemoteDescription(r);
    let n = await this._pc.createAnswer();
    const a = Ce.parse(n.sdp);
    for (const o of e) {
      const { kind: d, rtpParameters: p } = o, c = d, u = a.media.find((l) => String(l.mid) === c);
      Qt.applyCodecParameters({
        offerRtpParameters: p,
        answerMediaObject: u
      });
    }
    n = { type: "answer", sdp: Ce.write(a) }, this._transportReady || await this.setupTransport({
      localDtlsRole: this._forcedLocalDtlsRole ?? "client",
      localSdpObject: a
    }), j.debug("receive() | calling pc.setLocalDescription() [answer:%o]", n), await this._pc.setLocalDescription(n);
    for (const o of e) {
      const { kind: d, trackId: p, rtpParameters: c } = o, u = p, l = d, h = s.get(p), g = this._pc.getRemoteStreams().find((m) => m.id === h).getTrackById(u);
      if (!g)
        throw new Error("remote track not found");
      this._mapRecvLocalIdInfo.set(u, { mid: l, rtpParameters: c }), t.push({ localId: u, track: g });
    }
    return t;
  }
  async stopReceiving(e) {
    this.assertRecvDirection();
    for (const r of e) {
      j.debug("stopReceiving() [localId:%s]", r);
      const { mid: n, rtpParameters: a } = this._mapRecvLocalIdInfo.get(r) || {};
      this._mapRecvLocalIdInfo.delete(r), this._remoteSdp.planBStopReceiving({ mid: n, offerRtpParameters: a });
    }
    const t = { type: "offer", sdp: this._remoteSdp.getSdp() };
    j.debug("stopReceiving() | calling pc.setRemoteDescription() [offer:%o]", t), await this._pc.setRemoteDescription(t);
    const s = await this._pc.createAnswer();
    j.debug("stopReceiving() | calling pc.setLocalDescription() [answer:%o]", s), await this._pc.setLocalDescription(s);
  }
  async pauseReceiving(e) {
  }
  async resumeReceiving(e) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getReceiverStats(e) {
    throw new yt.UnsupportedError("not implemented");
  }
  async receiveDataChannel({ sctpStreamParameters: e, label: t, protocol: s }) {
    this.assertRecvDirection();
    const { streamId: r, ordered: n, maxPacketLifeTime: a, maxRetransmits: o } = e, d = {
      negotiated: !0,
      id: r,
      ordered: n,
      maxPacketLifeTime: a,
      maxRetransmitTime: a,
      maxRetransmits: o,
      protocol: s
    };
    j.debug("receiveDataChannel() [options:%o]", d);
    const p = this._pc.createDataChannel(t, d);
    if (!this._hasDataChannelMediaSection) {
      this._remoteSdp.receiveSctpAssociation({ oldDataChannelSpec: !0 });
      const c = { type: "offer", sdp: this._remoteSdp.getSdp() };
      j.debug("receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]", c), await this._pc.setRemoteDescription(c);
      const u = await this._pc.createAnswer();
      if (!this._transportReady) {
        const l = Ce.parse(u.sdp);
        await this.setupTransport({
          localDtlsRole: this._forcedLocalDtlsRole ?? "client",
          localSdpObject: l
        });
      }
      j.debug("receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]", u), await this._pc.setLocalDescription(u), this._hasDataChannelMediaSection = !0;
    }
    return { dataChannel: p };
  }
  async setupTransport({ localDtlsRole: e, localSdpObject: t }) {
    t || (t = Ce.parse(this._pc.localDescription.sdp));
    const s = Qt.extractDtlsParameters({ sdpObject: t });
    s.role = e, this._remoteSdp.updateDtlsRole(e === "client" ? "server" : "client"), await new Promise((r, n) => {
      this.safeEmit("@connect", { dtlsParameters: s }, r, n);
    }), this._transportReady = !0;
  }
  assertSendDirection() {
    if (this._direction !== "send")
      throw new Error('method can just be called for handlers with "send" direction');
  }
  assertRecvDirection() {
    if (this._direction !== "recv")
      throw new Error('method can just be called for handlers with "recv" direction');
  }
}
us.ReactNative = Zs;
var $o = _ && _.__createBinding || (Object.create ? function(i, e, t, s) {
  s === void 0 && (s = t);
  var r = Object.getOwnPropertyDescriptor(e, t);
  (!r || ("get" in r ? !e.__esModule : r.writable || r.configurable)) && (r = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(i, s, r);
} : function(i, e, t, s) {
  s === void 0 && (s = t), i[s] = e[t];
}), Ao = _ && _.__setModuleDefault || (Object.create ? function(i, e) {
  Object.defineProperty(i, "default", { enumerable: !0, value: e });
} : function(i, e) {
  i.default = e;
}), mi = _ && _.__importStar || function(i) {
  if (i && i.__esModule)
    return i;
  var e = {};
  if (i != null)
    for (var t in i)
      t !== "default" && Object.prototype.hasOwnProperty.call(i, t) && $o(e, i, t);
  return Ao(e, i), e;
};
Object.defineProperty(ze, "__esModule", { value: !0 });
ze.Device = ze.detectDevice = void 0;
const No = Ei, Fo = K, Bo = De, pt = ee, Uo = mi(q), $e = mi(v), zo = Dt, Vo = ss, Go = rs, Ko = is, qo = ns, Ho = as, Wo = os, Qo = cs, Yo = ds, Zo = ps, Jo = ls, Xo = us, J = new Fo.Logger("Device");
function gi() {
  var i, e, t;
  if (typeof navigator == "object" && navigator.product === "ReactNative") {
    if (J.debug("detectDevice() | React-Native detected"), typeof RTCPeerConnection > "u") {
      J.warn("detectDevice() | unsupported react-native-webrtc without RTCPeerConnection, forgot to call registerGlobals()?");
      return;
    }
    return typeof RTCRtpTransceiver < "u" ? (J.debug("detectDevice() | ReactNative UnifiedPlan handler chosen"), "ReactNativeUnifiedPlan") : (J.debug("detectDevice() | ReactNative PlanB handler chosen"), "ReactNative");
  } else if (typeof navigator == "object" && typeof navigator.userAgent == "string") {
    const s = navigator.userAgent, r = new No.UAParser(s);
    J.debug("detectDevice() | browser detected [ua:%s, parsed:%o]", s, r.getResult());
    const n = r.getBrowser(), a = ((i = n.name) == null ? void 0 : i.toLowerCase()) ?? "", o = parseInt(n.major ?? "0"), p = ((e = r.getEngine().name) == null ? void 0 : e.toLowerCase()) ?? "", c = r.getOS(), u = ((t = c.name) == null ? void 0 : t.toLowerCase()) ?? "", l = parseFloat(c.version ?? "0"), h = u === "ios", f = [
      "chrome",
      "chromium",
      "mobile chrome",
      "chrome webview",
      "chrome headless"
    ].includes(a), g = [
      "firefox",
      "mobile firefox",
      "mobile focus"
    ].includes(a), m = [
      "safari",
      "mobile safari"
    ].includes(a), S = ["edge"].includes(a);
    if ((f || S) && !h && o >= 111)
      return "Chrome111";
    if (f && !h && o >= 74 || S && !h && o >= 88)
      return "Chrome74";
    if (f && !h && o >= 70)
      return "Chrome70";
    if (f && !h && o >= 67)
      return "Chrome67";
    if (f && !h && o >= 55)
      return "Chrome55";
    if (g && !h && o >= 60)
      return "Firefox60";
    if (g && h && l >= 14.3)
      return "Safari12";
    if (m && o >= 12 && typeof RTCRtpTransceiver < "u" && RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection"))
      return "Safari12";
    if (m && o >= 11)
      return "Safari11";
    if (S && !h && o >= 11 && o <= 18)
      return "Edge11";
    if (p === "webkit" && h && l >= 14.3 && typeof RTCRtpTransceiver < "u" && RTCRtpTransceiver.prototype.hasOwnProperty("currentDirection"))
      return "Safari12";
    if (p === "blink") {
      const B = s.match(/(?:(?:Chrome|Chromium))[ /](\w+)/i);
      if (B) {
        const w = Number(B[1]);
        return w >= 111 ? "Chrome111" : w >= 74 ? "Chrome74" : w >= 70 ? "Chrome70" : w >= 67 ? "Chrome67" : "Chrome55";
      } else
        return "Chrome111";
    } else {
      J.warn("detectDevice() | browser not supported [name:%s, version:%s]", a, o);
      return;
    }
  } else {
    J.warn("detectDevice() | unknown device");
    return;
  }
}
ze.detectDevice = gi;
class ec {
  /**
   * Create a new Device to connect to mediasoup server.
   *
   * @throws {UnsupportedError} if device is not supported.
   */
  constructor({ handlerName: e, handlerFactory: t, Handler: s } = {}) {
    if (this._loaded = !1, this._observer = new Bo.EnhancedEventEmitter(), J.debug("constructor()"), s)
      if (J.warn("constructor() | Handler option is DEPRECATED, use handlerName or handlerFactory instead"), typeof s == "string")
        e = s;
      else
        throw new TypeError("non string Handler option no longer supported, use handlerFactory instead");
    if (e && t)
      throw new TypeError("just one of handlerName or handlerInterface can be given");
    if (t)
      this._handlerFactory = t;
    else {
      if (e)
        J.debug("constructor() | handler given: %s", e);
      else if (e = gi(), e)
        J.debug("constructor() | detected handler: %s", e);
      else
        throw new pt.UnsupportedError("device not supported");
      switch (e) {
        case "Chrome111":
          this._handlerFactory = Vo.Chrome111.createFactory();
          break;
        case "Chrome74":
          this._handlerFactory = Go.Chrome74.createFactory();
          break;
        case "Chrome70":
          this._handlerFactory = Ko.Chrome70.createFactory();
          break;
        case "Chrome67":
          this._handlerFactory = qo.Chrome67.createFactory();
          break;
        case "Chrome55":
          this._handlerFactory = Ho.Chrome55.createFactory();
          break;
        case "Firefox60":
          this._handlerFactory = Wo.Firefox60.createFactory();
          break;
        case "Safari12":
          this._handlerFactory = Qo.Safari12.createFactory();
          break;
        case "Safari11":
          this._handlerFactory = Yo.Safari11.createFactory();
          break;
        case "Edge11":
          this._handlerFactory = Zo.Edge11.createFactory();
          break;
        case "ReactNativeUnifiedPlan":
          this._handlerFactory = Jo.ReactNativeUnifiedPlan.createFactory();
          break;
        case "ReactNative":
          this._handlerFactory = Xo.ReactNative.createFactory();
          break;
        default:
          throw new TypeError(`unknown handlerName "${e}"`);
      }
    }
    const r = this._handlerFactory();
    this._handlerName = r.name, r.close(), this._extendedRtpCapabilities = void 0, this._recvRtpCapabilities = void 0, this._canProduceByKind = {
      audio: !1,
      video: !1
    }, this._sctpCapabilities = void 0;
  }
  /**
   * The RTC handler name.
   */
  get handlerName() {
    return this._handlerName;
  }
  /**
   * Whether the Device is loaded.
   */
  get loaded() {
    return this._loaded;
  }
  /**
   * RTP capabilities of the Device for receiving media.
   *
   * @throws {InvalidStateError} if not loaded.
   */
  get rtpCapabilities() {
    if (!this._loaded)
      throw new pt.InvalidStateError("not loaded");
    return this._recvRtpCapabilities;
  }
  /**
   * SCTP capabilities of the Device.
   *
   * @throws {InvalidStateError} if not loaded.
   */
  get sctpCapabilities() {
    if (!this._loaded)
      throw new pt.InvalidStateError("not loaded");
    return this._sctpCapabilities;
  }
  get observer() {
    return this._observer;
  }
  /**
   * Initialize the Device.
   */
  async load({ routerRtpCapabilities: e }) {
    J.debug("load() [routerRtpCapabilities:%o]", e), e = Uo.clone(e);
    let t;
    try {
      if (this._loaded)
        throw new pt.InvalidStateError("already loaded");
      $e.validateRtpCapabilities(e), t = this._handlerFactory();
      const s = await t.getNativeRtpCapabilities();
      J.debug("load() | got native RTP capabilities:%o", s), $e.validateRtpCapabilities(s), this._extendedRtpCapabilities = $e.getExtendedRtpCapabilities(s, e), J.debug("load() | got extended RTP capabilities:%o", this._extendedRtpCapabilities), this._canProduceByKind.audio = $e.canSend("audio", this._extendedRtpCapabilities), this._canProduceByKind.video = $e.canSend("video", this._extendedRtpCapabilities), this._recvRtpCapabilities = $e.getRecvRtpCapabilities(this._extendedRtpCapabilities), $e.validateRtpCapabilities(this._recvRtpCapabilities), J.debug("load() | got receiving RTP capabilities:%o", this._recvRtpCapabilities), this._sctpCapabilities = await t.getNativeSctpCapabilities(), J.debug("load() | got native SCTP capabilities:%o", this._sctpCapabilities), $e.validateSctpCapabilities(this._sctpCapabilities), J.debug("load() succeeded"), this._loaded = !0, t.close();
    } catch (s) {
      throw t && t.close(), s;
    }
  }
  /**
   * Whether we can produce audio/video.
   *
   * @throws {InvalidStateError} if not loaded.
   * @throws {TypeError} if wrong arguments.
   */
  canProduce(e) {
    if (this._loaded) {
      if (e !== "audio" && e !== "video")
        throw new TypeError(`invalid kind "${e}"`);
    } else
      throw new pt.InvalidStateError("not loaded");
    return this._canProduceByKind[e];
  }
  /**
   * Creates a Transport for sending media.
   *
   * @throws {InvalidStateError} if not loaded.
   * @throws {TypeError} if wrong arguments.
   */
  createSendTransport({ id: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, appData: c }) {
    return J.debug("createSendTransport()"), this.createTransport({
      direction: "send",
      id: e,
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n,
      iceServers: a,
      iceTransportPolicy: o,
      additionalSettings: d,
      proprietaryConstraints: p,
      appData: c
    });
  }
  /**
   * Creates a Transport for receiving media.
   *
   * @throws {InvalidStateError} if not loaded.
   * @throws {TypeError} if wrong arguments.
   */
  createRecvTransport({ id: e, iceParameters: t, iceCandidates: s, dtlsParameters: r, sctpParameters: n, iceServers: a, iceTransportPolicy: o, additionalSettings: d, proprietaryConstraints: p, appData: c }) {
    return J.debug("createRecvTransport()"), this.createTransport({
      direction: "recv",
      id: e,
      iceParameters: t,
      iceCandidates: s,
      dtlsParameters: r,
      sctpParameters: n,
      iceServers: a,
      iceTransportPolicy: o,
      additionalSettings: d,
      proprietaryConstraints: p,
      appData: c
    });
  }
  createTransport({ direction: e, id: t, iceParameters: s, iceCandidates: r, dtlsParameters: n, sctpParameters: a, iceServers: o, iceTransportPolicy: d, additionalSettings: p, proprietaryConstraints: c, appData: u }) {
    if (this._loaded) {
      if (typeof t != "string")
        throw new TypeError("missing id");
      if (typeof s != "object")
        throw new TypeError("missing iceParameters");
      if (Array.isArray(r)) {
        if (typeof n != "object")
          throw new TypeError("missing dtlsParameters");
        if (a && typeof a != "object")
          throw new TypeError("wrong sctpParameters");
        if (u && typeof u != "object")
          throw new TypeError("if given, appData must be an object");
      } else
        throw new TypeError("missing iceCandidates");
    } else
      throw new pt.InvalidStateError("not loaded");
    const l = new zo.Transport({
      direction: e,
      id: t,
      iceParameters: s,
      iceCandidates: r,
      dtlsParameters: n,
      sctpParameters: a,
      iceServers: o,
      iceTransportPolicy: d,
      additionalSettings: p,
      proprietaryConstraints: c,
      appData: u,
      handlerFactory: this._handlerFactory,
      extendedRtpCapabilities: this._extendedRtpCapabilities,
      canProduceByKind: this._canProduceByKind
    });
    return this._observer.safeEmit("newtransport", l), l;
  }
}
ze.Device = ec;
var _i = {}, wi = {};
Object.defineProperty(wi, "__esModule", { value: !0 });
var vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
(function(i) {
  var e = _ && _.__createBinding || (Object.create ? function(s, r, n, a) {
    a === void 0 && (a = n);
    var o = Object.getOwnPropertyDescriptor(r, n);
    (!o || ("get" in o ? !r.__esModule : o.writable || o.configurable)) && (o = { enumerable: !0, get: function() {
      return r[n];
    } }), Object.defineProperty(s, a, o);
  } : function(s, r, n, a) {
    a === void 0 && (a = n), s[a] = r[n];
  }), t = _ && _.__exportStar || function(s, r) {
    for (var n in s)
      n !== "default" && !Object.prototype.hasOwnProperty.call(r, n) && e(r, s, n);
  };
  Object.defineProperty(i, "__esModule", { value: !0 }), t(ze, i), t(Dt, i), t(Tt, i), t(Pt, i), t(Et, i), t(Lt, i), t(wi, i), t(vi, i), t(re, i), t(ee, i);
})(_i);
(function(i) {
  var e = _ && _.__createBinding || (Object.create ? function(p, c, u, l) {
    l === void 0 && (l = u);
    var h = Object.getOwnPropertyDescriptor(c, u);
    (!h || ("get" in h ? !c.__esModule : h.writable || h.configurable)) && (h = { enumerable: !0, get: function() {
      return c[u];
    } }), Object.defineProperty(p, l, h);
  } : function(p, c, u, l) {
    l === void 0 && (l = u), p[l] = c[u];
  }), t = _ && _.__setModuleDefault || (Object.create ? function(p, c) {
    Object.defineProperty(p, "default", { enumerable: !0, value: c });
  } : function(p, c) {
    p.default = c;
  }), s = _ && _.__importStar || function(p) {
    if (p && p.__esModule)
      return p;
    var c = {};
    if (p != null)
      for (var u in p)
        u !== "default" && Object.prototype.hasOwnProperty.call(p, u) && e(c, p, u);
    return t(c, p), c;
  }, r = _ && _.__importDefault || function(p) {
    return p && p.__esModule ? p : { default: p };
  };
  Object.defineProperty(i, "__esModule", { value: !0 }), i.debug = i.parseScalabilityMode = i.detectDevice = i.Device = i.version = i.types = void 0;
  const n = r(Zt);
  i.debug = n.default;
  const a = ze;
  Object.defineProperty(i, "Device", { enumerable: !0, get: function() {
    return a.Device;
  } }), Object.defineProperty(i, "detectDevice", { enumerable: !0, get: function() {
    return a.detectDevice;
  } });
  const o = s(_i);
  i.types = o, i.version = "3.6.101";
  var d = Te;
  Object.defineProperty(i, "parseScalabilityMode", { enumerable: !0, get: function() {
    return d.parse;
  } });
})(Vr);
class Rt {
  static async push(e) {
    if (this.arr.length > 0)
      this.arr.unshift(e);
    else
      for (this.arr.unshift(e); this.arr.length > 0; ) {
        let t = this.arr[this.arr.length - 1];
        await t(), this.arr.pop();
      }
  }
}
U(Rt, "arr", []);
class rc {
  constructor(e) {
    U(this, "device");
    U(this, "producerAudio");
    U(this, "producerVideo");
    U(this, "producerAudioScreen");
    U(this, "producerVideoScreen");
    U(this, "producerChat");
    U(this, "producerSet", /* @__PURE__ */ new Set());
    U(this, "transportReceive");
    U(this, "transportSend");
    U(this, "transportDataSend");
    U(this, "socket");
    U(this, "roomInfo");
    U(this, "defaultVideo", !0);
    U(this, "defaultAudio", !0);
    U(this, "defaultCameraId");
    U(this, "onProducerStateChange");
    U(this, "onLocalProducerInit");
    U(this, "onLocalProducerStart");
    U(this, "onJoinedRoom");
    U(this, "onLeavedRoom");
    U(this, "onSpeaker");
    U(this, "onKick");
    U(this, "onMessageReceive");
    U(this, "onMessageSend");
    U(this, "onScreenStopped");
    U(this, "onDisconnect");
    this.onDisconnect = this._onDisconnect.bind(this), this.socket = e, this.socket.on("newProducer", async (t, s, r, n) => {
      this.producerSet.has(t) || (this.producerSet.add(t), n === "data" ? Rt.push(this.subscribeData.bind(this, t)) : (n === "camera" || n === "screen") && Rt.push(this.subscribe.bind(this, t)));
    }), this.socket.on("producerClosed", (t, s, r, n) => {
      this.onProducerStateChange && this.onProducerStateChange("close", s, r, n, null, t), this.producerSet.delete(t);
    }), this.socket.on("producerPause", (t, s, r) => {
      this.onProducerStateChange && this.onProducerStateChange("pause", s, r, "camera", null, t);
    }), this.socket.on("producerResume", (t, s, r) => {
      this.onProducerStateChange && this.onProducerStateChange("resume", s, r, "camera", null, t);
    }), this.socket.on("kick", () => {
      this.clearRoomConnection(), this.onKick && this.onKick();
    }), this.socket.on("disconnect", this.onDisconnect), this.socket.on("speaker", (t) => {
      this.onSpeaker && this.onSpeaker(t);
    }), this.socket.on("messageReceive", (t, s) => {
      var r;
      (r = this.onMessageReceive) == null || r.call(this, t, s);
    });
  }
  static async enumVideoDevice() {
    return (await navigator.mediaDevices.enumerateDevices()).filter((t) => t.kind === "videoinput").map((t) => ({
      id: t.deviceId,
      name: t.label
    }));
  }
  static async checkVideoStream(e) {
    return await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: e
      }
    });
  }
  _onDisconnect(e) {
    this.clearRoomConnection();
  }
  getRoomInfo() {
    return this.roomInfo;
  }
  async join(e, t, s = !0, r = !0, n) {
    if (this.roomInfo)
      return {
        success: !1,
        msg: "you have joined a meeting"
      };
    this.defaultVideo = s, this.defaultAudio = r, this.defaultCameraId = n;
    let a = await this.socket.emitWithAck("joinRoom", e, t);
    if (a)
      this.roomInfo = a;
    else
      return {
        success: !1
      };
    if (!this.device) {
      const d = await this.socket.emitWithAck("getRouterRtpCapabilities");
      await this.loadDevice(d);
    }
    let o = await this.publish();
    return o !== !0 ? {
      success: !1,
      msg: o
    } : {
      success: !0
    };
  }
  async leave() {
    return this.roomInfo ? (await this.socket.emitWithAck("leaveRoom"), this.clearRoomConnection(), !0) : !1;
  }
  async pause(e) {
    return await this.socket.emitWithAck("pauseSelf", e);
  }
  async resume(e) {
    return await this.socket.emitWithAck("resumeSelf", e);
  }
  async mute(e, t) {
    return await this.socket.emitWithAck("pauseOther", e, t);
  }
  async unmute(e, t) {
    return await this.socket.emitWithAck("resumeOther", e, t);
  }
  async kick(e) {
    return await this.socket.emitWithAck("kick", e);
  }
  async end() {
    return await this.socket.emitWithAck("end");
  }
  async states() {
    return await this.socket.emitWithAck("states");
  }
  async sendMessage(e) {
    var s;
    await this.socket.emitWithAck("messageSend", e) && ((s = this.onMessageSend) == null || s.call(this, e));
  }
  async startShare() {
    if (await this.socket.emitWithAck("getScreenProducers"))
      return !1;
    const t = {
      audio: {
        echoCancellation: !0,
        noiseSuppression: !0
      },
      video: {
        cursor: "always"
      }
    };
    try {
      let s = await navigator.mediaDevices.getDisplayMedia(t);
      if (s) {
        let r = s.getAudioTracks()[0];
        if (r) {
          let a = {
            track: r,
            appData: {
              screen: !0
            }
          };
          a.codecOptions = {
            opusStereo: !0,
            opusDtx: !0
          }, this.producerAudioScreen = await this.transportSend.produce(a);
        }
        let n = s.getVideoTracks()[0];
        if (n) {
          n.onended = (o) => {
            this.stopShare();
          };
          let a = {
            track: n,
            appData: {
              screen: !0
            }
          };
          this.producerVideoScreen = await this.transportSend.produce(a);
        }
        return !0;
      }
    } catch (s) {
      return console.log(s), !1;
    }
  }
  stopShare() {
    var e;
    this.socket.emit("stopScreen"), this.producerVideoScreen && (this.producerVideoScreen.removeAllListeners(), this.producerVideoScreen.close(), this.producerVideoScreen = null), this.producerAudioScreen && (this.producerAudioScreen.removeAllListeners(), this.producerAudioScreen.close(), this.producerAudioScreen = null), (e = this.onScreenStopped) == null || e.call(this);
  }
  clearRoomConnection() {
    this.roomInfo && (this.onLeavedRoom && this.onLeavedRoom(Object.assign({}, this.roomInfo)), this.roomInfo = null), this.device = null, this.producerSet = /* @__PURE__ */ new Set(), this.stopShare(), this.producerAudio && (this.producerAudio.removeAllListeners(), this.producerAudio.close(), this.producerAudio = null), this.producerVideo && (this.producerVideo.removeAllListeners(), this.producerVideo.close(), this.producerVideo = null), this.transportReceive && (this.transportReceive.removeAllListeners(), this.transportReceive.close(), this.transportReceive = null), this.transportSend && (this.transportSend.removeAllListeners(), this.transportSend.close(), this.transportSend = null), this.producerChat && (this.producerChat.removeAllListeners(), this.producerChat.close(), this.producerChat = null), this.transportDataSend && (this.transportDataSend.removeAllListeners(), this.transportDataSend.close(), this.transportDataSend = null), this.socket.removeAllListeners("newProducer"), this.socket.removeAllListeners("producerClosed"), this.socket.removeAllListeners("producerPause"), this.socket.removeAllListeners("producerResume"), this.socket.removeAllListeners("kick"), this.socket.removeAllListeners("speaker"), this.socket.off("disconnect", this.onDisconnect), this.socket = null;
  }
  async loadDevice(e) {
    try {
      this.device = new Vr.Device();
    } catch (t) {
      t.name === "UnsupportedError" && console.error("browser not supported");
    }
    await this.device.load({ routerRtpCapabilities: e });
  }
  async subscribe(e) {
    if (!this.transportReceive) {
      const t = await this.socket.emitWithAck("createConsumerTransport");
      if (!t) {
        this.producerSet.delete(e);
        return;
      }
      this.transportReceive = this.device.createRecvTransport({ ...t, iceServers: [] }), this.transportReceive.on("connect", async ({ dtlsParameters: s }, r, n) => {
        this.socket.emitWithAck("connectConsumerTransport", {
          dtlsParameters: s
        }).then(r).catch(n);
      }), this.transportReceive.on("connectionstatechange", async (s) => {
        switch (s) {
          case "connecting":
            console.log("Connecting to consumer for audio, transport id: " + this.transportReceive.id);
            break;
          case "connected":
            console.log("Connected to consumer for audio, transport id: " + this.transportReceive.id);
            break;
          case "failed":
          case "closed":
          case "disconnected": {
            this.leave();
            break;
          }
        }
      });
    }
    this.consume(this.transportReceive, e).then(async (t) => {
      await this.socket.emitWithAck("resume", t.consumer.id), this.onProducerStateChange && this.onProducerStateChange("new", t.consumer.kind, t.businessId, t.type, t.stream, e);
    });
  }
  async consume(e, t) {
    const { rtpCapabilities: s } = this.device, r = e.id, n = await this.socket.emitWithAck("consume", { rtpCapabilities: s, remoteProducerId: t, transportId: r }), {
      producerId: a,
      id: o,
      kind: d,
      rtpParameters: p,
      type: c
    } = n, u = await e.consume({
      id: o,
      producerId: a,
      kind: d,
      rtpParameters: p
    }), l = new MediaStream();
    return l.addTrack(u.track), { stream: l, consumer: u, businessId: n.businessId, type: c };
  }
  async subscribeData(e) {
    const t = await this.socket.emitWithAck("createDataConsumerTransport");
    if (!t) {
      this.producerSet.delete(e);
      return;
    }
    const s = this.device.createRecvTransport({ ...t, iceServers: [] });
    s.on("connect", async ({ dtlsParameters: r }, n, a) => {
      this.socket.emitWithAck("connectDataConsumerTransport", {
        dtlsParameters: r,
        sctpParameters: t.sctpParameters
      }).then(n).catch(a);
    }), s.on("connectionstatechange", async (r) => {
      switch (r) {
        case "connecting":
          console.log("Connecting to consumer for audio, transport id: " + s.id);
          break;
        case "connected":
          console.log("Connected to consumer for audio, transport id: " + s.id);
          break;
        case "failed":
        case "closed":
        case "disconnected": {
          this.leave();
          break;
        }
      }
    }), this.consumeData(s, e).then(async (r) => {
      this.onProducerStateChange && this.onProducerStateChange("new", null, r.businessId, "data", null, e), r.consumer.on("message", (n) => {
        var a;
        (a = this.onMessageReceive) == null || a.call(this, n, r.businessId);
      });
    });
  }
  async consumeData(e, t) {
    const s = e.id, r = await this.socket.emitWithAck("consumeData", { remoteProducerId: t, transportId: s }), {
      id: n
    } = r;
    console.log(`producerId:${t} consumerId:${n}`);
    const a = await e.consumeData({
      id: n,
      dataProducerId: t,
      sctpStreamParameters: {
        streamId: 0,
        ordered: !0
      }
    });
    return a.on("close", () => {
      a.removeAllListeners();
    }), { consumer: a, businessId: r.businessId };
  }
  async publish() {
    return new Promise(async (e, t) => {
      const s = await this.socket.emitWithAck("createProducerTransport");
      s || e("createProducerTransport failed"), this.transportSend = this.device.createSendTransport({ ...s, iceServers: [] }), this.transportSend.on("connect", async ({ dtlsParameters: o }, d, p) => {
        this.socket.emitWithAck("connectProducerTransport", { dtlsParameters: o }).then(d).catch(p);
      }), this.transportSend.on("produce", async ({ kind: o, rtpParameters: d, appData: p }, c, u) => {
        try {
          const { id: l, producersExist: h } = await this.socket.emitWithAck("produce", {
            kind: o,
            rtpParameters: d,
            appData: p
          });
          this.onLocalProducerStart && this.onLocalProducerStart(o), h && this.getProducers(), c({ id: l });
        } catch (l) {
          u(l);
        }
      }), this.transportSend.on("connectionstatechange", (o) => {
        switch (o) {
          case "connecting":
            console.log("Connecting to publish");
            break;
          case "connected":
            console.log("Connected"), this.onJoinedRoom && this.onJoinedRoom(this.roomInfo);
            break;
          case "failed":
            this.transportSend.close(), console.log("Failed connection");
            break;
        }
      });
      let r = await navigator.mediaDevices.enumerateDevices(), n = !1;
      for (let o of r)
        o.kind === "videoinput" && (n = !0);
      const a = {
        audio: {
          echoCancellation: !0,
          noiseSuppression: !0
        },
        video: n && this.defaultCameraId ? {
          deviceId: this.defaultCameraId
        } : n
      };
      navigator.mediaDevices.getUserMedia(a).then(async (o) => {
        this.onLocalProducerInit && this.onLocalProducerInit(o);
        let d = o.getAudioTracks()[0];
        if (d) {
          let p = {
            track: d,
            appData: {
              paused: !this.defaultAudio
            }
          };
          p.codecOptions = {
            opusStereo: !0,
            opusDtx: !0
          }, this.producerAudio = await this.transportSend.produce(p);
        }
        if (d = o.getVideoTracks()[0], d) {
          let p = {
            track: d,
            appData: {
              paused: !this.defaultVideo
            }
          };
          this.producerVideo = await this.transportSend.produce(p);
        }
        e(!0);
      }, (o) => {
        e(o.message);
      }).catch((o) => {
        e(o.message);
      });
    });
  }
  async publishData() {
    const e = await this.socket.emitWithAck("createDataProducerTransport");
    e && (this.transportDataSend = this.device.createSendTransport({ ...e, iceServers: [] }), this.transportDataSend.on("connect", async ({ dtlsParameters: t }, s, r) => {
      this.socket.emitWithAck("connectDataProducerTransport", { dtlsParameters: t }).then(s).catch(r);
    }), this.transportDataSend.on("producedata", async (t, s, r) => {
      try {
        const { id: n, producersExist: a } = await this.socket.emitWithAck("produceData");
        this.onLocalProducerStart && this.onLocalProducerStart(null), a && this.getProducers(), s({ id: n });
      } catch (n) {
        r(n);
      }
    }), this.transportDataSend.on("connectionstatechange", (t) => {
      switch (t) {
        case "connecting":
          console.log("data Connecting to publish");
          break;
        case "connected":
          console.log("data connected");
          break;
        case "failed":
          this.transportDataSend.close(), console.log("data Failed connection");
          break;
      }
    }), this.producerChat = await this.transportDataSend.produceData());
  }
  getProducers() {
    this.socket.emit("getProducers", async (e) => {
      for (let t of e)
        this.producerSet.has(t.id) || (this.producerSet.add(t.id), t.type === "data" ? Rt.push(this.subscribeData.bind(this, t.id)) : (t.type === "camera" || t.type === "screen") && Rt.push(this.subscribe.bind(this, t.id)));
    });
  }
}
export {
  rc as MeetingClient
};
