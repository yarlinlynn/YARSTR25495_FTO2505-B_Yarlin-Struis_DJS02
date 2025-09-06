
import { linkPodcasts } from "./helper.js";
import { podcasts, genres, seasons } from "./data.js";
import { renderPodcasts } from "./render.js";
import { openModal } from "./model.js";
import { filterButtons } from "./filter.js";

// Wait for the page to load.
document.addEventListener('DOMContentLoaded', () => {
    const linkedData = linkPodcasts(podcasts, genres, seasons);
    console.log(linkedData);

    // 2. Render linked data
    renderPodcasts(linkedData);

    // Setup modal listeners
    openModal(linkedData);

    // Filter Buttons
    filterButtons(linkedData, genres);
});

