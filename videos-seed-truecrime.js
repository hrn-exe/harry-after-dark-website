/*
 * Cold Case Files — the channel's original true-crime era, before the
 * pivot to paranormal/CCTV content. Numbered #001 upward in the order
 * they were originally uploaded, separate from the CASE No. sequence
 * used in the main Archive.
 */
const TRUE_CRIME_VIDEOS = [
  { id: "sleRXTHfL70", case: 1, title: "Death of Kris Kremers and Lisanne Froon | Documentary Part 1", views: "1.9K", viewsN: 1900, when: "3 years ago", duration: "4:21", local: true },
  { id: "YkYCTr1V4gI", case: 2, title: "Death of Kris Kremers and Lisanne Froon | Documentary Part 2", views: "505", viewsN: 505, when: "3 years ago", duration: "4:52", local: true },
  { id: "nJ8g9FaGi_U", case: 3, title: "Death of Kris Kremers and Lisanne Froon | What Most Likely Happened", views: "1.8K", viewsN: 1800, when: "3 years ago", duration: "9:38", local: true },
  { id: "SyMF_4q4jwA", case: 4, title: "The Kalecia Williams Story | Murdered While Filming TikTok", views: "2.1K", viewsN: 2100, when: "3 years ago", duration: "5:21", local: true },
  { id: "OJLh3_lXmVQ", case: 5, title: "The Horrific Murder of Seath Jackson | Bitter Story of Seath Jackson", views: "9.1K", viewsN: 9100, when: "3 years ago", duration: "21:19", local: true },
  { id: "tIsDuzQpDGo", case: 6, title: "The Tragic Case of Sasha Samsudean | The Chilling Story", views: "5.6K", viewsN: 5600, when: "3 years ago", duration: "28:41", local: true },
  { id: "wHLPeSgGEsM", case: 7, title: "The Tragic Case of Tierra Hall | Final Moments Caught on Camera", views: "3.4K", viewsN: 3400, when: "2 years ago", duration: "11:06", local: true },
  { id: "Uo__21brAik", case: 8, title: "The Tragic Case of Dena Thompson | True Crime Documentary", views: "807", viewsN: 807, when: "2 years ago", duration: "16:10", local: true },
  { id: "0oNf4dacfTk", case: 9, title: "The Tragic Case of Larry Wells | Mysterious Death of a Toys R Us Manager", views: "747", viewsN: 747, when: "2 years ago", duration: "15:00", local: true },
  { id: "loz221M23x8", case: 10, title: "The Tragic Case of Tatsuya Ichihashi | Japan's Most Handsome Criminal", views: "178K", viewsN: 178000, when: "2 years ago", duration: "19:16", local: true },
  { id: "sR2x1uUDXR8", case: 11, title: "The Tragic Case of Anna and Ali Abulaban | True Crime Documentary", views: "425", viewsN: 425, when: "2 years ago", duration: "18:31", local: true },
  { id: "4ScAf-Nc19A", case: 12, title: "She Was Held Captive For 9 Years — The Fusako Sano Case in Detail", views: "475", viewsN: 475, when: "2 years ago", duration: "20:53", local: true },
  { id: "_-NVsvMtuoA", case: 13, title: "The Murderer Who Used 18 False Identities...", views: "128", viewsN: 128, when: "2 years ago", duration: "20:36", local: true },
  { id: "VvR_hMNEDkU", case: 14, title: "The Japanese Millionaire Who Killed an Innocent Girl | Joji Obara", views: "530", viewsN: 530, when: "2 years ago", duration: "19:27", local: true },
  { id: "KQYXEnmo5TI", case: 15, title: "She Stabbed Her Girlfriend 46 Times..!", views: "200", viewsN: 200, when: "2 years ago", duration: "23:19", local: true },
  { id: "8CSELoNYmHQ", case: 16, title: "Missing Woman Found Dead | 5 Insane Mysterious Cases You Won't Believe", views: "191", viewsN: 191, when: "2 years ago", duration: "1:49:03", local: true },
  { id: "3fWCNu3u9SI", case: 17, title: "5 Most Twisted Cold Cases Finally Solved After Decades", views: "1.3K", viewsN: 1300, when: "2 years ago", duration: "20:20", local: true },
  { id: "4aNEh0BX42o", case: 18, title: "Teen Daughter Kills Her Mother With a Frying Pan | True Crime Documentary", views: "791", viewsN: 791, when: "2 years ago", duration: "19:55", local: true },
  { id: "lBek6HSiqfc", case: 19, title: "Girl Convicted of Killing Her Own Boyfriend | Crime Caught on CCTV", views: "359", viewsN: 359, when: "2 years ago", duration: "42:10", local: true },
  { id: "ZUyJEDZieIg", case: 20, title: "Greedy Son Cooks Up His Parents | True Crime Documentary", views: "313", viewsN: 313, when: "2 years ago", duration: "21:33", local: true },
  { id: "--FKqOSuH1c", case: 21, title: "Horrible Massacre of His Family | The Tragic Case of the Lissy Family", views: "319", viewsN: 319, when: "2 years ago", duration: "21:34", local: true },
  { id: "PzBP9TZRb88", case: 22, title: "The Disturbing Case of Kira Steger | True Crime Documentary", views: "170", viewsN: 170, when: "2 years ago", duration: "19:06", local: true },
  { id: "tuS174QkRyc", case: 23, title: "The Horrifying Case of Shauna Tiaffay | True Crime Documentary", views: "153", viewsN: 153, when: "2 years ago", duration: "18:01", local: true },
  { id: "3xAuzo71_V0", case: 24, title: "The Tragic Case of Marina Menegazzo and Maria Jose Coni", views: "525", viewsN: 525, when: "2 years ago", duration: "15:15", local: true },
  { id: "rO9Hrj94bMA", case: 25, title: "Detectives Stunned to Encounter Anything Like This | True Crime Documentary", views: "285", viewsN: 285, when: "2 years ago", duration: "14:26", local: true },
  { id: "vUa_B2ZXSHk", case: 26, title: "Johnia Berry's Suspected Killer Called Her Murder \"An Accident\"", views: "427", viewsN: 427, when: "2 years ago", duration: "16:45", local: true },
  { id: "p_IsuGYy73E", case: 27, title: "How Jeremy Bamber 'Sulking Like a Child' at the Funeral Exposed Him", views: "11K", viewsN: 11000, when: "2 years ago", duration: "18:48", local: true },
  { id: "BMG5-fQqlHs", case: 28, title: "2 Cases With the Most Insane Twists That Will Shock You", views: "460", viewsN: 460, when: "2 years ago", duration: "37:04", local: true },
  { id: "R53ljOcG2xw", case: 29, title: "Amanda Blackburn, 12 Weeks Pregnant, Died at a Local Hospital", views: "980", viewsN: 980, when: "2 years ago", duration: "16:02", local: true },
  { id: "iwXiioLEpsw", case: 30, title: "Heather Mack, Who Murdered and Stuffed Her Mother in a Suitcase", views: "116", viewsN: 116, when: "2 years ago", duration: "22:25", local: true }
];
