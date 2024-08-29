import React, { useState } from 'react';

const API_KEY = '187b0001'; 

const MovieSearchApp = () => {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  const searchMovie = async () => {
    try {
      const response = await fetch(`http://www.omdbapi.com/?t=${query}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovie(data);
        setError('');
      } else {
        setMovie(null);
        setError(data.Error);
      }
    } catch (err) {
      setMovie(null);
      setError('An error occurred while fetching the movie data.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Movie Search App</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={searchMovie}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Search
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {movie && (
        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold mb-2">{movie.Title}</h2>
          <p className="mb-2">IMDB Rating: {movie.imdbRating}</p>
          <p className="mb-2">Synopsis: {movie.Plot}</p>
        </div>
      )}
    </div>
  );
};

export default MovieSearchApp;