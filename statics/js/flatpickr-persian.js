/* flatpickr v4.3.2,, @license MIT */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.flatpickr = {})
}(this, function(e) {
    "use strict";
    var t = Object.assign || function(e) {
        for (var t, n = 1, a = arguments.length; n < a; n++)
            for (var i in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
    }
        , n = function(e) {
        return ("0" + e).slice(-2)
    }
        , a = function(e) {
        return !0 === e ? 1 : 0
    };
    function i(e, t, n) {
        var a;
        return void 0 === n && (n = !1),
            function() {
                var i = this
                    , o = arguments;
                null !== a && clearTimeout(a),
                    a = window.setTimeout(function() {
                        a = null,
                        n || e.apply(i, o)
                    }, t),
                n && !a && e.apply(i, o)
            }
    }
    var o = function(e) {
        return e instanceof Array ? e : [e]
    }
        , r = function() {}
        , c = function(e, t, n) {
        return n.months[t ? "shorthand" : "longhand"][e]
    }
        , l = {
        D: r,
        F: function(e, t, n) {
            e.setMonth(n.months.longhand.indexOf(t))
        },
        G: function(e, t) {
            e.setHours(parseFloat(t))
        },
        H: function(e, t) {
            e.setHours(parseFloat(t))
        },
        J: function(e, t) {
            e.setDate(parseFloat(t))
        },
        K: function(e, t, n) {
            e.setHours(e.getHours() % 12 + 12 * a(new RegExp(n.amPM[1],"i").test(t)))
        },
        M: function(e, t, n) {
            e.setMonth(n.months.shorthand.indexOf(t))
        },
        S: function(e, t) {
            e.setSeconds(parseFloat(t))
        },
        U: function(e, t) {
            return new Date(1e3 * parseFloat(t))
        },
        W: function(e, t) {
            var n = parseInt(t);
            return new Date(e.getFullYear(),0,2 + 7 * (n - 1),0,0,0,0)
        },
        Y: function(e, t) {
            e.setFullYear(parseFloat(t))
        },
        Z: function(e, t) {
            return new Date(t)
        },
        d: function(e, t) {
            e.setDate(parseFloat(t))
        },
        h: function(e, t) {
            e.setHours(parseFloat(t))
        },
        i: function(e, t) {
            e.setMinutes(parseFloat(t))
        },
        j: function(e, t) {
            e.setDate(parseFloat(t))
        },
        l: r,
        m: function(e, t) {
            e.setMonth(parseFloat(t) - 1)
        },
        n: function(e, t) {
            e.setMonth(parseFloat(t) - 1)
        },
        s: function(e, t) {
            e.setSeconds(parseFloat(t))
        },
        w: r,
        y: function(e, t) {
            e.setFullYear(2e3 + parseFloat(t))
        }
    }
        , d = {
        D: "(\\w+)",
        F: "(\\w+)",
        G: "(\\d\\d|\\d)",
        H: "(\\d\\d|\\d)",
        J: "(\\d\\d|\\d)\\w+",
        K: "",
        M: "(\\w+)",
        S: "(\\d\\d|\\d)",
        U: "(.+)",
        W: "(\\d\\d|\\d)",
        Y: "(\\d{4})",
        Z: "(.+)",
        d: "(\\d\\d|\\d)",
        h: "(\\d\\d|\\d)",
        i: "(\\d\\d|\\d)",
        j: "(\\d\\d|\\d)",
        l: "(\\w+)",
        m: "(\\d\\d|\\d)",
        n: "(\\d\\d|\\d)",
        s: "(\\d\\d|\\d)",
        w: "(\\d\\d|\\d)",
        y: "(\\d{2})"
    }
        , s = {
        Z: function(e) {
            return e.toISOString()
        },
        D: function(e, t, n) {
            return t.weekdays.shorthand[s.w(e, t, n)]
        },
        F: function(e, t, n) {
            return c(s.n(e, t, n) - 1, !1, t)
        },
        G: function(e, t, a) {
            return n(s.h(e, t, a))
        },
        H: function(e) {
            return n(e.getHours())
        },
        J: function(e, t) {
            return void 0 !== t.ordinal ? e.getDate() + t.ordinal(e.getDate()) : e.getDate()
        },
        K: function(e, t) {
            return t.amPM[a(e.getHours() > 11)]
        },
        M: function(e, t) {
            return c(e.getMonth(), !0, t)
        },
        S: function(e) {
            return n(e.getSeconds())
        },
        U: function(e) {
            return e.getTime() / 1e3
        },
        W: function(e, t, n) {
            return n.getWeek(e)
        },
        Y: function(e) {
            return e.getFullYear()
        },
        d: function(e) {
            return n(e.getDate())
        },
        h: function(e) {
            return e.getHours() % 12 ? e.getHours() % 12 : 12
        },
        i: function(e) {
            return n(e.getMinutes())
        },
        j: function(e) {
            return e.getDate()
        },
        l: function(e, t) {
            return t.weekdays.longhand[e.getDay()]
        },
        m: function(e) {
            return n(e.getMonth() + 1)
        },
        n: function(e) {
            return e.getMonth() + 1
        },
        s: function(e) {
            return e.getSeconds()
        },
        w: function(e) {
            return e.getDay()
        },
        y: function(e) {
            return String(e.getFullYear()).substring(2)
        }
    }
        , u = {
        weekdays: {
            shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            longhand: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        },
        months: {
            shorthand: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            longhand: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: -1,
        ordinal: function(e) {
            var t = e % 100;
            if (t > 3 && t < 21)
                return "th";
            switch (t % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th"
            }
        },
        rangeSeparator: " to ",
        weekAbbreviation: "Wk",
        scrollTitle: "Scroll to increment",
        toggleTitle: "Click to toggle",
        amPM: ["AM", "PM"]
    }
        , f = function(e) {
        var t = e.config
            , n = void 0 === t ? h : t
            , a = e.l10n
            , i = void 0 === a ? u : a;
        return function(e, t, a) {
            if (void 0 !== n.formatDate)
                return n.formatDate(e, t);
            var o = a || i;
            return t.split("").map(function(t, a, i) {
                return s[t] && "\\" !== i[a - 1] ? s[t](e, o, n) : "\\" !== t ? t : ""
            }).join("")
        }
    }
        , m = function(e) {
        var t = e.config
            , n = void 0 === t ? h : t
            , a = e.l10n
            , i = void 0 === a ? u : a;
        return function(e, t, a) {
            if (0 === e || e) {
                var o, r = e;
                if (e instanceof Date)
                    o = new Date(e.getTime());
                else if ("string" != typeof e && void 0 !== e.toFixed)
                    o = new Date(e);
                else if ("string" == typeof e) {
                    var c = t || (n || h).dateFormat
                        , s = String(e).trim();
                    if ("today" === s)
                        o = new Date,
                            a = !0;
                    else if (/Z$/.test(s) || /GMT$/.test(s))
                        o = new Date(e);
                    else if (n && n.parseDate)
                        o = n.parseDate(e, c);
                    else {
                        o = n && n.noCalendar ? new Date((new Date).setHours(0, 0, 0, 0)) : new Date((new Date).getFullYear(),0,1,0,0,0,0);
                        for (var u = void 0, f = [], m = 0, g = 0, p = ""; m < c.length; m++) {
                            var v = c[m]
                                , D = "\\" === v
                                , b = "\\" === c[m - 1] || D;
                            if (d[v] && !b) {
                                p += d[v];
                                var w = new RegExp(p).exec(e);
                                w && (u = !0) && f["Y" !== v ? "push" : "unshift"]({
                                    fn: l[v],
                                    val: w[++g]
                                })
                            } else
                                D || (p += ".");
                            f.forEach(function(e) {
                                var t = e.fn
                                    , n = e.val;
                                return o = t(o, n, i) || o
                            })
                        }
                        o = u ? o : void 0
                    }
                }
                if (o instanceof Date)
                    return !0 === a && o.setHours(0, 0, 0, 0),
                        o;
                n.errorHandler(new Error("Invalid date provided: " + r))
            }
        }
    };
    function g(e, t, n) {
        return void 0 === n && (n = !0),
            !1 !== n ? new Date(e.getTime()).setHours(0, 0, 0, 0) - new Date(t.getTime()).setHours(0, 0, 0, 0) : e.getTime() - t.getTime()
    }
    var p = {
        DAY: 864e5
    }
        , h = {
        _disable: [],
        _enable: [],
        allowInput: !1,
        altFormat: "F j, Y",
        altInput: !1,
        altInputClass: "form-control input",
        animate: "object" == typeof window && -1 === window.navigator.userAgent.indexOf("MSIE"),
        ariaDateFormat: "F j, Y",
        clickOpens: !0,
        closeOnSelect: !0,
        conjunction: ", ",
        dateFormat: "Y-m-d",
        defaultHour: 12,
        defaultMinute: 0,
        defaultSeconds: 0,
        disable: [],
        disableMobile: !1,
        enable: [],
        enableSeconds: !1,
        enableTime: !1,
        errorHandler: console.warn,
        getWeek: function(e) {
            var t = new Date(e.getTime());
            t.setHours(0, 0, 0, 0),
                t.setDate(t.getDate() + 3 - (t.getDay() + 6) % 7);
            var n = new Date(t.getFullYear(),0,4);
            return 1 + Math.round(((t.getTime() - n.getTime()) / 864e5 - 3 + (n.getDay() + 6) % 7) / 7)
        },
        hourIncrement: 1,
        ignoredFocusElements: [],
        inline: !1,
        locale: "default",
        minuteIncrement: 5,
        mode: "single",
        nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
        noCalendar: !1,
        onChange: [],
        onClose: [],
        onDayCreate: [],
        onDestroy: [],
        onKeyDown: [],
        onMonthChange: [],
        onOpen: [],
        onParseConfig: [],
        onReady: [],
        onValueUpdate: [],
        onYearChange: [],
        onPreCalendarPosition: [],
        plugins: [],
        position: "auto",
        positionElement: void 0,
        prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
        shorthandCurrentMonth: !1,
        static: !1,
        time_24hr: !1,
        weekNumbers: !1,
        wrap: !1
    };
    function v(e, t, n) {
        if (!0 === n)
            return e.classList.add(t);
        e.classList.remove(t)
    }
    function D(e, t, n) {
        var a = window.document.createElement(e);
        return t = t || "",
            n = n || "",
            a.className = t,
        void 0 !== n && (a.textContent = n),
            a
    }
    function b(e, t) {
        var n = D("div", "numInputWrapper")
            , a = D("input", "numInput " + e)
            , i = D("span", "arrowUp")
            , o = D("span", "arrowDown");
        if (a.type = "text",
            a.pattern = "\\d*",
        void 0 !== t)
            for (var r in t)
                a.setAttribute(r, t[r]);
        return n.appendChild(a),
            n.appendChild(i),
            n.appendChild(o),
            n
    }
    "function" != typeof Object.assign && (Object.assign = function(e) {
            for (var t = [], n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
            if (!e)
                throw TypeError("Cannot convert undefined or null to object");
            for (var a = function(t) {
                t && Object.keys(t).forEach(function(n) {
                    return e[n] = t[n]
                })
            }, i = 0, o = t; i < o.length; i++) {
                a(o[i])
            }
            return e
        }
    );
    var w, M = 300;
    function C(e, r) {
        var l = {
            config: t({}, w.defaultConfig),
            l10n: u
        };
        function s(e) {
            return e.bind(l)
        }
        function h(e) {
            l.config.noCalendar && 0 === l.selectedDates.length && (l.setDate(void 0 !== l.config.minDate ? new Date(l.config.minDate.getTime()) : (new Date).setHours(l.config.defaultHour, l.config.defaultMinute, l.config.defaultSeconds, 0), !1),
                C(),
                ne()),
                function(e) {
                    e.preventDefault();
                    var t = "keydown" === e.type
                        , i = e.target;
                    void 0 !== l.amPM && e.target === l.amPM && (l.amPM.textContent = l.l10n.amPM[a(l.amPM.textContent === l.l10n.amPM[0])]);
                    var o = parseFloat(i.getAttribute("data-min"))
                        , r = parseFloat(i.getAttribute("data-max"))
                        , c = parseFloat(i.getAttribute("data-step"))
                        , d = parseInt(i.value, 10)
                        , s = e.delta || (t ? 38 === e.which ? 1 : -1 : 0)
                        , u = d + c * s;
                    if (void 0 !== i.value && 2 === i.value.length) {
                        var f = i === l.hourElement
                            , m = i === l.minuteElement;
                        u < o ? (u = r + u + a(!f) + (a(f) && a(!l.amPM)),
                        m && P(void 0, -1, l.hourElement)) : u > r && (u = i === l.hourElement ? u - r - a(!l.amPM) : o,
                        m && P(void 0, 1, l.hourElement)),
                        l.amPM && f && (1 === c ? u + d === 23 : Math.abs(u - d) > c) && (l.amPM.textContent = l.l10n.amPM[a(l.amPM.textContent === l.l10n.amPM[0])]),
                            i.value = n(u)
                    }
                }(e),
            0 !== l.selectedDates.length && ("input" !== e.type ? (C(),
                ne()) : setTimeout(function() {
                C(),
                    ne()
            }, M))
        }
        function C() {
            if (void 0 !== l.hourElement && void 0 !== l.minuteElement) {
                var e, t, n = (parseInt(l.hourElement.value.slice(-2), 10) || 0) % 24, i = (parseInt(l.minuteElement.value, 10) || 0) % 60, o = void 0 !== l.secondElement ? (parseInt(l.secondElement.value, 10) || 0) % 60 : 0;
                void 0 !== l.amPM && (e = n,
                    t = l.amPM.textContent,
                    n = e % 12 + 12 * a(t === l.l10n.amPM[1]));
                var r = void 0 !== l.config.minTime || l.config.minDate && l.minDateHasTime && l.latestSelectedDateObj && 0 === g(l.latestSelectedDateObj, l.config.minDate, !0);
                if (void 0 !== l.config.maxTime || l.config.maxDate && l.maxDateHasTime && l.latestSelectedDateObj && 0 === g(l.latestSelectedDateObj, l.config.maxDate, !0)) {
                    var c = void 0 !== l.config.maxTime ? l.config.maxTime : l.config.maxDate;
                    (n = Math.min(n, c.getHours())) === c.getHours() && (i = Math.min(i, c.getMinutes())),
                    i === c.getMinutes() && (o = Math.min(o, c.getSeconds()))
                }
                if (r) {
                    var d = void 0 !== l.config.minTime ? l.config.minTime : l.config.minDate;
                    (n = Math.max(n, d.getHours())) === d.getHours() && (i = Math.max(i, d.getMinutes())),
                    i === d.getMinutes() && (o = Math.max(o, d.getSeconds()))
                }
                x(n, i, o)
            }
        }
        function y(e) {
            var t = e || l.latestSelectedDateObj;
            t && x(t.getHours(), t.getMinutes(), t.getSeconds())
        }
        function x(e, t, i) {
            void 0 !== l.latestSelectedDateObj && l.latestSelectedDateObj.setHours(e % 24, t, i || 0, 0),
            l.hourElement && l.minuteElement && !l.isMobile && (l.hourElement.value = n(l.config.time_24hr ? e : (12 + e) % 12 + 12 * a(e % 12 == 0)),
                l.minuteElement.value = n(t),
            void 0 !== l.amPM && (l.amPM.textContent = l.l10n.amPM[a(e >= 12)]),
            void 0 !== l.secondElement && (l.secondElement.value = n(i)))
        }
        function E(e) {
            var t = parseInt(e.target.value) + (e.delta || 0);
            4 !== t.toString().length && "Enter" !== e.key || (l.currentYearElement.blur(),
            /[^\d]/.test(t.toString()) || L(t))
        }
        function T(e, t, n, a) {
            return t instanceof Array ? t.forEach(function(t) {
                return T(e, t, n, a)
            }) : e instanceof Array ? e.forEach(function(e) {
                return T(e, t, n, a)
            }) : (e.addEventListener(t, n, a),
                void l._handlers.push({
                    element: e,
                    event: t,
                    handler: n
                }))
        }
        function k(e) {
            return function(t) {
                1 === t.which && e(t)
            }
        }
        function I() {
            Q("onChange")
        }
        function S(e) {
            var t = void 0 !== e ? l.parseDate(e) : l.latestSelectedDateObj || (l.config.minDate && l.config.minDate > l.now ? l.config.minDate : l.config.maxDate && l.config.maxDate < l.now ? l.config.maxDate : l.now);
            try {
                void 0 !== t && (l.currentYear = t.getFullYear(),
                    l.currentMonth = t.getMonth())
            } catch (e) {
                e.message = "Invalid date supplied: " + t,
                    l.config.errorHandler(e)
            }
            l.redraw()
        }
        function _(e) {
            ~e.target.className.indexOf("arrow") && P(e, e.target.classList.contains("arrowUp") ? 1 : -1)
        }
        function P(e, t, n) {
            var a = e && e.target
                , i = n || a && a.parentNode && a.parentNode.firstChild
                , o = X("increment");
            o.delta = t,
            i && i.dispatchEvent(o)
        }
        function Y(e, t, n, a) {
            var i, o = R(t, !0), r = D("span", "flatpickr-day " + e, t.getDate().toString());
            return r.dateObj = t,
                r.$i = a,
                r.setAttribute("aria-label", l.formatDate(t, l.config.ariaDateFormat)),
            0 === g(t, l.now) && (l.todayDateElem = r,
                r.classList.add("today")),
                o ? (r.tabIndex = -1,
                ee(t) && (r.classList.add("selected"),
                    l.selectedDateElem = r,
                "range" === l.config.mode && (v(r, "startRange", l.selectedDates[0] && 0 === g(t, l.selectedDates[0])),
                    v(r, "endRange", l.selectedDates[1] && 0 === g(t, l.selectedDates[1]))))) : (r.classList.add("disabled"),
                    l.selectedDates[0] && l.minRangeDate && t > l.minRangeDate && t < l.selectedDates[0] ? l.minRangeDate = t : l.selectedDates[0] && l.maxRangeDate && t < l.maxRangeDate && t > l.selectedDates[0] && (l.maxRangeDate = t)),
            "range" === l.config.mode && (i = t,
            !("range" !== l.config.mode || l.selectedDates.length < 2) && g(i, l.selectedDates[0]) >= 0 && g(i, l.selectedDates[1]) <= 0 && !ee(t) && r.classList.add("inRange"),
            1 === l.selectedDates.length && void 0 !== l.minRangeDate && void 0 !== l.maxRangeDate && (t < l.minRangeDate || t > l.maxRangeDate) && r.classList.add("notAllowed")),
            l.weekNumbers && "prevMonthDay" !== e && n % 7 == 1 && l.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + l.config.getWeek(t) + "</span>"),
                Q("onDayCreate", r),
                r
        }
        function A(e, t) {
            var n = e + t || 0
                , a = void 0 !== e ? l.days.childNodes[n] : l.selectedDateElem || l.todayDateElem || l.days.childNodes[0];
            void 0 === a && 0 !== t && (t > 0 ? (l.changeMonth(1, !0, !0),
                n %= 42) : t < 0 && (l.changeMonth(-1, !0, !0),
                n += 42)),
                (a = a || l.days.childNodes[n]).focus(),
            "range" === l.config.mode && J(a)
        }
        function O() {
            if (void 0 !== l.daysContainer) {
                var e = (new Date(l.currentYear,l.currentMonth,1).getDay() - l.l10n.firstDayOfWeek + 7) % 7
                    , t = "range" === l.config.mode
                    , n = l.utils.getDaysInMonth((l.currentMonth - 1 + 12) % 12)
                    , a = l.utils.getDaysInMonth()
                    , i = window.document.createDocumentFragment()
                    , o = n + 1 - e
                    , r = 0;
                for (l.weekNumbers && l.weekNumbers.firstChild && (l.weekNumbers.textContent = ""),
                     t && (l.minRangeDate = new Date(l.currentYear,l.currentMonth - 1,o),
                         l.maxRangeDate = new Date(l.currentYear,l.currentMonth + 1,(42 - e) % a)); o <= n; o++,
                         r++)
                    i.appendChild(Y("prevMonthDay", new Date(l.currentYear,l.currentMonth - 1,o), o, r));
                for (o = 1; o <= a; o++,
                    r++)
                    i.appendChild(Y("", new Date(l.currentYear,l.currentMonth,o), o, r));
                for (var c = a + 1; c <= 42 - e; c++,
                    r++)
                    i.appendChild(Y("nextMonthDay", new Date(l.currentYear,l.currentMonth + 1,c % a), c, r));
                t && 1 === l.selectedDates.length && i.childNodes[0] ? (l._hidePrevMonthArrow = l._hidePrevMonthArrow || !!l.minRangeDate && l.minRangeDate > i.childNodes[0].dateObj,
                    l._hideNextMonthArrow = l._hideNextMonthArrow || !!l.maxRangeDate && l.maxRangeDate < new Date(l.currentYear,l.currentMonth + 1,1)) : te();
                var d = D("div", "dayContainer");
                d.appendChild(i),
                    function(e) {
                        for (; e.firstChild; )
                            e.removeChild(e.firstChild)
                    }(l.daysContainer),
                    l.daysContainer.insertBefore(d, l.daysContainer.firstChild),
                    l.days = l.daysContainer.firstChild
            }
        }
        function N() {
            l.weekdayContainer || (l.weekdayContainer = D("div", "flatpickr-weekdays"));
            var e = l.l10n.firstDayOfWeek
                , t = l.l10n.weekdays.shorthand.slice();
            return e > 0 && e < t.length && (t = t.splice(e, t.length).concat(t.splice(0, e))),
                l.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + t.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ",
                l.weekdayContainer
        }
        function F(e, t, n) {
            void 0 === t && (t = !0),
            void 0 === n && (n = !1);
            var a = t ? e : e - l.currentMonth;
            a < 0 && l._hidePrevMonthArrow || a > 0 && l._hideNextMonthArrow || (l.currentMonth += a,
            (l.currentMonth < 0 || l.currentMonth > 11) && (l.currentYear += l.currentMonth > 11 ? 1 : -1,
                l.currentMonth = (l.currentMonth + 12) % 12,
                Q("onYearChange")),
                O(),
                Q("onMonthChange"),
                te(),
            n && document.activeElement && document.activeElement.$i && A(document.activeElement.$i, 0))
        }
        function j(e) {
            return !(!l.config.appendTo || !l.config.appendTo.contains(e)) || l.calendarContainer.contains(e)
        }
        function H(e) {
            if (l.isOpen && !l.config.inline) {
                var t = j(e.target)
                    , n = e.target === l.input || e.target === l.altInput || l.element.contains(e.target) || e.path && e.path.indexOf && (~e.path.indexOf(l.input) || ~e.path.indexOf(l.altInput))
                    , a = "blur" === e.type ? n && e.relatedTarget && !j(e.relatedTarget) : !n && !t
                    , i = !l.config.ignoredFocusElements.some(function(t) {
                    return t.contains(e.target)
                });
                a && i && (l.close(),
                "range" === l.config.mode && 1 === l.selectedDates.length && (l.clear(!1),
                    l.redraw()))
            }
        }
        function L(e) {
            if (!(!e || l.currentYearElement.getAttribute("data-min") && e < parseInt(l.currentYearElement.getAttribute("data-min")) || l.currentYearElement.getAttribute("data-max") && e > parseInt(l.currentYearElement.getAttribute("data-max")))) {
                var t = e
                    , n = l.currentYear !== t;
                l.currentYear = t || l.currentYear,
                    l.config.maxDate && l.currentYear === l.config.maxDate.getFullYear() ? l.currentMonth = Math.min(l.config.maxDate.getMonth(), l.currentMonth) : l.config.minDate && l.currentYear === l.config.minDate.getFullYear() && (l.currentMonth = Math.max(l.config.minDate.getMonth(), l.currentMonth)),
                n && (l.redraw(),
                    Q("onYearChange"))
            }
        }
        function R(e, t) {
            void 0 === t && (t = !0);
            var n = l.parseDate(e, void 0, t);
            if (l.config.minDate && n && g(n, l.config.minDate, void 0 !== t ? t : !l.minDateHasTime) < 0 || l.config.maxDate && n && g(n, l.config.maxDate, void 0 !== t ? t : !l.maxDateHasTime) > 0)
                return !1;
            if (!l.config.enable.length && !l.config.disable.length)
                return !0;
            if (void 0 === n)
                return !1;
            for (var a = l.config.enable.length > 0, i = a ? l.config.enable : l.config.disable, o = 0, r = void 0; o < i.length; o++) {
                if ("function" == typeof (r = i[o]) && r(n))
                    return a;
                if (r instanceof Date && void 0 !== n && r.getTime() === n.getTime())
                    return a;
                if ("string" == typeof r && void 0 !== n) {
                    var c = l.parseDate(r, void 0, !0);
                    return c && c.getTime() === n.getTime() ? a : !a
                }
                if ("object" == typeof r && void 0 !== n && r.from && r.to && n.getTime() >= r.from.getTime() && n.getTime() <= r.to.getTime())
                    return a
            }
            return !a
        }
        function W(e) {
            var t = e.target === l._input
                , n = j(e.target)
                , a = l.config.allowInput
                , i = l.isOpen && (!a || !t)
                , o = l.config.inline && t && !a;
            if (13 === e.keyCode && t) {
                if (a)
                    return l.setDate(l._input.value, !0, e.target === l.altInput ? l.config.altFormat : l.config.dateFormat),
                        e.target.blur();
                l.open()
            } else if (n || i || o) {
                var r = !!l.timeContainer && l.timeContainer.contains(e.target);
                switch (e.keyCode) {
                    case 13:
                        r ? ne() : z(e);
                        break;
                    case 27:
                        e.preventDefault(),
                            l.close();
                        break;
                    case 8:
                    case 46:
                        t && !l.config.allowInput && (e.preventDefault(),
                            l.clear());
                        break;
                    case 37:
                    case 39:
                        if (r)
                            l.hourElement && l.hourElement.focus();
                        else if (e.preventDefault(),
                            l.daysContainer) {
                            var c = 39 === e.keyCode ? 1 : -1;
                            e.ctrlKey ? F(c, !0, !0) : A(e.target.$i, c)
                        }
                        break;
                    case 38:
                    case 40:
                        e.preventDefault();
                        var d = 40 === e.keyCode ? 1 : -1;
                        l.daysContainer && void 0 !== e.target.$i ? e.ctrlKey ? (L(l.currentYear - d),
                            A(e.target.$i, 0)) : r || A(e.target.$i, 7 * d) : l.config.enableTime && (!r && l.hourElement && l.hourElement.focus(),
                            h(e),
                            l._debouncedChange());
                        break;
                    case 9:
                        e.target === l.hourElement ? (e.preventDefault(),
                            l.minuteElement.select()) : e.target === l.minuteElement && (l.secondElement || l.amPM) ? (e.preventDefault(),
                            void 0 !== l.secondElement ? l.secondElement.focus() : void 0 !== l.amPM && l.amPM.focus()) : e.target === l.secondElement && l.amPM && (e.preventDefault(),
                            l.amPM.focus())
                }
                switch (e.key) {
                    case l.l10n.amPM[0].charAt(0):
                    case l.l10n.amPM[0].charAt(0).toLowerCase():
                        void 0 !== l.amPM && e.target === l.amPM && (l.amPM.textContent = l.l10n.amPM[0],
                            C(),
                            ne());
                        break;
                    case l.l10n.amPM[1].charAt(0):
                    case l.l10n.amPM[1].charAt(0).toLowerCase():
                        void 0 !== l.amPM && e.target === l.amPM && (l.amPM.textContent = l.l10n.amPM[1],
                            C(),
                            ne())
                }
                Q("onKeyDown", e)
            }
        }
        function J(e) {
            if (1 === l.selectedDates.length && e.classList.contains("flatpickr-day") && !e.classList.contains("disabled") && void 0 !== l.minRangeDate && void 0 !== l.maxRangeDate) {
                for (var t = e.dateObj, n = l.parseDate(l.selectedDates[0], void 0, !0), a = Math.min(t.getTime(), l.selectedDates[0].getTime()), i = Math.max(t.getTime(), l.selectedDates[0].getTime()), o = !1, r = a; r < i; r += p.DAY)
                    if (!R(new Date(r))) {
                        o = !0;
                        break
                    }
                for (var c = function(r, c) {
                    var d = c.getTime()
                        , s = d < l.minRangeDate.getTime() || d > l.maxRangeDate.getTime()
                        , u = l.days.childNodes[r];
                    if (s)
                        return u.classList.add("notAllowed"),
                            ["inRange", "startRange", "endRange"].forEach(function(e) {
                                u.classList.remove(e)
                            }),
                            "continue";
                    if (o && !s)
                        return "continue";
                    ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(e) {
                        u.classList.remove(e)
                    });
                    var f = Math.max(l.minRangeDate.getTime(), a)
                        , m = Math.min(l.maxRangeDate.getTime(), i);
                    e.classList.add(t < l.selectedDates[0] ? "startRange" : "endRange"),
                        n < t && d === n.getTime() ? u.classList.add("startRange") : n > t && d === n.getTime() && u.classList.add("endRange"),
                    d >= f && d <= m && u.classList.add("inRange")
                }, d = 0, s = l.days.childNodes[d].dateObj; d < 42; d++,
                         s = l.days.childNodes[d] && l.days.childNodes[d].dateObj)
                    c(d, s)
            }
        }
        function K() {
            !l.isOpen || l.config.static || l.config.inline || U()
        }
        function B(e) {
            return function(t) {
                var n = l.config["_" + e + "Date"] = l.parseDate(t, l.config.dateFormat)
                    , a = l.config["_" + ("min" === e ? "max" : "min") + "Date"];
                void 0 !== n && (l["min" === e ? "minDateHasTime" : "maxDateHasTime"] = n.getHours() > 0 || n.getMinutes() > 0 || n.getSeconds() > 0),
                l.selectedDates && (l.selectedDates = l.selectedDates.filter(function(e) {
                    return R(e)
                }),
                l.selectedDates.length || "min" !== e || y(n),
                    ne()),
                l.daysContainer && (q(),
                    void 0 !== n ? l.currentYearElement[e] = n.getFullYear().toString() : l.currentYearElement.removeAttribute(e),
                    l.currentYearElement.disabled = !!a && void 0 !== n && a.getFullYear() === n.getFullYear())
            }
        }
        function $() {
            "object" != typeof l.config.locale && void 0 === w.l10ns[l.config.locale] && l.config.errorHandler(new Error("flatpickr: invalid locale " + l.config.locale)),
                l.l10n = t({}, w.l10ns.default, "object" == typeof l.config.locale ? l.config.locale : "default" !== l.config.locale ? w.l10ns[l.config.locale] : void 0),
                d.K = "(" + l.l10n.amPM[0] + "|" + l.l10n.amPM[1] + "|" + l.l10n.amPM[0].toLowerCase() + "|" + l.l10n.amPM[1].toLowerCase() + ")",
                l.formatDate = f(l)
        }
        function U(e) {
            if (void 0 !== l.calendarContainer) {
                Q("onPreCalendarPosition");
                var t = e || l._positionElement
                    , n = Array.prototype.reduce.call(l.calendarContainer.children, function(e, t) {
                    return e + t.offsetHeight
                }, 0)
                    , a = l.calendarContainer.offsetWidth
                    , i = l.config.position
                    , o = t.getBoundingClientRect()
                    , r = window.innerHeight - o.bottom
                    , c = "above" === i || "below" !== i && r < n && o.top > n
                    , d = window.pageYOffset + o.top + (c ? -n - 2 : t.offsetHeight + 2);
                if (v(l.calendarContainer, "arrowTop", !c),
                    v(l.calendarContainer, "arrowBottom", c),
                    !l.config.inline) {
                    var s = window.pageXOffset + o.left
                        , u = window.document.body.offsetWidth - o.right
                        , f = s + a > window.document.body.offsetWidth;
                    v(l.calendarContainer, "rightMost", f),
                    l.config.static || (l.calendarContainer.style.top = d + "px",
                        f ? (l.calendarContainer.style.left = "auto",
                            l.calendarContainer.style.right = u + "px") : (l.calendarContainer.style.left = s + "px",
                            l.calendarContainer.style.right = "auto"))
                }
            }
        }
        function q() {
            l.config.noCalendar || l.isMobile || (N(),
                te(),
                O())
        }
        function z(e) {
            e.preventDefault(),
                e.stopPropagation();
            var t = function e(t, n) {
                return n(t) ? t : t.parentNode ? e(t.parentNode, n) : void 0
            }(e.target, function(e) {
                return e.classList && e.classList.contains("flatpickr-day") && !e.classList.contains("disabled") && !e.classList.contains("notAllowed")
            });
            if (void 0 !== t) {
                var n = t
                    , a = l.latestSelectedDateObj = new Date(n.dateObj.getTime())
                    , i = a.getMonth() !== l.currentMonth && "range" !== l.config.mode;
                if (l.selectedDateElem = n,
                "single" === l.config.mode)
                    l.selectedDates = [a];
                else if ("multiple" === l.config.mode) {
                    var o = ee(a);
                    o ? l.selectedDates.splice(parseInt(o), 1) : l.selectedDates.push(a)
                } else
                    "range" === l.config.mode && (2 === l.selectedDates.length && l.clear(),
                        l.selectedDates.push(a),
                    0 !== g(a, l.selectedDates[0], !0) && l.selectedDates.sort(function(e, t) {
                        return e.getTime() - t.getTime()
                    }));
                if (C(),
                    i) {
                    var r = l.currentYear !== a.getFullYear();
                    l.currentYear = a.getFullYear(),
                        l.currentMonth = a.getMonth(),
                    r && Q("onYearChange"),
                        Q("onMonthChange")
                }
                if (O(),
                l.config.minDate && l.minDateHasTime && l.config.enableTime && 0 === g(a, l.config.minDate) && y(l.config.minDate),
                    ne(),
                l.config.enableTime && setTimeout(function() {
                    return l.showTimeInput = !0
                }, 50),
                "range" === l.config.mode && (1 === l.selectedDates.length ? (J(n),
                    l._hidePrevMonthArrow = l._hidePrevMonthArrow || void 0 !== l.minRangeDate && l.minRangeDate > l.days.childNodes[0].dateObj,
                    l._hideNextMonthArrow = l._hideNextMonthArrow || void 0 !== l.maxRangeDate && l.maxRangeDate < new Date(l.currentYear,l.currentMonth + 1,1)) : te()),
                    i ? l.selectedDateElem && l.selectedDateElem.focus() : A(n.$i, 0),
                void 0 !== l.hourElement && setTimeout(function() {
                    return void 0 !== l.hourElement && l.hourElement.select()
                }, 451),
                    l.config.closeOnSelect) {
                    var c = "single" === l.config.mode && !l.config.enableTime
                        , d = "range" === l.config.mode && 2 === l.selectedDates.length && !l.config.enableTime;
                    (c || d) && (l._input.focus(),
                        -1 !== window.navigator.userAgent.indexOf("MSIE") || void 0 !== navigator.msMaxTouchPoints ? setTimeout(l.close, 0) : l.close())
                }
                I()
            }
        }
        l.parseDate = m({
            config: l.config,
            l10n: l.l10n
        }),
            l._handlers = [],
            l._bind = T,
            l._setHoursFromDate = y,
            l.changeMonth = F,
            l.changeYear = L,
            l.clear = function(e) {
                void 0 === e && (e = !0);
                l.input.value = "",
                l.altInput && (l.altInput.value = "");
                l.mobileInput && (l.mobileInput.value = "");
                l.selectedDates = [],
                    l.latestSelectedDateObj = void 0,
                    l.showTimeInput = !1,
                l.config.enableTime && (void 0 !== l.config.minDate ? y(l.config.minDate) : x(l.config.defaultHour, l.config.defaultMinute, l.config.defaultSeconds));
                l.redraw(),
                e && Q("onChange")
            }
            ,
            l.close = function() {
                l.isOpen = !1,
                l.isMobile || (l.calendarContainer.classList.remove("open"),
                    l._input.classList.remove("active"));
                Q("onClose")
            }
            ,
            l._createElement = D,
            l.destroy = function() {
                void 0 !== l.config && Q("onDestroy");
                for (var e = l._handlers.length; e--; ) {
                    var t = l._handlers[e];
                    t.element.removeEventListener(t.event, t.handler)
                }
                l._handlers = [],
                    l.mobileInput ? (l.mobileInput.parentNode && l.mobileInput.parentNode.removeChild(l.mobileInput),
                        l.mobileInput = void 0) : l.calendarContainer && l.calendarContainer.parentNode && l.calendarContainer.parentNode.removeChild(l.calendarContainer);
                l.altInput && (l.input.type = "text",
                l.altInput.parentNode && l.altInput.parentNode.removeChild(l.altInput),
                    delete l.altInput);
                l.input && (l.input.type = l.input._type,
                    l.input.classList.remove("flatpickr-input"),
                    l.input.removeAttribute("readonly"),
                    l.input.value = "");
                ["_showTimeInput", "latestSelectedDateObj", "_hideNextMonthArrow", "_hidePrevMonthArrow", "__hideNextMonthArrow", "__hidePrevMonthArrow", "isMobile", "isOpen", "selectedDateElem", "minDateHasTime", "maxDateHasTime", "days", "daysContainer", "_input", "_positionElement", "innerContainer", "rContainer", "monthNav", "todayDateElem", "calendarContainer", "weekdayContainer", "prevMonthNav", "nextMonthNav", "currentMonthElement", "currentYearElement", "navigationCurrentMonth", "selectedDateElem", "config"].forEach(function(e) {
                    try {
                        delete l[e]
                    } catch (e) {}
                })
            }
            ,
            l.isEnabled = R,
            l.jumpToDate = S,
            l.open = function(e, t) {
                void 0 === t && (t = l._input);
                if (l.isMobile)
                    return e && (e.preventDefault(),
                    e.target && e.target.blur()),
                        setTimeout(function() {
                            void 0 !== l.mobileInput && l.mobileInput.click()
                        }, 0),
                        void Q("onOpen");
                if (l._input.disabled || l.config.inline)
                    return;
                var n = l.isOpen;
                l.isOpen = !0,
                n || (l.calendarContainer.classList.add("open"),
                    l._input.classList.add("active"),
                    Q("onOpen"),
                    U(t))
            }
            ,
            l.redraw = q,
            l.set = function(e, t) {
                null !== e && "object" == typeof e ? Object.assign(l.config, e) : (l.config[e] = t,
                void 0 !== G[e] && G[e].forEach(function(e) {
                    return e()
                }));
                l.redraw(),
                    S()
            }
            ,
            l.setDate = function(e, t, n) {
                void 0 === t && (t = !1);
                void 0 === n && (n = l.config.dateFormat);
                if (0 !== e && !e)
                    return l.clear(t);
                V(e, n),
                    l.showTimeInput = l.selectedDates.length > 0,
                    l.latestSelectedDateObj = l.selectedDates[0],
                    l.redraw(),
                    S(),
                    y(),
                    ne(t),
                t && Q("onChange")
            }
            ,
            l.toggle = function() {
                if (l.isOpen)
                    return l.close();
                l.open()
            }
        ;
        var G = {
            locale: [$]
        };
        function V(e, t) {
            var n = [];
            if (e instanceof Array)
                n = e.map(function(e) {
                    return l.parseDate(e, t)
                });
            else if (e instanceof Date || "number" == typeof e)
                n = [l.parseDate(e, t)];
            else if ("string" == typeof e)
                switch (l.config.mode) {
                    case "single":
                        n = [l.parseDate(e, t)];
                        break;
                    case "multiple":
                        n = e.split(l.config.conjunction).map(function(e) {
                            return l.parseDate(e, t)
                        });
                        break;
                    case "range":
                        n = e.split(l.l10n.rangeSeparator).map(function(e) {
                            return l.parseDate(e, t)
                        })
                }
            else
                l.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(e)));
            l.selectedDates = n.filter(function(e) {
                return e instanceof Date && R(e, !1)
            }),
            "range" === l.config.mode && l.selectedDates.sort(function(e, t) {
                return e.getTime() - t.getTime()
            })
        }
        function Z(e) {
            return e.map(function(e) {
                return "string" == typeof e || "number" == typeof e || e instanceof Date ? l.parseDate(e, void 0, !0) : e && "object" == typeof e && e.from && e.to ? {
                    from: l.parseDate(e.from, void 0),
                    to: l.parseDate(e.to, void 0)
                } : e
            }).filter(function(e) {
                return e
            })
        }
        function Q(e, t) {
            var n = l.config[e];
            if (void 0 !== n && n.length > 0)
                for (var a = 0; n[a] && a < n.length; a++)
                    n[a](l.selectedDates, l.input.value, l, t);
            "onChange" === e && (l.input.dispatchEvent(X("change")),
                l.input.dispatchEvent(X("input")))
        }
        function X(e) {
            var t = document.createEvent("Event");
            return t.initEvent(e, !0, !0),
                t
        }
        function ee(e) {
            for (var t = 0; t < l.selectedDates.length; t++)
                if (0 === g(l.selectedDates[t], e))
                    return "" + t;
            return !1
        }
        function te() {
            l.config.noCalendar || l.isMobile || !l.monthNav || (l.currentMonthElement.textContent = c(l.currentMonth, l.config.shorthandCurrentMonth, l.l10n) + " ",
                l.currentYearElement.value = l.currentYear.toString(),
                l._hidePrevMonthArrow = void 0 !== l.config.minDate && (l.currentYear === l.config.minDate.getFullYear() ? l.currentMonth <= l.config.minDate.getMonth() : l.currentYear < l.config.minDate.getFullYear()),
                l._hideNextMonthArrow = void 0 !== l.config.maxDate && (l.currentYear === l.config.maxDate.getFullYear() ? l.currentMonth + 1 > l.config.maxDate.getMonth() : l.currentYear > l.config.maxDate.getFullYear()))
        }
        function ne(e) {
            if (void 0 === e && (e = !0),
                !l.selectedDates.length)
                return l.clear(e);
            void 0 !== l.mobileInput && l.mobileFormatStr && (l.mobileInput.value = void 0 !== l.latestSelectedDateObj ? l.formatDate(l.latestSelectedDateObj, l.mobileFormatStr) : "");
            var t = "range" !== l.config.mode ? l.config.conjunction : l.l10n.rangeSeparator;
            l.input.value = l.selectedDates.map(function(e) {
                return l.formatDate(e, l.config.dateFormat)
            }).join(t),
            void 0 !== l.altInput && (l.altInput.value = l.selectedDates.map(function(e) {
                return l.formatDate(e, l.config.altFormat)
            }).join(t)),
            !1 !== e && Q("onValueUpdate")
        }
        function ae(e) {
            e.preventDefault();
            var t = l.prevMonthNav.contains(e.target)
                , n = l.nextMonthNav.contains(e.target);
            t || n ? F(t ? -1 : 1) : e.target === l.currentYearElement ? l.currentYearElement.select() : e.target.classList.contains("arrowUp") ? l.changeYear(l.currentYear + 1) : e.target.classList.contains("arrowDown") && l.changeYear(l.currentYear - 1)
        }
        return function() {
            l.element = l.input = e,
                l.isOpen = !1,
                function() {
                    var n = ["wrap", "weekNumbers", "allowInput", "clickOpens", "time_24hr", "enableTime", "noCalendar", "altInput", "shorthandCurrentMonth", "inline", "static", "enableSeconds", "disableMobile"]
                        , a = ["onChange", "onClose", "onDayCreate", "onDestroy", "onKeyDown", "onMonthChange", "onOpen", "onParseConfig", "onReady", "onValueUpdate", "onYearChange", "onPreCalendarPosition"]
                        , i = t({}, r, JSON.parse(JSON.stringify(e.dataset || {})))
                        , c = {};
                    l.config.parseDate = i.parseDate,
                        l.config.formatDate = i.formatDate,
                        Object.defineProperty(l.config, "enable", {
                            get: function() {
                                return l.config._enable || []
                            },
                            set: function(e) {
                                l.config._enable = Z(e)
                            }
                        }),
                        Object.defineProperty(l.config, "disable", {
                            get: function() {
                                return l.config._disable || []
                            },
                            set: function(e) {
                                l.config._disable = Z(e)
                            }
                        }),
                    !i.dateFormat && i.enableTime && (c.dateFormat = i.noCalendar ? "H:i" + (i.enableSeconds ? ":S" : "") : w.defaultConfig.dateFormat + " H:i" + (i.enableSeconds ? ":S" : "")),
                    i.altInput && i.enableTime && !i.altFormat && (c.altFormat = i.noCalendar ? "h:i" + (i.enableSeconds ? ":S K" : " K") : w.defaultConfig.altFormat + " h:i" + (i.enableSeconds ? ":S" : "") + " K"),
                        Object.defineProperty(l.config, "minDate", {
                            get: function() {
                                return l.config._minDate
                            },
                            set: B("min")
                        }),
                        Object.defineProperty(l.config, "maxDate", {
                            get: function() {
                                return l.config._maxDate
                            },
                            set: B("max")
                        });
                    var d = function(e) {
                        return function(t) {
                            l.config["min" === e ? "_minTime" : "_maxTime"] = l.parseDate(t, "H:i")
                        }
                    };
                    Object.defineProperty(l.config, "minTime", {
                        get: function() {
                            return l.config._minTime
                        },
                        set: d("min")
                    }),
                        Object.defineProperty(l.config, "maxTime", {
                            get: function() {
                                return l.config._maxTime
                            },
                            set: d("max")
                        }),
                        Object.assign(l.config, c, i);
                    for (var u = 0; u < n.length; u++)
                        l.config[n[u]] = !0 === l.config[n[u]] || "true" === l.config[n[u]];
                    for (var u = a.length; u--; )
                        void 0 !== l.config[a[u]] && (l.config[a[u]] = o(l.config[a[u]] || []).map(s));
                    "time" === l.config.mode && (l.config.noCalendar = !0,
                        l.config.enableTime = !0);
                    for (var u = 0; u < l.config.plugins.length; u++) {
                        var f = l.config.plugins[u](l) || {};
                        for (var m in f)
                            ~a.indexOf(m) ? l.config[m] = o(f[m]).map(s).concat(l.config[m]) : void 0 === i[m] && (l.config[m] = f[m])
                    }
                    l.isMobile = !l.config.disableMobile && !l.config.inline && "single" === l.config.mode && !l.config.disable.length && !l.config.enable.length && !l.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                        Q("onParseConfig")
                }(),
                $(),
                l.input = l.config.wrap ? e.querySelector("[data-input]") : e,
                l.input ? (l.input._type = l.input.type,
                    l.input.type = "text",
                    l.input.classList.add("flatpickr-input"),
                    l._input = l.input,
                l.config.altInput && (l.altInput = D(l.input.nodeName, l.input.className + " " + l.config.altInputClass),
                    l._input = l.altInput,
                    l.altInput.placeholder = l.input.placeholder,
                    l.altInput.disabled = l.input.disabled,
                    l.altInput.required = l.input.required,
                    l.altInput.tabIndex = l.input.tabIndex,
                    l.altInput.type = "text",
                    l.input.type = "hidden",
                !l.config.static && l.input.parentNode && l.input.parentNode.insertBefore(l.altInput, l.input.nextSibling)),
                l.config.allowInput || l._input.setAttribute("readonly", "readonly"),
                    l._positionElement = l.config.positionElement || l._input) : l.config.errorHandler(new Error("Invalid input element specified")),
                function() {
                    l.selectedDates = [],
                        l.now = new Date;
                    var e = l.config.defaultDate || l.input.value;
                    e && V(e, l.config.dateFormat);
                    var t = l.selectedDates.length ? l.selectedDates[0] : l.config.minDate && l.config.minDate.getTime() > l.now.getTime() ? l.config.minDate : l.config.maxDate && l.config.maxDate.getTime() < l.now.getTime() ? l.config.maxDate : l.now;
                    l.currentYear = t.getFullYear(),
                        l.currentMonth = t.getMonth(),
                    l.selectedDates.length && (l.latestSelectedDateObj = l.selectedDates[0]),
                    void 0 !== l.config.minTime && (l.config.minTime = l.parseDate(l.config.minTime, "H:i")),
                    void 0 !== l.config.maxTime && (l.config.maxTime = l.parseDate(l.config.maxTime, "H:i")),
                        l.minDateHasTime = !!l.config.minDate && (l.config.minDate.getHours() > 0 || l.config.minDate.getMinutes() > 0 || l.config.minDate.getSeconds() > 0),
                        l.maxDateHasTime = !!l.config.maxDate && (l.config.maxDate.getHours() > 0 || l.config.maxDate.getMinutes() > 0 || l.config.maxDate.getSeconds() > 0),
                        Object.defineProperty(l, "showTimeInput", {
                            get: function() {
                                return l._showTimeInput
                            },
                            set: function(e) {
                                l._showTimeInput = e,
                                l.calendarContainer && v(l.calendarContainer, "showTimeInput", e),
                                l.isOpen && U()
                            }
                        })
                }(),
                l.utils = {
                    getDaysInMonth: function(e, t) {
                        if (void 0 === e && (e = l.currentMonth),
                        void 0 === t && (t = l.currentYear),
                        "fa" === l.config.locale) {
                            var n = t - Math.floor(e / 12)
                                , a = e - 12 * Math.floor(e / 12);
                            return a < 0 ? (a += 12,
                                n -= 1) : 0 === a && (a = 12),
                                a < 6 ? 31 : a < 11 ? 30 : 682 * ((n - (n > 0 ? 474 : 473)) % 2820 + 474 + 38) % 2816 < 682 ? 30 : 29
                        }
                        return 1 === e && (t % 4 == 0 && t % 100 != 0 || t % 400 == 0) ? 29 : l.l10n.daysInMonth[e]
                    }
                },
            l.isMobile || function() {
                var e = window.document.createDocumentFragment();
                if (l.calendarContainer = D("div", "flatpickr-calendar"),
                    l.calendarContainer.tabIndex = -1,
                    !l.config.noCalendar) {
                    if (e.appendChild(function() {
                        var e = window.document.createDocumentFragment();
                        l.monthNav = D("div", "flatpickr-month"),
                            l.prevMonthNav = D("span", "flatpickr-prev-month"),
                            l.prevMonthNav.innerHTML = l.config.prevArrow,
                            l.currentMonthElement = D("span", "cur-month");
                        var t = b("cur-year", {
                            tabindex: "-1"
                        });
                        return l.currentYearElement = t.childNodes[0],
                        l.config.minDate && l.currentYearElement.setAttribute("data-min", l.config.minDate.getFullYear().toString()),
                        l.config.maxDate && (l.currentYearElement.setAttribute("data-max", l.config.maxDate.getFullYear().toString()),
                            l.currentYearElement.disabled = !!l.config.minDate && l.config.minDate.getFullYear() === l.config.maxDate.getFullYear()),
                            l.nextMonthNav = D("span", "flatpickr-next-month"),
                            l.nextMonthNav.innerHTML = l.config.nextArrow,
                            l.navigationCurrentMonth = D("div", "flatpickr-current-month"),
                            l.navigationCurrentMonth.appendChild(l.currentMonthElement),
                            l.navigationCurrentMonth.appendChild(t),
                            e.appendChild(l.prevMonthNav),
                            e.appendChild(l.navigationCurrentMonth),
                            e.appendChild(l.nextMonthNav),
                            l.monthNav.appendChild(e),
                            Object.defineProperty(l, "_hidePrevMonthArrow", {
                                get: function() {
                                    return l.__hidePrevMonthArrow
                                },
                                set: function(e) {
                                    l.__hidePrevMonthArrow !== e && (l.prevMonthNav.style.display = e ? "none" : "block"),
                                        l.__hidePrevMonthArrow = e
                                }
                            }),
                            Object.defineProperty(l, "_hideNextMonthArrow", {
                                get: function() {
                                    return l.__hideNextMonthArrow
                                },
                                set: function(e) {
                                    l.__hideNextMonthArrow !== e && (l.nextMonthNav.style.display = e ? "none" : "block"),
                                        l.__hideNextMonthArrow = e
                                }
                            }),
                            te(),
                            l.monthNav
                    }()),
                        l.innerContainer = D("div", "flatpickr-innerContainer"),
                        l.config.weekNumbers) {
                        var t = function() {
                            l.calendarContainer.classList.add("hasWeeks");
                            var e = D("div", "flatpickr-weekwrapper");
                            e.appendChild(D("span", "flatpickr-weekday", l.l10n.weekAbbreviation));
                            var t = D("div", "flatpickr-weeks");
                            return e.appendChild(t),
                                {
                                    weekWrapper: e,
                                    weekNumbers: t
                                }
                        }()
                            , i = t.weekWrapper
                            , o = t.weekNumbers;
                        l.innerContainer.appendChild(i),
                            l.weekNumbers = o,
                            l.weekWrapper = i
                    }
                    l.rContainer = D("div", "flatpickr-rContainer"),
                        l.rContainer.appendChild(N()),
                    l.daysContainer || (l.daysContainer = D("div", "flatpickr-days"),
                        l.daysContainer.tabIndex = -1),
                        O(),
                        l.rContainer.appendChild(l.daysContainer),
                        l.innerContainer.appendChild(l.rContainer),
                        e.appendChild(l.innerContainer)
                }
                l.config.enableTime && e.appendChild(function() {
                    l.calendarContainer.classList.add("hasTime"),
                    l.config.noCalendar && l.calendarContainer.classList.add("noCalendar"),
                        l.timeContainer = D("div", "flatpickr-time"),
                        l.timeContainer.tabIndex = -1;
                    var e = D("span", "flatpickr-time-separator", ":")
                        , t = b("flatpickr-hour");
                    l.hourElement = t.childNodes[0];
                    var i = b("flatpickr-minute");
                    if (l.minuteElement = i.childNodes[0],
                        l.hourElement.tabIndex = l.minuteElement.tabIndex = -1,
                        l.hourElement.value = n(l.latestSelectedDateObj ? l.latestSelectedDateObj.getHours() : l.config.time_24hr ? l.config.defaultHour : function(e) {
                            switch (e % 24) {
                                case 0:
                                case 12:
                                    return 12;
                                default:
                                    return e % 12
                            }
                        }(l.config.defaultHour)),
                        l.minuteElement.value = n(l.latestSelectedDateObj ? l.latestSelectedDateObj.getMinutes() : l.config.defaultMinute),
                        l.hourElement.setAttribute("data-step", l.config.hourIncrement.toString()),
                        l.minuteElement.setAttribute("data-step", l.config.minuteIncrement.toString()),
                        l.hourElement.setAttribute("data-min", l.config.time_24hr ? "0" : "1"),
                        l.hourElement.setAttribute("data-max", l.config.time_24hr ? "23" : "12"),
                        l.minuteElement.setAttribute("data-min", "0"),
                        l.minuteElement.setAttribute("data-max", "59"),
                        l.timeContainer.appendChild(t),
                        l.timeContainer.appendChild(e),
                        l.timeContainer.appendChild(i),
                    l.config.time_24hr && l.timeContainer.classList.add("time24hr"),
                        l.config.enableSeconds) {
                        l.timeContainer.classList.add("hasSeconds");
                        var o = b("flatpickr-second");
                        l.secondElement = o.childNodes[0],
                            l.secondElement.value = n(l.latestSelectedDateObj ? l.latestSelectedDateObj.getSeconds() : l.config.defaultSeconds),
                            l.secondElement.setAttribute("data-step", l.minuteElement.getAttribute("data-step")),
                            l.secondElement.setAttribute("data-min", l.minuteElement.getAttribute("data-min")),
                            l.secondElement.setAttribute("data-max", l.minuteElement.getAttribute("data-max")),
                            l.timeContainer.appendChild(D("span", "flatpickr-time-separator", ":")),
                            l.timeContainer.appendChild(o)
                    }
                    return l.config.time_24hr || (l.amPM = D("span", "flatpickr-am-pm", l.l10n.amPM[a((l.latestSelectedDateObj ? l.hourElement.value : l.config.defaultHour) > 11)]),
                        l.amPM.title = l.l10n.toggleTitle,
                        l.amPM.tabIndex = -1,
                        l.timeContainer.appendChild(l.amPM)),
                        l.timeContainer
                }()),
                    v(l.calendarContainer, "rangeMode", "range" === l.config.mode),
                    l.calendarContainer.appendChild(e);
                var r = void 0 !== l.config.appendTo && void 0 !== l.config.appendTo.nodeType;
                if ((l.config.inline || l.config.static) && (l.calendarContainer.classList.add(l.config.inline ? "inline" : "static"),
                l.config.inline && (!r && l.element.parentNode ? l.element.parentNode.insertBefore(l.calendarContainer, l._input.nextSibling) : void 0 !== l.config.appendTo && l.config.appendTo.appendChild(l.calendarContainer)),
                    l.config.static)) {
                    var c = D("div", "flatpickr-wrapper");
                    l.element.parentNode && l.element.parentNode.insertBefore(c, l.element),
                        c.appendChild(l.element),
                    l.altInput && c.appendChild(l.altInput),
                        c.appendChild(l.calendarContainer)
                }
                l.config.static || l.config.inline || (void 0 !== l.config.appendTo ? l.config.appendTo : window.document.body).appendChild(l.calendarContainer)
            }(),
                function() {
                    if (l.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(e) {
                        Array.prototype.forEach.call(l.element.querySelectorAll("[data-" + e + "]"), function(t) {
                            return T(t, "click", l[e])
                        })
                    }),
                        l.isMobile)
                        !function() {
                            var e = l.config.enableTime ? l.config.noCalendar ? "time" : "datetime-local" : "date";
                            l.mobileInput = D("input", l.input.className + " flatpickr-mobile"),
                                l.mobileInput.step = l.input.getAttribute("step") || "any",
                                l.mobileInput.tabIndex = 1,
                                l.mobileInput.type = e,
                                l.mobileInput.disabled = l.input.disabled,
                                l.mobileInput.required = l.input.required,
                                l.mobileInput.placeholder = l.input.placeholder,
                                l.mobileFormatStr = "datetime-local" === e ? "Y-m-d\\TH:i:S" : "date" === e ? "Y-m-d" : "H:i:S",
                            l.selectedDates.length && (l.mobileInput.defaultValue = l.mobileInput.value = l.formatDate(l.selectedDates[0], l.mobileFormatStr)),
                            l.config.minDate && (l.mobileInput.min = l.formatDate(l.config.minDate, "Y-m-d")),
                            l.config.maxDate && (l.mobileInput.max = l.formatDate(l.config.maxDate, "Y-m-d")),
                                l.input.type = "hidden",
                            void 0 !== l.altInput && (l.altInput.type = "hidden");
                            try {
                                l.input.parentNode && l.input.parentNode.insertBefore(l.mobileInput, l.input.nextSibling)
                            } catch (e) {}
                            T(l.mobileInput, "change", function(e) {
                                l.setDate(e.target.value, !1, l.mobileFormatStr),
                                    Q("onChange"),
                                    Q("onClose")
                            })
                        }();
                    else {
                        var e = i(K, 50);
                        l._debouncedChange = i(I, M),
                        l.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && T(l.daysContainer, "mouseover", function(e) {
                            "range" === l.config.mode && J(e.target)
                        }),
                            T(window.document.body, "keydown", W),
                        l.config.static || T(l._input, "keydown", W),
                        l.config.inline || l.config.static || T(window, "resize", e),
                        void 0 !== window.ontouchstart && T(window.document, "touchstart", H),
                            T(window.document, "mousedown", k(H)),
                            T(window.document, "focus", H, {
                                capture: !0
                            }),
                        !0 === l.config.clickOpens && (T(l._input, "focus", l.open),
                            T(l._input, "mousedown", k(l.open))),
                        void 0 !== l.daysContainer && (T(l.monthNav, "mousedown", k(ae)),
                            T(l.monthNav, ["keyup", "increment"], E),
                            T(l.daysContainer, "mousedown", k(z))),
                        void 0 !== l.timeContainer && void 0 !== l.minuteElement && void 0 !== l.hourElement && (T(l.timeContainer, ["input", "increment"], h),
                            T(l.timeContainer, "mousedown", k(_)),
                            T(l.timeContainer, ["input", "increment"], l._debouncedChange, {
                                passive: !0
                            }),
                            T([l.hourElement, l.minuteElement], ["focus", "click"], function(e) {
                                return e.target.select()
                            }),
                        void 0 !== l.secondElement && T(l.secondElement, "focus", function() {
                            return l.secondElement && l.secondElement.select()
                        }),
                        void 0 !== l.amPM && T(l.amPM, "mousedown", k(function(e) {
                            h(e),
                                I()
                        })))
                    }
                }(),
            (l.selectedDates.length || l.config.noCalendar) && (l.config.enableTime && y(l.config.noCalendar ? l.latestSelectedDateObj || l.config.minDate : void 0),
                ne(!1)),
                l.showTimeInput = l.selectedDates.length > 0 || l.config.noCalendar,
            void 0 !== l.weekWrapper && void 0 !== l.daysContainer && (l.calendarContainer.style.visibility = "hidden",
                l.calendarContainer.style.display = "block",
                l.calendarContainer.style.width = l.daysContainer.offsetWidth + l.weekWrapper.offsetWidth + "px",
                l.calendarContainer.style.visibility = "visible",
                l.calendarContainer.style.display = null);
            var c = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
            !l.isMobile && c && U(),
                Q("onReady")
        }(),
            l
    }
    function y(e, t) {
        for (var n = Array.prototype.slice.call(e), a = [], i = 0; i < n.length; i++) {
            var o = n[i];
            try {
                if (null !== o.getAttribute("data-fp-omit"))
                    continue;
                void 0 !== o._flatpickr && (o._flatpickr.destroy(),
                    o._flatpickr = void 0),
                    o._flatpickr = C(o, t || {}),
                    a.push(o._flatpickr)
            } catch (e) {
                console.error(e)
            }
        }
        return 1 === a.length ? a[0] : a
    }
    "undefined" != typeof HTMLElement && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(e) {
            return y(this, e)
        }
            ,
            HTMLElement.prototype.flatpickr = function(e) {
                return y([this], e)
            }
    ),
        w = function(e, t) {
            return e instanceof NodeList ? y(e, t) : y("string" == typeof e ? window.document.querySelectorAll(e) : [e], t)
        }
        ,
    "object" == typeof window && (window.flatpickr = w),
        w.defaultConfig = h,
        w.l10ns = {
            en: t({}, u),
            default: t({}, u)
        },
        w.localize = function(e) {
            w.l10ns.default = t({}, w.l10ns.default, e)
        }
        ,
        w.setDefaults = function(e) {
            w.defaultConfig = t({}, w.defaultConfig, e)
        }
        ,
        w.parseDate = m({}),
        w.formatDate = f({}),
        w.compareDates = g,
    "undefined" != typeof jQuery && (jQuery.fn.flatpickr = function(e) {
            return y(this, e)
        }
    ),
        Date.prototype.fp_incr = function(e) {
            return new Date(this.getFullYear(),this.getMonth(),this.getDate() + ("string" == typeof e ? parseInt(e, 10) : e))
        }
    ;
    var x = w;
    e.default = x,
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
});
