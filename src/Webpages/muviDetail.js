/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import List from '../components/List';
import MovieProfile from '../components/MovieProfile';
import SelectedDetail from '../components/SingleDescription';
import { fetchSingleData, getSeasonTrailer } from '../utils';
import SeasonDeet from '../components/SeasonDeet';
import TrailerDiv from '../components/TrailerDiv';
import LoadingSpinner from '../components/Spinner';
import ReactGA from 'react-ga';

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
                        <div className="text-sm text-amber-200">Select a trailer to play.</div>
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
            <div className="px-2">
                <div className="mt-4 w-full space-y-4">
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
    const [seasonTrailer , setSeasonTrailer] = useState([])
    const [activeMedia, setActiveMedia] = useState(null);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedServer, setSelectedServer] = useState(null);
    
    const handleSetSeason = async (movie) =>{
        if(seasonData === movie){
            setShowSeason(!showSeason);
        }
        else{
        const dataz = await getSeasonTrailer(data[0].id ,movie.season_number)
        setSeasonTrailer(dataz)
        setSeasonData(movie); 
        setShowSeason(true);
        }
        window.scrollTo(0, 0);
    }

       // Initialize Google Analytics
      useEffect(() => {
        ReactGA.pageview(window.location.pathname);
      }, []);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        setIsHeightTwiceWidth(screenHeight >= 1.5* screenWidth);
    } ,[])

    useEffect(() => {
        const getDetail = async () => {
            const data = await fetchSingleData(query, zuery);
            setData(data);
        };

        getDetail();
    }, [query ,zuery]);

    const head= query==='movie'?'Movies':'Tv Shows';

    useEffect(() => {
        // Scroll to the top of the page when data changes
        window.scrollTo(0, 0);
    }, [data , seasonData]);

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
        return(
            <div className=" fixed bg-slate-950 flex items-center justify-center h-screen scrollbar-hide w-screen z-20">
                <LoadingSpinner />
            </div>)
                }

    
    

    return (
        <div className='w-full  bg-gray-900'>
            <div className='relative w-full'>
                {/* Background image applied to parent with pseudo-element for opacity */}
                {/*When season is clicked show season details */}
                <div
                    className={`relative w-full ${isHeightTwiceWidth?'min-h-screen md:min-h-[50vh]':'min-h-screen'} bg-cover bg-center`}
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

            {/* FOR SEASONS TO SHOW THE AVAILABLE SEASONS */}
            {data[0].seasons?
            <>
                <h1 className='text-amber-300 ml-2 font-serif font-extralight text-[5vw] md:text-[2vw]'>Seasons</h1>
                <div className="relative z-10 w-full py-6 overflow-x-auto scrollbar-hide">
                    <div className="absolute left-1/2 top-12 h-36 w-[160%] -translate-x-1/2 rounded-full border-t border-slate-600/40 pointer-events-none"></div>
                    <div className="relative flex items-end gap-4 px-4 pb-8 snap-x snap-mandatory">
                        {data[0].seasons.map((movie) => (
                            <div
                                key={movie.id}
                                className="snap-center cursor-pointer"
                                onClick={() => { handleSetSeason(movie) }}
                            >
                                <MovieProfile movie={movie} season={true} />
                            </div>
                        ))}
                    </div>
                </div>
            </>
                
            :
            null}

            <div>
                <h1 className='text-cyan-500 ml-2 font-serif font-extralight text-[5vw] md:text-[2vw]'>Cast</h1>
                <div className="relative z-10 w-full whitespace-nowrap overflow-x-auto scrollbar-hide">
                    {data[1].cast.map((movie) => (
                        <div
                            key={movie.id}
                            className="inline-block p-2 box-border"
                        >
                            <MovieProfile movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
            
            

            <div>
                <List items={data[3]} head={`${head} You might Like`} />
            </div>
        </div>
    );
};

export default MuviDetail;