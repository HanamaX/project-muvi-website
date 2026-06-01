import React from 'react';

const TrailerDiv = ({ trailers, onSelect, selectedTrailer }) => {
    const filteredTrailers = (trailers || []).filter(
        (trailer) => trailer.type === 'Trailer' || trailer.type === 'Recap' || trailer.type === 'Teaser'
    );

    return (
        <div className="h-[30vh] overflow-y-auto shadow-md shadow-black bg-gray-900 rounded-md scrollbar-hide">
            <h3 className="text-amber-300 text-md font-bold text-center -mb-[1vh]">Trailers</h3>
            {filteredTrailers.map((trailer, index) => {
                const isActive = selectedTrailer && selectedTrailer.key === trailer.key;
                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onSelect(trailer)}
                        className={`w-full text-left p-2 border-0 border-b-[0.5px] border-gray-400 border-solid cursor-pointer transition-colors ${
                            isActive ? 'bg-amber-400/20' : 'hover:bg-gray-800'
                        }`}
                    >
                        <div className="font-bold"><span className="text-sm font-thin">Name:</span> {trailer.name}</div>
                        <div className="text-sm text-white ml-2">Provider: {trailer.site}</div>
                        <div className="text-sm text-white ml-4">Published: {trailer.published_at.split('T')[0]}</div>
                    </button>
                );
            })}
        </div>
    );
};

export default TrailerDiv;