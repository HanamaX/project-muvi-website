import React, { useEffect, useState } from 'react';
import '../App.css';
import Navbar from '../components/Header';
import List from '../components/List';
import MovieCarousel from '../components/MovieCorousel';
import { fetchHomeData, fetchMoviesData, fetchTvShowsData, fetchUpcomingData } from '../utils';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const { param } = location.state || {}; // Destructure param from state
  const [activeSection, setActiveSection] = useState('Home');
  const [data, setData] = useState(null); // Initialize with null
  const [head, setHead] = useState([]);

  useEffect(() => {
    if (param) {
      setActiveSection(param);
      // Reset param after using it
      location.state = {};
    }
  }, [param, location]);

  useEffect(() => {
    const getData = async () => {
      let result;
      let head1, head2;
      switch (activeSection) {
        case 'Tv Shows':
          result = await fetchTvShowsData();
          head1 = 'On Aired Tv Shows';
          head2 = 'Popular Tv Shows';
          break;
        case 'Movies':
          result = await fetchMoviesData();
          head1 = 'Popular Movies';
          head2 = 'Top Rated Movies';
          break;
        case 'Upcoming':
          result = await fetchUpcomingData();
          head1 = 'Upcoming Movies';
          head2 = 'Airing Today Tv Shows';
          break;
        default:
          result = await fetchHomeData();
          head1 = 'Trending Movies';
          head2 = 'Trending Tv Shows';
      }
      setData(result);
      setHead([head1, head2]);
    };
    getData();
  }, [activeSection, param]);

  // Return null if data is not yet loaded
  if (!data) {
    return null;
  }

  return (
    <div className="App bg-gray-900 text-white">
      <section className="w-full z-20 fixed">
        <Navbar setActiveSection={setActiveSection} def={activeSection} />
      </section>
      <section className="mx-auto">
        <MovieCarousel data={data[0]} />
        <List items={data[1]} head={head[0]} />
        <List items={data[2]} head={head[1]} />
      </section>
    </div>
  );
}

export default App;
