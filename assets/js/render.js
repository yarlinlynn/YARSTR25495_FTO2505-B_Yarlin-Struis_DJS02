import { podcasts, genres, seasons } from "./data.js";
import { linkPodcasts } from "./helper.js";
import { timeAgo } from "./helper.js";

export function renderPodcasts(podcasts, containerId = "podcast-list") {
  const container = document.getElementById(containerId);

  container.innerHTML = podcasts.map(p => `
    <section class="podcast-card">
      <img src="${p.image}" alt="${p.title} image">
      <h1 class="title">${p.title}</h1>
      <div class="podcast-info">
        <p class="podcast-season">Season ${p.seasons}</p>
        <p class="date">Updated: <span>${p.updated ? timeAgo(p.updated) : "Unknown"}</span></p>
      </div>
      <div class="genres-list">
        ${p.genreTitles.map(g => `<span>${g}</span>`).join("")}
      </div>
    </section>
  `).join("");
}

