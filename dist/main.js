!(function (n) {
  var e = {};
  function t(r) {
    if (e[r]) return e[r].exports;
    var o = (e[r] = { i: r, l: !1, exports: {} });
    return n[r].call(o.exports, o, o.exports, t), (o.l = !0), o.exports;
  }
  (t.m = n),
    (t.c = e),
    (t.d = function (n, e, r) {
      t.o(n, e) || Object.defineProperty(n, e, { enumerable: !0, get: r });
    }),
    (t.r = function (n) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(n, "__esModule", { value: !0 });
    }),
    (t.t = function (n, e) {
      if ((1 & e && (n = t(n)), 8 & e)) return n;
      if (4 & e && "object" == typeof n && n && n.__esModule) return n;
      var r = Object.create(null);
      if (
        (t.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: n }),
        2 & e && "string" != typeof n)
      )
        for (var o in n)
          t.d(
            r,
            o,
            function (e) {
              return n[e];
            }.bind(null, o)
          );
      return r;
    }),
    (t.n = function (n) {
      var e =
        n && n.__esModule
          ? function () {
              return n.default;
            }
          : function () {
              return n;
            };
      return t.d(e, "a", e), e;
    }),
    (t.o = function (n, e) {
      return Object.prototype.hasOwnProperty.call(n, e);
    }),
    (t.p = ""),
    t((t.s = 4));
})([
  function (n, e, t) {
    var r = t(1),
      o = t(2);
    "string" == typeof (o = o.__esModule ? o.default : o) &&
      (o = [[n.i, o, ""]]);
    var a = { insert: "head", singleton: !1 };
    r(o, a);
    n.exports = o.locals || {};
  },
  function (n, e, t) {
    "use strict";
    var r,
      o = function () {
        return (
          void 0 === r &&
            (r = Boolean(window && document && document.all && !window.atob)),
          r
        );
      },
      a = (function () {
        var n = {};
        return function (e) {
          if (void 0 === n[e]) {
            var t = document.querySelector(e);
            if (
              window.HTMLIFrameElement &&
              t instanceof window.HTMLIFrameElement
            )
              try {
                t = t.contentDocument.head;
              } catch (n) {
                t = null;
              }
            n[e] = t;
          }
          return n[e];
        };
      })(),
      i = [];
    function c(n) {
      for (var e = -1, t = 0; t < i.length; t++)
        if (i[t].identifier === n) {
          e = t;
          break;
        }
      return e;
    }
    function s(n, e) {
      for (var t = {}, r = [], o = 0; o < n.length; o++) {
        var a = n[o],
          s = e.base ? a[0] + e.base : a[0],
          d = t[s] || 0,
          l = "".concat(s, " ").concat(d);
        t[s] = d + 1;
        var u = c(l),
          f = { css: a[1], media: a[2], sourceMap: a[3] };
        -1 !== u
          ? (i[u].references++, i[u].updater(f))
          : i.push({ identifier: l, updater: v(f, e), references: 1 }),
          r.push(l);
      }
      return r;
    }
    function d(n) {
      var e = document.createElement("style"),
        r = n.attributes || {};
      if (void 0 === r.nonce) {
        var o = t.nc;
        o && (r.nonce = o);
      }
      if (
        (Object.keys(r).forEach(function (n) {
          e.setAttribute(n, r[n]);
        }),
        "function" == typeof n.insert)
      )
        n.insert(e);
      else {
        var i = a(n.insert || "head");
        if (!i)
          throw new Error(
            "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
          );
        i.appendChild(e);
      }
      return e;
    }
    var l,
      u =
        ((l = []),
        function (n, e) {
          return (l[n] = e), l.filter(Boolean).join("\n");
        });
    function f(n, e, t, r) {
      var o = t
        ? ""
        : r.media
        ? "@media ".concat(r.media, " {").concat(r.css, "}")
        : r.css;
      if (n.styleSheet) n.styleSheet.cssText = u(e, o);
      else {
        var a = document.createTextNode(o),
          i = n.childNodes;
        i[e] && n.removeChild(i[e]),
          i.length ? n.insertBefore(a, i[e]) : n.appendChild(a);
      }
    }
    function p(n, e, t) {
      var r = t.css,
        o = t.media,
        a = t.sourceMap;
      if (
        (o ? n.setAttribute("media", o) : n.removeAttribute("media"),
        a &&
          btoa &&
          (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(
            btoa(unescape(encodeURIComponent(JSON.stringify(a)))),
            " */"
          )),
        n.styleSheet)
      )
        n.styleSheet.cssText = r;
      else {
        for (; n.firstChild; ) n.removeChild(n.firstChild);
        n.appendChild(document.createTextNode(r));
      }
    }
    var m = null,
      h = 0;
    function v(n, e) {
      var t, r, o;
      if (e.singleton) {
        var a = h++;
        (t = m || (m = d(e))),
          (r = f.bind(null, t, a, !1)),
          (o = f.bind(null, t, a, !0));
      } else
        (t = d(e)),
          (r = p.bind(null, t, e)),
          (o = function () {
            !(function (n) {
              if (null === n.parentNode) return !1;
              n.parentNode.removeChild(n);
            })(t);
          });
      return (
        r(n),
        function (e) {
          if (e) {
            if (
              e.css === n.css &&
              e.media === n.media &&
              e.sourceMap === n.sourceMap
            )
              return;
            r((n = e));
          } else o();
        }
      );
    }
    n.exports = function (n, e) {
      (e = e || {}).singleton ||
        "boolean" == typeof e.singleton ||
        (e.singleton = o());
      var t = s((n = n || []), e);
      return function (n) {
        if (
          ((n = n || []),
          "[object Array]" === Object.prototype.toString.call(n))
        ) {
          for (var r = 0; r < t.length; r++) {
            var o = c(t[r]);
            i[o].references--;
          }
          for (var a = s(n, e), d = 0; d < t.length; d++) {
            var l = c(t[d]);
            0 === i[l].references && (i[l].updater(), i.splice(l, 1));
          }
          t = a;
        }
      };
    };
  },
  function (n, e, t) {
    (e = t(3)(!1)).push([
      n.i,
      "* {\r\n\tpadding: 0;\r\n\tmargin: 0;\r\n\tbox-sizing: border-box;\r\n}\r\n\r\n/* Header */\r\nheader {\r\n\tbackground: #a8ff78;\r\n\t/* fallback for old browsers */\r\n\tbackground: -webkit-linear-gradient(to right, #78ffd6, #a8ff78);\r\n\t/* Chrome 10-25, Safari 5.1-6 */\r\n\tbackground: linear-gradient(to right, #78ffd6, #a8ff78);\r\n\t/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\r\n\tpadding: 10px;\r\n\tcolor: #444;\r\n\tmargin-bottom: 10px;\r\n}\r\n\r\n.movie-wrapper {\r\n\tdisplay: flex;\r\n}\r\n\r\n/* Auto complete drop down */\r\n.autocomplete-section {\r\n\tposition: relative;\r\n\tflex: 1;\r\n\tpadding: 10px;\r\n}\r\n\r\n.dropdown {\r\n\tmargin-top: 0.5rem;\r\n\tdisplay: none;\r\n\tposition: absolute;\r\n\ttop: 10;\r\n\tleft: 0;\r\n}\r\n\r\n.dropdown-content {\r\n\tbackground-color: white;\r\n\tborder-radius: 4px;\r\n\tbox-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);\r\n\tpadding-bottom: 0.5rem;\r\n\tpadding-top: 0.5rem;\r\n\tpadding-left: 0.5rem;\r\n\toverflow-y: scroll;\r\n\tmax-height: 25rem;\r\n}\r\n\r\n.dropdown-item {\r\n\tdisplay: flex;\r\n\theight: 60px;\r\n\talign-items: center;\r\n}\r\n\r\n/* Input */\r\n#search {\r\n\tpadding: 5px;\r\n\tborder: #444 solid 1px;\r\n}\r\n\r\na {\r\n\tcolor: #333;\r\n\ttext-decoration: none;\r\n}\r\n\r\na > img {\r\n\theight: 50px;\r\n\tpadding: 0.3rem;\r\n}\r\n\r\na:hover {\r\n\tbackground-color: #666;\r\n\tcolor: #fff;\r\n}\r\n\r\n/* MOVIE DATA SECTION */\r\n.movie-data-container {\r\n\t\r\n}\r\n.movie-stat-section {\r\n  display: flex;\r\n  height: 40vh;\r\n}\r\n.movie-stat-section > div {\r\n  background: #00f260;\r\n\t/* fallback for old browsers */\r\n\tbackground: -webkit-linear-gradient(to right, #0575e6, #00f260);\r\n\t/* Chrome 10-25, Safari 5.1-6 */\r\n  background: linear-gradient(to right, #0575e6, #00f260);\r\n  margin: 0 10px;\r\n}\r\n.movie-stat-section img {\r\n  height: auto;\r\n  margin: 0 15px;\r\n}\r\n.movie-data {\r\n  color: #fff;\r\n  margin: 10px;\r\n}",
      "",
    ]),
      (n.exports = e);
  },
  function (n, e, t) {
    "use strict";
    n.exports = function (n) {
      var e = [];
      return (
        (e.toString = function () {
          return this.map(function (e) {
            var t = (function (n, e) {
              var t = n[1] || "",
                r = n[3];
              if (!r) return t;
              if (e && "function" == typeof btoa) {
                var o =
                    ((i = r),
                    (c = btoa(unescape(encodeURIComponent(JSON.stringify(i))))),
                    (s = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(
                      c
                    )),
                    "/*# ".concat(s, " */")),
                  a = r.sources.map(function (n) {
                    return "/*# sourceURL="
                      .concat(r.sourceRoot || "")
                      .concat(n, " */");
                  });
                return [t].concat(a).concat([o]).join("\n");
              }
              var i, c, s;
              return [t].join("\n");
            })(e, n);
            return e[2] ? "@media ".concat(e[2], " {").concat(t, "}") : t;
          }).join("");
        }),
        (e.i = function (n, t, r) {
          "string" == typeof n && (n = [[null, n, ""]]);
          var o = {};
          if (r)
            for (var a = 0; a < this.length; a++) {
              var i = this[a][0];
              null != i && (o[i] = !0);
            }
          for (var c = 0; c < n.length; c++) {
            var s = [].concat(n[c]);
            (r && o[s[0]]) ||
              (t &&
                (s[2]
                  ? (s[2] = "".concat(t, " and ").concat(s[2]))
                  : (s[2] = t)),
              e.push(s));
          }
        }),
        e
      );
    };
  },
  function (n, e, t) {
    "use strict";
    t.r(e);
    t(0);
    ((n, e) => {
      const t = e.DOMStrings,
        r = () => {
          document.querySelector(t.search).addEventListener("input", o),
            document
              .querySelector(t.dropdownContent)
              .addEventListener("click", a);
        },
        o = async (r) => {
          const o = await n.onMovieSearch(r.target.value).then((n) => n),
            a = document.querySelector(t.dropdown),
            i = document.querySelector(t.results);
          o.length
            ? ((a.style.display = "block"),
              (i.innerHTML = ""),
              e.renderDropdownMovies(o))
            : (a.style.display = "none");
        },
        a = async (r) => {
          if ("dropdown-item" === r.target.className) {
            const o = await n.onMovieSelect(r.target.textContent);
            (() => {
              const n = document.querySelector(t.dropdown);
              (document.querySelector(t.search).value = ""),
                (n.style.display = "none");
            })(),
              ((n) => {
                const r = document.querySelector(t.movieStatSection);
                (r.innerHTML = ""), (r.innerHTML += e.renderMovieStat(n));
              })(o);
          }
        };
      return {
        init: () => {
          (document.querySelector(t.autocompleteSection).innerHTML =
            '\n  <div class="autocomplete">\n    <label for="search">Search</label>\n    <input type="text" id="search" name="search">\n      <div class="dropdown">\n        <div class="dropdown-menu">\n          <div class="dropdown-content results">\n          </div>\n        </div>\n      </div>\n    </div>\n  '),
            r();
        },
      };
    })(
      {
        onMovieSearch: async (n) => {
          const e = await fetch(
            "http://www.omdbapi.com/?apikey=6d5ddc8d&s=" + n
          )
            .then((n) => n.json())
            .then((n) => n)
            .catch((n) => {
              console.log(n);
            });
          return e.Error ? [] : e.Search;
        },
        onMovieSelect: async (n) =>
          await fetch("http://www.omdbapi.com/?apikey=6d5ddc8d&t=" + n)
            .then((n) => n.json())
            .then((n) => n)
            .catch((n) => {
              console.log(n);
            }),
      },
      (() => {
        const n = {
          dropdown: ".dropdown",
          results: ".results",
          search: "#search",
          dropdownContent: ".dropdown-content",
          autocompleteSection: ".autocomplete-section",
          movieStatSection: ".movie-stat-section",
        };
        return {
          DOMStrings: n,
          renderMovieStat: (n) =>
            `\n    <img src=${n.Poster}>\n    <div>\n      <h3 class="movie-data">Box Office: ${n.BoxOffice}</h3>\n      <h3 class="movie-data">Genres: ${n.Genre}</h3>\n      <h3 class="movie-data">Release Date: ${n.Released}</h3>\n      <h3 class="movie-data">Rating: ${n.Rated}</h3>\n      <h3 class="movie-data">Awards: ${n.Awards}</h3>\n    </div>\n    `,
          renderDropdownMovies: (e) => {
            e.forEach((e) => {
              let t = e.Poster;
              "N/A" === t && (t = ""),
                (document.querySelector(
                  n.results
                ).innerHTML += `\n      <a href="#" class="dropdown-item">\n        <img src=${t}>\n        ${e.Title}\n      </a>\n      `);
            });
          },
        };
      })()
    ).init();
  },
]);
