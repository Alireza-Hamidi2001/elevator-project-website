// app/page.jsx
import esclator from "./../../../app/public/esclator.png";
import elevator from "./../../../app/public/image-1.png";
import parking from "./../../../app/public/parking-systems.png";
import wallBox from "./../../../app/public/wallBox.png";
import Gallery from "./GalleryClient";

const slides = [
    {
        id: 1,
        image: esclator,
        color: "#9b9cf8",
        title: "سرویس و نگهداری پله برقی",
    },
    {
        id: 2,
        image: elevator,
        color: "#ff79bc",
        title: "سرویس و نگهداری آسانسور",
    },
    {
        id: 3,
        image: parking,
        color: "#7dfcd2",
        title: "تعمیر و نگهداری پارکینگ های مکانیزه",
    },
    { id: 4, image: wallBox, color: "#f8ca7b", title: "wall box" },
];

export default function GalleryServer() {
    return (
        <main className="flex items-center justify-center p-6">
            <Gallery slides={slides} />
        </main>
    );
}
