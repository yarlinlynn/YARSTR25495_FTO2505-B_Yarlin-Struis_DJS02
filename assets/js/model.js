import { formatDate } from "./helper.js";

/**
 * Builds a modal for a podcast, displaying its details such as title, description, genres, update date, and season information.
 *
 * @param {Object} podcast - The podcast object containing properties like `id`, `title`, `description`, `image`, `updated`, `genreTitles`, and `seasonDetails`.
 * @param {string} podcast.id - The unique identifier of the podcast.
 * @param {string} podcast.title - The title of the podcast.
 * @param {string} [podcast.description] - The description of the podcast (optional).
 * @param {string} podcast.image - The URL of the podcast's image.
 * @param {string} [podcast.updated] - The ISO date string of the last update (optional).
 * @param {string[]} [podcast.genreTitles] - Array of genre titles (optional).
 * @param {Object[]} [podcast.seasonDetails] - Array of season objects, each with an `episodes` property (optional).
 * @returns {HTMLElement} The constructed modal section element, ready to be appended to the DOM.
 */
export function buildModal(podcast) {
  const section = document.createElement("section");
  section.id = "podcast-modal";
  section.style.display = "block";

  section.innerHTML = `
    <!-- Backdrop -->
    <div class="backdrop"></div>
    
    <div id="modal">
      <div class="model-container">
        <i class="ri-close-circle-fill"></i> <!-- close button -->
      <h2>${podcast.title}</h2>

      <img src="${podcast.image}" alt="${podcast.title} image">

      <p class="descriptive-text">
          ${podcast.description || "No description available"}
      </p>
            
      <h3 class="genre-title">Genres:</h3>
      <div class="genres-container">
        ${(podcast.genreTitles || [])
          .map(g => `<span>${g}</span>`)
           .join("")}
      </div>

      <p class="date">Updated: <span>${formatDate(podcast.updated)}</span></p>


      <div class="seasons-container">
        <h3>Season</h3>
        <ul>
          ${(podcast.seasonDetails || [])
            .map(
              (season, i) => `
          <li>
            <div class="season-details">
              <p class="seasons-count">Season ${i + 1}</p>
                <span class="episode-count">${season.episodes} episodes</span>
              </div>
          </li>
          `
          )
            .join("")}
        </ul>
      </div>
    </div>
  `;

  // Close modal (icon or backdrop click)
  const closeBtn = section.querySelector(".ri-close-circle-fill");
  const backdrop = section.querySelector(".backdrop");

  function close() {
    section.remove();
  }

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  return section;
}

/**
 * Attaches click event listeners to podcast cards to open a modal with podcast details.
 *
 * @param {Object[]} linkedData - Array of podcast objects, each containing properties like `id`, `title`, `description`, `image`, `updated`, `genreTitles`, and `seasonDetails`.
 * @param {string} [containerId="podcast-list"] - The ID of the HTML element containing podcast cards.
 */
// export function openModal(linkedData, containerId = "podcast-list") {
//   const container = document.getElementById(containerId);

//   container.addEventListener("click", e => {
//     const card = e.target.closest(".podcast-card");
//     if (!card) return;

//     const podcastId = card.dataset.id;
//     const podcast = linkedData.find(p => p.id === podcastId);

//     if (podcast) {
//       const modal = buildModal(podcast);
//       document.body.appendChild(modal);
//     }
//   });
// }

export function openModal(linkedData, containerSelector = "podcast-list") {
  const container = document.querySelector(containerSelector);

  container.addEventListener("click", e => {
    const card = e.target.closest(".podcast-card");
    if (!card) return;

    const podcastId = card.dataset.id;
    const podcast = linkedData.find(p => p.id === podcastId);

    if (podcast) {
      const modal = buildModal(podcast);
      document.body.appendChild(modal);
    }
  });
}