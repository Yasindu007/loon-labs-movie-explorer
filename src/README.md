# 🎬 Movie Explorer – Discover Your Favorite Films

Movie Explorer is a React web application that lets users discover trending films, search for movies, and explore detailed movie information using the TMDb API.

## 🚀 Live Demo

🔗 [View Live Demo](https://movie-explorer.vercel.app)

## 📦 Features

- 🔐 **User Authentication**
  - Simple login interface with username and password
  - User data saved in local storage for persistence

- 🎞️ **Movie Discovery**
  - Trending movies section showing popular films
  - Detailed movie information including cast, genres, and ratings
  - Movie trailers from YouTube when available

- 🔎 **Advanced Search**
  - Search any movie by title
  - Filter movies by genre, release year, and rating
  - Load more button for pagination

- ❤️ **Favorites Management**
  - Add/remove movies to favorites list
  - Favorites stored in local storage
  - Dedicated favorites page

- 🎨 **UI Features**
  - Responsive design for all devices
  - Light/Dark mode toggle
  - User-friendly navigation
  - Loading states and error handling

## 🛠️ Technologies

- **React 18** - Frontend library
- **React Router v6** - Page routing
- **Material UI** - UI component library 
- **Context API** - State management
- **Axios** - API requests
- **TMDb API** - Movie data source

## 💻 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movie-explorer.git
   cd movie-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your TMDb API key:
   ```
   REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
   ```
   If you don't have a TMDb API key, sign up at [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) and request an API key.

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
movie-explorer/
├── public/                  # Public assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── Login.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieFilter.jsx
│   │   ├── SearchBar.jsx
│   │   └── ThemeToggle.jsx
│   ├── context/
│   │   └── MovieContext.jsx # Context for state management
│   ├── pages/
│   │   ├── FavoritesPage.jsx
│   │   ├── Home.jsx
│   │   ├── MoviePage.jsx
│   │   └── NotFound.jsx
│   ├── App.js               # Main component
│   └── index.js             # Entry point
└── README.md                # Project documentation
```

## 🚀 Deployment

This project can be easily deployed to Vercel, Netlify, or any other hosting service that supports React applications.

### Deploying to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy the application:
   ```bash
   vercel
   ```

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## 📈 Future Enhancements

- User registration and authentication with backend
- User ratings and reviews for movies
- Create and share custom movie lists
- Advanced sorting options
- Similar movies recommendations
- Actor/Director detailed pages

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👏 Acknowledgements

- [The Movie Database (TMDb)](https://www.themoviedb.org/) for providing the API
- [Material UI](https://mui.com/) for the beautiful UI components
- [React Router](https://reactrouter.com/) for routing

---

Made with ❤️ by [Your Name]