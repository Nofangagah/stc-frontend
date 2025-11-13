// Import foto galeri dari folder assets
// Upload foto dengan nama: gallery-1.jpg, gallery-2.jpg, dst.
import gallery1 from '../assets/gallery-1.JPG';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';
import gallery5 from '../assets/gallery-5.jpg';
import gallery6 from '../assets/gallery-6.jpg';

// Data lokal untuk galeri - digunakan sebagai fallback jika API gagal
export interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    title: string;
}

export const galleriesLocal: GalleryItem[] = [
    {
        id: 1,
        src: gallery1,
        alt: "Workshop Public Speaking",
        title: "Workshop Public Speaking"
    },
    {
        id: 2,
        src: gallery2,
        alt: "Team Training Session",
        title: "Team Training Session"
    },
    {
        id: 3,
        src: gallery3,
        alt: "Corporate Training",
        title: "Corporate Training"
    },
    {
        id: 4,
        src: gallery4,
        alt: "MC Training Class",
        title: "MC Training Class"
    },
    {
        id: 5,
        src: gallery5,
        alt: "Radio Broadcasting Studio",
        title: "Radio Broadcasting Studio"
    },
    {
        id: 6,
        src: gallery6,
        alt: "Kids Program Session",
        title: "Kids Program Session"
    }
];
