const config = window.SALON_CONFIG || {};
const menu = document.querySelector('.menu-button'), nav = document.querySelector('#navigation');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); menu.textContent = open ? '×' : '☰'; });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); menu.textContent = '☰'; }));
window.addEventListener('scroll', () => document.querySelector('.header').classList.toggle('scrolled', scrollY > 35), { passive: true });
if ('IntersectionObserver' in window) { document.body.classList.add('js-reveal'); const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) } }), { threshold: .08 }); document.querySelectorAll('.reveal').forEach(e => io.observe(e)); const sections = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) nav.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.hash === '#' + e.target.id)); }), { rootMargin: '-15% 0px -55% 0px' }); document.querySelectorAll('main section[id]').forEach(e => sections.observe(e)); }
const booking = document.querySelector('#booking'), form = document.querySelector('#booking-form');
const d = new Date(); form.elements.date.min = [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
document.querySelectorAll('[data-book],[data-service]').forEach(b => b.addEventListener('click', () => { if (b.dataset.service) form.elements.service.value = b.dataset.service; document.querySelector('#form-status').textContent = ''; document.querySelector('#enquiry-copy').hidden = true; booking.showModal(); }));
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close())); document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) { const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); } }));
form.addEventListener('submit', e => { e.preventDefault(); const data = new FormData(form), message = `Hello, I would like to enquire about an appointment.\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nService: ${data.get('service')}\nPreferred date: ${data.get('date')}`; if (/^\d{8,15}$/.test(config.whatsapp || '')) { window.open('https://wa.me/' + config.whatsapp + '?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer'); document.querySelector('#form-status').textContent = 'Continue in WhatsApp to send your enquiry.'; } else if (config.email) { location.href = 'mailto:' + config.email + '?subject=Appointment%20enquiry&body=' + encodeURIComponent(message); document.querySelector('#form-status').textContent = 'Send your enquiry from your email app.'; } else { const copy = document.querySelector('#enquiry-copy'); copy.value = message; copy.hidden = false; document.querySelector('#form-status').textContent = 'Your enquiry is ready to copy. It has not been sent.'; copy.focus(); copy.select(); } });
const track = document.querySelector('#gallery-track');
/* EDITORIAL GALLERY */
(() => {
  const grid = document.querySelector(".editorial-grid");
  const filters = document.querySelectorAll(".gallery-filter");
  const items = document.querySelectorAll(".editorial-item");

  const viewer = document.querySelector("#editorial-lightbox");
  const fullImage = document.querySelector("#editorial-full-image");
  const caption = document.querySelector("#editorial-full-caption");

  if (!grid || !viewer) return;

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      filters.forEach((filter) => {
        const selected = filter === button;

        filter.classList.toggle("active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });

      grid.classList.toggle("is-filtered", category !== "all");

      items.forEach((item) => {
        item.hidden =
          category !== "all" &&
          item.dataset.category !== category;
      });
    });
  });

  items.forEach((item) => {
    item.addEventListener("click", () => {
 const cardImage = item.querySelector("img");
fullImage.src = cardImage.currentSrc || cardImage.src;
      fullImage.alt = item.querySelector("img").alt;
      caption.textContent = item.dataset.caption;
      viewer.showModal();
    });
  });

  viewer.querySelector(".editorial-close").addEventListener(
    "click",
    () => viewer.close()
  );

  viewer.addEventListener("click", (event) => {
    if (event.target !== viewer) return;

    const bounds = viewer.getBoundingClientRect();

    if (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    ) {
      viewer.close();
    }
  });
})();


const details = document.querySelector('#contact-details');

