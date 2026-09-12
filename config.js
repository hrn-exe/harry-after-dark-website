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

  // Community tab (giscus — comments + 👍/👎 reactions, backed by GitHub
  // Discussions on this repo). Requires the giscus GitHub App to be
  // installed on the repo: https://github.com/apps/giscus
  GISCUS: {
    repo: "hrn-exe/harry-after-dark-website",
    repoId: "R_kgDOUYYD1g",
    category: "General",
    categoryId: "DIC_kwDOUYYD1s4DFeQ5"
  }
};
