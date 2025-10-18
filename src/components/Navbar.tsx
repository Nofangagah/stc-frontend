import React, { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "./ui/button";
import logoYellow from "figma:asset/ca0337a70b0d772e0505b965cd0ed7882de60418.png";
import logoTransparent from "figma:asset/14385081cd83fb45f507c44f49367e7ab49100fa.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar background change
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll Spy Logic - Detect active section
      const sections = ['hero', 'about', 'services', 'trainers', 'clients', 'blog', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset untuk deteksi lebih baik
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll(); // Run on mount
    window.addEventListener("scroll", handleScroll);
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Beranda", href: "#hero", id: "hero" },
    { label: "Tentang", href: "#about", id: "about" },
    { label: "Layanan", href: "#services", id: "services" },
    { label: "Trainer", href: "#trainers", id: "trainers" },
    { label: "Klien", href: "#clients", id: "clients" },
    { label: "STC Corner", href: "#blog", id: "blog" },
    { label: "Testimonial", href: "#testimonials", id: "testimonials" },
    { label: "Kontak", href: "#contact", id: "contact" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80; // tinggi navbar (h-20 = 80px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Kiri: Spacer + Logo */}
          <div className="flex items-center gap-8">
            <div className="flex-shrink-0 w-16 hidden md:block"></div>
            <div className="flex-shrink-0">
              <img
                src={isScrolled ? logoYellow : logoTransparent}
                alt="Swaragama Training Center"
                className="h-12 transition-all duration-300"
              />
            </div>
          </div>

          {/* Tengah: Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`transition-colors px-3 py-2 ${
                    isActive
                      ? "text-[#F9B800] font-semibold"
                      : isScrolled
                        ? "text-gray-800 hover:text-[#F9B800]"
                        : "text-white hover:text-[#F9B800]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Kanan: Button + Spacer */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="https://linktr.ee/swaragamatrainingcenter?fbclid=PAZXh0bgNhZW0CMTEAAadeM7k2OaHIJwzo-BCOc_kodY6pZzSdYYUQOB92XNAmxT9DWf-HJWBNGv9UCA_aem_eYM0vAkvprGKkH6lxe4BBw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className={`${
                  isScrolled
                    ? "bg-[#F9B800] hover:bg-[#e0a800] text-black"
                    : "bg-[#F9B800] hover:bg-[#e0a800] text-black"
                } transition-all duration-300`}
              >
                <Phone size={18} className="mr-2" />
                CONTACT US
              </Button>
            </a>
            <div className="flex-shrink-0 w-16"></div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
                isScrolled
                  ? "text-gray-800 hover:text-[#F9B800]"
                  : "text-white hover:text-[#F9B800]"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`md:hidden pb-4 ${isScrolled ? "bg-white" : "bg-black/80"}`}
          >
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`block transition-colors px-3 py-2 ${
                    isActive
                      ? "text-[#F9B800] font-semibold"
                      : isScrolled
                        ? "text-gray-800 hover:text-[#F9B800]"
                        : "text-white hover:text-[#F9B800]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="px-3 py-2">
              <a
                href="https://l.instagram.com/?u=https%3A%2F%2Flinktr.ee%2Fswaragamatrainingcenter%3Ffbclid%3DPAZXh0bgNhZW0CMTEAAadeM7k2OaHIJwzo-BCOc_kodY6pZzSdYYUQOB92XNAmxT9DWf-HJWBNGv9UCA_aem_eYM0vAkvprGKkH6lxe4BBw&e=AT0ZZJlvG7WTyk9gHg4_2VgGX-fshLR6zE8K85Xx3YSI_82UGqbVh01hbM_95FdS-qX_kFGwV43rmwBtlagOGRKJCuw70qOlPWftqN3bGQ"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full bg-[#F9B800] hover:bg-[#e0a800] text-white">
                  <Phone size={18} className="mr-2" />
                  Hubungi Kami
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