/* CLICK A VIDEO CARD TO PLAY IN FULLSCREEN */
(() => {
  const viewer = document.querySelector("#lightbox");
  const placeholder = document.querySelector("#lightbox-photo");
  const caption = document.querySelector("#lightbox-caption");

  if (!viewer || !placeholder) return;

  let player;

  document.querySelectorAll("[data-photo]").forEach((card) => {
    card.addEventListener("click", () => {
      // Use the same video shown inside the clicked card.
      const preview = card.querySelector("video");
      const source = preview?.querySelector("source");

      const path =
        preview?.currentSrc ||
        preview?.getAttribute("src") ||
        source?.getAttribute("src") ||
        window.SALON_CONFIG?.videos?.[card.dataset.photo];

      if (!path) return;

      if (player) {
        player.pause();
        player.remove();
      }

      placeholder.hidden = true;
      placeholder.style.display = "none";

      player = document.createElement("video");
      player.src = path;
      player.controls = true;
      player.playsInline = true;
      player.style.width = "100%";
      player.style.maxHeight = "85vh";
      player.style.objectFit = "contain";

      placeholder.after(player);

      if (caption) {
        caption.textContent =
          card.querySelector(".gallery-caption")?.textContent
            .replace("↗", "")
            .trim() || "";
      }

      viewer.showModal();
      player.play().catch(() => {});

     
    });
  });

  viewer.addEventListener("close", () => {
    if (player) player.pause();
  });
})();
const socials = document.querySelector('#social-links'); function addSocial(url, label, svg) { const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label', label); a.innerHTML = svg; socials.append(a); } if (/^\d{8,15}$/.test(config.whatsapp || '')) addSocial('https://wa.me/' + config.whatsapp, 'Chat on WhatsApp', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.5 14.6l-.4-.2-2.3.6.6-2.3-.3-.4A8 8 0 0 1 12 4zm-3 3c-.4 0-1.3.7-1.3 1.9 0 2.7 3.6 6.2 6.2 6.2 1.2 0 1.9-.9 1.9-1.3l-2-1.1-.9.9c-1.4-.5-2.5-1.6-3-3l.9-.9L9.7 7z"/></svg>'); if (/^https:\/\/(www\.)?instagram\.com\//i.test(config.instagram || '')) addSocial(config.instagram, 'Visit Instagram', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.5-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></svg>');
/* CONTACT ENQUIRY FORM */
(() => {
  const form = document.querySelector("#visit-form");

  if (!form) return;

  const preferredDate = form.querySelector("#visit-date");
  const status = form.querySelector("#visit-status");
  const copyField = form.querySelector("#visit-enquiry-copy");

  const today = new Date();

  preferredDate.min = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const values = new FormData(form);
    const settings = window.SALON_CONFIG || {};

    const enquiry = [
      "Hello, I would like to enquire about an appointment.",
      "",
      `Name: ${values.get("name")}`,
      `Phone: ${values.get("phone")}`,
      `Service: ${values.get("service")}`,
      `Preferred date: ${values.get("date")}`,
      `Message: ${values.get("message") || "No additional message"}`
    ].join("\n");

    copyField.hidden = true;

    if (/^\d{8,15}$/.test(settings.whatsapp || "")) {
      window.open(
        `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(enquiry)}`,
        "_blank",
        "noopener,noreferrer"
      );

      status.textContent =
        "Continue in WhatsApp to send your enquiry.";
    } else {
      copyField.value = enquiry;
      copyField.hidden = false;

      status.textContent =
        "Your enquiry is ready to copy. It has not been sent.";

      copyField.focus();
      copyField.select();
    }
  });
})();
/* ONE REVIEW EVERY TWO SECONDS */
(() => {
  const section = document.querySelector("#reviews");
  if (!section) return;

  const cards = [...section.querySelectorAll(".customer-review")];
  const dots = [...section.querySelectorAll(".review-dot")];
  const pauseButton = section.querySelector(".review-pause");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  let current = 0;
  let timer = null;
  let paused = reducedMotion.matches;
  let hovered = false;

  function showReview(index) {
    current = index;

    cards.forEach((card, i) => {
      const active = i === index;

      card.hidden = !active;
      card.classList.toggle("is-active", active);
    });

    dots.forEach((dot, i) => {
      const active = i === index;

      dot.classList.toggle("active", active);
      dot.setAttribute("aria-pressed", String(active));
    });
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  function updateTimer() {
    stopTimer();

    pauseButton.textContent = paused
      ? "Play reviews"
      : "Pause reviews";

    if (
      paused ||
      hovered ||
      document.hidden ||
      section.contains(document.activeElement) ||
      cards.length < 2
    ) {
      return;
    }

    timer = setInterval(() => {
      showReview((current + 1) % cards.length);
    }, 2000);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showReview(index);
      updateTimer();
    });
  });

  pauseButton.addEventListener("click", () => {
    paused = !paused;
    updateTimer();
  });

  section.addEventListener("mouseenter", () => {
    hovered = true;
    updateTimer();
  });

  section.addEventListener("mouseleave", () => {
    hovered = false;
    updateTimer();
  });

  section.addEventListener("focusin", updateTimer);

  section.addEventListener("focusout", () => {
    requestAnimationFrame(updateTimer);
  });

  document.addEventListener("visibilitychange", updateTimer);

  reducedMotion.addEventListener("change", (event) => {
    paused = event.matches;
    updateTimer();
  });

  showReview(0);
  updateTimer();
})();
/* COUNT FROM ZERO WHEN THE SECTION ENTERS VIEW */
(() => {
  const section = document.querySelector(".salon-stats");
  if (!section) return;

  const counters = [...section.querySelectorAll(".stat-counter")];
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  function finalValues() {
    counters.forEach((counter) => {
      counter.textContent = Number(
        counter.dataset.target
      ).toLocaleString("en-IN");
    });
  }

  // Keep final figures visible when animation is unavailable.
  if (
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    finalValues();
    return;
  }

  counters.forEach((counter) => {
    counter.textContent = "0";
  });

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;

    observer.disconnect();

    const duration = 2000;
    let startTime;

    function animate(time) {
      if (startTime === undefined) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const value = Math.round(target * easedProgress);

        counter.textContent = value.toLocaleString("en-IN");
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, { threshold: 0.25 });

  observer.observe(section);
})();
/* GALLERY ARROW BUTTONS */
(() => {
  function setupGallery() {
    const track = document.querySelector("#gallery-track");
    const previous = document.querySelector("#gallery-prev");
    const next = document.querySelector("#gallery-next");

    if (!track || !previous || !next) return;

    function scrollGallery(direction) {
      const card = track.querySelector(".gallery-card");
      const gap = parseFloat(getComputedStyle(track).columnGap) || 18;
      const distance = card
        ? card.getBoundingClientRect().width + gap
        : track.clientWidth;

      track.scrollBy({
        left: direction * distance,
        behavior: "smooth"
      });
    }

    previous.onclick = () => scrollGallery(-1);
    next.onclick = () => scrollGallery(1);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupGallery);
  } else {
    setupGallery();
  }
})();
// Replace null with each actual package amount.
// Example: amount: 1500
(() => {
  const packages = [
    { amount: null },
    { amount: null },
    { amount: null }
  ];

  document.querySelectorAll("#packages .package-card")
    .forEach((card, index) => {
      if (card.querySelector(".package-back")) return;

      const title = card.querySelector("h3")?.textContent || "Package";
      const amount = packages[index]?.amount;

      const price = typeof amount === "number"
        ? new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
          }).format(amount)
        : "Contact for price";

      // Remove price from the front.
      card.querySelector(".package-price")?.remove();

      const viewButton = document.createElement("button");
      viewButton.type = "button";
      viewButton.className = "package-view-price";
      viewButton.textContent = "View Price ↗";
      viewButton.setAttribute("aria-expanded", "false");

      const enquiryButton = card.querySelector("[data-service]");
      card.insertBefore(viewButton, enquiryButton);

      const back = document.createElement("div");
      back.className = "package-back";
      back.hidden = true;

      const heading = document.createElement("h3");
      heading.textContent = title;

      const priceText = document.createElement("p");
      priceText.className = "package-amount";
      priceText.textContent = price;

      const returnButton = document.createElement("button");
      returnButton.type = "button";
      returnButton.className = "package-return";
      returnButton.textContent = "← Back to package";

      back.append(heading, priceText, returnButton);
      card.append(back);

      const frontElements = [...card.children]
        .filter(element => element !== back);

      function flip(showBack) {
        card.classList.toggle("is-flipped", showBack);
        back.hidden = !showBack;

        frontElements.forEach(element => {
          element.inert = showBack;
        });

        viewButton.setAttribute("aria-expanded", String(showBack));

        if (showBack) {
          returnButton.focus();
        } else {
          viewButton.focus();
        }
      }

      card.addEventListener("click", event => {
        if (event.target.closest(".package-back")) return;

        // Keep the existing enquiry button working.
        if (event.target.closest("a, button, input, select, textarea")
            && !event.target.closest(".package-view-price")) return;

        flip(true);
      });

      returnButton.addEventListener("click", () => flip(false));

      card.addEventListener("keydown", event => {
        if (event.key === "Escape" &&
            card.classList.contains("is-flipped")) {
          flip(false);
        }
      });
    });
})();
/* PAGE REVEAL + PACKAGE LIGHTING */
(() => {
  function initPageEffects() {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const selector = [
      "main .section-heading",
      "main .editorial-heading",
      "main .about-images",
      "main .about-content",
      "#services .service-card",
      "#packages .package-card",
      "main .editorial-item"
    ].join(", ");

    const items = [...document.querySelectorAll(selector)];

    // Remove previous reveal classes from these elements.
    items.forEach(item => {
      item.classList.remove(
        "reveal",
        "scroll-reveal-item",
        "reveal-pending",
        "reveal-visible"
      );
    });

    if (
      !reducedMotion &&
      "IntersectionObserver" in window &&
      typeof Element.prototype.animate === "function"
    ) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const item = entry.target;

          const siblings = [...item.parentElement.children]
            .filter(element => element.matches(selector));

          const index = siblings.indexOf(item);
          const distance = window.innerWidth <= 600 ? 16 : 40;
          const direction = index % 2 === 0 ? -1 : 1;

          item.animate(
            [
              {
                opacity: 0,
                translate: `${direction * distance}px 20px`
              },
              {
                opacity: 1,
                translate: "0px 0px"
              }
            ],
            {
              duration: 800,
              delay: Math.min(index, 4) * 120,
              easing: "cubic-bezier(.22, 1, .36, 1)",
              fill: "backwards"
            }
          );

          observer.unobserve(item);
        });
      }, {
        threshold: 0.08
      });

      items.forEach(item => observer.observe(item));
    }

    // Package card lighting.
    document.querySelectorAll("#packages .package-card")
      .forEach(card => {
        card.addEventListener("pointermove", event => {
          if (event.pointerType === "touch") return;

          const bounds = card.getBoundingClientRect();

          card.style.setProperty(
            "--light-x",
            `${event.clientX - bounds.left}px`
          );

          card.style.setProperty(
            "--light-y",
            `${event.clientY - bounds.top}px`
          );
        });

        card.addEventListener("pointerleave", () => {
          card.style.removeProperty("--light-x");
          card.style.removeProperty("--light-y");
        });
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPageEffects, {
      once: true
    });
  } else {
    initPageEffects();
  }
})();