import React, { useState, useEffect } from 'react';
import { getEpisode } from '../utils'; // Assuming src/utils.js is accessible

/**
 * Component to display episodes for a given season of a TV show.
 * @param {object} props - Component props
 * @param {string} props.tvId - The ID of the TV show.
 * @param {string} props.seasonNumber - The season number to fetch episodes for.
 */
const MovieSeasonEpisodes = ({ tvId, seasonNumber }) => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEpisodes = async () => {
      setLoading(true);
      setError(null);
      try {
        // Call the utility function to fetch episode data
        const data = await getEpisode(tvId, seasonNumber);
        setEpisodes(data.episodes || []); // Assuming the API response has an 'episodes' array
      } catch (err) {
        console.error("Error fetching episode data:", err);
        setError("Failed to load episode data.");
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
  }, [tvId, seasonNumber]);

  if (loading) {
    return <div className="text-center py-10 text-amber-400">Loading season episodes...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  if (episodes.length === 0) {
    return <div className="text-center py-10 text-gray-400">No episodes found for this season.</div>;
  }

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-gray-700">
      {/* Static Section Title - Stays visible when scrolling */}
      <h3 id="episode-header" className="mb-4 border-b border-gray-700 pb-2 text-xl font-bold text-amber-400">Episodes for Season {seasonNumber}</h3>
      
      {/* Main Scrollable Table Container: Handles both horizontal and vertical scrolling */}
      <div className="overflow-x-auto overflow-y-scroll max-h-[35vh]"> 
        <table className="min-w-full divide-y divide-gray-700">
          {/* Thead must be sticky within the scroll container */}
          <thead className="bg-gray-700 sticky top-0 z-10">
            <tr className='sticky'>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Episode</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Air Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          {/* Thead must be contained in a div to work correctly with sticky positioning when scrollable */}
          <tbody className="min-w-full divide-y divide-gray-700"> 
            {episodes.map((episode, index) => (
              <tr key={episode.episode_number}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{episode.episode_number}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{episode.air_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    episode.air_date < new Date().toISOString().split('T')[0] ? 'bg-green-600 text-white' : 'bg-amber-600 text-white'
                  }`}>
                    {episode.air_date <= new Date().toISOString().split('T')[0] ? 'Released' : 'Not Released'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieSeasonEpisodes;