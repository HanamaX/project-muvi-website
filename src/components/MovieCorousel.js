import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import MovieProfile from './MovieProfile';
import SwiperCore from 'swiper'; // Import Swiper core and required modules
import { Autoplay } from 'swiper/modules'; // Import required Swiper modules
import MovieDetail from './Description';

// Install the Autoplay module
SwiperCore.use([Autoplay]);

const MovieCarousel = ({data}) => {  
  const [movies, setMovies] = useState(data);
  const [centerMovie, setCenterMovie] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const PROFILE_WIDTH = 130; // Width of each profile in pixels

useEffect(() => {
  setMovies(data);
} ,[data]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      const maxSlides = Math.floor(screenWidth / PROFILE_WIDTH);
      if (maxSlides > movies.length) {
        setSlidesPerView(movies.length);
      } else {
        setSlidesPerView(maxSlides);
      }
    }

    // Initial calculation
    updateSlidesPerView();

    // Update on window resize
    window.addEventListener('resize', updateSlidesPerView);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, [movies]);

  const handleSlideChange = (swiper) => {
    setCenterMovie(movies[(swiper.realIndex + 1) % movies.length]);
  };

  if (centerMovie === null) {
    setCenterMovie(data[0]);
    return null  
  }


  return (
    <div className="relative h-screen flex flex-col justify-end">
      {/* Background div with the current center movie's image */}
      <div>
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 w-full h-full"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${centerMovie.backdrop_path})` }}
      >
      </div>
      <MovieDetail movie={centerMovie} />

      </div>
      

      <div className="relative w-full h-full flex items-end">
        <div className='relative flex items-end  w-full h-full'>
          <Swiper
            spaceBetween={25}
            slidesPerView={slidesPerView}
            loop={true}
            autoplay={{ delay: 3000 }} // Set autoplay with a delay of 3 seconds
            onSlideChange={handleSlideChange}
            className="relative z-10"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                {movie.id === centerMovie.id 
                ?
                  <div className="">
                    <MovieProfile movie={movie} centered={movie.id === centerMovie.id} />
                  </div> 
                :
                  <div className='mt-6'>
                    <MovieProfile movie={movie} centered={movie.id === centerMovie.id} />
                  </div>
                }
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;