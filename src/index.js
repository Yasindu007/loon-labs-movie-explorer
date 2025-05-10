// This is the main entry point for the React app

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';

// Create the root element where the React app will be rendered
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app inside the root element
root.render(
  // BrowserRouter enables navigation between pages without reloading
  <BrowserRouter>
    {/* MovieProvider gives all components access to movie data and actions */}
    <MovieProvider>
      {/* App is the main component for the whole application */}
      <App />
    </MovieProvider>
  </BrowserRouter>
);

// If you want to measure performance, you can use reportWebVitals (optional)
// Learn more: https://bit.ly/CRA-vitals