import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper and SwiperSlide
import 'swiper/swiper-bundle.css'; // Import Swiper styles
import MovieProfile from './MovieProfile';
import SwiperCore from 'swiper'; // Import Swiper core and required modules
import { Autoplay } from 'swiper/modules'; // Import required Swiper modules
import MovieDetail from './Description';

// Install the Autoplay module
SwiperCore.use([Autoplay]);

const MovieCarousel = ({ data }) => {
  const [movies, setMovies] = useState(data);
  const [centerMovie, setCenterMovie] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isHeightTwiceWidth, setIsHeightTwiceWidth] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [isFading, setIsFading] = useState(false); // Track fade effect
  const PROFILE_WIDTH = 130;

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      const maxSlides = Math.floor(screenWidth / PROFILE_WIDTH);
      if (maxSlides > movies.length) {
        setSlidesPerView(movies.length);
      } else {
        setSlidesPerView(maxSlides);
      }
    };

    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      setIsHeightTwiceWidth(screenHeight >= 1.5* screenWidth);
      updateSlidesPerView();
    };


    // Initial calculation
    handleResize();

    // Update on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [movies]);
  

  const handleSlideChange = (swiper) => {
    const newCenterMovie = movies[(swiper.realIndex + 1) % movies.length];
    setIsFading(true); // Start fade effect
    setTimeout(() => {
      setCenterMovie(newCenterMovie);
      setBackgroundImage(`url(https://image.tmdb.org/t/p/original${newCenterMovie.backdrop_path})`);
      setIsFading(false); // End fade effect
    }, 300); // Delay for fade effect timing
  };


  if (centerMovie === null) {
    setCenterMovie(data[0]);
    return null;
  }

  return (
    <div className={`relative flex flex-col justify-between ${isHeightTwiceWidth ? 'min-h-screen md:min-h-[50vh]' : 'h-screen'}`}>
      {/* Background div with the current center movie's image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isFading ? 'opacity-0' : 'opacity-100'}`}
        style={{ backgroundImage: backgroundImage }}
      >
        {/* Overlay for opacity */}
        <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-start h-full">
        <MovieDetail movie={centerMovie} />
      </div>

      {/* Swiper */}
      <div className="relative w-full flex items-end z-10">
        <Swiper
          spaceBetween={25}
          slidesPerView={slidesPerView}
          loop={true}
          autoplay={{delay: 3000}} // Set autoplay with a delay of 3 seconds
          onSlideChange={handleSlideChange}
          className="relative z-20"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              {movie.id === centerMovie.id ? (
                <div className="">
                  <MovieProfile movie={movie} centered={movie.id === centerMovie.id} />
                </div>
              ) : (
                <div className="mt-6">
                  <MovieProfile movie={movie} centered={movie.id === centerMovie.id} />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCarousel;