import { createContext, useContext, useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';

// Export the context so it can be imported elsewhere
export const CartContext = createContext();

// Load cart from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return { items: [] };
    }
    return JSON.parse(serializedState);
  } catch {
    return { items: [] };
  }
};

// Save cart to localStorage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    // Handle write errors
    console.error('Error saving cart state:', err);
  }
};

const cartReducer = (state = { items: [] }, action) => {
  let existingItem;
  let updatedItems;

  switch (action.type) {
    case 'ADD_TO_CART':
      existingItem = state.items.find(
        item => item.id === action.payload.id && 
        JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
      );

      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id && 
          JSON.stringify(item.variant) === JSON.stringify(action.payload.variant)
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }
      return { ...state, items: updatedItems };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCartState);

  useEffect(() => {
    saveCartState(state);
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  };

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 
