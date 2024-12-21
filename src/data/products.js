export const products = [
  // Smartphones
  {
    id: 'sp001',
    name: 'Galaxy Ultra Pro',
    category: 'Smartphones',
    price: 1199.99,
    description: '6.8" AMOLED display, 200MP camera, 12GB RAM',
    stock: 50,
    variants: [
      { id: 'sp001-1', color: 'Phantom Black', storage: '256GB', price: 1199.99 },
      { id: 'sp001-2', color: 'Cosmic Gray', storage: '512GB', price: 1299.99 },
      { id: 'sp001-3', color: 'Pearl White', storage: '1TB', price: 1499.99 }
    ],
    specs: {
      screen: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      camera: '200MP + 12MP + 10MP',
      battery: '5000mAh'
    }
  },

  // Laptops
  {
    id: 'lt001',
    name: 'ProBook X360',
    category: 'Laptops',
    price: 1499.99,
    description: '15.6" 4K display, Intel i9, 32GB RAM',
    stock: 30,
    variants: [
      { id: 'lt001-1', processor: 'i7', ram: '16GB', storage: '512GB SSD', price: 1299.99 },
      { id: 'lt001-2', processor: 'i9', ram: '32GB', storage: '1TB SSD', price: 1499.99 },
      { id: 'lt001-3', processor: 'i9', ram: '64GB', storage: '2TB SSD', price: 1899.99 }
    ],
    specs: {
      display: '15.6" 4K OLED Touch',
      graphics: 'RTX 4070',
      battery: '12 hours',
      weight: '1.8kg'
    }
  },

  // Skincare
  {
    id: 'sk001',
    name: 'Advanced Serum Set',
    category: 'Skincare',
    price: 129.99,
    description: 'Complete anti-aging serum collection',
    stock: 100,
    variants: [
      { id: 'sk001-1', type: 'Normal Skin', size: '30ml', price: 129.99 },
      { id: 'sk001-2', type: 'Sensitive Skin', size: '30ml', price: 129.99 },
      { id: 'sk001-3', type: 'Combination Skin', size: '50ml', price: 159.99 }
    ],
    specs: {
      ingredients: ['Retinol', 'Vitamin C', 'Hyaluronic Acid', 'Niacinamide'],
      benefits: ['Anti-aging', 'Brightening', 'Hydrating'],
      usage: 'Morning and Evening'
    }
  },

  // Smart Home Devices
  {
    id: 'sh002',
    name: 'Smart Home Hub Pro',
    category: 'Smart Home',
    price: 249.99,
    description: 'Central hub for home automation with voice control',
    stock: 75,
    variants: [
      { id: 'sh002-1', color: 'Black', features: 'Standard', price: 249.99 },
      { id: 'sh002-2', color: 'White', features: 'Premium', price: 299.99 }
    ],
    specs: {
      compatibility: ['Alexa', 'Google Assistant', 'HomeKit'],
      connectivity: ['WiFi 6', 'Bluetooth 5.0', 'Zigbee'],
      features: ['Voice Control', 'Automation', 'Energy Monitoring']
    }
  },

  // Gaming Accessories
  {
    id: 'ga001',
    name: 'Pro Gaming Headset',
    category: 'Gaming',
    price: 199.99,
    description: 'Wireless gaming headset with spatial audio',
    stock: 60,
    variants: [
      { id: 'ga001-1', color: 'Black', connectivity: 'Wireless', price: 199.99 },
      { id: 'ga001-2', color: 'White', connectivity: 'Wireless', price: 199.99 },
      { id: 'ga001-3', color: 'RGB', connectivity: 'Wireless', price: 229.99 }
    ],
    specs: {
      driver: '50mm Neodymium',
      battery: '30 hours',
      features: ['Spatial Audio', 'Noise Cancelling', 'RGB Lighting']
    }
  },

  // Fitness Equipment
  {
    id: 'ft001',
    name: 'Smart Fitness Watch',
    category: 'Fitness',
    price: 299.99,
    description: 'Advanced fitness tracker with health monitoring',
    stock: 45,
    variants: [
      { id: 'ft001-1', size: '40mm', color: 'Black', price: 299.99 },
      { id: 'ft001-2', size: '44mm', color: 'Silver', price: 329.99 },
      { id: 'ft001-3', size: '44mm', color: 'Gold', price: 349.99 }
    ],
    specs: {
      sensors: ['Heart Rate', 'ECG', 'Blood Oxygen'],
      battery: '7 days',
      waterResistant: '5ATM'
    }
  }
];

// Enhanced categories with subcategories
export const categories = {
  Electronics: {
    name: 'Electronics',
    subcategories: [
      'Smartphones',
      'Laptops',
      'Tablets',
      'Cameras',
      'Audio'
    ],
    filters: ['Brand', 'Price Range', 'Storage', 'Screen Size']
  },
  Beauty: {
    name: 'Beauty',
    subcategories: [
      'Skincare',
      'Makeup',
      'Haircare',
      'Fragrances',
      'Tools'
    ],
    filters: ['Brand', 'Skin Type', 'Concern', 'Price Range']
  },
  Gaming: {
    name: 'Gaming',
    subcategories: [
      'Consoles',
      'Games',
      'Accessories',
      'PC Gaming',
      'Virtual Reality'
    ],
    filters: ['Platform', 'Genre', 'Price Range']
  },
  'Smart Home': {
    name: 'Smart Home',
    subcategories: [
      'Security',
      'Lighting',
      'Climate Control',
      'Entertainment',
      'Automation'
    ],
    filters: ['Brand', 'Compatibility', 'Price Range']
  },
  Fitness: {
    name: 'Fitness',
    subcategories: [
      'Wearables',
      'Equipment',
      'Apparel',
      'Supplements',
      'Accessories'
    ],
    filters: ['Type', 'Brand', 'Price Range', 'Activity']
  }
};

// Product specifications template
export const productSpecs = {
  Smartphones: {
    required: ['screen', 'processor', 'camera', 'battery'],
    optional: ['5G', 'waterResistant', 'chargingSpeed']
  },
  Laptops: {
    required: ['processor', 'ram', 'storage', 'graphics'],
    optional: ['batteryLife', 'weight', 'ports']
  },
  Skincare: {
    required: ['ingredients', 'skinType', 'volume'],
    optional: ['benefits', 'usage', 'expiryPeriod']
  }
};

// Common product attributes
export const productAttributes = {
  colors: [
    { name: 'Phantom Black', hex: '#000000' },
    { name: 'Pearl White', hex: '#FFFFFF' },
    { name: 'Cosmic Gray', hex: '#808080' },
    { name: 'Rose Gold', hex: '#B76E79' }
  ],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  ratings: [1, 2, 3, 4, 5]
}; 