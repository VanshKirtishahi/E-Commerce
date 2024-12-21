import { useAuth } from '../hooks/useAuth';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import SellerDashboard from '../components/dashboards/SellerDashboard';
import BuyerDashboard from '../components/dashboards/BuyerDashboard';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4">
      <h1 className="page-title">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome back, {user?.name}!</p>
      
      {user?.role === 'admin' && <AdminDashboard />}
      {user?.role === 'seller' && <SellerDashboard />}
      {user?.role === 'buyer' && <BuyerDashboard />}
    </div>
  );
}

export default Dashboard;