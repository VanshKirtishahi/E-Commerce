import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function EnhancedOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    search: '',
    sortBy: 'date',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0
  });

  useEffect(() => {
    loadOrders();
  }, [filters, pagination.page, pagination.limit]);

  const loadOrders = async () => {
    try {
      // TODO: Replace with actual API call
      const mockOrders = Array.from({ length: 50 }, (_, i) => ({
        id: `ORD-${1000 + i}`,
        date: new Date(2024, 0, 1 + i).toISOString(),
        customer: {
          id: `CUST-${100 + i}`,
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`
        },
        items: [
          { id: 1, name: 'Product A', quantity: 2, price: 29.99 },
          { id: 2, name: 'Product B', quantity: 1, price: 49.99 }
        ],
        total: 109.97,
        status: ['pending', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 4)],
        paymentStatus: ['paid', 'pending', 'failed'][Math.floor(Math.random() * 3)],
        shippingAddress: `${123 + i} Main St, City, Country`
      }));

      setOrders(mockOrders);
      setPagination(prev => ({ ...prev, total: mockOrders.length }));
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      // TODO: Replace with actual API call
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleSearch = (value) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSort = (field) => {
    setFilters(prev => ({
      ...prev,
      sortBy: field,
      sortOrder: prev.sortBy === field && prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredOrders = orders
    .filter(order => {
      if (filters.status !== 'all' && order.status !== filters.status) return false;
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          order.id.toLowerCase().includes(searchTerm) ||
          order.customer.name.toLowerCase().includes(searchTerm) ||
          order.customer.email.toLowerCase().includes(searchTerm)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;
      switch (filters.sortBy) {
        case 'date':
          return sortOrder * (new Date(a.date) - new Date(b.date));
        case 'total':
          return sortOrder * (a.total - b.total);
        default:
          return 0;
      }
    });

  const paginatedOrders = filteredOrders.slice(
    (pagination.page - 1) * pagination.limit,
    pagination.page * pagination.limit
  );

  const totalPages = Math.ceil(filteredOrders.length / pagination.limit);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Order Management</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search orders..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="border rounded px-3 py-2"
          />
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="border rounded px-3 py-2"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date {filters.sortBy === 'date' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort('total')}
              >
                Total {filters.sortBy === 'total' && (filters.sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{format(new Date(order.date), 'yyyy-MM-dd')}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                    className="border rounded px-3 py-2"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <span className="px-3 py-1">
          Page {pagination.page} of {totalPages}
        </span>
        <button
          onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
          disabled={pagination.page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

EnhancedOrderManagement.propTypes = {
  // Add any necessary prop types here
};

export default EnhancedOrderManagement; 