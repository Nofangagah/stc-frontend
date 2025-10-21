import React, { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { getAllTrainers } from '../api/api';

interface Trainer {
  id: number;
  name: string;
  expertise: string[];
  avatarUrl: string;
}


const fetchTrainers = async (): Promise<Trainer[]> => {
  const { data } = await getAllTrainers();
 

 
  const trainersArray = data.trainers || data || [];

  return trainersArray.map((trainer: any) => ({
    id: trainer.id ?? Math.random(),
    name: trainer.name || 'Unknown Trainer',
    expertise: trainer.expertise || [],
    avatarUrl: trainer.avatarUrl || '/fallback-image.jpg',
  }));
};

// Komponen utama
export const Trainers = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrainers = async () => {
      try {
        const trainersData = await fetchTrainers();
        setTrainers(trainersData);
      } catch (err) {
        console.error('Gagal mengambil data trainer:', err);
      } finally {
        setLoading(false);
      }
    };
    loadTrainers();
  }, []);

  return (
    <section
      id="trainers"
      className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-28 lg:pb-28 bg-white relative overflow-hidden"
    >
      {/* Smooth background blend */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-gray-50/20 via-gray-50/40 via-gray-50/70 to-gray-50/90"></div>
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-gray-50/50 to-gray-50/80"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16 lg:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-6">
            Trainer Kami
          </h2>
          <div className="w-20 md:w-24 lg:w-32 h-1 bg-[#F9B800] mx-auto mb-3 md:mb-4 lg:mb-6"></div>
          <p className="text-gray-600 max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg px-4 leading-relaxed">
            Tim Trainer berpengalaman dan tersertifikasi yang siap membimbing Anda mencapai potensi maksimal dalam pengembangan diri.

          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Memuat data trainer...</p>
        ) : trainers.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada trainer tersedia.</p>
        ) : (
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {trainers.map((trainer) => (
                <CarouselItem
                  key={trainer.id}
                  className="pl-2 md:pl-4 lg:pl-6 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                >
                  <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden flex-shrink-0">
                      <ImageWithFallback
                        src={trainer.avatarUrl}
                        alt={trainer.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <CardContent className="p-2.5 sm:p-3 lg:p-4 pt-2 lg:pt-3 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm sm:text-base lg:text-lg mb-0.5 lg:mb-1 font-bold line-clamp-1">
                          {trainer.name}
                        </h3>
                        <p className="text-black text-[10px] sm:text-xs lg:text-sm line-clamp-2 leading-relaxed">
                          {trainer.expertise.join(', ')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 bg-[#F9B800] hover:bg-[#e0a700] text-black border-none z-20" />
            <CarouselNext className="right-0 bg-[#F9B800] hover:bg-[#e0a700] text-black border-none z-20" />
          </Carousel>
        )}
      </div>
    </section>
  );
};
