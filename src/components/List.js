import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const List = ({ items, head , parent }) => {
  const [showAll, setShowAll] = useState(false);
  const filteredItems = items.filter(movie => movie.poster_path || movie.still_path); // Filter out movies without poster_path
  const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, 12); // Assuming 4 items per row, 2 rows = 8 items
  console.log(filteredItems);
  

  return (
    <>
      <h1 className='text-left md:text-[2vw] text-[5vw] font-extralight font-serif ml-[1vw] text-cyan-500'>{head}</h1>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1">
        {itemsToShow.map((movie, index) => (
          <Link to={parent?`/season/${parent.id}/${movie.season_number}`
                      :movie.first_air_date 
                      ? `/details/${'tv'}/${movie.id}` 
                      : `/details/${'movie'}/${movie.id}`} 
                      state ={{param: parent}}
            className="flex flex-col items-center" key={movie.id || index}>

            {/* Add hover effect with smooth transition and rotation */}
            <div 
              key={movie.id || index} 
              className="group flex flex-col items-center w-full h-full relative">
              
              {/* Movie Image with Hover Rotation */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="h-[95%] w-[95%] object-cover rounded-md shadow-md shadow-black"
              />
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-1 px-4 py-2 bg-cyan-500 text-white rounded-md absolute right-[2vw]"
      >
        {showAll ? 'Less' : 'More'}
      </button>
    </>
  );
};

export default List;
