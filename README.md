# Harry After Dark — Official Archive

A dark, CCTV-styled companion site for the **Harry After Dark** YouTube channel
(19.3K subscribers, 189 videos at time of writing). Built with plain HTML/CSS/JS —
no build step, no framework, works anywhere that serves static files.

## What's in here

- `index.html` — the whole page
- `style.css` — the visual design (dark surveillance/case-file theme)
- `app.js` — rendering, search/sort, live-clock, flashlight cursor, auto-update, giscus loader
- `config.js` — your channel ID, optional API key, and giscus (Community) config
- `videos-seed.js` — 30 real Paranormal-era videos, hand-editable
- `videos-seed-truecrime.js` — 30 real True-Crime-era videos (your channel's original
  content before the pivot), numbered as its own Cold Case sequence
- `404.html` — on-brand "tape not found" page GitHub Pages shows for bad links
- `assets/` — your real avatar, banner, and thumbnails (downloaded locally so the
  site never depends on hotlinked images going stale) — `thumbs/` for Paranormal,
  `thumbs-tc/` for True Crime

## The Archive: two eras, one grid

A pill switch above the video grid ("Paranormal" / "True Crime") swaps between
`videos-seed.js` and `videos-seed-truecrime.js` — same search/sort controls,
different accent color and case-numbering style so it's visually obvious which
era you're browsing. Only Paranormal ever gets new entries from the live sync,
since that's what you're actively uploading now.

## Shop

A merch preview section ("Evidence Locker") with three CSS/SVG-mocked-up
products — a tee, joggers, and a mug — all carrying your avatar mark and
"Something's Wrong". There's no real checkout wired up (that needs a store
provider like Shopify, Printful, or Fourthwall), so the buttons currently point
to your Instagram as a "notify me" placeholder. Swap those `href`s in
`index.html` (search for `#shop`) once you pick a print-on-demand provider.

## Community

The Community tab is real, working comments + reactions, powered by
[giscus](https://giscus.app) — it stores every post as a GitHub Discussion on
*this* repo, completely free, no database to run. 👍/👎 reactions on posts work
as upvote/downvote. Visitors sign in with their own GitHub account to post.

This only works because:
1. Discussions is enabled on this repo (already done)
2. The [giscus GitHub App](https://github.com/apps/giscus) is installed on this
   repo specifically (you did this — if comments ever stop working, check it's
   still installed under your GitHub account's Settings → Applications)

If you ever fork this to a different repo, redo both steps and update the
`GISCUS` block in `config.js` with the new repo's id/category id (get them from
<https://giscus.app> — it has a config generator that fills these in for you).

## How the "auto-updates when I upload" part works

`app.js` reads your channel's public YouTube upload feed
(`https://www.youtube.com/feeds/videos.xml?channel_id=...`) every time someone
loads the page (and again every 10 minutes while it's open), and adds any video
it hasn't seen yet to the top of the Case Files grid — **automatically, with zero
setup**, once this is hosted on a real domain (GitHub Pages, Netlify, Vercel,
your own server, etc.). It won't work opened as a local `file://` page or inside
a sandboxed preview — browsers block that kind of cross-site request there.

This uses a public CORS proxy (`api.allorigins.win`) since YouTube's own feed
doesn't allow direct browser fetches. It's fine for a low-traffic channel site,
but proxies can occasionally be slow or rate-limited.

### Optional upgrade: official YouTube Data API

For more reliable syncing and a **"Load More"** button that browses your entire
back catalog (all 189+ videos, not just the ~15 most recent):

1. Go to <https://console.cloud.google.com/apis/credentials>
2. Create a project (or use an existing one) → enable **YouTube Data API v3**
3. Create an **API key**, restrict it to YouTube Data API v3
4. Paste it into `config.js`:
   ```js
   YT_API_KEY: "YOUR_KEY_HERE",
   ```

Without a key, everything still works fine — the Load More button just stays
hidden, and new uploads still appear automatically via the feed method above.

## Deploying it

Any static host works. Easiest options:

**GitHub Pages**
```bash
git init
git add .
git commit -m "Harry After Dark website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
Then in the repo settings, enable Pages for the `main` branch.

**Netlify / Vercel** — drag-and-drop the `harry-after-dark-website` folder onto
either dashboard, or connect the repo. No build command needed.

## Editing the video archive by hand

Open `videos-seed.js` and add an object to the top of the array:

```js
{ id: "VIDEO_ID", case: 190, title: "Your Title", views: "1.2K", viewsN: 1200, when: "just now", duration: "24:00", local: false }
```

`id` is the part after `?v=` in the YouTube URL. Leave `local: false` (or omit
it) so its thumbnail loads straight from YouTube instead of expecting a local file.

## Social links already wired up

- YouTube: `youtube.com/@HarryAfterDark`
- Instagram: `instagram.com/harryafterdarkk`
- X: `x.com/HarryAfterDarkk`
