const MovieProfile = ({ movie, season }) => {
  return (
    <div className="flex flex-col items-center bottom-0">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path || movie.profile_path || movie.still_path}`}
        alt={movie.title}
        className={`${movie.still_path ? 'h-40' : ''} w-32 object-cover rounded-sm shadow-md shadow-black`}
      />
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