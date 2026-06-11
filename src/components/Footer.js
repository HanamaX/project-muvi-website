import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from 'react-icons/fa';
import Logo from '../logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-cyan-300 py-10 font-body">
        <hr className='opacity-15 py-5 mt-4'/>
            <div className="max-w-full mx-auto px-4 sm:px-6  flex lg:flex-row flex-col lg:ml-0 lg:space-x-5">
                {/* Logo and Description */}
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center space-x-4 mb-4 ">
                        <img src={Logo} alt="Logo" className=" w-[10%] rounded-lg " />
                        <span className="text-2xl font-display text-white">Muvi<span className="text-cyan-500">Website</span>
</span>
                    </div>
                    <div className='flex flex-col justify-center'>
                        <p className='max-w-md text-left text-lg font-display italic text-amber-300'>
                            every frame tells a story.
                        </p>
                        <p className='max-w-md text-left text-sm text-slate-400 mt-2'>
                        MuviWebsite brings you closer to the movies and shows you love. Browse cast, trailers, ratings, and streaming details — all in one place.
                        </p>
                    </div>
                    

                    {/* Social Icons */}
                    <div className="flex justify-center space-x-6 mt-2">
                        <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                            <FaInstagram className="text-2xl text-gray-600 hover:text-pink-500 transition duration-300" />
                        </a>
                        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                            <FaFacebook className="text-2xl text-gray-600 hover:text-blue-500 transition duration-300" />
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                            <FaTwitter className="text-2xl text-gray-600 hover:text-blue-400 transition duration-300" />
                        </a>
                        <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-2xl text-gray-600 hover:text-purple-600 transition duration-300" />
                        </a>
                    </div>
                </div>

                {/* Links and Contact */}
                <div className="grid  -mt-3 grid-cols-2 lg:grid-cols-4 lg:px-20 text-sm w-full">
                    {/* About Us */}
                    <div>
                        <h4 className="text-lg font-display text-white mb-4">About Us</h4>
                        <ul className="space-y-2 list-none">
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Company History</a></li>
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Meet the Team</a></li>
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Careers</a></li>
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h4 className="text-lg font-display text-white mb-4">Important Links</h4>
                        <ul className="space-y-2 list-none">
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Tv Shows</a></li>
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Movies</a></li>
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Upcoming</a></li>
                        </ul>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h4 className="text-lg font-display text-white mb-4">Our Services</h4>
                        <ul className="space-y-2 list-none">
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Web Development</a></li>
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Web Design</a></li>
                            <li><a href="/" className="hover:text-gray-100 transition text-inherit no-underline">Google Ads</a></li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-lg font-display text-white mb-4">Contact Us</h4>
                        <ul className="space-y-2 list-none">
                            <li className="flex items-center">
                                <FaEnvelope className="mr-2" />
                                <a href="#" className="hover:text-gray-100 transition text-inherit no-underline break-all">
                                    Email
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-2" />
                                <a href="#" className="hover:text-gray-100 transition text-inherit no-underline">
                                    Contact
                                </a>
                            </li>
                            <li className="flex items-center hover:text-gray-100 transition text-inherit no-underline">
                                <FaMapMarkerAlt className="mr-2" />
                                Location
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='opacity-15'/>
            {/* Footer Bottom */}
            <div className="mt-3 -mb-5 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} MuviWebsite. All rights reserved. <a href="/" className="hover:text-white text-inherit ">Terms & Conditions</a> · <a href="/" className="hover:text-white text-inherit ">Privacy Policy</a>
            </div>
        </footer>
    );
};

export default Footer;
