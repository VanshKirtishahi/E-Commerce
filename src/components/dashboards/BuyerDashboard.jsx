import { useState } from 'react';
import OrderHistory from '../OrderHistory';

function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-brand-accent' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-brand-accent' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Orders</h2>
          <OrderHistory />
        </div>
      )}

      {activeTab === 'profile' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          {/* Add profile component here */}
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard; 