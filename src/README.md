# 🎓 Swaragama Training Center - Website

Website resmi Swaragama Training Center yang dibangun dengan React, TypeScript, dan Tailwind CSS.

## 🎨 Preview

Website ini menggunakan color palette kuning (#F9B800) dan hitam sesuai branding Swaragama Training Center, dengan fitur-fitur modern seperti:

- ✨ Navbar transparent yang berubah solid on scroll
- 🎠 Auto-slide carousel untuk galeri
- 📱 Fully responsive design
- 🎯 Smooth scroll navigation
- 🌊 Animated background effects
- 📝 Blog section (STC Corner)
- 💬 Testimonial masonry grid
- 📞 Contact form dengan validation

---

## 📋 Daftar Isi

- [Quick Start](#-quick-start)
- [Struktur Website](#-struktur-website)
- [Dokumentasi](#-dokumentasi)
- [Development Notes](#-development-notes)
- [Tech Stack](#-tech-stack)
- [Browser Support](#-browser-support)

---

## 🚀 Quick Start

### Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** versi 18.x atau lebih baru
- **npm** atau **yarn**

### Installation

```bash
# Clone repository (jika dari Git)
git clone <repository-url>
cd swaragama-training-center

# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

Website akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sudah digunakan).

---

## 🏗️ Struktur Website

Website memiliki 10 section utama:

### 1. **Navbar**
- Transparent saat di hero section
- Berubah solid white saat scroll
- Logo adaptive (hitam/kuning sesuai background)
- Mobile hamburger menu
- Active section highlighting

### 2. **Hero Section**
- Full viewport height
- Background gradient kuning
- 2 CTA buttons: "Hubungi Kami" & "Lihat Layanan"
- Responsive layout

### 3. **About Section**
- Deskripsi perusahaan
- Auto-slide carousel galeri (3 detik)
- Previous/Next buttons & dots indicator
- **NOTE**: Gallery saat ini kosong, perlu populate via CRUD

### 4. **Services Section**
- Stacked card carousel untuk layanan
- 5 layanan tersedia:
  - Public Speaking
  - MC & Moderator
  - Komunikasi
  - Pelatihan Khusus
  - Konsultasi
- Navigation dengan arrows & dots
- **NOTE**: Menggunakan Unsplash images, replace dengan foto real

### 5. **Trainers Section**
- Horizontal carousel trainer
- Responsive: 1-5 cards per view
- Hover effects (lift & zoom)
- **NOTE**: Data trainer kosong, perlu populate via CRUD

### 6. **Clients Section**
- 3 baris infinite scrolling logos
- Arah scroll: Kanan → Kiri → Kanan
- 47 client placeholders
- **NOTE**: Menggunakan UI Avatars placeholder, replace dengan logo asli

### 7. **Blog Section (STC Corner)**
- Grid atau carousel (tergantung jumlah posts)
- Kategori & tanggal
- Featured images
- "Baca Selengkapnya" CTA
- **NOTE**: Menggunakan Unsplash images, populate dengan artikel real

### 8. **Testimonials Section**
- Masonry grid layout
- Responsive: 2-5 columns
- Random rotation & scale effects
- Hover effects
- **NOTE**: Data testimonial kosong, perlu populate via CRUD

### 9. **Contact Section**
- Contact form (Nama, Email, Pesan)
- Google Maps embed
- Contact info cards (Alamat, Email, Telepon)
- Form validation & toast notification

### 10. **Footer**
- Logo & company tagline
- Quick links navigation
- Social media icons (Instagram, Facebook, LinkedIn, TikTok, WhatsApp)
- Copyright info

---

## 📚 Dokumentasi

### Untuk Backend Developer

#### 1. **CRUD_GUIDE.md**
Dokumentasi lengkap untuk implementasi backend:
- Struktur database untuk semua sections
- SQL CREATE TABLE statements
- API endpoints recommendations
- Field descriptions & requirements
- File upload strategies
- Security considerations
- Development timeline (6 weeks)

**Sections yang perlu CRUD management:**
- About Gallery (galeri foto)
- Services (layanan)
- Trainers (daftar trainer)
- Clients (logo klien)
- Blog Posts (artikel STC Corner)
- Testimonials (testimoni)
- Site Settings (contact info, social media links)

#### 2. **DEVELOPMENT_NOTES.md**
Informasi teknis development:
- Penjelasan placeholder images
- How to replace placeholders
- Design system (colors, typography, animations)
- Project structure detail
- Key features implemented
- Known issues & limitations
- Next steps for development

---

## ⚠️ PENTING: Placeholder Data

Website ini saat ini menggunakan **placeholder data** untuk development:

### ❌ Yang Perlu Diganti:

1. **Client Logos** (`/components/Clients.tsx`)
   - Currently: UI Avatars API placeholders
   - Need: Upload logo asli via backend CRUD
   - Format: PNG/SVG transparent
   - Size: max 300x200px

2. **About Gallery** (`/components/About.tsx`)
   - Currently: Empty array `[]`
   - Need: Upload foto kegiatan training
   - Recommended: 5-10 images
   - Aspect ratio: 3:2 (1200x800px)

3. **Trainers** (`/components/Trainers.tsx`)
   - Currently: Empty array `[]`
   - Need: Upload foto + data trainer
   - Photo format: Portrait 3:4 (600x800px)

4. **Services Images** (`/components/Services.tsx`)
   - Currently: Unsplash images
   - Need: Foto dokumentasi training asli

5. **Blog Featured Images** (`/components/Blog.tsx`)
   - Currently: Unsplash images
   - Need: Featured images untuk artikel real
   - Aspect ratio: 16:9 (1200x675px)

6. **Testimonials** (`/components/Testimonials.tsx`)
   - Currently: Empty array `[]`
   - Need: Screenshot testimoni dari social media
   - Format: PNG/JPG, width 400-600px

### ✅ Yang Sudah Final:

- Layout & struktur HTML
- Styling & responsive design
- Animations & interactions
- Component logic
- Navbar behavior
- Form validation

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18** - UI library
- **TypeScript** - Type safety (ditulis dalam .tsx tapi bisa diconvert ke .jsx)
- **Vite** - Build tool & dev server

### Styling
- **Tailwind CSS v4.0** - Utility-first CSS framework
- **Custom CSS** - Animations & custom styles di `styles/globals.css`

### UI Components
- **Shadcn/ui** - Reusable component library
- **Lucide React** - Icon library
- **Embla Carousel** - Carousel untuk About & Services
- **React Slick** - Alternative carousel
- **React Responsive Masonry** - Masonry grid untuk testimonials

### Form & Validation
- **React Hook Form** - Form management
- **Sonner** - Toast notifications

### Utilities
- **clsx** / **class-variance-authority** - Conditional classNames

---

## 🎨 Design System

### Color Palette

```css
Primary Yellow: #F9B800
Black: #000000
Gray 50: #F9FAFB (backgrounds)
Gray 100: #F3F4F6
Gray 600: #4B5563 (text)
```

### Typography

Typography diatur di `styles/globals.css` dengan default styles per HTML element:
- Headings (h1-h6): Custom sizes & weights
- Body text: Default line-height & spacing
- **IMPORTANT**: Jangan override dengan Tailwind font classes kecuali diminta

### Animations

Custom animations defined in `globals.css`:

```css
@keyframes scroll-left - Infinite scroll kiri
@keyframes scroll-right - Infinite scroll kanan  
@keyframes blob - Floating background blobs
@keyframes float-slow - Slow floating (20s)
@keyframes float-medium - Medium floating (15s)
@keyframes float-fast - Fast floating (12s)
```

Usage:
```jsx
className="animate-scroll-left"
className="animate-blob animation-delay-1000"
className="animate-float-slow"
```

---

## 🌐 Browser Support

Website ini mendukung browser modern:

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Android)

**Minimum versions:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 📱 Responsive Breakpoints

Website fully responsive dengan breakpoints Tailwind default:

```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
2xl: 1536px (Extra large)
```

### Section-specific Breakpoints

**Trainers Carousel:**
- < 768px: 1 card
- 768px - 1023px: 2 cards
- 1024px - 1279px: 3 cards  
- 1280px - 1535px: 5 cards
- ≥ 1536px: 5 cards

**Testimonials Grid:**
- < 640px: 2 columns
- 640px - 767px: 2 columns
- 768px - 1023px: 3 columns
- 1024px - 1279px: 4 columns
- ≥ 1280px: 5 columns

---

## 🔐 Security Notes

### Current Implementation (Frontend Only)

- ❌ No authentication
- ❌ No data persistence
- ❌ No server-side validation
- ⚠️ Client-side form validation only

### Recommendations untuk Production

1. **Backend API**
   - JWT authentication
   - Role-based access control
   - Server-side validation
   - Rate limiting

2. **File Uploads**
   - File type validation
   - Size limits (max 5MB)
   - Malware scanning
   - Sanitize filenames

3. **Form Security**
   - CSRF tokens
   - XSS protection
   - SQL injection prevention
   - Input sanitization

---

## 📞 Contact Information

Website ini dibuat untuk:

**Swaragama Training Center**  
Bulaksumur Blok G, Sagan, Caturtunggal, Depok, Sleman  
Daerah Istimewa Yogyakarta

- 📞 Phone: (0274) 549513 | 0856-2727-323
- 📧 Email: swaragamatrainingcenter@gmail.com
- 🌐 Social Media: Instagram, Facebook, LinkedIn, TikTok

**NOTE**: Contact info saat ini hard-coded di component. Buat site_settings table untuk dynamic management.

---

## 🚧 Development Roadmap

### ✅ Phase 1: Frontend (COMPLETED)
- [x] All sections implemented
- [x] Responsive design
- [x] Animations & interactions
- [x] Form validation
- [x] Documentation

### 🔄 Phase 2: Backend Integration (IN PROGRESS)
- [ ] Database setup
- [ ] API endpoints
- [ ] File upload system
- [ ] Authentication

### 📋 Phase 3: Admin Dashboard (PLANNED)
- [ ] Admin UI
- [ ] CRUD interfaces
- [ ] Rich text editor
- [ ] Media library

### 🚀 Phase 4: Production (PLANNED)
- [ ] SEO optimization
- [ ] Performance tuning
- [ ] Security hardening
- [ ] Deployment

---

## 🤝 Contributing

Untuk contribute ke project ini:

1. Review `CRUD_GUIDE.md` untuk backend requirements
2. Review `DEVELOPMENT_NOTES.md` untuk technical details
3. Follow existing code style & structure
4. Test responsive design pada multiple devices
5. Maintain component modularity

---

## 📄 License

Copyright © 2025 Swaragama Training Center  
All rights reserved.

---

## 🙏 Credits

### Images & Assets
- Unsplash photographers (see `Attributions.md`)
- UI Avatars API for placeholder logos
- Shadcn/ui for component library

### Technologies
- React team
- Tailwind CSS team
- Vite team
- All open-source contributors

---

## 📝 Changelog

### Version 1.0.0 (Current)
- Initial release
- Complete frontend implementation
- Responsive design
- All sections implemented
- Comprehensive documentation
- Placeholder system untuk development

---

**Built with ❤️ for Swaragama Training Center**

Untuk pertanyaan atau support, silakan review dokumentasi di:
- `/CRUD_GUIDE.md` - Backend development guide
- `/DEVELOPMENT_NOTES.md` - Technical documentation
- `/guidelines/Guidelines.md` - Development guidelines

**Last Updated**: October 2025
