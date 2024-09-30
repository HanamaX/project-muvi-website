import '../App.css';
import List from '../components/List';
import { useParams } from 'react-router-dom';
import { getByName } from '../utils';
import { useEffect, useState } from 'react';


function SearchResult() {
  const { query } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const search = async () => {
      const data = await getByName(query);
      console.log(data);
      setData(data);
    };
    search();
  }, [query]);

  
  return (
    <div className="App bg-gray-900  text-white relative min-h-screen h-full ">
      <section className=" mx-auto relative h-full pt-12">
      <h3 className='text-left pl-3 text-cyan-500'>Search results for.. <span className='text-white'>{query}</span></h3>
      <List items={data}  />
      </section>
    </div>
  );
}

export default SearchResult;
