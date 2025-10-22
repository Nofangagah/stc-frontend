# STC Frontend - Swaragama Training Center

Website resmi Swaragama Training Center dengan sistem fallback data lokal.

## 🚀 Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## 🔄 Data Fetching Strategy

Website ini menggunakan **automatic fallback mechanism** untuk memastikan konten tetap ditampilkan meskipun API tidak tersedia:

### Cara Kerja:
1. **Primary**: Website akan mencoba fetch data dari API backend (`stc-backend.vercel.app`)
2. **Fallback**: Jika API gagal/timeout (5 detik), otomatis beralih ke data lokal di folder `src/data/`
3. **Seamless**: User tidak akan melihat error atau loading forever - konten tetap tampil

### Data yang Menggunakan Fallback:
- **Galeri** (About Section): `src/data/galleriesLocal.ts`
- **Trainers**: `src/data/trainersLocal.ts`
- **Blog Articles** (STC Corner): `src/data/articlesLocal.ts`

### Keuntungan:
✅ Website tetap functional meskipun backend down  
✅ SEO-friendly - Google tetap bisa crawl konten  
✅ Development lebih mudah tanpa depend penuh ke backend  
✅ User experience tetap smooth  

### Environment Variables

Buat file `.env` di root folder:
```env
VITE_API_BASE_URL=https://stc-backend.vercel.app
```

## 📁 Struktur Project

```
src/
├── api/              # API integration
├── components/       # React components dengan fallback logic
├── data/            # 📦 Local fallback data
│   ├── galleriesLocal.ts
│   ├── trainersLocal.ts
│   └── articlesLocal.ts
├── assets/          # Images & media
└── styles/          # CSS files
```

## 🛠️ Development Notes

- Fallback akan triggered otomatis jika:
  - API timeout (> 5 detik)
  - Network error / CORS error
  - Backend tidak response
  - Response kosong dari API

- Check browser console untuk melihat status:
  - `📦 Mode lokal aktif` = Menggunakan data lokal
  - Tidak ada pesan = Data berhasil dari API

---

Original project from Figma: https://www.figma.com/design/MuGDOpQ5k21qFO082Qwj8y/Website