import React from 'react';
import PropTypes from 'prop-types';

const SearchCard = ({ 
  suggestedMovies = [], 
  recentSearches = [], 
  onMovieClick,
  onRecentSearchClick 
}) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
      {/* Suggested Movies Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Suggested Movies</h2>
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {suggestedMovies.map((movie) => (
            <div
              key={movie.id}
              className="flex-none w-48 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              onClick={() => onMovieClick(movie)}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-64 object-cover rounded-md mb-2"
              />
              <p className="text-sm font-medium text-gray-700 truncate">{movie.title}</p>
              <p className="text-xs text-gray-500">{movie.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Searches Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Searches</h2>
        <div className="space-y-2">
          {recentSearches.map((search, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => onRecentSearchClick(search)}
            >
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-gray-700">{search}</span>
              </div>
              <span className="text-xs text-gray-500">
                {new Date().toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SearchCard.propTypes = {
  suggestedMovies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
    })
  ),
  recentSearches: PropTypes.arrayOf(PropTypes.string),
  onMovieClick: PropTypes.func.isRequired,
  onRecentSearchClick: PropTypes.func.isRequired,
};

export default SearchCard; 