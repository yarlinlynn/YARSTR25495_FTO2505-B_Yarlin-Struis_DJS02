import { podcasts, genres, seasons } from "./data.js";
import { linkPodcasts, timeAgo } from "./helper.js";
import { buildModal } from "./model.js";

/**
 * Renders a list of podcasts as HTML cards within a specified container.
 *
 * @param {Object[]} podcasts - Array of podcast objects, each containing properties like `id`, `image`, `title`, `seasons`, `updated`, and `genreTitles`.
 * @param {string} [containerId="podcast-list"] - The ID of the HTML element where the podcast cards will be rendered.
 */
// export function renderPodcasts(podcasts, containerId = "podcast-list") {
//   const container = document.getElementById(containerId);

//   container.innerHTML = podcasts.map(p => `
//     <section class="podcast-card" data-id="${p.id}">
//       <img src="${p.image}" alt="${p.title} image">
//       <h1 class="title">${p.title}</h1>
//       <div class="podcast-info">
//         <p class="podcast-season">Season ${p.seasons}</p>
//         <p class="date">Updated: <span>${p.updated ? timeAgo(p.updated) : "Unknown"}</span></p>
//       </div>
//       <div class="genres-list">
//         ${p.genreTitles.map(g => `<span>${g}</span>`).join("")}
//       </div>
//     </section>
//   `).join("");
// }

export class PodcastList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = []; 
  }

  set data(linkedData) {
    this._data = linkedData;
    this.render();
  }

  get data() {
    return this._data;
  }

  // set data(linkedData) {
  //   this._data = linkedData;
  //   this.render();
  // }

  // get data() {
  //   return this._data;
  // }
  
  // connectedCallback() {
  //   // link podcasts, genres, seasons to create to web component
  //   this.data = linkPodcasts(podcasts, genres, seasons);
  //   // responsible for rendering your HTML/CSS into the component’s shadow DOM.
  //   this.render();
  // }

  // attaches a click event listener to the component
    connectedCallback() {
      this.shadowRoot.addEventListener("click", event => {
        const card = event.target.closest(".podcast-card");
        if (!card) return;

        const podcastId = card.dataset.id;
        const podcast = this._data.find(p => p.id === podcastId);
        if (podcast) {
          const modal = buildModal(podcast);
          document.body.appendChild(modal);
        } 
      })
    }


  // maps through the data which is linked all the data together to use to create custom html web component
  render() {
    if (!this._data) {
      this.shadowRoot.innerHTML = `<p>No podcasts found.</p>`;
      return;
    } 

    this.shadowRoot.innerHTML = `
      <style>
        .podcast-card {
          border: 1px solid white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px 10px #342c2c;
          cursor: pointer;
          transition: transform 0.2s;    
        }

        .podcast-img {
          width: 100%;
          border-radius: 6px;
        }

        .podcast-season {
          margin: 0px;
          font-size: 0.8rem;
          color: var(--grey-text);
        }

        .genres-list { margin: 0.5rem 0; }

        .genres-list span {
          border: 1px solid white;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 10px;
          background: white;
          color: black;
          margin-right: 0.5rem;
        }

        .date {
          margin-inline: 1rem;
          color: lightgrey;
        }
      </style>

      ${this._data.map(podcast => `
      <section class="podcast-card" data-id="${podcast.id}">
        <img class="podcast-img" src="${podcast.image}" alt="${podcast.title}"/>
        <h2 class="title">${podcast.title}</h2>
        <p class="podcast-season">Season ${podcast.seasons}</p>
        <div class="genres-list">
          ${podcast.genreTitles.map(item => `<span>${item}</span>`).join("")}
        </div>
        <p class="date">Updated: <span>${podcast.updated ? timeAgo(podcast.updated) : "Unknown"}</span></p>
      </section>
    `).join("")}
    `;
  }

  
}




