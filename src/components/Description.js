import React from 'react';
import { FaStar, FaPlay, FaPlus, FaStarHalfAlt } from 'react-icons/fa'; // Importing icons from react-icons
import Genres from './Genres';
import { Link } from 'react-router-dom';

const MovieDetail = ({ movie }) => {
  const { name, title, vote_average, genre_ids, overview } = movie;

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

  return (
    <div className="relative text-white p-8 rounded-lg ml-[5vw] ">
      <div className="relative z-10 max-w-2xl text-left mt-12 " >
        {/* Title and Season */}
        {title?<h1 className="text-4xl font-bold ">{title.split(":")[0]}</h1>
                    :<h1 className="text-4xl font-bold ">{name.split(":")[0]}</h1>
        }

        {/* Ratings */}
        <div className="flex items-center space-x-2">
          {renderStars(Math.round((vote_average / 2) * 10) / 10)}
          <span className="ml-2"> {(Math.round((vote_average / 2) * 10) / 10)}/5</span>
        </div>

        {/* Genres */}
        <div className=' max-w-full'>
        <Genres genreIds={genre_ids} />
        </div>

        {/* Buttons */}
        <div className="flex items-center my-4">
          <Link to={movie.first_air_date ? `/details/${'tv'}/${movie.id}` : `/details/${'movie'}/${movie.id}`} className="flex flex-col items-center" key={movie.id }>
            <button className="flex items-center bg-green-300 px-4 py-2 rounded-[5px] shadow-md hover:bg-green-400 hover:px-10 hover:py-5 transition-all">
              <FaPlay className=" ml-1 mr-1" />
            </button>
          </Link>
        </div>
        </div>

        {/* Movie Description */}
        <div className='max-w-2xl text-left absolute'>
          <p className="text-white text-sm leading-relaxed w-[85%]">
            {overview}
          </p>
        </div>
        
      
    </div>
  );
};

export default MovieDetail;
