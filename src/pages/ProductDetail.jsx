import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import ProductReviews from '../components/products/ProductReviews';
import { toast } from 'react-toastify';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button
          onClick={() => navigate('/products')}
          className="bg-brand-accent text-white px-6 py-3 rounded-md hover:bg-brand-accent-dark"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images?.[0] || 'placeholder-image.jpg'
    });
    toast.success('Added to cart successfully!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images?.[selectedImage] || 'placeholder-image.jpg'}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-brand-accent' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-brand-accent">
              ${(product.price).toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </div>
          </div>

          {product.variants && (
            <div>
              <h3 className="text-sm font-medium mb-2">Variants</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-2 border rounded-md text-sm ${
                      selectedVariant?.id === variant.id
                        ? 'border-brand-accent text-brand-accent'
                        : 'border-gray-200'
                    }`}
                  >
                    {Object.entries(variant)
                      .filter(([key]) => !['id', 'price'].includes(key))
                      .map(([, value]) => `${value}`)
                      .join(' - ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="p-2 border rounded-md hover:bg-gray-50"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="p-2 border rounded-md hover:bg-gray-50"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-brand-accent text-white py-3 px-6 rounded-md hover:bg-brand-accent-dark disabled:opacity-50"
              disabled={product.stock === 0}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 disabled:opacity-50"
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-medium mb-2">Specifications</h3>
            <div className="border rounded-md divide-y">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex py-2 px-4">
                  <span className="font-medium w-1/3 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="w-2/3">
                    {Array.isArray(value) ? value.join(', ') : value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <ProductReviews productId={id} />
      </div>
    </div>
  );
}

export default ProductDetail; 