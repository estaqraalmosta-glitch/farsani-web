/* ============================================================
   MAIN — behaviours. Progressive enhancement only:
   every page reads and works with JS switched off.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* ---------- Brand injection ---------- */
  function brand() {
    if (typeof SITE === "undefined") return;
    $$("[data-brand]").forEach(function (el) { el.textContent = SITE.brand; });
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    $$("[data-c='email']").forEach(function (el) {
      el.textContent = SITE.contact.email; el.href = "mailto:" + SITE.contact.email;
    });
    $$("[data-c='phone']").forEach(function (el) {
      el.textContent = SITE.contact.phone; el.href = "tel:" + SITE.contact.phone.replace(/\s/g, "");
    });
    $$("[data-c='location']").forEach(function (el) { el.textContent = SITE.contact.location; });
    $$("[data-c='hours']").forEach(function (el) { el.textContent = SITE.contact.hours; });

    var soc = $("[data-socials]");
    if (soc) {
      soc.innerHTML = SITE.socials.map(function (s) {
        return '<li><a href="' + s.url + '" rel="noopener">' + s.label + "</a></li>";
      }).join("");
    }
  }

  /* ---------- Nav ---------- */
  function nav() {
    var bar = $(".nav"), links = $(".nav__links"), tog = $(".nav__toggle");
    if (bar) {
      var onScroll = function () { bar.classList.toggle("is-stuck", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (tog && links) {
      tog.addEventListener("click", function () {
        var open = tog.getAttribute("aria-expanded") === "true";
        tog.setAttribute("aria-expanded", String(!open));
        links.classList.toggle("is-open", !open);
      });
      $$("a", links).forEach(function (a) {
        a.addEventListener("click", function () {
          tog.setAttribute("aria-expanded", "false");
          links.classList.remove("is-open");
        });
      });
    }
  }

  /* ---------- Signature: plate registration ----------
     Three process plates load out of register, then converge
     into solid ink. The thesis, performed.                    */
  function registration() {
    var reg = $(".reg");
    if (!reg) return;
    document.documentElement.classList.add("js-anim");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { reg.classList.add("is-registered"); });
    });
  }

  /* ---------- Cycling noun ---------- */
  function cycler() {
    var slots = $$("[data-cycle]");
    if (!slots.length) return;
    var words = (slots[0].getAttribute("data-cycle") || "").split("|").filter(Boolean);
    if (words.length < 2 || reduce) return;
    var i = 0;
    setInterval(function () {
      i = (i + 1) % words.length;
      slots.forEach(function (s) {
        s.style.transition = "opacity .2s ease";
        s.style.opacity = "0";
        setTimeout(function () { s.textContent = words[i]; s.style.opacity = "1"; }, 200);
      });
    }, 2600);
  }

  /* ---------- Scroll reveals ---------- */
  function reveals() {
    var els = $$(".rv, .pcard");
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Work grid ---------- */
  var svgPlate =
    '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">' +
    '<circle cx="24" cy="24" r="13"/><circle cx="24" cy="24" r="5"/>' +
    '<line x1="24" y1="2" x2="24" y2="16"/><line x1="24" y1="32" x2="24" y2="46"/>' +
    '<line x1="2" y1="24" x2="16" y2="24"/><line x1="32" y1="24" x2="46" y2="24"/></svg>';

  var svgPlay =
    '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">' +
    '<path d="M8 5v14l11-7z"/></svg>';

  function cardHTML(w) {
    var media = w.thumb
      ? '<img src="' + w.thumb + '" alt="' + w.title + ' — ' + w.client + '" loading="lazy" decoding="async" width="800" height="600">'
      : '<span class="work__ph">' + svgPlate + "</span>";
    var play = w.type === "video"
      ? '<span class="work__play"><span>' + svgPlay + "</span></span>" : "";
    return (
      '<article class="work rv" data-type="' + w.type + '" data-size="' + (w.size || "") + '">' +
        '<button class="work__btn" type="button" data-open="' + w.id + '" ' +
          'aria-label="Open ' + w.title + '">' +
          '<span class="work__thumb">' +
            '<span class="work__tag">' + (w.type === "video" ? "Video" : "Image") + "</span>" +
            media + play +
          "</span>" +
          '<span class="work__meta">' +
            '<span class="work__t">' + w.title + "</span>" +
            '<span class="work__c">' + w.year + "</span>" +
          "</span>" +
          '<span class="work__p"><b>' + w.client + "</b> — pillar: " + w.pillar + "</span>" +
          '<span class="work__p muted">' + w.blurb + "</span>" +
        "</button>" +
      "</article>"
    );
  }

  function workGrid() {
    var grid = $("[data-grid]");
    if (!grid || typeof SITE === "undefined") return;
    var current = "all";

    function counts(t) {
      return t === "all" ? SITE.work.length
        : SITE.work.filter(function (w) { return w.type === t; }).length;
    }
    $$("[data-filter]").forEach(function (b) {
      var t = b.getAttribute("data-filter");
      var c = b.querySelector("b");
      if (c) c.textContent = counts(t);
    });

    function render() {
      var items = current === "all" ? SITE.work
        : SITE.work.filter(function (w) { return w.type === current; });
      if (!items.length) {
        grid.innerHTML =
          '<div class="empty" style="grid-column:1/-1"><h3>Nothing filed under this plate yet</h3>' +
          "<p>Add entries to <code>assets/js/content.js</code> and they appear here automatically.</p></div>";
        return;
      }
      grid.innerHTML = items.map(cardHTML).join("");
      reveals();
    }

    $$("[data-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        current = btn.getAttribute("data-filter");
        $$("[data-filter]").forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === btn));
        });
        render();
      });
    });

    grid.addEventListener("click", function (e) {
      var b = e.target.closest("[data-open]");
      if (b) openLB(b.getAttribute("data-open"));
    });

    render();
  }

  /* ---------- Lightbox ---------- */
  var lastFocus = null;
  function openLB(id) {
    var lb = $(".lb");
    if (!lb || typeof SITE === "undefined") return;
    var w = SITE.work.filter(function (x) { return x.id === id; })[0];
    if (!w) return;
    lastFocus = document.activeElement;

    var frame = $(".lb__frame", lb);
    if (w.type === "video" && w.embed) {
      frame.innerHTML = '<iframe src="' + w.embed + '?autoplay=1" title="' + w.title +
        '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    } else if (w.thumb) {
      frame.innerHTML = '<img src="' + w.thumb + '" alt="' + w.title +
        '" style="width:100%;height:100%;object-fit:contain">';
    } else {
      frame.innerHTML =
        '<div style="display:grid;place-items:center;height:100%;color:#8a8d93;' +
        'font-family:var(--mono);font-size:.8125rem;text-align:center;padding:2rem;line-height:1.8">' +
        "No media attached yet.<br>Add <code>thumb</code> or <code>embed</code> for “" + w.title +
        "” in content.js.</div>";
    }
    $(".lb__t", lb).textContent = w.title;
    $(".lb__c", lb).textContent = w.client + " — pillar: " + w.pillar;
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
    $(".lb__x", lb).focus();
  }

  function closeLB() {
    var lb = $(".lb");
    if (!lb) return;
    lb.classList.remove("is-open");
    $(".lb__frame", lb).innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  function lightbox() {
    var lb = $(".lb");
    if (!lb) return;
    $(".lb__x", lb).addEventListener("click", closeLB);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLB(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lb.classList.contains("is-open")) closeLB();
    });
  }

  /* ---------- Services render ---------- */
  function services() {
    var host = $("[data-services]");
    if (!host || typeof SITE === "undefined") return;
    host.innerHTML = SITE.services.map(function (s) {
      return (
        '<div class="srow rv">' +
          "<div>" +
            '<p class="plate-code"><b>' + s.code + "</b></p>" +
            '<h3 class="d2">' + s.name + "</h3>" +
            '<p class="muted" style="margin-top:var(--s-4);max-width:32ch">' + s.lede + "</p>" +
          "</div>" +
          '<ul class="slist" style="--dot:' + s.dot + '">' +
            s.items.map(function (i) {
              return "<li><div><strong>" + i[0] + "</strong><br><span>" + i[1] + "</span></div></li>";
            }).join("") +
          "</ul>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- Refusals render ---------- */
  function refusals() {
    var host = $("[data-refusals]");
    if (!host || typeof SITE === "undefined") return;
    host.innerHTML = SITE.refusals.map(function (r) {
      return "<li>" + r[0] + "<small>" + r[1] + "</small></li>";
    }).join("");
  }

  /* ---------- Contact form ---------- */
  function form() {
    var f = $(".form");
    if (!f) return;
    var stat = $(".formstat", f.parentNode) || $(".formstat");

    function bad(field, on) { field.classList.toggle("is-bad", on); }

    f.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $$(".field", f).forEach(function (field) {
        var input = $("input, textarea, select", field);
        if (!input || !input.required) return;
        var v = (input.value || "").trim();
        var valid = v.length > 0 &&
          (input.type !== "email" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
        bad(field, !valid);
        if (!valid) ok = false;
      });
      if (!ok) {
        stat.className = "formstat bad";
        stat.textContent = "Some fields need attention. Check the ones marked below.";
        return;
      }

      var ep = (typeof SITE !== "undefined" && SITE.contact.formEndpoint) || "";
      if (!ep) {
        stat.className = "formstat ok";
        stat.textContent = "Demo mode — the form validates but doesn't send yet. Add your Formspree endpoint to content.js to go live.";
        return;
      }

      var btn = $("button[type=submit]", f);
      var label = btn.textContent;
      btn.disabled = true; btn.textContent = "Sending…";

      fetch(ep, {
        method: "POST",
        body: new FormData(f),
        headers: { Accept: "application/json" }
      }).then(function (r) {
        if (!r.ok) throw new Error("bad");
        stat.className = "formstat ok";
        stat.textContent = "Sent. We reply within one working day.";
        f.reset();
      }).catch(function () {
        stat.className = "formstat bad";
        stat.textContent = "That didn't send. Email us directly at " +
          (SITE.contact.email || "") + " and we'll pick it up.";
      }).then(function () {
        btn.disabled = false; btn.textContent = label;
      });
    });
  }

  /* ---------- Boot ---------- */
  function init() {
    brand(); nav(); registration(); cycler();
    services(); refusals(); workGrid(); lightbox(); form(); reveals();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
