
import { renderPodcasts } from "./render.js";
import { genres } from "./data.js";

/**
 * Sets up the filter dropdowns for genres and updates
 */
export function filterButtons (linkedData, genres, containerId = "podcast-list") {
  const genresSelect = document.getElementById("genres");
  const updatesSelect = document.getElementById("updates");

  // 1. Populate genres dropdown
  genres.forEach(g => {
    const option = document.createElement("option");
    option.value = g.title;
    option.textContent = g.title;
    genresSelect.appendChild(option);
  });

  // 2. Populate updates dropdown
  const updateOptions = ["Recently Updated", "Most Popular", "Newest"];
  updateOptions.forEach(label => {
    const option = document.createElement("option");
    option.value = label;
    option.textContent = label;
    updatesSelect.appendChild(option);
  });

  // 3. Apply filters when dropdowns change
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
