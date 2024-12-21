import PropTypes from 'prop-types';

function OrderFilters({ onFilterChange, activeFilter }) {
  const filters = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const dateFilters = [
    { id: 'last7days', label: 'Last 7 Days' },
    { id: 'last30days', label: 'Last 30 Days' },
    { id: 'last3months', label: 'Last 3 Months' },
    { id: 'last6months', label: 'Last 6 Months' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Order Status</h3>
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => onFilterChange('status', filter.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeFilter.status === filter.id
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Time Period</h3>
        <div className="flex flex-wrap gap-2">
          {dateFilters.map(filter => (
            <button
              key={filter.id}
              onClick={() => onFilterChange('period', filter.id)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeFilter.period === filter.id
                  ? 'bg-brand-accent text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

OrderFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  activeFilter: PropTypes.shape({
    status: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired
  }).isRequired
};

export default OrderFilters; 