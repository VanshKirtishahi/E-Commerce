import { StarIcon } from '@heroicons/react/24/solid';
import PropTypes from 'prop-types';

function ProductReviews() {
  const reviews = [
    {
      id: 1,
      user: 'John Doe',
      rating: 5,
      comment: 'Excellent product! Exactly what I was looking for.',
      date: '2024-02-15'
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 4,
      comment: 'Good quality but a bit pricey.',
      date: '2024-02-10'
    }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      
      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 font-medium">{review.user}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

ProductReviews.propTypes = {
  productId: PropTypes.string.isRequired
};

export default ProductReviews; 