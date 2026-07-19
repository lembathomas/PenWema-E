import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, logout } from '../store';
import { useNavigate, Navigate } from 'react-router-dom';
import { Users, Package, ShoppingCart, DollarSign, LogOut } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function AdminDashboard() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Weekly Revenue ($)',
        data: [12000, 19000, 15000, 22000, 25000, 18000, 21000],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
    },
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Admin Sidebar */}
      <div className="w-64 bg-slate-900 text-white min-h-screen p-6 shadow-xl relative z-10">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">P</div>
          <h2 className="text-xl font-extrabold tracking-tight text-blue-400 italic">PenWema<span className="text-slate-300 font-normal">Tech</span></h2>
        </div>
        
        <h3 className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mb-4">Core Management</h3>
        <nav className="space-y-2">
          <a href="#" className="flex items-center gap-3 bg-blue-600 text-white px-4 py-3 rounded-xl font-medium shadow-md shadow-blue-900/50"><DollarSign className="w-5 h-5"/> <span className="text-sm">Dashboard</span></a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-xl transition-colors font-medium"><Package className="w-5 h-5"/> <span className="text-sm">Products</span></a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-xl transition-colors font-medium"><ShoppingCart className="w-5 h-5"/> <span className="text-sm">Orders</span></a>
          <a href="#" className="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-3 rounded-xl transition-colors font-medium"><Users className="w-5 h-5"/> <span className="text-sm">Customers</span></a>
        </nav>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 px-4 py-3 rounded-xl transition-colors mt-auto absolute bottom-6 w-[calc(100%-3rem)] font-medium"
        >
          <LogOut className="w-5 h-5"/> <span className="text-sm">Secure Sign Out</span>
        </button>
      </div>

      {/* Admin Content */}
      <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-sm text-slate-500 mt-1">Enterprise Metrics & Analytics</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600 font-bold text-sm">System Admin</span>
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold shadow-md">SA</div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Revenue</h3>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><DollarSign className="w-5 h-5"/></div>
            </div>
            <p className="text-3xl font-extrabold text-orange-500 font-mono">$132,000</p>
            <p className="text-green-600 text-[11px] font-bold mt-2 uppercase flex items-center"><span className="mr-1">↑</span> 14% from last month</p>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Orders</h3>
              <div className="p-2 bg-green-50 text-green-600 rounded-xl"><ShoppingCart className="w-5 h-5"/></div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">45</p>
            <p className="text-green-600 text-[11px] font-bold mt-2 uppercase flex items-center"><span className="mr-1">↑</span> 5% from last week</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Products</h3>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl"><Package className="w-5 h-5"/></div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">124</p>
            <p className="text-orange-500 text-[11px] font-bold mt-2 uppercase flex items-center">12 items low stock</p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Customers</h3>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-xl"><Users className="w-5 h-5"/></div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">892</p>
            <p className="text-green-600 text-[11px] font-bold mt-2 uppercase flex items-center"><span className="mr-1">↑</span> 22 new this week</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 mb-8">
          <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight">Sales Overview</h3>
          <div className="h-80 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

      </div>
    </div>
  );
}
