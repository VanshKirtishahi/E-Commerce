import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import UserProfile from '../components/profile/UserProfile';
import SecuritySettings from '../components/profile/SecuritySettings';
import NotificationSettings from '../components/profile/NotificationSettings';
import BillingInfo from '../components/profile/BillingInfo';
import AddressBook from '../components/profile/AddressBook';
import profileService from '../services/profileService';

function Profile() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState(null);
  const [billingInfo, setBillingInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [profileData, billingData] = await Promise.all([
        profileService.getProfile(),
        profileService.getBillingInfo()
      ]);
      setNotifications(profileData.notifications);
      setBillingInfo(billingData);
      setAddresses(profileData.addresses || []);
    } catch (err) {
      setError('Error loading profile data');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (userData) => {
    try {
      const updatedUser = await profileService.updateProfile(userData);
      login(updatedUser, user.token);
      return true;
    } catch (err) {
      setError('Failed to update profile');
      console.error('Error:', err);
      return false;
    }
  };

  const handlePasswordUpdate = async (currentPassword, newPassword) => {
    try {
      await profileService.updatePassword(currentPassword, newPassword);
      return true;
    } catch (err) {
      throw new Error(`Failed to update password: ${err.message}`);
    }
  };

  const handleNotificationUpdate = async (settings) => {
    try {
      await profileService.updateNotifications(settings);
      setNotifications(settings);
    } catch (err) {
      setError('Failed to update notification settings');
      console.error('Error:', err);
    }
  };

  const handleBillingUpdate = async (billingData) => {
    try {
      await profileService.updateBillingInfo(billingData);
      setBillingInfo(billingData);
    } catch (err) {
      setError('Failed to update billing information');
      console.error('Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-4 border-b mb-6">
        <button
          className={`px-4 py-2 ${
            activeTab === 'profile' ? 'border-b-2 border-brand-accent' : ''
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'security' ? 'border-b-2 border-brand-accent' : ''
          }`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'notifications' ? 'border-b-2 border-brand-accent' : ''
          }`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'billing' ? 'border-b-2 border-brand-accent' : ''
          }`}
          onClick={() => setActiveTab('billing')}
        >
          Billing
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === 'addresses' ? 'border-b-2 border-brand-accent' : ''
          }`}
          onClick={() => setActiveTab('addresses')}
        >
          Addresses
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'profile' && (
          <UserProfile onUpdate={handleProfileUpdate} />
        )}

        {activeTab === 'security' && (
          <SecuritySettings onUpdatePassword={handlePasswordUpdate} />
        )}

        {activeTab === 'notifications' && (
          <NotificationSettings
            initialSettings={notifications || {}}
            onUpdate={handleNotificationUpdate}
          />
        )}

        {activeTab === 'billing' && (
          <BillingInfo
            initialData={billingInfo}
            onUpdate={handleBillingUpdate}
          />
        )}

        {activeTab === 'addresses' && (
          <AddressBook
            addresses={addresses}
            onAdd={(address) => setAddresses([...addresses, address])}
            onUpdate={(id, newAddress) => 
              setAddresses(addresses.map(addr => 
                addr.id === id ? { ...addr, ...newAddress } : addr
              ))
            }
            onDelete={(id) => 
              setAddresses(addresses.filter(addr => addr.id !== id))
            }
            onSetDefault={(id) =>
              setAddresses(addresses.map(addr => ({
                ...addr,
                isDefault: addr.id === id
              })))
            }
          />
        )}
      </div>
    </div>
  );
}

export default Profile; 