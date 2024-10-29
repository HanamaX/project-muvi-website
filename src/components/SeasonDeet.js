import React, { useEffect, useState } from 'react';
import { BiMoviePlay } from "react-icons/bi";
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; // Importing icons from react-icons
import { PiVideoThin } from "react-icons/pi";
import { Link } from 'react-router-dom';
import Genres from './Genres';
import TrailerDiv from './TrailerDiv';

const SeasonDeet = ({ movie, genre, trailers ,parent }) => {
    const {     name, season_number, vote_average,
                overview, air_date, still_path,
                poster_path, episode_number, id,
                show_id, runtime, episode_type, episode_count 
            } = movie;

    const [showTrailer, setShowTrailer] = React.useState(false);
    const [showMuvi, setShowMuvi] = React.useState(false);
    const [isHeightTwiceWidth, setIsHeightTwiceWidth] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        setIsHeightTwiceWidth(screenHeight >= 1.5* screenWidth);
    } ,[])

    
    



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
        <div className="relative text-white p-8 rounded-lg ml-[5vw] ">
            <div className="relative z-0 max-w-2xl text-left mt-12 flex">
                {/* Movie Poster */}
                <div className="mr-8 md:flex hidden ">
                    <img
                        className="w-40 h-60 object-cover rounded-lg"
                        src={`https://image.tmdb.org/t/p/original${poster_path || still_path}`}
                        alt={parent.name}
                    />
                </div>

                {/* Movie Details */}
                <div>
                    {/* Title and Season */}
                    <h1 className="text-4xl font-bold ">{parent.name}</h1>
                    <h1 className="text-xl font-bold ">{name}</h1>
                    

                    {/* Ratings */}
                    <div className="flex items-center space-x-2">
                        {renderStars(Math.round((vote_average / 2) * 10) / 10)}
                        <span className="ml-2"> {(Math.round((vote_average / 2) * 10) / 10)}/5</span>
                    </div>

                    {/* Genres */}
                    {poster_path && <Genres genre={genre} />}

                    {/* Buttons */}
                    <div className="flex items-center my-4">
                    {poster_path ?
                        <Link to={`/season/${parent.id}/${season_number}`} state={{param:parent}} className='no-underline'>
                            <button className={`flex items-center bg-green-300 px-4 py-2 rounded-[5px]  shadow-md hover:bg-green-400 transition-all hover:px-10 hover:py-5`}>
                            <div className='flex items-center flex-col'>
                                    <PiVideoThin size={25} className=" ml-1 mr-1" />
                                    <span>Watch Now</span>
                                </div> 
                            </button>
                        </Link>
                    :
                        <button className={`flex items-center bg-green-300 px-4 py-2 rounded-[5px]  shadow-md hover:bg-green-400 transition-all ${showMuvi ? ' px-11 py-5' : 'hover:px-10 hover:py-5'}`}
                                onClick={()=>{setShowTrailer(false) ;setShowMuvi(!showMuvi) }}>
                                <div className='flex items-center flex-col'>
                                    <PiVideoThin size={25} className=" ml-1 mr-1" />
                                    <span>Watch Now</span>
                                </div> 
                        </button>
                    }
                        <button className={`flex items-center bg-gray-500 px-4 py-2 rounded-[5px]  shadow-md hover:bg-gray-600 transition-all ${trailers?'':'hidden'} ${showTrailer ? 'px-11 py-5' : 'hover:px-10 hover:py-5'}`}
                            onClick={()=>{ setShowMuvi(false) ;setShowTrailer(!showTrailer) }}>
                            <div className='flex items-center flex-col'>
                                <BiMoviePlay size={25} className="ml-1 mr-1" />
                                <span> Watch Trailer</span>
                            </div>
                        </button>
                    </div>
                    
                    {/* TRAILERS */}
                    {showTrailer && 
                        <div className='realtive'>
                            <TrailerDiv trailers={trailers} />
                        </div>
                    }
                    {/* Movies && Series */}
                    {showMuvi && 
                        <div className='relative'>
                            <div className='absolute top-0   h-full w-full'>
                                <iframe
                                className={`relative w-full  rounded-lg h-[40vh] md:w-[60vw]  ${isHeightTwiceWidth? 'md:h-[30vh]' :'md:h-[45vh]'} `}
                                    src={`https://vidsrc.xyz/embed/tv/${parent.id}/${season_number}-${episode_number}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title="Movie Trailer"
                                />
                            </div>
                        </div>
                    }


                    <div className='space-y-0.5'>
                        <p className='-mb-0.5'><span className='text-cyan-500'>Season no:</span> {season_number}</p>
                        
                        {episode_number ?
                        <>
                            <p><span className='text-cyan-500'>Episode no:</span> {episode_number}</p>          
                            <p><span className='text-cyan-500'>Episode Type:</span> {episode_type}</p>
                            <p><span className='text-cyan-500'>Release Date:</span> {air_date}</p>
                        </>
                        :
                        <>
                            <p><span className='text-cyan-500'>No. of Episodes:</span> {episode_count}</p>
                            <p><span className='text-cyan-500'>Release Date:</span> {air_date}</p>
                        </>}
                    </div>
                    
                    

                    {/* Movie Description */}
                    <div className=' -space-y-2'>
                    <p className=' text-cyan-500'>Overview</p>
                    <p className="text-white text-sm leading-relaxed w-[100%]">
                        {overview? overview: parent.overview}
                    </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default SeasonDeet;
