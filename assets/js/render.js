import { podcasts, genres, seasons } from "./data.js";
import { linkPodcasts, timeAgo } from "./helper.js";
// import { timeAgo } from "./helper.js";

/**
 * Renders a list of podcasts as HTML cards within a specified container.
 *
 * @param {Object[]} podcasts - Array of podcast objects, each containing properties like `id`, `image`, `title`, `seasons`, `updated`, and `genreTitles`.
 * @param {string} [containerId="podcast-list"] - The ID of the HTML element where the podcast cards will be rendered.
 */
export function renderPodcasts(podcasts, containerId = "podcast-list") {
  const container = document.getElementById(containerId);

  container.innerHTML = podcasts.map(p => `
    <section class="podcast-card" data-id="${p.id}">
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

class PodcastList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  
  connectedCallback() {
    // link podcasts, genres, seasons to create to web component
    this.data = linkPodcasts(podcasts, genres, seasons);
    // responsible for rendering your HTML/CSS into the component’s shadow DOM.
    this.render();
  }

  // maps through the data which is linked all the data together to use to create custom html web component
  render() {
    this.shadowRoot.innerHTML = `
    
      ${this.data.map(podcast => `
      <section>
        
      </section>
      `).join("")}
    `;
  }

  
}

customElements.define("podcast-list", PodcastList);


