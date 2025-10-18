import React from 'react';

export const Clients = () => {
  // Helper function untuk generate placeholder logo
  const getPlaceholderLogo = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=150&background=F9B800&color=000000&bold=true`;
  };

  // Baris 1 - Logo klien
  const clientLogosRow1 = [
    { name: 'Bank Negara Indonesia', logo: getPlaceholderLogo('BNI') },
    { name: 'Bank Rakyat Indonesia', logo: getPlaceholderLogo('BRI') },
    { name: 'SRM Corporate University', logo: getPlaceholderLogo('SRM') },
    { name: 'Bank Nusamba', logo: getPlaceholderLogo('Nusamba') },
    { name: 'BPR BDE Yogyakarta', logo: getPlaceholderLogo('BPR BDE') },
    { name: 'Globe', logo: getPlaceholderLogo('Globe') },
    { name: 'Telkom Indonesia', logo: getPlaceholderLogo('Telkom') },
    { name: 'Center for Digital Society', logo: getPlaceholderLogo('CfDS') },
    { name: 'AMC IT Consulting', logo: getPlaceholderLogo('AMC') },
    { name: 'Software Seni', logo: getPlaceholderLogo('Software Seni') },
    { name: 'Matahari Department Store', logo: getPlaceholderLogo('Matahari') },
    { name: 'Alfamidi', logo: getPlaceholderLogo('Alfamidi') },
    { name: 'BJ Home Supermarket', logo: getPlaceholderLogo('BJ Home') },
    { name: 'Waroeng Steak & Shake', logo: getPlaceholderLogo('Waroeng') },
    { name: 'Yamic Panda', logo: getPlaceholderLogo('Yamic Panda') },
    { name: 'Mutiara Joger Bakpia Pathok', logo: getPlaceholderLogo('Joger') },
  ];

  // Baris 2 - Logo klien
  const clientLogosRow2 = [
    { name: 'Universitas Gadjah Mada', logo: getPlaceholderLogo('UGM') },
    { name: 'UIN Sunan Kalijaga Yogyakarta', logo: getPlaceholderLogo('UIN') },
    { name: 'Universitas Terbuka', logo: getPlaceholderLogo('UT') },
    { name: 'Institut Seni Indonesia Yogyakarta', logo: getPlaceholderLogo('ISI') },
    { name: 'Universitas Islam Indonesia', logo: getPlaceholderLogo('UII') },
    { name: 'Universitas Muhammadiyah Yogyakarta', logo: getPlaceholderLogo('UMY') },
    { name: 'Universitas Sanata Dharma Yogyakarta', logo: getPlaceholderLogo('USD') },
    { name: 'Universitas Atma Jaya Jogjakarta', logo: getPlaceholderLogo('UAJY') },
    { name: 'Universitas Kristen Duta Wacana', logo: getPlaceholderLogo('UKDW') },
    { name: 'STIE YKPN Yogyakarta', logo: getPlaceholderLogo('YKPN') },
    { name: 'FEB UGM', logo: getPlaceholderLogo('FEB UGM') },
    { name: 'Hubungan Internasional', logo: getPlaceholderLogo('HI') },
    { name: 'Magister Manajemen Universitas Sanata Dharma', logo: getPlaceholderLogo('MM USD') },
    { name: 'Fakultas Psikologi Universitas Mercu Buana', logo: getPlaceholderLogo('Mercu Buana') },
    { name: 'Mesin FT UGM', logo: getPlaceholderLogo('FT UGM') },
    { name: 'FIKOMM', logo: getPlaceholderLogo('FIKOMM') },
  ];

  // Baris 3 - Logo klien
  const clientLogosRow3 = [
    { name: 'Kementerian Pertahanan Republik Indonesia', logo: getPlaceholderLogo('Kemhan') },
    { name: 'Badan Meteorologi Klimatologi dan Geofisika', logo: getPlaceholderLogo('BMKG') },
    { name: 'Sagan Yogyakarta', logo: getPlaceholderLogo('Sagan') },
    { name: 'SD Masjid Syuhada', logo: getPlaceholderLogo('SD Syuhada') },
    { name: 'SDN Purwodingratan', logo: getPlaceholderLogo('SDN') },
    { name: 'Pawitikra', logo: getPlaceholderLogo('Pawitikra') },
    { name: 'Badan Narkotika Nasional', logo: getPlaceholderLogo('BNN') },
    { name: 'Otoritas Jasa Keuangan', logo: getPlaceholderLogo('OJK') },
    { name: 'Dinas Pariwisata Daerah Istimewa Yogyakarta', logo: getPlaceholderLogo('Dispar DIY') },
    { name: 'Bea Cukai Yogyakarta', logo: getPlaceholderLogo('Bea Cukai') },
    { name: 'RSM Dr. YAP Yogyakarta', logo: getPlaceholderLogo('RSM YAP') },
    { name: 'Kaltim Methanol Industri', logo: getPlaceholderLogo('Kaltim') },
    { name: 'Paguyuban Dimas Diajeng Jogja', logo: getPlaceholderLogo('Dimas Diajeng') },
    { name: 'Depot Loro AMM Yogyakarta', logo: getPlaceholderLogo('Depot Loro') },
    { name: 'Nasi Uduk Palagan', logo: getPlaceholderLogo('Nasi Uduk') },
  ];

  // Komponen untuk satu logo
  const LogoItem = ({ name, logo }: { name: string; logo: string }) => (
    <div className="flex-shrink-0 w-32 h-20 bg-white rounded-lg shadow-md mx-2 flex items-center justify-center hover:shadow-xl transition-shadow duration-300 p-4">
      <img 
        src={logo} 
        alt={name}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );

  // Komponen untuk satu baris scrolling
  const ScrollingRow = ({ direction, logos }: { direction: 'left' | 'right'; logos: Array<{ name: string; logo: string }> }) => {
    if (logos.length === 0) return null;
    
    return (
      <div className="relative mb-6">
        <div className={`flex ${direction === 'right' ? 'animate-scroll-right' : 'animate-scroll-left'}`}>
          {/* Render logo 4x untuk seamless infinite scroll */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex">
              {logos.map((client, idx) => (
                <LogoItem key={`${index}-${idx}`} name={client.name} logo={client.logo} />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="clients" className="py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">Klien Kami</h2>
          <div className="w-24 h-1 bg-[#F9B800] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dipercaya oleh perusahaan-perusahaan terkemuka di Indonesia
          </p>
        </div>
      </div>

      {/* Baris 1 - Scroll ke kanan */}
      <div className="relative z-10">
        <ScrollingRow direction="right" logos={clientLogosRow1} />

      {/* Baris 2 - Scroll ke kiri */}
      <ScrollingRow direction="left" logos={clientLogosRow2} />

      {/* Baris 3 - Scroll ke kanan */}
        <ScrollingRow direction="right" logos={clientLogosRow3} />
      </div>

      {clientLogosRow1.length === 0 && clientLogosRow2.length === 0 && clientLogosRow3.length === 0 && (
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center py-12">
            <p className="text-gray-400 italic">
              Logo klien akan segera ditampilkan
            </p>
          </div>
        </div>
      )}
      
      {(clientLogosRow1.length > 0 || clientLogosRow2.length > 0 || clientLogosRow3.length > 0) && (
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mt-8">
            <p className="text-gray-600 italic">
              Dan masih banyak perusahaan lainnya yang telah mempercayai kami
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
