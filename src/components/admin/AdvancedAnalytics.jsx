import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function AdvancedAnalytics() {
  const [timeframe, setTimeframe] = useState('week');
  const [metrics, setMetrics] = useState({
    revenue: [],
    orders: [],
    customers: [],
    products: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [timeframe]);

  const loadAnalytics = async () => {
    // TODO: Replace with actual API call
    const mockData = {
      revenue: [
        { date: '2024-01', amount: 5000 },
        { date: '2024-02', amount: 6000 },
        { date: '2024-03', amount: 4500 },
        { date: '2024-04', amount: 7000 }
      ],
      orders: [
        { date: '2024-01', count: 50 },
        { date: '2024-02', count: 65 },
        { date: '2024-03', count: 45 },
        { date: '2024-04', count: 70 }
      ],
      customers: {
        new: 120,
        returning: 80,
        total: 200
      },
      products: [
        { name: 'Product A', sales: 100 },
        { name: 'Product B', sales: 80 },
        { name: 'Product C', sales: 60 },
        { name: 'Product D', sales: 40 }
      ]
    };

    setMetrics(mockData);
    setLoading(false);
  };

  const revenueData = {
    labels: metrics.revenue.map(item => item.date),
    datasets: [
      {
        label: 'Revenue',
        data: metrics.revenue.map(item => item.amount),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const ordersData = {
    labels: metrics.orders.map(item => item.date),
    datasets: [
      {
        label: 'Orders',
        data: metrics.orders.map(item => item.count),
        backgroundColor: 'rgba(153, 102, 255, 0.5)'
      }
    ]
  };

  const customerData = {
    labels: ['New Customers', 'Returning Customers'],
    datasets: [
      {
        data: [metrics.customers?.new || 0, metrics.customers?.returning || 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)'
        ]
      }
    ]
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="border rounded p-2"
        >
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold">
            ${metrics.revenue.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold">
            {metrics.orders.reduce((sum, item) => sum + item.count, 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Customers</h3>
          <p className="text-2xl font-bold">{metrics.customers?.total || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Avg. Order Value</h3>
          <p className="text-2xl font-bold">
            ${Math.round(
              metrics.revenue.reduce((sum, item) => sum + item.amount, 0) /
              metrics.orders.reduce((sum, item) => sum + item.count, 0)
            ).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Revenue Trend</h3>
          <Line data={revenueData} options={{ maintainAspectRatio: false }} height={300} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Order Volume</h3>
          <Bar data={ordersData} options={{ maintainAspectRatio: false }} height={300} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Customer Distribution</h3>
          <Doughnut data={customerData} options={{ maintainAspectRatio: false }} height={300} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Top Products</h3>
          <div className="space-y-4">
            {metrics.products.map((product, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.sales} sales</div>
                </div>
                <div className="w-48 h-2 bg-gray-200 rounded">
                  <div
                    className="h-full bg-brand-accent rounded"
                    style={{
                      width: `${(product.sales / metrics.products[0].sales) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedAnalytics; 