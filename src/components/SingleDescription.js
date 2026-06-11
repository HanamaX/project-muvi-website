/* eslint-disable react/prop-types */
import React from 'react';
import { BiMoviePlay } from 'react-icons/bi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { PiVideoThin } from 'react-icons/pi';
import Genres from './Genres';
import Tooltip from './ToolTip';

const SelectedDetail = ({ movie, trailers, activeMedia, onToggleWatch, onToggleTrailer }) => {
    const {
        name,
        title,
        seasons,
        vote_average,
        genres,
        budget,
        status,
        overview,
        tagline,
        runtime,
        revenue,
        release_date,
        poster_path,
        in_production,
        number_of_episodes,
        number_of_seasons,
    } = movie;
    const isMovie = !seasons;

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i += 1) {
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

    const formatCurrency = (amount) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="relative px-4 py-10 text-white font-body md:px-8">
            <div className="relative z-0 mt-10 max-w-4xl text-left">
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="hidden w-72 shrink-0 md:flex">
                        <img
                            className="h-96 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10"
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                            alt={title || name}
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-display text-4xl tracking-tight md:text-5xl">{title || name}</h1>
                            {tagline ? <p className="font-body text-sm italic text-amber-200 md:text-base">{tagline}</p> : null}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 rounded-full bg-slate-900/70 px-4 py-2 ring-1 ring-white/10">
                                <span className="font-semibold text-amber-300">{(Math.round((vote_average / 2) * 10) / 10)}/5</span>
                                <span className="text-sm text-slate-300">Rating</span>
                            </div>
                            <div className="text-amber-300">{renderStars(Math.round((vote_average / 2) * 10) / 10)}</div>
                        </div>

                        <div className="mt-3">
                            <Genres genre={genres} />
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                              {isMovie ? (
                                <button
                                    className={`flex items-center rounded-[10px] bg-amber-400 px-4 py-2 text-slate-900 shadow-lg transition-all hover:bg-amber-300 
                                    ${ activeMedia === 'watch' ? 'animate-border-spin' : '' }
                                    ${release_date < new Date().toISOString().split('T')[0] ? '' : 'cursor-not-allowed opacity-70' }
                                             `}
                                    onClick={onToggleWatch}
                                    disabled={release_date > new Date().toISOString().split('T')[0]}
                                >
                                {release_date > new Date().toISOString().split('T')[0] ? 
                                    <Tooltip content="Movie Not Yet Released">
                                        <div className="flex items-center flex-col">
                                            <PiVideoThin size={25} className="ml-1 mr-1" />
                                            <span>Watch Now</span>
                                        </div>
                                    </Tooltip> 
                                    :
                                    <div className="flex items-center flex-col">
                                            <PiVideoThin size={25} className="ml-1 mr-1" />
                                            <span>Watch Now</span>
                                    </div>
                                    }
                                </button>
                            ) : (
                                <Tooltip content="Select a season to watch">
                                    <button
                                        className="flex cursor-not-allowed items-center rounded-[10px] bg-amber-200 px-4 py-2 text-slate-700 shadow-md transition-all"
                                        disabled
                                    >
                                        <div className="flex items-center flex-col">
                                            <PiVideoThin size={25} className="ml-1 mr-1" />
                                            <span>Watch Now</span>
                                        </div>
                                    </button>
                                </Tooltip>
                            )}

                            <button
                                className={`flex items-center rounded-[10px] bg-slate-700 px-4 py-2 text-amber-100 shadow-md transition-all ${
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

                        <div className="mt-8 grid grid-cols-1 gap-4 text-sm text-slate-200 md:grid-cols-2">
                              {isMovie ? (
                                <>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Status</p>
                                        <p className="mt-1 text-base font-semibold">{status}</p>
                                    </div>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Runtime</p>
                                        <p className="mt-1 text-base font-semibold">{formatRuntime(runtime)}</p>
                                    </div>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Budget</p>
                                        <p className="mt-1 text-base font-semibold">{formatCurrency(budget)}</p>
                                    </div>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Release</p>
                                        <p className="mt-1 text-base font-semibold">{release_date}</p>
                                    </div>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Revenue</p>
                                        <p className="mt-1 text-base font-semibold">{formatCurrency(revenue)}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Status</p>
                                        <p className="mt-1 text-base font-semibold">{in_production ? 'Ongoing' : 'Finished'}</p>
                                    </div>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Seasons</p>
                                        <p className="mt-1 text-base font-semibold">{number_of_seasons}</p>
                                    </div>
                                    <div className="rounded-xl bg-slate-900/60 p-4 ring-1 ring-white/5">
                                        <p className="text-xs uppercase tracking-widest text-amber-300">Episodes</p>
                                        <p className="mt-1 text-base font-semibold">{number_of_episodes}</p>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="mt-8 rounded-2xl bg-slate-900/60 p-6 ring-1 ring-white/5">
                            <p className="text-xs uppercase tracking-[0.2em] text-amber-300">Overview</p>
                            <p className="mt-3 text-base leading-relaxed text-white">{overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectedDetail;
