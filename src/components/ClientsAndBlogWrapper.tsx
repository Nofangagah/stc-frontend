import React from 'react';
import { Clients } from './Clients';
import { Blog } from './Blog';

export const ClientsAndBlogWrapper = () => {
  return (
    <div className="relative">
      {/* UNIFIED SMOOTH BACKGROUND - hanya untuk estetika */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient dasar yang smooth dari gray ke kuning */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-[#FFFBF0] via-[#FFF8E1] to-[#FFE999]"></div>
        
        {/* Soft Floating Blobs - Tersebar merata di seluruh area */}
        <div className="absolute top-[5%] right-[5%] w-[500px] h-[500px] bg-[#F9B800]/10 rounded-full blur-3xl animate-blob animation-delay-1000"></div>
        <div className="absolute top-[25%] left-[0%] w-[600px] h-[600px] bg-yellow-400/12 rounded-full blur-3xl animate-blob animation-delay-3000"></div>
        <div className="absolute top-[45%] right-[30%] w-[450px] h-[450px] bg-[#F9B800]/15 rounded-full blur-3xl animate-blob animation-delay-5000"></div>
        <div className="absolute top-[65%] left-[20%] w-[550px] h-[550px] bg-[#FFD700]/12 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        
        {/* Floating circles untuk Blog section area */}
        <div className="absolute top-[75%] right-[15%] w-[480px] h-[480px] bg-[#F9B800]/18 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-[15%] left-[10%] w-96 h-96 bg-[#F9B800]/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-[80%] right-[5%] w-[420px] h-[420px] bg-[#F9B800]/22 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute bottom-[10%] left-[40%] w-[380px] h-[380px] bg-[#FFD700]/15 rounded-full blur-3xl animate-float-fast"></div>
        
        {/* Subtle Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle, #000000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Clients Section - dengan ID untuk navbar */}
      <div className="relative">
        <Clients />
      </div>

      {/* Blog Section - dengan ID untuk navbar */}
      <div className="relative">
        <Blog />
      </div>
    </div>
  );
};
