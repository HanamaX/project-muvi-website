import React, { useState, useEffect } from 'react';
import { FaSearch ,FaTimes ,FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ def }) => {
    const sections = ['Home', 'Tv Shows', 'Movies', 'Upcoming'];
    const [latest, setLatest] = useState(def);
    const [menuActive, setMenuActive] = useState(false);
    const [searchActive, setSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const {param} = location.state || {};    
    const [active, setActive] = useState(param); // Default active item
    

    useEffect(() => {
        // Define the paths where you want to keep the active state
        const desiredPaths = ['/', '/tv-shows', '/movies', '/upcoming'];        

        if (!desiredPaths.includes(location.pathname)) {
            setActive(null);
        }
        else{
            setActive(param || latest)
        }
    }, [location.pathname]);


    const handleSectionClick = (section) => {
        setActive(section);
        setLatest(section);
        setMenuActive(false);
    };

    return (
        <>
            {/* Navbar */}
            <nav className=" bg-white py-1 px-8 flex justify-between items-center border-0 border-b-2 border-solid border-b-gray-100 border-opacity-30 bg-opacity-5">
                {/* Search Icon */}
                <div className="text-cyan-500 cursor-pointer md:hidden" onClick={() => setSearchActive(!searchActive)}>
                    <FaSearch size={24} />
                </div>

                {/* Logo */}
                <div className={`text-white font-bold text-2xl ${menuActive?'hidden':'flex'} md:flex`}>
                    Hanama<span className="text-cyan-500">X</span>
                </div>

                
                
                {/* Nav items */}
                <ul className={`flex-row space-x-[2vw] md:space-x-8 -ml-[2vh] md:ml-0 text-white list-none ${menuActive ? 'flex' : 'hidden'} md:flex`}>
                {sections.map((item) => (
                        <li
                            key={item}
                            className={`relative cursor-pointer hover:text-cyan-500 ${
                                active === item ? "text-cyan-500 " : ""
                            }`}
                            onClick={() => handleSectionClick(item)}
                        >
                            <Link className=' no-underline text-inherit' to="/" state={{param:item}} >
                                {item}
                            </Link>
                            {active === item && <div className="absolute border-b-[2px] border-0 border-cyan-500 border-solid w-full border-opacity-40 mt-[2.82vh]"></div>}
                        </li>
                    ))}
                </ul>
                
                    {/* Search Icon for larger screens */}
                    <div className="text-cyan-500 cursor-pointer hidden md:flex" onClick={() => setSearchActive(!searchActive)}>
                        <FaSearch size={24} />
                    </div>

                {/* Menu Icon */}
                <div className={"text-cyan-500 cursor-pointer md:hidden"} onClick={() => setMenuActive(!menuActive)}>
                    {menuActive ? <FaTimes size={24} /> : <FaBars size={24} />}
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
                            setActive(null)
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
