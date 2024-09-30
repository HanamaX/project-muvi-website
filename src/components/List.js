import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';

const List = ({ items, head }) => {
  const [showAll, setShowAll] = useState(false);
  const filteredItems = items.filter(movie => movie.poster_path); // Filter out movies without poster_path
  const itemsToShow = showAll ? filteredItems : filteredItems.slice(0, 12); // Assuming 4 items per row, 2 rows = 8 items

  return (
    <>
      <h1 className='text-left text-4xl font-extralight font-serif ml-[1vw] text-cyan-500'>{head}</h1>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1">
        {itemsToShow.map((movie, index) => (
          <div key={movie.id || index} className="flex flex-col items-center">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="h-[90%] w-[90%] object-cover rounded-md shadow-md shadow-black"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        {showAll ? 'Show Less' : 'Show More'}
      </button>
    </>
  );
};

export default List;
