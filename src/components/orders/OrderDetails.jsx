import { useState } from 'react';
import PropTypes from 'prop-types';
import OrderTimeline from './OrderTimeline';

function OrderDetails({ order, onUpdateStatus, isAdmin }) {
  const [note, setNote] = useState('');

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

  const handleStatusUpdate = async (newStatus) => {
    if (onUpdateStatus) {
      await onUpdateStatus(order.id, newStatus, note);
      setNote('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
          <p className="text-sm text-gray-600">
            Placed on {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {isAdmin && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Update Order Status</h4>
          <div className="flex gap-2 mb-2">
            {['processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => handleStatusUpdate(status)}
                className={`px-3 py-1 rounded-full text-sm ${
                  order.status === status
                    ? 'bg-brand-accent text-white'
                    : 'bg-white border hover:bg-gray-50'
                }`}
                disabled={order.status === status}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Add a note (optional)"
            className="w-full p-2 border rounded"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Items</h4>
          <div className="space-y-2">
            {order.items.map(item => (
              <div 
                key={item.id} 
                className="flex justify-between items-center p-2 hover:bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Order Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shipping.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Shipping Address</h4>
          <div className="p-3 bg-gray-50 rounded">
            <p>{order.shippingAddress}</p>
          </div>
        </div>

        {order.trackingNumber && (
          <div>
            <h4 className="font-medium mb-2">Tracking Information</h4>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">{order.trackingNumber}</p>
              <a 
                href="#" 
                className="text-brand-accent hover:underline text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Implement tracking link
                }}
              >
                Track Package
              </a>
            </div>
          </div>
        )}
      </div>

      <OrderTimeline events={order.events || []} />
    </div>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
      })
    ).isRequired,
    subtotal: PropTypes.number.isRequired,
    shipping: PropTypes.number.isRequired,
    discount: PropTypes.number,
    total: PropTypes.number.isRequired,
    shippingAddress: PropTypes.string,
    trackingNumber: PropTypes.string,
    events: PropTypes.array
  }).isRequired,
  onUpdateStatus: PropTypes.func,
  isAdmin: PropTypes.bool
};

export default OrderDetails; 