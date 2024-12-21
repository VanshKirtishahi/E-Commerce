import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mock admin credentials
    if (email === 'admin@admin.com' && password === 'admin123') {
      const adminData = {
        id: '1',
        name: 'Admin User',
        email: 'admin@admin.com',
        role: 'admin'
      };
      login(adminData, 'mock-admin-token');
      navigate('/dashboard');
      return;
    }

    // Mock regular user login
    const userData = {
      id: '2',
      name: 'Regular User',
      email: email,
      role: 'buyer'
    };
    login(userData, 'mock-token');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
      </form>

      {/* Add helper text for testing */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Admin login:</p>
        <p>Email: admin@admin.com</p>
        <p>Password: admin123</p>
      </div>
    </div>
  );
}

export default Login; 