import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Copy,
  Check,
  ExternalLink,
  Facebook,
  Linkedin,
} from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import { toast } from "sonner@2.0.3";

export const Contact = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      content: "Bulaksumur Blok G, Sagan, Caturtunggal, Depok, Sleman, DI Yogyakarta",
      copyable: false,
      linkable: true,
      link: "https://www.google.com/maps?ll=-7.775607,110.376586&z=16&t=m&hl=id&gl=ID&mapclient=embed&cid=2238012393456265405",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "(0274) 549513 | 0856-2727-323",
      copyable: true,
      linkable: false,
    },
    {
      icon: Mail,
      title: "Email",
      content: "swaragamatrainingcenter@gmail.com",
      copyable: true,
      linkable: false,
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Jumat: 09.00 - 17.00 WIB",
      copyable: false,
      linkable: false,
    },
  ];

  const handleCopy = (content, index) => {
    try {
      // Gunakan metode textarea (lebih reliable di berbagai environment)
      const textArea = document.createElement("textarea");
      textArea.value = content;
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      
      textArea.select();
      textArea.setSelectionRange(0, 99999); // Untuk mobile devices
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopiedIndex(index);
        toast.success("Berhasil disalin!");
        setTimeout(() => setCopiedIndex(null), 2000);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Copy error:', err);
      toast.error("Gagal menyalin");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-6">
            Hubungi Kami
          </h2>
          <div className="w-20 md:w-24 lg:w-32 h-1 bg-[#F9B800] mx-auto mb-3 md:mb-4 lg:mb-6"></div>
          <p className="text-gray-600 max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg px-4 leading-relaxed">
            Punya pertanyaan atau ingin berkonsultasi? Hubungi kami untuk mendiskusikan kebutuhan pelatihan Anda!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
          <div>
            <Card>
              <CardContent className="p-4 md:p-8 lg:p-10">
                <h3 className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 lg:mb-8">Lokasi Kami</h3>
                <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.1341102716415!2d110.3740114743059!3d-7.775601177138395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59c8ef13c217%3A0x1f0f046a12e1e8bd!2sWisma%20Kagama!5e0!3m2!1sid!2sid!4v1760216701635!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <h3 className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6 lg:mb-8">Informasi Kontak</h3>
            {contactInfo.map((info, index) => (
              <Card 
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-4 md:p-6 lg:p-8">
                  <div className="flex items-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-[#F9B800] rounded-lg flex items-center justify-center mr-3 md:mr-4 lg:mr-6 flex-shrink-0">
                      <info.icon
                        size={20}
                        className="text-white md:w-6 md:h-6 lg:w-7 lg:h-7"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 lg:mb-2 text-sm md:text-base lg:text-lg font-semibold">{info.title}</h4>
                      <p className="text-gray-600 text-xs md:text-sm lg:text-base break-words leading-relaxed">
                        {info.content}
                        {info.title === "Jam Operasional" && (
                          <span className="block text-red-600 mt-1">
                            (Weekend Tutup)
                          </span>
                        )}
                      </p>
                    </div>
                    {info.copyable && (
                      <button
                        onClick={() => handleCopy(info.content, index)}
                        className={`ml-1 md:ml-2 p-1.5 md:p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                          hoveredIndex === index || copiedIndex === index
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-2 pointer-events-none"
                        } ${
                          copiedIndex === index
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-[#F9B800] hover:bg-[#e0a700]"
                        }`}
                        aria-label="Salin"
                      >
                        {copiedIndex === index ? (
                          <Check size={16} className="text-white md:w-[18px] md:h-[18px]" />
                        ) : (
                          <Copy size={16} className="text-white md:w-[18px] md:h-[18px]" />
                        )}
                      </button>
                    )}
                    {info.linkable && (
                      <a
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`ml-1 md:ml-2 p-1.5 md:p-2 rounded-lg bg-[#F9B800] hover:bg-[#e0a700] transition-all duration-300 flex-shrink-0 ${
                          hoveredIndex === index
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-2 pointer-events-none"
                        }`}
                        aria-label="Lihat di Google Maps"
                      >
                        <ExternalLink size={16} className="text-white md:w-[18px] md:h-[18px]" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social Media Section */}
            <Card>
              <CardContent className="p-4 md:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
                  <h4 className="text-base md:text-xl lg:text-2xl font-semibold">Ikuti Kami :</h4>
                  <div className="flex gap-2 md:gap-3 lg:gap-4 flex-wrap justify-center">
                    <a
                      href="https://linktr.ee/swaragamatrainingcenter?fbclid=PAZXh0bgNhZW0CMTEAAaeztRNXGSrMpJo2tXrJkto7WKoL_qgsdF3SqPxxej4CeMKjCpJ_a7o95GxLSg_aem_M56ja222B6ROzz8e6Kszfg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#39E09B] hover:bg-[#2bc886] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="Linktree"
                    >
                      <SiLinktree size={18} className="text-white md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    </a>
                    <a
                      href="https://web.facebook.com/swaragamatc?mibextid=wwXIfr&rdid=hIeIQh1zXJuLcVht&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F173YfRNL5y%2F%3Fmibextid%3DwwXIfr%26_rdc%3D1%26_rdr#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#1877F2] hover:bg-[#0c63d4] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="Facebook"
                    >
                      <Facebook size={18} className="text-white md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    </a>
                    <a
                      href="https://www.instagram.com/swaragamatc/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#833AB4] via-[#E1306C] to-[#FD1D1D] hover:opacity-90 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="Instagram"
                    >
                      <Instagram
                        size={18}
                        className="text-white md:w-5 md:h-5 lg:w-6 lg:h-6"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/swaragama-training-center/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#0A66C2] hover:bg-[#084d94] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} className="text-white md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    </a>
                    <a
                      href="https://www.tiktok.com/@swaragamatc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-black hover:bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="TikTok"
                    >
                      <FaTiktok
                        size={18}
                        className="text-white md:w-5 md:h-5 lg:w-6 lg:h-6"
                      />
                    </a>
                    <a
                      href="https://api.whatsapp.com/send/?phone=628562727323&text&type=phone_number&app_absent=0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-[#25D366] hover:bg-[#1ebd59] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                      aria-label="WhatsApp"
                    >
                      <FaWhatsapp size={18} className="text-white md:w-5 md:h-5 lg:w-6 lg:h-6" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};