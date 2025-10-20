import React, { useState, useEffect } from 'react';
import { Footer } from '../Footer'; 
import { Toaster } from '../../components/ui/sonner'; 
import { AdminDashboard } from './adminDashboard'; 
import { AdminHeader } from './adminHeader'; 
import { Link } from 'react-router-dom'; 
import { AdminLogin } from './adminLogin';

export default function AdminApp() {
   
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); 

  
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            
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
      
        localStorage.removeItem('token'); 
    };

    if (!isLoggedIn) {
        return (
          
            <div className="min-h-screen">
               
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