import React, { useState } from 'react';
import { FaFilm, FaUserCircle } from 'react-icons/fa';

const MovieProfile = ({ movie, season }) => {
  const [imageError, setImageError] = useState(false);
  const imagePath = movie.poster_path || movie.profile_path || movie.still_path;
  const isPerson = Boolean(movie.profile_path || movie.character);

  return (
    <div className="flex flex-col items-center bottom-0">
      {!imagePath || imageError ? (
        <div className="w-32 h-44 flex items-center justify-center rounded-sm shadow-md shadow-black bg-slate-800 text-amber-300">
          {season ? <FaFilm size={36} /> : isPerson ? <FaUserCircle size={36} /> : <FaFilm size={36} />}
        </div>
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt={movie.title || movie.name}
          onError={() => setImageError(true)}
          className={`${movie.still_path ? 'h-40' : 'h-44'} w-full object-cover rounded-sm shadow-md shadow-black`}
        />
      )}
      <div className="movie-info mt-2">
        {movie.title ? (
          <h3 className="text-white text-sm text-center font-semibold w-32 break-words overflow-hidden">
            {movie.title.split(":")[0]}
          </h3>
        ) : (
          <h3 className="text-white text-sm text-center font-semibold w-32 overflow-clip">
            {movie.name.split(":")[0]} <br />
            {movie.character ? (
              <span className="text-[10px]">( {movie.character.split(" (")[0]} )</span>
            ) : null}
          </h3>
        )}
        {season ? (
          <p className="text-white text-xs text-center">{movie.episode_count} Episodes</p>
        ) : null}
      </div>
    </div>
  );
};

export default MovieProfile;