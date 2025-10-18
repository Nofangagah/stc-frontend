import React from 'react';
import { Instagram, Mail, Phone, MapPin, Facebook, Linkedin, Lock } from 'lucide-react';
import { FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { SiLinktree } from 'react-icons/si';
import logo from 'figma:asset/7de3d69f1daeed15878f68dc3034caa5824d9bb8.png';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-8 md:pt-16 lg:pt-20 md:pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 lg:mb-16">
          <div>
            <img src={logo} alt="Swaragama Training Center" className="h-12 md:h-16 lg:h-20 mb-3 md:mb-4 lg:mb-6" />
            <p className="text-gray-400 mb-3 md:mb-4 lg:mb-6 text-sm md:text-base leading-relaxed">
              Mengembangkan potensi SDM melalui pelatihan berkualitas dan profesional.
            </p>
            <div className="flex space-x-3 md:space-x-4 lg:space-x-5">
              <a 
                href="https://linktr.ee/swaragamatrainingcenter?fbclid=PAZXh0bgNhZW0CMTEAAaeztRNXGSrMpJo2tXrJkto7WKoL_qgsdF3SqPxxej4CeMKjCpJ_a7o95GxLSg_aem_M56ja222B6ROzz8e6Kszfg" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#F9B800] transition-all duration-300 hover:scale-110"
              >
                <SiLinktree size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a 
                href="https://web.facebook.com/swaragamatc?mibextid=wwXIfr&rdid=hIeIQh1zXJuLcVht&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F173YfRNL5y%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#F9B800] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/swaragamatc/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#F9B800] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/swaragama-training-center/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#F9B800] transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@swaragamatc" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#F9B800] transition-colors"
              >
                <FaTiktok size={20} />
              </a>
              <a 
                href="https://api.whatsapp.com/send/?phone=628562727323&text&type=phone_number&app_absent=0" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#F9B800] transition-colors"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-base md:text-lg lg:text-xl mb-3 md:mb-4 lg:mb-6 text-[#F9B800] font-semibold">Menu</h4>
            <ul className="space-y-1.5 md:space-y-2 lg:space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-[#F9B800] transition-colors text-sm md:text-base">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-[#F9B800] transition-colors">
                  Layanan
                </a>
              </li>
              <li>
                <a href="#trainers" className="text-gray-400 hover:text-[#F9B800] transition-colors">
                  Trainer
                </a>
              </li>
              <li>
                <a href="#clients" className="text-gray-400 hover:text-[#F9B800] transition-colors">
                  Klien Kami
                </a>
              </li>
              <li>
                <a href="#blog" className="text-gray-400 hover:text-[#F9B800] transition-colors">
                  STC Corner
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-[#F9B800] transition-colors">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-[#F9B800] transition-colors">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg lg:text-xl mb-3 md:mb-4 lg:mb-6 text-[#F9B800] font-semibold">Layanan</h4>
            <ul className="space-y-1.5 md:space-y-2 lg:space-y-3">
              <li className="text-gray-400 text-sm md:text-base">Public Speaking Intensive</li>
              <li className="text-gray-400 text-sm md:text-base">Master of Ceremony</li>
              <li className="text-gray-400 text-sm md:text-base">Kursus Bahasa Asing</li>
              <li className="text-gray-400 text-sm md:text-base">Corporate Training</li>
              <li className="text-gray-400 text-sm md:text-base">Private Class</li>
            </ul>
          </div>

          <div>
            <h4 className="text-base md:text-lg lg:text-xl mb-3 md:mb-4 lg:mb-6 text-[#F9B800] font-semibold">Kontak</h4>
            <ul className="space-y-2 md:space-y-3 lg:space-y-4">
              <li className="flex items-start text-gray-400 text-sm md:text-base">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0 lg:w-5 lg:h-5" />
                <span>Bulaksumur Blok G, Sagan, Caturtunggal, Depok, Sleman, DI Yogyakarta</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm md:text-base">
                <Phone size={18} className="mr-2 flex-shrink-0 lg:w-5 lg:h-5" />
                <span>(0274) 549513 | 0856-2727-323</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm md:text-base">
                <Mail size={18} className="mr-2 flex-shrink-0 lg:w-5 lg:h-5" />
                <span>swaragamatrainingcenter@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 md:pt-8 lg:pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 lg:gap-6">
            <p className="text-gray-400 text-center md:text-left text-sm md:text-base">
              © {new Date().getFullYear()} Swaragama Training Center. All rights reserved.
            </p>
            <Link 
              to="/admin-login" 
              className="flex items-center gap-2 px-4 py-2 lg:px-1 lg:py-2 bg-gray-800 hover:bg-[#F9B800] text-gray-400 hover:text-black transition-all duration-300 rounded-lg group hover:scale-105"
            >
              <Lock size={13} className="group-hover:rotate-12 transition-transform lg:w-5 lg:h-5" />
              <span className="text-sm lg:text-base font-semibold">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
