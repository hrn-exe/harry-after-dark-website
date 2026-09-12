/*
 * Seed archive — the channel's real uploads at time of build.
 * New uploads are merged in on top of this list at runtime by app.js
 * (see fetchLiveFeed). Safe to hand-edit: add an object to the top
 * of SEED_VIDEOS any time and it will appear immediately, no rebuild.
 *
 * `local: true` means the thumbnail lives in assets/thumbs/<id>.jpg
 * (already downloaded for you). Videos discovered later by the live
 * sync don't have a local file, so they load their thumbnail straight
 * from YouTube instead — see thumbFor() in app.js.
 */
const SEED_VIDEOS = [
  { id: "dtat8PoL_8k", case: 189, title: "10 REAL Paranormal Moments Captured on Camera!", views: "1.9K", viewsN: 1900, when: "2 days ago", duration: "28:14", local: true },
  { id: "Hyu0FzwOjZw", case: 188, title: "9 Paranormal Videos Caught on Camera!", views: "5K", viewsN: 5000, when: "7 days ago", duration: "25:01", local: true },
  { id: "RyNUJUAtRiU", case: 187, title: "10 REAL Scary Videos That Were Caught on Camera!", views: "13K", viewsN: 13000, when: "12 days ago", duration: "31:26", local: true },
  { id: "W545UZcXf-g", case: 186, title: "10 REAL SCARY Videos That Shouldn't be Possible!", views: "44K", viewsN: 44000, when: "2 weeks ago", duration: "34:10", local: true },
  { id: "sAt0AmKqCCM", case: 185, title: "27 REAL Paranormal Videos Caught on Camera! | SCARY COMP", views: "122K", viewsN: 122000, when: "3 weeks ago", duration: "1:01:28", local: true },
  { id: "fHgJhbkypE4", case: 184, title: "5 Real Paranormal Attacks That Were Caught On Camera", views: "19K", viewsN: 19000, when: "3 weeks ago", duration: "33:16", local: true },
  { id: "Uz0gT_UYk_c", case: 183, title: "10 Real SCARY Moments Caught on Camera!", views: "74K", viewsN: 74000, when: "3 weeks ago", duration: "28:41", local: true },
  { id: "DhWJUcOFQGY", case: 182, title: "10 REAL Scariest Videos From Actual Camera Footage!", views: "15K", viewsN: 15000, when: "4 weeks ago", duration: "31:04", local: true },
  { id: "Drs-vJYIUjU", case: 181, title: "5 Scary Darkest Videos Caught on Camera!", views: "8.3K", viewsN: 8300, when: "1 month ago", duration: "26:21", local: true },
  { id: "O-P-XC3_JOQ", case: 180, title: "5 Real Paranormal Moments Captured on Camera!", views: "15K", viewsN: 15000, when: "1 month ago", duration: "22:36", local: true },
  { id: "GOLZ2VINY6w", case: 179, title: "9 REAL PARANORMAL Videos Caught on Camera!", views: "4K", viewsN: 4000, when: "1 month ago", duration: "25:01", local: true },
  { id: "BJ16h41Ku2w", case: 178, title: "10 REAL Paranormal Moments Caught on Camera!", views: "49K", viewsN: 49000, when: "1 month ago", duration: "24:20", local: true },
  { id: "lKUQNYsUjPg", case: 177, title: "10 PARANORMAL MOMENTS Captured on Camera!", views: "29K", viewsN: 29000, when: "1 month ago", duration: "25:38", local: true },
  { id: "fWnO1sKDvIo", case: 176, title: "20 Scary Videos That Even Skeptics Can't Explain!", views: "48K", viewsN: 48000, when: "1 month ago", duration: "54:24", local: true },
  { id: "F9KcZb1uNm8", case: 175, title: "10 Scary Videos That Shouldn't Be Possible!", views: "9.4K", viewsN: 9400, when: "1 month ago", duration: "30:36", local: true },
  { id: "Mdor1fvW3UY", case: 174, title: "10 MOST Disturbing Videos Ever Recorded!", views: "2.3K", viewsN: 2300, when: "1 month ago", duration: "24:28", local: true },
  { id: "0gSAI35GWLg", case: 173, title: "10 SCARIEST Ghost Videos Of ALL TIME!", views: "3.2K", viewsN: 3200, when: "1 month ago", duration: "23:28", local: true },
  { id: "dwU08NIz7ns", case: 172, title: "10 SCARY Ghost Videos I'm Sorry You Had To See!", views: "2.6K", viewsN: 2600, when: "1 month ago", duration: "24:26", local: true },
  { id: "M79Ppy7FvTw", case: 171, title: "10 Scary Videos That Broke The Internet!", views: "25K", viewsN: 25000, when: "1 month ago", duration: "21:08", local: true },
  { id: "o0E107cGpjg", case: 170, title: "10 SCARIEST Videos That Shouldn't be Possible!", views: "7.1K", viewsN: 7100, when: "2 months ago", duration: "30:09", local: true },
  { id: "CmhOLogyhjo", case: 169, title: "30 SCARY Videos That Shocked Everyone!", views: "133K", viewsN: 133000, when: "2 months ago", duration: "1:07:30", local: true },
  { id: "WkDcXtTFtAo", case: 168, title: "10 REAL Scary Videos Caught on Camera!", views: "6.8K", viewsN: 6800, when: "2 months ago", duration: "23:12", local: true },
  { id: "KnIGmaZbeb8", case: 167, title: "10 Scary Videos Found On The Internet!", views: "132K", viewsN: 132000, when: "2 months ago", duration: "31:09", local: true },
  { id: "W6C3vTx-cCE", case: 166, title: "10 Scary Videos That Nobody Wanted To Believe!", views: "55K", viewsN: 55000, when: "2 months ago", duration: "25:13", local: true },
  { id: "EyOJ-lu1Cro", case: 165, title: "10 Scary Videos You Won't Forget Anytime Soon!", views: "30K", viewsN: 30000, when: "2 months ago", duration: "28:32", local: true },
  { id: "8-qbyPf80Hk", case: 164, title: "10 SCARY Ghost Videos That Are Seriously Unsettling!", views: "6.7K", viewsN: 6700, when: "2 months ago", duration: "21:47", local: true },
  { id: "CbBNLTUq3BM", case: 163, title: "10 Scary Videos Hidden Deep On The Internet!", views: "11K", viewsN: 11000, when: "2 months ago", duration: "25:53", local: true },
  { id: "DwD2vZjplpI", case: 162, title: "10 Scary Videos That The Internet Can't Forget!", views: "127K", viewsN: 127000, when: "2 months ago", duration: "27:52", local: true },
  { id: "dhHXD5s2ybY", case: 161, title: "10 Scariest Videos That Will Ruin Your Sleep!", views: "10K", viewsN: 10000, when: "2 months ago", duration: "25:49", local: true },
  { id: "rqdhaGXTWkc", case: 160, title: "20 REAL GHOST Videos That Still Haunt Viewers", views: "294K", viewsN: 294000, when: "2 months ago", duration: "1:02:13", local: true }
];
