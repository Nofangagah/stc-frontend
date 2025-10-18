import React, { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ChevronUp, ChevronDown } from 'lucide-react';

/**
 * Data layanan/services - Siap untuk sistem CRUD melalui dashboard admin
 * Struktur data yang konsisten memudahkan integrasi dengan backend/database
 * 
 * Field yang tersedia:
 * - id: Unique identifier (akan diganti dengan ID dari database)
 * - title: Judul layanan
 * - price: Harga layanan
 * - description: Deskripsi singkat layanan
 * - image: URL gambar layanan
 * - details: Array berisi detail/fitur layanan
 * - category: Kategori layanan untuk filtering (dewasa/anak/corporate)
 * - status: Status aktif/nonaktif layanan
 * - order: Urutan tampilan di website
 * - createdAt: Timestamp pembuatan (akan diisi oleh backend)
 * - updatedAt: Timestamp update terakhir (akan diisi oleh backend)
 */
const servicesData = [
  {
    id: 1,
    title: 'Public Speaking Intensive',
    price: 'Rp. 1.000.000,-',
    description: 'Belajar bagaimana tampil maksimal dan percaya diri ketika berbicara di depan umum.',
    image: 'https://images.unsplash.com/photo-1759922378092-14917cba3f59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzcGVha2luZyUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjAyMDM3ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: [
      'Total 6x pertemuan',
      'Durasi setiap pertemuan 1,5 jam',
      'Jadwal Batch 1 (Senin & Rabu 16.30-18.00 WIB) & Batch 2 (Selasa & Kamis 14.30-16.00 WIB)',
      'Fasilitas: Sertifikat, alat tulis, snack, softfile video praktik'
    ],
    category: 'dewasa',
    status: 'active',
    order: 1
  },
  {
    id: 2,
    title: 'Master of Ceremony Intensive',
    price: 'Rp. 1.000.000,-',
    description: 'Belajar menjadi MC profesional dengan beragam kategori acara formal/semi formal/nonformal.',
    image: 'https://images.unsplash.com/photo-1740630267005-db9af10c0164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXN0ZXIlMjBjZXJlbW9ueSUyMGV2ZW50fGVufDF8fHx8MTc2MDIyMDkyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    details: [
      'Total 6x pertemuan',
      'Durasi setiap pertemuan 1,5 jam',
      'Jadwal Selasa & Kamis 16.00-17.30 WIB',
      'Fasilitas: Sertifikat, alat tulis, snack, softfile video praktik'
    ],
    category: 'dewasa',
    status: 'active',
    order: 2
  },
  {
    id: 3,
    title: 'Radio Announcer Intensive',
    price: 'Rp. 1.100.000,-',
    description: 'Belajar bagaimana menjadi penyiar radio, olah vokal dan teknis siaran.',
    image: 'https://images.unsplash.com/photo-1581092800573-6afa755dcdc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWRpbyUyMGFubm91bmNlciUyMGJyb2FkY2FzdGluZ3xlbnwxfHx8fDE3NjAyMjA5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: [
      'Total 6x pertemuan',
      'Durasi setiap pertemuan 1,5 jam',
      'Jadwal Rabu & Jumat pukul 16.00-17.30 WIB',
      'Fasilitas: Sertifikat, alat tulis, snack, softfile rekaman praktik'
    ],
    category: 'dewasa',
    status: 'active',
    order: 3
  },
  {
    id: 4,
    title: 'Kids Intensive Program (Public Speaking)',
    price: 'Rp. 655.000,-',
    description: 'Belajar lebih percaya diri dan berani ketika berbicara di depan umum.',
    image: 'https://images.unsplash.com/photo-1618079525667-2162b29ac0d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcHVibGljJTIwc3BlYWtpbmd8ZW58MXx8fHwxNzYwMjIwOTY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    details: [
      'Total 5x pertemuan',
      'Durasi setiap pertemuan 1 jam',
      'Jadwal setiap Jumat pukul 15.00-16.00 WIB',
      'Fasilitas: Sertifikat, alat tulis, snack, softfile video praktik'
    ],
    category: 'anak',
    status: 'active',
    order: 4
  },
  {
    id: 5,
    title: 'Teens Intensive Program (Public Speaking)',
    price: 'Rp. 755.000,-',
    description: 'Belajar lebih percaya diri dan berani ketika berbicara di depan umum.',
    image: 'https://images.unsplash.com/photo-1660794486044-ff1072c442f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWVuYWdlciUyMHByZXNlbnRhdGlvbiUyMHNwZWFraW5nfGVufDF8fHx8MTc2MDIyMDk2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    details: [
      'Total 5x pertemuan',
      'Durasi setiap pertemuan 1 jam',
      'Jadwal setiap Jumat pukul 16.00-17.00 WIB',
      'Fasilitas: Sertifikat, alat tulis, snack, softfile video praktik'
    ],
    category: 'remaja',
    status: 'active',
    order: 5
  },
  {
    id: 6,
    title: 'Private Class',
    price: 'Mulai dari Rp. 1.500.000,-',
    description: 'Materi disesuaikan dengan kebutuhan peserta dengan pilihan public speaking, MC, radio announcer, personal branding, Voice Over, content creator, storytelling, grooming, leadership, service excellent, business presentation, debat, etc.',
    image: 'https://images.unsplash.com/photo-1664802273197-7cdd6a6cbc6e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwY2xhc3MlMjB0cmFpbmluZ3xlbnwxfHx8fDE3NjAyMjA5NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    details: [
      'Total 4x pertemuan',
      'Durasi setiap pertemuan 1 jam',
      'Jadwal fleksibel dapat disesuaikan'
    ],
    category: 'private',
    status: 'active',
    order: 6
  },
  {
    id: 7,
    title: 'Corporate Training',
    price: 'Hubungi Kami',
    description: 'Materi disesuaikan dengan kebutuhan instansi/perusahaan.',
    image: 'https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0cmFpbmluZyUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MDIyMDkyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    details: [
      'Two Days Training > 12 hours',
      'Full Day Training > 6 hours',
      'Half Day Training > 4 hours'
    ],
    category: 'corporate',
    status: 'active',
    order: 7
  }
];

