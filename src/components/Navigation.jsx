import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navigation() {
  const { getCartItemsCount } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-brand-accent">
            E-Shop
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/products" className="hover:text-brand-accent">
              Products
            </Link>
            <Link to="/cart" className="hover:text-brand-accent relative">
              Cart
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 