import React from 'react';
import { FaStar, FaPlay, FaPlus, FaStarHalfAlt } from 'react-icons/fa'; // Importing icons from react-icons
import Genres from './Genres';

const SelectedDetail = ({ movie }) => {
    const {     name, title, seasons, vote_average, genres, budget, status,
                overview, tagline, runtime, revenue, release_date,
                poster_path,in_production, number_of_episodes,number_of_seasons 
            } = movie;

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

    // Format budget and revenue as currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
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
                <div className="mr-8 sm:flex hidden ">
                    <img
                        className="w-40 h-60 object-cover rounded-lg"
                        src={`https://image.tmdb.org/t/p/original${poster_path}`}
                        alt={title}
                    />
                </div>

                {/* Movie Details */}
                <div>
                    {/* Title and Season */}
                    {title ? <h1 className="text-4xl font-bold ">{title}</h1>
                        : <h1 className="text-4xl font-bold ">{name}</h1>
                    }

                    {/* Ratings */}
                    <div className="flex items-center space-x-2">
                        {renderStars(Math.round((vote_average / 2) * 10) / 10)}
                        <span className="ml-2"> {(Math.round((vote_average / 2) * 10) / 10)}/5</span>
                    </div>

                    {/* Genres */}
                    <Genres genre={genres} />

                    {/* Buttons */}
                    <div className="flex items-center my-4">
                        <button className="flex items-center bg-green-300 px-4 py-2 rounded-[5px] shadow-md hover:bg-green-400 transition">
                            <FaPlay className=" ml-1 mr-1" />
                        </button>
                        <button className="flex items-center bg-gray-500 px-4 py-2 rounded-[5px] shadow-md hover:bg-gray-600 transition">
                            <FaPlus className="ml-1 mr-1" />
                        </button>
                    </div>

                    <div className='space-y-0.5'>
                        <p className='-mb-0.5'><span className='text-cyan-500'>Tagline:</span> {tagline}</p>
                        
                        {!seasons ?
                        <>
                            <p><span className='text-cyan-500'>Status:</span> {status}</p>          
                            <p><span className='text-cyan-500'>Budget:</span> {formatCurrency(budget)}</p>
                            <p><span className='text-cyan-500'>Runtime:</span> {formatRuntime(runtime)}</p>
                            <p><span className='text-cyan-500'>Revenue:</span> {formatCurrency(revenue)}</p>
                            <p><span className='text-cyan-500'>Release Date:</span> {release_date}</p>
                        </>
                        :
                        <>
                            <p><span className='text-cyan-500'>Status:</span> {in_production?'Ongoing':'Finished'}</p>
                            <p><span className='text-cyan-500'>No. of Seasons:</span> {number_of_seasons}</p>
                            <p><span className='text-cyan-500'>No. of Episodes:</span> {number_of_episodes}</p>
                        </>}
                    </div>
                    
                    

                    {/* Movie Description */}
                    <div className=' -space-y-2'>
                    <p className=' text-cyan-500'>Overview</p>
                    <p className="text-white text-sm leading-relaxed w-[100%]">
                        {overview}
                    </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default SelectedDetail;
