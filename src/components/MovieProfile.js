import React from 'react';
import PropTypes from 'prop-types'; 
// Corrected import path to ensure MovieCardRenderer is visible to the component
import MovieCardRenderer from './MovieCardRenderer'; 

/**
 * Orchestrates the movie card display by determining type-specific data 
 * (hover text, bottom text) and passing it to the presentation component.
 * @param {object} props - Component props.
 * @param {object} props.movie - The raw TMDb/Movie object.
 * @param {'MOVIE' | 'EPISODE' | 'CAST'} props.type - The explicit type of content being displayed.
 * @param {number} [props.episodeNumber] - Optional episode number for display consistency.
 * @param {string} [props.seasonName] - Optional season name for display consistency.
 * @param {boolean} [props.isReleased] - Optional flag to indicate if the movie is released.
 */
const MovieProfile = ({ movie, type, episodeNumber ,seasonName , isReleased }) => {
  let imageUrl = '';
  let hoverText = '';
  let bottomText = '';
  const imagePath = movie.poster_path || movie.profile_path || movie.still_path;
  const fullImageUrl = imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : '';

  if (type === undefined) {
    type = 'MOVIE'; // Default to MOVIE if type is not provided, ensuring backward compatibility with existing calls.
  }

  // --- Logic to determine props based on content TYPE (The Orchestration Layer) ---
  
  if (!movie || !type) {
    console.error("MovieProfile requires both 'movie' and 'type' props.");
    return null; 
  }

  switch (type) {

    case 'EPISODE':
      // Episode: Season/Episode info for hover, episode number in the static bottom text area.
      const seasonNum = movie.season_number || 'N/A';
      const episodeNum = episodeNumber || 1;
      
      imageUrl = fullImageUrl;

      // 1. Hover Text (Name 1): "Season X, Episode Y"
      hoverText = movie.name ;
      
      // 2. Bottom Text: Specific episode identifier ("Episode 1", etc.)
      bottomText = `S${seasonNum} E${episodeNum}`;
      break;

    case 'CAST':
      // Cast Member: Title for hover, character name/role in the static bottom text area (or just use it as part of the main card's footer).
      imageUrl = fullImageUrl;
      hoverText = movie.title || movie.name; // Use title/name as primary identifier on hover
      bottomText = `Role: ${movie.character ? movie.character : 'N/A'}`;
      break;

    case 'MOVIE':
    default:
      // Standard Movie: Title for hover, generic text/placeholder for bottom if no episode data is available.
      imageUrl = fullImageUrl;
      hoverText = seasonName? seasonName : null; 
      bottomText = movie.title || movie.name; // No specific footer needed for generic movie cards here.
      break;

  }


  return (
    <MovieCardRenderer 
        imageUrl={imageUrl} 
        hoverText={hoverText} 
        bottomText={bottomText} 
        type={type}
        isReleased={isReleased}
    />
  );
};

MovieProfile.propTypes = {
  movie: PropTypes.object.isRequired,
  type: PropTypes.oneOf(['MOVIE', 'EPISODE', 'CAST']).isRequired,
  episodeNumber: PropTypes.number, // Optional prop for episodes
  isReleased: PropTypes.bool // Optional flag to indicate if the movie is released
};

export default MovieProfile;