import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MovieContextProvider } from './context/MovieContext'; // Correct import

ReactDOM.render(
  <React.StrictMode>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
