import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data: any) => {
    try {
      const res = await axios.post('/api/auth/login', data);
      dispatch(loginSuccess({ user: res.data.user, token: res.data.token }));
      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg('Invalid credentials. Use admin@penwema.com / admin for testing.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Secure access to your enterprise dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Email address</label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="appearance-none block w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all"
                placeholder="admin@penwema.com"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                {...register('password', { required: true })}
                className="appearance-none block w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 shadow-inner transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {errorMsg && <p className="text-red-500 text-[11px] font-bold uppercase text-center">{errorMsg}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-full shadow-lg shadow-slate-900/20 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all"
            >
              Access Account
            </button>
          </div>
          
          <p className="text-center text-xs text-slate-400 mt-6">
            New corporate client? <a href="#" className="font-bold text-blue-600 hover:text-blue-500">Request account</a>
          </p>
        </form>
      </div>
    </div>
  );
}
