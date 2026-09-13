/*
 * Site configuration for the Harry After Dark auto-updating archive.
 *
 * Works out of the box with zero setup: CHANNEL_ID below is already
 * set to your real channel, and the site polls your public upload
 * feed on every page load, so a new video you post to YouTube shows
 * up here automatically the next time someone opens the site.
 *
 * Optional upgrade: paste a free YouTube Data API v3 key into
 * YT_API_KEY to unlock the "load more" button, which browses your
 * FULL back catalog (all 189+ videos) instead of just the ~15 most
 * recent. Get a key at https://console.cloud.google.com/apis/credentials
 * after enabling "YouTube Data API v3" on a project. Without a key,
 * everything still works — that button just stays hidden.
 */
const SITE_CONFIG = {
  CHANNEL_ID: "UC3d7CVO4xmyWt35LCXMKLXg",
  UPLOADS_PLAYLIST_ID: "UU3d7CVO4xmyWt35LCXMKLXg",
  YT_API_KEY: "", // optional, see note above
  RSS_URL: "https://www.youtube.com/feeds/videos.xml?channel_id=UC3d7CVO4xmyWt35LCXMKLXg",
  RSS_PROXY: "https://api.allorigins.win/raw?url=",

  /*
   * Checkout. The cart itself (add/remove/quantities) is fully live —
   * that's just local state, no backend needed. Actually TAKING payment
   * is different: this is a static site with no server, so it can never
   * safely collect a card number itself (that needs a PCI-compliant
   * backend). The honest, standard way static sites take real payments
   * is by sending the shopper to a page a real processor hosts for you.
   *
   * Fill in either (or both) of these once you've set one up, and the
   * matching button in the checkout panel goes live automatically:
   *
   * STRIPE_LINK — a Stripe Payment Link. Free Stripe account →
   *   dashboard.stripe.com/payment-links → create one per product (or
   *   one link that lets the buyer adjust quantity) → paste the URL.
   *   Stripe hosts the actual card form; you never touch card data.
   *   https://stripe.com/docs/payment-links
   *
   * PAYPAL_LINK — a PayPal.me link (paypal.me/yourname) or a PayPal
   *   "Buy Now" button URL from your PayPal Business account.
   *
   * Until you add one, the Checkout panel is honest about it: it shows
   * the order + total and offers to send it to you as a DM/email
   * instead of pretending a payment went through.
   */
  CHECKOUT: {
    STRIPE_LINK: "",
    PAYPAL_LINK: "",
    CONTACT_INSTAGRAM: "https://www.instagram.com/harryafterdarkk/",
    CONTACT_EMAIL: ""
  }
};
