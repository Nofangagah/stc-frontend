# 🚀 Development Notes - Swaragama Training Center

## ⚠️ PENTING: Placeholder Images

Website ini menggunakan **placeholder images** untuk development karena asset asli menggunakan `figma:asset` yang hanya berfungsi di environment Figma Make.

### 📍 Sections dengan Placeholder

#### 1. **Clients Section** (`/components/Clients.tsx`)
- **Status**: Menggunakan UI Avatars API untuk generate placeholder logo
- **URL Pattern**: `https://ui-avatars.com/api/?name={Company}&size=150&background=F9B800&color=000000`
- **Total Logos**: 47 logos (16 row 1 + 16 row 2 + 15 row 3)
- **Action Required**: 
  - Backend developer perlu implement CRUD untuk upload logo asli
  - Logo format: PNG/SVG transparent background
  - Optimal size: 300x200px max
  - Store di CDN/Cloud Storage (AWS S3, Cloudflare R2, dll)

#### 2. **About Section Gallery** (`/components/About.tsx`)
- **Status**: Currently empty array `[]`
- **Action Required**:
  - Upload galeri foto training/kegiatan Swaragama TC
  - Recommended: 5-10 images
  - Aspect ratio: 3:2 (contoh: 1200x800px)
  - Auto-slide carousel dengan interval 3 detik

#### 3. **Services Section** (`/components/Services.tsx`)
- **Status**: Menggunakan Unsplash images
- **Images**: 
  - Public Speaking: https://images.unsplash.com/photo-1475721027785-f74eccf877e2
  - MC/Moderator: https://images.unsplash.com/photo-1511578314322-379afb476865
  - Dan lainnya...
- **Action Required**:
  - Replace dengan foto dokumentasi training asli Swaragama TC
  - Aspect ratio: 4:3 (contoh: 800x600px)

#### 4. **Trainers Section** (`/components/Trainers.tsx`)
- **Status**: Currently empty array `[]`
- **Action Required**:
  - Upload foto trainer Swaragama TC
  - Include: firstName, lastName, title, image
  - Photo format: Portrait (aspect ratio 3:4, contoh: 600x800px)
  - Professional headshot dengan background konsisten

#### 5. **Blog Posts / STC Corner** (`/components/Blog.tsx`)
- **Status**: Menggunakan Unsplash images
- **Action Required**:
  - Populate dengan artikel real dari tim Swaragama TC
  - Featured image: 16:9 aspect ratio (contoh: 1200x675px)
  - Rich text content dengan HTML/Markdown support

#### 6. **Testimonials Section** (`/components/Testimonials.tsx`)
- **Status**: Currently empty array `[]`
- **Action Required**:
  - Upload screenshot testimoni dari Instagram/Google/WhatsApp
  - Format: PNG/JPG
  - Optimal width: 400-600px (height auto)
  - Include rotation & scale class untuk visual interest

---

## 🔧 How to Replace Placeholders

### Option 1: Manual Development
1. Simpan image di folder `/public/assets/` (buat folder jika belum ada)
2. Update import di component:
```javascript
// Before
const logo = getPlaceholderLogo('BNI');

// After
import logoBNI from '/assets/clients/bni-logo.png';
const logo = logoBNI;
```

### Option 2: Via Backend API (Recommended)
1. Setup backend dengan CRUD endpoints (lihat `/CRUD_GUIDE.md`)
2. Update component untuk fetch dari API:
```javascript
// Example
useEffect(() => {
  fetch('/api/clients')
    .then(res => res.json())
    .then(data => setClientLogos(data));
}, []);
```

---

## 📦 Running the Project Locally

### Prerequisites
```bash
node >= 18.x
npm atau yarn
```

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Jika menggunakan backend API, buat file `.env`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_CDN_URL=https://your-cdn-url.com
```

---

## 🎨 Design System

### Color Palette
- **Primary Yellow**: `#F9B800`
- **Black**: `#000000`
- **Gray Variants**: `gray-50`, `gray-100`, `gray-600`, dll (Tailwind defaults)
- **Background Gradient**: Custom di setiap section

### Typography
- **Font**: System defaults (disesuaikan via `styles/globals.css`)
- **Headings**: Tidak ada class font size/weight kecuali custom
- **Body Text**: Default line-height & spacing

### Animations
Defined in `styles/globals.css`:
- `animate-scroll-left` - Infinite horizontal scroll left
- `animate-scroll-right` - Infinite horizontal scroll right
- `animate-blob` - Floating background blobs
- `animate-float-slow` - Slow floating animation
- `animate-float-medium` - Medium speed floating
- `animate-float-fast` - Fast floating animation

---

## 📂 Project Structure

