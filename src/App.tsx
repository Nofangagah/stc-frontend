// src/App.tsx (Atau file routing utama Anda)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';

// Import komponen halaman utama Anda
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Trainers } from './components/Trainers';
import { ClientsAndBlogWrapper } from './components/ClientsAndBlogWrapper';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer'; 
// Import komponen Admin yang baru
import AdminApp from './components/pages/adminApp'; 


// --- 1. Buat Wrapper untuk Halaman Utama ---
// Ini akan memastikan semua komponen (termasuk Footer) berada di dalam BrowserRouter
const HomePageWrapper = () => (
    <div className="min-h-screen">
      {/* Semua komponen yang menggunakan Link (seperti Navbar dan Footer) 
          SEKARANG berada di bawah BrowserRouter melalui Route yang memanggil HomePageWrapper */}
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Trainers />
      <ClientsAndBlogWrapper />
      <Testimonials />
      <Contact />
      <Footer /> 
      <Toaster position="top-center" richColors />
    </div>
);


// --- 2. Komponen Root Aplikasi dengan Routing ---
export default function App() {
    return (
        // SEMUA KOMPONEN YANG MENGGUNAKAN 'LINK' HARUS ADA DI DALAM BROWSWERROUTER INI
        <BrowserRouter>
            <Routes>
                {/* Rute 1: Halaman Utama */}
                <Route path="/" element={<HomePageWrapper />} />
                
                {/* Rute 2: Halaman Login Admin (AdminApp mengurus login -> dashboard) */}
                {/* Kami hanya perlu satu rute di sini karena AdminApp akan mengurus login/dashboard internal */}
                <Route path="/admin-login" element={<AdminApp />} />
                <Route path="/admin" element={<AdminApp />} />
                
                {/* Rute opsional lainnya, misalnya 404 */}
                <Route path="*" element={<p className="text-center mt-20">404 Not Found</p>} />
            </Routes>
        </BrowserRouter>
    );
}

// Catatan: Jika Anda memindahkan komponen AdminApp.tsx ke folder pages/Admin, 
// pastikan path importnya di atas sudah benar.