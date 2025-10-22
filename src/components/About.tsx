import React, { useEffect, useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback'; 
import { Award, Users, BookOpen, Target, Loader2 } from 'lucide-react'; 
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { getALlGalleries } from '../api/api';
import { galleriesLocal, type GalleryItem } from '../data/galleriesLocal';

// Tipe data respon API Galeri (sesuai log Anda)
interface GalleryApiData {
    status: boolean;
    message: string;
    data: {
        galleries: any[];
        // ... mungkin ada properti lain
    };
}


const normalizeGalleryData = (apiResult: any): GalleryItem[] => {
   
    const galleriesArray = apiResult?.data?.galleries || apiResult?.galleries || apiResult || [];
    
    if (!Array.isArray(galleriesArray)) return [];

    return galleriesArray.map((item: any) => ({
        id: item.id || Math.random(),
        src: item.imageUrl || '',
        alt: `Gambar Galeri ID: ${item.id}`,
        title: `Galeri ${item.id}`,
    }));
}


export const About = () => {
    const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUsingLocalData, setIsUsingLocalData] = useState(false);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                setIsLoading(true);
                setIsUsingLocalData(false);
                
                // Timeout untuk request API (5 detik)
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000);
                
                const result = await getALlGalleries();
                clearTimeout(timeoutId);

                const formattedImages = normalizeGalleryData(result);

                if (formattedImages.length === 0) {
                    // API berhasil tapi data kosong - gunakan local
                    console.log("📦 API response kosong, menggunakan data lokal galeri");
                    setGalleryImages(galleriesLocal);
                    setIsUsingLocalData(true);
                } else {
                    // Sukses mendapat data dari API
                    setGalleryImages(formattedImages);
                    setIsUsingLocalData(false);
                }

            } catch (err) {
                // API gagal - fallback ke data lokal
                console.log("📦 Mode lokal aktif - Menampilkan galeri dari data lokal");
                setGalleryImages(galleriesLocal);
                setIsUsingLocalData(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGallery();
    }, []);

 
    const stats = [
        { icon: Award, value: '15+', label: 'Tahun Pengalaman' },
        { icon: Users, value: '500+', label: 'Klien Puas' },
        { icon: BookOpen, value: '100+', label: 'Program Pelatihan' },
        { icon: Target, value: '10,000+', label: 'Peserta Terlatih' },
    ];

    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    );

   
    const renderGalleryCarousel = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center w-full h-[280px] sm:h-[350px] md:h-[400px] bg-gray-100 rounded-lg shadow-lg">
                    <Loader2 className="w-8 h-8 animate-spin text-[#F9B800]" />
                    <p className="ml-2 text-gray-600">Memuat galeri...</p>
                </div>
            );
        }
        
      
        if (galleryImages.length === 0) {
            return (
                <div className="flex justify-center items-center w-full h-[280px] sm:h-[350px] md:h-[400px] bg-gray-100 rounded-lg shadow-lg">
                    <p className="text-gray-600">Belum ada gambar galeri yang tersedia.</p>
                </div>
            );
        }

       
        return (
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    loop: true,
                }}
            >
                <CarouselContent>
                    {galleryImages.map((image) => (
                        <CarouselItem key={image.id}>
                            <ImageWithFallback
                                src={image.src}
                                alt={image.alt}
                                // Ubah ukuran object-cover agar gambar tetap proporsional dan mengisi wadah
                                className="w-full h-[280px] sm:h-[350px] md:h-[400px] object-cover rounded-lg shadow-lg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:left-4" />
                <CarouselNext className="right-2 md:right-4" />
            </Carousel>
        );
    };

    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-8 md:mb-16 lg:mb-20">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl mb-3 md:mb-4 lg:mb-6">Tentang Kami</h2>
                    <div className="w-20 md:w-24 lg:w-32 h-1 bg-[#F9B800] mx-auto mb-3 md:mb-4 lg:mb-6"></div>
                    <p className="text-gray-600 max-w-2xl lg:max-w-3xl mx-auto text-sm md:text-base lg:text-lg px-4 leading-relaxed">
                        Mengembangkan potensi komunikasi dengan metode pelatihan yang terbukti efektif
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center mb-8 md:mb-16">
                    <div>
                        {/* Mengganti static Carousel dengan renderGalleryCarousel yang dinamis */}
                        {renderGalleryCarousel()} 
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl mb-4 md:mb-6"><span className="text-[#F9B800] font-bold">Swaragama</span> Training Center</h3>
                        <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                            <span className="text-[#F9B800] font-bold">S</span><span className="font-bold">TC</span> adalah lembaga pelatihan dan pengembangan SDM di Yogyakarta yang berfokus pada peningkatan soft skills, terutama keterampilan komunikasi. Berada di bawah naungan <span className="text-black-600 font-bold">Swaragama Group</span>, salah satu media terbesar di Yogyakarta, kami hadir sebagai mitra terpercaya dalam pengembangan potensi Anda.
                        </p>
                        <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                            Sejak 2011, <span className="text-[#F9B800] font-bold">Swaragama</span> Training Center (<span className="text-[#F9B800] font-bold">S</span><span className="font-bold">TC</span>) telah menjadi bagian dari salah satu unit bisnis Universitas Gadjah Mada. Hingga kini, <span className="text-[#F9B800] font-bold">S</span><span className="font-bold">TC</span> telah dipercaya menangani lebih dari 3.000 alumni dengan berbagai latar belakang dan kebutuhan.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" style={{ gridAutoRows: '1fr' }}>
                    {/* Mengapa Memilih Kami */}
                    <div className="lg:col-span-1 group">
                        <div className="h-full bg-white border-2 border-[#F9B800] rounded-xl p-2.5 md:p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center">
                            <h4 className="mb-2 md:mb-2.5 text-base md:text-lg font-bold text-center">Mengapa Memilih Kami?</h4>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Trainer Tersertifikasi</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Dipandu oleh trainer profesional, berpengalaman, dan memiliki sertifikasi resmi.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Pembelajaran Interaktif</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Belajar dua arah dengan metode yang seru, aplikatif, dan mudah dipahami.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Fleksibilitas Waktu</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Jadwal pelatihan bisa menyesuaikan kebutuhan Anda maupun tim.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Materi Custom</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Konten pelatihan dirancang sesuai kebutuhan spesifik instansi/perusahaan maupun individu.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Metode Pembelajaran */}
                    <div className="lg:col-span-1 group">
                        <div className="h-full bg-white border-2 border-[#F9B800] rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center">
                            <h4 className="mb-2.5 text-lg font-bold text-center">Metode Pembelajaran</h4>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Pendekatan Andragogy</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Pendekatan belajar yang menekankan relevansi, pengalaman, dan kemandirian dalam belajar.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Experiential Learning</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Belajar melalui pengalaman nyata, refleksi, dan praktik langsung untuk hasil yang lebih aplikatif.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">40% Teori - 60% Praktik</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Fokus pada praktik langsung untuk memastikan pemahaman yang lebih mendalam.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Pembelajaran Interaktif</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Melibatkan diskusi aktif dan simulasi untuk meningkatkan pemahaman.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                    <div className="lg:col-span-1 group">
                        <div className="h-full bg-white border-2 border-[#F9B800] rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-center">
                            <h4 className="mb-2.5 text-lg font-bold text-center">Program Kelas Reguler</h4>
                            <div className="space-y-2">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Public Speaking</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Meningkatkan kepercayaan diri berbicara di depan umum dengan teknik yang efektif.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Master of Ceremony</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Menjadi pembawa acara profesional yang mampu memandu berbagai jenis acara.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Broadcaster/Radio Announcer</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Belajar teknik penyiaran radio dan menjadi penyiar yang berkualitas.
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="w-1 h-1 bg-[#F9B800] rounded-full"></div>
                                        <h5 className="text-xs font-semibold">Kids & Teens Program</h5>
                                    </div>
                                    <p className="text-[10px] text-gray-600 leading-relaxed pl-2.5">
                                        Program khusus mengembangkan kemampuan komunikasi anak dan remaja sejak dini.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Layanan Inhouse Training */}
                    <div className="lg:col-span-1 group">
                        <div className="h-full bg-gradient-to-br from-black via-gray-900 to-black rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-800 flex flex-col justify-center items-center text-center">
                            <h4 className="text-[#F9B800] mb-2.5 text-lg font-bold">Layanan Inhouse Training</h4>
                            <p className="text-gray-300 mb-2.5 text-xs leading-relaxed max-w-md">
                                Rancangan materi yang dapat disesuaikan dengan kebutuhan perusahaan.
                            </p>
                            <div className="grid grid-cols-1 gap-y-1.5 w-full max-w-[200px]">
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Service Excellent</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Leadership</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Motivation at Work</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Team Building</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Personal Branding</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Negotiation Skills</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Beauty Class & Grooming</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>Basic Selling Skills</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span>IT Training</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 text-sm italic">
                                    <div className="w-1.5 h-1.5 bg-[#F9B800] rounded-full flex-shrink-0"></div>
                                    <span className="text-left">Materi lainnya sesuai kebutuhan</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};