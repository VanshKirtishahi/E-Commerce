import PropTypes from 'prop-types';

function OrderDetails({ order }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Order #{order.id}</h3>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">Order Date</p>
        <p>{new Date(order.date).toLocaleDateString()}</p>
      </div>

      <div className="space-y-2">
        {order.items.map(item => (
          <div key={item.id} className="flex justify-between items-center p-2 hover:bg-gray-50">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">Shipping Address</p>
          <p>{order.shippingAddress}</p>
        </div>
      )}

      {order.trackingNumber && (
        <div className="border-t pt-4">
          <p className="text-sm text-gray-600">Tracking Number</p>
          <p className="font-medium">{order.trackingNumber}</p>
        </div>
      )}
    </div>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    shippingAddress: PropTypes.string,
    trackingNumber: PropTypes.string,
  }).isRequired,
};

export default OrderDetails; 