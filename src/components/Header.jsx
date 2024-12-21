import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header() {
  const { user, logout } = useAuth();
  const { items = [] } = useCart() || {};
  
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-brand-accent">
            E-Shop
          </Link>

          <nav className="flex items-center space-x-6">
            <Link to="/products" className="hover:text-brand-accent">
              Products
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="hover:text-brand-accent relative">
                  Cart
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
                <Link to="/profile" className="hover:text-brand-accent">
                  Profile
                </Link>
                {user.role === 'admin' && (
                  <Link to="/dashboard" className="hover:text-brand-accent">
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="hover:text-brand-accent"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-brand-accent">
                  Login
                </Link>
                <Link to="/register" className="hover:text-brand-accent">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 