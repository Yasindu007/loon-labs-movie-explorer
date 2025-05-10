// src/App.js
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  CssBaseline, 
  Container, 
  createTheme, 
  ThemeProvider,
  Box,
  CircularProgress
} from '@mui/material';
import { Suspense, lazy } from 'react';
import Header from './components/Header';
import { MovieContext } from './context/MovieContext';

// Lazy-load pages for better performance (only load when needed)
const Home = lazy(() => import('./pages/Home'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const Login = lazy(() => import('./components/Login'));

// LoadingFallback is shown while a page is loading
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
    <CircularProgress />
  </Box>
);

function App() {
  // Get dark mode preference from context
  const { darkMode } = useContext(MovieContext);
  
  // Create a custom Material UI theme based on dark mode
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light', // Switch between dark and light
      primary: {
        main: '#1976d2', // Main blue color
      },
      secondary: {
        main: '#f50057', // Accent pink color
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 500,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8, // Rounded corners for cards
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,      // Rounded corners for buttons
            textTransform: 'none',// Keep button text as typed (not uppercase)
          },
        },
      },
    },
  });

  return (
    // ThemeProvider applies the custom theme to all child components
    <ThemeProvider theme={theme}>
      {/* CssBaseline resets browser styles for consistency */}
      <CssBaseline />
      {/* Header is always shown at the top */}
      <Header />
      {/* Main content area with some padding */}
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* Suspense shows a spinner while lazy-loaded pages are loading */}
        <Suspense fallback={<LoadingFallback />}>
          {/* Define all the routes (pages) for the app */}
          <Routes>
            {/* Home page (search, filter, trending) */}
            <Route path="/" element={<Home />} />
            {/* Movie details page */}
            <Route path="/movie/:id" element={<MoviePage />} />
            {/* Favorites page */}
            <Route path="/favorites" element={<FavoritesPage />} />
            {/* Login page */}
            <Route path="/login" element={<Login />} />
            {/* Catch-all: if route not found, show Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Container>
    </ThemeProvider>
  );
}

export default App;