export const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter hanya layanan yang aktif dan urutkan berdasarkan field 'order'
  // Ini akan berguna ketika terhubung dengan dashboard admin
  const activeServices = servicesData
    .filter(service => service.status === 'active')
    .sort((a, b) => a.order - b.order);

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < servicesData.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === activeServices.length - 1;

  const getCardStyle = (index) => {
    const position = index - activeIndex;
    const totalCards = activeServices.length;
    
    // Normalize position to handle wrap-around
    let normalizedPosition = position;
    if (position > totalCards / 2) {
      normalizedPosition = position - totalCards;
    } else if (position < -totalCards / 2) {
      normalizedPosition = position + totalCards;
    }

    // Show cards in range: previous 2, current, next 2
    if (normalizedPosition < -2 || normalizedPosition > 2) {
      return {
        display: 'none'
      };
    }

    const baseTranslateY = 40; // Base spacing between cards
    const baseScale = 0.95; // Scale reduction per card
    const baseOpacity = 0.7; // Opacity reduction per card

    if (normalizedPosition === 0) {
      // Active card - front and center, no blur
      return {
        transform: 'translateY(0) scale(1)',
        zIndex: 50,
        opacity: 1,
        filter: 'blur(0px)',
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };
    } else if (normalizedPosition > 0) {
      // Cards below (stacked behind - next cards)
      const offset = normalizedPosition * baseTranslateY;
      const scale = Math.pow(baseScale, normalizedPosition);
      const opacity = Math.pow(baseOpacity, normalizedPosition);
      const blur = normalizedPosition * 3; // 3px blur per level
      
      return {
        transform: `translateY(${offset}px) scale(${scale})`,
        zIndex: 50 - normalizedPosition * 10,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };
    } else {
      // Cards above (stacked in front - previous cards)
      const offset = normalizedPosition * baseTranslateY;
      const scale = Math.pow(baseScale, Math.abs(normalizedPosition));
      const opacity = Math.pow(baseOpacity, Math.abs(normalizedPosition));
      const blur = Math.abs(normalizedPosition) * 3; // 3px blur per level
      
      return {
        transform: `translateY(${offset}px) scale(${scale})`,
        zIndex: 50 - Math.abs(normalizedPosition) * 10,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
      };
    }
  };

  return (
    <section id="services" className="py-16 md:py-20 lg:py-28 relative overflow-hidden bg-white">
      {/* Animated Background - hanya animasi gradient waves */}
      <div className="absolute inset-0">
        {/* Animated Gradient Waves */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40 animate-wave-slow" style={{
            background: 'linear-gradient(45deg, #F9B800 0%, transparent 50%, #FFD700 100%)',
            backgroundSize: '200% 200%'
          }}></div>
          <div className="absolute inset-0 opacity-30 animate-wave-medium" style={{
            background: 'linear-gradient(-45deg, transparent 0%, #F9B800 50%, transparent 100%)',
            backgroundSize: '200% 200%'
          }}></div>
        </div>
        
        {/* Geometric Shapes Animation */}
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-gray-200/30 animate-spin-slow"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 border-4 border-gray-200/40 rotate-45 animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-gray-200/25 rounded-full animate-scale-slow"></div>
        <div className="absolute top-1/2 right-1/3 w-28 h-28 bg-gray-100/10 rotate-12 animate-rotate-slow"></div>
        <div className="absolute bottom-1/3 right-10 w-36 h-36 border-4 border-gray-200/30 rounded-lg animate-bounce-slow"></div>
        
        {/* Diagonal Stripes Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #e5e7eb 0px, #e5e7eb 2px, transparent 2px, transparent 20px)`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-6">Layanan Kami</h2>
          <div className="w-20 md:w-24 lg:w-32 h-1 bg-[#F9B800] mx-auto mb-3 md:mb-4 lg:mb-6"></div>
          <p className="text-gray-600 max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg px-4 leading-relaxed">
            Kami menyediakan berbagai program pelatihan yang disesuaikan dengan kebutuhan Anda
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Stacked Cards Container with Navigation */}
          <div className="relative">
            {/* Previous Button - Top */}
            <div className="flex justify-center mb-3 md:mb-4 relative z-[60]">
              <button
                onClick={handlePrevious}
                disabled={isAtStart}
                className={`transition-all duration-300 ${
                  isAtStart 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#F9B800] hover:text-[#e0a700] hover:scale-125'
                }`}
                aria-label="Previous service"
              >
                <ChevronUp className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
              </button>
            </div>

            {/* Stacked Cards */}
            <div className="relative h-[420px] sm:h-[450px] md:h-[420px] lg:h-[520px] flex items-center">
              {activeServices.map((service, index) => (
                <div
                  key={service.id}
                  className="absolute inset-x-0 mx-auto w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl top-1/2 -translate-y-1/2"
                  style={getCardStyle(index)}
                >
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden mx-2 sm:mx-4 lg:mx-6">
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Image Section */}
                      <div className="relative w-full md:w-2/5 lg:w-5/12 h-40 sm:h-48 md:h-[380px] lg:h-[480px] overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>

                      {/* Content Section */}
                      <div className="w-full md:w-3/5 lg:w-7/12 p-4 sm:p-5 md:p-6 lg:p-10 flex flex-col justify-center">
                        <div>
                          <div className="flex items-start justify-between mb-2 md:mb-3 lg:mb-5">
                            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl pr-2 sm:pr-4 lg:pr-6 leading-tight">{service.title}</h3>
                            <div className="bg-[#F9B800] text-black px-2 sm:px-3 lg:px-4 py-0.5 sm:py-1 lg:py-1.5 rounded-full whitespace-nowrap flex-shrink-0">
                              <span className="text-[10px] sm:text-xs lg:text-sm font-semibold">{service.price}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm lg:text-base xl:text-lg mb-2 sm:mb-3 md:mb-4 lg:mb-6 line-clamp-2 md:line-clamp-none leading-relaxed">{service.description}</p>
                          
                          {/* Details List */}
                          <div className="space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-3">
                            {service.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start text-[10px] sm:text-xs lg:text-sm xl:text-base text-gray-700">
                                <span className="text-[#F9B800] mr-1.5 sm:mr-2 lg:mr-3 mt-0.5 flex-shrink-0 text-sm lg:text-base">•</span>
                                <span className="leading-relaxed">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Next Button - Bottom */}
            <div className="flex justify-center mt-3 md:mt-4 relative z-[60]">
              <button
                onClick={handleNext}
                disabled={isAtEnd}
                className={`transition-all duration-300 ${
                  isAtEnd 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-[#F9B800] hover:text-[#e0a700] hover:scale-125'
                }`}
                aria-label="Next service"
              >
                <ChevronDown className="w-8 h-8 md:w-10 md:h-10" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
