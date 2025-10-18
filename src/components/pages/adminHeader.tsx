import React from 'react';
import { Lock, LogOut } from 'lucide-react';
// import logo from 'figma:asset/ca0337a70b0d772e0505b965cd0ed7882de60418.png'; // Ganti dengan path logo aktual Anda

// 1. Tambahkan interface untuk props
interface AdminHeaderProps {
    onLogout: () => void;
}

// 2. Gunakan React.FC dan destructure onLogout
export const AdminHeader: React.FC<AdminHeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-md sticky top-0 z-[100]">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo dan Title */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Asumsi Anda memiliki path logo yang benar, atau hapus tag img ini jika tidak diperlukan */}
          {/* <img
            src={logo} 
            alt="STC Logo"
            className="h-12 flex-shrink-0"
          /> */}
          <span className="text-xl md:text-2xl font-bold text-gray-800 hidden sm:block">
            Admin Panel
          </span>
        </div>
        
        {/* 3. Ganti Link dengan Tombol yang memanggil onLogout */}
        <button 
            onClick={onLogout} 
            className="flex items-center gap-2 px-4 py-2 lg:px-6 lg:py-2.5 bg-[#F9B800] hover:bg-[#e0a700] text-black transition-all duration-300 rounded-lg shadow-md font-semibold text-sm md:text-base"
        >
            <LogOut size={16} className="text-black" /> 
            Keluar
        </button>
      </div>
    </header>
  );
};