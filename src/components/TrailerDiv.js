import React from 'react';
import { useState, useEffect } from 'react';

const TrailerDiv = ({ trailers }) => {
    trailers = trailers.filter(trailer => trailer.type === 'Trailer' || trailer.type === 'Recap' || trailer.type === 'Teaser');
    console.log(trailers);
    const [showTrailer, setShowTrailer] = React.useState(false);
    const [trailer, setTrailer] = React.useState(null);
    const [isHeightTwiceWidth, setIsHeightTwiceWidth] = useState(false);

    useEffect(() => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        console.log(screenWidth, screenHeight);
        
        setIsHeightTwiceWidth(screenHeight >= 1.5* screenWidth);
    } ,[])

    const handleClick = (trailer) => {
        setTrailer(trailer);    
        setShowTrailer(true);
    };

    return (
        <div className='relative'>
        <div className={`h-[30vh] overflow-y-scroll shadow-md shadow-black  bg-gray-900 rounded-md relative scrollbar-hide ${isHeightTwiceWidth? 'md:h-[10vh]' :''} ${showTrailer? 'hidden':''}`}>
        <h3 className='text-cyan-500 text-md font-bold text-center  -mb-[1vh]  '>Trailers</h3>
            {trailers.map((trailer, index) => (
                <div 
                    key={index} 
                    onClick={() => {handleClick(trailer)}} 
                    className="p-2 border-0 border-b-[0.5px] border-gray-400 border-solid cursor-pointer "
                >
                    <div className="font-bold"><span className='text-sm font-thin'>Name:</span> {trailer.name}</div>
                    <div className="text-sm text-white ml-2">Provider: {trailer.site}</div>
                    <div className="text-sm text-white ml-4">Published: {trailer.published_at.split('T')[0]}</div>
                </div>
            ))}
        </div>

        {showTrailer && (
            <div className='absolute top-0   h-full w-full'>
                <iframe
                className={`relative w-full  rounded-lg h-[40vh] md:w-[60vw]  ${isHeightTwiceWidth? 'md:h-[30vh]' :'md:h-[45vh]'} `}
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Movie Trailer"
                />
            </div>)}
        </div>
        
    );
};

export default TrailerDiv;