import React, { useContext, useEffect } from 'react';
import { MovieContext } from '../context/MovieContext';

const Home = () => {
  const { setSearch } = useContext(MovieContext); // Ensure setSearch is destructured

  useEffect(() => {
    setSearch(''); // Reset search when navigating to Home
  }, [setSearch]);

  return (
    <div>
      {/* Home page content */}
    </div>
  );
};

export default Home;