import React, { useContext, useState } from 'react';
import { 
  Paper, 
  Grid, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  Box, 
  Typography,
  Slider,
  Collapse,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import { MovieContext } from '../context/MovieContext';

// MovieFilter lets users filter movies by genre, year, and rating
const MovieFilter = () => {
  // Get filter state and actions from context
  const { 
    genres, 
    selectedGenre, 
    setSelectedGenre, 
    yearFilter, 
    setYearFilter, 
    ratingFilter, 
    setRatingFilter,
    filterMovies,
    resetFilters,
    isFiltered
  } = useContext(MovieContext);
  
  // Controls whether the filter section is expanded or collapsed
  const [expanded, setExpanded] = useState(false);

  // Create an array of years from 1900 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => currentYear - i);

  // Handle slider change for rating
  const handleRatingChange = (event, newValue) => {
    setRatingFilter(newValue);
  };

  // When the user submits the filter form, apply the filters
  const handleSubmit = (e) => {
    e.preventDefault();
    filterMovies();
    // Keep filter expanded when applied
  };

  // When the user clicks reset, clear all filters
  const handleReset = () => {
    resetFilters();
  };

  // Automatically expand the filter section if filters are applied
  React.useEffect(() => {
    if (isFiltered) {
      setExpanded(true);
    }
  }, [isFiltered]);

  return (
    // Paper gives a nice background and padding to the filter section
    <Paper sx={{ p: 2, mb: 3 }}>
      {/* Header row with filter icon, title, and expand/collapse button */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterAltIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          Filter Movies
          {/* Show a badge if filters are applied */}
          {isFiltered && (
            <Typography 
              component="span" 
              sx={{ 
                ml: 2, 
                fontSize: '0.8rem', 
                bgcolor: 'primary.main', 
                color: 'white', 
                px: 1, 
                py: 0.5, 
                borderRadius: 1,
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Filters Applied
            </Typography>
          )}
        </Typography>
        {/* Button to expand or collapse the filter section */}
        <IconButton onClick={() => setExpanded(!expanded)} size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      {/* The filter form, shown only when expanded */}
      <Collapse in={expanded}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* Genre dropdown */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="medium" sx={{ minWidth: 220 }}>
                <InputLabel id="genre-label">Genre</InputLabel>
                <Select
                  labelId="genre-label"
                  value={selectedGenre}
                  label="Genre"
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  size="medium"
                >
                  <MenuItem value="">
                    <em>Any Genre</em>
                  </MenuItem>
                  {/* List all genres as dropdown options */}
                  {genres.map((genre) => (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Year dropdown */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="medium" sx={{ minWidth: 220 }}>
                <InputLabel id="year-label">Release Year</InputLabel>
                <Select
                  labelId="year-label"
                  value={yearFilter}
                  label="Release Year"
                  onChange={(e) => setYearFilter(e.target.value)}
                  size="medium"
                >
                  <MenuItem value="">
                    <em>Any Year</em>
                  </MenuItem>
                  {/* List all years as dropdown options */}
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Rating slider */}
            <Grid item xs={12} sm={4}>
              <Typography gutterBottom>
                Minimum Rating: {ratingFilter > 0 ? ratingFilter : 'Any'}
              </Typography>
              <Slider
                value={ratingFilter}
                onChange={handleRatingChange}
                step={0.5}
                marks
                min={0}
                max={10}
                valueLabelDisplay="auto"
                sx={{ mt: 3, mb: 1 }}
              />
            </Grid>
          </Grid>
          
          {/* Buttons to reset or apply filters */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button 
              variant="outlined" 
              startIcon={<ClearAllIcon />}
              onClick={handleReset}
              disabled={!selectedGenre && !yearFilter && ratingFilter === 0}
            >
              Reset
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              startIcon={<FilterAltIcon />}
            >
              Apply Filters
            </Button>
          </Box>
        </form>
      </Collapse>
    </Paper>
  );
};

export default MovieFilter;

