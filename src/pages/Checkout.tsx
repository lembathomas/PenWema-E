import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CreditCard, Smartphone, CheckCircle } from 'lucide-react';

export function Checkout() {
  const { total, items } = useSelector((state: RootState) => state.cart);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (data: any) => {
    setIsProcessing(true);
    // Simulate API call for checkout / M-PESA STK push
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Order Confirmed!</h1>
        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto leading-relaxed">Thank you for your purchase. Your enterprise equipment order has been placed successfully and is being processed.</p>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 max-w-sm mx-auto mb-8">
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1">Order Reference</p>
          <p className="text-slate-900 font-mono text-xl font-bold">#{Math.floor(Math.random() * 1000000)}</p>
        </div>
        <a href="/" className="inline-block bg-slate-900 text-white font-bold px-8 py-4 rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
          Return to Dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-10">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Shipping Information */}
              <div className="bg-white shadow-sm rounded-3xl border border-slate-200 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                    <input {...register('firstName', { required: true })} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all" />
                    {errors.firstName && <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase">Required</span>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                    <input {...register('lastName', { required: true })} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all" />
                    {errors.lastName && <span className="text-red-500 text-[10px] font-bold mt-1 block uppercase">Required</span>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                    <input type="email" {...register('email', { required: true })} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Corporate Address</label>
                    <input {...register('address', { required: true })} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">City</label>
                    <input {...register('city', { required: true })} className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                    <input {...register('phone', { required: true })} placeholder="e.g. 0712345678" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all" />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white shadow-sm rounded-3xl border border-slate-200 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Payment Method</h2>
                <div className="space-y-4">
                  <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50 shadow-sm' : 'border-slate-100 hover:border-slate-300'}`}>
                    <input type="radio" name="paymentMethod" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} className="h-4 w-4 text-green-600 focus:ring-green-500 border-slate-300" />
                    <Smartphone className={`ml-4 w-6 h-6 ${paymentMethod === 'mpesa' ? 'text-green-600' : 'text-slate-400'}`} />
                    <div className="ml-4">
                      <span className="block text-sm font-bold text-slate-900">M-Pesa Express (STK Push)</span>
                      <span className="block text-[11px] text-slate-500 font-medium">Pay directly from your phone</span>
                    </div>
                  </label>
                  
                  <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-slate-100 hover:border-slate-300'}`}>
                    <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    <CreditCard className={`ml-4 w-6 h-6 ${paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div className="ml-4">
                      <span className="block text-sm font-bold text-slate-900">Credit / Debit Card</span>
                      <span className="block text-[11px] text-slate-500 font-medium">Secure payment via Stripe</span>
                    </div>
                  </label>
                </div>

                {paymentMethod === 'mpesa' && (
                  <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-600 mb-3 uppercase tracking-wider">M-Pesa Mobile Number</p>
                    <input {...register('mpesaNumber', { required: paymentMethod === 'mpesa' })} placeholder="07XX XXX XXX" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all shadow-sm" />
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-full shadow-lg shadow-slate-900/20 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:bg-slate-400 disabled:shadow-none transition-all"
              >
                {isProcessing ? 'Processing Order...' : `Pay $${total.toLocaleString()} Securely`}
              </button>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white shadow-sm rounded-3xl border border-slate-200 p-6 sm:p-8 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Order Summary</h2>
              <ul className="divide-y divide-slate-100 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map(item => (
                  <li key={item._id} className="py-4 flex items-center">
                    <img src={item.image} alt="" className="w-16 h-16 rounded-xl border border-slate-100 object-contain p-2 bg-slate-50" />
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] font-medium text-slate-500 uppercase mt-1">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-extrabold text-orange-500 font-mono ml-4">
                      ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
              
              <dl className="space-y-4 text-sm text-slate-600">
                <div className="flex justify-between">
                  <dt className="font-medium">Subtotal</dt>
                  <dd className="font-bold text-slate-900 font-mono">${total.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium">Shipping</dt>
                  <dd className="font-bold text-green-600 uppercase text-[11px] tracking-wider">Free</dd>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-6 text-xl font-extrabold text-slate-900">
                  <dt>Total</dt>
                  <dd className="text-orange-500 font-mono">${total.toLocaleString()}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
