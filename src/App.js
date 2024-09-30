import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Webpages/Home';
import SearchResult from './Webpages/SearchResult';

const App = () => {
  const homeParam = "someValue"; // Define your parameter here

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
      </Routes>
    </Router>
  );
};

export default App;
