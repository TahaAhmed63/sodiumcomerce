import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Default empty cart for SSR
    total: 0,
    itemCount: 0,
    isOpen: false,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id && item.variationId === action.payload.variationId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity });
      }
      state.itemCount += action.payload.quantity;
      state.total += action.payload.price * action.payload.quantity;
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.variationId === action.payload.variationId
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.itemCount -= item.quantity;
        state.total -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find(
        item => item.id === action.payload.id && item.variationId === action.payload.variationId
      );
      if (item) {
        item.quantity += 1;
        state.itemCount += 1;
        state.total += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const { id, variationId } = action.payload;
      const item = state.items.find(
        (item) => item.id === id && item.variationId === variationId
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.itemCount -= 1;
        state.total -= item.price;
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  toggleCart,
} = cartSlice.actions;
export default cartSlice.reducer;
