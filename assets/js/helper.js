
import { podcasts, genres, seasons } from "./data.js";

// Match genre IDs to titles
function getGenreTitles(podcast, genres) {
  return podcast.genres
    .map(id => genres.find(g => g.id === id)?.title || "Unknown")
    .filter(title => title !== "Unknown");
}

// Find season details for podcast
function getSeasonDetails(podcast, seasons) {
  return seasons.find(s => s.id === podcast.id)?.seasonDetails || [];
}

// Link podcast with genres & seasons
function linkPodcast(podcast, genres, seasons) {
  return {
    ...podcast,
    genreTitles: getGenreTitles(podcast, genres),
    seasonDetails: getSeasonDetails(podcast, seasons)
  };
}

// Link all podcasts
export function linkPodcasts(podcasts, genres, seasons) {
  return podcasts.map(p => linkPodcast(p, genres, seasons));
}

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

export function formatDate(isoDate) {
  if (!isoDate) return "Unknown";
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
