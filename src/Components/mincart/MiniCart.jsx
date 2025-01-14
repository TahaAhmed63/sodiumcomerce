'use client';

import { useSelector, useDispatch } from "react-redux";
import { toggleCart, removeItem, incrementQuantity, decrementQuantity } from "../../store/slice/cartslice";
import { ShoppingBag } from 'lucide-react';
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Component() {
  const dispatch = useDispatch();
    const [isHydrated, setIsHydrated] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const isOpen = useSelector((state) => state.cart.isOpen);
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  const handleClose = () => {
    dispatch(toggleCart(false));
  };

  const handleRemoveItem = (id, variationId) => {
    dispatch(removeItem({ id, variationId }));
  };

  const handleIncrementQuantity = (id, variationId) => {
    dispatch(incrementQuantity({ id, variationId }));
  };

  const handleDecrementQuantity = (id, variationId) => {
    dispatch(decrementQuantity({ id, variationId }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={handleClose}
      />
      <div className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center gap-2 p-4 border-b">
          <ShoppingBag className="h-6 w-6 text-orange-500" />
          <span className="text-lg font-medium text-orange-500">Shopping Basket</span>
          <button 
            onClick={handleClose}
            className="ml-auto text-2xl text-gray-400 hover:text-gray-500 bg-white"
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-200px)] overflow-auto cart-body">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.variationId}`} className="p-4 border-b">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleRemoveItem(item.id, item.variationId)}
                  className="text-2xl p-0 border-0 b-0 bg-white text-gray-400 hover:text-gray-500"
                  aria-label="Remove item"
                >
                  ×
                </button>
                <img
                  src={item.img?.src || item.img[0]}
                  alt={item.id}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{item?.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleDecrementQuantity(item.id, item.variationId)}
                      className="flex h-6 w-6 items-center justify-center rounded border text-sm"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrementQuantity(item.id, item.variationId)}
                      className="flex h-6 w-6 items-center justify-center rounded border text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-medium">Rs {item.price * item.quantity}.00</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t bg-white">
          <div className="p-4">
            <div className="flex items-center justify-between border-b border-dashed pb-4 mb-4">
              <span className="font-medium">Subtotal:</span>
              <span className="font-medium">Rs {calculateSubtotal()}.00</span>
            </div>
            
            <div className="grid gap-2 gy-3">
              <Link 
                href="/cart"
                className="block w-full rounded bg-orange-500 px-4 py-2 text-center text-white hover:bg-orange-600 my-2"
                onClick={handleClose}
              >
                View basket
              </Link>
              <Link
                href="/checkout"
                className="block w-full rounded bg-orange-500 px-4 py-2 text-center text-white hover:bg-orange-600 my-2"
                onClick={handleClose}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
