import { useState } from 'react';
import AdminOrderManagement from '../admin/AdminOrderManagement';
import AnalyticsDashboard from '../admin/AnalyticsDashboard';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('analytics');

  return (
    <div className="space-y-6">
      <div className="flex gap-4 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'analytics' ? 'border-b-2 border-brand-accent' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-brand-accent' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'users' ? 'border-b-2 border-brand-accent' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      {activeTab === 'analytics' && <AnalyticsDashboard />}
      {activeTab === 'orders' && <AdminOrderManagement />}
      {activeTab === 'users' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          {/* User management component will be added */}
        </div>
      )}
    </div>
  );
}

export default AdminDashboard; 