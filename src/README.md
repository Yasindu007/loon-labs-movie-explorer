# Movie Explorer – Discover Your Favorite Films

A modern, responsive React application that allows users to discover trending movies, search for specific films, view detailed information, and save favorites. This application integrates with The Movie Database (TMDb) API to provide real-time movie data.

---

## ✅ 1️⃣ Install prerequisites

Before starting, make sure you have:

- **Node.js** installed (LTS version, e.g., 18.x or 20.x)
- **npm** (comes with Node.js) or **yarn**
- **Git** installed
- A **GitLab** account

---

## 🎬 Features

### Core Features
- 🔐 **User Login:** Simple username/password login with credentials stored in localStorage.
- 🌟 **Trending Movies:** Display trending movies of the week from TMDb on the homepage.
- 🌟 **Search & Filters:**
  - Search movies by title with instant results.
  - Filter by genre, release year, and minimum rating.
  - Pagination support with a "Load More" button.
- 🎞️ **Movie Details:** View detailed movie info, including poster, trailer, cast, director, runtime, budget, and genres.
- ❤️ **Favorites:** Add/remove movies to a favorites list, persisted in localStorage.
- 💡 **Light/Dark Mode:** Toggle between light and dark themes, saved in localStorage.
- 📱 **Responsive Design:** Fully responsive layout for mobile, tablet, and desktop.
- 🛑 **Error Handling:** Graceful handling of API errors and invalid routes with a 404 page.
- 🔁 **Lazy Loading:** Pages are lazy-loaded to improve initial load performance.

---

## 🚀 Live Demo

[View the live demo](https://loon-labs-movie-explorer.netlify.app/) 

---

## 🛠️ Technologies Used

- **React:** Front-end library for building the UI.
- **React Router:** Client-side routing for navigation.
- **Material UI:** Styling and component library for a polished UI.
- **Axios:** HTTP client for TMDb API requests.
- **TMDb API:** Source for movie data (trending, search, details, genres).
- **React Context API:** Global state management for movies, favorites, and settings.
- **Lucide React:** Icon library for UI elements.
- **Vercel/Netlify:** Deployment platform (update based on actual hosting).
- **LocalStorage:** Persists favorites, theme, and login data.

---

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

1. **Create the React app and install dependencies**
   ```bash
   npx create-react-app <project-name-or-full-path>
   cd <project-name-or-full-path>
   npm install axios @mui/material @emotion/react @emotion/styled react-router-dom
   ```

2. **Install additional dependencies**
   ```bash
   # If Lucide React isn't installed properly, install it explicitly
   npm install lucide-react

   # Install Material UI icons
   npm install @mui/icons-material
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