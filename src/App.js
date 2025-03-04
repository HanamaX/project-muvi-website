import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Webpages/Home';
import SearchResult from './Webpages/SearchResult';
import Navbar from './components/Header';
import MuviDetail from './Webpages/muviDetail';
import Footer from './components/Footer';
import Season from './Webpages/Season';
import ReactGA from 'react-ga';

// Initialize Google Analytics
ReactGA.initialize('G-BYXPBWEF1T');
ReactGA.pageview(window.location.pathname + window.location.search);

const App = () => {
  return (
    <Router>
      <section className="w-full z-20 fixed">
        <Navbar def={"Home"} />
      </section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path='/details/:query/:zuery' element={<MuviDetail />} />
        <Route path='/season/:query/:zuery' element={<Season />} />

      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
