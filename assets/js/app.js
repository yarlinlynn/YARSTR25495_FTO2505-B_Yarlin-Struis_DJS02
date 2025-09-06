
import { linkPodcasts } from "./helper.js";
import { podcasts, genres, seasons } from "./data.js";

// Wait for the page to load.
document.addEventListener('DOMContentLoaded', () => {
  // Setup modal, filters, and initial render.
    linkPodcasts(podcasts, genres, seasons)
});

console.log( linkPodcasts(podcasts, genres, seasons) )