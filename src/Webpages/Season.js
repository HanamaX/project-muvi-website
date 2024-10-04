import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import MovieProfile from '../components/MovieProfile';
import SeasonDeet from '../components/SeasonDeet';
import LoadingSpinner from '../components/Spinner';
import { getEpisode } from '../utils';
import List from '../components/List';

const Season = () => {
    const location = useLocation();
    const { param } = location.state || {}; // Destructure param from state
    const { query, zuery } = useParams();
    const [data, setData] = useState([]);
    const [isHeightTwiceWidth, setIsHeightTwiceWidth] = useState(false);
    const [centre, setCentre] = useState(0);

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

    // Return null if no data is available
    if (!data[0]) {
            return(
                <div className=" fixed bg-slate-950 flex items-center justify-center h-screen scrollbar-hide w-screen z-20">
                    <LoadingSpinner />
                </div>)

    }
    
    console.log(data[centre]);
    

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
                        <SeasonDeet movie={data[centre]} parent={param} />
                    </div>
                </div>
            </div>

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
