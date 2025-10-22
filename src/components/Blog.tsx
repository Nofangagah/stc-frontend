import React, { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Calendar, ArrowRight, X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { getAllArticles } from '../api/api';
import { articlesLocal, type BlogPost } from '../data/articlesLocal';

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Komponen utama
export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUsingLocalData, setIsUsingLocalData] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setIsUsingLocalData(false);

        // Timeout untuk request API (5 detik)
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const { data } = await getAllArticles();
        clearTimeout(timeoutId);

        const formattedArticles = data.map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          author: post.author || 'Admin',
          tags: post.tags || [],
          imageUrl: post.imageUrl || '/fallback-image.jpg',
          createdAt: post.createdAt,
        }));

        if (formattedArticles.length === 0) {
          // API berhasil tapi data kosong
          console.log("📦 API response kosong, menggunakan data lokal articles");
          setPosts(articlesLocal);
          setIsUsingLocalData(true);
        } else {
          setPosts(formattedArticles);
          setIsUsingLocalData(false);
        }
      } catch (err) {
        // API gagal - fallback ke data lokal
        console.log("📦 Mode lokal aktif - Menampilkan artikel dari data lokal");
        setPosts(articlesLocal);
        setIsUsingLocalData(true);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const openModal = (index: number) => setSelectedPost(index);
  const closeModal = () => setSelectedPost(null);

  if (loading) {
    return (
      <section id="blog" className="py-20 text-center">
        <p>Memuat artikel...</p>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section id="blog" className="py-20 text-center">
        <p>Tidak ada artikel tersedia.</p>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">
            <span className="text-[#F9B800]">STC</span> Corner
          </h2>
          <div className="w-24 h-1 bg-[#F9B800] mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Artikel dan tips seputar public speaking, MC, dan komunikasi
          </p>
        </div>

        {/* Render blog cards - Grid jika ≤3, Carousel jika >3 */}
        {posts.length <= 3 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Calendar size={16} className="mr-2" />
                    {formatDate(post.createdAt)}
                  </div>
                  <h3 className="text-xl mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.content}
                  </p>
                  <button 
                    className="text-[#F9B800] hover:text-[#e0a800] inline-flex items-center transition-colors duration-200"
                    onClick={() => openModal(index)}
                  >
                    Baca Selengkapnya
                    <ArrowRight size={16} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="relative px-12">
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent className="-ml-4">
                {posts.map((post, index) => (
                  <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <ImageWithFallback
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center text-gray-500 text-sm mb-3">
                          <Calendar size={16} className="mr-2" />
                          {formatDate(post.createdAt)}
                        </div>
                        <h3 className="text-xl mb-3">{post.title}</h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.content}
                        </p>
                        <button 
                          className="text-[#F9B800] hover:text-[#e0a800] inline-flex items-center transition-colors duration-200"
                          onClick={() => openModal(index)}
                        >
                          Baca Selengkapnya
                          <ArrowRight size={16} className="ml-2" />
                        </button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-12 bg-[#F9B800] hover:bg-[#e0a700] text-white border-none shadow-lg" />
              <CarouselNext className="-right-12 bg-[#F9B800] hover:bg-[#e0a700] text-white border-none shadow-lg" />
            </Carousel>
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {selectedPost !== null && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Side - Image */}
            <div className="relative w-full md:w-[30%] h-48 md:h-auto overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={posts[selectedPost].imageUrl}
                alt={posts[selectedPost].title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-[70%] flex flex-col relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg z-10"
              >
                <X size={20} className="text-gray-800" />
              </button>

              <div className="p-6 md:p-8 pb-4 border-b border-gray-200">
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Calendar size={16} className="mr-2" />
                  {formatDate(posts[selectedPost].createdAt)}
                </div>
                <h2 className="text-2xl md:text-3xl pr-12">
                  {posts[selectedPost].title}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {posts[selectedPost].content}
                </p>

                {posts[selectedPost].tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm mb-3 text-gray-600">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {posts[selectedPost].tags.map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <button
                  onClick={closeModal}
                  className="w-full md:w-auto px-6 py-3 bg-[#F9B800] hover:bg-[#e0a700] text-black rounded-lg transition-colors duration-200"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
