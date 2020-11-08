// JavaScript Document
//<![CDATA[
! function(t) {
	"use strict";
	Date.now = Date.now || function() {
		return +new Date
	}, t.ias = function(e) {
		var n, i = t.extend({}, t.ias.defaults, e),
			o = new t.ias.util,
			a = new t.ias.paging(i.scrollContainer),
			r = !!i.history && new t.ias.history;

		function s() {
			u(), i.scrollContainer.scroll(l)
		}

		function l() {
			var e, n, r, s;
			e = o.getCurrentScrollOffset(i.scrollContainer), n = f(), e >= n && (s = o.getCurrentScrollOffset(i.scrollContainer), a.getCurPageNum(s) >= i.triggerPageThreshold ? (c(), r = d(function() {
				g(e)
			}), t(i.container).find(i.item).last().after(r), r.fadeIn()) : g(e))
		}

		function c() {
			i.scrollContainer.unbind("scroll", l)
		}

		function u() {
			t(i.pagination).hide()
		}

		function f(e) {
			var n, o;
			return 0 === (n = t(i.container).find(i.item).last()).size() ? 0 : (o = n.offset().top + n.height(), e || (o += i.thresholdMargin), o)
		}

		function g(e, n) {
			var o, r, l, f, g, d, p, m, w, P;
			if (!(o = t(i.next).attr("href"))) return i.noneleft && t(i.container).find(i.item).last().after(i.noneleft), c();
			i.beforePageChange && t.isFunction(i.beforePageChange) && !1 === i.beforePageChange(e, o) || (a.pushPages(e, o), c(), r = h(), !1 !== i.customLoaderProc ? i.customLoaderProc(r) : (t(i.container).find(i.item).last().after(r), r.fadeIn()), l = o, f = function(e, a) {
				!1 !== i.onLoadItems.call(this, a) && (t(a).hide(), t(i.container).find(i.item).last().after(a), t(a).fadeIn()), o = t(i.next, e).attr("href"), t(i.pagination).replaceWith(t(i.pagination, e)), h().remove(), u(), o ? s() : c(), i.onRenderComplete.call(this, a), n && n.call(this)
			}, w = [], P = Date.now(), g = g || i.loaderDelay, t.get(l, null, function(e) {
				0 === (d = t(i.container, e).eq(0)).length && (d = t(e).filter(i.container).eq(0)), d && d.find(i.item).each(function() {
					w.push(this)
				}), f && (m = this, (p = Date.now() - P) < g ? setTimeout(function() {
					f.call(m, e, w)
				}, g - p) : f.call(m, e, w))
			}, "html"))
		}

		function h() {
			var e = t(".ias_loader");
			return 0 === e.size() && (e = t('<div class="ias_loader" style="text-align:center;">' + i.loader + "</div>")).hide(), e
		}

		function d(e) {
			var n = t(".ias_trigger");
			return 0 === n.size() && (n = t('<div class="ias_trigger"><a href="#">' + i.trigger + "</a></div>")).hide(), t("a", n).off("click").on("click", function() {
				return d().remove(), e.call(), !1
			}), n
		}
		a.onChangePage(function(t, e, n) {
			r && r.setPage(t, n), i.onPageChange.call(this, t, n, e)
		}), s(), r && r.havePage() && (c(), n = r.getPage(), o.forceScrollTop(function() {
			var e;
			n > 1 ? (function e(n) {
				var i = f(!0);
				i > 0 && g(i, function() {
					c(), a.getCurPageNum(i) + 1 < n ? (e(n), t("html,body").animate({
						scrollTop: i
					}, 400, "swing")) : (t("html,body").animate({
						scrollTop: i
					}, 1e3, "swing"), s())
				})
			}(n), e = f(!0), t("html, body").scrollTop(e)) : s()
		}))
	}, t.ias.defaults = {
		container: ".blog-posts",
		scrollContainer: t(window),
		item: ".post-gridd",
		pagination: "#blog-pager",
		next: "#blog-pager-older-link a",
		loader: '<span class="loader-page"></span>',
		loaderDelay: 0,
		triggerPageThreshold: 1,
		trigger: "Show More",
		thresholdMargin: -100,
		history: !0,
		onPageChange: function() {},
		beforePageChange: function() {},
		onLoadItems: function() {},
		onRenderComplete: function() {},
		customLoaderProc: !1
	}, t.ias.util = function() {
		var e = !1,
			n = !1,
			i = this;
		t(window).load(function() {
			e = !0
		}), this.forceScrollTop = function(o) {
			t("html,body").scrollTop(0), n || (e ? (o.call(), n = !0) : setTimeout(function() {
				i.forceScrollTop(o)
			}, 1))
		}, this.getCurrentScrollOffset = function(t) {
			return (t.get(0) === window ? t.scrollTop() : t.offset().top) + t.height()
		}
	}, t.ias.paging = function() {
		var e = [
				[0, document.location.toString()]
			],
			n = function() {},
			i = 1,
			o = new t.ias.util;

		function a() {
			var a, s, l, c, u;
			s = r(a = o.getCurrentScrollOffset(t(window))), l = function(t) {
				for (var n = e.length - 1; n >= 0; n--)
					if (t > e[n][0]) return e[n];
				return null
			}(a), i !== s && (c = l[0], u = l[1], n.call({}, s, c, u)), i = s
		}

		function r(t) {
			for (var n = e.length - 1; n > 0; n--)
				if (t > e[n][0]) return n + 1;
			return 1
		}
		t(window).scroll(a), this.getCurPageNum = function(e) {
			return r(e = e || o.getCurrentScrollOffset(t(window)))
		}, this.onChangePage = function(t) {
			n = t
		}, this.pushPages = function(t, n) {
			e.push([t, n])
		}
	}, t.ias.history = function() {
		var t = !1,
			e = !1;
		e = !!(window.history && history.pushState && history.replaceState), e = !1, this.setPage = function(t, e) {
			this.updateState({
				page: t
			}, "", e)
		}, this.havePage = function() {
			return !1 !== this.getState()
		}, this.getPage = function() {
			return this.havePage() ? this.getState().page : 1
		}, this.getState = function() {
			var t;
			if (e) {
				if ((t = history.state) && t.ias) return t.ias
			} else if ("#/page/" === window.location.hash.substring(0, 7)) return {
				page: parseInt(window.location.hash.replace("#/page/", ""), 10)
			};
			return !1
		}, this.updateState = function(e, n, i) {
			t ? this.replaceState(e, n, i) : this.pushState(e, n, i)
		}, this.pushState = function(n, i, o) {
			var a;
			e ? history.pushState({
				ias: n
			}, i, o) : (a = n.page > 0 ? "#/page/" + n.page : "", window.location.hash = a), t = !0
		}, this.replaceState = function(t, n, i) {
			e ? history.replaceState({
				ias: t
			}, n, i) : this.pushState(t, n, i)
		}
	}
}(jQuery);
//]]>
