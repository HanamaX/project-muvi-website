import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import List from '../components/List';
import MovieProfile from '../components/MovieProfile';
import SelectedDetail from '../components/SingleDescription';
import { fetchSingleData, getSeasonTrailer } from '../utils';
import SeasonDeet from '../components/SeasonDeet';

const MuviDetail = () => {
    const { query, zuery } = useParams();
    const [data, setData] = useState([]);
    const [isHeightTwiceWidth, setIsHeightTwiceWidth] = useState(false);
    const [showSeason, setShowSeason] = useState(false);
    const [seasonData, setSeasonData] = useState(null);  
    const [seasonTrailer , setSeasonTrailer] = useState([])
    
    const handleSetSeason = async (movie) =>{
        if(seasonData === movie){
            setShowSeason(!showSeason);
            window.scrollTo(0, 0);
        }
        else{
        const dataz = await getSeasonTrailer(data[0].id ,movie.season_number)
        setSeasonTrailer(dataz)
        setSeasonData(movie); 
        setShowSeason(true);
        }
    }

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

    if (!data[0]) {
        return(
            <div className=" absolute bg-black flex items-center justify-center h-screen w-screen z-20">
                <div className="text-white text-lg">Loading...</div>
            </div>)
                }
    
    

    return (
        <div className='w-full  bg-gray-900'>
            <div className='relative w-full'>
                {/* Background image applied to parent with pseudo-element for opacity */}
                {/*When season is clicked show season details */}
                {!showSeason ?
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
                        <SelectedDetail movie={data[0]} type={query} trailers={data[2]} />
                    </div>
                </div>
                :
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
                        <SeasonDeet movie={seasonData} genre={data[0].genres} trailers={seasonTrailer} parent={data[0]} title={data[0].name} series_id={data[0].id} />
                    </div>
                </div>}
                
            </div>

            {/* FOR SEASONS TO SHOW THE AVAILABLE SEASONS */}
            {data[0].seasons?
            <>
                <h1 className='text-cyan-500 ml-2 font-serif font-extralight text-[5vw] md:text-[2vw]'>Seasons</h1>
                <div className="relative z-10 w-full whitespace-nowrap overflow-x-auto scrollbar-hide">
                    {data[0].seasons.map((movie) => (
                        <div
                            key={movie.id}
                            className="inline-block p-2 box-border"
                            onClick={() => { handleSetSeason(movie) }}
                        >
                            <MovieProfile movie={movie} season={true} />
                        </div>
                    ))}
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