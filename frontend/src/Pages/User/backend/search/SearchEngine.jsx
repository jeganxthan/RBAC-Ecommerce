import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../../utils/axiosInstance';
import { API_PATHS } from '../../../../utils/apipaths';
import bg from '../../../../assets/user/bg.jpg';

const SEARCH_HISTORY_KEY = 'search_history';

const SearchEngine = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(SEARCH_HISTORY_KEY)) || [];
    setSearchHistory(history);
  }, []);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    const debounce = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(API_PATHS.USERS.SEARCH_PRODUCT, {
        params: { query: searchTerm },
      });
      setSuggestions(response.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    let updatedHistory = [trimmedTerm, ...searchHistory.filter(t => t !== trimmedTerm)];
    if (updatedHistory.length > 10) updatedHistory = updatedHistory.slice(0, 10);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);

    navigate(`/search-results?search=${encodeURIComponent(trimmedTerm)}`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const handleSelect = (term) => {
    setQuery(term);
    handleSearch(term);
  };

  const clearHistory = () => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    setSearchHistory([]);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Overlay to blur background */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Search container */}
      <div className="relative z-10 w-full max-w-3xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search products..."
          className="w-full text-xl md:text-2xl border border-gray-300 px-6 py-4 rounded-md shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300"
        />

        {loading && <div className="mt-2 text-sm text-gray-200">Loading...</div>}

        {suggestions.length > 0 && (
          <ul className="absolute z-20 w-full bg-white bg-opacity-90 border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto text-lg">
            {suggestions.map((name, index) => (
              <li
                key={index}
                onClick={() => handleSelect(name)}
                className="px-6 py-3 hover:bg-blue-100 cursor-pointer transition-colors duration-150"
              >
                {name}
              </li>
            ))}
          </ul>
        )}

        {searchHistory.length > 0 && (
          <div className="mt-6 bg-white bg-opacity-80 p-4 rounded-md border border-gray-300 text-gray-900">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800 text-lg">Recent Searches</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:underline"
                type="button"
              >
                Clear
              </button>
            </div>
            <ul className="flex flex-wrap gap-3 text-lg">
              {searchHistory.map((term, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSelect(term)}
                  className="cursor-pointer bg-white border border-gray-400 rounded-full px-4 py-2 hover:bg-blue-200 transition"
                >
                  {term}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchEngine;
