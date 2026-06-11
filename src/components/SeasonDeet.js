import { useState } from 'react';
import { BiMoviePlay } from "react-icons/bi";
import { FaFilm, FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Importing icons from react-icons
import { PiVideoThin } from "react-icons/pi";
import { Link } from 'react-router-dom';
import Genres from './Genres';

const SeasonDeet = ({ movie, genre, trailers, parent, activeMedia, onToggleWatch, onToggleTrailer }) => {
    const {     name, season_number, vote_average,
                overview, air_date, still_path,
                poster_path, episode_number, id,
                show_id, runtime, episode_type, episode_count 
            } = movie;

    const [posterError, setPosterError] = useState(false);
    const posterSrc = poster_path || still_path;

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


    // Convert runtime from minutes to hours and minutes
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="relative text-white px-4 md:px-8 py-10 font-body">
            <div className="relative z-0 max-w-4xl text-left mt-10">
                <div className="flex flex-col md:flex-row gap-8">
                {/* Movie Poster */}
                <div className="md:flex hidden w-72 shrink-0">
                    {!posterSrc || posterError ? (
                        <div className="w-full h-96 flex items-center justify-center rounded-2xl bg-slate-800 text-amber-300 shadow-2xl ring-1 ring-white/10">
                            <FaFilm size={40} />
                        </div>
                    ) : (
                        <img
                            className="w-full h-96 object-cover rounded-2xl shadow-2xl ring-1 ring-white/10"
                            src={`https://image.tmdb.org/t/p/original${posterSrc}`}
                            alt={parent.name}
                            onError={() => setPosterError(true)}
                        />
                    )}
                </div>

                {/* Movie Details */}
                <div className="flex-1">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl md:text-5xl font-display tracking-tight">{parent.name}</h1>
                        <h2 className="text-xl md:text-2xl font-display tracking-tight text-amber-200/90">{name}</h2>
                    </div>
                    

                    {/* Ratings */}
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 ring-1 ring-white/10">
                            <span className="text-amber-300 font-semibold">
                                {(Math.round((vote_average / 2) * 10) / 10)}/5
                            </span>
                            <span className="text-sm text-slate-300">Rating</span>
                        </div>
                        <div className="text-amber-300">{renderStars(Math.round((vote_average / 2) * 10) / 10)}</div>
                    </div>

                    {/* Genres */}
                    {poster_path &&
                        <div className="mt-3"><Genres genre={genre} /> </div>
                    }

                    {/* Buttons */}
                    <div className="flex flex-wrap items-center mt-6 gap-3">
                        {poster_path ? (
                            <Link to={`/season/${parent.id}/${season_number}`} state={{param:parent}} className='no-underline'>
                                <button className={`flex items-center bg-amber-400 text-slate-900 px-4 py-2 rounded-[10px] shadow-lg hover:bg-amber-300 transition-all`}>
                                    <div className='flex items-center flex-col'>
                                        <PiVideoThin size={25} className=" ml-1 mr-1" />
                                        <span>Watch Now</span>
                                    </div> 
                                </button>
                            </Link>
                        ) : (
                        <button
                            className={`flex items-center bg-amber-400 text-slate-900 px-4 py-2 rounded-[10px] shadow-lg hover:bg-amber-300 transition-all ${
                                activeMedia === 'watch' ? 'animate-border-spin' : ''
                            }`}
                            onClick={onToggleWatch}
                        >
                            <div className="flex items-center flex-col">
                                <PiVideoThin size={25} className="ml-1 mr-1" />
                                <span>Watch Now</span>
                            </div>
                        </button>)
                        }
                        <button
                            className={`flex items-center bg-slate-700 text-amber-100 px-4 py-2 rounded-[10px] shadow-md transition-all ${
                                activeMedia === 'trailer' ? 'ring-2 ring-amber-200' : 'hover:bg-slate-600'
                            } ${trailers && trailers.length > 0 ? '' : 'hidden'}`}
                            onClick={onToggleTrailer}
                        >
                            <div className="flex items-center flex-col">
                                <BiMoviePlay size={25} className="ml-1 mr-1" />
                                <span> Watch Trailer</span>
                            </div>
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-200">
                        <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                            <p className="text-amber-300 text-xs uppercase tracking-widest">Season</p>
                            <p className="mt-1 text-base font-semibold">{season_number}</p>
                        </div>
                        <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                            <p className="text-amber-300 text-xs uppercase tracking-widest">Status</p>
                            <p className="mt-1 text-base font-semibold">{episode_number ? `Episode ${episode_number}` : 'Season Overview'}</p>
                        </div>
                        {episode_number ? (
                            <>
                                <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                    <p className="text-amber-300 text-xs uppercase tracking-widest">Episode Type</p>
                                    <p className="mt-1 text-base font-semibold">{episode_type}</p>
                                </div>
                                <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                    <p className="text-amber-300 text-xs uppercase tracking-widest">Release</p>
                                    <p className="mt-1 text-base font-semibold">{air_date}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                    <p className="text-amber-300 text-xs uppercase tracking-widest">Episodes</p>
                                    <p className="mt-1 text-base font-semibold">{episode_count}</p>
                                </div>
                                <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                    <p className="text-amber-300 text-xs uppercase tracking-widest">Release</p>
                                    <p className="mt-1 text-base font-semibold">{air_date}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Movie Description */}
                    <div className="mt-8 rounded-2xl bg-slate-900/60 p-6 ring-1 ring-white/5">
                        <p className="text-amber-300 text-xs uppercase tracking-[0.2em]">Overview</p>
                        <p className="mt-3 text-white text-base leading-relaxed font-body">
                            {overview? overview: parent.overview}
                        </p>
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
};

export default SeasonDeet;
