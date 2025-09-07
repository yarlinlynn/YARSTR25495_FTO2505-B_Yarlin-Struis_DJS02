
import { renderPodcasts } from "./render.js";
import { genres } from "./data.js";

/**
 * Set up and manages podcast filtering functionality by populating genre and update dropdowns,
 * and applying filters based on user selections.
 *
 * @param {Array<Object>} linkedData - Array of podcast objects, each containing properties like `genreTitles`, `updated`, and `seasons`.
 * @param {Array<Object>} genres - Array of genre objects, each with a `title` property.
 * @param {string} [containerId="podcast-list"] - The ID of the HTML element where filtered podcasts will be rendered.
 */
export function filterButtons (linkedData, genres, containerId = "podcast-list") {
  const genresSelect = document.getElementById("genres");
  const updatesSelect = document.getElementById("updates");

  // Populate genres dropdown
  genres.forEach(g => {
    const option = document.createElement("option");
    option.value = g.title;
    option.textContent = g.title;
    genresSelect.appendChild(option);
  });

  // Populate updates dropdown
  const updateOptions = ["Recently Updated", "Most Popular", "Newest"];
  updateOptions.forEach(label => {
    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    updatesSelect.appendChild(option);
  });

  // Apply filters when dropdowns change
  function applyFilters() {
    let filtered = [...linkedData];

    // Filter by genre
    const selectedGenre = genresSelect.value;
    if (selectedGenre !== "All Genres") {
      filtered = filtered.filter(p => p.genreTitles.includes(selectedGenre));
    }

    // Sort by update type
    const selectedUpdate = updatesSelect.value;
    if (selectedUpdate === "Recently Updated") {
      filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    } else if (selectedUpdate === "Newest") {
      filtered.sort((a, b) => b.seasons - a.seasons);
    } else if (selectedUpdate === "Most Popular") {
      filtered.sort((a, b) => b.genreTitles.length - a.genreTitles.length);
    }

    renderPodcasts(filtered, containerId);
  }

  // Attach listeners
  genresSelect.addEventListener("change", applyFilters);
  updatesSelect.addEventListener("change", applyFilters);
}
