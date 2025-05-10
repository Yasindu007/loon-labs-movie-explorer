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

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const MoviePage = lazy(() => import('./pages/MoviePage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const Login = lazy(() => import('./components/Login'));

// Loading fallback
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
    <CircularProgress />
  </Box>
);

function App() {
  const { darkMode } = useContext(MovieContext);
  
  // Create theme based on dark mode preference
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#f50057',
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
            borderRadius: 8,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            textTransform: 'none',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Container>
    </ThemeProvider>
  );
}

export default App;