import React, { useState, useEffect } from 'react';
import { Footer } from '../Footer'; 
import { Toaster } from '../../components/ui/sonner'; 
import { AdminDashboard } from './adminDashboard'; 
import { AdminHeader } from './AdminHeader'; 
import { Link } from 'react-router-dom'; 
import { AdminLogin } from './adminLogin';

export default function AdminApp() {
    // PERBAIKAN: Inisialisasi state dengan memeriksa token di localStorage.
    // Jika token ada, isLoggedIn = true.
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); 

    // OPTIONAL: Periksa status token saat mount (untuk kasus token baru saja expired)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Dalam aplikasi nyata, tambahkan API call untuk memvalidasi token
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Wajib: Hapus token dari localStorage saat logout
        localStorage.removeItem('token'); 
    };

    if (!isLoggedIn) {
        return (
            // Tampilkan halaman login jika belum login
            <div className="min-h-screen">
                {/* Pastikan AdminLogin juga diperbarui dengan token check logic */}
                <AdminLogin onLoginSuccess={handleLoginSuccess} />
                <Toaster position="top-center" richColors />
            </div>
        );
    }
    
    // Tampilkan Dashboard Admin jika sudah login
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Admin Header harus memiliki tombol logout yang memanggil handleLogout */}
            <AdminHeader onLogout={handleLogout} />
            
            <main className="flex-grow">
                <AdminDashboard />
            </main>
            
            <Footer />
            
            <Toaster position="top-center" richColors />
        </div>
    );
}