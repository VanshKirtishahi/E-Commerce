import PropTypes from 'prop-types';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

function ProductList({ filters = { category: 'all', priceRange: 'all', sortBy: 'featured' } }) {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || 'placeholder-image.jpg'
    });
    toast.success('Added to cart successfully!');
  };

  const filterProducts = () => {
    return products.filter(product => {
      // Category filter
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // Price range filter
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (max) {
          if (product.price < min || product.price > max) return false;
        } else {
          if (product.price < min) return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // Sort products
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
  };

  const filteredProducts = filterProducts();

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">
          {filteredProducts.length} Products
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.images?.[0] || 'placeholder-image.jpg'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <Link to={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-brand-accent">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-brand-accent text-white px-4 py-2 rounded-md hover:bg-brand-accent-dark"
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
}

ProductList.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    priceRange: PropTypes.string,
    sortBy: PropTypes.string
  })
};

export default ProductList; 