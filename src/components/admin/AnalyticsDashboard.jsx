import { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    recentSales: []
  });

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockStats = {
      totalSales: 15000,
      totalOrders: 150,
      averageOrderValue: 100,
      topProducts: [
        { name: 'Product 1', sales: 50 },
        { name: 'Product 2', sales: 30 },
        { name: 'Product 3', sales: 20 }
      ],
      recentSales: [
        { date: '2024-01', amount: 5000 },
        { date: '2024-02', amount: 6000 },
        { date: '2024-03', amount: 4000 }
      ]
    };
    setStats(mockStats);
  }, []);

  const chartData = {
    labels: stats.recentSales.map(sale => sale.date),
    datasets: [
      {
        label: 'Monthly Sales',
        data: stats.recentSales.map(sale => sale.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Sales</h3>
          <p className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="card">
          <h3 className="text-lg font-semibold mb-2">Average Order Value</h3>
          <p className="text-2xl font-bold">${stats.averageOrderValue}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Sales Trend</h3>
        <div className="h-64">
          <Bar 
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Top Products</h3>
          <div className="space-y-2">
            {stats.topProducts.map(product => (
              <div key={product.name} className="flex justify-between items-center">
                <span>{product.name}</span>
                <span className="font-semibold">{product.sales} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsDashboard; 