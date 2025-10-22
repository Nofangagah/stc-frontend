// Import foto trainers dari folder assets
// Upload foto dengan nama: trainer-1.jpg, trainer-2.jpg, dst.
import trainer1 from '../assets/trainer-1.jpg';
import trainer2 from '../assets/trainer-2.jpg';
import trainer3 from '../assets/trainer-3.jpg';
import trainer4 from '../assets/trainer-4.jpg';
import trainer5 from '../assets/trainer-5.jpg';
import trainer6 from '../assets/trainer-6.jpg';
import trainer7 from '../assets/trainer-7.jpg';
import trainer9 from '../assets/trainer-9.jpg';
import trainer10 from '../assets/trainer-10.jpg';

// Trainer 8 & 10 menggunakan placeholder "Coming Soon"
import comingSoonPlaceholder from '../assets/coming-soon-trainer.svg';

// Data lokal untuk trainers - digunakan sebagai fallback jika API gagal
export interface Trainer {
    id: number;
    name: string;
    expertise: string[];
    avatarUrl: string;
}

export const trainersLocal: Trainer[] = [
    {
        id: 1,
        name: "Dwi Gayatri",
        expertise: ["Professional Public Speaker & Trainer"],
        avatarUrl: trainer1
    },
    {
        id: 2,
        name: "Gideon Surya",
        expertise: ["Professional Trainer & Speaker"],
        avatarUrl: trainer2
    },
    {
        id: 3,
        name: "Ayu Rizqia",
        expertise: ["HR Development & Professional Speaker"],
        avatarUrl: trainer3
    },
    {
        id: 4,
        name: "Bara Zulfa",
        expertise: ["Professional MC", "Presenter & Voice Over Talent"],
        avatarUrl: trainer4
    },
    {
        id: 5,
        name: "Dina Alia",
        expertise: ["Professional Broadcaster & Voice Over Talent"],
        avatarUrl: trainer5
    },
    {
        id: 6,
        name: "Cici Priskila",
        expertise: ["Professional Broadcaster & Voice Over Talent"],
        avatarUrl: trainer6
    },
    {
        id: 7,
        name: "Bertha Virginia",
        expertise: ["Professional MC & Voice Over Talent"],
        avatarUrl: trainer7
    },
    {
        id: 8,
        name: "Nicky Shaquilla",
        expertise: ["Professional Broadcaster & MC"],
        avatarUrl: comingSoonPlaceholder
    },
    {
        id: 9,
        name: "Kani Raras",
        expertise: ["Professional Broadcaster & MC"],
        avatarUrl: trainer9
    },
    {
        id: 10,
        name: "Arifah Putri",
        expertise: ["Professional Public Speaker"],
        avatarUrl: trainer10
    }
];
