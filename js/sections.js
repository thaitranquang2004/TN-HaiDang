/* =========================================================
   CÁC SECTION DÙNG CHUNG CỦA THIỆP MỜI
   - Thông tin sự kiện lấy từ js/config.js
   - Thông tin khách lấy từ thuộc tính data-* của thẻ <body>
   (Thường không cần sửa file này – chỉ sửa config.js)
   ========================================================= */
(function () {
  var C = window.INVITE_CONFIG;
  var b = document.body.dataset;
  var root = b.root || "";
  var guest = b.guest || "Quý Thầy Cô, Gia Đình & Bạn Bè";
  var env = b.env || guest;
  var goi = b.goi || "mọi người";
  var xung = b.xung || "em";
  var Xung = xung.charAt(0).toUpperCase() + xung.slice(1);

  var dateDot = C.day + "." + C.month + "." + C.year;
  var dateText = C.weekday + ", " + C.day + " tháng " + C.month + " năm " + C.year;
  var enc = encodeURIComponent;

  var calUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=" + enc("Lễ Tốt Nghiệp - " + C.name + " (TDTU)") +
    "&dates=" + C.calendarStart + "/" + C.calendarEnd +
    "&location=" + enc(C.venue + ", " + C.address) +
    "&details=" + enc("Lễ Tốt Nghiệp - " + C.school);
  var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + enc(C.mapQuery);
  var mapsEmbed = "https://www.google.com/maps?q=" + enc(C.mapQuery) + "&z=16&output=embed";

  // Lịch tháng
  var cal = '<span class="dow">T2</span><span class="dow">T3</span><span class="dow">T4</span><span class="dow">T5</span><span class="dow">T6</span><span class="dow">T7</span><span class="dow sun">CN</span>';
  for (var i = 1; i < C.monthStartsOn; i++) cal += "<span></span>";
  for (var d = 1; d <= C.daysInMonth; d++) {
    var col = (C.monthStartsOn - 1 + d - 1) % 7;
    var cls = d === Number(C.day) ? "event" : col === 6 ? "sun" : "";
    cal += "<span" + (cls ? ' class="' + cls + '"' : "") + ">" + d + "</span>";
  }

  var gallery = C.gallery.map(function (g) {
    return '<figure class="on-scroll" data-fx="zoom"><img src="' + root + g.src + '" alt="' + C.name + " – " + g.title +
      '" loading="lazy" style="object-position:' + (g.pos || "center") + '"><figcaption><b>' + g.title +
      "</b>" + g.caption + "</figcaption></figure>";
  }).join("");

  var I = {
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    nav: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>',
    mail: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>',
    cap: '<svg viewBox="0 0 64 64"><path d="M32 12 2 26l30 14 30-14z" fill="#0a1f44"/><path d="M14 32v12c0 4 8 8 18 8s18-4 18-8V32L32 40z" fill="#1a56b8"/><path d="M56 28v16" stroke="#d4af37" stroke-width="3" stroke-linecap="round"/><circle cx="56" cy="47" r="4" fill="#d4af37"/></svg>'
  };

  var html = `
  <input type="checkbox" id="open-invite" aria-label="Mở thiệp mời">

  <!-- PHONG BÌ -->
  <div class="envelope-screen">
    <div class="envelope-sparkles" aria-hidden="true">
      <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
    </div>
    <div class="envelope-wrap">
      <p class="envelope-hint">Graduation Invitation · ${C.year}</p>
      <div class="envelope" id="envelope" role="button" tabindex="0" title="Nhấn để mở thiệp">
        <span class="envelope__back"></span>
        <span class="envelope__letter"><span>Gửi ${env}</span></span>
        <span class="envelope__front"></span>
        <span class="envelope__flap"></span>
        <span class="envelope__seal">TDT</span>
      </div>
      <button type="button" class="envelope-btn" id="open-btn">${I.mail} Mở thiệp mời</button>
    </div>
  </div>

  <div class="page">
    <!-- HERO -->
    <header class="hero" id="top">
      <div class="sparkles" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      <div class="container hero__grid">
        <div class="hero__text">
          <span class="eyebrow reveal d1">Graduation Ceremony</span>
          <p class="hero__school reveal d2">${C.school}</p>
          <h1 class="hero__title reveal d3">Lễ Tốt Nghiệp</h1>
          <p class="hero__name reveal d4">${C.name}</p>
          <p class="hero__degree reveal d4">${C.degree}</p>
          <div class="hero__date reveal d5" role="group" aria-label="Thời gian buổi lễ">
            <div><small>${C.weekday}</small><b>${C.day}</b></div>
            <div><small>Tháng</small><b>${C.month}</b></div>
            <div><small>Năm</small><b>${C.year}</b></div>
            <div><small>Lúc</small><b>${C.time}</b></div>
          </div>
          <div class="hero__actions reveal d6">
            <a href="#loi-moi" class="btn btn--gold" id="hero-cta">${I.down} Xem lời mời</a>
            <a href="#dia-diem" class="btn btn--ghost" id="hero-map">${I.pin} Địa điểm</a>
          </div>
        </div>
        <div class="hero__photo reveal d2">
          <div class="arch"><img src="${root}${C.portrait}" alt="Chân dung ${C.name}" fetchpriority="high"></div>
          <div class="cap-badge" aria-hidden="true">${I.cap}</div>
          <span class="year-badge">CLASS OF ${C.year}</span>
        </div>
      </div>
      <a href="#loi-moi" class="scroll-cue" aria-label="Cuộn xuống"></a>
    </header>

    <main>
      <!-- LỜI MỜI -->
      <section class="section invite" id="loi-moi" aria-labelledby="invite-title">
        <div class="container">
          <article class="letter on-scroll">
            <span class="corner corner--tl"></span><span class="corner corner--tr"></span>
            <span class="corner corner--bl"></span><span class="corner corner--br"></span>
            <svg class="letter__icon" viewBox="0 0 64 64" aria-hidden="true">${I.cap.replace(/<\/?svg[^>]*>/g, "")}</svg>
            <p class="letter__kicker" id="invite-title">Trân trọng kính mời</p>
            <h2 class="letter__guest">${guest}</h2>
            <div class="letter__guest-line"></div>
            <p>Sau bốn năm miệt mài trên giảng đường <strong>${C.school.replace("Trường ", "")}</strong>, ${xung} đã chính thức hoàn thành chương trình đào tạo và sắp bước sang một chặng đường mới.</p>
            <p>${Xung} rất mong ${goi} dành chút thời gian đến tham dự <strong>Lễ Tốt Nghiệp</strong> của ${xung} – để cùng lưu lại những khoảnh khắc đáng nhớ nhất của tuổi sinh viên. Sự hiện diện của ${goi} là niềm vinh hạnh và niềm vui lớn đối với ${xung}.</p>
            <p class="quote">${C.quote}</p>
            <p class="letter__sign">${C.name}</p>
          </article>
        </div>
      </section>

      <!-- THÔNG TIN -->
      <section class="section details" id="thong-tin" aria-labelledby="details-title">
        <div class="container">
          <div class="section-head on-scroll">
            <span class="eyebrow">Save the date</span>
            <h2 class="section-title" id="details-title">Thông tin <em>buổi lễ</em></h2>
            <p class="section-sub">Rất mong được gặp ${goi} trong ngày đặc biệt này.</p>
          </div>
          <div class="countdown on-scroll" data-fx="zoom" id="countdown" aria-live="polite">
            <div class="cd-box"><b data-cd="d">00</b><small>Ngày</small></div>
            <div class="cd-box"><b data-cd="h">00</b><small>Giờ</small></div>
            <div class="cd-box"><b data-cd="m">00</b><small>Phút</small></div>
            <div class="cd-box"><b data-cd="s">00</b><small>Giây</small></div>
          </div>
          <div class="info-grid">
            <div class="info-card on-scroll"><div class="info-card__icon">${I.cal}</div><h3>Ngày</h3><p class="big">${dateDot}</p><p>${C.weekday}</p></div>
            <div class="info-card on-scroll"><div class="info-card__icon">${I.clock}</div><h3>Thời gian</h3><p class="big">${C.time}</p><p>${C.arriveNote}</p></div>
            <div class="info-card on-scroll"><div class="info-card__icon">${I.home}</div><h3>Địa điểm</h3><p class="big">${C.venue}</p><p>${C.address}</p></div>
          </div>
          <div class="details__actions">
            <a class="btn btn--gold" id="add-calendar" target="_blank" rel="noopener" href="${calUrl}">${I.cal} Thêm vào Google Calendar</a>
            <a class="btn btn--ghost" id="details-map" href="#dia-diem">${I.pin} Xem bản đồ</a>
          </div>
          <div class="calendar on-scroll" aria-label="Lịch tháng ${C.month} năm ${C.year}">
            <div class="calendar__head">Tháng ${C.month} · ${C.year}</div>
            <div class="calendar__grid">${cal}</div>
          </div>
        </div>
      </section>

      <!-- ALBUM -->
      <section class="section gallery" id="album" aria-labelledby="gallery-title">
        <div class="container">
          <div class="section-head on-scroll">
            <span class="eyebrow">Memories</span>
            <h2 class="section-title" id="gallery-title">Khoảnh khắc <em>đáng nhớ</em></h2>
          </div>
          <div class="gallery-grid">${gallery}</div>
        </div>
      </section>

      <!-- BẢN ĐỒ -->
      <section class="section" id="dia-diem" aria-labelledby="map-title">
        <div class="container">
          <div class="section-head on-scroll">
            <span class="eyebrow">Location</span>
            <h2 class="section-title" id="map-title">Đường đến <em>buổi lễ</em></h2>
          </div>
          <div class="map-wrap">
            <div class="map-info on-scroll" data-fx="left">
              <h3>${C.venueFull}</h3>
              <div class="map-row">${I.pin}<span>${C.address}</span></div>
              <div class="map-row">${I.clock}<span>${C.time} · ${dateText}</span></div>
              <div class="map-row">${I.car}<span>${C.parking}</span></div>
              <a class="btn btn--blue" id="open-maps" target="_blank" rel="noopener" href="${mapsUrl}">${I.nav} Chỉ đường Google Maps</a>
            </div>
            <div class="map-frame on-scroll" data-fx="right">
              <iframe title="Bản đồ ${C.venueFull}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${mapsEmbed}"></iframe>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p class="footer__thanks">Thank you!</p>
        <p>Cảm ơn ${goi} đã luôn đồng hành. Hẹn gặp ${goi} vào ngày ${C.day}.${C.month} nhé!</p>
        <div class="footer__line"></div>
        <small>${C.name} · Ton Duc Thang University · Class of ${C.year}</small>
      </div>
    </footer>
  </div>

  <nav class="quick-nav" aria-label="Điều hướng nhanh">
    <a href="#top">Trang đầu</a><a href="#loi-moi">Lời mời</a><a href="#thong-tin">Thông tin</a><a href="#album">Album</a><a href="#dia-diem">Bản đồ</a>
  </nav>`;

  document.currentScript.insertAdjacentHTML("beforebegin", html);
  if (!document.title) document.title = "Thiệp mời Lễ Tốt Nghiệp · " + C.name + " · TDTU";

  // Tự động gắn Favicon tốt nghiệp nếu chưa có
  if (!document.querySelector('link[rel="icon"]')) {
    var fav = document.createElement("link");
    fav.rel = "icon";
    fav.type = "image/svg+xml";
    fav.href = root + "images/favicon.svg";
    document.head.appendChild(fav);
  }

  /* =========================================================
     KHỞI CHẠY TẤT CẢ HIỆU ỨNG (CONFIRM CHẠY ĐỒNG BỘ 100%)
     ========================================================= */
  (function initEffects() {
    var doc = document.documentElement;
    var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

    // Đánh dấu HTML đã hỗ trợ effects
    doc.classList.add("fx");

    /* ---------- 1. Thanh tiến trình cuộn ---------- */
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);

    /* ---------- 2. Pháo giấy (Confetti Canvas) ---------- */
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

    /* ---------- 3. Mở phong bì & Hiệu ứng Chuyển cảnh ---------- */
    var toggle = $("#open-invite");
    var hasOpened = false;

    function triggerOpenConfetti() {
      // Đợt 1: Bắn pháo ngay tâm phong bì khi nắp mở
      setTimeout(function () {
        burst(window.innerWidth * 0.5, window.innerHeight * 0.52, 160);
      }, 420);
      // Đợt 2: Hai bên bắn chéo khi lá thư trồi lên cao
      setTimeout(function () {
        burst(window.innerWidth * 0.12, window.innerHeight * 0.82, 80, Math.PI / 2.2);
        burst(window.innerWidth * 0.88, window.innerHeight * 0.82, 80, Math.PI / 2.2);
      }, 920);
      // Đợt 3: Mưa hoa giấy lung linh khi landing page bừng sáng
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

    // Sự kiện mở thiệp từ nút bấm và phong bì
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

    // Nhấn vào huy hiệu mũ / ô ngày trên lịch / chữ cảm ơn để bắn thêm pháo hoa
    $$(".cap-badge, .calendar__grid .event, .footer__thanks").forEach(function (el) {
      el.style.cursor = "pointer";
      el.addEventListener("click", function (e) {
        burst(e.clientX, e.clientY, 80);
      });
    });

    /* ---------- 4. Mũ tốt nghiệp bay trong Hero ---------- */
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

    /* ---------- 5. Hiện dần khi cuộn (Scroll Reveal) ---------- */
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

    // Scroll Fallback để đảm bảo không bao giờ bị kẹt ẩn
    window.addEventListener("scroll", function () {
      $$(".on-scroll:not(.is-in)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
          el.classList.add("is-in");
        }
      });
    }, { passive: true });

    /* ---------- 6. Đếm ngược (Countdown) ---------- */
    var cdEls = {
      d: $('[data-cd="d"]'),
      h: $('[data-cd="h"]'),
      m: $('[data-cd="m"]'),
      s: $('[data-cd="s"]')
    };

    if (cdEls.d && C.year) {
      var pad = function (n) { return String(n).padStart(2, "0"); };
      var target = new Date(C.year + "-" + pad(C.month) + "-" + pad(C.day) + "T" + (C.time || "08:00") + ":00+07:00");

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

    /* ---------- 7. Nghiêng 3D theo chuột (Desktop) ---------- */
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

    /* ---------- 8. Vệt lấp lánh theo chuột (Desktop) ---------- */
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

    /* ---------- 9. Gợn sóng khi bấm nút ---------- */
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

    /* ---------- 10. Thanh tiến trình cuộn & Active Nav ---------- */
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

    /* ---------- 11. Xem ảnh phóng to (Lightbox) ---------- */
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
})();
