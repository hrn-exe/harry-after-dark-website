/*
 * Cart (add/remove/qty, persisted in localStorage), checkout panel, and
 * hover-zoom for the Evidence Locker shop section.
 *
 * Checkout honesty note: this is a static site with no server, so it can
 * never safely collect a real card number itself. If SITE_CONFIG.CHECKOUT
 * has a Stripe or PayPal link configured, the checkout panel offers real
 * payment via that (Stripe/PayPal host the actual payment page). Until
 * then it shows the order total and offers to send it as a DM/email
 * instead of faking a payment form — see config.js for setup.
 */
(() => {
  "use strict";

  const CART_KEY = "hadCart";

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(CART_KEY));
      return Array.isArray(raw) ? raw : [];
    } catch {
      return [];
    }
  }
  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch { /* storage unavailable */ }
  }

  let cart = loadCart();

  function lineKey(id, size) { return size ? `${id}::${size}` : id; }
  function cartTotal() { return cart.reduce((sum, l) => sum + l.price * l.qty, 0); }
  function cartCount() { return cart.reduce((sum, l) => sum + l.qty, 0); }

  function addToCart(product, size) {
    const key = lineKey(product.id, size);
    const existing = cart.find((l) => lineKey(l.id, l.size) === key);
    if (existing) {
      existing.qty = Math.min(9, existing.qty + 1);
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, img: product.img, size: size || null, qty: 1 });
    }
    saveCart();
    renderCart();
  }
  function removeLine(key) {
    cart = cart.filter((l) => lineKey(l.id, l.size) !== key);
    saveCart();
    renderCart();
  }
  function setQty(key, qty) {
    const line = cart.find((l) => lineKey(l.id, l.size) === key);
    if (!line) return;
    if (qty < 1) { removeLine(key); return; }
    line.qty = Math.min(9, qty);
    saveCart();
    renderCart();
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  // ---------- DOM refs ----------
  const cartToggle = document.getElementById("cart-toggle");
  const cartDrawer = document.getElementById("cart-drawer");
  const cartOverlay = document.getElementById("cart-overlay");
  const cartClose = document.getElementById("cart-close");
  const cartItemsEl = document.getElementById("cart-items");
  const cartEmptyEl = document.getElementById("cart-empty");
  const cartSummaryEl = document.getElementById("cart-summary");
  const cartSubtotalEl = document.getElementById("cart-subtotal");
  const cartCountEl = document.getElementById("cart-count");
  const cartHeadCountEl = document.getElementById("cart-head-count");
  const checkoutBtn = document.getElementById("cart-checkout-btn");

  function renderCart() {
    if (!cartItemsEl) return;
    const count = cartCount();
    cartCountEl.textContent = String(count);
    cartCountEl.hidden = count === 0;
    cartHeadCountEl.textContent = count ? `(${count})` : "";

    cartItemsEl.innerHTML = "";
    if (cart.length === 0) {
      cartEmptyEl.hidden = false;
      cartSummaryEl.hidden = true;
      return;
    }
    cartEmptyEl.hidden = true;
    cartSummaryEl.hidden = false;

    for (const line of cart) {
      const key = lineKey(line.id, line.size);
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
        <img src="${escapeHtml(line.img)}" alt="" onerror="this.onerror=null;this.src='assets/avatar.jpg';">
        <div class="cart-item-body">
          <div class="cart-item-name">${escapeHtml(line.name)}${line.size ? ` <span class="cart-item-size">· ${escapeHtml(line.size)}</span>` : ""}</div>
          <div class="cart-item-row">
            <div class="qty-stepper">
              <button type="button" data-action="dec" aria-label="Decrease quantity">−</button>
              <span>${line.qty}</span>
              <button type="button" data-action="inc" aria-label="Increase quantity">+</button>
            </div>
            <span class="cart-item-price">$${(line.price * line.qty).toFixed(0)}</span>
          </div>
        </div>
        <button class="cart-item-remove" data-action="remove" aria-label="Remove ${escapeHtml(line.name)}">✕</button>
      `;
      row.querySelector('[data-action="dec"]').addEventListener("click", () => setQty(key, line.qty - 1));
      row.querySelector('[data-action="inc"]').addEventListener("click", () => setQty(key, line.qty + 1));
      row.querySelector('[data-action="remove"]').addEventListener("click", () => removeLine(key));
      cartItemsEl.appendChild(row);
    }
    cartSubtotalEl.textContent = `$${cartTotal().toFixed(0)}`;
  }

  // ---------- drawer open/close ----------
  function openCart() {
    cartDrawer.classList.add("is-open");
    cartOverlay.hidden = false;
    cartDrawer.setAttribute("aria-hidden", "false");
    document.documentElement.classList.add("cart-lock");
  }
  function closeCart() {
    cartDrawer.classList.remove("is-open");
    cartOverlay.hidden = true;
    cartDrawer.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("cart-lock");
  }
  cartToggle?.addEventListener("click", openCart);
  cartClose?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);

  // ---------- size pickers ----------
  document.querySelectorAll(".size-picker").forEach((picker) => {
    picker.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-size]");
      if (!btn) return;
      picker.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });

  // ---------- add to cart ----------
  document.querySelectorAll(".exhibit").forEach((exhibit) => {
    const btn = exhibit.querySelector(".add-to-cart");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const product = {
        id: exhibit.dataset.productId,
        name: exhibit.dataset.name,
        price: parseFloat(exhibit.dataset.price) || 0,
        img: exhibit.dataset.img
      };
      const sizeBtn = exhibit.querySelector(".size-picker .is-active");
      const size = sizeBtn ? sizeBtn.dataset.size : null;
      addToCart(product, size);

      const original = btn.textContent;
      btn.textContent = "Added ✓";
      btn.classList.add("is-added");
      window.setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove("is-added");
      }, 1200);

      openCart();
    });
  });

  // ---------- checkout ----------
  const checkoutOverlay = document.getElementById("checkout-overlay");
  const checkoutModal = document.getElementById("checkout-modal");
  const checkoutClose = document.getElementById("checkout-close");
  const checkoutBody = document.getElementById("checkout-body");

  function renderCheckout() {
    const c = (window.SITE_CONFIG && SITE_CONFIG.CHECKOUT) || {};
    const total = cartTotal();
    const orderLines = cart
      .map((l) => `${l.qty}x ${l.name}${l.size ? ` (${l.size})` : ""} - $${(l.price * l.qty).toFixed(0)}`)
      .join("\n");
    const orderText = `Order from the Harry After Dark shop:\n${orderLines}\nTotal: $${total.toFixed(0)}`;

    const methods = [];
    if (c.STRIPE_LINK) {
      methods.push(`<a class="checkout-method" href="${c.STRIPE_LINK}" target="_blank" rel="noopener noreferrer"><span>Pay with Card</span><small>Secure checkout via Stripe</small></a>`);
    }
    if (c.PAYPAL_LINK) {
      methods.push(`<a class="checkout-method" href="${c.PAYPAL_LINK}" target="_blank" rel="noopener noreferrer"><span>Pay with PayPal</span><small>Redirects to PayPal</small></a>`);
    }

    let fallback = "";
    if (methods.length === 0) {
      const igLink = c.CONTACT_INSTAGRAM || "https://www.instagram.com/";
      const mailLink = c.CONTACT_EMAIL
        ? `mailto:${c.CONTACT_EMAIL}?subject=${encodeURIComponent("Shop order — Harry After Dark")}&body=${encodeURIComponent(orderText)}`
        : null;
      fallback = `
        <p class="checkout-note">Card and PayPal checkout aren't connected yet. Send this order over and you'll get a secure payment link back.</p>
        <div class="checkout-methods">
          <a class="checkout-method" href="${igLink}" target="_blank" rel="noopener noreferrer"><span>DM on Instagram</span><small>Fastest way to order right now</small></a>
          ${mailLink ? `<a class="checkout-method" href="${mailLink}"><span>Email the order</span><small>${escapeHtml(c.CONTACT_EMAIL)}</small></a>` : ""}
        </div>
      `;
    }

    checkoutBody.innerHTML = `
      <div class="checkout-order">
        ${cart.map((l) => `<div class="checkout-line"><span>${l.qty}× ${escapeHtml(l.name)}${l.size ? ` · ${escapeHtml(l.size)}` : ""}</span><span>$${(l.price * l.qty).toFixed(0)}</span></div>`).join("")}
        <div class="checkout-line checkout-total"><span>Total</span><span>$${total.toFixed(0)}</span></div>
      </div>
      ${methods.length ? `<div class="checkout-methods">${methods.join("")}</div>` : ""}
      ${fallback}
    `;
  }

  function openCheckout() {
    if (cart.length === 0) return;
    renderCheckout();
    checkoutOverlay.hidden = false;
    checkoutModal.hidden = false;
    requestAnimationFrame(() => checkoutModal.classList.add("is-open"));
  }
  function closeCheckout() {
    checkoutModal.classList.remove("is-open");
    checkoutOverlay.hidden = true;
    checkoutModal.hidden = true;
  }
  checkoutBtn?.addEventListener("click", openCheckout);
  checkoutClose?.addEventListener("click", closeCheckout);
  checkoutOverlay?.addEventListener("click", closeCheckout);

  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeCheckout();
    closeCart();
  });

  // ---------- hover zoom on product stages (fine pointer + hover only) ----------
  const canHoverZoom =
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (canHoverZoom) {
    document.querySelectorAll(".exhibit-stage").forEach((stage) => {
      stage.classList.add("zoomable");
      stage.addEventListener("pointermove", (e) => {
        const rect = stage.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        stage.style.setProperty("--zx", `${x.toFixed(1)}%`);
        stage.style.setProperty("--zy", `${y.toFixed(1)}%`);
      });
    });
  }

  renderCart();
})();
