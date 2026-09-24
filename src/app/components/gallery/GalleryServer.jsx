// app/page.jsx

import Gallery from "./GalleryClient";

const slides = [
    { id: 1, color: "#9b9cf8", title: "بنفش آرام" },
    { id: 2, color: "#ff79bc", title: "صورتی درخشان" },
    { id: 3, color: "#7dfcd2", title: "سبز زمرد" },
    { id: 4, color: "#f8ca7b", title: "نارنجی طلایی" },
];

export default function GalleryServer() {
    return (
        <main className="flex items-center justify-center p-6">
            <Gallery slides={slides} />
        </main>
    );
}
