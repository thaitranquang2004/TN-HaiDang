/* =========================================================
   HIỆU ỨNG ĐỘNG CHO THIỆP MỜI
   (Đã được tích hợp sẵn trong sections.js, file này dùng làm dự phòng)
   ========================================================= */
(function () {
  var doc = document.documentElement;
  if (doc.classList.contains("fx")) return; // Đã chạy từ sections.js

  var C = window.INVITE_CONFIG || {};
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  doc.classList.add("fx");

  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  var canvas = document.createElement("canvas");
  canvas.className = "confetti-canvas";
  document.body.appendChild(canvas);
  var ctx = canvas.getContext("2d");
  var parts = [];
  var running = false;
  var colors = ["#d4af37", "#f3d98b", "#1a56b8", "#3d7be0", "#e0283e", "#ffffff"];

  function resizeCanvas() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, (window.innerWidth || 360) * dpr);
    canvas.height = Math.max(1, (window.innerHeight || 640) * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function burst(x, y, n, spread) {
    var count = n || 80;
    for (var i = 0; i < count; i++) {
      var a = (Math.random() - 0.5) * (spread || Math.PI * 2) - Math.PI / 2;
      var v = 6 + Math.random() * 9;
      parts.push({
        x: x, y: y,
        vx: Math.cos(a) * v, vy: Math.sin(a) * v,
        w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
        r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
        c: colors[(Math.random() * colors.length) | 0],
        life: 0, max: 110 + Math.random() * 50,
        round: Math.random() < 0.3
      });
    }
    if (!running) { running = true; requestAnimationFrame(tick); }
  }

  function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    parts = parts.filter(function (p) { return p.life < p.max && p.y < window.innerHeight + 40; });
    parts.forEach(function (p) {
      p.life++;
      p.vy += 0.22;
      p.vx *= 0.985;
      p.vy *= 0.985;
      p.x += p.vx + Math.sin(p.life / 10) * 0.6;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.fillStyle = p.c;
      if (p.round) {
        ctx.beginPath();
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.cos(p.life / 6));
      }
      ctx.restore();
    });
    if (parts.length) {
      requestAnimationFrame(tick);
    } else {
      running = false;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  var toggle = $("#open-invite");
  var hasOpened = false;

  function triggerOpenConfetti() {
    setTimeout(function () {
      burst(window.innerWidth * 0.5, window.innerHeight * 0.52, 160);
    }, 420);
    setTimeout(function () {
      burst(window.innerWidth * 0.12, window.innerHeight * 0.82, 80, Math.PI / 2.2);
      burst(window.innerWidth * 0.88, window.innerHeight * 0.82, 80, Math.PI / 2.2);
    }, 920);
    setTimeout(function () {
      burst(window.innerWidth * 0.5, window.innerHeight * 0.28, 120);
    }, 1420);
  }

  function handleOpen() {
    if (hasOpened) return;
    hasOpened = true;
    document.body.classList.add("is-opened");
    if (toggle) toggle.checked = true;
    triggerOpenConfetti();
  }

  var openBtn = $("#open-btn");
  var envBox = $("#envelope");

  if (openBtn) {
    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      handleOpen();
    });
  }
  if (envBox) {
    envBox.addEventListener("click", function (e) {
      e.preventDefault();
      handleOpen();
    });
    envBox.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleOpen();
      }
    });
  }
  if (toggle) {
    toggle.addEventListener("change", function () {
      if (toggle.checked) handleOpen();
    });
  }

  $$(".cap-badge, .calendar__grid .event, .footer__thanks").forEach(function (el) {
    el.style.cursor = "pointer";
    el.addEventListener("click", function (e) {
      burst(e.clientX, e.clientY, 80);
    });
  });

  var hero = $(".hero");
  if (hero) {
    var capSvg = '<svg viewBox="0 0 64 64"><path d="M32 12 2 26l30 14 30-14z" fill="currentColor"/><path d="M14 32v12c0 4 8 8 18 8s18-4 18-8V32L32 40z" fill="currentColor" opacity=".7"/><path d="M56 28v16" stroke="#d4af37" stroke-width="3"/><circle cx="56" cy="47" r="4" fill="#d4af37"/></svg>';
    var caps = document.createElement("div");
    caps.className = "flying-caps";
    caps.setAttribute("aria-hidden", "true");
    for (var c = 0; c < 7; c++) {
      var s = document.createElement("span");
      s.innerHTML = capSvg;
      s.style.left = (5 + c * 14 + Math.random() * 5) + "%";
      s.style.setProperty("--size", (22 + Math.random() * 24) + "px");
      s.style.setProperty("--dur", (12 + Math.random() * 8) + "s");
      s.style.setProperty("--delay", (-Math.random() * 14) + "s");
      s.style.setProperty("--sway", (Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 35) + "px");
      caps.appendChild(s);
    }
    hero.appendChild(caps);
  }

  $$(".info-card").forEach(function (el, i) {
    el.dataset.fx = "flip";
    el.style.setProperty("--d", (i * 120) + "ms");
  });
  $$(".gallery-grid figure").forEach(function (el, i) {
    el.style.setProperty("--d", (i * 150) + "ms");
  });
  $$(".section-head").forEach(function (el) {
    el.dataset.fx = el.dataset.fx || "up";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

    $$(".on-scroll").forEach(function (el) { io.observe(el); });
  } else {
    $$(".on-scroll").forEach(function (el) { el.classList.add("is-in"); });
  }

  window.addEventListener("scroll", function () {
    $$(".on-scroll:not(.is-in)").forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add("is-in");
      }
    });
  }, { passive: true });

  var cdEls = {
    d: $('[data-cd="d"]'),
    h: $('[data-cd="h"]'),
    m: $('[data-cd="m"]'),
    s: $('[data-cd="s"]')
  };

  if (cdEls.d && C.year) {
    var pad = function (n) { return String(n).padStart(2, "0"); };
    var target = new Date(C.year + "-" + pad(C.month) + "-" + pad(C.day) + "T" + (C.time || "10:30") + ":00+07:00");

    function setCd(key, val) {
      var el = cdEls[key];
      if (!el) return;
      var str = pad(val);
      if (el.textContent !== str) {
        el.textContent = str;
        el.classList.remove("tick");
        void el.offsetWidth;
        el.classList.add("tick");
      }
    }

    function updateCd() {
      var diff = Math.max(0, target.getTime() - Date.now());
      if (diff === 0) {
        var box = $("#countdown");
        if (box) box.innerHTML = '<p class="cd-done">🎓 Hôm nay là ngày tốt nghiệp!</p>';
        return clearInterval(cdTimer);
      }
      setCd("d", Math.floor(diff / 864e5));
      setCd("h", Math.floor(diff / 36e5) % 24);
      setCd("m", Math.floor(diff / 6e4) % 60);
      setCd("s", Math.floor(diff / 1e3) % 60);
    }
    var cdTimer = setInterval(updateCd, 1000);
    updateCd();
  }

  if (finePointer) {
    $$(".info-card, .gallery-grid figure, .cd-box").forEach(function (el) {
      el.classList.add("tilt");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--rx", (-py * 8).toFixed(2) + "deg");
        el.style.setProperty("--ry", (px * 10).toFixed(2) + "deg");
      });
      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      });
    });
  }

  if (finePointer) {
    var lastTrail = 0;
    window.addEventListener("pointermove", function (e) {
      var now = performance.now();
      if (now - lastTrail < 45) return;
      lastTrail = now;
      var s = document.createElement("span");
      s.className = "trail";
      s.textContent = Math.random() > 0.5 ? "✦" : "✧";
      s.style.left = e.clientX + "px";
      s.style.top = e.clientY + "px";
      s.style.color = colors[(Math.random() * 3) | 0];
      s.style.setProperty("--tx", ((Math.random() - 0.5) * 36) + "px");
      document.body.appendChild(s);
      setTimeout(function () { s.remove(); }, 850);
    }, { passive: true });
  }

  $$(".btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      var r = btn.getBoundingClientRect();
      var w = document.createElement("span");
      w.className = "ripple";
      w.style.left = (e.clientX - r.left) + "px";
      w.style.top = (e.clientY - r.top) + "px";
      btn.appendChild(w);
      setTimeout(function () { w.remove(); }, 650);
    });
  });

  var navLinks = $$(".quick-nav a");
  var sections = navLinks.map(function (a) { return $(a.getAttribute("href")); });
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var maxScroll = doc.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (maxScroll > 0 ? y / maxScroll : 0) + ")";

    var current = 0;
    sections.forEach(function (sec, i) {
      if (sec && sec.getBoundingClientRect().top < window.innerHeight * 0.4) {
        current = i;
      }
    });
    navLinks.forEach(function (a, i) {
      a.classList.toggle("active", i === current);
    });
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  var lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = '<button class="lightbox__close" aria-label="Đóng">&times;</button><img alt=""><p></p>';
  document.body.appendChild(lb);
  var lbImg = $("img", lb);
  var lbCap = $("p", lb);

  $$(".gallery-grid figure").forEach(function (fig) {
    fig.style.cursor = "zoom-in";
    fig.addEventListener("click", function () {
      var img = $("img", fig);
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      var cap = $("figcaption", fig);
      lbCap.innerHTML = cap ? cap.innerHTML : "";
      lb.classList.add("open");
    });
  });

  function closeLb() { lb.classList.remove("open"); }
  lb.addEventListener("click", function (e) {
    if (e.target !== lbImg) closeLb();
  });
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLb();
  });
})();
