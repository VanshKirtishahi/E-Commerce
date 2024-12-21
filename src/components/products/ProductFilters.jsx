import PropTypes from 'prop-types';

function ProductFilters({ filters, setFilters, categories }) {
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $200', value: '100-200' },
    { label: 'Over $200', value: '200-plus' }
  ];

  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Newest', value: 'newest' }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium mb-2">Category</h3>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="w-full border rounded-md p-2"
          >
            <option value="all">All Categories</option>
            {Object.keys(categories).map(category => (
              <option key={category} value={category}>
                {categories[category].name}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-medium mb-2">Price Range</h3>
          <select
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
            className="w-full border rounded-md p-2"
          >
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <h3 className="text-sm font-medium mb-2">Sort By</h3>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="w-full border rounded-md p-2"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

ProductFilters.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
    sortBy: PropTypes.string.isRequired
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired
};

export default ProductFilters; 