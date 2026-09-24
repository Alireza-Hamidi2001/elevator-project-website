// components/Gallery.jsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Gallery({ slides }) {
    const [index, setIndex] = useState(0);
    const [animKey, setAnimKey] = useState(0);

    const goTo = useCallback(
        (newIndex) => {
            setIndex((newIndex + slides.length) % slides.length);
            setAnimKey((k) => k + 1);
        },
        [slides.length],
    );

    const next = useCallback(() => goTo(index + 1), [goTo, index]);
    const prev = useCallback(() => goTo(index - 1), [goTo, index]);

    // Autoplay هر 3 ثانیه
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % slides.length);
            setAnimKey((k) => k + 1);
        }, 3000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const current = slides[index];

    return (
        <div className="w-full max-w-3xl">
            <div
                className="group relative w-full h-72 sm:h-116 rounded-lg overflow-hidden shadow-2xl"
                style={{ backgroundColor: current.color }}
            >
                {/* محتوای داخل عکس */}
                <div
                    key={animKey}
                    className="absolute inset-0 flex flex-col items-center justify-center text-white animate-fade"
                >
                    <h2 className="text-4xl font-bold drop-shadow-lg">
                        {current.title}
                    </h2>
                    <p className="mt-2 opacity-80">اسلاید شماره {current.id}</p>
                </div>

                {/* دکمه قبلی */}
                <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 rounded-full bg-black/40 backdrop-blur
                     flex items-center justify-center text-white
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     hover:bg-black/70 hover:scale-110"
                >
                    <FaChevronLeft size={18} />
                </button>

                {/* دکمه بعدی */}
                <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10
                     w-11 h-11 rounded-full bg-black/40 backdrop-blur
                     flex items-center justify-center text-white
                     opacity-0 group-hover:opacity-100 transition-all duration-300
                     hover:bg-black/70 hover:scale-110"
                >
                    <FaChevronRight size={18} />
                </button>
            </div>

            {/* نقطه‌های نشانگر */}
            {/* نقطه‌های ناوبری */}
            <div className="flex justify-center items-center gap-2 mt-6">
                {slides.map((slide, i) => {
                    const isActive = i === index;
                    return (
                        <button
                            key={slide.id}
                            onClick={() => goTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-500 ease-out
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500
                    ${
                        isActive
                            ? "w-9 h-3"
                            : "w-3 h-3 bg-night-700/20 dark:bg-night-700/40 hover:bg-night-700/50 dark:hover:bg-cream-50/50"
                    }`}
                            style={
                                isActive
                                    ? { backgroundColor: slide.color }
                                    : undefined
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
