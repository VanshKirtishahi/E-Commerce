import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import orderService from '../services/orderService';
import OrderDetails from './OrderDetails';
import Modal from './Modal';

function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [user.id]);

  const loadOrders = async () => {
    try {
      const data = await orderService.getOrders(user.id);
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div 
          key={order.id}
          className="card cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => handleViewOrder(order)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Order #{order.id}</h3>
              <p className="text-sm text-gray-600">
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">${order.total.toFixed(2)}</p>
              <span className={`px-2 py-1 rounded text-sm ${
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status}
              </span>
            </div>
          </div>
        </div>
      ))}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Order Details"
      >
        {selectedOrder && <OrderDetails order={selectedOrder} />}
      </Modal>
    </div>
  );
}

export default OrderHistory; 