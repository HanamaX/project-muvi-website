import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import List from '../components/List';
import { getByName } from '../utils';

function SearchResult() {
  const { query } = useParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [mediaType, setMediaType] = useState('all'); // State for selected media type

  useEffect(() => {
    const search = async () => {
      const data = await getByName(query);
      setData(data);
      setFilteredData(data); // Initialize filtered data
    };
    search();
  }, [query]);

  useEffect(() => {
    // Filter data based on selected media type
    if (mediaType === 'all') {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(item => item.media_type === mediaType));
    }
  }, [mediaType, data]);
  

  return (
    <div className="App bg-gray-900 text-white relative min-h-screen h-full">
      <section className="mx-auto relative h-full pt-12">
        <h3 className="text-left pl-3 text-cyan-500">
          Search results for.. <span className="text-white">{query}</span>
        </h3>
        
        {/* Filter UI */}
        <div className=" mb-4 left-0 content-start text-left">
          <label htmlFor="mediaType" className="mr-2">Filter By:</label>
          <select
            id="mediaType"
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="bg-gray-800 text-white p-2 rounded"
          >
            <option value="all">All</option>
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>
        </div>

        <List items={filteredData} />
      </section>
    </div>
  );
}

export default SearchResult;