import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="object-cover w-full h-48"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-brand-accent">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
        </div>
        {product.variants && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              {product.variants.length} variants available
            </p>
          </div>
        )}
        <div className="mt-4 flex gap-2">
          <button 
            onClick={() => navigate(`/products/${product.id}`)}
            className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition-colors"
          >
            Details
          </button>
          <button 
            className="flex-1 bg-brand-accent text-white py-2 px-4 rounded hover:bg-brand-accent-dark transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    variants: PropTypes.array
  }).isRequired
};

export default ProductCard; 