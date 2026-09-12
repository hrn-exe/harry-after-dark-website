(() => {
  "use strict";

  const state = {
    paranormal: SEED_VIDEOS.slice(),
    trueCrime: TRUE_CRIME_VIDEOS.slice(),
    category: "paranormal",
    sort: "latest",
    query: "",
    nextPageToken: null
  };

  const grid = document.getElementById("archive-grid");
  const emptyState = document.getElementById("archive-empty");
  const countBadge = document.getElementById("archive-count");
  const loadMoreBtn = document.getElementById("load-more");
  const liveDot = document.getElementById("live-dot");
  const liveNote = document.getElementById("live-note");
  const liveSyncRow = document.getElementById("live-sync-row");
  const archiveHeading = document.getElementById("archive-heading");
  const archiveSearch = document.getElementById("archive-search");

  function activeList() {
    return state.category === "truecrime" ? state.trueCrime : state.paranormal;
  }

  // ---------- clock overlay (mirrors the CCTV timestamp burn-in on the real thumbnails) ----------
  function tickClock() {
    const el = document.getElementById("hero-clock");
    if (!el) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    let h = now.getHours();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const stamp = `${pad(h)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}  ${pad(now.getMonth() + 1)}/${pad(now.getDate())}/${now.getFullYear()}`;
    el.textContent = stamp;
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ---------- flashlight cursor over the hero ----------
  const hero = document.getElementById("hero");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hero && !reduceMotion) {
    hero.addEventListener("pointermove", (e) => {
      const rect = hero.getBoundingClientRect();
      hero.style.setProperty("--x", `${e.clientX - rect.left}px`);
      hero.style.setProperty("--y", `${e.clientY - rect.top}px`);
    });
  }

  // ---------- marquee: always the ongoing paranormal feed, regardless of archive tab ----------
  function buildMarquee() {
    const track = document.getElementById("marquee-track");
    if (!track) return;
    const titles = state.paranormal.slice(0, 12).map((v) => `CASE No.${v.case} — ${v.title}`);
    const html = titles.map((t) => `<span>${escapeHtml(t)}</span>`).join('<span class="dot">●</span>');
    track.innerHTML = html + '<span class="dot">●</span>' + html;
  }

  // ---------- helpers ----------
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function thumbFor(v) {
    if (v.local) {
      const dir = state.category === "truecrime" ? "assets/thumbs-tc" : "assets/thumbs";
      return `${dir}/${v.id}.jpg`;
    }
    return `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
  }

  function watchUrl(id) {
    return `https://www.youtube.com/watch?v=${id}`;
  }

  function caseLabel(v) {
    return state.category === "truecrime"
      ? `COLD CASE #${String(v.case).padStart(3, "0")}`
      : `CASE №${v.case}`;
  }

  // ---------- render ----------
  function render() {
    const q = state.query.trim().toLowerCase();
    let list = activeList().filter((v) => v.title.toLowerCase().includes(q));

    if (state.sort === "popular") {
      list = list.slice().sort((a, b) => (b.viewsN || 0) - (a.viewsN || 0));
    } else if (state.sort === "oldest") {
      list = list.slice().sort((a, b) => a.case - b.case);
    } else {
      list = list.slice().sort((a, b) => b.case - a.case);
    }

    grid.innerHTML = "";
    emptyState.hidden = list.length !== 0;
    const isTC = state.category === "truecrime";

    for (const v of list) {
      const card = document.createElement("a");
      card.className = isTC ? "tape-card tape-card--tc" : "tape-card";
      card.href = watchUrl(v.id);
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.innerHTML = `
        <div class="tape-thumb">
          <img src="${thumbFor(v)}" alt="" loading="lazy" width="336" height="188">
          <span class="tape-duration">${v.duration ? escapeHtml(v.duration) : "NEW"}</span>
          <span class="tape-case">${caseLabel(v)}</span>
          <span class="tape-play" aria-hidden="true">▶</span>
        </div>
        <div class="tape-meta">
          <h3>${escapeHtml(v.title)}</h3>
          <p>${v.views ? escapeHtml(v.views) + " views" : "Just posted"} · ${escapeHtml(v.when || "")}</p>
        </div>
      `;
      grid.appendChild(card);
    }

    countBadge.textContent = isTC
      ? `${state.trueCrime.length} logged locally · ~100 total from the true-crime era`
      : `${state.paranormal.length} logged locally · 189 total on the channel`;
  }

  // ---------- category switch ----------
  document.querySelectorAll(".category-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-pill").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.category = btn.dataset.cat;
      const isTC = state.category === "truecrime";
      archiveHeading.textContent = isTC ? "Cold Case Files" : "Case Files";
      archiveSearch.placeholder = isTC ? "Search cold cases…" : "Search case files…";
      liveSyncRow.hidden = isTC;
      if (loadMoreBtn) loadMoreBtn.hidden = isTC || !SITE_CONFIG.YT_API_KEY;
      render();
    });
  });

  // ---------- controls ----------
  document.querySelectorAll(".sort-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sort-tab").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.sort = btn.dataset.sort;
      render();
    });
  });

  if (archiveSearch) {
    archiveSearch.addEventListener("input", (e) => {
      state.query = e.target.value;
      render();
    });
  }

  // ---------- live auto-update: pulls your public upload feed, no API key required ----------
  // Only ever touches the Paranormal list — that's the content you're still uploading.
  function parseRssMinutesAgo(pubDate) {
    const then = new Date(pubDate).getTime();
    const diffMs = Date.now() - then;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 60) return `${Math.max(mins, 1)} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
  }

  async function fetchLiveFeed() {
    if (typeof SITE_CONFIG === "undefined" || !SITE_CONFIG.RSS_URL) return;
    try {
      const proxied = SITE_CONFIG.RSS_PROXY + encodeURIComponent(SITE_CONFIG.RSS_URL);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(proxied, { cache: "no-store", signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error(`feed responded ${res.status}`);
      const text = await res.text();
      const xml = new DOMParser().parseFromString(text, "text/xml");
      const entries = [...xml.getElementsByTagName("entry")];
      const known = new Set(state.paranormal.map((v) => v.id));
      let added = 0;
      const topCase = state.paranormal.reduce((m, v) => Math.max(m, v.case), 0);

      entries.forEach((entry, i) => {
        const videoId = entry.getElementsByTagName("yt:videoId")[0]?.textContent;
        if (!videoId || known.has(videoId)) return;
        const title = entry.getElementsByTagName("title")[0]?.textContent || "Untitled";
        const published = entry.getElementsByTagName("published")[0]?.textContent;
        state.paranormal.unshift({
          id: videoId,
          case: topCase + (entries.length - i),
          title,
          views: "",
          viewsN: 0,
          when: published ? parseRssMinutesAgo(published) : "just now",
          duration: null,
          local: false
        });
        known.add(videoId);
        added++;
      });

      if (added > 0) {
        liveDot?.classList.add("is-live");
        if (liveNote) liveNote.textContent = `${added} new upload${added > 1 ? "s" : ""} just synced from YouTube.`;
        buildMarquee();
        if (state.category === "paranormal") render();
      } else {
        liveDot?.classList.add("is-live");
        if (liveNote) liveNote.textContent = "You're all caught up — feed checked just now.";
      }
    } catch (err) {
      if (liveNote) liveNote.textContent = "Live sync unavailable in this preview (needs to run on a real domain).";
    }
  }

  // ---------- optional: full back-catalog pagination via YouTube Data API ----------
  async function loadMoreFromApi() {
    if (!SITE_CONFIG.YT_API_KEY || state.category !== "paranormal") return;
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "LOADING…";
    try {
      const params = new URLSearchParams({
        part: "snippet,contentDetails",
        maxResults: "18",
        playlistId: SITE_CONFIG.UPLOADS_PLAYLIST_ID,
        key: SITE_CONFIG.YT_API_KEY
      });
      if (state.nextPageToken) params.set("pageToken", state.nextPageToken);
      const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`);
      const data = await res.json();
      const known = new Set(state.paranormal.map((v) => v.id));
      const topCase = state.paranormal.reduce((m, v) => Math.min(m, v.case), 999999);
      let i = 0;
      for (const item of data.items || []) {
        const id = item.contentDetails.videoId;
        if (known.has(id)) continue;
        i++;
        state.paranormal.push({
          id,
          case: topCase - i,
          title: item.snippet.title,
          views: "",
          viewsN: 0,
          when: new Date(item.contentDetails.videoPublishedAt).toLocaleDateString(),
          duration: null,
          local: false
        });
        known.add(id);
      }
      state.nextPageToken = data.nextPageToken || null;
      render();
    } catch (err) {
      // stay quiet; button just resets so the user can retry
    } finally {
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = state.nextPageToken ? "LOAD MORE FROM THE ARCHIVE" : "THAT'S EVERYTHING";
    }
  }

  if (loadMoreBtn && SITE_CONFIG.YT_API_KEY) {
    loadMoreBtn.hidden = false;
    loadMoreBtn.addEventListener("click", loadMoreFromApi);
  }

  // ---------- boot ----------
  buildMarquee();
  render();
  fetchLiveFeed();
  setInterval(fetchLiveFeed, 10 * 60 * 1000);
})();
