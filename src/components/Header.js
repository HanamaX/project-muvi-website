import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = ({ setActiveSection , def }) => {
    const [active, setActive] = useState(def); // Default active item
    const sections = ['Home', 'Tv Shows', 'Movies', 'Upcoming'];
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSectionClick = (section) => {
        setActive(section);
        if(def){
            setActiveSection(section);
        }
    };

    return (
        <>
            {/* Navbar */}
            <nav className=" bg-white py-1 px-8 flex justify-between items-center border-0 border-b-2 border-solid border-b-gray-100 border-opacity-30 bg-opacity-5">
                {/* Logo */}
                <div className="text-white font-bold text-2xl">
                    Hanama<span className="text-cyan-500">X</span>
                </div>
                
                {/* Nav items */}
                <ul className="flex space-x-8 text-white list-none ">
                    {sections.map((item) => (
                        <li
                            key={item}
                            className={`relative cursor-pointer hover:text-cyan-500 ${
                                active === item ? "text-cyan-500 " : ""
                            }`}
                            onClick={() => handleSectionClick(item)}
                        >
                            <Link className=' no-underline text-inherit' to="/" state={{param:item}}>
                                {item}
                            </Link>
                            {active === item && <div className="absolute border-b-[2px] border-0 border-cyan-500 border-solid w-full border-opacity-40 mt-[2.82vh]"></div>}
                        </li>
                    ))}
                </ul>
                
                {/* Search Icon */}
                <div className="text-cyan-500 cursor-pointer" onClick={() => setSearchActive(!searchActive)}>
                    <FaSearch size={24} />
                </div>
            </nav>

            {/* Search Field */}
            {searchActive && (
                <div className="flex justify-end mt-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border-0 border-b-[1px] border-gray-300 rounded-sm bg-transparent text-white"
                        placeholder="Search for a movie/series"
                    />
                    <Link to={`/search/${searchQuery}`}  >
                    <button
                        onClick={() => {
                            console.log("Search query:", searchQuery);
                            setSearchActive(false);
                        }}
                        className="ml-2 px-4 py-2 bg-cyan-500 text-white rounded-md"
                    >
                        Search
                    </button>
                    </Link>
                    
                </div>
            )}
        </>
    );
};

export default Navbar;
