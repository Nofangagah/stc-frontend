# 📚 Panduan CRUD Management - Swaragama Training Center Website

## 🎯 Overview
Dokumentasi ini menjelaskan seluruh konten yang memerlukan sistem CRUD (Create, Read, Update, Delete) untuk website Swaragama Training Center. Setiap section dijelaskan dengan detail struktur data, lokasi kode, dan implementasi yang diperlukan.

---

## 📋 Daftar Isi
1. [Galeri About Section](#1-galeri-about-section)
2. [Services / Layanan](#2-services--layanan)
3. [Trainers / Trainer Kami](#3-trainers--trainer-kami)
4. [Clients / Logo Klien](#4-clients--logo-klien)
5. [Blog Posts / STC Corner](#5-blog-posts--stc-corner)
6. [Testimonials](#6-testimonials)
7. [Rekomendasi Struktur Database](#7-rekomendasi-struktur-database)

---

## 1. Galeri About Section

### 📍 Lokasi File
- **Component**: `/components/About.tsx`
- **Lines**: 14-28 (data array)

### 🗂️ Struktur Data Current
```javascript
const galleryImages = [
  {
    id: number,
    image: string,  // URL gambar
    alt: string     // Alt text untuk SEO
  }
]
```

### 📊 Struktur Database Recommended
**Table: `about_gallery`**
```sql
CREATE TABLE about_gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 🔧 Field yang Perlu di-Manage
1. **image_url** - URL gambar (upload ke storage/CDN)
2. **alt_text** - Deskripsi gambar untuk SEO
3. **display_order** - Urutan tampilan (untuk sorting)
4. **is_active** - Status aktif/nonaktif

### 💡 Implementasi Notes
- Galeri menggunakan **auto-slide carousel** dengan interval 3 detik
- Images di-loop infinite menggunakan Embla Carousel
- Support multiple images (minimal 1, recommended 5-10 images)
- Image optimal size: **1200x800px** atau aspect ratio 3:2

### 🎨 UI Behavior
- Auto-play carousel dengan animasi smooth
- Hover untuk pause auto-play
- Dots indicator untuk navigasi manual
- Previous/Next buttons untuk kontrol manual

---

## 2. Services / Layanan

### 📍 Lokasi File
- **Component**: `/components/Services.tsx`
- **Lines**: 11-96 (data array)

### 🗂️ Struktur Data Current
```javascript
const services = [
  {
    id: number,
    title: string,           // Judul layanan
    description: string,     // Deskripsi singkat
    image: string,           // URL gambar
    price: string,           // Harga (format bebas)
    details: string[]        // Array detail/benefit
  }
]
```

### 📊 Struktur Database Recommended
**Table: `services`**
```sql
CREATE TABLE services (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  price VARCHAR(100),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

**Table: `service_details`**
```sql
CREATE TABLE service_details (
  id INT PRIMARY KEY AUTO_INCREMENT,
  service_id INT NOT NULL,
  detail_text TEXT NOT NULL,
  display_order INT DEFAULT 0,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);
```

### 🔧 Field yang Perlu di-Manage
1. **title** - Judul layanan (max 255 char)
2. **description** - Deskripsi lengkap layanan
3. **image_url** - Gambar layanan (upload to storage)
4. **price** - Harga/info pricing (string, bisa "Hubungi Kami", "Rp 500.000", dll)
5. **details** - Array of benefits/features (one-to-many relation)
6. **display_order** - Urutan tampilan
7. **is_active** - Status publikasi

### 💡 Implementasi Notes
- Services ditampilkan dalam **stacked card carousel**
- Maximum 5 services active di stack
- Image optimal size: **800x600px** atau aspect ratio 4:3
- Details ditampilkan sebagai bullet points dengan icon "•" berwarna kuning (#F9B800)
- Navigation: Previous/Next buttons dengan dots indicator

### 🎨 UI Behavior
- Card stacking effect dengan blur & scale pada inactive cards
- Active card: full opacity, z-index tinggi
- Auto-rotate setiap 5 detik (optional)
- Manual navigation dengan arrow buttons

---

## 3. Trainers / Trainer Kami

### 📍 Lokasi File
- **Component**: `/components/Trainers.tsx`
- **Lines**: 12-58 (data array)

### 🗂️ Struktur Data Current
```javascript
const trainers = [
  {
    id: number,
    firstName: string,    // Nama depan
    lastName: string,     // Nama belakang (highlight kuning)
    fullName: string,     // Nama lengkap untuk alt text
    title: string,        // Jabatan/expertise
    image: string         // URL foto trainer
  }
]
```

### 📊 Struktur Database Recommended
**Table: `trainers`**
```sql
CREATE TABLE trainers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  title TEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  bio TEXT,
  email VARCHAR(255),
  phone VARCHAR(50),
  linkedin_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 🔧 Field yang Perlu di-Manage
1. **first_name** - Nama depan (tampil warna hitam)
2. **last_name** - Nama belakang (tampil warna kuning #F9B800)
3. **full_name** - Nama lengkap (untuk SEO & alt text)
4. **title** - Jabatan/keahlian trainer (bisa multi-line)
5. **image_url** - Foto trainer (upload to storage)
6. **bio** - (Optional) Biografi lengkap trainer
7. **email** - (Optional) Email kontak
8. **phone** - (Optional) Nomor telepon
9. **linkedin_url** - (Optional) LinkedIn profile
10. **display_order** - Urutan tampilan
11. **is_active** - Status aktif

### 💡 Implementasi Notes
- Trainers ditampilkan dalam **horizontal carousel**
- Responsive breakpoints:
  - Mobile (< 768px): 1 card per view
  - Tablet (768px - 1023px): 2 cards per view
  - Desktop (1024px - 1279px): 3 cards per view
  - Large Desktop (≥ 1280px): 5 cards per view
- Image optimal size: **600x800px** (portrait) atau aspect ratio 3:4
- Gradient overlay pada foto untuk readability

### 🎨 UI Behavior
- Hover effect: Shadow enhancement & slight lift (-translate-y-2)
- Image zoom on hover (scale-110)
- Nama trainer: firstName (hitam) + lastName (kuning #F9B800)
- Title di bawah nama dengan text truncate (line-clamp-2)

---

## 4. Clients / Logo Klien

### 📍 Lokasi File
- **Component**: `/components/Clients.tsx`
- **Lines**: 3-53 (import statements), 57-113 (data arrays)

### 🗂️ Struktur Data Current
```javascript
// Ada 3 baris scrolling berbeda
const clientLogosRow1 = [
  { name: string, logo: string }
]
const clientLogosRow2 = [
  { name: string, logo: string }
]
const clientLogosRow3 = [
  { name: string, logo: string }
]
```

### 📊 Struktur Database Recommended
**Table: `clients`**
```sql
CREATE TABLE clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500) NOT NULL,
  row_number INT DEFAULT 1,  -- 1, 2, atau 3
  display_order INT DEFAULT 0,
  category VARCHAR(100),  -- 'Banking', 'University', 'Government', dll
  website_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 🔧 Field yang Perlu di-Manage
1. **name** - Nama lengkap klien/perusahaan
2. **logo_url** - URL logo (upload to storage)
3. **row_number** - Baris tampilan (1, 2, atau 3)
4. **display_order** - Urutan dalam baris
5. **category** - Kategori klien (Banking, University, Government, Corporate, Retail, etc.)
6. **website_url** - (Optional) Website perusahaan
7. **is_active** - Status aktif

### 💡 Implementasi Notes
- **3 baris scrolling** dengan arah berbeda:
  - **Row 1**: Scroll ke KANAN (animate-scroll-right)
  - **Row 2**: Scroll ke KIRI (animate-scroll-left)
  - **Row 3**: Scroll ke KANAN (animate-scroll-right)
- Logo di-duplicate 4x untuk infinite scroll effect
- Logo container: 128px × 80px (w-32 h-20) dengan padding
- Background: White dengan shadow & rounded corners
- Animation duration: 20 detik per loop

### 🎨 UI Behavior
- Infinite horizontal scroll animation
- Hover: Shadow enhancement (shadow-md → shadow-xl)
- Logo auto-centered dalam container menggunakan object-contain
- Logo optimal size: **Transparent PNG, max 300x200px**

### 📝 Data Seeding Notes
- Row 1: Umumnya Banking & Corporate clients
- Row 2: Umumnya Universities & Educational institutions
- Row 3: Umumnya Government & SME clients
- Maintain balance: ~15-16 logos per row untuk visual consistency

---

## 5. Blog Posts / STC Corner

### 📍 Lokasi File
- **Component**: `/components/Blog.tsx`
- **Lines**: 11-209 (data array sangat panjang)

### 🗂️ Struktur Data Current
```javascript
const blogPosts = [
  {
    id: number,
    title: string,
    excerpt: string,     // Ringkasan/preview
    image: string,
    date: string,        // Format: "DD Month YYYY"
    category: string,    // Kategori artikel
    content: string,     // Konten lengkap (HTML/Markdown)
    status: string,      // 'published' atau 'draft'
    author: string       // Nama penulis
  }
]
```

### 📊 Struktur Database Recommended
**Table: `blog_posts`**
```sql
CREATE TABLE blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  category_id INT,
  author_id INT,
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at DATETIME,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES blog_categories(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);
```

**Table: `blog_categories`**
```sql
CREATE TABLE blog_categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  color VARCHAR(7) DEFAULT '#F9B800',  -- Hex color
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Table: `authors`**
```sql
CREATE TABLE authors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔧 Field yang Perlu di-Manage
1. **title** - Judul artikel (max 255 char)
2. **slug** - URL-friendly title (auto-generate dari title)
3. **excerpt** - Ringkasan artikel (150-200 char)
4. **content** - Konten lengkap (support HTML/Markdown)
5. **image_url** - Featured image artikel
6. **category** - Kategori (Public Speaking, MC, Communication, dll)
7. **author** - Penulis artikel
8. **status** - Draft/Published/Archived
9. **published_at** - Tanggal publikasi
10. **views_count** - (Optional) Jumlah views

### 💡 Implementasi Notes
- **Grid Layout** jika ≤ 3 posts
- **Carousel** jika > 3 posts
- Featured image aspect ratio: **16:9** (recommended 1200x675px)
- Excerpt: Max 2 lines dengan line-clamp-2
- Date format: "15 Januari 2025" (Indonesian format)
- Category ditampilkan dengan warna kuning (#F9B800)

### 🎨 UI Behavior
- Card hover: Shadow enhancement (shadow-lg → shadow-xl)
- Image zoom on hover (scale-110)
- "Baca Selengkapnya" button dengan arrow icon
- Calendar icon untuk tanggal
- Separator bullet (•) antara date dan category

### 📝 Content Editor Recommendations
- Use **Rich Text Editor** (TinyMCE, CKEditor, Quill)
- Support: Headings, Bold, Italic, Lists, Images, Links
- Auto-save draft feature
- Preview sebelum publish
- SEO meta fields (meta title, meta description)

---

## 6. Testimonials

### 📍 Lokasi File
- **Component**: `/components/Testimonials.tsx`
- **Lines**: 10-172 (data array)

### 🗂️ Struktur Data Current
```javascript
const testimonials = [
  {
    id: number,
    image: string,      // URL screenshot testimoni
    alt: string,        // Deskripsi testimoni
    rotation: string,   // Tailwind class: -rotate-1, rotate-1, dll
    scale: string       // Tailwind class: scale-95, scale-100, dll
  }
]
```

### 📊 Struktur Database Recommended
**Table: `testimonials`**
```sql
CREATE TABLE testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(500) NOT NULL,
  client_name VARCHAR(255),
  client_company VARCHAR(255),
  client_position VARCHAR(255),
  testimonial_text TEXT,  -- (Optional) teks testimoni jika bukan screenshot
  rotation_class VARCHAR(50) DEFAULT 'rotate-0',
  scale_class VARCHAR(50) DEFAULT 'scale-100',
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 🔧 Field yang Perlu di-Manage
1. **image_url** - Screenshot testimoni dari Instagram/Google/WhatsApp
2. **alt_text** - Deskripsi testimoni untuk SEO
3. **client_name** - (Optional) Nama klien
4. **client_company** - (Optional) Perusahaan klien
5. **client_position** - (Optional) Jabatan klien
6. **testimonial_text** - (Optional) Teks testimoni mentah
7. **rotation_class** - CSS class untuk rotasi (-rotate-2, -rotate-1, rotate-0, rotate-1, rotate-2)
8. **scale_class** - CSS class untuk scale (scale-95, scale-100, scale-105)
9. **display_order** - Urutan tampilan
10. **is_active** - Status aktif

### 💡 Implementasi Notes
- Menggunakan **React Responsive Masonry** untuk grid layout
- Responsive columns:
  - Mobile (< 640px): 2 columns
  - Tablet (640px - 767px): 2 columns
  - Desktop (768px - 1023px): 3 columns
  - Large Desktop (1024px - 1279px): 4 columns
  - XL Desktop (≥ 1280px): 5 columns
- Gap between items: 8px
- Image format: **Screenshot testimoni (PNG/JPG)**
- Optimal width: **400-600px** (height auto)

### 🎨 UI Behavior
- Masonry grid untuk layout dinamis
- Random rotation & scale untuk visual interest:
  - `-rotate-2` `-rotate-1` `rotate-0` `rotate-1` `rotate-2`
  - `scale-95` `scale-100` `scale-105`
- Hover effects:
  - Scale to 105% atau 110%
  - Rotate kembali ke 0deg
  - Shadow enhancement (shadow-md → shadow-xl)
  - z-index: 10
- Rounded corners (rounded-lg)

### 📝 Upload Notes
- Accept: Screenshots dari social media (Instagram stories, Google reviews, WhatsApp)
- Auto-optimize images untuk web
- Maintain aspect ratio original
- Compress untuk faster loading

---

## 7. Rekomendasi Struktur Database

### 🗄️ Database Schema Summary
```
swaragama_tc_db/
│
├── about_gallery         (Galeri About Section)
├── services              (Layanan)
│   └── service_details   (Detail/benefit layanan)
├── trainers              (Trainer)
├── clients               (Logo Klien)
├── blog_posts            (Artikel Blog)
│   ├── blog_categories   (Kategori Blog)
│   └── authors           (Penulis)
├── testimonials          (Testimoni)
└── admin_users           (User Admin Dashboard)
```

### 🔐 Admin Users Table
```sql
CREATE TABLE admin_users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role ENUM('super_admin', 'admin', 'editor') DEFAULT 'editor',
  is_active BOOLEAN DEFAULT true,
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 📊 Common Fields di Semua Tables
Untuk consistency, tambahkan fields berikut di semua tables:
- `created_at` - Timestamp pembuatan
- `updated_at` - Timestamp update terakhir
- `is_active` - Status aktif/nonaktif (soft delete)
- `display_order` - Urutan tampilan (untuk sorting)

---

## 🛠️ API Endpoints Recommendations

### About Gallery
```
GET    /api/about-gallery              # Get all images
POST   /api/about-gallery              # Create new image
GET    /api/about-gallery/:id          # Get single image
PUT    /api/about-gallery/:id          # Update image
DELETE /api/about-gallery/:id          # Delete image
PATCH  /api/about-gallery/:id/order    # Update display order
```

### Services
```
GET    /api/services                   # Get all services
POST   /api/services                   # Create new service
GET    /api/services/:id               # Get single service
PUT    /api/services/:id               # Update service
DELETE /api/services/:id               # Delete service
POST   /api/services/:id/details       # Add service detail
PUT    /api/services/details/:id       # Update service detail
DELETE /api/services/details/:id       # Delete service detail
```

### Trainers
```
GET    /api/trainers                   # Get all trainers
POST   /api/trainers                   # Create new trainer
GET    /api/trainers/:id               # Get single trainer
PUT    /api/trainers/:id               # Update trainer
DELETE /api/trainers/:id               # Delete trainer
PATCH  /api/trainers/:id/toggle-active # Toggle active status
```

### Clients
```
GET    /api/clients                    # Get all clients (grouped by row)
POST   /api/clients                    # Create new client
GET    /api/clients/:id                # Get single client
PUT    /api/clients/:id                # Update client
DELETE /api/clients/:id                # Delete client
GET    /api/clients/row/:rowNumber     # Get clients by row (1, 2, or 3)
```

### Blog Posts
```
GET    /api/blog/posts                 # Get all posts (with filters)
POST   /api/blog/posts                 # Create new post
GET    /api/blog/posts/:id             # Get single post
GET    /api/blog/posts/slug/:slug      # Get post by slug
PUT    /api/blog/posts/:id             # Update post
DELETE /api/blog/posts/:id             # Delete post
PATCH  /api/blog/posts/:id/publish     # Publish post
GET    /api/blog/categories            # Get all categories
POST   /api/blog/categories            # Create category
```

### Testimonials
```
GET    /api/testimonials               # Get all testimonials
POST   /api/testimonials               # Create new testimonial
GET    /api/testimonials/:id           # Get single testimonial
PUT    /api/testimonials/:id           # Update testimonial
DELETE /api/testimonials/:id           # Delete testimonial
```

---

## 📦 File Upload Recommendations

### Storage Options
1. **Cloud Storage** (Recommended):
   - AWS S3
   - Google Cloud Storage
   - Cloudflare R2
   - DigitalOcean Spaces

2. **CDN Integration**:
   - CloudFlare CDN
   - AWS CloudFront
   - Fastly

### Image Processing
- **Resize & Optimize** images on upload
- Generate multiple sizes (thumbnail, medium, large)
- Convert to WebP format untuk better performance
- Maintain original for backup

### File Naming Convention
```
{category}/{timestamp}_{original_filename}

Examples:
- services/1704067200_public-speaking.jpg
- trainers/1704067200_john-doe.jpg
- testimonials/1704067200_client-review.png
```

---

## 🔒 Security Considerations

1. **Authentication**:
   - JWT tokens untuk API authentication
   - Role-based access control (RBAC)
   - Session management

2. **File Upload**:
   - Validate file types (whitelist: jpg, jpeg, png, webp)
   - Limit file size (max 5MB recommended)
   - Scan for malware
   - Sanitize filenames

3. **Input Validation**:
   - Validate & sanitize all inputs
   - Prevent SQL injection
   - XSS protection
   - CSRF tokens

4. **Rate Limiting**:
   - Limit API requests per IP/user
   - Prevent brute force attacks

---

## 🎨 Frontend Integration Notes

### Data Fetching
```javascript
// Example React hook untuk fetch data
useEffect(() => {
  const fetchServices = async () => {
    const response = await fetch('/api/services');
    const data = await response.json();
    setServices(data);
  };
  fetchServices();
}, []);
```

### State Management Options
1. **React Query** (Recommended) - untuk caching & auto-refetch
2. **SWR** - alternative untuk data fetching
3. **Redux** - untuk complex state management
4. **Zustand** - lightweight state management

---

## 📱 Admin Dashboard Features Needed

### Dashboard Sections
1. **Statistics Overview**:
   - Total Services, Trainers, Clients, Blog Posts
   - Recent activities
   - Popular blog posts

2. **Content Management**:
   - Services CRUD
   - Trainers CRUD
   - Clients CRUD
   - Blog Posts CRUD (with rich text editor)
   - Testimonials CRUD
   - About Gallery CRUD

3. **Media Library**:
   - Upload manager
   - Image gallery
   - File browser

4. **User Management**:
   - Admin users
   - Roles & permissions

5. **Settings**:
   - Contact information
   - Social media links
   - SEO settings
   - Email configuration

---

## 🧪 Testing Recommendations

### Backend Testing
- Unit tests untuk API endpoints
- Integration tests untuk database operations
- Load testing untuk performance

### Frontend Testing
- Component tests
- E2E tests untuk critical user flows
- Visual regression tests

---

## 📞 Contact Information Update

### Current Contact Info (Hard-coded)
Lokasi: `/components/Contact.tsx`, `/components/Footer.tsx`

**Perlu dibuat dynamic/configurable**:
- Phone: (0274) 549513 | 0856-2727-323
- Email: swaragamatrainingcenter@gmail.com
- Address: Bulaksumur Blok G, Sagan, Caturtunggal, Depok, Sleman, DI Yogyakarta
- Social Media URLs (Instagram, Facebook, LinkedIn, TikTok, WhatsApp, Linktree)

**Recommended Table**:
```sql
CREATE TABLE site_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  setting_type ENUM('text', 'url', 'email', 'phone', 'json') DEFAULT 'text',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 📝 Next Steps untuk Backend Developer

### Phase 1: Setup (Week 1)
- [ ] Setup database & tables
- [ ] Setup authentication system
- [ ] Create base API structure
- [ ] Setup file upload system

### Phase 2: Core CRUD APIs (Week 2-3)
- [ ] Services API with details
- [ ] Trainers API
- [ ] Clients API
- [ ] About Gallery API

### Phase 3: Blog System (Week 3-4)
- [ ] Blog Posts CRUD
- [ ] Categories management
- [ ] Rich text editor integration
- [ ] Image upload for blog

### Phase 4: Additional Features (Week 4-5)
- [ ] Testimonials API
- [ ] Site settings API
- [ ] Admin dashboard backend
- [ ] Search & filtering

### Phase 5: Testing & Documentation (Week 5-6)
- [ ] API testing
- [ ] API documentation (Swagger/Postman)
- [ ] Performance optimization
- [ ] Security audit

---

## 📚 Tech Stack Recommendations

### Backend
- **Node.js** + Express.js / Fastify
- **PHP** + Laravel / CodeIgniter
- **Python** + FastAPI / Django
- **Database**: MySQL / PostgreSQL

### File Storage
- AWS S3 / Cloudflare R2 / Local with CDN

### Authentication
- JWT tokens
- bcrypt untuk password hashing

### API Documentation
- Swagger / OpenAPI
- Postman Collection

---

## 🎯 Performance Considerations

1. **Database Indexing**:
   - Index pada `slug`, `status`, `is_active`
   - Composite index untuk filter combinations

2. **Caching**:
   - Redis untuk API response caching
   - Cache published blog posts
   - Cache active services/trainers/clients

3. **Image Optimization**:
   - Lazy loading
   - WebP format
   - Responsive images (srcset)

4. **API Pagination**:
   - Limit results per page (default: 10-20)
   - Offset-based atau cursor-based pagination

---

## 📧 Support & Questions

Jika ada pertanyaan lebih lanjut mengenai implementasi:
1. Review struktur data di setiap component file
2. Check current dummy data untuk reference
3. Konsultasi untuk custom requirements

**Good luck dengan development! 🚀**

---

**Last Updated**: October 2025
**Version**: 1.0
**Prepared for**: Swaragama Training Center Backend Development Team
