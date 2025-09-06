import { formatDate } from "./helper.js";

/**
 * Build the modal structure 
 */
function buildModal(podcast) {
  const section = document.createElement("section");
  section.id = "podcast-modal";
  section.style.display = "block";

  section.innerHTML = `
    <!-- Backdrop -->
    <div class="backdrop"></div>
    
    <div id="modal">
        <div class="header">
            <h2>${podcast.title}</h2>

            <!-- close button -->
            <i class="ri-close-circle-fill" style="cursor:pointer;"></i>
        </div>
      

        <div class="model-content">
            <img src="${podcast.image}" alt="${podcast.title} image">

            <h3 class="desc-title">Description:</h3>
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

        </div>

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
 * Add modal listeners on podcast cards
 */
export function openModal(linkedData, containerId = "podcast-list") {
  const container = document.getElementById(containerId);

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