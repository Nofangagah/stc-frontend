import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Trash2, Edit3, X, Image } from 'lucide-react'; 
import { 
    getAllArticles, 
    getAllTrainers, 
    addArticle, 
    addTrainer, 
    editTrainer, 
    editArticle, 
    deleteTrainer, 
    deleteArticle, 
    getALlGalleries, 
    deleteGallery, 
    createGallery 
} from '../../api/api';

// Alias fungsi API
const getAllGalleries = getALlGalleries;
const addGallery = createGallery;

interface TrainerData {
    id: number;
    name: string;
    expertise: string[];
    avatarUrl: string;
}

interface ArticleData {
    id: number;
    title: string;
    content: string;
    author: string;
    tags: string[];
    imageUrl: string;
    createdAt: string;
}

interface GalleryData {
    id: number;
    adminId: number;
    imageUrl: string;
}

type EditableTrainerData = TrainerData & { newAvatarFile: File | null };
type EditableArticleData = ArticleData & { newImageFile: File | null };

export const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'trainers' | 'articles' | 'gallery'>('trainers');
    const [trainers, setTrainers] = useState<TrainerData[]>([]);
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const [gallery, setGallery] = useState<GalleryData[]>([]); 
    const [loading, setLoading] = useState(true);

    const [showArticleModal, setShowArticleModal] = useState(false);
    const [showTrainerModal, setShowTrainerModal] = useState(false);
    const [showGalleryModal, setShowGalleryModal] = useState(false); 

    const [editingTrainer, setEditingTrainer] = useState<EditableTrainerData | null>(null);
    const [editingArticle, setEditingArticle] = useState<EditableArticleData | null>(null);
    const [showEditTrainerModal, setShowEditTrainerModal] = useState(false);
    const [showEditArticleModal, setShowEditArticleModal] = useState(false);

    const [newArticle, setNewArticle] = useState({
        title: '',
        content: '',
        author: '',
        tags: '',
        imageFile: null as File | null,
    });

    const [newTrainer, setNewTrainer] = useState({
        name: '',
        expertise: '',
        avatarFile: null as File | null,
    });

    const [newGallery, setNewGallery] = useState({
        imageFile: null as File | null,
    });

    // ===============================
    // Normalizers
    // ===============================
    const normalizeTrainers = (data: any): TrainerData[] => {
        const trainersArray = data?.trainers || data || [];
        if (!Array.isArray(trainersArray)) return [];
        return trainersArray.map((trainer: any) => ({
            id: trainer.id ?? Math.random(),
            name: trainer.name || 'Unknown Trainer',
            expertise: Array.isArray(trainer.expertise)
                ? trainer.expertise
                : trainer.expertise
                    ? String(trainer.expertise).split(',').map(e => e.trim())
                    : [],
            avatarUrl: trainer.avatarUrl || '/fallback-image.jpg',
        }));
    };

    const normalizeArticles = (data: any): ArticleData[] => {
        const articlesArray = data?.articles || data || [];
        if (!Array.isArray(articlesArray)) return [];
        return articlesArray.map((a: any) => ({
            id: a.id ?? Math.random(),
            title: a.title || 'Tanpa Judul',
            content: a.content || '',
            author: a.author || 'Tidak diketahui',
            tags: Array.isArray(a.tags) ? a.tags : String(a.tags || '').split(',').map(t => t.trim()).filter(t => t),
            imageUrl: a.imageUrl || '/placeholder.jpg',
            createdAt: a.createdAt || new Date().toISOString(),
        }));
    };

    const normalizeGallery = (data: any): GalleryData[] => {
        const galleryArray = data?.galleries || data || [];
        if (!Array.isArray(galleryArray)) return [];
        return galleryArray.map((g: any) => ({
            id: g.id ?? Math.random(),
            adminId: g.adminId ?? 0,
            imageUrl: g.imageUrl || '/placeholder.jpg',
        }));
    };

    // ===============================
    // Fetch data awal
    // ===============================
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch Articles
                try {
                    const articlesRes = await getAllArticles();
                    setArticles(normalizeArticles(articlesRes.data));
                } catch (err) {
                   
                    setArticles([]);
                }

                // Fetch Trainers
                try {
                    const trainersRes = await getAllTrainers();
                    setTrainers(normalizeTrainers(trainersRes.data));
                } catch (err) {
                    console.error('Gagal mengambil data Trainers:', err);
                    setTrainers([]);
                }
                
                // Fetch Galleries (DIPERBAIKI)
                try {
                    const galleryRes = await getAllGalleries(); 
                    const dataPayload = galleryRes;
                    
                    if (dataPayload && dataPayload.data) {
                        setGallery(normalizeGallery(dataPayload.data));
                    } else if (Array.isArray(dataPayload)) { 
                        setGallery(normalizeGallery(dataPayload));
                    } else {
                        console.warn('Data galeri kosong atau tidak berformat.');
                        setGallery([]);
                    }
                } catch (err) {
                    console.error('Gagal mengambil data Gallery:', err);
                    setGallery([]);
                }

            } catch (err) {
                console.error('Terjadi kesalahan umum:', err);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, []);

    // ===============================
    // Handlers ADD
    // ===============================

    const handleAddArticle = async () => {
        if (!newArticle.imageFile) { alert('❌ Mohon unggah file Gambar Artikel.'); return; }
        try {
          const formData = new FormData();
          formData.append('title', newArticle.title);
          formData.append('content', newArticle.content);
          formData.append('author', newArticle.author);
          formData.append('tags', newArticle.tags);
          formData.append('image', newArticle.imageFile);
          const res = await addArticle(formData);
          if (res.status === true || res.message?.toLowerCase().includes('success')) {
            alert('✅ Artikel berhasil ditambahkan!');
            setArticles((prev) => [...prev, normalizeArticles([res.data || res])[0]]);
            setShowArticleModal(false);
            setNewArticle({ title: '', content: '', author: '', tags: '', imageFile: null });
          } else { alert(`❌ Gagal menambahkan artikel: ${res.message || 'Unknown error'}`); }
        } catch (err) { console.error('Error:', err); alert('❌ Terjadi kesalahan saat menambahkan artikel.'); }
      };

      const handleAddTrainer = async () => {
        if (!newTrainer.avatarFile) { alert('❌ Mohon unggah file Avatar Trainer.'); return; }
        try {
          const formData = new FormData();
          formData.append('name', newTrainer.name);
          formData.append('expertise', newTrainer.expertise);
          formData.append('image', newTrainer.avatarFile);
          const res = await addTrainer(formData);
          if (res.status === true || res.message?.toLowerCase().includes('success')) {
            alert('✅ Trainer berhasil ditambahkan!');
            setTrainers((prev) => [...prev, normalizeTrainers([res.data || res])[0]]);
            setShowTrainerModal(false);
            setNewTrainer({ name: '', expertise: '', avatarFile: null });
          } else { alert(`❌ Gagal menambahkan trainer: ${res.message || 'Unknown error'}`); }
        } catch (err) { console.error('Error:', err); alert('❌ Terjadi kesalahan saat menambahkan trainer.'); }
      };
    
    const handleAddGallery = async () => {
        if (!newGallery.imageFile) { alert('❌ Mohon unggah file Gambar untuk Galeri.'); return; }
        try {
            const formData = new FormData();
            formData.append('image', newGallery.imageFile);
            const res = await addGallery(formData);
            if (res.status === true || res.message?.toLowerCase().includes('success')) {
                alert('✅ Gambar Galeri berhasil ditambahkan!');
                setGallery((prev) => [...prev, normalizeGallery([res.data || res])[0]]);
                setShowGalleryModal(false);
                setNewGallery({ imageFile: null });
            } else { alert(`❌ Gagal menambahkan gambar galeri: ${res.message || 'Unknown error'}`); }
        } catch (err) { console.error('Error:', err); alert('❌ Terjadi kesalahan saat menambahkan gambar galeri.'); }
    };

    // ===============================
    // Handlers DELETE
    // ===============================

    const handleDeleteTrainer = async (id: number, name: string) => {
        if (!window.confirm(`❓ Apakah Anda yakin ingin menghapus trainer "${name}" (ID: ${id})? Aksi ini tidak dapat dibatalkan.`)) { return; }
        try {
          const res = await deleteTrainer(id);
          if (res.status === true || res.message?.toLowerCase().includes('success')) {
            alert(`✅ Trainer "${name}" berhasil dihapus.`);
            setTrainers(prev => prev.filter(t => t.id !== id));
          } else { alert(`❌ Gagal menghapus trainer: ${res.message || 'Unknown error'}`); }
        } catch (err) { console.error('Error:', err); alert('❌ Terjadi kesalahan saat menghapus trainer.'); }
      };
    
    const handleDeleteArticle = async (id: number, title: string) => {
        if (!window.confirm(`❓ Apakah Anda yakin ingin menghapus artikel "${title}" (ID: ${id})? Aksi ini akan menghapus semua file terkait.`)) { return; }
        try {
          const res = await deleteArticle(id);
          if (res.status === true || res.message?.toLowerCase().includes('success')) {
            alert(`✅ Artikel "${title}" berhasil dihapus.`);
            setArticles(prev => prev.filter(a => a.id !== id));
          } else { alert(`❌ Gagal menghapus artikel: ${res.message || 'Unknown error'}`); }
        } catch (err) { console.error('Error:', err); alert('❌ Terjadi kesalahan saat menghapus artikel.'); }
      };
    
    const handleDeleteGallery = async (id: number) => {
        if (!window.confirm(`❓ Apakah Anda yakin ingin menghapus gambar galeri (ID: ${id})? Aksi ini tidak dapat dibatalkan.`)) { return; }
        try {
            const res = await deleteGallery(id);
            if (res.status === true || res.message?.toLowerCase().includes('success')) {
                alert(`✅ Gambar galeri ID ${id} berhasil dihapus.`);
                setGallery(prev => prev.filter(g => g.id !== id));
            } else { alert(`❌ Gagal menghapus gambar galeri: ${res.message || 'Unknown error'}`); }
        } catch (err) { console.error('Error:', err); alert('❌ Terjadi kesalahan saat menghapus gambar galeri.'); }
    };

    // ===============================
    // Tabel Renderer
    // ===============================
    
    // Perbaikan: Ukuran gambar diubah menjadi w-12 h-12 untuk semua tabel agar rapi.

    const renderGalleryTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                        <th className="p-3 border-b-2 w-16">ID</th>
                        <th className="p-3 border-b-2">Gambar</th>
                        <th className="p-3 border-b-2">Admin ID</th>
                        <th className="p-3 border-b-2 w-32">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={4} className="p-4 text-center text-gray-500 italic">Memuat data...</td></tr>
                    ) : gallery.length === 0 ? (
                        <tr><td colSpan={4} className="p-4 text-center text-gray-500 italic">Belum ada data Galeri.</td></tr>
                    ) : (
                        gallery.map((g) => (
                            <tr key={g.id} className="border-b hover:bg-gray-50 text-sm">
                                <td className="p-3">{g.id}</td>
                                <td className="p-3">
                                    <img 
                                        src={g.imageUrl} 
                                        alt={`Galeri ID ${g.id}`} 
                                        className="w-12 h-12 object-cover rounded-lg border" // <-- Ukuran diubah
                                    />
                                </td>
                                <td className="p-3">{g.adminId}</td>
                                <td className="p-3 flex justify-center space-x-3">
                                    <button onClick={() => handleDeleteGallery(g.id)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
    
    const renderTrainerTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                        <th className="p-3 border-b-2 w-16">ID</th>
                        <th className="p-3 border-b-2">Avatar</th>
                        <th className="p-3 border-b-2">Nama</th>
                        <th className="p-3 border-b-2">Keahlian</th>
                        <th className="p-3 border-b-2 w-32">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={5} className="p-4 text-center text-gray-500 italic">Memuat data...</td></tr>
                    ) : trainers.length === 0 ? (
                        <tr><td colSpan={5} className="p-4 text-center text-gray-500 italic">Belum ada data Trainer.</td></tr>
                    ) : (
                        trainers.map((t) => (
                            <tr key={t.id} className="border-b hover:bg-gray-50 text-sm">
                                <td className="p-3">{t.id}</td>
                                <td className="p-3">
                                    <img 
                                        src={t.avatarUrl} 
                                        alt={t.name} 
                                        className="w-12 h-12 rounded-full object-cover border" // <-- Ukuran diubah
                                    />
                                </td>
                                <td className="p-3 font-medium">{t.name}</td>
                                <td className="p-3">{Array.isArray(t.expertise) ? t.expertise.join(', ') : t.expertise}</td>
                                <td className="p-3 flex justify-center space-x-3">
                                    <button onClick={() => {/* logic edit */}} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"><Edit3 size={18} /></button>
                                    <button onClick={() => handleDeleteTrainer(t.id, t.name)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    const renderArticleTable = () => (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
                <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                        <th className="p-3 border-b-2 w-20">Gambar</th>
                        <th className="p-3 border-b-2 w-16">ID</th>
                        <th className="p-3 border-b-2">Judul</th>
                        <th className="p-3 border-b-2">Penulis</th>
                        <th className="p-3 border-b-2 w-32">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan={5} className="p-4 text-center text-gray-500 italic">Memuat data...</td></tr>
                    ) : articles.length === 0 ? (
                        <tr><td colSpan={5} className="p-4 text-center text-gray-500 italic">Belum ada data Artikel.</td></tr>
                    ) : (
                        articles.map((a) => (
                            <tr key={a.id} className="border-b hover:bg-gray-50 text-sm">
                                <td className="p-3">
                                    <img 
                                        src={a.imageUrl} 
                                        alt={a.title} 
                                        className="w-16 h-12 object-cover rounded-lg border" // <-- Ukuran diubah sedikit agar proporsional
                                    />
                                </td>
                                <td className="p-3">{a.id}</td>
                                <td className="p-3 font-medium">{a.title}</td>
                                <td className="p-3">{a.author}</td>
                                <td className="p-3 flex justify-center space-x-3">
                                    <button onClick={() => {/* logic edit */}} className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"><Edit3 size={18} /></button>
                                    <button onClick={() => handleDeleteArticle(a.id, a.title)} className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    // ===============================
    // Render utama
    // ===============================
    return (
        <div className="min-h-[calc(100vh-80px-160px)] py-8">
            <div className="container mx-auto px-4 lg:px-8">
                <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Dashboard Konten STC</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <div className="md:w-64 bg-white p-4 rounded-xl shadow-lg flex-shrink-0 border border-gray-100 h-fit">
                        <h3 className="text-lg font-bold mb-4 text-[#F9B800]">Manajemen Data</h3>
                        <nav className="space-y-2">
                            <button onClick={() => setActiveTab('trainers')} className={`w-full text-left flex items-center p-3 rounded-lg ${activeTab === 'trainers' ? 'bg-[#F9B800] text-black font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><Users size={20} className="mr-3" /> Trainer</button>
                            <button onClick={() => setActiveTab('articles')} className={`w-full text-left flex items-center p-3 rounded-lg ${activeTab === 'articles' ? 'bg-[#F9B800] text-black font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><BookOpen size={20} className="mr-3" /> STC Corner (Artikel)</button>
                            <button onClick={() => setActiveTab('gallery')} className={`w-full text-left flex items-center p-3 rounded-lg ${activeTab === 'gallery' ? 'bg-[#F9B800] text-black font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}><Image size={20} className="mr-3" /> Galeri</button>
                        </nav>
                    </div>

                    {/* Konten utama */}
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-700 capitalize">
                                Daftar {activeTab === 'trainers' ? 'Trainer' : activeTab === 'articles' ? 'Artikel' : 'Galeri'}
                            </h2>
                            <button
                                onClick={() => {
                                    if (activeTab === 'articles') setShowArticleModal(true);
                                    else if (activeTab === 'trainers') setShowTrainerModal(true);
                                    else if (activeTab === 'gallery') setShowGalleryModal(true);
                                }}
                                className="px-5 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-md flex items-center text-sm"
                            >
                                <Edit3 size={18} className="mr-2" /> Tambah Baru
                            </button>
                        </div>

                        {activeTab === 'trainers' && renderTrainerTable()}
                        {activeTab === 'articles' && renderArticleTable()}
                        {activeTab === 'gallery' && renderGalleryTable()}
                    </div>
                </div>
            </div>

            {/* Modal Tambah Artikel */}
            {showArticleModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative"><button onClick={() => setShowArticleModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X size={20} /></button><h3 className="text-xl font-bold mb-4 text-gray-800">Tambah Artikel Baru</h3><div className="space-y-3"><input type="text" placeholder="Judul" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} className="w-full border rounded-lg p-2" /><input type="text" placeholder="Penulis" value={newArticle.author} onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} className="w-full border rounded-lg p-2" /><div className="flex flex-col space-y-1"><label className="text-sm font-medium text-gray-600">Unggah Gambar Artikel</label><input type="file" accept="image/*" onChange={(e) => { const file = e.target.files ? e.target.files[0] : null; setNewArticle({ ...newArticle, imageFile: file }); }} className="w-full border rounded-lg p-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#F9B800] hover:file:bg-yellow-100" /></div><input type="text" placeholder="Tag (pisahkan dengan koma)" value={newArticle.tags} onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value })} className="w-full border rounded-lg p-2" /><textarea placeholder="Konten artikel..." value={newArticle.content} onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })} className="w-full border rounded-lg p-2 h-32" /></div><div className="flex justify-end mt-5 space-x-3"><button onClick={() => setShowArticleModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Batal</button><button onClick={handleAddArticle} className="px-4 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500">Simpan</button></div></div></div>
            )}
            
            {/* Modal Tambah Trainer */}
            {showTrainerModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"><div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative"><button onClick={() => setShowTrainerModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X size={20} /></button><h3 className="text-xl font-bold mb-4 text-gray-800">Tambah Trainer Baru</h3><div className="space-y-3"><input type="text" placeholder="Nama Trainer" value={newTrainer.name} onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })} className="w-full border rounded-lg p-2" /><input type="text" placeholder="Keahlian (pisahkan dengan koma)" value={newTrainer.expertise} onChange={(e) => setNewTrainer({ ...newTrainer, expertise: e.target.value })} className="w-full border rounded-lg p-2" /><div className="flex flex-col space-y-1"><label className="text-sm font-medium text-gray-600">Unggah Avatar (Max 5MB)</label><input type="file" accept="image/*" onChange={(e) => { const file = e.target.files ? e.target.files[0] : null; setNewTrainer({ ...newTrainer, avatarFile: file }); }} className="w-full border rounded-lg p-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#F9B800] hover:file:bg-yellow-100" /></div></div><div className="flex justify-end mt-5 space-x-3"><button onClick={() => setShowTrainerModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Batal</button><button onClick={handleAddTrainer} className="px-4 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500">Simpan</button></div></div></div>
            )}
            
            {/* Modal Tambah Galeri */}
            {showGalleryModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative">
                        <button onClick={() => setShowGalleryModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"><X size={20} /></button>
                        <h3 className="text-xl font-bold mb-4 text-gray-800">Tambah Gambar Galeri Baru</h3>
                        <div className="space-y-3">
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium text-gray-600">Unggah Gambar Galeri</label>
                                <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files ? e.target.files[0] : null; setNewGallery({ ...newGallery, imageFile: file }); }} className="w-full border rounded-lg p-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#F9B800] hover:file:bg-yellow-100" />
                            </div>
                        </div>
                        <div className="flex justify-end mt-5 space-x-3">
                            <button onClick={() => setShowGalleryModal(false)} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Batal</button>
                            <button onClick={handleAddGallery} className="px-4 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500">Simpan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};