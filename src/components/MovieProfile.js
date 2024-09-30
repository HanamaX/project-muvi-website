import React from 'react';

const MovieProfile = ({ movie }) => {
  return (
    <div className={`flex flex-col items-center bottom-0 `}>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="h-[25vh] w-32 object-cover"
      />
      <div className={`movie-info mt-2 `}>
        {movie.title?<h3 className="text-white text-sm text-center font-semibold">{movie.title.split(":")[0]}</h3>
                    :<h3 className="text-white text-sm text-center font-semibold">{movie.name.split(":")[0]}</h3>
        }
      </div>
    </div>
  );
};

export default MovieProfile;