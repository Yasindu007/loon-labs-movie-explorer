# Movie Explorer – Discover Your Favorite Films

A modern, responsive React application that allows users to discover trending movies, search for specific films, view detailed information, and save favorites. This application integrates with The Movie Database (TMDb) API to provide real-time movie data.

## 🎬 Features

### Core Features
- **User Authentication**: Simple login system with username and password storage
- **Trending Movies**: Browse currently popular movies from TMDb
- **Movie Search**: Search for movies by title with instant results
- **Movie Details**: View comprehensive information about selected movies
- **Favorites**: Save and manage your favorite movies
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing
- **Responsive Design**: Fully responsive layout that works on mobile and desktop devices

### Enhanced Features
- **Advanced Filtering**: Filter movies by genre, release year, and minimum rating
- **Load More**: Pagination support to browse more movies
- **Persistent State**: User preferences and searches are saved to localStorage
- **Visual Indicators**: Movie ratings displayed with eye-catching visuals

## 🚀 Live Demo

[View the live demo](https://movie-explorer-demo.vercel.app) (placeholder link)

## 🛠️ Technologies Used

- **React**: Frontend library for building the user interface
- **React Router**: Navigation and routing between different views
- **Material UI**: Component library for consistent and responsive design
- **Lucide React**: Modern icon library for clean UI elements
- **Context API**: State management across the application
- **LocalStorage**: Persistent data storage for user preferences and favorites
- **Axios**: API request handling (suggested in requirements)
- **TMDb API**: Movie data source

## 📋 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js        # Navigation header with responsive menu
│   ├── Footer.js        # Page footer with attribution
│   ├── SearchBar.jsx    # Movie search input component
│   ├── MovieList.jsx    # Grid display of movies
│   ├── MovieCard.jsx    # Individual movie card with hover effects
│   ├── MovieFilter.jsx  # Advanced filtering options
│   ├── LoadMore.jsx     # Pagination component
│   ├── ThemeToggle.jsx  # Dark/light mode switch
│   ├── Login.jsx        # User authentication form
│   └── NotFound.js      # 404 page for invalid routes
├── context/             # React Context
│   └── MovieContext.js  # Central state management
├── pages/               # Page components
│   ├── Home.js          # Main landing page
│   ├── MovieDetails.js  # Detailed view of a specific movie
│   ├── Favorites.js     # User's saved favorites
│   └── LoginPage.js     # Authentication page
├── services/            # API and external services
│   └── api.js           # TMDb API integration
├── utils/               # Helper functions
├── App.js               # Main app component and routing
└── index.js             # Application entry point
```

## ⚙️ Installation and Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn package manager
- TMDb API key (free from [themoviedb.org](https://www.themoviedb.org/))

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/movie-explorer.git
   cd movie-explorer
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies
   npm install

   # If Lucide React isn't installed properly, install it explicitly
   npm install lucide-react
   ```

   This will install all required dependencies including:
   - React and React DOM
   - React Router for navigation
   - Material UI components and icons
   - Lucide React for icon components
   - Axios for API requests

3. **Create environment variables**
   
   Create a `.env` file in the root directory:
   ```
   REACT_APP_TMDB_API_KEY=your_api_key_here
   REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/material": "^5.13.0",
    "@mui/icons-material": "^5.11.16",
    "axios": "^1.4.0",
    "lucide-react": "^0.220.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.1",
    "react-scripts": "5.0.1"
  }
}
```

## 🔄 API Integration

This application uses the TMDb API to fetch movie data. The app makes several types of requests:

- **Trending Movies**: Fetches the current trending movies
- **Search Movies**: Searches for movies based on user input
- **Movie Details**: Retrieves detailed information about a specific movie
- **Movie Genres**: Gets a list of all available movie genres

Example API request:
```javascript
const fetchTrendingMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
```

## 💾 State Management

The application uses React's Context API for state management. The `MovieContext` provides:

- Movie data (trending, search results)
- User authentication state
- Search functionality
- Filter states
- Favorites management
- Theme preference (dark/light mode)

Example usage:
```javascript
// Inside a component
const { movies, loading, favorites, addFavorite } = useContext(MovieContext);
```

## 🔒 Authentication

The application includes a simple login system that stores the username in localStorage. In a production environment, this would be replaced with a more secure authentication system.

## 📱 Responsive Design

The application follows a mobile-first approach with responsive components:

- Mobile-friendly navigation with a side drawer
- Responsive grid layout that adjusts based on screen size
- Touch-friendly UI elements
- Optimized for both portrait and landscape orientations

## 🌈 Features in Detail

### Movie Search

Users can search for movies by title. The search is triggered when the user submits the search form, and results are displayed in a grid layout.

### Movie Filtering

Users can filter movies by:
- Genre (from TMDb's genre list)
- Release year (from 1900 to current year)
- Minimum rating (using a slider from 0 to 10)

### Favorites Management

Users can:
- Add movies to favorites (stored in localStorage)
- Remove movies from favorites
- View all favorite movies in a dedicated page

### Theme Toggle

The application supports both light and dark themes:
- Automatic detection of user's system preference
- Manual toggle between themes
- Persistent theme preference

## 🧪 Future Enhancements

- **User Accounts**: Implement proper back-end authentication with user profiles
- **Movie Recommendations**: AI-driven movie recommendations based on user preferences
- **Social Sharing**: Allow users to share movies on social media
- **Reviews**: Enable users to write and read reviews for movies
- **Watchlist**: Create a separate watchlist for movies to watch later

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
- [Material-UI](https://mui.com/) for the UI components
- [Lucide React](https://lucide.dev/) for the icons
- [Create React App](https://create-react-app.dev/) for the project setup

## 👨‍💻 About the Developer

This Movie Explorer application was created as part of a web development project. The developer focused on creating a clean, responsive UI with a great user experience while implementing modern React best practices.