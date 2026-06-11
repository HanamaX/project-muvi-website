/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import List from '../components/List';
import MovieProfile from '../components/MovieProfile';
import SelectedDetail from '../components/SingleDescription';
import { fetchSingleData, getSeasonTrailer, getEpisode } from '../utils';
import SeasonDeet from '../components/SeasonDeet';
import TrailerDiv from '../components/TrailerDiv';
import LoadingSpinner from '../components/Spinner';
import { pageview } from '../ga';
import MovieSeasonEpisodes from '../components/MovieSeasonEpisodes';

const getMovieEmbedSrc = (movieId, server) => (
    server === 'server2'
        ? `https://www.2embed.cc/embed/${movieId}`
        : `https://vsembed.ru/embed/${movieId}`
);

const getSeasonEmbedSrc = (movieId, seasonData, server) => {
    if (!seasonData) {
        return null;
    }

    const episodeNumber = seasonData.episode_number || 1;
    const baseUrl = server === 'server2'
        ? 'https://www.2embed.cc/embedtv'
        : 'https://vsembed.ru/tv/';

    return `${baseUrl}/${movieId}&s=${seasonData.season_number}&e=${episodeNumber}`;
};

const HeroSection = ({ showSeason, movie, seasonData, genre, trailers, parent, activeMedia, selectedServer, onToggleWatch, onToggleTrailer, onSelectServer }) => {
    if (showSeason) {
        return (
            <SeasonDeet
                movie={seasonData}
                genre={genre}
                trailers={trailers}
                parent={parent}
                title={parent.name}
                series_id={parent.id}
                activeMedia={activeMedia}
                selectedServer={selectedServer}
                onToggleWatch={onToggleWatch}
                onToggleTrailer={onToggleTrailer}
                onSelectServer={onSelectServer}
            />
        );
    }

    return (
        <SelectedDetail
            movie={movie}
            type={movie.first_air_date ? 'tv' : 'movie'}
            trailers={trailers}
            activeMedia={activeMedia}
            selectedServer={selectedServer}
            onToggleWatch={onToggleWatch}
            onToggleTrailer={onToggleTrailer}
            onSelectServer={onSelectServer}
        />
    );
};

