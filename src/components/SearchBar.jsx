import { useState } from 'react';
import PropTypes from 'prop-types';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ query, category });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search products..."
        className="input-field flex-grow"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        className="input-field w-40"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
        <option value="home">Home & Garden</option>
      </select>
      <button type="submit" className="btn-primary px-8">
        Search
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar; 