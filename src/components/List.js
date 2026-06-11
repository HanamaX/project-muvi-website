import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const List = ({ items, head , parent }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeOverlayId, setActiveOverlayId] = useState(null);
  const filteredItems = items.filter(movie => movie.poster_path || movie.still_path); // Filter out movies without poster_path
  const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, 12); // Assuming 4 items per row, 2 rows = 8 items
  console.log(filteredItems);
  

  return (
    <div className={`${filteredItems.length <=0 ? 'hidden' : 'flex flex-col'}`}>
      <h1 className='text-left md:text-[2vw] text-[5vw] font-display font-semibold ml-[1vw] text-amber-300 tracking-tight'>{head}</h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1">
        {itemsToShow.map((movie, index) => {
          const target = parent
            ? `/season/${parent.id}/${movie.season_number}`
            : movie.first_air_date
            ? `/details/${'tv'}/${movie.id}`
            : `/details/${'movie'}/${movie.id}`;
          const overlayId = movie.id || index;
          const isActive = activeOverlayId === overlayId;

          return (
            <div className="group flex flex-col items-center" key={overlayId}>
              <div className="flex flex-col items-center w-full h-full relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="h-[95%] w-[95%] object-cover rounded-md shadow-md shadow-black"
                />

                <div
                  className={`absolute inset-0 rounded-md bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  } group-hover:opacity-100`}
                >
                  <div className="absolute bottom-0 left-0 right-0 sm:h-full md:h-[40%] w-[95%] overflow-hidden px-3 py-2 flex items-center gap-3">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-amber-300 sm:block hidden" 
                    />
                    <div className="flex flex-col gap-1 min-w-[45%]">
                      <p className=" text-left text-wrap overflow-ellipsis text-sm text-amber-100 font-semibold leading-tight md:h-full h-full w-[95%] ">
                        {(movie.title || movie.name || '')}
                      </p>
                      <Link
                        to={target}
                        state={{ param: parent }}
                        className="inline-flex items-center justify-center rounded-md bg-amber-400 text-slate-900 text-xs px-2 py-1"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          );
        })}
      </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className={`mt-3 relative end-0 self-end px-4 py-2 bg-amber-500 text-slate-900 rounded-lg hover:bg-amber-600 transition duration-150 ease-in-out ${filteredItems.length <= 12 ? 'hidden' : 'block'}`}
        >
          {showAll ? 'Less' : 'More'}
      </button>
    </div>
  );
};

export default List;