const MediaPanel = ({ activeMedia, selectedServer, showSeason, movieId, seasonData, seasonTrailer, trailers, isHeightTwiceWidth, selectedTrailer, onSelectTrailer, onSelectServer }) => {
    if (activeMedia === 'trailer') {
        const trailerSource = showSeason ? seasonTrailer : trailers;

        return (
            <div className="px-2">
                <div className="mt-4 w-full space-y-4">
                    <TrailerDiv
                        trailers={trailerSource}
                        onSelect={onSelectTrailer}
                        selectedTrailer={selectedTrailer}
                    />
                    {selectedTrailer ? (
                        <div className="w-full">
                            <iframe
                                className={`w-full rounded-lg h-[40vh] ${isHeightTwiceWidth ? 'md:h-[30vh]' : 'md:h-[50vh]'}`}
                                src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Selected Trailer"
                            />
                        </div>
                    ) : (
                        <div className="text-sm text-amber-200">Select a trailer to play.</div >
                    )}
                </div>
            </div>
        );
    }

    if (activeMedia === 'watch') {
        const embedSrc = showSeason
            ? getSeasonEmbedSrc(movieId, seasonData, selectedServer)
            : getMovieEmbedSrc(movieId, selectedServer);

        return (
            <div className={`px-2 ${!selectedServer ? 'animate-border-spin' : ''}`}>
                <div className="mt-4 w-full space-y-4 ">
                    <div className="flex flex-wrap gap-3 ">
                        <button
                            type="button"
                            onClick={() => onSelectServer('server1')}
                            className={`rounded-full px-4 py-2 text-sm shadow-md transition-all ${selectedServer === 'server1' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-amber-100 hover:bg-slate-700'}`}
                        >
                            Server 1
                        </button>
                        <button
                            type="button"
                            onClick={() => onSelectServer('server2')}
                            className={`rounded-full px-4 py-2 text-sm shadow-md transition-all ${selectedServer === 'server2' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-amber-100 hover:bg-slate-700'}`}
                        >
                            Server 2
                        </button>
                    </div>

                    <div className="w-full">
                        {selectedServer ? (
                            <iframe
                                className={`w-full rounded-2xl h-[40vh] ${isHeightTwiceWidth ? 'md:h-[30vh]' : 'md:h-[50vh]'}`}
                                src={embedSrc}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Media Player"
                            />
                        ) : (
                            <div className="rounded-2xl bg-slate-900/60 p-6 text-amber-200 ring-1 ring-white/10 animate-bounce">
                                Choose a server to load the player.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return null;
};


const MuviDetail = () => {
    const { query, zuery } = useParams();
    const [data, setData] = useState([]);
    const [isHeightTwiceWidth, setIsHeightTwiceWidth] = useState(false);
    const [showSeason, setShowSeason] = useState(false);
    const [seasonData, setSeasonData] = useState(null);  
    const [seasonTrailer , setSeasonTrailer] = useState([]); // Holds season trailers
    const [episodes, setEpisodes] = useState([]); // New state for episodes
    const [activeMedia, setActiveMedia] = useState(null);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedServer, setSelectedServer] = useState(null);

    const handleSetSeason = async (movie) => {
        // 1. Check if the clicked season is identical to the currently displayed season data (ID and Season Number).
        const isActiveSeason = seasonData && 
                               seasonData.id === movie.id && 
                               seasonData.season_number === movie.season_number;

        if (isActiveSeason) {
            console.log("Active season selected, skipping API calls.");
            // CRITICAL FIX: If it's the same season, we only update the view state 
            // and exit to prevent re-fetching stale data/resetting component state.
        } else {
            // New season selected: Proceed with fetching new data
            try {
                // Resetting relevant states before new fetch
                setSeasonTrailer([]);
                setEpisodes([]);

                // Fetch necessary data for the NEW season
                const seasonTrailerData = await getSeasonTrailer(data[0].id, movie.season_number);
                setSeasonTrailer(seasonTrailerData);
                setSeasonData(movie);

                const episodeData = await getEpisode(data[0].id, movie.season_number);
                setEpisodes(episodeData); 
            } catch (error) {
                console.error("Error fetching season or episode data:", error);
                // Resetting state on failure is important for user feedback
                alert("Failed to load new season/episode data.");
            }
        }
        
        // CRITICAL FIX: Regardless of whether the API was called, we ensure 
        // setShowSeason(true) is called if a season is selected, guaranteeing 
        // the UI always enters the season view correctly.
        setShowSeason(!showSeason);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Initialize Google Analytics
    useEffect(() => {
        pageview(window.location.pathname);
    }, []);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        setIsHeightTwiceWidth(screenHeight >= 1.5 * screenWidth);
    }, []);

    useEffect(() => {
        const getDetail = async () => {
            try {
                const data = await fetchSingleData(query, zuery);
                setData(data);
            } catch (error) {
                console.error("Error fetching movie data:", error);
            }
        };

        getDetail();
    }, [query, zuery]);
    const head= query==='movie'?'Movies':'Tv Shows';

    // Scroll to the top of the page when data changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [data, seasonData]);

    useEffect(() => {
        setActiveMedia(null);
        setSelectedTrailer(null);
        setSelectedServer(null);
    }, [showSeason, seasonData, data]);

    // Scroll to server selection when a watch movie or watch trailer is selected
    useEffect(() => {
        if (activeMedia != null) {
            window.scrollTo(0, window.innerHeight - (isHeightTwiceWidth ? 0 : 200));
        }
    }, [activeMedia, isHeightTwiceWidth]);

    if (!data[0]) {
        return (
            <div className=" fixed bg-slate-950 flex items-center justify-center h-screen scrollbar-hide w-screen z-20">
                <LoadingSpinner />
            </div>
        );
    }


    return (
        <div className='w-full  bg-gray-900'>
            <div className='relative w-full'>
                {/* Background image applied to parent with pseudo-element for opacity */}
                {/*When season is clicked show season details */}
                <div
                    className={`relative w-full ${isHeightTwiceWidth ? 'min-h-screen md:min-h-[50vh]' : 'min-h-screen'} bg-cover bg-center`}
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${data[0].backdrop_path}')`,
                    }}
                >
                    {/* Overlay for opacity */}
                    <div className="absolute inset-0 bg-gray-900 opacity-40"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <HeroSection
                            showSeason={showSeason}
                            movie={data[0]}
                            seasonData={seasonData}
                            genre={data[0].genres}
                            trailers={showSeason ? seasonTrailer : data[2]}
                            parent={data[0]}
                            activeMedia={activeMedia}
                            selectedServer={selectedServer}
                            onToggleWatch={() => {
                                setSelectedServer(null);
                                setActiveMedia(activeMedia === 'watch' ? null : 'watch');
                                }}
                            onToggleTrailer={() => setActiveMedia(activeMedia === 'trailer' ? null : 'trailer')}
                            onSelectServer={setSelectedServer}
                        />
                    </div>
                </div>

                <MediaPanel
                    activeMedia={activeMedia}
                    selectedServer={selectedServer}
                    showSeason={showSeason}
                    movieId={data[0].id}
                    seasonData={seasonData}
                    seasonTrailer={seasonTrailer}
                    trailers={data[2]}
                    isHeightTwiceWidth={isHeightTwiceWidth}
                    selectedTrailer={selectedTrailer}
                    onSelectTrailer={setSelectedTrailer}
                    onSelectServer={setSelectedServer}
                />

                {/* Responsive Layout for Seasons and Episodes */}
                {data[0].seasons && (
                    <div className="mt-16 pt-8 border-t border-slate-700 flex flex-col md:flex-row gap-4">
                        
                        {/* 1. Season Selector List (Takes half width on large screens) */}
                        <div className="w-full md:w-1/2">
                            <h1 className='text-amber-300 ml-2 font-serif font-extralight text-[5vw] md:text-[2vw]'>Seasons</h1>
                            <div className="relative z-10 w-full py-6 overflow-x-auto scrollbar-hide">
                                <div 
                                    className="absolute top-12 h-36 rounded-full border-t border-slate-600/40 pointer-events-none" 
                                    style={{ width: `${Math.max( data[0].seasons.length * 201)}px` }}
                                ></div>
                                {/* The season list container remains horizontal scroll */}
                                
                                <div className="relative flex items-end gap-4 px-4 pb-8 snap-x snap-mandatory">
                                    {data[0].seasons.map((movie) => (
                                        <div
                                            key={movie.id}
                                            className="snap-center cursor-pointer"
                                            onClick={() => handleSetSeason(movie)}
                                        >
                                            <MovieProfile movie={movie} season={true} type="MOVIE" seasonName={data[0].name} />
                                        </div >
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 2. Episode Viewer (Takes half width on large screens, scrollable) */}
                        <div className="w-full px-3 md:max-w-[48%]">
                            {showSeason ? (
                                <>
                                    {/* Display Episode List when showSeason is true - Limited to 5 items and scrollable */}
                                    <MovieSeasonEpisodes
                                        tvId={data[0].id}
                                        seasonNumber={seasonData.season_number}
                                    />
                                </>
                            ) : (
                                <div className="text-slate-400 p-4">Select a season to view episodes here.</div>
                            )}
                        </div>

                    </div>
                )}

            {/* CONDITIONAL CAST SECTION */}
            {data[1] && data[1].cast && data[1].cast.length > 0 ? (
                <div className="mt-16 pt-8 border-t border-slate-700">
                    <h1 className='text-cyan-500 ml-2 font-serif font-extralight text-[5vw] md:text-[2vw]'>Cast</h1>
                    <div className="relative z-10 w-full whitespace-nowrap overflow-x-auto flex flex-row">
                        {data[1].cast.map((movie) => (
                            <div key={movie.id} className="p-2 shrink-0">
                                <MovieProfile movie={movie} type="CAST" />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            {/* END CONDITIONAL CAST SECTION */}


            <div>
                <List items={data[3]} head={`${head} You might Like`} />
            </div>
        </div>
        </div>
    );
};

export default MuviDetail;