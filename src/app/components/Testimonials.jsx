// components/Testimonials.jsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { almarai } from "@/app/_fonts/fonts";

const CARD =
    "relative overflow-hidden rounded-2xl border border-night-900/15 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group p-5";

const MUTED = "text-night-700/70 dark:text-cream-50/60";

export default function Testimonials({ testimonials }) {
    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [columns, setColumns] = useState(1); // پیش‌فرض موبایل: تک‌ستونه
    const [activePage, setActivePage] = useState(0);

    // تعداد ستون‌ها بر اساس عرض صفحه
    useEffect(() => {
        const updateColumns = () => {
            const w = window.innerWidth;
            if (w >= 768) setColumns(3); // md و بالاتر
            else setColumns(1); // موبایل
        };
        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    // تعداد کل صفحات
    const totalPages = Math.ceil(testimonials.length / columns);

    // آپدیت وضعیت اسکرول
    const updateState = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const atStart = Math.abs(scrollLeft) < 5;
        const atEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 5;
        setCanPrev(!atStart);
        setCanNext(!atEnd);

        const pageWidth = clientWidth;
        const page = Math.round(Math.abs(scrollLeft) / pageWidth);
        setActivePage(Math.min(page, totalPages - 1));
    }, [totalPages]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        updateState();
        el.addEventListener("scroll", updateState, { passive: true });
        window.addEventListener("resize", updateState);
        return () => {
            el.removeEventListener("scroll", updateState);
            window.removeEventListener("resize", updateState);
        };
    }, [updateState, columns]);

    const scrollByPage = (dir) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollBy({ left: el.clientWidth * dir, behavior: "smooth" });
    };

    const goToPage = (pageIndex) => {
        const el = trackRef.current;
        if (!el) return;
        el.scrollTo({ left: -el.clientWidth * pageIndex, behavior: "smooth" });
    };

    return (
        <>
            <div className="relative mt-8 sm:mt-10">
                {/* دکمه قبلی */}
                <button
                    onClick={() => scrollByPage(1)}
                    disabled={!canPrev}
                    aria-label="Previous"
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 dark:bg-night-900/70 backdrop-blur border border-white/40 dark:border-white/10 shadow-lg items-center justify-center text-night-800 dark:text-cream-50 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <FaChevronRight size={18} />
                </button>

                {/* دکمه بعدی */}
                <button
                    onClick={() => scrollByPage(-1)}
                    disabled={!canNext}
                    aria-label="Next"
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 dark:bg-night-900/70 backdrop-blur border border-white/40 dark:border-white/10 shadow-lg items-center justify-center text-night-800 dark:text-cream-50 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <FaChevronLeft size={18} />
                </button>

                {/* مسیر اسکرول */}
                <div
                    ref={trackRef}
                    dir="rtl"
                    className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 px-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {testimonials.map((item) => (
                        <div
                            key={item.id}
                            data-card
                            className="snap-start shrink-0 basis-full md:basis-[calc((100%-2.5rem)/3)]"
                        >
                            <article className={CARD}>
                                <span
                                    aria-hidden="true"
                                    className="h-8 text-5xl leading-none text-red-600/40 dark:text-red-400/40 select-none"
                                >
                                    ”
                                </span>
                                <p className="mt-2 flex-1 text-sm sm:text-base leading-7 text-night-700/80 dark:text-cream-50/70">
                                    {item.text}
                                </p>
                                <div className="mt-5 pt-4 border-t border-night-700/10 dark:border-cream-50/10">
                                    <h3
                                        className={`${almarai.className} text-sm sm:text-base font-bold`}
                                    >
                                        {item.name}
                                    </h3>
                                    <p
                                        className={`mt-1 text-xs sm:text-sm ${MUTED}`}
                                    >
                                        {item.role}
                                    </p>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>

            {/* نقطه‌ها = به تعداد صفحات */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i)}
                            aria-label={`Go to page ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${
                                i === activePage
                                    ? "w-6 h-2 bg-red-600 dark:bg-red-400"
                                    : "w-2 h-2 bg-night-700/30 dark:bg-cream-50/30 hover:bg-night-700/50 dark:hover:bg-cream-50/50"
                            }`}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
