/*
 * Full-screen intro reveal — plays once per browser session (sessionStorage
 * gated), skippable by click/tap/key, and skipped entirely for anyone with
 * prefers-reduced-motion set. Loaded synchronously right after the overlay
 * markup so it locks scroll before the rest of the page is visible.
 *
 * To make it replay on every load instead of once per session, change the
 * sessionStorage check below to `false`.
 */
(() => {
  "use strict";

  const intro = document.getElementById("intro");
  if (!intro) return;

  const ONCE_PER_SESSION = true;
  const alreadySeen = ONCE_PER_SESSION && sessionStorage.getItem("hadIntro") === "1";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (alreadySeen || reduceMotion) {
    intro.remove();
    return;
  }

  document.documentElement.classList.add("intro-lock");
  intro.setAttribute("aria-hidden", "false");

  // Atmospheric embers — count scales down on small screens for performance.
  const field = document.getElementById("intro-particles");
  const vw = window.innerWidth;
  const count = vw < 480 ? 12 : vw < 900 ? 20 : 30;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "ember";
    p.style.setProperty("--x", (Math.random() * 100).toFixed(1) + "%");
    p.style.setProperty("--size", (2 + Math.random() * 3).toFixed(1) + "px");
    p.style.setProperty("--dur", (5 + Math.random() * 6).toFixed(2) + "s");
    p.style.setProperty("--delay", (Math.random() * -6).toFixed(2) + "s");
    p.style.setProperty("--drift", (Math.random() * 70 - 35).toFixed(0) + "px");
    frag.appendChild(p);
  }
  field.appendChild(frag);

  const TOTAL_MS = 4300;
  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    if (ONCE_PER_SESSION) sessionStorage.setItem("hadIntro", "1");
    intro.classList.add("is-leaving");
    document.documentElement.classList.remove("intro-lock");
    intro.setAttribute("aria-hidden", "true");
    window.clearTimeout(timer);
    intro.addEventListener("animationend", () => intro.remove(), { once: true });
    // Safety net in case the fade-out animation never fires (e.g. element
    // already display:none via some other rule).
    setTimeout(() => intro.remove(), 800);
  }

  const timer = setTimeout(dismiss, TOTAL_MS);
  intro.addEventListener("click", dismiss);
  window.addEventListener("keydown", dismiss, { once: true });
})();
