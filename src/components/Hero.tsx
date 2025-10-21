import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "figma:asset/6f9fa2fee56ca1be5efbe2d826bc51ba792fed25.png";
import mobileHeroImage from "figma:asset/970d5264ebbef2d9755890ff30c0d4dffc310363.png";

export const Hero = () => {
  return (
    <section
      id="hero"
      className="relative pt-20 min-h-screen flex items-center"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: `url(${mobileHeroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" style={{ boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)' }}></div>
      </div>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" style={{ boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.3)' }}></div>
      </div>

      <div className="container mx-auto px-4 pt-4 md:pt-8 pb-12 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Kolom Kiri - Konten */}
          <div className="text-left text-white md:pl-24">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 md:mb-6 animate-fade-in">
              <span className="text-[#F9B800]">Swaragama</span>
              <br />
              Training
              <br />
              Center
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-8 opacity-95">
              "Your Communication Skills Solution"
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-3 md:mb-6 opacity-90">
              Swaragama Training Center hadir sebagai solusi tepat untuk meningkatkan kemampuan komunikasi dan soft skills guna mendukung kesuksesan pribadi maupun profesional.
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-12 opacity-90">
              Dengan metode 40% teori – 60% praktik, kami menghadirkan pelatihan yang interaktif dan menyenangkan bersama trainer yang berpengalaman di bidangnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-start">
              <Button
                size="default"
                className="bg-[#F9B800] hover:bg-[#e0a800] text-black md:text-base text-sm h-10 md:h-11"
                onClick={() =>
                  document
                    .querySelector("#services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Lihat Layanan Kami!
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button
                size="default"
                variant="outline"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-[#F9B800] w-10 h-10 md:w-11 md:h-11 px-0"
                onClick={() =>
                  window.open(
                    "https://youtu.be/cXoPnpt99Jw?si=vkLnlui9Pt2L5Wnr",
                    "_blank",
                  )
                }
              >
                <Play size={20} fill="currentColor" />
              </Button>
            </div>
          </div>

          {/* Kolom Kanan - Kosong */}
          <div></div>
        </div>
      </div>
    </section>
  );
};