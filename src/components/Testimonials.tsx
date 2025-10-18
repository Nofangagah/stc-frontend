import React from 'react';
import Masonry from 'react-responsive-masonry';
import testimoni1 from 'figma:asset/7875480a5537d87ffc7ec068d3ea083964aff443.png';
import testimoni2 from 'figma:asset/55deb8c73d9167b14894b144121d828793081bb4.png';
import testimoni3 from 'figma:asset/e903ff9c7e6e7ed63daebebcf7999410c51e387b.png';
import testimoni4 from 'figma:asset/f1769ac298d1ee08858b8a0063ea4b9bbd6b66f7.png';
import testimoni5 from 'figma:asset/117b860000bfad5cf0314db9dc03a213eec5386c.png';
import testimoni6 from 'figma:asset/b70012c41137cc8964b2e6fad3cf733a18601197.png';
import testimoni7 from 'figma:asset/59f30935289466cf97f35f9bbe64aff91d38705a.png';
import testimoni8 from 'figma:asset/e74ba735e3682b39872fcb54d431eb8b30f33b2d.png';
import testimoni9 from 'figma:asset/e9fa8df87b3a7c3abaf9f43950716a3d367d95e8.png';
import testimoni10 from 'figma:asset/ef87323988268e08bb5a397b99e34f0e871e9e23.png';
import testimoni11 from 'figma:asset/4f358a61bf642645c137614a149adb4ba0942271.png';
import testimoni12 from 'figma:asset/28266063acbd1f008c32bc916107197bda3e2f91.png';
import testimoni13 from 'figma:asset/b9580a1a6061b0dffa7f08af9001fb8413df0b69.png';
import testimoni14 from 'figma:asset/d11f12a939b767d21ee5222f4cbe5bf8a2aff374.png';
import testimoni15 from 'figma:asset/d1ce84868826ba456c2b53d882ad1be195a79c89.png';
import testimoni16 from 'figma:asset/a6f0ddb81e590a0a07803353e951d0c99bb6599e.png';
import testimoni17 from 'figma:asset/4ef0371fe4062c6f560441fd481a71819d626733.png';

export const Testimonials = () => {
  // Susunan testimoni yang diacak dengan berbagai ukuran dan rotasi untuk efek kolase
  const testimonials = [
    { id: 7, image: testimoni7, alt: "Testimoni Dzaki Andreaz", rotation: 'rotate-[-2deg]', scale: 'scale-105' },
    { id: 13, image: testimoni13, alt: "Testimoni Sekar Elfridsdzini Istiqomah", rotation: 'rotate-[1deg]', scale: 'scale-95' },
    { id: 3, image: testimoni3, alt: "Testimoni DIANA IRAWATI WULANDARI", rotation: 'rotate-[2deg]', scale: 'scale-100' },
    { id: 10, image: testimoni10, alt: "Testimoni Aditia Febriana", rotation: 'rotate-[-1deg]', scale: 'scale-110' },
    { id: 16, image: testimoni16, alt: "Testimoni Junicho Deni Priyantomo", rotation: 'rotate-[3deg]', scale: 'scale-100' },
    { id: 5, image: testimoni5, alt: "Testimoni Lintang Kejora", rotation: 'rotate-[-3deg]', scale: 'scale-95' },
    { id: 1, image: testimoni1, alt: "Testimoni Dwi Gayatri", rotation: 'rotate-[1deg]', scale: 'scale-105' },
    { id: 14, image: testimoni14, alt: "Testimoni Amanda Purwanto", rotation: 'rotate-[-2deg]', scale: 'scale-100' },
    { id: 8, image: testimoni8, alt: "Testimoni Hartati Widiyaningsih", rotation: 'rotate-[2deg]', scale: 'scale-95' },
    { id: 11, image: testimoni11, alt: "Testimoni Wiwik Aryati", rotation: 'rotate-[-1deg]', scale: 'scale-110' },
    { id: 4, image: testimoni4, alt: "Testimoni Beth Venuseyes L", rotation: 'rotate-[1deg]', scale: 'scale-100' },
    { id: 17, image: testimoni17, alt: "Testimoni trisno sutrisno", rotation: 'rotate-[-2deg]', scale: 'scale-105' },
    { id: 9, image: testimoni9, alt: "Testimoni Arifah Putri Wulandari", rotation: 'rotate-[3deg]', scale: 'scale-95' },
    { id: 2, image: testimoni2, alt: "Testimoni Tian Suprapto SE MM", rotation: 'rotate-[-1deg]', scale: 'scale-100' },
    { id: 12, image: testimoni12, alt: "Testimoni Putri Ayanda", rotation: 'rotate-[2deg]', scale: 'scale-110' },
    { id: 6, image: testimoni6, alt: "Testimoni Meiriawan Sulistyo Indriastanto", rotation: 'rotate-[-3deg]', scale: 'scale-100' },
    { id: 15, image: testimoni15, alt: "Testimoni Herwida Putri Agista", rotation: 'rotate-[1deg]', scale: 'scale-95' },
  ];

  return (
    <section id="testimonials" className="py-8 md:py-12 lg:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-6 md:mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-6">Kata Sahabat <span className="text-[#F9B800]">STC</span></h2>
          <div className="w-20 md:w-24 lg:w-32 h-1 bg-[#F9B800] mx-auto mb-3 md:mb-4 lg:mb-6"></div>
          <p className="text-gray-600 max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg px-4 leading-relaxed">
            Apa kata mereka yang telah merasakan program pelatihan kami
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <Masonry columnsCount={2} columnsCountBreakPoints={{ 640: 2, 768: 3, 1024: 4, 1280: 5 }} gutter="8px" className="lg:gap-4">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className={`rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ${testimonial.rotation} ${testimonial.scale} hover:scale-105 md:hover:scale-110 lg:hover:scale-115 hover:rotate-0 hover:z-10 relative`}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                <img 
                  src={testimonial.image} 
                  alt={testimonial.alt} 
                  className="w-full h-auto object-cover" 
                />
              </div>
            ))}
          </Masonry>
        </div>

        <div className="text-center mt-6 md:mt-8 lg:mt-12">
          <p className="text-gray-600 italic text-sm md:text-base lg:text-lg px-4">
            Ratusan testimoni positif dari klien yang puas dengan layanan kami
          </p>
        </div>
      </div>
    </section>
  );
};
