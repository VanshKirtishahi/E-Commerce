import { useState } from 'react';
import Modal from '../Modal';
import ProductForm from '../ProductForm';

function SellerDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const handleAddProduct = (productData) => {
    // TODO: Add API integration
    setProducts([...products, { id: Date.now(), ...productData }]);
    setIsModalOpen(false);
  };

  const handleUpdateOrderStatus = (orderId, status) => {
    // TODO: Add API integration
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Product Management</h3>
        <button 
          className="btn-primary mb-4"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Product
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-brand-muted rounded-lg">
            <p className="text-2xl font-bold">{products.length}</p>
            <p className="text-gray-600">Active Products</p>
          </div>
          <div className="p-4 bg-brand-muted rounded-lg">
            <p className="text-2xl font-bold">
              ${orders.reduce((sum, order) => sum + order.total, 0)}
            </p>
            <p className="text-gray-600">Total Sales</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-2">
          {orders.map((order) => (
            <div key={order.id} className="flex justify-between items-center p-2 hover:bg-brand-muted rounded">
              <span>Order #{order.id}</span>
              <select
                value={order.status}
                onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                className="input-field w-32"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Product"
      >
        <ProductForm onSubmit={handleAddProduct} />
      </Modal>
    </div>
  );
}

export default SellerDashboard; 