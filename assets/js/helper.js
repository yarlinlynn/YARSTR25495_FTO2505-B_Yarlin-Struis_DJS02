
import { podcasts, genres, seasons } from "./data.js";

/**
 * Match the titles of genres associated with a podcast, filtering out any unknown genres.
 *
 * @param {Object} podcast - The podcast object containing an array of genre IDs.
 * @param {Object[]} podcast.genres - Array of genre IDs associated with the podcast.
 * @param {Object[]} genres - Array of genre objects, each with `id` and `title` properties.
 * @returns {string[]} An array of genre titles, excluding any "Unknown" titles.
 */
function getGenreTitles(podcast, genres) {
  return podcast.genres
    .map(id => genres.find(g => g.id === id)?.title || "Unknown")
    .filter(title => title !== "Unknown");
}

/**
 * Find the season details for a podcast based on its ID.
 *
 * @param {Object} podcast - The podcast object containing an `id` property.
 * @param {string|number} podcast.id - The unique identifier of the podcast.
 * @param {Object[]} seasons - Array of season objects, each with `id` and `seasonDetails` properties.
 * @returns {Object[]} An array of season details for the podcast, or an empty array if not found.
 */
function getSeasonDetails(podcast, seasons) {
  return seasons.find(s => s.id === podcast.id)?.seasonDetails || [];
}

/**
 * Links a podcast with its genre titles and season details.
 *
 * @param {Object} podcast - The podcast object to be enriched.
 * @param {Object[]} genres - Array of genre objects, each with `id` and `title` properties.
 * @param {Object[]} seasons - Array of season objects, each with `id` and `seasonDetails` properties.
 * @returns {Object} A new podcast object with added `genreTitles` and `seasonDetails` properties.
 */
function linkPodcast(podcast, genres, seasons) {
  return {
    ...podcast,
    genreTitles: getGenreTitles(podcast, genres),
    seasonDetails: getSeasonDetails(podcast, seasons)
  };
}

/**
 * Links all podcasts with their genre titles and season details.
 *
 * @param {Object[]} podcasts - Array of podcast objects, each with `id` and `genres` properties.
 * @param {Object[]} genres - Array of genre objects, each with `id` and `title` properties.
 * @param {Object[]} seasons - Array of season objects, each with `id` and `seasonDetails` properties.
 * @returns {Object[]} An array of podcast objects, each enriched with `genreTitles` and `seasonDetails`.
 */
export function linkPodcasts(podcasts, genres, seasons) {
  return podcasts.map(p => linkPodcast(p, genres, seasons));
}

/**
 * Converts an ISO date string to a human-readable "time ago" format.
 *
 * @param {string} isoDate - An ISO date string (e.g., "2023-10-01T12:00:00Z").
 * @returns {string} A string indicating how long ago the date was (e.g., "2 days ago" or "just now").
 */
export function timeAgo(isoDate) {
  const now = new Date();
  const past = new Date(isoDate);
  const seconds = Math.floor((now - past) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value);
    if (count >= 1) {
      return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

/**
 * Formats an ISO date string into a human-readable date format.
 *
 * @param {string} isoDate - An ISO date string (e.g., "2023-10-01T12:00:00Z").
 * @returns {string} A formatted date string (e.g., "October 1, 2023") or "Unknown" if invalid.
 */
export function formatDate(isoDate) {
  if (!isoDate) return "Unknown";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
