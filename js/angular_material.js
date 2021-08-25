/*!
 * AngularJS Material Design
 * https://github.com/angular/material
 * @license MIT
 * v1.2.3-master-8add881
 */
! function(L, be, ge) {
    "use strict";

    function e(e, t) {
        if (t.has("$swipe")) {
            e.warn("You are using the ngTouch module. \nAngularJS Material already has mobile click, tap, and swipe support... \nngTouch is not supported with AngularJS Material!")
        }
    }

    function t(e, t) {
        e.decorator("$$rAF", ["$delegate", n]), e.decorator("$q", ["$delegate", o]), t.theme("default").primaryPalette("indigo").accentPalette("pink").warnPalette("deep-orange").backgroundPalette("grey")
    }

    function n(i) {
        return i.throttle = function(e) {
            var t, n, o, r;
            return function() {
                t = arguments, r = this, o = e, n || (n = !0, i(function() {
                    o.apply(r, Array.prototype.slice.call(t)), n = !1
                }))
            }
        }, i
    }

    function o(e) {
        return e.resolve || (e.resolve = e.when), e
    }

    function r(i) {
        return {
            restrict: "A",
            link: {
                pre: function(e, t, n) {
                    var o = n.mdAutoFocus || n.mdAutofocus || n.mdSidenavFocus;
                    r(i(o)(e)), o && e.$watch(o, r);

                    function r(e) {
                        be.isUndefined(e) && (e = !0), t.toggleClass("md-autofocus", !!e)
                    }
                }
            }
        }
    }

    function i(e, d) {
        function s() {
            return !0
        }
        e && !be.isArray(e) && (e = Array.prototype.slice.call(e)), d = !!d;
        var l = e || [];
        return {
            items: function() {
                return [].concat(l)
            },
            count: function() {
                return l.length
            },
            inRange: c,
            contains: t,
            indexOf: m,
            itemAt: function(e) {
                return c(e) ? l[e] : null
            },
            findBy: function(t, n) {
                return l.filter(function(e) {
                    return e[t] === n
                })
            },
            add: function(e, t) {
                if (!e) return -1;
                be.isNumber(t) || (t = l.length);
                return l.splice(t, 0, e), m(e)
            },
            remove: function(e) {
                t(e) && l.splice(m(e), 1)
            },
            first: u,
            last: p,
            next: be.bind(null, n, !1),
            previous: be.bind(null, n, !0),
            hasPrevious: function(e) {
                return !!e && c(m(e) - 1)
            },
            hasNext: function(e) {
                return !!e && c(m(e) + 1)
            }
        };

        function c(e) {
            return l.length && -1 < e && e < l.length
        }

        function m(e) {
            return l.indexOf(e)
        }

        function t(e) {
            return e && -1 < m(e)
        }

        function u() {
            return l.length ? l[0] : null
        }

        function p() {
            return l.length ? l[l.length - 1] : null
        }

        function n(e, t, n, o) {
            n = n || s;
            for (var r = m(t);;) {
                if (!c(r)) return null;
                var i = r + (e ? -1 : 1),
                    a = null;
                if (c(i) ? a = l[i] : d && (i = m(a = e ? p() : u())), null === a || i === o) return null;
                if (n(a)) return a;
                be.isUndefined(o) && (o = i), r = i
            }
        }
    }

    function a(a, t, o) {
        var i = {},
            d = {},
            r = {},
            n = {};
        return e.getResponsiveAttribute = function(e, t) {
            for (var n = 0; n < a.MEDIA_PRIORITY.length; n++) {
                var o = a.MEDIA_PRIORITY[n];
                if (d[i[o]].matches) {
                    var r = l(e, t + "-" + o);
                    if (e[r]) return e[r]
                }
            }
            return e[l(e, t)]
        }, e.getQuery = function(e) {
            return d[e]
        }, e.watchResponsiveAttributes = function(e, o, r) {
            var i = [];
            return e.forEach(function(e) {
                    var t = l(o, e);
                    for (var n in be.isDefined(o[t]) && i.push(o.$observe(t, be.bind(void 0, r, null))), a.MEDIA) t = l(o, e + "-" + n), be.isDefined(o[t]) && i.push(o.$observe(t, be.bind(void 0, r, n)))
                }),
                function() {
                    i.forEach(function(e) {
                        e()
                    })
                }
        }, e;

        function e(e) {
            var t = i[e];
            be.isUndefined(t) && (t = i[e] = function(e) {
                return a.MEDIA[e] || ("(" !== e.charAt(0) ? "(" + e + ")" : e)
            }(e));
            var n = r[t];
            return be.isUndefined(n) && (n = function(e) {
                var t = d[e];
                t = t || (d[e] = o.matchMedia(e));
                return t.addListener(s), r[t.media] = !!t.matches
            }(t)), n
        }

        function s(e) {
            t.$evalAsync(function() {
                r[e.media] = !!e.matches
            })
        }

        function l(e, t) {
            return n[t] || (n[t] = e.$normalize(t))
        }
    }

    function d(e, t) {
        var o = ["data", "x"];
        return e ? t ? n(e) : r(e) : {
            buildList: r,
            buildSelector: n,
            hasAttribute: function(e, t) {
                if (!(e = i(e))) return !1;
                for (var n = r(t), o = 0; o < n.length; o++)
                    if (e.hasAttribute(n[o])) return !0;
                return !1
            },
            removeAttribute: function(t, e) {
                if (!(t = i(t))) return;
                r(e).forEach(function(e) {
                    t.removeAttribute(e)
                })
            }
        };

        function r(n) {
            return (n = be.isArray(n) ? n : [n]).forEach(function(t) {
                o.forEach(function(e) {
                    n.push(e + "-" + t)
                })
            }), n
        }

        function n(e) {
            return r(e = be.isArray(e) ? e : [e]).map(function(e) {
                return "[" + e + "]"
            }).join(",")
        }

        function i(e) {
            if ((e = e[0] || e).nodeType) return e
        }
    }

    function A(e) {
        return e.replace(/-[a-z]/g, function(e) {
            return e.charAt(1).toUpperCase()
        })
    }
    var w, _, k, x, N, s, l, c, m, u, p, h, f, b, g, E, v, $, M, y, C, T;

    function S(o, r, s, i) {
        var a = this.showWarnings;
        return {
            expect: d,
            expectAsync: l,
            expectWithText: function(e, t) {
                var n = c(e) || ""; - 1 < n.indexOf(i.startSymbol()) ? l(e, t, function() {
                    return c(e)
                }) : d(e, t, n)
            },
            expectWithoutText: function(e, t) {
                var n = c(e); - 1 < n.indexOf(i.startSymbol()) || n || d(e, t, n)
            },
            getText: c,
            hasAriaLabel: m,
            parentHasAriaLabel: function e(t, n) {
                n = n || 1;
                var o = be.element(t)[0] || t;
                if (!o.parentNode) return !1;
                if (r(o.parentNode)) return !0;
                n--;
                if (n) return e(o.parentNode, n);
                return !1;

                function r(e) {
                    if (!m(e)) return !1;
                    if (e.hasAttribute("role")) switch (e.getAttribute("role").toLowerCase()) {
                        case "command":
                        case "definition":
                        case "directory":
                        case "grid":
                        case "list":
                        case "listitem":
                        case "log":
                        case "marquee":
                        case "menu":
                        case "menubar":
                        case "note":
                        case "presentation":
                        case "separator":
                        case "scrollbar":
                        case "status":
                        case "tablist":
                            return !1
                    }
                    switch (e.tagName.toLowerCase()) {
                        case "abbr":
                        case "acronym":
                        case "address":
                        case "applet":
                        case "audio":
                        case "b":
                        case "bdi":
                        case "bdo":
                        case "big":
                        case "blockquote":
                        case "br":
                        case "canvas":
                        case "caption":
                        case "center":
                        case "cite":
                        case "code":
                        case "col":
                        case "data":
                        case "dd":
                        case "del":
                        case "dfn":
                        case "dir":
                        case "div":
                        case "dl":
                        case "em":
                        case "embed":
                        case "fieldset":
                        case "figcaption":
                        case "font":
                        case "h1":
                        case "h2":
                        case "h3":
                        case "h4":
                        case "h5":
                        case "h6":
                        case "hgroup":
                        case "html":
                        case "i":
                        case "ins":
                        case "isindex":
                        case "kbd":
                        case "keygen":
                        case "label":
                        case "legend":
                        case "li":
                        case "map":
                        case "mark":
                        case "menu":
                        case "object":
                        case "ol":
                        case "output":
                        case "pre":
                        case "presentation":
                        case "q":
                        case "rt":
                        case "ruby":
                        case "samp":
                        case "small":
                        case "source":
                        case "span":
                        case "status":
                        case "strike":
                        case "strong":
                        case "sub":
                        case "sup":
                        case "svg":
                        case "tbody":
                        case "td":
                        case "th":
                        case "thead":
                        case "time":
                        case "tr":
                        case "track":
                        case "tt":
                        case "ul":
                        case "var":
                            return !1
                    }
                    return !0
                }
            }
        };

        function d(e, t, n) {
            var o = be.element(e)[0] || e;
            !o || o.hasAttribute(t) && 0 !== o.getAttribute(t).length || function(e, t) {
                var n = e.hasChildNodes(),
                    o = !1;
                if (n)
                    for (var r = e.childNodes, i = 0; i < r.length; i++) {
                        var a = r[i];
                        1 === a.nodeType && a.hasAttribute(t) && "none" !== ((d = a).currentStyle ? d.currentStyle : s.getComputedStyle(d)).display && (o = !0)
                    }
                var d;
                return o
            }(o, t) || ((n = be.isString(n) ? n.trim() : "").length ? e.attr(t, n) : a && r.warn('ARIA: Attribute "', t, '", required for accessibility, is missing on node:', o))
        }

        function l(e, t, n) {
            o(function() {
                d(e, t, n())
            })
        }

        function c(t) {
            t = t[0] || t;
            for (var e, n = document.createTreeWalker(t, NodeFilter.SHOW_TEXT, null, !1), o = ""; e = n.nextNode();) r(e) || (o += e.textContent);
            return o.trim() || "";

            function r(e) {
                for (; e.parentNode && (e = e.parentNode) !== t;)
                    if (e.getAttribute && "true" === e.getAttribute("aria-hidden")) return !0
            }
        }

        function m(e) {
            var t = be.element(e)[0] || e;
            return !!t.hasAttribute && (t.hasAttribute("aria-label") || t.hasAttribute("aria-labelledby") || t.hasAttribute("aria-describedby"))
        }
    }

    function D() {
        function i(e, t, n, o, r) {
            this.$q = e, this.$templateRequest = t, this.$injector = n, this.$compile = o, this.$controller = r
        }
        this.$get = ["$q", "$templateRequest", "$injector", "$compile", "$controller", function(e, t, n, o, r) {
            return new i(e, t, n, o, r)
        }], i.prototype.compile = function(e) {
            return e.contentElement ? this._prepareContentElement(e) : this._compileTemplate(e)
        }, i.prototype._prepareContentElement = function(e) {
            var t = this._fetchContentElement(e);
            return this.$q.resolve({
                element: t.element,
                cleanup: t.restore,
                locals: {},
                link: function() {
                    return t.element
                }
            })
        }, i.prototype._compileTemplate = function(o) {
            var r = this,
                e = o.templateUrl,
                t = o.template || "",
                n = be.extend({}, o.resolve),
                i = be.extend({}, o.locals),
                a = o.transformTemplate || be.identity;
            return be.forEach(n, function(e, t) {
                be.isString(e) ? n[t] = r.$injector.get(e) : n[t] = r.$injector.invoke(e)
            }), be.extend(n, i), n.$$ngTemplate = e ? this.$templateRequest(e) : this.$q.when(t), this.$q.all(n).then(function(e) {
                var t = a(e.$$ngTemplate, o),
                    n = o.element || be.element("<div>").html(t.trim()).contents();
                return r._compileElement(e, n, o)
            })
        }, i.prototype._compileElement = function(o, r, i) {
            var a = this,
                d = this.$compile(r),
                s = {
                    element: r,
                    cleanup: r.remove.bind(r),
                    locals: o,
                    link: function(e) {
                        if (o.$scope = e, i.controller) {
                            var t = be.extend({}, o, {
                                    $element: r
                                }),
                                n = a._createController(i, t, o);
                            be.isFunction(n.$onDestroy) && e.$on("$destroy", function() {
                                be.isFunction(n.$onDestroy) && n.$onDestroy()
                            }), r.data("$ngControllerController", n), r.children().data("$ngControllerController", n), s.controller = n
                        }
                        return d(e)
                    }
                };
            return s
        }, i.prototype._createController = function(e, t, n) {
            var o = this.$controller(e.controller, t);
            return e.bindToController && be.extend(o, n), e.controllerAs && (t.$scope[e.controllerAs] = o), be.isFunction(o.$onInit) && o.$onInit(), o
        }, i.prototype._fetchContentElement = function(e) {
            var t, n = e.contentElement;
            return t = be.isString(n) ? o(n = document.querySelector(n)) : (n = n[0] || n, document.contains(n) ? o(n) : function() {
                n.parentNode && n.parentNode.removeChild(n)
            }), {
                element: be.element(n),
                restore: t
            };

            function o(e) {
                var t = e.parentNode,
                    n = e.nextElementSibling;
                return function() {
                    n ? t.insertBefore(e, n) : t.appendChild(e)
                }
            }
        }
    }

    function H(e, t, n) {
        this.$timeout = e, this.$mdUtil = t, this.$rootScope = n, this.pointerEvent = "MSPointerEvent" in L ? "MSPointerDown" : "PointerEvent" in L ? "pointerdown" : null, this.bodyElement = be.element(document.body), this.isBuffering = !1, this.bufferTimeout = null, this.lastInteractionType = null, this.lastInteractionTime = null, this.inputHandler = this.onInputEvent.bind(this), this.bufferedInputHandler = this.onBufferInputEvent.bind(this), this.inputEventMap = {
            keydown: "keyboard",
            mousedown: "mouse",
            mouseenter: "mouse",
            touchstart: "touch",
            pointerdown: "pointer",
            MSPointerDown: "pointer"
        }, this.iePointerMap = {
            2: "touch",
            3: "touch",
            4: "mouse"
        }, this.initializeEvents(), this.$rootScope.$on("$destroy", this.deregister.bind(this))
    }

    function I(e) {
        return e.replace(h, "").replace(f, function(e, t, n, o) {
            return o ? n.toUpperCase() : n
        })
    }

    function O() {
        var e = !!document.querySelector("[md-layouts-disabled]");
        T.enabled = !e
    }

    function P() {
        return T.enabled = !1, {
            restrict: "A",
            priority: "900"
        }
    }

    function R(o) {
        return ["$mdUtil", "$interpolate", "$log", function(e, t, n) {
            return l = e, c = t, m = n, {
                restrict: "A",
                compile: function(e, t) {
                    var n;
                    return T.enabled && (B(o, z(o, t, ""), U(e, o, t)), r(null, e), n = r), n || be.noop
                }
            }
        }];

        function r(e, t) {
            t.addClass(o)
        }
    }

    function F(e, t, n, o) {
        var r, i = n[0].nodeName.toLowerCase();
        switch (e.replace(E, "")) {
            case "flex":
                "md-button" !== i && "fieldset" !== i || (r = "<" + i + " " + e + "></" + i + ">", "https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers", "Markup '{0}' may not work as expected in IE Browsers. Consult '{1}' for details.", o.warn(l.supplant("Markup '{0}' may not work as expected in IE Browsers. Consult '{1}' for details.", [r, "https://github.com/philipwalton/flexbugs#9-some-html-elements-cant-be-flex-containers"])))
        }
    }

    function B(e, t, n) {
        var o = t;
        if (!j(t)) {
            switch (e.replace(E, "")) {
                case "layout":
                    q(t, M) || (t = M[0]);
                    break;
                case "flex":
                    q(t, $) || isNaN(t) && (t = "");
                    break;
                case "flex-offset":
                case "flex-order":
                    t && !isNaN(+t) || (t = "0");
                    break;
                case "layout-align":
                    var r = function(e) {
                        var t, n = {
                            main: "start",
                            cross: "stretch"
                        };
                        0 !== (e = e || "").indexOf("-") && 0 !== e.indexOf(" ") || (e = "none" + e);
                        (t = e.toLowerCase().trim().replace(v, "-").split("-")).length && "space" === t[0] && (t = [t[0] + "-" + t[1], t[2]]);
                        0 < t.length && (n.main = t[0] || n.main);
                        1 < t.length && (n.cross = t[1] || n.cross);
                        y.indexOf(n.main) < 0 && (n.main = "start");
                        C.indexOf(n.cross) < 0 && (n.cross = "stretch");
                        return n
                    }(t);
                    t = l.supplant("{main}-{cross}", r);
                    break;
                case "layout-padding":
                case "layout-margin":
                case "layout-fill":
                case "layout-wrap":
                case "layout-nowrap":
                    t = ""
            }
            t !== o && (n || be.noop)(t)
        }
        return t ? t.trim() : ""
    }

    function U(e, t, n) {
        return function(e) {
            j(e) || (n[n.$normalize(t)] = e)
        }
    }

    function j(e) {
        return -1 < (e || "").indexOf(c.startSymbol())
    }

    function z(e, t, n) {
        var o = t.$normalize(e);
        return t[o] ? t[o].trim().replace(v, "-") : n || null
    }

    function q(t, e, n) {
        t = n && t ? t.replace(v, n) : t;
        var o = !1;
        return t && e.forEach(function(e) {
            e = n ? e.replace(v, n) : e, o = o || e === t
        }), o
    }

    function V(e) {
        this._$timeout = e, this._liveElement = this._createLiveElement(), this._announceTimeout = 100
    }

    function W(n, o) {
        var r, i = [],
            a = {};
        return r = {
            notFoundError: function(e, t) {
                n.error((t || "") + "No instance found for handle", e)
            },
            getInstances: function() {
                return i
            },
            get: function(e) {
                if (!d(e)) return null;
                var t, n, o;
                for (t = 0, n = i.length; t < n; t++)
                    if ((o = i[t]).$$mdHandle === e) return o;
                return null
            },
            register: function(t, e) {
                return e ? (t.$$mdHandle = e, i.push(t), (n = a[e]) && (n.forEach(function(e) {
                    e.resolve(t)
                }), delete a[e]), function() {
                    var e = i.indexOf(t); - 1 !== e && i.splice(e, 1)
                }) : be.noop;
                var n
            },
            when: function(e) {
                if (d(e)) {
                    var t = o.defer(),
                        n = r.get(e);
                    return n ? t.resolve(n) : (a[e] === ge && (a[e] = []), a[e].push(t)), t.promise
                }
                return o.reject("Invalid `md-component-id` value.")
            }
        };

        function d(e) {
            return e && "" !== e
        }
    }

    function Y(o) {
        return {
            attach: function(e, t, n) {
                return n = be.extend(function(e) {
                    return e.hasClass("md-icon-button") ? {
                        isMenuItem: e.hasClass("md-menu-item"),
                        fitRipple: !0,
                        center: !0
                    } : {
                        isMenuItem: e.hasClass("md-menu-item"),
                        dimBackground: !0
                    }
                }(t), n), o.attach(e, t, n)
            }
        }
    }

    function K(o) {
        return {
            attach: function(e, t, n) {
                return o.attach(e, t, be.extend({
                    center: !0,
                    dimBackground: !1,
                    fitRipple: !0
                }, n))
            }
        }
    }

    function G(o) {
        return {
            attach: function(e, t, n) {
                return o.attach(e, t, be.extend({
                    center: !1,
                    dimBackground: !0,
                    outline: !1,
                    rippleSize: "full"
                }, n))
            }
        }
    }

    function X(o) {
        return {
            attach: function(e, t, n) {
                return o.attach(e, t, be.extend({
                    center: !1,
                    dimBackground: !0,
                    outline: !1,
                    rippleSize: "full"
                }, n))
            }
        }
    }

    function Z(l) {
        var c = "virtual",
            t = ["standard", c];

        function m(e) {
            return e ? (e = e.toLowerCase(), -1 < t.indexOf(e) ? e : c) : c
        }
        return {
            controller: "MdAutocompleteCtrl",
            controllerAs: "$mdAutocompleteCtrl",
            scope: {
                inputName: "@mdInputName",
                inputMinlength: "@mdInputMinlength",
                inputMaxlength: "@mdInputMaxlength",
                searchText: "=?mdSearchText",
                selectedItem: "=?mdSelectedItem",
                itemsExpr: "@mdItems",
                itemText: "&mdItemText",
                placeholder: "@placeholder",
                inputAriaDescribedBy: "@?inputAriaDescribedby",
                inputAriaLabelledBy: "@?inputAriaLabelledby",
                inputAriaLabel: "@?inputAriaLabel",
                noCache: "=?mdNoCache",
                requireMatch: "=?mdRequireMatch",
                selectOnMatch: "=?mdSelectOnMatch",
                matchInsensitive: "=?mdMatchCaseInsensitive",
                itemChange: "&?mdSelectedItemChange",
                textChange: "&?mdSearchTextChange",
                minLength: "=?mdMinLength",
                delay: "=?mdDelay",
                autofocus: "=?mdAutofocus",
                floatingLabel: "@?mdFloatingLabel",
                autoselect: "=?mdAutoselect",
                menuClass: "@?mdMenuClass",
                menuContainerClass: "@?mdMenuContainerClass",
                inputClass: "@?mdInputClass",
                inputId: "@?mdInputId",
                escapeOptions: "@?mdEscapeOptions",
                dropdownItems: "=?mdDropdownItems",
                dropdownPosition: "@?mdDropdownPosition",
                clearButton: "=?mdClearButton",
                selectedMessage: "@?mdSelectedMessage",
                noMatchMessage: "@?mdNoMatchMessage",
                singleMatchMessage: "@?mdSingleMatchMessage",
                multipleMatchStartMessage: "@?mdMultipleMatchStartMessage",
                multipleMatchEndMessage: "@?mdMultipleMatchEndMessage",
                mdMode: "=?mdMode"
            },
            compile: function(e, n) {
                var o = e.find("input");
                return ["md-select-on-focus", "md-no-asterisk", "ng-trim", "ng-pattern"].forEach(function(e) {
                        var t = n[n.$normalize(e)];
                        null !== t && o.attr(e, t)
                    }),
                    function(e, t, n, o) {
                        o.hasNotFound = !!t.attr("md-has-not-found"), be.isDefined(n.mdClearButton) || e.floatingLabel || (e.clearButton = !0), e.mdMode = m(n.mdMode), t.on("click touchstart touchend", function(e) {
                            e.stopPropagation()
                        })
                    }
            },
            template: function(n, e) {
                var t, o, r = (t = n.find("md-not-found").detach(), (o = t.length ? t.html() : "") ? '<li ng-if="$mdAutocompleteCtrl.notFoundVisible()" class="md-autocomplete-suggestion"                         md-autocomplete-parent-scope>' + o + "</li>" : ""),
                    i = function() {
                        var e = n.find("md-item-template").detach(),
                            t = e.length ? e.html() : n.html();
                        e.length || n.empty();
                        return "<md-autocomplete-parent-scope md-autocomplete-replace>" + t + "</md-autocomplete-parent-scope>"
                    }(),
                    a = n.html(),
                    d = e.tabindex;
                return r && n.attr("md-has-not-found", !0), n.attr("tabindex", "-1"), "        <md-autocomplete-wrap            ng-class=\"{ 'md-whiteframe-z1': !floatingLabel,                         'md-menu-showing': !$mdAutocompleteCtrl.hidden,                         'md-show-clear-button': !!clearButton }\">          " + (e.mdFloatingLabel ? '            <md-input-container ng-if="floatingLabel">              <label>{{floatingLabel}}</label>              <input type="text"                ' + (null != d ? 'tabindex="' + d + '"' : "") + '                id="{{inputId || \'fl-input-\' + $mdAutocompleteCtrl.id}}"                name="{{inputName || \'fl-input-\' + $mdAutocompleteCtrl.id }}"                ng-class="::inputClass"                autocomplete="off"                ng-required="$mdAutocompleteCtrl.isRequired"                ng-readonly="$mdAutocompleteCtrl.isReadonly"                ng-minlength="inputMinlength"                ng-maxlength="inputMaxlength"                ng-disabled="$mdAutocompleteCtrl.isDisabled"                ng-model="$mdAutocompleteCtrl.scope.searchText"                ng-model-options="{ allowInvalid: true }"                ng-mousedown="$mdAutocompleteCtrl.focusInput()"                ng-keydown="$mdAutocompleteCtrl.keydown($event)"                ng-blur="$mdAutocompleteCtrl.blur($event)"                ng-focus="$mdAutocompleteCtrl.focus($event)"                aria-label="{{floatingLabel}}"                ng-attr-aria-autocomplete="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'list\'}}"                ng-attr-role="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'combobox\'}}"                aria-haspopup="{{!$mdAutocompleteCtrl.isDisabled}}"                aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"                ng-attr-aria-owns="{{$mdAutocompleteCtrl.hidden || $mdAutocompleteCtrl.isDisabled ? undefined : \'ul-\' + $mdAutocompleteCtrl.id}}"                ng-attr-aria-activedescendant="{{!$mdAutocompleteCtrl.hidden && $mdAutocompleteCtrl.activeOption ? $mdAutocompleteCtrl.activeOption : undefined}}">              <div md-autocomplete-parent-scope md-autocomplete-replace>' + a + "</div>            </md-input-container>" : '            <input type="text"              ' + (null != d ? 'tabindex="' + d + '"' : "") + '              id="{{inputId || \'input-\' + $mdAutocompleteCtrl.id}}"              name="{{inputName || \'input-\' + $mdAutocompleteCtrl.id }}"              ng-class="::inputClass"              ng-if="!floatingLabel"              autocomplete="off"              ng-required="$mdAutocompleteCtrl.isRequired"              ng-disabled="$mdAutocompleteCtrl.isDisabled"              ng-readonly="$mdAutocompleteCtrl.isReadonly"              ng-minlength="inputMinlength"              ng-maxlength="inputMaxlength"              ng-model="$mdAutocompleteCtrl.scope.searchText"              ng-mousedown="$mdAutocompleteCtrl.focusInput()"              ng-keydown="$mdAutocompleteCtrl.keydown($event)"              ng-blur="$mdAutocompleteCtrl.blur($event)"              ng-focus="$mdAutocompleteCtrl.focus($event)"              placeholder="{{placeholder}}"              aria-label="{{placeholder}}"              ng-attr-aria-autocomplete="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'list\'}}"              ng-attr-role="{{$mdAutocompleteCtrl.isDisabled ? undefined : \'combobox\'}}"              aria-haspopup="{{!$mdAutocompleteCtrl.isDisabled}}"              aria-expanded="{{!$mdAutocompleteCtrl.hidden}}"              ng-attr-aria-owns="{{$mdAutocompleteCtrl.hidden || $mdAutocompleteCtrl.isDisabled ? undefined : \'ul-\' + $mdAutocompleteCtrl.id}}"              ng-attr-aria-activedescendant="{{!$mdAutocompleteCtrl.hidden && $mdAutocompleteCtrl.activeOption ? $mdAutocompleteCtrl.activeOption : undefined}}">') + '          <button type="button" aria-label="Clear Input" tabindex="0" ng-if="clearButton && $mdAutocompleteCtrl.scope.searchText" ng-click="$mdAutocompleteCtrl.clear($event)"><md-icon md-svg-src="' + l.mdClose + '"></md-icon></button>          <md-progress-linear              class="' + (e.mdFloatingLabel ? "md-inline" : "") + '"              ng-if="$mdAutocompleteCtrl.loadingIsVisible()"              md-mode="indeterminate"></md-progress-linear>          ' + function(e, t) {
                    if (e = e ? " " + e : "", s(t)) return '            <div                 ng-hide="$mdAutocompleteCtrl.hidden"                class="md-standard-list-container md-autocomplete-suggestions-container md-whiteframe-z1' + e + '"                ng-class="{ \'md-not-found\': $mdAutocompleteCtrl.notFoundVisible() }"                ng-mouseenter="$mdAutocompleteCtrl.listEnter()"                ng-mouseleave="$mdAutocompleteCtrl.listLeave()"                role="presentation">              <div class="md-standard-list-scroller" role="presentation">';
                    return '          <md-virtual-repeat-container              md-auto-shrink              md-auto-shrink-min="1"              ng-hide="$mdAutocompleteCtrl.hidden"              class="md-virtual-repeat-container md-autocomplete-suggestions-container md-whiteframe-z1' + e + '"              ng-class="{ \'md-not-found\': $mdAutocompleteCtrl.notFoundVisible() }"              ng-mouseenter="$mdAutocompleteCtrl.listEnter()"              ng-mouseleave="$mdAutocompleteCtrl.listLeave()"              role="presentation">'
                }(e.mdMenuContainerClass, e.mdMode) + '            <ul class="md-autocomplete-suggestions"                ng-class="::menuClass"                id="ul-{{$mdAutocompleteCtrl.id}}"                ng-mouseup="$mdAutocompleteCtrl.focusInput()"                role="listbox">              <li class="md-autocomplete-suggestion" ' + (s(e.mdMode) ? "ng-repeat" : "md-virtual-repeat") + ' ="item in $mdAutocompleteCtrl.matches"                  ng-class="{ selected: $index === $mdAutocompleteCtrl.index }"                  ng-attr-id="{{\'md-option-\' + $mdAutocompleteCtrl.id + \'-\' + $index}}"                  ng-click="$mdAutocompleteCtrl.select($index)"                  role="option"                  aria-setsize="{{$mdAutocompleteCtrl.matches.length}}"                  aria-posinset="{{$index+1}}"                  aria-selected="{{$index === $mdAutocompleteCtrl.index ? true : false}}"                   md-extra-name="$mdAutocompleteCtrl.itemName">                  ' + i + "                  </li>" + r + "            </ul>          " + (s(e.mdMode) ? "   </div>              </div>            </div>" : "</md-virtual-repeat-container>") + "        </md-autocomplete-wrap>";

                function s(e) {
                    return m(e) !== c
                }
            }
        }
    }

    function Q(e, c) {
        return {
            restrict: "AE",
            compile: function(e, t, l) {
                return function(n, t, e) {
                    var o, r, i = n.$mdAutocompleteCtrl,
                        a = i.parent.$new(),
                        d = i.itemName;

                    function s(e, t) {
                        a[t] = n[e], n.$watch(e, function(e) {
                            c.nextTick(function() {
                                a[t] = e
                            })
                        })
                    }
                    s("$index", "$index"), s("item", d), r = o = !1, n.$watch(function() {
                        r || o || (o = !0, n.$$postDigest(function() {
                            r || a.$digest(), o = r = !1
                        }))
                    }), a.$watch(function() {
                        r = !0
                    }), l(a, function(e) {
                        t.after(e)
                    })
                }
            },
            terminal: !0,
            transclude: "element"
        }
    }

    function J(e, t, n, o) {
        this.$scope = e, this.$element = t, this.$attrs = n, this.$mdUtil = o, this.regex = null
    }

    function ee(n, o) {
        return {
            terminal: !0,
            controller: "MdHighlightCtrl",
            compile: function(e, t) {
                var r = o(t.mdHighlightText),
                    i = n(e.html());
                return function(e, t, n, o) {
                    o.init(r, i)
                }
            }
        }
    }

    function te(n) {
        return {
            restrict: "E",
            link: function(e, t) {
                t.addClass("_md"), e.$on("$destroy", function() {
                    n.destroy()
                })
            }
        }
    }

    function ne(e) {
        t.$inject = ["$animate", "$mdConstant", "$mdUtil", "$mdTheming", "$mdBottomSheet", "$rootElement", "$mdGesture", "$log"];
        var u = .5,
            p = 80;
        return e("$mdBottomSheet").setDefaults({
            methods: ["disableParentScroll", "escapeToClose", "clickOutsideToClose"],
            options: t
        });

        function t(o, a, d, r, s, i, l, c) {
            var m;
            return {
                themable: !0,
                onShow: function(e, t, n) {
                    if ((t = d.extractElementByName(t, "md-bottom-sheet")).attr("tabindex", "-1"), t.hasClass("ng-cloak")) {
                        c.warn("$mdBottomSheet: using `<md-bottom-sheet ng-cloak>` will affect the bottom-sheet opening animations.", t[0])
                    }
                    n.isLockedOpen ? (n.clickOutsideToClose = !1, n.escapeToClose = !1) : n.cleanupGestures = function(o, e) {
                        var t = l.register(e, "drag", {
                            horizontal: !1
                        });
                        return e.on("$md.dragstart", n).on("$md.drag", r).on("$md.dragend", i),
                            function() {
                                t(), e.off("$md.dragstart", n), e.off("$md.drag", r), e.off("$md.dragend", i)
                            };

                        function n() {
                            o.css(a.CSS.TRANSITION_DURATION, "0ms")
                        }

                        function r(e) {
                            var t = e.pointer.distanceY;
                            t < 5 && (t = Math.max(-p, t / 2)), o.css(a.CSS.TRANSFORM, "translate3d(0," + (p + t) + "px,0)")
                        }

                        function i(e) {
                            if (0 < e.pointer.distanceY && (20 < e.pointer.distanceY || Math.abs(e.pointer.velocityY) > u)) {
                                var t = o.prop("offsetHeight") - e.pointer.distanceY,
                                    n = Math.min(t / e.pointer.velocityY * .75, 500);
                                o.css(a.CSS.TRANSITION_DURATION, n + "ms"), d.nextTick(s.cancel, !0)
                            } else o.css(a.CSS.TRANSITION_DURATION, ""), o.css(a.CSS.TRANSFORM, "")
                        }
                    }(t, n.parent);
                    n.disableBackdrop || ((m = d.createBackdrop(e, "md-bottom-sheet-backdrop md-opaque"))[0].tabIndex = -1, n.clickOutsideToClose && m.on("click", function() {
                        d.nextTick(s.cancel, !0)
                    }), r.inherit(m, n.parent), o.enter(m, n.parent, null));
                    r.inherit(t, n.parent), n.disableParentScroll && (n.restoreScroll = d.disableScrollAround(t, n.parent));
                    return o.enter(t, n.parent, m).then(function() {
                        var e = d.findFocusTarget(t) || be.element(t[0].querySelector("button") || t[0].querySelector("a") || t[0].querySelector(d.prefixer("ng-click", !0))) || m;
                        n.escapeToClose && (n.rootElementKeyupCallback = function(e) {
                            e.keyCode === a.KEY_CODE.ESCAPE && d.nextTick(s.cancel, !0)
                        }, i.on("keyup", n.rootElementKeyupCallback), e && e.focus())
                    })
                },
                onRemove: function(e, t, n) {
                    n.disableBackdrop || o.leave(m);
                    return o.leave(t).then(function() {
                        n.disableParentScroll && (n.restoreScroll(), delete n.restoreScroll), n.cleanupGestures && n.cleanupGestures()
                    })
                },
                disableBackdrop: !1,
                escapeToClose: !0,
                clickOutsideToClose: !0,
                disableParentScroll: !0,
                isLockedOpen: !1
            }
        }
    }

    function oe(n) {
        return {
            restrict: "E",
            link: function(e, t) {
                n(t)
            }
        }
    }

    function re(o, r, i, a) {
        return {
            restrict: "EA",
            replace: !0,
            transclude: !0,
            template: function(e, t) {
                {
                    return d(t) ? '<a class="md-button" ng-transclude></a>' : '<button class="md-button" type="' + (void 0 === t.type ? "button" : t.type) + '" ng-transclude></button>'
                }
            },
            link: function(e, t, n) {
                r(t), o.attach(e, t), i.expectWithoutText(t, "aria-label"), d(n) && be.isDefined(n.ngDisabled) && !t.hasClass("_md-nav-button") && e.$watch(n.ngDisabled, function(e) {
                    t.attr("tabindex", e ? -1 : 0)
                });
                t.on("click", function(e) {
                    !0 === n.disabled && (e.preventDefault(), e.stopImmediatePropagation())
                }), t.hasClass("md-no-focus") || (t.on("focus", function() {
                    a.isUserInvoked() && "keyboard" !== a.getLastInteractionType() || t.addClass("md-focused")
                }), t.on("blur", function() {
                    t.removeClass("md-focused")
                }))
            }
        };

        function d(e) {
            return be.isDefined(e.href) || be.isDefined(e.ngHref) || be.isDefined(e.ngLink) || be.isDefined(e.uiSref)
        }
    }

    function ie(o) {
        return {
            restrict: "E",
            link: function(e, t, n) {
                t.addClass("_md"), o(t)
            }
        }
    }

    function ae(h, f, b, g, E, v) {
        return h = h[0], {
            restrict: "E",
            transclude: !0,
            require: ["^?mdInputContainer", "?ngModel", "?^form"],
            priority: b.BEFORE_NG_ARIA,
            template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>',
            compile: function(e, t) {
                return t.$set("tabindex", t.tabindex || "0"), t.$set("type", "checkbox"), t.$set("role", t.type), e.addClass("md-auto-horizontal-margin"), {
                    pre: function(e, t) {
                        t.on("click", function(e) {
                            this.hasAttribute("disabled") && e.stopImmediatePropagation()
                        })
                    },
                    post: function(o, r, i, e) {
                        var t, n = e[0],
                            a = e[1] || E.fakeNgModel(),
                            d = e[2],
                            s = 0 < r.find("a").length;
                        if (s) {
                            var l = "label-" + E.nextUid();
                            i.$set("aria-labelledby", l);
                            var c = r.children()[1];
                            be.element(c).remove(), c.removeAttribute("ng-transclude"), c.className = "md-checkbox-link-label", c.setAttribute("id", l), r.after(c), r.next().on("click", u)
                        }
                        if (n) {
                            var m = n.isErrorGetter || function() {
                                return a.$invalid && (a.$touched || d && d.$submitted)
                            };
                            n.input = r, o.$watch(m, n.setInvalid)
                        }
                        g(r), r.children().on("focus", function() {
                            r.focus()
                        }), E.parseAttributeBoolean(i.mdIndeterminate) && (p(), o.$watch(i.mdIndeterminate, p));
                        i.ngChecked && o.$watch(o.$eval.bind(o, i.ngChecked), function(e) {
                            a.$setViewValue(e), a.$render()
                        });
                        (function(e, t, n) {
                            i[e] && o.$watch(i[e], function(e) {
                                n[e] && r.attr(t, n[e])
                            })
                        })("ngDisabled", "tabindex", {
                            true: "-1",
                            false: i.tabindex
                        }), s || f.expectWithText(r, "aria-label");

                        function u(t) {
                            r[0].hasAttribute("disabled") || o.skipToggle || "A" === t.target.tagName || o.$apply(function() {
                                var e = i.ngChecked && i.ngClick ? i.checked : !a.$viewValue;
                                a.$setViewValue(e, t && t.type), a.$render()
                            })
                        }

                        function p(e) {
                            (t = !1 !== e) && r.attr("aria-checked", "mixed"), r.toggleClass("md-indeterminate", t), a.$render()
                        }
                        h.link.pre(o, {
                            on: be.noop,
                            0: {}
                        }, i, [a]), r.on("click", u).on("keypress", function(e) {
                            var t, n, o = e.which || e.keyCode;
                            switch (e.preventDefault(), o) {
                                case b.KEY_CODE.SPACE:
                                    r.addClass("md-focused"), u(e);
                                    break;
                                case b.KEY_CODE.ENTER:
                                    (n = E.getClosest(e.target, "form")) && (t = n.querySelector('button[type="submit"]:enabled, input[type="submit"]:enabled')) && t.click()
                            }
                        }).on("focus", function() {
                            "keyboard" === v.getLastInteractionType() && r.addClass("md-focused")
                        }).on("blur", function() {
                            r.removeClass("md-focused")
                        }), a.$render = function() {
                            var e = !!a.$viewValue && !t;
                            r.toggleClass("md-checked", e), t || (e ? r.attr("aria-checked", "true") : r.attr("aria-checked", "false"))
                        }
                    }
                }
            }
        }
    }

    function de(e, t, n, o, r) {
        this.$scope = e, this.$element = t, this.$mdConstant = n, this.$timeout = o, this.$mdUtil = r, this.isEditing = !1, this.parentController = ge, this.enableChipEdit = !1
    }

    function se(d, e, t, s) {
        return {
            restrict: "E",
            require: ["^?mdChips", "mdChip"],
            link: function(e, t, n, o) {
                var r = o.shift(),
                    i = o.shift(),
                    a = be.element(t[0].querySelector(".md-chip-content"));
                d(t), r && (i.init(r), a.on("blur", function() {
                    r.resetSelectedChip(), r.$scope.$applyAsync()
                }));
                s(function() {
                    r && r.shouldFocusLastChip && r.focusLastChipThenInput()
                })
            },
            controller: "MdChipCtrl"
        }
    }

    function le(r) {
        return {
            restrict: "A",
            require: "^mdChips",
            scope: !1,
            link: function(e, t, n, o) {
                t.on("click", function() {
                    e.$apply(function() {
                        o.removeChip(e.$$replacedScope.$index)
                    })
                }), r(function() {
                    t.attr({
                        tabindex: "-1",
                        "aria-hidden": "true"
                    }), t.find("button").attr("tabindex", "-1")
                })
            }
        }
    }

    function ce(a) {
        return {
            restrict: "EA",
            terminal: !0,
            link: function(e, t, n) {
                var o = e.$parent.$mdChipsCtrl,
                    r = o.parent.$new(!1, o.parent);
                r.$$replacedScope = e, r.$chip = e.$chip, r.$index = e.$index;
                var i = (r.$mdChipsCtrl = o).$scope.$eval(n.mdChipTransclude);
                t.html(i), a(t.contents())(r)
            },
            scope: !1
        }
    }

    function me(e, t, n) {
        this.$element = t, this.$attrs = e, this.$timeout = n, this.selectedItem = null, this.searchText = "", this.deRegister = [], this.init()
    }

    function ue(n) {
        return {
            restrict: "E",
            controller: ["$scope", "$element", function(e, t) {
                this.$scope = e, this.$element = t
            }],
            link: function(e, t) {
                t.addClass("_md"), n(t), e.$broadcast("$mdContentLoaded", t),
                    function(t) {
                        be.element(t).on("$md.pressdown", function(e) {
                            "t" === e.pointer.type && (e.$materialScrollFixed || (e.$materialScrollFixed = !0, 0 === t.scrollTop ? t.scrollTop = 1 : t.scrollHeight === t.scrollTop + t.offsetHeight && (t.scrollTop -= 1)))
                        })
                    }(t[0])
            }
        }
    }

    function pe(e, t) {
        var d = e('<md-icon md-svg-src="' + t.mdTabsArrow + '"></md-icon>')({})[0];
        return {
            require: ["^^mdCalendar", "^^mdCalendarMonth", "mdCalendarMonthBody"],
            scope: {
                offset: "=mdMonthOffset"
            },
            controller: he,
            controllerAs: "mdMonthBodyCtrl",
            bindToController: !0,
            link: function(e, t, n, o) {
                var r = o[0],
                    i = o[1],
                    a = o[2];
                a.calendarCtrl = r, a.monthCtrl = i, a.arrowIcon = d.cloneNode(!0), e.$watch(function() {
                    return a.offset
                }, function(e) {
                    be.isNumber(e) && a.generateContent()
                })
            }
        }
    }

    function he(e, t, n) {
        this.$element = e, this.dateUtil = t, this.dateLocale = n, this.monthCtrl = null, this.calendarCtrl = null, this.offset = null, this.focusAfterAppend = null
    }

    function fe(e, t, n) {
        this.$element = e, this.dateUtil = t, this.dateLocale = n, this.calendarCtrl = null, this.yearCtrl = null, this.offset = null, this.focusAfterAppend = null
    }

    function Ee(e, t, i) {
        return {
            restrict: "E",
            link: function(o, r) {
                r.addClass("_md"), t(r), e(function() {
                    var e, t = r[0].querySelector("md-dialog-content");

                    function n() {
                        r.toggleClass("md-content-overflow", t.scrollHeight > t.clientHeight)
                    }
                    t && (e = t.getElementsByTagName("img"), n(), be.element(e).on("load", n)), o.$on("$destroy", function() {
                        i.destroy(r)
                    })
                })
            }
        }
    }

    function ve(e) {
        var g, E, v;
        return n.$inject = ["$mdDialog", "$mdConstant"], o.$inject = ["$mdDialog", "$mdAria", "$mdUtil", "$mdConstant", "$animate", "$document", "$window", "$rootElement", "$log", "$injector", "$mdTheming", "$interpolate", "$mdInteraction"], e("$mdDialog").setDefaults({
            methods: ["disableParentScroll", "hasBackdrop", "clickOutsideToClose", "escapeToClose", "targetEvent", "closeTo", "openFrom", "parent", "fullscreen", "multiple"],
            options: o
        }).addPreset("alert", {
            methods: ["title", "htmlContent", "textContent", "ariaLabel", "ok", "theme", "css"],
            options: t
        }).addPreset("confirm", {
            methods: ["title", "htmlContent", "textContent", "ariaLabel", "ok", "cancel", "theme", "css"],
            options: t
        }).addPreset("prompt", {
            methods: ["title", "htmlContent", "textContent", "initialValue", "placeholder", "ariaLabel", "ok", "cancel", "theme", "css", "required"],
            options: t
        });

        function t() {
            return {
                template: ['<md-dialog md-theme="{{ dialog.theme || dialog.defaultTheme }}" aria-label="{{ dialog.ariaLabel }}" ng-class="dialog.css">', '  <md-dialog-content class="md-dialog-content" role="document" tabIndex="-1">', '    <h2 class="md-title">{{ dialog.title }}</h2>', '    <div ng-if="::dialog.mdHtmlContent" class="md-dialog-content-body" ', '        ng-bind-html="::dialog.mdHtmlContent"></div>', '    <div ng-if="::!dialog.mdHtmlContent" class="md-dialog-content-body">', "      <p>{{::dialog.mdTextContent}}</p>", "    </div>", '    <md-input-container md-no-float ng-if="::dialog.$type == \'prompt\'" class="md-prompt-input-container">', '      <input ng-keypress="dialog.keypress($event)" md-autofocus ng-model="dialog.result"              placeholder="{{::dialog.placeholder}}" ng-required="dialog.required">', "    </md-input-container>", "  </md-dialog-content>", "  <md-dialog-actions>", '    <md-button ng-if="dialog.$type === \'confirm\' || dialog.$type === \'prompt\'"               ng-click="dialog.abort()" class="md-primary md-cancel-button">', "      {{ dialog.cancel }}", "    </md-button>", '    <md-button ng-click="dialog.hide()" class="md-primary md-confirm-button" md-autofocus="dialog.$type===\'alert\'"               ng-disabled="dialog.required && !dialog.result">', "      {{ dialog.ok }}", "    </md-button>", "  </md-dialog-actions>", "</md-dialog>"].join("").replace(/\s\s+/g, ""),
                controller: n,
                controllerAs: "dialog",
                bindToController: !0
            }
        }

        function n(o, r) {
            this.$onInit = function() {
                var n = "prompt" === this.$type;
                n && this.initialValue && (this.result = this.initialValue), this.hide = function() {
                    o.hide(!n || this.result)
                }, this.abort = function() {
                    o.cancel()
                }, this.keypress = function(e) {
                    var t = n && this.required && !be.isDefined(this.result);
                    e.keyCode !== r.KEY_CODE.ENTER || t || o.hide(this.result)
                }
            }
        }

        function o(u, d, p, h, r, s, f, i, a, l, t, c, m) {
            return {
                hasBackdrop: !0,
                isolateScope: !0,
                onCompiling: function(e) {
                    e.defaultTheme = t.defaultTheme(),
                        function(t) {
                            var e;
                            t.targetEvent && t.targetEvent.target && (e = be.element(t.targetEvent.target));
                            var n = e && e.controller("mdTheme");
                            if (t.hasTheme = !!n, !t.hasTheme) return;
                            t.themeWatch = n.$shouldWatch;
                            var o = t.theme || n.$mdTheme;
                            o && (t.scope.theme = o);
                            var r = n.registerChanges(function(e) {
                                t.scope.theme = e, t.themeWatch || r()
                            })
                        }(e)
                },
                onShow: function(e, t, n) {
                    be.element(s[0].body).addClass("md-dialog-is-showing");
                    var o = t.find("md-dialog");
                    if (o.hasClass("ng-cloak")) {
                        a.warn("$mdDialog: using `<md-dialog ng-cloak>` will affect the dialog opening animations.", t[0])
                    }
                    return function(e) {
                            e.origin = be.extend({
                                element: null,
                                bounds: null,
                                focus: be.noop
                            }, e.origin || {}), e.parent = n(e.parent, i), e.closeTo = t(n(e.closeTo)), e.openFrom = t(n(e.openFrom)), e.targetEvent && (e.origin = t(e.targetEvent.target, e.origin), e.originInteraction = m.getLastInteractionType());

                            function t(e, t) {
                                var n = be.element(e || {});
                                if (n && n.length) {
                                    var o = be.isFunction(n[0].getBoundingClientRect);
                                    return be.extend(t || {}, {
                                        element: o ? n : ge,
                                        bounds: o ? n[0].getBoundingClientRect() : be.extend({}, {
                                            top: 0,
                                            left: 0,
                                            height: 0,
                                            width: 0
                                        }, n[0]),
                                        focus: be.bind(n, n.focus)
                                    })
                                }
                            }

                            function n(e, t) {
                                return be.isString(e) && (e = s[0].querySelector(e)), be.element(e || t)
                            }
                        }(n),
                        function(n, t) {
                            var e = "alert" === t.$type ? "alertdialog" : "dialog",
                                o = n.find("md-dialog-content"),
                                r = n.attr("id"),
                                i = "dialogContent_" + (r || p.nextUid());
                            n.attr({
                                role: e,
                                tabIndex: "-1"
                            }), 0 === o.length && (o = n, r && (i = r));
                            o.attr("id", i), n.attr("aria-describedby", i), t.ariaLabel ? d.expect(n, "aria-label", t.ariaLabel) : d.expectAsync(n, "aria-label", function() {
                                if (t.title) return t.title;
                                var e = o.text().split(/\s+/);
                                return 3 < e.length && (e = e.slice(0, 3).concat("...")), e.join(" ")
                            });
                            (g = document.createElement("div")).classList.add("md-dialog-focus-trap"), g.tabIndex = 0, E = g.cloneNode(!1);

                            function a(e) {
                                if (e.target && e.target.nextSibling && "MD-DIALOG" === e.target.nextSibling.nodeName) {
                                    var t = p.getLastTabbableElement(n[0]);
                                    be.isElement(t) && t.focus()
                                } else n.focus()
                            }
                            g.addEventListener("focus", a), E.addEventListener("focus", a), v = function() {
                                g.removeEventListener("focus", a), E.removeEventListener("focus", a), g && g.parentNode && g.parentNode.removeChild(g), E && E.parentNode && E.parentNode.removeChild(E)
                            }, n[0].parentNode.insertBefore(g, n[0]), n.after(E)
                        }(o, n),
                        function(e, t, n) {
                            n.disableParentScroll && (n.restoreScroll = p.disableScrollAround(t, n.parent));
                            n.hasBackdrop && (n.backdrop = p.createBackdrop(e, "md-dialog-backdrop md-opaque"), r.enter(n.backdrop, n.parent));
                            n.hideBackdrop = function(e) {
                                n.backdrop && (e ? n.backdrop.remove() : r.leave(n.backdrop)), n.disableParentScroll && (n.restoreScroll && n.restoreScroll(), delete n.restoreScroll), n.hideBackdrop = null
                            }
                        }(e, t, n),
                        function(e, t) {
                            function n() {
                                var e = "alert" === t.$type ? u.hide : u.cancel;
                                p.nextTick(e, !0)
                            }
                            var o = be.element(f),
                                r = p.debounce(function() {
                                    b(e, t)
                                }, 60),
                                i = [];
                            if (t.escapeToClose) {
                                var a = t.parent,
                                    d = function(e) {
                                        e.keyCode === h.KEY_CODE.ESCAPE && (e.stopImmediatePropagation(), e.preventDefault(), n())
                                    };
                                e.on("keydown", d), a.on("keydown", d), i.push(function() {
                                    e.off("keydown", d), a.off("keydown", d)
                                })
                            }
                            if (o.on("resize", r), i.push(function() {
                                    o.off("resize", r)
                                }), t.clickOutsideToClose) {
                                var s, l = e,
                                    c = function(e) {
                                        s = e.target
                                    },
                                    m = function(e) {
                                        s === l[0] && e.target === l[0] && (e.stopPropagation(), e.preventDefault(), n())
                                    };
                                l.on("mousedown", c), l.on("mouseup", m), i.push(function() {
                                    l.off("mousedown", c), l.off("mouseup", m)
                                })
                            }
                            t.deactivateListeners = function() {
                                i.forEach(function(e) {
                                    e()
                                }), t.deactivateListeners = null
                            }
                        }(t, n),
                        function(e, t) {
                            t.parent.append(e), t.reverseContainerStretch = b(e, t);
                            var n = e.find("md-dialog"),
                                o = p.dom.animator,
                                r = o.calculateZoomToOrigin,
                                i = {
                                    transitionInClass: "md-transition-in",
                                    transitionOutClass: "md-transition-out"
                                },
                                a = o.toTransformCss(r(n, t.openFrom || t.origin)),
                                d = o.toTransformCss("");
                            return n.toggleClass("md-dialog-fullscreen", !!t.fullscreen), o.translate3d(n, a, d, i).then(function(e) {
                                return t.reverseAnimate = function() {
                                    return delete t.reverseAnimate, t.closeTo ? (i = {
                                        transitionInClass: "md-transition-out",
                                        transitionOutClass: "md-transition-in"
                                    }, a = d, d = o.toTransformCss(r(n, t.closeTo)), o.translate3d(n, a, d, i)) : e(d = o.toTransformCss(r(n, t.origin)))
                                }, t.clearAnimate = function() {
                                    return delete t.clearAnimate, n.removeClass([i.transitionOutClass, i.transitionInClass].join(" ")), o.translate3d(n, d, o.toTransformCss(""), {})
                                }, !0
                            })
                        }(t, n).then(function() {
                            ! function(e, t) {
                                var o = !0;

                                function n(e) {
                                    for (var t = function(e) {
                                            for (var t, n = []; e.parentNode;) {
                                                if (e === document.body) return n;
                                                for (var o = e.parentNode.children, r = 0; r < o.length; r++) e === o[r] || (t = o[r], -1 !== ["SCRIPT", "STYLE"].indexOf(t.nodeName)) || o[r].hasAttribute("aria-live") || n.push(o[r]);
                                                e = e.parentNode
                                            }
                                            return n
                                        }(e), n = 0; n < t.length; n++) t[n].setAttribute("aria-hidden", o)
                                }
                                n(e[0]), t.unlockScreenReader = function() {
                                    o = !1, n(e[0]), t.unlockScreenReader = null
                                }
                            }(t, n),
                            function() {
                                if (n.focusOnOpen) {
                                    (p.findFocusTarget(t) || t[0].querySelector(".dialog-close, md-dialog-actions button:last-child") || o).focus()
                                }
                            }()
                        })
                },
                onShowing: function(e, t, n, o) {
                    if (o) {
                        var r = o.htmlContent || n.htmlContent || "",
                            i = o.textContent || n.textContent || "";
                        if (r && !l.has("$sanitize")) throw Error("The ngSanitize module must be loaded in order to use htmlContent.");
                        if (r && i) throw Error("md-dialog cannot have both `htmlContent` and `textContent`");
                        o.mdHtmlContent = r, o.mdTextContent = i
                    }
                },
                onRemove: function(e, t, n) {
                    n.deactivateListeners(), n.unlockScreenReader(), n.hideBackdrop(n.$destroy), v && (v(), v = null);
                    return n.$destroy ? o() : function(e, t) {
                        return t.reverseAnimate().then(function() {
                            t.contentElement && t.clearAnimate()
                        })
                    }(0, n).then(o);

                    function o() {
                        be.element(s[0].body).removeClass("md-dialog-is-showing"), n.contentElement && n.reverseContainerStretch(), n.cleanupElement(), n.$destroy || "keyboard" !== n.originInteraction || n.origin.focus()
                    }
                },
                clickOutsideToClose: !1,
                escapeToClose: !0,
                targetEvent: null,
                closeTo: null,
                openFrom: null,
                focusOnOpen: !0,
                disableParentScroll: !0,
                autoWrap: !0,
                fullscreen: !1,
                transformTemplate: function(e, t) {
                    var n, o = c.startSymbol(),
                        r = c.endSymbol(),
                        i = o + (t.themeWatch ? "" : "::") + "theme" + r;
                    return '<div class="md-dialog-container" tabindex="-1" ' + (t.hasTheme ? 'md-theme="' + i + '"' : "") + ">" + (n = e, t.autoWrap && !/<\/md-dialog>/g.test(n) ? "<md-dialog>" + (n || "") + "</md-dialog>" : n || "") + "</div>"
                }
            };

            function b(e, t) {
                var n = "fixed" === f.getComputedStyle(s[0].body).position,
                    o = t.backdrop ? f.getComputedStyle(t.backdrop[0]) : null,
                    r = o ? Math.min(s[0].body.clientHeight, Math.ceil(Math.abs(parseInt(o.height, 10)))) : 0,
                    i = {
                        top: e.css("top"),
                        height: e.css("height")
                    },
                    a = Math.abs(t.parent[0].getBoundingClientRect().top);
                return e.css({
                        top: (n ? a : 0) + "px",
                        height: r ? r + "px" : "100%"
                    }),
                    function() {
                        e.css(i)
                    }
            }
        }
    }

    function $e(e) {
        return {
            restrict: "E",
            link: e
        }
    }

    function Me(i) {
        return {
            restrict: "E",
            require: ["^?mdFabSpeedDial", "^?mdFabToolbar"],
            compile: function(e, t) {
                var n, o = e.children(),
                    r = i.prefixer().hasAttribute(o, "ng-repeat");
                n = e.find("md-button"), be.forEach(n, function(e) {
                    e.setAttribute("tabindex", -1)
                }), r ? o.addClass("md-fab-action-item") : o.wrap('<div class="md-fab-action-item">')
            }
        }
    }

    function ye(t, i, a, d, r, n) {
        var o, s = this,
            e = 0;

        function l(e) {
            "click" == e.type && function(e) {
                var t = e.target ? function(e) {
                    return d.getClosest(e, "button") || d.getClosest(e, "md-button")
                }(e.target) : null;
                t && !t.disabled && (! function(e) {
                    return d.getClosest(e, "md-fab-trigger")
                }(e.target) || s.toggle());
                ! function(e) {
                    return d.getClosest(e, "md-fab-actions")
                }(e.target) || s.close()
            }(e), "focusout" != e.type || o || (o = n(function() {
                s.close()
            }, 100, !1)), "focusin" == e.type && o && (n.cancel(o), o = null)
        }

        function c() {
            s.currentActionIndex = -1
        }

        function m() {
            0 < i[0].scrollHeight ? a.addClass(i, "_md-animations-ready").then(function() {
                i.removeClass("md-animations-waiting")
            }) : e < 10 && (n(m, 100), e += 1)
        }

        function u() {
            i.off("keydown", h), be.element(document).off("click touchend", p)
        }

        function p(e) {
            if (e.target) {
                var t = d.getClosest(e.target, "md-fab-trigger"),
                    n = d.getClosest(e.target, "md-fab-actions");
                t || n || s.close()
            }
        }

        function h(e) {
            switch (e.which) {
                case r.KEY_CODE.ESCAPE:
                    return s.close(), e.preventDefault(), !1;
                case r.KEY_CODE.LEFT_ARROW:
                    return function(e) {
                        "left" === s.direction ? b(e) : f(e)
                    }(e), !1;
                case r.KEY_CODE.UP_ARROW:
                    return function(e) {
                        "down" === s.direction ? f(e) : b(e)
                    }(e), !1;
                case r.KEY_CODE.RIGHT_ARROW:
                    return function(e) {
                        "left" === s.direction ? f(e) : b(e)
                    }(e), !1;
                case r.KEY_CODE.DOWN_ARROW:
                    return function(e) {
                        "up" === s.direction ? f(e) : b(e)
                    }(e), !1;
                case r.KEY_CODE.TAB:
                    return function(e) {
                        e.shiftKey ? f(e) : b(e)
                    }(e), !1
            }
        }

        function f(e) {
            g(e, -1)
        }

        function b(e) {
            g(e, 1)
        }

        function g(e, t) {
            var n = E()[0].querySelectorAll(".md-fab-action-item"),
                o = s.currentActionIndex;
            s.currentActionIndex = s.currentActionIndex + t, s.currentActionIndex = Math.min(n.length - 1, s.currentActionIndex), s.currentActionIndex = Math.max(0, s.currentActionIndex), e.which === r.KEY_CODE.TAB && o === s.currentActionIndex || (be.element(n[s.currentActionIndex]).children()[0].focus(), e.preventDefault(), e.stopImmediatePropagation())
        }

        function E() {
            return i.find("md-fab-actions")
        }
        s.open = function() {
            t.$evalAsync("ctrl.isOpen = true")
        }, s.close = function() {
            t.$evalAsync("ctrl.isOpen = false"), i.find("md-fab-trigger")[0].focus()
        }, s.toggle = function() {
            t.$evalAsync("ctrl.isOpen = !ctrl.isOpen")
        }, s.$onInit = function() {
            s.direction = s.direction || "down", s.isOpen = s.isOpen || !1, c(), i.addClass("md-animations-waiting"),
                function() {
                    var e = ["click", "focusin", "focusout"];
                    be.forEach(e, function(e) {
                        i.on(e, l)
                    }), t.$on("$destroy", function() {
                        be.forEach(e, function(e) {
                            i.off(e, l)
                        }), u()
                    })
                }(),
                function() {
                    var o, r;
                    t.$watch("ctrl.direction", function(e, t) {
                        a.removeClass(i, "md-" + t), a.addClass(i, "md-" + e), c()
                    }), t.$watch("ctrl.isOpen", function(e) {
                        c(), o && r || (o = i.find("md-fab-trigger"), r = E()), e ? (i.on("keydown", h), d.nextTick(function() {
                            be.element(document).on("click touchend", p)
                        })) : u();
                        var t = e ? "md-is-open" : "",
                            n = e ? "" : "md-is-open";
                        o.attr("aria-haspopup", !0), o.attr("aria-expanded", e), r.attr("aria-hidden", !e), a.setClass(i, t, n)
                    })
                }(), m()
        }, 1 === be.version.major && be.version.minor <= 4 && this.$onInit()
    }

    function Ce() {
        function o(e, t) {
            if (t) {
                var n = e[0],
                    o = e.controller("mdFabToolbar"),
                    r = n.querySelector(".md-fab-toolbar-background"),
                    i = n.querySelector("md-fab-trigger button"),
                    a = n.querySelector("md-toolbar"),
                    d = n.querySelector("md-fab-trigger button md-icon"),
                    s = e.find("md-fab-actions").children();
                if (i && r) {
                    var l = L.getComputedStyle(i).getPropertyValue("background-color"),
                        c = n.offsetWidth,
                        m = (n.offsetHeight, c / i.offsetWidth * 2);
                    r.style.backgroundColor = l, r.style.borderRadius = c + "px", o.isOpen ? (a.style.pointerEvents = "inherit", r.style.width = i.offsetWidth + "px", r.style.height = i.offsetHeight + "px", r.style.transform = "scale(" + m + ")", r.style.transitionDelay = "0ms", d && (d.style.transitionDelay = ".3s"), be.forEach(s, function(e, t) {
                        e.style.transitionDelay = 25 * (s.length - t) + "ms"
                    })) : (a.style.pointerEvents = "none", r.style.transform = "scale(1)", r.style.top = "0", e.hasClass("md-right") && (r.style.left = "0", r.style.right = null), e.hasClass("md-left") && (r.style.right = "0", r.style.left = null), r.style.transitionDelay = "200ms", d && (d.style.transitionDelay = "0ms"), be.forEach(s, function(e, t) {
                        e.style.transitionDelay = 200 + 25 * t + "ms"
                    }))
                }
            }
        }
        return {
            addClass: function(e, t, n) {
                o(e, t), n()
            },
            removeClass: function(e, t, n) {
                o(e, t), n()
            }
        }
    }

    function Te(u, g, E, v, $) {
        return {
            restrict: "E",
            controller: Ae,
            scope: {
                mdOnLayout: "&"
            },
            link: function(n, i, p, t) {
                i.addClass("_md"), i.attr("role", "list"), t.layoutDelegate = function(e) {
                    var o = [].filter.call(i.children(), function(e) {
                            return "MD-GRID-TILE" == e.tagName && !e.$$mdDestroyed
                        }),
                        r = {
                            tileSpans: function(e) {
                                return [].map.call(e, function(e) {
                                    var t = be.element(e).controller("mdGridTile");
                                    return {
                                        row: parseInt(v.getResponsiveAttribute(t.$attrs, "md-rowspan"), 10) || 1,
                                        col: parseInt(v.getResponsiveAttribute(t.$attrs, "md-colspan"), 10) || 1
                                    }
                                })
                            }(o),
                            colCount: function() {
                                var e = parseInt(v.getResponsiveAttribute(p, "md-cols"), 10);
                                if (isNaN(e)) throw "md-grid-list: md-cols attribute was not found, or contained a non-numeric value";
                                return e
                            }(),
                            rowMode: c(),
                            rowHeight: function() {
                                var e = v.getResponsiveAttribute(p, "md-row-height");
                                if (!e) throw "md-grid-list: md-row-height attribute was not found";
                                switch (c()) {
                                    case "fixed":
                                        return m(e);
                                    case "ratio":
                                        var t = e.split(":");
                                        return parseFloat(t[0]) / parseFloat(t[1]);
                                    case "fit":
                                        return 0
                                }
                            }(),
                            gutter: m(v.getResponsiveAttribute(p, "md-gutter") || 1)
                        };
                    if (!e && be.equals(r, a)) return;
                    var t = E(r.colCount, r.tileSpans, o).map(function(e, n) {
                        return {
                            grid: {
                                element: i,
                                style: function(e, t, n, o, r) {
                                    var i = {};
                                    switch (o) {
                                        case "fixed":
                                            i.height = b({
                                                unit: r,
                                                span: t,
                                                gutter: n
                                            }), i.paddingBottom = "";
                                            break;
                                        case "ratio":
                                            var a = h({
                                                share: 1 / r * (1 / e * 100),
                                                gutterShare: 1 === e ? 0 : (e - 1) / e,
                                                gutter: n
                                            });
                                            i.height = "", i.paddingBottom = b({
                                                unit: a,
                                                span: t,
                                                gutter: n
                                            })
                                    }
                                    return i
                                }(r.colCount, n, r.gutter, r.rowMode, r.rowHeight)
                            },
                            tiles: e.map(function(e, t) {
                                return {
                                    element: be.element(o[t]),
                                    style: function(e, t, n, o, r, i, a) {
                                        var d = 1 / n * 100,
                                            s = (n - 1) / n,
                                            l = h({
                                                share: d,
                                                gutterShare: s,
                                                gutter: r
                                            }),
                                            c = $.isRtl(p) ? {
                                                right: f({
                                                    unit: l,
                                                    offset: e.col,
                                                    gutter: r
                                                }),
                                                width: b({
                                                    unit: l,
                                                    span: t.col,
                                                    gutter: r
                                                }),
                                                paddingTop: "",
                                                marginTop: "",
                                                top: "",
                                                height: ""
                                            } : {
                                                left: f({
                                                    unit: l,
                                                    offset: e.col,
                                                    gutter: r
                                                }),
                                                width: b({
                                                    unit: l,
                                                    span: t.col,
                                                    gutter: r
                                                }),
                                                paddingTop: "",
                                                marginTop: "",
                                                top: "",
                                                height: ""
                                            };
                                        switch (i) {
                                            case "fixed":
                                                c.top = f({
                                                    unit: a,
                                                    offset: e.row,
                                                    gutter: r
                                                }), c.height = b({
                                                    unit: a,
                                                    span: t.row,
                                                    gutter: r
                                                });
                                                break;
                                            case "ratio":
                                                var m = d / a,
                                                    u = h({
                                                        share: m,
                                                        gutterShare: s,
                                                        gutter: r
                                                    });
                                                c.paddingTop = b({
                                                    unit: u,
                                                    span: t.row,
                                                    gutter: r
                                                }), c.marginTop = f({
                                                    unit: u,
                                                    offset: e.row,
                                                    gutter: r
                                                });
                                                break;
                                            case "fit":
                                                u = h({
                                                    share: m = 1 / o * 100,
                                                    gutterShare: (o - 1) / o,
                                                    gutter: r
                                                }), c.top = f({
                                                    unit: u,
                                                    offset: e.row,
                                                    gutter: r
                                                }), c.height = b({
                                                    unit: u,
                                                    span: t.row,
                                                    gutter: r
                                                })
                                        }
                                        return c
                                    }(e.position, e.spans, r.colCount, n, r.gutter, r.rowMode, r.rowHeight)
                                }
                            })
                        }
                    }).reflow().performance();
                    n.mdOnLayout({
                        $event: {
                            performance: t
                        }
                    }), a = r
                };
                var a, o = be.bind(t, t.invalidateLayout),
                    r = function() {
                        for (var e in g.MEDIA) v(e), v.getQuery(g.MEDIA[e]).addListener(o);
                        return v.watchResponsiveAttributes(["md-cols", "md-row-height", "md-gutter"], p, d)
                    }();

                function d(e) {
                    null == e ? t.invalidateLayout() : v(e) && t.invalidateLayout()
                }
                n.$on("$destroy", function() {
                    for (var e in t.layoutDelegate = be.noop, r(), g.MEDIA) v.getQuery(g.MEDIA[e]).removeListener(o)
                });
                var s = u.startSymbol(),
                    l = u.endSymbol();

                function e(e) {
                    return s + e + l
                }
                var h = u(e("share") + "% - (" + e("gutter") + " * " + e("gutterShare") + ")"),
                    f = u("calc((" + e("unit") + " + " + e("gutter") + ") * " + e("offset") + ")"),
                    b = u("calc((" + e("unit") + ") * " + e("span") + " + (" + e("span") + " - 1) * " + e("gutter") + ")");

                function c() {
                    var e = v.getResponsiveAttribute(p, "md-row-height");
                    if (!e) throw "md-grid-list: md-row-height attribute was not found";
                    return "fit" == e ? "fit" : -1 !== e.indexOf(":") ? "ratio" : "fixed"
                }

                function m(e) {
                    return /\D$/.test(e) ? e : e + "px"
                }
            }
        }
    }

    function Ae(e) {
        this.layoutInvalidated = !1, this.tilesInvalidated = !1, this.$timeout_ = e.nextTick, this.layoutDelegate = be.noop
    }

    function we(s) {
        var l = t;
        return e.animateWith = function(e) {
            l = be.isFunction(e) ? e : t
        }, e;

        function e(e, t) {
            var n, o, r, i, a, d;
            return i = s.time(function() {
                o = function(r, e) {
                    var i = 0,
                        a = 0,
                        d = function() {
                            for (var e = [], t = 0; t < r; t++) e.push(0);
                            return e
                        }();
                    return {
                        positioning: e.map(function(e, t) {
                            return {
                                spans: e,
                                position: function(e, t) {
                                    if (e.col > r) throw "md-grid-list: Tile at position " + t + " has a colspan (" + e.col + ") that exceeds the column count (" + r + ")";
                                    var n = 0,
                                        o = 0;
                                    for (; o - n < e.col;) r <= i ? s() : -1 !== (n = d.indexOf(0, i)) && -1 !== (o = c(n + 1)) ? i = o + 1 : (n = o = 0, s());
                                    return l(n, e.col, e.row), i = n + e.col, {
                                        col: n,
                                        row: a
                                    }
                                }(e, t)
                            }
                        }),
                        rowCount: a + Math.max.apply(Math, d)
                    };

                    function s() {
                        a++, l(i = 0, r, -1)
                    }

                    function l(e, t, n) {
                        for (var o = e; o < e + t; o++) d[o] = Math.max(d[o] + n, 0)
                    }

                    function c(e) {
                        var t;
                        for (t = e; t < d.length; t++)
                            if (0 !== d[t]) return t;
                        if (t === d.length) return t
                    }
                }(e, t)
            }), n = {
                layoutInfo: function() {
                    return o
                },
                map: function(t) {
                    return a = s.time(function() {
                        var e = n.layoutInfo();
                        r = t(e.positioning, e.rowCount)
                    }), n
                },
                reflow: function(e) {
                    return d = s.time(function() {
                        (e || l)(r.grid, r.tiles)
                    }), n
                },
                performance: function() {
                    return {
                        tileCount: t.length,
                        layoutTime: i,
                        mapTime: a,
                        reflowTime: d,
                        totalTime: i + a + d
                    }
                }
            }
        }

        function t(e, t) {
            e.element.css(e.style), t.forEach(function(e) {
                e.element.css(e.style)
            })
        }
    }

    function _e(i) {
        return {
            restrict: "E",
            require: "^mdGridList",
            template: "<figure ng-transclude></figure>",
            transclude: !0,
            scope: {},
            controller: ["$attrs", function(e) {
                this.$attrs = e
            }],
            link: function(e, t, n, o) {
                t.attr("role", "listitem");
                var r = i.watchResponsiveAttributes(["md-colspan", "md-rowspan"], n, be.bind(o, o.invalidateLayout));
                o.invalidateTiles(), e.$on("$destroy", function() {
                    t[0].$$mdDestroyed = !0, r(), o.invalidateLayout()
                }), be.isDefined(e.$parent.$index) && e.$watch(function() {
                    return e.$parent.$index
                }, function(e, t) {
                    e !== t && o.invalidateTiles()
                })
            }
        }
    }

    function ke() {
        return {
            template: "<figcaption ng-transclude></figcaption>",
            transclude: !0
        }
    }

    function xe(t) {
        return {
            restrict: "E",
            compile: function(e) {
                return e[0].setAttribute("role", "list"), t
            }
        }
    }

    function Ne(m, u, p, h) {
        var f = ["md-checkbox", "md-switch", "md-menu"];
        return {
            restrict: "E",
            controller: "MdListController",
            compile: function(r, o) {
                var e, i, t, n = r[0].querySelectorAll(".md-secondary"),
                    a = r;
                if (r[0].setAttribute("role", "listitem"), o.ngClick || o.ngDblclick || o.ngHref || o.href || o.uiSref || o.ngAttrUiSref) s("button");
                else if (!r.hasClass("md-no-proxy")) {
                    for (var d = 0; d < f.length; ++d)
                        if (null !== (i = r[0].querySelector(f[d]))) {
                            e = !0;
                            break
                        } e ? s("div") : r.addClass("md-no-proxy")
                }

                function s(e) {
                    if ("div" === e)(a = be.element('<div class="md-no-style md-list-item-inner">')).append(r.contents()), r.addClass("md-proxy-focus");
                    else {
                        a = be.element('<div class="md-button md-no-style">   <div class="md-list-item-inner"></div></div>');
                        var t = be.element('<md-button class="md-no-style"></md-button>');
                        if (l(r[0], t[0]), !t.attr("aria-label")) {
                            t.attr("aria-label", m.getText(r));
                            var n = a[0].querySelector(".md-list-item-inner");
                            n && n.setAttribute("aria-hidden", "true")
                        }
                        r.hasClass("md-no-focus") && t.addClass("md-no-focus"), a.prepend(t), a.children().eq(1).append(r.contents()), r.addClass("_md-button-wrap")
                    }
                    r[0].setAttribute("tabindex", "-1"), r.append(a)
                }

                function l(t, n, e) {
                    var o = p.prefixer(["ng-if", "ng-click", "ng-dblclick", "aria-label", "ng-disabled", "ui-sref", "href", "ng-href", "rel", "target", "ng-attr-ui-sref", "ui-sref-opts", "download"]);
                    e && (o = o.concat(p.prefixer(e))), be.forEach(o, function(e) {
                        t.hasAttribute(e) && (n.setAttribute(e, t.getAttribute(e)), t.removeAttribute(e))
                    })
                }

                function c(e) {
                    for (var t = e.attributes, n = 0; n < t.length; n++)
                        if ("ngClick" === o.$normalize(t[n].name)) return !0;
                    return !1
                }
                return t = be.element('<div class="md-secondary-container">'), be.forEach(n, function(e) {
                        ! function(e, t) {
                            if (e && ! function(e) {
                                    var t = e.nodeName.toUpperCase();
                                    return "MD-BUTTON" === t || "BUTTON" === t
                                }(e) && e.hasAttribute("ng-click")) {
                                m.expect(e, "aria-label");
                                var n = be.element('<md-button class="md-secondary md-icon-button">');
                                l(e, n[0], ["ng-if", "ng-hide", "ng-show"]), e.setAttribute("tabindex", "-1"), n.append(e), e = n[0]
                            }
                            e && (!c(e) || !o.ngClick && function(e) {
                                return -1 !== f.indexOf(e.nodeName.toLowerCase())
                            }(e)) && be.element(e).removeClass("md-secondary"), r.addClass("md-with-secondary"), t.append(e)
                        }(e, t)
                    }), a.append(t),
                    function() {
                        for (var e, t = ["md-switch", "md-checkbox"], n = 0; n < t.length; ++n)
                            if ((e = r.find(t[n])[0]) && !e.hasAttribute("aria-label")) {
                                var o = r.find("p")[0];
                                if (!(o = o || r.find("span")[0])) return;
                                e.setAttribute("aria-label", "Toggle " + o.textContent)
                            }
                    }(), e && "MD-MENU" === i.nodeName && function() {
                        var e = be.element(i),
                            t = e.parent().hasClass("md-secondary-container") || i.parentNode.firstElementChild !== i,
                            n = "left";
                        t && (n = "right");
                        e.attr("md-position-mode") || e.attr("md-position-mode", n + " target");
                        var o = e.children().eq(0);
                        c(o[0]) || o.attr("ng-click", "$mdMenu.open($event)");
                        o.attr("aria-label") || o.attr("aria-label", "Open List Menu")
                    }(),
                    function(e, i, t, n) {
                        i.addClass("_md");
                        var o = [],
                            r = i[0].firstElementChild,
                            a = i.hasClass("_md-button-wrap") ? r.firstElementChild : r,
                            d = a && c(a),
                            s = i.hasClass("md-no-proxy");
                        r && r.children && !d && !s && be.forEach(f, function(e) {
                            be.forEach(r.querySelectorAll(e + ":not(.md-secondary)"), function(e) {
                                o.push(e)
                            })
                        }), 1 !== o.length && !d || (i.addClass("md-clickable"), d || n.attachRipple(e, be.element(i[0].querySelector(".md-no-style")))), o.length && be.forEach(o, function(t) {
                            t = be.element(t), e.mouseActive = !1, t.on("mousedown", function() {
                                e.mouseActive = !0, h(function() {
                                    e.mouseActive = !1
                                }, 100)
                            }).on("focus", function() {
                                !1 === e.mouseActive && i.addClass("md-focused"), t.on("blur", function e() {
                                    i.removeClass("md-focused"), t.off("blur", e)
                                })
                            })
                        });

                        function l(e) {
                            "INPUT" === e.target.nodeName || "TEXTAREA" === e.target.nodeName || e.target.isContentEditable || (e.which || e.keyCode) === u.KEY_CODE.SPACE && a && (a.click(), e.preventDefault(), e.stopPropagation())
                        }
                        d || o.length || a && a.addEventListener("keypress", l);
                        i.off("click"), i.off("keypress"), i.off("keydown"), 1 === o.length && a && i.children().eq(0).on("click", function(t) {
                            (function(e) {
                                var t = ["md-slider"],
                                    n = p.getEventPath(e);
                                if (!n || 0 === n.length) return -1 !== t.indexOf(e.target.tagName.toLowerCase());
                                for (var o = n.indexOf(i.children()[0]), r = 0; r < o; r++)
                                    if (-1 !== t.indexOf(n[r].tagName.toLowerCase())) return !0;
                                return !1
                            })(t) || !p.getClosest(t.target, "BUTTON") && a.contains(t.target) && be.forEach(o, function(e) {
                                t.target === e || e.contains(t.target) || ("MD-MENU" === e.nodeName && (e = e.children[0]), be.element(e).triggerHandler("click"))
                            })
                        });
                        e.$on("$destroy", function() {
                            a && a.removeEventListener("keypress", l)
                        })
                    }
            }
        }
    }

    function Se(e, t, n) {
        this.attachRipple = function(e, t) {
            n.attach(e, t, {})
        }
    }

    function De(r, t, i, a, d, o, e, n, s) {
        var l, c, m = d.prefixer(),
            u = this;
        this.nestLevel = parseInt(t.mdNestLevel, 10) || 0, this.init = function(e, t) {
            t = t || {}, l = e, (c = i[0].querySelector(m.buildSelector(["ng-click", "ng-mouseenter"]))).setAttribute("aria-expanded", "false"), this.isInMenuBar = t.isInMenuBar, this.mdMenuBarCtrl = t.mdMenuBarCtrl, this.nestedMenus = d.nodesToArray(l[0].querySelectorAll(".md-nested-menu")), l.on("$mdInterimElementRemove", function() {
                u.isOpen = !1, d.nextTick(function() {
                    u.onIsOpenChanged(u.isOpen)
                })
            }), d.nextTick(function() {
                u.onIsOpenChanged(u.isOpen)
            });
            var n = "menu_container_" + d.nextUid();
            l.attr("id", n), be.element(c).attr({
                "aria-owns": n,
                "aria-haspopup": "true"
            }), a.$on("$destroy", be.bind(this, function() {
                this.disableHoverListener(), r.destroy()
            })), l.on("$destroy", function() {
                r.destroy()
            })
        };
        var p, h, f = [];
        this.enableHoverListener = function() {
            f.push(e.$on("$mdMenuOpen", function(e, t) {
                l[0].contains(t[0]) && (u.currentlyOpenMenu = t.controller("mdMenu"), u.isAlreadyOpening = !1, u.currentlyOpenMenu.registerContainerProxy(u.triggerContainerProxy.bind(u)))
            })), f.push(e.$on("$mdMenuClose", function(e, t) {
                l[0].contains(t[0]) && (u.currentlyOpenMenu = ge)
            })), (h = be.element(d.nodesToArray(l[0].children[0].children))).on("mouseenter", u.handleMenuItemHover), h.on("mouseleave", u.handleMenuItemMouseLeave)
        }, this.disableHoverListener = function() {
            for (; f.length;) f.shift()();
            h && h.off("mouseenter", u.handleMenuItemHover), h && h.off("mouseleave", u.handleMenuItemMouseLeave)
        }, this.handleMenuItemHover = function(e) {
            if (!u.isAlreadyOpening) {
                var t = e.target.querySelector("md-menu") || d.getClosest(e.target, "MD-MENU");
                p = o(function() {
                    if (t = t && be.element(t).controller("mdMenu"), u.currentlyOpenMenu && u.currentlyOpenMenu != t) {
                        var e = u.nestLevel + 1;
                        u.currentlyOpenMenu.close(!0, {
                            closeTo: e
                        }), u.isAlreadyOpening = !!t, t && t.open()
                    } else t && !t.isOpen && t.open && (u.isAlreadyOpening = !!t, t && t.open())
                }, t ? 100 : 250);
                var n = e.currentTarget.querySelector(".md-button:not([disabled])");
                n && n.focus()
            }
        }, this.handleMenuItemMouseLeave = function() {
            p && (o.cancel(p), p = ge)
        }, this.open = function(e) {
            e && e.stopPropagation(), e && e.preventDefault(), u.isOpen || (u.enableHoverListener(), u.isOpen = !0, d.nextTick(function() {
                u.onIsOpenChanged(u.isOpen)
            }), (c = c || (e ? e.target : i[0])).setAttribute("aria-expanded", "true"), a.$emit("$mdMenuOpen", i), r.show({
                scope: a,
                mdMenuCtrl: u,
                nestLevel: u.nestLevel,
                element: l,
                target: c,
                preserveElement: !0,
                parent: "body"
            }).finally(function() {
                c.setAttribute("aria-expanded", "false"), u.disableHoverListener()
            }))
        }, this.onIsOpenChanged = function(e) {
            e ? (l.attr("aria-hidden", "false"), i[0].classList.add("md-open"), be.forEach(u.nestedMenus, function(e) {
                e.classList.remove("md-open")
            })) : (l.attr("aria-hidden", "true"), i[0].classList.remove("md-open")), a.$mdMenuIsOpen = u.isOpen
        }, this.focusMenuContainer = function() {
            var e = l[0].querySelector(m.buildSelector(["md-menu-focus-target", "md-autofocus"]));
            (e = e || l[0].querySelector(".md-button:not([disabled])")).focus()
        }, this.registerContainerProxy = function(e) {
            this.containerProxy = e
        }, this.triggerContainerProxy = function(e) {
            this.containerProxy && this.containerProxy(e)
        }, this.destroy = function() {
            return u.isOpen ? r.destroy() : n.when(!1)
        }, this.close = function(e, t) {
            if (u.isOpen) {
                u.isOpen = !1, d.nextTick(function() {
                    u.onIsOpenChanged(u.isOpen)
                });
                var n = be.extend({}, t, {
                    skipFocus: e
                });
                if (a.$emit("$mdMenuClose", i, n), r.hide(null, t), !e) {
                    var o = u.restoreFocusTo || i.find("button")[0];
                    o instanceof be.element && (o = o[0]), o && o.focus()
                }
            }
        }, this.positionMode = function() {
            var e = (t.mdPositionMode || "target").split(" ");
            return 1 === e.length && e.push(e[0]), {
                left: e[0],
                top: e[1]
            }
        }, this.offsets = function() {
            var e = (t.mdOffset || "0 0").split(" ").map(parseFloat);
            if (2 === e.length) return {
                left: e[0],
                top: e[1]
            };
            if (1 === e.length) return {
                top: e[0],
                left: e[0]
            };
            throw Error("Invalid offsets specified. Please follow format <x, y> or <n>")
        }, a.$mdMenu = {
            open: this.open,
            close: this.close
        }
    }

    function He(a) {
        var d = "Invalid HTML for md-menu: ";
        return {
            restrict: "E",
            require: ["mdMenu", "?^mdMenuBar"],
            controller: "mdMenuCtrl",
            scope: !0,
            compile: function(e) {
                e.addClass("md-menu");
                var t = e.children()[0],
                    n = a.prefixer();
                n.hasAttribute(t, "ng-click") || (t = t.querySelector(n.buildSelector(["ng-click", "ng-mouseenter"])) || t);
                var o = "MD-BUTTON" === t.nodeName || "BUTTON" === t.nodeName;
                t && o && !t.hasAttribute("type") && t.setAttribute("type", "button");
                if (!t) throw Error(d + "Expected the menu to have a trigger element.");
                if (2 !== e.children().length) throw Error(d + "Expected two children elements. The second element must have a `md-menu-content` element.");
                t && t.setAttribute("aria-haspopup", "true");
                var r = e[0].querySelectorAll("md-menu"),
                    i = parseInt(e[0].getAttribute("md-nest-level"), 10) || 0;
                r && be.forEach(a.nodesToArray(r), function(e) {
                    e.hasAttribute("md-position-mode") || e.setAttribute("md-position-mode", "cascade"), e.classList.add("_md-nested-menu"), e.setAttribute("md-nest-level", i + 1)
                });
                return s
            }
        };

        function s(e, t, n, o) {
            var r = o[0],
                i = !!o[1],
                a = o[1],
                d = be.element('<div class="_md md-open-menu-container md-whiteframe-z2"></div>'),
                s = t.children()[1];
            t.addClass("_md"), s.hasAttribute("role") || s.setAttribute("role", "menu"), d.append(s), t.on("$destroy", function() {
                d.remove()
            }), t.append(d), d[0].style.display = "none", r.init(d, {
                isInMenuBar: i,
                mdMenuBarCtrl: a
            })
        }
    }

    function Ie(e) {
        t.$inject = ["$mdUtil", "$mdTheming", "$mdConstant", "$document", "$window", "$q", "$$rAF", "$animateCss", "$animate", "$log"];
        var w = 8;
        return e("$mdMenu").setDefaults({
            methods: ["target"],
            options: t
        });

        function t(y, e, s, C, T, o, r, i, l, c) {
            var A = y.prefixer(),
                m = y.dom.animator;
            return {
                parent: "body",
                onShow: function(a, n, d) {
                    (function() {
                        if (!d.target) throw Error("$mdMenu.show() expected a target to animate from in options.target");
                        be.extend(d, {
                            alreadyOpen: !1,
                            isRemoved: !1,
                            target: be.element(d.target),
                            parent: be.element(d.parent),
                            menuContentEl: be.element(n[0].querySelector("md-menu-content"))
                        })
                    })(), d.menuContentEl[0] ? e.inherit(d.menuContentEl, d.target) : c.warn("$mdMenu: Menu elements should always contain a `md-menu-content` element,otherwise interactivity features will not work properly.", n);
                    return d.cleanupResizing = function() {
                            var e = function(t, n) {
                                return r.throttle(function() {
                                    if (!d.isRemoved) {
                                        var e = h(t, n);
                                        t.css(m.toCss(e))
                                    }
                                })
                            }(n, d);
                            return T.addEventListener("resize", e), T.addEventListener("orientationchange", e),
                                function() {
                                    T.removeEventListener("resize", e), T.removeEventListener("orientationchange", e)
                                }
                        }(), d.hideBackdrop = function(e, t, n) {
                            if (n.nestLevel) return be.noop;
                            n.disableParentScroll && !y.getClosest(n.target, "MD-DIALOG") ? n.restoreScroll = y.disableScrollAround(n.element, n.parent) : n.disableParentScroll = !1;
                            n.hasBackdrop && (n.backdrop = y.createBackdrop(e, "md-menu-backdrop md-click-catcher"), l.enter(n.backdrop, n.backdropParent || C[0].body));
                            return function() {
                                n.backdrop && n.backdrop.remove(), n.disableParentScroll && n.restoreScroll()
                            }
                        }(a, 0, d),
                        function() {
                            return d.parent.append(n), n[0].style.display = "", o(function(e) {
                                var t = h(n, d);
                                n.removeClass("md-leave"), i(n, {
                                    addClass: "md-active",
                                    from: m.toCss(t),
                                    to: m.toCss({
                                        transform: ""
                                    })
                                }).start().then(e)
                            })
                        }().then(function(e) {
                            return d.alreadyOpen = !0, d.cleanupInteraction = function() {
                                if (!d.menuContentEl[0]) return be.noop;
                                d.menuContentEl.on("keydown", r), d.menuContentEl[0].addEventListener("click", i, !0);
                                var e = d.menuContentEl[0].querySelector(A.buildSelector(["md-menu-focus-target", "md-autofocus"]));
                                if (!e)
                                    for (var t = d.menuContentEl[0].children.length, n = 0; n < t; n++) {
                                        var o = d.menuContentEl[0].children[n];
                                        if (e = o.querySelector(".md-button:not([disabled])")) break;
                                        if (o.firstElementChild && !o.firstElementChild.disabled && !o.firstElementChild.getAttribute("disabled")) {
                                            e = o.firstElementChild;
                                            break
                                        }
                                    }
                                return e && e.focus(),
                                    function() {
                                        d.menuContentEl.off("keydown", r), d.menuContentEl[0].removeEventListener("click", i, !0)
                                    };

                                function r(e) {
                                    var t;
                                    switch (e.keyCode) {
                                        case s.KEY_CODE.ESCAPE:
                                            d.nestLevel ? d.mdMenuCtrl.close() : d.mdMenuCtrl.close(!1, {
                                                closeAll: !0
                                            }), t = !0;
                                            break;
                                        case s.KEY_CODE.TAB:
                                            d.mdMenuCtrl.close(!1, {
                                                closeAll: !0
                                            }), t = !1;
                                            break;
                                        case s.KEY_CODE.UP_ARROW:
                                            u(e, d.menuContentEl, d, -1) || d.nestLevel || d.mdMenuCtrl.triggerContainerProxy(e), t = !0;
                                            break;
                                        case s.KEY_CODE.DOWN_ARROW:
                                            u(e, d.menuContentEl, d, 1) || d.nestLevel || d.mdMenuCtrl.triggerContainerProxy(e), t = !0;
                                            break;
                                        case s.KEY_CODE.LEFT_ARROW:
                                            d.nestLevel ? d.mdMenuCtrl.close() : d.mdMenuCtrl.triggerContainerProxy(e), t = !0;
                                            break;
                                        case s.KEY_CODE.RIGHT_ARROW:
                                            var n = y.getClosest(e.target, "MD-MENU");
                                            n && n != d.parent[0] ? e.target.click() : d.mdMenuCtrl.triggerContainerProxy(e), t = !0
                                    }
                                    t && (e.preventDefault(), e.stopImmediatePropagation())
                                }

                                function i(e) {
                                    var t = e.target;
                                    do {
                                        if (t == d.menuContentEl[0]) return;
                                        if ((o(t, ["ng-click", "ng-href", "ui-sref"]) || "BUTTON" == t.nodeName || "MD-BUTTON" == t.nodeName) && !o(t, ["md-prevent-menu-close"])) {
                                            var n = y.getClosest(t, "MD-MENU");
                                            t.hasAttribute("disabled") || n && n != d.parent[0] || a.$apply(function() {
                                                d.mdMenuCtrl.close(!0, {
                                                    closeAll: !0
                                                })
                                            });
                                            break
                                        }
                                    } while (t = t.parentNode);

                                    function o(e, t) {
                                        if (!e) return !1;
                                        for (var n, o = 0; n = t[o]; ++o)
                                            if (A.hasAttribute(e, n)) return !0;
                                        return !1
                                    }
                                }
                            }(), d.cleanupBackdrop = d.backdrop ? (d.backdrop.on("click", t), function() {
                                d.backdrop.off("click", t)
                            }) : be.noop, n.addClass("md-clickable"), e
                        });

                    function t(e) {
                        e.preventDefault(), e.stopPropagation(), a.$apply(function() {
                            d.mdMenuCtrl.close(!0, {
                                closeAll: !0
                            })
                        })
                    }
                },
                onRemove: function(e, t, n) {
                    return n.cleanupInteraction(), n.cleanupBackdrop(), n.cleanupResizing(), n.hideBackdrop(), t.removeClass("md-clickable"), !0 === n.$destroy ? o() : function() {
                        return i(t, {
                            addClass: "md-leave"
                        }).start()
                    }().then(o);

                    function o() {
                        t.removeClass("md-active"),
                            function(e, t) {
                                t.preserveElement ? a(e).style.display = "none" : a(e).parentNode === a(t.parent) && a(t.parent).removeChild(a(e))
                            }(t, n), n.alreadyOpen = !1
                    }
                },
                hasBackdrop: !0,
                disableParentScroll: !0,
                skipCompile: !0,
                preserveScope: !0,
                multiple: !0,
                themable: !0
            };

            function u(e, t, n, o) {
                for (var r, i = y.getClosest(e.target, "MD-MENU-ITEM"), a = y.nodesToArray(t[0].children), d = a.indexOf(i) + o; 0 <= d && d < a.length; d += o) {
                    if (r = p(a[d].querySelector(".md-button"))) break
                }
                return r
            }

            function p(e) {
                if (e && -1 != e.getAttribute("tabindex")) return e.focus(), C[0].activeElement == e
            }

            function h(e, t) {
                var n, o = e[0],
                    r = e[0].firstElementChild,
                    i = r.getBoundingClientRect(),
                    a = C[0].body.getBoundingClientRect(),
                    d = T.getComputedStyle(r),
                    s = t.target[0].querySelector(A.buildSelector("md-menu-origin")) || t.target[0],
                    l = s.getBoundingClientRect(),
                    c = {
                        left: a.left + w,
                        top: Math.max(a.top, 0) + w,
                        bottom: Math.max(a.bottom, Math.max(a.top, 0) + a.height) - w,
                        right: a.right - w
                    },
                    m = {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    u = {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    p = t.mdMenuCtrl.positionMode();
                "target" !== p.top && "target" !== p.left && "target-right" !== p.left || (n = function() {
                    for (var e = 0; e < r.children.length; ++e)
                        if ("none" != T.getComputedStyle(r.children[e]).display) return r.children[e]
                }()) && (m = (n = (n = n.firstElementChild || n).querySelector(A.buildSelector("md-menu-align-target")) || n).getBoundingClientRect(), u = {
                    top: parseFloat(o.style.top || 0),
                    left: parseFloat(o.style.left || 0)
                });
                var h = {},
                    f = "top ";
                switch (p.top) {
                    case "target":
                        h.top = u.top + l.top - m.top;
                        break;
                    case "cascade":
                        h.top = l.top - parseFloat(d.paddingTop) - s.style.top;
                        break;
                    case "bottom":
                        h.top = l.top + l.height;
                        break;
                    default:
                        throw new Error('Invalid target mode "' + p.top + '" specified for md-menu on Y axis.')
                }
                var b = y.isRtl(e);
                switch (p.left) {
                    case "target":
                        h.left = u.left + l.left - m.left, f += b ? "right" : "left";
                        break;
                    case "target-left":
                        h.left = l.left, f += "left";
                        break;
                    case "target-right":
                        h.left = l.right - i.width + (i.right - m.right), f += "right";
                        break;
                    case "cascade":
                        var g = b ? l.left - i.width < c.left : l.right + i.width < c.right;
                        h.left = g ? l.right - s.style.left : l.left - s.style.left - i.width, f += g ? "left" : "right";
                        break;
                    case "right":
                        b ? (h.left = l.right - l.width, f += "left") : (h.left = l.right - i.width, f += "right");
                        break;
                    case "left":
                        b ? (h.left = l.right - i.width, f += "right") : (h.left = l.left, f += "left");
                        break;
                    default:
                        throw new Error('Invalid target mode "' + p.left + '" specified for md-menu on X axis.')
                }
                var E, v = t.mdMenuCtrl.offsets();
                h.top += v.top, h.left += v.left, (E = h).top = Math.max(Math.min(E.top, c.bottom - o.offsetHeight), c.top), E.left = Math.max(Math.min(E.left, c.right - o.offsetWidth), c.left);
                var $ = Math.round(100 * Math.min(l.width / o.offsetWidth, 1)) / 100,
                    M = Math.round(100 * Math.min(l.height / o.offsetHeight, 1)) / 100;
                return {
                    top: Math.round(h.top),
                    left: Math.round(h.left),
                    transform: t.alreadyOpen ? ge : y.supplant("scale({0},{1})", [$, M]),
                    transformOrigin: f
                }
            }
        }

        function a(e) {
            return e instanceof be.element && (e = e[0]), e
        }
    }

    function Oe(n, r) {
        return {
            restrict: "E",
            require: "mdMenuBar",
            controller: "MenuBarController",
            compile: function(e, t) {
                return t.ariaRole || e[0].setAttribute("role", "menubar"), be.forEach(e[0].children, function(e) {
                        if ("MD-MENU" == e.nodeName) {
                            e.hasAttribute("md-position-mode") || (e.setAttribute("md-position-mode", "left bottom"), e.querySelector("button, a, md-button").setAttribute("role", "menuitem"));
                            var t = n.nodesToArray(e.querySelectorAll("md-menu-content"));
                            be.forEach(t, function(e) {
                                e.classList.add("md-menu-bar-menu"), e.classList.add("md-dense"), e.hasAttribute("width") || e.setAttribute("width", 5)
                            })
                        }
                    }), e.find("md-menu-item").addClass("md-in-menu-bar"),
                    function(e, t, n, o) {
                        t.addClass("_md"), r(e, t), o.init()
                    }
            }
        }
    }

    function Pe(e, t, n) {
        this.$element = t, this.$attrs = n, this.$scope = e
    }

    function Le(c, e, m) {
        return {
            controller: "MenuItemController",
            require: ["mdMenuItem", "?ngModel"],
            priority: e.BEFORE_NG_ARIA,
            compile: function(o, e) {
                var t, n, r = e.type,
                    i = "md-in-menu-bar";
                if ("checkbox" !== r && "radio" !== r || !o.hasClass(i)) l("role", "menuitem", o[0].querySelector("md-button, button, a"));
                else {
                    var a = o[0].textContent,
                        d = be.element('<md-button type="button"></md-button>'),
                        s = '<md-icon md-svg-src="' + m.mdChecked + '"></md-icon>';
                    d.html(a), d.attr("tabindex", "0"), be.isDefined(e.mdPreventMenuClose) && d.attr("md-prevent-menu-close", e.mdPreventMenuClose), o.html(""), o.append(be.element(s)), o.append(d), o.addClass("md-indent").removeClass(i), l("role", "checkbox" === r ? "menuitemcheckbox" : "menuitemradio", d), t = "ng-disabled", n = c.prefixer(t), be.forEach(n, function(e) {
                        if (o[0].hasAttribute(e)) {
                            var t = o[0].getAttribute(e);
                            d[0].setAttribute(e, t), o[0].removeAttribute(e)
                        }
                    })
                }
                return function(e, t, n, o) {
                    var r = o[0],
                        i = o[1];
                    r.init(i)
                };

                function l(e, t, n) {
                    (n = n || o) instanceof be.element && (n = n[0]), n.hasAttribute(e) || n.setAttribute(e, t)
                }
            }
        }
    }

    function Re(i, a, d, s) {
        return {
            restrict: "E",
            transclude: !0,
            controller: Fe,
            controllerAs: "ctrl",
            bindToController: !0,
            scope: {
                mdSelectedNavItem: "=?",
                mdNoInkBar: "=?",
                navBarAriaLabel: "@?"
            },
            template: '<div class="md-nav-bar"><nav role="navigation"><ul class="_md-nav-bar-list" ng-transclude role="tablist" ng-focus="ctrl.onFocus()" aria-label="{{ctrl.navBarAriaLabel}}"></ul></nav><md-nav-ink-bar ng-hide="ctrl.mdNoInkBar"></md-nav-ink-bar></div>',
            link: function(e, t, n, o) {
                function r() {
                    o.width !== d.innerWidth && (o.updateSelectedTabInkBar(), o.width = d.innerWidth, e.$digest())
                }
                o.width = d.innerWidth, be.element(d).on("resize", s.debounce(r, 300)), e.$on("$destroy", function() {
                    be.element(d).off("resize", r)
                }), a(t), o.navBarAriaLabel || i.expectAsync(t, "aria-label", be.noop)
            }
        }
    }

    function Fe(e, t, n, o) {
        this._$timeout = n, this._$scope = t, this._$mdConstant = o, this.mdSelectedNavItem, this.navBarAriaLabel, this._navBarEl = e[0], this._inkbar;
        var r = this,
            i = this._$scope.$watch(function() {
                return r._navBarEl.querySelectorAll("._md-nav-button").length
            }, function(e) {
                0 < e && (r._initTabs(), i())
            })
    }

    function Be(c, e, m, u) {
        return {
            restrict: "E",
            require: ["mdNavItem", "^mdNavBar"],
            controller: Ue,
            bindToController: !0,
            controllerAs: "ctrl",
            replace: !0,
            transclude: !0,
            template: function(e, t) {
                var n, o, r = t.mdNavClick,
                    i = t.mdNavHref,
                    a = t.mdNavSref,
                    d = t.srefOpts;
                if (1 < (r ? 1 : 0) + (i ? 1 : 0) + (a ? 1 : 0)) throw Error("Please do not specify more than one of the md-nav-click, md-nav-href, or md-nav-sref attributes per nav-item directive.");
                if (r !== ge && null !== r) n = 'ng-click="ctrl.mdNavClick()"';
                else if (i !== ge && null !== i) n = 'ng-href="{{ctrl.mdNavHref}}"';
                else {
                    if (a === ge || null === a) throw Error("Please specify at least one of the md-nav-click, md-nav-href, or md-nav-sref attributes per nav-item directive.");
                    n = 'ui-sref="{{ctrl.mdNavSref}}"'
                }
                return n && (o = '<md-button class="_md-nav-button md-accent" ng-class="ctrl.getNgClassMap()" ng-blur="ctrl.setFocused(false)" ng-disabled="ctrl.disabled" tabindex="-1" role="tab" ng-attr-aria-label="{{ctrl.navItemAriaLabel ? ctrl.navItemAriaLabel : undefined}}" aria-selected="{{ctrl.isSelected()}}" ' + (d ? 'ui-sref-opts="{{ctrl.srefOpts}}" ' : "") + n + '><span ng-transclude class="_md-nav-button-text"></span></md-button>'), '<li class="md-nav-item" role="presentation">' + (o || "") + "</li>"
            },
            scope: {
                mdNavClick: "&?",
                mdNavHref: "@?",
                mdNavSref: "@?",
                srefOpts: "=?",
                name: "@",
                navItemAriaLabel: "@?"
            },
            link: function(n, o, r, i) {
                var a, d, s, l;
                e(function() {
                    if (d = i[0], s = i[1], l = be.element(o[0].querySelector("._md-nav-button")), d.name || (d.name = be.element(o[0].querySelector("._md-nav-button-text")).text().trim()), l.on("keydown", function(e) {
                            s.onKeydown(e)
                        }), l.on("focus", function() {
                            d._focused = !0
                        }), l.on("click", function() {
                            s.mdSelectedNavItem = d.name, n.$apply()
                        }), d.disabled = m.parseAttributeBoolean(r.disabled, !1), "MutationObserver" in u) {
                        var e = o[0],
                            t = new MutationObserver(function(e) {
                                m.nextTick(function() {
                                    d.disabled = m.parseAttributeBoolean(r[e[0].attributeName], !1)
                                })
                            });
                        t.observe(e, {
                            attributes: !0,
                            attributeFilter: ["disabled"]
                        }), a = t.disconnect.bind(t)
                    } else r.$observe("disabled", function(e) {
                        d.disabled = m.parseAttributeBoolean(e, !1)
                    });
                    d.navItemAriaLabel || c.expectWithText(l, "aria-label")
                }), n.$on("destroy", function() {
                    l.off("keydown"), l.off("focus"), l.off("click"), a()
                })
            }
        }
    }

    function Ue(e) {
        this._$element = e, this.mdNavClick, this.mdNavHref, this.mdNavSref, this.srefOpts, this.name, this.navItemAriaLabel, this._selected = !1, this.isFocused = !1
    }

    function je($, M, d, y, p, e) {
        var C = $.requestAnimationFrame || $.webkitRequestAnimationFrame || be.noop,
            h = $.cancelAnimationFrame || $.webkitCancelAnimationFrame || $.webkitCancelRequestAnimationFrame || be.noop,
            f = "determinate",
            T = "indeterminate",
            A = "_md-progress-circular-disabled",
            w = "md-mode-indeterminate";
        return {
            restrict: "E",
            scope: {
                value: "@",
                mdDiameter: "@",
                mdMode: "@"
            },
            template: '<svg xmlns="http://www.w3.org/2000/svg"><path fill="none"/></svg>',
            compile: function(e, t) {
                if (e.attr({
                        "aria-valuemin": 0,
                        "aria-valuemax": 100,
                        role: "progressbar"
                    }), be.isUndefined(t.mdMode)) {
                    var n = t.hasOwnProperty("value") ? f : T;
                    t.$set("mdMode", n)
                } else t.$set("mdMode", t.mdMode.trim());
                return o
            }
        };

        function o(b, s, l) {
            var g, e, t = s[0],
                a = be.element(t.querySelector("svg")),
                E = be.element(t.querySelector("path")),
                n = M.startIndeterminate,
                o = M.endIndeterminate,
                r = 0,
                v = 0;

            function c(n, e, t, o, r, i) {
                var a = ++v,
                    d = y.now(),
                    s = e - n,
                    l = N(b.mdDiameter),
                    c = S(l),
                    m = t || M.easeFn,
                    u = o || M.duration,
                    p = -90 * (r || 0),
                    h = i || 100;

                function f(e) {
                    E.attr("stroke-dashoffset", k(l, c, e, h)), E.attr("transform", "rotate(" + p + " " + l / 2 + " " + l / 2 + ")")
                }
                e === n ? f(e) : g = C(function e() {
                    var t = $.Math.max(0, $.Math.min(y.now() - d, u));
                    f(m(t, n, s, u)), a === v && t < u && (g = C(e))
                })
            }

            function i() {
                c(n, o, M.easeFnIndeterminate, M.durationIndeterminate, r, 75), r = ++r % 4
            }

            function m() {
                e || (e = p(i, M.durationIndeterminate, 0, !1), i(), s.addClass(w).removeAttr("aria-valuenow"))
            }

            function u() {
                e && (p.cancel(e), e = null, s.removeClass(w))
            }
            d(s), s.toggleClass(A, l.hasOwnProperty("disabled")), b.mdMode === T && m(), b.$on("$destroy", function() {
                u(), g && h(g)
            }), b.$watchGroup(["value", "mdMode", function() {
                var e = t.disabled;
                return !0 === e || !1 === e ? e : be.isDefined(s.attr("disabled"))
            }], function(e, t) {
                var n = e[1],
                    o = e[2],
                    r = 0,
                    i = 0;
                if (o !== t[2] && s.toggleClass(A, !!o), o) u();
                else if (n !== f && n !== T && (n = T, l.$set("mdMode", n)), n === T) t[1] === f && (i = S(r = N(b.mdDiameter)), E.attr("d", _(r, i, !0)), E.attr("stroke-dasharray", D(r, i, 75))), m();
                else {
                    var a = x(e[0]),
                        d = x(t[0]);
                    u(), t[1] === T && (i = S(r = N(b.mdDiameter)), E.attr("d", _(r, i, !1)), E.attr("stroke-dasharray", D(r, i, 100))), s.attr("aria-valuenow", a), c(d, a)
                }
            }), b.$watch("mdDiameter", function(e) {
                var t = N(e),
                    n = S(t),
                    o = x(b.value),
                    r = t / 2 + "px",
                    i = {
                        width: t + "px",
                        height: t + "px"
                    };
                a[0].setAttribute("viewBox", "0 0 " + t + " " + t), a.css(i).css("transform-origin", r + " " + r + " " + r), s.css(i), E.attr("stroke-width", n), E.attr("stroke-linecap", "square"), b.mdMode == T ? (E.attr("d", _(t, n, !0)), E.attr("stroke-dasharray", D(t, n, 75)), E.attr("stroke-dashoffset", k(t, n, 1, 75))) : (E.attr("d", _(t, n, !1)), E.attr("stroke-dasharray", D(t, n, 100)), E.attr("stroke-dashoffset", k(t, n, 0, 100)), c(o, o))
            })
        }

        function _(e, t, n) {
            var o = e / 2,
                r = t / 2,
                i = o + "," + r,
                a = o - r;
            return "M" + i + "A" + a + "," + a + " 0 1 1 " + (r + "," + o) + (n ? "" : "A" + a + "," + a + " 0 0 1 " + i)
        }

        function k(e, t, n, o) {
            return r(e, t) * ((o - n) / 100)
        }

        function x(e) {
            return $.Math.max(0, $.Math.min(e || 0, 100))
        }

        function N(e) {
            var t = M.progressSize;
            if (e) {
                var n = parseFloat(e);
                return e.lastIndexOf("%") === e.length - 1 && (n = n / 100 * t), n
            }
            return t
        }

        function S(e) {
            return M.strokeWidth / 100 * e
        }

        function D(e, t, n) {
            return r(e, t) * (n / 100)
        }

        function r(e, t) {
            return (e - t) * $.Math.PI
        }
    }

    function ze(m, u, e) {
        var p = "determinate",
            h = "indeterminate",
            f = "buffer",
            b = "query",
            g = "_md-progress-linear-disabled";
        return {
            restrict: "E",
            template: '<div class="md-container"><div class="md-dashed"></div><div class="md-bar md-bar1"></div><div class="md-bar md-bar2"></div></div>',
            compile: function(e, t, n) {
                return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), o
            }
        };

        function o(e, n, t) {
            var o;
            m(n);
            var r = t.hasOwnProperty("disabled"),
                i = u.dom.animator.toCss,
                a = be.element(n[0].querySelector(".md-bar1")),
                d = be.element(n[0].querySelector(".md-bar2")),
                s = be.element(n[0].querySelector(".md-container"));

            function l() {
                var e = (t.mdMode || "").trim();
                if (e) switch (e) {
                    case p:
                    case h:
                    case f:
                    case b:
                        break;
                    default:
                        e = h
                }
                return e
            }

            function c(e, t) {
                if (!r && l()) {
                    var n = u.supplant("translateX({0}%) scale({1},1)", [(t - 100) / 2, t / 100]),
                        o = i({
                            transform: n
                        });
                    be.element(e).css(o)
                }
            }
            n.attr("md-mode", l()).toggleClass(g, r),
                function() {
                    if (be.isUndefined(t.mdMode)) {
                        var e = be.isDefined(t.value) ? p : h;
                        n.attr("md-mode", e), t.mdMode = e
                    }
                }(), t.$observe("value", function(e) {
                    var t = E(e);
                    n.attr("aria-valuenow", t), l() != b && c(d, t)
                }), t.$observe("mdBufferValue", function(e) {
                    c(a, E(e))
                }), t.$observe("disabled", function(e) {
                    r = !0 === e || !1 === e ? !!e : be.isDefined(e), n.toggleClass(g, r), s.toggleClass(o, !r)
                }), t.$observe("mdMode", function(e) {
                    switch (o && s.removeClass(o), e) {
                        case b:
                        case f:
                        case p:
                        case h:
                            s.addClass(o = "md-mode-" + e);
                            break;
                        default:
                            s.addClass(o = "md-mode-" + h)
                    }
                })
        }

        function E(e) {
            return Math.max(0, Math.min(e || 0, 100))
        }
    }

    function qe(s, l) {
        return ["$mdUtil", "$window", function(a, d) {
            return {
                restrict: "A",
                multiElement: !0,
                link: function(o, r, t) {
                    var i = o.$on("$md-resize-enable", function() {
                        i();
                        var e = r[0],
                            n = e.nodeType === d.Node.ELEMENT_NODE ? d.getComputedStyle(e) : {};
                        o.$watch(t[s], function(e) {
                            if (!!e === l) {
                                a.nextTick(function() {
                                    o.$broadcast("$md-resize")
                                });
                                var t = {
                                    cachedTransitionStyles: n
                                };
                                a.dom.animator.waitTransitionEnd(r, t).then(function() {
                                    o.$broadcast("$md-resize")
                                })
                            }
                        })
                    })
                }
            }
        }]
    }

    function Ve(o, r, i, a) {
        var d = "SideNav '{0}' is not available! Did you use md-component-id='{0}'?",
            s = {
                find: function(e, t) {
                    var n = o.get(e);
                    return n || t ? n : (a.error(r.supplant(d, [e || ""])), ge)
                },
                waitFor: l
            };
        return function(e, t) {
            if (be.isUndefined(e)) return s;
            var n = !0 === t,
                o = s.find(e, n);
            return !o && n ? s.waitFor(e) : !o && be.isUndefined(t) ? function(e, t) {
                function n() {
                    return !1
                }

                function o() {
                    return i.when(r.supplant(d, [t || ""]))
                }
                return be.extend({
                    isLockedOpen: n,
                    isOpen: n,
                    toggle: o,
                    open: o,
                    close: o,
                    onClose: be.noop,
                    then: function(e) {
                        return l(t).then(e || be.noop)
                    }
                }, e)
            }(s, e) : o
        };

        function l(e) {
            return o.when(e).catch(a.error)
        }
    }

    function We(o, g, E, v, $, M, e, y, C, T, A, w, _) {
        return {
            restrict: "E",
            scope: {
                isOpen: "=?mdIsOpen"
            },
            controller: "$mdSidenavController",
            compile: function(e) {
                return e.addClass("md-closed").attr("tabIndex", "-1"), t
            }
        };

        function t(r, i, e, t) {
            var a, d, s, l, c, m = null,
                u = null,
                p = T.when(!0),
                n = y(e.mdIsLockedOpen),
                h = be.element(w);

            function f(e) {
                return e.keyCode === E.KEY_CODE.ESCAPE ? b(e) : T.when(!0)
            }

            function b(e) {
                return e.preventDefault(), t.close()
            }
            e.mdDisableScrollTarget && ((m = A[0].querySelector(e.mdDisableScrollTarget)) ? m = be.element(m) : C.warn(g.supplant('mdSidenav: couldn\'t find element matching selector "{selector}". Falling back to parent.', {
                selector: e.mdDisableScrollTarget
            }))), m = m || i.parent(), e.hasOwnProperty("mdDisableBackdrop") || (d = g.createBackdrop(r, "md-sidenav-backdrop md-opaque ng-enter")), e.hasOwnProperty("mdDisableCloseEvents") && (s = !0), i.addClass("_md"), v(i), d && v.inherit(d, i), i.on("$destroy", function() {
                d && d.remove(), t.destroy()
            }), r.$on("$destroy", function() {
                d && d.remove()
            }), r.$watch(function() {
                return n(r.$parent, {
                    $mdMedia: o
                })
            }, function(e, t) {
                (r.isLockedOpen = e) === t ? i.toggleClass("md-locked-open", !!e) : M[e ? "addClass" : "removeClass"](i, "md-locked-open");
                d && d.toggleClass("md-locked-open", !!e)
            }), r.$watch("isOpen", function(e) {
                var t, n = g.findFocusTarget(i) || i,
                    o = i.parent();
                s || (o[e ? "on" : "off"]("keydown", f), d && d[e ? "on" : "off"]("click", b));
                t = function(e, t) {
                    var n = i[0],
                        o = e[0].scrollTop;
                    if (t && o) {
                        c = {
                            top: n.style.top,
                            bottom: n.style.bottom,
                            height: n.style.height
                        };
                        var r = {
                            top: o + "px",
                            bottom: "auto",
                            height: e[0].clientHeight + "px"
                        };
                        i.css(r), d.css(r)
                    }
                    if (!t && c) return function() {
                        n.style.top = c.top, n.style.bottom = c.bottom, n.style.height = c.height, d[0].style.top = null, d[0].style.bottom = null, d[0].style.height = null, c = null
                    }
                }(o, e), e && (u = A[0].activeElement, l = $.getLastInteractionType());
                return function(e) {
                    e && !a ? (a = m.css("overflow"), m.css("overflow", "hidden")) : be.isDefined(a) && (m.css("overflow", a), a = ge)
                }(e), p = T.all([e && d ? M.enter(d, o) : d ? M.leave(d) : T.when(!0), M[e ? "removeClass" : "addClass"](i, "md-closed")]).then(function() {
                    r.isOpen && (_(function() {
                        h.triggerHandler("resize")
                    }), n && n.focus()), t && t()
                })
            }), t.$toggleOpen = function(e) {
                return r.isOpen === e ? T.when(!0) : (r.isOpen && t.onCloseCb && t.onCloseCb(), T(function(t) {
                    r.isOpen = e, g.nextTick(function() {
                        p.then(function(e) {
                            !r.isOpen && u && "keyboard" === l && (u.focus(), u = null), t(e)
                        })
                    })
                }))
            }
        }
    }

    function Ye(t, e, n, o, r) {
        var i = this;
        i.isOpen = function() {
            return !!t.isOpen
        }, i.isLockedOpen = function() {
            return !!t.isLockedOpen
        }, i.onClose = function(e) {
            return i.onCloseCb = e, i
        }, i.open = function() {
            return i.$toggleOpen(!0)
        }, i.close = function() {
            return i.$toggleOpen(!1)
        }, i.toggle = function() {
            return i.$toggleOpen(!t.isOpen)
        }, i.$toggleOpen = function(e) {
            return o.when(t.isOpen = e)
        };
        var a = e.mdComponentId,
            d = a && -1 < a.indexOf(r.startSymbol()),
            s = d ? r(a)(t.$parent) : a;
        i.destroy = n.register(i, s), d && e.$observe("mdComponentId", function(e) {
            e && e !== i.$$mdHandle && (i.destroy(), i.destroy = n.register(i, e))
        })
    }

    function Ke(l, c, m, d) {
        var s = m.checkStickySupport();
        return function(e, t, n) {
            var o = t.controller("mdContent");
            if (o)
                if (s) t.css({
                    position: s,
                    top: 0,
                    "z-index": 2
                });
                else {
                    var r = o.$element.data("$$sticky");
                    r || (r = function(e) {
                        var o, r = e.$element,
                            i = c.throttle(t);
                        return function(e) {
                            var t, n, o = 200;

                            function r() {
                                +m.now() - n > o ? (t = !1, e.triggerHandler("$scrollend")) : (e.triggerHandler("$scroll"), c.throttle(r))
                            }
                            e.on("scroll touchmove", function() {
                                t || (t = !0, c.throttle(r), e.triggerHandler("$scrollstart")), e.triggerHandler("$scroll"), n = +m.now()
                            })
                        }(r), r.on("$scrollstart", i), r.on("$scroll", function e() {
                            var t = r.prop("scrollTop");
                            var n = (e.prevScrollTop || 0) < t;
                            e.prevScrollTop = t;
                            if (0 === t) return void d(null);
                            if (n) {
                                if (o.next && o.next.top <= t) return void d(o.next);
                                if (o.current && o.next && o.next.top - t <= o.next.height) return void s(o.current, t + (o.next.top - o.next.height - t))
                            }
                            if (!n) {
                                if (o.current && o.prev && t < o.current.top) return void d(o.prev);
                                if (o.next && o.current && t >= o.next.top - o.current.height) return void s(o.current, t + (o.next.top - t - o.current.height))
                            }
                            o.current && s(o.current, t)
                        }), o = {
                            prev: null,
                            current: null,
                            next: null,
                            items: [],
                            add: function(n, e) {
                                e.addClass("md-sticky-clone");
                                var t = {
                                    element: n,
                                    clone: e
                                };
                                return o.items.push(t), m.nextTick(function() {
                                        r.prepend(t.clone)
                                    }), i(),
                                    function() {
                                        o.items.forEach(function(e, t) {
                                            e.element[0] === n[0] && (o.items.splice(t, 1), e.clone.remove())
                                        }), i()
                                    }
                            },
                            refreshElements: t
                        };

                        function t() {
                            var e;
                            o.items.forEach(a), o.items = o.items.sort(function(e, t) {
                                return e.top < t.top ? -1 : 1
                            });
                            for (var t = r.prop("scrollTop"), n = o.items.length - 1; 0 <= n; n--)
                                if (t > o.items[n].top) {
                                    e = o.items[n];
                                    break
                                } d(e)
                        }

                        function a(e) {
                            var t = e.element[0];
                            for (e.top = 0, e.left = 0, e.right = 0; t && t !== r[0];) e.top += t.offsetTop, e.left += t.offsetLeft, t.offsetParent && (e.right += t.offsetParent.offsetWidth - t.offsetWidth - t.offsetLeft), t = t.offsetParent;
                            e.height = e.element.prop("offsetHeight");
                            var n = m.floatingScrollbars() ? "0" : ge;
                            m.bidi(e.clone, "margin-left", e.left, n), m.bidi(e.clone, "margin-right", n, e.right)
                        }

                        function d(e) {
                            if (o.current !== e) {
                                o.current && (s(o.current, null), n(o.current, null)), e && n(e, "active"), o.current = e;
                                var t = o.items.indexOf(e);
                                o.next = o.items[t + 1], o.prev = o.items[t - 1], n(o.next, "next"), n(o.prev, "prev")
                            }
                        }

                        function n(e, t) {
                            e && e.state !== t && (e.state && (e.clone.attr("sticky-prev-state", e.state), e.element.attr("sticky-prev-state", e.state)), e.clone.attr("sticky-state", t), e.element.attr("sticky-state", t), e.state = t)
                        }

                        function s(e, t) {
                            e && (null === t || t === ge ? e.translateY && (e.translateY = null, e.clone.css(l.CSS.TRANSFORM, "")) : (e.translateY = t, m.bidi(e.clone, l.CSS.TRANSFORM, "translate3d(" + e.left + "px," + t + "px,0)", "translateY(" + t + "px)")))
                        }
                    }(o), o.$element.data("$$sticky", r));
                    var i = n || d(t.clone())(e),
                        a = r.add(t, i);
                    e.$on("$destroy", a)
                }
        }
    }

    function Ge(d, s, l, c, m) {
        return {
            restrict: "E",
            replace: !0,
            transclude: !0,
            template: '<div class="md-subheader _md">  <div class="md-subheader-inner">    <div class="md-subheader-content"></div>  </div></div>',
            link: function(n, o, e, t, r) {
                l(o), o.addClass("_md"), c.prefixer().removeAttribute(o, "ng-repeat");
                var i = o[0].outerHTML;

                function a(e) {
                    return be.element(e[0].querySelector(".md-subheader-content"))
                }
                e.$set("role", "heading"), m.expect(o, "aria-level", "2"), r(n, function(e) {
                    a(o).append(e)
                }), o.hasClass("md-no-sticky") || r(n, function(e) {
                    var t = s('<div class="md-subheader-wrapper" aria-hidden="true">' + i + "</div>")(n);
                    c.nextTick(function() {
                        a(t).append(e)
                    }), d(n, o, t)
                })
            }
        }
    }

    function Xe(e) {
        t.$inject = ["$parse"];
        var i = "md" + e,
            a = "$md." + e.toLowerCase();
        return t;

        function t(r) {
            return {
                restrict: "A",
                link: function(n, e, t) {
                    var o = r(t[i]);
                    e.on(a, function(e) {
                        var t = e.currentTarget;
                        n.$applyAsync(function() {
                            o(n, {
                                $event: e,
                                $target: {
                                    current: t
                                }
                            })
                        })
                    })
                }
            }
        }
    }

    function Ze(e, m, u, p, h, f, b) {
        var n = e[0];
        return {
            restrict: "E",
            priority: u.BEFORE_NG_ARIA,
            transclude: !0,
            template: '<div class="md-container"><div class="md-bar"></div><div class="md-thumb-container"><div class="md-thumb" md-ink-ripple md-ink-ripple-checkbox></div></div></div><div ng-transclude class="md-label"></div>',
            require: ["^?mdInputContainer", "?ngModel", "?^form"],
            compile: function(e, t) {
                var c = n.compile(e, t).post;
                return e.addClass("md-dragging"),
                    function(t, n, e, o) {
                        o[0];
                        var r = o[1] || m.fakeNgModel(),
                            i = (o[2], null);
                        null != e.disabled ? i = function() {
                            return !0
                        } : e.ngDisabled && (i = p(e.ngDisabled));
                        var a, d = be.element(n[0].querySelector(".md-thumb-container")),
                            s = be.element(n[0].querySelector(".md-container")),
                            l = be.element(n[0].querySelector(".md-label"));
                        h(function() {
                            n.removeClass("md-dragging")
                        }), c(t, n, e, o), i && t.$watch(i, function(e) {
                            n.attr("tabindex", e ? -1 : 0)
                        }), e.$observe("mdInvert", function(e) {
                            var t = m.parseAttributeBoolean(e);
                            t ? n.prepend(l) : n.prepend(s), n.toggleClass("md-inverted", t)
                        }), f.register(s, "drag"), s.on("$md.dragstart", function(e) {
                            if (i && i(t)) return;
                            e.stopPropagation(), n.addClass("md-dragging"), a = {
                                width: d.prop("offsetWidth")
                            }
                        }).on("$md.drag", function(e) {
                            if (!a) return;
                            e.stopPropagation(), e.srcEvent && e.srcEvent.preventDefault();
                            var t = e.pointer.distanceX / a.width,
                                n = r.$viewValue ? 1 + t : t;
                            n = Math.max(0, Math.min(1, n)), d.css(u.CSS.TRANSFORM, "translate3d(" + 100 * n + "%,0,0)"), a.translate = n
                        }).on("$md.dragend", function(e) {
                            if (!a) return;
                            e.stopPropagation(), n.removeClass("md-dragging"), d.css(u.CSS.TRANSFORM, ""), (r.$viewValue ? a.translate < .5 : .5 < a.translate) && function(e) {
                                t.$apply(function() {
                                    r.$setViewValue(e), r.$render()
                                })
                            }(!r.$viewValue);
                            a = null, t.skipToggle = !0, b(function() {
                                t.skipToggle = !1
                            }, 1)
                        })
                    }
            }
        }
    }

    function Qe(o) {
        return {
            restrict: "A",
            compile: function(e, t) {
                var n = o(t.mdTabScroll, null, !0);
                return function(t, e) {
                    e.on("wheel", function(e) {
                        t.$apply(function() {
                            n(t, {
                                $event: e
                            })
                        })
                    })
                }
            }
        }
    }

    function Je(l, c, t, n, r, m, s, i, o, e, a, u, d) {
        var p = this,
            h = !1,
            f = [],
            b = !1,
            g = !1;

        function E(t, e) {
            var n = i.$normalize("md-" + t);

            function o(e) {
                p[t] = "false" !== e
            }
            e && O(t, e, ge), i.hasOwnProperty(n) && o(i[n]), i.$observe(n, o)
        }

        function v() {
            b = !0, be.element(t).off("resize", x)
        }

        function $() {
            var e = D();
            be.element(e.wrapper).toggleClass("md-stretch-tabs", function() {
                switch (p.stretchTabs) {
                    case "always":
                        return !0;
                    case "never":
                        return !1;
                    default:
                        return !p.shouldPaginate && t.matchMedia("(max-width: 600px)").matches
                }
            }()), q()
        }

        function M() {
            p.shouldCenterTabs = H()
        }

        function y(t, e) {
            if (t !== e) {
                var n = D();
                be.forEach(n.tabs, function(e) {
                    e.style.maxWidth = t + "px"
                }), be.forEach(n.dummies, function(e) {
                    e.style.maxWidth = t + "px"
                }), m.nextTick(p.updateInkBarStyles)
            }
        }

        function C(e, t) {
            e !== t && (p.maxTabWidth = R(), p.shouldCenterTabs = H(), m.nextTick(function() {
                p.maxTabWidth = R(), U(p.selectedIndex)
            }))
        }

        function T(e) {
            c[e ? "removeClass" : "addClass"]("md-no-tab-content")
        }

        function A(e) {
            var t = (p.shouldCenterTabs || W() ? "" : "-") + e + "px";
            t = t.replace("--", ""), be.element(D().paging).css(n.CSS.TRANSFORM, "translate(" + t + ", 0)"), l.$broadcast("$mdTabsPaginationChanged")
        }

        function w(e, t) {
            e !== t && D().tabs[e] && (U(), B())
        }

        function _(e, t) {
            e !== t && (p.selectedIndex = I(e), p.lastSelectedIndex = t, p.updateInkBarStyles(), z(), U(e), l.$broadcast("$mdTabsChanged"), p.tabs[t] && p.tabs[t].scope.deselect(), p.tabs[e] && p.tabs[e].scope.select())
        }

        function k(e, t) {
            h || (p.focusIndex = p.selectedIndex = e), t && p.noSelectClick || m.nextTick(function() {
                p.tabs[e].element.triggerHandler("click")
            }, !1)
        }

        function x() {
            p.lastSelectedIndex = p.selectedIndex, p.offsetLeft = V(p.offsetLeft), m.nextTick(function() {
                p.updateInkBarStyles(), P()
            })
        }

        function N(e) {
            be.element(D().inkBar).toggleClass("ng-hide", e)
        }

        function S(e) {
            c.toggleClass("md-dynamic-height", e)
        }

        function D() {
            var e = {},
                t = c[0];
            return e.wrapper = t.querySelector("md-tabs-wrapper"), e.canvas = e.wrapper.querySelector("md-tabs-canvas"), e.paging = e.canvas.querySelector("md-pagination-wrapper"), e.inkBar = e.paging.querySelector("md-ink-bar"), e.nextButton = t.querySelector("md-next-button"), e.prevButton = t.querySelector("md-prev-button"), e.contents = t.querySelectorAll("md-tabs-content-wrapper > md-tab-content"), e.tabs = e.paging.querySelectorAll("md-tab-item"), e.dummies = e.canvas.querySelectorAll("md-dummy-tab"), e
        }

        function H() {
            return p.centerTabs && !p.shouldPaginate
        }

        function I(e) {
            if (-1 === e) return -1;
            var t, n, o = Math.max(p.tabs.length - e, e);
            for (t = 0; t <= o; t++) {
                if ((n = p.tabs[e + t]) && !0 !== n.scope.disabled) return n.getIndex();
                if ((n = p.tabs[e - t]) && !0 !== n.scope.disabled) return n.getIndex()
            }
            return e
        }

        function O(e, n, o) {
            Object.defineProperty(p, e, {
                get: function() {
                    return o
                },
                set: function(e) {
                    var t = o;
                    o = e, n && n(e, t)
                }
            })
        }

        function P() {
            p.maxTabWidth = R(), p.shouldPaginate = function() {
                var e;
                if (p.noPagination || !g) return !1;
                var t = c.prop("clientWidth");
                return be.forEach(D().tabs, function(e) {
                    t -= e.offsetWidth
                }), e = t < 0, m.msie && (D().paging.style.width = e ? "999999px" : ge), e
            }()
        }

        function L(e) {
            var t = 0;
            return be.forEach(e, function(e) {
                t += Math.max(e.offsetWidth, e.getBoundingClientRect().width)
            }), Math.ceil(t)
        }

        function R() {
            var e = D().canvas.clientWidth;
            return Math.max(0, Math.min(e - 1, 264))
        }

        function F(e, t) {
            var n, o = t ? "focusIndex" : "selectedIndex",
                r = p[o];
            for (n = r + e; p.tabs[n] && p.tabs[n].scope.disabled; n += e);
            n = (r + e + p.tabs.length) % p.tabs.length, p.tabs[n] && (p[o] = n)
        }

        function B() {
            p.styleTabItemFocus = "keyboard" === a.getLastInteractionType();
            var e = D().tabs[p.focusIndex];
            e && e.focus()
        }

        function U(e) {
            var t = D();
            if (be.isNumber(e) || (e = p.focusIndex), t.tabs[e] && !p.shouldCenterTabs) {
                var n = t.tabs[e],
                    o = n.offsetLeft,
                    r = n.offsetWidth + o;
                if (0 !== e)
                    if (W()) {
                        var i = L(Array.prototype.slice.call(t.tabs, 0, e)),
                            a = L(Array.prototype.slice.call(t.tabs, 0, e + 1));
                        p.offsetLeft = Math.min(p.offsetLeft, V(i)), p.offsetLeft = Math.max(p.offsetLeft, V(a - t.canvas.clientWidth))
                    } else p.offsetLeft = Math.max(p.offsetLeft, V(r - t.canvas.clientWidth + 32)), p.offsetLeft = Math.min(p.offsetLeft, V(o));
                else p.offsetLeft = 0
            }
        }

        function j() {
            p.selectedIndex = I(p.selectedIndex), p.focusIndex = I(p.focusIndex)
        }

        function z() {
            if (!p.dynamicHeight) return c.css("height", "");
            if (!p.tabs.length) return f.push(z);
            var e = D(),
                t = e.contents[p.selectedIndex],
                n = t ? t.offsetHeight : 0,
                o = e.wrapper.offsetHeight,
                r = n + o,
                i = c.prop("clientHeight");
            if (i !== r) {
                "bottom" === c.attr("md-align-tabs") && (i -= o, r -= o, c.attr("md-border-bottom") !== ge && ++i), h = !0;
                var a = {
                        height: i + "px"
                    },
                    d = {
                        height: r + "px"
                    };
                c.css(a), s(c, {
                    from: a,
                    to: d,
                    easing: "cubic-bezier(0.35, 0, 0.25, 1)",
                    duration: .5
                }).start().done(function() {
                    c.css({
                        transition: "none",
                        height: ""
                    }), m.nextTick(function() {
                        c.css("transition", "")
                    }), h = !1
                })
            }
        }

        function q(e, t) {
            if (!p.noInkBar) {
                var n = D();
                if (n.tabs[p.selectedIndex])
                    if (p.tabs.length)
                        if (c.prop("offsetParent")) {
                            var o = p.selectedIndex,
                                r = n.paging.offsetWidth,
                                i = n.tabs[o],
                                a = i.offsetLeft,
                                d = r - a - i.offsetWidth;
                            if (p.shouldCenterTabs) {
                                var s = L(n.tabs);
                                s < r && e !== r && t !== s && u(q, 0, !0, r, s)
                            }! function() {
                                var e = D(),
                                    t = p.selectedIndex,
                                    n = p.lastSelectedIndex,
                                    o = be.element(e.inkBar);
                                if (!be.isNumber(n)) return;
                                o.toggleClass("md-left", t < n).toggleClass("md-right", n < t)
                            }(), be.element(n.inkBar).css({
                                left: a + "px",
                                right: d + "px"
                            })
                        } else(function e() {
                            e.watcher || (e.watcher = l.$watch(function() {
                                m.nextTick(function() {
                                    e.watcher && c.prop("offsetParent") && (e.watcher(), e.watcher = null, x())
                                }, !1)
                            }))
                        })();
                else f.push(p.updateInkBarStyles);
                else be.element(n.inkBar).css({
                    left: "auto",
                    right: "auto"
                })
            }
        }

        function V(e) {
            var t = D();
            if (!t.tabs.length || !p.shouldPaginate) return 0;
            var n = t.tabs[t.tabs.length - 1],
                o = n.offsetLeft + n.offsetWidth;
            return e = W() ? (e = Math.min(t.paging.offsetWidth - t.canvas.clientWidth, e), Math.max(0, e)) : (e = Math.max(0, e), Math.min(o - t.canvas.clientWidth, e))
        }

        function W() {
            return m.isRtl(i)
        }
        p.$onInit = function() {
            (function(t, e) {
                var n = i.$normalize("md-" + t);
                e && O(t, e);
                i.$observe(n, function(e) {
                    p[t] = e
                })
            })("stretchTabs", $), O("focusIndex", w, p.selectedIndex || 0), O("offsetLeft", A, 0), O("hasContent", T, !1), O("maxTabWidth", y, R()), O("shouldPaginate", C, !1), E("noInkBar", N), E("dynamicHeight", S), E("noPagination"), E("swipeContent"), E("autoselect"), E("noSelectClick"), E("centerTabs", M), E("enableDisconnect"), p.scope = l, p.parent = l.$parent, p.tabs = [], p.lastSelectedIndex = null, p.hasFocus = !1, p.styleTabItemFocus = !1, p.shouldCenterTabs = H(), p.tabContentPrefix = "tab-content-", p.navigationHint = "Use the left and right arrow keys to navigate between tabs", p.selectedIndex = p.selectedIndex || 0,
                function() {
                    var e = i.$mdTabsTemplate,
                        t = be.element(c[0].querySelector("md-tab-data"));
                    t.html(e), o(t.contents())(p.parent), delete i.$mdTabsTemplate
                }(), l.$watch("$mdTabsCtrl.selectedIndex", _), be.element(t).on("resize", x), l.$on("$destroy", v), e(c), m.nextTick(function() {
                    z(), U(), q(), p.tabs[p.selectedIndex] && p.tabs[p.selectedIndex].scope.select(), g = !0, P()
                })
        }, p.updatePagination = m.debounce(P, 100), p.redirectFocus = B, p.attachRipple = function(e, t) {
            var n = D(),
                o = {
                    colorElement: be.element(n.inkBar)
                };
            r.attach(e, t, o)
        }, p.insertTab = function(e, t) {
            var n = g,
                o = {
                    getIndex: function() {
                        return p.tabs.indexOf(r)
                    },
                    isActive: function() {
                        return this.getIndex() === p.selectedIndex
                    },
                    isLeft: function() {
                        return this.getIndex() < p.selectedIndex
                    },
                    isRight: function() {
                        return this.getIndex() > p.selectedIndex
                    },
                    shouldRender: function() {
                        return p.dynamicHeight || this.isActive()
                    },
                    hasFocus: function() {
                        return p.styleTabItemFocus && p.hasFocus && this.getIndex() === p.focusIndex
                    },
                    id: m.nextUid(),
                    hasContent: !(!e.template || !e.template.trim())
                },
                r = be.extend(o, e);
            be.isDefined(t) ? p.tabs.splice(t, 0, r) : p.tabs.push(r);
            return function() {
                    f.forEach(function(e) {
                        m.nextTick(e)
                    }), f = []
                }(),
                function() {
                    var e, t = !1;
                    for (e = 0; e < p.tabs.length; e++)
                        if (p.tabs[e].hasContent) {
                            t = !0;
                            break
                        } p.hasContent = t
                }(), m.nextTick(function() {
                    P(),
                        function(e) {
                            if (e.hasContent) {
                                var t = c[0].querySelectorAll('[md-tab-id="' + e.id + '"]');
                                be.element(t).attr("aria-controls", p.tabContentPrefix + e.id)
                            }
                        }(r), n && p.autoselect && m.nextTick(function() {
                            m.nextTick(function() {
                                k(p.tabs.indexOf(r))
                            })
                        })
                }), r
        }, p.removeTab = function(e) {
            if (b) return;
            var t = p.selectedIndex,
                n = p.tabs.splice(e.getIndex(), 1)[0];
            j(), p.selectedIndex === t && (n.scope.deselect(), p.tabs[p.selectedIndex] && p.tabs[p.selectedIndex].scope.select());
            m.nextTick(function() {
                P(), p.offsetLeft = V(p.offsetLeft)
            })
        }, p.select = k, p.scroll = function(e) {
            if (!p.shouldPaginate) return;
            e.preventDefault(), e.deltaY ? p.offsetLeft = V(p.offsetLeft + e.deltaY) : e.deltaX && (p.offsetLeft = V(p.offsetLeft + e.deltaX))
        }, p.nextPage = function() {
            if (!p.canPageForward()) return;
            var e = d.increasePageOffset(D(), p.offsetLeft);
            p.offsetLeft = V(e)
        }, p.previousPage = function() {
            if (!p.canPageBack()) return;
            var e = d.decreasePageOffset(D(), p.offsetLeft);
            p.offsetLeft = V(e)
        }, p.keydown = function(e) {
            switch (e.keyCode) {
                case n.KEY_CODE.LEFT_ARROW:
                    e.preventDefault(), F(-1, !0);
                    break;
                case n.KEY_CODE.RIGHT_ARROW:
                    e.preventDefault(), F(1, !0);
                    break;
                case n.KEY_CODE.SPACE:
                case n.KEY_CODE.ENTER:
                    e.preventDefault(), h || k(p.focusIndex);
                    break;
                case n.KEY_CODE.TAB:
                    p.focusIndex !== p.selectedIndex && (p.focusIndex = p.selectedIndex)
            }
        }, p.canPageForward = function() {
            var e = D(),
                t = e.tabs[e.tabs.length - 1];
            if (W()) return p.offsetLeft < e.paging.offsetWidth - e.canvas.offsetWidth;
            return t && t.offsetLeft + t.offsetWidth > e.canvas.clientWidth + p.offsetLeft
        }, p.canPageBack = function() {
            return 0 < p.offsetLeft
        }, p.refreshIndex = j, p.incrementIndex = F, p.getTabElementIndex = function(e) {
            var t = c[0].getElementsByTagName("md-tab");
            return Array.prototype.indexOf.call(t, e[0])
        }, p.updateInkBarStyles = m.debounce(q, 100), p.updateTabOrder = m.debounce(function() {
            var e = p.tabs[p.selectedIndex],
                t = p.tabs[p.focusIndex];
            p.tabs = p.tabs.sort(function(e, t) {
                return e.index - t.index
            }), p.selectedIndex = p.tabs.indexOf(e), p.focusIndex = p.tabs.indexOf(t)
        }, 100), p.getFocusedTabId = function() {
            var e = p.tabs[p.focusIndex];
            return e && e.id ? "tab-item-" + e.id : null
        }, 1 === be.version.major && be.version.minor <= 4 && this.$onInit()
    }

    function et(n) {
        return {
            scope: {
                navigationHint: "@?mdNavigationHint",
                selectedIndex: "=?mdSelected"
            },
            template: function(e, t) {
                return t.$mdTabsTemplate = e.html(), '<md-tabs-wrapper> <md-tab-data></md-tab-data> <md-prev-button tabindex="-1" role="button" aria-label="Previous Page" aria-disabled="{{!$mdTabsCtrl.canPageBack()}}" ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageBack() }" ng-if="$mdTabsCtrl.shouldPaginate" ng-click="$mdTabsCtrl.previousPage()"> <md-icon md-svg-src="' + n.mdTabsArrow + '"></md-icon> </md-prev-button> <md-next-button tabindex="-1" role="button" aria-label="Next Page" aria-disabled="{{!$mdTabsCtrl.canPageForward()}}" ng-class="{ \'md-disabled\': !$mdTabsCtrl.canPageForward() }" ng-if="$mdTabsCtrl.shouldPaginate" ng-click="$mdTabsCtrl.nextPage()"> <md-icon md-svg-src="' + n.mdTabsArrow + '"></md-icon> </md-next-button> <md-tabs-canvas tabindex="{{ $mdTabsCtrl.hasFocus ? -1 : 0 }}" ng-focus="$mdTabsCtrl.redirectFocus()" ng-class="{ \'md-paginated\': $mdTabsCtrl.shouldPaginate, \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs }" ng-keydown="$mdTabsCtrl.keydown($event)"> <md-pagination-wrapper ng-class="{ \'md-center-tabs\': $mdTabsCtrl.shouldCenterTabs }" md-tab-scroll="$mdTabsCtrl.scroll($event)" role="tablist" aria-label="{{::$mdTabsCtrl.navigationHint}}"><md-tab-item tabindex="{{ tab.isActive() ? 0 : -1 }}" class="md-tab {{::tab.scope.tabClass}}" ng-repeat="tab in $mdTabsCtrl.tabs" role="tab" id="tab-item-{{::tab.id}}" md-tab-id="{{::tab.id}}" aria-selected="{{tab.isActive()}}" aria-disabled="{{tab.scope.disabled || \'false\'}}" ng-click="$mdTabsCtrl.select(tab.getIndex())" ng-focus="$mdTabsCtrl.hasFocus = true" ng-blur="$mdTabsCtrl.hasFocus = false" ng-class="{ \'md-active\':    tab.isActive(), \'md-focused\':   tab.hasFocus(), \'md-disabled\':  tab.scope.disabled }" ng-disabled="tab.scope.disabled" md-swipe-left="$mdTabsCtrl.nextPage()" md-swipe-right="$mdTabsCtrl.previousPage()" md-tabs-template="::tab.label" md-scope="::tab.parent"></md-tab-item> <md-ink-bar></md-ink-bar> </md-pagination-wrapper> <md-tabs-dummy-wrapper aria-hidden="true" class="md-visually-hidden md-dummy-wrapper"> <md-dummy-tab class="md-tab" tabindex="-1" ng-focus="$mdTabsCtrl.hasFocus = true" ng-blur="$mdTabsCtrl.hasFocus = false" ng-repeat="tab in $mdTabsCtrl.tabs" md-tabs-template="::tab.label" md-scope="::tab.parent"></md-dummy-tab> </md-tabs-dummy-wrapper> </md-tabs-canvas> </md-tabs-wrapper> <md-tabs-content-wrapper ng-show="$mdTabsCtrl.hasContent && $mdTabsCtrl.selectedIndex >= 0" class="_md"> <md-tab-content id="{{:: $mdTabsCtrl.tabContentPrefix + tab.id}}" class="_md" role="tabpanel" aria-labelledby="tab-item-{{::tab.id}}" md-swipe-left="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(1)" md-swipe-right="$mdTabsCtrl.swipeContent && $mdTabsCtrl.incrementIndex(-1)" ng-if="tab.hasContent" ng-repeat="(index, tab) in $mdTabsCtrl.tabs" ng-class="{ \'md-no-transition\': $mdTabsCtrl.lastSelectedIndex == null, \'md-active\':        tab.isActive(), \'md-left\':          tab.isLeft(), \'md-right\':         tab.isRight(), \'md-no-scroll\':     $mdTabsCtrl.dynamicHeight }"> <div md-tabs-template="::tab.template" md-connected-if="tab.isActive()" md-scope="::tab.parent" ng-if="$mdTabsCtrl.enableDisconnect || tab.shouldRender()"></div> </md-tab-content> </md-tabs-content-wrapper>'
            },
            controller: "MdTabsController",
            controllerAs: "$mdTabsCtrl",
            bindToController: !0
        }
    }

    function tt(s, l) {
        return {
            require: "^?mdTabs",
            link: function(e, t, n, o) {
                if (o) {
                    var r, i, a = function() {
                        o.updatePagination(), o.updateInkBarStyles()
                    };
                    if ("MutationObserver" in l) {
                        (r = new MutationObserver(a)).observe(t[0], {
                            childList: !0,
                            subtree: !0,
                            characterData: !0
                        }), i = r.disconnect.bind(r)
                    } else {
                        var d = s.debounce(a, 15, null, !1);
                        t.on("DOMSubtreeModified", d), i = t.off.bind(t, "DOMSubtreeModified", d)
                    }
                    e.$on("$destroy", function() {
                        i()
                    })
                }
            }
        }
    }

    function nt(a, d) {
        return {
            restrict: "A",
            link: function(e, t, n, o) {
                if (!o) return;
                var r = o.enableDisconnect ? e.compileScope.$new() : e.compileScope;
                return t.html(e.template), a(t.contents())(r), d.nextTick(function() {
                    e.$watch("connected", function(e) {
                        !1 === e ? o.enableDisconnect && d.disconnectScope(r) : i()
                    }), e.$on("$destroy", i)
                });

                function i() {
                    o.enableDisconnect && d.reconnectScope(r)
                }
            },
            scope: {
                template: "=mdTabsTemplate",
                connected: "=?mdConnectedIf",
                compileScope: "=mdScope"
            },
            require: "^?mdTabs"
        }
    }

    function ot(n) {
        return {
            restrict: "E",
            link: function(e, t) {
                t.addClass("_md"), e.$on("$destroy", function() {
                    n.destroy()
                })
            }
        }
    }

    function rt(e) {
        n.$inject = ["$mdToast", "$scope", "$log"], t.$inject = ["$animate", "$mdToast", "$mdUtil", "$mdMedia", "$document", "$q"];
        var u, p = "ok";
        return e("$mdToast").setDefaults({
            methods: ["position", "hideDelay", "capsule", "parent", "position", "toastClass"],
            options: t
        }).addPreset("simple", {
            argOption: "textContent",
            methods: ["textContent", "action", "actionKey", "actionHint", "highlightAction", "highlightClass", "theme", "parent", "dismissHint"],
            options: ["$mdToast", "$mdTheming", function(e, t) {
                return {
                    template: '<md-toast md-theme="{{ toast.theme }}" ng-class="{\'md-capsule\': toast.capsule}">  <div class="md-toast-content" aria-live="polite" aria-relevant="all">    <span class="md-toast-text">      {{ toast.content }}    </span>    <span class="md-visually-hidden">{{ toast.dismissHint }}</span>    <span class="md-visually-hidden" ng-if="toast.action && toast.actionKey">      {{ toast.actionHint }}    </span>    <md-button class="md-action" ng-if="toast.action" ng-click="toast.resolve()"                ng-class="highlightClasses">      {{ toast.action }}    </md-button>  </div></md-toast>',
                    controller: n,
                    theme: t.defaultTheme(),
                    controllerAs: "toast",
                    bindToController: !0
                }
            }]
        }).addMethod("updateTextContent", function(e) {
            u = e
        });

        function n(t, n, o) {
            this.$onInit = function() {
                var e = this;
                e.highlightAction && (n.highlightClasses = ["md-highlight", e.highlightClass]), e.action && !e.actionKey && o.warn("Toasts with actions should define an actionKey for accessibility.", "Details: https://material.angularjs.org/latest/api/service/$mdToast#mdtoast-simple"), e.actionKey && !e.actionHint && (e.actionHint = 'Press Control-"' + e.actionKey + '" to '), e.dismissHint || (e.dismissHint = "Press Escape to dismiss."), n.$watch(function() {
                    return u
                }, function() {
                    e.content = u
                }), this.resolve = function() {
                    t.hide(p)
                }
            }
        }

        function t(a, d, s, l, c, o) {
            var m = "$md.swipeleft $md.swiperight $md.swipeup $md.swipedown";
            return {
                onShow: function(e, o, r) {
                    u = r.textContent;
                    var i = !l("gt-sm");
                    o = s.extractElementByName(o, "md-toast", !0), r.element = o, r.onSwipe = function(e) {
                        var t = e.type.replace("$md.", ""),
                            n = t.replace("swipe", "");
                        "down" === n && -1 !== r.position.indexOf("top") && !i || "up" === n && (-1 !== r.position.indexOf("bottom") || i) || ("left" === n || "right" === n) && i || (o.addClass("md-" + t), s.nextTick(d.cancel))
                    }, r.openClass = function(e) {
                        return l("gt-xs") ? "md-toast-open-" + (-1 < e.indexOf("top") ? "top" : "bottom") : "md-toast-open-bottom"
                    }(r.position), o.addClass(r.toastClass), r.parent.addClass(r.openClass), s.hasComputedStyle(r.parent, "position", "static") && r.parent.css("position", "relative");
                    (function(t) {
                        c.on("keydown", function(e) {
                            "Escape" === e.key && d.hide(!1), t && e.key === t && e.ctrlKey && d.hide(p)
                        })
                    })(e.toast && e.toast.actionKey ? e.toast.actionKey : ge), o.on(m, r.onSwipe);
                    var n = !1,
                        t = r.position.split(" ").map(function(e) {
                            if (e) {
                                var t = "md-" + e;
                                return "md-top" != t && "md-bottom" != t || (n = !0), t
                            }
                            return "md-bottom"
                        });
                    n || t.push("md-bottom");
                    o.addClass(i ? "md-bottom" : t.join(" ")), r.parent && r.parent.addClass("md-toast-animating");
                    return a.enter(o, r.parent).then(function() {
                        r.parent && r.parent.removeClass("md-toast-animating")
                    })
                },
                onRemove: function(e, t, n) {
                    e.toast && e.toast.actionKey && c.off("keydown");
                    t.off(m, n.onSwipe), n.parent && n.parent.addClass("md-toast-animating");
                    n.openClass && n.parent.removeClass(n.openClass);
                    return (!0 === n.$destroy ? o.when(t.remove()) : a.leave(t)).then(function() {
                        n.parent && n.parent.removeClass("md-toast-animating"), s.hasComputedStyle(n.parent, "position", "static") && n.parent.css("position", "")
                    })
                },
                toastClass: "",
                position: "bottom left",
                themable: !0,
                hideDelay: 3e3,
                autoWrap: !0,
                transformTemplate: function(e, t) {
                    if (t.autoWrap && e && !/md-toast-content/g.test(e)) {
                        var n = document.createElement("md-template");
                        n.innerHTML = e;
                        for (var o = 0; o < n.children.length; o++)
                            if ("MD-TOAST" === n.children[o].nodeName) {
                                var r = be.element('<div class="md-toast-content">');
                                r.append(be.element(n.children[o].childNodes)), n.children[o].appendChild(r[0])
                            } return n.innerHTML
                    }
                    return e || ""
                }
            }
        }
    }

    function it(f, b, g, e, E, v) {
        var $ = be.bind(null, g.supplant, "translate3d(0,{0}px,0)");
        return {
            template: "",
            restrict: "E",
            link: function(u, p, h) {
                p.addClass("_md"), e(p), g.nextTick(function() {
                    p.addClass("_md-toolbar-transitions")
                }, !1), be.isDefined(h.mdScrollShrink) && function() {
                    var n, o, r = be.noop,
                        i = 0,
                        a = 0,
                        d = h.mdShrinkSpeedFactor || .5,
                        s = f.throttle(t),
                        l = g.debounce(e, 5e3);
                    u.$on("$mdContentLoaded", c), h.$observe("mdScrollShrink", function(e) {
                        var t = g.getSiblings(p, "md-content");
                        !o && t.length && c(null, t[0]);
                        !1 === (e = u.$eval(e)) ? r() : r = m()
                    }), h.ngShow && u.$watch(h.ngShow, e);
                    h.ngHide && u.$watch(h.ngHide, e);

                    function c(e, t) {
                        t && p.parent()[0] === t.parent()[0] && (o && o.off("scroll", s), o = t, r = m())
                    }

                    function t(e) {
                        var t = e ? e.target.scrollTop : a;
                        l(), i = Math.min(n / d, Math.max(0, i + t - a)), p.css(b.CSS.TRANSFORM, $([-i * d])), o.css(b.CSS.TRANSFORM, $([(n - i) * d])), a = t, g.nextTick(function() {
                            var e = p.hasClass("md-whiteframe-z1");
                            e && !i ? E.removeClass(p, "md-whiteframe-z1") : !e && i && E.addClass(p, "md-whiteframe-z1")
                        })
                    }

                    function m() {
                        return o ? (o.on("scroll", s), o.attr("scroll-shrink", "true"), v(e), function() {
                            o.off("scroll", s), o.attr("scroll-shrink", "false"), e()
                        }) : be.noop
                    }

                    function e() {
                        var e = -(n = p.prop("offsetHeight")) * d + "px";
                        o.css({
                            "margin-top": e,
                            "margin-bottom": e
                        }), t()
                    }
                    u.$on("$destroy", r)
                }()
            }
        }
    }

    function at(E, v, $, M, y, C, T, A) {
        var w = "focus touchstart mouseenter",
            _ = "blur touchcancel mouseleave",
            k = {
                top: {
                    x: T.xPosition.CENTER,
                    y: T.yPosition.ABOVE
                },
                right: {
                    x: T.xPosition.OFFSET_END,
                    y: T.yPosition.CENTER
                },
                bottom: {
                    x: T.xPosition.CENTER,
                    y: T.yPosition.BELOW
                },
                left: {
                    x: T.xPosition.OFFSET_START,
                    y: T.yPosition.CENTER
                }
            };
        return {
            restrict: "E",
            priority: 210,
            scope: {
                mdZIndex: "=?mdZIndex",
                mdDelay: "=?mdDelay",
                mdVisible: "=?mdVisible",
                mdAutohide: "=?mdAutohide",
                mdDirection: "@?mdDirection"
            },
            link: function(a, o, d) {
                var r, e, i, s, l, c = "md-tooltip-" + C.nextUid(),
                    m = C.getParentWithPointerEvents(o),
                    u = $.throttle(f),
                    p = !1,
                    h = null;

                function t() {
                    a.mdZIndex = a.mdZIndex || 100, a.mdDelay = a.mdDelay || 0, k[a.mdDirection] || (a.mdDirection = "bottom")
                }

                function n(e) {
                    var t = e || y(o.text().trim())(a.$parent);
                    (m.attr("aria-label") || m.attr("aria-labelledby")) && !m.attr("md-labeled-by-tooltip") || (m.attr("aria-label", t), m.attr("md-labeled-by-tooltip") || m.attr("md-labeled-by-tooltip", c))
                }

                function f() {
                    t(), s && s.panelEl && s.panelEl.removeClass(r), r = "md-origin-" + a.mdDirection, e = k[a.mdDirection], i = T.newPanelPosition().relativeTo(m).addPanelPosition(e.x, e.y), s && s.panelEl && (s.panelEl.addClass(r), s.updatePosition(i))
                }

                function b(e) {
                    b.queued && b.value === !!e || !b.queued && a.mdVisible === !!e || (b.value = !!e, b.queued || (e ? (b.queued = !0, l = E(function() {
                        a.mdVisible = b.value, b.queued = !1, l = null, a.visibleWatcher || g(a.mdVisible)
                    }, a.mdDelay)) : C.nextTick(function() {
                        a.mdVisible = !1, a.visibleWatcher || g(!1)
                    })))
                }

                function g(e) {
                    e ? function() {
                        if (!o[0].textContent.trim()) throw new Error("Text for the tooltip has not been provided. Please include text within the mdTooltip element.");
                        if (!s) {
                            var e = be.element(document.body),
                                t = T.newPanelAnimation().openFrom(m).closeTo(m).withAnimation({
                                    open: "md-show",
                                    close: "md-hide"
                                }),
                                n = {
                                    id: c,
                                    attachTo: e,
                                    contentElement: o,
                                    propagateContainerEvents: !0,
                                    panelClass: "md-tooltip",
                                    animation: t,
                                    position: i,
                                    zIndex: a.mdZIndex,
                                    focusOnOpen: !1,
                                    onDomAdded: function() {
                                        s.panelEl.addClass(r)
                                    }
                                };
                            s = T.create(n)
                        }
                        s.open().then(function() {
                            s.panelEl.attr("role", "tooltip")
                        })
                    }() : s && s.close()
                }
                t(), n(), o.detach(), f(),
                    function() {
                        if (m[0] && "MutationObserver" in v) {
                            var e = new MutationObserver(function(e) {
                                ! function(e) {
                                    return e.some(function(e) {
                                        return "disabled" === e.attributeName && m[0].disabled
                                    }), !1
                                }(e) || C.nextTick(function() {
                                    b(!1)
                                })
                            });
                            e.observe(m[0], {
                                attributes: !0
                            })
                        }

                        function t() {
                            b(!1)
                        }

                        function n() {
                            h = document.activeElement === m[0]
                        }

                        function o(e) {
                            "focus" === e.type && h ? h = !1 : a.mdVisible || (m.on(_, r), b(!0), "touchstart" === e.type && m.one("touchend", function() {
                                C.nextTick(function() {
                                    M.one("touchend", r)
                                }, !1)
                            }))
                        }

                        function r() {
                            ((a.hasOwnProperty("mdAutohide") ? a.mdAutohide : d.hasOwnProperty("mdAutohide")) || p || M[0].activeElement !== m[0]) && (l && (E.cancel(l), b.queued = !1, l = null), m.off(_, r), m.triggerHandler("blur"), b(!1)), p = !1
                        }

                        function i() {
                            p = !0
                        }
                        h = !1, A.register("scroll", t, !0), A.register("blur", n), A.register("resize", u), a.$on("$destroy", function() {
                            A.deregister("scroll", t, !0), A.deregister("blur", n), A.deregister("resize", u), m.off(w, o).off(_, r).off("mousedown", i), r(), e && e.disconnect()
                        }), m.on("mousedown", i), m.on(w, o)
                    }(),
                    function() {
                        if (o[0] && "MutationObserver" in v) {
                            var e = new MutationObserver(function(e) {
                                e.forEach(function(e) {
                                    "md-visible" !== e.attributeName || a.visibleWatcher || (a.visibleWatcher = a.$watch("mdVisible", g))
                                })
                            });
                            e.observe(o[0], {
                                attributes: !0
                            }), d.hasOwnProperty("mdVisible") && (a.visibleWatcher = a.$watch("mdVisible", g))
                        } else a.visibleWatcher = a.$watch("mdVisible", g);

                        function t() {
                            a.$destroy()
                        }
                        a.$watch("mdDirection", f), o.one("$destroy", t), m.one("$destroy", t), a.$on("$destroy", function() {
                            b(!1), s && s.destroy(), e && e.disconnect(), o.remove()
                        }), -1 < o.text().indexOf(y.startSymbol()) && a.$watch(function() {
                            return o.text().trim()
                        }, n)
                    }()
            }
        }
    }

    function dt(e) {
        e.addClass("md-truncate")
    }

    function st(i) {
        return {
            link: function(e, n, o) {
                var r = "";
                o.$observe("mdWhiteframe", function(e) {
                    -1 != (e = parseInt(e, 10) || 4) && (24 < e || e < 1) && (i.warn("md-whiteframe attribute value is invalid. It should be a number between 1 and 24", n[0]), e = 4);
                    var t = -1 == e ? "" : "md-whiteframe-" + e + "dp";
                    o.$updateClass(t, r), r = t
                })
            }
        }
    }
    be.module("ngMaterial", ["ng", "ngAnimate", "ngAria", "material.core", "material.core.animate", "material.core.gestures", "material.core.interaction", "material.core.layout", "material.core.meta", "material.core.theming.palette", "material.core.theming", "material.components.autocomplete", "material.components.backdrop", "material.components.bottomSheet", "material.components.button", "material.components.card", "material.components.checkbox", "material.components.chips", "material.components.colors", "material.components.content", "material.components.datepicker", "material.components.dialog", "material.components.divider", "material.components.fabActions", "material.components.fabShared", "material.components.fabSpeedDial", "material.components.fabToolbar", "material.components.gridList", "material.components.icon", "material.components.input", "material.components.list", "material.components.menu", "material.components.menuBar", "material.components.navBar", "material.components.panel", "material.components.progressCircular", "material.components.progressLinear", "material.components.radioButton", "material.components.select", "material.components.showHide", "material.components.sidenav", "material.components.slider", "material.components.sticky", "material.components.subheader", "material.components.swipe", "material.components.switch", "material.components.tabs", "material.components.toast", "material.components.toolbar", "material.components.tooltip", "material.components.truncate", "material.components.virtualRepeat", "material.components.whiteframe"]), e.$inject = ["$log", "$injector"], t.$inject = ["$provide", "$mdThemingProvider"], n.$inject = ["$delegate"], o.$inject = ["$delegate"], be.module("material.core", ["ngAnimate", "material.core.animate", "material.core.layout", "material.core.interaction", "material.core.gestures", "material.core.theming"]).config(t).run(e), r.$inject = ["$parse"], be.module("material.core").directive("mdAutofocus", r), be.module("material.core").factory("$mdColorUtil", function() {
            return {
                rgbaToHex: function(e) {
                    return ((e = e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) && 4 === e.length ? "#" + ("0" + parseInt(e[1], 10).toString(16)).slice(-2) + ("0" + parseInt(e[2], 10).toString(16)).slice(-2) + ("0" + parseInt(e[3], 10).toString(16)).slice(-2) : "").toUpperCase()
                },
                hexToRgba: function(e) {
                    var t = "#" === e[0] ? e.substr(1) : e,
                        n = t.length / 3,
                        o = t.substr(0, n),
                        r = t.substr(n, n),
                        i = t.substr(2 * n);
                    return 1 == n && (o += o, r += r, i += i), "rgba(" + parseInt(o, 16) + "," + parseInt(r, 16) + "," + parseInt(i, 16) + ",0.1)"
                },
                rgbToRgba: function(e) {
                    return e.replace(")", ", 0.1)").replace("(", "a(")
                },
                rgbaToRgb: function(e) {
                    return e ? e.replace("rgba", "rgb").replace(/,[^),]+\)/, ")") : "rgb(0,0,0)"
                }
            }
        }), be.module("material.core").factory("$mdConstant", function() {
            var o = document.createElement("div"),
                r = function(e) {
                    var t, n, o = /^(Moz|webkit|ms)(?=[A-Z])/;
                    for (t in e.style)
                        if (n = o.exec(t)) return n[0]
                }(o),
                e = /webkit/i.test(r),
                i = /([:\-_]+(.))/g;

            function t(e) {
                var t = function(e) {
                        return e.replace(i, function(e, t, n, o) {
                            return o ? n.toUpperCase() : n
                        })
                    }(r + "-" + e),
                    n = t.charAt(0).toLowerCase() + t.substring(1);
                return a(o, e) ? e : a(o, t) ? t : a(o, n) ? n : e
            }

            function a(e, t) {
                return be.isDefined(e.style[t])
            }
            var n = {
                isInputKey: function(e) {
                    return 31 <= e.keyCode && e.keyCode <= 90
                },
                isNumPadKey: function(e) {
                    return 3 === e.location && 97 <= e.keyCode && e.keyCode <= 105
                },
                isMetaKey: function(e) {
                    return 91 <= e.keyCode && e.keyCode <= 93
                },
                isFnLockKey: function(e) {
                    return 112 <= e.keyCode && e.keyCode <= 145
                },
                isNavigationKey: function(e) {
                    var t = n.KEY_CODE;
                    return -1 != [t.SPACE, t.ENTER, t.UP_ARROW, t.DOWN_ARROW].indexOf(e.keyCode)
                },
                hasModifierKey: function(e) {
                    return e.ctrlKey || e.metaKey || e.altKey
                },
                ELEMENT_MAX_PIXELS: 1533917,
                BEFORE_NG_ARIA: 210,
                KEY_CODE: {
                    COMMA: 188,
                    SEMICOLON: 186,
                    ENTER: 13,
                    ESCAPE: 27,
                    SPACE: 32,
                    PAGE_UP: 33,
                    PAGE_DOWN: 34,
                    END: 35,
                    HOME: 36,
                    LEFT_ARROW: 37,
                    UP_ARROW: 38,
                    RIGHT_ARROW: 39,
                    DOWN_ARROW: 40,
                    TAB: 9,
                    BACKSPACE: 8,
                    DELETE: 46
                },
                CSS: {
                    TRANSITIONEND: "transitionend" + (e ? " webkitTransitionEnd" : ""),
                    ANIMATIONEND: "animationend" + (e ? " webkitAnimationEnd" : ""),
                    TRANSFORM: t("transform"),
                    TRANSFORM_ORIGIN: t("transformOrigin"),
                    TRANSITION: t("transition"),
                    TRANSITION_DURATION: t("transitionDuration"),
                    ANIMATION_PLAY_STATE: t("animationPlayState"),
                    ANIMATION_DURATION: t("animationDuration"),
                    ANIMATION_NAME: t("animationName"),
                    ANIMATION_TIMING: t("animationTimingFunction"),
                    ANIMATION_DIRECTION: t("animationDirection")
                },
                MEDIA: {
                    xs: "(max-width: 599px)",
                    "gt-xs": "(min-width: 600px)",
                    sm: "(min-width: 600px) and (max-width: 959px)",
                    "gt-sm": "(min-width: 960px)",
                    md: "(min-width: 960px) and (max-width: 1279px)",
                    "gt-md": "(min-width: 1280px)",
                    lg: "(min-width: 1280px) and (max-width: 1919px)",
                    "gt-lg": "(min-width: 1920px)",
                    xl: "(min-width: 1920px)",
                    landscape: "(orientation: landscape)",
                    portrait: "(orientation: portrait)",
                    print: "print"
                },
                MEDIA_PRIORITY: ["xl", "gt-lg", "lg", "gt-md", "md", "gt-sm", "sm", "gt-xs", "xs", "landscape", "portrait", "print"]
            };
            return n
        }), be.module("material.core").config(["$provide", function(e) {
            e.decorator("$mdUtil", ["$delegate", function(e) {
                return e.iterator = i, e
            }])
        }]), a.$inject = ["$mdConstant", "$rootScope", "$window"], be.module("material.core").factory("$mdMedia", a), be.module("material.core").config(["$provide", function(e) {
            e.decorator("$mdUtil", ["$delegate", function(e) {
                return e.prefixer = d, e
            }])
        }]),
        function() {
            t.$inject = ["$document", "$timeout", "$compile", "$rootScope", "$$mdAnimate", "$interpolate", "$log", "$rootElement", "$window", "$$rAF"];
            var g, E, v, $ = 0;
            if (L.navigator) {
                var e = L.navigator.userAgent || L.navigator.vendor || L.opera;
                g = e.match(/ipad|iphone|ipod/i), E = e.match(/android/i), v = e.match(/(firefox|minefield)/i)
            }

            function t(s, d, n, a, e, t, i, o, l, m) {
                var r = t.startSymbol(),
                    c = t.endSymbol(),
                    u = "{{" === r && "}}" === c;
                document.contains || (document.contains = function(e) {
                    return document.body.contains(e)
                });

                function p(e, t, n) {
                    var o = !1;
                    if (e && e.length) {
                        var r = l.getComputedStyle(e[0]);
                        o = be.isDefined(r[t]) && (!n || r[t] == n)
                    }
                    return o
                }

                function h(e) {
                    return e ? function(e) {
                        return -1 < String(e).indexOf("px")
                    }(e) || function(e) {
                        return -1 < String(e).indexOf("%")
                    }(e) ? e : e + "px" : "0"
                }
                var f = {
                    dom: {},
                    isIos: g,
                    isAndroid: E,
                    now: L.performance && L.performance.now ? be.bind(L.performance, L.performance.now) : Date.now || function() {
                        return (new Date).getTime()
                    },
                    getModelOption: function(e, t) {
                        if (e.$options) {
                            var n = e.$options;
                            return n.getOption ? n.getOption(t) : n[t]
                        }
                    },
                    isRtl: function(e) {
                        switch (be.isDefined(e) && e.hasOwnProperty("dir") && e.dir) {
                            case "ltr":
                                return !1;
                            case "rtl":
                                return !0
                        }
                        return "rtl" === s[0].dir || "rtl" === s[0].body.dir
                    },
                    bidi: function(e, t, n, o) {
                        var r = !this.isRtl();
                        if (0 == arguments.length) return r ? "ltr" : "rtl";
                        var i = be.element(e);
                        r && be.isDefined(n) ? i.css(t, h(n)) : !r && be.isDefined(o) && i.css(t, h(o))
                    },
                    bidiProperty: function(e, t, n, o) {
                        var r = !this.isRtl(),
                            i = be.element(e);
                        r && be.isDefined(t) ? (i.css(t, h(o)), i.css(n, "")) : !r && be.isDefined(n) && (i.css(n, h(o)), i.css(t, ""))
                    },
                    clientRect: function(e, t, n) {
                        var o = b(e);
                        t = b(t || o.offsetParent || document.body);
                        var r = o.getBoundingClientRect(),
                            i = n ? t.getBoundingClientRect() : {
                                left: 0,
                                top: 0,
                                width: 0,
                                height: 0
                            };
                        return {
                            left: r.left - i.left,
                            top: r.top - i.top,
                            width: r.width,
                            height: r.height
                        }
                    },
                    offsetRect: function(e, t) {
                        return f.clientRect(e, t, !0)
                    },
                    nodesToArray: function(e) {
                        var t, n = [];
                        for (e = e || [], t = 0; t < e.length; ++t) n.push(e.item(t));
                        return n
                    },
                    getViewportTop: function() {
                        return f.disableScrollAround._count && f.disableScrollAround._viewPortTop ? f.disableScrollAround._viewPortTop : l.scrollY || l.pageYOffset || 0
                    },
                    findFocusTarget: function(e, t) {
                        var n = this.prefixer("md-autofocus", !0);
                        return o(e, t || n) || o(e, n);

                        function o(e, t) {
                            var n, o = e[0].querySelectorAll(t);
                            return o && o.length && o.length && be.forEach(o, function(e) {
                                (e = be.element(e)).hasClass("md-autofocus") && (n = e)
                            }), n
                        }
                    },
                    disableScrollAround: function(e, t, n) {
                        if (n = n || {}, f.disableScrollAround._count = Math.max(0, f.disableScrollAround._count || 0), f.disableScrollAround._count++, f.disableScrollAround._restoreScroll) return f.disableScrollAround._restoreScroll;
                        var d = s[0].body,
                            o = function() {
                                var e = s[0].documentElement,
                                    t = e.style.cssText || "",
                                    n = d.style.cssText || "",
                                    o = f.getViewportTop();
                                f.disableScrollAround._viewPortTop = o;
                                var r = d.clientWidth,
                                    i = d.scrollHeight > d.clientHeight + 1,
                                    a = 0 < e.scrollTop ? e : d;
                                i && be.element(d).css({
                                    position: "fixed",
                                    width: "100%",
                                    top: -o + "px"
                                });
                                d.clientWidth < r && (d.style.overflow = "hidden");
                                return function() {
                                    d.style.cssText = n, e.style.cssText = t, a.scrollTop = o
                                }
                            }(),
                            r = function(e, t) {
                                var n, o = be.element(e || d);
                                t.disableScrollMask ? n = o : (n = be.element('<div class="md-scroll-mask">  <div class="md-scroll-mask-bar"></div></div>'), o.append(n));

                                function r(e) {
                                    e.preventDefault()
                                }
                                return n.on("wheel touchmove", r),
                                    function() {
                                        n.off("wheel touchmove", r), !t.disableScrollMask && n[0].parentNode && n[0].parentNode.removeChild(n[0])
                                    }
                            }(t, n);
                        return f.disableScrollAround._restoreScroll = function() {
                            --f.disableScrollAround._count <= 0 && (delete f.disableScrollAround._viewPortTop, o(), r(), delete f.disableScrollAround._restoreScroll)
                        }
                    },
                    enableScrolling: function() {
                        var e = this.disableScrollAround._restoreScroll;
                        e && e()
                    },
                    floatingScrollbars: function() {
                        if (this.floatingScrollbars.cached === ge) {
                            var e = be.element("<div><div></div></div>").css({
                                width: "100%",
                                "z-index": -1,
                                position: "absolute",
                                height: "35px",
                                "overflow-y": "scroll"
                            });
                            e.children().css("height", "60px"), s[0].body.appendChild(e[0]), this.floatingScrollbars.cached = e[0].offsetWidth === e[0].childNodes[0].offsetWidth, e.remove()
                        }
                        return this.floatingScrollbars.cached
                    },
                    forceFocus: function(e) {
                        var n = e[0] || e;
                        document.addEventListener("click", function e(t) {
                            t.target === n && t.$focus && (n.focus(), t.stopImmediatePropagation(), t.preventDefault(), n.removeEventListener("click", e))
                        }, !0);
                        var t = document.createEvent("MouseEvents");
                        t.initMouseEvent("click", !1, !0, L, {}, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), t.$material = !0, t.$focus = !0, n.dispatchEvent(t)
                    },
                    createBackdrop: function(e, t) {
                        return n(f.supplant('<md-backdrop class="{0}">', [t]))(e)
                    },
                    supplant: function(e, i, t) {
                        return t = t || /\{([^{}]*)\}/g, e.replace(t, function(t, e) {
                            var n = e.split("."),
                                o = i;
                            try {
                                for (var r in n) n.hasOwnProperty(r) && (o = o[n[r]])
                            } catch (e) {
                                o = t
                            }
                            return "string" == typeof o || "number" == typeof o ? o : t
                        })
                    },
                    fakeNgModel: function() {
                        return {
                            $fake: !0,
                            $setTouched: be.noop,
                            $setViewValue: function(e) {
                                this.$viewValue = e, this.$render(e), this.$viewChangeListeners.forEach(function(e) {
                                    e()
                                })
                            },
                            $isEmpty: function(e) {
                                return 0 === ("" + e).length
                            },
                            $parsers: [],
                            $formatters: [],
                            $viewChangeListeners: [],
                            $render: be.noop
                        }
                    },
                    debounce: function(n, o, r, i) {
                        var a;
                        return function() {
                            var e = r,
                                t = Array.prototype.slice.call(arguments);
                            d.cancel(a), a = d(function() {
                                a = ge, n.apply(e, t)
                            }, o || 10, i)
                        }
                    },
                    throttle: function(n, o) {
                        var r;
                        return function() {
                            var e = arguments,
                                t = f.now();
                            (!r || o < t - r) && (n.apply(this, e), r = t)
                        }
                    },
                    time: function(e) {
                        var t = f.now();
                        return e(), f.now() - t
                    },
                    valueOnUse: function(e, t, n) {
                        var o = null,
                            r = Array.prototype.slice.call(arguments),
                            i = 3 < r.length ? r.slice(3) : [];
                        Object.defineProperty(e, t, {
                            get: function() {
                                return null === o && (o = n.apply(e, i)), o
                            }
                        })
                    },
                    nextUid: function() {
                        return "" + $++
                    },
                    disconnectScope: function(e) {
                        if (e && e.$root !== e && !e.$$destroyed) {
                            var t = e.$parent;
                            e.$$disconnected = !0, t.$$childHead === e && (t.$$childHead = e.$$nextSibling), t.$$childTail === e && (t.$$childTail = e.$$prevSibling), e.$$prevSibling && (e.$$prevSibling.$$nextSibling = e.$$nextSibling), e.$$nextSibling && (e.$$nextSibling.$$prevSibling = e.$$prevSibling), e.$$nextSibling = e.$$prevSibling = null
                        }
                    },
                    reconnectScope: function(e) {
                        if (e && e.$root !== e && e.$$disconnected) {
                            var t = e,
                                n = t.$parent;
                            t.$$disconnected = !1, t.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = t, n.$$childTail = t) : n.$$childHead = n.$$childTail = t
                        }
                    },
                    getSiblings: function(t, e) {
                        var n = e.toUpperCase();
                        return t instanceof be.element && (t = t[0]), Array.prototype.filter.call(t.parentNode.children, function(e) {
                            return t !== e && e.tagName.toUpperCase() === n
                        }).map(function(e) {
                            return be.element(e)
                        })
                    },
                    getClosest: function(e, t, n) {
                        if (be.isString(t)) {
                            var o = t.toUpperCase();
                            t = function(e) {
                                return e.nodeName.toUpperCase() === o
                            }
                        }
                        if (e instanceof be.element && (e = e[0]), n && (e = e.parentNode), !e) return null;
                        do {
                            if (t(e)) return e
                        } while (e = e.parentNode);
                        return null
                    },
                    elementContains: function(t, n) {
                        return (L.Node && L.Node.prototype && Node.prototype.contains ? be.bind(t, t.contains) : be.bind(t, function(e) {
                            return t === n || !!(16 & this.compareDocumentPosition(e))
                        }))(n)
                    },
                    extractElementByName: function(e, o, t, n) {
                        var r = d(e);
                        return !r && n && i.warn(f.supplant("Unable to find node '{0}' in element '{1}'.", [o, e[0].outerHTML])), be.element(r || e);

                        function d(e) {
                            return function(e) {
                                if (e)
                                    for (var t = 0, n = e.length; t < n; t++)
                                        if (e[t].nodeName.toLowerCase() === o) return e[t];
                                return null
                            }(e) || (t ? function(e) {
                                var t;
                                if (e)
                                    for (var n = 0, o = e.length; n < o; n++) {
                                        var r = e[n];
                                        if (!t)
                                            for (var i = 0, a = r.childNodes.length; i < a; i++) t = t || d([r.childNodes[i]])
                                    }
                                return t
                            }(e) : null)
                        }
                    },
                    initOptionalProperties: function(o, r, i) {
                        i = i || {}, be.forEach(o.$$isolateBindings, function(e, t) {
                            if (e.optional && be.isUndefined(o[t])) {
                                var n = be.isDefined(r[e.attrName]);
                                o[t] = be.isDefined(i[t]) ? i[t] : n
                            }
                        })
                    },
                    nextTick: function(e, t, n) {
                        var o = f.nextTick,
                            r = o.timeout,
                            i = o.queue || [];
                        return i.push({
                            scope: n,
                            callback: e
                        }), null == t && (t = !0), o.digest = o.digest || t, o.queue = i, r || (o.timeout = d(function() {
                            var e = o.queue,
                                t = o.digest;
                            o.queue = [], o.timeout = null, o.digest = !1, e.forEach(function(e) {
                                e.scope && e.scope.$$destroyed || e.callback()
                            }), t && a.$digest()
                        }, 0, !1))
                    },
                    processTemplate: function(e) {
                        return u ? e : e && be.isString(e) ? e.replace(/\{\{/g, r).replace(/}}/g, c) : e
                    },
                    getParentWithPointerEvents: function(e) {
                        for (var t = e.parent(); p(t, "pointer-events", "none");) t = t.parent();
                        return t
                    },
                    getNearestContentElement: function(e) {
                        for (var t = e.parent()[0]; t && t !== o[0] && t !== document.body && "MD-CONTENT" !== t.nodeName.toUpperCase();) t = t.parentNode;
                        return t
                    },
                    checkStickySupport: function() {
                        var e, t = be.element("<div>");
                        s[0].body.appendChild(t[0]);
                        for (var n = ["sticky", "-webkit-sticky"], o = 0; o < n.length; ++o)
                            if (t.css({
                                    position: n[o],
                                    top: 0,
                                    "z-index": 2
                                }), t.css("position") == n[o]) {
                                e = n[o];
                                break
                            } return t.remove(), e
                    },
                    parseAttributeBoolean: function(e, t) {
                        return "" === e || !!e && (!1 === t || "false" !== e && "0" !== e)
                    },
                    hasComputedStyle: p,
                    isParentFormSubmitted: function(e) {
                        var t = f.getClosest(e, "form"),
                            n = t ? be.element(t).controller("form") : null;
                        return !!n && n.$submitted
                    },
                    animateScrollTo: function(r, i, a) {
                        var d = r.scrollTop,
                            s = i - d,
                            l = d < i,
                            c = f.now();
                        m(function e() {
                            var t = (n = a || 1e3, o = f.now() - c, function(e, t, n, o) {
                                if (o < e) return t + n;
                                var r = (e /= o) * e;
                                return t + n * (r * e * -2 + 3 * r)
                            }(o, d, s, n));
                            var n, o;
                            r.scrollTop = t;
                            (l ? t < i : i < t) && m(e)
                        })
                    },
                    uniq: function(e) {
                        if (e) return e.filter(function(e, t, n) {
                            return n.indexOf(e) === t
                        })
                    },
                    getInnerHTML: function(e) {
                        var t = new XMLSerializer;
                        return Array.prototype.map.call(e.childNodes, function(e) {
                            return t.serializeToString(e)
                        }).join("")
                    },
                    getOuterHTML: function(e) {
                        return (new XMLSerializer).serializeToString(e)
                    },
                    msie: L.document.documentMode,
                    getTouchAction: function() {
                        for (var e = document.createElement("div"), t = ["", "webkit", "Moz", "MS", "ms", "o"], n = 0; n < t.length; n++) {
                            var o = t[n],
                                r = o ? o + "TouchAction" : "touchAction";
                            if (be.isDefined(e.style[r])) return r
                        }
                    },
                    getEventPath: function(e) {
                        for (var t = [], n = e.target; n;) t.push(n), n = n.parentElement;
                        return -1 === t.indexOf(L) && -1 === t.indexOf(document) && t.push(document), -1 === t.indexOf(L) && t.push(L), t
                    },
                    sanitize: function(e) {
                        return e ? e.replace(/[\\^$*+?.()|{}[]/g, "\\$&") : e
                    },
                    isDisabled: function(e) {
                        return e.hasAttribute("disabled")
                    },
                    isVisible: function(e) {
                        return f.hasGeometry(e) && "visible" === getComputedStyle(e).visibility
                    },
                    isTabbable: function(e) {
                        var t = f.getFrameElement(f.getWindow(e));
                        if (t) {
                            if (-1 === f.getTabIndexValue(t)) return !1;
                            if (!f.isVisible(t)) return !1
                        }
                        var n = e.nodeName.toLowerCase(),
                            o = f.getTabIndexValue(e);
                        return e.hasAttribute("contenteditable") ? -1 !== o : "iframe" !== n && "object" !== n && (!(g && !f.isPotentiallyTabbableIOS(e)) && ("audio" === n ? !!e.hasAttribute("controls") && -1 !== o : "video" === n ? -1 !== o && (null !== o || (v || e.hasAttribute("controls"))) : 0 <= e.tabIndex))
                    },
                    isFocusable: function(e) {
                        return f.isPotentiallyFocusable(e) && !f.isDisabled(e) && f.isVisible(e)
                    },
                    isPotentiallyFocusable: function(e) {
                        return !f.isHiddenInput(e) && (f.isNativeFormElement(e) || f.isAnchorWithHref(e) || e.hasAttribute("contenteditable") || f.hasValidTabIndex(e))
                    },
                    isPotentiallyTabbableIOS: function(e) {
                        var t = e.nodeName.toLowerCase(),
                            n = "input" === t && e.type;
                        return "text" === n || "password" === n || "select" === t || "textarea" === t
                    },
                    getTabIndexValue: function(e) {
                        if (!f.hasValidTabIndex(e)) return null;
                        var t = parseInt(e.getAttribute("tabindex") || "", 10);
                        return isNaN(t) ? -1 : t
                    },
                    hasValidTabIndex: function(e) {
                        if (!e.hasAttribute("tabindex") || e.tabIndex === ge) return !1;
                        var t = e.getAttribute("tabindex");
                        return "-32768" != t && !(!t || isNaN(parseInt(t, 10)))
                    },
                    hasGeometry: function(e) {
                        return !!(e.offsetWidth || e.offsetHeight || "function" == typeof e.getClientRects && e.getClientRects().length)
                    },
                    getFrameElement: function(e) {
                        try {
                            return e.frameElement
                        } catch (e) {
                            return null
                        }
                    },
                    getWindow: function(e) {
                        return e.ownerDocument && e.ownerDocument.defaultView || L
                    },
                    isNativeFormElement: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t || "select" === t || "button" === t || "textarea" === t
                    },
                    isHiddenInput: function(e) {
                        return f.isInputElement(e) && "hidden" == e.type
                    },
                    isAnchorWithHref: function(e) {
                        return f.isAnchorElement(e) && e.hasAttribute("href")
                    },
                    isInputElement: function(e) {
                        return "input" == e.nodeName.toLowerCase()
                    },
                    isAnchorElement: function(e) {
                        return "a" == e.nodeName.toLowerCase()
                    },
                    getFirstTabbableElement: function(e) {
                        if (f.isFocusable(e) && f.isTabbable(e)) return e;
                        for (var t = e.children || e.childNodes, n = 0; n < t.length; n++) {
                            var o = t[n].nodeType === s[0].ELEMENT_NODE ? f.getFirstTabbableElement(t[n]) : null;
                            if (o) return o
                        }
                        return null
                    },
                    getLastTabbableElement: function(e) {
                        if (f.isFocusable(e) && f.isTabbable(e)) return e;
                        for (var t = e.children || e.childNodes, n = t.length - 1; 0 <= n; n--) {
                            var o = t[n].nodeType === s[0].ELEMENT_NODE ? f.getLastTabbableElement(t[n]) : null;
                            if (o) return o
                        }
                        return null
                    }
                };
                return f.dom.animator = e(f), f;

                function b(e) {
                    return e[0] || e
                }
            }
            be.module("material.core").factory("$mdUtil", t), be.element.prototype.focus = be.element.prototype.focus || function() {
                return this.length && this[0].focus(), this
            }, be.element.prototype.blur = be.element.prototype.blur || function() {
                return this.length && this[0].blur(), this
            }
        }(), be.module("material.core").factory("$$mdAnimate", ["$q", "$timeout", "$mdConstant", "$animateCss", function(t, n, o, r) {
            return function(e) {
                return function(n, e, s, l, i) {
                    var c;
                    return c = {
                        translate3d: function(t, n, e, o) {
                            return i(t, {
                                from: n,
                                to: e,
                                addClass: o.transitionInClass,
                                removeClass: o.transitionOutClass,
                                duration: o.duration
                            }).start().then(function() {
                                return r
                            });

                            function r(e) {
                                return i(t, {
                                    to: e || n,
                                    addClass: o.transitionOutClass,
                                    removeClass: o.transitionInClass,
                                    duration: o.duration
                                }).start()
                            }
                        },
                        waitTransitionEnd: function(i, a) {
                            var d = 3e3;
                            return e(function(t, e) {
                                var n;
                                "0s" !== (n = (n = (a = a || {}).cachedTransitionStyles) || L.getComputedStyle(i[0])).transitionDuration && (n.transition || n.transitionProperty) || (d = 0);
                                var o = s(r, a.timeout || d);

                                function r(e) {
                                    e && e.target !== i[0] || (e && s.cancel(o), i.off(l.CSS.TRANSITIONEND, r), t())
                                }
                                i.on(l.CSS.TRANSITIONEND, r)
                            })
                        },
                        calculateTransformValues: function(e, t) {
                            var n, o, r = t.element,
                                i = t.bounds;
                            if (r || i) {
                                var a = r ? c.clientRect(r) || (n = e ? e.parent() : null, (o = n ? n.parent() : null) ? c.clientRect(o) : null) : c.copyRect(i),
                                    d = c.copyRect(e[0].getBoundingClientRect()),
                                    s = c.centerPointFor(d),
                                    l = c.centerPointFor(a);
                                return {
                                    centerX: l.x - s.x,
                                    centerY: l.y - s.y,
                                    scaleX: Math.round(100 * Math.min(.5, a.width / d.width)) / 100,
                                    scaleY: Math.round(100 * Math.min(.5, a.height / d.height)) / 100
                                }
                            }
                            return {
                                centerX: 0,
                                centerY: 0,
                                scaleX: .5,
                                scaleY: .5
                            }
                        },
                        calculateZoomToOrigin: function(e, t) {
                            return be.bind(null, n.supplant, "translate3d( {centerX}px, {centerY}px, 0 ) scale( {scaleX}, {scaleY} )")(c.calculateTransformValues(e, t))
                        },
                        calculateSlideToOrigin: function(e, t) {
                            return be.bind(null, n.supplant, "translate3d( {centerX}px, {centerY}px, 0 )")(c.calculateTransformValues(e, t))
                        },
                        toCss: function(e) {
                            var o = {};
                            return be.forEach(e, function(e, t) {
                                if (!be.isUndefined(e))
                                    if (0 <= "left top right bottom width height x y min-width min-height max-width max-height".indexOf(t)) o[t] = e + "px";
                                    else switch (t) {
                                        case "transition":
                                            n(0, l.CSS.TRANSITION, e);
                                            break;
                                        case "transform":
                                            n(0, l.CSS.TRANSFORM, e);
                                            break;
                                        case "transformOrigin":
                                            n(0, l.CSS.TRANSFORM_ORIGIN, e);
                                            break;
                                        case "font-size":
                                            o["font-size"] = e
                                    }
                            }), o;

                            function n(e, t, n) {
                                be.forEach(t.split(" "), function(e) {
                                    o[e] = n
                                })
                            }
                        },
                        toTransformCss: function(t, e, n) {
                            var o = {};
                            return be.forEach(l.CSS.TRANSFORM.split(" "), function(e) {
                                o[e] = t
                            }), e && (n = n || "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important", o.transition = n), o
                        },
                        copyRect: function(t, n) {
                            return t ? (n = n || {}, be.forEach("left top right bottom width height".split(" "), function(e) {
                                n[e] = Math.round(t[e])
                            }), n.width = n.width || n.right - n.left, n.height = n.height || n.bottom - n.top, n) : null
                        },
                        clientRect: function(e) {
                            var t, n = be.element(e)[0].getBoundingClientRect();
                            return (t = n) && 0 < t.width && 0 < t.height ? c.copyRect(n) : null
                        },
                        centerPointFor: function(e) {
                            return e ? {
                                x: Math.round(e.left + e.width / 2),
                                y: Math.round(e.top + e.height / 2)
                            } : {
                                x: 0,
                                y: 0
                            }
                        }
                    }
                }(e, t, n, o, r)
            }
        }]), 4 <= be.version.minor ? be.module("material.core.animate", []) : (w = be.forEach, _ = be.isDefined(document.documentElement.style.WebkitAppearance), k = _ ? "-webkit-" : "", x = (_ ? "webkitTransitionEnd " : "") + "transitionend", N = (_ ? "webkitAnimationEnd " : "") + "animationend", s = ["$q", "$$rAFMutex", function(t, n) {
            function e(e) {
                this.setHost(e), this._doneCallbacks = [], this._runInAnimationFrame = n(), this._state = 0
            }
            return e.prototype = {
                setHost: function(e) {
                    this.host = e || {}
                },
                done: function(e) {
                    2 === this._state ? e() : this._doneCallbacks.push(e)
                },
                progress: be.noop,
                getPromise: function() {
                    if (!this.promise) {
                        var e = this;
                        this.promise = t(function(t, n) {
                            e.done(function(e) {
                                !1 === e ? n() : t()
                            })
                        })
                    }
                    return this.promise
                },
                then: function(e, t) {
                    return this.getPromise().then(e, t)
                },
                catch: function(e) {
                    return this.getPromise().catch(e)
                },
                finally: function(e) {
                    return this.getPromise().finally(e)
                },
                pause: function() {
                    this.host.pause && this.host.pause()
                },
                resume: function() {
                    this.host.resume && this.host.resume()
                },
                end: function() {
                    this.host.end && this.host.end(), this._resolve(!0)
                },
                cancel: function() {
                    this.host.cancel && this.host.cancel(), this._resolve(!1)
                },
                complete: function(e) {
                    var t = this;
                    0 === t._state && (t._state = 1, t._runInAnimationFrame(function() {
                        t._resolve(e)
                    }))
                },
                _resolve: function(t) {
                    2 !== this._state && (w(this._doneCallbacks, function(e) {
                        e(t)
                    }), this._doneCallbacks.length = 0, this._state = 2)
                }
            }, e.all = function(t, n) {
                var o = 0,
                    r = !0;

                function i(e) {
                    r = r && e, ++o === t.length && n(r)
                }
                w(t, function(e) {
                    e.done(i)
                })
            }, e
        }], be.module("material.core.animate", []).factory("$$forceReflow", ["$document", function(e) {
            return function() {
                return e[0].body.clientWidth + 1
            }
        }]).factory("$$AnimateRunner", s).factory("$$rAFMutex", ["$$rAF", function(n) {
            return function() {
                var t = !1;
                return n(function() {
                        t = !0
                    }),
                    function(e) {
                        t ? e() : n(e)
                    }
            }
        }]).factory("$animateCss", ["$window", "$$rAF", "$$AnimateRunner", "$$forceReflow", "$$jqLite", "$timeout", "$animate", function(h, i, a, f, n, b, d) {
            function g(e, t) {
                t.addClass && (n.addClass(e, t.addClass), t.addClass = null), t.removeClass && (n.removeClass(e, t.removeClass), t.removeClass = null)
            }

            function E(e) {
                var t = 0,
                    n = (e || "").split(/\s*,\s*/);
                return w(n, function(e) {
                    "s" == e.charAt(e.length - 1) && (e = e.substring(0, e.length - 1)), e = parseFloat(e) || 0, t = t ? Math.max(e, t) : e
                }), t
            }
            var v, $ = [];

            function M(e, t) {
                t.from && (e.css(t.from), t.from = null)
            }

            function y(e, t) {
                t.to && (e.css(t.to), t.to = null)
            }

            function C(e) {
                for (var t = 0; t < e.length; t++)
                    if (1 === e[t].nodeType) return e[t]
            }

            function T(e, t) {
                var n = C(e),
                    o = A(k + "transition-delay");
                n.style[o] = t ? "-9999s" : ""
            }
            return function(o, s) {
                var l = [],
                    c = C(o),
                    e = c && d.enabled(),
                    t = !1,
                    n = !1;
                e && (s.transitionStyle && l.push([k + "transition", s.transitionStyle]), s.keyframeStyle && l.push([k + "animation", s.keyframeStyle]), s.delay && l.push([k + "transition-delay", s.delay + "s"]), s.duration && l.push([k + "transition-duration", s.duration + "s"]), t = s.keyframeStyle || s.to && (0 < s.duration || s.transitionStyle), n = !!s.addClass || !!s.removeClass, T(o, !0));
                var m = e && (t || n);
                M(o, s);
                var u, p, r = !1;
                return {
                    close: h.close,
                    start: function() {
                        var e = new a;
                        return function(e) {
                            v && v(), $.push(e), v = i(function() {
                                v = null;
                                for (var e = f(), t = 0; t < $.length; t++) $[t](e);
                                $.length = 0
                            })
                        }(function() {
                            if (T(o, !1), !m) return d();
                            w(l, function(e) {
                                var t = e[0],
                                    n = e[1];
                                c.style[A(t)] = n
                            }), g(o, s);
                            var e = function(e) {
                                var t = C(e),
                                    n = h.getComputedStyle(t),
                                    o = E(n[l("transitionDuration")]),
                                    r = E(n[l("animationDuration")]),
                                    i = E(n[l("transitionDelay")]),
                                    a = E(n[l("animationDelay")]);
                                r *= parseInt(n[l("animationIterationCount")], 10) || 1;
                                var d = Math.max(r, o),
                                    s = Math.max(a, i);
                                return {
                                    duration: d,
                                    delay: s,
                                    animationDuration: r,
                                    transitionDuration: o,
                                    animationDelay: a,
                                    transitionDelay: i
                                };

                                function l(e) {
                                    return _ ? "Webkit" + e.charAt(0).toUpperCase() + e.substr(1) : e
                                }
                            }(o);
                            if (0 === e.duration) return d();
                            var t = [];
                            s.easing && (e.transitionDuration && t.push([k + "transition-timing-function", s.easing]), e.animationDuration && t.push([k + "animation-timing-function", s.easing])), s.delay && e.animationDelay && t.push([k + "animation-delay", s.delay + "s"]), s.duration && e.animationDuration && t.push([k + "animation-duration", s.duration + "s"]), w(t, function(e) {
                                var t = e[0],
                                    n = e[1];
                                c.style[A(t)] = n, l.push(e)
                            });
                            var r = 1e3 * e.delay,
                                i = e.duration,
                                n = 1e3 * i,
                                a = Date.now();
                            u = [], e.transitionDuration && u.push(x), e.animationDuration && u.push(N), u = u.join(" "), p = function(e) {
                                e.stopPropagation();
                                var t = e.originalEvent || e,
                                    n = t.timeStamp || Date.now(),
                                    o = parseFloat(t.elapsedTime.toFixed(3));
                                Math.max(n - a, 0) >= r && i <= o && d()
                            }, o.on(u, p), y(o, s), b(d, r + 1.5 * n, !1)
                        }), e;

                        function d() {
                            if (!r) return r = !0, u && p && o.off(u, p), g(o, s),
                                function(e, t) {
                                    M(e, t), y(e, t)
                                }(o, s), w(l, function(e) {
                                    c.style[A(e[0])] = ""
                                }), e.complete(!0), e
                        }
                    }
                }
            }
        }])), S.$inject = ["$$rAF", "$log", "$window", "$interpolate"], be.module("material.core").provider("$mdAria", function() {
            var r = {
                showWarnings: !0
            };
            return {
                disableWarnings: function() {
                    r.showWarnings = !1
                },
                $get: ["$$rAF", "$log", "$window", "$interpolate", function(e, t, n, o) {
                    return S.apply(r, arguments)
                }]
            }
        }), be.module("material.core").provider("$mdCompiler", D), D.$inject = ["$compileProvider"],
        function() {
            r.$inject = ["$$MdGestureHandler", "$$rAF", "$timeout", "$mdUtil"];
            var i, a, s = {},
                l = 6,
                c = !(n.$inject = ["$mdGesture", "$$MdGestureHandler", "$mdUtil"]),
                d = !1,
                m = null,
                u = !1;

            function e() {}

            function r(o, e, n, t) {
                var r = t.getTouchAction(),
                    i = void 0 !== L.jQuery && be.element === L.jQuery,
                    a = {
                        handler: function(e, t) {
                            var n = new o(e);
                            return be.extend(n, t), s[e] = n, a
                        },
                        register: function(e, t, n) {
                            var o = s[t.replace(/^\$md./, "")];
                            if (o) return o.registerElement(e, n);
                            throw new Error("Failed to register element with handler " + t + ". Available handlers: " + Object.keys(s).join(", "))
                        },
                        isAndroid: t.isAndroid,
                        isIos: t.isIos,
                        isHijackingClicks: (t.isIos || t.isAndroid) && !i && !c
                    };

                function d(n) {
                    return function(e, t) {
                        t.distance < this.state.options.maxDistance && this.dispatchEvent(e, n, t)
                    }
                }
                return a.isHijackingClicks && (a.handler("click", {
                    options: {
                        maxDistance: l
                    },
                    onEnd: d("click")
                }), a.handler("focus", {
                    options: {
                        maxDistance: l
                    },
                    onEnd: function(e, t) {
                        t.distance < this.state.options.maxDistance && E(e.target) && (this.dispatchEvent(e, "focus", t), e.target.focus())
                    }
                }), a.handler("mouseup", {
                    options: {
                        maxDistance: l
                    },
                    onEnd: d("mouseup")
                }), a.handler("mousedown", {
                    onStart: function(e) {
                        this.dispatchEvent(e, "mousedown")
                    }
                })), a.handler("press", {
                    onStart: function(e, t) {
                        this.dispatchEvent(e, "$md.pressdown")
                    },
                    onEnd: function(e, t) {
                        this.dispatchEvent(e, "$md.pressup")
                    }
                }).handler("hold", {
                    options: {
                        maxDistance: 6,
                        delay: 500
                    },
                    onCancel: function() {
                        n.cancel(this.state.timeout)
                    },
                    onStart: function(e, t) {
                        if (!this.state.registeredParent) return this.cancel();
                        this.state.pos = {
                            x: t.x,
                            y: t.y
                        }, this.state.timeout = n(be.bind(this, function() {
                            this.dispatchEvent(e, "$md.hold"), this.cancel()
                        }), this.state.options.delay, !1)
                    },
                    onMove: function(e, t) {
                        r || "touchmove" !== e.type || e.preventDefault();
                        var n = this.state.pos.x - t.x,
                            o = this.state.pos.y - t.y;
                        Math.sqrt(n * n + o * o) > this.options.maxDistance && this.cancel()
                    },
                    onEnd: function() {
                        this.onCancel()
                    }
                }).handler("drag", {
                    options: {
                        minDistance: 6,
                        horizontal: !0,
                        cancelMultiplier: 1.5
                    },
                    onSetup: function(e, t) {
                        r && (this.oldTouchAction = e[0].style[r], e[0].style[r] = t.horizontal ? "pan-y" : "pan-x")
                    },
                    onCleanup: function(e) {
                        this.oldTouchAction ? e[0].style[r] = this.oldTouchAction : e[0].style[r] = null
                    },
                    onStart: function(e) {
                        this.state.registeredParent || this.cancel()
                    },
                    onMove: function(e, t) {
                        var n, o;
                        r || "touchmove" !== e.type || e.preventDefault(), this.state.dragPointer ? this.dispatchDragMove(e) : (o = this.state.options.horizontal ? (n = Math.abs(t.distanceX) > this.state.options.minDistance, Math.abs(t.distanceY) > this.state.options.minDistance * this.state.options.cancelMultiplier) : (n = Math.abs(t.distanceY) > this.state.options.minDistance, Math.abs(t.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier), n ? (this.state.dragPointer = p(e), b(e, this.state.dragPointer), this.dispatchEvent(e, "$md.dragstart", this.state.dragPointer)) : o && this.cancel())
                    },
                    dispatchDragMove: e.throttle(function(e) {
                        this.state.isRunning && (b(e, this.state.dragPointer), this.dispatchEvent(e, "$md.drag", this.state.dragPointer))
                    }),
                    onEnd: function(e, t) {
                        this.state.dragPointer && (b(e, this.state.dragPointer), this.dispatchEvent(e, "$md.dragend", this.state.dragPointer))
                    }
                }).handler("swipe", {
                    options: {
                        minVelocity: .65,
                        minDistance: 10
                    },
                    onEnd: function(e, t) {
                        var n;
                        Math.abs(t.velocityX) > this.state.options.minVelocity && Math.abs(t.distanceX) > this.state.options.minDistance ? (n = "left" == t.directionX ? "$md.swipeleft" : "$md.swiperight", this.dispatchEvent(e, n)) : Math.abs(t.velocityY) > this.state.options.minVelocity && Math.abs(t.distanceY) > this.state.options.minDistance && (n = "up" == t.directionY ? "$md.swipeup" : "$md.swipedown", this.dispatchEvent(e, n))
                    }
                })
            }

            function t(e) {
                this.name = e, this.state = {}
            }

            function n(e, r, n) {
                if (!d) {
                    !u && e.isHijackingClicks && (document.addEventListener("click", function(e) {
                        var t;
                        t = n.isIos ? be.isDefined(e.webkitForce) && 0 === e.webkitForce : 0 === e.clientX && 0 === e.clientY;
                        t || e.$material || e.isIonicTap || f(e) ? (m = null, "label" === e.target.tagName.toLowerCase() && (m = {
                            x: e.x,
                            y: e.y
                        })) : (e.preventDefault(), e.stopPropagation(), m = null)
                    }, !0), document.addEventListener("mouseup", t, !0), document.addEventListener("mousedown", t, !0), document.addEventListener("focus", t, !0), u = !0);
                    be.element(document).on("mousedown touchstart pointerdown", function(e) {
                        if (i) return;
                        var t = +Date.now();
                        if (a && !h(e, a) && t - a.endTime < 1500) return;
                        i = p(e), o("start", e)
                    }).on("mousemove touchmove pointermove", function(e) {
                        if (!i || !h(e, i)) return;
                        b(e, i), o("move", e)
                    }).on("mouseup mouseleave touchend touchcancel pointerup pointercancel", function(e) {
                        if (!i || !h(e, i)) return;
                        b(e, i), i.endTime = +Date.now(), "pointercancel" !== e.type && o("end", e);
                        a = i, i = null
                    }).on("$$mdGestureReset", function() {
                        a = i = null
                    })
                }

                function t(e) {
                    !e.clientX && !e.clientY || e.$material || e.isIonicTap || f(e) || "mousedown" === e.type && (E(e.target) || E(document.activeElement)) || (e.preventDefault(), e.stopPropagation())
                }

                function o(e, t) {
                    var n;
                    for (var o in s)(n = s[o]) instanceof r && ("start" === e && n.cancel(), n[e](t, i))
                }
            }

            function p(e) {
                var t = g(e),
                    n = {
                        startTime: +Date.now(),
                        target: e.target,
                        type: e.type.charAt(0)
                    };
                return n.startX = n.x = t.pageX, n.startY = n.y = t.pageY, n
            }

            function h(e, t) {
                return e && t && e.type.charAt(0) === t.type
            }

            function f(e) {
                return m && m.x === e.x && m.y === e.y
            }

            function b(e, t) {
                var n = g(e),
                    o = t.x = n.pageX,
                    r = t.y = n.pageY;
                t.distanceX = o - t.startX, t.distanceY = r - t.startY, t.distance = Math.sqrt(t.distanceX * t.distanceX + t.distanceY * t.distanceY), t.directionX = 0 < t.distanceX ? "right" : t.distanceX < 0 ? "left" : "", t.directionY = 0 < t.distanceY ? "down" : t.distanceY < 0 ? "up" : "", t.duration = +Date.now() - t.startTime, t.velocityX = t.distanceX / t.duration, t.velocityY = t.distanceY / t.duration
            }

            function g(e) {
                return (e = e.originalEvent || e).touches && e.touches[0] || e.changedTouches && e.changedTouches[0] || e
            }

            function E(e) {
                return !!e && "-1" !== e.getAttribute("tabindex") && !e.hasAttribute("disabled") && (e.hasAttribute("tabindex") || e.hasAttribute("href") || e.isContentEditable || -1 !== ["INPUT", "SELECT", "BUTTON", "TEXTAREA", "VIDEO", "AUDIO"].indexOf(e.nodeName))
            }
            be.module("material.core.gestures", []).provider("$mdGesture", e).factory("$$MdGestureHandler", function() {
                var e = void 0 !== L.jQuery && be.element === L.jQuery;
                return t.prototype = {
                    options: {},
                    dispatchEvent: e ? function(e, t, n) {
                        n = n || i;
                        var o = new be.element.Event(t);
                        o.$material = !0, o.pointer = n, o.srcEvent = e, be.extend(o, {
                            clientX: n.x,
                            clientY: n.y,
                            screenX: n.x,
                            screenY: n.y,
                            pageX: n.x,
                            pageY: n.y,
                            ctrlKey: e.ctrlKey,
                            altKey: e.altKey,
                            shiftKey: e.shiftKey,
                            metaKey: e.metaKey
                        }), be.element(n.target).trigger(o)
                    } : function(e, t, n) {
                        var o;
                        n = n || i, "click" === t || "mouseup" === t || "mousedown" === t ? "function" == typeof L.MouseEvent ? o = new MouseEvent(t, {
                            bubbles: !0,
                            cancelable: !0,
                            screenX: Number(e.screenX),
                            screenY: Number(e.screenY),
                            clientX: Number(n.x),
                            clientY: Number(n.y),
                            ctrlKey: e.ctrlKey,
                            altKey: e.altKey,
                            shiftKey: e.shiftKey,
                            metaKey: e.metaKey,
                            button: e.button,
                            buttons: e.buttons,
                            relatedTarget: e.relatedTarget || null
                        }) : (o = document.createEvent("MouseEvents")).initMouseEvent(t, !0, !0, L, e.detail, n.x, n.y, n.x, n.y, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget || null) : "function" == typeof L.CustomEvent ? o = new CustomEvent(t, {
                            bubbles: !0,
                            cancelable: !0,
                            detail: {}
                        }) : (o = document.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, {});
                        o.$material = !0, o.pointer = n, o.srcEvent = e, n.target.dispatchEvent(o)
                    },
                    onSetup: be.noop,
                    onCleanup: be.noop,
                    onStart: be.noop,
                    onMove: be.noop,
                    onEnd: be.noop,
                    onCancel: be.noop,
                    start: function(e, t) {
                        if (!this.state.isRunning) {
                            var n = this.getNearestParent(e.target),
                                o = n && n.$mdGesture[this.name] || {};
                            this.state = {
                                isRunning: !0,
                                options: be.extend({}, this.options, o),
                                registeredParent: n
                            }, this.onStart(e, t)
                        }
                    },
                    move: function(e, t) {
                        this.state.isRunning && this.onMove(e, t)
                    },
                    end: function(e, t) {
                        this.state.isRunning && (this.state.isRunning = !1, this.onEnd(e, t))
                    },
                    cancel: function(e, t) {
                        this.onCancel(e, t), this.state = {}
                    },
                    getNearestParent: function(e) {
                        for (var t = e; t;) {
                            if ((t.$mdGesture || {})[this.name]) return t;
                            t = t.parentNode
                        }
                        return null
                    },
                    registerElement: function(e, t) {
                        var n = this;
                        return e[0].$mdGesture = e[0].$mdGesture || {}, e[0].$mdGesture[this.name] = t || {}, e.on("$destroy", o), n.onSetup(e, t || {}), o;

                        function o() {
                            delete e[0].$mdGesture[n.name], e.off("$destroy", o), n.onCleanup(e, t || {})
                        }
                    }
                }, t
            }).run(n), e.prototype = {
                disableAll: function() {
                    d = !0
                },
                skipClickHijack: function() {
                    return c = !0
                },
                setMaxClickDistance: function(e) {
                    l = parseInt(e)
                },
                $get: ["$$MdGestureHandler", "$$rAF", "$timeout", "$mdUtil", function(e, t, n, o) {
                    return new r(e, t, n, o)
                }]
            }
        }(), H.$inject = ["$timeout", "$mdUtil", "$rootScope"], be.module("material.core.interaction", []).service("$mdInteraction", H), H.prototype.deregister = function() {
            this.bodyElement.off("keydown mousedown", this.inputHandler), "ontouchstart" in document.documentElement && this.bodyElement.off("touchstart", this.bufferedInputHandler), this.pointerEvent && this.bodyElement.off(this.pointerEvent, this.inputHandler)
        }, H.prototype.initializeEvents = function() {
            this.bodyElement.on("keydown mousedown", this.inputHandler), "ontouchstart" in document.documentElement && this.bodyElement.on("touchstart", this.bufferedInputHandler), this.pointerEvent && this.bodyElement.on(this.pointerEvent, this.inputHandler)
        }, H.prototype.onInputEvent = function(e) {
            if (!this.isBuffering) {
                var t = this.inputEventMap[e.type];
                "pointer" === t && (t = this.iePointerMap[e.pointerType] || e.pointerType), this.lastInteractionType = t, this.lastInteractionTime = this.$mdUtil.now()
            }
        }, H.prototype.onBufferInputEvent = function(e) {
            this.$timeout.cancel(this.bufferTimeout), this.onInputEvent(e), this.isBuffering = !0, this.bufferTimeout = this.$timeout(function() {
                this.isBuffering = !1
            }.bind(this), 650, !1)
        }, H.prototype.getLastInteractionType = function() {
            return this.lastInteractionType
        }, H.prototype.isUserInvoked = function(e) {
            var t = be.isNumber(e) ? e : 15;
            return this.lastInteractionTime >= this.$mdUtil.now() - t
        }, be.module("material.core").provider("$$interimElement", function() {
            return t.$inject = ["$document", "$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$mdUtil", "$mdCompiler", "$mdTheming", "$injector", "$exceptionHandler"], e.$get = t, e;

            function e(r) {
                e.$inject = ["$$interimElement", "$injector"];
                var n = ["onHide", "onShow", "onRemove"],
                    i = {},
                    l = {
                        presets: {}
                    },
                    o = {
                        setDefaults: function(e) {
                            return l.optionsFactory = e.options, l.methods = (e.methods || []).concat(n), o
                        },
                        addPreset: function(e, t) {
                            if ((t = t || {}).methods = t.methods || [], t.options = t.options || function() {
                                    return {}
                                }, /^cancel|hide|show$/.test(e)) throw new Error("Preset '" + e + "' in " + r + " is reserved!");
                            if (-1 < t.methods.indexOf("_options")) throw new Error("Method '_options' in " + r + " is reserved!");
                            return l.presets[e] = {
                                methods: t.methods.concat(n),
                                optionsFactory: t.options,
                                argOption: t.argOption
                            }, o
                        },
                        addMethod: function(e, t) {
                            return i[e] = t, o
                        },
                        $get: e
                    };
                return o.addPreset("build", {
                    methods: ["controller", "controllerAs", "resolve", "multiple", "template", "templateUrl", "themable", "transformTemplate", "parent", "contentElement"]
                }), o;

                function e(e, o) {
                    var a, t, n = e(),
                        d = {
                            hide: n.hide,
                            cancel: n.cancel,
                            show: function(e) {
                                return (e = e || {})._options && (e = e._options), n.show(be.extend({}, t, e))
                            },
                            destroy: function(e) {
                                return n.destroy(e)
                            }
                        };
                    return a = l.methods || [], t = s(l.optionsFactory, {}), be.forEach(i, function(e, t) {
                        d[t] = e
                    }), be.forEach(l.presets, function(t, n) {
                        var o = s(t.optionsFactory, {}),
                            e = (t.methods || []).concat(a);

                        function r(e) {
                            this._options = be.extend({}, o, e)
                        }
                        if (be.extend(o, {
                                $type: n
                            }), be.forEach(e, function(t) {
                                r.prototype[t] = function(e) {
                                    return this._options[t] = e, this
                                }
                            }), t.argOption) {
                            var i = "show" + n.charAt(0).toUpperCase() + n.slice(1);
                            d[i] = function(e) {
                                var t = d[n](e);
                                return d.show(t)
                            }
                        }
                        d[n] = function(e) {
                            return arguments.length && t.argOption && !be.isObject(e) && !be.isArray(e) ? (new r)[t.argOption](e) : new r(e)
                        }
                    }), d;

                    function s(e, t) {
                        var n = {};
                        return n[r] = d, o.invoke(e || function() {
                            return t
                        }, {}, n)
                    }
                }
            }

            function t(m, u, t, p, h, o, n, f, b, s, l) {
                return function() {
                    var c, r = [],
                        i = [],
                        a = [];
                    return c = {
                        show: function(e) {
                            var t = new d((e = e || {}) || {}),
                                n = e.multiple ? u.resolve() : u.all(r);
                            e.multiple || (n = n.then(function() {
                                var e = i.concat(a.map(c.cancel));
                                return u.all(e)
                            }));
                            var o = n.then(function() {
                                return t.show().then(function() {
                                    a.push(t)
                                }).catch(function(e) {
                                    return e
                                }).finally(function() {
                                    r.splice(r.indexOf(o), 1)
                                })
                            });
                            return r.push(o), t.deferred.promise.catch(function(e) {
                                return e instanceof Error && l(e), e
                            }), t.deferred.promise
                        },
                        hide: e(function(n, o) {
                            return (o = o || {}).closeAll ? u.all(a.slice().reverse().map(e)) : o.closeTo !== ge ? u.all(a.slice(o.closeTo).map(e)) : e(a[a.length - 1]);

                            function e(e) {
                                if (!e) return u.when(n);
                                var t = e.remove(n, !1, o || {}).catch(function(e) {
                                    return e
                                }).finally(function() {
                                    i.splice(i.indexOf(t), 1)
                                });
                                return a.splice(a.indexOf(e), 1), i.push(t), e.deferred.promise
                            }
                        }),
                        cancel: e(function(e, t) {
                            var n = a.pop();
                            if (!n) return u.when(e);
                            var o = n.remove(e, !0, t || {}).catch(function(e) {
                                return e
                            }).finally(function() {
                                i.splice(i.indexOf(o), 1)
                            });
                            return i.push(o), n.deferred.promise.catch(be.noop)
                        }),
                        destroy: function(e) {
                            var t = e ? null : a.shift(),
                                n = be.element(e).length && be.element(e)[0].parentNode;
                            if (n) {
                                var o = a.filter(function(e) {
                                    return e.options.element[0] === n
                                });
                                o.length && (t = o[0], a.splice(a.indexOf(t), 1))
                            }
                            return t ? t.remove(!1, !1, {
                                $destroy: !0
                            }) : u.when(!1)
                        },
                        $injector_: s
                    };

                    function e(t) {
                        return function() {
                            var e = arguments;
                            return a.length ? t.apply(c, e) : r.length ? r[0].finally(function() {
                                return t.apply(c, e)
                            }) : u.when("No interim elements currently showing up.")
                        }
                    }

                    function d(i) {
                        var a, d, s = u.when(!0);
                        return i = function(e) {
                            return (e = e || {}).template && (e.template = n.processTemplate(e.template)), be.extend({
                                preserveScope: !1,
                                cancelAutoHide: be.noop,
                                scope: e.scope || t.$new(e.isolateScope),
                                onShow: function(e, t, n) {
                                    return o.enter(t, n.parent)
                                },
                                onRemove: function(e, t) {
                                    return t && o.leave(t) || u.when()
                                }
                            }, e)
                        }(i), a = {
                            options: i,
                            deferred: u.defer(),
                            show: function() {
                                return u(function(t, n) {
                                    function o(e) {
                                        a.deferred.reject(e), n(e)
                                    }
                                    i.onCompiling && i.onCompiling(i),
                                        function(t) {
                                            return (t.skipCompile ? null : f.compile(t)) || u(function(e) {
                                                e({
                                                    locals: {},
                                                    link: function() {
                                                        return t.element
                                                    }
                                                })
                                            })
                                        }(i).then(function(e) {
                                            d = function(e, t) {
                                                be.extend(e.locals, t);
                                                var n = e.link(t.scope);
                                                return t.element = n, t.parent = function(e, t) {
                                                    var n, o = t.parent;
                                                    return ((o = be.isFunction(o) ? o(t.scope, e, t) : be.isString(o) ? be.element(m[0].querySelector(o)) : be.element(o)) || {}).length ? o : (h[0] && h[0].querySelector && (n = h[0].querySelector(":not(svg) > body")), "#comment" === (n = n || h[0]).nodeName && (n = m[0].body), be.element(n))
                                                }(n, t), t.themable && b(n), n
                                            }(e, i), i.cleanupElement = e.cleanup, s = function(n, o, e) {
                                                var t = o.onShowing || be.noop,
                                                    r = o.onComplete || be.noop;
                                                try {
                                                    t(o.scope, n, o, e)
                                                } catch (e) {
                                                    return u.reject(e)
                                                }
                                                return u(function(e, t) {
                                                    try {
                                                        u.when(o.onShow(o.scope, n, o)).then(function() {
                                                            r(o.scope, n, o),
                                                                function() {
                                                                    var e, t = be.noop;
                                                                    i.hideDelay && (e = p(c.hide, i.hideDelay), t = function() {
                                                                        p.cancel(e)
                                                                    }), i.cancelAutoHide = function() {
                                                                        t(), i.cancelAutoHide = ge
                                                                    }
                                                                }(), e(n)
                                                        }, t)
                                                    } catch (e) {
                                                        t(e.message)
                                                    }
                                                })
                                            }(d, i, e.controller).then(t, o)
                                        }).catch(o)
                                })
                            },
                            remove: function(e, t, n) {
                                return d ? ((i = be.extend(i || {}, n || {})).cancelAutoHide && i.cancelAutoHide(), i.element.triggerHandler("$mdInterimElementRemove"), !0 === i.$destroy ? l(i.element, i).then(function() {
                                    t && r(e) || o(e)
                                }) : (u.when(s).finally(function() {
                                    l(i.element, i).then(function() {
                                        t ? r(e) : o(e)
                                    }, r)
                                }), a.deferred.promise)) : u.when(!1);

                                function o(e) {
                                    a.deferred.resolve(e)
                                }

                                function r(e) {
                                    a.deferred.reject(e)
                                }
                            }
                        };

                        function l(o, r) {
                            var i = r.onRemoving || be.noop;
                            return u(function(e, t) {
                                try {
                                    var n = u.when(r.onRemove(r.scope, o, r) || !0);
                                    i(o, n), r.$destroy ? (e(o), !r.preserveScope && r.scope && n.then(function() {
                                        r.scope.$destroy()
                                    })) : n.then(function() {
                                        !r.preserveScope && r.scope && r.scope.$destroy(), e(o)
                                    }, t)
                                } catch (e) {
                                    t(e.message)
                                }
                            })
                        }
                    }
                }
            }
        }), E = /(-gt)?-(sm|md|lg|print)/g, v = /\s+/g, $ = ["grow", "initial", "auto", "none", "noshrink", "nogrow"], M = ["row", "column"], y = ["", "start", "center", "end", "stretch", "space-around", "space-between"], C = ["", "start", "center", "end", "stretch"], T = {
            enabled: !0,
            breakpoints: []
        }, p = be.module("material.core.layout", ["ng"]), h = /^((?:x|data)[:\-_])/i, f = /([:\-_]+(.))/g, b = ["layout", "flex", "flex-order", "flex-offset", "layout-align"], g = ["show", "hide", "layout-padding", "layout-margin"], be.forEach(["", "xs", "gt-xs", "sm", "gt-sm", "md", "gt-md", "lg", "gt-lg", "xl", "print"], function(n) {
            be.forEach(b, function(e) {
                var t = n ? e + "-" + n : e;
                p.directive(I(t), function(i) {
                    return ["$mdUtil", "$interpolate", "$log", function(e, t, n) {
                        return l = e, c = t, m = n, {
                            restrict: "A",
                            compile: function(e, t) {
                                var n;
                                return T.enabled && (F(i, 0, e, m), B(i, z(i, t, ""), U(0, i, t)), n = o), n || be.noop
                            }
                        }
                    }];

                    function o(e, t, n) {
                        var o = function(n, o) {
                                var r;
                                return function(e) {
                                    var t = B(o, e || "");
                                    be.isDefined(t) && (r && n.removeClass(r), r = t ? o + "-" + t.trim().replace(v, "-") : o, n.addClass(r))
                                }
                            }(t, i),
                            r = n.$observe(n.$normalize(i), o);
                        o(z(i, n, "")), e.$on("$destroy", function() {
                            r()
                        })
                    }
                }(t))
            }), be.forEach(g, function(e) {
                var t = n ? e + "-" + n : e;
                p.directive(I(t), R(t))
            })
        }), p.provider("$$mdLayout", function() {
            return {
                $get: be.noop,
                validateAttributeValue: B,
                validateAttributeUsage: F,
                disableLayouts: function(e) {
                    T.enabled = !0 !== e
                }
            }
        }).directive("mdLayoutCss", P).directive("ngCloak", (u = "ng-cloak", ["$timeout", function(n) {
            return {
                restrict: "A",
                priority: -10,
                compile: function(e) {
                    return T.enabled ? (e.addClass(u), function(e, t) {
                        n(function() {
                            t.removeClass(u)
                        }, 10, !1)
                    }) : be.noop
                }
            }
        }])).directive("layoutWrap", R("layout-wrap")).directive("layoutNowrap", R("layout-nowrap")).directive("layoutNoWrap", R("layout-no-wrap")).directive("layoutFill", R("layout-fill")).config(O), V.$inject = ["$timeout"], be.module("material.core").service("$mdLiveAnnouncer", V), V.prototype.announce = function(e, t) {
            t = t || "polite";
            var n = this;
            n._liveElement.textContent = "", n._liveElement.setAttribute("aria-live", t), n._$timeout(function() {
                n._liveElement.textContent = e
            }, n._announceTimeout, !1)
        }, V.prototype._createLiveElement = function() {
            var e = document.createElement("div");
            return e.classList.add("md-visually-hidden"), e.setAttribute("role", "status"), e.setAttribute("aria-atomic", "true"), e.setAttribute("aria-live", "polite"), document.body.appendChild(e), e
        }, be.module("material.core.meta", []).provider("$$mdMeta", function() {
            var o = be.element(document.head),
                r = {};

            function i(e) {
                if (r[e]) return !0;
                var t = document.getElementsByName(e)[0];
                return !!t && (r[e] = be.element(t), !0)
            }
            var e = {
                setMeta: function(e, t) {
                    if (i(e), r[e]) r[e].attr("content", t);
                    else {
                        var n = be.element('<meta name="' + e + '" content="' + t + '"/>');
                        o.append(n), r[e] = n
                    }
                    return function() {
                        r[e].attr("content", ""), r[e].remove(), delete r[e]
                    }
                },
                getMeta: function(e) {
                    if (!i(e)) throw Error("$$mdMeta: could not find a meta tag with the name '" + e + "'");
                    return r[e].attr("content")
                }
            };
            return be.extend({}, e, {
                $get: function() {
                    return e
                }
            })
        }), W.$inject = ["$log", "$q"], be.module("material.core").factory("$mdComponentRegistry", W), Y.$inject = ["$mdInkRipple"], be.module("material.core").factory("$mdButtonInkRipple", Y), K.$inject = ["$mdInkRipple"], be.module("material.core").factory("$mdCheckboxInkRipple", K), G.$inject = ["$mdInkRipple"], be.module("material.core").factory("$mdListInkRipple", G),
        function() {
            i.$inject = ["$scope", "$element", "rippleOptions", "$window", "$timeout", "$mdUtil", "$mdColorUtil"], e.$inject = ["$mdButtonInkRipple", "$mdCheckboxInkRipple"], be.module("material.core").provider("$mdInkRipple", function() {
                var r = !1;
                return {
                    disableInkRipple: function() {
                        r = !0
                    },
                    $get: ["$injector", function(o) {
                        return {
                            attach: function(e, t, n) {
                                return r || t.controller("mdNoInk") ? be.noop : o.instantiate(i, {
                                    $scope: e,
                                    $element: t,
                                    rippleOptions: n
                                })
                            }
                        }
                    }]
                }
            }).directive("mdInkRipple", e).directive("mdNoInk", n).directive("mdNoBar", n).directive("mdNoStretch", n);

            function e(o, r) {
                return {
                    controller: be.noop,
                    link: function(e, t, n) {
                        n.hasOwnProperty("mdInkRippleCheckbox") ? r.attach(e, t) : o.attach(e, t)
                    }
                }
            }

            function i(e, t, n, o, r, i, a) {
                this.$window = o, this.$timeout = r, this.$mdUtil = i, this.$mdColorUtil = a, this.$scope = e, this.$element = t, this.options = n, this.mousedown = !1, this.ripples = [], this.timeout = null, this.lastRipple = null, i.valueOnUse(this, "container", this.createContainer), this.$element.addClass("md-ink-ripple"), (t.controller("mdInkRipple") || {}).createRipple = be.bind(this, this.createRipple), (t.controller("mdInkRipple") || {}).setColor = be.bind(this, this.color), this.bindEvents()
            }

            function t(e, t) {
                (e.mousedown || e.lastRipple) && (e.mousedown = !1, e.$mdUtil.nextTick(be.bind(e, t), !1))
            }

            function n() {
                return {
                    controller: be.noop
                }
            }
            i.prototype.color = function(e) {
                var t, n, o = this;
                return be.isDefined(e) && (o._color = o._parseColor(e)), o._color || o._parseColor(o.inkRipple()) || o._parseColor((t = o.options && o.options.colorElement ? o.options.colorElement : [], (n = t.length ? t[0] : o.$element[0]) ? o.$window.getComputedStyle(n).color : "rgb(0,0,0)"))
            }, i.prototype.calculateColor = function() {
                return this.color()
            }, i.prototype._parseColor = function(e, t) {
                t = t || 1;
                var n = this.$mdColorUtil;
                if (e) return 0 === e.indexOf("rgba") ? e.replace(/\d?\.?\d*\s*\)\s*$/, (.1 * t).toString() + ")") : 0 === e.indexOf("rgb") ? n.rgbToRgba(e) : 0 === e.indexOf("#") ? n.hexToRgba(e) : void 0
            }, i.prototype.bindEvents = function() {
                this.$element.on("mousedown", be.bind(this, this.handleMousedown)), this.$element.on("mouseup touchend", be.bind(this, this.handleMouseup)), this.$element.on("mouseleave", be.bind(this, this.handleMouseup)), this.$element.on("touchmove", be.bind(this, this.handleTouchmove))
            }, i.prototype.handleMousedown = function(e) {
                if (!this.mousedown)
                    if (e.hasOwnProperty("originalEvent") && (e = e.originalEvent), this.mousedown = !0, this.options.center) this.createRipple(this.container.prop("clientWidth") / 2, this.container.prop("clientWidth") / 2);
                    else if (e.srcElement !== this.$element[0]) {
                    var t = this.$element[0].getBoundingClientRect(),
                        n = e.clientX - t.left,
                        o = e.clientY - t.top;
                    this.createRipple(n, o)
                } else this.createRipple(e.offsetX, e.offsetY)
            }, i.prototype.handleMouseup = function() {
                this.$timeout(function() {
                    t(this, this.clearRipples)
                }.bind(this))
            }, i.prototype.handleTouchmove = function() {
                t(this, this.deleteRipples)
            }, i.prototype.deleteRipples = function() {
                for (var e = 0; e < this.ripples.length; e++) this.ripples[e].remove()
            }, i.prototype.clearRipples = function() {
                for (var e = 0; e < this.ripples.length; e++) this.fadeInComplete(this.ripples[e])
            }, i.prototype.createContainer = function() {
                var e = be.element('<div class="md-ripple-container"></div>');
                return this.$element.append(e), e
            }, i.prototype.clearTimeout = function() {
                this.timeout && (this.$timeout.cancel(this.timeout), this.timeout = null)
            }, i.prototype.isRippleAllowed = function() {
                var e = this.$element[0];
                do {
                    if (!e.tagName || "BODY" === e.tagName) break;
                    if (e && be.isFunction(e.hasAttribute)) {
                        if (e.hasAttribute("disabled")) return !1;
                        if ("false" === this.inkRipple() || "0" === this.inkRipple()) return !1
                    }
                } while (e = e.parentNode);
                return !0
            }, i.prototype.inkRipple = function() {
                return this.$element.attr("md-ink-ripple")
            }, i.prototype.createRipple = function(e, t) {
                if (this.isRippleAllowed()) {
                    var n, o, r, i = this,
                        a = i.$mdColorUtil,
                        d = be.element('<div class="md-ripple"></div>'),
                        s = this.$element.prop("clientWidth"),
                        l = this.$element.prop("clientHeight"),
                        c = 2 * Math.max(Math.abs(s - e), e),
                        m = 2 * Math.max(Math.abs(l - t), t),
                        u = (n = this.options.fitRipple, o = c, r = m, n ? Math.max(o, r) : Math.sqrt(Math.pow(o, 2) + Math.pow(r, 2))),
                        p = this.calculateColor();
                    d.css({
                        left: e + "px",
                        top: t + "px",
                        background: "black",
                        width: u + "px",
                        height: u + "px",
                        backgroundColor: a.rgbaToRgb(p),
                        borderColor: a.rgbaToRgb(p)
                    }), this.lastRipple = d, this.clearTimeout(), this.timeout = this.$timeout(function() {
                        i.clearTimeout(), i.mousedown || i.fadeInComplete(d)
                    }, 157.5, !1), this.options.dimBackground && this.container.css({
                        backgroundColor: p
                    }), this.container.append(d), this.ripples.push(d), d.addClass("md-ripple-placed"), this.$mdUtil.nextTick(function() {
                        d.addClass("md-ripple-scaled md-ripple-active"), i.$timeout(function() {
                            i.clearRipples()
                        }, 450, !1)
                    }, !1)
                }
            }, i.prototype.fadeInComplete = function(e) {
                this.lastRipple === e && (this.timeout || this.mousedown) || this.removeRipple(e)
            }, i.prototype.removeRipple = function(e) {
                var t = this;
                this.ripples.indexOf(e) < 0 || (this.ripples.splice(this.ripples.indexOf(e), 1), e.removeClass("md-ripple-active"), e.addClass("md-ripple-remove"), 0 === this.ripples.length && this.container.css({
                    backgroundColor: ""
                }), this.$timeout(function() {
                    t.fadeOutComplete(e)
                }, 450, !1))
            }, i.prototype.fadeOutComplete = function(e) {
                e.remove(), this.lastRipple = null
            }
        }(), X.$inject = ["$mdInkRipple"], be.module("material.core").factory("$mdTabInkRipple", X), be.module("material.core.theming.palette", []).constant("$mdColorPalette", {
            red: {
                50: "#ffebee",
                100: "#ffcdd2",
                200: "#ef9a9a",
                300: "#e57373",
                400: "#ef5350",
                500: "#f44336",
                600: "#e53935",
                700: "#d32f2f",
                800: "#c62828",
                900: "#b71c1c",
                A100: "#ff8a80",
                A200: "#ff5252",
                A400: "#ff1744",
                A700: "#d50000",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 500 600 A100 A200 A400",
                contrastStrongLightColors: "700 800 900 A700"
            },
            pink: {
                50: "#fce4ec",
                100: "#f8bbd0",
                200: "#f48fb1",
                300: "#f06292",
                400: "#ec407a",
                500: "#e91e63",
                600: "#d81b60",
                700: "#c2185b",
                800: "#ad1457",
                900: "#880e4f",
                A100: "#ff80ab",
                A200: "#ff4081",
                A400: "#f50057",
                A700: "#c51162",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 A100 A200 A400",
                contrastStrongLightColors: "500 600 700 800 900 A700"
            },
            purple: {
                50: "#f3e5f5",
                100: "#e1bee7",
                200: "#ce93d8",
                300: "#ba68c8",
                400: "#ab47bc",
                500: "#9c27b0",
                600: "#8e24aa",
                700: "#7b1fa2",
                800: "#6a1b9a",
                900: "#4a148c",
                A100: "#ea80fc",
                A200: "#e040fb",
                A400: "#d500f9",
                A700: "#aa00ff",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 A100 A200 A400",
                contrastStrongLightColors: "400 500 600 700 800 900 A700"
            },
            "deep-purple": {
                50: "#ede7f6",
                100: "#d1c4e9",
                200: "#b39ddb",
                300: "#9575cd",
                400: "#7e57c2",
                500: "#673ab7",
                600: "#5e35b1",
                700: "#512da8",
                800: "#4527a0",
                900: "#311b92",
                A100: "#b388ff",
                A200: "#7c4dff",
                A400: "#651fff",
                A700: "#6200ea",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 A100",
                contrastStrongLightColors: "400 500 600 700 800 900 A200 A400 A700"
            },
            indigo: {
                50: "#e8eaf6",
                100: "#c5cae9",
                200: "#9fa8da",
                300: "#7986cb",
                400: "#5c6bc0",
                500: "#3f51b5",
                600: "#3949ab",
                700: "#303f9f",
                800: "#283593",
                900: "#1a237e",
                A100: "#8c9eff",
                A200: "#536dfe",
                A400: "#3d5afe",
                A700: "#304ffe",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 A100 A200",
                contrastStrongLightColors: "400 500 600 700 800 900 A400 A700"
            },
            blue: {
                50: "#e3f2fd",
                100: "#bbdefb",
                200: "#90caf9",
                300: "#64b5f6",
                400: "#42a5f5",
                500: "#2196f3",
                600: "#1e88e5",
                700: "#1976d2",
                800: "#1565c0",
                900: "#0d47a1",
                A100: "#82b1ff",
                A200: "#448aff",
                A400: "#2979ff",
                A700: "#2962ff",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 500 600 A100 A200",
                contrastStrongLightColors: "700 800 900 A400 A700"
            },
            "light-blue": {
                50: "#e1f5fe",
                100: "#b3e5fc",
                200: "#81d4fa",
                300: "#4fc3f7",
                400: "#29b6f6",
                500: "#03a9f4",
                600: "#039be5",
                700: "#0288d1",
                800: "#0277bd",
                900: "#01579b",
                A100: "#80d8ff",
                A200: "#40c4ff",
                A400: "#00b0ff",
                A700: "#0091ea",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "800 900 A700"
            },
            cyan: {
                50: "#e0f7fa",
                100: "#b2ebf2",
                200: "#80deea",
                300: "#4dd0e1",
                400: "#26c6da",
                500: "#00bcd4",
                600: "#00acc1",
                700: "#0097a7",
                800: "#00838f",
                900: "#006064",
                A100: "#84ffff",
                A200: "#18ffff",
                A400: "#00e5ff",
                A700: "#00b8d4",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "800 900"
            },
            teal: {
                50: "#e0f2f1",
                100: "#b2dfdb",
                200: "#80cbc4",
                300: "#4db6ac",
                400: "#26a69a",
                500: "#009688",
                600: "#00897b",
                700: "#00796b",
                800: "#00695c",
                900: "#004d40",
                A100: "#a7ffeb",
                A200: "#64ffda",
                A400: "#1de9b6",
                A700: "#00bfa5",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "600 700 800 900"
            },
            green: {
                50: "#e8f5e9",
                100: "#c8e6c9",
                200: "#a5d6a7",
                300: "#81c784",
                400: "#66bb6a",
                500: "#4caf50",
                600: "#43a047",
                700: "#388e3c",
                800: "#2e7d32",
                900: "#1b5e20",
                A100: "#b9f6ca",
                A200: "#69f0ae",
                A400: "#00e676",
                A700: "#00c853",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "700 800 900"
            },
            "light-green": {
                50: "#f1f8e9",
                100: "#dcedc8",
                200: "#c5e1a5",
                300: "#aed581",
                400: "#9ccc65",
                500: "#8bc34a",
                600: "#7cb342",
                700: "#689f38",
                800: "#558b2f",
                900: "#33691e",
                A100: "#ccff90",
                A200: "#b2ff59",
                A400: "#76ff03",
                A700: "#64dd17",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "800 900"
            },
            lime: {
                50: "#f9fbe7",
                100: "#f0f4c3",
                200: "#e6ee9c",
                300: "#dce775",
                400: "#d4e157",
                500: "#cddc39",
                600: "#c0ca33",
                700: "#afb42b",
                800: "#9e9d24",
                900: "#827717",
                A100: "#f4ff81",
                A200: "#eeff41",
                A400: "#c6ff00",
                A700: "#aeea00",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "900"
            },
            yellow: {
                50: "#fffde7",
                100: "#fff9c4",
                200: "#fff59d",
                300: "#fff176",
                400: "#ffee58",
                500: "#ffeb3b",
                600: "#fdd835",
                700: "#fbc02d",
                800: "#f9a825",
                900: "#f57f17",
                A100: "#ffff8d",
                A200: "#ffff00",
                A400: "#ffea00",
                A700: "#ffd600",
                contrastDefaultColor: "dark"
            },
            amber: {
                50: "#fff8e1",
                100: "#ffecb3",
                200: "#ffe082",
                300: "#ffd54f",
                400: "#ffca28",
                500: "#ffc107",
                600: "#ffb300",
                700: "#ffa000",
                800: "#ff8f00",
                900: "#ff6f00",
                A100: "#ffe57f",
                A200: "#ffd740",
                A400: "#ffc400",
                A700: "#ffab00",
                contrastDefaultColor: "dark"
            },
            orange: {
                50: "#fff3e0",
                100: "#ffe0b2",
                200: "#ffcc80",
                300: "#ffb74d",
                400: "#ffa726",
                500: "#ff9800",
                600: "#fb8c00",
                700: "#f57c00",
                800: "#ef6c00",
                900: "#e65100",
                A100: "#ffd180",
                A200: "#ffab40",
                A400: "#ff9100",
                A700: "#ff6d00",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "900"
            },
            "deep-orange": {
                50: "#fbe9e7",
                100: "#ffccbc",
                200: "#ffab91",
                300: "#ff8a65",
                400: "#ff7043",
                500: "#ff5722",
                600: "#f4511e",
                700: "#e64a19",
                800: "#d84315",
                900: "#bf360c",
                A100: "#ff9e80",
                A200: "#ff6e40",
                A400: "#ff3d00",
                A700: "#dd2c00",
                contrastDefaultColor: "dark",
                contrastStrongLightColors: "800 900 A400 A700"
            },
            brown: {
                50: "#efebe9",
                100: "#d7ccc8",
                200: "#bcaaa4",
                300: "#a1887f",
                400: "#8d6e63",
                500: "#795548",
                600: "#6d4c41",
                700: "#5d4037",
                800: "#4e342e",
                900: "#3e2723",
                A100: "#d7ccc8",
                A200: "#bcaaa4",
                A400: "#8d6e63",
                A700: "#5d4037",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 A100 A200",
                contrastStrongLightColors: "400 500 600 700 800 900 A400 A700"
            },
            grey: {
                50: "#fafafa",
                100: "#f5f5f5",
                200: "#eeeeee",
                300: "#e0e0e0",
                400: "#bdbdbd",
                500: "#9e9e9e",
                600: "#757575",
                700: "#616161",
                800: "#424242",
                900: "#212121",
                A100: "#ffffff",
                A200: "#000000",
                A400: "#303030",
                A700: "#616161",
                contrastDefaultColor: "dark",
                contrastLightColors: "700 800 900 A200 A400 A700",
                contrastStrongLightColors: "600"
            },
            "blue-grey": {
                50: "#eceff1",
                100: "#cfd8dc",
                200: "#b0bec5",
                300: "#90a4ae",
                400: "#78909c",
                500: "#607d8b",
                600: "#546e7a",
                700: "#455a64",
                800: "#37474f",
                900: "#263238",
                A100: "#cfd8dc",
                A200: "#b0bec5",
                A400: "#78909c",
                A700: "#455a64",
                contrastDefaultColor: "light",
                contrastDarkColors: "50 100 200 300 400 A100 A200 A400",
                contrastStrongLightColors: "500 600 700 800 900 A700"
            }
        }),
        function(v) {
            function e(e) {
                var t = !!document.querySelector("[md-themes-disabled]");
                e.disableTheming(t)
            }
            e.$inject = ["$mdThemingProvider"], n.$inject = ["$mdTheming", "$interpolate", "$parse", "$mdUtil", "$q", "$log"], o.$inject = ["$mdTheming"], t.$inject = ["$mdColorPalette", "$$mdMetaProvider"], r.$inject = ["$injector", "$mdTheming"], v.module("material.core.theming", ["material.core.theming.palette", "material.core.meta"]).directive("mdTheme", n).directive("mdThemable", o).directive("mdThemesDisabled", function() {
                return A.disableTheming = !0, {
                    restrict: "A",
                    priority: "900"
                }
            }).provider("$mdTheming", t).config(e).run(r);
            var p, s = {},
                l = {
                    name: "dark"
                },
                c = {
                    name: "light"
                },
                h = "1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)",
                f = "",
                m = x("rgba(0,0,0,0.87)"),
                u = x("rgba(255,255,255,0.87)"),
                b = x("rgb(255,255,255)"),
                g = ["primary", "accent", "warn", "background"],
                a = "primary",
                E = {
                    accent: {
                        default: "A200",
                        "hue-1": "A100",
                        "hue-2": "A400",
                        "hue-3": "A700"
                    },
                    background: {
                        default: "50",
                        "hue-1": "A100",
                        "hue-2": "100",
                        "hue-3": "300"
                    }
                },
                $ = {
                    background: {
                        default: "A400",
                        "hue-1": "800",
                        "hue-2": "900",
                        "hue-3": "A200"
                    }
                },
                M = {
                    icon: .54,
                    secondary: .54,
                    disabled: .38,
                    hint: .38,
                    divider: .12
                },
                y = {
                    icon: .87,
                    secondary: .7,
                    disabled: .5,
                    hint: .5,
                    divider: .12
                },
                C = {
                    icon: 1,
                    secondary: .7,
                    disabled: .5,
                    hint: .5,
                    divider: .12
                };
            g.forEach(function(e) {
                var t = {
                    default: "500",
                    "hue-1": "300",
                    "hue-2": "800",
                    "hue-3": "A100"
                };
                E[e] || (E[e] = t), $[e] || ($[e] = t)
            });
            var T = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "A100", "A200", "A400", "A700"],
                A = {
                    disableTheming: !1,
                    generateOnDemand: !1,
                    registeredStyles: [],
                    nonce: null
                };

            function t(e, i) {
                s.$inject = ["$rootScope", "$mdUtil", "$q", "$log"];
                var n, a = {},
                    m = !(p = {}),
                    u = "default";
                v.extend(p, e);
                var t = function(e) {
                    var t = (e = v.isObject(e) ? e : {}).theme || "default",
                        n = e.hue || "800",
                        o = p[e.palette] || p[a[t].colors[e.palette || "primary"].name],
                        r = v.isObject(o[n]) ? o[n].hex : o[n];
                    return "#" !== r.substr(0, 1) && (r = "#" + r),
                        function(e) {
                            var t = i.setMeta("theme-color", e),
                                n = i.setMeta("msapplication-navbutton-color", e);
                            return function() {
                                t(), n()
                            }
                        }(r)
                };
                return n = {
                    definePalette: function(e, t) {
                        return t = t || {}, p[e] = o(e, t), n
                    },
                    extendPalette: function(e, t) {
                        return o(e, v.extend({}, p[e] || {}, t))
                    },
                    theme: d,
                    configuration: function() {
                        return v.extend({}, A, {
                            defaultTheme: u,
                            alwaysWatchTheme: m,
                            registeredStyles: [].concat(A.registeredStyles)
                        })
                    },
                    disableTheming: function(e) {
                        A.disableTheming = v.isUndefined(e) || !!e
                    },
                    registerStyles: function(e) {
                        A.registeredStyles.push(e)
                    },
                    setNonce: function(e) {
                        A.nonce = e
                    },
                    generateThemesOnDemand: function(e) {
                        A.generateOnDemand = e
                    },
                    setDefaultTheme: function(e) {
                        u = e
                    },
                    alwaysWatchTheme: function(e) {
                        m = e
                    },
                    enableBrowserColor: t,
                    $get: s,
                    _LIGHT_DEFAULT_HUES: E,
                    _DARK_DEFAULT_HUES: $,
                    _PALETTES: p,
                    _THEMES: a,
                    _parseRules: w,
                    _rgba: N
                };

                function o(e, t) {
                    var n = T.filter(function(e) {
                        return !t[e]
                    });
                    if (n.length) throw new Error("Missing colors %1 in palette %2!".replace("%1", n.join(", ")).replace("%2", e));
                    return t
                }

                function d(e, t) {
                    if (a[e]) return a[e];
                    var n = "string" == typeof(t = t || "default") ? a[t] : t,
                        o = new r(e);
                    return n && v.forEach(n.colors, function(e, t) {
                        o.colors[t] = {
                            name: e.name,
                            hues: v.extend({}, e.hues)
                        }
                    }), a[e] = o
                }

                function r(e) {
                    var a = this;

                    function t(e) {
                        if ((e = 0 === arguments.length || !!e) !== a.isDark) {
                            a.isDark = e, a.foregroundPalette = a.isDark ? c : l, a.foregroundShadow = a.isDark ? h : f;
                            var t = a.isDark ? $ : E,
                                i = a.isDark ? E : $;
                            return v.forEach(t, function(e, t) {
                                var n = a.colors[t],
                                    o = i[t];
                                if (n)
                                    for (var r in n.hues) n.hues[r] === o[r] && (n.hues[r] = e[r])
                            }), a
                        }
                    }
                    a.name = e, a.colors = {}, (a.dark = t)(!1), g.forEach(function(o) {
                        var r = (a.isDark ? $ : E)[o];
                        a[o + "Palette"] = function(t, e) {
                            var n = a.colors[o] = {
                                name: t,
                                hues: v.extend({}, r, e)
                            };
                            return Object.keys(n.hues).forEach(function(e) {
                                if (!r[e]) throw new Error("Invalid hue name '%1' in theme %2's %3 color %4. Available hue names: %4".replace("%1", e).replace("%2", a.name).replace("%3", t).replace("%4", Object.keys(r).join(", ")))
                            }), Object.keys(n.hues).map(function(e) {
                                return n.hues[e]
                            }).forEach(function(e) {
                                if (-1 === T.indexOf(e)) throw new Error("Invalid hue value '%1' in theme %2's %3 color %4. Available hue values: %5".replace("%1", e).replace("%2", a.name).replace("%3", o).replace("%4", t).replace("%5", T.join(", ")))
                            }), a
                        }
                    })
                }

                function s(n, s, o, l) {
                    var r = function(e, t) {
                        t === ge && (t = e, e = ge), e === ge && (e = n), r.inherit(t, t)
                    };
                    return Object.defineProperty(r, "THEMES", {
                        get: function() {
                            return v.extend({}, a)
                        }
                    }), Object.defineProperty(r, "PALETTES", {
                        get: function() {
                            return v.extend({}, p)
                        }
                    }), Object.defineProperty(r, "ALWAYS_WATCH", {
                        get: function() {
                            return m
                        }
                    }), r.inherit = function(n, e) {
                        var o = e.controller("mdTheme") || n.data("$mdThemeController"),
                            t = n.scope();
                        if (d(o && o.$mdTheme || ("default" === u ? "" : u)), o) {
                            var r = m || o.$shouldWatch || s.parseAttributeBoolean(n.attr("md-theme-watch"));
                            if (r || o.isAsyncTheme) {
                                var i = function() {
                                        a && (a(), a = ge)
                                    },
                                    a = o.registerChanges(function(e) {
                                        d(e), r || i()
                                    });
                                t ? t.$on("$destroy", i) : n.on("$destroy", i)
                            }
                        }

                        function d(e) {
                            if (e) {
                                c(e) || l.warn("Attempted to use unregistered theme '" + e + "'. Register it with $mdThemingProvider.theme().");
                                var t = n.data("$mdThemeName");
                                t && n.removeClass("md-" + t + "-theme"), n.addClass("md-" + e + "-theme"), n.data("$mdThemeName", e), o && n.data("$mdThemeController", o)
                            }
                        }
                    }, r.registered = c, r.defaultTheme = function() {
                        return u
                    }, r.generateTheme = function(e) {
                        k(a[e], e, A.nonce)
                    }, r.defineTheme = function(e, t) {
                        t = t || {};
                        var n = d(e);
                        return t.primary && n.primaryPalette(t.primary, t.primaryHues), t.accent && n.accentPalette(t.accent, t.accentHues), t.warn && n.warnPalette(t.warn, t.warnHues), t.background && n.backgroundPalette(t.background, t.backgroundHues), t.dark && n.dark(), this.generateTheme(e), o.resolve(e)
                    }, r.setBrowserColor = t, r;

                    function c(e) {
                        return e === ge || "" === e || r.THEMES[e] !== ge
                    }
                }
            }

            function n(p, h, f, b, g, E) {
                return {
                    priority: 101,
                    link: {
                        pre: function(t, e, n) {
                            function o() {
                                var e = h(n.mdTheme)(t);
                                return f(e)(t) || e
                            }
                            var r = [],
                                i = h.startSymbol(),
                                a = h.endSymbol(),
                                d = n.mdTheme.trim(),
                                s = d.substr(0, i.length) === i && d.lastIndexOf(a) === d.length - a.length,
                                l = "::" === n.mdTheme.split(i).join("").split(a).join("").trim().substr(0, "::".length),
                                c = {
                                    isAsyncTheme: v.isFunction(o()) || v.isFunction(o().then),
                                    registerChanges: function(t, e) {
                                        return e && (t = v.bind(e, t)), r.push(t),
                                            function() {
                                                var e = r.indexOf(t); - 1 < e && r.splice(e, 1)
                                            }
                                    },
                                    $setTheme: function(e) {
                                        p.registered(e) || E.warn("attempted to use unregistered theme '" + e + "'"), c.$mdTheme = e;
                                        for (var t = r.length; t--;) r[t](e)
                                    },
                                    $shouldWatch: b.parseAttributeBoolean(e.attr("md-theme-watch")) || p.ALWAYS_WATCH || s && !l
                                };

                            function m(e) {
                                if ("string" == typeof e) return c.$setTheme(e);
                                g.when(v.isFunction(e) ? e() : e).then(function(e) {
                                    c.$setTheme(e)
                                })
                            }
                            e.data("$mdThemeController", c), m(o());
                            var u = t.$watch(o, function(e) {
                                e && (m(e), c.$shouldWatch || u())
                            })
                        }
                    }
                }
            }

            function o(e) {
                return e
            }

            function w(c, e, t) {
                ! function(e, t) {
                    if (!p[(e.colors[t] || {}).name]) throw new Error("You supplied an invalid color palette for theme %1's %2 palette. Available palettes: %3".replace("%1", e.name).replace("%2", t).replace("%3", Object.keys(p).join(", ")))
                }(c, e), t = t.replace(/THEME_NAME/g, c.name);
                var n = new RegExp("\\.md-" + c.name + "-theme", "g"),
                    o = new RegExp("(['\"])?{{\\s*([a-zA-Z]+)-?(color|default)?-?(contrast)?-?((?:\\d\\.?\\d*)|(?:[a-zA-Z]+))?\\s*}}([\"'])?", "g"),
                    r = c.colors.background.hues.default,
                    d = p[c.colors.background.name][r].contrastType;
                t = t.replace(/'?"?{{\s*([a-zA-Z]+)-(A?\d+|hue-[0-3]|shadow|default)-?(contrast)?-?((?:\d\.?\d*)|(?:[a-zA-Z]+))?\s*}}'?"?/g, function(e, t, n, o, r) {
                    var i = t;
                    if ("foreground" === t) {
                        if ("shadow" === n) return c.foregroundShadow;
                        if (c.foregroundPalette[n]) return N(x(c.foregroundPalette[n]));
                        if (c.foregroundPalette[1]) return N(x(c.foregroundPalette[1]));
                        if (t = "background", o = "contrast", !r && n) switch (n) {
                            case "2":
                                r = "secondary";
                                break;
                            case "3":
                                r = "disabled";
                                break;
                            case "4":
                                r = "divider"
                        }
                        n = "default"
                    }
                    0 !== n.indexOf("hue") && "default" !== n || (n = c.colors[t].hues[n]);
                    var a = p[c.colors[t].name][n] || "";
                    if ("background" === t && o && "foreground" !== i && a.contrastType === d) switch (r) {
                        case "secondary":
                        case "icon":
                            if (c.foregroundPalette[2]) return N(x(c.foregroundPalette[2]));
                            break;
                        case "disabled":
                        case "hint":
                            if (c.foregroundPalette[3]) return N(x(c.foregroundPalette[3]));
                            break;
                        case "divider":
                            if (c.foregroundPalette[4]) return N(x(c.foregroundPalette[4]));
                            break;
                        default:
                            if (c.foregroundPalette[1]) return N(x(c.foregroundPalette[1]))
                    }
                    return o && r && (r = a.opacity[r] || r), N(a[o ? "contrast" : "value"], r)
                });
                var i = [];
                return v.forEach(["default", "hue-1", "hue-2", "hue-3"], function(l) {
                    var e = t.replace(o, function(e, t, n, o, r, i) {
                        var a = c.colors[n],
                            d = p[a.name],
                            s = a.hues[l];
                        return r && i && (i = d[s].opacity[i] || i), N(d[s]["color" === o ? "value" : "contrast"], i)
                    });
                    "default" !== l && (e = e.replace(n, ".md-" + c.name + "-theme.md-" + l)), "default" === c.name && (e = e.replace(/((?:\s|>|\.|\w|-|:|\(|\)|\[|]|"|'|=)*)\.md-default-theme((?:\s|>|\.|\w|-|:|\(|\)|\[|]|"|'|=)*)/g, function(e, t, n) {
                        return e + ", " + t + n
                    })), i.push(e)
                }), i
            }
            var _ = {};

            function r(e, t) {
                var n = document.head,
                    o = n ? n.firstElementChild : null,
                    r = !A.disableTheming && e.has("$MD_THEME_CSS") ? e.get("$MD_THEME_CSS") : "";
                if (r += A.registeredStyles.join(""), o && 0 !== r.length) {
                    v.forEach(p, function(r) {
                        var i = r.contrastDefaultColor,
                            a = r.contrastLightColors || [],
                            d = r.contrastStrongLightColors || [],
                            s = r.contrastDarkColors || [];
                        "string" == typeof a && (a = a.split(" ")), "string" == typeof d && (d = d.split(" ")), "string" == typeof s && (s = s.split(" ")), delete r.contrastDefaultColor, delete r.contrastLightColors, delete r.contrastStrongLightColors, delete r.contrastDarkColors, v.forEach(r, function(e, t) {
                            if (!v.isObject(e)) {
                                var n = x(e);
                                if (!n) throw new Error("Color %1, in palette %2's hue %3, is invalid. Hex or rgb(a) color expected.".replace("%1", e).replace("%2", r.name).replace("%3", t));
                                var o = function(e) {
                                    return ("light" === i ? -1 !== s.indexOf(e) : -1 === a.indexOf(e) && -1 === d.indexOf(e)) ? "dark" : -1 !== d.indexOf(e) ? "strongLight" : "light"
                                }(t);
                                r[t] = {
                                    hex: r[t],
                                    value: n,
                                    contrastType: o,
                                    contrast: function(e) {
                                        switch (e) {
                                            default:
                                            case "strongLight":
                                                return b;
                                            case "light":
                                                return u;
                                            case "dark":
                                                return m
                                        }
                                    }(o),
                                    opacity: function(e) {
                                        switch (e) {
                                            default:
                                            case "strongLight":
                                                return C;
                                            case "light":
                                                return y;
                                            case "dark":
                                                return M
                                        }
                                    }(o)
                                }
                            }
                        })
                    });
                    var i = function(e) {
                        for (var t = [], n = "", o = 0, r = 0, i = 0; i < e.length; i++) {
                            var a = e.charAt(i);
                            if ("'" === a || '"' === a) {
                                var d = e.substring(i, e.indexOf(a, i + 1));
                                n += d, i += d.length
                            } else n += a, "}" === a ? ++r === o && (o = r = 0, t.push(n), n = "") : "{" === a && o++
                        }
                        return "" !== n && t.push(n), t
                    }(r).map(function(e) {
                        return e.trim()
                    });
                    g.forEach(function(e) {
                        _[e] = ""
                    }), i.forEach(function(e) {
                        for (var t, n = 0; t = g[n]; n++)
                            if (-1 < e.indexOf(".md-" + t)) return _[t] += e;
                        for (n = 0; t = g[n]; n++)
                            if (-1 < e.indexOf(t)) return _[t] += e;
                        return _[a] += e
                    }), A.generateOnDemand || v.forEach(t.THEMES, function(e) {
                        s[e.name] || "default" !== t.defaultTheme() && "default" === e.name || k(e, e.name, A.nonce)
                    })
                }
            }

            function k(r, e, i) {
                var a = document.head,
                    d = a ? a.firstElementChild : null;
                s[e] || (g.forEach(function(e) {
                    for (var t = w(r, e, _[e]); t.length;) {
                        var n = t.shift();
                        if (n) {
                            var o = document.createElement("style");
                            o.setAttribute("md-theme-style", ""), i && o.setAttribute("nonce", i), o.appendChild(document.createTextNode(n)), a.insertBefore(o, d)
                        }
                    }
                }), s[r.name] = !0)
            }

            function x(e) {
                if (v.isArray(e) && 3 === e.length) return e;
                if (/^rgb/.test(e)) return e.replace(/(^\s*rgba?\(|\)\s*$)/g, "").split(",").map(function(e, t) {
                    return 3 === t ? parseFloat(e) : parseInt(e, 10)
                });
                if ("#" === e.charAt(0) && (e = e.substring(1)), /^([a-fA-F0-9]{3}){1,2}$/g.test(e)) {
                    var t = e.length / 3,
                        n = e.substr(0, t),
                        o = e.substr(t, t),
                        r = e.substr(2 * t);
                    return 1 == t && (n += n, o += o, r += r), [parseInt(n, 16), parseInt(o, 16), parseInt(r, 16)]
                }
            }

            function N(e, t) {
                return e ? (4 === e.length && (e = v.copy(e), t ? e.pop() : t = e.pop()), t && ("number" == typeof t || "string" == typeof t && t.length) ? "rgba(" + e.join(",") + "," + t + ")" : "rgb(" + e.join(",") + ")") : "rgb('0,0,0')"
            }
        }(L.angular), be.module("material.components.autocomplete", ["material.core", "material.components.icon", "material.components.virtualRepeat"]),
        function() {
            e.$inject = ["$scope", "$element", "$mdUtil", "$mdConstant", "$mdTheming", "$window", "$animate", "$rootElement", "$attrs", "$q", "$log", "$mdLiveAnnouncer"], be.module("material.components.autocomplete").controller("MdAutocompleteCtrl", e);
            var ce = 48,
                me = 5,
                ue = 8,
                pe = 2,
                he = "standard",
                fe = "virtual";

            function e(p, h, f, t, e, n, o, r, b, a, i, d) {
                var s, l, c, m = this,
                    u = p.itemsExpr.split(/ in /i),
                    g = u[1],
                    E = null,
                    v = {},
                    $ = !1,
                    M = [],
                    y = !1,
                    C = 0,
                    T = null,
                    A = null,
                    w = f.debounce(function() {
                        m.hidden || S()
                    }),
                    _ = fe;
                m.documentElement = be.element(document.documentElement), s = "hidden", l = function(e, t) {
                    var n;
                    E && (n = be.element(E.scrollContainer));
                    !e && t ? (S(), oe(!0, x.Count | x.Selected), E && (f.disableScrollAround(E.scrollContainer), T = function(e) {
                        var t = be.element(e);
                        return t.on("wheel touchmove", O),
                            function() {
                                t.off("wheel touchmove", O)
                            }
                    }(E.wrap), f.isIos && (m.documentElement.on("touchend", L), n && n.on("touchstart touchmove touchend", P)), m.index = V(), f.nextTick(function() {
                        H(), re()
                    }))) : e && !t && (f.isIos && (m.documentElement.off("touchend", L), n && n.off("touchstart touchmove touchend", P)), f.enableScrolling(), T && (T(), T = null))
                }, c = !0, Object.defineProperty(m, s, {
                    get: function() {
                        return c
                    },
                    set: function(e) {
                        var t = c;
                        l(c = e, t)
                    }
                }), m.scope = p, m.parent = p.$parent, m.itemName = u[0], m.matches = [], m.loading = !1, m.hidden = !0, m.index = -1, m.activeOption = null, m.id = f.nextUid(), m.isDisabled = null, m.isRequired = null, m.isReadonly = null, m.hasNotFound = !1, m.selectedMessage = p.selectedMessage || "selected", m.noMatchMessage = p.noMatchMessage || "There are no matches available.", m.singleMatchMessage = p.singleMatchMessage || "There is 1 match available.", m.multipleMatchStartMessage = p.multipleMatchStartMessage || "There are ", m.multipleMatchEndMessage = p.multipleMatchEndMessage || " matches available.", m.defaultEscapeOptions = "clear", m.keydown = function(e) {
                    switch (e.keyCode) {
                        case t.KEY_CODE.DOWN_ARROW:
                            if (m.loading || Z()) return;
                            e.stopPropagation(), e.preventDefault(), m.index = m.index + 1 > m.matches.length - 1 ? 0 : Math.min(m.index + 1, m.matches.length - 1), f.nextTick(H), re();
                            break;
                        case t.KEY_CODE.UP_ARROW:
                            if (m.loading || Z()) return;
                            e.stopPropagation(), e.preventDefault(), m.index = m.index - 1 < 0 ? m.matches.length - 1 : Math.max(0, m.index - 1), f.nextTick(H), re();
                            break;
                        case t.KEY_CODE.TAB:
                            if (R(), m.hidden || m.loading || m.index < 0 || m.matches.length < 1) return;
                            ee(m.index);
                            break;
                        case t.KEY_CODE.ENTER:
                            if (m.hidden || m.loading || m.index < 0 || m.matches.length < 1) return;
                            if (Z()) return;
                            e.stopImmediatePropagation(), e.preventDefault(), ee(m.index);
                            break;
                        case t.KEY_CODE.ESCAPE:
                            if (e.preventDefault(), !(G("blur") || !m.hidden || m.loading || G("clear") && p.searchText)) return;
                            e.stopPropagation(), te(), p.searchText && G("clear") && ne(), m.hidden = !0, G("blur") && U(!0)
                    }
                }, m.blur = function(e) {
                    y = !1, $ ? be.isObject(e) && e.stopImmediatePropagation() : (m.hidden = Y(), le("ngBlur", {
                        $event: e
                    }))
                }, m.focus = function(e) {
                    y = !0, K() && J() && de();
                    m.hidden = Y(), le("ngFocus", {
                        $event: e
                    })
                }, m.clear = function(e) {
                    e && e.stopPropagation();
                    te(), ne()
                }, m.select = ee, m.listEnter = function() {
                    $ = !0
                }, m.listLeave = R, m.focusInput = D, m.getCurrentDisplayValue = Q, m.registerSelectedItemWatcher = function(e) {
                    -1 === M.indexOf(e) && M.push(e)
                }, m.unregisterSelectedItemWatcher = function(e) {
                    var t = M.indexOf(e); - 1 !== t && M.splice(t, 1)
                }, m.notFoundVisible = ae, m.loadingIsVisible = function() {
                    return m.loading && !Z()
                }, m.positionDropdown = S;
                var k, x = {
                    Count: 1,
                    Selected: 2
                };
                return f.initOptionalProperties(p, b, {
                    searchText: "",
                    selectedItem: null,
                    clearButton: !1,
                    disableVirtualRepeat: !1
                }), e(h), k = parseInt(p.delay, 10) || 0, b.$observe("disabled", function(e) {
                    m.isDisabled = f.parseAttributeBoolean(e, !1)
                }), b.$observe("required", function(e) {
                    m.isRequired = f.parseAttributeBoolean(e, !1)
                }), b.$observe("readonly", function(e) {
                    m.isReadonly = f.parseAttributeBoolean(e, !1)
                }), p.$watch("searchText", k ? f.debounce(B, k) : B), p.$watch("selectedItem", F), be.element(n).on("resize", w), void p.$on("$destroy", I), void f.nextTick(function() {
                    ! function() {
                        var e = function() {
                            var e, t;
                            for (e = h; e.length && (t = e.attr("md-autocomplete-snap"), !be.isDefined(t)); e = e.parent());
                            if (e.length) return {
                                snap: e[0],
                                wrap: "width" === t.toLowerCase() ? e[0] : h.find("md-autocomplete-wrap")[0]
                            };
                            var n = h.find("md-autocomplete-wrap")[0];
                            return {
                                snap: n,
                                wrap: n
                            }
                        }();
                        (E = {
                            main: h[0],
                            scrollContainer: h[0].querySelector(".md-virtual-repeat-container, .md-standard-list-container"),
                            scroller: h[0].querySelector(".md-virtual-repeat-scroller, .md-standard-list-scroller"),
                            ul: h.find("ul")[0],
                            input: h.find("input")[0],
                            wrap: e.wrap,
                            snap: e.snap,
                            root: document.body
                        }).li = E.ul.getElementsByTagName("li"), E.$ = function(e) {
                            var t = {};
                            for (var n in e) e.hasOwnProperty(n) && (t[n] = be.element(e[n]));
                            return t
                        }(E), _ = E.scrollContainer.classList.contains("md-standard-list-container") ? he : fe, A = E.$.input.controller("ngModel")
                    }(), E.$.root.length && (e(E.$.scrollContainer), E.$.scrollContainer.detach(), E.$.root.append(E.$.scrollContainer), o.pin && o.pin(E.$.scrollContainer, r)), h.on("touchstart", D), p.autofocus && h.on("focus", D), p.inputAriaDescribedBy && E.input.setAttribute("aria-describedby", p.inputAriaDescribedBy), p.floatingLabel || (p.inputAriaLabel ? E.input.setAttribute("aria-label", p.inputAriaLabel) : p.inputAriaLabelledBy ? E.input.setAttribute("aria-labelledby", p.inputAriaLabelledBy) : p.placeholder && E.input.setAttribute("aria-label", p.placeholder))
                });

                function N() {
                    p.requireMatch && A && A.$setValidity("md-require-match", !!p.selectedItem || !p.searchText)
                }

                function S() {
                    if (!E) return f.nextTick(S, !1, p);
                    var e, t = (p.dropdownItems || me) * ce,
                        n = E.wrap.getBoundingClientRect(),
                        o = E.snap.getBoundingClientRect(),
                        r = E.root.getBoundingClientRect(),
                        i = o.bottom - r.top,
                        a = r.bottom - o.top,
                        d = n.left - r.left,
                        s = n.width,
                        l = function() {
                            var e = 0,
                                t = h.find("md-input-container");
                            if (t.length) {
                                var n = t.find("input");
                                e = t.prop("offsetHeight"), e -= n.prop("offsetTop"), e -= n.prop("offsetHeight"), e += t.prop("offsetTop")
                            }
                            return e
                        }(),
                        c = p.dropdownPosition,
                        m = r.bottom - o.bottom - ue + f.getViewportTop(),
                        u = o.top - ue;
                    c = c || (t < m ? "bottom" : t < u ? "top" : m < u ? "top" : "bottom"), b.mdFloatingLabel && (d += pe, s -= 2 * pe), e = {
                        left: d + "px",
                        minWidth: s + "px",
                        maxWidth: Math.max(n.right - r.left, r.right - n.left) - ue + "px"
                    }, "top" === c ? (e.top = "auto", e.bottom = a + "px", e.maxHeight = Math.min(t, u) + "px") : (m = r.bottom - n.bottom - ue + f.getViewportTop(), e.top = i - l + "px", e.bottom = "auto", e.maxHeight = Math.min(t, m) + "px"), E.$.scrollContainer.css(e), f.nextTick(function() {
                        var e = E.scrollContainer.getBoundingClientRect(),
                            t = {};
                        e.right > r.right && (t.left = n.right - e.width + "px");
                        E.$.scrollContainer.css(t)
                    }, !1, p)
                }

                function D() {
                    E.input.focus()
                }

                function H() {
                    var e = E.scroller.querySelector(".selected");
                    m.activeOption = e ? e.id : null
                }

                function I() {
                    if (m.hidden || f.enableScrolling(), be.element(n).off("resize", w), E) {
                        be.forEach(["ul", "scroller", "scrollContainer", "input"], function(e) {
                            E.$[e].remove()
                        })
                    }
                }

                function O(e) {
                    e.preventDefault()
                }

                function P(e) {
                    e.stopPropagation()
                }

                function L(e) {
                    U(m.hidden = !0)
                }

                function R() {
                    y || m.hidden || E.input.focus(), $ = !1, m.hidden = Y()
                }

                function F(t, n) {
                    N(), t ? z(t).then(function(e) {
                        p.searchText = e,
                            function(t, n) {
                                M.forEach(function(e) {
                                    e(t, n)
                                })
                            }(t, n)
                    }) : n && p.searchText && z(n).then(function(e) {
                        be.isString(p.searchText) && e.toString().toLowerCase() === p.searchText.toLowerCase() && (p.searchText = "")
                    }), t !== n && be.isFunction(p.itemChange) && p.itemChange(q(p.selectedItem))
                }

                function B(t, n) {
                    m.index = V(), t !== n && (N(), z(p.selectedItem).then(function(e) {
                        t !== e && (p.selectedItem = null, t !== n && be.isFunction(p.textChange) && p.textChange(), J() ? de() : (W(!(m.matches = [])), oe(!0, x.Count)))
                    }))
                }

                function U(e) {
                    e && (y = $ = !1), E.input.blur()
                }

                function j() {
                    return be.isNumber(p.minLength) ? p.minLength : 1
                }

                function z(e) {
                    return a.when(((t = e) && p.itemText ? p.itemText(q(t)) : null) || e).then(function(e) {
                        return e && !be.isString(e) && i.warn("md-autocomplete: Could not resolve display value to a string. Please check the `md-item-text` attribute."), e
                    });
                    var t
                }

                function q(e) {
                    if (!e) return ge;
                    var t = {};
                    return m.itemName && (t[m.itemName] = e), t
                }

                function V() {
                    return p.autoselect ? 0 : -1
                }

                function W(e) {
                    m.loading !== e && (m.loading = e), m.hidden = Y()
                }

                function Y() {
                    return ! function() {
                        {
                            if (m.isReadonly) return !1;
                            if (!K()) return !1
                        }
                        return J() && X() || ae()
                    }()
                }

                function K() {
                    return !(m.loading && !X()) && (!Z() && !!y)
                }

                function G(e) {
                    return be.isString(p.escapeOptions) ? -1 !== p.escapeOptions.toLowerCase().indexOf(e) : -1 !== m.defaultEscapeOptions.indexOf(e)
                }

                function X() {
                    return !!m.matches.length
                }

                function Z() {
                    return !!m.scope.selectedItem
                }

                function Q() {
                    return z(m.matches[m.index])
                }

                function J() {
                    return (p.searchText || "").length >= j()
                }

                function ee(e) {
                    f.nextTick(function() {
                        z(m.matches[e]).then(function(e) {
                            var t = E.$.input.controller("ngModel");
                            d.announce(e + " " + m.selectedMessage, "assertive"), t.$setViewValue(e), t.$render()
                        }).finally(function() {
                            p.selectedItem = m.matches[e], W(!1)
                        })
                    }, !1)
                }

                function te() {
                    m.index = -1, f.nextTick(H), m.matches = []
                }

                function ne() {
                    W(!0), p.searchText = "";
                    var e = document.createEvent("CustomEvent");
                    e.initCustomEvent("change", !0, !0, {
                        value: ""
                    }), E.input.dispatchEvent(e), E.input.blur(), p.searchText = "", E.input.focus()
                }

                function oe(e, t) {
                    var n = e ? "polite" : "assertive",
                        o = [];
                    t & x.Selected && -1 !== m.index && o.push(Q()), t & x.Count && o.push(a.resolve(function() {
                        switch (m.matches.length) {
                            case 0:
                                return m.noMatchMessage;
                            case 1:
                                return m.singleMatchMessage;
                            default:
                                return m.multipleMatchStartMessage + m.matches.length + m.multipleMatchEndMessage
                        }
                    }())), a.all(o).then(function(e) {
                        d.announce(e.join(" "), n)
                    })
                }

                function re() {
                    E.li[0] && (_ === he ? function() {
                        var e = E.li[Math.max(0, m.index)],
                            t = E.scrollContainer.offsetHeight,
                            n = e && e.offsetTop || 0,
                            o = n + e.clientHeight,
                            r = E.scrollContainer.scrollTop;
                        n < r ? ie(n) : r + t < o && ie(o - t)
                    }() : function() {
                        var e = E.li[0].offsetHeight,
                            t = e * Math.max(0, m.index),
                            n = t + e,
                            o = E.scroller.clientHeight,
                            r = E.scroller.scrollTop;
                        t < r ? ie(t) : r + o < n && ie(n - o)
                    }())
                }

                function ie(e) {
                    _ === he ? E.scrollContainer.scrollTop = e : E.$.scrollContainer.controller("mdVirtualRepeatContainer").scrollTo(e)
                }

                function ae() {
                    var e = (m.scope.searchText || "").length;
                    return m.hasNotFound && !X() && (!m.loading || 0 !== C) && e >= j() && (y || $) && !Z()
                }

                function de() {
                    var e = p.searchText || "",
                        t = e.toLowerCase();
                    !p.noCache && v[t] ? se(v[t]) : function(t) {
                        var e = p.$parent.$eval(g),
                            n = t.toLowerCase(),
                            o = be.isArray(e),
                            r = !!e.then;

                        function i(e) {
                            v[n] = e, (t || "") === (p.searchText || "") && se(e)
                        }
                        o ? i(e) : r && function(e) {
                            if (!e) return;
                            e = a.when(e), C++, W(!0), f.nextTick(function() {
                                e.then(i).finally(function() {
                                    0 == --C && W(!1)
                                })
                            }, !0, p)
                        }(e)
                    }(e), m.hidden = Y()
                }

                function se(e) {
                    m.matches = e, m.hidden = Y(), m.loading && W(!1), p.selectOnMatch && function() {
                        var n = p.searchText,
                            e = m.matches,
                            t = e[0];
                        1 === e.length && z(t).then(function(e) {
                            var t = n === e;
                            p.matchInsensitive && !t && (t = n.toLowerCase() === e.toLowerCase()), t && ee(0)
                        })
                    }(), S(), oe(!0, x.Count)
                }

                function le(e, t) {
                    b[e] && p.$parent.$eval(b[e], t || {})
                }
            }
        }(), Z.$inject = ["$$mdSvgRegistry"], be.module("material.components.autocomplete").directive("mdAutocomplete", Z), Q.$inject = ["$compile", "$mdUtil"], be.module("material.components.autocomplete").directive("mdAutocompleteParentScope", Q), J.$inject = ["$scope", "$element", "$attrs", "$mdUtil"], be.module("material.components.autocomplete").controller("MdHighlightCtrl", J), J.prototype.init = function(t, n) {
            this.flags = this.$attrs.mdHighlightFlags || "", this.unregisterFn = this.$scope.$watch(function(e) {
                return {
                    term: t(e),
                    contentText: n(e)
                }
            }.bind(this), this.onRender.bind(this), !0), this.$element.on("$destroy", this.unregisterFn)
        }, J.prototype.onRender = function(e, t) {
            var n = e.contentText;
            null !== this.regex && e.term === t.term || (this.regex = this.createRegex(e.term, this.flags)), e.term ? this.applyRegex(n) : this.$element.text(n)
        }, J.prototype.applyRegex = function(e) {
            var t = this.resolveTokens(e);
            this.$element.empty(), t.forEach(function(e) {
                if (e.isMatch) {
                    var t = be.element('<span class="highlight">').text(e.text);
                    this.$element.append(t)
                } else this.$element.append(document.createTextNode(e))
            }.bind(this))
        }, J.prototype.resolveTokens = function(o) {
            var r = [],
                n = 0;
            return o.replace(this.regex, function(e, t) {
                i(n, t), r.push({
                    text: e,
                    isMatch: !0
                }), n = t + e.length
            }), i(n), r;

            function i(e, t) {
                var n = o.slice(e, t);
                n && r.push(n)
            }
        }, J.prototype.createRegex = function(e, t) {
            var n = "",
                o = "",
                r = this.$mdUtil.sanitize(e);
            return 0 <= t.indexOf("^") && (n = "^"), 0 <= t.indexOf("$") && (o = "$"), new RegExp(n + r + o, t.replace(/[$^]/g, ""))
        }, ee.$inject = ["$interpolate", "$parse"], be.module("material.components.autocomplete").directive("mdHighlightText", ee), be.module("material.components.backdrop", ["material.core"]).directive("mdBackdrop", ["$mdTheming", "$mdUtil", "$animate", "$rootElement", "$window", "$log", "$$rAF", "$document", function(a, d, t, s, l, c, m, u) {
            return {
                restrict: "E",
                link: function(n, o, e) {
                    var r;

                    function i() {
                        var e = parseInt(r.height, 10) + Math.abs(parseInt(r.top, 10));
                        o.css("height", e + "px")
                    }
                    t.pin && t.pin(o, s), m(function() {
                        if ("fixed" === (r = l.getComputedStyle(u[0].body)).position) {
                            var e = d.debounce(function() {
                                r = l.getComputedStyle(u[0].body), i()
                            }, 60, null, !1);
                            i(), be.element(l).on("resize", e), n.$on("$destroy", function() {
                                be.element(l).off("resize", e)
                            })
                        }
                        var t = o.parent();
                        t.length && ("BODY" === t[0].nodeName && o.css("position", "fixed"), "static" === l.getComputedStyle(t[0]).position && c.warn("<md-backdrop> may not work properly in a scrolled, static-positioned parent container."), a.inherit(o, t))
                    })
                }
            }
        }]), te.$inject = ["$mdBottomSheet"], ne.$inject = ["$$interimElementProvider"], be.module("material.components.bottomSheet", ["material.core", "material.components.backdrop"]).directive("mdBottomSheet", te).provider("$mdBottomSheet", ne), re.$inject = ["$mdButtonInkRipple", "$mdTheming", "$mdAria", "$mdInteraction"], oe.$inject = ["$mdTheming"], be.module("material.components.button", ["material.core"]).directive("mdButton", re).directive("a", oe), ie.$inject = ["$mdTheming"], be.module("material.components.card", ["material.core"]).directive("mdCard", ie), ae.$inject = ["inputDirective", "$mdAria", "$mdConstant", "$mdTheming", "$mdUtil", "$mdInteraction"], be.module("material.components.checkbox", ["material.core"]).directive("mdCheckbox", ae), be.module("material.components.chips", ["material.core", "material.components.autocomplete"]), de.$inject = ["$scope", "$element", "$mdConstant", "$timeout", "$mdUtil"], be.module("material.components.chips").controller("MdChipCtrl", de), de.prototype.init = function(e) {
            this.parentController = e, this.enableChipEdit = this.parentController.enableChipEdit, this.enableChipEdit && (this.$element.on("keydown", this.chipKeyDown.bind(this)), this.$element.on("dblclick", this.chipMouseDoubleClick.bind(this)), this.getChipContent().addClass("_md-chip-content-edit-is-enabled"))
        }, de.prototype.getChipContent = function() {
            var e = this.$element[0].getElementsByClassName("md-chip-content");
            return be.element(e[0])
        }, de.prototype.getContentElement = function() {
            var e = be.element(this.getChipContent().children()[0]);
            return e && 0 !== e.length || (e = be.element(this.getChipContent().contents()[0])), e
        }, de.prototype.getChipIndex = function() {
            return parseInt(this.$element.attr("index"))
        }, de.prototype.goOutOfEditMode = function() {
            if (this.isEditing) {
                this.isEditing = !1, this.$element.removeClass("_md-chip-editing"), this.getChipContent()[0].contentEditable = "false";
                var e = this.getChipIndex(),
                    t = this.getContentElement().text();
                t ? (this.parentController.updateChipContents(e, t), this.$mdUtil.nextTick(function() {
                    this.parentController.selectedChip === e && this.parentController.focusChip(e)
                }.bind(this))) : this.parentController.removeChipAndFocusInput(e)
            }
        }, de.prototype.selectNodeContents = function(e) {
            var t, n;
            document.body.createTextRange ? ((t = document.body.createTextRange()).moveToElementText(e), t.select()) : L.getSelection && (n = L.getSelection(), (t = document.createRange()).selectNodeContents(e), n.removeAllRanges(), n.addRange(t))
        }, de.prototype.goInEditMode = function() {
            this.isEditing = !0, this.$element.addClass("_md-chip-editing"), this.getChipContent()[0].contentEditable = "true", this.getChipContent().on("blur", function() {
                this.goOutOfEditMode()
            }.bind(this)), this.selectNodeContents(this.getChipContent()[0])
        }, de.prototype.chipKeyDown = function(e) {
            this.isEditing || e.keyCode !== this.$mdConstant.KEY_CODE.ENTER && e.keyCode !== this.$mdConstant.KEY_CODE.SPACE ? this.isEditing && e.keyCode === this.$mdConstant.KEY_CODE.ENTER && (e.preventDefault(), this.goOutOfEditMode()) : (e.preventDefault(), this.goInEditMode())
        }, de.prototype.chipMouseDoubleClick = function() {
            this.enableChipEdit && !this.isEditing && this.goInEditMode()
        }, se.$inject = ["$mdTheming", "$mdUtil", "$compile", "$timeout"], be.module("material.components.chips").directive("mdChip", se), le.$inject = ["$timeout"], be.module("material.components.chips").directive("mdChipRemove", le), ce.$inject = ["$compile"], be.module("material.components.chips").directive("mdChipTransclude", ce),
        function() {
            e.$inject = ["$scope", "$attrs", "$mdConstant", "$log", "$element", "$timeout", "$mdUtil", "$mdLiveAnnouncer", "$exceptionHandler"];
            var l = 300;

            function e(e, t, n, o, r, i, a, d, s) {
                this.$timeout = i, this.$mdConstant = n, this.$scope = e, this.parent = e.$parent, this.$mdUtil = a, this.$log = o, this.$mdLiveAnnouncer = d, this.$exceptionHandler = s, this.$element = r, this.$attrs = t, this.ngModelCtrl = null, this.userInputNgModelCtrl = null, this.autocompleteCtrl = null, this.userInputElement = null, this.items = [], this.selectedChip = -1, this.enableChipEdit = a.parseAttributeBoolean(t.mdEnableChipEdit), this.addOnBlur = a.parseAttributeBoolean(t.mdAddOnBlur), this.inputClass = "", this.inputAriaLabel = "Chips input.", this.containerHint = "Chips container. Use arrow keys to select chips.", this.containerEmptyHint = "Chips container. Enter the text area, then type text, and press enter to add a chip.", this.deleteHint = "Press delete to remove this chip.", this.deleteButtonLabel = "Remove", this.chipBuffer = "", this.useTransformChip = !1, this.useOnAdd = !1, this.useOnRemove = !1, this.wrapperId = "", this.contentIds = [], this.ariaTabIndex = null, this.chipAppendDelay = l, this.deRegister = [], this.addedMessage = "added", this.removedMessage = "removed", this.init()
            }
            be.module("material.components.chips").controller("MdChipsCtrl", e), e.prototype.init = function() {
                var t = this;
                this.wrapperId = "_md-chips-wrapper-" + this.$mdUtil.nextUid(), this.$element.attr("ng-model") || this.setupStaticChips(), this.deRegister.push(this.$scope.$watchCollection("$mdChipsCtrl.items", function() {
                    t.setupInputAria(), t.setupWrapperAria()
                })), this.deRegister.push(this.$attrs.$observe("mdChipAppendDelay", function(e) {
                    t.chipAppendDelay = parseInt(e) || l
                }))
            }, e.prototype.$onDestroy = function() {
                for (var e; e = this.deRegister.pop();) e.call(this)
            }, e.prototype.setupInputAria = function() {
                var e = this.$element.find("input");
                e && (e.attr("role", "textbox"), e.attr("aria-multiline", !0), this.inputAriaDescribedBy && e.attr("aria-describedby", this.inputAriaDescribedBy), this.inputAriaLabelledBy ? (e.attr("aria-labelledby", this.inputAriaLabelledBy), e.removeAttr("aria-label")) : e.attr("aria-label", this.inputAriaLabel))
            }, e.prototype.setupWrapperAria = function() {
                var e = this,
                    t = this.$element.find("md-chips-wrap");
                this.items && this.items.length ? (t.attr("role", "listbox"), this.contentIds = this.items.map(function() {
                    return e.wrapperId + "-chip-" + e.$mdUtil.nextUid()
                }), t.attr("aria-owns", this.contentIds.join(" ")), t.attr("aria-label", this.containerHint)) : (t.removeAttr("role"), t.removeAttr("aria-owns"), t.attr("aria-label", this.containerEmptyHint))
            }, e.prototype.setupStaticChips = function() {
                var e, t, n = this,
                    o = this.$element.find("md-chips-wrap");
                this.$timeout(function() {
                    for (o.attr("role", "list"), t = o[0].children, e = 0; e < t.length; e++) t[e].setAttribute("role", "listitem"), t[e].setAttribute("aria-setsize", t.length);
                    n.inputAriaDescribedBy && o.attr("aria-describedby", n.inputAriaDescribedBy), n.inputAriaLabelledBy ? (o.attr("aria-labelledby", n.inputAriaLabelledBy), o.removeAttr("aria-label")) : o.attr("aria-label", n.inputAriaLabel)
                }, 10)
            }, e.prototype.inputKeydown = function(e) {
                var t = this.getChipBuffer();
                if (!(this.autocompleteCtrl && e.isDefaultPrevented && e.isDefaultPrevented())) {
                    if (e.keyCode === this.$mdConstant.KEY_CODE.BACKSPACE) {
                        if (0 !== this.getCursorPosition(e.target)) return;
                        return e.preventDefault(), e.stopPropagation(), void(this.items.length && this.selectAndFocusChipSafe(this.items.length - 1))
                    }
                    if ((!this.separatorKeys || this.separatorKeys.length < 1) && (this.separatorKeys = [this.$mdConstant.KEY_CODE.ENTER]), -1 !== this.separatorKeys.indexOf(e.keyCode)) {
                        if (this.autocompleteCtrl && this.requireMatch || !t) return;
                        if (e.preventDefault(), this.hasMaxChipsReached()) return;
                        return this.appendChip(t.trim()), this.resetChipBuffer(), !1
                    }
                }
            }, e.prototype.getCursorPosition = function(t) {
                try {
                    if (t.selectionStart === t.selectionEnd) return t.selectionStart
                } catch (e) {
                    if (!t.value) return 0
                }
            }, e.prototype.updateChipContents = function(e, t) {
                0 <= e && e < this.items.length && (this.items[e] = t, this.updateNgModel(!0))
            }, e.prototype.isEditingChip = function() {
                return !!this.$element[0].querySelector("._md-chip-editing")
            }, e.prototype._isChipObject = function(e) {
                return be.isObject(e)
            }, e.prototype.isRemovable = function() {
                return !!this.ngModelCtrl && (this.readonly ? this.removable : !be.isDefined(this.removable) || this.removable)
            }, e.prototype.chipKeydown = function(e) {
                if (!this.getChipBuffer() && !this.isEditingChip()) switch (e.keyCode) {
                    case this.$mdConstant.KEY_CODE.BACKSPACE:
                    case this.$mdConstant.KEY_CODE.DELETE:
                        if (this.selectedChip < 0) return;
                        if (e.preventDefault(), !this.isRemovable()) return;
                        this.removeAndSelectAdjacentChip(this.selectedChip, e);
                        break;
                    case this.$mdConstant.KEY_CODE.LEFT_ARROW:
                        e.preventDefault(), (this.selectedChip < 0 || this.readonly && 0 === this.selectedChip) && (this.selectedChip = this.items.length), this.items.length && this.selectAndFocusChipSafe(this.selectedChip - 1);
                        break;
                    case this.$mdConstant.KEY_CODE.RIGHT_ARROW:
                        e.preventDefault(), this.selectAndFocusChipSafe(this.selectedChip + 1);
                        break;
                    case this.$mdConstant.KEY_CODE.ESCAPE:
                    case this.$mdConstant.KEY_CODE.TAB:
                        if (this.selectedChip < 0) return;
                        e.preventDefault(), this.onFocus()
                }
            }, e.prototype.getPlaceholder = function() {
                return this.items && this.items.length && ("" === this.secondaryPlaceholder || this.secondaryPlaceholder) ? this.secondaryPlaceholder : this.placeholder
            }, e.prototype.removeAndSelectAdjacentChip = function(e, t) {
                var n = this,
                    o = n.getAdjacentChipIndex(e);
                this.$element[0].querySelector("md-chips-wrap"), this.$element[0].querySelector('md-chip[index="' + e + '"]');
                n.removeChip(e, t), n.$timeout(function() {
                    n.$timeout(function() {
                        n.selectAndFocusChipSafe(o)
                    })
                })
            }, e.prototype.resetSelectedChip = function() {
                this.selectedChip = -1, this.ariaTabIndex = null
            }, e.prototype.getAdjacentChipIndex = function(e) {
                var t = this.items.length - 1;
                return 0 == t ? -1 : e === t ? e - 1 : e
            }, e.prototype.appendChip = function(t) {
                if (this.shouldFocusLastChip = !this.addOnBlur, this.useTransformChip && this.transformChip) {
                    var e = this.transformChip({
                        $chip: t
                    });
                    be.isDefined(e) && (t = e)
                }
                if (be.isObject(t) && this.items.some(function(e) {
                        return be.equals(t, e)
                    })) return;
                if (!(null == t || this.items.indexOf(t) + 1)) {
                    var n = this.items.push(t) - 1;
                    this.updateNgModel();
                    var o = be.isObject(t) ? "" : t;
                    this.$mdLiveAnnouncer.announce(o + " " + this.addedMessage, "assertive"), this.useOnAdd && this.onAdd && this.onAdd({
                        $chip: t,
                        $index: n
                    })
                }
            }, e.prototype.useTransformChipExpression = function() {
                this.useTransformChip = !0
            }, e.prototype.useOnAddExpression = function() {
                this.useOnAdd = !0
            }, e.prototype.useOnRemoveExpression = function() {
                this.useOnRemove = !0
            }, e.prototype.useOnSelectExpression = function() {
                this.useOnSelect = !0
            }, e.prototype.getChipBuffer = function() {
                var e = this.userInputElement ? this.userInputNgModelCtrl ? this.userInputNgModelCtrl.$viewValue : this.userInputElement[0].value : this.chipBuffer;
                return be.isString(e) ? e : ""
            }, e.prototype.resetChipBuffer = function() {
                this.userInputElement ? this.userInputNgModelCtrl ? (this.userInputNgModelCtrl.$setViewValue(""), this.userInputNgModelCtrl.$render()) : this.userInputElement[0].value = "" : this.chipBuffer = ""
            }, e.prototype.hasMaxChipsReached = function() {
                return be.isString(this.maxChips) && (this.maxChips = parseInt(this.maxChips, 10) || 0), 0 < this.maxChips && this.items.length >= this.maxChips
            }, e.prototype.validateModel = function() {
                this.ngModelCtrl.$setValidity("md-max-chips", !this.hasMaxChipsReached()), this.ngModelCtrl.$validate()
            }, e.prototype.updateNgModel = function(e) {
                e || this.validateModel(), be.forEach(this.ngModelCtrl.$viewChangeListeners, function(e) {
                    try {
                        e()
                    } catch (e) {
                        this.$exceptionHandler(e)
                    }
                })
            }, e.prototype.removeChip = function(e, t) {
                var n = this.items.splice(e, 1);
                this.updateNgModel(), this.ngModelCtrl.$setDirty();
                var o = be.isObject(n[0]) ? "" : n[0];
                this.$mdLiveAnnouncer.announce(o + " " + this.removedMessage, "assertive"), n && n.length && this.useOnRemove && this.onRemove && this.onRemove({
                    $chip: n[0],
                    $index: e,
                    $event: t
                })
            }, e.prototype.removeChipAndFocusInput = function(e, t) {
                this.removeChip(e, t), this.autocompleteCtrl ? (this.autocompleteCtrl.hidden = !0, this.$mdUtil.nextTick(this.onFocus.bind(this))) : this.onFocus()
            }, e.prototype.selectAndFocusChipSafe = function(e) {
                if (!this.items.length || -1 === e) return this.focusInput();
                if (e >= this.items.length) {
                    if (!this.readonly) return this.onFocus();
                    e = 0
                }
                e = Math.max(e, 0), e = Math.min(e, this.items.length - 1), this.selectChip(e), this.focusChip(e)
            }, e.prototype.focusLastChipThenInput = function() {
                var e = this;
                e.shouldFocusLastChip = !1, e.focusChip(this.items.length - 1), e.$timeout(function() {
                    e.focusInput()
                }, e.chipAppendDelay)
            }, e.prototype.focusInput = function() {
                this.selectChip(-1), this.onFocus()
            }, e.prototype.selectChip = function(e) {
                -1 <= e && e <= this.items.length ? (this.selectedChip = e, this.useOnSelect && this.onSelect && this.onSelect({
                    $chip: this.items[e]
                })) : this.$log.warn("Selected Chip index out of bounds; ignoring.")
            }, e.prototype.focusChip = function(e) {
                var t = this.$element[0].querySelector('md-chip[index="' + e + '"] .md-chip-content');
                this.ariaTabIndex = e, t.focus()
            }, e.prototype.configureNgModel = function(e) {
                this.ngModelCtrl = e;
                var t = this;
                e.$isEmpty = function(e) {
                    return !e || 0 === e.length
                }, e.$render = function() {
                    t.items = t.ngModelCtrl.$viewValue
                }
            }, e.prototype.onFocus = function() {
                var e = this.$element[0].querySelector("input");
                e && e.focus(), this.resetSelectedChip()
            }, e.prototype.onInputFocus = function() {
                this.inputHasFocus = !0, this.setupInputAria(), this.resetSelectedChip()
            }, e.prototype.onInputBlur = function() {
                this.inputHasFocus = !1, this.shouldAddOnBlur() && (this.appendChip(this.getChipBuffer().trim()), this.resetChipBuffer())
            }, e.prototype.configureInput = function(e) {
                var t = e.controller("ngModel"),
                    n = this;
                t && (this.deRegister.push(this.$scope.$watch(function() {
                    return t.$touched
                }, function(e) {
                    e && n.ngModelCtrl.$setTouched()
                })), this.deRegister.push(this.$scope.$watch(function() {
                    return t.$dirty
                }, function(e) {
                    e && n.ngModelCtrl.$setDirty()
                })))
            }, e.prototype.configureUserInput = function(e) {
                var t = (this.userInputElement = e).controller("ngModel");
                t !== this.ngModelCtrl && (this.userInputNgModelCtrl = t);

                function n(e, t) {
                    o.$evalAsync(be.bind(r, t, e))
                }
                var o = this.$scope,
                    r = this;
                e.attr({
                    tabindex: 0
                }).on("keydown", function(e) {
                    n(e, r.inputKeydown)
                }).on("focus", function(e) {
                    n(e, r.onInputFocus)
                }).on("blur", function(e) {
                    n(e, r.onInputBlur)
                })
            }, e.prototype.configureAutocomplete = function(e) {
                e && (this.autocompleteCtrl = e, this.$element.attr("container-empty-hint") || (this.containerEmptyHint = "Chips container with autocompletion. Enter the text area, type text to search, and then use the up and down arrow keys to select an option. Press enter to add the selected option as a chip.", this.setupWrapperAria()), e.registerSelectedItemWatcher(be.bind(this, function(e) {
                    if (e) {
                        if (this.hasMaxChipsReached()) return;
                        this.appendChip(e), this.resetChipBuffer()
                    }
                })), this.$element.find("input").on("focus", be.bind(this, this.onInputFocus)).on("blur", be.bind(this, this.onInputBlur)))
            }, e.prototype.shouldAddOnBlur = function() {
                this.validateModel();
                var e = this.getChipBuffer().trim(),
                    t = this.ngModelCtrl.$isEmpty(this.ngModelCtrl.$modelValue) || this.ngModelCtrl.$valid,
                    n = this.autocompleteCtrl && !this.autocompleteCtrl.hidden;
                return this.userInputNgModelCtrl && (t = t && this.userInputNgModelCtrl.$valid), this.addOnBlur && !this.requireMatch && e && t && !n
            }, e.prototype.hasFocus = function() {
                return this.inputHasFocus || 0 <= this.selectedChip
            }, e.prototype.contentIdFor = function(e) {
                return this.contentIds[e]
            }
        }(),
        function() {
            o.$inject = ["$mdTheming", "$mdUtil", "$compile", "$log", "$timeout", "$$mdSvgRegistry"], be.module("material.components.chips").directive("mdChips", o);
            var e = '      <md-chips-wrap          id="{{$mdChipsCtrl.wrapperId}}"          tabindex="{{$mdChipsCtrl.readonly ? 0 : -1}}"          ng-keydown="$mdChipsCtrl.chipKeydown($event)"          ng-class="{ \'md-focused\': $mdChipsCtrl.hasFocus(),                       \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly,                      \'md-removable\': $mdChipsCtrl.isRemovable() }"          class="md-chips">        <md-chip ng-repeat="$chip in $mdChipsCtrl.items"            index="{{$index}}"             ng-class="{\'md-focused\': $mdChipsCtrl.selectedChip == $index, \'md-readonly\': !$mdChipsCtrl.ngModelCtrl || $mdChipsCtrl.readonly}">          <div class="md-chip-content"              tabindex="{{$mdChipsCtrl.ariaTabIndex === $index ? 0 : -1}}"              id="{{$mdChipsCtrl.contentIdFor($index)}}"              role="option"              aria-selected="{{$mdChipsCtrl.selectedChip === $index}}"              aria-setsize="{{$mdChipsCtrl.items.length}}"              aria-posinset="{{$index+1}}"              ng-click="!$mdChipsCtrl.readonly && $mdChipsCtrl.focusChip($index)"              aria-label="{{$mdChipsCtrl._isChipObject($chip) ? \'\' : $chip + \'. \'}}{{$mdChipsCtrl.isRemovable() ? \'\' + $mdChipsCtrl.deleteHint : \'\'}}"               ng-focus="!$mdChipsCtrl.readonly && $mdChipsCtrl.selectChip($index)"              md-chip-transclude="$mdChipsCtrl.chipContentsTemplate"></div>          <div ng-if="$mdChipsCtrl.isRemovable()"               class="md-chip-remove-container"               tabindex="-1"               md-chip-transclude="$mdChipsCtrl.chipRemoveTemplate"></div>        </md-chip>        <div class="md-chip-input-container" ng-if="!$mdChipsCtrl.readonly && $mdChipsCtrl.ngModelCtrl">          <div md-chip-transclude="$mdChipsCtrl.chipInputTemplate"></div>        </div>      </md-chips-wrap>',
                t = '        <input            class="md-input{{ $mdChipsCtrl.inputClass ? \' \' + $mdChipsCtrl.inputClass: \'\'}}"            tabindex="0"            aria-label="{{$mdChipsCtrl.inputAriaLabel}}"            placeholder="{{$mdChipsCtrl.getPlaceholder()}}"            ng-model="$mdChipsCtrl.chipBuffer"            ng-focus="$mdChipsCtrl.onInputFocus()"            ng-blur="$mdChipsCtrl.onInputBlur()"            ng-keydown="$mdChipsCtrl.inputKeydown($event)">',
                n = "      <span>{{$chip}}</span>",
                r = '      <button          class="md-chip-remove"          ng-if="$mdChipsCtrl.isRemovable()"          ng-click="$mdChipsCtrl.removeChipAndFocusInput($$replacedScope.$index, $event)"          type="button"          tabindex="-1"          aria-label="{{$mdChipsCtrl.deleteButtonLabel}}{{$mdChipsCtrl._isChipObject($chip) ? \'\' : \' \' + $chip}}">        <md-icon md-svg-src="{{$mdChipsCtrl.mdCloseIcon}}" aria-hidden="true"></md-icon>      </button>';

            function o(u, p, h, o, f, b) {
                var g = {
                    chips: p.processTemplate(e),
                    input: p.processTemplate(t),
                    default: p.processTemplate(n),
                    remove: p.processTemplate(r)
                };
                return {
                    template: function(e, t) {
                        return t.$mdUserTemplate = e.clone(), g.chips
                    },
                    require: ["mdChips"],
                    restrict: "E",
                    controller: "MdChipsCtrl",
                    controllerAs: "$mdChipsCtrl",
                    bindToController: !0,
                    compile: function(e, a) {
                        var n = a.$mdUserTemplate;
                        a.$mdUserTemplate = null;
                        var d = t("md-chips>md-chip-template"),
                            s = t(p.prefixer().buildList("md-chip-remove").map(function(e) {
                                return "md-chips>*[" + e + "]"
                            }).join(",")) || g.remove,
                            l = d || g.default,
                            c = t("md-chips>md-autocomplete") || t("md-chips>input") || g.input,
                            m = n.find("md-chip");
                        n[0].querySelector("md-chip-template>*[md-chip-remove]") && o.warn("invalid placement of md-chip-remove within md-chip-template.");

                        function t(e) {
                            if (a.ngModel) {
                                var t = n[0].querySelector(e);
                                return t && t.outerHTML
                            }
                        }
                        return function(e, t, n, o) {
                            p.initOptionalProperties(e, a), u(t);
                            var r = o[0];
                            if (d && (r.enableChipEdit = !1), r.chipContentsTemplate = l, r.chipRemoveTemplate = s, r.chipInputTemplate = c, r.mdCloseIcon = b.mdCancel, t.attr({
                                    tabindex: -1
                                }).on("focus", function() {
                                    r.onFocus()
                                }).on("click", function() {
                                    r.readonly || -1 !== r.selectedChip || r.onFocus()
                                }), a.ngModel && (r.configureNgModel(t.controller("ngModel")), n.mdTransformChip && r.useTransformChipExpression(), n.mdOnAdd && r.useOnAddExpression(), n.mdOnRemove && r.useOnRemoveExpression(), n.mdOnSelect && r.useOnSelectExpression(), c !== g.input && e.$watch("$mdChipsCtrl.readonly", function(e) {
                                    e || p.nextTick(function() {
                                        if (0 === c.indexOf("<md-autocomplete")) {
                                            var e = t.find("md-autocomplete");
                                            r.configureAutocomplete(e.controller("mdAutocomplete"))
                                        }
                                        r.configureUserInput(t.find("input"))
                                    })
                                }), p.nextTick(function() {
                                    var e = t.find("input");
                                    e && (r.configureInput(e), e.toggleClass("md-input", !0))
                                })), 0 < m.length) {
                                var i = h(m.clone())(e.$parent);
                                f(function() {
                                    t.find("md-chips-wrap").prepend(i)
                                })
                            }
                        }
                    },
                    scope: {
                        readonly: "=?readonly",
                        removable: "=?mdRemovable",
                        placeholder: "@?",
                        secondaryPlaceholder: "@?",
                        maxChips: "@?mdMaxChips",
                        transformChip: "&mdTransformChip",
                        onAdd: "&?mdOnAdd",
                        onRemove: "&?mdOnRemove",
                        addedMessage: "@?mdAddedMessage",
                        removedMessage: "@?mdRemovedMessage",
                        onSelect: "&?mdOnSelect",
                        inputClass: "@?mdInputClass",
                        inputAriaDescribedBy: "@?inputAriaDescribedby",
                        inputAriaLabelledBy: "@?inputAriaLabelledby",
                        inputAriaLabel: "@?",
                        containerHint: "@?",
                        containerEmptyHint: "@?",
                        deleteHint: "@?",
                        deleteButtonLabel: "@?",
                        separatorKeys: "=?mdSeparatorKeys",
                        requireMatch: "=?mdRequireMatch",
                        chipAppendDelayString: "@?mdChipAppendDelay",
                        ngChange: "&?"
                    }
                }
            }
        }(), me.$inject = ["$attrs", "$element", "$timeout"], be.module("material.components.chips").controller("MdContactChipsCtrl", me), me.prototype.init = function() {
            var e = this,
                t = this.deRegister,
                n = this.$element;
            this.$timeout(function() {
                t.push(n.find("md-chips").controller("mdChips").$scope.$watchCollection("$mdChipsCtrl.items", function() {
                    e.setupChipsAria(), e.setupAutocompleteAria()
                }))
            })
        }, me.prototype.setupChipsAria = function() {
            var e = this.$element.find("md-chips"),
                t = e.controller("mdChips");
            this.removedMessage && (t.removedMessage = this.removedMessage), this.containerHint && (t.containerHint = this.containerHint), this.containerEmptyHint && (e.attr("container-empty-hint", this.containerEmptyHint), t.containerEmptyHint = this.containerEmptyHint), this.deleteHint && (t.deleteHint = this.deleteHint), this.inputAriaLabel && (t.inputAriaLabel = this.inputAriaLabel), this.inputClass && (t.inputClass = this.inputClass)
        }, me.prototype.setupAutocompleteAria = function() {
            var e = this.$element.find("md-chips-wrap").find("md-autocomplete").find("input");
            this.inputAriaDescribedBy && e.attr("aria-describedby", this.inputAriaDescribedBy), this.inputAriaLabelledBy && (e.removeAttr("aria-label"), e.attr("aria-labelledby", this.inputAriaLabelledBy))
        }, me.prototype.queryContact = function(e) {
            return this.contactQuery({
                $query: e
            })
        }, me.prototype.inputKeydown = function(e) {
            if (this.separatorKeys && !(this.separatorKeys.indexOf(e.keyCode) < 0)) {
                e.stopPropagation(), e.preventDefault();
                var t = be.element(e.target).controller("mdAutocomplete");
                t.select(t.index)
            }
        }, me.prototype.itemName = function(e) {
            return e[this.contactName]
        }, me.prototype.$onDestroy = function() {
            for (var e; e = this.deRegister.pop();) e.call(this)
        },
        function() {
            e.$inject = ["$mdTheming", "$mdUtil"], be.module("material.components.chips").directive("mdContactChips", e);
            var n = '      <md-chips class="md-contact-chips"          ng-model="$mdContactChipsCtrl.contacts"          ng-change="$mdContactChipsCtrl.ngChange($mdContactChipsCtrl.contacts)"          md-require-match="$mdContactChipsCtrl.requireMatch"          md-max-chips="{{$mdContactChipsCtrl.maxChips}}"          md-chip-append-delay="{{$mdContactChipsCtrl.chipAppendDelay}}"          md-separator-keys="$mdContactChipsCtrl.separatorKeys"          md-autocomplete-snap>          <md-autocomplete              md-menu-class="md-contact-chips-suggestions"              md-selected-item="$mdContactChipsCtrl.selectedItem"              md-search-text="$mdContactChipsCtrl.searchText"              md-items="item in $mdContactChipsCtrl.queryContact($mdContactChipsCtrl.searchText)"              md-item-text="$mdContactChipsCtrl.itemName(item)"              md-no-cache="true"              md-min-length="$mdContactChipsCtrl.minLength"              md-autoselect              ng-attr-md-input-class="{{$mdContactChipsCtrl.inputClass}}"              ng-keydown="$mdContactChipsCtrl.inputKeydown($event)"              placeholder="{{$mdContactChipsCtrl.contacts.length === 0 ?                  $mdContactChipsCtrl.placeholder : $mdContactChipsCtrl.secondaryPlaceholder}}">            <div class="md-contact-suggestion">              <img                   ng-src="{{item[$mdContactChipsCtrl.contactImage]}}"                  alt="{{item[$mdContactChipsCtrl.contactName]}}"                  ng-if="item[$mdContactChipsCtrl.contactImage]" />              <span class="md-contact-name" md-highlight-text="$mdContactChipsCtrl.searchText"                    md-highlight-flags="{{$mdContactChipsCtrl.highlightFlags}}">                {{item[$mdContactChipsCtrl.contactName]}}              </span>              <span class="md-contact-email" >{{item[$mdContactChipsCtrl.contactEmail]}}</span>            </div>          </md-autocomplete>          <md-chip-template>            <div class="md-contact-avatar">              <img                   ng-src="{{$chip[$mdContactChipsCtrl.contactImage]}}"                  alt="{{$chip[$mdContactChipsCtrl.contactName]}}"                  ng-if="$chip[$mdContactChipsCtrl.contactImage]" />            </div>            <div class="md-contact-name">              {{$chip[$mdContactChipsCtrl.contactName]}}            </div>          </md-chip-template>      </md-chips>';

            function e(a, d) {
                return {
                    template: function(e, t) {
                        return n
                    },
                    restrict: "E",
                    controller: "MdContactChipsCtrl",
                    controllerAs: "$mdContactChipsCtrl",
                    bindToController: !0,
                    compile: function(e, i) {
                        return function(e, t, n, o) {
                            var r = o;
                            d.initOptionalProperties(e, i), a(t), t.attr("tabindex", "-1"), n.$observe("mdChipAppendDelay", function(e) {
                                r.chipAppendDelay = e
                            })
                        }
                    },
                    scope: {
                        contactQuery: "&mdContacts",
                        placeholder: "@?",
                        secondaryPlaceholder: "@?",
                        contactName: "@mdContactName",
                        contactImage: "@mdContactImage",
                        contactEmail: "@mdContactEmail",
                        contacts: "=ngModel",
                        ngChange: "&?",
                        requireMatch: "=?mdRequireMatch",
                        minLength: "=?mdMinLength",
                        maxChips: "=?mdMaxChips",
                        highlightFlags: "@?mdHighlightFlags",
                        chipAppendDelay: "@?mdChipAppendDelay",
                        separatorKeys: "=?mdSeparatorKeys",
                        removedMessage: "@?mdRemovedMessage",
                        inputClass: "@?mdInputClass",
                        inputAriaDescribedBy: "@?inputAriaDescribedby",
                        inputAriaLabelledBy: "@?inputAriaLabelledby",
                        inputAriaLabel: "@?",
                        containerHint: "@?",
                        containerEmptyHint: "@?",
                        deleteHint: "@?"
                    }
                }
            }
        }(),
        function() {
            t.$inject = ["$mdColors", "$mdUtil", "$log", "$parse"], e.$inject = ["$mdTheming", "$mdUtil", "$log"];
            var a = /^{((\s|,)*?["'a-zA-Z-]+?\s*?:\s*?(['"])[a-zA-Z0-9-.]*(['"]))+\s*}$/,
                l = null;

            function e(i, a, n) {
                return l = l || Object.keys(i.PALETTES), {
                    applyThemeColors: function(e, t) {
                        try {
                            t && e.css(function(e) {
                                var r = {},
                                    i = e.hasOwnProperty("color");
                                return be.forEach(e, function(e, t) {
                                    var n = s(e),
                                        o = -1 < t.indexOf("background");
                                    r[t] = d(n), o && !i && (r.color = d(n, !0))
                                }), r
                            }(t))
                        } catch (e) {
                            n.error(e.message)
                        }
                    },
                    getThemeColor: function(e) {
                        return d(s(e))
                    },
                    hasTheme: function(e) {
                        return be.isDefined(i.THEMES[e.split("-")[0]])
                    }
                };

                function d(e, t) {
                    t = t || !1;
                    var n = i.PALETTES[e.palette][e.hue];
                    return n = t ? n.contrast : n.value, a.supplant("rgba({0}, {1}, {2}, {3})", [n[0], n[1], n[2], n[3] || e.opacity])
                }

                function s(e) {
                    var t = e.split("-"),
                        n = be.isDefined(i.THEMES[t[0]]) ? t.splice(0, 1)[0] : i.defaultTheme();
                    return {
                        theme: n,
                        palette: function(e, t) {
                            var n = 1 < e.length && -1 !== l.indexOf(e[1]),
                                o = e[0].replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
                            if (n && (o = e[0] + "-" + e.splice(1, 1)), -1 === l.indexOf(o)) {
                                var r = i.THEMES[t].colors[o];
                                if (!r) throw new Error(a.supplant("mdColors: couldn't find '{palette}' in the palettes.", {
                                    palette: o
                                }));
                                o = r.name
                            }
                            return o
                        }(t, n),
                        hue: function(e, t) {
                            var n = i.THEMES[t].colors;
                            if ("hue" !== e[1]) return e[1] || n[e[0] in n ? e[0] : "primary"].hues.default;
                            var o = parseInt(e.splice(2, 1)[0], 10);
                            if (o < 1 || 3 < o) throw new Error(a.supplant("mdColors: 'hue-{hueNumber}' is not a valid hue, can be only 'hue-1', 'hue-2' and 'hue-3'", {
                                hueNumber: o
                            }));
                            if (e[1] = "hue-" + o, e[0] in n) return n[e[0]].hues[e[1]];
                            throw new Error(a.supplant("mdColors: 'hue-x' can only be used with [{availableThemes}], but was used with '{usedTheme}'", {
                                availableThemes: Object.keys(n).join(", "),
                                usedTheme: e[0]
                            }))
                        }(t, n),
                        opacity: t[2] || 1
                    }
                }
            }

            function t(c, i, m, u) {
                return {
                    restrict: "A",
                    require: ["^?mdTheme"],
                    compile: function(e, r) {
                        var l = function() {
                            var e = r.mdColors,
                                t = -1 < e.indexOf("::"),
                                n = t || a.test(r.mdColors);
                            r.mdColors = e.replace("::", "");
                            var o = be.isDefined(r.mdColorsWatch);
                            return !t && !n && (!o || i.parseAttributeBoolean(r.mdColorsWatch))
                        }();
                        return function(e, n, t, o) {
                            function r(n) {
                                "string" != typeof n && (n = ""), t.mdColors || (t.mdColors = "{}");
                                var o = u(t.mdColors)(e);
                                return i && Object.keys(o).forEach(function(e) {
                                    var t = o[e];
                                    c.hasTheme(t) || (o[e] = (n || i.$mdTheme) + "-" + t)
                                }), d(o), o
                            }
                            var i = o[0],
                                a = {},
                                d = function(e) {
                                    if (!be.equals(e, a)) {
                                        var t = Object.keys(a);
                                        a.background && !t.color && t.push("color"), t.forEach(function(e) {
                                            n.css(e, "")
                                        })
                                    }
                                    a = e
                                },
                                s = be.noop;
                            i && (s = i.registerChanges(function(e) {
                                c.applyThemeColors(n, r(e))
                            })), e.$on("$destroy", function() {
                                s()
                            });
                            try {
                                l ? e.$watch(r, be.bind(this, c.applyThemeColors, n), !0) : c.applyThemeColors(n, r())
                            } catch (e) {
                                m.error(e.message)
                            }
                        }
                    }
                }
            }
            be.module("material.components.colors", ["material.core"]).directive("mdColors", t).service("$mdColors", e)
        }(), ue.$inject = ["$mdTheming"], be.module("material.components.content", ["material.core"]).directive("mdContent", ue), be.module("material.components.datepicker", ["material.core", "material.components.icon", "material.components.virtualRepeat"]),
        function() {
            function e(i) {
                return {
                    template: function(e, t) {
                        return '<div ng-switch="calendarCtrl.currentView" ' + (t.hasOwnProperty("ngIf") ? "" : 'ng-if="calendarCtrl.isInitialized"') + '><md-calendar-year ng-switch-when="year"></md-calendar-year><md-calendar-month ng-switch-default></md-calendar-month></div>'
                    },
                    scope: {
                        minDate: "=mdMinDate",
                        maxDate: "=mdMaxDate",
                        dateFilter: "=mdDateFilter",
                        monthFilter: "=mdMonthFilter",
                        _mode: "@mdMode",
                        _currentView: "@mdCurrentView"
                    },
                    require: ["ngModel", "mdCalendar"],
                    controller: n,
                    controllerAs: "calendarCtrl",
                    bindToController: !0,
                    link: function(e, t, n, o) {
                        var r = o[0];
                        o[1].configureNgModel(r, i)
                    }
                }
            }
            n.$inject = ["$element", "$scope", "$$mdDateUtil", "$mdUtil", "$mdConstant", "$mdTheming", "$$rAF", "$attrs", "$mdDateLocale", "$filter", "$document"], e.$inject = ["inputDirective"], be.module("material.components.datepicker").directive("mdCalendar", e);
            var p = 0,
                t = {
                    day: "month",
                    month: "year"
                };

            function n(e, t, n, o, r, i, a, d, s, l, c) {
                i(e), this.$element = e, this.$scope = t, this.$attrs = d, this.dateUtil = n, this.$mdUtil = o, this.keyCode = r.KEY_CODE, this.$$rAF = a, this.$mdDateLocale = s, this.ngDateFilter = l("date"), this.today = this.dateUtil.createDateAtMidnight(), this.ngModelCtrl = ge, this.SELECTED_DATE_CLASS = "md-calendar-selected-date", this.TODAY_CLASS = "md-calendar-date-today", this.FOCUSED_DATE_CLASS = "md-focus", this.id = p++, this.displayDate = null, this.mode = null, this.selectedDate = null, this.firstRenderableDate = null, this.lastRenderableDate = null, this.isInitialized = !1, this.width = 0, this.scrollbarWidth = 0, this.standaloneMode = !1, d.tabindex || e.attr("tabindex", "-1");
                var m, u = be.bind(this, this.handleKeyEvent);
                (m = e.parent().hasClass("md-datepicker-calendar") ? be.element(c[0].body) : (this.standaloneMode = !0, e)).on("keydown", u), t.$on("$destroy", function() {
                    m.off("keydown", u)
                }), 1 === be.version.major && be.version.minor <= 4 && this.$onInit()
            }
            n.prototype.$onInit = function() {
                this._mode && t.hasOwnProperty(this._mode) ? (this.currentView = t[this._mode], this.mode = this._mode) : (this.currentView = this._currentView || "month", this.mode = null), this.minDate && this.minDate > this.$mdDateLocale.firstRenderableDate ? this.firstRenderableDate = this.minDate : this.firstRenderableDate = this.$mdDateLocale.firstRenderableDate, this.maxDate && this.maxDate < this.$mdDateLocale.lastRenderableDate ? this.lastRenderableDate = this.maxDate : this.lastRenderableDate = this.$mdDateLocale.lastRenderableDate
            }, n.prototype.configureNgModel = function(e, t) {
                var n = this;
                n.ngModelCtrl = e, this.$attrs.$set("type", "date"), t[0].link.pre(this.$scope, {
                    on: be.noop,
                    val: be.noop,
                    0: {}
                }, this.$attrs, [e]), e.$render = function() {
                    var e, t = this.$viewValue;
                    n.dateUtil.isValidDate(t) || (e = n.dateUtil.removeLocalTzAndReparseDate(new Date(t)), n.dateUtil.isValidDate(e) && (t = e)), n.$scope.$broadcast("md-calendar-parent-changed", t), n.selectedDate || (n.selectedDate = t), n.displayDate || (n.displayDate = n.selectedDate || n.today)
                }, n.$mdUtil.nextTick(function() {
                    n.isInitialized = !0
                })
            }, n.prototype.setNgModelValue = function(e) {
                var t = this.$mdUtil.getModelOption(this.ngModelCtrl, "timezone"),
                    n = this.dateUtil.createDateAtMidnight(e);
                return this.focusDate(n), this.$scope.$emit("md-calendar-change", n), null == t || n.getTimezoneOffset() < 0 ? this.ngModelCtrl.$setViewValue(this.ngDateFilter(n, "yyyy-MM-dd"), "default") : this.ngModelCtrl.$setViewValue(this.ngDateFilter(n, "yyyy-MM-dd", t), "default"), this.ngModelCtrl.$render(), n
            }, n.prototype.setCurrentView = function(e, t) {
                var n = this;
                n.$mdUtil.nextTick(function() {
                    n.currentView = e, t && (n.displayDate = be.isDate(t) ? t : new Date(t))
                })
            }, n.prototype.focusDate = function(e) {
                if (this.dateUtil.isValidDate(e)) {
                    var t = this.$element[0].querySelector("." + this.FOCUSED_DATE_CLASS);
                    t && t.classList.remove(this.FOCUSED_DATE_CLASS);
                    var n = this.getDateId(e, this.currentView),
                        o = document.getElementById(n);
                    o && (o.classList.add(this.FOCUSED_DATE_CLASS), o.focus(), this.displayDate = e)
                } else {
                    var r = this.$element[0].querySelector("[ng-switch]");
                    r && r.focus()
                }
            }, n.prototype.changeSelectedDate = function(e) {
                var t = this.SELECTED_DATE_CLASS,
                    n = this.$element[0].querySelector("." + t);
                if (n && (n.classList.remove(t), n.setAttribute("aria-selected", "false")), e) {
                    var o = document.getElementById(this.getDateId(e, this.currentView));
                    o && (o.classList.add(t), o.setAttribute("aria-selected", "true"))
                }
                this.selectedDate = e
            }, n.prototype.getActionFromKeyEvent = function(e) {
                var t = this.keyCode;
                switch (e.which) {
                    case t.ENTER:
                        return "select";
                    case t.RIGHT_ARROW:
                        return "move-right";
                    case t.LEFT_ARROW:
                        return "move-left";
                    case t.DOWN_ARROW:
                        return e.metaKey ? "move-page-down" : "move-row-down";
                    case t.UP_ARROW:
                        return e.metaKey ? "move-page-up" : "move-row-up";
                    case t.PAGE_DOWN:
                        return "move-page-down";
                    case t.PAGE_UP:
                        return "move-page-up";
                    case t.HOME:
                        return "start";
                    case t.END:
                        return "end";
                    default:
                        return null
                }
            }, n.prototype.handleKeyEvent = function(t) {
                var n = this;
                this.$scope.$apply(function() {
                    if (t.which === n.keyCode.ESCAPE || t.which === n.keyCode.TAB && !n.standaloneMode) return n.$scope.$emit("md-calendar-close"), void(t.which === n.keyCode.TAB && t.preventDefault());
                    if (t.which !== n.keyCode.TAB || !n.standaloneMode) {
                        var e = n.getActionFromKeyEvent(t);
                        e && (t.preventDefault(), t.stopPropagation(), n.$scope.$broadcast("md-calendar-parent-action", e))
                    }
                })
            }, n.prototype.hideVerticalScrollbar = function(o) {
                var r = this,
                    t = o.$element[0],
                    i = t.querySelector(".md-calendar-scroll-mask");

                function n() {
                    var e = r.width || 340,
                        t = r.scrollbarWidth,
                        n = o.calendarScroller;
                    i.style.width = e + "px", n.style.width = e + t + "px", n.style.paddingRight = t + "px"
                }
                0 < r.width ? n() : r.$$rAF(function() {
                    var e = o.calendarScroller;
                    r.scrollbarWidth = e.offsetWidth - e.clientWidth, r.width = t.querySelector("table").offsetWidth, n()
                })
            }, n.prototype.getDateId = function(e, t) {
                if (!t) throw new Error("A namespace for the date id has to be specified.");
                return ["md", this.id, t, e.getFullYear(), e.getMonth(), e.getDate()].join("-")
            }, n.prototype.updateVirtualRepeat = function() {
                var e = this.$scope,
                    t = e.$on("$md-resize-enable", function() {
                        e.$$phase || e.$apply(), t()
                    })
            }
        }(),
        function() {
            t.$inject = ["$element", "$scope", "$animate", "$q", "$$mdDateUtil", "$mdDateLocale"], be.module("material.components.datepicker").directive("mdCalendarMonth", function() {
                return {
                    template: '<table aria-hidden="true" class="md-calendar-day-header"><thead></thead></table><div class="md-calendar-scroll-mask"><md-virtual-repeat-container class="md-calendar-scroll-container" md-offset-size="' + (e - n) + '"><table role="grid" tabindex="0" class="md-calendar" aria-readonly="true"><tbody md-calendar-month-body role="rowgroup" md-virtual-repeat="i in monthCtrl.items" md-month-offset="$index" class="md-calendar-month" md-start-index="monthCtrl.getSelectedMonthIndex()" md-item-size="' + n + '"><tr aria-hidden="true" md-force-height="\'' + n + "px'\"></tr></tbody></table></md-virtual-repeat-container></div>",
                    require: ["^^mdCalendar", "mdCalendarMonth"],
                    controller: t,
                    controllerAs: "monthCtrl",
                    bindToController: !0,
                    link: function(e, t, n, o) {
                        var r = o[0];
                        o[1].initialize(r)
                    }
                }
            });
            var n = 265,
                e = 45;

            function t(e, t, n, o, r, i) {
                this.$element = e, this.$scope = t, this.$animate = n, this.$q = o, this.dateUtil = r, this.dateLocale = i, this.calendarScroller = e[0].querySelector(".md-virtual-repeat-scroller"), this.isInitialized = !1, this.isMonthTransitionInProgress = !1;
                var a = this;
                this.cellClickHandler = function() {
                    var e = r.getTimestampFromNode(this);
                    a.$scope.$apply(function() {
                        a.calendarCtrl.setNgModelValue(new Date(e))
                    })
                }, this.headerClickHandler = function() {
                    a.calendarCtrl.setCurrentView("year", r.getTimestampFromNode(this))
                }
            }
            t.prototype.initialize = function(e) {
                this.items = {
                    length: this.dateUtil.getMonthDistance(e.firstRenderableDate, e.lastRenderableDate) + 2
                }, this.calendarCtrl = e, this.attachScopeListeners(), e.updateVirtualRepeat(), e.ngModelCtrl && e.ngModelCtrl.$render()
            }, t.prototype.getSelectedMonthIndex = function() {
                var e = this.calendarCtrl;
                return this.dateUtil.getMonthDistance(e.firstRenderableDate, e.displayDate || e.selectedDate || e.today)
            }, t.prototype.changeDisplayDate = function(e) {
                if (!this.isInitialized) return this.buildWeekHeader(), this.calendarCtrl.hideVerticalScrollbar(this), this.isInitialized = !0, this.$q.when();
                if (!this.dateUtil.isValidDate(e) || this.isMonthTransitionInProgress) return this.$q.when();
                this.isMonthTransitionInProgress = !0;
                var t = this.animateDateChange(e);
                this.calendarCtrl.displayDate = e;
                var n = this;
                return t.then(function() {
                    n.isMonthTransitionInProgress = !1
                }), t
            }, t.prototype.animateDateChange = function(e) {
                if (this.dateUtil.isValidDate(e)) {
                    var t = this.dateUtil.getMonthDistance(this.calendarCtrl.firstRenderableDate, e);
                    this.calendarScroller.scrollTop = t * n
                }
                return this.$q.when()
            }, t.prototype.buildWeekHeader = function() {
                for (var e = this.dateLocale.firstDayOfWeek, t = this.dateLocale.shortDays, n = document.createElement("tr"), o = 0; o < 7; o++) {
                    var r = document.createElement("th");
                    r.textContent = t[(o + e) % 7], n.appendChild(r)
                }
                this.$element.find("thead").append(n)
            }, t.prototype.attachScopeListeners = function() {
                var n = this;
                n.$scope.$on("md-calendar-parent-changed", function(e, t) {
                    n.calendarCtrl.changeSelectedDate(t), n.changeDisplayDate(t)
                }), n.$scope.$on("md-calendar-parent-action", be.bind(this, this.handleKeyEvent))
            }, t.prototype.handleKeyEvent = function(e, t) {
                var n = this.calendarCtrl,
                    o = n.displayDate;
                if ("select" === t) n.setNgModelValue(o);
                else {
                    var r = null,
                        i = this.dateUtil;
                    switch (t) {
                        case "move-right":
                            r = i.incrementDays(o, 1);
                            break;
                        case "move-left":
                            r = i.incrementDays(o, -1);
                            break;
                        case "move-page-down":
                            r = i.incrementMonths(o, 1);
                            break;
                        case "move-page-up":
                            r = i.incrementMonths(o, -1);
                            break;
                        case "move-row-down":
                            r = i.incrementDays(o, 7);
                            break;
                        case "move-row-up":
                            r = i.incrementDays(o, -7);
                            break;
                        case "start":
                            r = i.getFirstDateOfMonth(o);
                            break;
                        case "end":
                            r = i.getLastDateOfMonth(o)
                    }
                    r && (r = this.dateUtil.clampDate(r, n.minDate, n.maxDate), this.changeDisplayDate(r).then(function() {
                        n.focusDate(r)
                    }))
                }
            }
        }(), pe.$inject = ["$compile", "$$mdSvgRegistry"], he.$inject = ["$element", "$$mdDateUtil", "$mdDateLocale"], be.module("material.components.datepicker").directive("mdCalendarMonthBody", pe), he.prototype.generateContent = function() {
            var e = this.dateUtil.incrementMonths(this.calendarCtrl.firstRenderableDate, this.offset);
            this.$element.empty().append(this.buildCalendarForMonth(e)), this.focusAfterAppend && (this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS), this.focusAfterAppend = null)
        }, he.prototype.buildDateCell = function(e) {
            var t = this.monthCtrl,
                n = this.calendarCtrl,
                o = document.createElement("td");
            if (o.tabIndex = -1, o.classList.add("md-calendar-date"), o.setAttribute("role", "gridcell"), e) {
                o.setAttribute("tabindex", "-1"), o.setAttribute("aria-label", this.dateLocale.longDateFormatter(e)), o.id = n.getDateId(e, "month"), o.setAttribute("data-timestamp", e.getTime()), this.dateUtil.isSameDay(e, n.today) && o.classList.add(n.TODAY_CLASS), this.dateUtil.isValidDate(n.selectedDate) && this.dateUtil.isSameDay(e, n.selectedDate) && (o.classList.add(n.SELECTED_DATE_CLASS), o.setAttribute("aria-selected", "true"));
                var r = this.dateLocale.dates[e.getDate()];
                if (this.isDateEnabled(e)) {
                    var i = document.createElement("span");
                    i.classList.add("md-calendar-date-selection-indicator"), i.textContent = r, o.appendChild(i), o.addEventListener("click", t.cellClickHandler), n.displayDate && this.dateUtil.isSameDay(e, n.displayDate) && (this.focusAfterAppend = o)
                } else o.classList.add("md-calendar-date-disabled"), o.textContent = r
            }
            return o
        }, he.prototype.isDateEnabled = function(e) {
            return this.dateUtil.isDateWithinRange(e, this.calendarCtrl.minDate, this.calendarCtrl.maxDate) && (!be.isFunction(this.calendarCtrl.dateFilter) || this.calendarCtrl.dateFilter(e))
        }, he.prototype.buildDateRow = function(e) {
            var t = document.createElement("tr");
            return t.setAttribute("role", "row"), t.setAttribute("aria-label", this.dateLocale.weekNumberFormatter(e)), t
        }, he.prototype.buildCalendarForMonth = function(e) {
            var t = this.dateUtil.isValidDate(e) ? e : new Date,
                n = this.dateUtil.getFirstDateOfMonth(t),
                o = this.getLocaleDay_(n),
                r = this.dateUtil.getNumberOfDaysInMonth(t),
                i = document.createDocumentFragment(),
                a = 1,
                d = this.buildDateRow(a);
            i.appendChild(d);
            var s = this.offset === this.monthCtrl.items.length - 1,
                l = 0,
                c = document.createElement("td"),
                m = document.createElement("span"),
                u = this.calendarCtrl;
            if (m.textContent = this.dateLocale.monthHeaderFormatter(t), c.appendChild(m), c.classList.add("md-calendar-month-label"), u.maxDate && n > u.maxDate ? c.classList.add("md-calendar-month-label-disabled") : u.mode || (c.addEventListener("click", this.monthCtrl.headerClickHandler), c.setAttribute("data-timestamp", n.getTime()), c.setAttribute("aria-label", this.dateLocale.monthFormatter(t)), c.classList.add("md-calendar-label-clickable"), c.appendChild(this.arrowIcon.cloneNode(!0))), o <= 2) {
                c.setAttribute("colspan", "7");
                var p = this.buildDateRow();
                if (p.appendChild(c), i.insertBefore(p, d), s) return i
            } else l = 3, c.setAttribute("colspan", "3"), d.appendChild(c);
            for (var h = l; h < o; h++) d.appendChild(this.buildDateCell());
            for (var f = o, b = n, g = 1; g <= r; g++) {
                if (7 === f) {
                    if (s) return i;
                    f = 0, a++, d = this.buildDateRow(a), i.appendChild(d)
                }
                b.setDate(g);
                var E = this.buildDateCell(b);
                d.appendChild(E), f++
            }
            for (; d.childNodes.length < 7;) d.appendChild(this.buildDateCell());
            for (; i.childNodes.length < 6;) {
                for (var v = this.buildDateRow(), $ = 0; $ < 7; $++) v.appendChild(this.buildDateCell());
                i.appendChild(v)
            }
            return i
        }, he.prototype.getLocaleDay_ = function(e) {
            return (e.getDay() + (7 - this.dateLocale.firstDayOfWeek)) % 7
        },
        function() {
            e.$inject = ["$element", "$scope", "$animate", "$q", "$$mdDateUtil", "$mdUtil"], be.module("material.components.datepicker").directive("mdCalendarYear", function() {
                return {
                    template: '<div class="md-calendar-scroll-mask"><md-virtual-repeat-container class="md-calendar-scroll-container"><table role="grid" tabindex="0" class="md-calendar" aria-readonly="true"><tbody md-calendar-year-body role="rowgroup" md-virtual-repeat="i in yearCtrl.items" md-year-offset="$index" class="md-calendar-year" md-start-index="yearCtrl.getFocusedYearIndex()" md-item-size="' + n + '"><tr aria-hidden="true" md-force-height="\'' + n + "px'\"></tr></tbody></table></md-virtual-repeat-container></div>",
                    require: ["^^mdCalendar", "mdCalendarYear"],
                    controller: e,
                    controllerAs: "yearCtrl",
                    bindToController: !0,
                    link: function(e, t, n, o) {
                        var r = o[0];
                        o[1].initialize(r)
                    }
                }
            });
            var n = 88;

            function e(e, t, n, o, r, i) {
                this.$element = e, this.$scope = t, this.$animate = n, this.$q = o, this.dateUtil = r, this.calendarScroller = e[0].querySelector(".md-virtual-repeat-scroller"), this.isInitialized = !1, this.isMonthTransitionInProgress = !1, this.$mdUtil = i;
                var a = this;
                this.cellClickHandler = function() {
                    a.onTimestampSelected(r.getTimestampFromNode(this))
                }
            }
            e.prototype.initialize = function(e) {
                this.items = {
                    length: this.dateUtil.getYearDistance(e.firstRenderableDate, e.lastRenderableDate) + 1
                }, this.calendarCtrl = e, this.attachScopeListeners(), e.updateVirtualRepeat(), e.ngModelCtrl && e.ngModelCtrl.$render()
            }, e.prototype.getFocusedYearIndex = function() {
                var e = this.calendarCtrl;
                return this.dateUtil.getYearDistance(e.firstRenderableDate, e.displayDate || e.selectedDate || e.today)
            }, e.prototype.changeDate = function(e) {
                if (!this.isInitialized) return this.calendarCtrl.hideVerticalScrollbar(this), this.isInitialized = !0, this.$q.when();
                if (this.dateUtil.isValidDate(e) && !this.isMonthTransitionInProgress) {
                    var t = this,
                        n = this.animateDateChange(e);
                    return t.isMonthTransitionInProgress = !0, t.calendarCtrl.displayDate = e, n.then(function() {
                        t.isMonthTransitionInProgress = !1
                    })
                }
            }, e.prototype.animateDateChange = function(e) {
                if (this.dateUtil.isValidDate(e)) {
                    var t = this.dateUtil.getYearDistance(this.calendarCtrl.firstRenderableDate, e);
                    this.calendarScroller.scrollTop = t * n
                }
                return this.$q.when()
            }, e.prototype.handleKeyEvent = function(e, t) {
                var n = this,
                    o = n.calendarCtrl,
                    r = o.displayDate;
                if ("select" === t) n.changeDate(r).then(function() {
                    n.onTimestampSelected(r)
                });
                else {
                    var i = null,
                        a = n.dateUtil;
                    switch (t) {
                        case "move-right":
                            i = a.incrementMonths(r, 1);
                            break;
                        case "move-left":
                            i = a.incrementMonths(r, -1);
                            break;
                        case "move-row-down":
                            i = a.incrementMonths(r, 6);
                            break;
                        case "move-row-up":
                            i = a.incrementMonths(r, -6)
                    }
                    if (i) {
                        var d = o.minDate ? a.getFirstDateOfMonth(o.minDate) : null,
                            s = o.maxDate ? a.getFirstDateOfMonth(o.maxDate) : null;
                        i = a.getFirstDateOfMonth(n.dateUtil.clampDate(i, d, s)), n.changeDate(i).then(function() {
                            o.focusDate(i)
                        })
                    }
                }
            }, e.prototype.attachScopeListeners = function() {
                var n = this;
                n.$scope.$on("md-calendar-parent-changed", function(e, t) {
                    n.calendarCtrl.changeSelectedDate(t ? n.dateUtil.getFirstDateOfMonth(t) : t), n.changeDate(t)
                }), n.$scope.$on("md-calendar-parent-action", be.bind(n, n.handleKeyEvent))
            }, e.prototype.onTimestampSelected = function(e) {
                var t = this.calendarCtrl;
                t.mode ? this.$mdUtil.nextTick(function() {
                    t.setNgModelValue(new Date(e))
                }) : t.setCurrentView("month", e)
            }
        }(), fe.$inject = ["$element", "$$mdDateUtil", "$mdDateLocale"], be.module("material.components.datepicker").directive("mdCalendarYearBody", function() {
            return {
                require: ["^^mdCalendar", "^^mdCalendarYear", "mdCalendarYearBody"],
                scope: {
                    offset: "=mdYearOffset"
                },
                controller: fe,
                controllerAs: "mdYearBodyCtrl",
                bindToController: !0,
                link: function(e, t, n, o) {
                    var r = o[0],
                        i = o[1],
                        a = o[2];
                    a.calendarCtrl = r, a.yearCtrl = i, e.$watch(function() {
                        return a.offset
                    }, function(e) {
                        be.isNumber(e) && a.generateContent()
                    })
                }
            }
        }), fe.prototype.generateContent = function() {
            var e = this.dateUtil.incrementYears(this.calendarCtrl.firstRenderableDate, this.offset);
            this.$element.empty().append(this.buildCalendarForYear(e)), this.focusAfterAppend && (this.focusAfterAppend.classList.add(this.calendarCtrl.FOCUSED_DATE_CLASS), this.focusAfterAppend = null)
        }, fe.prototype.buildMonthCell = function(e, t) {
            var n = this.calendarCtrl,
                o = this.yearCtrl,
                r = this.buildBlankCell(),
                i = new Date(e, t, 1);
            r.setAttribute("aria-label", this.dateLocale.monthFormatter(i)), r.id = n.getDateId(i, "year"), r.setAttribute("data-timestamp", String(i.getTime())), this.dateUtil.isSameMonthAndYear(i, n.today) && r.classList.add(n.TODAY_CLASS), this.dateUtil.isValidDate(n.selectedDate) && this.dateUtil.isSameMonthAndYear(i, n.selectedDate) && (r.classList.add(n.SELECTED_DATE_CLASS), r.setAttribute("aria-selected", "true"));
            var a = this.dateLocale.shortMonths[t];
            if (!this.dateUtil.isMonthWithinRange(i, n.minDate, n.maxDate) || be.isFunction(n.monthFilter) && !n.monthFilter(i)) r.classList.add("md-calendar-date-disabled"), r.textContent = a;
            else {
                var d = document.createElement("span");
                d.classList.add("md-calendar-date-selection-indicator"), d.textContent = a, r.appendChild(d), r.addEventListener("click", o.cellClickHandler), n.displayDate && this.dateUtil.isSameMonthAndYear(i, n.displayDate) && (this.focusAfterAppend = r)
            }
            return r
        }, fe.prototype.buildBlankCell = function() {
            var e = document.createElement("td");
            return e.tabIndex = -1, e.classList.add("md-calendar-date"), e.setAttribute("role", "gridcell"), e.setAttribute("tabindex", "-1"), e
        }, fe.prototype.buildCalendarForYear = function(e) {
            var t, n = e.getFullYear(),
                o = document.createDocumentFragment(),
                r = document.createElement("tr"),
                i = document.createElement("td");
            for (i.className = "md-calendar-month-label", i.textContent = String(n), r.appendChild(i), t = 0; t < 6; t++) r.appendChild(this.buildMonthCell(n, t));
            o.appendChild(r);
            var a = document.createElement("tr");
            for (a.appendChild(this.buildBlankCell()), t = 6; t < 12; t++) a.appendChild(this.buildMonthCell(n, t));
            return o.appendChild(a), o
        }, be.module("material.components.datepicker").config(["$provide", function(e) {
            function t() {
                this.months = null, this.shortMonths = null, this.days = null, this.shortDays = null, this.dates = null, this.firstDayOfWeek = 0, this.formatDate = null, this.parseDate = null, this.monthHeaderFormatter = null, this.weekNumberFormatter = null, this.longDateFormatter = null, this.isDateComplete = null, this.msgCalendar = "", this.msgOpenCalendar = ""
            }(t.prototype.$get = function(e, r) {
                for (var t = e.DATETIME_FORMATS.SHORTDAY.map(function(e) {
                        return e.substring(0, 1)
                    }), n = Array(32), o = 1; o <= 31; o++) n[o] = o;
                var i = new Date(1880, 0, 1),
                    a = new Date(i.getFullYear() + 250, 0, 1),
                    d = {
                        months: this.months || e.DATETIME_FORMATS.MONTH,
                        shortMonths: this.shortMonths || e.DATETIME_FORMATS.SHORTMONTH,
                        days: this.days || e.DATETIME_FORMATS.DAY,
                        shortDays: this.shortDays || t,
                        dates: this.dates || n,
                        firstDayOfWeek: this.firstDayOfWeek || 0,
                        formatDate: this.formatDate || function(e, t) {
                            if (!e) return "";
                            var n = e.toLocaleTimeString(),
                                o = e;
                            return 0 !== e.getHours() || -1 === n.indexOf("11:") && -1 === n.indexOf("23:") || (o = new Date(e.getFullYear(), e.getMonth(), e.getDate(), 1, 0, 0)), r("date")(o, "M/d/yyyy", t)
                        },
                        parseDate: this.parseDate || function(e) {
                            return new Date(e)
                        },
                        isDateComplete: this.isDateComplete || function(e) {
                            return e = e.trim(), /^(([a-zA-Z]{3,}|[0-9]{1,4})([ .,]+|[/-])){2}([a-zA-Z]{3,}|[0-9]{1,4})$/.test(e)
                        },
                        monthHeaderFormatter: this.monthHeaderFormatter || function(e) {
                            return d.shortMonths[e.getMonth()] + " " + e.getFullYear()
                        },
                        monthFormatter: this.monthFormatter || function(e) {
                            return d.months[e.getMonth()] + " " + e.getFullYear()
                        },
                        weekNumberFormatter: this.weekNumberFormatter || function(e) {
                            return "Week " + e
                        },
                        longDateFormatter: this.longDateFormatter || function(e) {
                            return [d.days[e.getDay()], d.months[e.getMonth()], d.dates[e.getDate()], e.getFullYear()].join(" ")
                        },
                        msgCalendar: this.msgCalendar || "Calendar",
                        msgOpenCalendar: this.msgOpenCalendar || "Open calendar",
                        firstRenderableDate: this.firstRenderableDate || i,
                        lastRenderableDate: this.lastRenderableDate || a
                    };
                return d
            }).$inject = ["$locale", "$filter"], e.provider("$mdDateLocale", new t)
        }]), be.module("material.components.datepicker").factory("$$mdDateUtil", ["$mdDateLocale", function(o) {
            return {
                getFirstDateOfMonth: n,
                getNumberOfDaysInMonth: r,
                getDateInNextMonth: i,
                getDateInPreviousMonth: a,
                isInNextMonth: function(e, t) {
                    return d(i(e), t)
                },
                isInPreviousMonth: function(e, t) {
                    var n = a(e);
                    return d(t, n)
                },
                getDateMidpoint: function(e, t) {
                    return m((e.getTime() + t.getTime()) / 2)
                },
                isSameMonthAndYear: d,
                getWeekOfMonth: function(e) {
                    var t = n(e);
                    return Math.floor((t.getDay() + e.getDate() - 1) / 7)
                },
                incrementDays: function(e, t) {
                    return new Date(e.getFullYear(), e.getMonth(), e.getDate() + t)
                },
                incrementMonths: s,
                getLastDateOfMonth: function(e) {
                    return new Date(e.getFullYear(), e.getMonth(), r(e))
                },
                isSameDay: function(e, t) {
                    return e.getDate() == t.getDate() && d(e, t)
                },
                getMonthDistance: function(e, t) {
                    return 12 * (t.getFullYear() - e.getFullYear()) + (t.getMonth() - e.getMonth())
                },
                isValidDate: l,
                setDateTimeToMidnight: c,
                createDateAtMidnight: m,
                isDateWithinRange: function(e, t, n) {
                    var o = m(e),
                        r = l(t) ? m(t) : null,
                        i = l(n) ? m(n) : null;
                    return (!r || r <= o) && (!i || o <= i)
                },
                incrementYears: function(e, t) {
                    return s(e, 12 * t)
                },
                getYearDistance: function(e, t) {
                    return t.getFullYear() - e.getFullYear()
                },
                clampDate: function(e, t, n) {
                    var o = e;
                    return t && e < t && (o = new Date(t.getTime())), n && n < e && (o = new Date(n.getTime())), o
                },
                getTimestampFromNode: function(e) {
                    if (e && e.hasAttribute("data-timestamp")) return Number(e.getAttribute("data-timestamp"))
                },
                isMonthWithinRange: function(e, t, n) {
                    var o = e.getMonth(),
                        r = e.getFullYear();
                    return (!t || t.getFullYear() < r || t.getMonth() <= o) && (!n || n.getFullYear() > r || n.getMonth() >= o)
                },
                removeLocalTzAndReparseDate: function(e) {
                    var t, n;
                    return t = new Date(e.getTime() + 6e4 * e.getTimezoneOffset()), n = o.formatDate(t), o.parseDate(n)
                }
            };

            function n(e) {
                return new Date(e.getFullYear(), e.getMonth(), 1)
            }

            function r(e) {
                return new Date(e.getFullYear(), e.getMonth() + 1, 0).getDate()
            }

            function i(e) {
                return new Date(e.getFullYear(), e.getMonth() + 1, 1)
            }

            function a(e) {
                return new Date(e.getFullYear(), e.getMonth() - 1, 1)
            }

            function d(e, t) {
                return e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth()
            }

            function s(e, t) {
                var n = new Date(e.getFullYear(), e.getMonth() + t, 1),
                    o = r(n);
                return o < e.getDate() ? n.setDate(o) : n.setDate(e.getDate()), n
            }

            function l(e) {
                return e && e.getTime && !isNaN(e.getTime())
            }

            function c(e) {
                l(e) && e.setHours(0, 0, 0, 0)
            }

            function m(e) {
                var t;
                return c(t = be.isDate(e) ? e : be.isNumber(e) ? new Date(e) : new Date), t
            }
        }]),
        function() {
            function e(l, m, u, p) {
                return {
                    template: function(e, t) {
                        var n = t.mdHideIcons,
                            o = t.inputAriaDescribedby,
                            r = t.inputAriaLabelledby,
                            i = t.ariaLabel || t.mdPlaceholder,
                            a = t.ngModelOptions,
                            d = "all" === n || "calendar" === n ? "" : '<md-button class="md-datepicker-button md-icon-button" type="button" tabindex="-1" aria-hidden="true" ng-click="ctrl.openCalendarPane($event)"><md-icon class="md-datepicker-calendar-icon" aria-label="md-calendar" md-svg-src="' + l.mdCalendar + '"></md-icon></md-button>',
                            s = "";
                        return "all" !== n && "triangle" !== n && (s = '<md-button type="button" md-no-ink class="md-datepicker-triangle-button md-icon-button" ng-click="ctrl.openCalendarPane($event)" aria-label="{{::ctrl.locale.msgOpenCalendar}}"><div class="md-datepicker-expand-triangle"></div></md-button>', e.addClass(c)), d + '<div class="md-datepicker-input-container" ng-class="{\'md-datepicker-focused\': ctrl.isFocused}"><input ' + (i ? 'aria-label="' + i + '" ' : "") + (o ? 'aria-describedby="' + o + '" ' : "") + (r ? 'aria-labelledby="' + r + '" ' : "") + 'class="md-datepicker-input" aria-haspopup="dialog" ng-focus="ctrl.setFocused(true)" ng-blur="ctrl.setFocused(false)"> ' + s + '</div><div class="md-datepicker-calendar-pane md-whiteframe-z1" id="{{::ctrl.calendarPaneId}}"><div class="md-datepicker-input-mask"><div class="md-datepicker-input-mask-opaque"></div></div><div class="md-datepicker-calendar"><md-calendar role="dialog" aria-label="{{::ctrl.locale.msgCalendar}}" md-current-view="{{::ctrl.currentView}}" md-mode="{{::ctrl.mode}}" md-min-date="ctrl.minDate" md-max-date="ctrl.maxDate" md-date-filter="ctrl.dateFilter" md-month-filter="ctrl.monthFilter" ' + (a ? 'ng-model-options="' + a + '" ' : "") + 'ng-model="ctrl.date" ng-if="ctrl.isCalendarOpen"></md-calendar></div></div>'
                    },
                    require: ["ngModel", "mdDatepicker", "?^mdInputContainer", "?^form"],
                    scope: {
                        minDate: "=mdMinDate",
                        maxDate: "=mdMaxDate",
                        placeholder: "@mdPlaceholder",
                        currentView: "@mdCurrentView",
                        mode: "@mdMode",
                        dateFilter: "=mdDateFilter",
                        monthFilter: "=mdMonthFilter",
                        isOpen: "=?mdIsOpen",
                        debounceInterval: "=mdDebounceInterval",
                        dateLocale: "=mdDateLocale"
                    },
                    controller: t,
                    controllerAs: "ctrl",
                    bindToController: !0,
                    link: function(e, t, n, o) {
                        var r = o[0],
                            i = o[1],
                            a = o[2],
                            d = o[3],
                            s = m.parseAttributeBoolean(n.mdNoAsterisk);
                        if (i.configureNgModel(r, a, p), a) {
                            var l = t[0].querySelector(".md-errors-spacer");
                            l && t.after(be.element("<div>").append(l)), a.setHasPlaceholder(n.mdPlaceholder), a.input = t, a.element.addClass(h).toggleClass(f, "calendar" !== n.mdHideIcons && "all" !== n.mdHideIcons), a.label ? s || n.$observe("required", function(e) {
                                a.label.toggleClass("md-required", !!e)
                            }) : u.expect(t, "aria-label", n.mdPlaceholder), e.$watch(a.isErrorGetter || function() {
                                return r.$invalid && (r.$touched || d && d.$submitted)
                            }, a.setInvalid)
                        } else if (d) var c = e.$watch(function() {
                            return d.$submitted
                        }, function(e) {
                            e && (i.updateErrorState(), c())
                        })
                    }
                }
            }
            t.$inject = ["$scope", "$element", "$attrs", "$window", "$mdConstant", "$mdTheming", "$mdUtil", "$mdDateLocale", "$$mdDateUtil", "$$rAF", "$filter", "$timeout"], e.$inject = ["$$mdSvgRegistry", "$mdUtil", "$mdAria", "inputDirective"], be.module("material.components.datepicker").directive("mdDatepicker", e);
            var a = "md-datepicker-invalid",
                m = "md-datepicker-open",
                h = "_md-datepicker-floating-label",
                f = "_md-datepicker-has-calendar-icon",
                c = "_md-datepicker-has-triangle-icon",
                p = /ipad|iphone|ipod|android/i;

            function t(e, t, n, o, r, i, a, d, s, l, c, m) {
                this.$window = o, this.dateUtil = s, this.$mdConstant = r, this.$mdUtil = a, this.$$rAF = l, this.$mdDateLocale = d, this.$timeout = m, this.documentElement = be.element(document.documentElement), this.ngModelCtrl = null, this.inputElement = t[0].querySelector("input"), this.ngInputElement = be.element(this.inputElement), this.inputContainer = t[0].querySelector(".md-datepicker-input-container"), this.calendarPane = t[0].querySelector(".md-datepicker-calendar-pane"), this.calendarButton = t[0].querySelector(".md-datepicker-button"), this.inputMask = be.element(t[0].querySelector(".md-datepicker-input-mask-opaque")), this.$element = t, this.$attrs = n, this.$scope = e, this.date = null, this.isFocused = !1, this.isDisabled = ge, this.setDisabled(t[0].disabled || be.isString(n.disabled)), this.isCalendarOpen = !1, this.openOnFocus = n.hasOwnProperty("mdOpenOnFocus"), this.mdInputContainer = null, this.calendarPaneOpenedFrom = null, this.calendarPaneId = "md-date-pane-" + a.nextUid(), this.bodyClickHandler = be.bind(this, this.handleBodyClick), this.windowEventName = p.test(navigator.userAgent || navigator.vendor || L.opera) ? "orientationchange" : "resize", this.windowEventHandler = a.debounce(be.bind(this, this.closeCalendarPane), 100), this.windowBlurHandler = be.bind(this, this.handleWindowBlur), this.ngDateFilter = c("date"), this.leftMargin = 20, this.topMargin = null, n.tabindex ? (this.ngInputElement.attr("tabindex", n.tabindex), n.$set("tabindex", null)) : n.$set("tabindex", "-1"), n.$set("aria-owns", this.calendarPaneId), i(t), i(be.element(this.calendarPane));
                var u = this;
                e.$on("$destroy", function() {
                    u.detachCalendarPane()
                }), n.mdIsOpen && e.$watch("ctrl.isOpen", function(e) {
                    e ? u.openCalendarPane({
                        target: u.inputElement
                    }) : u.closeCalendarPane()
                }), 1 === be.version.major && be.version.minor <= 4 && this.$onInit()
            }
            t.prototype.$onInit = function() {
                this.locale = this.dateLocale ? be.extend({}, this.$mdDateLocale, this.dateLocale) : this.$mdDateLocale, this.installPropertyInterceptors(), this.attachChangeListeners(), this.attachInteractionListeners()
            }, t.prototype.configureNgModel = function(e, t, n) {
                this.ngModelCtrl = e, this.mdInputContainer = t, this.$attrs.$set("type", "date"), n[0].link.pre(this.$scope, {
                    on: be.noop,
                    val: be.noop,
                    0: {}
                }, this.$attrs, [e]);
                var o = this;
                o.ngModelCtrl.$formatters.push(function(e) {
                    var t = be.isDefined(e) ? e : null;
                    if (!(e instanceof Date) && (t = Date.parse(e), !isNaN(t) && be.isNumber(t) && (e = new Date(t)), e && !(e instanceof Date))) throw Error("The ng-model for md-datepicker must be a Date instance or a value that can be parsed into a date. Currently the model is of type: " + typeof e);
                    return o.onExternalChange(e), e
                }), e.$viewChangeListeners.unshift(be.bind(this, this.updateErrorState));
                var r = o.$mdUtil.getModelOption(e, "updateOn");
                r && this.ngInputElement.on(r, be.bind(this.$element, this.$element.triggerHandler, r))
            }, t.prototype.attachChangeListeners = function() {
                var n = this;
                n.$scope.$on("md-calendar-change", function(e, t) {
                    n.setModelValue(t), n.onExternalChange(t), n.closeCalendarPane()
                }), n.ngInputElement.on("input", be.bind(n, n.resizeInputElement));
                var e = be.isDefined(this.debounceInterval) ? this.debounceInterval : 500;
                n.ngInputElement.on("input", n.$mdUtil.debounce(n.handleInputEvent, e, n))
            }, t.prototype.attachInteractionListeners = function() {
                var t = this,
                    n = this.$scope,
                    o = this.$mdConstant.KEY_CODE;
                t.ngInputElement.on("keydown", function(e) {
                    e.altKey && e.keyCode === o.DOWN_ARROW && (t.openCalendarPane(e), n.$digest())
                }), t.openOnFocus && (t.ngInputElement.on("focus", be.bind(t, t.openCalendarPane)), t.ngInputElement.on("click", function(e) {
                    e.stopPropagation()
                }), t.ngInputElement.on("pointerdown", function(e) {
                    e.target && e.target.setPointerCapture && e.target.setPointerCapture(e.pointerId)
                }), be.element(t.$window).on("blur", t.windowBlurHandler), n.$on("$destroy", function() {
                    be.element(t.$window).off("blur", t.windowBlurHandler)
                })), n.$on("md-calendar-close", function() {
                    t.closeCalendarPane()
                })
            }, t.prototype.installPropertyInterceptors = function() {
                var t = this;
                if (this.$attrs.ngDisabled) {
                    var e = this.$scope.$parent;
                    e && e.$watch(this.$attrs.ngDisabled, function(e) {
                        t.setDisabled(e)
                    })
                }
                Object.defineProperty(this, "placeholder", {
                    get: function() {
                        return t.inputElement.placeholder
                    },
                    set: function(e) {
                        t.inputElement.placeholder = e || ""
                    }
                })
            }, t.prototype.setDisabled = function(e) {
                this.isDisabled = e, this.inputElement.disabled = e, this.calendarButton && (this.calendarButton.disabled = e)
            }, t.prototype.updateErrorState = function(e) {
                var t;
                if (t = e ? new Date(e.valueOf()) : be.isString(this.ngModelCtrl.$modelValue) ? new Date(this.ngModelCtrl.$modelValue) : be.copy(this.ngModelCtrl.$modelValue), this.clearErrorState(), this.dateUtil.isValidDate(t)) {
                    if (t = this.dateUtil.createDateAtMidnight(t), this.dateUtil.isValidDate(this.minDate)) {
                        var n = this.dateUtil.createDateAtMidnight(this.minDate);
                        this.ngModelCtrl.$setValidity("mindate", n <= t)
                    }
                    if (this.dateUtil.isValidDate(this.maxDate)) {
                        var o = this.dateUtil.createDateAtMidnight(this.maxDate);
                        this.ngModelCtrl.$setValidity("maxdate", t <= o)
                    }
                    be.isFunction(this.dateFilter) && this.ngModelCtrl.$setValidity("filtered", this.dateFilter(t)), be.isFunction(this.monthFilter) && this.ngModelCtrl.$setValidity("filtered", this.monthFilter(t))
                } else this.ngModelCtrl.$setValidity("valid", null == t);
                var r = this.inputElement.value,
                    i = this.locale.parseDate(r);
                !this.isInputValid(r, i) && this.ngModelCtrl.$valid && this.ngModelCtrl.$setValidity("valid", null == t), be.element(this.inputContainer).toggleClass(a, this.ngModelCtrl.$invalid && (this.ngModelCtrl.$touched || this.ngModelCtrl.$submitted))
            }, t.prototype.isInputValid = function(e, t) {
                return "" === e || this.dateUtil.isValidDate(t) && this.locale.isDateComplete(e) && this.isDateEnabled(t)
            }, t.prototype.clearErrorState = function() {
                this.inputContainer.classList.remove(a), ["mindate", "maxdate", "filtered", "valid"].forEach(function(e) {
                    this.ngModelCtrl.$setValidity(e, !0)
                }, this)
            }, t.prototype.resizeInputElement = function() {
                this.inputElement.size = this.inputElement.value.length + 3
            }, t.prototype.handleInputEvent = function() {
                var e = this.inputElement.value,
                    t = e ? this.locale.parseDate(e) : null;
                this.dateUtil.setDateTimeToMidnight(t), this.isInputValid(e, t) && (this.setModelValue(t), this.date = t), this.updateErrorState(t)
            }, t.prototype.isDateEnabled = function(e) {
                return this.dateUtil.isDateWithinRange(e, this.minDate, this.maxDate) && (!be.isFunction(this.dateFilter) || this.dateFilter(e)) && (!be.isFunction(this.monthFilter) || this.monthFilter(e))
            }, t.prototype.attachCalendarPane = function() {
                var e = this.calendarPane,
                    t = document.body;
                e.style.transform = "", this.$element.addClass(m), this.mdInputContainer && this.mdInputContainer.element.addClass(m), be.element(t).addClass("md-datepicker-is-showing");
                var n = this.inputContainer.getBoundingClientRect(),
                    o = t.getBoundingClientRect();
                (!this.topMargin || this.topMargin < 0) && (this.topMargin = (this.inputMask.parent().prop("clientHeight") - this.ngInputElement.prop("clientHeight")) / 2);
                var r = n.top - o.top - this.topMargin,
                    i = n.left - o.left - this.leftMargin,
                    a = o.top < 0 && 0 === document.body.scrollTop ? -o.top : document.body.scrollTop,
                    d = o.left < 0 && 0 === document.body.scrollLeft ? -o.left : document.body.scrollLeft,
                    s = a + this.$window.innerHeight,
                    l = d + this.$window.innerWidth;
                if (this.inputMask.css({
                        position: "absolute",
                        left: this.leftMargin + "px",
                        top: this.topMargin + "px",
                        width: n.width - 1 + "px",
                        height: n.height - 2 + "px"
                    }), l < i + 360) {
                    if (0 < l - 360) i = l - 360;
                    else {
                        i = d;
                        var c = this.$window.innerWidth / 360;
                        e.style.transform = "scale(" + c + ")"
                    }
                    e.classList.add("md-datepicker-pos-adjusted")
                }
                s < r + 368 && a < s - 368 && (r = s - 368, e.classList.add("md-datepicker-pos-adjusted")), e.style.left = i + "px", e.style.top = r + "px", document.body.appendChild(e), this.$$rAF(function() {
                    e.classList.add("md-pane-open")
                })
            }, t.prototype.detachCalendarPane = function() {
                this.$element.removeClass(m), this.mdInputContainer && this.mdInputContainer.element.removeClass(m), be.element(document.body).removeClass("md-datepicker-is-showing"), this.calendarPane.classList.remove("md-pane-open"), this.calendarPane.classList.remove("md-datepicker-pos-adjusted"), this.isCalendarOpen && this.$mdUtil.enableScrolling(), this.calendarPane.parentNode && this.calendarPane.parentNode.removeChild(this.calendarPane)
            }, t.prototype.openCalendarPane = function(e) {
                if (this.isCalendarOpen || this.isDisabled || this.inputFocusedOnWindowBlur) this.inputFocusedOnWindowBlur && this.resetInputFocused();
                else {
                    this.isCalendarOpen = this.isOpen = !0, this.calendarPaneOpenedFrom = e.target, this.$mdUtil.disableScrollAround(this.calendarPane), this.attachCalendarPane(), this.focusCalendar(), this.evalAttr("ngFocus");
                    var t = this;
                    this.$mdUtil.nextTick(function() {
                        t.documentElement.on("click touchstart", t.bodyClickHandler)
                    }, !1), L.addEventListener(this.windowEventName, this.windowEventHandler)
                }
            }, t.prototype.closeCalendarPane = function() {
                if (this.isCalendarOpen) {
                    var e = this;
                    e.detachCalendarPane(), e.ngModelCtrl.$setTouched(), e.evalAttr("ngBlur"), e.documentElement.off("click touchstart", e.bodyClickHandler), L.removeEventListener(e.windowEventName, e.windowEventHandler), e.calendarPaneOpenedFrom.focus(), e.calendarPaneOpenedFrom = null, e.openOnFocus ? e.$timeout(t) : t()
                }

                function t() {
                    e.isCalendarOpen = e.isOpen = !1
                }
            }, t.prototype.getCalendarCtrl = function() {
                return be.element(this.calendarPane.querySelector("md-calendar")).controller("mdCalendar")
            }, t.prototype.focusCalendar = function() {
                var e = this;
                this.$mdUtil.nextTick(function() {
                    e.getCalendarCtrl().focusDate(e.date)
                }, !1)
            }, t.prototype.setFocused = function(e) {
                e || this.ngModelCtrl.$setTouched(), this.openOnFocus || this.evalAttr(e ? "ngFocus" : "ngBlur"), this.isFocused = e
            }, t.prototype.handleBodyClick = function(e) {
                this.isCalendarOpen && (this.$mdUtil.getClosest(e.target, "md-calendar") || this.closeCalendarPane(), this.$scope.$digest())
            }, t.prototype.handleWindowBlur = function() {
                this.inputFocusedOnWindowBlur = document.activeElement === this.inputElement
            }, t.prototype.resetInputFocused = function() {
                this.inputFocusedOnWindowBlur = !1
            }, t.prototype.evalAttr = function(e) {
                this.$attrs[e] && this.$scope.$parent.$eval(this.$attrs[e])
            }, t.prototype.setModelValue = function(e) {
                var t = this.$mdUtil.getModelOption(this.ngModelCtrl, "timezone");
                null == t || null == e || e.getTimezoneOffset() < 0 ? this.ngModelCtrl.$setViewValue(this.ngDateFilter(e, "yyyy-MM-dd"), "default") : this.ngModelCtrl.$setViewValue(this.ngDateFilter(e, "yyyy-MM-dd", t), "default")
            }, t.prototype.onExternalChange = function(e) {
                var t = this,
                    n = this.$mdUtil.getModelOption(this.ngModelCtrl, "timezone");
                this.dateUtil.isValidDate(e) && null != n && 0 <= e.getTimezoneOffset() ? this.date = this.dateUtil.removeLocalTzAndReparseDate(e) : this.date = e, null == n || null == e || e.getTimezoneOffset() < 0 ? this.inputElement.value = this.locale.formatDate(e) : this.inputElement.value = this.locale.formatDate(e, n), this.mdInputContainer && this.mdInputContainer.setHasValue(!!e), this.resizeInputElement(), this.$mdUtil.nextTick(function() {
                    t.updateErrorState()
                }, !1, t.$scope)
            }
        }(), Ee.$inject = ["$$rAF", "$mdTheming", "$mdDialog"], ve.$inject = ["$$interimElementProvider"], be.module("material.components.dialog", ["material.core", "material.components.backdrop"]).directive("mdDialog", Ee).provider("$mdDialog", ve), $e.$inject = ["$mdTheming"], be.module("material.components.divider", ["material.core"]).directive("mdDivider", $e), Me.$inject = ["$mdUtil"], be.module("material.components.fabActions", ["material.core"]).directive("mdFabActions", Me), ye.$inject = ["$scope", "$element", "$animate", "$mdUtil", "$mdConstant", "$timeout"], be.module("material.components.fabShared", ["material.core"]).controller("MdFabController", ye),
        function() {
            e.$inject = ["$timeout"], t.$inject = ["$timeout"];
            var n = 300;

            function e(t) {
                function o(e) {
                    t(e, n, !1)
                }

                function r(e) {
                    if (!e.hasClass("md-animations-waiting") || e.hasClass("_md-animations-ready")) {
                        var t = e[0],
                            s = e.controller("mdFabSpeedDial"),
                            o = t.querySelectorAll(".md-fab-action-item"),
                            l = t.querySelector("md-fab-trigger"),
                            n = t.querySelector("._md-css-variables"),
                            r = parseInt(L.getComputedStyle(n).zIndex);
                        be.forEach(o, function(e, t) {
                            var n = e.style;
                            n.transform = n.webkitTransform = "", n.transitionDelay = "", n.opacity = s.isOpen ? 1 : 0, n.zIndex = o.length - t + r
                        }), l.style.zIndex = r + o.length + 1, s.isOpen || be.forEach(o, function(e, t) {
                            var n, o, r = e.style,
                                i = (l.clientHeight - e.clientHeight) / 2,
                                a = (l.clientWidth - e.clientWidth) / 2;
                            switch (s.direction) {
                                case "up":
                                    n = e.scrollHeight * (t + 1) + i, o = "Y";
                                    break;
                                case "down":
                                    n = -(e.scrollHeight * (t + 1) + i), o = "Y";
                                    break;
                                case "left":
                                    n = e.scrollWidth * (t + 1) + a, o = "X";
                                    break;
                                case "right":
                                    n = -(e.scrollWidth * (t + 1) + a), o = "X"
                            }
                            var d = "translate" + o + "(" + n + "px)";
                            r.transform = r.webkitTransform = d
                        })
                    }
                }
                return {
                    addClass: function(e, t, n) {
                        e.hasClass("md-fling") ? (r(e), o(n)) : n()
                    },
                    removeClass: function(e, t, n) {
                        r(e), o(n)
                    }
                }
            }

            function t(t) {
                function o(e) {
                    t(e, n, !1)
                }

                function r(e) {
                    var t = e[0],
                        r = e.controller("mdFabSpeedDial"),
                        i = t.querySelectorAll(".md-fab-action-item"),
                        n = t.querySelector("._md-css-variables"),
                        a = parseInt(L.getComputedStyle(n).zIndex);
                    be.forEach(i, function(e, t) {
                        var n = e.style,
                            o = 65 * t;
                        n.opacity = r.isOpen ? 1 : 0, n.transform = n.webkitTransform = r.isOpen ? "scale(1)" : "scale(0)", n.transitionDelay = (r.isOpen ? o : i.length - o) + "ms", n.zIndex = i.length - t + a
                    })
                }
                return {
                    addClass: function(e, t, n) {
                        r(e), o(n)
                    },
                    removeClass: function(e, t, n) {
                        r(e), o(n)
                    }
                }
            }
            be.module("material.components.fabSpeedDial", ["material.core", "material.components.fabShared", "material.components.fabActions"]).directive("mdFabSpeedDial", function() {
                return {
                    restrict: "E",
                    scope: {
                        direction: "@?mdDirection",
                        isOpen: "=?mdOpen"
                    },
                    bindToController: !0,
                    controller: "MdFabController",
                    controllerAs: "ctrl",
                    link: function(e, t) {
                        t.prepend('<div class="_md-css-variables"></div>')
                    }
                }
            }).animation(".md-fling", e).animation(".md-scale", t).service("mdFabSpeedDialFlingAnimation", e).service("mdFabSpeedDialScaleAnimation", t)
        }(), be.module("material.components.fabToolbar", ["material.core", "material.components.fabShared", "material.components.fabActions"]).directive("mdFabToolbar", function() {
            return {
                restrict: "E",
                transclude: !0,
                template: '<div class="md-fab-toolbar-wrapper">  <div class="md-fab-toolbar-content" ng-transclude></div></div>',
                scope: {
                    direction: "@?mdDirection",
                    isOpen: "=?mdOpen"
                },
                bindToController: !0,
                controller: "MdFabController",
                controllerAs: "ctrl",
                link: function(e, t, n) {
                    t.addClass("md-fab-toolbar"), t.find("md-fab-trigger").find("button").prepend('<div class="md-fab-toolbar-background"></div>')
                }
            }
        }).animation(".md-fab-toolbar", Ce).service("mdFabToolbarAnimation", Ce), Ae.$inject = ["$mdUtil"], we.$inject = ["$mdUtil"], Te.$inject = ["$interpolate", "$mdConstant", "$mdGridLayout", "$mdMedia", "$mdUtil"], _e.$inject = ["$mdMedia"], be.module("material.components.gridList", ["material.core"]).directive("mdGridList", Te).directive("mdGridTile", _e).directive("mdGridTileFooter", ke).directive("mdGridTileHeader", ke).factory("$mdGridLayout", we), Ae.prototype = {
            invalidateTiles: function() {
                this.tilesInvalidated = !0, this.invalidateLayout()
            },
            invalidateLayout: function() {
                this.layoutInvalidated || (this.layoutInvalidated = !0, this.$timeout_(be.bind(this, this.layout)))
            },
            layout: function() {
                try {
                    this.layoutDelegate(this.tilesInvalidated)
                } finally {
                    this.layoutInvalidated = !1, this.tilesInvalidated = !1
                }
            }
        }, be.module("material.components.icon", ["material.core"]), be.module("material.components.icon").directive("mdIcon", ["$mdIcon", "$mdTheming", "$mdAria", "$sce", function(d, s, l, e) {
            return {
                restrict: "E",
                link: function(e, t, n) {
                    s(t);
                    var o = n.mdFontIcon,
                        r = d.fontSet(n.mdFontSet);
                    n.mdSvgIcon || n.mdSvgSrc || (n.mdFontIcon && t.addClass("md-font " + n.mdFontIcon), t.addClass(r)), n.$observe("mdFontIcon", a), n.$observe("mdFontSet", a), n.role || (l.expect(t, "role", "img"), n.role = "img"), t[0].hasAttribute("aria-label") && "" === n.ariaLabel && t.attr("aria-hidden", !0), "img" !== n.role || n.ariaHidden || l.hasAriaLabel(t) || (t[0].hasAttribute("alt") && "" === n.alt ? t.attr("aria-hidden", !0) : n.alt ? l.expect(t, "aria-label", n.alt) : l.parentHasAriaLabel(t, 2) ? l.expect(t, "aria-hidden", "true") : n.mdFontIcon || n.mdSvgIcon || t.text() ? l.expect(t, "aria-label", n.mdFontIcon || n.mdSvgIcon || t.text()) : l.expect(t, "aria-hidden", "true"));
                    var i = n.$normalize(n.$attr.mdSvgIcon || n.$attr.mdSvgSrc || "");

                    function a() {
                        if (!n.mdSvgIcon && !n.mdSvgSrc) {
                            n.mdFontIcon && (t.removeClass(o), t.addClass(n.mdFontIcon), o = n.mdFontIcon);
                            var e = d.fontSet(n.mdFontSet);
                            r !== e && (t.removeClass(r), t.addClass(e), r = e)
                        }
                    }
                    i && n.$observe(i, function(e) {
                        t.empty(), e && d(e).then(function(e) {
                            t.empty(), t.append(e)
                        })
                    })
                }
            }
        }]),
        function() {
            a.$inject = ["config", "$templateRequest", "$q", "$log", "$mdUtil", "$sce"], be.module("material.components.icon").constant("$$mdSvgRegistry", {
                mdTabsArrow: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwb2x5Z29uIHBvaW50cz0iMTUuNCw3LjQgMTQsNiA4LDEyIDE0LDE4IDE1LjQsMTYuNiAxMC44LDEyICIvPjwvZz48L3N2Zz4=",
                mdClose: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xOSA2LjQxbC0xLjQxLTEuNDEtNS41OSA1LjU5LTUuNTktNS41OS0xLjQxIDEuNDEgNS41OSA1LjU5LTUuNTkgNS41OSAxLjQxIDEuNDEgNS41OS01LjU5IDUuNTkgNS41OSAxLjQxLTEuNDEtNS41OS01LjU5eiIvPjwvZz48L3N2Zz4=",
                mdCancel: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik0xMiAyYy01LjUzIDAtMTAgNC40Ny0xMCAxMHM0LjQ3IDEwIDEwIDEwIDEwLTQuNDcgMTAtMTAtNC40Ny0xMC0xMC0xMHptNSAxMy41OWwtMS40MSAxLjQxLTMuNTktMy41OS0zLjU5IDMuNTktMS40MS0xLjQxIDMuNTktMy41OS0zLjU5LTMuNTkgMS40MS0xLjQxIDMuNTkgMy41OSAzLjU5LTMuNTkgMS40MSAxLjQxLTMuNTkgMy41OSAzLjU5IDMuNTl6Ii8+PC9nPjwvc3ZnPg==",
                mdMenu: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGQ9Ik0zLDZIMjFWOEgzVjZNMywxMUgyMVYxM0gzVjExTTMsMTZIMjFWMThIM1YxNloiIC8+PC9zdmc+",
                mdToggleArrow: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiPjxwYXRoIGQ9Ik0yNCAxNmwtMTIgMTIgMi44MyAyLjgzIDkuMTctOS4xNyA5LjE3IDkuMTcgMi44My0yLjgzeiIvPjxwYXRoIGQ9Ik0wIDBoNDh2NDhoLTQ4eiIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==",
                mdCalendar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTkgM2gtMVYxaC0ydjJIOFYxSDZ2Mkg1Yy0xLjExIDAtMS45OS45LTEuOTkgMkwzIDE5YzAgMS4xLjg5IDIgMiAyaDE0YzEuMSAwIDItLjkgMi0yVjVjMC0xLjEtLjktMi0yLTJ6bTAgMTZINVY4aDE0djExek03IDEwaDV2NUg3eiIvPjwvc3ZnPg==",
                mdChecked: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnPjxwYXRoIGQ9Ik05IDE2LjE3TDQuODMgMTJsLTEuNDIgMS40MUw5IDE5IDIxIDdsLTEuNDEtMS40MXoiLz48L2c+PC9zdmc+"
            }).provider("$mdIcon", e);
            var i = {
                defaultViewBoxSize: 24,
                defaultFontSet: "material-icons",
                fontSets: []
            };

            function e() {}

            function o(e, t) {
                this.url = e, this.viewBoxSize = t || i.defaultViewBoxSize
            }

            function a(a, i, d, s, c, t) {
                var n = {},
                    l = {},
                    o = /[-\w@:%+.~#?&//=]{2,}\.[a-z]{2,4}\b(\/[-\w@:%+.~#?&//=]*)?/i,
                    m = /^data:image\/svg\+xml[\s*;\w\-=]*?(base64)?,(.*)$/i;
                return g.prototype = {
                    clone: function() {
                        return this.element.cloneNode(!0)
                    },
                    prepare: function() {
                        var e = this.config ? this.config.viewBoxSize : a.defaultViewBoxSize;
                        be.forEach({
                            fit: "",
                            height: "100%",
                            width: "100%",
                            preserveAspectRatio: "xMidYMid meet",
                            viewBox: this.element.getAttribute("viewBox") || "0 0 " + e + " " + e,
                            focusable: !1
                        }, function(e, t) {
                            this.element.setAttribute(t, e)
                        }, this)
                    }
                }, e.fontSet = function(t) {
                    if (be.isUndefined(t) || !t || !t.length) return a.defaultFontSet;
                    var n = t;
                    return be.forEach(a.fontSets, function(e) {
                        e.alias === t && (n = e.fontSet || n)
                    }), n
                }, e;

                function e(e) {
                    return e = e || "", be.isString(e) || (e = t.getTrustedUrl(e)), n[e] ? d.when(r(n[e])) : o.test(e) || m.test(e) ? b(e).then(p(e)) : (-1 === e.indexOf(":") && (e = "$default:" + e), (a[e] ? h : f)(e).then(p(e)))
                }

                function r(e) {
                    var n, o, r, i, a = e.clone(),
                        d = c.nextUid(),
                        s = ["clip-path", "color-profile", "cursor", "fill", "filter", "href", "marker-start", "marker-mid", "marker-end", "mask", "stroke", "style", "vector-effect"],
                        l = a.innerHTML === ge;
                    if (!isFinite(Number(d))) throw new Error("Unsafe and unexpected non-number result from $mdUtil.nextUid().");
                    return n = "_cache" + d, a.id && (a.id += n), be.forEach(a.querySelectorAll("[id]"), function(t) {
                        for (o = "", r = 0; r < s.length; r++) o += "[" + s[r] + '="url(#' + t.id + ')"]', r + 1 < s.length && (o += ", ");
                        be.forEach(a.querySelectorAll(o), function(e) {
                            u(t, e, l, d)
                        }), be.forEach(a.querySelectorAll("style"), function(e) {
                            u(t, e, l, d)
                        }), be.forEach(a.querySelectorAll("[*|href]:not([href])"), function(e) {
                            (i = e.getAttribute("xlink:href")) && (i = i.replace("#" + t.id, "#" + t.id + n), e.setAttribute("xlink:href", i))
                        }), t.id += n
                    }), a
                }

                function u(e, t, n, o) {
                    var r, i;
                    if (!isFinite(Number(o))) throw new Error("Unsafe and unexpected non-number result for newUid.");
                    i = "_cache" + o, n ? (r = (r = c.getOuterHTML(t)).replace("url(#" + e.id + ")", "url(#" + e.id + i + ")"), t.textContent = be.element(r)[0].innerHTML) : t.outerHTML = t.outerHTML.replace("url(#" + e.id + ")", "url(#" + e.id + i + ")")
                }

                function p(t) {
                    return function(e) {
                        return n[t] = function(e) {
                            return be.isDefined(e.element) && be.isDefined(e.config)
                        }(e) ? e : new g(e, a[t]), r(n[t])
                    }
                }

                function h(e) {
                    var t = a[e];
                    return b(t.url).then(function(e) {
                        return new g(e, t)
                    })
                }

                function f(o) {
                    var e = o.substring(0, o.lastIndexOf(":")) || "$default",
                        r = a[e];
                    return r ? b(r.url).then(function(e) {
                        var t = o.slice(o.lastIndexOf(":") + 1),
                            n = e.querySelector("#" + t);
                        return n ? new g(n, r) : i(o)
                    }) : i(o);

                    function i(e) {
                        var t = "icon " + e + " not found";
                        return s.warn(t), d.reject(t || e)
                    }
                }

                function b(e) {
                    return m.test(e) ? (t = e, n = m.exec(t), r = /base64/i.test(t) ? L.atob(n[2]) : n[2], d.when(be.element(r)[0])) : (o = e, d(function(t, n) {
                        i(o, !0).then(function(e) {
                            l[o] || (l[o] = be.element("<div>").append(e)[0].querySelector("svg")), t(l[o])
                        }, function(e) {
                            var t = be.isString(e) ? e : e.message || e.data || e.statusText;
                            s.warn(t), n(e)
                        })
                    }));
                    var o, t, n, r
                }

                function g(e, t) {
                    if (e && "symbol" === e.tagName.toLowerCase()) {
                        var n = e.getAttribute("viewBox");
                        e = e.innerHTML ? be.element('<svg xmlns="http://www.w3.org/2000/svg">').html(e.innerHTML)[0] : be.element('<svg xmlns="http://www.w3.org/2000/svg">').append(c.getInnerHTML(e))[0], n && e.setAttribute("viewBox", n)
                    }
                    e && "svg" !== e.tagName.toLowerCase() && (e = be.element('<svg xmlns="http://www.w3.org/2000/svg">').append(e.cloneNode(!0))[0]), e.getAttribute("xmlns") || e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), this.element = e, this.config = t, this.prepare()
                }
            }
            e.prototype = {
                icon: function(e, t, n) {
                    return -1 == e.indexOf(":") && (e = "$default:" + e), i[e] = new o(t, n), this
                },
                iconSet: function(e, t, n) {
                    return i[e] = new o(t, n), this
                },
                defaultIconSet: function(e, t) {
                    var n = "$default";
                    return i[n] || (i[n] = new o(e, t)), i[n].viewBoxSize = t || i.defaultViewBoxSize, this
                },
                defaultViewBoxSize: function(e) {
                    return i.defaultViewBoxSize = e, this
                },
                fontSet: function(e, t) {
                    return i.fontSets.push({
                        alias: e,
                        fontSet: t || e
                    }), this
                },
                defaultFontSet: function(e) {
                    return i.defaultFontSet = e || "", this
                },
                defaultIconSize: function(e) {
                    return i.defaultIconSize = e, this
                },
                $get: ["$templateRequest", "$q", "$log", "$mdUtil", "$sce", function(e, t, n, o, r) {
                    return a(i, e, t, n, o, r)
                }]
            }
        }(),
        function() {
            t.$inject = ["$mdTheming", "$parse", "$$rAF"], n.$inject = ["$mdUtil", "$window", "$mdAria", "$timeout", "$mdGesture"], o.$inject = ["$animate", "$mdUtil"], r.$inject = ["$compile"], c.$inject = ["$mdUtil"], i.$inject = ["$document", "$timeout"], m.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil"], u.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil"], p.$inject = ["$$AnimateRunner", "$animateCss", "$mdUtil", "$log"];
            var e = be.module("material.components.input", ["material.core"]).directive("mdInputContainer", t).directive("label", function() {
                return {
                    restrict: "E",
                    require: "^?mdInputContainer",
                    link: function(e, t, n, o) {
                        !o || n.mdNoFloat || t.hasClass("md-container-ignore") || (o.label = t, e.$on("$destroy", function() {
                            o.label = null
                        }))
                    }
                }
            }).directive("input", n).directive("textarea", n).directive("mdMaxlength", o).directive("placeholder", r).directive("ngMessages", function() {
                return {
                    restrict: "EA",
                    link: function(e, t, n, o) {
                        if (!o) return;
                        t.toggleClass("md-input-messages-animation", !0), t.toggleClass("md-auto-hide", !0), "false" != n.mdAutoHide && ! function(t) {
                            return l.some(function(e) {
                                return t[e]
                            })
                        }(n) || t.toggleClass("md-auto-hide", !1)
                    },
                    require: "^^?mdInputContainer"
                }
            }).directive("ngMessage", c).directive("ngMessageExp", c).directive("mdSelectOnFocus", i).animation(".md-input-invalid", m).animation(".md-input-messages-animation", u).animation(".md-input-message-animation", p);

            function t(r, i, a) {
                n.$inject = ["$scope", "$element", "$attrs", "$animate"];
                var e = ["INPUT", "TEXTAREA", "SELECT", "MD-SELECT"],
                    t = e.reduce(function(e, t) {
                        return e.concat(["md-icon ~ " + t, ".md-icon ~ " + t])
                    }, []).join(","),
                    d = e.reduce(function(e, t) {
                        return e.concat([t + " ~ md-icon", t + " ~ .md-icon"])
                    }, []).join(",");
                return {
                    restrict: "E",
                    compile: function(e) {
                        var n = e[0].querySelector(t),
                            o = e[0].querySelector(d);
                        return function(e, t) {
                            r(t), (n || o) && a(function() {
                                var e = t[0].querySelector("md-icon") || t[0].querySelector(".md-icon");
                                n && e && t.addClass("md-icon-left"), o && e && t.addClass("md-icon-right")
                            })
                        }
                    },
                    controller: n
                };

                function n(e, t, n, o) {
                    var r = this;
                    t.addClass("md-auto-horizontal-margin"), r.isErrorGetter = n.mdIsError && i(n.mdIsError), r.delegateClick = function() {
                        r.input.focus()
                    }, r.element = t, r.setFocused = function(e) {
                        t.toggleClass("md-input-focused", !!e)
                    }, r.setHasValue = function(e) {
                        t.toggleClass("md-input-has-value", !!e)
                    }, r.setHasPlaceholder = function(e) {
                        t.toggleClass("md-input-has-placeholder", !!e)
                    }, r.setInvalid = function(e) {
                        e ? o.addClass(t, "md-input-invalid") : o.removeClass(t, "md-input-invalid")
                    }, e.$watch(function() {
                        return r.label && r.input
                    }, function(e) {
                        e && !r.label.attr("for") && r.label.attr("for", r.input.attr("id"))
                    })
                }
            }

            function n(b, g, E, v, $) {
                return {
                    restrict: "E",
                    require: ["^?mdInputContainer", "?ngModel", "?^form"],
                    link: function(c, m, u, e) {
                        var p = e[0],
                            h = !!e[1],
                            f = e[1] || b.fakeNgModel(),
                            t = e[2],
                            n = be.isDefined(u.readonly),
                            o = b.parseAttributeBoolean(u.mdNoAsterisk),
                            r = m[0].tagName.toLowerCase();
                        if (!p) return; {
                            if ("hidden" === u.type) return void m.attr("aria-hidden", "true");
                            if (p.input) {
                                if (p.input[0].contains(m[0])) return;
                                throw new Error("<md-input-container> can only have *one* <input>, <textarea> or <md-select> child element!")
                            }
                        }
                        p.input = m, p.label && u.$observe("required", function(e) {
                            p.label && p.label.toggleClass("md-required", e && !o)
                        });
                        var i = be.element('<div class="md-errors-spacer">');
                        m.after(i);
                        var a = be.isString(u.placeholder) ? u.placeholder.trim() : "";
                        p.label || a.length || E.expect(m, "aria-label");
                        m.addClass("md-input"), m.attr("id") || m.attr("id", "input_" + b.nextUid());
                        "input" === r && "number" === u.type && u.min && u.max && !u.step ? m.attr("step", "any") : "textarea" === r && function() {
                            var t = !u.hasOwnProperty("mdNoAutogrow");
                            if (function() {
                                    if (u.hasOwnProperty("mdNoResize")) return;
                                    var e = be.element('<div class="md-resize-handle"></div>'),
                                        t = !1,
                                        n = 0,
                                        o = p.element,
                                        r = $.register(e, "drag", {
                                            horizontal: !1
                                        });

                                    function i(e) {
                                        e.preventDefault(), t = !0, e.clientY, n = parseFloat(m.css("height")) || m.prop("offsetHeight")
                                    }

                                    function a(e) {
                                        t && (e.preventDefault(), l(), o.addClass("md-input-resized"))
                                    }

                                    function d(e) {
                                        t && m.css("height", n + e.pointer.distanceY + "px")
                                    }

                                    function s(e) {
                                        t && (t = !1, o.removeClass("md-input-resized"))
                                    }
                                    m.wrap('<div class="md-resize-wrapper">').after(e), e.on("mousedown", i), o.on("$md.dragstart", a).on("$md.drag", d).on("$md.dragend", s), c.$on("$destroy", function() {
                                        e.off("mousedown", i).remove(), o.off("$md.dragstart", a).off("$md.drag", d).off("$md.dragend", s), r(), r = o = e = null
                                    })
                                }(), !t) return;
                            var o = u.hasOwnProperty("rows") ? parseInt(u.rows) : NaN,
                                r = u.hasOwnProperty("maxRows") ? parseInt(u.maxRows) : NaN,
                                n = c.$on("md-resize-textarea", d),
                                i = null,
                                a = m[0];
                            v(function() {
                                b.nextTick(d)
                            }, 10, !1), m.on("input", d), h && f.$formatters.push(s);
                            o || m.attr("rows", 1);

                            function d() {
                                m.attr("rows", 1).css("height", "auto").addClass("md-no-flex");
                                var e = function() {
                                    var e = a.offsetHeight,
                                        t = a.scrollHeight - e;
                                    return e + Math.max(t, 0)
                                }();
                                if (!i) {
                                    var t = m[0].style.padding || "";
                                    i = m.css("padding", 0).prop("offsetHeight"), m[0].style.padding = t
                                }
                                if (o && i && (e = Math.max(e, i * o)), r && i) {
                                    var n = i * r;
                                    n < e ? (m.attr("md-no-autogrow", ""), e = n) : m.removeAttr("md-no-autogrow")
                                }
                                i && m.attr("rows", Math.round(e / i)), m.css("height", e + "px").removeClass("md-no-flex")
                            }

                            function s(e) {
                                return b.nextTick(d), e
                            }

                            function l() {
                                if (t && (t = !1, be.element(g).off("resize", d), n && n(), m.attr("md-no-autogrow", "").off("input", d), h)) {
                                    var e = f.$formatters.indexOf(s); - 1 < e && f.$formatters.splice(e, 1)
                                }
                            }
                            if (be.element(g).on("resize", d), c.$on("$destroy", l), u.hasOwnProperty("mdDetectHidden")) {
                                var e = function() {
                                    var t = !1;
                                    return function() {
                                        var e = 0 === a.offsetHeight;
                                        !1 == e && !0 === t && d(), t = e
                                    }
                                }();
                                c.$watch(function() {
                                    return b.nextTick(e, !1), !0
                                })
                            }
                        }();
                        h || l();
                        var d = p.isErrorGetter || function() {
                            return f.$invalid && (f.$touched || t && t.$submitted)
                        };
                        c.$watch(d, p.setInvalid), u.ngValue && u.$observe("value", l);
                        f.$parsers.push(s), f.$formatters.push(s), m.on("input", l), n || m.on("focus", function(e) {
                            b.nextTick(function() {
                                p.setFocused(!0)
                            })
                        }).on("blur", function(e) {
                            b.nextTick(function() {
                                p.setFocused(!1), l()
                            })
                        });

                        function s(e) {
                            return p.setHasValue(!f.$isEmpty(e)), e
                        }

                        function l() {
                            p.setHasValue(0 < m.val().length || (m[0].validity || {}).badInput)
                        }
                        c.$on("$destroy", function() {
                            p.setFocused(!1), p.setHasValue(!1), p.input = null
                        })
                    }
                }
            }

            function o(p, h) {
                return {
                    restrict: "A",
                    require: ["ngModel", "^mdInputContainer"],
                    link: function(e, o, t, n) {
                        var r = parseInt(t.mdMaxlength);
                        isNaN(r) && (r = -1);
                        var i, a, d = n[0],
                            s = n[1],
                            l = !be.isDefined(t.ngTrim) || h.parseAttributeBoolean(t.ngTrim),
                            c = "password" === t.type;

                        function m(e) {
                            return (e = l && !c && be.isString(e) ? e.trim() : e) !== ge && null !== e || (e = ""), String(e).length
                        }

                        function u() {
                            i && i.parent() && i.text(m(o.val()) + " / " + r)
                        }
                        e.$watch(t.mdMaxlength, function(e) {
                            r = e
                        }), d.$validators["md-maxlength"] = function(e, t) {
                            if (!be.isNumber(r) || r < 0) return !0;
                            u();
                            var n = o.val() || t;
                            return n !== ge && null !== n || (n = ""), n = l && !c && be.isString(n) ? n.trim() : n, String(n).length <= r
                        }, d.$isEmpty = function(e) {
                            return 0 === m(e)
                        }, h.nextTick(function() {
                            a = be.element(s.element[0].querySelector(".md-errors-spacer")), i = be.element('<div class="md-char-counter">'), a.append(i), t.$observe("ngTrim", function(e) {
                                l = !be.isDefined(e) || h.parseAttributeBoolean(e)
                            }), e.$watch(t.mdMaxlength, function(e) {
                                be.isNumber(e) && 0 < e ? (i.parent().length || p.enter(i, a), u()) : p.leave(i)
                            })
                        })
                    }
                }
            }

            function r(d) {
                return {
                    restrict: "A",
                    require: "^^?mdInputContainer",
                    priority: 200,
                    link: {
                        pre: function(e, t, n, o) {
                            if (!o) return;
                            var r = o.element.find("label"),
                                i = o.element.attr("md-no-float");
                            if (r && r.length || "" === i || e.$eval(i)) return void o.setHasPlaceholder(!0);
                            if ("MD-SELECT" !== t[0].nodeName) {
                                var a = be.element('<label ng-click="delegateClick()" tabindex="-1" aria-hidden="true">' + n.placeholder + "</label>");
                                n.$set("placeholder", null), o.element.addClass("md-icon-float").prepend(a), d(a)(e)
                            }
                        }
                    }
                }
            }

            function i(a, d) {
                return {
                    restrict: "A",
                    link: function(e, t, n) {
                        if ("INPUT" !== t[0].nodeName && "TEXTAREA" !== t[0].nodeName) return;
                        var o = !1;

                        function r() {
                            d(function() {
                                a[0].activeElement === t[0] && t[0].select(), o = !1
                            }, 1, !(o = !0))
                        }

                        function i(e) {
                            o && e.preventDefault()
                        }
                        t.on("focus", r).on("mouseup", i), e.$on("$destroy", function() {
                            t.off("focus", r).off("mouseup", i)
                        })
                    }
                }
            }
            L._mdMocksIncluded && e.service("$$mdInput", function() {
                return {
                    messages: {
                        getElement: E
                    }
                }
            }).service("mdInputInvalidAnimation", m).service("mdInputMessagesAnimation", u).service("mdInputMessageAnimation", p);
            var a, d, s, l = ["ngIf", "ngShow", "ngHide", "ngSwitchWhen", "ngSwitchDefault"];

            function c(t) {
                return {
                    restrict: "EA",
                    compile: function(n) {
                        if (o(n)) r(n);
                        else if (function() {
                                var e = n[0];
                                for (; e = e.parentNode;)
                                    if (e.nodeType === Node.DOCUMENT_FRAGMENT_NODE) return !0;
                                return !1
                            }()) return function(e, t) {
                            o(t) && r(n)
                        };

                        function o(e) {
                            return !!t.getClosest(e, "md-input-container")
                        }

                        function r(e) {
                            e.toggleClass("md-input-message-animation", !0)
                        }
                    },
                    priority: 100
                }
            }

            function m(e, t, n) {
                return v(e, t, n), {
                    addClass: function(e, t, n) {
                        h(e, n)
                    }
                }
            }

            function u(e, t, n) {
                return v(e, t, n), {
                    enter: function(e, t) {
                        h(e, t)
                    },
                    leave: function(e, t) {
                        f(e, t)
                    },
                    addClass: function(e, t, n) {
                        "ng-hide" == t ? f(e, n) : n()
                    },
                    removeClass: function(e, t, n) {
                        "ng-hide" == t ? h(e, n) : n()
                    }
                }
            }

            function p(e, t, n, o) {
                return v(e, t, n), {
                    enter: function(e, t) {
                        b(e).start().done(t)
                    },
                    leave: function(e, t) {
                        g(e).start().done(t)
                    }
                }
            }

            function h(e, t) {
                var n, o = [],
                    r = E(e),
                    i = r.children();
                0 != r.length && 0 != i.length ? (be.forEach(i, function(e) {
                    n = b(be.element(e)), o.push(n.start())
                }), a.all(o, t)) : t()
            }

            function f(e, t) {
                var n, o = [],
                    r = E(e),
                    i = r.children();
                0 != r.length && 0 != i.length ? (be.forEach(i, function(e) {
                    n = g(be.element(e)), o.push(n.start())
                }), a.all(o, t)) : t()
            }

            function b(e) {
                var t = parseInt(L.getComputedStyle(e[0]).height),
                    n = parseInt(L.getComputedStyle(e[0]).marginTop),
                    o = E(e),
                    r = function(e) {
                        return e.controller("mdInputContainer").element
                    }(e);
                return -t < n || o.hasClass("md-auto-hide") && !r.hasClass("md-input-invalid") ? d(e, {}) : d(e, {
                    event: "enter",
                    structural: !0,
                    from: {
                        opacity: 0,
                        "margin-top": -t + "px"
                    },
                    to: {
                        opacity: 1,
                        "margin-top": "0"
                    },
                    duration: .3
                })
            }

            function g(e) {
                var t = e[0].offsetHeight,
                    n = L.getComputedStyle(e[0]);
                return 0 === parseInt(n.opacity) ? d(e, {}) : d(e, {
                    event: "leave",
                    structural: !0,
                    from: {
                        opacity: 1,
                        "margin-top": 0
                    },
                    to: {
                        opacity: 0,
                        "margin-top": -t + "px"
                    },
                    duration: .3
                })
            }

            function E(e) {
                return e.hasClass("md-input-messages-animation") ? e : e.hasClass("md-input-message-animation") ? be.element(s.getClosest(e, function(e) {
                    return e.classList.contains("md-input-messages-animation")
                })) : be.element(e[0].querySelector(".md-input-messages-animation"))
            }

            function v(e, t, n) {
                a = e, d = t, s = n
            }
        }(), Se.$inject = ["$scope", "$element", "$mdListInkRipple"], xe.$inject = ["$mdTheming"], Ne.$inject = ["$mdAria", "$mdConstant", "$mdUtil", "$timeout"], be.module("material.components.list", ["material.core"]).controller("MdListController", Se).directive("mdList", xe).directive("mdListItem", Ne), be.module("material.components.menu", ["material.core", "material.components.backdrop"]), De.$inject = ["$mdMenu", "$attrs", "$element", "$scope", "$mdUtil", "$timeout", "$rootScope", "$q", "$log"], be.module("material.components.menu").controller("mdMenuCtrl", De), He.$inject = ["$mdUtil"], be.module("material.components.menu").directive("mdMenu", He), Ie.$inject = ["$$interimElementProvider"], be.module("material.components.menu").provider("$mdMenu", Ie), be.module("material.components.menuBar", ["material.core", "material.components.icon", "material.components.menu"]),
        function() {
            e.$inject = ["$scope", "$rootScope", "$element", "$attrs", "$mdConstant", "$document", "$mdUtil", "$timeout"], be.module("material.components.menuBar").controller("MenuBarController", e);
            var l = ["handleKeyDown", "handleMenuHover", "scheduleOpenHoveredMenu", "cancelScheduledOpen"];

            function e(e, t, n, o, r, i, a, d) {
                this.$element = n, this.$attrs = o, this.$mdConstant = r, this.$mdUtil = a, this.$document = i, this.$scope = e, this.$rootScope = t, this.$timeout = d;
                var s = this;
                be.forEach(l, function(e) {
                    s[e] = be.bind(s, s[e])
                })
            }
            e.prototype.init = function() {
                var a = this.$element,
                    d = this.$mdUtil,
                    e = this.$scope,
                    s = this,
                    t = [];
                a.on("keydown", this.handleKeyDown), this.parentToolbar = d.getClosest(a, "MD-TOOLBAR"), t.push(this.$rootScope.$on("$mdMenuOpen", function(e, t) {
                    -1 != s.getMenus().indexOf(t[0]) && (a[0].classList.add("md-open"), t[0].classList.add("md-open"), s.currentlyOpenMenu = t.controller("mdMenu"), s.currentlyOpenMenu.registerContainerProxy(s.handleKeyDown), s.enableOpenOnHover())
                })), t.push(this.$rootScope.$on("$mdMenuClose", function(e, t, n) {
                    var o = s.getMenus(); - 1 != o.indexOf(t[0]) && (a[0].classList.remove("md-open"), t[0].classList.remove("md-open"));
                    var r = be.element(t[0]).controller("mdMenu");
                    if (r.isInMenuBar && r.mdMenuBarCtrl === s) {
                        for (var i = t[0]; i && -1 == o.indexOf(i);) i = d.getClosest(i, "MD-MENU", !0);
                        i && (n.skipFocus || i.querySelector("button:not([disabled])").focus(), s.currentlyOpenMenu = ge), s.disableOpenOnHover(), s.setKeyboardMode(!0)
                    }
                })), e.$on("$destroy", function() {
                    for (s.disableOpenOnHover(); t.length;) t.shift()()
                }), this.setKeyboardMode(!0)
            }, e.prototype.setKeyboardMode = function(e) {
                e ? this.$element[0].classList.add("md-keyboard-mode") : this.$element[0].classList.remove("md-keyboard-mode")
            }, e.prototype.enableOpenOnHover = function() {
                if (!this.openOnHoverEnabled) {
                    var e = this;
                    e.openOnHoverEnabled = !0, e.parentToolbar && (e.parentToolbar.classList.add("md-has-open-menu"), e.$mdUtil.nextTick(function() {
                        be.element(e.parentToolbar).on("click", e.handleParentClick)
                    }, !1)), be.element(e.getMenus()).on("mouseenter", e.handleMenuHover)
                }
            }, e.prototype.handleMenuHover = function(e) {
                this.setKeyboardMode(!1), this.openOnHoverEnabled && this.scheduleOpenHoveredMenu(e)
            }, e.prototype.disableOpenOnHover = function() {
                this.openOnHoverEnabled && (this.openOnHoverEnabled = !1, this.parentToolbar && (this.parentToolbar.classList.remove("md-has-open-menu"), be.element(this.parentToolbar).off("click", this.handleParentClick)), be.element(this.getMenus()).off("mouseenter", this.handleMenuHover))
            }, e.prototype.scheduleOpenHoveredMenu = function(e) {
                var t = be.element(e.currentTarget).controller("mdMenu");
                this.setKeyboardMode(!1), this.scheduleOpenMenu(t)
            }, e.prototype.scheduleOpenMenu = function(e) {
                var t = this,
                    n = this.$timeout;
                e != t.currentlyOpenMenu && (n.cancel(t.pendingMenuOpen), t.pendingMenuOpen = n(function() {
                    t.pendingMenuOpen = ge, t.currentlyOpenMenu && t.currentlyOpenMenu.close(!0, {
                        closeAll: !0
                    }), e.open()
                }, 200, !1))
            }, e.prototype.handleKeyDown = function(e) {
                var t, n, o, r = this.$mdConstant.KEY_CODE,
                    i = this.currentlyOpenMenu,
                    a = i && i.isOpen;
                switch (this.setKeyboardMode(!0), e.keyCode) {
                    case r.DOWN_ARROW:
                        i ? i.focusMenuContainer() : this.openFocusedMenu(), t = !0;
                        break;
                    case r.UP_ARROW:
                        i && i.close(), t = !0;
                        break;
                    case r.LEFT_ARROW:
                        n = this.focusMenu(-1), a && (o = be.element(n).controller("mdMenu"), this.scheduleOpenMenu(o)), t = !0;
                        break;
                    case r.RIGHT_ARROW:
                        n = this.focusMenu(1), a && (o = be.element(n).controller("mdMenu"), this.scheduleOpenMenu(o)), t = !0
                }
                t && (e && e.preventDefault && e.preventDefault(), e && e.stopImmediatePropagation && e.stopImmediatePropagation())
            }, e.prototype.focusMenu = function(e) {
                var t = this.getMenus(),
                    n = this.getFocusedMenuIndex(); - 1 == n && (n = this.getOpenMenuIndex());
                var o = !1;
                if (-1 == n ? o = !(n = 0) : (e < 0 && 0 < n || 0 < e && n < t.length - e) && (n += e, o = !0), o) return t[n].querySelector("button").focus(), t[n]
            }, e.prototype.openFocusedMenu = function() {
                var e = this.getFocusedMenu();
                e && be.element(e).controller("mdMenu").open()
            }, e.prototype.getMenus = function() {
                var e = this.$element;
                return this.$mdUtil.nodesToArray(e[0].children).filter(function(e) {
                    return "MD-MENU" == e.nodeName
                })
            }, e.prototype.getFocusedMenu = function() {
                return this.getMenus()[this.getFocusedMenuIndex()]
            }, e.prototype.getFocusedMenuIndex = function() {
                var e = this.$mdUtil.getClosest(this.$document[0].activeElement, "MD-MENU");
                return e ? this.getMenus().indexOf(e) : -1
            }, e.prototype.getOpenMenuIndex = function() {
                for (var e = this.getMenus(), t = 0; t < e.length; ++t)
                    if (e[t].classList.contains("md-open")) return t;
                return -1
            }, e.prototype.handleParentClick = function(e) {
                var t = this.querySelector("md-menu.md-open");
                t && !t.contains(e.target) && be.element(t).controller("mdMenu").close(!0, {
                    closeAll: !0
                })
            }
        }(), Oe.$inject = ["$mdUtil", "$mdTheming"], be.module("material.components.menuBar").directive("mdMenuBar", Oe), be.module("material.components.menuBar").directive("mdMenuDivider", function() {
            return {
                restrict: "E",
                compile: function(e, t) {
                    t.role || e[0].setAttribute("role", "separator")
                }
            }
        }), Pe.$inject = ["$scope", "$element", "$attrs"], be.module("material.components.menuBar").controller("MenuItemController", Pe), Pe.prototype.init = function(e) {
            var t = this.$element,
                n = this.$attrs;
            this.ngModel = e, "checkbox" != n.type && "radio" != n.type || (this.mode = n.type, this.iconEl = t[0].children[0], this.buttonEl = t[0].children[1], e && this.initClickListeners())
        }, Pe.prototype.clearNgAria = function() {
            var t = this.$element[0];
            be.forEach(["role", "tabindex", "aria-invalid", "aria-checked"], function(e) {
                t.removeAttribute(e)
            })
        }, Pe.prototype.initClickListeners = function() {
            var e = this,
                t = this.ngModel,
                n = this.$scope,
                o = this.$attrs,
                r = (this.$element, this.mode);
            this.handleClick = be.bind(this, this.handleClick);
            var i = this.iconEl,
                a = be.element(this.buttonEl),
                d = this.handleClick;

            function s(e) {
                e ? a.off("click", d) : a.on("click", d)
            }
            o.$observe("disabled", s), s(o.disabled), t.$render = function() {
                e.clearNgAria(),
                    function() {
                        if ("radio" != r) return t.$modelValue;
                        var e = o.ngValue ? n.$eval(o.ngValue) : o.value;
                        return t.$modelValue == e
                    }() ? (i.style.display = "", a.attr("aria-checked", "true")) : (i.style.display = "none", a.attr("aria-checked", "false"))
            }, n.$$postDigest(t.$render)
        }, Pe.prototype.handleClick = function(e) {
            var t, n = this.mode,
                o = this.ngModel,
                r = this.$attrs;
            "checkbox" == n ? t = !o.$modelValue : "radio" == n && (t = r.ngValue ? this.$scope.$eval(r.ngValue) : r.value), o.$setViewValue(t), o.$render()
        }, Le.$inject = ["$mdUtil", "$mdConstant", "$$mdSvgRegistry"], be.module("material.components.menuBar").directive("mdMenuItem", Le), Re.$inject = ["$mdAria", "$mdTheming", "$window", "$mdUtil"], Fe.$inject = ["$element", "$scope", "$timeout", "$mdConstant"], Be.$inject = ["$mdAria", "$$rAF", "$mdUtil", "$window"], Ue.$inject = ["$element"], be.module("material.components.navBar", ["material.core"]).controller("MdNavBarController", Fe).directive("mdNavBar", Re).controller("MdNavItemController", Ue).directive("mdNavItem", Be), Fe.prototype._initTabs = function() {
            this._inkbar = be.element(this._navBarEl.querySelector("md-nav-ink-bar"));
            var n = this;
            this._$timeout(function() {
                n._updateTabs(n.mdSelectedNavItem, null)
            }), this._$scope.$watch("ctrl.mdSelectedNavItem", function(e, t) {
                n._$timeout(function() {
                    n._updateTabs(e, t)
                })
            })
        }, Fe.prototype._updateTabs = function(e, t) {
            var n = this,
                o = this._getTabs(),
                r = e === t;
            if (o) {
                var i = -1,
                    a = this._getTabByName(e),
                    d = this._getTabByName(t);
                d && d.setSelected(!1), a && (a.setSelected(!0), i = o.indexOf(a)), this._$timeout(function() {
                    n._updateInkBarStyles(a, i), a && d && !r && n._moveFocus(d, a)
                })
            }
        }, Fe.prototype._updateInkBarStyles = function(e, t) {
            if (this._inkbar.css({
                    display: t < 0 ? "none" : ""
                }), e) {
                var n = e.getButtonEl(),
                    o = n.offsetLeft,
                    r = n.offsetWidth,
                    i = this._navBarEl.getBoundingClientRect().width,
                    a = r / i,
                    d = o / i * 100;
                this._inkbar.css({
                    transform: "translateX(" + d + "%) scaleX(" + a + ")"
                })
            }
        }, Fe.prototype.updateSelectedTabInkBar = function() {
            this._updateInkBarStyles(this._getSelectedTab())
        }, Fe.prototype._getTabs = function() {
            var e = Array.prototype.slice.call(this._navBarEl.querySelectorAll(".md-nav-item")).map(function(e) {
                return be.element(e).controller("mdNavItem")
            });
            return e.indexOf(ge) ? e : []
        }, Fe.prototype._getTabByName = function(t) {
            return this._findTab(function(e) {
                return e.getName() === t
            })
        }, Fe.prototype._getSelectedTab = function() {
            return this._findTab(function(e) {
                return e.isSelected()
            })
        }, Fe.prototype.getFocusedTab = function() {
            return this._findTab(function(e) {
                return e.hasFocus()
            })
        }, Fe.prototype._findTab = function(e, t) {
            var n, o = this._getTabs();
            for (null == t && (t = 0), n = t; n < o.length; n++)
                if (e(o[n])) return o[n];
            return null
        }, Fe.prototype._findTabReverse = function(e, t) {
            var n = this._getTabs();
            t !== ge && null !== t || (t = n.length - 1);
            for (var o = t; 0 <= o; o--)
                if (e(n[o])) return n[o];
            return null
        }, Fe.prototype.onFocus = function() {
            var e = this._getSelectedTab();
            e && !e.isFocused && e.setFocused(!0)
        }, Fe.prototype._moveFocus = function(e, t) {
            e.setFocused(!1), t.setFocused(!0)
        }, Fe.prototype._focusFirstTab = function() {
            if (this._getTabs()) {
                var e = this._findTab(function(e) {
                    return e._isEnabled()
                });
                e && this._moveFocus(this.getFocusedTab(), e)
            }
        }, Fe.prototype._focusLastTab = function() {
            if (this._getTabs()) {
                var e = this._findTabReverse(function(e) {
                    return e._isEnabled()
                });
                e && this._moveFocus(this.getFocusedTab(), e)
            }
        }, Fe.prototype._focusNextTab = function(e) {
            if (this._getTabs()) {
                var t = this._findTab(function(e) {
                    return e._isEnabled()
                }, e + 1);
                t ? this._moveFocus(this.getFocusedTab(), t) : this._focusFirstTab()
            }
        }, Fe.prototype._focusPreviousTab = function(e) {
            if (this._getTabs()) {
                var t = this._findTabReverse(function(e) {
                    return e._isEnabled()
                }, e - 1);
                t ? this._moveFocus(this.getFocusedTab(), t) : this._focusLastTab()
            }
        }, Fe.prototype.onKeydown = function(e) {
            var t = this._$mdConstant.KEY_CODE,
                n = this._getTabs(),
                o = this.getFocusedTab();
            if (o && n) {
                var r = n.indexOf(o);
                switch (e.keyCode) {
                    case t.UP_ARROW:
                    case t.LEFT_ARROW:
                        e.preventDefault(), this._focusPreviousTab(r);
                        break;
                    case t.DOWN_ARROW:
                    case t.RIGHT_ARROW:
                        e.preventDefault(), this._focusNextTab(r);
                        break;
                    case t.SPACE:
                    case t.ENTER:
                        this._$timeout(function() {
                            o.getButtonEl().click()
                        });
                        break;
                    case t.HOME:
                        e.preventDefault(), this._focusFirstTab();
                        break;
                    case t.END:
                        e.preventDefault(), this._focusLastTab()
                }
            }
        }, Ue.prototype.getNgClassMap = function() {
            return {
                "md-active": this._selected,
                "md-primary": this._selected,
                "md-unselected": !this._selected,
                "md-focused": this.isFocused
            }
        }, Ue.prototype.getName = function() {
            return this.name
        }, Ue.prototype.getButtonEl = function() {
            return this._$element[0].querySelector("._md-nav-button")
        }, Ue.prototype.setSelected = function(e) {
            (this._selected = e) ? this.getButtonEl().setAttribute("tabindex", "0"): this.getButtonEl().setAttribute("tabindex", "-1")
        }, Ue.prototype.isSelected = function() {
            return this._selected
        }, Ue.prototype.setFocused = function(e) {
            (this.isFocused = e) && this.getButtonEl().focus()
        }, Ue.prototype.hasFocus = function() {
            return this.isFocused
        }, Ue.prototype._isEnabled = function() {
            return !this._$element.attr("disabled")
        },
        function() {
            s.$inject = ["presets", "$rootElement", "$rootScope", "$injector", "$window"], be.module("material.components.panel", ["material.core", "material.components.backdrop"]).provider("$mdPanel", function() {
                return {
                    definePreset: e,
                    getAllPresets: t,
                    clearPresets: o,
                    $get: ["$rootElement", "$rootScope", "$injector", "$window", function(e, t, n, o) {
                        return new s(r, e, t, n, o)
                    }]
                }
            });
            var i = 80,
                a = "_md-panel-hidden",
                n = be.element('<div class="_md-panel-focus-trap" tabindex="0"></div>'),
                r = {};

            function e(e, t) {
                if (!e || !t) throw new Error("mdPanelProvider: The panel preset definition is malformed. The name and preset object are required.");
                if (r.hasOwnProperty(e)) throw new Error("mdPanelProvider: The panel preset you have requested has already been defined.");
                delete t.id, delete t.position, delete t.animation, r[e] = t
            }

            function t() {
                return be.copy(r)
            }

            function o() {
                r = {}
            }

            function d(e) {
                return be.isString(e) && (e = [e]), e
            }

            function s(e, t, n, o, r) {
                this._defaultConfigOptions = {
                    bindToController: !0,
                    clickOutsideToClose: !1,
                    disableParentScroll: !1,
                    escapeToClose: !1,
                    focusOnOpen: !0,
                    fullscreen: !1,
                    hasBackdrop: !1,
                    propagateContainerEvents: !1,
                    transformTemplate: be.bind(this, this._wrapTemplate),
                    trapFocus: !1,
                    zIndex: i
                }, this._config = {}, this._presets = e, this._$rootElement = t, this._$rootScope = n, this._$injector = o, this._$window = r, this._$mdUtil = this._$injector.get("$mdUtil"), this._trackedPanels = {}, this._groups = Object.create(null), this.animation = c.animation, this.xPosition = h.xPosition, this.yPosition = h.yPosition, this.interceptorTypes = l.interceptorTypes, this.closeReasons = l.closeReasons, this.absPosition = h.absPosition
            }

            function l(e, t) {
                this._$q = t.get("$q"), this._$mdCompiler = t.get("$mdCompiler"), this._$mdConstant = t.get("$mdConstant"), this._$mdUtil = t.get("$mdUtil"), this._$mdTheming = t.get("$mdTheming"), this._$rootScope = t.get("$rootScope"), this._$animate = t.get("$animate"), this._$mdPanel = t.get("$mdPanel"), this._$log = t.get("$log"), this._$window = t.get("$window"), this._$$rAF = t.get("$$rAF"), this.id = e.id, this.config = e, this.panelContainer = ge, this.panelEl = ge, this.innerWrapper = ge, this.isAttached = !1, this._removeListeners = [], this._topFocusTrap = ge, this._bottomFocusTrap = ge, this._backdropRef = ge, this._restoreScroll = null, this._interceptors = Object.create(null), this._compilerCleanup = null, this._restoreCache = {
                    styles: "",
                    classes: ""
                }
            }

            function h(e) {
                this._$window = e.get("$window"), this._isRTL = e.get("$mdUtil").isRtl(), this._$mdConstant = e.get("$mdConstant"), this._absolute = !1, this._relativeToEl = ge, this._top = "", this._bottom = "", this._left = "", this._right = "", this._translateX = [], this._translateY = [], this._positions = [], this._actualPosition = ge
            }

            function c(e) {
                this._$mdUtil = e.get("$mdUtil"), this._openFrom, this._closeTo, this._animationClass = "", this._openDuration, this._closeDuration, this._rawDuration
            }

            function m(e) {
                var t = be.isString(e) ? document.querySelector(e) : e;
                return be.element(t)
            }

            function u(e, t) {
                if (null !== t && !be.isUndefined(t)) {
                    for (var n, o = Object.keys(e), r = [], i = 0; n = o[i]; i++) {
                        var a = e[n];
                        if (r.push(a), a === t) return
                    }
                    throw new Error("Panel position only accepts the following values:\n" + r.join(" | "))
                }
            }

            function p(e) {
                return be.isNumber(e) ? e + "px" : e
            }
            s.prototype.create = function(e, t) {
                if ("string" == typeof e ? e = this._getPresetByName(e) : "object" != typeof e || !be.isUndefined(t) && t || (t = e, e = {}), e = e || {}, t = t || {}, be.isDefined(t.id) && this._trackedPanels[t.id]) {
                    var n = this._trackedPanels[t.id];
                    return be.extend(n.config, t), n
                }
                this._config = be.extend({
                    id: t.id || "panel_" + this._$mdUtil.nextUid(),
                    scope: this._$rootScope.$new(!0),
                    attachTo: this._$rootElement
                }, this._defaultConfigOptions, t, e);
                var o = new l(this._config, this._$injector);
                return this._trackedPanels[this._config.id] = o, this._config.groupName && (this._config.groupName = d(this._config.groupName), be.forEach(this._config.groupName, function(e) {
                    o.addToGroup(e)
                })), this._config.scope.$on("$destroy", be.bind(o, o.detach)), o
            }, s.prototype.open = function(e, t) {
                var n = this.create(e, t);
                return n.open().then(function() {
                    return n
                })
            }, s.prototype._getPresetByName = function(e) {
                if (!this._presets[e]) throw new Error("mdPanel: The panel preset configuration that you requested does not exist. Use the $mdPanelProvider to create a preset before requesting one.");
                return this._presets[e]
            }, s.prototype.newPanelPosition = function() {
                return new h(this._$injector)
            }, s.prototype.newPanelAnimation = function() {
                return new c(this._$injector)
            }, s.prototype.newPanelGroup = function(e, t) {
                return this._groups[e] || (t = t || {}, this._groups[e] = {
                    panels: [],
                    openPanels: [],
                    maxOpen: 0 < t.maxOpen ? t.maxOpen : 1 / 0
                }), this._groups[e]
            }, s.prototype.setGroupMaxOpen = function(e, t) {
                if (!this._groups[e]) throw new Error("mdPanel: Group does not exist yet. Call newPanelGroup().");
                this._groups[e].maxOpen = t
            }, s.prototype._openCountExceedsMaxOpen = function(e) {
                if (this._groups[e]) {
                    var t = this._groups[e];
                    return 0 < t.maxOpen && t.openPanels.length > t.maxOpen
                }
                return !1
            }, s.prototype._closeFirstOpenedPanel = function(e) {
                var t = this._groups[e];
                t && t.openPanels.length && t.openPanels[0].close()
            }, s.prototype._wrapTemplate = function(e) {
                return '<div class="md-panel-outer-wrapper"><div class="md-panel-inner-wrapper _md-panel-offscreen"><div class="md-panel _md-panel-offscreen">' + (e || "") + "</div></div></div>"
            }, s.prototype._wrapContentElement = function(e) {
                var t = be.element('<div class="md-panel-outer-wrapper"><div class="md-panel-inner-wrapper _md-panel-offscreen"></div></div>');
                return e.addClass("md-panel _md-panel-offscreen"), t.children().eq(0).append(e), t
            }, l.interceptorTypes = {
                CLOSE: "onClose"
            }, l.prototype.open = function() {
                var r = this;
                return this._$q(function(e, t) {
                    var n = r._done(e, r),
                        o = r._simpleBind(r.show, r);
                    r.attach().then(o).then(function() {
                        r.config.groupName && (r.config.groupName = d(r.config.groupName), be.forEach(r.config.groupName, function(e) {
                            r._$mdPanel._openCountExceedsMaxOpen(e) && r._$mdPanel._closeFirstOpenedPanel(e)
                        }))
                    }).then(n).catch(t)
                })
            }, l.prototype.close = function(i) {
                var a = this;
                return this._$q(function(o, r) {
                    a._callInterceptors(l.interceptorTypes.CLOSE).then(function() {
                        var e = a._done(o, a),
                            t = a._simpleBind(a.detach, a),
                            n = a.config.onCloseSuccess || be.noop;
                        n = be.bind(a, n, a, i), a.hide().then(t).then(e).then(n).catch(r)
                    }, r)
                })
            }, l.prototype.attach = function() {
                if (this.isAttached && this.panelEl) return this._$q.when(this);
                var r = this;
                return this._$q(function(e, t) {
                    var n = r._done(e, r),
                        o = r.config.onDomAdded || be.noop;
                    r._$q.all([r._createBackdrop(), r._createPanel().then(function(e) {
                        return r.isAttached = !0, r._addEventListeners(), e
                    }).catch(t)]).then(o).then(n).catch(t)
                })
            }, l.prototype.detach = function() {
                if (!this.isAttached) return this._$q.when(this);
                var o = this,
                    r = o.config.onDomRemoved || be.noop;
                return this._restoreScroll && (this._restoreScroll(), this._restoreScroll = null), this._$q(function(e, t) {
                    var n = o._done(e, o);
                    o._$q.all([(o._removeEventListeners(), o._topFocusTrap && o._topFocusTrap.parentNode && o._topFocusTrap.parentNode.removeChild(o._topFocusTrap), o._bottomFocusTrap && o._bottomFocusTrap.parentNode && o._bottomFocusTrap.parentNode.removeChild(o._bottomFocusTrap), o._restoreCache.classes && (o.panelEl[0].className = o._restoreCache.classes), o.panelEl[0].style.cssText = o._restoreCache.styles || "", o._compilerCleanup(), o.panelContainer.remove(), o.isAttached = !1, o._$q.when(o)), !o._backdropRef || o._backdropRef.detach()]).then(r).then(n).catch(t)
                })
            }, l.prototype.destroy = function() {
                var t = this;
                this.config.groupName && (this.config.groupName = d(this.config.groupName), be.forEach(this.config.groupName, function(e) {
                    t.removeFromGroup(e)
                })), this.config.scope.$destroy(), this.config.locals = null, this.config.onDomAdded = null, this.config.onDomRemoved = null, this.config.onRemoving = null, this.config.onOpenComplete = null, this._interceptors = ge
            }, l.prototype.show = function() {
                if (!this.panelContainer) return this._$q(function(e, t) {
                    t("mdPanel: Panel does not exist yet. Call open() or attach().")
                });
                if (!this.panelContainer.hasClass(a)) return this._$q.when(this);
                var r = this;
                return this._$q(function(e, t) {
                    var n = r._done(e, r),
                        o = r.config.onOpenComplete || be.noop;
                    r._$q.all([r._backdropRef ? r._backdropRef.show() : r, (r.panelContainer.removeClass(a), r._animateOpen()).then(function() {
                        r._focusOnOpen()
                    }, t)]).then(o).then(function() {
                        r.config.groupName && (r.config.groupName = d(r.config.groupName), be.forEach(r.config.groupName, function(e) {
                            (e = r._$mdPanel._groups[e]) && e.openPanels.push(r)
                        }))
                    }).then(n).catch(t)
                })
            }, l.prototype.hide = function() {
                if (!this.panelContainer) return this._$q(function(e, t) {
                    t("mdPanel: Panel does not exist yet. Call open() or attach().")
                });
                if (this.panelContainer.hasClass(a)) return this._$q.when(this);
                var r = this;
                return this._$q(function(e, t) {
                    var n = r._done(e, r),
                        o = r.config.onRemoving || be.noop;
                    r._$q.all([r._backdropRef ? r._backdropRef.hide() : r, r._animateClose().then(o).then(function() {
                        r.panelContainer.addClass(a)
                    }).then(function() {
                        var t;
                        r.config.groupName && (r.config.groupName = d(r.config.groupName), be.forEach(r.config.groupName, function(e) {
                            e = r._$mdPanel._groups[e], -1 < (t = e.openPanels.indexOf(r)) && e.openPanels.splice(t, 1)
                        }))
                    }).then(function() {
                        var e = r.config.origin;
                        e && m(e).focus()
                    }).catch(t)]).then(n, t)
                })
            }, l.prototype._compile = function() {
                var o = this;
                return o._$mdCompiler.compile(o.config).then(function(e) {
                    var t = o.config;
                    if (t.contentElement) {
                        var n = e.element;
                        o._restoreCache.styles = n[0].style.cssText, o._restoreCache.classes = n[0].className, o.panelContainer = o._$mdPanel._wrapContentElement(n), o.panelEl = n
                    } else o.panelContainer = e.link(t.scope), o.panelEl = be.element(o.panelContainer[0].querySelector(".md-panel"));
                    return o.innerWrapper = be.element(o.panelContainer[0].querySelector(".md-panel-inner-wrapper")), o._compilerCleanup = e.cleanup, m(o.config.attachTo).append(o.panelContainer), o
                })
            }, l.prototype._createPanel = function() {
                var n = this;
                return this._$q(function(e, t) {
                    n.config.locals || (n.config.locals = {}), (n.config.locals.mdPanelRef = n)._compile().then(function() {
                        n.config.disableParentScroll && (n._restoreScroll = n._$mdUtil.disableScrollAround(null, n.panelContainer, {
                            disableScrollMask: !0
                        })), n.config.panelClass && n.panelEl.addClass(n.config.panelClass), n.config.propagateContainerEvents && (n.panelContainer.css("pointer-events", "none"), n.panelEl.css("pointer-events", "all")), n._$animate.pin && n._$animate.pin(n.panelContainer, m(n.config.attachTo)), n._configureTrapFocus(), n._addStyles().then(function() {
                            e(n)
                        }, t)
                    }, t)
                })
            }, l.prototype._addStyles = function() {
                var n = this;
                return this._$q(function(e) {
                    n.panelContainer.css("z-index", n.config.zIndex), n.innerWrapper.css("z-index", n.config.zIndex + 1);

                    function t() {
                        n._setTheming(), n.panelEl.removeClass("_md-panel-offscreen"), n.innerWrapper.removeClass("_md-panel-offscreen"), n.panelContainer.addClass(a), e(n)
                    }
                    if (n.config.fullscreen) return n.panelEl.addClass("_md-panel-fullscreen"), void t();
                    n.config.position ? n._$rootScope.$$postDigest(function() {
                        n._updatePosition(!0), n._setTheming(), e(n)
                    }) : t()
                })
            }, l.prototype._setTheming = function() {
                this._$mdTheming(this.panelEl), this._$mdTheming(this.panelContainer)
            }, l.prototype.updatePosition = function(e) {
                if (!this.panelContainer) throw new Error("mdPanel: Panel does not exist yet. Call open() or attach().");
                this.config.position = e, this._updatePosition()
            }, l.prototype._updatePosition = function(e) {
                var t = this.config.position;
                t && (t._setPanelPosition(this.innerWrapper), e && (this.panelEl.removeClass("_md-panel-offscreen"), this.innerWrapper.removeClass("_md-panel-offscreen"), this.panelContainer.addClass(a)), this.innerWrapper.css(h.absPosition.TOP, t.getTop()), this.innerWrapper.css(h.absPosition.BOTTOM, t.getBottom()), this.innerWrapper.css(h.absPosition.LEFT, t.getLeft()), this.innerWrapper.css(h.absPosition.RIGHT, t.getRight()))
            }, l.prototype._focusOnOpen = function() {
                if (this.config.focusOnOpen) {
                    var e = this;
                    this._$rootScope.$$postDigest(function() {
                        (e._$mdUtil.findFocusTarget(e.panelEl) || e.panelEl).focus()
                    })
                }
            }, l.prototype._createBackdrop = function() {
                if (this.config.hasBackdrop) {
                    if (!this._backdropRef) {
                        var e = this._$mdPanel.newPanelAnimation().openFrom(this.config.attachTo).withAnimation({
                            open: "_md-opaque-enter",
                            close: "_md-opaque-leave"
                        });
                        this.config.animation && e.duration(this.config.animation._rawDuration);
                        var t = {
                            animation: e,
                            attachTo: this.config.attachTo,
                            focusOnOpen: !1,
                            panelClass: "_md-panel-backdrop",
                            zIndex: this.config.zIndex - 1
                        };
                        this._backdropRef = this._$mdPanel.create(t)
                    }
                    if (!this._backdropRef.isAttached) return this._backdropRef.attach()
                }
            }, l.prototype._addEventListeners = function() {
                this._configureEscapeToClose(), this._configureClickOutsideToClose(), this._configureScrollListener()
            }, l.prototype._removeEventListeners = function() {
                this._removeListeners && this._removeListeners.forEach(function(e) {
                    e()
                }), this._removeListeners = []
            }, l.prototype._configureEscapeToClose = function() {
                if (this.config.escapeToClose) {
                    var e = m(this.config.attachTo),
                        t = this,
                        n = function(e) {
                            e.keyCode === t._$mdConstant.KEY_CODE.ESCAPE && (e.stopPropagation(), e.preventDefault(), t.close(l.closeReasons.ESCAPE))
                        };
                    this.panelContainer.on("keydown", n), e.on("keydown", n), this._removeListeners.push(function() {
                        t.panelContainer.off("keydown", n), e.off("keydown", n)
                    })
                }
            }, l.prototype._configureClickOutsideToClose = function() {
                if (this.config.clickOutsideToClose) {
                    var t, n = this.config.propagateContainerEvents ? be.element(document.body) : this.panelContainer,
                        e = function(e) {
                            t = e.target
                        },
                        o = this,
                        r = function(e) {
                            o.config.propagateContainerEvents ? t === o.panelEl[0] || o.panelEl[0].contains(t) || o.close() : t === n[0] && e.target === n[0] && (e.stopPropagation(), e.preventDefault(), o.close(l.closeReasons.CLICK_OUTSIDE))
                        };
                    n.on("mousedown", e), n.on("mouseup", r), this._removeListeners.push(function() {
                        n.off("mousedown", e), n.off("mouseup", r)
                    })
                }
            }, l.prototype._configureScrollListener = function() {
                if (!this.config.disableParentScroll) {
                    var e = be.bind(this, this._updatePosition),
                        t = this._$$rAF.throttle(e),
                        n = this,
                        o = function() {
                            t()
                        };
                    this._$window.addEventListener("scroll", o, !0), this._removeListeners.push(function() {
                        n._$window.removeEventListener("scroll", o, !0)
                    })
                }
            }, l.prototype._configureTrapFocus = function() {
                if (this.panelEl.attr("tabIndex", "-1"), this.config.trapFocus) {
                    var e = this.panelEl;
                    this._topFocusTrap = n.clone()[0], this._bottomFocusTrap = n.clone()[0];
                    var t = function() {
                        e.focus()
                    };
                    this._topFocusTrap.addEventListener("focus", t), this._bottomFocusTrap.addEventListener("focus", t), this._removeListeners.push(this._simpleBind(function() {
                        this._topFocusTrap.removeEventListener("focus", t), this._bottomFocusTrap.removeEventListener("focus", t)
                    }, this)), e[0].parentNode.insertBefore(this._topFocusTrap, e[0]), e.after(this._bottomFocusTrap)
                }
            }, l.prototype.updateAnimation = function(e) {
                this.config.animation = e, this._backdropRef && this._backdropRef.config.animation.duration(e._rawDuration)
            }, l.prototype._animateOpen = function() {
                this.panelContainer.addClass("md-panel-is-showing");
                var n = this.config.animation;
                if (!n) return this.panelContainer.addClass("_md-panel-shown"), this._$q.when(this);
                var o = this;
                return this._$q(function(e) {
                    var t = o._done(e, o);
                    n.animateOpen(o.panelEl).then(t, function() {
                        o._$log.warn("mdPanel: MdPanel Animations failed. Showing panel without animating."), t()
                    })
                })
            }, l.prototype._animateClose = function() {
                var n = this,
                    o = this.config.animation;
                return o ? this._$q(function(e) {
                    function t() {
                        n.panelContainer.removeClass("md-panel-is-showing"), n.panelEl.css("transform", ""), e(n)
                    }
                    o.animateClose(n.panelEl).then(t, function() {
                        n._$log.warn("mdPanel: MdPanel Animations failed. Hiding panel without animating."), t()
                    })
                }) : (this.panelContainer.removeClass("md-panel-is-showing"), this.panelContainer.removeClass("_md-panel-shown"), this._$q.when(this))
            }, l.prototype.registerInterceptor = function(e, t) {
                var n = null;
                if (be.isString(e) ? be.isFunction(t) || (n = "Interceptor callback must be a function, instead got " + typeof t) : n = "Interceptor type must be a string, instead got " + typeof e, n) throw new Error("MdPanel: " + n);
                var o = this._interceptors[e] = this._interceptors[e] || [];
                return -1 === o.indexOf(t) && o.push(t), this
            }, l.prototype.removeInterceptor = function(e, t) {
                var n = this._interceptors[e] ? this._interceptors[e].indexOf(t) : -1;
                return -1 < n && this._interceptors[e].splice(n, 1), this
            }, l.prototype.removeAllInterceptors = function(e) {
                return e ? this._interceptors[e] = [] : this._interceptors = Object.create(null), this
            }, l.prototype._callInterceptors = function(e) {
                var o = this,
                    r = o._$q;
                return (o._interceptors && o._interceptors[e] || []).reduceRight(function(e, t) {
                    var n = t && be.isFunction(t.then) ? t : null;
                    return e.then(function() {
                        if (!n) try {
                            n = t(o)
                        } catch (e) {
                            n = r.reject(e)
                        }
                        return n
                    })
                }, r.resolve(o))
            }, l.prototype._simpleBind = function(t, n) {
                return function(e) {
                    return t.apply(n, e)
                }
            }, l.prototype._done = function(e, t) {
                return function() {
                    e(t)
                }
            }, l.prototype.addToGroup = function(e) {
                this._$mdPanel._groups[e] || this._$mdPanel.newPanelGroup(e);
                var t = this._$mdPanel._groups[e];
                t.panels.indexOf(this) < 0 && t.panels.push(this)
            }, l.prototype.removeFromGroup = function(e) {
                if (!this._$mdPanel._groups[e]) throw new Error("mdPanel: The group " + e + " does not exist.");
                var t = this._$mdPanel._groups[e],
                    n = t.panels.indexOf(this); - 1 < n && t.panels.splice(n, 1)
            }, l.closeReasons = {
                CLICK_OUTSIDE: "clickOutsideToClose",
                ESCAPE: "escapeToClose"
            }, h.xPosition = {
                CENTER: "center",
                ALIGN_START: "align-start",
                ALIGN_END: "align-end",
                OFFSET_START: "offset-start",
                OFFSET_END: "offset-end"
            }, h.yPosition = {
                CENTER: "center",
                ALIGN_TOPS: "align-tops",
                ALIGN_BOTTOMS: "align-bottoms",
                ABOVE: "above",
                BELOW: "below"
            }, h.absPosition = {
                TOP: "top",
                RIGHT: "right",
                BOTTOM: "bottom",
                LEFT: "left"
            }, h.viewportMargin = 8, h.prototype.absolute = function() {
                return this._absolute = !0, this
            }, h.prototype._setPosition = function(e, t) {
                if (e === h.absPosition.RIGHT || e === h.absPosition.LEFT) this._left = this._right = "";
                else {
                    if (e !== h.absPosition.BOTTOM && e !== h.absPosition.TOP) {
                        var n = Object.keys(h.absPosition).join().toLowerCase();
                        throw new Error("mdPanel: Position must be one of " + n + ".")
                    }
                    this._top = this._bottom = ""
                }
                return this["_" + e] = be.isString(t) ? t : "0", this
            }, h.prototype.top = function(e) {
                return this._setPosition(h.absPosition.TOP, e)
            }, h.prototype.bottom = function(e) {
                return this._setPosition(h.absPosition.BOTTOM, e)
            }, h.prototype.start = function(e) {
                var t = this._isRTL ? h.absPosition.RIGHT : h.absPosition.LEFT;
                return this._setPosition(t, e)
            }, h.prototype.end = function(e) {
                var t = this._isRTL ? h.absPosition.LEFT : h.absPosition.RIGHT;
                return this._setPosition(t, e)
            }, h.prototype.left = function(e) {
                return this._setPosition(h.absPosition.LEFT, e)
            }, h.prototype.right = function(e) {
                return this._setPosition(h.absPosition.RIGHT, e)
            }, h.prototype.centerHorizontally = function() {
                return this._left = "50%", this._right = "", this._translateX = ["-50%"], this
            }, h.prototype.centerVertically = function() {
                return this._top = "50%", this._bottom = "", this._translateY = ["-50%"], this
            }, h.prototype.center = function() {
                return this.centerHorizontally().centerVertically()
            }, h.prototype.relativeTo = function(e) {
                return this._absolute = !1, this._relativeToEl = m(e), this
            }, h.prototype.addPanelPosition = function(e, t) {
                if (!this._relativeToEl) throw new Error("mdPanel: addPanelPosition can only be used with relative positioning. Set relativeTo first.");
                return u(h.xPosition, e), u(h.yPosition, t), this._positions.push({
                    x: e,
                    y: t
                }), this
            }, h.prototype.withOffsetX = function(e) {
                return this._translateX.push(p(e)), this
            }, h.prototype.withOffsetY = function(e) {
                return this._translateY.push(p(e)), this
            }, h.prototype.getTop = function() {
                return this._top
            }, h.prototype.getBottom = function() {
                return this._bottom
            }, h.prototype.getLeft = function() {
                return this._left
            }, h.prototype.getRight = function() {
                return this._right
            }, h.prototype.getTransform = function() {
                return (this._reduceTranslateValues("translateX", this._translateX) + " " + this._reduceTranslateValues("translateY", this._translateY)).trim()
            }, h.prototype._setTransform = function(e) {
                return e.css(this._$mdConstant.CSS.TRANSFORM, this.getTransform())
            }, h.prototype._isOnscreen = function(e) {
                var t = parseInt(this.getLeft()),
                    n = parseInt(this.getTop());
                if (this._translateX.length || this._translateY.length) {
                    var o = function(e, t) {
                        var n = getComputedStyle(e[0] || e)[t],
                            o = n.indexOf("("),
                            r = n.lastIndexOf(")"),
                            i = {
                                x: 0,
                                y: 0
                            };
                        if (-1 < o && -1 < r) {
                            var a = n.substring(o + 1, r).split(", ").slice(-2);
                            i.x = parseInt(a[0]), i.y = parseInt(a[1])
                        }
                        return i
                    }(e, this._$mdConstant.CSS.TRANSFORM);
                    t += o.x, n += o.y
                }
                var r = t + e[0].offsetWidth,
                    i = n + e[0].offsetHeight;
                return 0 <= t && 0 <= n && i <= this._$window.innerHeight && r <= this._$window.innerWidth
            }, h.prototype.getActualPosition = function() {
                return this._actualPosition
            }, h.prototype._reduceTranslateValues = function(n, e) {
                return e.map(function(e) {
                    var t = be.isFunction(e) ? p(e(this)) : e;
                    return n + "(" + t + ")"
                }, this).join(" ")
            }, h.prototype._setPanelPosition = function(e) {
                if (e.removeClass("_md-panel-position-adjusted"), this._absolute) this._setTransform(e);
                else {
                    if (this._actualPosition) return this._calculatePanelPosition(e, this._actualPosition), this._setTransform(e), void this._constrainToViewport(e);
                    for (var t = 0; t < this._positions.length; t++)
                        if (this._actualPosition = this._positions[t], this._calculatePanelPosition(e, this._actualPosition), this._setTransform(e), this._isOnscreen(e)) return;
                    this._constrainToViewport(e)
                }
            }, h.prototype._constrainToViewport = function(e) {
                var t = h.viewportMargin,
                    n = this._top,
                    o = this._left;
                if (this.getTop()) {
                    var r = parseInt(this.getTop()),
                        i = e[0].offsetHeight + r,
                        a = this._$window.innerHeight;
                    r < t ? this._top = t + "px" : a < i && (this._top = r - (i - a + t) + "px")
                }
                if (this.getLeft()) {
                    var d = parseInt(this.getLeft()),
                        s = e[0].offsetWidth + d,
                        l = this._$window.innerWidth;
                    d < t ? this._left = t + "px" : l < s && (this._left = d - (s - l + t) + "px")
                }
                e.toggleClass("_md-panel-position-adjusted", this._top !== n || this._left !== o)
            }, h.prototype._reverseXPosition = function(e) {
                if (e === h.xPosition.CENTER) return e;
                return -1 < e.indexOf("start") ? e.replace("start", "end") : e.replace("end", "start")
            }, h.prototype._bidi = function(e) {
                return this._isRTL ? this._reverseXPosition(e) : e
            }, h.prototype._calculatePanelPosition = function(e, t) {
                var n = e[0].getBoundingClientRect(),
                    o = Math.max(n.width, e[0].clientWidth),
                    r = Math.max(n.height, e[0].clientHeight),
                    i = this._relativeToEl[0].getBoundingClientRect(),
                    a = i.left,
                    d = i.right,
                    s = i.width;
                switch (this._bidi(t.x)) {
                    case h.xPosition.OFFSET_START:
                        this._left = a - o + "px";
                        break;
                    case h.xPosition.ALIGN_END:
                        this._left = d - o + "px";
                        break;
                    case h.xPosition.CENTER:
                        var l = a + .5 * s - .5 * o;
                        this._left = l + "px";
                        break;
                    case h.xPosition.ALIGN_START:
                        this._left = a + "px";
                        break;
                    case h.xPosition.OFFSET_END:
                        this._left = d + "px"
                }
                var c = i.top,
                    m = i.bottom,
                    u = i.height;
                switch (t.y) {
                    case h.yPosition.ABOVE:
                        this._top = c - r + "px";
                        break;
                    case h.yPosition.ALIGN_BOTTOMS:
                        this._top = m - r + "px";
                        break;
                    case h.yPosition.CENTER:
                        var p = c + .5 * u - .5 * r;
                        this._top = p + "px";
                        break;
                    case h.yPosition.ALIGN_TOPS:
                        this._top = c + "px";
                        break;
                    case h.yPosition.BELOW:
                        this._top = m + "px"
                }
            }, c.animation = {
                SLIDE: "md-panel-animate-slide",
                SCALE: "md-panel-animate-scale",
                FADE: "md-panel-animate-fade"
            }, c.prototype.openFrom = function(e) {
                return e = e.target ? e.target : e, this._openFrom = this._getPanelAnimationTarget(e), this._closeTo || (this._closeTo = this._openFrom), this
            }, c.prototype.closeTo = function(e) {
                return this._closeTo = this._getPanelAnimationTarget(e), this
            }, c.prototype.duration = function(e) {
                return e && (be.isNumber(e) ? this._openDuration = this._closeDuration = t(e) : be.isObject(e) && (this._openDuration = t(e.open), this._closeDuration = t(e.close))), this._rawDuration = e, this;

                function t(e) {
                    if (be.isNumber(e)) return e / 1e3
                }
            }, c.prototype._getPanelAnimationTarget = function(e) {
                return be.isDefined(e.top) || be.isDefined(e.left) ? {
                    element: ge,
                    bounds: {
                        top: e.top || 0,
                        left: e.left || 0
                    }
                } : this._getBoundingClientRect(m(e))
            }, c.prototype.withAnimation = function(e) {
                return this._animationClass = e, this
            }, c.prototype.animateOpen = function(e) {
                var t = this._$mdUtil.dom.animator;
                this._fixBounds(e);
                var n = {},
                    o = e[0].style.transform || "",
                    r = t.toTransformCss(o),
                    i = t.toTransformCss(o);
                switch (this._animationClass) {
                    case c.animation.SLIDE:
                        e.css("opacity", "1"), n = {
                            transitionInClass: "_md-panel-animate-enter",
                            transitionOutClass: "_md-panel-animate-leave"
                        };
                        var a = t.calculateSlideToOrigin(e, this._openFrom) || "";
                        r = t.toTransformCss(a + " " + o);
                        break;
                    case c.animation.SCALE:
                        n = {
                            transitionInClass: "_md-panel-animate-enter"
                        };
                        var d = t.calculateZoomToOrigin(e, this._openFrom) || "";
                        r = t.toTransformCss(o + " " + d);
                        break;
                    case c.animation.FADE:
                        n = {
                            transitionInClass: "_md-panel-animate-enter"
                        };
                        break;
                    default:
                        n = be.isString(this._animationClass) ? {
                            transitionInClass: this._animationClass
                        } : {
                            transitionInClass: this._animationClass.open,
                            transitionOutClass: this._animationClass.close
                        }
                }
                return n.duration = this._openDuration, t.translate3d(e, r, i, n)
            }, c.prototype.animateClose = function(e) {
                var t = this._$mdUtil.dom.animator,
                    n = {},
                    o = e[0].style.transform || "",
                    r = t.toTransformCss(o),
                    i = t.toTransformCss(o);
                switch (this._animationClass) {
                    case c.animation.SLIDE:
                        e.css("opacity", "1"), n = {
                            transitionInClass: "_md-panel-animate-leave",
                            transitionOutClass: "_md-panel-animate-enter _md-panel-animate-leave"
                        };
                        var a = t.calculateSlideToOrigin(e, this._closeTo) || "";
                        i = t.toTransformCss(a + " " + o);
                        break;
                    case c.animation.SCALE:
                        n = {
                            transitionInClass: "_md-panel-animate-scale-out _md-panel-animate-leave",
                            transitionOutClass: "_md-panel-animate-scale-out _md-panel-animate-enter _md-panel-animate-leave"
                        };
                        var d = t.calculateZoomToOrigin(e, this._closeTo) || "";
                        i = t.toTransformCss(o + " " + d);
                        break;
                    case c.animation.FADE:
                        n = {
                            transitionInClass: "_md-panel-animate-fade-out _md-panel-animate-leave",
                            transitionOutClass: "_md-panel-animate-fade-out _md-panel-animate-enter _md-panel-animate-leave"
                        };
                        break;
                    default:
                        n = be.isString(this._animationClass) ? {
                            transitionOutClass: this._animationClass
                        } : {
                            transitionInClass: this._animationClass.close,
                            transitionOutClass: this._animationClass.open
                        }
                }
                return n.duration = this._closeDuration, t.translate3d(e, r, i, n)
            }, c.prototype._fixBounds = function(e) {
                var t = e[0].offsetWidth,
                    n = e[0].offsetHeight;
                this._openFrom && null == this._openFrom.bounds.height && (this._openFrom.bounds.height = n), this._openFrom && null == this._openFrom.bounds.width && (this._openFrom.bounds.width = t), this._closeTo && null == this._closeTo.bounds.height && (this._closeTo.bounds.height = n), this._closeTo && null == this._closeTo.bounds.width && (this._closeTo.bounds.width = t)
            }, c.prototype._getBoundingClientRect = function(e) {
                if (e instanceof be.element) return {
                    element: e,
                    bounds: e[0].getBoundingClientRect()
                }
            }
        }(), be.module("material.components.progressCircular", ["material.core"]), je.$inject = ["$window", "$mdProgressCircular", "$mdTheming", "$mdUtil", "$interval", "$log"], be.module("material.components.progressCircular").directive("mdProgressCircular", je), be.module("material.components.progressCircular").provider("$mdProgressCircular", function() {
            var t = {
                progressSize: 50,
                strokeWidth: 10,
                duration: 100,
                easeFn: e,
                durationIndeterminate: 1333,
                startIndeterminate: 1,
                endIndeterminate: 149,
                easeFnIndeterminate: n,
                easingPresets: {
                    linearEase: e,
                    materialEase: n
                }
            };
            return {
                configure: function(e) {
                    return t = be.extend(t, e || {})
                },
                $get: function() {
                    return t
                }
            };

            function e(e, t, n, o) {
                return n * e / o + t
            }

            function n(e, t, n, o) {
                var r = (e /= o) * e,
                    i = r * e;
                return t + n * (6 * i * r + -15 * r * r + 10 * i)
            }
        }), ze.$inject = ["$mdTheming", "$mdUtil", "$log"], be.module("material.components.progressLinear", ["material.core"]).directive("mdProgressLinear", ze),
        function() {
            e.$inject = ["$mdUtil", "$mdConstant", "$mdTheming", "$timeout"], t.$inject = ["$mdAria", "$mdUtil", "$mdTheming"], be.module("material.components.radioButton", ["material.core"]).directive("mdRadioGroup", e).directive("mdRadioButton", t);
            var i = Object.freeze({
                PREVIOUS: -1,
                CURRENT: 0,
                NEXT: 1
            });

            function e(d, s, l, c) {
                return e.prototype = {
                    init: function(e) {
                        this._ngModelCtrl = e, this._ngModelCtrl.$render = be.bind(this, this.render)
                    },
                    add: function(e) {
                        this._radioButtonRenderFns.push(e)
                    },
                    remove: function(e) {
                        var t = this._radioButtonRenderFns.indexOf(e); - 1 !== t && this._radioButtonRenderFns.splice(t, 1)
                    },
                    render: function() {
                        this._radioButtonRenderFns.forEach(function(e) {
                            e()
                        })
                    },
                    setViewValue: function(e, t) {
                        this._ngModelCtrl.$setViewValue(e, t), this.render()
                    },
                    getViewValue: function() {
                        return this._ngModelCtrl.$viewValue
                    },
                    selectCurrent: function() {
                        return t(this.$element, i.CURRENT)
                    },
                    selectNext: function() {
                        return t(this.$element, i.NEXT)
                    },
                    selectPrevious: function() {
                        return t(this.$element, i.PREVIOUS)
                    },
                    setActiveDescendant: function(e) {
                        this.$element.attr("aria-activedescendant", e)
                    },
                    isDisabled: function() {
                        return this.$element[0].hasAttribute("disabled")
                    }
                }, {
                    restrict: "E",
                    controller: ["$element", e],
                    require: ["mdRadioGroup", "?ngModel"],
                    link: {
                        pre: function(e, o, t, n) {
                            o.addClass("_md"), l(o);
                            var r = n[0],
                                i = n[1] || d.fakeNgModel();

                            function a() {
                                o.hasClass("md-focused") || o.addClass("md-focused")
                            }
                            r.init(i), e.mouseActive = !1, o.attr({
                                role: "radiogroup",
                                tabIndex: o.attr("tabindex") || "0"
                            }).on("keydown", function(e) {
                                var t = e.which || e.keyCode;
                                if (t === s.KEY_CODE.ENTER || e.currentTarget === e.target) switch (t) {
                                    case s.KEY_CODE.LEFT_ARROW:
                                    case s.KEY_CODE.UP_ARROW:
                                        e.preventDefault(), r.selectPrevious(), a();
                                        break;
                                    case s.KEY_CODE.RIGHT_ARROW:
                                    case s.KEY_CODE.DOWN_ARROW:
                                        e.preventDefault(), r.selectNext(), a();
                                        break;
                                    case s.KEY_CODE.SPACE:
                                        e.preventDefault(), r.selectCurrent();
                                        break;
                                    case s.KEY_CODE.ENTER:
                                        var n = be.element(d.getClosest(o[0], "form"));
                                        0 < n.length && n.triggerHandler("submit")
                                }
                            }).on("mousedown", function() {
                                e.mouseActive = !0, c(function() {
                                    e.mouseActive = !1
                                }, 100)
                            }).on("focus", function() {
                                !1 === e.mouseActive && r.$element.addClass("md-focused")
                            }).on("blur", function() {
                                r.$element.removeClass("md-focused")
                            }), d.nextTick(function() {
                                var e = m(r.$element);
                                e.count() && !r.$element[0].hasAttribute("aria-activedescendant") && r.setActiveDescendant(e.first().id)
                            })
                        }
                    }
                };

                function e(e) {
                    this._radioButtonRenderFns = [], this.$element = e
                }

                function m(e) {
                    return d.iterator(e[0].querySelectorAll("md-radio-button"), !0)
                }

                function t(e, t) {
                    var n, o = m(e);
                    if (o.count()) {
                        var r = e[0].querySelector("md-radio-button.md-checked");
                        r ? t !== i.PREVIOUS && t !== i.NEXT || (n = o[t === i.PREVIOUS ? "previous" : "next"](r, function(e) {
                            return !be.element(e).attr("disabled")
                        })) : n = o.first(), n && be.element(n).triggerHandler("click")
                    }
                }
            }

            function t(s, l, c) {
                var m = "md-checked";
                return {
                    restrict: "E",
                    require: "^mdRadioGroup",
                    transclude: !0,
                    template: '<div class="md-container" md-ink-ripple md-ink-ripple-checkbox><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>',
                    link: function(t, n, o, r) {
                        var i;
                        c(n),
                            function(e) {
                                e.attr({
                                    id: o.id || "radio_" + l.nextUid(),
                                    role: "radio",
                                    "aria-checked": "false"
                                }), s.expectWithText(e, "aria-label")
                            }(n), n.addClass("md-auto-horizontal-margin"), o.ngValue ? l.nextTick(e, !1) : e();

                        function e() {
                            if (!r) throw "RadioButton: No RadioGroupController could be found.";
                            r.add(d), o.$observe("value", d), n.on("click", a).on("$destroy", function() {
                                r.remove(d)
                            })
                        }

                        function a(e) {
                            n[0].hasAttribute("disabled") || r.isDisabled() || t.$apply(function() {
                                r.setViewValue(o.value, e && e.type)
                            })
                        }

                        function d() {
                            var e = r.getViewValue() == o.value;
                            e !== i && (n[0] && n[0].parentNode && "md-radio-group" !== n[0].parentNode.nodeName.toLowerCase() && n.parent().toggleClass(m, e), e && r.setActiveDescendant(n.attr("id")), i = e, n.attr("aria-checked", e).toggleClass(m, e))
                        }
                    }
                }
            }
        }(),
        function() {
            e.$inject = ["$mdSelect", "$mdUtil", "$mdConstant", "$mdTheming", "$mdAria", "$parse", "$sce"], t.$inject = ["$parse", "$mdUtil", "$mdConstant", "$mdTheming"], o.$inject = ["$mdButtonInkRipple", "$mdUtil", "$mdTheming"], r.$inject = ["$$interimElementProvider"], i.$inject = ["$element"];
            var P = 8,
                n = 0,
                c = be.element('<div class="md-container"><div class="md-icon"></div></div>');

            function e(L, R, F, B, U, j, z) {
                return {
                    restrict: "E",
                    require: ["^?mdInputContainer", "mdSelect", "ngModel", "?^form"],
                    compile: function(e, t) {
                        var n = R.parseAttributeBoolean(t.multiple);
                        e.addClass("md-auto-horizontal-margin");
                        var o = be.element("<md-select-value><span></span></md-select-value>");
                        o.append('<span class="md-select-icon" aria-hidden="true"></span>'), o.addClass("md-select-value"), o[0].hasAttribute("id") || o.attr("id", "select_value_label_" + R.nextUid());
                        var r = e.find("md-content");
                        r.length || (e.append(be.element("<md-content>").append(e.contents())), r = e.find("md-content"));
                        r.attr("role", "listbox"), r.attr("tabindex", "-1"), n ? r.attr("aria-multiselectable", "true") : r.attr("aria-multiselectable", "false");
                        t.mdOnOpen && (e.find("md-content").prepend(be.element('<div> <md-progress-circular md-mode="indeterminate" ng-if="$$loadingAsyncDone === false" md-diameter="25px"></md-progress-circular></div>')), e.find("md-option").attr("ng-show", "$$loadingAsyncDone"));
                        if (t.name) {
                            var i = be.element('<select class="md-visually-hidden"></select>');
                            i.attr({
                                name: t.name,
                                "aria-hidden": "true",
                                tabindex: "-1"
                            });
                            var a = e.find("md-option");
                            be.forEach(a, function(e) {
                                var t = be.element("<option>" + e.innerHTML + "</option>");
                                e.hasAttribute("ng-value") ? t.attr("ng-value", e.getAttribute("ng-value")) : e.hasAttribute("value") && t.attr("value", e.getAttribute("value")), i.append(t)
                            }), i.append('<option ng-value="' + t.ngModel + '" selected></option>'), e.parent().append(i)
                        }
                        var d = n ? "multiple" : "",
                            s = t.ngModelOptions ? R.supplant('ng-model-options="{0}"', [t.ngModelOptions]) : "",
                            l = '<div class="md-select-menu-container" aria-hidden="true" role="presentation">  <md-select-menu role="presentation" {0} {1}>{2}</md-select-menu></div>';
                        l = R.supplant(l, [d, s, e.html()]), e.empty().append(o), e.append(l), t.tabindex || t.$set("tabindex", 0);
                        return function(r, i, a, e) {
                            var t, n, d, o, s, l, c = !0,
                                m = e[0],
                                u = e[1],
                                p = e[2],
                                h = e[3],
                                f = i.find("md-select-value"),
                                b = be.isDefined(a.readonly),
                                g = R.parseAttributeBoolean(a.mdNoAsterisk),
                                E = be.isDefined(a.ariaLabelledby),
                                v = i.find("md-content"),
                                $ = i.attr("placeholder");
                            if (g && i.addClass("md-no-asterisk"), m) {
                                var M = m.isErrorGetter || function() {
                                    return p.$invalid && (p.$touched || h && h.$submitted)
                                };
                                if (m.input && i.find("md-select-header").find("input")[0] !== m.input[0]) throw new Error("<md-input-container> can only have *one* child <input>, <textarea>, or <select> element!");
                                if (m.input = i, m.label) m.label.attr("aria-hidden", "true"), v.attr("aria-label", m.label.text()), m.setHasPlaceholder(!!$);
                                else {
                                    U.expect(i, "aria-label", $);
                                    var y = i.attr("aria-label");
                                    y = y || $, v.attr("aria-label", y)
                                }
                                var C = r.$watch(M, m.setInvalid)
                            }
                            l = be.element(i[0].querySelector(".md-select-menu-container")), o = r, a.mdContainerClass && l.addClass(a.mdContainerClass), (s = l.find("md-select-menu").controller("mdSelectMenu")).init(p, a), i.on("$destroy", function() {
                                l.remove()
                            }), d = l, B(i);
                            var T = p.$render;
                            p.$render = function() {
                                T(), k(), I()
                            };
                            var A = a.$observe("placeholder", p.$render),
                                w = a.$observe("required", function(e) {
                                    m && m.label && m.label.toggleClass("md-required", e && !g), i.removeAttr("aria-required"), e ? v.attr("aria-required", "true") : v.removeAttr("aria-required")
                                });
                            if (u.setSelectValueText = function(e) {
                                    var t = e === ge || "" === e,
                                        n = !1;
                                    if (u.setIsPlaceholder(!e), a.mdSelectedText && a.mdSelectedHtml) throw Error("md-select cannot have both `md-selected-text` and `md-selected-html`");
                                    if (a.mdSelectedText || a.mdSelectedHtml) e = j(a.mdSelectedText || a.mdSelectedHtml)(r), n = !0;
                                    else if (t) {
                                        e = a.placeholder || (m && m.label ? m.label.text() : "") || "", n = !0
                                    }
                                    var o = f.children().eq(0);
                                    a.mdSelectedHtml ? o.html(z.getTrustedHtml(e)) : n ? o.text(e) : o.html(e), t ? (f.attr("aria-hidden", "true"), E || i.removeAttr("aria-labelledby")) : (f.removeAttr("aria-hidden"), E || i.attr("aria-labelledby", i[0].id + " " + f[0].id))
                                }, u.setIsPlaceholder = function(e) {
                                    e ? (f.addClass("md-select-placeholder"), m && m.label && !i.attr("placeholder") && m.label.addClass("md-placeholder")) : (f.removeClass("md-select-placeholder"), m && m.label && !i.attr("placeholder") && m.label.removeClass("md-placeholder"))
                                }, !b) {
                                i.on("focus", function() {
                                    m && m.setFocused(!0)
                                }), i.on("blur", function(e) {
                                    c && (c = !1, o._mdSelectIsOpen && e.stopImmediatePropagation()), m && m.setFocused(!1), I()
                                })
                            }
                            u.triggerClose = function() {
                                j(a.mdOnClose)(r)
                            }, r.$$postDigest(function() {
                                ! function() {
                                    var e = i.attr("aria-label") || i.attr("placeholder");
                                    !e && m && m.label && (e = m.label.text());
                                    U.expect(i, "aria-label", e)
                                }(), k()
                            });
                            var _ = r.$watch(function() {
                                return s.getSelectedLabels()
                            }, k);

                            function k() {
                                s = s || d.find("md-select-menu").controller("mdSelectMenu"), u.setSelectValueText(s.getSelectedLabels())
                            }
                            var x = a.$observe("mdMultiple", function(e) {
                                    n && n();
                                    var t = j(e);
                                    n = r.$watch(function() {
                                        return t(r)
                                    }, function(e, t) {
                                        var n = d.find("md-select-menu");
                                        if (e !== ge || t !== ge) {
                                            if (e) {
                                                var o = {
                                                    multiple: "multiple"
                                                };
                                                i.attr(o), n.attr(o)
                                            } else i.removeAttr("multiple"), n.removeAttr("multiple");
                                            i.find("md-content").attr("aria-multiselectable", e ? "true" : "false"), d && (s.setMultiple(Boolean(e)), T = p.$render, p.$render = function() {
                                                T(), k(), I()
                                            }, p.$render())
                                        }
                                    })
                                }),
                                N = a.$observe("disabled", function(e) {
                                    be.isString(e) && (e = !0), t !== ge && t === e || ((t = e) ? i.attr({
                                        "aria-disabled": "true"
                                    }).removeAttr("tabindex").removeAttr("aria-expanded").removeAttr("aria-haspopup").off("click", P).off("keydown", O) : i.attr({
                                        tabindex: a.tabindex,
                                        "aria-haspopup": "listbox"
                                    }).removeAttr("aria-disabled").on("click", P).on("keydown", O))
                                });
                            a.hasOwnProperty("disabled") || a.hasOwnProperty("ngDisabled") || (i.attr({
                                "aria-disabled": "false"
                            }), i.on("click", P), i.on("keydown", O));
                            var S = {
                                role: "button",
                                "aria-haspopup": "listbox"
                            };
                            i[0].hasAttribute("id") || (S.id = "select_" + R.nextUid());
                            var D = "select_container_" + R.nextUid();
                            d.attr("id", D);
                            var H = "select_listbox_" + R.nextUid();

                            function I() {
                                R.nextTick(function() {
                                    m && m.setHasValue(0 < s.getSelectedLabels().length || (i[0].validity || {}).badInput)
                                })
                            }

                            function O(e) {
                                if (F.isNavigationKey(e)) e.preventDefault(), P();
                                else if (q(e, F)) {
                                    e.preventDefault();
                                    var t = s.optNodeForKeyboardSearch(e);
                                    if (!t || t.hasAttribute("disabled")) return;
                                    var n = be.element(t).controller("mdOption");
                                    s.isMultiple || be.forEach(Object.keys(s.selected), function(e) {
                                        s.deselect(e)
                                    }), s.select(n.hashKey, n.value), s.refreshViewValue()
                                }
                            }

                            function P() {
                                o._mdSelectIsOpen = !0, i.attr("aria-expanded", "true"), L.show({
                                    scope: o,
                                    preserveScope: !0,
                                    skipCompile: !0,
                                    element: d,
                                    target: i[0],
                                    selectCtrl: u,
                                    preserveElement: !0,
                                    hasBackdrop: !0,
                                    loadingAsync: !!a.mdOnOpen && (r.$eval(a.mdOnOpen) || !0)
                                }).finally(function() {
                                    o._mdSelectIsOpen = !1, i.removeAttr("aria-expanded"), i.removeAttr("aria-activedescendant"), p.$setTouched()
                                })
                            }
                            d.find("md-content").attr("id", H), i.find("md-select-menu").length || (S["aria-owns"] = H), i.attr(S), r.$on("$destroy", function() {
                                w && w(), N && N(), n && n(), x && x(), _ && _(), A && A(), C && C(), i.off("focus"), i.off("blur"), L.destroy().finally(function() {
                                    m && (m.setFocused(!1), m.setHasValue(!1), m.input = null), p.$setTouched()
                                })
                            })
                        }
                    },
                    controller: function() {}
                }
            }

            function t(h, f, e, r) {
                return {
                    restrict: "E",
                    require: ["mdSelectMenu"],
                    scope: !(t.$inject = ["$scope", "$attrs", "$element"]),
                    controller: t,
                    link: {
                        pre: function(i, e, t, n) {
                            var a = n[0];

                            function o(e) {
                                var t = f.getClosest(e.target, "md-option"),
                                    n = t && be.element(t).data("$mdOptionController");
                                if (t && n)
                                    if (t.hasAttribute("disabled")) e.stopImmediatePropagation();
                                    else {
                                        var o = a.hashGetter(n.value),
                                            r = be.isDefined(a.selected[o]);
                                        i.$apply(function() {
                                            a.isMultiple ? r ? a.deselect(o) : a.select(o, n.value) : r || (be.forEach(Object.keys(a.selected), function(e) {
                                                a.deselect(e)
                                            }), a.select(o, n.value)), a.refreshViewValue()
                                        })
                                    }
                                else e.target && e.target.parentNode && "MD-SELECT-HEADER" === e.target.parentNode.tagName && e.stopImmediatePropagation()
                            }
                            e.addClass("_md"), r(e), e.on("click", o), e.on("keypress", function(e) {
                                13 !== e.keyCode && 32 !== e.keyCode || o(e)
                            })
                        }
                    }
                };

                function t(i, r, a) {
                    var d, o, s, l, c = this,
                        m = "";

                    function u() {
                        var n = c.ngModel.$modelValue || c.ngModel.$viewValue || [];
                        if (be.isArray(n)) {
                            var e = Object.keys(c.selected),
                                t = n.map(c.hashGetter);
                            e.filter(function(e) {
                                return -1 === t.indexOf(e)
                            }).forEach(c.deselect), t.forEach(function(e, t) {
                                c.select(e, n[t])
                            })
                        }
                    }

                    function p() {
                        var e = c.ngModel.$viewValue || c.ngModel.$modelValue;
                        Object.keys(c.selected).forEach(c.deselect), c.select(c.hashGetter(e), e)
                    }
                    c.isMultiple = be.isDefined(r.multiple), c.selected = {}, c.options = {}, i.$watchCollection(function() {
                        return c.options
                    }, function() {
                        c.ngModel.$render(),
                            function() {
                                var e, t;
                                if (!a.find("md-optgroup").length) return;
                                for (t = a.find("md-option"), e = 0; e < t.length; e++) t[e].setAttribute("aria-setsize", t.length), t[e].setAttribute("aria-posinset", e + 1)
                            }()
                    }), c.setMultiple = function(e) {
                        var t = c.ngModel;
                        if (d = d || t.$isEmpty, c.isMultiple = e, c.isMultiple) {
                            var n = !1,
                                o = function(e) {
                                    n ? u() : f.nextTick(function() {
                                        u(), n = !0
                                    })
                                };
                            t.$validators["md-multiple"] = r, t.$render = o, i.$watchCollection(c.modelBinding, function(e) {
                                r(e) && o()
                            }), t.$isEmpty = function(e) {
                                return !e || 0 === e.length
                            }
                        } else delete t.$validators["md-multiple"], t.$render = p;

                        function r(e, t) {
                            return be.isArray(e || t || [])
                        }
                    }, c.optNodeForKeyboardSearch = function(e) {
                        var t, n;
                        for (o && clearTimeout(o), o = setTimeout(function() {
                                m = "", s = l = o = ge
                            }, 300), m += e.key, t = new RegExp("^" + f.sanitize(m), "i"), s || (s = a.find("md-option"), l = new Array(s.length), be.forEach(s, function(e, t) {
                                l[t] = e.textContent.trim()
                            })), n = 0; n < l.length; ++n)
                            if (t.test(l[n])) return s[n]
                    }, c.init = function(e, t) {
                        function o(e) {
                            return be.isObject(e) && !be.isArray(e) ? "object_" + (e.$$mdSelectId || (e.$$mdSelectId = ++n)) : e + ""
                        }
                        c.ngModel = e, c.modelBinding = t.ngModel, c.ngModel.$isEmpty = function(e) {
                            var t = c.options[c.hashGetter(e)] ? c.options[c.hashGetter(e)].value : null;
                            return !be.isDefined(t) || null === t || "" === t || t != t
                        }, r.ngModelOptions ? c.hashGetter = function(e) {
                            var t = h(r.ngModelOptions)(i),
                                n = t && t.trackBy;
                            return n ? h(n)(i, {
                                $value: e
                            }) : be.isObject(e) ? o(e) : e
                        } : c.hashGetter = o, c.setMultiple(c.isMultiple), t.hasOwnProperty("mdSelectOnlyOption") && f.nextTick(function() {
                            var e = Object.keys(c.options);
                            if (1 === e.length) {
                                var t = c.options[e[0]];
                                c.deselect(Object.keys(c.selected)[0]), c.select(c.hashGetter(t.value), t.value), c.refreshViewValue(), c.ngModel.$setPristine()
                            }
                        }, !1)
                    }, c.setActiveDescendant = function(e) {
                        be.isDefined(e) ? a.find("md-content").attr("aria-activedescendant", e) : a.find("md-content").removeAttr("aria-activedescendant")
                    }, c.getSelectedLabels = function(e) {
                        var t, n = (e = e || {}).mode || "html",
                            o = f.nodesToArray(a[0].querySelectorAll("md-option[selected]"));
                        return o.length ? ("html" === n ? t = function(e) {
                            if (e.hasAttribute("md-option-empty")) return "";
                            var t = e.innerHTML,
                                n = e.querySelector(".md-ripple-container");
                            n && (t = t.replace(n.outerHTML, ""));
                            var o = e.querySelector(".md-container");
                            return o && (t = t.replace(o.outerHTML, "")), t
                        } : "aria" === n && (t = function(e) {
                            return e.hasAttribute("aria-label") ? e.getAttribute("aria-label") : e.textContent
                        }), f.uniq(o.map(t)).join(", ")) : ""
                    }, c.select = function(e, t) {
                        var n = c.options[e];
                        n && n.setSelected(!0, c.isMultiple), c.selected[e] = t
                    }, c.deselect = function(e) {
                        var t = c.options[e];
                        t && t.setSelected(!1, c.isMultiple), delete c.selected[e]
                    }, c.addOption = function(e, t) {
                        if (be.isDefined(c.options[e])) throw new Error('Duplicate md-option values are not allowed in a select. Duplicate value "' + t.value + '" found.');
                        c.options[e] = t, be.isDefined(c.selected[e]) && (c.select(e, t.value), be.isDefined(c.ngModel.$$rawModelValue) && c.hashGetter(c.ngModel.$$rawModelValue) === e && c.ngModel.$validate(), c.refreshViewValue())
                    }, c.removeOption = function(e) {
                        delete c.options[e]
                    }, c.refreshViewValue = function() {
                        var e, t = [];
                        for (var n in c.selected)(e = c.options[n]) ? t.push(e.value) : t.push(c.selected[n]);
                        var o = c.isMultiple ? t : t[0];
                        ! function(e, t) {
                            {
                                if (c.isMultiple) {
                                    if (be.isArray(e)) {
                                        if (e.length !== t.length) return !1;
                                        var n = e.map(function(e) {
                                            return c.hashGetter(e)
                                        });
                                        return t.every(function(e) {
                                            var t = c.hashGetter(e);
                                            return n.some(function(e) {
                                                return e === t
                                            })
                                        })
                                    }
                                    return !1
                                }
                                return c.hashGetter(e) === c.hashGetter(t)
                            }
                        }(c.ngModel.$modelValue, o) && (c.ngModel.$setViewValue(o), c.ngModel.$render())
                    }
                }
            }

            function o(o, r, l) {
                return {
                    restrict: "E",
                    require: ["mdOption", "^^mdSelectMenu"],
                    controller: i,
                    compile: function(e, t) {
                        e.append(be.element('<div class="md-text">').append(e.contents())), e.attr("tabindex", t.tabindex || "0"),
                            function(e) {
                                var t = e.value,
                                    n = e.ngValue;
                                return t || n
                            }(t) || e.attr("md-option-empty", "");
                        return n
                    }
                };

                function n(i, n, e, t) {
                    var a = t[0],
                        d = t[1];

                    function s(e, t, n) {
                        if (d.hashGetter) {
                            var o = d.hashGetter(t, i),
                                r = d.hashGetter(e, i);
                            a.hashKey = r, a.value = e, d.removeOption(o, a), d.addOption(r, a)
                        } else n || i.$$postDigest(function() {
                            s(e, t, !0)
                        })
                    }
                    l(n), d.isMultiple && (n.addClass("md-checkbox-enabled"), n.prepend(c.clone())), be.isDefined(e.ngValue) ? i.$watch(e.ngValue, function(e, t) {
                            s(e, t), n.removeAttr("aria-checked")
                        }) : be.isDefined(e.value) ? s(e.value) : i.$watch(function() {
                            return n.text().trim()
                        }, s), e.$observe("disabled", function(e) {
                            e ? n.attr("tabindex", "-1") : n.attr("tabindex", "0")
                        }), i.$$postDigest(function() {
                            e.$observe("selected", function(e) {
                                be.isDefined(e) && ("string" == typeof e && (e = !0), e ? (d.isMultiple || d.deselect(Object.keys(d.selected)[0]), d.select(a.hashKey, a.value)) : d.deselect(a.hashKey), d.refreshViewValue())
                            })
                        }), o.attach(i, n),
                        function() {
                            var e = {
                                role: "option"
                            };
                            d.isMultiple && (e["aria-selected"] = "false");
                            n[0].hasAttribute("id") || (e.id = "select_option_" + r.nextUid());
                            n.attr(e)
                        }(), i.$on("$destroy", function() {
                            d.removeOption(a.hashKey, a)
                        })
                }
            }

            function i(n) {
                this.setSelected = function(e, t) {
                    e ? n.attr({
                        selected: "true",
                        "aria-selected": "true"
                    }) : e || (n.removeAttr("selected"), t ? n.attr("aria-selected", "false") : n.removeAttr("aria-selected"))
                }
            }

            function r(e) {
                return t.$inject = ["$mdSelect", "$mdConstant", "$mdUtil", "$window", "$q", "$$rAF", "$animateCss", "$animate", "$document"], e("$mdSelect").setDefaults({
                    methods: ["target"],
                    options: t
                });

                function t(l, c, D, H, r, i, m, u, I) {
                    var p = D.dom.animator,
                        h = c.KEY_CODE;
                    return {
                        parent: "body",
                        themable: !0,
                        onShow: function(n, a, d) {
                            return function() {
                                    d.loadingAsync && !d.isRemoved && (n.$$loadingAsyncDone = !1, r.when(d.loadingAsync).then(function() {
                                        n.$$loadingAsyncDone = !0, delete d.loadingAsync
                                    }).then(function() {
                                        i(o)
                                    }))
                                }(),
                                function(e, t) {
                                    var n = a.find("md-select-menu");
                                    if (!t.target) throw new Error(D.supplant("$mdSelect.show() expected a target element in options.target but got '{0}'!", [t.target]));
                                    be.extend(t, {
                                        isRemoved: !1,
                                        target: be.element(t.target),
                                        parent: be.element(t.parent),
                                        selectEl: n,
                                        contentEl: a.find("md-content"),
                                        optionNodes: n[0].getElementsByTagName("md-option")
                                    })
                                }(0, d), d.hideBackdrop = function(e, t, n) {
                                    n.disableParentScroll && !D.getClosest(n.target, "MD-DIALOG") ? n.restoreScroll = D.disableScrollAround(n.element, n.parent) : n.disableParentScroll = !1;
                                    n.hasBackdrop && (n.backdrop = D.createBackdrop(e, "md-select-backdrop md-click-catcher"), u.enter(n.backdrop, I[0].body, null, {
                                        duration: 0
                                    }));
                                    return function() {
                                        n.backdrop && n.backdrop.remove(), n.disableParentScroll && n.restoreScroll(), delete n.restoreScroll
                                    }
                                }(n, 0, d),
                                function(e, n, t) {
                                    t.parent !== n.parent() && n.parent().attr("aria-owns", n.find("md-content").attr("id"));
                                    return t.parent.append(n), r(function(e, t) {
                                        try {
                                            m(n, {
                                                removeClass: "md-leave",
                                                duration: 0
                                            }).start().then(o).then(e)
                                        } catch (e) {
                                            t(e)
                                        }
                                    })
                                }(0, a, d).then(function(e) {
                                    return a.attr("aria-hidden", "false"), d.alreadyOpen = !0, d.cleanupInteraction = function() {
                                        if (d.isRemoved) return;
                                        var o = d.selectEl,
                                            i = o.controller("mdSelectMenu") || {};
                                        return a.addClass("md-clickable"), d.backdrop && d.backdrop.on("click", e), o.on("keydown", t), o.on("click", r),
                                            function() {
                                                d.backdrop && d.backdrop.off("click", e), o.off("keydown", t), o.off("click", r), a.removeClass("md-clickable"), d.isRemoved = !0
                                            };

                                        function e(e) {
                                            e.preventDefault(), e.stopPropagation(), d.restoreFocus = !1, D.nextTick(l.hide, !0)
                                        }

                                        function t(e) {
                                            switch (e.preventDefault(), e.stopPropagation(), e.keyCode) {
                                                case h.UP_ARROW:
                                                    return void n("prev");
                                                case h.DOWN_ARROW:
                                                    return void n("next");
                                                case h.SPACE:
                                                case h.ENTER:
                                                    d.focusedNode && (o.triggerHandler({
                                                        type: "click",
                                                        target: d.focusedNode
                                                    }), e.preventDefault()), r(e);
                                                    break;
                                                case h.TAB:
                                                case h.ESCAPE:
                                                    e.stopPropagation(), e.preventDefault(), d.restoreFocus = !0, D.nextTick(l.hide, !0);
                                                    break;
                                                default:
                                                    if (q(e, c)) {
                                                        var t = i.optNodeForKeyboardSearch(e);
                                                        t && !t.hasAttribute("disabled") && s(d.focusedNode, t, i)
                                                    }
                                            }
                                        }

                                        function n(e) {
                                            for (var t, n = D.nodesToArray(d.optionNodes), o = n.indexOf(d.focusedNode), r = n[o]; - 1 === o ? o = 0 : "next" === e && o < n.length - 1 ? o++ : "prev" === e && 0 < o && o--, (t = n[o]).hasAttribute("disabled") && (t = null), !t && o < n.length - 1 && 0 < o;);
                                            s(r, t, i)
                                        }

                                        function r(n) {
                                            n && "click" === n.type && n.currentTarget !== o[0] || function() {
                                                var e = !1;
                                                if (n && 0 < n.currentTarget.children.length) {
                                                    var t = n.currentTarget.children[0];
                                                    if (t.scrollHeight > t.clientHeight && 0 < t.children.length) n.pageX - n.currentTarget.getBoundingClientRect().left > t.querySelector("md-option").offsetWidth && (e = !0)
                                                }
                                                return e
                                            }() || d.focusedNode && d.focusedNode.hasAttribute && !d.focusedNode.hasAttribute("disabled") && (n.preventDefault(), n.stopPropagation(), i.isMultiple || (d.restoreFocus = !0, D.nextTick(function() {
                                                l.hide(i.ngModel.$viewValue), d.focusedNode.classList.remove("md-focused")
                                            }, !0)))
                                        }
                                    }(), d.cleanupResizing = function() {
                                        var e = function(o, r, i) {
                                                return function() {
                                                    if (!i.isRemoved) {
                                                        var e = f(o, r, i),
                                                            t = e.container,
                                                            n = e.dropDown;
                                                        t.element.css(p.toCss(t.styles)), n.element.css(p.toCss(n.styles))
                                                    }
                                                }
                                            }(n, a, d),
                                            t = be.element(H);
                                        return t.on("resize", e), t.on("orientationchange", e),
                                            function() {
                                                t.off("resize", e), t.off("orientationchange", e)
                                            }
                                    }(), d.contentEl[0].focus(), e
                                }, d.hideBackdrop);

                            function o() {
                                return r(function(e) {
                                    if (d.isRemoved) return r.reject(!1);
                                    var t = f(n, a, d);
                                    t.container.element.css(p.toCss(t.container.styles)), t.dropDown.element.css(p.toCss(t.dropDown.styles)), i(function() {
                                        a.addClass("md-active"), t.dropDown.element.css(p.toCss({
                                                transform: ""
                                            })),
                                            function(e) {
                                                var t;
                                                e && !e.hasAttribute("disabled") && (t = d.selectEl.controller("mdSelectMenu"), s(null, e, t))
                                            }(d.focusedNode), e()
                                    })
                                })
                            }

                            function s(e, t, n) {
                                var o = d.contentEl[0];
                                if (t) {
                                    if (e && e.classList.remove("md-focused"), t.classList.add("md-focused"), n && n.setActiveDescendant && n.setActiveDescendant(t.id), o.scrollHeight > o.clientHeight) {
                                        var r = o.clientHeight + o.scrollTop,
                                            i = t.offsetTop + t.offsetHeight;
                                        r < i ? o.scrollTop = i - o.clientHeight : t.offsetTop < o.scrollTop && (o.scrollTop = t.offsetTop)
                                    }
                                    d.focusedNode = t, n && n.refreshViewValue && n.refreshViewValue()
                                }
                            }
                        },
                        onRemove: function(e, t, n) {
                            var o = null,
                                r = e.$on("$destroy", function() {
                                    o.end()
                                });
                            return (n = n || {}).cleanupInteraction(), n.cleanupResizing(), n.hideBackdrop(), !0 === n.$destroy ? i() : function() {
                                return (o = m(t, {
                                    addClass: "md-leave"
                                })).start()
                            }().then(i);

                            function i() {
                                r(), t.removeClass("md-active").attr("aria-hidden", "true").css({
                                        display: "none",
                                        top: "",
                                        right: "",
                                        bottom: "",
                                        left: "",
                                        "font-size": "",
                                        "min-width": ""
                                    }),
                                    function(e) {
                                        var t = e.selectCtrl;
                                        if (t) {
                                            var n = e.selectEl.controller("mdSelectMenu");
                                            t.setSelectValueText(n ? n.getSelectedLabels() : ""), t.triggerClose()
                                        }
                                    }(n), n.$destroy || (n.restoreFocus ? n.target.focus() : D.nextTick(function() {
                                        n.target.triggerHandler("blur")
                                    }, !0))
                            }
                        },
                        hasBackdrop: !0,
                        disableParentScroll: !0
                    };

                    function f(e, t, n) {
                        var o, r = t[0],
                            i = n.target[0].children[0],
                            a = I[0].body,
                            d = n.selectEl[0],
                            s = n.contentEl[0],
                            l = a.getBoundingClientRect(),
                            c = i.getBoundingClientRect(),
                            m = {
                                left: l.left + P,
                                top: P,
                                bottom: l.height - P,
                                right: l.width - P - (D.floatingScrollbars() ? 16 : 0)
                            },
                            u = c.top - m.top,
                            p = (c.left, c.left, c.width, m.bottom - (c.top + c.height)),
                            h = l.width - 2 * P,
                            f = d.querySelector("md-option[selected]"),
                            b = d.getElementsByTagName("md-option"),
                            g = d.getElementsByTagName("md-optgroup"),
                            E = function(e, t) {
                                var n = !1;
                                try {
                                    var o = e[0].style.display;
                                    e[0].style.display = "block", n = t.scrollHeight > t.offsetHeight, e[0].style.display = o
                                } finally {}
                                return n
                            }(t, s);
                        o = function(e) {
                            return e && be.isFunction(e.then)
                        }(n.loadingAsync) ? s.firstElementChild || s : f || (g.length ? g[0] : b.length ? b[0] : s.firstElementChild || s), s.offsetWidth > h ? s.style["max-width"] = h + "px" : s.style.maxWidth = null, E && d.classList.add("md-overflow");
                        var v = o;
                        "MD-OPTGROUP" === (v.tagName || "").toUpperCase() && (o = v = b[0] || s.firstElementChild || s), n.focusedNode = v, r.style.display = "block";
                        var $, M, y, C, T, A = d.getBoundingClientRect(),
                            w = function(e) {
                                return e ? {
                                    left: e.offsetLeft,
                                    top: e.offsetTop,
                                    width: e.offsetWidth,
                                    height: e.offsetHeight
                                } : {
                                    left: 0,
                                    top: 0,
                                    width: 0,
                                    height: 0
                                }
                            }(o);
                        if (o) {
                            var _ = H.getComputedStyle(o);
                            w.paddingLeft = parseInt(_.paddingLeft, 10) || 0, w.paddingRight = parseInt(_.paddingRight, 10) || 0
                        }
                        if (E) {
                            var k = s.offsetHeight / 2;
                            s.scrollTop = w.top + w.height / 2 - k, u < k ? s.scrollTop = Math.min(w.top, s.scrollTop + k - u) : p < k && (s.scrollTop = Math.max(w.top + w.height - A.height, s.scrollTop - k + p))
                        }
                        $ = c.left + w.left - w.paddingLeft, M = Math.floor(c.top + c.height / 2 - w.height / 2 - w.top + s.scrollTop) + 2, y = w.left + c.width / 2 + "px " + (w.top + w.height / 2 - s.scrollTop) + "px 0px", C = Math.min(c.width + w.paddingLeft + w.paddingRight, h), T = L.getComputedStyle(i)["font-size"];
                        var x = r.getBoundingClientRect(),
                            N = Math.round(100 * Math.min(c.width / A.width, 1)) / 100,
                            S = Math.round(100 * Math.min(c.height / A.height, 1)) / 100;
                        return {
                            container: {
                                element: be.element(r),
                                styles: {
                                    left: Math.floor(O(m.left, $, m.right - C)),
                                    top: Math.floor(O(m.top, M, m.bottom - x.height)),
                                    "min-width": C,
                                    "font-size": T
                                }
                            },
                            dropDown: {
                                element: be.element(d),
                                styles: {
                                    transformOrigin: y,
                                    transform: n.alreadyOpen ? "" : D.supplant("scale({0},{1})", [N, S])
                                }
                            }
                        }
                    }
                }

                function O(e, t, n) {
                    return Math.max(e, Math.min(t, n))
                }
            }

            function q(e, t) {
                var n = String.fromCharCode(e.keyCode),
                    o = e.keyCode <= 31;
                return n && n.length && !o && !t.isMetaKey(e) && !t.isFnLockKey(e) && !t.hasModifierKey(e)
            }
            be.module("material.components.select", ["material.core", "material.components.backdrop"]).directive("mdSelect", e).directive("mdSelectMenu", t).directive("mdOption", o).directive("mdOptgroup", function() {
                return {
                    restrict: "E",
                    compile: function(t, n) {
                        t.parent().find("md-select-header").length || function() {
                            var e = t.find("label");
                            e.length || (e = be.element("<label>"), t.prepend(e));
                            e.addClass("md-container-ignore"), e.attr("aria-hidden", "true"), n.label && e.text(n.label);
                            t.attr("aria-label", e.text())
                        }();
                        t.attr("role", "group")
                    }
                }
            }).directive("mdSelectHeader", function() {
                return {
                    restrict: "E"
                }
            }).provider("$mdSelect", r)
        }(), be.module("material.components.showHide", ["material.core"]).directive("ngShow", qe("ngShow", !0)).directive("ngHide", qe("ngHide", !1)), Ve.$inject = ["$mdComponentRegistry", "$mdUtil", "$q", "$log"], We.$inject = ["$mdMedia", "$mdUtil", "$mdConstant", "$mdTheming", "$mdInteraction", "$animate", "$compile", "$parse", "$log", "$q", "$document", "$window", "$$rAF"], Ye.$inject = ["$scope", "$attrs", "$mdComponentRegistry", "$q", "$interpolate"], be.module("material.components.sidenav", ["material.core", "material.components.backdrop"]).factory("$mdSidenav", Ve).directive("mdSidenav", We).controller("$mdSidenavController", Ye),
        function() {
            e.$inject = ["$$rAF", "$window", "$mdAria", "$mdUtil", "$mdConstant", "$mdTheming", "$mdGesture", "$parse", "$log", "$timeout"], be.module("material.components.slider", ["material.core"]).directive("mdSlider", e).directive("mdSliderContainer", function() {
                return {
                    controller: function() {},
                    compile: function(e) {
                        var t = e.find("md-slider");
                        if (t) return t.attr("md-vertical") !== ge && e.attr("md-vertical", ""), t.attr("flex") || t.attr("flex", ""),
                            function(e, a, t, n) {
                                function o(e) {
                                    a.children().attr("disabled", e), a.find("input").attr("disabled", e)
                                }
                                a.addClass("_md");
                                var d, r = be.noop;
                                t.disabled ? o(!0) : t.ngDisabled && (r = e.$watch(t.ngDisabled, function(e) {
                                    o(e)
                                })), e.$on("$destroy", function() {
                                    r()
                                }), n.fitInputWidthToTextLength = function(e) {
                                    var t = a[0].querySelector("md-input-container");
                                    if (t) {
                                        var n = getComputedStyle(t),
                                            o = parseInt(n.minWidth),
                                            r = parseInt(n.paddingLeft) + parseInt(n.paddingRight);
                                        d = d || parseInt(n.maxWidth);
                                        var i = Math.max(d, o + r + o / 2 * e);
                                        t.style.maxWidth = i + "px"
                                    }
                                }
                            }
                    }
                }
            });
            var J = 10,
                ee = 4;

            function e(q, V, r, W, Y, K, G, X, Z, Q) {
                return {
                    scope: {},
                    require: ["?ngModel", "?^mdSliderContainer"],
                    template: '<div class="md-slider-wrapper"><div class="md-slider-content"><div class="md-track-container"><div class="md-track"></div><div class="md-track md-track-fill"></div><div class="md-track-ticks"></div></div><div class="md-thumb-container"><div class="md-thumb"></div><div class="md-focus-thumb"></div><div class="md-focus-ring"></div><div class="md-sign"><span class="md-thumb-text"></span></div><div class="md-disabled-thumb"></div></div></div></div>',
                    compile: function(e, t) {
                        var n = be.element(e[0].getElementsByClassName("md-slider-wrapper")),
                            o = t.tabindex || 0;
                        n.attr("tabindex", o), (t.disabled || t.ngDisabled) && n.attr("tabindex", -1);
                        return n.attr("role", "slider"), r.expect(e, "aria-label"), i
                    }
                };

                function i(n, o, r, e) {
                    K(o);
                    var i = e[0] || {
                            $setViewValue: function(e) {
                                this.$viewValue = e, this.$viewChangeListeners.forEach(function(e) {
                                    e()
                                })
                            },
                            $parsers: [],
                            $formatters: [],
                            $viewChangeListeners: []
                        },
                        a = e[1],
                        d = (be.element(W.getClosest(o, "_md-slider-container", !0)), r.ngDisabled ? be.bind(null, X(r.ngDisabled), n.$parent) : function() {
                            return o[0].hasAttribute("disabled")
                        }),
                        t = be.element(o[0].querySelector(".md-thumb")),
                        s = be.element(o[0].querySelector(".md-thumb-text")),
                        l = t.parent(),
                        c = be.element(o[0].querySelector(".md-track-container")),
                        m = be.element(o[0].querySelector(".md-track-fill")),
                        u = be.element(o[0].querySelector(".md-track-ticks")),
                        p = be.element(o[0].getElementsByClassName("md-slider-wrapper")),
                        h = (be.element(o[0].getElementsByClassName("md-slider-content")), W.throttle(S, 5e3)),
                        f = be.isDefined(r.mdVertical),
                        b = be.isDefined(r.mdDiscrete),
                        g = be.isDefined(r.mdInvert);
                    be.isDefined(r.min) ? r.$observe("min", w) : w(0), be.isDefined(r.max) ? r.$observe("max", _) : _(100), be.isDefined(r.step) ? r.$observe("step", k) : k(1), be.isDefined(r.round) ? r.$observe("round", x) : x(3);
                    be.noop;

                    function E() {
                        S(), O()
                    }
                    r.ngDisabled && n.$parent.$watch(r.ngDisabled, function() {
                        o.attr("aria-disabled", !!d())
                    }), G.register(p, "drag", {
                        horizontal: !f
                    }), n.mouseActive = !1, p.on("keydown", function(e) {
                        if (d()) return;
                        var t, n = Y.KEY_CODE;
                        switch (e.keyCode) {
                            case n.DOWN_ARROW:
                            case n.LEFT_ARROW:
                                e.preventDefault(), t = -M;
                                break;
                            case n.UP_ARROW:
                            case n.RIGHT_ARROW:
                                e.preventDefault(), t = M;
                                break;
                            case n.PAGE_DOWN:
                                e.preventDefault(), t = -M * J;
                                break;
                            case n.PAGE_UP:
                                e.preventDefault(), t = M * J;
                                break;
                            case n.HOME:
                                e.preventDefault(), e.stopPropagation(), H(v);
                                break;
                            case n.END:
                                e.preventDefault(), e.stopPropagation(), H($)
                        }
                        t && (t = g ? -t : t, (e.metaKey || e.ctrlKey || e.altKey) && (t *= ee), e.preventDefault(), e.stopPropagation(), H(i.$viewValue + t))
                    }).on("mousedown", function() {
                        (function() {
                            if (!b || d()) return;
                            if (be.isUndefined(M)) return;
                            if (M <= 0) {
                                var e = "Slider step value must be greater than zero when in discrete mode";
                                throw Z.error(e), new Error(e)
                            }
                            var t = Math.floor(($ - v) / M);
                            C || (C = be.element("<canvas>").css("position", "absolute"), u.append(C), T = C[0].getContext("2d"));
                            var n, o = D();
                            !o || o.height || o.width || (S(), o = N);
                            C[0].width = o.width, C[0].height = o.height;
                            for (var r = 0; r <= t; r++) {
                                var i = V.getComputedStyle(u[0]);
                                T.fillStyle = i.color || "black", n = Math.floor((f ? o.height : o.width) * (r / t)), T.fillRect(f ? 0 : n - 1, f ? n - 1 : 0, f ? o.width : 2, f ? 2 : o.height)
                            }
                        })(), n.mouseActive = !0, p.removeClass("md-focused"), Q(function() {
                            n.mouseActive = !1
                        }, 100)
                    }).on("focus", function() {
                        !1 === n.mouseActive && p.addClass("md-focused")
                    }).on("blur", function() {
                        p.removeClass("md-focused"), o.removeClass("md-active"),
                            function() {
                                if (C && T) {
                                    var e = D();
                                    T.clearRect(0, 0, e.width, e.height)
                                }
                            }()
                    }).on("$md.pressdown", function(e) {
                        if (d()) return;
                        o.addClass("md-active"), o[0].focus(), S();
                        var t = P(L(j(U(f ? e.srcEvent.clientY : e.srcEvent.clientX))));
                        n.$apply(function() {
                            I(t), R(z(t))
                        })
                    }).on("$md.pressup", function(e) {
                        if (d()) return;
                        o.removeClass("md-dragging");
                        var t = P(L(j(U(f ? e.srcEvent.clientY : e.srcEvent.clientX))));
                        n.$apply(function() {
                            I(t), O()
                        })
                    }).on("$md.dragstart", function(e) {
                        if (d()) return;
                        F = !0, e.stopPropagation(), o.addClass("md-dragging"), B(e)
                    }).on("$md.drag", function(e) {
                        if (!F) return;
                        e.stopPropagation(), B(e)
                    }).on("$md.dragend", function(e) {
                        if (!F) return;
                        e.stopPropagation(), F = !1
                    }), setTimeout(E, 0);
                    var v, $, M, y, C, T, A = q.throttle(E);

                    function w(e) {
                        v = parseFloat(e), i.$viewValue = P(i.$modelValue, v, $), p.attr("aria-valuemin", e), E()
                    }

                    function _(e) {
                        $ = parseFloat(e), i.$viewValue = P(i.$modelValue, v, $), p.attr("aria-valuemax", e), E()
                    }

                    function k(e) {
                        M = parseFloat(e)
                    }

                    function x(e) {
                        y = P(parseInt(e), 0, 6)
                    }
                    be.element(V).on("resize", A), n.$on("$destroy", function() {
                        be.element(V).off("resize", A)
                    }), i.$render = O, i.$viewChangeListeners.push(O), i.$formatters.push(P), i.$formatters.push(L);
                    var N = {};

                    function S() {
                        N = c[0].getBoundingClientRect()
                    }

                    function D() {
                        return h(), N
                    }

                    function H(e) {
                        n.$evalAsync(function() {
                            I(e)
                        })
                    }

                    function I(e) {
                        i.$setViewValue(P(L(e)))
                    }

                    function O() {
                        isNaN(i.$viewValue) && (i.$viewValue = i.$modelValue), i.$viewValue = P(i.$viewValue);
                        var e = z(i.$viewValue);
                        n.modelValue = i.$viewValue, p.attr("aria-valuenow", i.$viewValue), R(e), s.text(i.$viewValue)
                    }

                    function P(e, t, n) {
                        if (be.isNumber(e)) return t = be.isNumber(t) ? t : v, n = be.isNumber(n) ? n : $, Math.max(t, Math.min(n, e))
                    }

                    function L(e) {
                        if (be.isNumber(e)) {
                            var t = Math.round((e - v) / M) * M + v;
                            return t = Math.round(t * Math.pow(10, y)) / Math.pow(10, y), a && a.fitInputWidthToTextLength && W.debounce(function() {
                                a.fitInputWidthToTextLength(t.toString().length)
                            }, 100)(), t
                        }
                    }

                    function R(e) {
                        var t = 100 * (e = function(e) {
                                return Math.max(0, Math.min(e || 0, 1))
                            }(e)) + "%",
                            n = g ? 100 * (1 - e) + "%" : t;
                        f ? l.css("bottom", t) : W.bidiProperty(l, "left", "right", t), m.css(f ? "height" : "width", n), o.toggleClass(g ? "md-max" : "md-min", 0 === e), o.toggleClass(g ? "md-min" : "md-max", 1 === e)
                    }
                    S();
                    var F = !1;

                    function B(e) {
                        b ? function(e) {
                            var t = P(L(j(U(e))));
                            R(U(e)), s.text(t)
                        }(f ? e.srcEvent.clientY : e.srcEvent.clientX) : function(e) {
                            n.$evalAsync(function() {
                                I(j(U(e)))
                            })
                        }(f ? e.srcEvent.clientY : e.srcEvent.clientX)
                    }

                    function U(e) {
                        var t = (e - (f ? N.top : N.left)) / (f ? N.height : N.width);
                        return !f && W.isRtl(r) && (t = 1 - t), Math.max(0, Math.min(1, f ? 1 - t : t))
                    }

                    function j(e) {
                        return v + (g ? 1 - e : e) * ($ - v)
                    }

                    function z(e) {
                        var t = (e - v) / ($ - v);
                        return g ? 1 - t : t
                    }
                }
            }
        }(), Ke.$inject = ["$mdConstant", "$$rAF", "$mdUtil", "$compile"], be.module("material.components.sticky", ["material.core", "material.components.content"]).factory("$mdSticky", Ke), Ge.$inject = ["$mdSticky", "$compile", "$mdTheming", "$mdUtil", "$mdAria"], be.module("material.components.subheader", ["material.core", "material.components.sticky"]).directive("mdSubheader", Ge), be.module("material.components.swipe", ["material.core"]).directive("mdSwipeLeft", Xe("SwipeLeft")).directive("mdSwipeRight", Xe("SwipeRight")).directive("mdSwipeUp", Xe("SwipeUp")).directive("mdSwipeDown", Xe("SwipeDown")), Ze.$inject = ["mdCheckboxDirective", "$mdUtil", "$mdConstant", "$parse", "$$rAF", "$mdGesture", "$timeout"], be.module("material.components.switch", ["material.core", "material.components.checkbox"]).directive("mdSwitch", Ze), be.module("material.components.tabs", ["material.core", "material.components.icon"]), be.module("material.components.tabs").service("MdTabsPaginationService", function() {
            return {
                decreasePageOffset: function(e, t) {
                    var n, o, r = e.canvas,
                        i = d(e);
                    for (n = 0; n < i.length; n++)
                        if (i[n] >= t) {
                            o = i[n];
                            break
                        } return Math.max(0, o - r.clientWidth)
                },
                increasePageOffset: function(e, t) {
                    var n, o, r = e.canvas,
                        i = s(e) - r.clientWidth,
                        a = d(e);
                    for (n = 0; a.length, a[n] <= t + r.clientWidth; n++) o = a[n];
                    return Math.min(i, o)
                },
                getTabOffsets: d,
                getTotalTabsWidth: s
            };

            function d(e) {
                var t, n, o = 0,
                    r = [];
                for (t = 0; t < e.tabs.length; t++) n = e.tabs[t], r.push(o), o += n.offsetWidth;
                return r
            }

            function s(e) {
                var t, n = 0;
                for (t = 0; t < e.tabs.length; t++) n += e.tabs[t].offsetWidth;
                return n
            }
        }), be.module("material.components.tabs").directive("mdTab", function() {
            return {
                require: "^?mdTabs",
                terminal: !0,
                compile: function(e, t) {
                    var n = s(e, "md-tab-label"),
                        o = s(e, "md-tab-body");
                    if (0 === n.length && (n = be.element("<md-tab-label></md-tab-label>"), t.label ? n.text(t.label) : n.append(e.contents()), 0 === o.length)) {
                        var r = e.contents().detach();
                        (o = be.element("<md-tab-body></md-tab-body>")).append(r)
                    }
                    return e.append(n), o.html() && e.append(o), i
                },
                scope: {
                    active: "=?mdActive",
                    disabled: "=?ngDisabled",
                    select: "&?mdOnSelect",
                    deselect: "&?mdOnDeselect",
                    tabClass: "@mdTabClass"
                }
            };

            function i(e, t, n, o) {
                if (o) {
                    var r = o.getTabElementIndex(t),
                        i = s(t, "md-tab-body").remove(),
                        a = s(t, "md-tab-label").remove(),
                        d = o.insertTab({
                            scope: e,
                            parent: e.$parent,
                            index: r,
                            element: t,
                            template: i.html(),
                            label: a.html()
                        }, r);
                    e.select = e.select || be.noop, e.deselect = e.deselect || be.noop, e.$watch("active", function(e) {
                        e && o.select(d.getIndex(), !0)
                    }), e.$watch("disabled", function() {
                        o.refreshIndex()
                    }), e.$watch(function() {
                        return o.getTabElementIndex(t)
                    }, function(e) {
                        d.index = e, o.updateTabOrder()
                    }), e.$on("$destroy", function() {
                        o.removeTab(d)
                    })
                }
            }

            function s(e, t) {
                for (var n = e[0].children, o = 0, r = n.length; o < r; o++) {
                    var i = n[o];
                    if (i.tagName === t.toUpperCase()) return be.element(i)
                }
                return be.element()
            }
        }), be.module("material.components.tabs").directive("mdTabItem", function() {
            return {
                require: "^?mdTabs",
                link: function(e, t, n, o) {
                    o && o.attachRipple(e, t)
                }
            }
        }), be.module("material.components.tabs").directive("mdTabLabel", function() {
            return {
                terminal: !0
            }
        }), Qe.$inject = ["$parse"], be.module("material.components.tabs").directive("mdTabScroll", Qe), Je.$inject = ["$scope", "$element", "$window", "$mdConstant", "$mdTabInkRipple", "$mdUtil", "$animateCss", "$attrs", "$compile", "$mdTheming", "$mdInteraction", "$timeout", "MdTabsPaginationService"], be.module("material.components.tabs").controller("MdTabsController", Je), et.$inject = ["$$mdSvgRegistry"], be.module("material.components.tabs").directive("mdTabs", et), tt.$inject = ["$mdUtil", "$window"], be.module("material.components.tabs").directive("mdTabsDummyWrapper", tt), nt.$inject = ["$compile", "$mdUtil"], be.module("material.components.tabs").directive("mdTabsTemplate", nt), ot.$inject = ["$mdToast"], rt.$inject = ["$$interimElementProvider"], be.module("material.components.toast", ["material.core", "material.components.button"]).directive("mdToast", ot).provider("$mdToast", rt), it.$inject = ["$$rAF", "$mdConstant", "$mdUtil", "$mdTheming", "$animate", "$timeout"], be.module("material.components.toolbar", ["material.core", "material.components.content"]).directive("mdToolbar", it), at.$inject = ["$timeout", "$window", "$$rAF", "$document", "$interpolate", "$mdUtil", "$mdPanel", "$$mdTooltipRegistry"], be.module("material.components.tooltip", ["material.core", "material.components.panel"]).directive("mdTooltip", at).service("$$mdTooltipRegistry", function() {
            var i = {},
                a = be.element(L);
            return {
                register: function(e, t, n) {
                    var o = i[e] = i[e] || [];
                    o.length || (n ? L.addEventListener(e, d, !0) : a.on(e, d)), -1 === o.indexOf(t) && o.push(t)
                },
                deregister: function(e, t, n) {
                    var o = i[e],
                        r = o ? o.indexOf(t) : -1; - 1 < r && (o.splice(r, 1), 0 === o.length && (n ? L.removeEventListener(e, d, !0) : a.off(e, d)))
                }
            };

            function d(t) {
                i[t.type] && i[t.type].forEach(function(e) {
                    e.call(this, t)
                }, this)
            }
        }), dt.$inject = ["$element"], be.module("material.components.truncate", ["material.core"]).directive("mdTruncate", function() {
            return {
                restrict: "AE",
                controller: dt
            }
        }),
        function() {
            function e(e) {
                return '<div class="md-virtual-repeat-scroller" role="presentation"><div class="md-virtual-repeat-sizer" role="presentation"></div><div class="md-virtual-repeat-offsetter" role="presentation">' + e[0].innerHTML + "</div></div>"
            }
            t.$inject = ["$$rAF", "$mdUtil", "$mdConstant", "$parse", "$rootScope", "$window", "$scope", "$element", "$attrs"], r.$inject = ["$scope", "$element", "$attrs", "$browser", "$document", "$rootScope", "$$rAF", "$mdUtil"], n.$inject = ["$parse"], be.module("material.components.virtualRepeat", ["material.core", "material.components.showHide"]).directive("mdVirtualRepeatContainer", function() {
                return {
                    controller: t,
                    template: e,
                    compile: function(e, t) {
                        e.addClass("md-virtual-repeat-container").addClass(t.hasOwnProperty("mdOrientHorizontal") ? "md-orient-horizontal" : "md-orient-vertical")
                    }
                }
            }).directive("mdVirtualRepeat", n).directive("mdForceHeight", i);

            function t(e, n, t, o, r, i, a, d, s) {
                this.$rootScope = r, this.$scope = a, this.$element = d, this.$attrs = s, this.size = 0, this.scrollSize = 0, this.scrollOffset = 0, this.horizontal = this.$attrs.hasOwnProperty("mdOrientHorizontal"), this.repeater = null, this.autoShrink = this.$attrs.hasOwnProperty("mdAutoShrink"), this.autoShrinkMin = parseInt(this.$attrs.mdAutoShrinkMin, 10) || 0, this.originalSize = null, this.offsetSize = parseInt(this.$attrs.mdOffsetSize, 10) || 0, this.oldElementSize = null, this.maxElementPixels = t.ELEMENT_MAX_PIXELS, this.ltr = !n.isRtl(this.$attrs), this.$attrs.mdTopIndex ? (this.bindTopIndex = o(this.$attrs.mdTopIndex), this.topIndex = this.bindTopIndex(this.$scope), be.isDefined(this.topIndex) || (this.topIndex = 0, this.bindTopIndex.assign(this.$scope, 0)), this.$scope.$watch(this.bindTopIndex, be.bind(this, function(e) {
                    e !== this.topIndex && this.scrollToIndex(e)
                }))) : this.topIndex = 0, this.scroller = d[0].querySelector(".md-virtual-repeat-scroller"), this.sizer = this.scroller.querySelector(".md-virtual-repeat-sizer"), this.offsetter = this.scroller.querySelector(".md-virtual-repeat-offsetter");
                var l = be.bind(this, this.updateSize);
                e(be.bind(this, function() {
                    l();
                    var e = n.debounce(l, 10, null, !1),
                        t = be.element(i);
                    this.size || e(), t.on("resize", e), a.$on("$destroy", function() {
                        t.off("resize", e)
                    }), a.$emit("$md-resize-enable"), a.$on("$md-resize", l)
                }))
            }

            function n(o) {
                return {
                    controller: r,
                    priority: 1e3,
                    require: ["mdVirtualRepeat", "^^mdVirtualRepeatContainer"],
                    restrict: "A",
                    terminal: !0,
                    transclude: "element",
                    compile: function(e, t) {
                        var n = t.mdVirtualRepeat.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/),
                            i = n[1],
                            a = o(n[2]),
                            d = t.mdExtraName && o(t.mdExtraName);
                        return function(e, t, n, o, r) {
                            o[0].link_(o[1], r, i, a, d)
                        }
                    }
                }
            }

            function r(e, t, n, o, r, i, a, d) {
                this.$scope = e, this.$element = t, this.$attrs = n, this.$browser = o, this.$document = r, this.$mdUtil = d, this.$rootScope = i, this.$$rAF = a, this.onDemand = d.parseAttributeBoolean(n.mdOnDemand), this.browserCheckUrlChange = o.$$checkUrlChange, this.newStartIndex = 0, this.newEndIndex = 0, this.newVisibleEnd = 0, this.startIndex = 0, this.endIndex = 0, this.itemSize = e.$eval(n.mdItemSize) || null, this.isFirstRender = !0, this.isVirtualRepeatUpdating_ = !1, this.itemsLength = 0, this.unwatchItemSize_ = be.noop, this.blocks = {}, this.pooledBlocks = [], e.$on("$destroy", be.bind(this, this.cleanupBlocks_))
            }

            function o(e) {
                if (!be.isFunction(e.getItemAtIndex) || !be.isFunction(e.getLength)) throw Error("When md-on-demand is enabled, the Object passed to md-virtual-repeat must implement functions getItemAtIndex() and getLength().");
                this.model = e
            }

            function i(e) {
                return {
                    restrict: "A",
                    link: function(e, t, n) {
                        var o = e.$eval(n.mdForceHeight) || null;
                        o && t && (t[0].style.height = o)
                    }
                }
            }
            t.prototype.register = function(e) {
                this.repeater = e, be.element(this.scroller).on("scroll wheel touchmove touchend", be.bind(this, this.handleScroll_))
            }, t.prototype.isHorizontal = function() {
                return this.horizontal
            }, t.prototype.getSize = function() {
                return this.size
            }, t.prototype.setSize_ = function(e) {
                var t = this.getDimensionName_();
                this.size = e, this.$element[0].style[t] = e + "px"
            }, t.prototype.unsetSize_ = function() {
                this.$element[0].style[this.getDimensionName_()] = this.oldElementSize, this.oldElementSize = null
            }, t.prototype.updateSize = function() {
                if (!this.originalSize) {
                    var e = this.isHorizontal() ? this.$element[0].clientWidth : this.$element[0].clientHeight;
                    e && (this.size = e), this.handleScroll_(), this.repeater && this.repeater.containerUpdated()
                }
            }, t.prototype.getScrollSize = function() {
                return this.scrollSize
            }, t.prototype.getDimensionName_ = function() {
                return this.isHorizontal() ? "width" : "height"
            }, t.prototype.sizeScroller_ = function(e) {
                var t = this.getDimensionName_(),
                    n = this.isHorizontal() ? "height" : "width";
                if (this.sizer.innerHTML = "", e < this.maxElementPixels) this.sizer.style[t] = e + "px";
                else {
                    this.sizer.style[t] = "auto", this.sizer.style[n] = "auto";
                    var o = Math.floor(e / this.maxElementPixels),
                        r = document.createElement("div");
                    r.style[t] = this.maxElementPixels + "px", r.style[n] = "1px";
                    for (var i = 0; i < o; i++) this.sizer.appendChild(r.cloneNode(!1));
                    r.style[t] = e - o * this.maxElementPixels + "px", this.sizer.appendChild(r)
                }
            }, t.prototype.autoShrink_ = function(e) {
                var t = Math.max(e, this.autoShrinkMin * this.repeater.getItemSize());
                if (this.autoShrink && t !== this.size) {
                    null === this.oldElementSize && (this.oldElementSize = this.$element[0].style[this.getDimensionName_()]);
                    var n = this.originalSize || this.size;
                    if (!n || t < n) this.originalSize || (this.originalSize = this.size), this.setSize_(t);
                    else if (null !== this.originalSize) {
                        this.unsetSize_();
                        var o = this.originalSize;
                        this.originalSize = null, o || this.updateSize(), this.setSize_(o || this.size)
                    }
                    this.repeater.containerUpdated()
                }
            }, t.prototype.setScrollSize = function(e) {
                var t = e + this.offsetSize;
                this.scrollSize !== t && (this.sizeScroller_(t), this.autoShrink_(t), this.scrollSize = t)
            }, t.prototype.getScrollOffset = function() {
                return this.scrollOffset
            }, t.prototype.scrollTo = function(e) {
                this.scroller[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = e, this.handleScroll_()
            }, t.prototype.scrollToIndex = function(e) {
                var t = this.repeater.getItemSize(),
                    n = this.repeater.itemsLength;
                n < e && (e = n - 1), this.scrollTo(t * e)
            }, t.prototype.resetScroll = function() {
                this.scrollTo(0)
            }, t.prototype.handleScroll_ = function() {
                this.ltr || this.maxSize || (this.scroller.scrollLeft = this.scrollSize, this.maxSize = this.scroller.scrollLeft);
                var e = this.isHorizontal() ? this.ltr ? this.scroller.scrollLeft : this.maxSize - this.scroller.scrollLeft : this.scroller.scrollTop;
                if (!(this.scrollSize < this.size) && (e > this.scrollSize - this.size && (e = this.scrollSize - this.size), e !== this.scrollOffset)) {
                    var t = this.repeater.getItemSize();
                    if (t) {
                        var n = Math.max(0, Math.floor(e / t) - 3),
                            o = (this.isHorizontal() ? "translateX(" : "translateY(") + (!this.isHorizontal() || this.ltr ? n * t : -n * t) + "px)";
                        if (this.scrollOffset = e, this.offsetter.style.webkitTransform = o, this.offsetter.style.transform = o, this.bindTopIndex) {
                            var r = Math.floor(e / t);
                            r !== this.topIndex && r < this.repeater.getItemCount() && (this.topIndex = r, this.bindTopIndex.assign(this.$scope, r), this.$rootScope.$$phase || this.$scope.$digest())
                        }
                        this.repeater.containerUpdated()
                    }
                }
            }, r.prototype.link_ = function(e, t, n, o, r) {
                this.container = e, this.transclude = t, this.repeatName = n, this.rawRepeatListExpression = o, this.extraName = r, this.sized = !1, this.repeatListExpression = be.bind(this, this.repeatListExpression_), this.container.register(this)
            }, r.prototype.cleanupBlocks_ = function() {
                be.forEach(this.pooledBlocks, function(e) {
                    e.element.remove()
                })
            }, r.prototype.readItemSize_ = function() {
                if (!this.itemSize) {
                    this.items = this.repeatListExpression(this.$scope), this.parentNode = this.$element[0].parentNode;
                    var e = this.getBlock_(0);
                    e.element[0].parentNode || this.parentNode.appendChild(e.element[0]), this.itemSize = e.element[0][this.container.isHorizontal() ? "offsetWidth" : "offsetHeight"] || null, this.blocks[0] = e, this.poolBlock_(0), this.itemSize && this.containerUpdated()
                }
            }, r.prototype.repeatListExpression_ = function(e) {
                var t = this.rawRepeatListExpression(e);
                if (this.onDemand && t) {
                    var n = new o(t);
                    return n.$$includeIndexes(this.newStartIndex, this.newVisibleEnd), n
                }
                return t
            }, r.prototype.containerUpdated = function() {
                if (!this.itemSize) return this.unwatchItemSize_ && this.unwatchItemSize_ !== be.noop && this.unwatchItemSize_(), this.unwatchItemSize_ = this.$scope.$watchCollection(this.repeatListExpression, be.bind(this, function(e) {
                    e && e.length && this.readItemSize_()
                })), void(this.$rootScope.$$phase || this.$scope.$digest());
                this.sized || (this.items = this.repeatListExpression(this.$scope)), this.sized || (this.unwatchItemSize_(), this.sized = !0, this.$scope.$watchCollection(this.repeatListExpression, be.bind(this, function(e, t) {
                    this.isVirtualRepeatUpdating_ || this.virtualRepeatUpdate_(e, t)
                }))), this.updateIndexes_(), (this.newStartIndex !== this.startIndex || this.newEndIndex !== this.endIndex || this.container.getScrollOffset() > this.container.getScrollSize()) && (this.items instanceof o && this.items.$$includeIndexes(this.newStartIndex, this.newEndIndex), this.virtualRepeatUpdate_(this.items, this.items))
            }, r.prototype.getItemSize = function() {
                return this.itemSize
            }, r.prototype.getItemCount = function() {
                return this.itemsLength
            }, r.prototype.virtualRepeatUpdate_ = function(e, t) {
                this.isVirtualRepeatUpdating_ = !0;
                var n = e && e.length || 0,
                    o = !1;
                if (this.items && n < this.items.length && 0 !== this.container.getScrollOffset()) {
                    this.items = e;
                    var r = this.container.getScrollOffset();
                    this.container.resetScroll(), this.container.scrollTo(r)
                }
                n !== this.itemsLength && (o = !0, this.itemsLength = n), (this.items = e) === t && !o || this.updateIndexes_(), this.parentNode = this.$element[0].parentNode, o && this.container.setScrollSize(n * this.itemSize), Object.keys(this.blocks).forEach(function(e) {
                    var t = parseInt(e, 10);
                    (t < this.newStartIndex || t >= this.newEndIndex) && this.poolBlock_(t)
                }, this), this.$browser.$$checkUrlChange = be.noop;
                var i, a, d = [],
                    s = [];
                for (i = this.newStartIndex; i < this.newEndIndex && null == this.blocks[i]; i++) a = this.getBlock_(i), this.updateBlock_(a, i), d.push(a);
                for (; null != this.blocks[i]; i++) this.updateBlock_(this.blocks[i], i);
                for (var l = i - 1; i < this.newEndIndex; i++) a = this.getBlock_(i), this.updateBlock_(a, i), s.push(a);
                if (d.length && this.parentNode.insertBefore(this.domFragmentFromBlocks_(d), this.$element[0].nextSibling), s.length && this.parentNode.insertBefore(this.domFragmentFromBlocks_(s), this.blocks[l] && this.blocks[l].element[0].nextSibling), this.$browser.$$checkUrlChange = this.browserCheckUrlChange, this.startIndex = this.newStartIndex, this.endIndex = this.newEndIndex, this.isFirstRender) {
                    this.isFirstRender = !1;
                    var c = this.$attrs.mdStartIndex ? this.$scope.$eval(this.$attrs.mdStartIndex) : this.container.topIndex;
                    this.$mdUtil.nextTick(function() {
                        this.container.scrollToIndex(c)
                    }.bind(this))
                }
                this.isVirtualRepeatUpdating_ = !1
            }, r.prototype.getBlock_ = function(n) {
                return this.pooledBlocks.length ? this.pooledBlocks.pop() : (this.transclude(be.bind(this, function(e, t) {
                    o = {
                        element: e,
                        new: !0,
                        scope: t
                    }, this.updateScope_(t, n), this.parentNode.appendChild(e[0])
                })), o);
                var o
            }, r.prototype.updateBlock_ = function(e, t) {
                !(this.blocks[t] = e).new && e.scope.$index === t && e.scope[this.repeatName] === this.items[t] || (e.new = !1, this.updateScope_(e.scope, t), this.$rootScope.$$phase || e.scope.$digest())
            }, r.prototype.updateScope_ = function(e, t) {
                e.$index = t, e[this.repeatName] = this.items && this.items[t], this.extraName && (e[this.extraName(this.$scope)] = this.items[t])
            }, r.prototype.poolBlock_ = function(e) {
                this.pooledBlocks.push(this.blocks[e]), this.parentNode.removeChild(this.blocks[e].element[0]), delete this.blocks[e]
            }, r.prototype.domFragmentFromBlocks_ = function(e) {
                var t = this.$document[0].createDocumentFragment();
                return e.forEach(function(e) {
                    t.appendChild(e.element[0])
                }), t
            }, r.prototype.updateIndexes_ = function() {
                var e = this.items ? this.items.length : 0,
                    t = Math.ceil(this.container.getSize() / this.itemSize);
                this.newStartIndex = Math.max(0, Math.min(e - t, Math.floor(this.container.getScrollOffset() / this.itemSize))), this.newVisibleEnd = this.newStartIndex + t + 3, this.newEndIndex = Math.min(e, this.newVisibleEnd), this.newStartIndex = Math.max(0, this.newStartIndex - 3)
            }, o.prototype.$$includeIndexes = function(e, t) {
                for (var n = e; n < t; n++) this.hasOwnProperty(n) || (this[n] = this.model.getItemAtIndex(n));
                this.length = this.model.getLength()
            }, i.$inject = ["$mdUtil"]
        }(), st.$inject = ["$log"], be.module("material.components.whiteframe", ["material.core"]).directive("mdWhiteframe", st), be.module("material.core").constant("$MD_THEME_CSS", 'md-autocomplete.md-THEME_NAME-theme{background:"{{background-hue-1}}"}md-autocomplete.md-THEME_NAME-theme[disabled]:not([md-floating-label]){background:"{{background-hue-2}}"}md-autocomplete.md-THEME_NAME-theme button md-icon path{fill:"{{background-600}}"}md-autocomplete.md-THEME_NAME-theme button:after{background:"{{background-600-0.3}}"}md-autocomplete.md-THEME_NAME-theme input{color:"{{foreground-1}}"}md-autocomplete.md-THEME_NAME-theme.md-accent md-input-container.md-input-focused .md-input{border-color:"{{accent-color}}"}md-autocomplete.md-THEME_NAME-theme.md-accent md-input-container.md-input-focused label,md-autocomplete.md-THEME_NAME-theme.md-accent md-input-container.md-input-focused md-icon{color:"{{accent-color}}"}md-autocomplete.md-THEME_NAME-theme.md-accent md-progress-linear .md-container{background-color:"{{accent-100}}"}md-autocomplete.md-THEME_NAME-theme.md-accent md-progress-linear .md-bar{background-color:"{{accent-color}}"}md-autocomplete.md-THEME_NAME-theme.md-warn md-input-container.md-input-focused .md-input{border-color:"{{warn-A700}}"}md-autocomplete.md-THEME_NAME-theme.md-warn md-input-container.md-input-focused label,md-autocomplete.md-THEME_NAME-theme.md-warn md-input-container.md-input-focused md-icon{color:"{{warn-A700}}"}md-autocomplete.md-THEME_NAME-theme.md-warn md-progress-linear .md-container{background-color:"{{warn-100}}"}md-autocomplete.md-THEME_NAME-theme.md-warn md-progress-linear .md-bar{background-color:"{{warn-color}}"}.md-autocomplete-standard-list-container.md-THEME_NAME-theme,.md-autocomplete-suggestions-container.md-THEME_NAME-theme{background:"{{background-hue-1}}"}.md-autocomplete-standard-list-container.md-THEME_NAME-theme .md-autocomplete-suggestion,.md-autocomplete-suggestions-container.md-THEME_NAME-theme .md-autocomplete-suggestion{color:"{{foreground-1}}"}.md-autocomplete-standard-list-container.md-THEME_NAME-theme .md-autocomplete-suggestion.selected,.md-autocomplete-standard-list-container.md-THEME_NAME-theme .md-autocomplete-suggestion:hover,.md-autocomplete-suggestions-container.md-THEME_NAME-theme .md-autocomplete-suggestion.selected,.md-autocomplete-suggestions-container.md-THEME_NAME-theme .md-autocomplete-suggestion:hover{background:"{{background-500-0.18}}"}md-backdrop{background-color:"{{background-900-0.0}}"}md-backdrop.md-opaque.md-THEME_NAME-theme{background-color:"{{background-900-1.0}}"}md-bottom-sheet.md-THEME_NAME-theme{background-color:"{{background-color}}";border-top-color:"{{background-hue-3}}"}md-bottom-sheet.md-THEME_NAME-theme.md-list md-list-item{color:"{{foreground-1}}"}md-bottom-sheet.md-THEME_NAME-theme .md-subheader{background-color:"{{background-color}}";color:"{{foreground-1}}"}.md-button.md-THEME_NAME-theme:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme:not([disabled]):hover{background-color:"{{background-500-0.2}}"}.md-button.md-THEME_NAME-theme:not([disabled]).md-icon-button:hover{background-color:transparent}.md-button.md-THEME_NAME-theme.md-fab{background-color:"{{accent-color}}";color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-fab md-icon{color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-fab:not([disabled]):hover{background-color:"{{accent-A700}}"}.md-button.md-THEME_NAME-theme.md-primary{color:"{{primary-color}}"}.md-button.md-THEME_NAME-theme.md-primary.md-fab,.md-button.md-THEME_NAME-theme.md-primary.md-raised{background-color:"{{primary-color}}";color:"{{primary-contrast}}"}.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]) md-icon{color:"{{primary-contrast}}"}.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-primary.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-primary.md-raised:not([disabled]):hover{background-color:"{{primary-600}}"}.md-button.md-THEME_NAME-theme.md-primary:not([disabled]) md-icon{color:"{{primary-color}}"}.md-button.md-THEME_NAME-theme.md-raised{background-color:"{{background-50}}";color:"{{background-900}}"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]) md-icon{color:"{{background-900}}"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]):hover{background-color:"{{background-50}}"}.md-button.md-THEME_NAME-theme.md-raised:not([disabled]).md-focused{background-color:"{{background-200}}"}.md-button.md-THEME_NAME-theme.md-warn{color:"{{warn-color}}"}.md-button.md-THEME_NAME-theme.md-warn.md-fab,.md-button.md-THEME_NAME-theme.md-warn.md-raised{background-color:"{{warn-color}}";color:"{{warn-contrast}}"}.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]) md-icon{color:"{{warn-contrast}}"}.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-warn.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-warn.md-raised:not([disabled]):hover{background-color:"{{warn-600}}"}.md-button.md-THEME_NAME-theme.md-warn:not([disabled]) md-icon{color:"{{warn-color}}"}.md-button.md-THEME_NAME-theme.md-accent{color:"{{accent-color}}"}.md-button.md-THEME_NAME-theme.md-accent.md-fab,.md-button.md-THEME_NAME-theme.md-accent.md-raised{background-color:"{{accent-color}}";color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]) md-icon,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]) md-icon{color:"{{accent-contrast}}"}.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-accent.md-fab:not([disabled]):hover,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]).md-focused,.md-button.md-THEME_NAME-theme.md-accent.md-raised:not([disabled]):hover{background-color:"{{accent-A700}}"}.md-button.md-THEME_NAME-theme.md-accent:not([disabled]) md-icon{color:"{{accent-color}}"}.md-button.md-THEME_NAME-theme.md-accent[disabled],.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled],.md-button.md-THEME_NAME-theme.md-warn[disabled],.md-button.md-THEME_NAME-theme[disabled]{color:"{{foreground-3}}";cursor:default}.md-button.md-THEME_NAME-theme.md-accent[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-fab[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-raised[disabled] md-icon,.md-button.md-THEME_NAME-theme.md-warn[disabled] md-icon,.md-button.md-THEME_NAME-theme[disabled] md-icon{color:"{{foreground-3}}"}.md-button.md-THEME_NAME-theme.md-fab[disabled],.md-button.md-THEME_NAME-theme.md-raised[disabled]{background-color:"{{foreground-4}}"}.md-button.md-THEME_NAME-theme[disabled]{background-color:transparent}._md a.md-THEME_NAME-theme:not(.md-button).md-primary{color:"{{primary-color}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-primary:hover{color:"{{primary-700}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-accent{color:"{{accent-color}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-accent:hover{color:"{{accent-A700}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-warn{color:"{{warn-color}}"}._md a.md-THEME_NAME-theme:not(.md-button).md-warn:hover{color:"{{warn-700}}"}md-card.md-THEME_NAME-theme{background-color:"{{background-hue-1}}";border-radius:2px;color:"{{foreground-1}}"}md-card.md-THEME_NAME-theme .md-card-image{border-radius:2px 2px 0 0}md-card.md-THEME_NAME-theme md-card-header md-card-avatar md-icon{background-color:"{{foreground-3}}";color:"{{background-color}}"}md-card.md-THEME_NAME-theme md-card-header md-card-header-text .md-subhead,md-card.md-THEME_NAME-theme md-card-title md-card-title-text:not(:only-child) .md-subhead{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme .md-ripple{color:"{{accent-A700}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-ripple{color:"{{background-600}}"}md-checkbox.md-THEME_NAME-theme.md-checked.md-focused .md-container:before{background-color:"{{accent-color-0.26}}"}md-checkbox.md-THEME_NAME-theme .md-ink-ripple{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-ink-ripple{color:"{{accent-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-icon{background-color:"{{accent-color-0.87}}"}md-checkbox.md-THEME_NAME-theme.md-checked .md-icon:after{border-color:"{{background-default}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ripple{color:"{{primary-600}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ripple{color:"{{background-600}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-ink-ripple{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple{color:"{{primary-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon{background-color:"{{primary-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked.md-focused .md-container:before{background-color:"{{primary-color-0.26}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-icon:after{border-color:"{{primary-contrast-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-primary .md-indeterminate[disabled] .md-container{color:"{{foreground-3}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ripple{color:"{{warn-600}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn .md-ink-ripple{color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple{color:"{{warn-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-icon{background-color:"{{warn-color-0.87}}"}md-checkbox.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked.md-focused:not([disabled]) .md-container:before{background-color:"{{warn-color-0.26}}"}md-checkbox.md-THEME_NAME-theme[disabled]:not(.md-checked) .md-icon{border-color:"{{foreground-3}}"}md-checkbox.md-THEME_NAME-theme[disabled].md-checked .md-icon{background-color:"{{foreground-3}}"}md-checkbox.md-THEME_NAME-theme[disabled] .md-label{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips{box-shadow:0 1px "{{foreground-4}}"}md-chips.md-THEME_NAME-theme .md-chips.md-focused{box-shadow:0 2px "{{primary-color}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input{color:"{{foreground-1}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input::-webkit-input-placeholder{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input:-ms-input-placeholder{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input::-ms-input-placeholder{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input::placeholder{color:"{{foreground-3}}"}md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input:-moz-placeholder,md-chips.md-THEME_NAME-theme .md-chips .md-chip-input-container input::-moz-placeholder{color:"{{foreground-3}}";opacity:1}md-chips.md-THEME_NAME-theme md-chip{background:"{{background-300}}";color:"{{background-800}}"}md-chips.md-THEME_NAME-theme md-chip md-icon{color:"{{background-700}}"}md-chips.md-THEME_NAME-theme md-chip.md-focused{background:"{{primary-color}}";color:"{{primary-contrast}}"}md-chips.md-THEME_NAME-theme md-chip.md-focused md-icon{color:"{{primary-contrast}}"}md-chips.md-THEME_NAME-theme md-chip._md-chip-editing{background:transparent;color:"{{background-800}}"}md-chips.md-THEME_NAME-theme .md-chip-remove-container button.md-chip-remove md-icon,md-chips.md-THEME_NAME-theme .md-chip-remove-container buttonmd-chip-remove md-icon{fill:"{{foreground-2}}";color:"{{foreground-2}}"}.md-contact-suggestion span.md-contact-email{color:"{{background-400}}"}md-content.md-THEME_NAME-theme{background-color:"{{background-default}}";color:"{{foreground-1}}"}.md-THEME_NAME-theme .md-calendar{background:"{{background-hue-1}}";color:"{{foreground-1-0.87}}"}.md-THEME_NAME-theme .md-calendar tr:last-child td{border-bottom-color:"{{background-hue-2}}"}.md-THEME_NAME-theme .md-calendar-day-header{background:"{{background-500-0.32}}";color:"{{foreground-1-0.87}}"}.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today .md-calendar-date-selection-indicator{border:1px solid "{{primary-500}}"}.md-THEME_NAME-theme .md-calendar-date.md-calendar-date-today.md-calendar-date-disabled{color:"{{primary-500-0.6}}"}.md-calendar-date.md-focus .md-THEME_NAME-theme .md-calendar-date-selection-indicator,.md-THEME_NAME-theme .md-calendar-date-selection-indicator:hover{background:"{{background-500-0.32}}"}.md-THEME_NAME-theme .md-calendar-date.md-calendar-selected-date .md-calendar-date-selection-indicator,.md-THEME_NAME-theme .md-calendar-date.md-focus.md-calendar-selected-date .md-calendar-date-selection-indicator{background:"{{primary-500}}";border-color:transparent;color:"{{primary-500-contrast}}"}.md-THEME_NAME-theme .md-calendar-date-disabled,.md-THEME_NAME-theme .md-calendar-month-label-disabled{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-calendar-month-label md-icon,.md-THEME_NAME-theme .md-datepicker-input{color:"{{foreground-1}}"}.md-THEME_NAME-theme .md-datepicker-input::-webkit-input-placeholder{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-datepicker-input:-ms-input-placeholder{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-datepicker-input::-ms-input-placeholder{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-datepicker-input::placeholder{color:"{{foreground-3}}"}.md-THEME_NAME-theme .md-datepicker-input:-moz-placeholder,.md-THEME_NAME-theme .md-datepicker-input::-moz-placeholder{color:"{{foreground-3}}";opacity:1}.md-THEME_NAME-theme .md-datepicker-input-container{border-bottom-color:"{{foreground-4}}"}.md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused{border-bottom-color:"{{primary-color}}"}.md-accent .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused{border-bottom-color:"{{accent-color}}"}.md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-invalid,.md-warn .md-THEME_NAME-theme .md-datepicker-input-container.md-datepicker-focused{border-bottom-color:"{{warn-A700}}"}.md-THEME_NAME-theme .md-datepicker-calendar-pane{border-color:"{{background-hue-1}}"}.md-THEME_NAME-theme .md-datepicker-triangle-button .md-datepicker-expand-triangle{border-top-color:"{{foreground-2}}"}.md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon{color:"{{primary-color}}"}.md-accent .md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon,.md-THEME_NAME-theme .md-datepicker-open.md-accent .md-datepicker-calendar-icon{color:"{{accent-color}}"}.md-THEME_NAME-theme .md-datepicker-open.md-warn .md-datepicker-calendar-icon,.md-warn .md-THEME_NAME-theme .md-datepicker-open .md-datepicker-calendar-icon{color:"{{warn-A700}}"}.md-THEME_NAME-theme .md-datepicker-calendar{background:"{{background-hue-1}}"}.md-THEME_NAME-theme .md-datepicker-input-mask-opaque{box-shadow:0 0 0 9999px "{{background-hue-1}}"}.md-THEME_NAME-theme .md-datepicker-open .md-datepicker-input-container{background:"{{background-hue-1}}"}md-dialog.md-THEME_NAME-theme{background-color:"{{background-hue-1}}";border-radius:4px;color:"{{foreground-1}}"}md-dialog.md-THEME_NAME-theme.md-content-overflow md-dialog-actions{border-top-color:"{{foreground-4}}"}md-divider.md-THEME_NAME-theme{border-color:"{{foreground-4}}"}md-fab-speed-dial.md-THEME_NAME-theme md-fab-trigger .md-fab.md-button[disabled]{background-color:"{{foreground-4}}"}md-fab-speed-dial.md-THEME_NAME-theme md-fab-actions .md-fab-action-item .md-button.md-fab.md-raised.md-mini.md-focused,md-fab-speed-dial.md-THEME_NAME-theme md-fab-actions .md-fab-action-item .md-button.md-fab.md-raised.md-mini:hover{background-color:"{{background-500}}"}md-icon.md-THEME_NAME-theme{color:"{{foreground-2}}"}md-icon.md-THEME_NAME-theme.md-primary{color:"{{primary-color}}"}md-icon.md-THEME_NAME-theme.md-accent{color:"{{accent-color}}"}md-icon.md-THEME_NAME-theme.md-warn{color:"{{warn-color}}"}md-input-container.md-THEME_NAME-theme .md-input{border-color:"{{background-default-contrast-divider}}";color:"{{background-default-contrast}}"}md-input-container.md-THEME_NAME-theme .md-input::-webkit-input-placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme .md-input:-ms-input-placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme .md-input::-ms-input-placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme .md-input::placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme .md-input:-moz-placeholder,md-input-container.md-THEME_NAME-theme .md-input::-moz-placeholder{color:"{{background-default-contrast-secondary}}";opacity:1}md-input-container.md-THEME_NAME-theme>md-icon{color:"{{background-default-contrast}}"}md-input-container.md-THEME_NAME-theme .md-placeholder,md-input-container.md-THEME_NAME-theme label{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme label.md-required:after{color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-focused):not(.md-input-invalid) label.md-required:after{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme .md-input-message-animation,md-input-container.md-THEME_NAME-theme .md-input-messages-animation{color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme .md-input-message-animation .md-char-counter,md-input-container.md-THEME_NAME-theme .md-input-messages-animation .md-char-counter{color:"{{background-default-contrast}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input::-webkit-input-placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input:-ms-input-placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input::-ms-input-placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input::placeholder{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme.md-input-focused .md-input:-moz-placeholder,md-input-container.md-THEME_NAME-theme.md-input-focused .md-input::-moz-placeholder{color:"{{background-default-contrast-secondary}}";opacity:1}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-has-value label{color:"{{background-default-contrast-secondary}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused .md-input,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-resized .md-input{border-color:"{{primary-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused label,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused md-icon{color:"{{primary-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent .md-input{border-color:"{{accent-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent label,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-accent md-icon{color:"{{accent-color}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn .md-input{border-color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn label,md-input-container.md-THEME_NAME-theme:not(.md-input-invalid).md-input-focused.md-warn md-icon{color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input{border-color:"{{warn-A700}}"}md-input-container.md-THEME_NAME-theme.md-input-invalid .md-char-counter,md-input-container.md-THEME_NAME-theme.md-input-invalid .md-input-message-animation,md-input-container.md-THEME_NAME-theme.md-input-invalid label{color:"{{warn-A700}}"}[disabled] md-input-container.md-THEME_NAME-theme .md-input,md-input-container.md-THEME_NAME-theme .md-input[disabled]{background-image:linear-gradient(90deg,"{{background-default-contrast-disabled}}" 0,"{{background-default-contrast-disabled}}" 33%,transparent 0);background-image:-ms-linear-gradient(left,transparent 0,"{{background-default-contrast-disabled}}" 100%);border-bottom-color:transparent;color:"{{background-default-contrast-disabled}}"}md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text h4,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h3,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text h4{color:"{{foreground-1}}"}md-list.md-THEME_NAME-theme md-list-item.md-2-line .md-list-item-text p,md-list.md-THEME_NAME-theme md-list-item.md-3-line .md-list-item-text p{color:"{{foreground-2}}"}md-list.md-THEME_NAME-theme .md-proxy-focus.md-focused div.md-no-style{background-color:"{{background-100}}"}md-list.md-THEME_NAME-theme md-list-item .md-avatar-icon{background-color:"{{foreground-3}}";color:"{{background-color}}"}md-list.md-THEME_NAME-theme md-list-item>md-icon{color:"{{foreground-2}}"}md-list.md-THEME_NAME-theme md-list-item>md-icon.md-highlight{color:"{{primary-color}}"}md-list.md-THEME_NAME-theme md-list-item>md-icon.md-highlight.md-accent{color:"{{accent-color}}"}md-menu-content.md-THEME_NAME-theme{background-color:"{{background-hue-1}}"}md-menu-content.md-THEME_NAME-theme md-menu-item{color:"{{foreground-1}}"}md-menu-content.md-THEME_NAME-theme md-menu-item md-icon{color:"{{foreground-2}}"}md-menu-content.md-THEME_NAME-theme md-menu-item .md-button[disabled],md-menu-content.md-THEME_NAME-theme md-menu-item .md-button[disabled] md-icon{color:"{{foreground-3}}"}md-menu-content.md-THEME_NAME-theme md-menu-divider{background-color:"{{foreground-4}}"}md-menu-bar.md-THEME_NAME-theme>button.md-button{border-radius:2px;color:"{{foreground-1}}"}md-menu-bar.md-THEME_NAME-theme md-menu>button{color:"{{foreground-1}}"}md-menu-bar.md-THEME_NAME-theme md-menu.md-open>button,md-menu-bar.md-THEME_NAME-theme md-menu>button:focus{background-color:"{{ background-500-0.18}}";outline:none}md-menu-bar.md-THEME_NAME-theme.md-open:not(.md-keyboard-mode) md-menu:hover>button{background-color:"{{ background-500-0.18}}"}md-menu-bar.md-THEME_NAME-theme:not(.md-keyboard-mode):not(.md-open) md-menu button:focus,md-menu-bar.md-THEME_NAME-theme:not(.md-keyboard-mode):not(.md-open) md-menu button:hover{background:transparent}md-menu-content.md-THEME_NAME-theme .md-menu>.md-button:after{color:"{{foreground-2}}"}md-menu-content.md-THEME_NAME-theme .md-menu.md-open>.md-button{background-color:"{{ background-500-0.18}}"}md-toolbar.md-THEME_NAME-theme.md-menu-toolbar{background-color:"{{background-hue-1}}";color:"{{foreground-1}}"}md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler{background-color:"{{primary-color}}";color:"{{primary-contrast}}"}md-toolbar.md-THEME_NAME-theme.md-menu-toolbar md-toolbar-filler md-icon{color:"{{primary-contrast}}"}md-nav-bar.md-THEME_NAME-theme .md-nav-bar{background-color:transparent;border-color:"{{foreground-4}}"}md-nav-bar.md-THEME_NAME-theme .md-button._md-nav-button.md-unselected{color:"{{foreground-2}}"}md-nav-bar.md-THEME_NAME-theme .md-button._md-nav-button[disabled]{color:"{{foreground-3}}"}md-nav-bar.md-THEME_NAME-theme md-nav-ink-bar{background:"{{accent-color}}";color:"{{accent-color}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar{background-color:"{{accent-color}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button{color:"{{accent-A100}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button.md-active,md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{accent-contrast}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{accent-contrast-0.1}}"}md-nav-bar.md-THEME_NAME-theme.md-accent>.md-nav-bar md-nav-ink-bar{background:"{{primary-600-1}}";color:"{{primary-600-1}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar{background-color:"{{warn-color}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button{color:"{{warn-100}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button.md-active,md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{warn-contrast}}"}md-nav-bar.md-THEME_NAME-theme.md-warn>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{warn-contrast-0.1}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar{background-color:"{{primary-color}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button{color:"{{primary-100}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button.md-active,md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{primary-contrast}}"}md-nav-bar.md-THEME_NAME-theme.md-primary>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{primary-contrast-0.1}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar{background-color:"{{primary-color}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button{color:"{{primary-100}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-active,md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{primary-contrast}}"}md-toolbar>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{primary-contrast-0.1}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar{background-color:"{{accent-color}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button{color:"{{accent-A100}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-active,md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{accent-contrast}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{accent-contrast-0.1}}"}md-toolbar.md-accent>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar md-nav-ink-bar{background:"{{primary-600-1}}";color:"{{primary-600-1}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar{background-color:"{{warn-color}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button{color:"{{warn-100}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-active,md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{color:"{{warn-contrast}}"}md-toolbar.md-warn>md-nav-bar.md-THEME_NAME-theme>.md-nav-bar .md-button._md-nav-button.md-focused{background:"{{warn-contrast-0.1}}"}._md-panel-backdrop.md-THEME_NAME-theme{background-color:"{{background-900-1.0}}"}md-progress-circular.md-THEME_NAME-theme path{stroke:"{{primary-color}}"}md-progress-circular.md-THEME_NAME-theme.md-warn path{stroke:"{{warn-color}}"}md-progress-circular.md-THEME_NAME-theme.md-accent path{stroke:"{{accent-color}}"}md-progress-linear.md-THEME_NAME-theme .md-container{background-color:"{{primary-100}}"}md-progress-linear.md-THEME_NAME-theme .md-bar{background-color:"{{primary-color}}"}md-progress-linear.md-THEME_NAME-theme.md-warn .md-container{background-color:"{{warn-100}}"}md-progress-linear.md-THEME_NAME-theme.md-warn .md-bar{background-color:"{{warn-color}}"}md-progress-linear.md-THEME_NAME-theme.md-accent .md-container{background-color:"{{accent-100}}"}md-progress-linear.md-THEME_NAME-theme.md-accent .md-bar{background-color:"{{accent-color}}"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-primary .md-bar1{background-color:"{{primary-100}}"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-primary .md-dashed:before{background:radial-gradient("{{primary-100}}" 0,"{{primary-100}}" 16%,transparent 42%)}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-bar1{background-color:"{{warn-100}}"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-warn .md-dashed:before{background:radial-gradient("{{warn-100}}" 0,"{{warn-100}}" 16%,transparent 42%)}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-bar1{background-color:"{{accent-100}}"}md-progress-linear.md-THEME_NAME-theme[md-mode=buffer].md-accent .md-dashed:before{background:radial-gradient("{{accent-100}}" 0,"{{accent-100}}" 16%,transparent 42%)}md-radio-button.md-THEME_NAME-theme .md-off{border-color:"{{foreground-2}}"}md-radio-button.md-THEME_NAME-theme .md-on{background-color:"{{accent-color-0.87}}"}md-radio-button.md-THEME_NAME-theme.md-checked .md-off{border-color:"{{accent-color-0.87}}"}md-radio-button.md-THEME_NAME-theme.md-checked .md-ink-ripple{color:"{{accent-color-0.87}}"}md-radio-button.md-THEME_NAME-theme .md-container .md-ripple{color:"{{accent-A700}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-on{background-color:"{{primary-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-off{border-color:"{{primary-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-checked .md-ink-ripple{color:"{{primary-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-primary .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-primary .md-container .md-ripple{color:"{{primary-600}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-on,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-on,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-on{background-color:"{{warn-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-off,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-off{border-color:"{{warn-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn.md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-checked .md-ink-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-checked .md-ink-ripple{color:"{{warn-color-0.87}}"}md-radio-button.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple,md-radio-button.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]).md-warn .md-container .md-ripple,md-radio-group.md-THEME_NAME-theme:not([disabled]) .md-warn .md-container .md-ripple{color:"{{warn-600}}"}md-radio-button.md-THEME_NAME-theme[disabled],md-radio-group.md-THEME_NAME-theme[disabled]{color:"{{foreground-3}}"}md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-off,md-radio-button.md-THEME_NAME-theme[disabled] .md-container .md-on,md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-off,md-radio-group.md-THEME_NAME-theme[disabled] .md-container .md-on{border-color:"{{foreground-3}}"}md-radio-group.md-THEME_NAME-theme .md-checked .md-ink-ripple{color:"{{accent-color-0.26}}"}md-radio-group.md-THEME_NAME-theme .md-checked:not([disabled]).md-primary .md-ink-ripple,md-radio-group.md-THEME_NAME-theme.md-primary .md-checked:not([disabled]) .md-ink-ripple{color:"{{primary-color-0.26}}"}md-radio-group.md-THEME_NAME-theme.md-focused.ng-empty>md-radio-button:first-child .md-container:before{background-color:"{{foreground-3-0.26}}"}md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked .md-container:before{background-color:"{{accent-color-0.26}}"}md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-primary .md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-primary .md-checked .md-container:before{background-color:"{{primary-color-0.26}}"}md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty) .md-checked.md-warn .md-container:before,md-radio-group.md-THEME_NAME-theme.md-focused:not(:empty).md-warn .md-checked .md-container:before{background-color:"{{warn-color-0.26}}"}md-input-container md-select.md-THEME_NAME-theme .md-select-value span:first-child:after{color:"{{warn-A700}}"}md-input-container:not(.md-input-focused):not(.md-input-invalid) md-select.md-THEME_NAME-theme .md-select-value span:first-child:after{color:"{{foreground-3}}"}md-input-container.md-input-focused:not(.md-input-has-value) md-select.md-THEME_NAME-theme .md-select-value,md-input-container.md-input-focused:not(.md-input-has-value) md-select.md-THEME_NAME-theme .md-select-value.md-select-placeholder{color:"{{primary-color}}"}md-input-container.md-input-invalid md-select.md-THEME_NAME-theme .md-select-value{border-bottom-color:"{{warn-A700}}"!important;color:"{{warn-A700}}"!important}md-input-container.md-input-invalid md-select.md-THEME_NAME-theme.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-input-container:not(.md-input-invalid).md-input-focused.md-accent .md-select-value{border-color:"{{accent-color}}"}md-input-container:not(.md-input-invalid).md-input-focused.md-accent .md-select-value span{color:"{{accent-color}}"}md-input-container:not(.md-input-invalid).md-input-focused.md-warn .md-select-value{border-color:"{{warn-A700}}"}md-input-container:not(.md-input-invalid).md-input-focused.md-warn .md-select-value span{color:"{{warn-A700}}"}md-select.md-THEME_NAME-theme[disabled] .md-select-value{background-image:linear-gradient(90deg,"{{foreground-3}}" 0,"{{foreground-3}}" 33%,transparent 0);background-image:-ms-linear-gradient(left,transparent 0,"{{foreground-3}}" 100%);border-bottom-color:transparent}md-select.md-THEME_NAME-theme .md-select-value{border-bottom-color:"{{foreground-4}}"}md-select.md-THEME_NAME-theme .md-select-value.md-select-placeholder{color:"{{foreground-3}}"}md-select.md-THEME_NAME-theme .md-select-value span:first-child:after{color:"{{warn-A700}}"}md-select.md-THEME_NAME-theme.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-select.md-THEME_NAME-theme.ng-invalid.ng-touched .md-select-value{border-bottom-color:"{{warn-A700}}"!important;color:"{{warn-A700}}"!important}md-select.md-THEME_NAME-theme.ng-invalid.ng-touched.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-value{border-bottom-color:"{{primary-color}}";color:"{{ foreground-1 }}"}md-select.md-THEME_NAME-theme:not([disabled]):focus .md-select-value.md-select-placeholder{color:"{{ foreground-1 }}"}md-select.md-THEME_NAME-theme:not([disabled]):focus.md-no-underline .md-select-value{border-bottom-color:transparent!important}md-select.md-THEME_NAME-theme:not([disabled]):focus.md-accent .md-select-value{border-bottom-color:"{{accent-color}}"}md-select.md-THEME_NAME-theme:not([disabled]):focus.md-warn .md-select-value{border-bottom-color:"{{warn-color}}"}md-select.md-THEME_NAME-theme[disabled] .md-select-icon,md-select.md-THEME_NAME-theme[disabled] .md-select-value,md-select.md-THEME_NAME-theme[disabled] .md-select-value.md-select-placeholder{color:"{{foreground-3}}"}md-select.md-THEME_NAME-theme .md-select-icon{color:"{{foreground-2}}"}md-select-menu.md-THEME_NAME-theme md-content{background-color:"{{background-hue-1}}"}md-select-menu.md-THEME_NAME-theme md-content md-optgroup{color:"{{foreground-2}}"}md-select-menu.md-THEME_NAME-theme md-content md-option{color:"{{foreground-1}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[disabled] .md-text{color:"{{foreground-3}}"}md-select-menu.md-THEME_NAME-theme md-content md-option:not([disabled]):hover{background-color:"{{background-500-0.10}}"}md-select-menu.md-THEME_NAME-theme md-content md-option:not([disabled]).md-focused,md-select-menu.md-THEME_NAME-theme md-content md-option:not([disabled]):focus{background-color:"{{background-500-0.18}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected]{color:"{{primary-500}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-focused,md-select-menu.md-THEME_NAME-theme md-content md-option[selected]:focus{color:"{{primary-600}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-accent{color:"{{accent-color}}"}md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-accent.md-focused,md-select-menu.md-THEME_NAME-theme md-content md-option[selected].md-accent:focus{color:"{{accent-A700}}"}.md-checkbox-enabled.md-THEME_NAME-theme .md-ripple{color:"{{primary-600}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-ripple{color:"{{background-600}}"}.md-checkbox-enabled.md-THEME_NAME-theme .md-ink-ripple{color:"{{foreground-2}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-ink-ripple{color:"{{primary-color-0.87}}"}.md-checkbox-enabled.md-THEME_NAME-theme:not(.md-checked) .md-icon{border-color:"{{foreground-2}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-icon{background-color:"{{primary-color-0.87}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected].md-focused .md-container:before{background-color:"{{primary-color-0.26}}"}.md-checkbox-enabled.md-THEME_NAME-theme[selected] .md-icon:after{border-color:"{{primary-contrast-0.87}}"}.md-checkbox-enabled.md-THEME_NAME-theme .md-indeterminate[disabled] .md-container{color:"{{foreground-3}}"}.md-checkbox-enabled.md-THEME_NAME-theme md-option .md-text{color:"{{foreground-1}}"}md-sidenav.md-THEME_NAME-theme,md-sidenav.md-THEME_NAME-theme md-content{background-color:"{{background-hue-1}}"}md-slider.md-THEME_NAME-theme .md-track{background-color:"{{foreground-3}}"}md-slider.md-THEME_NAME-theme .md-track-ticks{color:"{{background-contrast}}"}md-slider.md-THEME_NAME-theme .md-focus-ring{background-color:"{{accent-A200-0.2}}"}md-slider.md-THEME_NAME-theme .md-disabled-thumb{background-color:"{{background-color}}";border-color:"{{background-color}}"}md-slider.md-THEME_NAME-theme.md-min .md-thumb:after{background-color:"{{background-color}}";border-color:"{{foreground-3}}"}md-slider.md-THEME_NAME-theme.md-min .md-focus-ring{background-color:"{{foreground-3-0.38}}"}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-thumb:after{background-color:"{{background-contrast}}";border-color:transparent}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-sign{background-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme.md-min[md-discrete] .md-sign:after{border-top-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme.md-min[md-discrete][md-vertical] .md-sign:after{border-left-color:"{{background-400}}";border-top-color:transparent}md-slider.md-THEME_NAME-theme .md-track.md-track-fill{background-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme .md-thumb:after{background-color:"{{accent-color}}";border-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme .md-sign{background-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme .md-sign:after{border-top-color:"{{accent-color}}"}md-slider.md-THEME_NAME-theme[md-vertical] .md-sign:after{border-left-color:"{{accent-color}}";border-top-color:transparent}md-slider.md-THEME_NAME-theme .md-thumb-text{color:"{{accent-contrast}}"}md-slider.md-THEME_NAME-theme.md-warn .md-focus-ring{background-color:"{{warn-200-0.38}}"}md-slider.md-THEME_NAME-theme.md-warn .md-track.md-track-fill{background-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn .md-thumb:after{background-color:"{{warn-color}}";border-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn .md-sign{background-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn .md-sign:after{border-top-color:"{{warn-color}}"}md-slider.md-THEME_NAME-theme.md-warn[md-vertical] .md-sign:after{border-left-color:"{{warn-color}}";border-top-color:transparent}md-slider.md-THEME_NAME-theme.md-warn .md-thumb-text{color:"{{warn-contrast}}"}md-slider.md-THEME_NAME-theme.md-primary .md-focus-ring{background-color:"{{primary-200-0.38}}"}md-slider.md-THEME_NAME-theme.md-primary .md-track.md-track-fill{background-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary .md-thumb:after{background-color:"{{primary-color}}";border-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary .md-sign{background-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary .md-sign:after{border-top-color:"{{primary-color}}"}md-slider.md-THEME_NAME-theme.md-primary[md-vertical] .md-sign:after{border-left-color:"{{primary-color}}";border-top-color:transparent}md-slider.md-THEME_NAME-theme.md-primary .md-thumb-text{color:"{{primary-contrast}}"}md-slider.md-THEME_NAME-theme[disabled] .md-thumb:after{border-color:transparent}md-slider.md-THEME_NAME-theme[disabled]:not(.md-min) .md-thumb:after,md-slider.md-THEME_NAME-theme[disabled][md-discrete] .md-thumb:after{background-color:"{{foreground-3}}";border-color:transparent}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-sign{background-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-sign:after{border-top-color:"{{background-400}}"}md-slider.md-THEME_NAME-theme[disabled][readonly][md-vertical] .md-sign:after{border-left-color:"{{background-400}}";border-top-color:transparent}md-slider.md-THEME_NAME-theme[disabled][readonly] .md-disabled-thumb{background-color:transparent;border-color:transparent}md-slider-container[disabled]>:first-child:not(md-slider),md-slider-container[disabled]>:last-child:not(md-slider){color:"{{foreground-3}}"}.md-subheader.md-THEME_NAME-theme{background-color:"{{background-default}}";color:"{{ foreground-2-0.54 }}"}.md-subheader.md-THEME_NAME-theme.md-primary{color:"{{primary-color}}"}.md-subheader.md-THEME_NAME-theme.md-accent{color:"{{accent-color}}"}.md-subheader.md-THEME_NAME-theme.md-warn{color:"{{warn-color}}"}md-switch.md-THEME_NAME-theme .md-ink-ripple{color:"{{background-500}}"}md-switch.md-THEME_NAME-theme .md-thumb{background-color:"{{background-50}}"}md-switch.md-THEME_NAME-theme .md-bar{background-color:"{{background-500}}"}md-switch.md-THEME_NAME-theme.md-focused:not(.md-checked) .md-thumb:before,md-switch.md-THEME_NAME-theme.md-focused[disabled] .md-thumb:before{background-color:"{{foreground-4}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]) .md-ink-ripple{color:"{{accent-color}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]) .md-thumb{background-color:"{{accent-color}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]) .md-bar{background-color:"{{accent-color-0.5}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-focused .md-thumb:before{background-color:"{{accent-color-0.26}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-primary .md-ink-ripple{color:"{{primary-color}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-primary .md-thumb{background-color:"{{primary-color}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-primary .md-bar{background-color:"{{primary-color-0.5}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-primary.md-focused .md-thumb:before{background-color:"{{primary-color-0.26}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-warn .md-ink-ripple{color:"{{warn-color}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-warn .md-thumb{background-color:"{{warn-color}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-warn .md-bar{background-color:"{{warn-color-0.5}}"}md-switch.md-THEME_NAME-theme.md-checked:not([disabled]).md-warn.md-focused .md-thumb:before{background-color:"{{warn-color-0.26}}"}md-switch.md-THEME_NAME-theme[disabled] .md-thumb{background-color:"{{background-400}}"}md-switch.md-THEME_NAME-theme[disabled] .md-bar{background-color:"{{foreground-4}}"}md-tabs.md-THEME_NAME-theme md-tabs-wrapper{background-color:transparent;border-color:"{{foreground-4}}"}md-tabs.md-THEME_NAME-theme md-next-button md-icon,md-tabs.md-THEME_NAME-theme md-prev-button md-icon{color:"{{foreground-2}}"}md-tabs.md-THEME_NAME-theme md-ink-bar{background:"{{accent-color}}";color:"{{accent-color}}"}md-tabs.md-THEME_NAME-theme .md-tab{color:"{{foreground-2}}"}md-tabs.md-THEME_NAME-theme .md-tab[disabled],md-tabs.md-THEME_NAME-theme .md-tab[disabled] md-icon{color:"{{foreground-3}}"}md-tabs.md-THEME_NAME-theme .md-tab.md-active,md-tabs.md-THEME_NAME-theme .md-tab.md-active md-icon,md-tabs.md-THEME_NAME-theme .md-tab.md-focused,md-tabs.md-THEME_NAME-theme .md-tab.md-focused md-icon{color:"{{accent-color}}"}md-tabs.md-THEME_NAME-theme .md-tab.md-focused{background:"{{primary-color-0.1}}"}md-tabs.md-THEME_NAME-theme .md-tab .md-ripple-container{color:"{{accent-A100}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper{background-color:"{{accent-500}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper md-next-button md-icon,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper md-prev-button md-icon{color:"{{accent-500-contrast-0.7}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{accent-500-contrast-1}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{accent-500-contrast-0.1}}"}md-tabs.md-THEME_NAME-theme.md-accent>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{accent-500-contrast}}";color:"{{accent-500-contrast}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper{background-color:"{{primary-color}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper md-next-button md-icon,md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper md-prev-button md-icon{color:"{{primary-contrast}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{primary-contrast-0.7}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{primary-contrast}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{primary-contrast-0.1}}"}md-tabs.md-THEME_NAME-theme.md-primary>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{accent-color}}";color:"{{accent-color}}"}md-tabs.md-THEME_NAME-theme.md-primary.md-no-ink-bar-color>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{primary-contrast}}";color:"{{primary-contrast}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper{background-color:"{{warn-500}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper md-next-button md-icon,md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper md-prev-button md-icon{color:"{{warn-500-contrast}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{warn-500-contrast-0.7}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{warn-500-contrast-1}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{warn-500-contrast-0.1}}"}md-tabs.md-THEME_NAME-theme.md-warn>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{warn-500-contrast}}";color:"{{warn-500-contrast}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper{background-color:"{{primary-color}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper md-next-button md-icon,md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper md-prev-button md-icon{color:"{{primary-contrast}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{primary-contrast-0.7}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{primary-contrast}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{primary-contrast-0.1}}"}md-toolbar>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{accent-color}}";color:"{{accent-color}}"}md-toolbar>md-tabs.md-THEME_NAME-theme.md-no-ink-bar-color>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{primary-contrast}}";color:"{{primary-contrast}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper{background-color:"{{accent-500}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper md-next-button md-icon,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper md-prev-button md-icon{color:"{{accent-500-contrast-0.7}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{accent-500-contrast-1}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{accent-500-contrast-0.1}}"}md-toolbar.md-accent>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{accent-500-contrast}}";color:"{{accent-500-contrast}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper{background-color:"{{warn-500}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper md-next-button md-icon,md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper md-prev-button md-icon{color:"{{warn-500-contrast}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]),md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]) md-icon{color:"{{warn-500-contrast-0.7}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active,md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-active md-icon,md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused,md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused md-icon{color:"{{warn-500-contrast-1}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-tab-item:not([disabled]).md-focused{background:"{{warn-500-contrast-0.1}}"}md-toolbar.md-warn>md-tabs.md-THEME_NAME-theme>md-tabs-wrapper>md-tabs-canvas>md-pagination-wrapper>md-ink-bar{background:"{{warn-500-contrast}}";color:"{{warn-500-contrast}}"}md-toast.md-THEME_NAME-theme .md-toast-content{background-color:#323232;color:"{{background-50}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button{color:"{{background-50}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight{color:"{{accent-color}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-primary{color:"{{primary-color}}"}md-toast.md-THEME_NAME-theme .md-toast-content .md-button.md-highlight.md-warn{color:"{{warn-color}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar){background-color:"{{primary-color}}";color:"{{primary-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-icon{fill:"{{primary-contrast}}";color:"{{primary-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) .md-button[disabled] md-icon{fill:"{{primary-contrast-0.26}}";color:"{{primary-contrast-0.26}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float] .md-input{border-color:"{{primary-default-contrast-divider}}";color:"{{primary-default-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float] .md-input::-webkit-input-placeholder{color:"{{primary-default-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float] .md-input:-ms-input-placeholder{color:"{{primary-default-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float] .md-input::-ms-input-placeholder{color:"{{primary-default-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float] .md-input::placeholder{color:"{{primary-default-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float] .md-input:-moz-placeholder,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float] .md-input::-moz-placeholder{color:"{{primary-default-contrast-hint}}";opacity:1}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float].md-input-focused .md-input::-webkit-input-placeholder{color:"{{primary-default-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float].md-input-focused .md-input:-ms-input-placeholder{color:"{{primary-default-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float].md-input-focused .md-input::-ms-input-placeholder{color:"{{primary-default-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float].md-input-focused .md-input::placeholder{color:"{{primary-default-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float].md-input-focused .md-input:-moz-placeholder,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float].md-input-focused .md-input::-moz-placeholder{color:"{{primary-default-contrast-secondary}}";opacity:1}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused .md-input,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float]:not(.md-input-invalid).md-input-resized .md-input{border-color:"{{primary-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused.md-accent .md-input{border-color:"{{accent-color}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar) md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused.md-warn .md-input{border-color:"{{warn-A700}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent{background-color:"{{accent-500}}";color:"{{accent-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-ink-ripple{color:"{{accent-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-icon{fill:"{{accent-500-contrast}}";color:"{{accent-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent .md-button[disabled] md-icon{fill:"{{accent-500-contrast-0.26}}";color:"{{accent-500-contrast-0.26}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float] .md-input{border-color:"{{accent-500-contrast-divider}}";color:"{{accent-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float] .md-input::-webkit-input-placeholder{color:"{{accent-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float] .md-input:-ms-input-placeholder{color:"{{accent-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float] .md-input::-ms-input-placeholder{color:"{{accent-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float] .md-input::placeholder{color:"{{accent-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float] .md-input:-moz-placeholder,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float] .md-input::-moz-placeholder{color:"{{accent-500-contrast-hint}}";opacity:1}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float].md-input-focused .md-input::-webkit-input-placeholder{color:"{{accent-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float].md-input-focused .md-input:-ms-input-placeholder{color:"{{accent-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float].md-input-focused .md-input::-ms-input-placeholder{color:"{{accent-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float].md-input-focused .md-input::placeholder{color:"{{accent-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float].md-input-focused .md-input:-moz-placeholder,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float].md-input-focused .md-input::-moz-placeholder{color:"{{accent-500-contrast-secondary}}";opacity:1}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused .md-input,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float]:not(.md-input-invalid).md-input-resized .md-input{border-color:"{{primary-color}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused.md-accent .md-input{border-color:"{{accent-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-accent md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused.md-warn .md-input{border-color:"{{warn-A700}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn{background-color:"{{warn-500}}";color:"{{warn-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-icon{fill:"{{warn-500-contrast}}";color:"{{warn-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float] .md-input{border-color:"{{warn-500-contrast-divider}}";color:"{{warn-500-contrast}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float] .md-input::-webkit-input-placeholder{color:"{{warn-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float] .md-input:-ms-input-placeholder{color:"{{warn-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float] .md-input::-ms-input-placeholder{color:"{{warn-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float] .md-input::placeholder{color:"{{warn-500-contrast-hint}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float] .md-input:-moz-placeholder,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float] .md-input::-moz-placeholder{color:"{{warn-500-contrast-hint}}";opacity:1}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float].md-input-focused .md-input::-webkit-input-placeholder{color:"{{warn-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float].md-input-focused .md-input:-ms-input-placeholder{color:"{{warn-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float].md-input-focused .md-input::-ms-input-placeholder{color:"{{warn-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float].md-input-focused .md-input::placeholder{color:"{{warn-500-contrast-secondary}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float].md-input-focused .md-input:-moz-placeholder,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float].md-input-focused .md-input::-moz-placeholder{color:"{{warn-500-contrast-secondary}}";opacity:1}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused .md-input,md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float]:not(.md-input-invalid).md-input-resized .md-input{border-color:"{{primary-color}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused.md-accent .md-input{border-color:"{{accent-color}}"}md-toolbar.md-THEME_NAME-theme:not(.md-menu-toolbar).md-warn md-input-container[md-no-float]:not(.md-input-invalid).md-input-focused.md-warn .md-input{border-color:"{{warn-500-contrast}}"}.md-panel.md-tooltip.md-THEME_NAME-theme{background-color:"{{background-700}}";color:"{{background-700-contrast}}"}body.md-THEME_NAME-theme,html.md-THEME_NAME-theme{background-color:"{{background-color}}";color:"{{foreground-1}}"}')
}(window, window.angular), window.ngMaterial = {
    version: {
        full: "1.2.3-master-8add881"
    }
};