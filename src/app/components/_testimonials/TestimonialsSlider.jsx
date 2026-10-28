// app/components/TestimonialsSlider.jsx
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { FaChevronLeft, FaChevronRight, FaUser, FaTrash } from "react-icons/fa";
import { almarai } from "@/app/_fonts/fonts";
import DeleteReviewModal from "./DeleteReviewModal";
import PersianNumber from "../PersianNumber";

const CARD =
    "relative overflow-hidden rounded-2xl border border-night-900/15 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-lg shadow-lg shadow-black/5 transition-all duration-500 hover:shadow-2xl hover:bg-white/60 dark:hover:bg-white/10 group p-5 flex flex-col";

export default function TestimonialsSlider({ testimonials, isAdmin }) {
    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [columns, setColumns] = useState(1);
    const [activePage, setActivePage] = useState(0);

    // استیت برای مدال حذف
    const [selectedReview, setSelectedReview] = useState(null);

    useEffect(() => {
        const updateColumns = () => {
            const w = window.innerWidth;
            if (w >= 768) setColumns(3);
            else setColumns(1);
        };
        updateColumns();
        window.addEventListener("resize", updateColumns);
        return () => window.removeEventListener("resize", updateColumns);
    }, []);

    const totalPages = Math.ceil(testimonials.length / columns);

    const updateState = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const { scrollLeft, scrollWidth, clientWidth } = el;
        const atStart = Math.abs(scrollLeft) < 5;
        const atEnd = Math.abs(scrollLeft) + clientWidth >= scrollWidth - 5;
        setCanPrev(!atStart);
        setCanNext(!atEnd);

        const page = Math.round(Math.abs(scrollLeft) / clientWidth);
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
                <button
                    onClick={() => scrollByPage(1)}
                    disabled={!canPrev}
                    aria-label="Previous"
                    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 dark:bg-night-900/70 backdrop-blur border border-white/40 dark:border-white/10 shadow-lg items-center justify-center text-night-800 dark:text-cream-50 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <FaChevronRight size={18} />
                </button>

                <button
                    onClick={() => scrollByPage(-1)}
                    disabled={!canNext}
                    aria-label="Next"
                    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/70 dark:bg-night-900/70 backdrop-blur border border-white/40 dark:border-white/10 shadow-lg items-center justify-center text-night-800 dark:text-cream-50 transition-all duration-300 hover:scale-110 hover:bg-white hover:text-black disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    <FaChevronLeft size={18} />
                </button>

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
                                {/* دکمه حذف برای ادمین */}
                                {isAdmin && (
                                    <button
                                        onClick={() => setSelectedReview(item)}
                                        className="absolute top-3 left-3 z-10 p-2 bg-red-50/80 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-900/60 transition-colors"
                                        title="حذف نظر"
                                    >
                                        <FaTrash className="w-3 h-3" />
                                    </button>
                                )}

                                <p className="flex-1 text-sm sm:text-base leading-7 text-night-700 dark:text-cream-50 mb-6">
                                    {item.text}
                                </p>

                                <div className="mt-auto pt-4 border-t border-night-700/10 dark:border-cream-50/10 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-night-700/5 dark:bg-cream-50/10 flex items-center justify-center text-night-700/60 dark:text-cream-50/60 shrink-0">
                                        <FaUser className="w-4 h-4" />
                                    </div>

                                    <div className="flex flex-col min-w-0">
                                        <h3
                                            className={`${almarai.className} text-sm font-bold text-night-700 dark:text-cream-50 truncate`}
                                        >
                                            {item.name}
                                        </h3>
                                        <p
                                            className="text-xs text-night-700/70 dark:text-cream-50/50 mt-0.5"
                                            dir="ltr"
                                        >
                                            <PersianNumber value={item.phone} />
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>

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

            {/* مودال حذف */}
            {isAdmin && selectedReview && (
                <DeleteReviewModal
                    review={selectedReview}
                    open={!!selectedReview}
                    onClose={() => setSelectedReview(null)}
                />
            )}
        </>
    );
}
