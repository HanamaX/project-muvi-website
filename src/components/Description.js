import React from 'react';
import { FaPlay, FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Importing icons from react-icons
import { Link } from 'react-router-dom';
import { PiVideoThin } from "react-icons/pi";
import Genres from './Genres';

const MovieDetail = ({ movie }) => {
  const { name, title, vote_average, genre_ids, overview } = movie;

  // Generate stars based on rating
const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars.push(<FaStar key={i} className="inline-block text-yellow-400" />);
        } else if (i - rating <= 0.5) {
            stars.push(<FaStarHalfAlt key={i} className="inline-block text-yellow-400" />);
        } else {
            stars.push(<FaStar key={i} className="inline-block text-gray-400" />);
        }
    }
    return stars;
};

  return (
    <div className="relative text-white px-6 md:px-8 pb-10 font-body">
      <div className="relative z-10 max-w-2xl text-left mt-10">
        <div className="flex flex-col gap-3">
          {title ? (
            <h1 className="text-4xl md:text-5xl font-display tracking-tight">
              {title.split(":")[0]}
            </h1>
          ) : (
            <h1 className="text-4xl md:text-5xl font-display tracking-tight">
              {name.split(":")[0]}
            </h1>
          )}

          {/* Ratings */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 ring-1 ring-white/10">
              <span className="text-amber-300 font-semibold">
                {(Math.round((vote_average / 2) * 10) / 10)}/5
              </span>
              <span className="text-sm text-slate-300">Rating</span>
            </div>
            <div className="text-amber-300">{renderStars(Math.round((vote_average / 2) * 10) / 10)}</div>
          </div>

          {/* Genres */}
          <div className="max-w-full">
            <Genres genreIds={genre_ids} />
          </div>

          {/* Buttons */}
          <div className="flex items-center my-4">
            <Link to={movie.first_air_date ? `/details/${'tv'}/${movie.id}` : `/details/${'movie'}/${movie.id}`} className="flex flex-col items-center no-underline" key={movie.id }>
              <button className="flex items-center bg-amber-400 text-slate-900 px-4 py-2 rounded-[10px] shadow-lg hover:bg-amber-300 transition-all">
                                  <div className='flex items-center flex-col'>
                                      <PiVideoThin size={25} className=" ml-1 mr-1" />
                                      <span>Watch Now</span>
                                  </div> 
              </button>
            </Link>
          </div>
        </div>

        {/* Movie Description */}
        <div className="mt-6 rounded-2xl bg-slate-900/60 p-5 ring-1 ring-white/5">
          <p className="text-amber-300 text-xs uppercase tracking-[0.2em]">Overview</p>
          <p className="mt-3 text-white text-base leading-relaxed">
            {overview}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
