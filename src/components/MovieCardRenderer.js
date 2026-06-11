import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Renders the visual card structure using derived data props.
 */
const MovieCardRenderer = ({ imageUrl, hoverText, bottomText , type, isReleased }) => {
  const [isHovered, setIsHovered] = useState(false);
  // Using a simple fallback element for icon display if image fails or is missing
  const FallbackIcon = <div className="w-12 h-16 flex items-center justify-center text-amber-300">?</div>;

  return (
    <div
      className={`relative group w-[180px] flex-shrink-0 transition-all duration-300 hover:scale-[1.05] ${type === 'CAST' || (type === 'EPISODE' && !isReleased) ? 'cursor-not-allowed':'cursor-pointer'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className="relative w-full h-[240px] bg-slate-800 rounded-sm bg-cover bg-center overflow-hidden "
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
      >
        {/* Placeholder/Fallback Icon */}
        {!imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80">
            {FallbackIcon}
          </div>
        )}

        {/* Hover Overlay - Visible only on hover */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'} bg-slate-950/80`}
        >
        {/* Inform the user if the episode isnt released */}
        {(type === 'EPISODE' && !isReleased) && (
            <div className="absolute inset-0 font-mono flex items-center justify-center">
              <span className="text-red-500 text-sm font-bold">Not Released</span>
            </div>
          )
        }

          {/* Content Overlay Area */}
          <div className="flex flex-col justify-end p-2 h-full">
            {/* Hover Name 1 (Top) */}
            <h4 className={`text-white text-[10px] font-bold truncate transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {hoverText || ""}
            </h4>
            {/* Hover Name 2 (Middle - Optional) */}
            <p className={`text-amber-300 text-[8px] font-medium truncate transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              {bottomText || ""}
            </p>
          </div>
        </div>

        {/* Fallback/Placeholder */}
        {!imageUrl && (
             <div className="absolute inset-0 flex items-center justify-center">
                {FallbackIcon}
             </div>
        )}
      </div>

      {/* Static Footer - Always visible below the card */}
      <div 
        className={`p-2 text-white text-[10px] font-semibold truncate ${!imageUrl ? 'text-amber-300' : 'text-slate-400'} transition-all duration-300`}
      >
        {/* Display the bottomText passed down. */}
        {bottomText && bottomText !== null ? (
            <span className='text-xs'>{bottomText}</span >
        ) : null}
      </div>
    </div>
  );
};

MovieCardRenderer.propTypes = {
  imageUrl: PropTypes.string.isRequired, // Full image URL
  hoverText: PropTypes.string.isRequired, // Name 1 on hover/visible
  bottomText: PropTypes.string,        // Static text for the footer area (e.g., "Ep 5" or "Role: John Doe")
  isReleased: PropTypes.bool // Optional flag to indicate if the movie is released
};

MovieCardRenderer.defaultProps = {
    bottomText: null,
    isReleased: false
};

export default MovieCardRenderer;