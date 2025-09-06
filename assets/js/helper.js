
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