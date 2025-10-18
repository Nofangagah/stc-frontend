import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Trash2, Edit3, X } from 'lucide-react';
import { getAllArticles, getAllTrainers, addArticle, addTrainer, editTrainer, editArticle, deleteTrainer, deleteArticle } from '../../api/api';

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

type EditableTrainerData = TrainerData & { newAvatarFile: File | null };
type EditableArticleData = ArticleData & { newImageFile: File | null };

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'trainers' | 'articles'>('trainers');
  const [trainers, setTrainers] = useState<TrainerData[]>([]);
  const [articles, setArticles] = useState<ArticleData[]>([]);
  const [loading, setLoading] = useState(true);

 
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showTrainerModal, setShowTrainerModal] = useState(false);

  
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

  // new data (TRAINER) - DIUBAH UNTUK FILE
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    expertise: '',
    avatarFile: null as File | null, 
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
          ? [trainer.expertise]
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
      tags: Array.isArray(a.tags) ? a.tags : [],
      imageUrl: a.imageUrl || '/placeholder.jpg',
      createdAt: a.createdAt || new Date().toISOString(),
    }));
  };

  // ===============================
  // Fetch data awal (DIPISAHKAN UNTUK DEBUGGING)
  // ===============================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

       
        try {
          const articlesRes = await getAllArticles();
          setArticles(normalizeArticles(articlesRes.data));
        } catch (err) {
          console.error('Gagal mengambil data Articles:', err);
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

      } catch (err) {
     
        console.error('Terjadi kesalahan umum:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ===============================
  // Handlers Tambah Baru (ADD)
  // ===============================

  const handleAddArticle = async () => {
    if (!newArticle.imageFile) {
      alert('❌ Mohon unggah file Gambar Artikel.');
      return;
    }

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
      } else {
        alert(`❌ Gagal menambahkan artikel: ${res.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Terjadi kesalahan saat menambahkan artikel.');
    }
  };

  const handleAddTrainer = async () => {
    if (!newTrainer.avatarFile) {
      alert('❌ Mohon unggah file Avatar Trainer.');
      return;
    }

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
      } else {
        alert(`❌ Gagal menambahkan trainer: ${res.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Terjadi kesalahan saat menambahkan trainer.');
    }
  };

  // ===============================
  // Handlers Edit Data (UPDATE)
  // ===============================
  const startEditTrainer = (trainer: TrainerData) => {
    
    setEditingTrainer({ ...trainer, newAvatarFile: null });
    setShowEditTrainerModal(true);
  };

  const startEditArticle = (article: ArticleData) => {
   
    setEditingArticle({ ...article, newImageFile: null });
    setShowEditArticleModal(true);
  };

  const handleEditTrainer = async () => {
    if (!editingTrainer || !editingTrainer.id) return;

    try {
      const formData = new FormData();

      formData.append('name', editingTrainer.name);
      formData.append('expertise', Array.isArray(editingTrainer.expertise) ? editingTrainer.expertise.join(',') : editingTrainer.expertise);

      if (editingTrainer.newAvatarFile) {
        
        formData.append('image', editingTrainer.newAvatarFile);
      } else {
       
        formData.append('avatarUrl', editingTrainer.avatarUrl);
      }

      
      const res = await editTrainer(editingTrainer.id, formData);

      if (res.status === true || res.message?.toLowerCase().includes('success')) {
        alert('✅ Trainer berhasil diperbarui!');
        setTrainers(prev => prev.map(t => t.id === editingTrainer.id ? normalizeTrainers([res.data || res])[0] : t));
        setShowEditTrainerModal(false);
        setEditingTrainer(null);
      } else {
        alert(`❌ Gagal memperbarui trainer: ${res.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Terjadi kesalahan saat memperbarui trainer.');
    }
  };

  const handleEditArticle = async () => {
    if (!editingArticle || !editingArticle.id) return;

    try {
      const formData = new FormData();

      formData.append('title', editingArticle.title);
      formData.append('content', editingArticle.content);
      formData.append('author', editingArticle.author);
      formData.append('tags', Array.isArray(editingArticle.tags) ? editingArticle.tags.join(',') : editingArticle.tags);

      if (editingArticle.newImageFile) {
        formData.append('image', editingArticle.newImageFile);
      } else {
        formData.append('imageUrl', editingArticle.imageUrl);
      }

      const res = await editArticle(editingArticle.id, formData);

      if (res.status === true || res.message?.toLowerCase().includes('success')) {
        alert('✅ Artikel berhasil diperbarui!');
        setArticles(prev => prev.map(a => a.id === editingArticle.id ? normalizeArticles([res.data || res])[0] : a));
        setShowEditArticleModal(false);
        setEditingArticle(null);
      } else {
        alert(`❌ Gagal memperbarui artikel: ${res.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Terjadi kesalahan saat memperbarui artikel.');
    }
  };

  const handleDeleteTrainer = async (id: number, name: string) => {
    if (!window.confirm(`❓ Apakah Anda yakin ingin menghapus trainer "${name}" (ID: ${id})? Aksi ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      
      const res = await deleteTrainer(id);

      if (res.status === true || res.message?.toLowerCase().includes('success')) {
        alert(`✅ Trainer "${name}" berhasil dihapus.`);
      
        setTrainers(prev => prev.filter(t => t.id !== id));
      } else {
        alert(`❌ Gagal menghapus trainer: ${res.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Terjadi kesalahan saat menghapus trainer.');
    }
  };

  const handleDeleteArticle = async (id: number, title: string) => {
    if (!window.confirm(`❓ Apakah Anda yakin ingin menghapus artikel "${title}" (ID: ${id})? Aksi ini akan menghapus semua file terkait.`)) {
      return;
    }

    try {
      const res = await deleteArticle(id);

      if (res.status === true || res.message?.toLowerCase().includes('success')) {
        alert(`✅ Artikel "${title}" berhasil dihapus.`);
        // Hapus item dari state lokal
        setArticles(prev => prev.filter(a => a.id !== id));
      } else {
        alert(`❌ Gagal menghapus artikel: ${res.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Terjadi kesalahan saat menghapus artikel.');
    }
  };

  // ===============================
  // Tabel trainer
  // ===============================
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
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500 italic">
                Memuat data...
              </td>
            </tr>
          ) : trainers.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500 italic">
                Belum ada data Trainer.
              </td>
            </tr>
          ) : (
            trainers.map((t) => (
              <tr key={t.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">{t.id}</td>
                <td className="p-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="p-3 font-medium">{t.name}</td>
                <td className="p-3">
                  {Array.isArray(t.expertise) ? t.expertise.join(', ') : t.expertise}
                </td>
                <td className="p-3 flex justify-center space-x-3">
                  <button
                    onClick={() => startEditTrainer(t)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                  >
                    <Edit3 size={18} />
                  </button>
                 
                  <button
                    onClick={() => handleDeleteTrainer(t.id, t.name)}
                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100"
                  >
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

  // ===============================
  // Tabel artikel
  // ===============================
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
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500 italic">
                Memuat data...
              </td>
            </tr>
          ) : articles.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500 italic">
                Belum ada data Artikel.
              </td>
            </tr>
          ) : (
            articles.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50 text-sm">
                <td className="p-3">
                  <img
                    src={a.imageUrl}
                    alt={a.title}
                    className="w-14 h-14 object-cover rounded-lg border"
                  />
                </td>
                <td className="p-3">{a.id}</td>
                <td className="p-3 font-medium">{a.title}</td>
                <td className="p-3">{a.author}</td>
                <td className="p-3 flex justify-center space-x-3">
                  <button
                    onClick={() => startEditArticle(a)}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                  >
                    <Edit3 size={18} />
                  </button>
            
                  <button
                    onClick={() => handleDeleteArticle(a.id, a.title)} 
                    className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100"
                  >
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

  // ===============================
  // Render utama
  // ===============================
  return (
    <div className="min-h-[calc(100vh-80px-160px)] py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
          Dashboard Konten STC
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64 bg-white p-4 rounded-xl shadow-lg flex-shrink-0 border border-gray-100 h-fit">
            <h3 className="text-lg font-bold mb-4 text-[#F9B800]">Manajemen Data</h3>
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('trainers')}
                className={`w-full text-left flex items-center p-3 rounded-lg ${activeTab === 'trainers'
                  ? 'bg-[#F9B800] text-black font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <Users size={20} className="mr-3" /> Trainer
              </button>
              <button
                onClick={() => setActiveTab('articles')}
                className={`w-full text-left flex items-center p-3 rounded-lg ${activeTab === 'articles'
                  ? 'bg-[#F9B800] text-black font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <BookOpen size={20} className="mr-3" /> STC Corner (Artikel)
              </button>
            </nav>
          </div>

          {/* Konten utama */}
          <div className="flex-1 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-700 capitalize">
                Daftar {activeTab === 'trainers' ? 'Trainer' : 'Artikel'}
              </h2>
              <button
                onClick={() =>
                  activeTab === 'articles'
                    ? setShowArticleModal(true)
                    : setShowTrainerModal(true)
                }
                className="px-5 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-md flex items-center text-sm"
              >
                <Edit3 size={18} className="mr-2" /> Tambah Baru
              </button>
            </div>

            {activeTab === 'trainers' && renderTrainerTable()}
            {activeTab === 'articles' && renderArticleTable()}
          </div>
        </div>
      </div>

      {/* MODAL TAMBAH ARTIKEL */}
      {showArticleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative">
            <button
              onClick={() => setShowArticleModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">Tambah Artikel Baru</h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Judul"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Penulis"
                value={newArticle.author}
                onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                className="w-full border rounded-lg p-2"
              />

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Unggah Gambar Artikel</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setNewArticle({ ...newArticle, imageFile: file });
                  }}
                  className="w-full border rounded-lg p-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#F9B800] hover:file:bg-yellow-100"
                />
              </div>

              <input
                type="text"
                placeholder="Tag (pisahkan dengan koma)"
                value={newArticle.tags}
                onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value })}
                className="w-full border rounded-lg p-2"
              />
              <textarea
                placeholder="Konten artikel..."
                value={newArticle.content}
                onChange={(e) =>
                  setNewArticle({ ...newArticle, content: e.target.value })
                }
                className="w-full border rounded-lg p-2 h-32"
              />
            </div>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={() => setShowArticleModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleAddArticle}
                className="px-4 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH TRAINER */}
      {showTrainerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative">
            <button
              onClick={() => setShowTrainerModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Tambah Trainer Baru
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Trainer"
                value={newTrainer.name}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, name: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Keahlian (pisahkan dengan koma)"
                value={newTrainer.expertise}
                onChange={(e) =>
                  setNewTrainer({ ...newTrainer, expertise: e.target.value })
                }
                className="w-full border rounded-lg p-2"
              />

              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Unggah Avatar (Max 5MB)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setNewTrainer({ ...newTrainer, avatarFile: file });
                  }}
                  className="w-full border rounded-lg p-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#F9B800] hover:file:bg-yellow-100"
                />
              </div>

            </div>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={() => setShowTrainerModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleAddTrainer}
                className="px-4 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT TRAINER */}
      {showEditTrainerModal && editingTrainer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative">
            <button
              onClick={() => {
                setShowEditTrainerModal(false);
                setEditingTrainer(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Edit Trainer: {editingTrainer.name} (ID: {editingTrainer.id})
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nama Trainer"
                value={editingTrainer.name}
                onChange={(e) =>
                  setEditingTrainer({ ...editingTrainer, name: e.target.value } as EditableTrainerData)
                }
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Keahlian (pisahkan dengan koma)"
                value={Array.isArray(editingTrainer.expertise) ? editingTrainer.expertise.join(', ') : editingTrainer.expertise}
                onChange={(e) =>
                  setEditingTrainer({
                    ...editingTrainer,
                    expertise: e.target.value.split(',').map(e => e.trim())
                  } as EditableTrainerData)
                }
                className="w-full border rounded-lg p-2"
              />

              {/* INPUT FILE BARU UNTUK EDIT */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Ganti Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setEditingTrainer({ ...editingTrainer, newAvatarFile: file } as EditableTrainerData);
                  }}
                  className="w-full border rounded-lg p-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#F9B800] hover:file:bg-yellow-100"
                />
                {/* Tampilkan gambar lama */}
                {(!editingTrainer.newAvatarFile && editingTrainer.avatarUrl) && (
                  <img src={editingTrainer.avatarUrl} alt="Current Avatar" className="w-16 h-16 rounded-full object-cover mt-2 border" />
                )}
              </div>

            </div>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={() => {
                  setShowEditTrainerModal(false);
                  setEditingTrainer(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleEditTrainer}
                className="px-4 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT ARTICLE */}
      {showEditArticleModal && editingArticle && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-lg relative">
            <button
              onClick={() => {
                setShowEditArticleModal(false);
                setEditingArticle(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >

            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Edit Artikel: {editingArticle.title} (ID: {editingArticle.id})
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Judul"
                value={editingArticle.title}
                onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value } as EditableArticleData)}
                className="w-full border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Penulis"
                value={editingArticle.author}
                onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value } as EditableArticleData)}
                className="w-full border rounded-lg p-2"
              />

              {/* INPUT FILE BARU UNTUK EDIT */}
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium text-gray-600">Ganti Gambar Artikel</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null;
                    setEditingArticle({ ...editingArticle, newImageFile: file } as EditableArticleData);
                  }}
                  className="w-full border rounded-lg p-2 file:mr-4 file:py-1 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-[#F9B800] hover:file:bg-yellow-100"
                />
                {/* Tampilkan gambar lama */}
                {(!editingArticle.newImageFile && editingArticle.imageUrl) && (
                  <img src={editingArticle.imageUrl} alt="Current Image" className="w-24 h-24 object-cover mt-2 border rounded-lg" />
                )}
              </div>

              <input
                type="text"
                placeholder="Tag (pisahkan dengan koma)"
                value={Array.isArray(editingArticle.tags) ? editingArticle.tags.join(', ') : editingArticle.tags}
                onChange={(e) => setEditingArticle({
                  ...editingArticle,
                  tags: e.target.value.split(',').map(t => t.trim())
                } as EditableArticleData)}
                className="w-full border rounded-lg p-2"
              />
              <textarea
                placeholder="Konten artikel..."
                value={editingArticle.content}
                onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value } as EditableArticleData)}
                className="w-full border rounded-lg p-2 h-32"
              />
            </div>

            <div className="flex justify-end mt-5 space-x-3">
              <button
                onClick={() => {
                  setShowEditArticleModal(false);
                  setEditingArticle(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleEditArticle}
                className="px-4 py-2 bg-[#F9B800] text-black font-semibold rounded-lg hover:bg-yellow-500"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};