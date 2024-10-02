import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Webpages/Home';
import SearchResult from './Webpages/SearchResult';
import Navbar from './components/Header';
import MuviDetail from './Webpages/muviDetail';
import Footer from './components/Footer';

const App = () => {
  const homeParam = "someValue"; // Define your parameter here

  return (
    <Router>
      <section className="w-full z-20 fixed">
        <Navbar def={"Home"} />
      </section>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path='/details/:query/:zuery' element={<MuviDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
