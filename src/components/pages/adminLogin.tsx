// file: AdminLogin.tsx
import React, { useState, useEffect } from 'react'; 
import { Lock, LogIn, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoginAdmin as loginAdminApi } from '../../api/api';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // START PERBAIKAN: Mengosongkan state saat komponen dimuat
  useEffect(() => {
    // Kosongkan state form untuk memastikan input bersih
    setUsername('');
    setPassword('');
    setError('');
  }, []); // [] memastikan ini hanya berjalan saat komponen pertama kali di-mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await loginAdminApi(username, password);
      console.log(response);

      // Logika di sini hanya berjalan jika status HTTP 2xx
      if (response.status === true && response.data?.token) {
        const token = response.data.token;
        if (token) localStorage.setItem('token', token);
        onLoginSuccess();
        navigate('/admin', { replace: true });
      } else if (response.message) {
        setError(response.message);
      } else {
        setError('Login gagal tak terduga. Silakan coba lagi.');
      }
    } catch (err: any) {
      console.error("Error from API catch:", err); 
      // Mengambil pesan error dari backend jika dilempar
      const errorMessage = err?.message || err?.error?.message || 'Terjadi kesalahan koneksi atau server. Silakan coba lagi.';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-3">
      {/* Container */}
      <div className="w-[90%] max-w-[340px] bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Lock size={38} className="text-[#F9B800]" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Admin Login</h2>
          <p className="text-gray-500 text-xs mt-1">
            Akses manajemen konten
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md flex items-center gap-2 text-xs">
              <AlertTriangle size={14} />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#F9B800] focus:border-[#F9B800] outline-none transition text-sm"
              placeholder="admin"
              // Mencegah browser menyimpan atau mengisi secara otomatis
              autoComplete="off" 
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#F9B800] focus:border-[#F9B800] outline-none transition text-sm"
              placeholder="********"
              // Mencegah browser menyimpan atau mengisi secara otomatis
              autoComplete="new-password" 
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#F9B800] text-black text-sm font-semibold rounded-md hover:bg-[#e0a700] transition-all flex items-center justify-center shadow-sm mt-3"
          >
            <LogIn size={16} className="mr-2" /> MASUK
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-5">
          <a href="/" className="text-gray-500 hover:text-[#F9B800] text-xs">
            ← Kembali ke Halaman Utama
          </a>
        </div>
      </div>
    </div>
  );
};