import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import List from '../components/List';
import MovieProfile from '../components/MovieProfile';
import SelectedDetail from '../components/SingleDescription';
import { fetchSingleData } from '../utils';

const MuviDetail = () => {
    const { query, zuery } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const getDetail = async () => {
            const data = await fetchSingleData(query, zuery);
            setData(data);
            console.log(data);
        };

        getDetail();
    }, [query ,zuery]);

    const head= query==='movie'?'Movies':'Tv Shows';

    if (!data[0]) {
        return null
    }
    
    

    return (
        <div className='w-full min-h-screen bg-gray-900'>
            <div className='relative w-full min-h-screen '>
                {/* Background image applied to parent with pseudo-element for opacity */}
                <div
                    className="relative w-full min-h-screen  bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://image.tmdb.org/t/p/original${data[0].backdrop_path}')`,
                    }}
                >
                    {/* Overlay for opacity */}
                    <div className="absolute inset-0 bg-gray-900 opacity-40"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <SelectedDetail movie={data[0]} type={query} />
                    </div>
                </div>
            </div>
            {/* FOR SEASONS TO SHOW THE AVAILABLE SEASONS */}
            {data[0].seasons?
            <>
            <h1 className='text-cyan-500 ml-2 font-serif font-extralight text-[5vw]'>Seasons</h1>
            <div className="relative z-10 w-full whitespace-nowrap overflow-x-auto scrollbar-hide">
                {data[0].seasons.map((movie) => (
                    <div
                        key={movie.id}
                        className="inline-block p-2 box-border"
                    >
                        <MovieProfile movie={movie} season={true} />
                    </div>
                ))}
            </div>
            </>
                
            :
            null}

            <div>
                <h1 className='text-cyan-500 ml-2 font-serif font-extralight text-[5vw]'>Cast</h1>
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