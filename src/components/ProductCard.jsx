import PropTypes from 'prop-types';

function ProductCard({ 
  product, 
  onAddToCart, 
  isSeller, 
  isOwner,
  onEdit,
  onDelete 
}) {
  return (
    <div className="card">
      <img 
        src={product.image || 'https://via.placeholder.com/150'} 
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-brand-text-dark">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-500">★</span>
        <span className="ml-1 text-sm text-gray-600">
          {product.rating} ({product.reviews?.length || 0} reviews)
        </span>
      </div>
      <p className="text-lg font-bold text-brand-accent">${product.price}</p>
      <p className="text-sm text-gray-600 mb-4">Stock: {product.stock}</p>

      <div className="flex justify-between items-center mt-4">
        {!isSeller && (
          <button 
            className="btn-primary w-full"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        )}
        {isOwner && (
          <div className="flex gap-2 w-full">
            <button 
              className="btn-primary flex-1"
              onClick={() => onEdit(product)}
            >
              Edit
            </button>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex-1"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    rating: PropTypes.number,
    stock: PropTypes.number,
    reviews: PropTypes.array
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isSeller: PropTypes.bool,
  isOwner: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default ProductCard; 