```
/
├── App.tsx                      # Main app entry point
├── CRUD_GUIDE.md               # Backend development guide
├── DEVELOPMENT_NOTES.md        # This file
├── Attributions.md             # Image attributions
├── components/
│   ├── Navbar.tsx              # Transparent → Solid on scroll
│   ├── Hero.tsx                # Hero section dengan CTA
│   ├── About.tsx               # Tentang + Galeri carousel
│   ├── Services.tsx            # Layanan stacked carousel
│   ├── Trainers.tsx            # Trainer horizontal carousel
│   ├── ClientsAndBlogWrapper.tsx  # Unified background wrapper
│   ├── Clients.tsx             # 3-row scrolling logos
│   ├── Blog.tsx                # STC Corner blog posts
│   ├── Testimonials.tsx        # Masonry grid testimonials
│   ├── Contact.tsx             # Contact form
│   ├── Footer.tsx              # Footer dengan social links
│   ├── figma/
│   │   └── ImageWithFallback.tsx  # Image component dengan fallback
│   └── ui/                     # Shadcn UI components
├── styles/
│   └── globals.css             # Global styles & animations
└── guidelines/
    └── Guidelines.md           # Development guidelines
```

---

## 🔍 Key Features Implemented

### ✅ Navbar
- Transparent saat idle di hero section
- Solid white background saat scroll > 50px
- Logo berubah sesuai state scroll
- Smooth scroll to section on click
- Active section highlighting
- Mobile responsive dengan hamburger menu

### ✅ Hero Section
- Full viewport height
- Background gradient kuning
- CTA buttons dengan hover effects
- Responsive layout

### ✅ About Section
- Auto-slide carousel galeri (3 detik interval)
- Pause on hover
- Previous/Next buttons
- Dots indicator

### ✅ Services Section
- Stacked card carousel
- Active card highlighted
- Blur & scale effect pada inactive cards
- Previous/Next navigation
- Dots indicator

### ✅ Trainers Section
- Horizontal carousel
- Responsive columns (1-5 cards)
- Hover effects: lift & zoom
- Name highlighting (lastName kuning)

### ✅ Clients Section
- 3 baris infinite scrolling
- Direction: Right → Left → Right
- Hover shadow enhancement
- Seamless loop animation

### ✅ Blog Section
- Grid layout (jika ≤3 posts)
- Carousel (jika >3 posts)
- Card hover effects
- Category & date badges

### ✅ Testimonials Section
- Masonry grid layout
- Responsive columns (2-5)
- Random rotation & scale
- Hover effects: scale up, rotate to 0

### ✅ Contact Section
- Contact form dengan validation
- Google Maps embed (placeholder)
- Contact info cards
- Toast notification on submit

### ✅ Footer
- Social media links
- Quick links navigation
- Copyright info

---

## 🚨 Known Issues & Limitations

### 1. Placeholder Images
- **Issue**: Using external API (ui-avatars.com) untuk client logos
- **Impact**: Requires internet connection, slower loading
- **Solution**: Replace dengan logo asli via backend CRUD

### 2. Empty Arrays
- **Issue**: Galeri About, Trainers, dan Testimonials masih kosong
- **Impact**: Sections tidak menampilkan konten
- **Solution**: Populate data via backend atau manual

### 3. Hard-coded Content
- **Issue**: Contact info, social media links hard-coded
- **Impact**: Perlu edit code untuk update
- **Solution**: Buat site_settings table di database

### 4. No Backend Integration
- **Issue**: Purely frontend, no data persistence
- **Impact**: Tidak bisa update konten tanpa rebuild
- **Solution**: Implement backend API + admin dashboard

---

## 🎯 Next Steps for Development

### Phase 1: Backend Setup
1. Setup database (MySQL/PostgreSQL)
2. Create tables sesuai `CRUD_GUIDE.md`
3. Implement REST API endpoints
4. Setup file upload & storage

### Phase 2: Frontend Integration
1. Install axios atau fetch library
2. Create API service layer
3. Replace dummy data dengan API calls
4. Implement loading states & error handling

### Phase 3: Admin Dashboard
1. Create admin routes (`/admin/*`)
2. Implement authentication/authorization
3. Build CRUD interfaces untuk setiap section
4. Integrate rich text editor untuk blog posts

### Phase 4: Production Ready
1. Environment variables configuration
2. SEO optimization (meta tags, sitemap)
3. Performance optimization (lazy loading, CDN)
4. Security hardening
5. Testing & QA
6. Deployment

---

## 📞 Contact & Support

Untuk pertanyaan teknis terkait development:
1. Review `CRUD_GUIDE.md` untuk struktur database
2. Check component files untuk melihat struktur data
3. Konsultasi dengan tim design untuk asset requirements

---

## 📝 Change Log

### Version 1.0 (Current)
- ✅ Complete frontend implementation
- ✅ Responsive design (mobile + desktop)
- ✅ Unified background Clients + Blog sections
- ✅ All animations & interactions
- ✅ Placeholder system untuk development
- ✅ Comprehensive documentation

### Planned (Version 2.0)
- [ ] Backend API integration
- [ ] Admin dashboard
- [ ] Real content migration
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Production deployment

---

**Last Updated**: October 2025  
**Developer**: Figma Make AI Assistant  
**For**: Swaragama Training Center
