import { useState } from 'react';
import PropTypes from 'prop-types';

function BillingInfo({ initialData, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onUpdate(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating billing info:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Billing Information</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-brand-accent hover:text-brand-accent-dark"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name on Card</label>
            <input
              type="text"
              value={formData.cardName}
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Card Number</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="input-field"
              required
              maxLength="16"
              pattern="\d*"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Expiry Date</label>
              <input
                type="text"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="input-field"
                placeholder="MM/YY"
                required
                maxLength="5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="input-field"
                required
                maxLength="4"
                pattern="\d*"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Billing Address</label>
            <textarea
              value={formData.billingAddress}
              onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value })}
              className="input-field"
              rows={3}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Card Information</h3>
            <p>•••• •••• •••• {formData.cardNumber.slice(-4)}</p>
            <p className="text-sm text-gray-600">Expires {formData.expiryDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Billing Address</h3>
            <p>{formData.billingAddress || 'No billing address provided'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

BillingInfo.propTypes = {
  initialData: PropTypes.shape({
    cardName: PropTypes.string,
    cardNumber: PropTypes.string,
    expiryDate: PropTypes.string,
    cvv: PropTypes.string,
    billingAddress: PropTypes.string
  }),
  onUpdate: PropTypes.func.isRequired
};

export default BillingInfo; 