import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });

  useEffect(() => {
    localStorage.setItem('lastSearch', lastSearch);
  }, [lastSearch]);

  return (
    <MovieContext.Provider value={{ lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};
