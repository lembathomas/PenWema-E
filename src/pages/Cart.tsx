import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, removeFromCart, updateQuantity } from '../store';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Cart() {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdateQty = (id: string, qty: number) => {
    if (qty > 0) {
      dispatch(updateQuantity({ _id: id, quantity: qty }));
    }
  };

    if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Your Shopping Cart is Empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
        <Link to="/shop" className="inline-flex items-center px-8 py-3 border border-transparent text-sm font-bold rounded-full shadow-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          <ul className="divide-y divide-slate-100 border-t border-b border-slate-100">
            {items.map((item) => (
              <motion.li 
                key={item._id} 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex py-6 sm:py-8"
              >
                <div className="flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-24 h-24 rounded-2xl object-contain sm:w-32 sm:h-32 bg-slate-50 p-4 border border-slate-100" />
                </div>
                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-2">
                          <Link to={`/product/${item._id}`} className="hover:text-blue-600 transition-colors">{item.name}</Link>
                        </h3>
                      </div>
                      <p className="mt-2 text-base text-orange-500 font-extrabold font-mono">${item.price.toLocaleString()}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center gap-6">
                      <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 overflow-hidden">
                        <button onClick={() => handleUpdateQty(item._id, item.quantity - 1)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 focus:outline-none transition-colors">-</button>
                        <span className="px-4 py-2 font-bold text-slate-900 border-x border-slate-200 text-sm">{item.quantity}</span>
                        <button onClick={() => handleUpdateQty(item._id, item.quantity + 1)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 focus:outline-none transition-colors">+</button>
                      </div>
                      <button 
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 p-2 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-slate-50 rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">Order Summary</h2>
            <div className="flow-root">
              <dl className="-my-4 text-sm divide-y divide-slate-200">
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-slate-600 font-medium">Subtotal</dt>
                  <dd className="font-bold text-slate-900 font-mono">${total.toLocaleString()}</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-slate-600 font-medium">Shipping</dt>
                  <dd className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">Calculated at checkout</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-slate-600 font-medium">Tax</dt>
                  <dd className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">Calculated at checkout</dd>
                </div>
                <div className="py-6 flex items-center justify-between text-xl font-extrabold">
                  <dt className="text-slate-900">Total</dt>
                  <dd className="text-orange-500 font-mono">${total.toLocaleString()}</dd>
                </div>
              </dl>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="mt-8 w-full flex items-center justify-center bg-slate-900 rounded-full shadow-lg shadow-slate-900/20 py-4 px-4 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
            >
              Proceed to Checkout <ArrowRight className="ml-2 w-4 h-4" />
            </button>
            <div className="mt-6 text-center text-sm text-slate-500">
              <p>
                or <Link to="/shop" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Continue Shopping</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
