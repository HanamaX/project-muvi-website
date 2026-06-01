/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import MovieProfile from '../components/MovieProfile';
import SeasonDeet from '../components/SeasonDeet';
import LoadingSpinner from '../components/Spinner';
import { getEpisode } from '../utils';
import List from '../components/List';
import ReactGA from 'react-ga';




const Season = () => {
    const location = useLocation();
    const { param } = location.state || {}; // Destructure param from state
    const { query, zuery } = useParams();
    const [data, setData] = useState([]);
    const [isHeightTwiceWidth, setIsHeightTwiceWidth] = useState(false);
    const [centre, setCentre] = useState(0);
    const [activeMedia, setActiveMedia] = useState(null);
    const [selectedTrailer, setSelectedTrailer] = useState(null);
    const [selectedServer, setSelectedServer] = useState(null);

       // Initialize Google Analytics
      useEffect(() => {
        ReactGA.pageview(window.location.pathname);
      }, []);

    // Check if the screen height is at least 1.5 times the screen width
    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        setIsHeightTwiceWidth(screenHeight >= 1.5 * screenWidth);
    }, []);

    // Fetch episode details based on query and zuery parameters
    useEffect(() => {
        const getDetail = async () => {
            const data = await getEpisode(query, zuery);
            setData(data.episodes);
        };

        getDetail();
    }, [query, zuery]);

    // Scroll to the top of the page when data changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data, centre]);

    useEffect(() => {
        setActiveMedia(null);
        setSelectedTrailer(null);
        setSelectedServer(null);
    }, [centre]);

    // Scroll to server selection when a watch movie or watch trailer is selected
    useEffect(() => {
        if (activeMedia != null) {
            window.scrollTo(0, window.innerHeight - (isHeightTwiceWidth ? 0 : 200));
        }
    }, [activeMedia, isHeightTwiceWidth]);

    // Return null if no data is available
    if (!data[0]) {
            return(
                <div className=" fixed bg-slate-950 flex items-center justify-center h-screen scrollbar-hide w-screen z-20">
                    <LoadingSpinner />
                </div>)

    }

    const getEpisodeEmbedSrc = (query, zuery, episodeNumber, server) => (
    server === 'server2'
        ? `https://www.2embed.cc/embedtv/${param.id}&s=${zuery}&e=${episodeNumber}`
        : `https://vsembed.ru/embed/${param.id}/${zuery}-${episodeNumber}`
);

const SeasonMediaPanel = ({ activeMedia, selectedServer, selectedTrailer, setSelectedTrailer, setSelectedServer, data, centre, isHeightTwiceWidth }) => {
    if (activeMedia === 'trailer') {
        return (
            <div className="px-2">
                <div className="mt-4 w-full space-y-4">
                    <div className="relative z-10 w-full whitespace-nowrap overflow-x-auto scrollbar-hide bg-slate-900/60 rounded-xl p-3">
                        {data[centre].videos?.results
                            ?.filter((trailer) => trailer.type === 'Trailer' || trailer.type === 'Teaser' || trailer.type === 'Recap')
                            ?.map((trailer, index) => (
                                <button
                                    key={trailer.key || index}
                                    type="button"
                                    className="inline-block mr-3 rounded-full bg-slate-800 px-4 py-2 text-amber-100"
                                    onClick={() => setSelectedTrailer(trailer)}
                                >
                                    {trailer.name}
                                </button>
                            ))}
                    </div>

                    {selectedTrailer ? (
                        <iframe
                            className={`w-full rounded-2xl h-[40vh] ${isHeightTwiceWidth ? 'md:h-[30vh]' : 'md:h-[50vh]'}`}
                            src={`https://www.youtube.com/embed/${selectedTrailer.key}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Selected Episode Trailer"
                        />
                    ) : null}
                </div>
            </div>
        );
    }

    if (activeMedia === 'watch') {
        const embedSrc = getEpisodeEmbedSrc('tv', data[centre].season_number, data[centre].episode_number, selectedServer);

        return (
            <div className="px-2">
                <div className="mt-4 w-full space-y-4">
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => setSelectedServer('server1')}
                            className={`rounded-full px-4 py-2 text-sm shadow-md transition-all ${selectedServer === 'server1' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-amber-100 hover:bg-slate-700'}`}
                        >
                            Server 1
                        </button>
                        <button
                            type="button"
                            onClick={() => setSelectedServer('server2')}
                            className={`rounded-full px-4 py-2 text-sm shadow-md transition-all ${selectedServer === 'server2' ? 'bg-amber-400 text-slate-900' : 'bg-slate-800 text-amber-100 hover:bg-slate-700'}`}
                        >
                            Server 2
                        </button>
                    </div>

                    {selectedServer ? (
                        <iframe
                            className={`w-full rounded-2xl h-[40vh] ${isHeightTwiceWidth ? 'md:h-[30vh]' : 'md:h-[50vh]'}`}
                            src={embedSrc}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Episode Player"
                        />
                    ) : (
                        <div className="rounded-2xl bg-slate-900/60 p-6 text-amber-200 ring-1 ring-white/10 animate-bounce">
                            Choose a server to load the player.
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
};
    
    return (
        <div className='w-full bg-gray-900'>
            <div className='relative w-full'>
                {/* Background image applied to parent with pseudo-element for opacity */}
                <div
                    className={`relative w-full ${isHeightTwiceWidth ? 'min-h-screen md:min-h-[50vh]' : 'min-h-screen'} bg-cover bg-center`}
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${data[centre].still_path}')`,
                    }}
                >
                    {/* Overlay for opacity */}
                    <div className="absolute inset-0 bg-gray-900 opacity-40"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <SeasonDeet
                            movie={data[centre]}
                            parent={param}
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

            <SeasonMediaPanel
                activeMedia={activeMedia}
                selectedServer={selectedServer}
                selectedTrailer={selectedTrailer}
                setSelectedTrailer={setSelectedTrailer}
                setSelectedServer={setSelectedServer}
                data={data}
                centre={centre}
                isHeightTwiceWidth={isHeightTwiceWidth}
            />

            {/* Section to show available episodes */}
            <>
                <h1 className='text-cyan-500 ml-2 font-serif font-extralight text-[5vw] md:text-[2vw]'>Episodes</h1>
                <div className="relative z-10 w-full whitespace-nowrap overflow-x-auto scrollbar-hide">
                    {data.map((movie, index) => (
                        <div
                            key={movie.id}
                            className="inline-block p-2 box-border cursor-pointer"
                            onClick={() => setCentre(index)}
                        >
                            <MovieProfile movie={movie} />
                        </div>
                    ))}
                </div>
            </>

            {/* Section to show cast */}
            <div>
                <h1 className='text-cyan-500 ml-2 font-serif font-extralight text-[5vw] md:text-[2vw]'>Cast</h1>
                <div className="relative z-10 w-full whitespace-nowrap overflow-x-auto scrollbar-hide">
                    {data[centre].guest_stars.map((movie) => (
                        <div
                            key={movie.id}
                            className="inline-block p-2 box-border"
                        >
                            <MovieProfile movie={movie} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Uncomment this section if you want to show a list of recommended items */}
            <div>
                <List items={param.seasons} head={`Seasons`} parent={param} />
            </div>
        </div>
    );
};

export default Season;
